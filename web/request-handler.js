var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');

exports.handleRequest = function (req, res) {
	var statusCode = 200;
	var serverResponse = {};

	console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    if (req.url === '/') {
    	fs.readFile(__dirname + '/public/index.html',function (err, content) {
      	res.writeHead(200, {'Content-Type': 'text/html'});
      	res.write(content);
      	res.end();
    	});
    } else {
    	archive.isUrlArchived(req.url.slice(1), (boolean) => {
    		if (boolean) {
    			fs.readFile(archive.paths.archivedSites + req.url, (err, data) => {
    				if (err) {
    					throw err;
    				} else {
				    	fs.readFile(archive.paths.archivedSites + req.url, function (err, content) {
	    					res.writeHead(200, {'Content-Type': 'text/html'});
	    					res.write(content);
	    					res.end();
				    	});
    				}
    			})
    		} else {
    			res.writeHead(404);
    			res.end();
    		}
    	});
    }
  } else if (req.method === 'POST') {
		req.on('data', function(data) {
			archive.addUrlToList(data.toString('utf-8').slice(4), (url) => {
				archive.isUrlArchived(url, (truth) => {
				
					if (truth) {
						res.writeHead(302, {'Location': 'http://127.0.0.1:8080/' + url });
						res.end();
					} else {
  					fs.readFile(__dirname + '/public/loading.html',function (err, content) {
      				res.writeHead(200, {'Content-Type': 'text/html'});
      				res.write(content);
      				res.end();
    				});
					}
				})
			})
		});
	}
};