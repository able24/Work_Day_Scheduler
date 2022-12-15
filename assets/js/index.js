// Setting the current day on the work scheduler
var currentDay = $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

//Creating timeblock rows in HTML - Setting the start time
var startOfWork = moment(09, "HH");

// A while loop to create a time block of rows for each hour from 9am to 5pm
while (startOfWork.hour() < 18) {
  // Creating HTML elements and assigning classes and Ids to them
  $(".container").append(
    '<div class="row time-block">' +
      '<div class="col-md-1 hour" id=" ' +
      startOfWork.format("ha") + 
      ' ">' +
      startOfWork.format("hha") +
      "</div>" +
      '<textarea class="col-md-10 description" id=" ' +
      startOfWork.format("H") +
      ' "></textarea>' +
      '<button class="btn col-md-1 saveBtn"><i class="fas fa-save"></i></button>',
    "</div>"
  );
  // Increment the hour by 1 for everytime the loop runs
  startOfWork.add(1, "hours");
}

// Assign saveBtn click listener for user task input and time stamp??
$(".saveBtn").on("click", function () {
  // Get task and corresponding time.
  var task = $(this).siblings(".description").val(); // getting the task entered by the user
  var hour = $(this).siblings().attr("id"); // getting the corresponding time for the entered task
  var keyName = parseInt(hour); // Converting time  ID to string for storage in localStorage


  // Save task and time of task in local storage.
  localStorage.setItem(keyName, task);
});

//function to check each hour block to see if task is in the past, present, or future.
function timeTracker() {
  // Setting a baseline time for comparison with time in timeblock to change color based on past, present and future tasks
  var timeNow = parseInt(moment().format("H"));
  var timeBlock = $(".hour");

  // Loop over time blocks to compare current time with time in timeblock and add the appropriate class to color code the timeblock
  $.each(timeBlock, function () {
    var timeId = $(this).siblings().attr("id");
    if (timeId == timeNow) {
      $(this).next().addClass("present");
    } else if (timeId < timeNow) {
      $(this).next().addClass("past");
    } else {
      $(this).next().addClass("future");
    }
  });
}

//Get saved data from LocalStorage - do this for each hour created.
for (var i = 0; i <= 8; i++) {
  var time = i + 9;
  if (time > 12) {
    time -= 12;
  }
  $(".time-block").eq(i).find(".description").val(localStorage.getItem(time));
}

timeTracker(); // Calling or re-run function