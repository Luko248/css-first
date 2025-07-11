/**
 * Animation Properties - CSS animation and transition features
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const ANIMATION_FEATURES: Record<string, CSSFeature> = {
  transitions: {
    name: "CSS Transitions",
    category: CSSFeatureCategory.ANIMATION,
    properties: [
      "transition",
      "transition-property",
      "transition-duration",
      "transition-timing-function",
      "transition-delay",
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
      "animation-name",
      "animation-duration",
      "animation-timing-function",
      "animation-delay",
      "animation-iteration-count",
      "animation-direction",
      "animation-fill-mode",
      "animation-play-state",
    ],
    description: "Complex keyframe-based animations",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations",
  },
};

export const ANIMATION_KEYWORDS = [
  'animation',
  'transition',
  'keyframes',
  'animate',
  'smooth',
  'hover',
  'transform',
  'opacity',
  'scale',
  'rotate',
  'translate',
  'fade',
  'slide',
  'bounce',
  'ease',
  'duration',
  'delay'
];