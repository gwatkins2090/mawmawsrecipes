#!/usr/bin/env python3
"""Parse all recipe files from knowledgebase and prepare for Sanity import"""

import os
import re
import yaml
from pathlib import Path
import json

# Category mapping based on existing Sanity categories
CATEGORY_MAP = {
    'asian': '6d1db21c-b896-40c1-b84c-74074bf632b9',  # Main Dishes
    'breakfast': '9d8f6746-12af-44be-8c44-c5db86d52a36',  # Breakfast
    'desert': '56230a66-83f0-4a25-9a50-8bfd17d08448',  # Desserts (fix typo)
    'italian': '6d1db21c-b896-40c1-b84c-74074bf632b9',  # Main Dishes
    'mexican': '6d1db21c-b896-40c1-b84c-74074bf632b9',  # Main Dishes
    'soups': '6d1db21c-b896-40c1-b84c-74074bf632b9',  # Main Dishes
    'beef': '6d1db21c-b896-40c1-b84c-74074bf632b9',  # Main Dishes
    'pork': '6d1db21c-b896-40c1-b84c-74074bf632b9',  # Main Dishes
    'poultry': '6d1db21c-b896-40c1-b84c-74074bf632b9',  # Main Dishes
    'sides': '09c60c2c-0641-4f53-b4ff-1395595cfdc3',  # Appetizers/Snacks
}

# Default author ID (Grandma Rose - the most common family recipe author)
DEFAULT_AUTHOR_ID = '00182644-6306-4089-a941-f961319ca554'

# Author mapping
AUTHOR_MAP = {
    'Grandma Rose': '00182644-6306-4089-a941-f961319ca554',
    'Aunt Marie': '22e0374d-3dd5-4167-845e-6cc2dced5236',
    'Uncle Jim': '70b2e400-985f-45b7-835b-3bd0ab056a9c',
}

def slugify(text):
    """Convert text to URL slug"""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def parse_simple_ingredients(content):
    """Parse simple markdown ingredients list"""
    ingredients = []
    for line in content.split('\n'):
        line = line.strip()
        if line.startswith('- ') or line.startswith('* '):
            item = line[2:].strip()
            if item:
                # Try to parse amount and unit
                # Pattern: "1 cup ingredient" or "1/2 teaspoon ingredient"
                match = re.match(r'^([\d\s\./½¼¾⅓⅔⅛⅜⅝]+)?\s*(\w+)?\s*(.+)?$', item)
                if match:
                    amount = match.group(1) or ''
                    unit = match.group(2) or ''
                    ingredient = match.group(3) or ''
                    # If no ingredient, the unit might be the ingredient
                    if not ingredient and unit:
                        ingredient = unit
                        unit = ''
                else:
                    amount = ''
                    unit = ''
                    ingredient = item

                ingredients.append({
                    'amount': amount.strip(),
                    'unit': unit.strip(),
                    'ingredient': ingredient.strip()
                })
    return ingredients

def parse_simple_instructions(content):
    """Parse simple markdown instructions"""
    instructions = []
    lines = content.split('\n')

    for line in lines:
        line = line.strip()
        # Match numbered items or bullet points
        match = re.match(r'^(?:\d+\.?\s*|[*\-]\s*)(.+)$', line)
        if match and len(match.group(1)) > 5:
            instructions.append({'instruction': match.group(1).strip()})

    # If no matches, try splitting by sentences for longer text
    if not instructions:
        # Look for STEP patterns
        step_pattern = re.findall(r'(?:STEP\s*\d+\.?\s*)(.+?)(?=\s*(?:STEP\s*\d+|$))', content, re.IGNORECASE | re.DOTALL)
        if step_pattern:
            for step in step_pattern:
                text = step.strip()
                if text and len(text) > 5:
                    instructions.append({'instruction': text})
        else:
            # Try to find numbered paragraphs
            paras = re.split(r'\n\s*\n', content)
            for para in paras:
                para = para.strip()
                if para and len(para) > 10:
                    instructions.append({'instruction': para})

    return instructions

