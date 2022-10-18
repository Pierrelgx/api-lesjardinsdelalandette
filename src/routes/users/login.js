const { User } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const privateKey = require ('../../auth/private_key');

module.exports = (app) => {
  app.post('/api/login', (req, res) => {

    User.findOne({ where: { email: req.body.email } }).then(user => {

      if(!user) {
        const message = 'Aucun compte n\'est associé à cet email.'
        return res.status(404).json({ message })
      }

      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {

        if(!isPasswordValid) {
          const message = 'Mot de passe invalide.'
          return res.status(401).json({ message })
        }

        const token = jwt.sign(
          { userId: user.id },
          privateKey,
          { expiresIn: '24h' }
          )

        const message = `Utililsateur ${req.body.email} connecté avec succès.`;
        return res.json({ message, data: user, token })
      })
    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être connecté. Merci de réessayer ultértieurement.'
      return res.json({ message, data: error })
    })
  })
}
