const { Product } = require('../../db/sequelize');
const { Op } = require ('sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.get('/api/products', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length <= 2) {
        const message = 'Merci d\'entrer un minimum de 3 caractères dans le champ de recherche.'
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
        const message = `Il y a ${count} produits qui contiennent ${name}.`
        res.json({ message, data: rows })
      })
    } else {
    Product.findAll()
      .then(products => {
        const message = 'Liste de produits récupérée !'
        res.json({ message, data: products })
      })
      .catch(error => {
        const message = 'Impossible de récupérer la liste des produits. Merci de réessayer ultérieurement.'
        res.status(500).json({ message, data: error })
      })
    }
  })
}
