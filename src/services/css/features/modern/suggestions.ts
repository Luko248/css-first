/**
 * Modern CSS Features - Syntax examples and use cases
 */

export const MODERN_CSS_SYNTAX = {
  'CSS Container Queries': `
/* Size-based container queries (logical units preferred) */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

.card {
  container: card / size; /* both inline and block */
}

/* Logical container queries (preferred) */
@container sidebar (inline-size > 30cqi) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2cqi; /* Container query inline unit */
  }
}

@container card (block-size > 20cqb) {
  .card-content {
    padding-block: 2cqb; /* Container query block unit */
  }
}

/* Style queries - query container's style properties */
@container style(--theme: dark) {
  .card {
    background: var(--dark-bg);
    color: var(--dark-text);
  }
}

/* Scroll state queries (experimental) */
@container scroll-state(stuck: top) {
  .sticky-header {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}

/* Complex logical container queries */
@container (30cqi <= inline-size <= 60cqi) and (block-size > 20cqb) {
  .responsive-component {
    display: grid;
    grid-template: auto 1fr / 1fr 2fr;
    gap: min(2cqi, 2cqb);
  }
}`,

  'CSS Cascade Layers': `
/* Define layer order */
@layer base, components, utilities;

/* Base layer */
@layer base {
  html {
    color-scheme: light dark;
  }
}

/* Components layer */
@layer components {
  .button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
  }
}

/* Utilities layer (highest priority) */
@layer utilities {
  .text-center { text-align: center; }
}`,

  'CSS Subgrid': `
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
}

.grid-item {
  display: grid;
  grid-column: span 3;
  grid-template-columns: subgrid; /* Inherits parent columns */
  gap: inherit;
}

.nested-item {
  grid-column: 2; /* Aligns with parent's second column */
}`,

  'CSS color-mix() Function': `
:root {
  --primary: blue;
  --secondary: red;
}

.element {
  /* Mix colors in different color spaces */
  background: color-mix(in srgb, var(--primary) 70%, white);
  border-color: color-mix(in oklch, red 50%, blue);
  
  /* Dynamic mixing */
  color: color-mix(in hsl, var(--primary) var(--mix-amount, 80%), black);
}

/* Hover state with mixed color */
.button:hover {
  background: color-mix(in srgb, var(--primary) 90%, white);
}`,

  'Dynamic Viewport Units': `
/* Logical viewport units (preferred - writing-mode aware) */
.hero {
  block-size: 100dvb; /* Dynamic viewport block (preferred) */
  inline-size: 100dvi; /* Dynamic viewport inline (preferred) */
  
  /* Physical fallbacks for older browsers */
  height: 100dvh; /* Dynamic viewport height (fallback) */
  width: 100dvw;  /* Dynamic viewport width (fallback) */
}

/* Small viewport logical units */
.sidebar {
  min-block-size: 100svb; /* Small viewport block */
  max-inline-size: 25svi;  /* Small viewport inline */
  
  /* Physical fallbacks */
  min-height: 100svh;
  max-width: 25svw;
}

/* Large viewport logical units */
.fullscreen {
  block-size: 100lvb; /* Large viewport block */
  inline-size: 100lvi; /* Large viewport inline */
  
  /* Physical fallbacks */
  height: 100lvh;
  width: 100lvw;
}

/* Responsive typography with logical units */
.responsive-text {
  font-size: clamp(1rem, 4dvi, 2rem); /* Logical preferred */
  font-size: clamp(1rem, 4dvw, 2rem); /* Physical fallback */
}

/* Complex responsive layout with logical units */
.responsive-layout {
  padding-inline: clamp(1rem, 5dvi, 3rem);
  padding-block: clamp(0.5rem, 3dvb, 2rem);
  margin-inline: max(2rem, 10dvi);
  
  /* Container with logical viewport constraints */
  min-block-size: max(50dvb, 20rem);
  max-inline-size: min(90dvi, 1200px);
}`,

  'Scroll-driven Animations': `
/* Define scroll timeline */
@scroll-timeline page-scroll {
  source: auto;
  orientation: block;
}

/* Element that animates based on scroll */
.progress-bar {
  animation: grow 1s linear forwards;
  animation-timeline: page-scroll;
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* View timeline for intersection-based animations */
.reveal-element {
  animation: reveal 1s ease-out forwards;
  animation-timeline: view();
  animation-range: entry 0% cover 100%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(2rem); }
  to { opacity: 1; transform: translateY(0); }
}`,

  'CSS Nesting': `
.card {
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  
  /* Nested element selectors */
  & .title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    
    /* Deep nesting */
    & a {
      color: var(--primary);
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  /* Nested pseudo-classes */
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Nested media queries */
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
}`,

  'CSS :has() Pseudo-class': `
/* Style cards that contain images */
.card:has(img) {
  border: 2px solid blue;
  padding: 0;
}

/* Style forms with invalid inputs */
form:has(input:invalid) {
  border-color: red;
}

/* Parent styling based on child state */
.container:has(.error) {
  background-color: #ffeaea;
}

/* Complex descendant queries */
article:has(h2 + p) {
  margin-top: 2rem;
}

/* Quantity queries */
.list:has(li:nth-child(n+5)) {
  columns: 2;
}`,

  'CSS aspect-ratio': `
/* Video container */
.video-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* Square elements */
.avatar {
  aspect-ratio: 1;
  width: 4rem;
}

/* Golden ratio */
.hero-image {
  aspect-ratio: 1.618;
  width: 100%;
}

/* Responsive aspect ratios */
.responsive-container {
  aspect-ratio: 4 / 3;
  
  @media (min-width: 768px) {
    aspect-ratio: 16 / 9;
  }
}`,

  'Enhanced Math Functions': `
/* Responsive typography */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: clamp(1.2, 1.5, 1.8);
}

/* Dynamic spacing */
.section {
  padding: clamp(1rem, 5vw, 4rem);
  margin-block: max(2rem, 10vh);
}

/* Trigonometric functions */
.rotating-element {
  --angle: 45deg;
  transform: rotate(var(--angle));
  width: calc(100px * sin(var(--angle)));
}

/* Modular scaling */
.grid-item {
  width: calc(100% / round(100vw / 250px));
}`,

  'Enhanced Logical Properties': `
/* Writing-mode aware spacing */
.content {
  margin-inline: auto;
  margin-block: 2rem;
  padding-inline: 1rem;
  padding-block: 2rem;
  max-inline-size: 65ch;
}

/* Logical borders */
.card {
  border-inline: 1px solid #ccc;
  border-block-start: 3px solid var(--primary);
}

/* Logical positioning */
.sidebar {
  position: fixed;
  inset-inline-start: 0;
  inset-block: 0;
  inline-size: 300px;
}`,

  'CSS backdrop-filter': `
/* Glass morphism effect */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Modal backdrop */
.modal-backdrop {
  backdrop-filter: blur(5px) brightness(0.5);
}

/* Navigation bar */
.nav-bar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(200%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}`,

  'CSS Anchor Positioning': `
/* Define anchor */
.anchor-element {
  anchor-name: --my-anchor;
}

/* Position relative to anchor */
.positioned-element {
  position: absolute;
  position-anchor: --my-anchor;
  top: anchor(bottom);
  left: anchor(center);
}

/* Tooltip positioning */
.tooltip {
  position: absolute;
  position-anchor: --button-anchor;
  bottom: anchor(top);
  left: anchor(center);
  transform: translateX(-50%);
}`
};

