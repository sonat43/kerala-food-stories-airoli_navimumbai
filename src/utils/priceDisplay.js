export const hiddenPriceDishIds = new Set(['ayala-fry', 'mathi-fry', 'chembally', 'plate-manthal'])

export function shouldHidePrice(item) {
  const dishId = item.dishId || item.id?.split('--')[0]
  return item.hidePrice || hiddenPriceDishIds.has(dishId)
}

export function getDisplayedTotal(items) {
  const knownTotal = items.reduce((sum, item) => shouldHidePrice(item) ? sum : sum + item.price * item.quantity, 0)
  const hasHiddenFish = items.some(shouldHidePrice)
  if (!hasHiddenFish) return `₹${knownTotal}`
  return `${knownTotal ? `₹${knownTotal} + ` : ''}price of fish`
}
