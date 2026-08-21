function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}

function sendError(res, statusCode, message, details = null) {
    const response = {
        error: message
    };

    if (details) {
        response.details = details;
    }

    sendJson(res, statusCode, response);
}

module.exports = {
    sendJson,
    sendError
};