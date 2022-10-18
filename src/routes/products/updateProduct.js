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
          const message = `Le produit avec l'identifiant ${id} n'existe pas. Essayez avec un identifiant valide.`
          return res.status(404).json({ message })
        }
        const message = `Le produit ${product.name} a été mis à jour.`
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
      const message= `Le produit n'a pas pu être modifié. Merci de réessayer ultérieurement.`
      res.status(500).json({ message, data: error })
    })
  })
}