export const MODERN_CSS_USE_CASES = {
  'CSS Container Queries': [
    'Responsive component design independent of viewport',
    'Card layouts that adapt to container width',
    'Sidebar widgets with different layouts based on space',
    'Dashboard components that rearrange based on available space'
  ],
  
  'CSS Cascade Layers': [
    'Organizing CSS architecture in large projects',
    'Managing third-party CSS integration',
    'Creating design system with clear precedence',
    'Avoiding CSS specificity wars'
  ],
  
  'CSS Subgrid': [
    'Aligning nested grid items with parent grid',
    'Creating card layouts with aligned content',
    'Form layouts with consistent alignment',
    'Complex magazine-style layouts'
  ],
  
  'Dynamic Viewport Units': [
    'Full-height sections on mobile (accounting for browser UI)',
    'Responsive typography that scales with actual viewport',
    'Mobile-first layouts that adapt to address bar changes',
    'Consistent spacing across different mobile browsers'
  ],
  
  'CSS Nesting': [
    'Cleaner, more maintainable CSS',
    'Component-based styling without preprocessors',
    'Reducing CSS file size and complexity',
    'Better organization of related styles'
  ],
  
  'CSS :has() Pseudo-class': [
    'Parent styling based on child content',
    'Form validation styling',
    'Conditional layouts based on content',
    'Quantity-based responsive design'
  ],
  
  'CSS aspect-ratio': [
    'Responsive video embeds',
    'Consistent image proportions',
    'Square profile pictures',
    'Card layouts with fixed ratios'
  ],
  
  'Enhanced Math Functions': [
    'Fluid typography and spacing',
    'Complex responsive calculations',
    'Animation and transition calculations',
    'Grid and flexbox sizing formulas'
  ]
};

