# Modern CSS Features Rule (2021-2025)

## Principle

**ALWAYS prefer modern CSS features (2021-2025) that provide better DX, performance, and maintainability.**

## Priority Order

When suggesting CSS solutions, prefer in this order:

1. **2024-2025 Features** (cutting-edge, check baseline)
2. **2022-2023 Features** (widely available)
3. **2021 Features** (excellent support)
4. **Pre-2021 Features** (only when modern alternatives don't exist)

---

## Modern Features by Category

### Layout & Sizing (2021-2025)

#### ✅ Container Queries (2022-2023)
**Status**: 🔵 Newly Available

```css
.container {
  container-type: inline-size;
  container-name: card;
}

@container card (inline-size > 40cqi) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**Use instead of**: Media queries for component-level responsive design

---

#### ✅ Subgrid (2023)
**Status**: 🔵 Newly Available

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.grid-item {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

**Use instead of**: Complex grid nesting workarounds

---

#### ✅ Dynamic Viewport Units (2022-2023)
**Status**: 🔵 Newly Available

```css
.hero {
  min-block-size: 100dvb; /* Accounts for mobile browser UI */
}

.sidebar {
  min-block-size: 100svb; /* Small viewport */
  max-block-size: 100lvb; /* Large viewport */
}
```

**Use instead of**: `100vh` (which doesn't account for mobile browser chrome)

---

### Color & Theming (2021-2024)

#### ✅ light-dark() Function (2023-2024)
**Status**: 🔵 Newly Available

```css
:root {
  color-scheme: light dark;
}

.element {
  background: light-dark(white, #1a1a1a);
  color: light-dark(#333, #f0f0f0);
  border-color: light-dark(#ddd, #444);
}
```

**Use instead of**: Media query `prefers-color-scheme` with duplicated rules

---

#### ✅ color-mix() Function (2023)
**Status**: 🔵 Newly Available

```css
.button {
  --primary: #0066cc;
  background: var(--primary);
}

.button:hover {
  background: color-mix(in srgb, var(--primary) 80%, white);
}
```

**Use instead of**: Manually defining color variations or using opacity

---

#### ✅ accent-color (2021-2022)
**Status**: 🟢 Widely Available

```css
:root {
  accent-color: #0066cc;
}

/* Automatically styles checkboxes, radios, range inputs */
```

**Use instead of**: Custom-styled form controls

---

### Animations & Transitions (2023-2024)

#### ✅ View Transitions API (2023-2024)
**Status**: 🔵 Newly Available

```css
@view-transition {
  navigation: auto;
}

.card {
  view-transition-name: card-transition;
}

::view-transition-old(card-transition),
::view-transition-new(card-transition) {
  animation-duration: 0.3s;
}
```

**Use instead of**: JavaScript animation libraries for page transitions

---

#### ✅ Scroll-Driven Animations (2023-2024)
**Status**: 🔵 Newly Available

```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: reveal linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
```

**Use instead of**: JavaScript scroll listeners and animation libraries

---

#### ✅ @starting-style (2023)
**Status**: 🔵 Newly Available

```css
.dialog {
  transition: opacity 0.3s, transform 0.3s;

  @starting-style {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.dialog[open] {
  opacity: 1;
  transform: translateY(0);
}
```

**Use instead of**: JavaScript for entry animations

---

### Positioning & Layout (2024)

#### ✅ Anchor Positioning (2024)
**Status**: 🟡 Limited Availability

```css
.button {
  anchor-name: --my-anchor;
}

.tooltip {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;
  margin-block-end: 0.5rem;
}
```

**Use instead of**: JavaScript positioning libraries for tooltips/popovers

---

### Selectors & Pseudo-classes (2021-2024)

#### ✅ :has() Pseudo-class (2022-2023)
**Status**: 🔵 Newly Available

```css
/* Parent selector! */
.card:has(img) {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

/* Form validation */
form:has(:invalid) .submit-button {
  opacity: 0.5;
  pointer-events: none;
}
```

**Use instead of**: JavaScript for parent/sibling styling

---

#### ✅ :is() and :where() (2021)
**Status**: 🟢 Widely Available

```css
/* Reduce selector repetition */
:is(h1, h2, h3, h4, h5, h6) {
  margin-block: 0;
  line-height: 1.2;
}

/* Zero specificity with :where() */
:where(.card, .panel, .box) {
  padding-inline: 1rem;
}
```

**Use instead of**: Repeating selectors or high-specificity rules

---

#### ✅ :focus-visible (2021)
**Status**: 🟢 Widely Available

```css
/* Only show outline for keyboard focus */
button:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}

button:focus:not(:focus-visible) {
  outline: none;
}
```

**Use instead of**: Removing focus outlines (bad for accessibility)

---

### CSS Nesting (2023)

#### ✅ Native CSS Nesting
**Status**: 🔵 Newly Available

```css
.card {
  padding-inline: 1rem;
  background: white;

  & .title {
    font-size: 1.5rem;
  }

  &:hover {
    background: #f5f5f5;
  }

  @media (inline-size > 600px) {
    padding-inline: 2rem;
  }
}
```

**Use instead of**: CSS preprocessors (Sass, Less) for nesting

---

### Container Style Queries (2024)

#### ✅ Style Queries
**Status**: 🟡 Limited Availability

```css
.card-container {
  container-name: card;
  --theme: dark;
}

@container card style(--theme: dark) {
  .card {
    background: #1a1a1a;
    color: white;
  }
}
```

**Use instead of**: JavaScript for theme detection in components

---

### Math Functions (2021-2024)

#### ✅ Enhanced Math Functions
**Status**: 🟢 Widely Available

```css
.element {
  /* Trigonometry */
  rotate: calc(sin(45deg) * 90deg);

  /* Rounding */
  padding: round(up, 1.3rem, 0.5rem);

  /* Advanced calculations */
  inline-size: clamp(
    300px,
    calc(50vi - 2rem),
    800px
  );
}
```

**Use instead of**: JavaScript for complex calculations

---

## Feature Detection

When using experimental features, provide fallbacks:

```css
/* Fallback */
.container {
  max-width: 800px;
  margin: 0 auto;
}

/* Modern */
@supports (container-type: inline-size) {
  .container {
    container-type: inline-size;
    max-inline-size: 100%;
  }
}
```

---

## Baseline Status Guide

When suggesting features, always mention baseline status:

- **🟢 Widely Available** (95%+ support): Use confidently
- **🔵 Newly Available** (85-94% support): Safe for most modern projects
- **🟡 Limited Availability** (70-84% support): Use with progressive enhancement
- **🟣 Experimental** (<70% support): Bleeding edge, use cautiously

---

## Modernization Priority

Replace these old patterns with modern alternatives:

| ❌ Old Pattern | ✅ Modern Alternative | Status |
|---------------|---------------------|--------|
| Floats for layout | Flexbox, Grid | 🟢 |
| `@media` for components | `@container` | 🔵 |
| `100vh` | `100dvb` | 🔵 |
| `prefers-color-scheme` duplicated | `light-dark()` | 🔵 |
| JavaScript scroll listeners | `animation-timeline: view()` | 🔵 |
| JavaScript tooltip positioning | Anchor Positioning | 🟡 |
| Sass/Less nesting | Native CSS nesting | 🔵 |
| `:focus` outlines | `:focus-visible` | 🟢 |
| Manual color variations | `color-mix()` | 🔵 |
| `left/right/top/bottom` | `inset-inline/block` | 🟢 |

---

## Validation Checklist

Before suggesting CSS, ask:

- [ ] Is there a 2021+ feature that solves this better?
- [ ] Am I using container queries instead of media queries for components?
- [ ] Am I using logical properties and viewport units?
- [ ] Am I using `light-dark()` for theming?
- [ ] Am I using scroll-driven animations instead of JavaScript?
- [ ] Am I using `:has()` for parent/sibling selectors?
- [ ] Have I checked the baseline status?

---

## Remember

**Modern CSS is not just about new features—it's about better patterns, better performance, and better developer experience.**

Stay current with MDN, web.dev, and CSS Baseline to provide cutting-edge solutions.
