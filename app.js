
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var gitstatus = require(__dirname+'/src/gitstatus.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.render('index', {
		title: 'GitStat us'
	});
});
app.post('/create_widget', function(req, res){
	gitstatus.test('Input');
	res.render('create', {
		title: 'New Widget',
		type: req.body.type,
		user: req.body.user,
		repo: req.body.repo,
		token: req.body.token
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
