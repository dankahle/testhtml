
describe('lplDirectives e2e tests', function() {


	describe('lplTabs tests', function() {

		it('should change tabs', function() {
			console.log('here')
			browser.get('test.html');
			$('#one')
				.then(function(ef) {
					expect(ef.getText()).toEqual('dank');
				});

		})


		xdescribe('angularjs homepage', function() {
			var firstNumber = element(by.model('first'));
			var secondNumber = element(by.model('second'));
			var goButton = element(by.id('gobutton'));
			var latestResult = element(by.binding('latest'));
			console.log('one')

			beforeEach(function() {
				console.log('before browser')
				browser.get('http://juliemr.github.io/protractor-demo/');
				console.log('after browser')

			});

			xit('should have a title', function() {
				console.log('test1')
				expect(browser.getTitle()).toEqual('Super Calculator');
			});

			it('should add one and two', function() {
				console.log('test2')
				firstNumber.sendKeys(1);
				secondNumber.sendKeys(2);
				goButton.click();

				expect(latestResult.getText()).toEqual('3');
			});

/*
			it('should add four and six', function() {
				// Fill this in.
				expect(latestResult.getText()).toEqual('10');
			});
*/
		});
	})

})