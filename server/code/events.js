"use strict";

const SocketIOFile = require('socket.io-file');
const multer = require('multer');
const uuid = require('uuid');
const fs = require('fs');

const dataDir = 'data/';
const uploadDir = 'views/' + dataDir;

let uuidString = uuid.v4();
let count = 0

function setEvents(io, app) {
	io.on('connection', function(socket) {

		console.log('Socket connected.');

		let upload = multer({
			dest: './views/data/'
		});

		// File input field name is simply 'file'
		app.post('/', upload.single('file'), function(req, res) {
			console.log(req.file);
			let ext = req.file.originalname.split('.').pop();
			let filename = req.file.filename + '.' + ext;
			let file = __dirname + '/' + uploadDir + filename;
			fs.rename(req.file.path, file, function(err) {
				if (err) {
					console.log(err);
					res.send(500);
				} else {
					res.send(200);

					let input = file;
					let outputFilename = dataDir + 'processed/' + filename;
					let output = __dirname + '/' + uploadDir + 'processed/' + filename;

					const
						spawn = require('child_process').spawn,
						ls = spawn('/usr/bin/python', ['face-detector/detect.py', input, output]);

					ls.stdout.on('data', data => {
						console.log(`stdout: ${data}`);
					});

					ls.stderr.on('data', data => {
						console.log(`stderr: ${data}`);
					});

					ls.on('close', code => {
						socket.emit('completed', {
							name: outputFilename
						});
						console.log("Message sent");
					});

				}
			});
		});
	});
};



module.exports = setEvents;