/**
 * Extracts modern CSS keywords from task descriptions with logical-first approach
 */
export function extractModernCSSKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDescription = description.toLowerCase();
  
  // Container query keywords (logical units preferred)
  if (lowerDescription.includes('container') || lowerDescription.includes('component responsive')) {
    keywords.push('container', 'container-query', 'cqi', 'cqb', 'logical-container');
  }
  
  // Container style queries
  if (lowerDescription.includes('style query') || lowerDescription.includes('theme based') || lowerDescription.includes('custom property')) {
    keywords.push('container-style-query', 'style-based', 'theme-aware');
  }
  
  // Container scroll state queries
  if (lowerDescription.includes('scroll state') || lowerDescription.includes('sticky') || lowerDescription.includes('scroll position')) {
    keywords.push('container-scroll-state', 'scroll-aware', 'sticky-behavior');
  }
  
  // Dynamic viewport keywords (logical units preferred)
  if (lowerDescription.includes('mobile') || lowerDescription.includes('browser ui') || lowerDescription.includes('address bar')) {
    keywords.push('dvi', 'dvb', 'svi', 'svb', 'dynamic-viewport', 'mobile-ui', 'logical-viewport');
  }
  
  // Writing mode awareness
  if (lowerDescription.includes('rtl') || lowerDescription.includes('writing mode') || lowerDescription.includes('international')) {
    keywords.push('logical', 'writing-mode', 'inline-block', 'rtl-aware');
  }
  
  // Color mixing keywords
  if (lowerDescription.includes('mix color') || lowerDescription.includes('blend color') || lowerDescription.includes('color combination')) {
    keywords.push('color-mix', 'color-blending');
  }
  
  // Scroll animation keywords
  if (lowerDescription.includes('scroll animation') || lowerDescription.includes('scroll-driven') || lowerDescription.includes('scroll progress')) {
    keywords.push('scroll-timeline', 'scroll-animation', 'view-timeline');
  }
  
  // Parent selector keywords
  if (lowerDescription.includes('parent based on child') || lowerDescription.includes('has child') || lowerDescription.includes('contains element')) {
    keywords.push('has', 'parent-selector', 'descendant-query');
  }
  
  // Nesting keywords
  if (lowerDescription.includes('nested css') || lowerDescription.includes('sass-like') || lowerDescription.includes('nesting rules')) {
    keywords.push('nesting', 'nested-rules');
  }
  
  // Aspect ratio keywords
  if (lowerDescription.includes('aspect ratio') || lowerDescription.includes('proportion') || lowerDescription.includes('16:9') || lowerDescription.includes('square')) {
    keywords.push('aspect-ratio', 'proportion');
  }
  
  // Modern layout keywords
  if (lowerDescription.includes('subgrid') || lowerDescription.includes('masonry') || lowerDescription.includes('advanced grid')) {
    keywords.push('subgrid', 'masonry', 'advanced-layout');
  }
  
  // Logical properties keywords
  if (lowerDescription.includes('writing mode') || lowerDescription.includes('logical properties') || lowerDescription.includes('inline-block direction')) {
    keywords.push('logical', 'writing-mode', 'inline-block');
  }
  
  // Backdrop filter keywords
  if (lowerDescription.includes('glass') || lowerDescription.includes('blur background') || lowerDescription.includes('frosted')) {
    keywords.push('backdrop-filter', 'glass-morphism');
  }
  
  // Anchor positioning keywords
  if (lowerDescription.includes('anchor') || lowerDescription.includes('position relative to element') || lowerDescription.includes('tooltip')) {
    keywords.push('anchor', 'anchor-positioning');
  }
  
  return keywords;
}