#!/bin/bash

# Generate all recipe images
# Requires SANITY_API_WRITE_TOKEN to be set

PROJECT_ID="ynsg8i79"
DATASET="production"
API_VERSION="2024-01-01"

echo "[1/113] Generating image for Classic Beef Stir Fry..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Classic Beef Stir Fry, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[2/113] Generating image for Grandma's Fluffy Buttermilk Pancakes..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Elegant Grandma'\''s Fluffy Buttermilk Pancakes, perfectly frosted layers, sliced showing moist crumb, on cake stand, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[3/113] Generating image for Overnight French Toast Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Overnight French Toast Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[4/113] Generating image for Perfect Chocolate Chip Cookies..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Perfect Chocolate Chip Cookies, golden edges, stacked on wire rack, chocolate melting, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[5/113] Generating image for Classic Tiramisu..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Classic Tiramisu, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[6/113] Generating image for Angel Biscuits..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Angel Biscuits, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[7/113] Generating image for Applesauce Muffins..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Applesauce Muffins, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[8/113] Generating image for Apricot Almond Scones..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Apricot Almond Scones, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[9/113] Generating image for Baked Chicken Breasts En Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Baked Chicken Breasts En Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[10/113] Generating image for Baked Grits..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Baked Grits, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[11/113] Generating image for Banana Nut Bread..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Banana Nut Bread, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[12/113] Generating image for Barley Soup..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hearty Barley Soup in ceramic bowl, steam rising, crusty bread, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[13/113] Generating image for Becky Chicken Dumplings..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Perfectly cooked Becky Chicken Dumplings, golden brown, juicy meat, herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[14/113] Generating image for Beef Bread..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Beef Bread, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[15/113] Generating image for Best Ever Salad..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Fresh Best Ever Salad, vibrant colorful ingredients, crisp vegetables, elegant plating, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[16/113] Generating image for Best Rolls..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Best Rolls, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[17/113] Generating image for Black Bottom Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Black Bottom Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[18/113] Generating image for Blueberry Pound Cake..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Elegant Blueberry Pound Cake, perfectly frosted layers, sliced showing moist crumb, on cake stand, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[19/113] Generating image for Boston Cream Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Boston Cream Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[20/113] Generating image for Breakfastbrunch Roll Up..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious Breakfastbrunch Roll Up, golden and fluffy, butter and syrup, fresh berries, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[21/113] Generating image for Breakfast Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Breakfast Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[22/113] Generating image for Broccoli Cheese Soup..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hearty Broccoli Cheese Soup in ceramic bowl, steam rising, crusty bread, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[23/113] Generating image for Broccoli Rice Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Broccoli Rice Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[24/113] Generating image for Broccoli Rice Casserole 1..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Broccoli Rice Casserole 1 in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[25/113] Generating image for Carrot Soup Louella Donelson..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hearty Carrot Soup Louella Donelson in ceramic bowl, steam rising, crusty bread, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[26/113] Generating image for Catfish Allison..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautifully prepared Catfish Allison, flaky fillet, lemon wedges, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[27/113] Generating image for Catfish With Pecan Brown Butter Recipe..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautifully prepared Catfish With Pecan Brown Butter Recipe, flaky fillet, lemon wedges, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[28/113] Generating image for Chessy Catfish..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautifully prepared Chessy Catfish, flaky fillet, lemon wedges, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[29/113] Generating image for Chicken Casserole Serves 12..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Chicken Casserole Serves 12 in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[30/113] Generating image for Chicken Dressing Casserole Jan G..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Chicken Dressing Casserole Jan G in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[31/113] Generating image for Chicken Rice Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Chicken Rice Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[32/113] Generating image for Chicken Spaghetti..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Perfectly cooked Chicken Spaghetti, golden brown, juicy meat, herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[33/113] Generating image for Chicken Spaghetti Version 2..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Perfectly cooked Chicken Spaghetti Version 2, golden brown, juicy meat, herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[34/113] Generating image for Chipped Beef Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Chipped Beef Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[35/113] Generating image for Chocolate Chess Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Chocolate Chess Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[36/113] Generating image for Christmas Breakfast Sausage Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Christmas Breakfast Sausage Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[37/113] Generating image for Coconut Almond Pound Cake..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Elegant Coconut Almond Pound Cake, perfectly frosted layers, sliced showing moist crumb, on cake stand, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[38/113] Generating image for Coconut Pie Bayleys..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Coconut Pie Bayleys, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[39/113] Generating image for Comeback Sauce Recipe..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Comeback Sauce Recipe, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[40/113] Generating image for Coon Cheese Sausage Biscuits..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Coon Cheese Sausage Biscuits, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[41/113] Generating image for Corn Chowder Soup..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hearty Corn Chowder Soup in ceramic bowl, steam rising, crusty bread, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[42/113] Generating image for Corn Rice Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Corn Rice Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[43/113] Generating image for Cranberry Nut Bread Recipe..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Cranberry Nut Bread Recipe, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[44/113] Generating image for Cranberry Orange Scones Full Recipe..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Cranberry Orange Scones Full Recipe, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[45/113] Generating image for Crazy Custard Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Crazy Custard Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[46/113] Generating image for Crunchy Chicken Recipe..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Perfectly cooked Crunchy Chicken Recipe, golden brown, juicy meat, herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[47/113] Generating image for Crunch Catfish With Lemon Butter Sauce..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautifully prepared Crunch Catfish With Lemon Butter Sauce, flaky fillet, lemon wedges, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[48/113] Generating image for Delicious Ham And Potato Soup..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hearty Delicious Ham And Potato Soup in ceramic bowl, steam rising, crusty bread, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[49/113] Generating image for Dorothy Browns Breakfast Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Dorothy Browns Breakfast Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[50/113] Generating image for French Bread..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked French Bread, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[51/113] Generating image for Fresh Blueberry Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Fresh Blueberry Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[52/113] Generating image for Frozen North Dressing Potato Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Frozen North Dressing Potato Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[53/113] Generating image for Grape Salad..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Fresh Grape Salad, vibrant colorful ingredients, crisp vegetables, elegant plating, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[54/113] Generating image for Green Bean Corn Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Green Bean Corn Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[55/113] Generating image for Hamburg Noodle Bake..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Hamburg Noodle Bake, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[56/113] Generating image for Ham Croquettes..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Ham Croquettes, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[57/113] Generating image for Ham Loaf Supreme..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Ham Loaf Supreme, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[58/113] Generating image for Ham Steak..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Ham Steak, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[59/113] Generating image for Hash Brown Potato Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Hash Brown Potato Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[60/113] Generating image for Hot Bread..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Hot Bread, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[61/113] Generating image for Hot Fruit..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Hot Fruit, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[62/113] Generating image for Ice Box Fruit Cake..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Elegant Ice Box Fruit Cake, perfectly frosted layers, sliced showing moist crumb, on cake stand, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[63/113] Generating image for Italian Cream Cake..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Elegant Italian Cream Cake, perfectly frosted layers, sliced showing moist crumb, on cake stand, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[64/113] Generating image for Jim Buck Ross Blueberry Buttermilk Muffins..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Jim Buck Ross Blueberry Buttermilk Muffins, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[65/113] Generating image for Karo Pecan Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Karo Pecan Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[66/113] Generating image for Lasagne..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Lasagne, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[67/113] Generating image for Lolas Southern Buttermilk Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Lolas Southern Buttermilk Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[68/113] Generating image for Maes Chicken Salad..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Fresh Maes Chicken Salad, vibrant colorful ingredients, crisp vegetables, elegant plating, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[69/113] Generating image for Maui Pineapple Scones..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Maui Pineapple Scones, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[70/113] Generating image for Meat Balls Spaghetti..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Meat Balls Spaghetti, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[71/113] Generating image for Meat Loaf..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Meat Loaf, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[72/113] Generating image for Meat Loaf Pizza..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Meat Loaf Pizza, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[73/113] Generating image for Meat Stuffing For Jumbo Shells Or Manicotti..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Meat Stuffing For Jumbo Shells Or Manicotti, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[74/113] Generating image for Morning Glory Muffins..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Morning Glory Muffins, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[75/113] Generating image for My Favorite Biscotti..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade My Favorite Biscotti, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[76/113] Generating image for Nut Cake 2 Loaves..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Elegant Nut Cake 2 Loaves, perfectly frosted layers, sliced showing moist crumb, on cake stand, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[77/113] Generating image for Old Fashioned Cornbread Dressing Southern Living..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Old Fashioned Cornbread Dressing Southern Living, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[78/113] Generating image for Old Fashioned Short Cake..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Elegant Old Fashioned Short Cake, perfectly frosted layers, sliced showing moist crumb, on cake stand, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[79/113] Generating image for Panko Crusted Salmon Recipe..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautifully prepared Panko Crusted Salmon Recipe, flaky fillet, lemon wedges, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[80/113] Generating image for Paradise Pineapple Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Paradise Pineapple Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[81/113] Generating image for Pear Honey Recipe..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Pear Honey Recipe, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[82/113] Generating image for Pecan Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Pecan Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[83/113] Generating image for Pecan Pie 1..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Pecan Pie 1, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[84/113] Generating image for Pickapeppa Marinated Chicken..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Perfectly cooked Pickapeppa Marinated Chicken, golden brown, juicy meat, herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[85/113] Generating image for Pistachio Salad..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Fresh Pistachio Salad, vibrant colorful ingredients, crisp vegetables, elegant plating, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[86/113] Generating image for Potato Green Onion Soup..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hearty Potato Green Onion Soup in ceramic bowl, steam rising, crusty bread, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[87/113] Generating image for Putn On The Ritz..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Putn On The Ritz, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[88/113] Generating image for Quiche..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Quiche, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[89/113] Generating image for Raisin Bran Muffins..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Raisin Bran Muffins, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[90/113] Generating image for Raw Cranberry Salad..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Fresh Raw Cranberry Salad, vibrant colorful ingredients, crisp vegetables, elegant plating, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[91/113] Generating image for Red Velvet Cake..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Elegant Red Velvet Cake, perfectly frosted layers, sliced showing moist crumb, on cake stand, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[92/113] Generating image for Salmon Croquettes..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautifully prepared Salmon Croquettes, flaky fillet, lemon wedges, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[93/113] Generating image for Salmon Loaf..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautifully prepared Salmon Loaf, flaky fillet, lemon wedges, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[94/113] Generating image for Salted Pecans Express Printing..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Salted Pecans Express Printing, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[95/113] Generating image for Sausage Biscuit Snackmeal..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Sausage Biscuit Snackmeal, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[96/113] Generating image for Sausage Egg Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Sausage Egg Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[97/113] Generating image for Shrimp Casserole Express Printing..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Shrimp Casserole Express Printing in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[98/113] Generating image for Shrimp Dip..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Shrimp Dip, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[99/113] Generating image for Sour Cream Biscuits Recipe..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Sour Cream Biscuits Recipe, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[100/113] Generating image for Squash Dressing..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Squash Dressing, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[101/113] Generating image for Stuffed Peppers..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Stuffed Peppers, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[102/113] Generating image for Stuffing For Flounder..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Stuffing For Flounder, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[103/113] Generating image for Sweet Potato Pie..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Sweet Potato Pie, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[104/113] Generating image for Sweet Potato Pie 1..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Beautiful homemade Sweet Potato Pie 1, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[105/113] Generating image for Tuna Casserole..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Homemade Tuna Casserole in white baking dish, golden cheesy top, bubbling hot, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[106/113] Generating image for Tylers Blueberry Scones With Lemon Glaze..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Tylers Blueberry Scones With Lemon Glaze, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[107/113] Generating image for Various Appetizersdips..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Various Appetizersdips, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[108/113] Generating image for Wild Rice..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Wild Rice, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[109/113] Generating image for Zucchini Bread..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Freshly baked Zucchini Bread, golden brown crust, butter melting, steam rising, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[110/113] Generating image for Classic Spaghetti Carbonara..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Classic Spaghetti Carbonara, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[111/113] Generating image for Homemade Pizza Margherita..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Delicious homemade Homemade Pizza Margherita, perfectly prepared, appetizing presentation, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[112/113] Generating image for Chicken Tacos Al Pastor..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Perfectly cooked Chicken Tacos Al Pastor, golden brown, juicy meat, herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "[113/113] Generating image for Homemade Chicken Noodle Soup..."
curl -s -X POST \
  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \
  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hearty Homemade Chicken Noodle Soup in ceramic bowl, steam rising, crusty bread, fresh herbs, Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality"}' > /dev/null
sleep 2

echo "All images generated!"
