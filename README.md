# Amin Kazempour — Portfolio

A dark, futuristic, 3D-enhanced personal portfolio for an AI Engineer & ML/DL
researcher. Built as a single, dynamic Next.js app with an admin CMS.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **Framer Motion** (animation, scroll storytelling, custom cursor)
- **React Three Fiber / Three.js** (3D neural-network hero)
- **Prisma ORM** + **SQLite** (dev) — swappable to **PostgreSQL**
- **NextAuth (Auth.js)** credentials auth for the `/admin` CMS
- SEO: Metadata API, JSON-LD (`Person`, `ScholarlyArticle`, `BlogPosting`), sitemap & robots

## Project structure

```
src/
  app/            routes: home, about, projects, research, experience, blog, contact, admin, api
  components/     layout, ux (cursor/scroll/reveal), three (3D), home, research, projects, skills, shared, admin
  lib/            prisma, auth, validations (zod), seo helpers, api helpers, utils
  data/           typed DB queries
  types/          shared types & enums
prisma/           schema.prisma + seed.ts
scripts/          make-cv.mjs (placeholder CV generator)
```

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   ```bash
   cp .env.example .env
   ```

   Set at least `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
   (A working `.env` with dev defaults is already included.)

3. **Database (SQLite by default)**

   ```bash
   npm run db:push     # create tables from schema
   npm run db:seed     # admin user + sample content
   node scripts/make-cv.mjs   # placeholder CV (optional)
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   - Site: http://localhost:3000
   - Admin: http://localhost:3000/admin  (log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

## Admin CMS

`/admin` lets you manage Publications, Projects, Experience, Blog posts, Skills,
and the Profile (bio, social links, thesis highlight). Auth is JWT-based; routes
are protected by middleware.

## Switching to PostgreSQL

1. In `prisma/schema.prisma`, set `datasource db { provider = "postgresql" }`.
2. Set `DATABASE_URL` to your Postgres connection string (e.g. Neon/Supabase).
3. Run `npm run db:push && npm run db:seed`.

## Build & deploy

```bash
npm run build
npm start
```

Deploy to **Vercel**: push the repo, set the same env vars in the project
settings, and (for production) use a hosted Postgres database. `npm run build`
runs `prisma generate` automatically.

## Notes

- 3D hero is lazy-loaded (`ssr: false`) and respects `prefers-reduced-motion`.
- The custom cursor only activates on fine-pointer (desktop) devices.
- Replace `public/cv/Amin-Kazempour-CV.pdf` and `public/images/og-image.png`
  with real assets.
```
