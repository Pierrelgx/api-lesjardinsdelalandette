const { Product } = require('../../db/sequelize');
const { Op } = require ('sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.get('/api/products', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length <= 2) {
        const message = 'Please enter at least 3 characters in search field.'
        return res.status(400).json({ message })
      }

      return Product.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        limit: limit,
        order: ['name']
        // order: [['name', 'DESC']]
      })
      .then(({count, rows}) => {
        const message = `There are ${count} that contain ${name}.`
        res.json({ message, data: rows })
      })
    } else {
    Product.findAll()
      .then(products => {
        const message = 'Products list fetched !'
        res.json({ message, data: products })
      })
      .catch(error => {
        const message = 'Cannot fetch Products list. Please try again in a moment.'
        res.status(500).json({ message, data: error })
      })
    }
  })
}
