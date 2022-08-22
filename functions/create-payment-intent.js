
//domain/.netlify/functions/create-payment-intent

const dotenv = require('dotenv')
dotenv.config()
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
    // so if event.body is for post request not for a get request.
    // we will recieve our data that we have posted in out netlify function server then
    // we send it to stripe from our netlify server. from this server, we are going to connect
    // to stripe and get back our data.
    
    

    if (event.body) {
        const { cart, shipping, total_amount } = JSON.parse(event.body);
        console.log(cart);

        const calculateOrderAmount = () => {
            return shipping + total_amount;
        };
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                // stripe.paymentIntent is a method
                amount: calculateOrderAmount(),
                currency: 'usd'
                
            })
            return {
                statusCode: 200,
                body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
            }
            
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            }
            
        }

        return {
            statusCode: 200,
            body: JSON.stringify(cart),
        };
        
    } else {
        return {
            statusCode: 200,
            body: 'create-payment-intent'
        }
    }

}

// what this code means is that all our logic in this page is for 
// when we are performing a get post request. if event . body is true that means that 
// there is something in our cart , if its not, then we are performing a 
// get requeest and what we are going to see in our browser is create-payment-intent
