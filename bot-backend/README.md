# OpenFreeMap Bot Backend

Backend API and Telegram bot for the OpenFreeMap Mini App.

## Setup

```bash
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

## Environment Variables

```env
BOT_TOKEN=your_telegram_bot_token
FRONTEND_URL=https://your-frontend-url
BACKEND_URL=https://your-backend-url
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_key
PORT=3000
```

## Database

Import the schema from `database/schema.sql` into your Supabase project.

## API Endpoints

### Users
- `GET /api/users/:telegramId` - Get user
- `POST /api/users` - Create user
- `PUT /api/users/update/:id` - Update user

### Locations  
- `GET /api/locations` - Get all locations
- `POST /api/locations` - Create location

### Favorites
- `GET /api/users/:telegramId/favorites` - Get user favorites
- `POST /api/users/:telegramId/favorites` - Add favorite
- `DELETE /api/users/:telegramId/favorites/:locationId` - Remove favorite


## Bot Commands

- `/start` - Launch Mini App
- `/help` - Show help
- `/map` - Open map directly