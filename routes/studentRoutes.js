const express = require('express');
const passport = require('passport');
const router = express.Router();
const StudentModel = require('../models/studentModel');
const catchAsync = require('../utils/catchAsync');
const studentController = require('../controllers/stdController');

router.route('/student/register')
    .get(studentController.renderStudentRegister)
    .post(catchAsync(studentController.validateRegister, studentController.studentRegister));

router.route('/student/login')
    .get(studentController.renderStudentLogin)


module.exports = router;