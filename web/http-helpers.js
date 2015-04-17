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
  console.log('ASSET:' + asset);
  if(asset === "/"){
    console.log('TRIGGERED IF')
    asset += 'index.html';
  }

  fs.readFile(archive.paths.archivedSites + asset, 'utf8', function(error, data) {
    console.log('ARCHIVECHECK:'+archive.paths.archivedSites+asset)
    if(error) {
      //checking in public resource
      fs.readFile(archive.paths.siteAssets + asset,'utf8', function(error1, data1) {
        console.log('ASSETSCHECK:' + archive.paths.siteAssets+asset);
        if(error1) {
          res.writeHead(404, headers);
          res.end('404');
        }
        // response has siteAsset
        res.end(data1);
      });
    }
    //response is archived
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
