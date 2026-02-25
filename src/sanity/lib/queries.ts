import { defineQuery } from 'next-sanity'

// Site Settings
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    title,
    tagline,
    description,
    url,
    logo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    logoDark {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    favicon {
      asset->{
        _id,
        url
      }
    },
    ogImage {
      asset->{
        _id,
        url
      }
    },
    navigation {
      mainMenu[] {
        label,
        href,
        openInNewTab,
        children[] {
          label,
          href,
          openInNewTab
        }
      },
      ctaButton {
        label,
        href,
        variant
      }
    },
    footer {
      tagline,
      columns[] {
        title,
        links[] {
          label,
          href,
          openInNewTab
        }
      },
      socialLinks[] {
        platform,
        url
      },
      bottomText,
      bottomLinks[] {
        label,
        href
      }
    },
    newsletter {
      enabled,
      heading,
      description,
      placeholder,
      buttonLabel,
      successMessage
    },
    seo {
      titleTemplate,
      defaultTitle,
      defaultDescription,
      defaultOgImage {
        asset->{
        _id,
        url
        }
      }
    },
    stats {
      recipeCount,
      cookCount,
      favoritesCount,
      rating
    },
    notFoundPage {
      heading,
      message,
      image {
        asset->{
          _id,
          url
        }
      },
      ctaLabel
    }
  }
`)

// Home Page
export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    _id,
    _type,
    hero {
      headline,
      subtitle,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      },
      showStats,
      primaryCta {
        label,
        href,
        variant
      },
      secondaryCta {
        label,
        href,
        variant
      }
    },
    featuredSection {
      heading,
      subheading,
      recipes[]-> {
        _id,
        _type,
        title,
        slug,
        description,
        difficulty,
        totalTime,
        servings,
        rating,
        mainImage {
          asset->{
            _id,
            url,
            metadata { lqip, dimensions }
          },
          alt,
          hotspot,
          crop
        },
        category-> {
          _id,
          title,
          slug,
          emoji,
          color
        }
      }
    },
    categorySection {
      heading,
      subheading,
      categories[]-> {
        _id,
        _type,
        title,
        slug,
        description,
        emoji,
        image {
          asset->{
            _id,
            url,
            metadata { lqip, dimensions }
          },
          alt,
          hotspot,
          crop
        },
        color {
          from,
          to
        },
        "recipeCount": count(*[_type == "recipe" && references(^._id)])
      }
    },
    aboutTeaser {
      heading,
      body,
      image {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      },
      cta {
        label,
        href,
        variant
      }
    },
    newsletterSection {
      enabled,
      heading,
      description,
      backgroundImage {
        asset->{
          _id,
          url
        }
      }
    }
  }
`)

// Recipes Page
export const RECIPES_PAGE_QUERY = defineQuery(`
  *[_type == "recipesPage"][0] {
    _id,
    _type,
    hero {
      heading,
      description,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      }
    },
    searchPlaceholder,
    filtersHeading,
    noResultsMessage,
    perPage
  }
`)

// All Recipes (paginated)
export const RECIPES_QUERY = defineQuery(`
  *[_type == "recipe"] | order(_createdAt desc) [$start...$end] {
    _id,
    _type,
    title,
    slug,
    description,
    difficulty,
    totalTime,
    servings,
    rating,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    cuisine,
    tags,
    category-> {
      _id,
      title,
      slug,
      emoji,
      color
    }
  }
`)

// Total recipe count
export const RECIPES_COUNT_QUERY = defineQuery(`
  count(*[_type == "recipe"])
`)

