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
    'padding-inline': {
      basic_usage: '.element { padding-inline: 1rem; }',
      best_practices: [
        'Use logical properties for international layouts',
        'Combine with rem units for scalable spacing',
        'Prefer over padding-left/right for better RTL support',
        'Use padding-inline-start/end for fine control'
      ],
      fallbacks: needsFallback ? [
        'Use padding-left/right for older browsers',
        'Provide CSS custom properties for direction-aware values',
        'Use Autoprefixer for automatic fallbacks'
      ] : [],
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
      fallbacks: needsFallback ? [
        'Use margin-left/right for older browsers',
        'Provide direction-specific fallbacks',
        'Use CSS custom properties for dynamic values'
      ] : [],
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
    'border-inline': {
      basic_usage: '.element { border-inline: 1px solid #ccc; }',
      best_practices: [
        'Use logical border properties for directional layouts',
        'Combine with CSS custom properties for theming',
        'Use border-inline-start/end for asymmetric borders',
        'Consider border-inline-width for responsive borders'
      ],
      fallbacks: needsFallback ? [
        'Use border-left/right for older browsers',
        'Provide direction-specific border styles',
        'Use CSS feature queries for progressive enhancement'
      ] : [],
      example_code: `
.sidebar {
  border-inline-end: 1px solid var(--border-color);
  /* Fallback */
  border-right: 1px solid #ccc;
}

@supports (border-inline-end: 1px solid black) {
  .sidebar {
    border-right: none;
  }
}

/* Responsive borders */
@media (min-width: 768px) {
  .content {
    border-inline: 1px solid #e0e0e0;
  }
}`
    },
    'overflow-inline': {
      basic_usage: '.element { overflow-inline: scroll; }',
      best_practices: [
        'Use overflow-inline for horizontal scrolling',
        'Combine with scroll-snap for better UX',
        'Use overflow-block for vertical scrolling',
        'Consider overflow-clip-margin for precise control'
      ],
      fallbacks: needsFallback ? [
        'Use overflow-x/y for older browsers',
        'Provide JavaScript fallbacks for complex scrolling',
        'Use CSS feature queries for progressive enhancement'
      ] : [],
      example_code: `
.horizontal-scroll {
  overflow-inline: scroll;
  overflow-block: hidden;
  scroll-snap-type: inline mandatory;
  /* Fallback */
  overflow-x: scroll;
  overflow-y: hidden;
}

.item {
  scroll-snap-align: start;
  flex: 0 0 auto;
  width: 80vi;
}`
    },
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