/**
 * Positioning Properties - CSS anchor positioning and related features
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const POSITIONING_FEATURES: Record<string, CSSFeature> = {
  "anchor-positioning": {
    name: "CSS Anchor Positioning",
    category: CSSFeatureCategory.POSITIONING,
    properties: [
      "anchor-name",
      "position-anchor",
      "position-area",
      "position-try-fallbacks",
      "position-try-order",
      "position-try",
      "position-visibility",
      "@position-try"
    ],
    description: "Anchor positioning allows elements to be positioned relative to other elements, enabling tooltips, popovers, and contextual UI",
    support_level: "limited",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning",
  },
  "anchor-name": {
    name: "Anchor Name",
    category: CSSFeatureCategory.POSITIONING,
    properties: ["anchor-name"],
    description: "Defines an anchor name for an element that can be referenced by positioned elements",
    support_level: "limited",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/anchor-name",
  },
  "position-anchor": {
    name: "Position Anchor",
    category: CSSFeatureCategory.POSITIONING,
    properties: ["position-anchor"],
    description: "Specifies which anchor element to position relative to",
    support_level: "limited",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position-anchor",
  },
  "position-area": {
    name: "Position Area",
    category: CSSFeatureCategory.POSITIONING,
    properties: ["position-area"],
    description: "Defines the area around an anchor element where the positioned element should be placed",
    support_level: "limited",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position-area",
  },
  "position-try": {
    name: "Position Try Properties",
    category: CSSFeatureCategory.POSITIONING,
    properties: [
      "position-try-fallbacks",
      "position-try-order",
      "position-try"
    ],
    description: "Provides fallback positioning strategies when the preferred anchor position doesn't fit",
    support_level: "limited",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position-try",
  },
  "position-visibility": {
    name: "Position Visibility",
    category: CSSFeatureCategory.POSITIONING,
    properties: ["position-visibility"],
    description: "Controls the visibility of positioned elements when they would be clipped or overflow",
    support_level: "limited",  
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position-visibility",
  },
  "position-try-at-rule": {
    name: "Position Try At-Rule",
    category: CSSFeatureCategory.POSITIONING,
    properties: ["@position-try"],
    description: "Defines named position try strategies that can be referenced by position-try-fallbacks",
    support_level: "limited",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@position-try",
  },
  "anchor-functions": {
    name: "Anchor Functions",
    category: CSSFeatureCategory.POSITIONING,
    properties: [
      "anchor()",
      "anchor-size()"
    ],
    description: "CSS functions for positioning elements relative to anchor elements and using anchor dimensions",
    support_level: "limited",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/anchor",
  }
};

export const POSITIONING_KEYWORDS = [
  'anchor',
  'anchor-name',
  'position-anchor',
  'position-area',
  'position-try',
  'position-try-fallbacks',
  'position-try-order',
  'position-visibility',
  '@position-try',
  'anchor()',
  'anchor-size()',
  'tooltip',
  'popover',
  'positioning',
  'relative positioning',
  'contextual ui',
  'floating elements'
];