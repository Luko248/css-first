# CSS Demos Index

All CSS demos are organized by category with direct MDN links, baseline status, and browser support.

## Layout

### [centering-logical.css](layout/centering-logical.css)
**Modern Centering with Logical Properties**
- Baseline: 🟢 Widely Available (99%)
- MDN: [Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values), [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
- Task: Center a card horizontally and vertically
- Features: Flexbox, logical properties, dynamic viewport units

### [logical-spacing.css](layout/logical-spacing.css)
**Advanced Logical Spacing**
- Baseline: 🟢 Widely Available (95%)
- MDN: [Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- Task: Create responsive spacing that works in any writing mode
- Features: Logical spacing, container units, writing modes

---

## Responsive

### [container-queries.css](responsive/container-queries.css)
**Responsive Layout with Container Queries**
- Baseline: 🔵 Newly Available (90%)
- MDN: [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- Task: Create a card that adapts to its container size
- Features: Container queries, container units (cqi/cqb)

### [container-style-queries.css](responsive/container-style-queries.css)
**Container Style Queries**
- Baseline: 🟡 Limited Availability (78%)
- MDN: [Style Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@container#querying_custom_properties)
- Task: Style components based on parent state
- Features: Container style queries, custom properties, component theming

---

## Animation

### [view-transitions.css](animation/view-transitions.css)
**Smooth Animations with View Transitions**
- Baseline: 🔵 Newly Available (90%)
- MDN: [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- Task: Add smooth page transitions
- Features: View transitions, modern translate property, named transitions

### [scroll-driven.css](animation/scroll-driven.css)
**Scroll-Driven Animations**
- Baseline: 🔵 Newly Available (88%)
- MDN: [Scroll Timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll), [View Timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)
- Task: Create animation that responds to scroll
- Features: Scroll timeline, view timeline, modern translate/scale properties

---

## Theming

### [light-dark-function.css](theming/light-dark-function.css)
**Dark Mode with light-dark() Function**
- Baseline: 🔵 Newly Available (90%)
- MDN: [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark), [color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- Task: Implement dark mode support
- Features: light-dark() function, color-scheme property

---

## Positioning

### [anchor-positioning.css](positioning/anchor-positioning.css)
**Anchor Positioning for Tooltips**
- Baseline: 🟡 Limited Availability (75%)
- MDN: [Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
- Task: Create tooltips positioned relative to elements
- Features: Anchor positioning, position-area, position-try, @supports fallback

---

## Interaction

### [carousel-scroll-snap.css](interaction/carousel-scroll-snap.css)
**CSS-Only Carousel**
- Baseline: 🟢 Widely Available (98%)
- MDN: [Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap)
- Task: Create an image carousel
- Features: Scroll snap, scroll behavior, modern pseudo-elements

---

## Visual

### [form-validation.css](visual/form-validation.css)
**Modern Form with CSS-Only Validation**
- Baseline: 🔵 Newly Available (90%)
- MDN: [:user-valid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-valid), [:user-invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid)
- Task: Style form with validation feedback
- Features: :user-valid, :user-invalid, :focus-visible, :has() form validation

---

## Legend

- **🟢 Widely Available** (95%+): Safe for production use
- **🔵 Newly Available** (85-94%): Recently stable, verify target browsers
- **🟡 Limited Availability** (70-84%): Use with progressive enhancement
- **🟣 Experimental** (<70%): Cutting-edge features, use cautiously

---

## Modern CSS Features Used

All demos prioritize modern CSS features:

### Transform Properties
- ✅ `translate` property instead of `transform: translate()`
- ✅ `scale` property instead of `transform: scale()`
- ✅ `rotate` property instead of `transform: rotate()`

### Logical Properties
- ✅ `inline-size` / `block-size` instead of `width` / `height`
- ✅ `margin-inline` / `margin-block` instead of directional margins
- ✅ `padding-inline` / `padding-block` instead of directional padding
- ✅ `inset-inline` / `inset-block` instead of `left/right/top/bottom`

### Viewport & Container Units
- ✅ `dvi` / `dvb` (dynamic viewport inline/block)
- ✅ `svi` / `svb` (small viewport inline/block)
- ✅ `lvi` / `lvb` (large viewport inline/block)
- ✅ `cqi` / `cqb` (container query inline/block)

### Modern Pseudo-classes
- ✅ `:user-valid` / `:user-invalid` for form validation
- ✅ `:focus-visible` for keyboard-only focus
- ✅ `:has()` for parent/sibling selection

### Modern Functions
- ✅ `light-dark()` for theming
- ✅ `clamp()`, `min()`, `max()` for responsive sizing

---

## Usage

Each CSS file is:
1. **Self-documenting** with inline comments
2. **Production-ready** with proper fallbacks where needed
3. **MDN-linked** for detailed documentation
4. **Baseline-labeled** for browser support clarity
5. **Modern-first** using 2021-2025 CSS features
