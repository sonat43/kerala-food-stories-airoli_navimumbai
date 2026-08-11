/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'kerala-food-stories-order-basket'

function restoreCart() {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed.filter((item) => item?.id && item.quantity > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(restoreCart)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ordering remains fully functional when storage is unavailable.
    }
  }, [items])

  const addItem = useCallback((dish) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === dish.id)
      if (existing) {
        return current.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...current, { ...dish, quantity: 1 }]
    })
  }, [])

  const addItems = useCallback((entries) => {
    setItems((current) => {
      const next = [...current]
      entries.forEach(({ dish, quantity = 1 }) => {
        const existingIndex = next.findIndex((item) => item.id === dish.id)
        if (existingIndex >= 0) {
          next[existingIndex] = { ...next[existingIndex], quantity: next[existingIndex].quantity + quantity }
        } else {
          next.push({ ...dish, quantity })
        }
      })
      return next
    })
  }, [])

  const decrementItem = useCallback((dishId) => {
    setItems((current) => current
      .map((item) => item.id === dishId ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0))
  }, [])

  const removeItem = useCallback((dishId) => {
    setItems((current) => current.filter((item) => item.id !== dishId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const getQuantity = useCallback((dishId) => items.find((item) => item.id === dishId)?.quantity || 0, [items])

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  const savings = useMemo(() => items.reduce((sum, item) => {
    const itemSaving = item.originalPrice ? item.originalPrice - item.price : 0
    return sum + Math.max(0, itemSaving) * item.quantity
  }, 0), [items])

  const value = useMemo(() => ({
    items, itemCount, total, savings, isCartOpen, setIsCartOpen,
    addItem, addItems, decrementItem, removeItem, clearCart, getQuantity,
  }), [items, itemCount, total, savings, isCartOpen, addItem, addItems, decrementItem, removeItem, clearCart, getQuantity])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
