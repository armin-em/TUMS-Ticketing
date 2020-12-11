const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const compression = require("compression");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const morgan = require('morgan');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');

const studentRoutes = require('./routes/studentRoutes');

const StudentModel = require('./models/studentModel');

const MongoStore = require('connect-mongo')(session);
const dbUrl = 'mongodb://localhost:27017/tums-ticketing';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan('dev'))
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//TODO: Need to Change secret to ENV
const secret = 'secretString';
const store = new MongoStore({
  url: dbUrl,
  secret: secret,
  touchAfter: 86400 // One Day in Secs
})
store.on('error', function (e){
  console.log('SESSION STORE ERROR', e)
})
const sessionConfig = {
  store: store,
  name: 'session',
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 604800000, // Week in milliseconds
    maxAge: 604800000 // Week in milliseconds
  }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(StudentModel.authenticate()));
passport.serializeUser(StudentModel.serializeUser());
passport.deserializeUser(StudentModel.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', studentRoutes);

app.get("/success", (req, res) => {
  res.send('success!')
});

app.get("/failed", (req, res) => {
  res.send('failed!')
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404));
})

app.use((err, req, res, next) => {
  const {statusCode = 500} = err
  if (!err.message) err.message = 'Oh no, something went wrong!'
  res.status(statusCode).render('error', {err});
})

const port = 8080;
app.listen(port, "localhost", () => {
  console.log("Server listening at port: " + port);
});