def parse_yaml_recipe(content, file_path):
    """Parse YAML frontmatter recipe"""
    # Split frontmatter from content
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n?(.*)$', content, re.DOTALL)
    if not match:
        return None

    try:
        frontmatter = yaml.safe_load(match.group(1))
    except Exception as e:
        print(f"YAML parse error in {file_path}: {e}")
        return None

    body = match.group(2).strip()

    # Get folder name for category mapping
    folder = Path(file_path).parent.name

    # Map category
    category_id = CATEGORY_MAP.get(folder)
    if not category_id:
        category_id = CATEGORY_MAP.get(frontmatter.get('category', ''), '6d1db21c-b896-40c1-b84c-74074bf632b9')

    # Map author
    author_name = frontmatter.get('author', '')
    author_id = AUTHOR_MAP.get(author_name, DEFAULT_AUTHOR_ID)

    # Parse ingredients
    ingredients = []
    if 'ingredients' in frontmatter and frontmatter['ingredients']:
        items = []
        for i, ing in enumerate(frontmatter['ingredients']):
            if isinstance(ing, dict):
                items.append({
                    '_key': f'ing_{i}',
                    'amount': str(ing.get('amount', '')),
                    'unit': ing.get('unit', ''),
                    'ingredient': ing.get('ingredient', '')
                })
        if items:
            ingredients.append({
                '_key': 'main',
                'groupName': 'Ingredients',
                'items': items
            })

    # Parse instructions
    instructions = []
    if 'instructions' in frontmatter and frontmatter['instructions']:
        for i, step in enumerate(frontmatter['instructions']):
            if isinstance(step, dict):
                instructions.append({
                    '_key': f'step_{i}',
                    'step': i + 1,
                    'instruction': step.get('instruction', '')
                })

    # Parse nutrition
    nutrition = None
    if 'nutrition' in frontmatter and frontmatter['nutrition']:
        n = frontmatter['nutrition']
        nutrition = {
            'calories': n.get('calories'),
            'protein': n.get('protein'),
            'carbs': n.get('carbs'),
            'fat': n.get('fat'),
            'fiber': n.get('fiber')
        }

    # Parse notes and variations
    notes = frontmatter.get('notes', [])
    variations = frontmatter.get('variations', [])

    return {
        'title': frontmatter.get('title', ''),
        'slug': slugify(frontmatter.get('title', '')),
        'description': frontmatter.get('description', ''),
        'category_id': category_id,
        'subcategory': '',
        'cuisine': frontmatter.get('cuisine', ''),
        'difficulty': frontmatter.get('difficulty', 'Medium'),
        'servings': frontmatter.get('servings', 4),
        'prepTime': frontmatter.get('prepTime', ''),
        'cookTime': frontmatter.get('cookTime', ''),
        'totalTime': frontmatter.get('totalTime', ''),
        'restTime': frontmatter.get('restTime', ''),
        'tags': frontmatter.get('tags', []),
        'author_id': author_id,
        'dateCreated': frontmatter.get('dateCreated', '2024-01-01'),
        'rating': frontmatter.get('rating', 0),
        'reviewCount': frontmatter.get('reviewCount', 0),
        'ingredients': ingredients,
        'instructions': instructions,
        'nutrition': nutrition,
        'notes': notes,
        'variations': variations,
        'storage': frontmatter.get('storage', ''),
        'isFamilyRecipe': folder == 'family',
        'featured': False,
        'source_folder': folder,
        'body': body
    }

