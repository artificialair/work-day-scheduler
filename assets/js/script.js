// constants for the hours the scheduler will span (mostly used for testing color coding)
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
  // I tried saving a list to localStorage and it saved weirdly, iterating over an object is just easier on my end
  for (var [taskLocation, message] of Object.entries(tasks)) {
    // finds the text area in the hour block with `taskLocation` as it's id and sets it's value to `message`
    hourBlock = $(taskLocation)
    hourBlock.find(".description").val(message)
  }
}

function displayHeader() {
  // Gets and formats date and time from dayJS and displays it in the header
  header = $("#currentDay")
  var now = dayjs().format("dddd, MMMM DD")
  header.text(now)
}

function createHourBlock(time) {
  // Compares the time of the block to the current time, and sets the class as past/present/future
  var relativeTime;
  if (time > currentTime) {
    relativeTime = "future"
  } else if (time == currentTime) {
    relativeTime = "present"
  } else {
    relativeTime = "past"
  }

  // since time is stored in 24h, this converts it to 12h and adds an AM or PM 
  // this will break if startHour = 0, not fixing as it will not be relevant in the final submission
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

  // creates and returns a new hour block with the above data
  var hourBlock = $('<div id="hour-'+time+'" class="row time-block ' + relativeTime + '">')
  var timeDisplay = $('<div class="col-2 col-md-1 hour text-center py-3">').text(displayTime)
  var textInput = $('<textarea class="col-8 col-md-10 description" rows="3">')
  var saveButton = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">').append($('<i class="fas fa-save" aria-hidden="true">'))

  hourBlock.append(timeDisplay, textInput, saveButton)
  return hourBlock;
}

// this function runs when jQuery is fully loaded
$(document).ready(function () {
  var mainBox = $("div.container-fluid")
  // Clears the main box
  // I'm pretty sure this is unnecessary
  mainBox.html(null)

  // Generates the main section of the webpage, from 9 to 5 (startHour to endHour)
  for (var i = startHour; i <= endHour; i++) {
    var hourBlock = createHourBlock(i)
    mainBox.append(hourBlock)
  }

  loadLocalStorage()
  displayHeader()

$(".saveBtn").on("click", function(event) {
  // gets the div the clicked button is in
  buttonParent = $(this).parent()

  // gets the id of the div
  taskLocation = "#" + buttonParent.attr("id")
  // gets the message of the textarea within the div
  message = buttonParent.find("textarea.description").val()

  // adds a field to the "tasks" object
  // if the field already exists this will reset it
  tasks[taskLocation] = message
  localStorage.setItem("scheduleInputs", JSON.stringify(tasks))

})

});
