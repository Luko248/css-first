/**
 * Flexbox Properties - CSS flexbox layout features
 */

import { CSSFeature, CSSFeatureCategory } from '../../../types.js';

export const FLEXBOX_FEATURES: Record<string, CSSFeature> = {
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
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout",
  },
};

export const FLEXBOX_KEYWORDS = [
  'flexbox',
  'flex',
  'layout',
  'center',
  'align',
  'justify',
  'wrap',
  'direction',
  'gap',
  'grow',
  'shrink',
  'basis'
];