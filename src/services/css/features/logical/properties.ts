/**
 * Logical Properties - CSS logical operators and conditional functions
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const LOGICAL_FEATURES: Record<string, CSSFeature> = {
  "css-if": {
    name: "CSS if() Function",
    category: CSSFeatureCategory.LOGICAL,
    properties: [
      "if()",
    ],
    description: "Conditional function that returns values based on logical conditions",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/if",
  },
};

export const LOGICAL_KEYWORDS = [
  'if',
  'conditional',
  'function',
  'logical',
  'operators',
  'condition',
  'expression',
  'boolean',
  'true',
  'false',
  'comparison',
  'calculation'
];