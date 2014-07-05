var url = Meteor.require('url');

app.manager.on('scriptsLoaded', function() {
	var host = 'http://www.subsonic.nl';
	var paths = 'agenda';
	var agendaScript = app.scripts['subsonic/agenda.js'];
	var eventScript = app.scripts['subsonic/event.js'];

	app.logger.info('[scrapers/subsonic]', 'Scraping ' + host + ' with script "subsonic/agenda.js"');

	Scraper(host, paths, agendaScript, function(err, result) {
		if(err) {
			app.logger.warn('[scrapers/subsonic]', err);
			return;
		}

		var paths = _.map(result, function(path) {
			return url.parse(path).path;
		});

		Scraper(host, paths, eventScript, function(err, result) {
			if(err) {
				app.logger.warn('[scrapers/subsonic]', err);
				app.logger.warn(err.stack);
				return;
			}

			console.log(_.pluck(result, 'title'));
		});
	});
});