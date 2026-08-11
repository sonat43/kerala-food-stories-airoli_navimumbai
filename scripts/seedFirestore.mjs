import { initializeApp } from 'firebase/app'
import { collection, doc, getFirestore, writeBatch } from 'firebase/firestore'
import { seedDishes } from '../src/data/seedDishes.js'

const config = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

if (!config.apiKey || !config.projectId) {
  throw new Error('Set the VITE_FIREBASE_* environment variables before running npm run seed.')
}

const db = getFirestore(initializeApp(config))
const batch = writeBatch(db)
seedDishes.forEach((dish) => {
  const { id, ...data } = dish
  batch.set(doc(collection(db, 'dishes'), id), data)
})

await batch.commit()
console.log(`Seeded ${seedDishes.length} dishes.`)
