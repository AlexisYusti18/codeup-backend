require('dotenv').config()
require('./src/services/database')
const express = require('express');
const Router = require('./src/routes/routes')
const cors = require('cors')

const PORT = 4000 || PORT
const app = express();

app.use(express.json());
app.use(cors())
app.use('/api', Router)

app.get('/', (req, res) => {
  res.send('server create');
});

app.listen(PORT, () => {
  console.log(`SERVER READY ON PORT` + ' ' + PORT);
});
