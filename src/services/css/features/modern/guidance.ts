/**
 * Modern CSS Features - Implementation guidance and best practices
 */

export const MODERN_CSS_GUIDANCE = {
  'CSS Container Queries': {
    implementation: `
/* 1. Set up container context (logical approach preferred) */
.component-container {
  container-type: size; /* both inline and block dimensions */
  container-name: my-component;
}

/* 2. Logical container queries (preferred) */
@container my-component (inline-size > 40cqi) {
  .component {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2cqi; /* Container query inline units */
    padding-inline: 3cqi;
  }
}

/* 3. Style queries for theme-based styling */
@container style(--theme: dark) {
  .component {
    background: var(--dark-surface);
    border-inline: 1px solid var(--dark-border);
  }
}

/* 4. Scroll state queries (experimental) */
@container scroll-state(stuck: top) {
  .sticky-component {
    backdrop-filter: blur(10px);
    border-block-end: 1px solid var(--border-color);
  }
}

/* 5. Complex logical queries */
@container (20cqb <= block-size <= 50cqb) and (inline-size > 30cqi) {
  .responsive-content {
    padding: min(2cqi, 2cqb) max(3cqi, 4cqb);
  }
}`,
    bestPractices: [
      'Always prefer logical units (cqi, cqb) over physical units (cqw, cqh)',
      'Use container-type: size for both dimensions when possible',
      'Name containers for better organization and reusability',
      'Combine size, style, and scroll state queries for advanced responsive design',
      'Use logical properties (padding-inline, margin-block) consistently',
      'Consider writing-mode changes when using logical units',
      'Test thoroughly in RTL languages when using logical properties'
    ],
    browserSupport: 'Chrome 105+ (size), Chrome 111+ (style/scroll experimental)',
    fallbacks: [
      'Provide physical unit fallbacks: cqw/cqh before cqi/cqb',
      'Use CSS Grid auto-fit/minmax for older browsers',
      'JavaScript-based container observation for complex fallbacks',
      'Progressive enhancement with feature detection'
    ]
  },

  'Dynamic Viewport Units': {
    implementation: `
/* Logical-first approach with dynamic viewport units */
.hero {
  /* Logical units (preferred - writing-mode aware) */
  block-size: 100svb; /* Small viewport block - fallback */
  block-size: 100dvb; /* Dynamic viewport block */
  inline-size: 100dvi; /* Dynamic viewport inline */
  
  /* Physical fallbacks for older browsers */
  height: 100svh;
  height: 100dvh;
  width: 100dvw;
}

/* Responsive typography with logical units */
.text {
  font-size: clamp(1rem, 4svi, 2rem); /* Small viewport inline */
  font-size: clamp(1rem, 4dvi, 2rem); /* Dynamic viewport inline */
  
  /* Physical fallbacks */
  font-size: clamp(1rem, 4svw, 2rem);
  font-size: clamp(1rem, 4dvw, 2rem);
}

/* Complex logical layout */
.responsive-container {
  min-block-size: max(50dvb, 20rem);
  max-inline-size: min(90dvi, 1200px);
  padding-inline: clamp(1rem, 5dvi, 3rem);
  padding-block: clamp(0.5rem, 3dvb, 2rem);
  margin-inline: auto;
}`,
    bestPractices: [
      'Always prefer logical viewport units (dvi, dvb, svi, svb, lvi, lvb)',
      'Provide physical unit fallbacks (dvw, dvh, svw, svh, lvw, lvh)',
      'Use logical units for writing-mode compatibility',
      'Test thoroughly in RTL languages and vertical writing modes',
      'Combine with logical properties (margin-inline, padding-block)',
      'Use clamp() with logical units for fluid scaling',
      'Consider env(safe-area-inset-*) for notched devices',
      'Test on mobile devices with different UI behaviors'
    ],
    browserSupport: 'Chrome 108+, Firefox 101+, Safari 15.4+ (logical variants experimental)',
    fallbacks: [
      'Layer fallbacks: 100vh → svh → dvh → dvb',
      'Use 100vw → svw → dvw → dvi progression',
      'JavaScript-based viewport detection for complex cases',
      'CSS custom properties with JS updates for dynamic behavior'
    ]
  },

  'CSS color-mix() Function': {
    implementation: `
:root {
  --primary: #007acc;
  --surface: white;
}

.element {
  /* Mix in sRGB color space */
  background: color-mix(in srgb, var(--primary) 10%, var(--surface));
  
  /* Mix in OKLCH for perceptually uniform results */
  color: color-mix(in oklch, var(--primary) 80%, black);
}`,
    bestPractices: [
      'Use oklch color space for perceptually uniform mixing',
      'Prefer srgb for simple opacity-like effects',
      'Use CSS custom properties for dynamic mixing percentages',
      'Test color combinations for accessibility compliance',
      'Consider using with light-dark() for theme-aware colors'
    ],
    browserSupport: 'Chrome 111+, Firefox 113+, Safari 16.2+',
    fallbacks: [
      'Use rgba() with calculated opacity values',
      'CSS custom properties with JavaScript calculations',
      'Sass color.mix() function during build time'
    ]
  },

  'CSS :has() Pseudo-class': {
    implementation: `
/* Style parent based on child content */
.card:has(img) {
  padding: 0;
  overflow: hidden;
}

/* Form validation styling */
.form-group:has(input:invalid) {
  border-color: red;
}

/* Quantity queries */
.grid:has(li:nth-child(n+6)) {
  grid-template-columns: repeat(3, 1fr);
}`,
    bestPractices: [
      'Use :has() for parent-child relationship styling',
      'Combine with form validation for better UX',
      'Implement quantity queries for responsive layouts',
      'Be mindful of performance with complex selectors',
      'Use with CSS Grid/Flexbox for layout adaptations'
    ],
    browserSupport: 'Chrome 105+, Firefox 121+, Safari 15.4+',
    fallbacks: [
      'JavaScript-based class toggling',
      'CSS class-based approaches',
      'Progressive enhancement strategy'
    ]
  },

  'CSS Nesting': {
    implementation: `
.component {
  padding: 1rem;
  
  /* Nested element */
  & .title {
    font-size: 1.5rem;
    
    /* Nested pseudo-class */
    &:hover {
      color: blue;
    }
  }
  
  /* Nested media query */
  @media (min-width: 768px) {
    padding: 2rem;
  }
}`,
    bestPractices: [
      'Keep nesting depth reasonable (max 3-4 levels)',
      'Use & for explicit parent reference',
      'Nest media queries for component-based responsive design',
      'Maintain readable and maintainable code structure',
      'Use nesting for related styles, not arbitrary hierarchy'
    ],
    browserSupport: 'Chrome 112+, Firefox 117+, Safari 16.5+',
    fallbacks: [
      'Use CSS preprocessors (Sass, Less) for older browsers',
      'PostCSS with nesting plugin',
      'Manual flattening for legacy support'
    ]
  },

  'CSS aspect-ratio': {
    implementation: `
/* Video container with aspect ratio */
.video-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
  
  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Responsive aspect ratios */
.hero {
  aspect-ratio: 2 / 1;
  
  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
  }
}`,
    bestPractices: [
      'Use aspect-ratio instead of padding-bottom hacks',
      'Combine with object-fit for media elements',
      'Use fractional values (16/9) for clarity',
      'Consider different ratios for different screen sizes',
      'Test with various content lengths'
    ],
    browserSupport: 'Chrome 88+, Firefox 89+, Safari 15+',
    fallbacks: [
      'Padding-bottom percentage technique',
      'Fixed height with media queries',
      'JavaScript-based height calculation'
    ]
  },

  'Enhanced Math Functions': {
    implementation: `
/* Fluid typography */
.heading {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

/* Complex calculations */
.grid-item {
  width: calc(100% / round(up, 100vw / 300px));
  margin: max(1rem, 2vw);
}

/* Trigonometric for animations */
.element {
  transform: rotate(calc(sin(var(--progress)) * 45deg));
}`,
    bestPractices: [
      'Use clamp() for responsive typography and spacing',
      'Combine min(), max() for flexible sizing',
      'Use round() for grid calculations',
      'Test mathematical expressions thoroughly',
      'Document complex calculations for maintenance'
    ],
    browserSupport: 'Varies by function - clamp() excellent, trig functions experimental',
    fallbacks: [
      'Use CSS custom properties with JavaScript',
      'Media query breakpoints for clamp() alternatives',
      'Sass math functions during build'
    ]
  },

  'CSS Anchor Positioning': {
    implementation: `
/* Define anchor */
.button {
  anchor-name: --my-button;
}

/* Position tooltip relative to anchor */
.tooltip {
  position: absolute;
  position-anchor: --my-button;
  top: anchor(bottom);
  left: anchor(center);
  transform: translateX(-50%);
}`,
    bestPractices: [
      'Use semantic anchor names for clarity',
      'Combine with transform for fine-tuned positioning',
      'Consider anchor-scope for complex layouts',
      'Plan for anchor element movement/changes',
      'Use with container queries for responsive positioning'
    ],
    browserSupport: 'Chrome 125+ (experimental)',
    fallbacks: [
      'JavaScript-based positioning',
      'CSS Grid/Flexbox positioning',
      'Fixed positioning with transforms'
    ]
  },

  'CSS light-dark() Function': {
    implementation: `
/* Set up color scheme support */
:root {
  color-scheme: light dark;
}

/* Use light-dark() for theme-aware colors */
.element {
  background: light-dark(white, #1a1a1a);
  color: light-dark(#333, #f0f0f0);
  border: 1px solid light-dark(#ddd, #444);
}

/* Complex color mixing with light-dark() */
.card {
  background: light-dark(
    color-mix(in srgb, white 95%, blue),
    color-mix(in srgb, #1a1a1a 95%, cyan)
  );
  box-shadow: 0 2px 8px light-dark(
    rgba(0,0,0,0.1),
    rgba(255,255,255,0.1)
  );
}`,
    bestPractices: [
      'ALWAYS declare color-scheme: light dark on :root when using light-dark()',
      'DO NOT combine light-dark() with @media (prefers-color-scheme) - they conflict',
      'Use light-dark() for automatic theme switching based on user preference',
      'Provide semantically appropriate colors for both light and dark values',
      'Test both themes for accessibility compliance',
      'Use with CSS custom properties for maintainable theme systems',
      'Consider using with color-mix() for sophisticated color schemes'
    ],
    browserSupport: 'Chrome 123+, Firefox 120+, Safari 17.5+',
    fallbacks: [
      'Use @media (prefers-color-scheme) with CSS custom properties',
      'JavaScript-based theme switching',
      'CSS custom properties with manual class toggling',
      'Build-time theme generation'
    ],
    antiPatterns: [
      'DON\'T: Combining light-dark() with prefers-color-scheme media queries',
      'DON\'T: Using light-dark() without color-scheme declaration',
      'DON\'T: Using identical values for light and dark (defeats the purpose)',
      'DON\'T: Overriding light-dark() with manual theme classes'
    ],
    correctExample: `
/* ✅ CORRECT: Use light-dark() OR prefers-color-scheme, not both */
:root {
  color-scheme: light dark;
}

.theme-aware {
  background: light-dark(white, #1a1a1a);
  color: light-dark(#333, #f0f0f0);
}`,
    incorrectExample: `
/* ❌ INCORRECT: Don't combine light-dark() with prefers-color-scheme */
:root {
  color-scheme: light dark;
}

.conflicted {
  background: light-dark(white, #1a1a1a);
}

@media (prefers-color-scheme: dark) {
  .conflicted {
    background: #2a2a2a; /* Conflicts with light-dark() */
  }
}`
  }
};

/**
 * Get implementation guidance for modern CSS features
 */
export function getModernCSSGuidance(featureName: string): any {
  return (MODERN_CSS_GUIDANCE as any)[featureName] || {
    implementation: 'Feature guidance not available',
    bestPractices: ['Check MDN documentation for latest information'],
    browserSupport: 'Check caniuse.com for current support',
    fallbacks: ['Progressive enhancement recommended']
  };
}