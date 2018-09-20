var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var xpath = require('xpath');
var xmlDom = require('xmldom').DOMParser;
var PORT = 3000;

function getData(req, res) {
    var allData = "";
    req.on("data", function(data) {
        allData += data;
    })

    req.on("end", function(data) {
        var parsedData = JSON.parse(allData)
        console.log(parsedData)
        switch (parsedData) {
            case 1:
                findWOJ(req, res);
                break;

        }

    })
}

// funkcja znajdzWOJTKA
function findWOJ(req, res) {
    fs.readFile('data/TERC.xml', 'utf-8', function(error, data) {

        // obsluga bledow jakby sie xml nie wczytal zwraca blad HTTP 500
        if (error) {
            // console.log(error);
            res.statusCode = 500;
            res.statusMessage = "Internal Server Error";
            res.end();
            return;
        }

        // parsowanie xml
        var doc = new xmlDom().parseFromString(data);
        var nodes = xpath.select("/teryt/catalog/row[NAZWA_DOD='województwo']/NAZWA", doc);
        var data = [];

        // sklejanie tablicy z danymi
        for (var i = 0; i < nodes.length; i++) {
            data.push({ name: nodes[i].firstChild.data });
            // data.push([i, nodes[i].localName, nodes[i].firstChild.data]);
        }

        // odsylamy jsona z tablica
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });
}

http.createServer(function(req, res) {
    var url = req.url,
        ext = path.extname(url),
        contentType = "text/html"; // domyslny content type

    // rozpoznanie content type
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

    // jezeli "/" to kieruje na index
    if (url == "/") {
        url = "/index.html";
    }

    // obsluga getow
    if (req.method == "GET") {
        // console.log("GET " + url);
        fs.readFile("static" + url, function(error, data) {

            // jezeli nie ma pliku to zwraca HTTP 404
            if (error) {
                res.statusCode = 404;
                res.statusMessage = "Not found";
                res.end();
                return;
            }

            // dane ciurkiem
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.write(data);
            res.end();
        });

    } else if (req.method == "POST") { // obsluga postow
        getData(req, res);

    }

}).listen(PORT);

console.log("http://localhost:" + PORT);