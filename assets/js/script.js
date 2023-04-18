$(document).ready(function () {
  
  var startHour = 9;
  var endHour = 17;
  var container = $('.container-lg');

  for (var i = startHour; i <= endHour; i++) {
    var hour = dayjs().hour(i).format('h A');
    var timeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + [i]).attr('data',[i]);
    var hourBlock = $('<div>').addClass('col-2 col-md-1 hour text-center').text(hour);
    var descriptionBlock = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows','3');
    var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')
    var saveIcon = '<i class="fas fa-save" aria-hidden="true"></i>';
    saveButton.append(saveIcon);
    timeBlock.append(hourBlock, descriptionBlock, saveButton);
    container.append(timeBlock);
  }

  var currentHour = dayjs().hour();
  
  $('.time-block').each(function () {
    var hour = $(this).attr('data');
    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour == currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  $('.saveBtn').click(function () {
    var eventText = $(this).siblings('.description').val();
    var eventHour = parseInt($(this).siblings('.hour').text());
    localStorage.setItem('hour-' + eventHour, eventText);
  });

  $('.time-block').each(function () {
    var hour = parseInt($(this).find('.hour').text());
    var eventText = localStorage.getItem('hour-' + hour);
    if (eventText) {
      $(this).find('.description').val(eventText);
    }
  });

  var today = dayjs().format('dddd, MMMM DD');
  $('#currentDay').text(today);
  
});
