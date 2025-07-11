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