//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = [];
http.createServer(function (req, res) {
    //parse url
    var parseObj = url.parse(req.url, true);
    var pathName = parseObj.pathname;
    if (pathName === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathName === '/post') {
        //post comments
        fs.readFile('./post.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathName === '/comment') {
        //get comments
        var comment = parseObj.query;
        comments.push(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else if (pathName === '/getComments') {
        //get comments
        var comment = parseObj.query;
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile('.' + pathName, function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }
}).listen(3000, function () {
    console.log('Server is running...');
});

