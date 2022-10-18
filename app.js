const express = require('express');
// const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require ('./src/db/sequelize');
const cors = require ('cors');

const app = express();
const port = process.env.PORT || 3000;

app
  // .use(favicon(`${__dirname}/favicon.ico`))
  .use(bodyParser.json())
  .use(cors())

sequelize.initDb()

require('./src/routes/users/login')(app)
require('./src/routes/users/signup')(app)

app.use(({res}) => {
  const message = 'Cette page n\'existe pas !.'
  res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre API NodeJS tourne sur http://localhost:${port}`));
