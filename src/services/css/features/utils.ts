/**
 * Feature utilities - Helper functions for working with CSS features
 */

import { CSSFeature, CSSFeatureCategory } from '../types.js';
import { LOGICAL_SPACING_FEATURES } from './logical-spacing/index.js';
import { FLEXBOX_FEATURES } from './layout/flexbox/index.js';
import { GRID_FEATURES } from './layout/grid/index.js';
import { ANIMATION_FEATURES } from './animation/index.js';
import { VISUAL_FEATURES } from './visual/index.js';
import { RESPONSIVE_FEATURES } from './responsive/index.js';
import { INTERACTION_FEATURES } from './interaction/index.js';

// Combine all features
const CSS_FEATURES = {
  ...LOGICAL_SPACING_FEATURES,
  ...FLEXBOX_FEATURES,
  ...GRID_FEATURES,
  ...ANIMATION_FEATURES,
  ...VISUAL_FEATURES,
  ...RESPONSIVE_FEATURES,
  ...INTERACTION_FEATURES,
};

/**
 * Get CSS features by category
 */
export function getFeaturesByCategory(category: CSSFeatureCategory): CSSFeature[] {
  return Object.values(CSS_FEATURES).filter(
    (feature) => feature.category === category
  );
}

/**
 * Search CSS features by keywords
 */
export function searchFeatures(keywords: string[]): CSSFeature[] {
  const results: CSSFeature[] = [];

  for (const feature of Object.values(CSS_FEATURES)) {
    const featureText = `${feature.name} ${
      feature.description
    } ${feature.properties.join(" ")}`.toLowerCase();

    if (
      keywords.some((keyword) => featureText.includes(keyword.toLowerCase()))
    ) {
      results.push(feature);
    }
  }

  return results;
}

/**
 * Get feature suggestions for carousel implementation
 */
export function getCarouselFeatures(): CSSFeature[] {
  return [
    CSS_FEATURES["css-carousel"],
    CSS_FEATURES["scroll-snap"],
    CSS_FEATURES["flexbox"],
    CSS_FEATURES["transitions"],
  ].filter(Boolean);
}