/**
 * Modern CSS Features (2021-2025) - Auto-discovered and integrated from MDN
 * These features have been automatically categorized and integrated using context7
 */

import { CSSFeature, CSSFeatureCategory } from '../../types.js';

export const MODERN_CSS_FEATURES: Record<string, CSSFeature> = {
  // Container Queries (2022) - Complete with size, style, and scroll state queries
  container_queries: {
    name: "CSS Container Queries",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: [
      // Container setup
      "container-type",
      "container-name", 
      "container",
      "@container",
      // Container query units (logical preferred)
      "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax"
    ],
    description: "Apply styles based on containing element size, style, or scroll state",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries"
  },

  // Container Style Queries (2023-2024)
  container_style_queries: {
    name: "CSS Container Style Queries",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: [
      "@container style()",
      "container-type"
    ],
    description: "Query container's computed style values for conditional styling",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries#container_style_queries"
  },

  // Container Scroll State Queries (Experimental)
  container_scroll_state_queries: {
    name: "CSS Container Scroll State Queries",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: [
      "@container scroll-state()",
      "container-type"
    ],
    description: "Query container's scroll state for scroll-aware styling",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries#container_scroll_state_queries"
  },

  // CSS Cascade Layers (2022) - Better style organization
  cascade_layers: {
    name: "CSS Cascade Layers",
    category: CSSFeatureCategory.LOGICAL,
    properties: ["@layer"],
    description: "Control cascade order and create explicit style layers",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@layer"
  },

  // Subgrid (2019-2023) - Grid enhancement
  subgrid: {
    name: "CSS Subgrid",
    category: CSSFeatureCategory.LAYOUT,
    properties: ["grid-template-columns", "grid-template-rows"],
    description: "Grid items participate in parent grid sizing with 'subgrid' value",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid"
  },

  // Color Functions Level 4 & 5 (2021-2024)
  color_mix: {
    name: "CSS color-mix() Function",
    category: CSSFeatureCategory.VISUAL,
    properties: ["color-mix"],
    description: "Mix two colors in specified color space",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix"
  },

  color_contrast: {
    name: "CSS color-contrast() Function",
    category: CSSFeatureCategory.VISUAL,
    properties: ["color-contrast"],
    description: "Automatically select highest contrast color from a list",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-contrast"
  },

  accent_color: {
    name: "CSS accent-color",
    category: CSSFeatureCategory.VISUAL,
    properties: ["accent-color"],
    description: "Customize accent color of form controls",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color"
  },

  color_scheme: {
    name: "CSS color-scheme",
    category: CSSFeatureCategory.VISUAL,
    properties: ["color-scheme"],
    description: "Indicate which color schemes an element can be rendered in",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme"
  },

  light_dark: {
    name: "CSS light-dark() Function",
    category: CSSFeatureCategory.VISUAL,
    properties: ["light-dark"],
    description: "Return different values for light and dark color schemes",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark"
  },

  // Dynamic Viewport Units (2022-2023) - Complete with logical variants
  dynamic_viewport: {
    name: "Dynamic Viewport Units",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: [
      // Physical viewport units
      "dvh", "dvw", "svh", "svw", "lvh", "lvw",
      // Logical viewport units (preferred)
      "dvi", "dvb", "svi", "svb", "lvi", "lvb"
    ],
    description: "Viewport units that adjust for mobile browser UI with logical and physical variants",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths"
  },

  // Scroll-driven Animations (2023-2024)
  scroll_timeline: {
    name: "Scroll-driven Animations",
    category: CSSFeatureCategory.ANIMATION,
    properties: [
      "scroll-timeline",
      "scroll-timeline-name",
      "scroll-timeline-axis",
      "animation-timeline",
      "view-timeline",
      "view-timeline-name",
      "view-timeline-axis"
    ],
    description: "CSS animations driven by scroll progress",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_driven_Animations"
  },

  // CSS Nesting (2023)
  css_nesting: {
    name: "CSS Nesting",
    category: CSSFeatureCategory.LOGICAL,
    properties: ["&"],
    description: "Write nested CSS rules natively in CSS",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Nesting"
  },

  // :has() Selector (2022)
  has_selector: {
    name: "CSS :has() Pseudo-class",
    category: CSSFeatureCategory.INTERACTION,
    properties: [":has()"],
    description: "Select elements based on their descendants",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:has"
  },

  // CSS aspect-ratio (2021)
  aspect_ratio: {
    name: "CSS aspect-ratio",
    category: CSSFeatureCategory.LAYOUT,
    properties: ["aspect-ratio"],
    description: "Set preferred aspect ratio for elements",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio"
  },

  // Enhanced Math Functions (2021-2023)
  math_functions: {
    name: "CSS Enhanced Math Functions",
    category: CSSFeatureCategory.LOGICAL,
    properties: ["clamp", "min", "max", "round", "mod", "rem", "sin", "cos", "tan"],
    description: "Advanced mathematical functions for responsive design",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#math_functions"
  },

  // Logical Properties Enhancements (2021-2022)
  logical_properties_enhanced: {
    name: "Enhanced Logical Properties",
    category: CSSFeatureCategory.LOGICAL,
    properties: [
      "margin-inline", "margin-block",
      "padding-inline", "padding-block", 
      "border-inline", "border-block",
      "inset-inline", "inset-block"
    ],
    description: "Writing-mode aware spacing and sizing properties",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties"
  },

  // Flexbox gap (2021)
  flexbox_gap: {
    name: "Flexbox gap Property",
    category: CSSFeatureCategory.LAYOUT,
    properties: ["gap", "row-gap", "column-gap"],
    description: "Gap property support in flexbox layouts",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap"
  },

  // Text Decoration Enhancements (2021)
  text_decoration_enhanced: {
    name: "Enhanced Text Decoration",
    category: CSSFeatureCategory.VISUAL,
    properties: [
      "text-decoration-thickness",
      "text-underline-offset",
      "text-decoration-skip-ink"
    ],
    description: "Better control over text decoration appearance",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration"
  },

  // backdrop-filter Wider Support (2021-2022)
  backdrop_filter: {
    name: "CSS backdrop-filter",
    category: CSSFeatureCategory.VISUAL,
    properties: ["backdrop-filter"],
    description: "Apply graphical effects to area behind element",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter"
  },

  // overscroll-behavior (2021)
  overscroll_behavior: {
    name: "CSS overscroll-behavior",
    category: CSSFeatureCategory.INTERACTION,
    properties: [
      "overscroll-behavior",
      "overscroll-behavior-x", 
      "overscroll-behavior-y"
    ],
    description: "Control scroll chaining and overscroll behavior",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior"
  },

  // scroll-behavior (2021)
  scroll_behavior: {
    name: "CSS scroll-behavior",
    category: CSSFeatureCategory.INTERACTION,
    properties: ["scroll-behavior"],
    description: "Enable smooth scrolling behavior",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior"
  },

  // conic-gradient (2021)
  conic_gradient: {
    name: "CSS conic-gradient",
    category: CSSFeatureCategory.VISUAL,
    properties: ["conic-gradient"],
    description: "Create conical/angular gradients",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient"
  },

  // image-set() (2021-2022)
  image_set: {
    name: "CSS image-set() Function",
    category: CSSFeatureCategory.VISUAL,
    properties: ["image-set"],
    description: "Provide multiple image options for different resolutions",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/image/image-set"
  },

  // env() function (2021-2022)
  env_function: {
    name: "CSS env() Function",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: ["env"],
    description: "Access environment variables like safe area insets",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/env"
  },

  // Enhanced Media Queries (2021-2023)
  prefers_media_queries: {
    name: "Enhanced prefers-* Media Queries",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: [
      "prefers-color-scheme",
      "prefers-reduced-motion",
      "prefers-contrast",
      "prefers-reduced-transparency",
      "prefers-reduced-data"
    ],
    description: "Media queries for user preferences and accessibility",
    support_level: "excellent",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media#user_preference_media_features"
  },

  // forced-colors (2022)
  forced_colors: {
    name: "CSS forced-colors Media Query",
    category: CSSFeatureCategory.RESPONSIVE,
    properties: ["forced-colors"],
    description: "Detect when user agent enforces limited color palette",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors"
  },

  // CSS Anchor Positioning (2024)
  anchor_positioning: {
    name: "CSS Anchor Positioning",
    category: CSSFeatureCategory.POSITIONING,
    properties: [
      "anchor-name",
      "position-anchor",
      "anchor",
      "anchor-scope"
    ],
    description: "Position elements relative to other elements",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Anchor_Positioning"
  },

  // View Transitions (2023-2024)
  view_transitions: {
    name: "CSS View Transitions",
    category: CSSFeatureCategory.ANIMATION,
    properties: [
      "view-transition-name",
      "view-transition-class"
    ],
    description: "Smooth transitions between different views/pages",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name"
  },

  // CSS font-variant enhancements (2021-2023)
  font_variant_enhanced: {
    name: "Enhanced font-variant Properties",
    category: CSSFeatureCategory.VISUAL,
    properties: [
      "font-variant-alternates",
      "font-variant-east-asian",
      "font-variant-ligatures",
      "font-variant-numeric"
    ],
    description: "Fine-grained control over font variant features",
    support_level: "good",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant"
  },

  // Masonry Layout (Experimental)
  masonry_layout: {
    name: "CSS Masonry Layout",
    category: CSSFeatureCategory.LAYOUT,
    properties: ["masonry"],
    description: "Masonry-style grid layouts",
    support_level: "experimental",
    mdn_url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout"
  }
};

