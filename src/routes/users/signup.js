const { User } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const { ValidationError, UniqueConstraintError } = require ('sequelize');

module.exports = (app) => {
  app.post('/api/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash
      })
      .then(user => {
        const message = `Utilisateur ${req.body.email} créé avec succès.`
        res.json({ message, data: user})
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `L'utilisateur n'a pas pu être créé à cause d'une erreur serveur. Merci de réessayer ultérieurement.`
        res.status(500).json({ message, data: error })
      })
    })
  })
}

