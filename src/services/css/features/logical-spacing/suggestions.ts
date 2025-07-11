/**
 * Logical Spacing Suggestions - Syntax examples and use cases
 */

export const LOGICAL_SPACING_SYNTAX = {
  'Logical Spacing Properties': `
.element {
  padding-inline: 1rem;
  padding-block: 0.5rem;
  margin-inline: auto;
  margin-block: 1rem;
  scroll-margin-inline: 1rem;
}

/* Fine-grained control */
.asymmetric {
  padding-inline-start: 2rem;
  padding-inline-end: 1rem;
  margin-block-start: 2rem;
}`,
  'Modern CSS Units': `
.container {
  width: 60ch;
  padding: 1rem;
  margin-inline: auto;
  height: 100vh;
}

.responsive {
  width: clamp(16rem, 50vw, 60rem);
  padding: 1rem 2rem;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
}`
};

export const LOGICAL_SPACING_USE_CASES = {
  'Logical Spacing Properties': [
    'International layouts with RTL support',
    'Responsive spacing that adapts to writing direction',
    'Accessible spacing with relative units',
    'Scroll-aware spacing for carousels',
    'Direction-agnostic component design'
  ],
  'Modern CSS Units': [
    'Responsive typography with rem/em',
    'Content-aware sizing with ch units',
    'Viewport-based responsive layouts',
    'Logical viewport units for mobile',
    'Accessible spacing with relative units'
  ]
};

export const LOGICAL_SPACING_KEYWORDS = [
  'spacing',
  'padding',
  'margin',
  'scroll-margin',
  'logical',
  'inline',
  'block',
  'rem',
  'em',
  'ch',
  'vi',
  'vb',
  'responsive',
  'international',
  'rtl',
  'ltr'
];

export function extractLogicalSpacingKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDescription = description.toLowerCase();
  
  if (lowerDescription.includes('padding') || lowerDescription.includes('margin') || lowerDescription.includes('spacing')) {
    keywords.push('logical-spacing', 'spacing-units', 'padding', 'margin');
  }
  
  if (lowerDescription.includes('scroll-margin') || lowerDescription.includes('carousel') || lowerDescription.includes('scroll')) {
    keywords.push('scroll-margin-inline', 'scroll-margin-block');
  }
  
  if (lowerDescription.includes('rem') || lowerDescription.includes('responsive') || lowerDescription.includes('units')) {
    keywords.push('spacing-units', 'rem', 'em', 'ch');
  }
  
  if (lowerDescription.includes('rtl') || lowerDescription.includes('international') || lowerDescription.includes('direction')) {
    keywords.push('logical-spacing', 'inline', 'block');
  }
  
  return keywords;
}