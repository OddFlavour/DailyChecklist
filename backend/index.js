const express = require('express');

const app = express();

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Routes
app.use('/api/events', require('./api/events'));

app.listen(3000, () => console.log("Server has started"));
