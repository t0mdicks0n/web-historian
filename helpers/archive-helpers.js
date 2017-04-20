var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
	fs.readFile(exports.paths.list, function(err, data) {
		if (err) throw error;
		callback(data.toString().split('\n'));
	});
};

exports.isUrlInList = function(url, callback) {
	return fs.readFile(exports.paths.list, function(err, data) {
		if (err) throw error;
			if (data.indexOf(url) > -1) {
				return callback(true);
			} else {
				return callback(false);
			}
		});
};

exports.addUrlToList = function(url, callback) {
	fs.appendFile(exports.paths.list, url + '\n', (err, data) => {
		if (err) throw err;
		callback(url);
	});
};

exports.isUrlArchived = function(url, callback) {
	fs.readdir(exports.paths.archivedSites, function(err, files) {
		if (err) throw error;

		if (files.indexOf(url) > -1) {
			return callback(true);
		} else {
			return callback(false);
		}
	});
};

exports.downloadUrls = function(urls) {
	urls.forEach(function(url) {
		fs.writeFile(exports.paths.archivedSites + '/' + url, function(err) {
			if (err) throw error;
		});
	});
};