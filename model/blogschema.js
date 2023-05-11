const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    titel: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    filepath: {
        type: String,
        required: true,
    }
});



module.exports = mongoose.model('Blogyyyyyyyy', BlogSchema);