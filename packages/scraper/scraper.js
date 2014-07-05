var util = Meteor.require('util');
var exec = Meteor.require('child_process').exec;
var util = Meteor.require('util');
var fs = Meteor.require('fs');
var url = Meteor.require('url');
var wscraper = Npm.require('wscraper');

Scraper = function(host, paths, script, callback) {

	var agent = wscraper.createAgent();

	var host = url.parse(host).host;
	var paths = (paths instanceof String) ? paths.split(',') : paths;
	var script = script;

	var output = [];

	agent.on('done', function(url, result) {
		output = _.union(output, result);

		agent.next();
	});

	agent.on('stop', function(n) {
		callback(undefined, output);
	});

	agent.on('abort', function(e) {
		callback(e);
	});

	agent.start(host, paths, script);
}