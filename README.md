# Cinefam

Cinema companion monorepo — track movies and shows, build watchlists, and share with friends.

## Stack

- **Monorepo**: pnpm workspaces + Turborepo + vite-plus (oxlint/oxfmt)
- **Web** (`apps/web`): TanStack Start on Cloudflare Workers, Better Auth, Postgres (Hyperdrive), TMDB proxy
- **Mobile** (`apps/mobile`): Expo SDK 56, TanStack DB + expo-sqlite persistence, manual sync glue
- **DB** (`packages/db`): Shared Drizzle Postgres schema and types

## Data architecture

| Layer | Technology | Purpose |
|-------|------------|---------|
| Live metadata | TMDB via `/api/tmdb/*` | Posters, ratings, discover, search |
| Server library | Postgres + Drizzle | Source of truth for watchlists, watched, social |
| Client library | TanStack DB + SQLite | Offline-first local replica on device |
| Glue | Manual REST (`/api/library/*`) | Pull snapshot, push rows — you extend as needed |
| Auth | Better Auth + Postgres | Email/password and Google OAuth |

## Getting started

```bash
cd cinefam
pnpm install
cp apps/web/.dev.vars.example apps/web/.dev.vars
cp apps/mobile/.env.example apps/mobile/.env
```

Start Postgres locally (example):

```bash
docker run -d --name cinefam-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cinefam -p 5432:5432 postgres:16
```

Run migrations:

```bash
pnpm --filter web db:generate
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cinefam pnpm --filter web db:migrate
```

### Web

```bash
pnpm --filter web dev
```

Opens at http://localhost:3072

### Mobile

```bash
pnpm --filter mobile start
```

Set `EXPO_PUBLIC_API_URL` to your web dev server.

## Library API (manual sync glue)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/library/snapshot` | Full library pull for authenticated user |
| GET | `/api/library/watchlists` | List watchlists |
| POST | `/api/library/watchlists` | Create or upsert watchlist |
| DELETE | `/api/library/watchlists/:id` | Delete watchlist |

Mobile calls `syncLibraryFromServer()` in `apps/mobile/src/lib/sync/library-api.ts` to hydrate local TanStack DB collections.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all dev servers |
| `pnpm check-types` | Typecheck all packages |
| `pnpm quality` | Lint + format check |
| `pnpm --filter web deploy` | Build and deploy web to Cloudflare |
