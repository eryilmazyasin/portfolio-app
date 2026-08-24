# 🚀 Developer Portfolio & Personal Platform

A high-performance, containerized, and multilingual developer portfolio platform engineered with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Drizzle ORM**, **Neon Serverless PostgreSQL**, and **Upstash Redis**.

🌐 **Live Demo:** [yasineryilmaz.com](https://yasineryilmaz.com)

---

## ✨ Key Architectural Highlights

- **⚡ React Server Components (RSC):** Optimized data-fetching pipeline rendered entirely on the server with minimal client-side JavaScript bundle size.
- **🌍 Full Internationalization (i18n):** Type-safe localized routing and message dictionaries via `next-intl` (Turkish & English).
- **🗄️ Persistence & ORM Layer:** Fully type-safe relational schema management and queries using **Drizzle ORM** connected to **Neon Serverless PostgreSQL**.
- **🛡️ Distributed Rate Limiting & Anti-Spam:** Contact form endpoints secured with **Upstash Redis** (Sliding Window Algorithm) and invisible **Honeypot fields** to block automated spam without user friction.
- **📊 Real-Time GitHub Activity Feed:** Account-wide public contribution metrics and repository telemetry fetched via **GitHub GraphQL API** and cached with Redis (1-hour TTL & ISR).
- **🔍 Automated Edge SEO & Dynamic OG Images:** Multilingual `sitemap.xml`, `robots.txt`, and runtime Edge-rendered OpenGraph preview cards generated dynamically via `@vercel/og` (`ImageResponse`).
- **🐳 Multi-Stage Containerization:** Standalone output Dockerfile, Nginx reverse proxy configuration, and `docker-compose.yml` for unified local/production deployments.
- **🤖 Automated CI/CD:** GitHub Actions workflow executing automated linting, TypeScript type checking (`tsc --noEmit`), and build verification on push.

---

## 🛠️ Tech Stack

| Category                  | Technologies                                           |
| :------------------------ | :----------------------------------------------------- |
| **Framework & Core**      | Next.js (App Router), React, TypeScript                |
| **Database & Cache**      | Neon Serverless PostgreSQL, Drizzle ORM, Upstash Redis |
| **Styling & UI**          | Tailwind CSS, Lucide React, shadcn/ui primitives       |
| **Internationalization**  | `next-intl` (`i18n/`, `locales/`)                      |
| **Security & Validation** | `@upstash/ratelimit`, Honeypot Field, Strict Regex     |
| **DevOps & Cloud**        | Docker, Docker Compose, Nginx, GitHub Actions, Vercel  |

---

## 📂 Project Structure

```text
├── .github/              # GitHub Actions CI/CD workflows
├── i18n/                 # next-intl routing & request configuration
├── locales/              # Translation dictionaries (en.json, tr.json)
├── nginx/                # Reverse proxy configuration for container deployments
├── public/               # Static assets, icons, and project media
├── src/
│   ├── actions/          # Type-safe Next.js Server Actions (Contact form, validations)
│   ├── app/              # App Router (Layouts, routes, sitemap.ts, robots.ts, OG & Favicon)
│   ├── components/       # Modular UI components (Server & Client components)
│   ├── db/               # Drizzle ORM schemas, migration files, and database seed scripts
│   ├── lib/              # Shared utility functions and UI helper helpers
│   ├── providers/        # Client providers (Theme, context providers)
│   └── services/         # External API integrations & caching (GitHub GraphQL, Redis)
├── docker-compose.yml    # Multi-container orchestration stack
├── Dockerfile            # Multi-stage production container build
├── drizzle.config.ts     # Drizzle Kit configuration file
├── components.json       # UI component registry configuration
└── next.config.ts        # Next.js standalone and compiler configuration
```
