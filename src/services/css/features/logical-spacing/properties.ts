/**
 * Logical Spacing Properties - CSS features for directional spacing
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const LOGICAL_SPACING_FEATURES: Record<string, CSSFeature> = {
  "logical-spacing": {
    name: "Logical Spacing Properties",
    category: CSSFeatureCategory.LAYOUT,
    properties: [
      "padding-inline",
      "padding-block",
      "padding-inline-start",
      "padding-inline-end",
      "padding-block-start",
      "padding-block-end",
      "margin-inline",
      "margin-block",
      "margin-inline-start",
      "margin-inline-end",
      "margin-block-start",
      "margin-block-end",
      "scroll-margin-inline",
      "scroll-margin-block",
      "scroll-margin-inline-start",
      "scroll-margin-inline-end",
      "scroll-margin-block-start",
      "scroll-margin-block-end",
    ],
    description: "Logical properties for spacing that adapt to writing direction and text flow",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties",
  },
  "spacing-units": {
    name: "Modern CSS Units",
    category: CSSFeatureCategory.LAYOUT,
    properties: [
      "rem",
      "em",
      "ch",
      "ex",
      "lh",
      "vw",
      "vh",
      "vmin",
      "vmax",
      "vi",
      "vb",
      "svw",
      "svh",
      "lvw",
      "lvh",
      "dvw",
      "dvh",
    ],
    description: "Modern relative units for responsive and accessible sizing",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units",
  },
};

export const LOGICAL_SPACING_KEYWORDS = [
  'logical-spacing',
  'spacing-units',
  'padding',
  'margin',
  'scroll-margin',
  'spacing',
  'inline',
  'block',
  'rem',
  'em',
  'ch',
  'vi',
  'vb'
];