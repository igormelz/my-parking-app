# OpenFreeMap - telegram - template

A Telegram Mini App integration with OpenFreeMap. for discovering and sharing local places. Share your favorite locations with your friends, discover new places ! 🗺️✈️ 🍜

## Features

- Interactive fullscreen map interface
- Location discovery and management
- User favorites system  
- Profile management
- Tab-based navigation (Explore/Favorites)
- Real-time location services

## Tech Stack

**Frontend:**
- React with TypeScript
- Leaflet for maps
- Telegram UI components
- Tailwind CSS
- Vite build system

**Backend:**
- Node.js API
- Supabase PostgreSQL
- Telegram Bot integration

## Quick Start

### Prerequisites
- Node.js 18+
- Telegram Bot Token
- Supabase account

### Frontend Setup

```bash
npm install
npm run dev:https
```

### Backend Setup

```bash
cd bot-backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

### Environment Variables

Create `.env` in `bot-backend/`:

```env
BOT_TOKEN=your_telegram_bot_token
FRONTEND_URL=https://your-frontend-url
BACKEND_URL=https://your-backend-url
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_key
```

### Database Schema

Run the SQL schema in `bot-backend/database/schema.sql` in your Supabase project.

## Deployment

**Frontend:** Deploy to Vercel, Netlify, or GitHub Pages  
**Backend:** Deploy to Railway, Heroku, or Vercel

## Documentation

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## License

[MIT License](https://opensource.org/licenses/MIT)
