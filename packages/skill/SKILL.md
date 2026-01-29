---
name: css-first
description: CSS-first expert guidance with live MDN Baseline and feature data. Use when asked about CSS implementations, modern CSS features, browser support, Baseline status, or when listing newly available web platform features.
---

# CSS First Agent Skill

An intelligent AI agent skill for providing context-aware, modern CSS-first solutions with semantic analysis and framework detection.

## Description

This skill transforms any AI agent into a CSS-first expert that enforces zero-JavaScript solutions using cutting-edge CSS features (2021-2025). The agent analyzes user intent, detects project context, and provides intelligently ranked CSS suggestions with implementation guidance.

**Core Capabilities**:
- **Semantic Intent Recognition**: Understands layout, animation, spacing, responsive, visual, and interaction intents
- **Framework Detection**: Automatically detects React, Vue, Angular, Svelte, Tailwind, Bootstrap, etc.
- **Logical-First Approach**: Prioritizes writing-mode aware properties for internationalization
- **MDN Integration**: Pulls live browser support data and baseline status
- **Intelligent Ranking**: Scores suggestions by intent match, browser support, and framework compatibility

## Live MDN Fetch Workflow

Use the live fetch workflow defined in `packages/skill/references/live-mdn-fetch.md` whenever Baseline status, newly available features, or current MDN content is requested.

## When to Use This Skill

Use this skill when:
- User asks for UI implementation solutions
- User needs to center elements, create layouts, add animations
- User wants responsive design patterns
- User asks about CSS properties or browser support
- User needs modern CSS alternatives to JavaScript solutions

## CSS Showcases

All examples are provided as real CSS files in `css-demos/` organized by category. Each file includes:
- Direct MDN documentation links
- Baseline status (🟢 🔵 🟡 🟣)
- Browser support percentage
- Task description and rationale
- Production-ready CSS code

### Layout

