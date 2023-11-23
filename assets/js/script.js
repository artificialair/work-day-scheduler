// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const startHour = 9
const endHour = 17

var currentTime = dayjs().hour()
var tasks = localStorage.getItem("scheduleInputs")
if (tasks === null) {
  tasks = {}
} else {
  tasks = JSON.parse(tasks)
}

function loadLocalStorage() {
  for (var [taskLocation, message] of Object.entries(tasks)) {
    hourBlock = $(taskLocation)
    hourBlock.find(".description").val(message)
  }
}

function createHourBlock(time) {
  var relativeTime;
  if (time > currentTime) {
    relativeTime = "future"
  } else if (time == currentTime) {
    relativeTime = "present"
  } else {
    relativeTime = "past"
  }

  var displayTime;
  if (time > 12) {
    displayTime = time - 12
  } else {
    displayTime = time
  }
  if (time > 11) {
    displayTime += "PM"
  } else {
    displayTime += "AM"
  }

  var hourBlock = $('<div id="hour-'+time+'" class="row time-block ' + relativeTime + '">')
  var timeDisplay = $('<div class="col-2 col-md-1 hour text-center py-3">').text(displayTime)
  var textInput = $('<textarea class="col-8 col-md-10 description" rows="3">')
  var saveButton = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">').append($('<i class="fas fa-save" aria-hidden="true">'))

  hourBlock.append(timeDisplay, textInput, saveButton)
  return hourBlock;
}

$(document).ready(function () {
  var mainBox = $("div.container-fluid")
  mainBox.html(null)

  // Generates the webpage, from 9 to 5 (startHour to endHour)
  for (var i = startHour; i <= endHour; i++) {
    var hourBlock = createHourBlock(i)
    mainBox.append(hourBlock)
  }

  loadLocalStorage()

$(".saveBtn").on("click", function(event) {
  buttonParent = $(this).parent()

  taskLocation = "#" + buttonParent.attr("id")
  message = buttonParent.find("textarea.description").val()

  tasks[taskLocation] = message
  localStorage.setItem("scheduleInputs", JSON.stringify(tasks))
})


  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


  //    <div id="hour-9" class="row time-block past">
  //      <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
  //      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  //      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
  //        <i class="fas fa-save" aria-hidden="true"></i>
  //      </button>
  //    </div>
});
