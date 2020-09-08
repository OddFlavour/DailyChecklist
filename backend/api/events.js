const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost/dailyChecklistDB'
    , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}  // These options are used to prevent warning messages
);

// Models
const Event = require('../models/Event');

const constants = require('../constants/Constants');
const helper = require('../constants/HelperFunction');

// DB lifecycle hooks
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Database has connected');
});

// Endpoint parsers
router.use(bodyParser.json());

// Endpoints
router.post('/', async (req, res) => {
    const userId = req.get('user-id');

    // Sanity check over request
    if (!userId) {
        res.status(400).send('Bad request: missing "user-id" in headers');
        return;
    }

    // Processing and saving to database
    const entry = new Event(req.body);

    entry.userId = userId;
    entry.isActive = true;
    entry.dates = [];

    // Add the missing dates between start date and today's date
    const currParsed = helper.toDateParts(req.body.date);

    const today = new Date();
    const curr = new Date(currParsed.year, currParsed.month - 1, currParsed.day);

    while (curr < today) {
        entry.dates.push({
            date: helper.toDate(curr),
            isComplete: false
        });

        curr.setDate(curr.getDate() + 1);
    }

    let err;
    await entry.save().catch(reason => err = reason);

    if (err) {
        res.status(400).send(err.message);
    } else {
        res.json(entry);
    }
});

router.post('/:eventId', async (req, res) => {
    const eventId = req.params['eventId'];
    const userId = req.get('user-id');
    const date = req.body.date;
    const isComplete = req.body.isComplete;

    if (!userId) {
        res.status(400).send('Bad request: missing "user-id" in headers');
        return;
    }

    if (!helper.validateDate(date)) {
        res.status(400).send('Bad request: invalid "date" format');
        return;
    }

    const filter = {_id: eventId, userId: userId, 'dates.date': date};
    const update = {$set:{'dates.$.isComplete': isComplete}};

    const opts = {runValidators: true};

    let err;
    await Event.updateOne(filter, update, opts, (e) => {
        if (e) {
            err = e;
        }
    });

    if (err) {
        res.status(400).send(err.message);
    } else {
        res.end();
    }
});

module.exports = router;
