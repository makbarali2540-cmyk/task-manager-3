function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            if (!body.trim()) {
                resolve({});
                return;
            }

            try {
                const data = JSON.parse(body);
                resolve(data);
            } catch (error) {
                reject(new Error("Malformed JSON"));
            }
        });

        req.on("error", () => {
            reject(new Error("Failed to read request body"));
        });
    });
}

module.exports = {
    parseJsonBody
};