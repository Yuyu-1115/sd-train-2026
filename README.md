# SD Train 2026
這個repo包含了今年（2026）電算工讀的作業。
## Homework
- **HW1**: [personal-website](https://github.com/Yuyu-1115/sd-train-2026/tree/e793a9e5947016b4563dc343e1775e509bddd5fe/personal-website)
- **HW2**: [search-website](https://github.com/Yuyu-1115/sd-train-2026/tree/e793a9e5947016b4563dc343e1775e509bddd5fe/search-website)

## Deployment
- Static sites are deployed by `.github/workflows/deploy-search-website.yml`.
- GitHub Pages: [https://yuyu-1115.github.io/sd-train-2026](https://yuyu-1115.github.io/sd-train-2026)

## CI/CD
- **Deploy Pages sites** (`.github/workflows/deploy-search-website.yml`)
  - Trigger: `push` to `main` when `personal-website/**`, `search-website/**`, or the workflow file changes; also supports `workflow_dispatch`.
  - Action: builds `search-website` with Bun, packages `personal-website` static files, and deploys both to GitHub Pages.
- **Build and push images** (`.github/workflows/build-image-and-push.yml`)
  - Trigger: `workflow_dispatch` or tag pushes matching `v*`.
  - Action: builds `hw1.Dockerfile` and `hw2.Dockerfile`, then pushes images to GHCR:
    - `ghcr.io/yuyu-1115/sd-train-hw1:<tag>`
    - `ghcr.io/yuyu-1115/sd-train-hw2:<tag>`
