# Browser Support Consideration Rule

## Principle

**ALWAYS consider browser compatibility when suggesting CSS solutions. Provide baseline status and fallbacks when necessary.**

## CSS Baseline Status

All CSS features are categorized by their baseline availability:

### 🟢 Widely Available (95%+ support)
**Status**: Safe for production use

**Examples**:
- Flexbox
- CSS Grid (basic)
- CSS Custom Properties
- `clamp()`, `min()`, `max()`
- `:focus-visible`
- `aspect-ratio`
- Logical properties (basic)
- `accent-color`

**Guidance**: Use confidently without fallbacks

```css
/* No fallback needed */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

---

### 🔵 Newly Available (85-94% support)
**Status**: Recently stabilized, good for modern projects

**Examples**:
- Container Queries
- Subgrid
- CSS Nesting
- `:has()` pseudo-class
- `light-dark()` function
- View Transitions API
- Scroll-driven Animations
- Dynamic viewport units (`dvh`, `dvw`, `dvi`, `dvb`)
- `@starting-style`
- `color-mix()`

**Guidance**: Safe for modern browsers, mention support level

```css
/* Container Queries - 🔵 Newly Available */
.container {
  container-type: inline-size;
}

@container (inline-size > 600px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**User Note**: "Container Queries are newly available (🔵) with ~90% browser support. Works in Chrome 105+, Safari 16+, Firefox 110+."

---

### 🟡 Limited Availability (70-84% support)
**Status**: Partial support, use with progressive enhancement

**Examples**:
- Anchor Positioning
- Container Style Queries
- Masonry Layout (experimental)
- `interpolate-size`
- Advanced scroll timelines

**Guidance**: Provide fallback or progressive enhancement

```css
/* Fallback approach */
.button {
  anchor-name: --my-button;
}

.tooltip {
  /* Fallback: traditional positioning */
  position: absolute;
  top: 100%;
  left: 0;

  /* Modern: anchor positioning (🟡 Limited) */
  position-anchor: --my-button;
  position-area: bottom;
}

@supports (position-area: bottom) {
  .tooltip {
    top: auto;
    left: auto;
  }
}
```

---

### 🟣 Experimental (<70% support)
**Status**: Cutting-edge, behind flags or in draft

**Examples**:
- `corner-shape` (superellipse)
- CSS `if()` function
- Some View Transition features
- Experimental scroll state queries

**Guidance**: Warn users, explain experimental nature

```css
/* ⚠️ Experimental feature - limited support */
.button {
  /* Standard rounded corners for all browsers */
  border-radius: 12px;

  /* Experimental: superellipse corners (🟣 Experimental) */
  corner-shape: round;
  border-radius: 12px / 20px;
}
```

**User Warning**: "⚠️ `corner-shape` is experimental (🟣) with very limited support. Currently behind flags. Use standard `border-radius` as fallback."

---

## Support Level Guidelines

### When to Use Each Level

| User Project Type | Recommended Baseline |
|------------------|---------------------|
| Modern web app (2024+) | 🔵 Newly Available is safe |
| General website | 🟢 Widely Available + selective 🔵 |
| Legacy support needed | 🟢 Widely Available only |
| Experimental project | 🟡 Limited or 🟣 Experimental OK |

---

## Browser Version Guidance

### Modern Browser Targets (2024)

**🟢 Safe to use without fallback**:
- Chrome/Edge 120+
- Firefox 120+
- Safari 17+

**🔵 Newly Available features**:
- Chrome/Edge 105+
- Firefox 110+
- Safari 16+

**🟡 Limited features**:
- Chrome 125+
- Safari 17.4+
- Firefox (may not be supported)

---

## Fallback Strategies

### Strategy 1: Progressive Enhancement

**Best for**: Features that enhance but aren't critical

```css
/* Base styles work everywhere */
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Enhanced with container queries if supported */
@container (inline-size > 600px) {
  .card {
    flex-direction: row;
  }
}
```

**No fallback needed**: Base styles work, enhancement applies where supported.

---

### Strategy 2: Feature Detection with @supports

**Best for**: Features with clear alternatives

```css
/* Fallback */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  width: 100%;
}

@media (min-width: 768px) {
  .card {
    width: 48%;
  }
}

/* Modern enhancement */
@supports (container-type: inline-size) {
  .container {
    container-type: inline-size;
  }

  @container (inline-size > 600px) {
    .card {
      width: 100%;
    }
  }
}
```

---

### Strategy 3: Graceful Degradation

**Best for**: Visual enhancements

```css
/* Works everywhere, looks better in modern browsers */
.card {
  background: white; /* Fallback */
  background: light-dark(white, #1a1a1a); /* Modern */

  border: 1px solid #ddd; /* Fallback */
  border-inline-start: 3px solid blue; /* Logical property */
}
```

Old browsers get the first value, modern browsers use the second.

---

### Strategy 4: Polyfills (Last Resort)

**Use only when**: CSS alone can't provide fallback

```html
<!-- Container Query polyfill for older browsers -->
<script src="https://cdn.jsdelivr.net/npm/container-query-polyfill"></script>
```

**⚠️ Note**: Avoid polyfills when possible. Prefer CSS-only solutions.

---

## Communicating Browser Support

### Format for Responses

When suggesting features, include support status:

**Example 1: Widely Available**
```css
/* ✅ Flexbox (🟢 Widely Available - 99% support) */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Example 2: Newly Available**
```css
/* ✅ Container Queries (🔵 Newly Available - 90% support) */
/* Works in: Chrome 105+, Safari 16+, Firefox 110+ */
.container {
  container-type: inline-size;
}
```

**Example 3: Limited Availability**
```css
/* ⚠️ Anchor Positioning (🟡 Limited - 75% support) */
/* Works in: Chrome 125+, Edge 125+ */
/* Progressive enhancement recommended */
.tooltip {
  position-anchor: --my-button;
  position-area: bottom;
}
```

**Example 4: Experimental**
```css
/* 🧪 corner-shape (🟣 Experimental - <50% support) */
/* Behind flags, not production-ready */
/* Use standard border-radius instead */
.button {
  border-radius: 12px; /* Use this */
  /* corner-shape: round; */ /* Don't use yet */
}
```

---

## Target Browser Detection

### Detect from Context

If user mentions:
- "Chrome only" → Can use 🟡 Limited features
- "Safari support needed" → Check Safari-specific compatibility
- "IE11 support" → Use only 🟢 Widely Available (or older)
- "Modern browsers" → 🔵 Newly Available is safe
- "General audience" → Prefer 🟢 Widely Available

---

## Common Support Pitfalls

### 1. Safari Lag
Safari often lags behind Chrome/Firefox. Check Safari support specifically:

```css
/* Container Queries: Chrome 105+, Firefox 110+, Safari 16+ ✅ */
/* View Transitions: Chrome 111+, Safari 18+ (partial) ⚠️ */
```

---

### 2. Logical Properties
Most logical properties are 🟢 Widely Available, but some are 🔵 Newly Available:

```css
/* 🟢 Widely Available */
margin-inline: 1rem;
padding-block: 2rem;
inline-size: 100%;

/* 🔵 Newly Available */
inset-inline: 0;
border-start-start-radius: 8px;
```

---

### 3. Viewport Units
Physical viewport units (🟢) vs. logical viewport units (🔵):

```css
/* 🟢 Widely Available */
min-height: 100vh;
width: 100vw;

/* 🔵 Newly Available */
min-block-size: 100dvb;
inline-size: 100vi;
```

---

## Validation Checklist

Before suggesting CSS:

- [ ] Did I check the baseline status?
- [ ] Is this feature widely available or do I need to mention support?
- [ ] Do I need to provide a fallback?
- [ ] Have I warned the user if using experimental features?
- [ ] Did I specify browser versions if relevant?
- [ ] Is progressive enhancement appropriate here?
- [ ] Have I used `@supports` if needed?

---

## Resources for Checking Support

1. **MDN Browser Compatibility** - Most reliable
2. **Can I Use** - Visual support tables
3. **CSS Baseline** (web.dev/baseline) - Official baseline status
4. **MDN CSS Reference** - Feature documentation

---

## Response Template

```
**Solution**: [CSS Feature Name]
**Status**: [🟢/🔵/🟡/🟣] [Support Level] (~XX% browser support)
**Browser Versions**: Chrome XX+, Safari XX+, Firefox XX+
**Fallback**: [Yes/No] - [Strategy if needed]

[CSS Code]

[Additional notes if experimental or limited]
```

---

## Remember

**Browser support isn't just about compatibility—it's about user trust. Always be transparent about what works where, and provide graceful fallbacks when needed.**

Modern doesn't mean reckless. Balance cutting-edge features with practical production needs.
