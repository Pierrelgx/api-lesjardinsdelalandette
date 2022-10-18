const { Product } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require ('sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.post('/api/products', auth, (req, res) => {
    Product.create(req.body)
      .then(product => {
        const message = `Product ${req.body.name} successfully created.`
        res.json({ message, data: product })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `Product couldn't be created due to server error. Try again later.`
        res.status(500).json({ message, data: error })
      })
  })
}
