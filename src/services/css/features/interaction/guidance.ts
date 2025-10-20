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
  },
  'css-carousel': {
    basic_usage: '.carousel { scroll-snap-type: x mandatory; overflow-x: auto; }',
    best_practices: [
      'Use modern ::scroll-button() for auto-generated navigation buttons',
      'Use ::scroll-marker for automatic dot navigation indicators',
      'Use :target-current to style the active marker',
      'Use :target-before and :target-after (Chrome 142+) for advanced marker styling',
      'Combine with scroll-snap-type for smooth scrolling behavior',
      'Always provide fallback for older browsers using @supports',
      'Test accessibility with keyboard and screen readers',
      'Consider prefers-reduced-motion for animations'
    ],
    fallbacks: [
      'Use traditional HTML buttons with JavaScript for navigation',
      'Use radio button technique for CSS-only carousel',
      'Use Intersection Observer API for active state detection',
      'Provide manual dot navigation with HTML elements'
    ],
    example_code: `
/* ✅ MODERN CSS-ONLY CAROUSEL - No JavaScript needed! */

/* 1. Basic carousel container with scroll snap */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1rem;
  scrollbar-width: none; /* Firefox */
  -webkit-overflow-scrolling: touch;
}

.carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

/* 2. Carousel items */
.carousel-item {
  flex: 0 0 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* 3. ::scroll-button() - Auto-generated navigation buttons */
.carousel::scroll-button(*) {
  padding: 1rem;
  background: oklch(0% 0 0 / 0.5);
  color: oklch(100% 0 0);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;
}

.carousel::scroll-button(left),
.carousel::scroll-button(inline-start) {
  content: "⬅" / "Scroll Left";
}

.carousel::scroll-button(right),
.carousel::scroll-button(inline-end) {
  content: "⮕" / "Scroll Right";
}

.carousel::scroll-button(*):hover {
  background: oklch(0% 0 0 / 0.7);
}

.carousel::scroll-button(*):focus-visible {
  outline: 2px solid oklch(55% 0.25 264);
  outline-offset: 5px;
}

/* Auto-disabled when can't scroll further - no JS needed! */
.carousel::scroll-button(*):disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* 4. ::scroll-marker - Auto-generated dot navigation */
.carousel::scroll-marker {
  content: "";
  inline-size: 10px;
  block-size: 10px;
  border-radius: 50%;
  background: oklch(0% 0 0 / 0.3);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.carousel::scroll-marker:hover {
  background: oklch(0% 0 0 / 0.5);
  transform: scale(1.1);
}

.carousel::scroll-marker:focus-visible {
  outline: 2px solid oklch(55% 0.25 264);
  outline-offset: 3px;
}

/* 5. :target-current - Active marker state (no JS needed!) */
.carousel::scroll-marker:target-current {
  background: oklch(55% 0.25 264);
  transform: scale(1.2);
}

/* 6. :target-before and :target-after - NEW in Chrome 142+ */
/* Style markers before the active one */
.carousel::scroll-marker:target-before {
  opacity: 0.4;
  background: oklch(85% 0 0);
}

/* Style markers after the active one */
.carousel::scroll-marker:target-after {
  opacity: 0.4;
  background: oklch(85% 0 0);
}

/* 7. ::scroll-marker-group - Style the markers container */
.carousel::scroll-marker-group {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  justify-content: center;
  background: oklch(100% 0 0 / 0.8);
  border-radius: 1rem;
}

/* Control marker group position */
.carousel {
  scroll-marker-group: after; /* Options: before, after, none */
}

/* 8. Advanced: Custom marker content with attr() and counters */
.carousel-item {
  counter-increment: slide;
}

.carousel::scroll-marker {
  content: counter(slide);
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 2rem;
  block-size: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
}

/* 9. Vertical carousel variant */
.vertical-carousel {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  block-size: 400px;
}

.vertical-carousel::scroll-button(up),
.vertical-carousel::scroll-button(block-start) {
  content: "⬆" / "Scroll Up";
}

.vertical-carousel::scroll-button(down),
.vertical-carousel::scroll-button(block-end) {
  content: "⬇" / "Scroll Down";
}

/* 10. Accessibility & Progressive Enhancement */
@supports not (selector(::scroll-button(*))) {
  /* Fallback for older browsers */
  .carousel-nav-fallback {
    display: flex;
    gap: 0.5rem;
  }
  
  .carousel-nav-fallback button {
    padding: 0.5rem 1rem;
    background: oklch(55% 0.25 264);
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
}

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  .carousel {
    scroll-behavior: auto;
  }
  
  .carousel::scroll-marker,
  .carousel::scroll-button(*) {
    transition: none;
  }
}

/* 11. Responsive adjustments */
@media (max-width: 768px) {
  .carousel-item {
    flex: 0 0 90%;
  }
  
  .carousel::scroll-button(*) {
    padding: 0.75rem;
  }
  
  .carousel::scroll-marker {
    inline-size: 8px;
    block-size: 8px;
  }
}

/* 12. Real-world example: Photo gallery carousel */
.photo-gallery {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1rem;
  padding: 1rem;
  scroll-marker-group: after;
}

.photo-gallery img {
  flex: 0 0 min(600px, 80vw);
  scroll-snap-align: center;
  border-radius: 0.5rem;
  object-fit: cover;
  aspect-ratio: 16/9;
}

.photo-gallery::scroll-button(*) {
  padding: 1rem;
  background: oklch(100% 0 0 / 0.9);
  color: oklch(0% 0 0);
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px oklch(0% 0 0 / 0.2);
}

.photo-gallery::scroll-marker {
  content: "";
  inline-size: 12px;
  block-size: 12px;
  border-radius: 50%;
  background: oklch(100% 0 0 / 0.5);
  border: 2px solid oklch(55% 0.25 264);
}

.photo-gallery::scroll-marker:target-current {
  background: oklch(55% 0.25 264);
  transform: scale(1.3);
}

/* Reference: https://lukaschylik.dev/blog/articles/css-carousels/
 * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_overflow/CSS_carousels
 * Browser support: Chrome 142+, limited support in other browsers
 * Always test with @supports for production use
 */`
  },
  '::scroll-button()': {
    basic_usage: '.carousel::scroll-button(*) { padding: 1rem; }',
    best_practices: [
      'Auto-generates navigation buttons for scrollable containers',
      'Buttons are automatically disabled when scrolling is not possible',
      'Use (*) selector for common styles across all buttons',
      'Specify direction: left, right, up, down, inline-start, inline-end, block-start, block-end',
      'Buttons have native focus state for accessibility',
      'Use content property with accessible labels',
      'Always provide hover and focus-visible states'
    ],
    fallbacks: [
      'Use traditional HTML buttons with JavaScript',
      'Implement custom navigation with click handlers',
      'Use @supports to detect and provide fallbacks'
    ],
    example_code: `
/* Auto-generated carousel navigation buttons */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

/* Common styles for all buttons */
.carousel::scroll-button(*) {
  padding: 1rem;
  background: oklch(0% 0 0 / 0.5);
  color: oklch(100% 0 0);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;
}

/* Specific buttons with accessible content */
.carousel::scroll-button(left) {
  content: "⬅" / "Scroll Left";
}

.carousel::scroll-button(right) {
  content: "⮕" / "Scroll Right";
}

/* Logical properties for international support */
.carousel::scroll-button(inline-start) {
  content: "◀" / "Previous";
}

.carousel::scroll-button(inline-end) {
  content: "▶" / "Next";
}

/* Hover and focus states */
.carousel::scroll-button(*):hover {
  background: oklch(0% 0 0 / 0.7);
}

.carousel::scroll-button(*):focus-visible {
  outline: 2px solid oklch(55% 0.25 264);
  outline-offset: 5px;
}

/* Auto-disabled state - no JavaScript needed! */
.carousel::scroll-button(*):disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Vertical carousel buttons */
.vertical-carousel::scroll-button(up) {
  content: "⬆" / "Scroll Up";
}

.vertical-carousel::scroll-button(down) {
  content: "⬇" / "Scroll Down";
}

/* Custom styling example */
.fancy-carousel::scroll-button(*) {
  padding: 1.5rem;
  background: linear-gradient(135deg, oklch(55% 0.25 264), oklch(65% 0.2 300));
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px oklch(0% 0 0 / 0.2);
  font-size: 1.5rem;
  font-weight: bold;
}

/* Progressive enhancement */
@supports not (selector(::scroll-button(*))) {
  .carousel-fallback-nav {
    display: flex;
    gap: 0.5rem;
    margin-block-start: 1rem;
  }
}

/* Reference: https://lukaschylik.dev/blog/articles/css-carousels/
 * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-button
 */`
  },
  '::scroll-marker': {
    basic_usage: '.carousel::scroll-marker { content: ""; width: 10px; height: 10px; }',
    best_practices: [
      'Auto-generates clickable dot indicators for each scroll snap point',
      'Use :target-current to style the active marker',
      'Use :target-before and :target-after (Chrome 142+) for adjacent markers',
      'Always set content property (can be empty string)',
      'Markers are automatically clickable and navigate to slides',
      'Combine with ::scroll-marker-group to position the container',
      'Use counter() for numbered indicators'
    ],
    fallbacks: [
      'Use HTML elements with radio buttons for CSS-only solution',
      'Implement custom dots with JavaScript and Intersection Observer',
      'Use @supports for feature detection'
    ],
    example_code: `
/* Auto-generated dot navigation for carousel */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

/* Basic dot markers */
.carousel::scroll-marker {
  content: "";
  inline-size: 10px;
  block-size: 10px;
  border-radius: 50%;
  background: oklch(0% 0 0 / 0.3);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Hover state */
.carousel::scroll-marker:hover {
  background: oklch(0% 0 0 / 0.5);
  transform: scale(1.1);
}

/* Focus state for keyboard navigation */
.carousel::scroll-marker:focus-visible {
  outline: 2px solid oklch(55% 0.25 264);
  outline-offset: 3px;
}

/* Active marker - automatically tracked! */
.carousel::scroll-marker:target-current {
  background: oklch(55% 0.25 264);
  transform: scale(1.2);
}

/* NEW: Style markers before the active one (Chrome 142+) */
.carousel::scroll-marker:target-before {
  opacity: 0.4;
  background: oklch(85% 0 0);
}

/* NEW: Style markers after the active one (Chrome 142+) */
.carousel::scroll-marker:target-after {
  opacity: 0.4;
  background: oklch(85% 0 0);
}

/* Advanced: Numbered markers with counters */
.numbered-carousel {
  counter-reset: slide;
}

.numbered-carousel .slide {
  counter-increment: slide;
}

.numbered-carousel::scroll-marker {
  content: counter(slide);
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 2rem;
  block-size: 2rem;
  border-radius: 50%;
  background: oklch(90% 0 0);
  color: oklch(30% 0 0);
  font-size: 0.875rem;
  font-weight: 600;
}

.numbered-carousel::scroll-marker:target-current {
  background: oklch(55% 0.25 264);
  color: oklch(100% 0 0);
  font-weight: 700;
}

/* Custom marker content with attr() */
.slide[data-label] {
  /* markers can access data attributes */
}

.custom-carousel::scroll-marker {
  content: attr(data-label, counter(slide));
  /* fallback to counter if no label */
}

/* Styled markers for premium look */
.premium-carousel::scroll-marker {
  content: "";
  inline-size: 40px;
  block-size: 4px;
  border-radius: 2px;
  background: oklch(0% 0 0 / 0.2);
  transition: all 0.3s ease;
}

.premium-carousel::scroll-marker:target-current {
  inline-size: 60px;
  background: oklch(55% 0.25 264);
}

/* Vertical progress indicators */
.vertical-carousel::scroll-marker {
  inline-size: 4px;
  block-size: 40px;
  border-radius: 2px;
}

/* Accessibility considerations */
@media (prefers-reduced-motion: reduce) {
  .carousel::scroll-marker {
    transition: none;
  }
}

/* Responsive markers */
@media (max-width: 768px) {
  .carousel::scroll-marker {
    inline-size: 8px;
    block-size: 8px;
  }
}

/* Progressive enhancement */
@supports not (selector(::scroll-marker)) {
  .carousel-dots-fallback {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    padding: 1rem;
  }
}

/* Reference: https://lukaschylik.dev/blog/articles/css-carousels/
 * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker
 */`
  },
  '::scroll-marker-group': {
    basic_usage: '.carousel::scroll-marker-group { display: flex; gap: 0.5rem; }',
    best_practices: [
      'Styles the container that holds all ::scroll-marker elements',
      'Use display: flex or grid for layout control',
      'Control position with scroll-marker-group property (before, after, none)',
      'Add padding, gap, and background for visual grouping',
      'Works like a normal element - accepts all layout properties'
    ],
    fallbacks: [
      'Use wrapper div with CSS for older browsers',
      'Implement custom container with JavaScript',
      'Use @supports for progressive enhancement'
    ],
    example_code: `
/* Style the markers container */
.carousel {
  scroll-marker-group: after; /* Position: before, after, or none */
}

.carousel::scroll-marker-group {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  justify-content: center;
  background: oklch(100% 0 0 / 0.8);
  border-radius: 1rem;
  box-shadow: 0 2px 8px oklch(0% 0 0 / 0.1);
}

/* Position before the carousel */
.carousel-before {
  scroll-marker-group: before;
}

.carousel-before::scroll-marker-group {
  margin-block-end: 1rem;
}

/* Position after the carousel (default) */
.carousel-after {
  scroll-marker-group: after;
}

.carousel-after::scroll-marker-group {
  margin-block-start: 1rem;
}

/* Hide marker group */
.carousel-hidden {
  scroll-marker-group: none;
}

/* Grid layout for markers */
.grid-carousel::scroll-marker-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
  gap: 0.5rem;
  padding: 1rem;
  background: oklch(95% 0 0);
}

/* Vertical alignment for side placement */
.side-carousel::scroll-marker-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  position: absolute;
  inset-inline-end: 1rem;
  inset-block-start: 50%;
  transform: translateY(-50%);
}

/* Glassmorphism effect */
.modern-carousel::scroll-marker-group {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: oklch(100% 0 0 / 0.6);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  border: 1px solid oklch(100% 0 0 / 0.3);
}

/* Minimal floating indicators */
.minimal-carousel::scroll-marker-group {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem;
  background: none;
}

/* Responsive marker group */
@media (max-width: 768px) {
  .carousel::scroll-marker-group {
    padding: 0.5rem;
    gap: 0.25rem;
  }
}

/* Reference: https://lukaschylik.dev/blog/articles/css-carousels/
 * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker-group
 */`
  },
  ':target-current': {
    basic_usage: '.carousel::scroll-marker:target-current { background: blue; }',
    best_practices: [
      'Automatically applies to the currently visible scroll marker',
      'No JavaScript needed for active state tracking',
      'Combine with :target-before and :target-after for contextual styling',
      'Works with ::scroll-marker pseudo-elements',
      'Use for visual feedback of current slide position',
      'Apply transitions for smooth state changes'
    ],
    fallbacks: [
      'Use JavaScript with Intersection Observer to track active state',
      'Implement CSS-only solution with :target and anchor links',
      'Use @supports for feature detection'
    ],
    example_code: `
/* Active marker styling - auto-tracked by CSS! */
.carousel::scroll-marker {
  content: "";
  inline-size: 10px;
  block-size: 10px;
  border-radius: 50%;
  background: oklch(0% 0 0 / 0.3);
  transition: all 0.3s ease;
}

/* Active state - automatically applied! */
.carousel::scroll-marker:target-current {
  background: oklch(55% 0.25 264);
  transform: scale(1.3);
  box-shadow: 0 0 8px oklch(55% 0.25 264 / 0.5);
}

/* Combine with hover for rich interactions */
.carousel::scroll-marker:not(:target-current):hover {
  background: oklch(0% 0 0 / 0.5);
  transform: scale(1.1);
}

/* NEW: Context-aware styling with :target-before (Chrome 142+) */
.carousel::scroll-marker:target-before {
  opacity: 0.5;
  background: oklch(70% 0 0);
}

/* NEW: Style markers after active (Chrome 142+) */
.carousel::scroll-marker:target-after {
  opacity: 0.5;
  background: oklch(70% 0 0);
}

/* Create gradient effect across markers */
.carousel::scroll-marker:target-before {
  opacity: 0.3;
}

.carousel::scroll-marker:target-current {
  opacity: 1;
  background: oklch(55% 0.25 264);
}

.carousel::scroll-marker:target-after {
  opacity: 0.3;
}

/* Numbered markers with active state */
.numbered-carousel::scroll-marker {
  content: counter(slide);
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 2rem;
  block-size: 2rem;
  border-radius: 50%;
  background: oklch(90% 0 0);
  color: oklch(30% 0 0);
  font-weight: 500;
}

.numbered-carousel::scroll-marker:target-current {
  background: oklch(55% 0.25 264);
  color: oklch(100% 0 0);
  font-weight: 700;
  transform: scale(1.2);
}

/* Progress bar style markers */
.progress-carousel::scroll-marker {
  inline-size: 40px;
  block-size: 4px;
  border-radius: 2px;
  background: oklch(0% 0 0 / 0.2);
}

.progress-carousel::scroll-marker:target-current {
  inline-size: 60px;
  background: oklch(55% 0.25 264);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .carousel::scroll-marker:target-current {
    transition: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .carousel::scroll-marker:target-current {
    outline: 3px solid currentColor;
    outline-offset: 2px;
  }
}

/* Reference: https://lukaschylik.dev/blog/articles/css-carousels/
 * Chrome Status: https://cr-status.appspot.com/feature/5120827674722304
 * Browser Support: Chrome 142+ (experimental), limited in other browsers
 */`
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