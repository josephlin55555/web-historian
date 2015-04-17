var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpReq = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){

  fs.readFile("archives/sites.txt", 'utf-8', function(error, data) {
    if(error) {
      throw error;
    }
    //run callback on the array
    return cb(data.split("\n")); //split takes a string, and based on the delimiter, returns an array

  });
};

exports.isUrlInList = function(url, cb){
  // console.log(this.readListOfUrls(function(){return 'test'}));

  this.readListOfUrls(function(urlArr){
    if(urlArr.indexOf(url) === -1){
      cb(false);
    } else {
      cb(true);
    }
  });
  // console.log(urls);
  // for (var i = 0; i < urls.length; i++){
  //   if(url === urls[i]){
  //     return true;
  //   }
  // }
  // return false;
};

exports.addUrlToList = function(asset){
  fs.appendFile("archives/sites.txt", asset + "\n" , "utf-8", function(error){
    if(error){
      throw error;
    }
    console.log(asset + " ", "appended to sites.txt");
  });
};

exports.isURLArchived = function(url, cb){
  fs.readFile(exports.path.list, 'utf8', function(error, data){
    if(error){
      cb(false);
    } else {
      cb(true);
    }
  });
};

exports.downloadUrls = function(urls){
  _.each(urls, function(url) {
    if(!url){ return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
  });
  return true;
};
