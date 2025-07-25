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
};

// Export individual feature modules
export { LOGICAL_SPACING_FEATURES, LOGICAL_SPACING_GUIDANCE, LOGICAL_SPACING_SYNTAX, LOGICAL_SPACING_USE_CASES, extractLogicalSpacingKeywords, getLogicalSpacingGuidance } from './logical-spacing/index.js';
export { FLEXBOX_FEATURES, FLEXBOX_GUIDANCE, FLEXBOX_SYNTAX, FLEXBOX_USE_CASES, extractFlexboxKeywords, getFlexboxGuidance, GRID_FEATURES, GRID_GUIDANCE, GRID_SYNTAX, GRID_USE_CASES, extractGridKeywords, getGridGuidance } from './layout/index.js';
export { ANIMATION_FEATURES, ANIMATION_GUIDANCE, ANIMATION_SYNTAX, ANIMATION_USE_CASES, extractAnimationKeywords, getAnimationGuidance } from './animation/index.js';
export { VISUAL_FEATURES } from './visual/index.js';
export { RESPONSIVE_FEATURES } from './responsive/index.js';
export { INTERACTION_FEATURES } from './interaction/index.js';
export { LOGICAL_FEATURES } from './logical/index.js';
export { POSITIONING_FEATURES } from './positioning/index.js';
export { DISPLAY_FEATURES } from './display/index.js';

// Re-export feature functions for backwards compatibility
export { getFeaturesByCategory, searchFeatures, getCarouselFeatures } from './utils.js';