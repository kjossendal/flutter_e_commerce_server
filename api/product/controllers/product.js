'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  search: async (ctx, next) => {
    try {
      const search = ctx.request.querystring;
      const r = await strapi
        .query('product')
        .search({ _q: search, _limit: 100, _sort: 'date:desc' });
      ctx.send(r);
    } catch (error) {
      ctx.send(error);
    }
  }
};
