//global variable declared on the top by convention and should be outside functions so they are accesible

const nonImportantIcon = "fa-regular fa-star";
const importantIcon = "fa-sharp fa-solid fa-star";
var isImportant = false;
var isVisible = true;

function toggleImportant() {
  if (isImportant) {
    $("#star").removeClass(importantIcon);
    $("#star").addClass(nonImportantIcon);
    isImportant = false;
  } else {
    $("#star").removeClass(nonImportantIcon);
    $("#star").addClass(importantIcon);
    isImportant = true;
  }
}

function toggleDetails() {
  //console.log("toggleDetails");
  if (isVisible) {
    $("#secForm").hide();
    isVisible = false;
  } else {
    $("#secForm").show();
    isVisible = true;
  }
}

function saveTask() {
  console.log("Task saved");
  let title = $("#txttitle").val();
  let description = $("#txtdesc").val();
  let dueDate = $("#pickDate").val();
  let category = $("#category").val();
  let priority = $("#priority").val();
  let budget = $("#budget").val();
  // create a new instance of Task (object)
  let task = new Task(
    isImportant,
    title,
    description,
    dueDate,
    category,
    priority,
    budget
  );
  console.log(task);
  clearForm();

  // create a post request

  $.ajax({
    type: "POST",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (response) {
      displayTask(task);
      console.log("Server says", response);
    },
    error: function (err) {
      console.log("Saving error", err);
      alert("Error, task not saved");
    },
  });
}
{
  /* <i class="fa-sharp fa-solid fa-star"></i> */
}
function displayTask(task) {
  let syntax = `
  <div class="task">
    <div class="title">
      <i class="fa-sharp fa-solid fa-star"></i>
      <h2 class="taskTitle">${task.title}</h2>
      <p class="taskDesc">${task.description}</p>
    </div>

    <label class="dueDate">${task.dueDate}</label>
    <label class="category">${task.category}</label>
    <label class="priority">${task.priority}</label>
    <label class="budget">$${task.budget}</label>
  </div>
  `; //html code
  $("#pendingTasks").append(syntax);
}

function clearForm() {
  $("#txttitle").val("");
  $("#txtdesc").val("");
  $("#pickDate").val("");
  $("#category").val("");
  $("#priority").val("");
  $("#budget").val("");
}

function testRequest() {
  $.ajax({
    type: "GET",
    url: "https://fsdiapi.azurewebsites.net",
    success: function (data) {
      console.log("Server says", data);
    },
    error: function (error) {
      console.log("Request error", error);
    },
  });
}

function deleteTask() {
  $.ajax({
    type: "DELETE",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Saydee",
    success: function (response) {
      alert("Tasks has been deleted!");
    },
    error: function (error) {
      alert.warning("Task was NOT deleted");
    },
  });
  deleteDisTask();
}

function deleteDisTask(task) {
  console.log("Deleting" + task);
  $(".task").remove();
}

function fetchTasks() {
  $.ajax({
    type: "GET",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function (data) {
      let all = JSON.parse(data); //will parse the json strin into js oj/array
      console.log(all); // all = all the tasks saved on the server
      for (let i = 0; i < all.length; i++) {
        let task = all[i];
        if (task.name === "Saydee") {
          displayTask(task);
        }
      }
    },
    error: function (error) {
      console.log("Request error", error);
    },
  });
}

function init() {
  console.log("Task Manager");

  //load tasks
  fetchTasks();
  $("#star").click(toggleImportant);
  $("#saveTask").click(saveTask);
  $("#btnDetails").click(toggleDetails);
  $("#btnDelete").click(deleteTask);
}

window.onload = init;

// To request to server
// http request

// Two native ways sending http request
// - xhttprequest …… this is very complex
// - fetch ..... but this is only a little better than above
// Jquery has AJAX …. We can send http request

// AJAX right now will allow us to send http request

// First every time we send http request

// Method
// -get = retrieve data or something
// -post = create new things
// -put = to modify
// -patch = modify
// -delete = remove

// Only restriction :
// In "GET" request you’re not allowed to send data or payload

// Payload = data
//for post make sure you put "/" at the end
