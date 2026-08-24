# Yasin Eryılmaz - Portfolio Web App

## 1. Project Overview & Tech Stack

- **Goal & Stack:** A modern portfolio showcasing a Frontend Developer with over 6 years of experience[cite: 1], demonstrating clean, scalable, and performance-driven web interfaces[cite: 1]. Built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.
- **Backend & Infrastructure:** Node.js, PostgreSQL, Drizzle ORM, Redis (ioredis), Nginx, Docker, GitHub Actions (CI pipeline).

## 2. Current Architecture & Database

- **Status:** Infrastructure is containerized via Docker (running DB & Redis). UI development is done locally via `npm run dev`. The `src/services/github.ts` service caches GitHub API data using Redis.
- **Drizzle Schemas:**
  - `projects` (title, slug, description, techStack, links)
  - `skills` (name, category)
  - `messages` (name, email, content)

## 3. UI/UX Vision

- **Theme:** Minimalist, clean, featuring glassmorphism details. Avoid unnecessary animations. Emphasize sharp typography and a modern aesthetic.
- **Layout Structure:**
  - **Navbar:** Sticky, semi-transparent header.
  - **Hero:** Large, bold typography with generous whitespace.
  - **Skills:** A marquee or grid displaying technology badges.
  - **Experience:** A vertical timeline layout for work history.
  - **Projects:** Interactive cards for featured projects.

## 4. AI Development Guidelines & Rules

- Strictly adhere to the Next.js App Router paradigm, maintaining a clear separation between Server Components and Client Components (`"use client"`).
- Utilize existing `shadcn/ui` components for the interface. If a new shadcn component is required, explicitly output the command: `npx shadcn@latest add <component-name>`.
- Use `lucide-react` for all icons.
- Always prioritize clean code principles, accessibility, and responsive design.

## 5. Personal Details & Copywriting (DO NOT USE LOREM IPSUM)

- **Name:** Yasin Eryılmaz[cite: 1]
- **Role:** Frontend Developer / Full Stack Developer[cite: 1]
- **Location:** Istanbul, Turkey[cite: 1]
- **Contact Info:** yasineryilmazfb@gmail.com | +(90) 539 672 6083 | [LinkedIn](https://www.linkedin.com/in/eryilmazyasin/) | [GitHub](https://github.com/eryilmazyasin)[cite: 1]
- **Short Bio:** Frontend Developer with over 6 years of experience developing clean, scalable, and performance-driven web interfaces[cite: 1]. I specialize in complete project lifecycles, taking applications from initial setup and Node.js backend integration to Docker containerization and production deployments[cite: 1]. Delivery-focused with an analytical mindset and strong problem-solving capabilities[cite: 1].
- **Experience Highlights:**
  - **Metus (Aug 2021 - Present):** Frontend Developer building Metance with React JS and landing pages with Next JS, utilizing TypeScript, TanStack Query, and SignalR[cite: 1].
  - **Freelance (2023 - Present):** Full Stack Developer for a Hotel Management Automation system using React JS (TS), Node.js, and MySQL[cite: 1].
  - **Akinon & Detroit Digital:** Over 2.5 years developing e-commerce and corporate UI architectures[cite: 1].
- **Key Skills:**
  - **Frontend:** React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, shadcn[cite: 1].
  - **State Management:** Redux, TanStack Query, Context API, Zustand[cite: 1].
  - **Backend & DevOps:** Node.js, PostgreSQL, Docker, Nginx, AWS, DigitalOcean, Webpack, Vercel[cite: 1].
- **Education:** Bachelor's Degree in Management Information Systems from Nişantaşı University (2015-2019)[cite: 1].
