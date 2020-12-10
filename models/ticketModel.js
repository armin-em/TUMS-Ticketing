const mongoose = require('mongoose');
const ReplyModel = require('./replyModel');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    from: {
        type: String,
        required: true
    }
})