// npm install got
// mkdir data

const fs = require('fs');
const got = require('got');

(async () => {
	try {
		const response = await got('https://parsons.nyc/aa/m10.html');
		console.log(response.body);
		fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
})();
