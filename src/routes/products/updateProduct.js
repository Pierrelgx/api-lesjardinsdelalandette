const { Product } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require ('sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.put('/api/products/:id', auth, (req, res) => {
    const id = req.params.id
    Product.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Product.findByPk(id).then(product => {
        if(product === null) {
          const message = `Product with id ${id} doesn't exist. Please try with a valid id.`
          return res.status(404).json({ message })
        }
        const message = `Product ${product.name} successfully updated.`
        res.json({message, data: product })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
      }
      const message= `Product couldn't be updated. Please try again in a moment.`
      res.status(500).json({ message, data: error })
    })
  })
}
