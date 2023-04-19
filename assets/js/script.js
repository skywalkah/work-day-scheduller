$(document).ready(function () {

  // Lets set some variables
  // Our work day begins at 9am
  var startHour = 9;
  // Our work day ends at 5pm
  var endHour = 17;
  // The container where we will append all of our time-blocks
  var container = $('.container-lg');

  // Lets build the time-blocks
  for (var i = startHour; i <= endHour; i++) {
    // Set current hour with day.js with 12-hour clock ('h') and AM/PM ('A')
    var hour = dayjs().hour(i).format('h A');
    // Time block row with the hour-id and data attribute so that we can apply the past, present, 
    // or future class to each time block by comparing the id to the current hour.
    var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + [i]).attr('data',[i]);
    // Lets the hours to each .hour box
    var hourBlock = $('<div>').addClass('col-2 col-md-1 hour text-center').text(hour);
    // Lets create the task description textarea
    var descriptionBlock = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows','3');
    // Lets create the button that will save each task
    var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    // Lets create the font awesome save icon
    var saveIcon = '<i class="fas fa-save" aria-hidden="true"></i>';
    // Now we simply append the elements in the right order
    // Add the icon to the button
    saveButton.append(saveIcon);
    // Add .hour, .description, save button to the time-block
    timeBlock.append(hourBlock, descriptionBlock, saveButton);
    // Add the time-block to the container in the DOM
    container.append(timeBlock);
  }

  // Lets set the current hour using day.js
  var currentHour = dayjs().hour();
  
  // Lets check each time-block abd add past, present & future classes
  $('.time-block').each(function () {
    // This is not the actual hour, we get the data because it was easier to use consecutive numbers to match the hour
    var hour = $(this).attr('data');
    // If the current block's hour is less that the current hour
    if (hour < currentHour) {
      // Add .past class
      $(this).addClass('past');
    // If the current block's hour equals the current hour
    } else if (hour == currentHour) {
      // Add .present class
      $(this).addClass('present');
    // If the current block's hour is after the current hour
    } else {
      //  Add .future class
      $(this).addClass('future');
    }
  });

  // Adding an event listener to each one of the save buttons 
  $('.saveBtn').click(function () {
    // Lets get the text from the .description sibling of the button
    var eventText = $(this).siblings('.description').val();
    // Lets get the hour from the .hour box, sibling of the button, parse it as an integer, to use it as the id
    var eventHour = parseInt($(this).siblings('.hour').text());
    // Lets save them to localStorage
    localStorage.setItem('hour-' + eventHour, eventText);
  });

  // As soon as the page loads, lets get the saved tasks from localStorage
  $('.time-block').each(function () {
    // Let's get the hour from the .hour box
    var hour = parseInt($(this).find('.hour').text());
    // Let's match the saved task's id to the hour box above to ensure we add them in the right place
    var eventText = localStorage.getItem('hour-' + hour);
    // If the id exists, lets get its description (or task) to the time-block (this)
    if (eventText) {
      $(this).find('.description').val(eventText);
    }
  });

  // Let's use dayjs to display the current date in the header of the page
  var today = dayjs().format('dddd, MMMM DD');
  $('#currentDay').text(today);
  
});
