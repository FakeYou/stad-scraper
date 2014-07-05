var result = [];

$('.agenda .entry a').each(function(i, link) {
	result.push($(link).attr('href'));
});