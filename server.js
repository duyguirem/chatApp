var http = require('http');
var querystring = require('querystring');


var chatMessages = [];

var server = http.createServer().listen(3000);

server.on('request', function (req, res) {
    console.log("req",req.url, req.method)
    //if (req.method == 'POST') {
        var urlSplit = req.url.split("?");
        var route = urlSplit[0];
        console.log("url", urlSplit)
        var body = '';

        if(route == '/send'){
            var params = {};
            var queryParts = urlSplit[1].split("&");
            for(var i = 0; i<queryParts.length; i++){
                var parts = queryParts[i].split('=');
                params[parts[0]] = parts[1];
            }
            console.log("reqq",urlSplit, params)
            chatMessages.push(params);
        }

    //}

    //if ( req.method == 'GET') {
        if(req.url == '/read'){
            console.log("chatmess", chatMessages)
            res.end(JSON.stringify(chatMessages))
        }
    //}

    req.on('data', function (data) {
        console.log("onn", data, "onnnn", body)
        body += data;
    });

    req.on('end', function () {
        var post = querystring.parse(body);
        console.log("aa",post);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');

    });

});


console.log('Listening on port 3000');