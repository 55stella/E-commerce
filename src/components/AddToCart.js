import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({product}) => {
  const{colors, id, stock} =product
  
  const [mainColor, setmainColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)
  const { AddtoCart } = useCartContext()

  const increase = () => {
    setAmount((oldamount) => {
      let tempAmount = oldamount + 1
      if (tempAmount > stock) {
        tempAmount = stock
        // this condition enables us to not put things less than what you need in 
        // in the cart.
      }
      return tempAmount
    })
    
  }
  const decrease = () => {
    setAmount((oldamount) => {
      let tempAmount = oldamount -1
      if (tempAmount < 1) {
        tempAmount = 1
      }
      return tempAmount
    })
    
  }
  
  
  return (
    <Wrapper>
      <div className="colors">
        <span> colors:</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                className={`${
                  mainColor === color ? "color-btn active " : "color-btn"
                  // maincolor ===color means if the color in the state is equal to
                  // the recent color after the update i.e after they has been a click event in
                  // the button
                  // then we adjust the class to color-btn then active else we choose color btn
                  // with a lesser opacity
                }`}
                style={{ background: color }}
                onClick={() => setmainColor(color)}
                // at first, we set color to the incex of zero.
                // if color is in the index off zero, then we add facheck to it, meaning
                // that color is in its initial state, but when we update the state value

                // thats when we click on it, the state value changes else
                // we add nothing
                //
                // then when there is an onclick activity,we set it back to
                // color
              >
                {mainColor === color ? <FaCheck /> : null}
                {/* {if the main color is equals the color 
                that was clicked then add facheck}else asd nothing */}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link to="/cart" className="btn" onClick={() => AddtoCart(id, mainColor,amount, product)}>
          Add to cart
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