export const MODERN_CSS_KEYWORDS = [
  // Container Queries (with logical units preferred)
  'container', 'query', 'container-type', 'size', 'style-query', 'scroll-state',
  'cqi', 'cqb', 'cqw', 'cqh', 'cqmin', 'cqmax',
  
  // Dynamic Viewport (logical units preferred)
  'dvi', 'dvb', 'svi', 'svb', 'lvi', 'lvb', // Logical (preferred)
  'dvh', 'dvw', 'svh', 'svw', 'lvh', 'lvw', // Physical (fallback)
  'dynamic', 'viewport', 'mobile-ui',
  
  // Color Functions
  'color-mix', 'accent-color', 'light-dark', 'color-scheme',
  
  // Scroll Animations
  'scroll-timeline', 'view-timeline', 'scroll-driven',
  
  // Modern Selectors
  'has', 'parent', 'descendant',
  
  // Nesting
  'nesting', 'nested', 'sass-like',
  
  // Aspect Ratio
  'aspect-ratio', 'ratio', 'proportion',
  
  // Math Functions
  'clamp', 'min', 'max', 'round', 'trigonometric',
  
  // Logical Properties (always preferred)
  'logical', 'inline', 'block', 'writing-mode',
  'margin-inline', 'margin-block', 'padding-inline', 'padding-block',
  'border-inline', 'border-block', 'inset-inline', 'inset-block',
  
  // Modern Layout
  'subgrid', 'masonry', 'gap', 'flexbox',
  
  // Visual Effects
  'backdrop-filter', 'conic-gradient', 'image-set',
  
  // Interaction
  'overscroll', 'scroll-behavior', 'smooth',
  
  // Environment
  'env', 'safe-area', 'notch',
  
  // Preferences
  'prefers', 'reduced-motion', 'color-scheme', 'contrast',
  
  // Positioning
  'anchor', 'position-anchor',
  
  // Transitions
  'view-transition', 'page-transition'
];