def parse_simple_recipe(content, file_path):
    """Parse simple markdown recipe (family recipes)"""
    lines = content.split('\n')

    # Extract title
    title = ''
    for line in lines:
        match = re.match(r'^##\s*(?:Recipe\s*#?\d*:?\s*)?(.+)$', line.strip())
        if match:
            title = match.group(1).strip()
            break

    if not title:
        # Try filename
        filename = Path(file_path).stem.replace('_', ' ').replace('-', ' ').title()
        title = filename

    # Extract ingredients section
    ingredients_match = re.search(r'(?:###?\s*Ingredients:?|Ingredients?:?|\*\*Ingredients:\*\*)(.+?)(?:###?\s*Instructions:?|Instructions?:?|\*\*Instructions:\*\*|$)', content, re.DOTALL | re.IGNORECASE)
    ingredients = []
    if ingredients_match:
        ing_items = parse_simple_ingredients(ingredients_match.group(1))
        if ing_items:
            ingredients.append({
                '_key': 'main',
                'groupName': 'Ingredients',
                'items': [
                    {
                        '_key': f'ing_{i}',
                        'amount': ing.get('amount', ''),
                        'unit': ing.get('unit', ''),
                        'ingredient': ing.get('ingredient', '')
                    }
                    for i, ing in enumerate(ing_items)
                ]
            })

    # Extract instructions section
    instructions_match = re.search(r'(?:###?\s*Instructions:?|Instructions?:?|\*\*Instructions:\*\*)(.+?)(?:###?|Note:|Notes:|\*\*Note|\*\*Notes|$)', content, re.DOTALL | re.IGNORECASE)
    instructions = []
    if instructions_match:
        inst_items = parse_simple_instructions(instructions_match.group(1))
        instructions = [
            {
                '_key': f'step_{i}',
                'step': i + 1,
                'instruction': step['instruction']
            }
            for i, step in enumerate(inst_items)
        ]

    # Extract notes
    notes = []
    notes_match = re.search(r'(?:###?\s*Note[s]?:?|Note[s]?:?|\*\*Note[s]?:?\*\*)(.+?)$', content, re.DOTALL | re.IGNORECASE)
    if notes_match:
        note_text = notes_match.group(1).strip()
        if note_text:
            notes = [note_text]

    # Determine category based on content
    folder = Path(file_path).parent.name

    # Categorize family recipes based on title/content
    title_lower = title.lower()
    category_id = '6d1db21c-b896-40c1-b84c-74074bf632b9'  # Default to Main Dishes

    if any(word in title_lower for word in ['pie', 'cake', 'cookie', 'muffin', 'scone', 'biscotti', 'fudge', 'candy', 'custard']):
        if any(word in title_lower for word in ['corn bread', 'cornbread', 'french bread', 'hot bread', 'beef bread', 'sausage bread']):
            category_id = '6d1db21c-b896-40c1-b84c-74074bf632b9'  # Main Dishes (savory breads)
        else:
            category_id = '56230a66-83f0-4a25-9a50-8bfd17d08448'  # Desserts
    elif any(word in title_lower for word in ['breakfast', 'pancake', 'waffle', 'omelet', 'morning']):
        category_id = '9d8f6746-12af-44be-8c44-c5db86d52a36'  # Breakfast
    elif any(word in title_lower for word in ['dip', 'appetizer', 'snack', 'nuts', 'spread']):
        category_id = '09c60c2c-0641-4f53-b4ff-1395595cfdc3'  # Appetizers/Snacks
    elif any(word in title_lower for word in ['soup', 'chowder']):
        category_id = '6d1db21c-b896-40c1-b84c-74074bf632b9'  # Main Dishes

    # Subcategory detection
    subcategory = ''
    if 'pie' in title_lower:
        subcategory = 'Pies'
    elif 'cake' in title_lower:
        subcategory = 'Cakes'
    elif 'cookie' in title_lower or 'biscotti' in title_lower:
        subcategory = 'Cookies'
    elif 'muffin' in title_lower:
        subcategory = 'Muffins'
    elif 'scone' in title_lower:
        subcategory = 'Scones'
    elif 'bread' in title_lower or 'biscuit' in title_lower:
        subcategory = 'Breads & Biscuits'
    elif 'casserole' in title_lower:
        subcategory = 'Casseroles'
    elif 'soup' in title_lower or 'chowder' in title_lower:
        subcategory = 'Soups'
    elif 'salad' in title_lower:
        subcategory = 'Salads'

    return {
        'title': title,
        'slug': slugify(title),
        'description': f'Family recipe for {title}. A cherished recipe passed down through generations.',
        'category_id': category_id,
        'subcategory': subcategory,
        'cuisine': 'American',
        'difficulty': 'Medium',
        'servings': 4,
        'prepTime': '',
        'cookTime': '',
        'totalTime': '',
        'tags': ['family-recipe'],
        'author_id': DEFAULT_AUTHOR_ID,
        'dateCreated': '2024-01-01',
        'rating': 0,
        'reviewCount': 0,
        'ingredients': ingredients,
        'instructions': instructions,
        'nutrition': None,
        'notes': notes,
        'variations': [],
        'storage': '',
        'isFamilyRecipe': True,
        'featured': False,
        'source_folder': folder,
        'body': content
    }

def parse_recipe_file(file_path):
    """Parse a single recipe file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

    # Check if it has YAML frontmatter
    if content.strip().startswith('---'):
        return parse_yaml_recipe(content, file_path)
    else:
        return parse_simple_recipe(content, file_path)

def main():
    # Find all recipe files
    base_path = 'knowledgebase/recipes'
    all_files = []
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith('.md'):
                all_files.append(os.path.join(root, file))

    print(f"Found {len(all_files)} recipe files")

    # Parse all recipes
    recipes = []
    for file_path in all_files:
        recipe = parse_recipe_file(file_path)
        if recipe:
            recipe['file_path'] = file_path
            recipes.append(recipe)

    print(f"Successfully parsed {len(recipes)} recipes")

    # Group by category
    from collections import defaultdict
    by_category = defaultdict(int)
    by_subcategory = defaultdict(int)

    for r in recipes:
        cat = r.get('source_folder', 'unknown')
        by_category[cat] += 1
        sub = r.get('subcategory', 'none')
        if sub:
            by_subcategory[sub] += 1

    print("\nBy Source Folder:")
    for cat, count in sorted(by_category.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")

    print("\nBy Subcategory:")
    for cat, count in sorted(by_subcategory.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")

    # Save to JSON
    output = {
        'recipes': recipes,
        'stats': {
            'total': len(recipes),
            'by_folder': dict(by_category),
            'by_subcategory': dict(by_subcategory)
        }
    }

    output_path = 'parsed_recipes.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)

    print(f"\nSaved to {output_path}")

    # Show samples
    print("\n=== Sample Recipes ===")
    for i, r in enumerate(recipes[:3]):
        print(f"\n{i+1}. {r['title']}")
        print(f"   Folder: {r['source_folder']}")
        print(f"   Category: {r['category_id']}")
        print(f"   Subcategory: {r['subcategory']}")
        print(f"   Ingredients: {len(r['ingredients'])} groups")
        print(f"   Instructions: {len(r['instructions'])} steps")
        print(f"   Is Family Recipe: {r['isFamilyRecipe']}")

if __name__ == '__main__':
    main()
