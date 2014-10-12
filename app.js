var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function(){
    log.info('Express server listening on port');
    //console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(req, res, next) {
    if (req.url !== '/') {
        next();
        return;
    }

    console.log('1');
    res.end('home');
});

app.use(function(req, res, next) {
    if (req.url !== '/error') {
        next();
        return;
    }

    next(new Error('Error 2'));
});

app.use(function(req, res, next) {
    if (req.url !== '/test') {
        next();
        return;
    }

    console.log('2');
    res.end('test');
});

app.use(function(req, res) {
    res.send(404, 'Not found');
});

app.use(function(err, req, res, next) {
    if (app.get('env') == 'development') {
        var errorHendler = express.errorHandler();
        errorHendler(err, req, res, next);
    } else {
        res.send('500', 'Error');
    }
});

//app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(express.session({ secret: 'your secret here' }));
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
//
//// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}
//
//app.get('/', routes.index);
//app.get('/users', user.list);
