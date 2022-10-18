const { Sequelize, DataTypes } = require('sequelize');
const ProductModel = require('../models/product');
const UserModel = require('../models/user');
const products = require('./mock-product');
const bcrypt = require('bcrypt');

let sequelize

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('databasename', 'email', 'password', {
    host: 'host',
    dialect: 'postgres',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize('jardins', 'me', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
}

const Product = ProductModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync().then(_ => {
    products.map(product => {
      Product.create({
        name: product.name,
        price: product.price,
        picture: product.picture,
        types: product.types
      }).then(product => console.log(product.toJSON()))
    })

    bcrypt.hash('123456', 10)
    .then(hash => {
      User.create({
        email: 'lolo@home.com',
        password: hash
      }).then(user => console.log(user.toJSON()))
    })

    console.log('Database successfully initialized !')
  })
}

module.exports = {
  initDb, Product, User
}
