var express           = require('express');
var path              = require('path');
var favicon           = require('serve-favicon');
var logger            = require('morgan');
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser');
var expressValidator  = require('express-validator');
var compression       = require('compression');
//security aids
var helmet            = require('helmet');
var contentLength     = require('express-content-length-validator');
//HPP 
var hpp               = require('hpp');
var cors              = require('cors');
//config
var config            = require('./config');

var obj = {
  title:'Denuncias',
  url: config[process.env.ENVIRONMENT].url
};
  
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//validate forms
app.use(expressValidator());
//support for gzip
app.use(compression());

//XSS VULNERABILITY
app.use(helmet.xssFilter());
//FRAMING CONFIG
//app.use(helmet.frameguard());  // Same-origin by default.
//Don't allow anyone to put me in a frame.
app.use(helmet.frameguard('deny'));

//PERMITIR FRAMING DE CIERTOS PARTNERS
//app.use(helmet.frameguard('allow-from', 'http://example.com'));
//HSTS = NUESTRO SITIO FORZADO A SER BUSCADO EN HTTPS-SSL
var noventaDias = 60*24*60*60*1000;
app.use(helmet.hsts({ maxAge: noventaDias, includeSubdomains: true, force: config[process.env.ENVIRONMENT].forceSSL }));

//DESPISTAJE POR TECHNOLOGY
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.disable('x-powered-by');

//Bloquear el uso de nuestro codigo desde su propio ambiente (IE)
app.use(helmet.ieNoOpen());

//NO PERMITIR INFERENCIA DE MIME TYPE
app.use(helmet.noSniff());

//NO CACHE
app.use(helmet.noCache({ noEtag: true }));

//HKPK CERTIFICATE PINNING (WARNING HERE, hagamos esto con cuidado)
if (process.env.ENVIRONMENT == 'localhost' ) {
  //nothing, no need of cert pinning
}else{
    var pinEnforcementTime = 90*24*60*60*1000;
    app.use(helmet.publicKeyPins({
    maxAge: pinEnforcementTime,
    sha256s: [ config[process.env.ENVIRONMENT].pin.primary, config[process.env.ENVIRONMENT].pin.backup ],
    includeSubdomains: false,         // optional
    reportUri: '/wtf'  // optional
  }));
}

//MAX CONTENT LENGTH
app.use(contentLength.validateMax({max: config[process.env.ENVIRONMENT].MCLA, status: 400, message: "B==============D"}));

//HPP (HTTP Parameter pollution)
app.use(hpp());
/*
//CORS PROTECTION
var whitelist = ['https://easytaxi.com', 'https://operacional.easytaxi.com.br']; //testing hardcoded values :(
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

app.use(cors(corsOptions));*/

var flash = require('connect-flash');
app.use(flash());


//routes
var index = require('./routes/index')(obj);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// error handlers
/*
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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
*/

module.exports = app;
