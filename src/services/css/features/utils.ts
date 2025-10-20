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
import { LOGICAL_FEATURES } from './logical/index.js';
import { POSITIONING_FEATURES } from './positioning/index.js';
import { DISPLAY_FEATURES } from './display/index.js';
import { MODERN_CSS_FEATURES } from './modern/index.js';

// Combine all features including modern ones
const CSS_FEATURES = {
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

/**
 * Get CSS features by category
 */
export function getFeaturesByCategory(category: CSSFeatureCategory): CSSFeature[] {
  return Object.values(CSS_FEATURES).filter(
    (feature) => feature.category === category
  );
}

/**
 * Enhanced search CSS features by keywords with semantic understanding
 */
export function searchFeatures(keywords: string[]): CSSFeature[] {
  const results: { feature: CSSFeature; score: number }[] = [];
  const allFeatures = Object.values(CSS_FEATURES);

  for (const feature of allFeatures) {
    let score = 0;
    
    // Create searchable text from feature
    const featureText = `${feature.name} ${feature.description} ${feature.properties.join(" ")}`.toLowerCase();
    
    // Direct keyword matches in feature content
    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase();
      
      // Exact property match gets highest score
      if (feature.properties.some(prop => prop.toLowerCase() === lowerKeyword)) {
        score += 100;
      }
      // Property partial match
      else if (feature.properties.some(prop => prop.toLowerCase().includes(lowerKeyword))) {
        score += 50;
      }
      // Name match
      else if (feature.name.toLowerCase().includes(lowerKeyword)) {
        score += 30;
      }
      // Description match
      else if (feature.description.toLowerCase().includes(lowerKeyword)) {
        score += 20;
      }
      // General text match
      else if (featureText.includes(lowerKeyword)) {
        score += 10;
      }
    }
    
    // Semantic understanding bonuses
    score += getSemanticScore(keywords, feature);
    
    if (score > 0) {
      results.push({ feature, score });
    }
  }

  // Sort by score descending and return top features
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(result => result.feature);
}

/**
 * Get semantic score based on understanding developer intent
 */
function getSemanticScore(keywords: string[], feature: CSSFeature): number {
  let score = 0;
  const keywordText = keywords.join(' ').toLowerCase();
  
  // Mobile height patterns
  if (keywordText.includes('mobile') && keywordText.includes('height')) {
    if (feature.name.includes('Mobile Viewport Heights') || 
        feature.properties.includes('dvh') || 
        feature.properties.includes('svh')) {
      score += 200;
    }
  }
  
  // Header positioning patterns
  if (keywordText.includes('header') && (keywordText.includes('sticky') || keywordText.includes('fixed'))) {
    if (feature.name.includes('Positioning') || 
        feature.properties.includes('sticky') || 
        feature.properties.includes('fixed')) {
      score += 150;
    }
  }
  
  // Full height patterns
  if (keywordText.includes('full') && keywordText.includes('height')) {
    if (feature.properties.includes('height') || 
        feature.properties.includes('100vh') || 
        feature.properties.includes('dvh') ||
        feature.properties.includes('block-size')) {
      score += 100;
    }
  }
  
  // Carousel patterns - prioritize modern CSS-only carousel
  if (keywordText.includes('carousel') || keywordText.includes('slider')) {
    if (feature.name.includes('Modern CSS Carousel') || 
        feature.properties.includes('::scroll-marker') ||
        feature.properties.includes('::scroll-button()') ||
        feature.properties.includes(':target-current')) {
      score += 200; // Higher priority for modern carousel
    } else if (feature.name.includes('Carousel') || 
               feature.properties.includes('scroll-snap-type')) {
      score += 150;
    }
  }
  
  // Theme patterns
  if (keywordText.includes('theme') || keywordText.includes('dark') || keywordText.includes('light')) {
    if (feature.name.includes('Light-Dark') || 
        feature.properties.includes('light-dark') ||
        feature.properties.includes('color-scheme')) {
      score += 150;
    }
  }
  
  // View Transitions patterns
  if (keywordText.includes('view transition') || 
      keywordText.includes('view-transition') ||
      keywordText.includes('page transition') ||
      keywordText.includes('state change') ||
      keywordText.includes('morph') ||
      keywordText.includes('crossfade') ||
      keywordText.includes('scoped transition')) {
    if (feature.name.includes('View Transitions') || 
        feature.properties.includes('view-transition-name') ||
        feature.properties.includes('::view-transition')) {
      score += 200;
    }
  }
  
  // Form validation patterns
  if (keywordText.includes('form') && keywordText.includes('valid')) {
    if (feature.name.includes('Form Validation') || 
        feature.properties.includes(':user-valid') ||
        feature.properties.includes(':invalid')) {
      score += 150;
    }
  }
  
  return score;
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