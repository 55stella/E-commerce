import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'
import { AddToCart } from '../components'

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  }
  else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping:534,
  
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState,)

  const AddtoCart = (id, color, amount, product) => {
    dispatch({type:ADD_TO_CART, payload:{id, color, amount, product}})
    
  }
  const removeItem = (id) => { }
  const toggleAmount = (id, value) => { }
  const clearCart = () => { }
  
  useEffect(() => {
    const newcart = localStorage.setItem('cart', JSON.stringify(state.cart))
    // the local storage accepts data format in a string format. so for every time the 
    // value of cart changes, we are going tobe saving into local storage.
},[state.cart])

  return (
    <CartContext.Provider value={{
      AddtoCart, removeItem,
      toggleAmount, clearCart,...state
    }}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
