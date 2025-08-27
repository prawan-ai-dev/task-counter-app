# Task Counter App

A Next.js app with a counter and recent actions list, powered by Convex for real-time database functionality.

## Features

- Counter starts at 0
- Increment and decrement buttons
- Reset button (disabled at 0)
- Recent actions list (last 10)
- Clean Tailwind styling
- Real-time updates with Convex

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Convex

1. Create a Convex account at [convex.dev](https://convex.dev)
2. Create a new project
3. Copy your deployment URL
4. Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_CONVEX_URL=your-deployment-url
   ```

### 3. Deploy Convex functions

```bash
npx convex dev
```

### 4. Run the development server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Convex Functions

The app uses these Convex functions:

- `counter.get` - Get current counter value
- `counter.getActions` - Get recent actions
- `counter.increment` - Increment counter
- `counter.decrement` - Decrement counter  
- `counter.reset` - Reset counter to 0

## Database Schema

- `counter` table: Stores the current counter value
- `actions` table: Stores action history with timestamps
