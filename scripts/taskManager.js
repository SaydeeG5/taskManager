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