#### Modern Centering with Logical Properties
**File**: [`css-demos/layout/centering-logical.css`](css-demos/layout/centering-logical.css)
- **MDN**: [Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values), [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
- **Baseline**: 🟢 Widely Available
- **Support**: 99%
- **Task**: Center a card horizontally and vertically
- **Why**: Uses logical properties for RTL support and flexbox for reliable centering

#### Advanced Logical Spacing
**File**: [`css-demos/layout/logical-spacing.css`](css-demos/layout/logical-spacing.css)
- **MDN**: [Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- **Baseline**: 🟢 Widely Available
- **Support**: 95%
- **Task**: Create responsive spacing that works in any writing mode
- **Why**: Logical properties with container units create truly responsive, i18n-ready layouts

---

### Responsive

#### Container Queries
**File**: [`css-demos/responsive/container-queries.css`](css-demos/responsive/container-queries.css)
- **MDN**: [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- **Baseline**: 🔵 Newly Available
- **Support**: 90%
- **Task**: Create a card that adapts to its container size
- **Why**: Container queries allow components to be truly responsive to their container

#### Container Style Queries
**File**: [`css-demos/responsive/container-style-queries.css`](css-demos/responsive/container-style-queries.css)
- **MDN**: [Style Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@container#querying_custom_properties)
- **Baseline**: 🟡 Limited Availability
- **Support**: 78%
- **Task**: Style components based on parent state
- **Why**: Components respond to parent custom properties without JavaScript

---

### Animation

#### View Transitions
**File**: [`css-demos/animation/view-transitions.css`](css-demos/animation/view-transitions.css)
- **MDN**: [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- **Baseline**: 🔵 Newly Available
- **Support**: 90%
- **Task**: Add smooth page transitions
- **Why**: View Transitions API provides smooth, performant transitions without JavaScript

#### Scroll-Driven Animations
**File**: [`css-demos/animation/scroll-driven.css`](css-demos/animation/scroll-driven.css)
- **MDN**: [Scroll Timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll)
- **Baseline**: 🔵 Newly Available
- **Support**: 88%
- **Task**: Create animation that responds to scroll
- **Why**: Declarative scroll effects without JavaScript or scroll listeners

---

### Theming

#### Dark Mode with light-dark()
**File**: [`css-demos/theming/light-dark-function.css`](css-demos/theming/light-dark-function.css)
- **MDN**: [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark), [color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- **Baseline**: 🔵 Newly Available
- **Support**: 90%
- **Task**: Implement dark mode support
- **Why**: Native CSS dark mode without JavaScript or media queries

---

### Positioning

#### Anchor Positioning
**File**: [`css-demos/positioning/anchor-positioning.css`](css-demos/positioning/anchor-positioning.css)
- **MDN**: [Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
- **Baseline**: 🟡 Limited Availability
- **Support**: 75%
- **Task**: Create tooltips positioned relative to elements
- **Why**: CSS eliminates JavaScript for tooltip positioning with automatic adjustments

---

### Interaction

#### CSS-Only Carousel
**File**: [`css-demos/interaction/carousel-scroll-snap.css`](css-demos/interaction/carousel-scroll-snap.css)
- **MDN**: [Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap)
- **Baseline**: 🟢 Widely Available
- **Support**: 98%
- **Task**: Create an image carousel
- **Why**: Pure CSS carousel with scroll snap, no JavaScript needed

---

### Visual

#### Form Validation
**File**: [`css-demos/visual/form-validation.css`](css-demos/visual/form-validation.css)
- **MDN**: [:user-valid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-valid), [:user-invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid)
- **Baseline**: 🔵 Newly Available
- **Support**: 90%
- **Task**: Style form with validation feedback
- **Why**: CSS-only validation feedback without JavaScript

## Integration with Projects

The skill automatically detects your project setup and provides tailored recommendations:

### React Projects
- Use CSS Modules for component-scoped styles
- Leverage `className` prop (not `class`)
- Consider Tailwind for utility-first approach
- Use CSS custom properties for theming

### Vue Projects
- Use `<style scoped>` for component isolation
- Use `:class` binding for dynamic classes
- Leverage Vue transition components with CSS
- Use CSS custom properties with `v-bind`

### Angular Projects
- Use `ViewEncapsulation` for style scoping
- Leverage `[ngClass]` for conditional classes
- Consider Angular Material if using Material Design
- Use `:host` for component root styling

### Tailwind Projects
- Use utility classes alongside custom CSS
- Leverage responsive prefixes: `md:`, `lg:`
- Use `@apply` for component classes
- Configure custom container queries in v4

---

## Rules & Guidelines

All behavior rules are documented in the `rules/` folder:

### 1. CSS-Only Enforcement
**File**: [`rules/css-only-enforcement.md`](rules/css-only-enforcement.md)
- Always prioritize CSS solutions over JavaScript
- Use modern CSS features (2021-2025)
- JavaScript only for data fetching, state management, real-time updates

### 2. Logical Properties First
**File**: [`rules/logical-properties-first.md`](rules/logical-properties-first.md)
- Always use logical properties over physical properties
- `inline-size` instead of `width`, `block-size` instead of `height`
- `margin-inline` instead of `margin-left/right`
- Works in LTR, RTL, and vertical writing modes

### 3. Modern CSS Features (2021-2025)
**File**: [`rules/modern-css-features.md`](rules/modern-css-features.md)
- Prefer 2024-2025 features (check baseline)
- Then 2022-2023 features (widely available)
- Then 2021 features (excellent support)
- Pre-2021 only when modern alternatives don't exist

### 4. Semantic Intent Analysis
**File**: [`rules/semantic-intent-analysis.md`](rules/semantic-intent-analysis.md)
- Understand user intent before suggesting solutions
- Detect layout, animation, spacing, responsive, visual, interaction intents
- Analyze confidence levels
- Ask clarifying questions when confidence is low

### 5. Framework Awareness
**File**: [`rules/framework-awareness.md`](rules/framework-awareness.md)
- Detect React, Vue, Angular, Svelte from user messages
- Detect Tailwind, Bootstrap, Material-UI, Chakra UI
- Provide framework-specific code examples
- Respect framework conventions and best practices

### 6. Browser Support Consideration
**File**: [`rules/browser-support-consideration.md`](rules/browser-support-consideration.md)
- Always provide baseline status (🟢 🔵 🟡 🟣)
- 🟢 Widely Available (95%+): Safe for production
- 🔵 Newly Available (85-94%): Recently stable
- 🟡 Limited (70-84%): Use with progressive enhancement
- 🟣 Experimental (<70%): Cutting-edge, use cautiously

### 7. Progressive Enhancement
**File**: [`rules/progressive-enhancement.md`](rules/progressive-enhancement.md)
- Core functionality works everywhere
- Enhancements layer on top for capable browsers
- Use `@supports` for feature detection
- Provide fallbacks for experimental features

---

## Browser Support Levels

- **🟢 Widely Available** (95%+): Safe for production use
- **🔵 Newly Available** (85-94%): Recently stable, verify target browsers
- **🟡 Limited Availability** (70-84%): Use with progressive enhancement
- **🟣 Experimental** (<70%): Cutting-edge features, use cautiously

---

## Quick Reference

| User Intent | CSS Solution | File Reference |
|-------------|--------------|----------------|
| Center element | Flexbox/Grid | `layout/centering-logical.css` |
| Responsive layout | Container Queries | `responsive/container-queries.css` |
| Dark mode | light-dark() | `theming/light-dark-function.css` |
| Page transitions | View Transitions | `animation/view-transitions.css` |
| Scroll effects | Scroll-driven | `animation/scroll-driven.css` |
| Tooltips | Anchor Positioning | `positioning/anchor-positioning.css` |
| Spacing | Logical Properties | `layout/logical-spacing.css` |
| Carousel | Scroll Snap | `interaction/carousel-scroll-snap.css` |
| Form validation | :user-valid/:user-invalid | `visual/form-validation.css` |

---

## Skill Structure

```
packages/skill/
├── SKILL.md                          # This file
├── rules/                            # Detailed behavior rules
│   ├── css-only-enforcement.md
│   ├── logical-properties-first.md
│   ├── modern-css-features.md
│   ├── semantic-intent-analysis.md
│   ├── framework-awareness.md
│   ├── browser-support-consideration.md
│   └── progressive-enhancement.md
└── css-demos/                        # Real CSS examples
    ├── layout/
    │   ├── centering-logical.css
    │   └── logical-spacing.css
    ├── responsive/
    │   ├── container-queries.css
    │   └── container-style-queries.css
    ├── animation/
    │   ├── view-transitions.css
    │   └── scroll-driven.css
    ├── theming/
    │   └── light-dark-function.css
    ├── positioning/
    │   └── anchor-positioning.css
    ├── interaction/
    │   └── carousel-scroll-snap.css
    └── visual/
        └── form-validation.css
```

---

## Key Principles

1. **CSS-Only**: Never suggest JavaScript when CSS can solve the problem
2. **Logical Properties**: Always prefer `inline-size` over `width`, `block-size` over `height`
3. **Modern First**: Prioritize 2021-2025 CSS features
4. **Progressive Enhancement**: Core functionality first, enhancements on top
5. **Framework Aware**: Adapt recommendations to detected frameworks
6. **Semantic Analysis**: Understand user intent before suggesting solutions
7. **Browser Support**: Always consider compatibility and provide baseline status

---

## See Also

- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **CSS Baseline**: https://web.dev/baseline/
- **Modern CSS Features**: All demos use 2021-2025 CSS features with baseline status
