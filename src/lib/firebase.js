const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let dbPromise = null

export async function getDb() {
  if (!firebaseEnabled) return null

  if (!dbPromise) {
    dbPromise = Promise.all([
      import('firebase/app'),
      import('firebase/firestore'),
    ]).then(([{ getApps, initializeApp }, { getFirestore }]) => {
      const app = getApps()[0] || initializeApp(firebaseConfig)
      return getFirestore(app)
    }).catch((error) => {
      console.warn('Firebase initialization failed; using local menu data.', error)
      return null
    })
  }

  return dbPromise
}
