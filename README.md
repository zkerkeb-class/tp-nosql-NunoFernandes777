# Pokedex Dashboard

Next.js + MongoDB application for exploring the Kanto Pokedex, authenticating users, managing favorites, computing Pokemon statistics, and storing custom teams.

## Overview

This project started as a Pokemon API exercise and has grown into a full-stack app with:

- public Pokemon browsing
- detailed Pokemon pages
- authentication with hashed passwords and JWT
- protected CRUD for Pokemon
- favorites per user
- aggregation-based statistics
- team management with populated Pokemon data
- extra UI pages for team building, journey tracking, forum, and type chart exploration

## Tech Stack

- Next.js 16 App Router
- React 19
- MongoDB + Mongoose
- Tailwind CSS 4
- `bcrypt` for password hashing
- `jsonwebtoken` for JWT authentication

## Main Features

### Frontend pages

- `/` home page
- `/connexion` login page
- `/register` registration page
- `/pokemon/[id]` Pokemon detail page
- `/team` team builder UI
- `/journey` and `/journey/map`
- `/type-chart`
- `/forum`
- `/pokemon_supabase`

### Pokemon API

- list all Pokemon
- get one Pokemon by id
- create, update, delete Pokemon
- filtering by type
- search by name
- sorting and pagination
- advanced validation in French

### Authentication

- register user
- login and receive JWT
- auth via `Authorization: Bearer <token>`
- auth cookie support for the UI

### Favorites

- add favorite
- remove favorite
- list current user favorites

### Stats

- count Pokemon by type
- average HP by type
- Pokemon with highest Attack
- Pokemon with highest HP

### Teams

- create a team
- list current user teams
- get one team with populated Pokemon data
- update a team
- delete a team

## Requirements

- Node.js 20+
- MongoDB running locally or accessible through `MONGODB_URI`

## Environment Variables

Create a `.env` file based on `.env.example`.

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pokemons
API_URL=http://localhost:3000
JWT_SECRET=dev-secret-change-me
```

Important note:

- the app connects with `dbName: "pokemon-nosql"` in [`lib/mongodb.js`](./lib/mongodb.js), so Mongo will use the `pokemon-nosql` database even if your URI path says `pokemons`

## Installation

```bash
npm install
```

## Run the Project

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Open:

- `http://localhost:3000`

## Seed the Database

Insert the 151 base Pokemon into MongoDB:

```bash
npm run seed
```

Expected output:

```text
Connecte a MongoDB !
Collection videe.
151 Pokemon inseres avec succes !
Connexion fermee.
```

## Authentication Flow

1. Register with `POST /api/auth/register`
2. Login with `POST /api/auth/login`
3. Read the returned JWT
4. Use it in protected routes:

```http
Authorization: Bearer <token>
```

Protected routes:

- `POST /api/pokemons`
- `PUT /api/pokemons/:id`
- `DELETE /api/pokemons/:id`
- `GET /api/favorites`
- `POST /api/favorites/:pokemonId`
- `DELETE /api/favorites/:pokemonId`
- all `/api/teams` routes

Public routes:

- `GET /api/pokemons`
- `GET /api/pokemons/:id`
- `GET /api/stats`

## API Reference

### Auth

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a user |
| `POST` | `/api/auth/login` | Login and return `{ token }` |
| `POST` | `/api/auth/connexion` | Legacy login route used by the current UI |
| `POST` | `/api/auth/logout` | Clear auth cookie |
| `GET` | `/api/auth/me` | Return current auth state |

Example register body:

```json
{
  "username": "sacha",
  "password": "pikachu"
}
```

