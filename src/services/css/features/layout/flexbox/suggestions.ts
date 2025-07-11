/**
 * Flexbox Suggestions - Syntax examples and use cases
 */

export const FLEXBOX_SYNTAX = {
  'Flexbox': `
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.item {
  flex: 1;
  min-width: 0;
}

/* Responsive flexbox */
.responsive {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .responsive {
    flex-direction: row;
  }
}`
};

export const FLEXBOX_USE_CASES = {
  'Flexbox': [
    'Component layout',
    'Centering content',
    'Responsive navigation',
    'Card layouts',
    'Form layouts',
    'Button groups',
    'Media objects',
    'Equal height columns'
  ]
};

export const FLEXBOX_KEYWORDS = [
  'flex',
  'flexbox',
  'layout',
  'center',
  'align',
  'justify',
  'responsive',
  'navigation',
  'cards',
  'columns',
  'wrap',
  'direction',
  'gap',
  'grow',
  'shrink'
];

export function extractFlexboxKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDescription = description.toLowerCase();
  
  if (lowerDescription.includes('flex') || lowerDescription.includes('flexbox')) {
    keywords.push('flexbox', 'flex');
  }
  
  if (lowerDescription.includes('center') || lowerDescription.includes('align')) {
    keywords.push('center', 'align', 'justify');
  }
  
  if (lowerDescription.includes('layout') || lowerDescription.includes('responsive')) {
    keywords.push('layout', 'responsive');
  }
  
  if (lowerDescription.includes('navigation') || lowerDescription.includes('nav')) {
    keywords.push('navigation', 'layout');
  }
  
  if (lowerDescription.includes('cards') || lowerDescription.includes('grid')) {
    keywords.push('cards', 'layout');
  }
  
  return keywords;
}