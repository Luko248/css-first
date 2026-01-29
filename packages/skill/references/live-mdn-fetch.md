# Live MDN Fetch Workflow

Use this workflow whenever the user asks for Baseline status, newly available features, or current MDN content.

## Steps

1. Fetch Baseline definition
   - Source: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
   - Treat this as the authoritative description of Baseline labels.

2. Fetch Web-Features dataset (Baseline truth)
   - Data: https://unpkg.com/web-features/data.json
   - Schema: https://unpkg.com/web-features/data.schema.json
   - Use this as the source of truth for Baseline status and feature timelines.

3. Determine “new” features
   - Use `status.baseline === "low"` for “newly available” features, or recent snapshot diffs if provided.
   - Include Baseline dates when available in the dataset.

4. Fetch Browser-Compat Data (BCD)
   - Source: https://unpkg.com/@mdn/browser-compat-data/data.json
   - Use for feature metadata and `mdn_url` pointers.

5. Fetch MDN pages
   - For each listed feature, open its `mdn_url` and summarize current content:
     - What it is, syntax/usage notes, and any key caveats
     - Compatibility status (align with Baseline and BCD)

## Rules

- Always fetch fresh data; do not rely on cached or internal knowledge.
- When listing features, cite Baseline, web-features, BCD, and MDN pages.
- Keep summaries short and current; prioritize MDN’s latest guidance.
