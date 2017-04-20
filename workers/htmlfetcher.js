// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');
var fs = require('fs');
var request = require('request');
var archive = require('../helpers/archive-helpers');

// Fetch all the sites we want to upload from archives/sites.txt
// Loop over array of fetched sites
 	// For each instance, get html
 	// Create and write new file with html
// Reset requested pages to zero
 
function addToArchive () {
	fs.readFile(archive.paths.list, function(err, data) {
		if (err) throw error;
		data.toString().split('\n').forEach(function(website) {
			scraper('https://' + website, function(html) {
				fs.writeFile(archive.paths.archivedSites + '/' + website, html);
				console.log('Just added user request "' + website + '" to directory.')
			});
		});
		fs.writeFile(archive.paths.list, '');
	});
}

function scraper (url, callback) {
	request(url, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    callback(html);
	  }
	});
}

addToArchive();