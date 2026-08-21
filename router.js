const { loadtask, savetask } = require("./storage");
const { getAllTasks, getTaskById, createTask } = require("./task-manager");
const { parseJsonBody } = require("./request");
const { sendJson, sendError } = require("./response");
async function router(req, res) {
    try {
        const method = req.method;
        const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

        if (method === "GET" && pathname === "/health") {
            return sendJson(res, 200, {
                status: "ok",
                message: "Task Manager service is running"
            });
        }

        if (method === "GET" && pathname === "/tasks") {
            const tasks = await loadtask();

            return sendJson(res, 200, {
                tasks: getAllTasks(tasks)
            });
        }

        if (method === "GET" && pathname.startsWith("/tasks/")) {
            const idText = pathname.split("/")[2];
            const id = Number(idText);

            if (!Number.isInteger(id)) {
                return sendError(res, 400, "Invalid task ID");
            }

            const tasks = await loadtask();
            const task = getTaskById(tasks, id);

            if (!task) {
                return sendError(res, 404, "Task not found");
            }

            return sendJson(res, 200, {
                task: task
            });
        }

        if (method === "POST" && pathname === "/tasks") {
            const body = await parseJsonBody(req);
            const tasks = await loadtask();

            let newTask;

            try {
                newTask = createTask(tasks, body);
            } catch (error) {
                return sendError(res, 400, "Invalid task input", error.message);
            }

            await savetask(tasks);

            return sendJson(res, 201, {
                task: newTask
            });
        }

        if (pathname.startsWith("/tasks") && !["GET", "POST"].includes(method)) {
            return sendError(res, 405, "Method not allowed");
        }

        return sendError(res, 404, "Route not found");

    } catch (error) {
        console.error(error);

        if (!res.headersSent) {
            return sendError(res, 500, "Internal server error");
        }
    }
}

module.exports = router;