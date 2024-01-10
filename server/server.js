const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}/`.yellow.bold);
});
