Quick server for Portfolio CRUD (MongoDB)

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `MONGO_DB`.
2. Install dependencies:

```powershell
cd server
npm install
```

3. Run server in development:

```powershell
npm run dev
```

The server exposes REST endpoints under `/api/:collection` and `/api/:collection/:id` that match the frontend's expected CRUD operations.
