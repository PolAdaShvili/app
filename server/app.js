const express = require( 'express');
const CONST = require('./constans');
const { PORT } = CONST;


const app = express();

app.get('/', (req, res) => {
  console.log('Hello world')
});

app.listen(PORT, () => {
  console.log(`listening on port ${ PORT }`);
});
