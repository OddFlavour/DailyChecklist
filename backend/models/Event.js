const mongoose = require('mongoose');

const eventDateSchema = new mongoose.Schema(
    {
        date: {type: String, required: true},
        isComplete: {type: Boolean, required: true}
    },
    // No need for _id for the nested object
    {_id: false});

const eventSchema = new mongoose.Schema({
    userId: {type: Number, required: true},
    desc: {type: String, required: true, unique: true},
    isActive: {type: Boolean, required: true},
    dates: {type: [eventDateSchema], required: true}
});

// Not actually needed for exporting because 'require('mongoose')' is a shared instance among files
// https://stackoverflow.com/questions/38274979/how-to-use-a-mongoose-model-defined-in-a-separate-file-if-the-file-is-not-export
module.exports = mongoose.model('events', eventSchema);
