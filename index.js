const fs = require("fs");
const http = require("http");
const url = require("url");
const fillTemplate = require("./modules/fill_template");

const file = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const products = JSON.parse(file);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = products.map((product) => fillTemplate(tempCard, product)).join("");
    const overviewHtml = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(overviewHtml);
  } else if (pathname === "/product") {
    const product = products[query.id];
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const productHtml = fillTemplate(tempProduct, product);
    res.end(productHtml);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(file);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
  console.log(`${req.method}: ${req.url}`);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server on air. listening to port: 8000");
});
