const fs = require('fs');

module.exports = {
	image: (req) => {
		return fs.readFileSync('generated/image.png');
	},
};
