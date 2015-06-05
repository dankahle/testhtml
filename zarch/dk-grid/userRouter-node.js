var express = require('express'),
	repo = require('./userRepoMongoose')

router = express.Router();
module.exports = router;

function pullOutErrMsg(err) {
	if(err.errors) {
		var message = '';
		for(prop in err.errors)
			message += err.errors[prop].message + '\n';
		err.message = message;
	}
}

function handleError(err) {
	pullOutErrMsg(err);
	console.error('pullout: ', err);
	throw err;
}

/////////// /user

router.get('/', function(req, res){
	repo.getUsers( req.query.sort, function(err, users) {
		if(err) return handleError(err);
		res.send(users);
	})
})

router.get('/page', function(req, res){
	repo.getUsersPage(req.query.pageno, req.query.pagesize, req.query.sort, function(err, resp) {
		if(err) return handleError(err);
		res.send(resp);
	})
})

router.get('/:id', function(req, res){
	repo.getOneUser(req.params.id, function(err, user) {
		if(err) return handleError(err);
		if(err) return console.error(err);
		res.send(user);
	})
})

router.post('/', function(req, res) {
	repo.add(req.body, function(err, user) {
		if(err) return handleError(err);
		res.send(user);
	})
})

router.put('/:id', function(req, res) {
	repo.update(req.body, function(err, user) {
		if(err) return handleError(err);
		res.send(user);
	})
})

router.delete('/:id', function(req, res){
	repo.remove(req.params.id, function(err, result) {
		if(err) return handleError(err);
		res.send(result);
	})
})
