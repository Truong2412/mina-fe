export interface cartItemType {
  _id: string
  name: string
  quantity: number
  image: string
  classification: string
}

export type cartItems = cartItemType[] | []

export interface cartContextType {
  cartItems: cartItems
  updateAllCart: (cartItems: cartItems) => void
  addItem: (newItem: cartItemType) => void
  deleteItem: (_id: string, index: number) => void
  updateItem: (_id: string, quantity: number, index: number) => void
}
