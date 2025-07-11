/**
 * CSS Grid Properties - CSS grid layout features
 */

import { CSSFeature, CSSFeatureCategory } from '../../../types.js';

export const GRID_FEATURES: Record<string, CSSFeature> = {
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
};

export const GRID_KEYWORDS = [
  'grid',
  'layout',
  'columns',
  'rows',
  'template',
  'area',
  'gap',
  'span',
  'repeat',
  'fr',
  'minmax',
  'auto-fit',
  'auto-fill'
];