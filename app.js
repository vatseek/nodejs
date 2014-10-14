var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);
var engine = require('ejs-locals');

var app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function(){
    log.info('Express server listening on port');
    //console.log('Express server listening on port ' + app.get('port'));
});

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(express.favicon());
if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(express.json());
app.use(express.urlencoded());
//app.use(express.session({ secret: 'your secret here' }));
app.use(app.router);

app.get('/', function(req, res, next){
    res.render('index', {title: 'Hello worlds'});
});

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next) {
    if (app.get('env') == 'development') {
        var errorHendler = express.errorHandler();
        errorHendler(err, req, res, next);
    } else {
        res.send('500', 'Error');
    }
});