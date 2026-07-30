# OctoFit Tracker Frontend

This Vite React app powers the presentation tier for the OctoFit Tracker multi-tier application.

## Environment configuration

Define the Codespaces environment variable before starting the app:

```bash
cp .env.example .env.local
```

Example contents:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When the variable is set, the frontend builds API URLs such as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
```

If the variable is not defined, the app falls back to localhost so API URLs stay safe and predictable.

## Scripts

- `npm run dev` — start the local Vite development server
- `npm run build` — create a production build
