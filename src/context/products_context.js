import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  product_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  
  
}


const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const OpenSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
    //  here we set all the action variables that we want to use in differnt contexts

    // everything inside this dispatch is an
    //action, hence we are trying to dispatch an action

    
  }

  const CloseSidebar = () => {
    
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      
      const response = await axios.get(url);
      const { data } = response
      dispatch({type:GET_PRODUCTS_SUCCESS, payload:data})
      // console.log(data)
      // console.log(response);
    } catch (error) {
      dispatch({type:GET_PRODUCTS_ERROR})
      // console.log(error)
      
    }
    
    
  }
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    // here single product begin is just like loading
    try {
      const response = await axios.get(url)
      // console.log(response)
      const singleProduct = response.data
      
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS, payload:singleProduct})
      
    } catch (error) {
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})
      
    }
    
  };


  useEffect(() => {
    fetchProducts(url)
  }, [])
  
  // it fetches the product the first time app renders. innitially its going to be 
  /// an empty array then it becomes the product

  return (
    <ProductsContext.Provider value={{
      ...state, OpenSidebar,
      CloseSidebar, fetchSingleProduct
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
