/**
 * Flexbox Guidance - Implementation guidance for flexbox properties
 */

import { ImplementationGuidance } from '../../../types.js';

export const FLEXBOX_GUIDANCE: Record<string, ImplementationGuidance> = {
  'display': {
    basic_usage: '.container { display: flex; }',
    best_practices: [
      'Use flex for one-dimensional layouts',
      'Use grid for two-dimensional layouts',
      'Consider browser support for newer display values',
      'Test with different content lengths'
    ],
    fallbacks: [
      'Use float-based layouts for very old browsers',
      'Provide inline-block fallbacks',
      'Consider CSS Grid fallbacks'
    ],
    example_code: `
.carousel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}

.carousel-item {
  flex: 0 0 auto;
  min-width: 200px;
}

/* Fallback for older browsers */
.no-flexbox .carousel {
  display: block;
  white-space: nowrap;
}

.no-flexbox .carousel-item {
  display: inline-block;
  vertical-align: top;
  white-space: normal;
}`
  },
  'justify-content': {
    basic_usage: '.container { justify-content: center; }',
    best_practices: [
      'Use space-between for equal distribution',
      'Use center for centering content',
      'Use flex-start/flex-end for directional alignment',
      'Combine with align-items for full control'
    ],
    fallbacks: [
      'Use text-align for horizontal centering',
      'Use margin auto for centering',
      'Provide manual spacing with margins'
    ],
    example_code: `
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.navigation {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}`
  },
  'align-items': {
    basic_usage: '.container { align-items: center; }',
    best_practices: [
      'Use center for vertical centering',
      'Use stretch for equal height items',
      'Use baseline for text alignment',
      'Consider align-self for individual items'
    ],
    fallbacks: [
      'Use vertical-align for inline elements',
      'Use line-height for text centering',
      'Provide manual padding for vertical spacing'
    ],
    example_code: `
.card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.form-group {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.media-object {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}`
  },
  'gap': {
    basic_usage: '.container { gap: 1rem; }',
    best_practices: [
      'Use gap instead of margins between flex items',
      'Combine with rem units for consistent spacing',
      'Use row-gap and column-gap for fine control',
      'Consider responsive gap values'
    ],
    fallbacks: [
      'Use margins on child elements',
      'Use padding on container',
      'Provide spacing with pseudo-elements'
    ],
    example_code: `
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Responsive gap */
.responsive-grid {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 1.5rem);
}`
  }
};

export function getFlexboxGuidance(property: string, needsFallback: boolean = false): ImplementationGuidance | null {
  const guidance = FLEXBOX_GUIDANCE[property];
  if (!guidance) return null;
  
  return {
    ...guidance,
    fallbacks: needsFallback ? guidance.fallbacks : []
  };
}