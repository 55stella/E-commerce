import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  Elements,
  useElements
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import { useNavigate} from 'react-router-dom';





const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckOutForm = () => {
  // STRIPE STUFF
  const { cart, total_amount, shipping, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [clientSecrete, setClientSecrete] = useState("");
  const stripe = useStripe();
  const elements = useElements();
console.log(myUser)
  const cardStyle = {

    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };



  const createPaymentIntent = async() => {
    
    try {
     // in order to perform a post request to the server, you need two things. 
      // the url and the data
      // posting to the netlify server
      const response = await axios.post('/.netlify/functions/create-payment-intent',
        JSON.stringify({cart, shipping, total_amount})
      )
      const {data} =  response
      setClientSecrete(data.clientSecret)
      console.log(data.clientSecret)
    } catch (error) {
      console.log(error.response)
      
    }
    // the property of error in axios is response


  }


  useEffect(() => {
    createPaymentIntent()
    
  }, [])

  // setup by stripe
  const handleChange = async(event) => {
    setDisabled(event.empty)
    
    setError(event.error ? event.error.message : '')
    // when there is an error , it authomatically displays the error.
    
    
  }
  // set up by strip

  const handleSubmit = async (event) => {
    setProcessing(true);
    // initially processing was not true but the moment we submit the 
    // form, we set it back to true
    event.preventDefault()
    const payload = await stripe.confirmCardPayment(clientSecrete, {
      payment_method: {
        card:elements.getElement(CardElement)
      }
    })
    // if there is error, i display the error message
    if (payload.error) {
      setError(`payment failed ${payload.error.message}`)
      setProcessing(false)
    }
    // if payment is  successful, i want to clear the cart then navigate back to 
    // the homepage
    else {
      setError(false)
      setProcessing(false)
      setSucceeded(true)
      
      setTimeout(() => {
        clearCart();
        
        navigate('/')

      }, 1000000)

    }


  }

  return (
    <div>
      {succeeded ? (
        <article>
          <h4> thank you</h4>
          <h4> your payment was successful</h4>
          <h4>Redirectiong to homepage</h4>
        </article>
      ) : (
        <h4> hello, {myUser && myUser.name} </h4>
      )}
      <p> your total is {formatPrice(shipping + total_amount)}</p>
      <p> test card :4242 4242 4242 4242</p>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          option={cardStyle}
          onChange={handleChange}
        />
        {/*  this button will be disabled when any of the values are true.  */}
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? <div id="spinner" className="spinner"></div> : "PAY"}
          </span>
        </button>
        {/*  shows error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/*  show a success message upon completion */}
        {succeeded && (
          <p>
            payment succeded , see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              stripe dashboard
            </a>
          </p>
        )}
      </form>
    </div>
  );
  //  not that all the ids and classnames is the same way stripe wants you to set it up

}



const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe ={promise}>
        <CheckOutForm />
      </Elements>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }

  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }

  #payment-element {
    margin-bottom: 24px;
  }

  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
`;


export default StripeCheckout