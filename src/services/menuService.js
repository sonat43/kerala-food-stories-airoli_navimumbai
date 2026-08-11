import { firebaseEnabled, getDb } from '../lib/firebase'
import { seedDishes } from '../data/seedDishes'

function normalizeDish(dish) {
  return {
    ...dish,
    parcelCharge: dish.parcelCharge ?? (dish.category === 'meals' ? 10 : 0),
  }
}

export async function fetchDishes() {
  if (!firebaseEnabled) return seedDishes.map(normalizeDish)

  try {
    const [db, { collection, getDocs }] = await Promise.all([getDb(), import('firebase/firestore')])
    if (!db) return seedDishes
    const snapshot = await getDocs(collection(db, 'dishes'))
    const dishes = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
    return dishes.length ? dishes.filter((dish) => dish.isAvailable !== false).map(normalizeDish) : seedDishes.map(normalizeDish)
  } catch (error) {
    console.warn('Could not reach Firestore; using local menu data.', error)
    return seedDishes.map(normalizeDish)
  }
}

export async function logOrder(order) {
  if (!firebaseEnabled) return null

  try {
    const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([getDb(), import('firebase/firestore')])
    if (!db) return null
    return await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
      status: 'whatsapp_sent',
    })
  } catch (error) {
    console.warn('Order opened in WhatsApp but could not be logged to Firestore.', error)
    return null
  }
}
