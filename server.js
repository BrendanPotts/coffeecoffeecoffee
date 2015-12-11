// All of our requirements to make the app work
var config          = require('./etc/config');
var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var session         = require('cookie-session');
var cookieParser    = require('cookie-parser');
var compression     = require('compression');
var morgan          = require('morgan');
var mustache        = require('mustache');
var mustacheExpress = require('mustache-express');
var app             = express();
var cms             = require('./routes/cms');

// Enable or disable logging of http requests.
app.use(morgan('combined', {
    skip: function (req, res) { return config.server.disable_log; }
}));

// Register '.html' extension with The Mustache Express
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Serve static content
app.use(express.static(path.join(__dirname, 'public')));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Handle session cookies
app.use(session({ secret: config.cookies.secret, cookie: { maxAge: 60000 }}));
app.use(cookieParser( config.cookies.secret ));

// Compress responses greater than 512 Bytes
app.use(compression({
    threshold: 512
}));

// Our request routers.
//
app.use('/cms', cms);


// Setup our error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


// Do we show stack traces on the console?
function logErrors(err, req, res, next) {
    if(!config.server.disable_log){
        console.error(err.stack);
    }
    next(err);
}

// If this is an AJAX request, send an error message in JSON format.
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: err.message });
    } else {
        next(err);
    }
}

// If we get this far, it's a website error so the user needs an error page.
function errorHandler(err, req, res, next) {
    res.status(500);
    if(!config.server.disable_log){
        console.log(err);
    }
    var info = { message: "Error", stack: "", layout: false };
    if (err instanceof Error) {
        info.message = err.message;
        if(config.server.devmode){
            info.stack = err.stack && err.stack.split('\n').join('<br/>');
        }
    }
    res.render('error.html', info);
}

// Handle 404 pages and 404 AJAX requests.
app.use(function(req, res, next){
    res.status(404);

    // respond with 404 page if we can't find something.
    if (req.accepts('html')) {
    res.render('404.html', { url: req.url });
        return;
    }

    // respond with json if this is an ajax request
    if (req.accepts('json')) {
    res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text if we can't figure out
    // what the client accepts.
    res.type('txt').send('Not found');
});


// Set the port number we are going to use.
app.set('port', (process.env.PORT || config.server.port || 5000));

// Finally, set up a server instance to accept requests.
var server = app.listen(app.get('port'), function() {
    console.log( '---\n');
    console.log( config.server.version_str + ' listening on port ' + server.address().port);
    if(config.server.devmode){
        console.log( 'Running in Development mode.\n');
        console.log( '---');
    }
});
