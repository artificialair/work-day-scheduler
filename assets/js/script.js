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

function displayHeader() {
  header = $("#currentDay")
  var now = dayjs().format("dddd, MMMM DD")
  header.text(now)
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
  displayHeader()

$(".saveBtn").on("click", function(event) {
  buttonParent = $(this).parent()

  taskLocation = "#" + buttonParent.attr("id")
  message = buttonParent.find("textarea.description").val()

  tasks[taskLocation] = message
  localStorage.setItem("scheduleInputs", JSON.stringify(tasks))
  
})

  // TODO: Add code to display the current date in the header of the page.
});
