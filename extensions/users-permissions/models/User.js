const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  beforeCreate: async (model, attrs, options) => {
    try {
      const cart = await axios.post(`${process.env.API_BASE_URL}/carts`)

      const customer = await stripe.customers.create({
        email: model.get('email'),
      });
      
      model.set('cart_id', cart.data.id);
      model.set('customer_id', customer.id)
 
    } catch (error) {
      console.log("ERROR: creating cart for user failed");
    }
  },
  afterCreate: async (model, attrs, options) => {
    // Cart.forge({name: 'Cart Name', user: attrs[0]}).save()
  }
};