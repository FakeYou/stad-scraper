Package.describe({
  summary: 'Package for scraping websites with wscraper and cheerio'
});

Npm.depends({ 
	'wscraper': 'https://github.com/FakeYou/wscraper/tarball/46d09aee2adccf557a85f9eb6b9e395ffa65b663'
});

Package.on_use(function (api, where) {
  api.use('underscore', 'server');

  api.add_files('scraper.js', 'server');

  api.export('Scraper', 'server');
});

Package.on_test(function (api) {
  api.use('scraper');

  api.add_files('scraper_tests.js', ['client', 'server']);
});
