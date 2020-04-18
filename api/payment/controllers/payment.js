'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * A set of functions called "actions" for `payment`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
  findcard: async (ctx, next) => {
    try {
      const customerId = ctx.request.querystring;
      const customer = await stripe.customers.retrieve(customerId);
      const cardData = customer.sources.data;
      ctx.send(cardData);
    } catch (error) {
      ctx.send(error);
    }
  }
};
