require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const db_init = require('./api/config/db');
const { isActiveRoute } = require('./api/helpers/routeHelpers');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
db_init();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL
  }),
}));

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute;


app.use('/', require('./api/routes/main'));
app.use('/', require('./api/routes/admin'));

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
});