// Single Recipe
export const RECIPE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    subcategory,
    cuisine,
    difficulty,
    servings,
    prepTime,
    cookTime,
    totalTime,
    restTime,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    author-> {
      _id,
      name,
      slug,
      role,
      emoji,
      avatar {
        asset->{
          _id,
          url
        }
      }
    },
    dateCreated,
    dateModified,
    tags,
    ingredients[] {
      _key,
      groupTitle,
      items[] {
        _key,
        amount,
        unit,
        name,
        notes
      }
    },
    instructions[] {
      _key,
      step,
      title,
      instruction,
      instructions,
      time,
      temperature,
      tip,
      timerDuration
    },
    nutrition {
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
      sodium
    },
    notes,
    variations,
    storage,
    rating,
    reviewCount,
    featured,
    isFamilyRecipe,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          _id,
          url
        }
      }
    },
    category-> {
      _id,
      title,
      slug,
      emoji,
      color
    },
    "related": *[_type == "recipe" && category._ref == ^.category._ref && slug.current != $slug] | order(_createdAt desc) [0...4] {
      _id,
      _type,
      title,
      slug,
      description,
      difficulty,
      totalTime,
      servings,
      rating,
      mainImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      },
      category-> {
        _id,
        title,
        slug,
        emoji,
        color
      }
    }
  }
`)

// Featured Recipes
export const FEATURED_RECIPES_QUERY = defineQuery(`
  *[_type == "recipe" && featured == true] | order(_createdAt desc) [0...$limit] {
    _id,
    _type,
    title,
    slug,
    description,
    difficulty,
    totalTime,
    servings,
    rating,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    category-> {
      _id,
      title,
      slug,
      emoji,
      color
    }
  }
`)

// Categories Page
export const CATEGORIES_PAGE_QUERY = defineQuery(`
  *[_type == "categoriesPage"][0] {
    _id,
    _type,
    hero {
      heading,
      description,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      }
    },
    emptyMessage
  }
`)

// All Categories
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && !(_id match "drafts.*")] | order(order asc) {
    _id,
    _type,
    title,
    slug,
    description,
    emoji,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    color {
      from,
      to
    },
    "recipeCount": count(*[_type == "recipe" && references(^._id)])
  }
`)

// Single Category
export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    emoji,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    color,
    featuredRecipes[]-> {
      _id,
      _type,
      title,
      slug,
      description,
      difficulty,
      totalTime,
      servings,
      rating,
      mainImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      }
    },
    pageContent {
      heading,
      longDescription
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          _id,
          url
        }
      }
    },
    "recipes": *[_type == "recipe" && references(^._id)] | order(_createdAt desc) {
      _id,
      _type,
      title,
      slug,
      description,
      difficulty,
      totalTime,
      servings,
      rating,
      mainImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      }
    }
  }
`)

// About Page
export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    _id,
    _type,
    hero {
      heading,
      description,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      }
    },
    mission {
      title,
      content
    },
    story {
      title,
      content,
      image {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        hotspot,
        crop
      }
    },
    values {
      title,
      items[] {
        title,
        description,
        icon
      }
    },
    team {
      title,
      description
    },
    showStats
  }
`)

// Team Members
export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "author" && isTeamMember == true] | order(name asc) {
    _id,
    _type,
    name,
    slug,
    role,
    description,
    emoji,
    avatar {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    socialLinks[] {
      platform,
      url
    }
  }
`)

// Search Page
export const SEARCH_PAGE_QUERY = defineQuery(`
  *[_type == "searchPage"][0] {
    _id,
    _type,
    heading,
    placeholder,
    noResultsHeading,
    noResultsMessage,
    suggestionsHeading
  }
`)

// Search Recipes
export const SEARCH_RECIPES_QUERY = defineQuery(`
  *[_type == "recipe" && (
    title match $query + "*" ||
    description match $query + "*" ||
    $query in tags ||
    ingredients[].items[].name match $query + "*"
  )] | order(rating desc) {
    _id,
    _type,
    title,
    slug,
    description,
    difficulty,
    totalTime,
    servings,
    rating,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    cuisine,
    tags,
    category-> {
      _id,
      title,
      slug,
      emoji,
      color
    }
  }
`)

// All Recipe Slugs (for generateStaticParams)
export const RECIPE_SLUGS_QUERY = defineQuery(`
  *[_type == "recipe"] {
    "slug": slug.current
  }
`)

// All Category Slugs (for generateStaticParams)
export const CATEGORY_SLUGS_QUERY = defineQuery(`
  *[_type == "category"] {
    "slug": slug.current
  }
`)
