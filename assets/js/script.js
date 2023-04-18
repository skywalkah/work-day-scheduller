$(document).ready(function () {
  var mainContainer = $('.container-lg')
  var currentDay = $('#currentDay');
  var saveBtn = $('.saveBtn');
  var today = dayjs();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage
  
  var handleClick = function(event) {
    event.preventDefault();
    var hourId = $(this).parent().attr('id').split('-')[1];
    console.log(hourId);
    var eventText = $(this).prev().val();
    localStorage.setItem('hour-' + hourId, eventText);  
  }

  var startHour = dayjs().startOf('day').hour(9);

  // retrieve saved events
  for (var i = 9; i <= 17; i++) {
    var hour = startHour.format('h A');
    $('#hour-' + i).val(localStorage.getItem('hour-' + i));
    var timeBlock = `<div id="hour-${hour.split(" ")[0]}" class="row time-block past">
      <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`
    mainContainer.append(timeBlock);
    startHour = startHour.add(1, 'hour');
  }

  saveBtn.on('click', handleClick);

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      var hour = parseInt($(this).prev().text().split(/am|pm/i)[0]);
      if (hour < currentHour) {
        $(this).addClass('past');
      } else if (hour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  updateTimeBlocks();
  setInterval(updateTimeBlocks, 60000);

  // TODO: Add code to display the current date in the header of the page.
  currentDay.text(today.format("dddd, MMMM DD"));
});

