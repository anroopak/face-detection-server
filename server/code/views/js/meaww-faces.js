'use strict';

let socket = io('ws://');

socket.on('connect', function() {
	console.log("Connected");
	socket.on('completed', data => {
		console.log(data);
		if (data.name) {
			$("#image").html('<img class="img img-responsive img-thumbnail" src="' + data.name + '"></img>');
			$("#status").empty();
		} else {
			$("#status").html('<div class="alert alert-danger" role="alert">Upload failed.</div>');
		}
	});
});

socket.on('disconnect', function() {
	console.log("disconnect");
} ); // wait for reconnect
socket.on('reconnect', function() {
	console.log("reconnect");
} ); // connection restored  
socket.on('reconnecting', function(nextRetry) {
	console.log("reconnecting");
} ); //trying to reconnect
socket.on('reconnect_failed', function() { console.log("Reconnect failed"); });

$(document).ready(() => {
	let formUploader = document.getElementById('form');
	formUploader.onsubmit = function(ev) {
		ev.preventDefault();
		$("#status").empty().html('<div class="alert alert-info" role="alert">Uploading.</div>');
		$("#image").empty();
		$(this).ajaxSubmit({
			error: function(xhr) {
				$("#status").empty().html(`<div class="alert alert-danger" role="alert">${xhr.status}</div>`);
			},
			success: function(response) {
				$("#status").empty().html('<div class="alert alert-success" role="alert">Processing.</div>');
				console.log(response);
			}
		});
	};
});