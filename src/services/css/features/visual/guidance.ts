/**
 * Visual Guidance - Implementation guidance for visual properties
 */

import { ImplementationGuidance } from '../../types.js';

export const VISUAL_GUIDANCE: Record<string, ImplementationGuidance> = {
  'overflow': {
    basic_usage: '.container { overflow: hidden; }',
    best_practices: [
      'Use overflow: clip for better performance than hidden',
      'Combine with overflow-clip-margin for precise clipping',
      'Use scroll for intentional scrollable areas',
      'Consider accessibility when hiding content'
    ],
    fallbacks: [
      'Use overflow: hidden for older browsers',
      'Provide alternative navigation for hidden content',
      'Use JavaScript for custom scroll implementations'
    ],
    example_code: `
/* Basic overflow control */
.text-container {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Modern clip with margin */
.clip-container {
  overflow: clip;
  overflow-clip-margin: 10px;
}

/* Scrollable container */
.scrollable {
  overflow-y: auto;
  max-height: 300px;
}

/* Logical overflow properties */
.logical-overflow {
  overflow-inline: scroll;
  overflow-block: hidden;
}

/* Fallback for older browsers */
@supports not (overflow: clip) {
  .clip-container {
    overflow: hidden;
  }
}

/* Responsive overflow */
@media (max-width: 768px) {
  .scrollable {
    overflow-x: auto;
    overflow-y: visible;
  }
}`
  },
  'overflow-clip-margin': {
    basic_usage: '.element { overflow-clip-margin: 10px; }',
    best_practices: [
      'Use with overflow: clip for extended clipping area',
      'Combine with logical properties for directional layouts',
      'Use relative units for responsive designs',
      'Consider visual balance when setting margins'
    ],
    fallbacks: [
      'Use padding on parent container',
      'Use negative margins on child elements',
      'JavaScript-based clipping solutions'
    ],
    example_code: `
/* Basic clip margin */
.card {
  overflow: clip;
  overflow-clip-margin: 1rem;
}

/* Asymmetric clip margins */
.banner {
  overflow: clip;
  overflow-clip-margin: 20px 10px;
}

/* Responsive clip margins */
.responsive-clip {
  overflow: clip;
  overflow-clip-margin: clamp(5px, 2vw, 20px);
}

/* With logical properties */
.logical-clip {
  overflow: clip;
  overflow-clip-margin-block: 10px;
  overflow-clip-margin-inline: 15px;
}

/* Image gallery with clip margins */
.gallery-item {
  overflow: clip;
  overflow-clip-margin: 2rem;
  border-radius: 8px;
}

.gallery-item img {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Fallback for unsupported browsers */
@supports not (overflow-clip-margin: 10px) {
  .card {
    padding: 1rem;
  }
  
  .banner {
    padding: 20px 10px;
  }
}`
  },
  'overscroll-behavior': {
    basic_usage: '.element { overscroll-behavior: contain; }',
    best_practices: [
      'Use contain to prevent scroll chaining',
      'Use none to disable bounce effects',
      'Apply to modal overlays and fixed containers',
      'Consider user experience when disabling scroll behaviors'
    ],
    fallbacks: [
      'Use JavaScript to prevent scroll chaining',
      'CSS touch-action for touch devices',
      'Event.preventDefault() on scroll events'
    ],
    example_code: `
/* Prevent scroll chaining in modal */
.modal {
  overscroll-behavior: contain;
  overflow-y: auto;
}

/* Disable bounce effects */
.chat-container {
  overscroll-behavior-y: none;
  overflow-y: scroll;
}

/* Horizontal scroll without affecting vertical */
.horizontal-scroller {
  overscroll-behavior-x: contain;
  overscroll-behavior-y: auto;
  overflow-x: auto;
}

/* Logical overscroll behavior */
.content-area {
  overscroll-behavior-inline: contain;
  overscroll-behavior-block: auto;
}

/* Full page scroll control */
body {
  overscroll-behavior: none;
}

/* Mobile-specific overscroll */
@media (max-width: 768px) {
  .mobile-scroll {
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
  }
}

/* Nested scrollable areas */
.sidebar {
  overscroll-behavior: contain;
  overflow-y: auto;
  height: 100vh;
}

.main-content {
  overscroll-behavior: auto;
  overflow-y: scroll;
}

/* Fallback using JavaScript */
@supports not (overscroll-behavior: contain) {
  .modal {
    /* JavaScript required for scroll prevention */
  }
}`
  }
};

export function getVisualGuidance(property: string, needsFallback: boolean = false): ImplementationGuidance | null {
  const guidance = VISUAL_GUIDANCE[property];
  if (!guidance) return null;
  
  return {
    ...guidance,
    fallbacks: needsFallback ? guidance.fallbacks : []
  };
}