function getAllTasks(tasks) {
    return tasks;
}

function getTaskById(tasks, id) {
    return tasks.find(task => task.id === id);
}

function createTask(tasks, taskData) {
    if (!taskData || typeof taskData !== "object") {
        throw new Error("Task must be an object");
    }

    if (typeof taskData.id !== "number") {
        throw new Error("id must be a number");
    }
    if (typeof taskData.title !== "string" || taskData.title.trim() === "") {
        throw new Error("title is required");
    }

    if (typeof taskData.completed !== "boolean") {
        throw new Error("completed must be true or false");
    }

    if (!["low", "medium", "high"].includes(taskData.priority)) {
        throw new Error("priority must be low, medium, or high");
    }

    if (tasks.some(task => task.id === taskData.id)) {
        throw new Error("Task ID already exists");
    }
    const newtask = {
        id: taskData.id,
        title: taskData.title.trim(),
        completed: taskData.completed,
        priority: taskData.priority,
    };
    tasks.push(newtask);
    console.log("task has been added successfully ");
    return newtask;
}

function addtask(tasks, id, title, completed, priority) {
    if (title.trim() === "") {
        console.log("Error: title cannot be empty");
        return tasks;
    }
    const exists = tasks.some(task => task.id === id);
    if (exists) {
        console.log("error : task is already exists .");
        return tasks;
    }

}

function listofall(tasks) {
    console.log("list of all tasks");
    tasks.forEach(task => {
        console.log(`id: ${task.id}, title: ${task.title}, completed: ${task.completed}, priority: ${task.priority}`);

    });
}

function findtask(tasks, id) {
    const task = tasks.find(task => task.id === id);
    if (!task) {
        console.log("ERROR: task not found");
        return;
    }
    console.log("task found:");
    console.log(task);
}

function comtask(tasks, id) {
    const task = tasks.find(task => task.id === id);
    if (!task) {
        console.log("task not found");
        return tasks;
    }
    task.completed = true;

    console.log(`Task ${id} marked as completed`)
    return tasks;

}


module.exports = {
    addtask,
    listofall,
    findtask,
    comtask,
    getAllTasks,
    getTaskById,
    createTask
};