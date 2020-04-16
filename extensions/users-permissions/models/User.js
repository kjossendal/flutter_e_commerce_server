const axios = require('axios');

module.exports = {
  beforeCreate: async (model, attrs, options) => {
    const cart = axios.post(`${process.env.API_BASE_URL}/carts`)
    console.log("CART", cart);
    model.set('cartId', cart.data.id);
  },
  afterCreate: async (model, attrs, options) => {
    // Cart.forge({name: 'Cart Name', user: attrs[0]}).save()
  }
};