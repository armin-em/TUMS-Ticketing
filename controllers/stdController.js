const StudentModel = require('../models/studentModel.js');

module.exports.renderStudentRegister = (req, res) => {
    res.render('students/register');
}

module.exports.validateRegister = async (req, res, next) => {
    try {
        const {fullName, studentID, semester, email, password} = req.body;
        const lowerNameInReq = fullName.toLowerCase().trim();
        const studentNames = await StudentModel.find({}, {_id:0, fullName:1});
        for (let studentName of studentNames){
            if (studentName.fullName.toLowerCase().trim() === lowerNameInReq){
                console.log('++++++++++++++++')
                console.log('Found Student Name Duplicate!')
                console.log('++++++++++++++++')
                const errMsg = `An account with name "${studentName.fullName.trim()}" already exists.`;
                req.flash('error', errMsg);
                return res.redirect('/student/register');
                // return next(new Error('Dev Error: Duplicate Name!'));
            }
        }
        if (studentID.length < 9 || studentID.length > 12){
            const errMsg = `Invalid Student ID.`
            req.flash('error', errMsg);
            return res.redirect('/student/register');
            // return next(new Error('Dev Error: Invalid Student ID!'));
        }
        if (semester <= 0 || semester >= 14){
            const errMsg = `Invalid Semester.`
            req.flash('error', errMsg);
            return res.redirect('/student/register');
            // return next(new Error('Dev Error: Invalid Semester!'));
        }
        if (password.length <= 0 || password.length >= 20){
            const errMsg = `Invalid Password.`
            req.flash('error', errMsg);
            return res.redirect('/student/register');
            // return next(new Error('Dev Error: Invalid Password!'));
        }
        const lowerEmailInReq = email.toLowerCase().trim();
        const studentEmails = await StudentModel.find({}, {_id:0, email:1});
        for (let studentEmail of studentEmails){
            if (studentEmail.email.toLowerCase().trim() === lowerEmailInReq){
                console.log('++++++++++++++++')
                console.log('Found Student Email Duplicate!')
                const errMsg = `An account with Email "${studentEmail.email.trim()}" already exists.`;
                req.flash('error', errMsg);
                return res.redirect('/student/register');
                // return next(new Error('Dev Error: Duplicate Email!'));
            }
        }
    } catch (e) {
        console.log("+++Inside Validator Middleware catch+++")
        req.flash('error', e.message);
        res.redirect('/student/register');
    }
}

module.exports.studentRegister = async (req, res, next) => {
    try {
        const {fullName, studentID, semester, email, password} = req.body;
        const username = studentID;
        const student = new StudentModel({fullName, studentID, username, semester, email});
        console.log("student: " + student);
        const registeredStudent = await StudentModel.register(student, password);
        console.log('registeredStudent: ' + registeredStudent);
        console.log("before res.redirect success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        res.redirect('/success');
        // req.login(registeredUser, err => {
        //   if (err) {
        //     return next(err);
        //   }
        //   req.flash('success', 'Welcome to Yelp Camp!');
        //   res.redirect('/campgrounds');
        // })
    } catch (e) {
        console.log("+++Inside Register Middleware catch+++")
        req.flash('error', e.message);
        res.redirect('/student/register');
    }
}