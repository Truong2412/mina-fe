import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { cartContextType, cartItems, cartItemType } from './cart/type'

const CartContext = createContext<cartContextType>({} as cartContextType)

interface Props {
  children: ReactNode
}

const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<cartItems>([])
  //fill cart when user logged in
  const updateAllCart = useCallback((cartItems: cartItems) => {
    setCartItems(cartItems)
  }, [])

  //add new item to cart
  const addItem = useCallback(
    (newItem: cartItemType) => {
      const cloneCartItems = [...cartItems]
      cloneCartItems.push(newItem)
    },
    [cartItems]
  )

  //delete a item
  const deleteItem = useCallback(
    (_id: string, index: number) => {
      const cloneCartItems = [...cartItems]
      cloneCartItems.splice(index, 1)
      setCartItems(cloneCartItems)
    },
    [cartItems]
  )
  //update a item
  const updateItem = useCallback(
    (_id: string, quantity: number, index: number) => {
      const cloneCartItems = [...cartItems]
      cloneCartItems[index].quantity = quantity
      setCartItems(cloneCartItems)
    },
    [cartItems]
  )

  return (
    <CartContext.Provider
      value={{ cartItems, updateAllCart, addItem, deleteItem, updateItem }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContextProvider, CartContext }
