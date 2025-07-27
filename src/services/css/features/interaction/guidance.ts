/**
 * Interaction Guidance - Implementation guidance for interactive properties
 */

import { ImplementationGuidance } from '../../types.js';

export const INTERACTION_GUIDANCE: Record<string, ImplementationGuidance> = {
  'scroll-snap-type': {
    basic_usage: '.container { scroll-snap-type: x mandatory; }',
    best_practices: [
      'Use mandatory for strict snapping behavior',
      'Use proximity for softer snapping that responds to user intent',
      'Choose appropriate axis (x, y, both) based on scroll direction',
      'Combine with scroll-padding for better alignment'
    ],
    fallbacks: [
      'Use JavaScript-based carousel for older browsers',
      'Provide alternative navigation methods',
      'Use CSS-only solutions with radio buttons'
    ],
    example_code: `
/* Horizontal carousel with mandatory snapping */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1rem;
}

/* Vertical scrolling with proximity snapping */
.vertical-scroller {
  height: 400px;
  overflow-y: auto;
  scroll-snap-type: y proximity;
}

/* Both axes snapping for grid layouts */
.grid-scroller {
  display: grid;
  grid-template-columns: repeat(3, 100%);
  grid-template-rows: repeat(3, 100%);
  overflow: auto;
  scroll-snap-type: both mandatory;
}

/* Photo gallery carousel */
.photo-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 20px;
  -webkit-overflow-scrolling: touch;
}

/* Card stack with vertical snapping */
.card-stack {
  height: 500px;
  overflow-y: auto;
  scroll-snap-type: y proximity;
  scroll-padding-top: 2rem;
}

/* Responsive scroll snap */
@media (max-width: 768px) {
  .carousel {
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;
  }
}

/* Fallback for unsupported browsers */
@supports not (scroll-snap-type: x mandatory) {
  .carousel {
    /* JavaScript carousel implementation required */
  }
}`
  },
  'scroll-snap-align': {
    basic_usage: '.item { scroll-snap-align: center; }',
    best_practices: [
      'Use start for left/top alignment in carousels',
      'Use center for featured content alignment',
      'Use end for right/bottom alignment',
      'Combine with scroll-margin for fine-tuning'
    ],
    fallbacks: [
      'Use CSS transforms for centering',
      'JavaScript scroll calculations',
      'Fixed positioning alternatives'
    ],
    example_code: `
/* Center-aligned carousel items */
.carousel-item {
  flex: 0 0 80%;
  scroll-snap-align: center;
  scroll-margin: 0 2rem;
}

/* Start-aligned items for consistent left alignment */
.list-item {
  scroll-snap-align: start;
  scroll-margin-top: 1rem;
}

/* End-aligned items for right-side snapping */
.end-aligned {
  scroll-snap-align: end;
  scroll-margin-right: 20px;
}

/* Full-width slides with center alignment */
.slide {
  width: 100%;
  flex-shrink: 0;
  scroll-snap-align: center;
}

/* Card grid with mixed alignment */
.card {
  scroll-snap-align: start;
  margin: 1rem;
}

.featured-card {
  scroll-snap-align: center;
  margin: 2rem;
}

/* Mobile-optimized carousel */
@media (max-width: 768px) {
  .carousel-item {
    flex: 0 0 90%;
    scroll-snap-align: start;
    scroll-margin-left: 1rem;
  }
}

/* Image gallery with center alignment */
.gallery-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
  scroll-snap-align: center;
  border-radius: 8px;
}`
  },
  'scroll-snap-stop': {
    basic_usage: '.item { scroll-snap-stop: always; }',
    best_practices: [
      'Use always to force stops at every snap point',
      'Use normal for default behavior allowing skipping',
      'Apply to important items that users should not skip',
      'Combine with mandatory scroll-snap-type for strict control'
    ],
    fallbacks: [
      'Use JavaScript to control scroll behavior',
      'Implement custom scroll event handlers',
      'Use intersection observer for scroll control'
    ],
    example_code: `
/* Force stop at every carousel slide */
.carousel-slide {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  flex: 0 0 100%;
}

/* Allow skipping through regular items */
.regular-item {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

/* Important content that must be seen */
.important-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 100vh;
}

/* Product showcase carousel */
.product-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.product-item {
  flex: 0 0 300px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  margin: 0 1rem;
}

/* Onboarding steps that require stopping */
.onboarding-step {
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  padding: 2rem;
}

/* News articles with selective stopping */
.article-preview {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

.featured-article {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  background: var(--highlight-color);
}

/* Mobile considerations */
@media (max-width: 768px) {
  .carousel-slide {
    flex: 0 0 85%;
    scroll-snap-stop: always;
  }
}`
  },
  'scroll-padding': {
    basic_usage: '.container { scroll-padding: 2rem; }',
    best_practices: [
      'Use to create breathing room around snap points',
      'Apply to scroll containers, not individual items',
      'Consider header/navigation heights when setting padding',
      'Use logical properties for international layouts'
    ],
    fallbacks: [
      'Use margins on snap items',
      'JavaScript scroll offset calculations',
      'CSS transforms for positioning'
    ],
    example_code: `
/* Carousel with padding for better visual alignment */
.carousel-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 2rem;
}

/* Vertical scroll with top padding for fixed header */
.main-content {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y proximity;
  scroll-padding-top: 80px; /* Height of fixed header */
}

/* Asymmetric padding for design requirements */
.gallery {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 1rem 3rem 1rem 1rem;
}

/* Logical scroll padding for RTL support */
.international-carousel {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 2rem;
  scroll-padding-block: 1rem;
}

/* Full-screen sections with navigation padding */
.section-scroller {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 4rem; /* Navigation height */
  scroll-padding-bottom: 2rem; /* Footer clearance */
}

/* Card layout with breathing room */
.card-container {
  padding: 1rem;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-padding: 1rem 2rem;
}

/* Responsive scroll padding */
@media (max-width: 768px) {
  .carousel-container {
    scroll-padding: 1rem;
  }
  
  .main-content {
    scroll-padding-top: 60px; /* Smaller mobile header */
  }
}`
  },
  'hover-media-queries': {
    basic_usage: '@media (hover: hover) { .element:hover { background: blue; } }',
    best_practices: [
      'Always wrap hover effects in @media (hover: hover) to prevent on touch devices',
      'Use @media (pointer: fine) for precise pointer interactions',
      'Provide alternative feedback for touch devices',
      'Test hover behavior on both desktop and mobile devices',
      'Consider using @media (any-hover: hover) for devices with mixed input methods'
    ],
    fallbacks: [
      'Use touch events like :active for mobile interactions',
      'Provide button states that work without hover',
      'Use JavaScript touch/click event handling'
    ],
    example_code: `
/* ✅ CORRECT: Hover effects only on devices that support hover */
.button {
  background: #blue;
  transition: background-color 0.2s ease;
}

@media (hover: hover) {
  .button:hover {
    background: #darkblue;
  }
}

/* Alternative touch feedback */
.button:active {
  background: #darkblue;
  transform: scale(0.98);
}

/* ❌ INCORRECT: Hover effects on all devices including touch */
.button:hover {
  background: #darkblue; /* Will trigger on touch and cause issues */
}

/* Advanced: Fine pointer interactions */
@media (pointer: fine) {
  .tooltip-trigger:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
}

/* Coarse pointer (touch) alternative */
@media (pointer: coarse) {
  .tooltip-trigger:active .tooltip {
    opacity: 1;
    visibility: visible;
  }
}

/* Mixed input devices */
@media (any-hover: hover) {
  .nav-item:hover .submenu {
    display: block;
  }
}

@media (any-hover: none) {
  .nav-item .submenu-toggle {
    display: block; /* Show toggle button on touch-only devices */
  }
}

/* Card interactions with proper hover handling */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
}

/* Touch device feedback */
.card:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Complex interaction patterns */
.interactive-element {
  cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  .interactive-element:hover {
    background: var(--hover-bg);
  }
  
  .interactive-element:hover::after {
    content: "Click for more details";
    position: absolute;
    /* tooltip styles */
  }
}

@media (pointer: coarse) {
  .interactive-element {
    min-height: 44px; /* Larger touch target */
    padding: 12px; /* More generous padding */
  }
}

/* Accessibility: Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .button,
  .card,
  .interactive-element {
    transition: none;
  }
}`
  },
  'scroll-margin': {
    basic_usage: '.item { scroll-margin: 1rem; }',
    best_practices: [
      'Apply to individual snap items, not containers',
      'Use to fine-tune snap positioning',
      'Consider visual hierarchy when setting margins',
      'Combine with scroll-padding for optimal alignment'
    ],
    fallbacks: [
      'Use regular margins with adjusted calculations',
      'JavaScript-based positioning',
      'CSS transforms for offset positioning'
    ],
    example_code: `
/* Individual carousel items with scroll margins */
.carousel-item {
  flex: 0 0 300px;
  scroll-snap-align: center;
  scroll-margin: 0 1rem;
}

/* List items with top margin for spacing */
.section-item {
  scroll-snap-align: start;
  scroll-margin-top: 2rem;
  min-height: 300px;
}

/* Cards with all-around margins */
.card {
  scroll-snap-align: center;
  scroll-margin: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Feature highlighting with larger margins */
.featured-item {
  scroll-snap-align: center;
  scroll-margin: 2rem 3rem;
  transform: scale(1.05);
}

/* Logical margins for international support */
.international-item {
  scroll-snap-align: start;
  scroll-margin-inline: 1rem;
  scroll-margin-block: 0.5rem;
}

/* Image gallery with precise margins */
.gallery-item {
  scroll-snap-align: center;
  scroll-margin: 10px 20px;
  border-radius: 4px;
  overflow: hidden;
}

/* Article sections with reading flow margins */
.article-section {
  scroll-snap-align: start;
  scroll-margin-top: 3rem;
  padding: 2rem;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .carousel-item {
    scroll-margin: 0 0.5rem;
  }
  
  .section-item {
    scroll-margin-top: 1rem;
  }
}`
  }
};

export function getInteractionGuidance(property: string, needsFallback: boolean = false): ImplementationGuidance | null {
  const guidance = INTERACTION_GUIDANCE[property];
  if (!guidance) return null;
  
  return {
    ...guidance,
    fallbacks: needsFallback ? guidance.fallbacks : []
  };
}