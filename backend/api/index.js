const cors = require('cors');
const health = require('../routes/health');
const express = require('express');
const app = express();
const sheetRouter = require('../routes/sheet');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/api',[health, sheetRouter]);

module.exports = app;
