const axios = require('axios');

module.exports = {
  beforeCreate: async (model, attrs, options) => {
    try {
      const cart = await axios.post(`${process.env.API_BASE_URL}/carts`)
      model.set('cart_id', cart.data.id);
    } catch (error) {
      console.log("ERROR: creating cart for user failed");
    }
  },
  afterCreate: async (model, attrs, options) => {
    // Cart.forge({name: 'Cart Name', user: attrs[0]}).save()
  }
};