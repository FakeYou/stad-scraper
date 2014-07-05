var result = {};

result.url = url;

result.title = $('.event-title h1').text().trim();
result.description = $('.event-column-text').text().trim();

var date = $('.event-column-info strong:nth-of-type(1)').text().trim();
var times = $('.event-column-info strong:nth-of-type(2)').text().split(' - ');
var price = $('.event-column-info strong:nth-of-type(3)').text().replace('€', '').trim();

// result.date = moment(date, 'D.MM.YY').toDate();
// result.open = moment(times[0], 'HH:mm').toDate();
// result.close = moment(times[1], 'HH:mm').toDate();
result.price = price;