const http = require('http'),
    fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode,
                { 'Content-Type': contentType });
            res.end(data);
        }
    });
}
http.createServer(function (req, res) {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/img/me.jpg':
            serveStaticFile(res, '/public/img/me.jpg', 'image/jpeg');
            break;
        case '/style/style.css':
            serveStaticFile(res, '/public/style/style.css', 'text/css');
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404);
            break;
    }
}).listen(3000);
console.log('Server started on http://localhost:3000; press Ctrl-C to terminate....');