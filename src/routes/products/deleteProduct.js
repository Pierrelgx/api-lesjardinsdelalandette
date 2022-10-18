const { Product } = require('../../db/sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.delete('/api/products/:id', auth, (req, res) => {
    Product.findByPk(req.params.id).then(product => {
      if(product === null) {
          const message = `Product with id ${req.params.id} doesn't exist. Please try with a valid id.`
          return res.status(404).json({ message })
        }
      const productDeleted = product;
      return Product.destroy({
        where: { id: product.id }
      })
      .then(_ => {
        const message = `Product with id ${productDeleted.id} successfully deleted.`
        res.json({message, data: productDeleted })
      })
    })
    .catch(error => {
      const message = `Product couldn't be deleted. Please try again in a moment.`
      res.status(500).json({ message, data: error})
    })
  })
}
