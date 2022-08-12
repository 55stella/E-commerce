import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const { id } = useParams()
  
  const history = useHistory()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product:product,
    fetchSingleProduct,
  } = useProductsContext();

  
  useEffect(() => {
  fetchSingleProduct(`${url}${id}`)
  }, [id])
  

  useEffect(() => {
    // console.log(error)
    if (error) {
      setTimeout(() => {
        history.push("/");
        // there is many ways of achieving the same thing, with 
        // auth0, usenavigate
      }, 400);
      
    }
    
  }, [error])
  
  if (loading) {
    return <Loading />
    
  }
  if (error) {
    return <Error/>
  }
  else {
    
  }
  const { name, price, description, stock, stars,
    reviews, id: sku, company, images } = product
  // console.log(images)
  // console.log(product)
  return <Wrapper>
    <PageHero title={name} product />
    <div className="section section-center page">
      <Link to='./products' className='btn'>
        back to products</Link>
      <div className="product-center">
        <ProductImages images={ images}/>
        <section className="content">
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews}/>
          <h5 className='price'>{formatPrice(price)}</h5>
          <p className='desc'>{description}</p>
          <p className="info">
            <span>Available:</span>
            {stock > 0 ? 'in stock' : 'out of stock'}
            {/*  here if i have some items to sell then i want to add them to the cart
            ,else i will do nothing */}
          </p>
          <p className="info">
            <span>SKU:</span>
            {sku}
          </p>
          <p className="info">
            <span>Brand:</span>
            {company}
          </p>
          <hr />
          {stock > 0 && <AddToCart product = {product} />}
          {/* { i want to add to cart is the stock is greater than 0} */}
        </section>
      </div>
    </div>

  </Wrapper>
}


const Wrapper = styled.main`
  .product-center {
    display: grid;
  //  grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)) ;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage
