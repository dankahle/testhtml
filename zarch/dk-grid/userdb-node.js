
var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate'),
	users = require('./tabledata.json')


var db = mongoose.createConnection('mongodb://localhost:27017/db')
db.on('error', function(err) {
	console.error(err);
})

var userSchema = mongoose.Schema({
	name: String,
	age: Number,
	sex: String,
	sport: String,
	bday: Date,
	created: Date
});
userSchema.plugin(mongoosePaginate);
var User = db.model('User', userSchema);

/*
 User.remove({}, function(err) {
 if(err) return console.error(err);

 User.create(users, function(err) {
 if(err)
 return console.error(err);
 })
 })
 */


module.exports = User;
