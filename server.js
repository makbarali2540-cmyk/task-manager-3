const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    router(req, res).catch((error) => {
        console.error(error);

        if (!res.headersSent) {
            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                error: "Internal server error"
            }));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});