const { Product } = require('../../db/sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.get('/api/products/:id', auth, (req, res) => {
    Product.findByPk(req.params.id)
      .then(product => {
        if(product === null) {
          const message = `Product with id ${req.params.id} doesn't exist. Please try again with another id.`
          return res.status(404).json({ message })
        }
        const message = `Product with id ${req.params.id} was found.`
        res.json({ message, data: product })
      })
      .catch(error => {
        const message = `Product with id ${req.params.id} couldn't be found. Please try again in a moment.`
        res.status(500).json({ message, data: error })
      })
  })
}
