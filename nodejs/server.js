var http = require("http");
var querystring = require('querystring');

var iqiyi = require("./iqiyi");

http.createServer(function (req, res) {

    var post = '';

    req.on('data', function (chunk) {
        post += chunk;
    });

    req.on('end', function() {
        console.log(post);
        post = JSON.parse(post);
        var type = post.type;
        var param = post.param;
        if (type === 'iqiyi'){
            var result = iqiyi.cmd5x(param);
            console.log("vf:" + result);
            res.write(result);
            res.end();
        }else {
            res.end();
        }
    });

}).listen(3000);