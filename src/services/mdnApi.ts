// Service for MDN API integration and CSS property management

/**
 * Represents a CSS property suggestion with comprehensive information
 */
export interface CSSPropertySuggestion {
  /** The CSS property name */
  property: string;
  /** Human-readable description of the property */
  description: string;
  /** CSS syntax example */
  syntax: string;
  /** Browser support information */
  browser_support: {
    /** Overall browser support percentage */
    overall_support: number;
    /** Whether modern browsers support this property */
    modern_browsers: boolean;
    /** Level of legacy browser support */
    legacy_support: string;
  };
  /** Common use cases for this property */
  use_cases: string[];
  /** MDN documentation URL */
  mdn_url: string;
}

/**
 * Detailed browser support information for a CSS property
 */
export interface BrowserSupportInfo {
  /** Overall browser support percentage */
  overall_support: number;
  /** Browser-specific support information */
  browsers: {
    /** Chrome browser support */
    chrome: { version: string; support: string };
    /** Firefox browser support */
    firefox: { version: string; support: string };
    /** Safari browser support */
    safari: { version: string; support: string };
    /** Edge browser support */
    edge: { version: string; support: string };
  };
  /** List of experimental features */
  experimental_features: string[];
}

/**
 * Detailed information about a CSS property
 */
export interface CSSPropertyDetails {
  /** Property description */
  description: string;
  /** CSS syntax */
  syntax: string;
  /** Possible values */
  values: string[];
  /** Code examples */
  examples: string[];
  /** Related CSS properties */
  related_properties: string[];
}

/**
 * Implementation guidance for using a CSS property
 */
export interface ImplementationGuidance {
  /** Basic usage example */
  basic_usage: string;
  /** Best practices for using this property */
  best_practices: string[];
  /** Fallback strategies for older browsers */
  fallbacks: string[];
  /** Complete example code */
  example_code: string;
}

/** Base URL for MDN CSS documentation */
const MDN_CSS_BASE_URL = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

/**
 * Fetches an MDN page for a specific CSS property
 * @param cssProperty - The CSS property name to fetch documentation for
 * @returns Promise that resolves to the HTML content of the MDN page
 * @throws Error if the MDN page cannot be fetched
 */
export async function fetchMDNPage(cssProperty: string): Promise<string> {
  const url = `${MDN_CSS_BASE_URL}/${cssProperty}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch MDN page for ${cssProperty}`);
  }
  return await response.text();
}

/**
 * Extracts relevant CSS keywords from a task description
 * @param description - The UI task description to analyze
 * @returns Array of CSS-related keywords that match the description
 */
export function extractCSSKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDesc = description.toLowerCase();

  // Layout keywords
  if (lowerDesc.includes('center') || lowerDesc.includes('align')) {
    keywords.push('flexbox', 'grid', 'text-align', 'justify-content', 'align-items');
  }
  if (lowerDesc.includes('layout') || lowerDesc.includes('position')) {
    keywords.push('flexbox', 'grid', 'position', 'display');
  }
  if (lowerDesc.includes('responsive')) {
    keywords.push('media-queries', 'flexbox', 'grid', 'container-queries');
  }
  if (lowerDesc.includes('viewport') || lowerDesc.includes('vw') || lowerDesc.includes('vh') || lowerDesc.includes('screen size')) {
    keywords.push('viewport-units', 'dynamic-viewport', 'small-viewport', 'large-viewport');
  }
  if (lowerDesc.includes('writing mode') || lowerDesc.includes('rtl') || lowerDesc.includes('ltr') || lowerDesc.includes('logical')) {
    keywords.push('logical-properties', 'writing-mode');
  }
  if (lowerDesc.includes('auto-fit') || lowerDesc.includes('auto-fill') || lowerDesc.includes('repeat') || lowerDesc.includes('same layout')) {
    keywords.push('grid-repeat', 'grid-auto-fit', 'grid-auto-fill');
  }
  if (lowerDesc.includes('complex layout') || lowerDesc.includes('grid area') || lowerDesc.includes('template area')) {
    keywords.push('grid-template-areas', 'grid-areas');
  }
  if (lowerDesc.includes('z-index') || lowerDesc.includes('stacking') || lowerDesc.includes('layer order')) {
    keywords.push('css-isolation', 'stacking-context');
  }

  // Visual keywords
  if (lowerDesc.includes('animation') || lowerDesc.includes('transition')) {
    keywords.push('animation', 'transition', 'transform');
  }
  if (lowerDesc.includes('view transition') || lowerDesc.includes('page transition') || lowerDesc.includes('route transition')) {
    keywords.push('view-transitions', 'view-transition-name');
  }
  if (lowerDesc.includes('shadow') || lowerDesc.includes('drop-shadow')) {
    keywords.push('box-shadow', 'drop-shadow', 'filter');
  }
  if (lowerDesc.includes('gradient')) {
    keywords.push('linear-gradient', 'radial-gradient', 'conic-gradient');
  }
  if (lowerDesc.includes('border') || lowerDesc.includes('outline')) {
    keywords.push('border', 'outline', 'border-radius');
  }
  if (lowerDesc.includes('rounded') || lowerDesc.includes('border-radius') || lowerDesc.includes('circular')) {
    keywords.push('border-radius', 'vmin-vmax-units');
  }
  if (lowerDesc.includes('margin') || lowerDesc.includes('padding') || lowerDesc.includes('spacing')) {
    keywords.push('logical-properties', 'margin-padding-logical');
  }

  // Interaction keywords
  if (lowerDesc.includes('hover') || lowerDesc.includes('focus')) {
    keywords.push('hover', 'focus', 'active', 'focus-visible');
  }
  if (lowerDesc.includes('scroll')) {
    keywords.push('scroll-behavior', 'overflow', 'scroll-snap');
  }
  if (lowerDesc.includes('scroll behavior') || lowerDesc.includes('smooth scroll') || lowerDesc.includes('scroll animation')) {
    keywords.push('scroll-behavior', 'scroll-timeline');
  }
  if (lowerDesc.includes('overflow') || lowerDesc.includes('scroll container') || lowerDesc.includes('scrollable')) {
    keywords.push('overflow-behavior', 'scroll-snap', 'overscroll-behavior');
  }
  if (lowerDesc.includes('accordion') || lowerDesc.includes('collapsible') || lowerDesc.includes('expand')) {
    keywords.push('details-content', 'accordion-styling');
  }

  // Typography keywords
  if (lowerDesc.includes('text') || lowerDesc.includes('font')) {
    keywords.push('font-family', 'font-size', 'line-height', 'text-align');
  }
  if (lowerDesc.includes('text cut') || lowerDesc.includes('line height') || lowerDesc.includes('text trim') || lowerDesc.includes('leading')) {
    keywords.push('text-box-trim', 'leading-trim');
  }

  // Color keywords
  if (lowerDesc.includes('color') || lowerDesc.includes('background')) {
    keywords.push('color', 'background-color', 'background-image', 'relative-colors');
  }
  if (lowerDesc.includes('color mix') || lowerDesc.includes('blend colors') || lowerDesc.includes('mix colors')) {
    keywords.push('color-mix', 'color-blend');
  }

  // Modern CSS Features
  if (lowerDesc.includes('carousel') || lowerDesc.includes('slider') || lowerDesc.includes('slide')) {
    keywords.push('scroll-snap', 'scroll-driven-animations', 'css-carousel');
  }
  if (lowerDesc.includes('tooltip') || lowerDesc.includes('popover') || lowerDesc.includes('popup')) {
    keywords.push('anchor-positioning', 'popover-api', 'tooltip-positioning');
  }
  if (lowerDesc.includes('layer') || lowerDesc.includes('specificity') || lowerDesc.includes('cascade')) {
    keywords.push('css-layers', 'cascade-layers');
  }
  if (lowerDesc.includes('support') || lowerDesc.includes('feature detection') || lowerDesc.includes('fallback')) {
    keywords.push('css-supports', 'feature-queries');
  }
  if (lowerDesc.includes('selector') || lowerDesc.includes('target') || lowerDesc.includes('match')) {
    keywords.push('modern-selectors', 'css-is', 'css-where', 'css-has');
  }
  if (lowerDesc.includes('relative color') || lowerDesc.includes('color transformation') || lowerDesc.includes('color manipulation')) {
    keywords.push('relative-colors', 'color-functions');
  }
  if (lowerDesc.includes('container query') || lowerDesc.includes('parent container') || lowerDesc.includes('container style')) {
    keywords.push('container-style-queries', 'container-queries', 'container-query-units');
  }
  if (lowerDesc.includes('scroll state') || lowerDesc.includes('scroll position') || lowerDesc.includes('container scroll')) {
    keywords.push('container-scroll-state', 'scroll-state-queries');
  }
  if (lowerDesc.includes('conditional css') || lowerDesc.includes('@if') || lowerDesc.includes('css conditions')) {
    keywords.push('css-conditionals', 'css-if');
  }
  if (lowerDesc.includes('@rule') || lowerDesc.includes('at-rule') || lowerDesc.includes('css rule')) {
    keywords.push('css-at-rules', 'at-rules');
  }

  return [...new Set(keywords)];
}

/**
 * Searches for CSS properties based on extracted keywords and approach preference
 * @param keywords - Array of CSS-related keywords to search for
 * @param approach - The preferred CSS approach ('modern', 'compatible', or 'progressive')
 * @returns Promise that resolves to an array of CSS property suggestions
 */
