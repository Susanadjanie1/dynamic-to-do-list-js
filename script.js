document.addEventListener("DOMContentLoaded", () => {
  //  DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Task Creation and Removal

    const listItem = document.createElement("li");
    listItem.textContent = taskText;
    listItem.addEventListener("click", () => {
      listItem.classList.add("done");
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    removeButton.onclick = function () {
      taskList.removeChild(listItem);
    };

    listItem.appendChild(removeButton);

    taskList.appendChild(listItem);

    taskInput.value = "";
  }

  //  Event Listeners

  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
