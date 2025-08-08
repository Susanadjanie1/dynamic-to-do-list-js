document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // addTask function
  /**
     @param {string} 
      @param {boolean} [save=true] 
     */
  function addTask(taskText, save = true) {
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    //Task Creation and Removal
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    listItem.addEventListener("click", () => {
      listItem.classList.add("done");
    });

    // Create a new button element for removing the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    removeButton.onclick = function () {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

      const updatedTasks = storedTasks.filter(
        (task) => task !== listItem.firstChild.textContent
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      taskList.removeChild(listItem);
    };

    listItem.appendChild(removeButton);

    taskList.appendChild(listItem);

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  // load tasks from Local Storage

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Event Listeners
  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
      }
    }
  });

  loadTasks();
});
