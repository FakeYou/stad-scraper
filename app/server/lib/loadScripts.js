var fs = Meteor.require('fs');
var execFile = Meteor.require('child_process').execFile;

var arguments = [
	app.settings.dirs.scripts,
	'-name',
	'*.js'
];

execFile('find', arguments, function(err, stdout, stderr) {
	var paths = stdout.trim().split('\n');
	var loadedFiles = 0;

	for(var i = 0; i < paths.length; i++) {
		(function() {
			var path = paths[i];

			var name = path.replace(app.settings.dirs.scripts, '').substr(1);

			app.logger.info('[loadScripts.js]', 'Loading file: ' + path);

			fs.readFile(path, function(err, file) {
				if(err) {
					app.logger.error(err);
				}
				else {
					app.logger.info('[loadScripts.js]', 'Loaded file: ' + path);
				}

				app.scripts[name] = file;

				loadedFiles += 1;

				if(loadedFiles == paths.length) {
					app.logger.info('[loadScripts.js]', 'Loaded ' + loadedFiles + ' scripts');
					app.manager.emit('scriptsLoaded');
				}
			});
		})();
	}
});