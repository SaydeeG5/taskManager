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
  displayTask(task);
  clearForm();
}

function displayTask(task) {
  let syntax = `
  <div class="task">
    <div class="title">
      
      <h2><i class="fa-sharp fa-solid fa-star"></i>${task.title}</h2>
      <p>${task.description}</p>
    </div>
 
    <label class="dueDate">${task.dueDate}</label>
    <label class="category">${task.category}</label>
    <label class"priority">${task.priority}</label>
    <label class"budget">${task.budget}</label>
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

function init() {
  console.log("Task Manager");
  $("#star").click(toggleImportant);
  $("#saveTask").click(saveTask);
  $("#btnDetails").click(toggleDetails);
}

window.onload = init;

// test changed
