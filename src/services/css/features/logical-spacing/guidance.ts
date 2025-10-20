/**
 * Logical Spacing Guidance - Implementation guidance for logical spacing properties
 */

import { ImplementationGuidance } from '../../types.js';

export const LOGICAL_SPACING_GUIDANCE: Record<string, ImplementationGuidance> = {
  'padding-inline': {
    basic_usage: '.element { padding-inline: 1rem; }',
    best_practices: [
      'Use logical properties for international layouts',
      'Combine with rem units for scalable spacing',
      'Prefer over padding-left/right for better RTL support',
      'Use padding-inline-start/end for fine control'
    ],
    fallbacks: [
      'Use padding-left/right for older browsers',
      'Provide CSS custom properties for direction-aware values',
      'Use Autoprefixer for automatic fallbacks'
    ],
    example_code: `
.card {
  padding-inline: 1.5rem;
  padding-block: 1rem;
  /* Fallback for older browsers */
  padding: 1rem 1.5rem;
}

/* RTL support automatically handled */
[dir="rtl"] .card {
  /* No additional styles needed */
}

/* Fine-grained control */
.asymmetric {
  padding-inline-start: 2rem;
  padding-inline-end: 1rem;
}`
  },
  'margin-inline': {
    basic_usage: '.element { margin-inline: auto; }',
    best_practices: [
      'Use margin-inline: auto for centering',
      'Combine with modern units like rem, ch, or vi',
      'Prefer over margin-left/right for international layouts',
      'Use negative values for overlapping effects'
    ],
    fallbacks: [
      'Use margin-left/right for older browsers',
      'Provide direction-specific fallbacks',
      'Use CSS custom properties for dynamic values'
    ],
    example_code: `
.centered {
  margin-inline: auto;
  max-width: 60ch;
  /* Fallback */
  margin-left: auto;
  margin-right: auto;
}

.offset {
  margin-inline-start: 2rem;
  margin-inline-end: 1rem;
}`
  },
  'scroll-margin-inline': {
    basic_usage: '.element { scroll-margin-inline: 1rem; }',
    best_practices: [
      'Use for scroll-aware spacing in carousels',
      'Combine with scroll-snap for better alignment',
      'Consider scroll-margin-block for vertical scrolling',
      'Use consistent values across scroll containers'
    ],
    fallbacks: [
      'Use JavaScript scroll positioning for older browsers',
      'Provide manual spacing adjustments',
      'Use intersection observer for scroll awareness'
    ],
    example_code: `
.carousel-item {
  scroll-margin-inline: 1rem;
  scroll-snap-align: start;
  /* Fallback */
  margin-left: 1rem;
  margin-right: 1rem;
}

.vertical-scroll .item {
  scroll-margin-block: 0.5rem;
  scroll-snap-align: start;
}`
  },
  'rem': {
    basic_usage: '.element { font-size: 1rem; padding: 1rem; }',
    best_practices: [
      'Use rem for consistent scaling across components',
      'Base rem on accessible font sizes (16px default)',
      'Combine with clamp() for responsive scaling',
      'Use for consistent spacing patterns'
    ],
    fallbacks: [
      'Provide pixel fallbacks for very old browsers',
      'Use progressive enhancement approach',
      'Consider em units for component-relative sizing'
    ],
    example_code: `
.component {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  padding: 1rem;
  margin-block: 1rem;
  /* Fallback */
  font-size: 16px;
}

/* Responsive scaling */
.responsive {
  width: clamp(16rem, 50vw, 60rem);
  padding: clamp(1rem, 2vw, 2rem);
}`
  }
};

export function getLogicalSpacingGuidance(property: string, needsFallback: boolean = false): ImplementationGuidance | null {
  const guidance = LOGICAL_SPACING_GUIDANCE[property];
  if (!guidance) return null;
  
  return {
    ...guidance,
    fallbacks: needsFallback ? guidance.fallbacks : []
  };
}