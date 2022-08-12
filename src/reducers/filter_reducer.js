import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import ListView from '../components/ListView';
import { products_url } from '../utils/constants';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    // console.log(maxPrice)

    return {
      ...state, all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
      // here we are setting price equallys to the max price  because when we start using 
      // the scroll functionality, we scroll from minprice to the max price
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {...state, gridview:true}
  }
  if (action.type === SET_LISTVIEW) {
    return {...state, gridview:false}
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
    // update sort is where we sort from price lowest/highest
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProducts = [...filtered_products]
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      
    }
    return { ...state, filtered_products: tempProducts };
  }
    if (action.type === UPDATE_FILTERS) {
      const {name, value} = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }
       
      // here we are returning all the values in the state then changing values. 
      // inside filters we are also returning all the filter property.
      // here we are taking note of the existing dynamic property.
      // it will access the name property in our input and assign it to the value in the state.
      // the name could be company, so the value will e.target.value.

    }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    
    const{text,category,company,color,price,shipping} = state.filters
    let tempProducts =[...all_products]// here we are copying all the values of all_product
    // to become a member of the filtered product
    if (text) {
    tempProducts= all_products.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
        
    })
      // category
    } if (category !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.category ===category
      })
    } else if (category === 'all') {
      tempProducts = [...tempProducts]
    }
    
    // here we are filtering temproduct only if there is text ie if in the search box, text is 
    // is typed.. then that condition is evaluated to true, then we change the value of temp product then we change
    // the value of the tempt product
    
     // company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.company === company
      })
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter(product => {
        console.log(product.colors)
        // color is an array, so for every product, go into the color array and find a 
        // a color thats equal to the color in the array. then use filter to return all the
        // product with that same color. thanks
        
        // more details
        // when a particular color is clicked, it updates the state.so this functunality is 
        // going to  return all the product with the same color as the one in the state.
        return product.colors.find(c => c === color)
        
      })
    }
    // price
    tempProducts = tempProducts.filter((product) => {
      return product.price<=price
    })
    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping===true
      })
    }
    // if this condition is not met, we will return all the products
  return {...state, filtered_products:tempProducts}
    //
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        // we are setting max_ price back to state. filters. max price because when we click 
        // on the clear items, we are authomatically setting  the price back to the max_price
        shipping: false,
        // we are  leaving min and max price because
        //thats what you use to filter the range
      },
    };
  }
    
    return state;
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
