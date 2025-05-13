# E-Comerce application using Strapi CMS

This project is a full-stack e-commerce application built using **Strapi** for the backend and **Next.js** for the frontend. It allows users to view and add products, and perform typical e-commerce actions. The backend (Strapi) handles content management and API routes, while the frontend (Next.js) provides an interactive user interface.

## Project Structure

```plaintext
├── backend/               # Strapi backend (API)
│   ├── api/               # API endpoints (Products, Users, etc.)
│   ├── config/            # Configurations for Strapi
│   ├── extensions/        # Strapi extensions or plugins
│   └── public/            # Static files (images, assets)
├── frontend/              # Next.js frontend
│   ├── components/        # React components for UI
│   ├── pages/             # Pages for the frontend (Product Listing, Cart, etc.)
│   ├── public/            # Static assets (images, icons)
│   └── styles/            # Global and component-specific CSS
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## Technologies Used

Backend: Strapi (Node.js CMS)

Frontend: Next.js (React framework)

Database: SQLite (configured with Strapi)

Styling: TailwindCSS (for responsive and modern UI)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Yarn (or npm)

### Backend (Strapi)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
yarn install   # or npm install
```

3. Configure your environment variables in `.env` for database and API settings (you can use SQLite or any other DB based on your needs).

4. Start Strapi in development mode:

```bash
yarn start   # or npm run start
```

Strapi should now be running at http://localhost:1337. The admin panel will be available at http://localhost:1337/admin.


### Frontend (Next.js)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
yarn install   # or npm install
```

3. Configure the frontend to connect to your backend (Strapi). Set the appropriate API URLs in `.env` (like `NEXT_PUBLIC_API_URL`).

4. Start the Next.js development server:

```bash
yarn dev   # or npm run dev
```

The frontend will be running at http://localhost:3000


## Environment Variables

Backend (.env for Strapi)

```env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=./data.db
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

Frontend (.env for Next.js)

```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
```
