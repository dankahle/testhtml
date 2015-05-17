
funciton getuser() {
	return http.get(...).then(function(resp) {
		cachevar = resp.data;
		if(resp.data == 'shit')
			$.reject('som reason')
	}


}

	////////controller

repo.getUser().then(function(val) {
		$scope.users = val;
	}, function(err) {
	console.error(err)
})