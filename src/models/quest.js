const mongoose = require('mongoose');

const QuestSchema = new moongose.Schema({
    name: {
        type: String,
        required: true,
    },
    questoes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    latitude: {
         type: Number,
        //  required: true
    },
    longitude: {
        type: Number,
        // required: true
    }
});

const Quest = mongoose.model('Quest', QuestSchema);


module.exports = Quest;