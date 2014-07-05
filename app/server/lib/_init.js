var EventEmitter = Meteor.require('events').EventEmitter

if(_.isEmpty(Meteor.settings)) {
	console.error('No settings file specified!');
	process.exit();
}

app = {};

app.settings = Meteor.settings;
app.scripts = {};
app.manager = new EventEmitter(); 

app.logger = new (Winston.Logger)({
	transports: [
		new (Winston.transports.Console)({ colorize: true, timestamp: false }),
	]
});