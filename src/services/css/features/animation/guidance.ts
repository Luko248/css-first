/**
 * Animation Guidance - Implementation guidance for animation properties
 */

import { ImplementationGuidance } from '../../types.js';

export const ANIMATION_GUIDANCE: Record<string, ImplementationGuidance> = {
  'transition': {
    basic_usage: '.element { transition: all 0.3s ease; }',
    best_practices: [
      'Specify individual properties instead of "all" for better performance',
      'Use reasonable durations (0.2s-0.5s for most interactions)',
      'Choose appropriate easing functions',
      'Consider reduced motion preferences'
    ],
    fallbacks: [
      'Provide instant state changes for older browsers',
      'Use JavaScript for complex animations',
      'Consider CSS feature queries'
    ],
    example_code: `
.button {
  transition: 
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.button:hover {
  background-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}

/* Fallback for older browsers */
@supports not (transition: background-color 0.2s ease) {
  .button:hover {
    background-color: var(--primary-color);
  }
}`
  },
  'animation': {
    basic_usage: '.element { animation: slideIn 0.5s ease-out; }',
    best_practices: [
      'Use transform and opacity for smooth animations',
      'Keep animations short and purposeful',
      'Provide animation controls for accessibility',
      'Use will-change for performance optimization'
    ],
    fallbacks: [
      'Provide static fallbacks for older browsers',
      'Use JavaScript for complex animations',
      'Consider progressive enhancement'
    ],
    example_code: `
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
  will-change: transform;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .slide-in,
  .spinner {
    animation: none;
  }
}

/* Performance optimization */
.animated-element {
  will-change: transform, opacity;
}

.animated-element.animation-complete {
  will-change: auto;
}`
  },
  'keyframes': {
    basic_usage: '@keyframes myAnimation { 0% { opacity: 0; } 100% { opacity: 1; } }',
    best_practices: [
      'Use percentage-based keyframes for flexibility',
      'Animate transform and opacity for best performance',
      'Keep keyframes simple and purposeful',
      'Use descriptive animation names'
    ],
    fallbacks: [
      'Provide static end states',
      'Use JavaScript for complex sequences',
      'Consider CSS feature queries'
    ],
    example_code: `
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Complex multi-step animation */
@keyframes complexAnimation {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-10px) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}`
  },
  'animation-timing-function': {
    basic_usage: '.element { animation-timing-function: ease-in-out; }',
    best_practices: [
      'Use ease-out for entrances',
      'Use ease-in for exits',
      'Use ease-in-out for smooth interactions',
      'Consider cubic-bezier for custom easing'
    ],
    fallbacks: [
      'Use linear for older browsers',
      'Provide simplified timing functions',
      'Consider JavaScript easing libraries'
    ],
    example_code: `
.entrance {
  animation-timing-function: ease-out;
}

.exit {
  animation-timing-function: ease-in;
}

.bounce {
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom easing functions */
.smooth {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.spring {
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}`
  },
  '@starting-style': {
    basic_usage: '@starting-style { .element { opacity: 0; } }',
    best_practices: [
      'Use for animating display property changes',
      'Combine with transition for smooth entry animations',
      'Essential for height/width auto animations',
      'Works with discrete property changes'
    ],
    fallbacks: [
      'Use JavaScript for older browsers',
      'Provide instant state changes as fallback',
      'Consider progressive enhancement'
    ],
    example_code: `
/* Animate display property changes */
.dialog {
  transition: opacity 0.3s ease, overlay 0.3s ease allow-discrete, display 0.3s ease allow-discrete;
}

.dialog[open] {
  opacity: 1;
}

@starting-style {
  .dialog[open] {
    opacity: 0;
  }
}

/* Animate height changes */
.expandable {
  height: auto;
  transition: height 0.3s ease;
  interpolate-size: allow-keywords;
}

@starting-style {
  .expandable {
    height: 0;
  }
}

/* Fallback for older browsers */
@supports not (interpolate-size: allow-keywords) {
  .expandable {
    height: 0;
    overflow: hidden;
  }
  .expandable.expanded {
    height: auto;
  }
}`
  },
  'interpolate-size': {
    basic_usage: '.element { interpolate-size: allow-keywords; }',
    best_practices: [
      'Enable smooth animations of auto, min-content, max-content',
      'Combine with @starting-style for display animations',
      'Use for height/width transitions with intrinsic sizing',
      'Essential for modern layout animations'
    ],
    fallbacks: [
      'Use fixed dimensions for older browsers',
      'JavaScript-based height calculations',
      'CSS Grid/Flexbox alternatives'
    ],
    example_code: `
/* Enable auto keyword interpolation */
.container {
  height: auto;
  transition: height 0.3s ease;
  interpolate-size: allow-keywords;
}

@starting-style {
  .container {
    height: 0;
  }
}

/* Width animations with intrinsic sizing */
.sidebar {
  width: max-content;
  transition: width 0.4s ease;
  interpolate-size: allow-keywords;
}

.sidebar.collapsed {
  width: 0;
}

/* Performance optimization with GPU-accelerated properties */
.gpu-optimized {
  transform: translateZ(0); /* Force GPU layer */
  transition: transform 0.3s ease, opacity 0.3s ease;
  will-change: transform, opacity;
}

/* Only animate GPU-accelerated properties for best performance */
.performant-animation {
  /* Good: GPU-accelerated properties */
  transform: scale(1) rotate(0deg) translate(0, 0);
  opacity: 1;
  filter: blur(0px) brightness(1);
  
  /* Avoid animating these for performance */
  /* width, height, top, left, margin, padding */
}

/* Use transform instead of position changes */
.slide-in {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.slide-in.active {
  transform: translateX(0);
}`
  },
  'scroll-timeline': {
    basic_usage: '.element { scroll-timeline: myTimeline block; }',
    best_practices: [
      'Use descriptive timeline names',
      'Choose appropriate scroll axis (block, inline, x, y)',
      'Combine with animation-timeline for scroll-driven animations',
      'Consider browser support for progressive enhancement'
    ],
    fallbacks: [
      'Use Intersection Observer API for older browsers',
      'JavaScript scroll event listeners',
      'CSS-only alternatives with viewport units'
    ],
    example_code: `
/* Create scroll timeline on scroll container */
.scroll-container {
  scroll-timeline-name: container-scroll;
  scroll-timeline-axis: block;
}

/* Alternative shorthand syntax */
.scroll-container {
  scroll-timeline: container-scroll block;
}

/* Use timeline for scroll-driven animation */
.progress-bar {
  animation: progress-fill linear;
  animation-timeline: container-scroll;
}

@keyframes progress-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Multiple scroll timelines */
.horizontal-scroll {
  scroll-timeline: horizontal-timeline inline;
}

.vertical-scroll {
  scroll-timeline: vertical-timeline block;
}

/* Fallback using Intersection Observer */
@supports not (animation-timeline: scroll()) {
  .progress-bar {
    transition: transform 0.1s ease-out;
  }
}`
  },
  'view-timeline': {
    basic_usage: '.element { view-timeline: myView block; }',
    best_practices: [
      'Use for animations triggered by element visibility',
      'Combine with animation-range for precise control',
      'Consider view-timeline-inset for offset adjustments',
      'Use meaningful timeline names'
    ],
    fallbacks: [
      'Intersection Observer API',
      'Scroll event listeners with getBoundingClientRect',
      'CSS animations with delays'
    ],
    example_code: `
/* Element creates view timeline as it enters viewport */
.card {
  view-timeline-name: card-view;
  view-timeline-axis: block;
}

/* Shorthand syntax */
.card {
  view-timeline: card-view block;
}

/* Animation triggered by view timeline */
.card-content {
  opacity: 0;
  transform: translateY(50px);
  animation: card-enter linear;
  animation-timeline: card-view;
  animation-range: entry 0% entry 100%;
}

@keyframes card-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Multiple elements with view timelines */
.reveal {
  view-timeline: reveal-timeline;
  animation: reveal-animation linear;
  animation-timeline: reveal-timeline;
  animation-range: contain 0% contain 50%;
}

@keyframes reveal-animation {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* View timeline with inset */
.parallax-element {
  view-timeline: parallax-view;
  view-timeline-inset: 100px 50px;
}`
  },
  'animation-timeline': {
    basic_usage: '.element { animation-timeline: myTimeline; }',
    best_practices: [
      'Connect animations to scroll or view timelines',
      'Use with animation-range for precise control',
      'Combine with GPU-accelerated properties',
      'Provide fallbacks for unsupported browsers'
    ],
    fallbacks: [
      'JavaScript-based scroll animations',
      'CSS transitions with scroll events',
      'Static animations as fallback'
    ],
    example_code: `
/* Connect animation to scroll timeline */
.parallax {
  animation: parallax-move linear;
  animation-timeline: scroll(root block);
}

@keyframes parallax-move {
  to { transform: translateY(-50%); }
}

/* Connect to named timeline */
.hero-text {
  animation: hero-fade linear;
  animation-timeline: hero-scroll;
}

/* Multiple animations on different timelines */
.complex-animation {
  animation: 
    fade-in linear,
    slide-up linear,
    scale-in linear;
  animation-timeline: 
    view-timeline,
    view-timeline,
    scroll-timeline;
  animation-range:
    entry 0% entry 100%,
    entry 0% entry 100%,
    0% 50%;
}

/* Auto timeline (nearest scroll container) */
.auto-scroll {
  animation: auto-animation linear;
  animation-timeline: scroll();
}

/* Anonymous view timeline */
.view-driven {
  animation: view-animation linear;
  animation-timeline: view();
}`
  },
  'animation-range': {
    basic_usage: '.element { animation-range: entry 0% entry 100%; }',
    best_practices: [
      'Use named ranges (entry, exit, contain, cover) for clarity',
      'Combine start and end values for precise control',
      'Use percentage values for relative positioning',
      'Consider element size when setting ranges'
    ],
    fallbacks: [
      'Full animation duration without ranges',
      'JavaScript-based range calculations',
      'CSS custom properties for range values'
    ],
    example_code: `
/* Animation during element entry */
.fade-in {
  animation: fade linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

/* Animation during exit */
.fade-out {
  animation: fade-out linear;
  animation-timeline: view();
  animation-range: exit 0% exit 100%;
}

/* Animation while element is contained in viewport */
.scale-while-visible {
  animation: scale-pulse linear;
  animation-timeline: view();
  animation-range: contain 0% contain 100%;
}

/* Complex range with multiple segments */
.complex-range {
  animation: complex-animation linear;
  animation-timeline: view();
  animation-range: entry 50% exit 50%;
}

/* Individual start and end properties */
.precise-control {
  animation: precise-animation linear;
  animation-timeline: view();
  animation-range-start: entry 25%;
  animation-range-end: exit 75%;
}

/* Scroll-based ranges with pixel values */
.scroll-range {
  animation: scroll-animation linear;
  animation-timeline: scroll();
  animation-range: 100px 500px;
}

/* Multiple animations with different ranges */
.multi-range {
  animation: 
    fade-in linear,
    slide-up linear;
  animation-timeline: view(), view();
  animation-range:
    entry 0% entry 50%,
    entry 50% entry 100%;
}`
  },
  'view-timeline-inset': {
    basic_usage: '.element { view-timeline-inset: 100px 50px; }',
    best_practices: [
      'Use to adjust when view timeline starts/ends',
      'Positive values shrink the timeline range',
      'Negative values extend the timeline range',
      'Consider responsive design with relative units'
    ],
    fallbacks: [
      'JavaScript-based offset calculations',
      'CSS custom properties for dynamic values',
      'Default timeline behavior'
    ],
    example_code: `
/* Symmetric inset - shrink timeline by 100px on both sides */
.card {
  view-timeline: card-timeline;
  view-timeline-inset: 100px;
}

/* Asymmetric inset - different start and end offsets */
.hero {
  view-timeline: hero-timeline;
  view-timeline-inset: 200px 50px;
}

/* Extend timeline with negative values */
.early-trigger {
  view-timeline: early-timeline;
  view-timeline-inset: -100px -50px;
}

/* Responsive insets with relative units */
.responsive-timeline {
  view-timeline: responsive-timeline;
  view-timeline-inset: 10vh 5vh;
}

/* Individual inset properties */
.individual-inset {
  view-timeline: individual-timeline;
  view-timeline-inset-block-start: 100px;
  view-timeline-inset-block-end: 50px;
}

/* Use with animation for precise timing */
.precise-timing {
  view-timeline: precise-timeline;
  view-timeline-inset: 150px 100px;
  
  animation: precise-animation linear;
  animation-timeline: precise-timeline;
  animation-range: entry 0% exit 100%;
}`
  },
  'timeline-scope': {
    basic_usage: '.element { timeline-scope: myTimeline; }',
    best_practices: [
      'Use to make timelines accessible to descendant elements',
      'Declare at common ancestor of timeline creator and consumer',
      'Use meaningful timeline names',
      'Consider timeline hierarchy and scope'
    ],
    fallbacks: [
      'Move timeline declaration to appropriate ancestor',
      'JavaScript-based timeline management',
      'Global timeline naming conventions'
    ],
    example_code: `
/* Declare timeline scope at container level */
.page-container {
  timeline-scope: page-scroll, hero-view;
}

/* Child creates the timeline */
.scroll-area {
  scroll-timeline: page-scroll block;
}

/* Descendant uses the timeline */
.animated-element {
  animation: slide-in linear;
  animation-timeline: page-scroll;
}

/* Multiple timeline scopes */
.section {
  timeline-scope: section-scroll, card-views;
}

/* Nested scopes */
.outer-container {
  timeline-scope: global-timeline;
}

.inner-container {
  timeline-scope: local-timeline;
}

/* Timeline scope with view timelines */
.gallery {
  timeline-scope: card-animations;
}

.gallery-item {
  view-timeline: card-animations;
}

.gallery-item .content {
  animation: card-reveal linear;
  animation-timeline: card-animations;
  animation-range: entry 0% entry 100%;
}`
  }
};

export function getAnimationGuidance(property: string, needsFallback: boolean = false): ImplementationGuidance | null {
  const guidance = ANIMATION_GUIDANCE[property];
  if (!guidance) return null;
  
  return {
    ...guidance,
    fallbacks: needsFallback ? guidance.fallbacks : []
  };
}