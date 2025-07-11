/**
 * Visual Properties - CSS visual styling features
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const VISUAL_FEATURES: Record<string, CSSFeature> = {
  gradients: {
    name: "CSS Gradients",
    category: CSSFeatureCategory.VISUAL,
    properties: [
      "background-image",
      "linear-gradient",
      "radial-gradient",
      "conic-gradient",
      "repeating-linear-gradient",
      "repeating-radial-gradient",
    ],
    description: "Smooth color transitions and gradient backgrounds",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients",
  },
  transforms: {
    name: "CSS Transforms",
    category: CSSFeatureCategory.VISUAL,
    properties: [
      "transform",
      "transform-origin",
      "transform-style",
      "perspective",
      "perspective-origin",
      "backface-visibility",
      "scale",
      "rotate",
      "translate",
      "skew",
    ],
    description: "2D and 3D transformations of elements",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms",
  },
  "border-logical": {
    name: "Logical Border Properties",
    category: CSSFeatureCategory.VISUAL,
    properties: [
      "border-inline",
      "border-block",
      "border-inline-start",
      "border-inline-end",
      "border-block-start",
      "border-block-end",
      "border-inline-width",
      "border-block-width",
      "border-inline-style",
      "border-block-style",
      "border-inline-color",
      "border-block-color",
    ],
    description: "Logical border properties that adapt to writing direction",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties",
  },
  "overflow-logical": {
    name: "Logical Overflow Properties",
    category: CSSFeatureCategory.LAYOUT,
    properties: [
      "overflow-inline",
      "overflow-block",
      "text-overflow",
      "overflow-wrap",
      "overflow-anchor",
      "overflow-clip-margin",
    ],
    description: "Logical overflow properties for directional content handling",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Overflow",
  },
};

export const VISUAL_KEYWORDS = [
  'gradient',
  'linear-gradient',
  'radial-gradient',
  'conic-gradient',
  'background',
  'color',
  'transform',
  'scale',
  'rotate',
  'translate',
  'skew',
  'perspective',
  '3d',
  'border',
  'outline',
  'overflow',
  'clip',
  'shadow',
  'visual',
  'styling'
];