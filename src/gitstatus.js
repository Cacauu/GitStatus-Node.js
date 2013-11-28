// Code used in GitStatus to communicate with the GitHub API

var request = require('request');

exports.issues = function(user, repo, limit, token, callback) {
	var url = 'https://api.github.com/repos/'+user+'/'+repo+'/issues?access_token='+token;
	console.log('URL: '+url);
	request({
		uri: url,
		headers: {
			'User-Agent': 'GitStatus'
		}
	}, 
	function (error, response, body) {
		if (!error && response.statusCode <= 201) {
			callback(JSON.parse(body));
		}
		else {
			console.log('Status Code: '+response.statusCode);
			console.log(body);
			callback();
		}
	});
}

exports.commits = function(user, repo, limit, token, callback) {
	var url = 'https://api.github.com/repos/'+user+'/'+repo+'/commits?access_token='+token;
	request({
		uri: url,
		headers: {
			'User-Agent': 'GitStatus'
		}
	}, 
	function (error, response, body) {
		if (!error && response.statusCode <= 201) {
			callback(JSON.parse(body));
		}
		else {
			console.log('Status Code: '+response.statusCode);
			console.log(body);
			callback();
		}
	});
}

exports.collaborators = function(user, repo, limit, token, callback) {
	var url = 'https://api.github.com/repos/'+user+'/'+repo+'/collaborators?access_token='+token;
	request({
		uri: url,
		headers: {
			'User-Agent': 'GitStatus'
		}
	}, 
	function (error, response, body) {
		if (!error && response.statusCode <= 201) {
			callback(JSON.parse(body));
		}
		else {
			console.log('Status Code: '+response.statusCode);
			console.log(body);
			callback();
		}
	});
}

exports.releases = function(user, repo, limit, token, callback) {
	var url = 'https://api.github.com/repos/'+user+'/'+repo+'/releases?access_token='+token;
	console.log(url);
	request({
		uri: url,
		headers: {
			'User-Agent': 'GitStatus'
		}
	}, 
	function (error, response, body) {
		if (!error && response.statusCode <= 201) {
			callback(JSON.parse(body));
		}
		else {
			console.log('Status Code: '+response.statusCode);
			console.log(body);
			callback();
		}
	});
}