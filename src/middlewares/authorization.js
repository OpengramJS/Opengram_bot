/**
 * @param {OpengramContext} ctx Context
 * @param {Function} next Next middleware
 */
async function authorization (ctx, next) {
  ctx.state.user = await ctx.model.User.findOneAndUpdate({ userId: ctx.from.id }, {
    userId: ctx.from.id,
    user: {
      name: ctx.from.username,
      nameLower: ctx.from.username?.toLowerCase(),
      first: ctx.from.first_name,
      last: ctx.from.last_name
    }
  }, {
    upsert: true,
    new: true
  })
  await next()
}

module.exports = { authorization }
