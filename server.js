//https://www.youtube.com/watch?v=Xb_0awoShR8
(function (exports, require, module, __filename, __dirname) {
	'use strict';
	/* esLint-disable no-console */
	const http = require('http');
	const fs = require('fs');
	const EventEmitter = require('events').EventEmitter;

	/* whre does this go?
	var str = 'Hello world';
	function start() {
		console.log(str);
	}
	start();*/

class StaticServer extends EventEmitter {
	constructor() {
		super();
		this._server = http.createServer(this.handleRequest);
		this._server.on('error', (e, data) => this.emit('error', e, data));
		this._server.listen(8090, 'localhost');
	}
	handleRequest(request, response) {
		const filePath = process.cwd();
		try { /*4:47*/
			const filedata = fs.readFileSync(filePath, 'binary');
			sendResponse(200, filedata);
		}
		catch (err) {
			this.emit('error', 'Failed to read ${filePath}', err); //this emit gets heard on this line: this._server.on('error'...)
			//which this error function is emitting its own error event passing the data
			//want to know exception (err). place breakpoint inside error fcn. put breakpoint
			//at fcn and put a column breakpoint where needed.
			//reload and it'll pause inside the error fcn
			return sendResponse(500, '500 - Internal Server Error');
		}
		function sendResponse(statusCode, data) {
			response.writeHead(statusCode);
			response.write(data, 'binary');
			response.end();
		}
	}
}
const staticserver = new StaticServer();
staticserver.on('error', (e) => {
	console.error('Problem!', e);
});
return staticserver;
});