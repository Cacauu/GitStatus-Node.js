
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var gitstatus = require(__dirname+'/src/gitstatus.js');
var request = require('request');

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
		title: 'GitStatus'
	});
});
app.post('/create_widget', function(req, res){
	var w_url = 'http://'+req.headers.host+'/'+req.body.user+'/'+req.body.repo+'/issues?token='+req.body.token;
	console.log(w_url);
	res.render('create', {
		title: 'New Widget',
		type: req.body.type,
		user: req.body.user,
		repo: req.body.repo,
		token: req.body.token,
		widget_url: w_url
	});
});

app.get('/:user/:repo/issues', function(req, res) {
	var user = req.param('user');
	var repo = req.param('repo');
	var limit = req.param('limit');
	var token = req.param('token');
	gitstatus.issues(user, repo, 10, token, function(issues){
		if (issues) {
			res.render('issues', {
				title: 'Issues',
				issues: issues
			});
		}
		else {
			res.send('ERROR!');
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
