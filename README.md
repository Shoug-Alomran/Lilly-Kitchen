# Lilly Kitchen

Lilly Kitchen is a minimal Next.js web application scaffold for a recipe platform. It uses the App Router, plain JavaScript, plain CSS, and Markdown-based recipe content so development can start with a clean foundation.

## Tech Stack

- Next.js (App Router)
- JavaScript
- CSS
- Markdown recipe content
- Supabase placeholders for future authentication and database setup

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` runs a production build check
- `npm run start` starts the production server after a build

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values when Supabase is ready to be connected.

Current placeholders:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Recipe Content

Recipe content is expected to live in `content/recipes/` as Markdown files. A sample placeholder recipe is included to show the intended structure.

## Notes

- This repository only includes the base scaffold.
- Authentication, database integration, and production features should be added in later steps.
- Placeholder comments are included in the app files to mark future implementation areas.
