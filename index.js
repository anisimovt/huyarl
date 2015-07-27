var keys = require('./keys');
var tu = require('tuiter')(keys);

tu.filter({track: ['Карл', 'Карл!']}, function(stream) {
	stream.on('tweet', function (data) {
		if (!data.retweeted_status && (data.text.search(/\,( )?Карл/i) != -1)) {
			tu.update({
				status: '@' + data.user.screen_name + ' Хуярл!',
				in_reply_to_status_id: data.id_str
			}, function (err, tweet) {
				if (err)
					console.log('Err', err);
			});
			console.log('ID: ' + data.id_str + ',  Created: ' + data.created_at + ', Text: "' + data.text + '"\n');
		}
	});
});