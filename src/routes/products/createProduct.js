const { Product } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require ('sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.post('/api/products', auth, (req, res) => {
    Product.create(req.body)
      .then(product => {
        const message = `Produit ${req.body.name} créé avec succès.`
        res.json({ message, data: product })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `Le produit n'a pas pu être créé à cause d'une erreur système. Merci de réessayer ultérieurement.`
        res.status(500).json({ message, data: error })
      })
  })
}
