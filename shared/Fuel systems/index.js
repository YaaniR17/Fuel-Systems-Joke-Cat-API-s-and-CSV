require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 1. Import CORS
const path = require('path');

const indexRouter = require('./routes/indexRouter'); 

const app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 8080;

app.use('/', indexRouter);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server is running! Open your host browser to http://localhost:${PORT}`);
});