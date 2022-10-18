const { Product } = require('../../db/sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.get('/api/products/:id', auth, (req, res) => {
    Product.findByPk(req.params.id)
      .then(product => {
        if(product === null) {
          const message = `Le produit avec l'identifiant ${req.params.id} n'existe pas. Essayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        const message = `Le produit avec l'identifiant ${req.params.id} a été trouvé.`
        res.json({ message, data: product })
      })
      .catch(error => {
        const message = `Le produit avec l'identifiant ${req.params.id} n'a pas pu être trouvé. Merci de réessayer ultérieurement.`
        res.status(500).json({ message, data: error })
      })
  })
}
