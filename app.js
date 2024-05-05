const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const shoppingListRouter = require('./routes/listRoutes.js');
const shoppingListItemRouter = require('./routes/itemRoutes.js');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/shoppingLists', shoppingListRouter);
app.use('/items', shoppingListItemRouter);

module.exports = app;
