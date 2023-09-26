const http = require("http"),
  fs = require("fs/promises");

async function serveStaticFile(res, path, contentType, responseCode = 200) {
  try {
    const data = await fs.readFile(__dirname + path);
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 - Internal Error");
  }
}

http
  .createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path) {
      case "":
        serveStaticFile(res, "/public/home.html", "text/html");
        break;
      case "/about":
        serveStaticFile(res, "/public/about.html", "text/html");
        break;
      case "/img/me.jpg":
        serveStaticFile(res, "/public/img/me.jpg", "image/jpeg");
        break;
      case "/style/style.css":
        serveStaticFile(res, "/public/style/style.css", "text/css");
        break;
      default:
        serveStaticFile(res, "/public/404.html", "text/html", 404);
        break;
    }
  })
  .listen(4000, () =>
    console.log(
      "Server started on http://localhost:4000; press Ctrl-C to terminate...."
    )
  );
