# IntuitiveIQ™ — Website

Marketing site for **IntuitiveIQ™ — Decision Intelligence Engine for Enterprise AI** (intuitiveiq.ai).

> Knowledge Fabric + Agentic Orchestration for governed, multi-model, multi-agent AI systems.
> **Explainability. Traceability. Auditability. Accountability.**

## Structure

Plain static site — no build step.

```
index.html    single-page site (hero, trust promise, live showcase, pillars,
              how-it-works, what-you-can-build, industries, stack, outcomes,
              trust layer, CTA)
styles.css    design system (dark Intuitive theme) + IntuitiveIQ additions
script.js     showcase tab rotation, lineage dot grid, smooth scroll, reveal-on-scroll
assets/       Intuitive logo + favicon
```

## Local preview

```bash
python3 -m http.server 8765
# open http://localhost:8765
```

## Deployment

Served from the production EC2 (Caddy vhost → `intuitiveiq-web` nginx container).
To update the deployed site:

```bash
rsync -av --delete -e "ssh -i ~/.ssh/semantixiq-prod" \
  ./ ec2-user@18.214.93.182:/opt/intuitiveiq-website/ \
  --exclude .git --exclude README.md
```

Files are picked up immediately (the container bind-mounts the directory).

## Brand architecture

| Element | Value |
|---|---|
| Public brand | IntuitiveIQ™ |
| Category | Decision Intelligence Engine |
| Theme | Knowledge Fabric + Agentic Orchestration |
| Trust promise | Explainability · Traceability · Auditability · Accountability |
