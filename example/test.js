const { EnvVariableManager } = require("nodejs-env");

const envManager = new EnvVariableManager();

// set the value of the PORT variable
envManager.set("PORT", "3000");
console.log("PORT set to 3000");

envManager.set("HOST", "127.0.0.1");
console.log("HOST set to 127.0.0.1");

// get the value of the NODE_ENV variable
const port = envManager.get("PORT");
console.log(`port = ${port}`);

const hostname = envManager.get("HOST");
console.log(`hostname = ${hostname}`);

const http = require("http");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Server running at http://${hostname}:${port}/`);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
