/**
 * Responsive Properties - CSS responsive design features
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const RESPONSIVE_FEATURES: Record<string, CSSFeature> = {
  "container-queries": {
    name: "Container Queries",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: [
      "container-type",
      "container-name",
      "container",
      "@container",
    ],
    description: "Responsive design based on container size rather than viewport",
    support_level: "moderate",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries",
  },
  "media-queries": {
    name: "Media Queries",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: [
      "@media",
      "min-width",
      "max-width",
      "min-height",
      "max-height",
      "orientation",
      "aspect-ratio",
      "prefers-color-scheme",
      "prefers-reduced-motion",
    ],
    description: "Responsive design based on device characteristics",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries",
  },
};

export const RESPONSIVE_KEYWORDS = [
  'responsive',
  'media',
  'container',
  'queries',
  'breakpoint',
  'viewport',
  'mobile',
  'tablet',
  'desktop',
  'adaptive',
  'fluid',
  'flexible',
  'orientation',
  'aspect-ratio',
  'prefers-color-scheme',
  'prefers-reduced-motion'
];