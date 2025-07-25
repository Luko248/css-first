/**
 * Interaction Properties - CSS interactive features
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const INTERACTION_FEATURES: Record<string, CSSFeature> = {
  "scroll-snap": {
    name: "CSS Scroll Snap",
    category: CSSFeatureCategory.INTERACTION,
    properties: [
      "scroll-snap-type",
      "scroll-snap-align",
      "scroll-snap-stop",
      "scroll-behavior",
      "scroll-padding",
      "scroll-margin",
      "scroll-padding-top",
      "scroll-padding-right",
      "scroll-padding-bottom",
      "scroll-padding-left",
      "scroll-margin-top",
      "scroll-margin-right",
      "scroll-margin-bottom",
      "scroll-margin-left",
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
  'scroll-snap',
  'scroll-snap-type',
  'scroll-snap-align',
  'scroll-snap-stop',
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
  'indicators',
  'mandatory',
  'proximity',
  'start',
  'center',
  'end',
  'always',
  'padding',
  'margin'
];