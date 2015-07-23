var keys = require('./keys');
var tu = require('tuiter')(keys);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/huyarl');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Last = new Schema({
	last: Number
});

var last_value;

var task = function () {
	if (!last_value) {
		Last.findOne({}, function (err, res) {
			if (err || !res) {
				last_value = new Last({'last': 0});
			} else {
				last_value = res;
			}

			tu.filter({track: [', Карл', ',Карл']}, function(stream) {
				stream.on('tweet', function (data) {
					console.log(data);
				})
			})
		});
	}
}