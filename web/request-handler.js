var path = require('path');
var archive = require('../helpers/archive-helpers');
var hHelpers = require('./http-helpers.js')
// require more modules/folders here!

var sendResponse = function(req, res, statusCode){
  statusCode = statusCode || 200;
  res.writeHead(statusCode, hHelpers.headers);
  var truncatedUrl = req.url.substring(1);
  hHelpers.serveAssets(res, truncatedUrl);
};

var postResponse = function(req, res,statusCode){
  statusCode = statusCode || 302;
  res.writeHead(statusCode, hHelpers.headers);
  // var parsedData = "where is this TODO TODO TODO";
  hHelpers.collectData(req, function(data){
    archive.addUrlToList(data);
    res.end();
  });

}



var routing = {
  'GET': function(req, res){
    sendResponse(req, res);
  },
  'POST':function(req, res){
    postResponse(req, res, 302);
  },
  'OPTIONS':function(req,res){
    sendResponse(req, res);
  },
};
exports.handleRequest = function (req, res) {
  var action = routing[req.method];
  if(action){
  //   console.log('REQUEST HANDLER CAUGHT ACTION')
  //   console.log(res)
    action(req, res);
  } else {
    sendResponse(res, '404 String Text', 404);
  }
  // res.end(archive.paths.list);
};
