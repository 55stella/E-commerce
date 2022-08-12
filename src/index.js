import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <ProductsProvider>
    <FilterProvider>
      <CartProvider>
        <App />
      </CartProvider>

      {/* {because we neeed to be getting informaton at some points from the filter 
      provider, we want to wrap our app inside the filter provider} */}
    </FilterProvider>
  </ProductsProvider>,
  document.getElementById("root")
);
