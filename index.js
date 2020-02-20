let express = require('express')
    ,   app = express()
    ,   path = require('path')
    ,   cookieParser = require('cookie-parser')
    ,   bodyParser = require('body-parser')
    ,   mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/urls",
    { useNewUrlParser: true , useUnifiedTopology: true},
    error => {
        if (error) {
            console.log("DB Connection Error " + error);
        }
    }
);

app.use(require('cookie-parser')("secret"));
app.use(require('express-session')({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

// set up handlebars view engine
let handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup flash message
app.use(function(req, res, next){
// if there's a flash message, transfer
// it to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// All the routes goes in this file.
require('./routes/index')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'dev') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

let runningPortNumber = process.env.PORT || 3000;

app.listen(runningPortNumber, function () {
    console.log('Url Shortener app listening at port %s', runningPortNumber);
});

module.exports = app; // for testing
