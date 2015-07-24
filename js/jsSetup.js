
(function (globals) {

	if (_.isEmpty(globals)) {
		//console.log('ajaxSetup init');
		window.globals = globals;
	}
	else {
		//console.log('duplicate ajaxSetup init');
		return;
	}

	globals.urlNode = 'http://localhost:3000/';

	window.log = function (a, b, c, d) {
		console.log(
			arguments.length > 0 ? a : '',
			arguments.length > 1 ? b : '',
			arguments.length > 2 ? c : '',
			arguments.length > 3 ? d : '');
	};

	globals.ajaxJson = {
		contentType: 'application/json',
		dataType: 'json'
	};

	globals.ajaxHeaders = {
		stuff: 'lala'
	};

	globals.getJson = function(url, options, data) {

		var settings = {
			url: url,
			data: data,
			dataType: "json",
			headers: {fromgetjson: 'two'}
		};
		if(options)
			_.merge(settings, options);
		var def = $.Deferred();
		$.ajax(settings)
			.then(function(data, status, xhr) {
				def.resolve(data, xhr.status, xhr);
			}, function(xhr, status, err) {
				def.reject(err, xhr.status, xhr);
			});
		return def.promise();
	}

	globals.postJson = function(url, data, settings) {

		if(arguments.length < 2) {
			var msg = 'postJson called with wrong number of parameters';
			return $.Deferred().reject(msg);
		}

		return $.ajax(url, _.assign({
			type: 'post',
			url: url,
			data: JSON.stringify(data)
		}, globals.ajaxJson, settings || {}))
	};

	globals.runJsScript = function(url) {
		$.ajax({
			type: 'get',
			url: url,
			dataType: 'script'
		});
	}
/*
	$(document).ajaxStart(function () {
		console.log('show loader');
	});

	$(document).ajaxStop(function () {
		console.log('hide loader');
	});

	$(document).ajaxError(function (event, xhr, settings, error) {
		console.error('AJAX ERROR:', error);
		console.log('ajax settings:', settings)
	});
*/
})(window.globals || {});


