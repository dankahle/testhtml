
/*
// jasmine
describe('lplDirectives tests', function () {

	beforeEach(module('lplDirectives'));

	describe('it tests', function () {
		var scope, elem, ctrl;

		beforeEach(inject(function ($compile, $rootScope) {
			scope = $rootScope;
			elem = $compile('<myd title="my title">transcluded stuff</myd>')(scope);
			scope.$digest();
		}))

		it('should have title: "my title"', function () {
			expect($(elem).find('h4').text()).toBe('my title')
		})

		it('should transclude html', function () {
			expect($(elem).find('div[ng-transclude]').html()).toContain('transcluded stuff')
		})

	})
})
*/


/*
// mocha/chai/sinon
describe('lplDirectives tests', function() {

	beforeEach(module('lplDirectives'));

	describe('it tests', function() {
		var scope, elem, ctrl;

		beforeEach(inject(function($compile, $rootScope) {
			scope = $rootScope;
			elem = $compile('<myd title="my title">transcluded stuff</myd>')(scope);
			scope.$digest();
		}))

		it('should have title: "my title"', function() {
			expect($(elem).find('h4').text()).to.eql('my title')
		})

		it('should transclude html', function() {
			expect($(elem).find('div[ng-transclude]').html()).to.contain('transcluded stuff')
		})

	})
})
*/


