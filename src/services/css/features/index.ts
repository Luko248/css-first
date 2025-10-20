/**
 * CSS Features - Main index for all feature modules
 */

import { CSSFeature } from '../types.js';
import { LOGICAL_SPACING_FEATURES } from './logical-spacing/index.js';
import { FLEXBOX_FEATURES } from './layout/flexbox/index.js';
import { GRID_FEATURES } from './layout/grid/index.js';
import { ANIMATION_FEATURES } from './animation/index.js';
import { VISUAL_FEATURES } from './visual/index.js';
import { RESPONSIVE_FEATURES } from './responsive/index.js';
import { INTERACTION_FEATURES } from './interaction/index.js';
import { LOGICAL_FEATURES } from './logical/index.js';
import { POSITIONING_FEATURES } from './positioning/index.js';
import { DISPLAY_FEATURES } from './display/index.js';
import { MODERN_CSS_FEATURES } from './modern/index.js';

// Combine all features into a single registry
export const CSS_FEATURES: Record<string, CSSFeature> = {
  ...LOGICAL_SPACING_FEATURES,
  ...FLEXBOX_FEATURES,
  ...GRID_FEATURES,
  ...ANIMATION_FEATURES,
  ...VISUAL_FEATURES,
  ...RESPONSIVE_FEATURES,
  ...INTERACTION_FEATURES,
  ...LOGICAL_FEATURES,
  ...POSITIONING_FEATURES,
  ...DISPLAY_FEATURES,
  ...MODERN_CSS_FEATURES,
};

// Export individual feature modules
export { LOGICAL_SPACING_FEATURES, LOGICAL_SPACING_GUIDANCE, getLogicalSpacingGuidance } from './logical-spacing/index.js';
export { FLEXBOX_FEATURES, FLEXBOX_GUIDANCE, getFlexboxGuidance, GRID_FEATURES, GRID_GUIDANCE, getGridGuidance } from './layout/index.js';
export { ANIMATION_FEATURES, ANIMATION_GUIDANCE, getAnimationGuidance } from './animation/index.js';
export { VISUAL_FEATURES } from './visual/index.js';
export { RESPONSIVE_FEATURES } from './responsive/index.js';
export { INTERACTION_FEATURES } from './interaction/index.js';
export { LOGICAL_FEATURES } from './logical/index.js';
export { POSITIONING_FEATURES } from './positioning/index.js';
export { DISPLAY_FEATURES } from './display/index.js';
export { MODERN_CSS_FEATURES, MODERN_CSS_GUIDANCE, getModernCSSGuidance } from './modern/index.js';

// Re-export feature functions for backwards compatibility
export { getFeaturesByCategory, searchFeatures, getCarouselFeatures } from './utils.js';