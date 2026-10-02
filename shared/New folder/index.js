require('dotenv').config();
const express = require('express');
const path = require('path');

// 1. Import your new router
const indexRouter = require('./routes/indexRouter'); 

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Tell Express to use your router for all base URLs
app.use('/', indexRouter);

// 3. Handle 404 errors (Catch-all for anything the router didn't find)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server is running! Open your host browser to http://localhost:8080`);
});