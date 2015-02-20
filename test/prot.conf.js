
exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['e2e/**/*_spec.js'],
	baseUrl: 'http://localhost:63342/testhtml/'
};
