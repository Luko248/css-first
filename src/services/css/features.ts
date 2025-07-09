/**
 * CSS feature suggestions and categorization
 */

import { CSSFeature, CSSFeatureCategory } from "./types.js";

/**
 * Database of CSS features organized by category
 */
export const CSS_FEATURES: Record<string, CSSFeature> = {
  // Layout Features
  flexbox: {
    name: "Flexbox",
    category: CSSFeatureCategory.LAYOUT,
    properties: [
      "display",
      "flex-direction",
      "justify-content",
      "align-items",
      "flex-wrap",
      "flex-flow",
      "gap",
      "row-gap",
      "column-gap",
      "flex",
      "flex-grow",
      "flex-shrink",
      "flex-basis",
      "flex-order",
    ],
    description: "Flexible box layout for one-dimensional layouts",
    support_level: "excellent",
    mdn_url:
      "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout",
  },
  grid: {
    name: "CSS Grid",
    category: CSSFeatureCategory.LAYOUT,
    properties: [
      "display",
      "grid-template-columns",
      "grid-template-rows",
      "gap",
      "row-gap",
      "column-gap",
      "grid-column",
      "grid-row",
      "grid-column-start",
      "grid-column-end",
      "grid-row-start",
      "grid-row-end",
      "grid-area",
      "grid-template-areas",
      "grid-template",
    ],
    description: "Two-dimensional grid layout system",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
  },
  "scroll-snap": {
    name: "Scroll Snap",
    category: CSSFeatureCategory.INTERACTION,
    properties: ["scroll-snap-type", "scroll-snap-align", "scroll-behavior"],
    description:
      "Control scroll snapping behavior for carousels and scrollable content",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap",
  },
  "css-carousel": {
    name: "Modern CSS Carousel with Pseudo-Elements",
    category: CSSFeatureCategory.INTERACTION,
    properties: [
      "::scroll-button()",
      "::scroll-marker-group",
      "::scroll-marker",
      "::column",
      ":target-current",
    ],
    description:
      "Latest CSS carousel with auto-generated buttons and markers using pseudo-elements",
    support_level: "limited",
    mdn_url:
      "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_overflow/CSS_carousels",
  },

  // Animation Features
  transitions: {
    name: "CSS Transitions",
    category: CSSFeatureCategory.ANIMATION,
    properties: [
      "transition",
      "transition-property",
      "transition-duration",
      "transition-timing-function",
    ],
    description: "Smooth animations between property changes",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions",
  },
  animations: {
    name: "CSS Animations",
    category: CSSFeatureCategory.ANIMATION,
    properties: [
      "animation",
      "keyframes",
      "animation-duration",
      "animation-timing-function",
    ],
    description: "Complex keyframe-based animations",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations",
  },

  // Visual Features
  gradients: {
    name: "CSS Gradients",
    category: CSSFeatureCategory.VISUAL,
    properties: [
      "background-image",
      "linear-gradient",
      "radial-gradient",
      "conic-gradient",
    ],
    description: "Smooth color transitions and gradient backgrounds",
    support_level: "excellent",
    mdn_url:
      "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients",
  },
  transforms: {
    name: "CSS Transforms",
    category: CSSFeatureCategory.VISUAL,
    properties: [
      "transform",
      "transform-origin",
      "scale",
      "rotate",
      "translate",
    ],
    description: "2D and 3D transformations of elements",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms",
  },

  // Responsive Features
  "container-queries": {
    name: "Container Queries",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: ["container-type", "container-name", "@container"],
    description:
      "Responsive design based on container size rather than viewport",
    support_level: "moderate",
    mdn_url:
      "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries",
  },
  "media-queries": {
    name: "Media Queries",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: ["@media", "min-width", "max-width", "orientation"],
    description: "Responsive design based on device characteristics",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries",
  },
};

/**
 * Get CSS features by category
 */
export function getFeaturesByCategory(
  category: CSSFeatureCategory
): CSSFeature[] {
  return Object.values(CSS_FEATURES).filter(
    (feature) => feature.category === category
  );
}

/**
 * Search CSS features by keywords
 */
export function searchFeatures(keywords: string[]): CSSFeature[] {
  const results: CSSFeature[] = [];

  for (const feature of Object.values(CSS_FEATURES)) {
    const featureText = `${feature.name} ${
      feature.description
    } ${feature.properties.join(" ")}`.toLowerCase();

    if (
      keywords.some((keyword) => featureText.includes(keyword.toLowerCase()))
    ) {
      results.push(feature);
    }
  }

  return results;
}

/**
 * Get feature suggestions for carousel implementation
 */
export function getCarouselFeatures(): CSSFeature[] {
  return [
    CSS_FEATURES["css-carousel"],
    CSS_FEATURES["scroll-snap"],
    CSS_FEATURES["flexbox"],
    CSS_FEATURES["transitions"],
  ];
}
