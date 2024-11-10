const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.get('/cart-total', (req, res) => {
  console.log(req.query);

  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);

  if (isNaN(newItemPrice) || isNaN(cartTotal)) {
    return res.status(400).json({
      error:
        'Invalid input: Please provide valid numbers for newItemPrice and cartTotal.',
    });
  }

  const result = cartTotal + newItemPrice;

  res.status(200).send(result.toString());
});

app.get('/membership-discount', (req, res) => {
  const { cartTotal, isMember } = req.query;
  const parsedCartTotal = parseFloat(cartTotal);
  const result = isMember
    ? parsedCartTotal - (parsedCartTotal * 10) / 100
    : cartTotal;

  res.status(200).send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  const { cartTotal } = req.query;
  const parsedCartTotal = parseFloat(cartTotal);
  const result = (parsedCartTotal * 5) / 100;
  res.send(result.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const { shippingMethod, distance } = req.query;
  const parsedShippingMethod = parseFloat(distance);
  let Standard = 50;
  let expressDel = 100;
  res
    .status(200)
    .send(
      shippingMethod === 'express'
        ? (parsedShippingMethod / 100).toString()
        : (parsedShippingMethod / 50).toString()
    );
});

app.get('/shipping-cost', (req, res) => {
  const { weight, distance } = req.query;
  res
    .status(200)
    .send((parseFloat(weight) * parseFloat(distance) * 0.1).toString());
});

app.get('/loyalty-points', (req, res) => {
  // let purchaseAmount=0;
  const { purchaseAmount } = req.query;
  const parsedpurchaseAmount = parseFloat(purchaseAmount);
  res.status(200).send((parsedpurchaseAmount * 2).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
