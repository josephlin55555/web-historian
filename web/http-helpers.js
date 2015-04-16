var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var target = asset || 'web/public/index.html';
  if(asset){
    target = "archives/sites/" + target;
  }


  fs.readFile(target, 'utf-8', function(error, data) {
    if(error) {
      res.writeHead(404, headers);
      res.end(data);
    }
    res.end(data);
  });
};

exports.collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    data = "\"" + data.slice(4) + "\"";
    console.log(data)
    callback(JSON.parse(data));
  });
};


// As you progress, keep thinking about what helper functions you can put here!
