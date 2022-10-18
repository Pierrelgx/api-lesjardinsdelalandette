const { Product } = require('../../db/sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.delete('/api/products/:id', auth, (req, res) => {
    Product.findByPk(req.params.id).then(product => {
      if(product === null) {
          const message = `Le produit avec l'identifiant ${req.params.id} n'existe pas. Merci d'entrer un identifiant valide.`
          return res.status(404).json({ message })
        }
      const productDeleted = product;
      return Product.destroy({
        where: { id: product.id }
      })
      .then(_ => {
        const message = `Le produit avec l'identifiant ${productDeleted.id} a été supprimé.`
        res.json({message, data: productDeleted })
      })
    })
    .catch(error => {
      const message = `Le produit n'a pas pu être supprimé. Merci de réessayer ultérieurement.`
      res.status(500).json({ message, data: error})
    })
  })
}
