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
  findcards: async (ctx, next) => {
    try {
      const customerId = ctx.request.querystring;
      // const customer = await stripe.customers.retrieve(customerId);
      // const cardData = customer.sources.data;
      const pms = await stripe.paymentMethods.list({customer: customerId, type: 'card'});

      ctx.send(pms.data);
    } catch (error) {
      ctx.send(error);
    }
  },
  addcard: async (ctx, next) => {
    try {
      const { customer, source }  = ctx.request.body;
      const attached = await stripe.paymentMethods.attach(source, { customer })
      ctx.send(attached);
    } catch (error) {
      ctx.send(error) ;
    }
  }
};