Example login response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Pokemon

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/pokemons` | List Pokemon |
| `POST` | `/api/pokemons` | Create a Pokemon |
| `GET` | `/api/pokemons/:id` | Get one Pokemon |
| `PUT` | `/api/pokemons/:id` | Update one Pokemon |
| `DELETE` | `/api/pokemons/:id` | Delete one Pokemon |
| `POST` | `/api/newpokemons` | Legacy create route still present in the project |

Example create body:

```json
{
  "id": 999,
  "name": {
    "english": "Codexmon",
    "french": "Codexmon",
    "japanese": "Kodexumon",
    "chinese": "Codexmon"
  },
  "type": ["Electric"],
  "base": {
    "HP": 50,
    "Attack": 60,
    "Defense": 40,
    "SpecialAttack": 70,
    "SpecialDefense": 50,
    "Speed": 90
  }
}
```

### Pokemon filters, sorting, and pagination

Supported query parameters on `GET /api/pokemons`:

- `type`
- `name`
- `nameLanguage`
- `sort`
- `page`
- `limit`

Examples:

```http
GET /api/pokemons?type=Fire
GET /api/pokemons?name=char
GET /api/pokemons?sort=name.french
GET /api/pokemons?sort=-base.HP
GET /api/pokemons?page=2&limit=20
GET /api/pokemons?type=Fire&sort=-base.Attack&page=1&limit=5
```

When `page` or `limit` is present, the API returns:

```json
{
  "data": [],
  "page": 1,
  "limit": 20,
  "total": 151,
  "totalPages": 8
}
```

### Favorites

Current UI routes:

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/auth/favorites` | Return favorite ids |
| `POST` | `/api/auth/favorites` | Add favorite by body `{ pokemonId }` |
| `DELETE` | `/api/auth/favorites/:id` | Remove favorite |

Exercise-style routes also available:

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/favorites` | Return full favorite Pokemon documents |
| `POST` | `/api/favorites/:pokemonId` | Add favorite |
| `DELETE` | `/api/favorites/:pokemonId` | Remove favorite |

### Stats

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/stats` | Aggregated Pokemon statistics |

Response shape:

```json
{
  "countByType": [],
  "averageHpByType": [],
  "topAttackPokemon": {},
  "topHpPokemon": {}
}
```

### Teams

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/teams` | Create a team |
| `GET` | `/api/teams` | List my teams |
| `GET` | `/api/teams/:id` | Get one team with populated Pokemon |
| `PUT` | `/api/teams/:id` | Update a team |
| `DELETE` | `/api/teams/:id` | Delete a team |

Example team body:

```json
{
  "name": "Kanto Core",
  "pokemons": [1, 4, 7, 25, 39, 94]
}
```

Rules:

- a team belongs to one authenticated user
- a team can contain at most 6 Pokemon
- Pokemon are resolved by Pokedex `id`
- team detail routes return populated Pokemon data

## Validation Rules

Pokemon validation is enforced in Mongoose:

- `id` must be a positive integer
- `type` must belong to:
  - `Normal`, `Fire`, `Water`, `Electric`, `Grass`, `Ice`, `Fighting`, `Poison`, `Ground`, `Flying`, `Psychic`, `Bug`, `Rock`, `Ghost`, `Dragon`, `Dark`, `Steel`, `Fairy`
- stats must be between `1` and `255`
- validation messages are returned in French

User validation:

- `username` is required and unique
- `password` is required
- password is hashed before save

Team validation:

- `name` is required
- `pokemons` max length is `6`

## Project Structure

```text
app/
  api/
    auth/
    favorites/
    pokemons/
    stats/
    teams/
  connexion/
  forum/
  journey/
  pokemon/[id]/
  register/
  team/
  type-chart/
components/
data/
db/
lib/
middleware/
models/
mvc/
services/
```

Key folders:

- `app/` Next.js pages and route handlers
- `models/` main Mongoose models exposed for the app
- `mvc/controllers/` backend business logic
- `services/` data access helpers
- `middleware/` authentication middleware
- `db/` database scripts
- `data/` base Pokemon and trainer data

## Useful Commands

```bash
npm run dev
npm run build
npm start
npm run seed
```

## Notes

- the repository still contains some legacy compatibility routes such as `/api/auth/connexion` and `/api/newpokemons`
- both cookie-based auth and Bearer token auth are supported
- the app uses MongoDB references for teams and `populate()` to load full Pokemon data
