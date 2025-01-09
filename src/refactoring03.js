export function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  return (
      // 가격(price) = 기본가격 - 수량할인 + 배송비
      basePrice -
      Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
      Math.min(basePrice * 0.1, 100)
  )
}
