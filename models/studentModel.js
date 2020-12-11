const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 60,
        minLength: 3,
    },
    studentID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 60,
      minLength: 3,
    },
    semester: {
      type: Number,
      min: 1,
      max: 15,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 60,
        minLength: 3,
    }
});

StudentSchema.plugin(passportLocalMongoose);
// StudentSchema.plugin(uniqueValidator, { message: 'a User with {PATH} {VALUE} already exists.' });

module.exports = mongoose.model('StudentModel', StudentSchema);