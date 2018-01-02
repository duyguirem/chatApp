var http = require('http');
var querystring = require('querystring');


var chatMessages = [];

var server = http.createServer(function(req,res){
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

}).listen(3000);

server.on('request', function (req, res) {

        var urlSplit = req.url.split("?");
        var route = urlSplit[0];
        var body = '';

        if(route == '/send'){
            var params = {};
            var queryParts = urlSplit[1].split("&");
            for(var i = 0; i<queryParts.length; i++){
                var parts = queryParts[i].split('=');
                params[parts[0]] = parts[1];
            }
            chatMessages.push(params);
        }

        if(req.url == '/read'){
    
            res.end(JSON.stringify(chatMessages))
        }


    req.on('data', function (data) {
        console.log("onn", data, "onnnn", body)
        body += data;
    });

    req.on('end', function () {
        var post = querystring.parse(body);
        console.log(post);
        res.end('Hello World\n');

    });

});


console.log('Listening on port 3000');