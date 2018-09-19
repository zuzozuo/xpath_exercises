var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var xpath = require('xpath');
var xmlDom = require('xmldom').DOMParser;
var PORT = 3000;

function findWOJ(req, res) {
    fs.readFile('data/TERC.xml', 'utf-8', function (error, data) {
        if (error) console.log(error)
        var doc = new xmlDom().parseFromString(data)
        var nodes = xpath.select('//NAZWA|//WOJ|//NAZWA_DOD', doc)

        for (var i = 0; i < nodes.length; i++) {
            console.log(nodes[i].localName + ": " + nodes[i].firstChild.data)
        }
    })

    res.end("Blep");
}

http.createServer(function (req, res) {
    var url = req.url,
        ext = path.extname(url),
        contentType;

    if (ext == ".js") {
        contentType = "application/javascript";
    } else if (ext == ".css") {
        contentType = "text/css";
    } else if (ext == ".html") {
        contentType = "text/html";
    } else if (ext == ".jpg") {
        contentType = "image/jpeg";
    } else if (ext == ".png") {
        contentType = "image/png";
    } else if (ext == ".woff") {
        contentType = "application/font-woff";
    }

    if (url == "/") {
        switch (req.method) {
            case "GET":
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data);
                    res.end();
                })
                break;
            case "POST":
                findWOJ(req, res);
                break;
        }
    } else {
        fs.readFile("static" + url, function (error, data) {
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.write(data);
            res.end();
        })
    }

}).listen(PORT)


console.log("Coś tam działa");