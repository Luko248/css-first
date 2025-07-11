/**
 * CSS Grid Suggestions - Syntax examples and use cases
 */

export const GRID_SYNTAX = {
  'CSS Grid': `
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  gap: 1rem;
}

.item {
  grid-area: header;
}

/* Responsive grid */
@media (max-width: 768px) {
  .layout {
    grid-template-areas: 
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}`
};

export const GRID_USE_CASES = {
  'CSS Grid': [
    'Page layouts',
    'Complex grids',
    'Responsive designs',
    'Dashboard layouts',
    'Card grids',
    'Form layouts',
    'Magazine layouts',
    'Image galleries'
  ]
};

export const GRID_KEYWORDS = [
  'grid',
  'layout',
  'columns',
  'rows',
  'template',
  'areas',
  'responsive',
  'dashboard',
  'cards',
  'gallery',
  'magazine',
  'complex',
  'two-dimensional',
  'span',
  'repeat',
  'fr',
  'minmax',
  'auto-fit',
  'auto-fill'
];

export function extractGridKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDescription = description.toLowerCase();
  
  if (lowerDescription.includes('grid') || lowerDescription.includes('layout')) {
    keywords.push('grid', 'layout');
  }
  
  if (lowerDescription.includes('columns') || lowerDescription.includes('rows')) {
    keywords.push('columns', 'rows', 'template');
  }
  
  if (lowerDescription.includes('dashboard') || lowerDescription.includes('complex')) {
    keywords.push('dashboard', 'complex', 'areas');
  }
  
  if (lowerDescription.includes('cards') || lowerDescription.includes('gallery')) {
    keywords.push('cards', 'gallery', 'responsive');
  }
  
  if (lowerDescription.includes('magazine') || lowerDescription.includes('article')) {
    keywords.push('magazine', 'areas', 'template');
  }
  
  if (lowerDescription.includes('responsive') || lowerDescription.includes('adaptive')) {
    keywords.push('responsive', 'auto-fit', 'minmax');
  }
  
  return keywords;
}