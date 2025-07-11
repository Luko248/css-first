/**
 * Interaction Properties - CSS interactive features
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const INTERACTION_FEATURES: Record<string, CSSFeature> = {
  "scroll-snap": {
    name: "Scroll Snap",
    category: CSSFeatureCategory.INTERACTION,
    properties: [
      "scroll-snap-type",
      "scroll-snap-align",
      "scroll-behavior",
      "scroll-snap-stop",
      "scroll-padding",
      "scroll-margin",
    ],
    description: "Control scroll snapping behavior for carousels and scrollable content",
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
    description: "Latest CSS carousel with auto-generated buttons and markers using pseudo-elements",
    support_level: "limited",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_overflow/CSS_carousels",
  },
};

export const INTERACTION_KEYWORDS = [
  'scroll',
  'snap',
  'carousel',
  'slider',
  'gallery',
  'interaction',
  'behavior',
  'touch',
  'swipe',
  'navigation',
  'buttons',
  'markers',
  'indicators'
];