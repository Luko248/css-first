/**
 * Animation Suggestions - Syntax examples and use cases
 */

export const ANIMATION_SYNTAX = {
  'CSS Transitions': `
.element {
  transition: all 0.3s ease;
}

.element:hover {
  transform: scale(1.05);
  opacity: 0.8;
}

/* Specific properties */
.button {
  transition: 
    background-color 0.2s ease,
    transform 0.2s ease;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .element {
    transition: none;
  }
}`,
  'CSS Animations': `
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

.element {
  animation: slideIn 0.5s ease-out;
}

/* Complex animation */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-30px);
  }
  70% {
    transform: translateY(-15px);
  }
}

.bounce {
  animation: bounce 1s ease-in-out infinite;
}`
};

export const ANIMATION_USE_CASES = {
  'CSS Transitions': [
    'Hover effects',
    'Smooth state changes',
    'Loading animations',
    'Interactive feedback',
    'Button interactions',
    'Form field focus',
    'Card hover effects',
    'Navigation transitions'
  ],
  'CSS Animations': [
    'Loading spinners',
    'Entrance animations',
    'Attention-grabbing effects',
    'Complex sequences',
    'Bounce effects',
    'Fade animations',
    'Slide animations',
    'Pulse effects'
  ]
};

export const ANIMATION_KEYWORDS = [
  'animation',
  'transition',
  'keyframes',
  'animate',
  'smooth',
  'hover',
  'transform',
  'opacity',
  'scale',
  'rotate',
  'translate',
  'fade',
  'slide',
  'bounce',
  'pulse',
  'spin',
  'loading',
  'entrance',
  'exit',
  'interactive',
  'feedback',
  'ease',
  'duration',
  'delay'
];

export function extractAnimationKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDescription = description.toLowerCase();
  
  if (lowerDescription.includes('animate') || lowerDescription.includes('animation')) {
    keywords.push('animation', 'keyframes');
  }
  
  if (lowerDescription.includes('transition') || lowerDescription.includes('smooth')) {
    keywords.push('transition', 'smooth');
  }
  
  if (lowerDescription.includes('hover') || lowerDescription.includes('interactive')) {
    keywords.push('hover', 'interactive', 'transition');
  }
  
  if (lowerDescription.includes('loading') || lowerDescription.includes('spinner')) {
    keywords.push('loading', 'spinner', 'animation');
  }
  
  if (lowerDescription.includes('fade') || lowerDescription.includes('slide')) {
    keywords.push('fade', 'slide', 'animation');
  }
  
  if (lowerDescription.includes('bounce') || lowerDescription.includes('pulse')) {
    keywords.push('bounce', 'pulse', 'animation');
  }
  
  if (lowerDescription.includes('entrance') || lowerDescription.includes('exit')) {
    keywords.push('entrance', 'exit', 'animation');
  }
  
  return keywords;
}