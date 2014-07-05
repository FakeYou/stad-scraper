var optimist = require('optimist');
var wscraper = require('wscraper');
var util = require('util');
var fs = require('fs');
var url = require('url');
var _ = require('underscore');

var argv = optimist
	.describe('h', 'Host to visit')
	.alias('h', 'host')
	.demand('h')
	.describe('s', 'Script to run')
	.alias('s', 'script')
	.demand('s')
	.describe('p', 'Path(s) to visit')
	.alias('p', 'path')
	.alias('p', 'paths')
	.argv;

try {
	var script = fs.readFileSync(argv.script);
}
catch(e) {
	throw new Error('Script not found..');
	process.exit();
}

var agent = wscraper.createAgent();

var host = url.parse(argv.host).host;
var paths = (argv.paths || '').split(',');
var script = script;

var output = [];

agent.on('done', function(url, result) {
	output = _.union(output, result);

	agent.next();
});

agent.on('stop', function(n) {
	process.stdout.write(JSON.stringify(output));
});

agent.on('abort', function(e) {
	throw e;
	process.exit();
});

agent.start(host, paths, script);