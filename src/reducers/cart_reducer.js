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
            // this will enable us not exceed the total items in the store
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
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return {...state, cart:tempCart}
  }
  if (action.type === CLEAR_CART) {
    return {...state, cart:[]}
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    
    const tempCart = state.cart.map((item) => {

      if (item.id === id) {
        
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
             newAmount =item.max
          }
          return {...item, amount: newAmount}
           
        }
        if (value === 'dec') {
          let newAmount = item.amount -1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
           
          
        }
        
      } return item
     })

    return {...state, cart:tempCart}
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
      
      const { amount, price } = cartItem
      console.log(amount)
       total.total_items += amount
      total.total_amount += price * amount
      // it multiplies price with amount for every instance of the object and 
      // adds the value to the total object, then adds it to the innitial value of the total object
      return total

    }, {
      total_items: 0,
      total_amount:0
    })
    return {...state, total_items, total_amount}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
