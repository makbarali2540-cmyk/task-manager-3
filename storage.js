const fs = require("fs/promises");
const file_name = "./task.json";

async function loadtask() {

    try {
        const data = await fs.readFile(file_name, "utf-8");
        console.log("tasks.json was read successfully.");
        console.log("Data from file:", data);
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("task.json does not exist. Starting with empty list.");
            return [];
        }
        if (error instanceof SyntaxError) {
            throw new Error("task.json contains malformed JSON.");
        }
        throw error;
    }
}

async function savetask(tasks) {
    const data = JSON.stringify(tasks, null, 2);
    await fs.writeFile(file_name, data, "utf-8");
    console.log("tasks are saved successfully");
}

module.exports = {
    loadtask,
    savetask,
};