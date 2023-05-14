const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PUBLISHABLE_KEY = "pk_test_51N7b3zSBUl2UWnJGmEONHtHyg43o2XFB4lDwDnZh0wIE82AbfmRDF5h4s1esvky7HdYQWEpkGiFEiF2oybil3dyL00roT4O9Re";
const SECRET_KEY = "sk_test_51N7b3zSBUl2UWnJGP5sgBIpeO8lJ57qd7S1BvFHuIaQu5pdoMONDO0yVwoYHhe6gkqGUbkqpU0Tjasajtgixk2t200kdfXpol6";
const stripe = require('stripe')(SECRET_KEY);
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.set('view engine','ejs');
const PORT = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.render('Home', {
        key: PUBLISHABLE_KEY
    })
})

app.post('/payment', (req,res) => {
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name: 'Kunal Purkayastha',
        address:{
            line1: '23 something',
            postal_code: '123765',
            city: 'Silchar',
            state: 'Assam',
            country: 'India'
        }
    })
    .then((customer) => {
        return stripe.paymentIntents.create({
            amount: 7000,
            description: 'Web Developemnt Product',
            currency: 'inr',
            customer: customer.id
        })
    })
    .then((charge) => {
        console.log(charge);
        res.send("Success")
    })
    .catch((err) => {
        res.send(err);
    })
})

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})