export async function searchMDNForCSSProperties(keywords: string[], approach: string): Promise<CSSPropertySuggestion[]> {
  const suggestions: CSSPropertySuggestion[] = [];

  // CSS property mappings based on keywords
  const propertyMappings: Record<string, CSSPropertySuggestion> = {
    flexbox: {
      property: 'flexbox',
      description: 'CSS Flexbox Layout for flexible and responsive designs',
      syntax: 'display: flex; justify-content: center; align-items: center;',
      browser_support: {
        overall_support: 96,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['centering content', 'responsive layouts', 'equal height columns'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Flexible_Box_Layout`,
    },
    grid: {
      property: 'grid',
      description: 'CSS Grid Layout for two-dimensional layouts',
      syntax: 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px;',
      browser_support: {
        overall_support: 92,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['complex layouts', 'two-dimensional alignment', 'responsive grids'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Grid_Layout`,
    },
    animation: {
      property: 'animation',
      description: 'CSS animations for smooth transitions and effects',
      syntax: 'animation: slideIn 0.5s ease-in-out;',
      browser_support: {
        overall_support: 94,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['smooth transitions', 'loading indicators', 'micro-interactions'],
      mdn_url: `${MDN_CSS_BASE_URL}/animation`,
    },
    transition: {
      property: 'transition',
      description: 'CSS transitions for smooth property changes',
      syntax: 'transition: all 0.3s ease;',
      browser_support: {
        overall_support: 96,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['hover effects', 'smooth state changes', 'button interactions'],
      mdn_url: `${MDN_CSS_BASE_URL}/transition`,
    },
    'container-queries': {
      property: 'container-queries',
      description: 'CSS Container Queries for component-based responsive design',
      syntax: '@container (min-width: 300px) { .card { flex-direction: row; } }',
      browser_support: {
        overall_support: 75,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['component-based responsive design', 'modular layouts', 'context-aware styling'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Container_Queries`,
    },
    'scroll-snap': {
      property: 'scroll-snap',
      description: 'CSS Scroll Snap for carousels and controlled scrolling experiences',
      syntax: 'scroll-snap-type: x mandatory; scroll-snap-align: start;',
      browser_support: {
        overall_support: 88,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['image carousels', 'horizontal scrolling sections', 'page-based navigation'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Scroll_Snap`,
    },
    'css-carousel': {
      property: 'css-carousel',
      description: 'Pure CSS carousel implementation using scroll-snap and scroll-driven animations',
      syntax: 'scroll-snap-type: x mandatory; scroll-behavior: smooth; overflow-x: auto;',
      browser_support: {
        overall_support: 85,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['image galleries', 'product showcases', 'testimonial sliders'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Scroll_Snap`,
    },
    'scroll-driven-animations': {
      property: 'scroll-driven-animations',
      description: 'CSS animations triggered by scroll position for interactive carousels',
      syntax: 'animation-timeline: scroll(); animation-range: entry 0% exit 100%;',
      browser_support: {
        overall_support: 65,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['scroll-triggered animations', 'progress indicators', 'parallax effects'],
      mdn_url: `${MDN_CSS_BASE_URL}/scroll-driven_animations`,
    },
    'anchor-positioning': {
      property: 'anchor-positioning',
      description: 'CSS Anchor Positioning for tooltips and popover positioning relative to anchor elements',
      syntax: 'position-anchor: --anchor-name; position: absolute; top: anchor(bottom);',
      browser_support: {
        overall_support: 45,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['tooltips', 'dropdown menus', 'popover dialogs', 'contextual overlays'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_anchor_positioning`,
    },
    'popover-api': {
      property: 'popover-api',
      description: 'CSS and HTML Popover API for accessible tooltip and dialog positioning',
      syntax: 'popover: auto; position-anchor: --tooltip-anchor;',
      browser_support: {
        overall_support: 55,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['accessible tooltips', 'modal dialogs', 'context menus', 'help overlays'],
      mdn_url: `${MDN_CSS_BASE_URL}/popover`,
    },
    'css-layers': {
      property: 'css-layers',
      description: 'CSS Cascade Layers for managing CSS specificity and component styling',
      syntax: '@layer base, components, utilities; @layer components { .button { color: blue; } }',
      browser_support: {
        overall_support: 78,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['component libraries', 'design systems', 'specificity management', 'CSS architecture'],
      mdn_url: `${MDN_CSS_BASE_URL}/@layer`,
    },
    'cascade-layers': {
      property: 'cascade-layers',
      description: 'CSS Cascade Layers for controlling specificity and style precedence',
      syntax: '@layer framework, components, utilities;',
      browser_support: {
        overall_support: 78,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['framework integration', 'style isolation', 'component encapsulation'],
      mdn_url: `${MDN_CSS_BASE_URL}/@layer`,
    },
    'css-supports': {
      property: 'css-supports',
      description: 'CSS @supports rule for feature detection and progressive enhancement',
      syntax: '@supports (display: grid) { .layout { display: grid; } }',
      browser_support: {
        overall_support: 92,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['feature detection', 'progressive enhancement', 'fallback strategies', 'browser testing'],
      mdn_url: `${MDN_CSS_BASE_URL}/@supports`,
    },
    'feature-queries': {
      property: 'feature-queries',
      description: 'CSS Feature Queries using @supports for conditional styling',
      syntax: '@supports (grid-area: auto) { .grid-item { grid-area: 1 / 1; } }',
      browser_support: {
        overall_support: 92,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['conditional CSS loading', 'graceful degradation', 'modern feature adoption'],
      mdn_url: `${MDN_CSS_BASE_URL}/@supports`,
    },
    'modern-selectors': {
      property: 'modern-selectors',
      description: 'Modern CSS selectors including :is(), :where(), and :has()',
      syntax: ':is(h1, h2, h3) { margin-top: 0; } :where(.btn) { padding: 8px; } .card:has(img) { border: 1px solid; }',
      browser_support: {
        overall_support: 82,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['selector simplification', 'conditional styling', 'parent selectors', 'component queries'],
      mdn_url: `${MDN_CSS_BASE_URL}/:is`,
    },
    'css-is': {
      property: 'css-is',
      description: 'CSS :is() pseudo-class for matching any of the selectors in a list',
      syntax: ':is(h1, h2, h3, h4, h5, h6) { margin-top: 0; }',
      browser_support: {
        overall_support: 88,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['selector grouping', 'DRY CSS', 'responsive design', 'component styling'],
      mdn_url: `${MDN_CSS_BASE_URL}/:is`,
    },
    'css-where': {
      property: 'css-where',
      description: 'CSS :where() pseudo-class for zero-specificity selector grouping',
      syntax: ':where(.btn, .button) { padding: 8px 16px; }',
      browser_support: {
        overall_support: 82,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['low-specificity styles', 'default styling', 'design system resets', 'library authoring'],
      mdn_url: `${MDN_CSS_BASE_URL}/:where`,
    },
    'css-has': {
      property: 'css-has',
      description: 'CSS :has() pseudo-class for parent and sibling selectors',
      syntax: '.card:has(img) { border: 1px solid gray; } .form:has(:invalid) { border-color: red; }',
      browser_support: {
        overall_support: 75,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['parent selectors', 'conditional styling', 'form validation', 'component state'],
      mdn_url: `${MDN_CSS_BASE_URL}/:has`,
    },
    'relative-colors': {
      property: 'relative-colors',
      description: 'CSS relative color syntax for color transformations and manipulations',
      syntax: 'color: oklch(from blue calc(l * 0.8) c h); background: hsl(from var(--primary) h s calc(l * 1.2));',
      browser_support: {
        overall_support: 45,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['color variations', 'theme generation', 'accessibility improvements', 'design token systems'],
      mdn_url: `${MDN_CSS_BASE_URL}/color_value/relative-color-syntax`,
    },
    'color-functions': {
      property: 'color-functions',
      description: 'Modern CSS color functions including relative color syntax and color mixing',
      syntax: 'color: color-mix(in srgb, blue 60%, white); background: light-dark(white, black);',
      browser_support: {
        overall_support: 58,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['dynamic theming', 'color palette generation', 'accessibility enhancements', 'design systems'],
      mdn_url: `${MDN_CSS_BASE_URL}/color_value`,
    },
    'text-box-trim': {
      property: 'text-box-trim',
      description: 'CSS text-box-trim for removing extra space around text caused by line height',
      syntax: 'text-box-trim: none | trim-start | trim-end | trim-both;',
      browser_support: {
        overall_support: 25,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['precise text alignment', 'removing unwanted spacing', 'design system consistency', 'icon-text alignment'],
      mdn_url: `${MDN_CSS_BASE_URL}/text-box-trim`,
    },
    'leading-trim': {
      property: 'leading-trim',
      description: 'CSS leading-trim for controlling text leading and removing unwanted spacing',
      syntax: 'leading-trim: normal | start | end | both;',
      browser_support: {
        overall_support: 20,
        modern_browsers: false,
        legacy_support: 'none',
      },
      use_cases: ['typography fine-tuning', 'removing text spacing issues', 'precise layout control'],
      mdn_url: `${MDN_CSS_BASE_URL}/leading-trim`,
    },
    'grid-repeat': {
      property: 'grid-repeat',
      description: 'CSS Grid repeat() function for creating repeating grid patterns with auto-fit and auto-fill',
      syntax: 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); repeat(auto-fill, 200px);',
      browser_support: {
        overall_support: 92,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['responsive grid layouts', 'card grids', 'uniform column layouts', 'auto-sizing containers'],
      mdn_url: `${MDN_CSS_BASE_URL}/repeat`,
    },
    'grid-auto-fit': {
      property: 'grid-auto-fit',
      description: 'CSS Grid auto-fit for creating responsive grids that fit available space',
      syntax: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));',
      browser_support: {
        overall_support: 92,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['responsive card layouts', 'product grids', 'image galleries', 'flexible content areas'],
      mdn_url: `${MDN_CSS_BASE_URL}/repeat`,
    },
    'grid-auto-fill': {
      property: 'grid-auto-fill',
      description: 'CSS Grid auto-fill for creating grids that maintain column count even with empty space',
      syntax: 'grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));',
      browser_support: {
        overall_support: 92,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['consistent grid layouts', 'maintaining visual rhythm', 'dashboard layouts', 'form layouts'],
      mdn_url: `${MDN_CSS_BASE_URL}/repeat`,
    },
    'grid-template-areas': {
      property: 'grid-template-areas',
      description: 'CSS Grid template areas for creating complex layouts with named grid areas',
      syntax: 'grid-template-areas: "header header" "sidebar main" "footer footer";',
      browser_support: {
        overall_support: 92,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['complex page layouts', 'dashboard designs', 'magazine layouts', 'responsive design'],
      mdn_url: `${MDN_CSS_BASE_URL}/grid-template-areas`,
    },
    'grid-areas': {
      property: 'grid-areas',
      description: 'CSS Grid areas for complex layout management with named regions',
      syntax: 'grid-area: header; grid-template-areas: "header header" "nav main";',
      browser_support: {
        overall_support: 92,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['semantic layouts', 'responsive reordering', 'complex interface design', 'accessibility improvements'],
      mdn_url: `${MDN_CSS_BASE_URL}/grid-area`,
    },
    'view-transitions': {
      property: 'view-transitions',
      description: 'CSS View Transitions API for smooth page and element transitions',
      syntax: 'view-transition-name: slide-it; @view-transition { from { opacity: 0; } to { opacity: 1; } }',
      browser_support: {
        overall_support: 35,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['page transitions', 'SPA navigation', 'element morphing', 'smooth state changes'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_view_transitions`,
    },
    'view-transition-name': {
      property: 'view-transition-name',
      description: 'CSS view-transition-name for identifying elements in view transitions',
      syntax: 'view-transition-name: my-element; view-transition-name: none;',
      browser_support: {
        overall_support: 35,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['element identification', 'custom transitions', 'morphing animations', 'route transitions'],
      mdn_url: `${MDN_CSS_BASE_URL}/view-transition-name`,
    },
    'container-style-queries': {
      property: 'container-style-queries',
      description: 'CSS Container Style Queries for reacting to parent container styles',
      syntax: '@container style(color: blue) { .child { background: yellow; } }',
      browser_support: {
        overall_support: 15,
        modern_browsers: false,
        legacy_support: 'none',
      },
      use_cases: ['theme-aware components', 'context-sensitive styling', 'adaptive design systems', 'conditional theming'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Container_Queries`,
    },
    'container-scroll-state': {
      property: 'container-scroll-state',
      description: 'CSS Container Scroll State Queries for detecting scroll position in containers',
      syntax: '@container scroll-state(stuck: top) { .header { box-shadow: 0 2px 4px rgba(0,0,0,0.1); } }',
      browser_support: {
        overall_support: 10,
        modern_browsers: false,
        legacy_support: 'none',
      },
      use_cases: ['sticky header effects', 'scroll indicators', 'progressive disclosure', 'scroll-based styling'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Container_Queries`,
    },
    'scroll-state-queries': {
      property: 'scroll-state-queries',
      description: 'CSS Scroll State Queries for identifying scroll states and positions',
      syntax: '@container scroll-state(at-top) { .element { border-top: none; } }',
      browser_support: {
        overall_support: 10,
        modern_browsers: false,
        legacy_support: 'none',
      },
      use_cases: ['scroll position detection', 'dynamic styling based on scroll', 'navigation indicators', 'scroll animations'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Container_Queries`,
    },
    'css-conditionals': {
      property: 'css-conditionals',
      description: 'CSS conditional syntax including @if rules for dynamic styling in modern browsers',
      syntax: '@if (supports(display: grid)) { .layout { display: grid; } }',
      browser_support: {
        overall_support: 5,
        modern_browsers: false,
        legacy_support: 'none',
      },
      use_cases: ['conditional styling', 'feature-based layouts', 'progressive enhancement', 'browser-specific styles'],
      mdn_url: `${MDN_CSS_BASE_URL}/@if`,
    },
    'css-if': {
      property: 'css-if',
      description: 'CSS @if at-rule for conditional CSS application based on browser capabilities',
      syntax: '@if (supports(container-queries)) { .component { container-type: inline-size; } }',
      browser_support: {
        overall_support: 5,
        modern_browsers: false,
        legacy_support: 'none',
      },
      use_cases: ['experimental feature detection', 'conditional polyfills', 'future-proof styling'],
      mdn_url: `${MDN_CSS_BASE_URL}/@if`,
    },
    'color-mix': {
      property: 'color-mix',
      description: 'CSS color-mix() function for blending colors in specified color spaces',
      syntax: 'color: color-mix(in srgb, blue 60%, white 40%); background: color-mix(in oklch, var(--primary) 80%, transparent);',
      browser_support: {
        overall_support: 65,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['color blending', 'theme generation', 'dynamic color creation', 'accessibility improvements'],
      mdn_url: `${MDN_CSS_BASE_URL}/color_value/color-mix`,
    },
    'color-blend': {
      property: 'color-blend',
      description: 'CSS color blending techniques using color-mix and blend modes',
      syntax: 'color: color-mix(in srgb, currentColor 50%, transparent); mix-blend-mode: multiply;',
      browser_support: {
        overall_support: 65,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['overlay effects', 'theme variations', 'accessibility enhancements', 'dynamic theming'],
      mdn_url: `${MDN_CSS_BASE_URL}/color_value/color-mix`,
    },
    'css-at-rules': {
      property: 'css-at-rules',
      description: 'Comprehensive CSS at-rules including @layer, @container, @supports, @media, @import, @keyframes',
      syntax: '@layer base; @container (width > 300px) {}; @supports (display: grid) {}; @media (min-width: 768px) {};',
      browser_support: {
        overall_support: 85,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['responsive design', 'feature detection', 'code organization', 'progressive enhancement'],
      mdn_url: `${MDN_CSS_BASE_URL}/At-rule`,
    },
    'at-rules': {
      property: 'at-rules',
      description: 'CSS at-rules for conditional styling, imports, animations, and responsive design',
      syntax: '@import url(); @media screen {}; @keyframes slide {}; @font-face {}; @page {};',
      browser_support: {
        overall_support: 95,
        modern_browsers: true,
        legacy_support: 'good',
      },
      use_cases: ['external stylesheets', 'responsive design', 'animations', 'print styles', 'custom fonts'],
      mdn_url: `${MDN_CSS_BASE_URL}/At-rule`,
    },
    'details-content': {
      property: 'details-content',
      description: 'CSS ::details-content pseudo-element for styling accordion and collapsible content',
      syntax: 'details::details-content { padding: 1rem; background: #f5f5f5; }',
      browser_support: {
        overall_support: 15,
        modern_browsers: false,
        legacy_support: 'none',
      },
      use_cases: ['accordion styling', 'collapsible content', 'disclosure widgets', 'progressive disclosure'],
      mdn_url: `${MDN_CSS_BASE_URL}/::details-content`,
    },
    'accordion-styling': {
      property: 'accordion-styling',
      description: 'CSS techniques for styling accordions using details, summary, and pseudo-elements',
      syntax: 'details > summary { cursor: pointer; } details[open] > summary::after { transform: rotate(180deg); }',
      browser_support: {
        overall_support: 88,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['FAQ sections', 'collapsible menus', 'content organization', 'mobile navigation'],
      mdn_url: `${MDN_CSS_BASE_URL}/HTML/Element/details`,
    },
    'css-isolation': {
      property: 'css-isolation',
      description: 'CSS isolation property for creating new stacking contexts and solving z-index issues',
      syntax: 'isolation: isolate; isolation: auto;',
      browser_support: {
        overall_support: 78,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['z-index management', 'stacking context control', 'component isolation', 'layering solutions'],
      mdn_url: `${MDN_CSS_BASE_URL}/isolation`,
    },
    'stacking-context': {
      property: 'stacking-context',
      description: 'CSS stacking context management for controlling element layering and z-index behavior',
      syntax: 'transform: translateZ(0); will-change: transform; contain: layout style paint;',
      browser_support: {
        overall_support: 85,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['z-index fixes', 'modal layering', 'dropdown positioning', 'overlay management'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Positioning/Understanding_z_index/The_stacking_context`,
    },
    'container-query-units': {
      property: 'container-query-units',
      description: 'CSS Container Query logical units (cqi, cqb, cqmin, cqmax) for responsive design based on container size',
      syntax: 'width: 50cqi; height: 30cqb; font-size: clamp(1rem, 4cqmin, 2rem);',
      browser_support: {
        overall_support: 75,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['component-based responsive design', 'container-relative sizing', 'modular layouts', 'design systems'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Container_Queries`,
    },
    'viewport-units': {
      property: 'viewport-units',
      description: 'Modern CSS viewport units including dynamic (dvh, dvw), small (svh, svw), and large (lvh, lvw) viewport units',
      syntax: 'height: 100dvh; width: 100dvw; min-height: 100svh; max-height: 100lvh;',
      browser_support: {
        overall_support: 68,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['mobile viewport handling', 'full-screen layouts', 'responsive design', 'mobile browser compatibility'],
      mdn_url: `${MDN_CSS_BASE_URL}/length`,
    },
    'dynamic-viewport': {
      property: 'dynamic-viewport',
      description: 'CSS Dynamic Viewport units (dvh, dvw, dvi, dvb) that adjust to browser UI changes',
      syntax: 'height: 100dvh; width: 100dvw; padding: 2dvi 2dvb;',
      browser_support: {
        overall_support: 68,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['mobile browser address bar handling', 'full-screen applications', 'viewport-aware layouts'],
      mdn_url: `${MDN_CSS_BASE_URL}/length`,
    },
    'small-viewport': {
      property: 'small-viewport',
      description: 'CSS Small Viewport units (svh, svw, svi, svb) representing the smallest possible viewport',
      syntax: 'min-height: 100svh; width: 100svw; margin: 1svi 1svb;',
      browser_support: {
        overall_support: 68,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['ensuring content visibility', 'mobile-first design', 'conservative viewport sizing'],
      mdn_url: `${MDN_CSS_BASE_URL}/length`,
    },
    'large-viewport': {
      property: 'large-viewport',
      description: 'CSS Large Viewport units (lvh, lvw, lvi, lvb) representing the largest possible viewport',
      syntax: 'max-height: 100lvh; width: 100lvw; padding: 2lvi 2lvb;',
      browser_support: {
        overall_support: 68,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['maximizing content space', 'full-screen experiences', 'desktop-optimized layouts'],
      mdn_url: `${MDN_CSS_BASE_URL}/length`,
    },
    'vmin-vmax-units': {
      property: 'vmin-vmax-units',
      description: 'CSS vmin and vmax units for viewport-relative sizing, perfect for rounded borders and responsive elements',
      syntax: 'border-radius: 2vmin; width: 80vmax; font-size: clamp(1rem, 3vmin, 2rem);',
      browser_support: {
        overall_support: 94,
        modern_browsers: true,
        legacy_support: 'good',
      },
      use_cases: ['responsive border-radius', 'viewport-proportional sizing', 'square aspect ratios', 'scalable UI elements'],
      mdn_url: `${MDN_CSS_BASE_URL}/length`,
    },
    'logical-properties': {
      property: 'logical-properties',
      description: 'CSS Logical Properties for margin, padding, border, overflow that adapt to writing modes (block/inline)',
      syntax: 'margin-block: 1rem; padding-inline: 2rem; border-block-start: 1px solid; overflow-block: auto;',
      browser_support: {
        overall_support: 87,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['internationalization', 'writing mode support', 'RTL/LTR layouts', 'modern CSS architecture'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Logical_Properties`,
    },
    'margin-padding-logical': {
      property: 'margin-padding-logical',
      description: 'CSS Logical margin and padding properties (margin-block, margin-inline, padding-block, padding-inline)',
      syntax: 'margin-block: 1rem 2rem; margin-inline: auto; padding-block-start: 1rem; padding-inline-end: 2rem;',
      browser_support: {
        overall_support: 87,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['responsive spacing', 'writing mode adaptation', 'component design systems', 'accessibility'],
      mdn_url: `${MDN_CSS_BASE_URL}/CSS_Logical_Properties`,
    },
    'writing-mode': {
      property: 'writing-mode',
      description: 'CSS writing-mode property and logical properties for international text layouts',
      syntax: 'writing-mode: horizontal-tb | vertical-rl | vertical-lr; text-orientation: mixed;',
      browser_support: {
        overall_support: 89,
        modern_browsers: true,
        legacy_support: 'partial',
      },
      use_cases: ['vertical text layouts', 'international typography', 'CJK languages', 'artistic text effects'],
      mdn_url: `${MDN_CSS_BASE_URL}/writing-mode`,
    },
    'scroll-behavior': {
      property: 'scroll-behavior',
      description: 'CSS scroll-behavior property for smooth scrolling animation when navigating to anchors',
      syntax: 'scroll-behavior: smooth | auto;',
      browser_support: {
        overall_support: 75,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['smooth anchor navigation', 'single-page applications', 'improved user experience', 'accessibility'],
      mdn_url: `${MDN_CSS_BASE_URL}/scroll-behavior`,
    },
    'scroll-timeline': {
      property: 'scroll-timeline',
      description: 'CSS scroll-timeline for creating animations driven by scroll progress',
      syntax: 'scroll-timeline: --timeline-name block | inline; animation-timeline: --timeline-name;',
      browser_support: {
        overall_support: 35,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['scroll-driven animations', 'progress indicators', 'parallax effects', 'interactive storytelling'],
      mdn_url: `${MDN_CSS_BASE_URL}/scroll-timeline`,
    },
    'overflow-behavior': {
      property: 'overflow-behavior',
      description: 'CSS overflow and overscroll-behavior properties for controlling scroll container behavior',
      syntax: 'overflow: auto | scroll | hidden; overscroll-behavior: contain | none | auto;',
      browser_support: {
        overall_support: 85,
        modern_browsers: true,
        legacy_support: 'good',
      },
      use_cases: ['scroll container management', 'preventing scroll chaining', 'modal interactions', 'mobile scroll handling'],
      mdn_url: `${MDN_CSS_BASE_URL}/overflow`,
    },
    'overscroll-behavior': {
      property: 'overscroll-behavior',
      description: 'CSS overscroll-behavior to control what happens when users scroll past boundaries',
      syntax: 'overscroll-behavior: contain | none | auto; overscroll-behavior-x: none; overscroll-behavior-y: contain;',
      browser_support: {
        overall_support: 77,
        modern_browsers: true,
        legacy_support: 'none',
      },
      use_cases: ['preventing bounce scrolling', 'modal scroll isolation', 'carousel interactions', 'mobile UX improvements'],
      mdn_url: `${MDN_CSS_BASE_URL}/overscroll-behavior`,
    },
  };

  // Filter suggestions based on approach
  for (const keyword of keywords) {
    const suggestion = propertyMappings[keyword];
    if (suggestion) {
      // Filter based on approach preference
      if (approach === 'compatible' && suggestion.browser_support.overall_support < 90) {
        continue;
      }
      if (approach === 'modern' && suggestion.browser_support.overall_support < 70) {
        continue;
      }
      suggestions.push(suggestion);
    }
  }

  return suggestions;
}

/**
 * Fetches browser support information for a specific CSS property
 * @param property - The CSS property name to check support for
 * @param includeExperimental - Whether to include experimental features in the result
 * @returns Promise that resolves to detailed browser support information
 */
export async function fetchBrowserSupportFromMDN(property: string, includeExperimental: boolean): Promise<BrowserSupportInfo> {
  // Mock browser support data - in real implementation, this would parse MDN compatibility tables
  const supportData: Record<string, BrowserSupportInfo> = {
    flexbox: {
      overall_support: 96,
      browsers: {
        chrome: { version: '29+', support: 'full' },
        firefox: { version: '28+', support: 'full' },
        safari: { version: '9+', support: 'full' },
        edge: { version: '12+', support: 'full' },
      },
      experimental_features: [],
    },
    grid: {
      overall_support: 92,
      browsers: {
        chrome: { version: '57+', support: 'full' },
        firefox: { version: '52+', support: 'full' },
        safari: { version: '10.1+', support: 'full' },
        edge: { version: '16+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['subgrid', 'masonry'] : [],
    },
    'container-queries': {
      overall_support: 75,
      browsers: {
        chrome: { version: '105+', support: 'full' },
        firefox: { version: '110+', support: 'full' },
        safari: { version: '16+', support: 'full' },
        edge: { version: '105+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['container-type', 'container-name'] : [],
    },
    'scroll-snap': {
      overall_support: 88,
      browsers: {
        chrome: { version: '69+', support: 'full' },
        firefox: { version: '68+', support: 'full' },
        safari: { version: '11+', support: 'full' },
        edge: { version: '79+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['scroll-snap-stop'] : [],
    },
    'anchor-positioning': {
      overall_support: 45,
      browsers: {
        chrome: { version: '125+', support: 'full' },
        firefox: { version: 'None', support: 'none' },
        safari: { version: 'None', support: 'none' },
        edge: { version: '125+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['anchor-scope', 'position-try'] : [],
    },
    'css-layers': {
      overall_support: 78,
      browsers: {
        chrome: { version: '99+', support: 'full' },
        firefox: { version: '97+', support: 'full' },
        safari: { version: '15.4+', support: 'full' },
        edge: { version: '99+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['layer-revert'] : [],
    },
    'css-supports': {
      overall_support: 92,
      browsers: {
        chrome: { version: '28+', support: 'full' },
        firefox: { version: '22+', support: 'full' },
        safari: { version: '9+', support: 'full' },
        edge: { version: '12+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['supports-selector'] : [],
    },
    'css-has': {
      overall_support: 75,
      browsers: {
        chrome: { version: '105+', support: 'full' },
        firefox: { version: '121+', support: 'full' },
        safari: { version: '15.4+', support: 'full' },
        edge: { version: '105+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['has-forgiving-parsing'] : [],
    },
    'relative-colors': {
      overall_support: 45,
      browsers: {
        chrome: { version: '119+', support: 'full' },
        firefox: { version: 'None', support: 'none' },
        safari: { version: '16.4+', support: 'full' },
        edge: { version: '119+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['color-mix', 'light-dark'] : [],
    },
    'text-box-trim': {
      overall_support: 25,
      browsers: {
        chrome: { version: 'None', support: 'none' },
        firefox: { version: 'None', support: 'none' },
        safari: { version: 'None', support: 'none' },
        edge: { version: 'None', support: 'none' },
      },
      experimental_features: includeExperimental ? ['leading-trim', 'text-edge'] : [],
    },
    'view-transitions': {
      overall_support: 35,
      browsers: {
        chrome: { version: '111+', support: 'full' },
        firefox: { version: 'None', support: 'none' },
        safari: { version: 'None', support: 'none' },
        edge: { version: '111+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['view-transition-class', 'cross-document-transitions'] : [],
    },
    'container-style-queries': {
      overall_support: 15,
      browsers: {
        chrome: { version: 'None', support: 'none' },
        firefox: { version: 'None', support: 'none' },
        safari: { version: 'None', support: 'none' },
        edge: { version: 'None', support: 'none' },
      },
      experimental_features: includeExperimental ? ['style-queries', 'state-queries'] : [],
    },
    'color-mix': {
      overall_support: 65,
      browsers: {
        chrome: { version: '111+', support: 'full' },
        firefox: { version: '113+', support: 'full' },
        safari: { version: '16.2+', support: 'full' },
        edge: { version: '111+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['oklch-interpolation', 'color-spaces'] : [],
    },
    'css-isolation': {
      overall_support: 78,
      browsers: {
        chrome: { version: '41+', support: 'full' },
        firefox: { version: '36+', support: 'full' },
        safari: { version: '15.4+', support: 'full' },
        edge: { version: '79+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['isolation-mode'] : [],
    },
    'grid-template-areas': {
      overall_support: 92,
      browsers: {
        chrome: { version: '57+', support: 'full' },
        firefox: { version: '52+', support: 'full' },
        safari: { version: '10.1+', support: 'full' },
        edge: { version: '16+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['subgrid-areas'] : [],
    },
    'container-query-units': {
      overall_support: 75,
      browsers: {
        chrome: { version: '105+', support: 'full' },
        firefox: { version: '110+', support: 'full' },
        safari: { version: '16+', support: 'full' },
        edge: { version: '105+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['cqh', 'cqw'] : [],
    },
    'viewport-units': {
      overall_support: 68,
      browsers: {
        chrome: { version: '108+', support: 'full' },
        firefox: { version: '101+', support: 'full' },
        safari: { version: '15.4+', support: 'full' },
        edge: { version: '108+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['container-viewport-units'] : [],
    },
    'logical-properties': {
      overall_support: 87,
      browsers: {
        chrome: { version: '87+', support: 'full' },
        firefox: { version: '66+', support: 'full' },
        safari: { version: '14.1+', support: 'full' },
        edge: { version: '87+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['logical-resize', 'logical-position'] : [],
    },
    'scroll-behavior': {
      overall_support: 75,
      browsers: {
        chrome: { version: '61+', support: 'full' },
        firefox: { version: '36+', support: 'full' },
        safari: { version: '15.4+', support: 'full' },
        edge: { version: '79+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['scroll-behavior-instant'] : [],
    },
    'overscroll-behavior': {
      overall_support: 77,
      browsers: {
        chrome: { version: '63+', support: 'full' },
        firefox: { version: '59+', support: 'full' },
        safari: { version: '16+', support: 'full' },
        edge: { version: '18+', support: 'full' },
      },
      experimental_features: includeExperimental ? ['overscroll-behavior-inline'] : [],
    },
    'vmin-vmax-units': {
      overall_support: 94,
      browsers: {
        chrome: { version: '26+', support: 'full' },
        firefox: { version: '19+', support: 'full' },
        safari: { version: '6.1+', support: 'full' },
        edge: { version: '12+', support: 'full' },
      },
      experimental_features: includeExperimental ? [] : [],
    },
  };

  return (
    supportData[property] || {
      overall_support: 85,
      browsers: {
        chrome: { version: 'Unknown', support: 'partial' },
        firefox: { version: 'Unknown', support: 'partial' },
        safari: { version: 'Unknown', support: 'partial' },
        edge: { version: 'Unknown', support: 'partial' },
      },
      experimental_features: [],
    }
  );
}

/**
 * Fetches detailed information about a CSS property from MDN
 * @param property - The CSS property name to get details for
 * @param includeExamples - Whether to include code examples in the response
 * @returns Promise that resolves to detailed CSS property information
 */
export async function fetchCSSPropertyDetailsFromMDN(property: string, includeExamples: boolean): Promise<CSSPropertyDetails> {
  // Mock CSS property details - in real implementation, this would parse MDN content
  const propertyDetails: Record<string, CSSPropertyDetails> = {
    flexbox: {
      description:
        'CSS Flexible Box Layout is a layout method for arranging items in rows or columns. Items flex to fill additional space or shrink to fit into smaller spaces.',
      syntax: 'display: flex | inline-flex',
      values: ['flex', 'inline-flex'],
      examples: includeExamples ? ['display: flex;', 'justify-content: center;', 'align-items: center;', 'flex-direction: column;'] : [],
      related_properties: ['justify-content', 'align-items', 'flex-direction', 'flex-wrap'],
    },
    grid: {
      description: 'CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns.',
      syntax: 'display: grid | inline-grid',
      values: ['grid', 'inline-grid'],
      examples: includeExamples
        ? [
            'display: grid;',
            'grid-template-columns: 1fr 1fr 1fr;',
            'grid-gap: 20px;',
            'grid-template-areas: "header header header" "sidebar main main" "footer footer footer";',
          ]
        : [],
      related_properties: ['grid-template-columns', 'grid-template-rows', 'grid-gap', 'grid-area'],
    },
    'scroll-snap': {
      description: 'CSS Scroll Snap provides a way to create controlled scrolling experiences by defining snap positions.',
      syntax: 'scroll-snap-type: x mandatory | y mandatory | both mandatory',
      values: ['none', 'x', 'y', 'both', 'mandatory', 'proximity'],
      examples: includeExamples
        ? [
            'scroll-snap-type: x mandatory;',
            'scroll-snap-align: start;',
            'scroll-behavior: smooth;',
            'overflow-x: auto;',
          ]
        : [],
      related_properties: ['scroll-snap-align', 'scroll-behavior', 'overflow', 'scroll-margin'],
    },
    'anchor-positioning': {
      description: 'CSS Anchor Positioning allows elements to be positioned relative to other elements (anchors) anywhere in the DOM.',
      syntax: 'position-anchor: --anchor-name; top: anchor(bottom)',
      values: ['anchor()', 'anchor-size()', 'position-anchor'],
      examples: includeExamples
        ? [
            'anchor-name: --my-anchor;',
            'position-anchor: --my-anchor;',
            'top: anchor(bottom);',
            'left: anchor(center);',
          ]
        : [],
      related_properties: ['anchor-name', 'position-anchor', 'anchor-scope', 'position-try'],
    },
    'css-layers': {
      description: 'CSS Cascade Layers provide explicit control over the cascade by allowing authors to define layers of styles.',
      syntax: '@layer layer-name { /* styles */ }',
      values: ['@layer', 'layer()', 'revert-layer'],
      examples: includeExamples
        ? [
            '@layer base, components, utilities;',
            '@layer components { .button { color: blue; } }',
            '@layer utilities { .text-center { text-align: center; } }',
            'color: revert-layer;',
          ]
        : [],
      related_properties: ['@import', 'revert-layer', 'cascade'],
    },
    'css-supports': {
      description: 'CSS @supports rule allows you to apply styles conditionally based on whether certain CSS features are supported.',
      syntax: '@supports (property: value) { /* styles */ }',
      values: ['@supports', 'not', 'and', 'or'],
      examples: includeExamples
        ? [
            '@supports (display: grid) { .layout { display: grid; } }',
            '@supports not (display: grid) { .layout { display: table; } }',
            '@supports (display: grid) and (gap: 1rem) { .grid { gap: 1rem; } }',
          ]
        : [],
      related_properties: ['@media', 'feature-queries'],
    },
    'css-has': {
      description: 'CSS :has() pseudo-class allows you to select an element based on its descendants or following siblings.',
      syntax: ':has(selector)',
      values: [':has()', 'descendant selectors', 'sibling selectors'],
      examples: includeExamples
        ? [
            '.card:has(img) { border: 1px solid gray; }',
            '.form:has(:invalid) { border-color: red; }',
            'article:has(> h2) { margin-top: 2rem; }',
            'label:has(+ input:focus) { color: blue; }',
          ]
        : [],
      related_properties: [':is()', ':where()', ':not()'],
    },
    'relative-colors': {
      description: 'CSS relative color syntax allows you to create new colors by modifying existing colors.',
      syntax: 'color: hsl(from baseColor h s calc(l * 1.2))',
      values: ['from', 'calc()', 'oklch()', 'hsl()', 'rgb()'],
      examples: includeExamples
        ? [
            'color: hsl(from blue h s calc(l * 0.8));',
            'background: oklch(from var(--primary) calc(l * 1.2) c h);',
            'border-color: rgb(from red r calc(g * 0.5) b);',
            'color: color-mix(in srgb, blue 60%, white);',
          ]
        : [],
      related_properties: ['color-mix()', 'light-dark()', 'color-scheme'],
    },
    'text-box-trim': {
      description: 'CSS text-box-trim removes extra space around text caused by line height, allowing for precise text positioning.',
      syntax: 'text-box-trim: none | trim-start | trim-end | trim-both',
      values: ['none', 'trim-start', 'trim-end', 'trim-both'],
      examples: includeExamples
        ? [
            'text-box-trim: trim-both;',
            'text-box-trim: trim-start;',
            'h1 { text-box-trim: trim-both; margin: 0; }',
            '.icon-text { text-box-trim: trim-both; vertical-align: middle; }',
          ]
        : [],
      related_properties: ['leading-trim', 'line-height', 'vertical-align'],
    },
    'grid-repeat': {
      description: 'CSS Grid repeat() function creates repeating patterns with auto-fit and auto-fill for responsive layouts.',
      syntax: 'grid-template-columns: repeat(auto-fit | auto-fill, minmax(min, max))',
      values: ['auto-fit', 'auto-fill', 'minmax()', 'repeat()'],
      examples: includeExamples
        ? [
            'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));',
            'grid-template-columns: repeat(auto-fill, 200px);',
            'grid-template-rows: repeat(3, minmax(100px, auto));',
            'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));',
          ]
        : [],
      related_properties: ['grid-template-columns', 'grid-template-rows', 'minmax()', 'grid-auto-columns'],
    },
    'grid-template-areas': {
      description: 'CSS Grid template areas define named grid regions for complex layouts using a visual ASCII-art syntax.',
      syntax: 'grid-template-areas: "area1 area2" "area3 area4"',
      values: ['named areas', 'string literals', 'grid-area names'],
      examples: includeExamples
        ? [
            'grid-template-areas: "header header" "sidebar main" "footer footer";',
            'grid-template-areas: "nav nav nav" ". content ." "footer footer footer";',
            'grid-area: header;',
            'grid-template-areas: "logo menu menu" "hero hero hero" "content aside aside";',
          ]
        : [],
      related_properties: ['grid-area', 'grid-template-columns', 'grid-template-rows'],
    },
    'view-transitions': {
      description: 'CSS View Transitions API provides smooth transitions between different states or pages in web applications.',
      syntax: 'view-transition-name: element-name; ::view-transition-old(name) {}',
      values: ['view-transition-name', '::view-transition-old()', '::view-transition-new()'],
      examples: includeExamples
        ? [
            'view-transition-name: main-header;',
            '::view-transition-old(main-header) { animation-duration: 0.5s; }',
            '::view-transition-new(main-header) { animation-delay: 0.2s; }',
            'document.startViewTransition(() => updateDOM());',
          ]
        : [],
      related_properties: ['animation', 'transition', 'transform'],
    },
    'container-style-queries': {
      description: 'CSS Container Style Queries allow styling based on the computed styles of a containing element.',
      syntax: '@container style(property: value) { selector { styles } }',
      values: ['style()', 'computed styles', 'container queries'],
      examples: includeExamples
        ? [
            '@container style(background-color: blue) { .child { color: white; } }',
            '@container style(--theme: dark) { .component { border-color: gray; } }',
            '@container style(color: red) and (min-width: 300px) { .element { font-weight: bold; } }',
          ]
        : [],
      related_properties: ['container-type', 'container-name', '@container'],
    },
    'color-mix': {
      description: 'CSS color-mix() function blends two colors in a specified color space with optional percentages.',
      syntax: 'color-mix(in colorspace, color1 percentage, color2 percentage)',
      values: ['srgb', 'oklch', 'hsl', 'hwb', 'lab', 'lch'],
      examples: includeExamples
        ? [
            'color: color-mix(in srgb, blue 60%, white);',
            'background: color-mix(in oklch, var(--primary) 80%, transparent);',
            'border-color: color-mix(in hsl, red 30%, blue 70%);',
            'color: color-mix(in lch, currentColor 50%, var(--accent));',
          ]
        : [],
      related_properties: ['relative-colors', 'light-dark()', 'color-scheme'],
    },
    'css-at-rules': {
      description: 'CSS at-rules are statements that instruct CSS how to behave, including imports, media queries, and animations.',
      syntax: '@rule-name (parameters) { styles }',
      values: ['@media', '@import', '@keyframes', '@font-face', '@layer', '@container', '@supports'],
      examples: includeExamples
        ? [
            '@media (min-width: 768px) { .container { max-width: 1200px; } }',
            '@import url("styles.css");',
            '@keyframes slideIn { from { opacity: 0; } to { opacity: 1; } }',
            '@layer base, components, utilities;',
          ]
        : [],
      related_properties: ['media queries', 'feature queries', 'cascade layers'],
    },
    'details-content': {
      description: 'CSS ::details-content pseudo-element targets the content area of details elements for accordion styling.',
      syntax: 'details::details-content { styles }',
      values: ['::details-content', 'pseudo-element'],
      examples: includeExamples
        ? [
            'details::details-content { padding: 1rem; background: #f5f5f5; }',
            'details[open]::details-content { animation: slideDown 0.3s ease; }',
            'details::details-content { border-top: 1px solid #ccc; }',
          ]
        : [],
      related_properties: ['::marker', 'details', 'summary'],
    },
    'css-isolation': {
      description: 'CSS isolation property creates a new stacking context, useful for managing z-index and layering issues.',
      syntax: 'isolation: auto | isolate',
      values: ['auto', 'isolate'],
      examples: includeExamples
        ? [
            'isolation: isolate;',
            '.modal { isolation: isolate; z-index: 1000; }',
            '.dropdown { isolation: isolate; position: relative; }',
            '.component { isolation: isolate; contain: layout style paint; }',
          ]
        : [],
      related_properties: ['z-index', 'contain', 'will-change', 'transform'],
    },
    'container-query-units': {
      description: 'CSS Container Query logical units provide responsive sizing based on container dimensions using cqi, cqb, cqmin, cqmax.',
      syntax: 'width: 50cqi; height: 30cqb; font-size: clamp(1rem, 4cqmin, 2rem)',
      values: ['cqi', 'cqb', 'cqmin', 'cqmax', 'cqw', 'cqh'],
      examples: includeExamples
        ? [
            'width: 50cqi; /* 50% of container inline size */',
            'height: 30cqb; /* 30% of container block size */',
            'font-size: 4cqmin; /* 4% of smaller container dimension */',
            'border-radius: 2cqmax; /* 2% of larger container dimension */',
          ]
        : [],
      related_properties: ['container-type', 'container-name', '@container'],
    },
    'viewport-units': {
      description: 'Modern CSS viewport units including dynamic (dvh, dvw), small (svh, svw), and large (lvh, lvw) variants.',
      syntax: 'height: 100dvh; width: 100svw; min-height: 100lvh',
      values: ['dvh', 'dvw', 'dvi', 'dvb', 'svh', 'svw', 'svi', 'svb', 'lvh', 'lvw', 'lvi', 'lvb'],
      examples: includeExamples
        ? [
            'height: 100dvh; /* Dynamic viewport height */',
            'width: 100svw; /* Small viewport width */',
            'max-height: 100lvh; /* Large viewport height */',
            'padding: 2dvi 2dvb; /* Dynamic viewport inline/block */',
          ]
        : [],
      related_properties: ['vh', 'vw', 'vmin', 'vmax'],
    },
    'logical-properties': {
      description: 'CSS Logical Properties adapt to writing modes using block/inline directions instead of physical directions.',
      syntax: 'margin-block: 1rem; padding-inline: 2rem; border-block-start: 1px solid',
      values: ['block', 'inline', 'block-start', 'block-end', 'inline-start', 'inline-end'],
      examples: includeExamples
        ? [
            'margin-block: 1rem 2rem; /* margin-top and margin-bottom */',
            'padding-inline: 2rem; /* padding-left and padding-right */',
            'border-block-start: 1px solid; /* border-top */',
            'overflow-inline: auto; /* overflow-x */',
          ]
        : [],
      related_properties: ['writing-mode', 'direction', 'text-orientation'],
    },
    'vmin-vmax-units': {
      description: 'CSS vmin and vmax units for viewport-relative sizing, ideal for responsive borders and proportional elements.',
      syntax: 'border-radius: 2vmin; width: 80vmax; font-size: clamp(1rem, 3vmin, 2rem)',
      values: ['vmin', 'vmax'],
      examples: includeExamples
        ? [
            'border-radius: 2vmin; /* 2% of smaller viewport dimension */',
            'width: 80vmax; /* 80% of larger viewport dimension */',
            'font-size: clamp(1rem, 3vmin, 2rem); /* Responsive font size */',
            'aspect-ratio: 1; width: 50vmin; /* Perfect square */',
          ]
        : [],
      related_properties: ['vh', 'vw', 'dvh', 'dvw', 'aspect-ratio'],
    },
    'scroll-behavior': {
      description: 'CSS scroll-behavior controls the scrolling animation when navigating to anchor links or programmatic scrolling.',
      syntax: 'scroll-behavior: auto | smooth',
      values: ['auto', 'smooth'],
      examples: includeExamples
        ? [
            'html { scroll-behavior: smooth; }',
            '.container { scroll-behavior: smooth; overflow-y: auto; }',
            'scroll-behavior: auto; /* Disable smooth scrolling */',
          ]
        : [],
      related_properties: ['scroll-snap-type', 'scroll-margin', 'scroll-padding'],
    },
    'overflow-behavior': {
      description: 'CSS overflow and overscroll-behavior properties control scroll container behavior and scroll chaining.',
      syntax: 'overflow: auto; overscroll-behavior: contain',
      values: ['auto', 'scroll', 'hidden', 'contain', 'none'],
      examples: includeExamples
        ? [
            'overflow: auto; /* Enable scrolling when needed */',
            'overscroll-behavior: contain; /* Prevent scroll chaining */',
            'overscroll-behavior-y: none; /* No bounce on vertical overscroll */',
            'overflow-x: hidden; overflow-y: auto; /* Horizontal hidden, vertical auto */',
          ]
        : [],
      related_properties: ['scroll-behavior', 'scroll-snap-type', 'touch-action'],
    },
  };

  return (
    propertyDetails[property] || {
      description: `The ${property} CSS property defines how elements are styled.`,
      syntax: `${property}: value;`,
      values: ['auto', 'none', 'inherit', 'initial'],
      examples: includeExamples ? [`${property}: auto;`] : [],
      related_properties: [],
    }
  );
}

/**
 * Generates a human-readable recommendation based on browser support information
 * @param supportInfo - The browser support information to analyze
 * @returns A recommendation string about the safety of using the CSS property
 */
export function generateBrowserSupportRecommendation(supportInfo: BrowserSupportInfo): string {
  if (supportInfo.overall_support >= 95) {
    return 'Excellent browser support - safe to use in production';
  } else if (supportInfo.overall_support >= 85) {
    return 'Good browser support - consider fallbacks for legacy browsers';
  } else if (supportInfo.overall_support >= 70) {
    return 'Moderate browser support - use with caution and provide fallbacks';
  } else {
    return 'Limited browser support - consider alternative approaches';
  }
}

/**
 * Gets alternative CSS properties that can be used instead of the specified property
 * @param property - The CSS property to find alternatives for
 * @returns Promise that resolves to an array of alternative CSS property names
 */
export async function getAlternativeCSSProperties(property: string): Promise<string[]> {
  const alternatives: Record<string, string[]> = {
    grid: ['flexbox', 'float', 'table-display'],
    flexbox: ['grid', 'float', 'inline-block'],
    'container-queries': ['media-queries', 'javascript-based-queries'],
    animation: ['transition', 'javascript-animation'],
    transition: ['animation', 'javascript-transition'],
    'scroll-snap': ['javascript-carousel', 'intersection-observer', 'scroll-event-listeners'],
    'anchor-positioning': ['javascript-positioning', 'absolute-positioning', 'floating-ui'],
    'css-layers': ['bem-methodology', 'css-modules', 'styled-components'],
    'css-supports': ['modernizr', 'javascript-feature-detection', 'progressive-enhancement'],
    'css-has': ['javascript-selectors', 'mutation-observer', 'parent-class-toggles'],
    'relative-colors': ['sass-color-functions', 'javascript-color-manipulation', 'css-custom-properties'],
    'text-box-trim': ['line-height-adjustment', 'margin-manipulation', 'javascript-text-metrics'],
    'view-transitions': ['javascript-animations', 'intersection-observer', 'css-animations'],
    'container-style-queries': ['javascript-computed-styles', 'mutation-observer', 'css-custom-properties'],
    'color-mix': ['sass-mix-function', 'javascript-color-manipulation', 'css-custom-properties'],
    'css-isolation': ['transform-translatez', 'will-change', 'position-relative-z-index'],
    'details-content': ['javascript-accordion', 'css-checkbox-hack', 'aria-expanded'],
    'grid-template-areas': ['grid-line-numbers', 'flexbox-layout', 'css-positioning'],
    'container-query-units': ['viewport-units', 'percentage-units', 'javascript-resize-observer'],
    'viewport-units': ['vh-vw-fallback', 'javascript-viewport-detection', 'css-custom-properties'],
    'logical-properties': ['physical-properties', 'css-custom-properties', 'postcss-logical'],
    'scroll-behavior': ['javascript-smooth-scroll', 'scroll-polyfills', 'css-scroll-snap'],
    'overflow-behavior': ['javascript-scroll-management', 'touch-action', 'css-scroll-snap'],
  };

  return alternatives[property] || ['flexbox', 'grid', 'javascript-solution'];
}

/**
 * Gets implementation guidance for using a specific CSS property
 * @param property - The CSS property to get guidance for
 * @param fallbackNeeded - Whether fallback strategies should be included
 * @returns Promise that resolves to comprehensive implementation guidance
 */
export async function getImplementationGuidance(property: string, fallbackNeeded: boolean): Promise<ImplementationGuidance> {
  const guidance: Record<string, ImplementationGuidance> = {
    flexbox: {
      basic_usage: 'display: flex; justify-content: center; align-items: center;',
      best_practices: [
        'Use flex-wrap for responsive layouts',
        'Combine with gap property for spacing',
        'Consider flex-direction for different layouts',
      ],
      fallbacks: fallbackNeeded ? ['Use display: table-cell for older browsers', 'Provide float-based layout for IE9 and below'] : [],
      example_code: `
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  ${fallbackNeeded ? '/* Fallback for older browsers */\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;' : ''}
}
      `.trim(),
    },
    grid: {
      basic_usage: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;',
      best_practices: [
        'Use fr units for flexible layouts',
        'Combine with minmax() for responsive design',
        'Use grid-template-areas for complex layouts',
      ],
      fallbacks: fallbackNeeded ? ["Use flexbox for browsers that don't support grid", 'Provide float-based layout for legacy browsers'] : [],
      example_code: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  ${fallbackNeeded ? '/* Fallback for older browsers */\n  display: flex;\n  flex-wrap: wrap;' : ''}
}
      `.trim(),
    },
    'scroll-snap': {
      basic_usage: 'scroll-snap-type: x mandatory; scroll-snap-align: start; overflow-x: auto;',
      best_practices: [
        'Use scroll-behavior: smooth for better UX',
        'Combine with scroll-margin for spacing',
        'Consider scroll-snap-stop for forced stops',
      ],
      fallbacks: fallbackNeeded ? ['Use JavaScript carousel libraries for older browsers', 'Provide arrow navigation buttons'] : [],
      example_code: `
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  ${fallbackNeeded ? '/* Fallback */\n  -webkit-overflow-scrolling: touch;' : ''}
}
.carousel-item {
  flex: none;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
      `.trim(),
    },
    'anchor-positioning': {
      basic_usage: 'anchor-name: --my-anchor; position-anchor: --my-anchor; top: anchor(bottom);',
      best_practices: [
        'Use meaningful anchor names',
        'Consider anchor scope for complex layouts',
        'Test with position-try for fallback positions',
      ],
      fallbacks: fallbackNeeded ? ['Use JavaScript positioning libraries like Floating UI', 'Use absolute positioning with manual calculations'] : [],
      example_code: `
.anchor {
  anchor-name: --tooltip-anchor;
}
.tooltip {
  position-anchor: --tooltip-anchor;
  position: absolute;
  top: anchor(bottom);
  left: anchor(center);
  ${fallbackNeeded ? '/* Fallback */\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);' : ''}
}
      `.trim(),
    },
    'css-layers': {
      basic_usage: '@layer base, components, utilities; @layer components { .button { color: blue; } }',
      best_practices: [
        'Define layers early in your stylesheet',
        'Use meaningful layer names',
        'Order layers from low to high specificity',
      ],
      fallbacks: fallbackNeeded ? ['Use BEM methodology for specificity control', 'Use CSS modules or styled-components'] : [],
      example_code: `
@layer base, components, utilities;

@layer base {
  button { font-family: inherit; }
}
@layer components {
  .btn { padding: 8px 16px; }
}
@layer utilities {
  .text-center { text-align: center; }
}
${fallbackNeeded ? '/* Fallback: Use BEM naming */\n.btn--primary { background: blue; }' : ''}
      `.trim(),
    },
    'css-supports': {
      basic_usage: '@supports (display: grid) { .layout { display: grid; } }',
      best_practices: [
        'Use for progressive enhancement',
        'Combine with feature detection libraries',
        'Test both positive and negative cases',
      ],
      fallbacks: fallbackNeeded ? ['Use Modernizr for older browser support', 'Use JavaScript feature detection'] : [],
      example_code: `
@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
@supports not (display: grid) {
  .layout {
    display: flex;
  }
}
${fallbackNeeded ? '/* Fallback with Modernizr */\n.no-grid .layout { display: flex; }' : ''}
      `.trim(),
    },
    'css-has': {
      basic_usage: '.card:has(img) { border: 1px solid gray; }',
      best_practices: [
        'Use for conditional parent styling',
        'Combine with other modern selectors',
        'Consider performance with complex selectors',
      ],
      fallbacks: fallbackNeeded ? ['Use JavaScript to add classes based on content', 'Use MutationObserver for dynamic content'] : [],
      example_code: `
.card:has(img) {
  border: 1px solid gray;
  padding: 16px;
}
.form:has(:invalid) {
  border-color: red;
}
${fallbackNeeded ? '/* Fallback with JS */\n.card.has-image { border: 1px solid gray; }' : ''}
      `.trim(),
    },
    'relative-colors': {
      basic_usage: 'color: hsl(from var(--primary) h s calc(l * 0.8));',
      best_practices: [
        'Use for consistent color variations',
        'Combine with CSS custom properties',
        'Consider accessibility with color contrasts',
      ],
      fallbacks: fallbackNeeded ? ['Use Sass color functions', 'Use JavaScript color manipulation libraries', 'Pre-define color variations'] : [],
      example_code: `
:root {
  --primary: oklch(60% 0.15 200);
}
.button {
  background: var(--primary);
  border-color: oklch(from var(--primary) calc(l * 0.8) c h);
}
.button:hover {
  background: oklch(from var(--primary) calc(l * 1.1) c h);
}
${fallbackNeeded ? '/* Fallback */\n:root {\n  --primary-dark: #1a5490;\n  --primary-light: #3b82f6;\n}' : ''}
      `.trim(),
    },
    'text-box-trim': {
      basic_usage: 'text-box-trim: trim-both;',
      best_practices: [
        'Use for precise text alignment with icons',
        'Apply to headings for consistent spacing',
        'Combine with design system components',
      ],
      fallbacks: fallbackNeeded ? ['Adjust line-height and margins manually', 'Use JavaScript for text metrics calculation'] : [],
      example_code: `
h1, h2, h3 {
  text-box-trim: trim-both;
  margin: 0;
  ${fallbackNeeded ? '/* Fallback */\n  line-height: 1;\n  margin-top: -0.1em;\n  margin-bottom: -0.1em;' : ''}
}
.icon-text {
  text-box-trim: trim-both;
  vertical-align: middle;
}
      `.trim(),
    },
    'grid-repeat': {
      basic_usage: 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));',
      best_practices: [
        'Use auto-fit for responsive layouts that collapse empty tracks',
        'Use auto-fill to maintain consistent grid structure',
        'Always combine with minmax() for flexible sizing',
      ],
      fallbacks: fallbackNeeded ? ['Use flexbox with flex-basis for similar behavior', 'Use JavaScript for dynamic grid sizing'] : [],
      example_code: `
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  ${fallbackNeeded ? '/* Fallback */\n  display: flex;\n  flex-wrap: wrap;\n}\n.responsive-grid > * {\n  flex: 1 1 250px;' : ''}
}
      `.trim(),
    },
    'grid-template-areas': {
      basic_usage: 'grid-template-areas: "header header" "sidebar main" "footer footer";',
      best_practices: [
        'Use meaningful area names',
        'Keep the visual layout clear and readable',
        'Combine with responsive design for different layouts',
      ],
      fallbacks: fallbackNeeded ? ['Use grid-column and grid-row properties', 'Use flexbox for simpler layouts'] : [],
      example_code: `
.layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  ${fallbackNeeded ? '/* Fallback */\n  display: flex;\n  flex-direction: column;' : ''}
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
      `.trim(),
    },
    'view-transitions': {
      basic_usage: 'view-transition-name: main-content; document.startViewTransition(() => updateDOM());',
      best_practices: [
        'Use meaningful transition names',
        'Keep transitions subtle and performant',
        'Provide fallbacks for non-supporting browsers',
      ],
      fallbacks: fallbackNeeded ? ['Use CSS transitions and animations', 'Use JavaScript animation libraries'] : [],
      example_code: `
.hero {
  view-transition-name: hero-section;
}
::view-transition-old(hero-section),
::view-transition-new(hero-section) {
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
}
${fallbackNeeded ? '/* Fallback */\n.hero {\n  transition: all 0.5s ease-in-out;\n}' : ''}
      `.trim(),
    },
    'container-style-queries': {
      basic_usage: '@container style(--theme: dark) { .component { color: white; } }',
      best_practices: [
        'Use custom properties for theme detection',
        'Keep style queries simple and performant',
        'Combine with size queries for comprehensive responsive design',
      ],
      fallbacks: fallbackNeeded ? ['Use JavaScript to detect parent styles', 'Use CSS custom properties with manual classes'] : [],
      example_code: `
.theme-container {
  --theme: light;
  container-type: inline-size;
}
@container style(--theme: dark) {
  .card {
    background: #333;
    color: white;
  }
}
${fallbackNeeded ? '/* Fallback */\n.theme-container.dark .card {\n  background: #333;\n  color: white;\n}' : ''}
      `.trim(),
    },
    'color-mix': {
      basic_usage: 'color: color-mix(in srgb, blue 60%, white);',
      best_practices: [
        'Choose appropriate color spaces for mixing',
        'Use for dynamic theme generation',
        'Consider accessibility when mixing colors',
      ],
      fallbacks: fallbackNeeded ? ['Use Sass mix() function', 'Pre-calculate color variations', 'Use JavaScript color libraries'] : [],
      example_code: `
.button {
  --base-color: blue;
  background: color-mix(in srgb, var(--base-color) 80%, white);
  border-color: color-mix(in srgb, var(--base-color) 60%, black);
}
.button:hover {
  background: color-mix(in srgb, var(--base-color) 90%, white);
}
${fallbackNeeded ? '/* Fallback with Sass */\n$base-color: blue;\n.button {\n  background: mix($base-color, white, 80%);\n}' : ''}
      `.trim(),
    },
    'css-isolation': {
      basic_usage: 'isolation: isolate;',
      best_practices: [
        'Use to fix z-index stacking issues',
        'Apply to component containers',
        'Combine with other containment properties',
      ],
      fallbacks: fallbackNeeded ? ['Use transform: translateZ(0)', 'Use will-change: transform', 'Use position: relative with z-index'] : [],
      example_code: `
.modal {
  isolation: isolate;
  z-index: 1000;
}
.dropdown {
  isolation: isolate;
  position: relative;
}
.component {
  isolation: isolate;
  contain: layout style paint;
  ${fallbackNeeded ? '/* Fallback */\n  transform: translateZ(0);\n  will-change: transform;' : ''}
}
      `.trim(),
    },
    'details-content': {
      basic_usage: 'details::details-content { padding: 1rem; }',
      best_practices: [
        'Style the content area separately from the summary',
        'Use animations for smooth expand/collapse',
        'Consider accessibility with proper ARIA attributes',
      ],
      fallbacks: fallbackNeeded ? ['Use JavaScript for accordion functionality', 'Use checkbox hack for CSS-only accordions'] : [],
      example_code: `
details {
  border: 1px solid #ccc;
  border-radius: 4px;
}
details::details-content {
  padding: 1rem;
  background: #f9f9f9;
  border-top: 1px solid #eee;
}
details[open]::details-content {
  animation: slideDown 0.3s ease;
}
${fallbackNeeded ? '/* Fallback */\n.accordion-content {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.3s ease;\n}\n.accordion.open .accordion-content {\n  max-height: 500px;\n}' : ''}
      `.trim(),
    },
    'container-query-units': {
      basic_usage: 'width: 50cqi; height: 30cqb; font-size: clamp(1rem, 4cqmin, 2rem);',
      best_practices: [
        'Always use logical units (cqi, cqb) instead of physical (cqw, cqh)',
        'Combine with clamp() for fluid typography',
        'Use cqmin/cqmax for maintaining aspect ratios',
      ],
      fallbacks: fallbackNeeded ? ['Use viewport units as fallback', 'Use ResizeObserver with CSS custom properties', 'Use percentage units'] : [],
      example_code: `
.card-container {
  container-type: inline-size;
}
.card {
  width: 100cqi;
  padding: 2cqmin;
  font-size: clamp(0.875rem, 3cqmin, 1.25rem);
  border-radius: 1cqmin;
  ${fallbackNeeded ? '/* Fallback */\n  width: 100%;\n  padding: 1rem;\n  font-size: clamp(0.875rem, 3vmin, 1.25rem);' : ''}
}
      `.trim(),
    },
    'viewport-units': {
      basic_usage: 'height: 100dvh; width: 100svw; min-height: 100lvh;',
      best_practices: [
        'Use dvh for dynamic layouts that adapt to mobile browsers',
        'Use svh for conservative sizing that ensures visibility',
        'Use lvh for desktop-optimized full-screen experiences',
      ],
      fallbacks: fallbackNeeded ? ['Use traditional vh/vw units', 'Use JavaScript for viewport detection', 'Use CSS custom properties with JS'] : [],
      example_code: `
.full-screen {
  height: 100dvh;
  width: 100dvw;
  ${fallbackNeeded ? '/* Fallback */\n  height: 100vh;\n  width: 100vw;' : ''}
}
.mobile-safe {
  min-height: 100svh;
  padding: 2svi 2svb;
  ${fallbackNeeded ? '/* Fallback */\n  min-height: 100vh;\n  padding: 2vw;' : ''}
}
      `.trim(),
    },
    'logical-properties': {
      basic_usage: 'margin-block: 1rem; padding-inline: 2rem; border-block-start: 1px solid;',
      best_practices: [
        'Use logical properties by default for modern accessibility',
        'Prefer block/inline over top/bottom and left/right',
        'Combine with writing-mode for international layouts',
      ],
      fallbacks: fallbackNeeded ? ['Use physical properties as fallback', 'Use PostCSS Logical plugin', 'Use CSS custom properties'] : [],
      example_code: `
.component {
  margin-block: 1rem 2rem;
  padding-inline: 2rem;
  border-block-start: 1px solid #ccc;
  overflow-inline: auto;
  ${fallbackNeeded ? '/* Fallback */\n  margin-top: 1rem;\n  margin-bottom: 2rem;\n  padding-left: 2rem;\n  padding-right: 2rem;\n  border-top: 1px solid #ccc;\n  overflow-x: auto;' : ''}
}
      `.trim(),
    },
    'vmin-vmax-units': {
      basic_usage: 'border-radius: 2vmin; width: 80vmax; font-size: clamp(1rem, 3vmin, 2rem);',
      best_practices: [
        'Use vmin for consistent rounded corners across devices',
        'Use vmax for elements that need to scale with larger dimension',
        'Combine with clamp() for controlled scaling',
      ],
      fallbacks: fallbackNeeded ? ['Use fixed pixel values', 'Use rem with media queries', 'Use JavaScript for dynamic sizing'] : [],
      example_code: `
.rounded-box {
  border-radius: 2vmin;
  width: clamp(200px, 50vmin, 400px);
  aspect-ratio: 1;
  ${fallbackNeeded ? '/* Fallback */\n  border-radius: 8px;\n  width: 300px;\n  height: 300px;' : ''}
}
.hero-text {
  font-size: clamp(2rem, 8vmin, 6rem);
  line-height: 1.1;
}
      `.trim(),
    },
    'scroll-behavior': {
      basic_usage: 'scroll-behavior: smooth;',
      best_practices: [
        'Apply to html element for global smooth scrolling',
        'Consider user preferences for reduced motion',
        'Use on scroll containers for specific areas',
      ],
      fallbacks: fallbackNeeded ? ['Use JavaScript smooth scroll polyfill', 'Use CSS transitions on scroll position'] : [],
      example_code: `
html {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
.scroll-container {
  overflow-y: auto;
  scroll-behavior: smooth;
  ${fallbackNeeded ? '/* Fallback with JS */\n  /* Use smoothscroll polyfill */' : ''}
}
      `.trim(),
    },
    'overflow-behavior': {
      basic_usage: 'overflow: auto; overscroll-behavior: contain;',
      best_practices: [
        'Use overscroll-behavior: contain for modals',
        'Prevent scroll chaining in nested scroll areas',
        'Consider touch-action for mobile interactions',
      ],
      fallbacks: fallbackNeeded ? ['Use touch-action: none', 'Use JavaScript scroll management', 'Use position: fixed for modals'] : [],
      example_code: `
.modal {
  overflow-y: auto;
  overscroll-behavior: contain;
  ${fallbackNeeded ? '/* Fallback */\n  touch-action: none;' : ''}
}
.scroll-area {
  overflow: auto;
  overscroll-behavior-y: none;
  scroll-behavior: smooth;
  ${fallbackNeeded ? '/* Fallback */\n  -webkit-overflow-scrolling: touch;' : ''}
}
      `.trim(),
    },
  };

  return (
    guidance[property] || {
      basic_usage: `${property}: value;`,
      best_practices: ['Test across different browsers', 'Consider progressive enhancement'],
      fallbacks: fallbackNeeded ? ['Provide fallback for older browsers'] : [],
      example_code: `
.element {
  ${property}: value;
  ${fallbackNeeded ? '/* Add fallback properties above */' : ''}
}
    `.trim(),
    }
  );
}