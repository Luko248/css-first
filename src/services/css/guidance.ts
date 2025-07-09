/**
 * Implementation guidance and recommendations for CSS properties
 */

import { ImplementationGuidance } from './types.js';

/**
 * Generates browser support recommendations based on support information
 * @param supportInfo - Browser support information
 * @returns Human-readable recommendation string
 */
export function generateBrowserSupportRecommendation(supportInfo: any): string {
  const { overall_support } = supportInfo;
  
  if (overall_support >= 95) {
    return 'Excellent browser support. Safe to use in production without fallbacks.';
  } else if (overall_support >= 85) {
    return 'Good browser support. Consider fallbacks for legacy browsers if needed.';
  } else if (overall_support >= 70) {
    return 'Moderate browser support. Provide fallbacks for older browsers.';
  } else {
    return 'Limited browser support. Consider alternative approaches or polyfills.';
  }
}

/**
 * Gets alternative CSS properties when user declines a suggestion
 * @param declinedProperty - The CSS property that was declined
 * @returns Promise that resolves to alternative property suggestions
 */
export async function getAlternativeCSSProperties(declinedProperty: string): Promise<string[]> {
  const alternatives: Record<string, string[]> = {
    'scroll-snap-type': ['overflow-x with JavaScript', 'transform with JavaScript', 'intersection observer'],
    'display: grid': ['display: flex', 'float-based layout', 'inline-block layout'],
    'container-type': ['media queries', 'viewport units', 'JavaScript resize observer'],
    'css-scroll-snap': ['JavaScript carousel library', 'touch event handling', 'transform animations']
  };
  
  return alternatives[declinedProperty] || ['JavaScript-based solution', 'Traditional CSS approach'];
}

/**
 * Provides implementation guidance for approved CSS properties
 * @param cssProperty - The approved CSS property
 * @param needsFallback - Whether fallback solutions are needed
 * @returns Promise that resolves to implementation guidance
 */
export async function getImplementationGuidance(
  cssProperty: string,
  needsFallback: boolean = false
): Promise<ImplementationGuidance> {
  const guidance: Record<string, ImplementationGuidance> = {
    'overflow-x': {
      basic_usage: '.carousel { overflow-x: scroll; scroll-snap-type: x mandatory; }',
      best_practices: [
        'Hide scrollbars for better UX: scrollbar-width: none;',
        'Use scroll-behavior: smooth for better UX',
        'Ensure keyboard accessibility',
        'Add touch-action: pan-x for mobile'
      ],
      fallbacks: needsFallback ? [
        'Use JavaScript for browsers without scroll-snap support',
        'Provide navigation arrows for non-touch devices',
        'Add swipe gesture support with touch events'
      ] : [],
      example_code: `
<div class="carousel">
  <div class="carousel-item">Item 1</div>
  <div class="carousel-item">Item 2</div>
  <div class="carousel-item">Item 3</div>
</div>

<style>
.carousel {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

@media (max-width: 768px) {
  .carousel {
    scroll-snap-type: x proximity;
  }
}
</style>`
    },
    'scroll-snap-type': {
      basic_usage: '.container { scroll-snap-type: x mandatory; }',
      best_practices: [
        'Use "mandatory" for precise control, "proximity" for smoother scrolling',
        'Combine with scroll-snap-align on child elements',
        'Test on different devices and browsers',
        'Consider scroll-snap-stop for better control'
      ],
      fallbacks: needsFallback ? [
        'Polyfill for older browsers',
        'JavaScript-based snapping',
        'Touch event handling for mobile'
      ] : [],
      example_code: `
.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
}

.carousel-item {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  flex: 0 0 auto;
  width: 100%;
}

/* Fallback for older browsers */
@supports not (scroll-snap-type: x mandatory) {
  .carousel {
    /* JavaScript-based fallback */
  }
}`
    },
    'display': {
      basic_usage: '.container { display: flex; }',
      best_practices: [
        'Use flex for one-dimensional layouts',
        'Use grid for two-dimensional layouts',
        'Consider browser support for newer display values',
        'Test with different content lengths'
      ],
      fallbacks: needsFallback ? [
        'Use float-based layouts for very old browsers',
        'Provide inline-block fallbacks',
        'Consider CSS Grid fallbacks'
      ] : [],
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
    }
  };
  
  return guidance[cssProperty] || {
    basic_usage: `${cssProperty}: value;`,
    best_practices: ['Test across browsers', 'Consider accessibility', 'Optimize for performance'],
    fallbacks: needsFallback ? ['Provide JavaScript fallback', 'Use progressive enhancement'] : [],
    example_code: `
.element {
  ${cssProperty}: value;
}

/* Add your specific implementation here */`
  };
}