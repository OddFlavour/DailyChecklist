const express = require('express');

const app = express();

// Routes
app.use('/api/events', require('./api/events'));

app.listen(3000, () => console.log("Server has started"));
