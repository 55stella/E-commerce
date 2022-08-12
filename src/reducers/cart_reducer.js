import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import { AddToCart } from '../components'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    
  
    const { id, amount, color, product } = action.payload
    const tempItem = state.cart.find((i) => i.id === id + color)
    // id plus color because a product can have the same id but different color.
    if (tempItem) {
      const tempCart = state.cart.map((cartitem) => {
        if (cartitem.id === id + color) {
          let newAmount = cartitem.amount + amount
          // amount will be equals the existing amount plus the amount in the state
          // the existing amount means that very amount that is already in the cart for a 
          // particular product
          if (newAmount > cartitem.max) {
            newAmount = cartitem.max
          }
          return {...cartitem, amount:newAmount}
          //
        } else {
          return {...cartitem}
        }
        
      })
      return {...state, cart:tempCart}
    }
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
