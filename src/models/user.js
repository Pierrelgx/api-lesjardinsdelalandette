module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Il y a déjà un compte associé à cette adresse email.' },
      validate: {
        isEmail: { msg: 'Entrez une adresse email valide.'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [6],
          msg: 'Le mot de passe doit comporter au moins 6 caractères.'
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
