'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

module.exports = {
  create: async (ctx, next) => {
    try {
      const { amount, products, source, customer } = ctx.request.body;
      const { email } = ctx.state.user;
      const idempotencyKey = uuidv4();
      const charge = await stripe.paymentIntents.create({
        amount: parseFloat(amount) * 100, // convert to cents
        currency: 'usd',
        payment_method: source,
        payment_method_types: ['card'],
        confirm: true, // attempts to confirm intent immediately
        customer: customer,
        description: 'User account name eventually',
        receipt_email: email
      }, {
        idempotencyKey: idempotencyKey
      });

      strapi.services.order.create({
        amount,
        products: JSON.parse(products),
        user: ctx.state.user
      });
      ctx.send(charge);
    } catch (error) {
      ctx.send(error);
    }
  }
};
