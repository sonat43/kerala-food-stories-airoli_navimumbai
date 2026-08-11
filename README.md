# Kerala Food Stories — Airoli

A responsive restaurant catalog for Kerala Food Stories in Airoli, Navi Mumbai, built with React, Vite, Tailwind CSS, Framer Motion, Firebase, and a WhatsApp order handoff.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

The menu works immediately with the local data in `src/data/seedDishes.js`. Firebase is optional.

## WhatsApp setup

Set `VITE_WHATSAPP_NUMBER` in `.env` to the restaurant number using digits only and including the country code:

```env
VITE_WHATSAPP_NUMBER=917208207729
```

## Firebase setup

1. Create a Firebase web project and enable Firestore.
2. Copy `.env.example` to `.env` and fill in the `VITE_FIREBASE_*` values.
3. Set the same variables in your terminal session and run `npm run seed` to upload the sample menu.

The app reads from the `dishes` collection. When Firebase is unavailable, empty, or not configured, it automatically uses the local seed menu. Submitted WhatsApp orders are logged to `orders` when Firestore is connected.

Suggested Firestore production rules should allow public reads for available dishes and route order creation through a trusted server or Firebase App Check before launch. Client-side order creation is intended for initial development only.

## Production

```bash
npm run build
npm run preview
```
