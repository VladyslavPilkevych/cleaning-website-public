# DOCS

## Project Structure

The project is organized into two main parts: `backend` and `frontend`. Below is an overview of the directory structure:

```bash
/
├── backend/                         # Node.js + Express backend
│   ├── db/                          # Database connection
│   ├── routes/                      # API endpoints for handling frontend requests
│   ├── utils/
│   │   └── emails/                  # Email sending logic
│   │       ├── locales/             # Backend locale support
│   │       └── templates/           # Email HTML templates
│   ├── supabaseClient.js            # Supabase client integration
│   ├── server.js                    # Main server entry point
│   └── .env                         # Backend environment variables

├── frontend/                        # React + TypeScript frontend
│   ├── public/                      # Public assets
│   │   ├── icons/                   # Static icons
│   │   ├── images/                  # Image assets
│   │   ├── locales/                 # i18next translation files
│   │   ├── index.html               # Root HTML template
│   │   └── reset.css                # Global CSS reset
│   ├── src/                         # React source code
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Route-based page components
│   │   ├── utils/                   # Client-side utilities
│   │   ├── App.tsx                  # Root React component
│   │   └── index.tsx                # React entry point
│   ├── .env                         # Frontend environment variables
│   └── build/                       # Production build output (after `npm run build`)
```

## BE .env:

```bash
EMAIL_USER=
EMAIL_PASSWORD=
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_TABLE_NAME=
ADMIN_PANEL_PASSWORD=
STRIPE_KEY=
FRONTEND_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

## FE .env:

```bash
REACT_APP_STRIPE_KEY=
HTTPS=
SSL_CRT_FILE=
SSL_KEY_FILE=
```

## start stripe CLI:

  - `stripe login`
  - `stripe listen --forward-to localhost:5000/api/webhook/mail`

## releases:
  - `release/v1.0.0`
  <!-- - `release/v2.1.0-beta` -->
  <!-- - `release/v1.2.3-rc` -->

## email:
  - `infolexishine@gmail.com`
