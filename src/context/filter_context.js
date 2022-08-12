import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  gridview: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping:false,
    
    
    
  }
}



const FilterContext = React.createContext()





export const FilterProvider = ({ children }) => {
  const{products} = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log(products)
  
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
    // also product is coming from the product context so we need to catch it in our reducer 
    // for the filter-context
    // well, here because the first time the component loads, product is alwaays an 
    // empty array, so we are dispatching the action if and only if the value of the product changes

  }, [products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    // adding   state.filters to the dependency array
    // works for this first action dispatched.
    dispatch({type:SORT_PRODUCTS})

  }, [products,state.sort, state.filters])
  // we sort products anytime the value of the products and the value of the sort
  // changes. remember sort is a controlled input.

  // here we want the useeffect to run everytime that we update sort, and everytime 
  // the product changes, we want to change some things



  const updateFilters = (e) => {
    
    let name = e.target.name

    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
      // console.log(e.target.dataset.color)
    }
    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({type:UPDATE_FILTERS, payload:{name, value}})
    console.log(name)
    
  }

  const clearFilters = () => {
    dispatch({type:CLEAR_FILTERS})
    
  }
  
  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW})
  }
  const setListView = () => {
    dispatch({type: SET_LISTVIEW})
  }
  const updateSort = (e) => {
    // const name = e.target.name
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
    console.log(value);
  };


  return (
    <FilterContext.Provider value={{
      ...state, setGridView,
      setListView, updateSort, updateFilters, clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
