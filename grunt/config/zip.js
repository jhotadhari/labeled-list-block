var path = require('path');

module.exports = {

	trunk_to_releases: {
		cwd: 'dist/trunk/',
		src: [
			'dist/trunk/*',
			'dist/trunk/**/*',
		],
		dest: 'releases/<%= global["pkg"].name %>-<%= global["pkg"].version %>.zip',
	},

};
