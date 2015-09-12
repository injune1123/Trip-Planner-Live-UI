$(document).ready(function() {

  /**
   *   ADD ITINERARY ITEMS
   */
  var $hotelsButton      = $('.hotels-button');
  var $restaurantsButton = $('.restaurants-button');
  var $activitiesButton   = $('.activities-button');

  var $hotelsInfo      = $('#Hotels');
  var $restaurantsInfo = $('#Restaurants');
  var $activitiesInfo  = $('#Activities');

  var $hotelsItinerary      = $('#HotelsItinerary')
  var $restaurantsItinerary = $('#RestaurantsItinerary');
  var $activitiesItinerary  = $('#ActivitiesItinerary');

  function addItineraryItem(button, info, itinerary, itemName) {
    button.click(function(event) {
      event.preventDefault();

      var $currentItemId = info.val();
      var item = data[itemName];

      var currentItem = _.find(item, { _id: $currentItemId });

      itinerary.append('<li>' + currentItem.name + '</li>');
    });
  }

  addItineraryItem($hotelsButton, $hotelsInfo, $hotelsItinerary, 'Hotels');
  addItineraryItem($restaurantsButton, $restaurantsInfo, $restaurantsItinerary, 'Restaurants');
  addItineraryItem($activitiesButton, $activitiesInfo, $activitiesItinerary, 'Activities');

  /**
   *    ADD DAYS
   */

   var dayItineraries = []; 
   var $addDayButton = $("#addDayButton");
   var $removeDayButton = $("#removeDayButton");


   var $days = $("#dayPanel");

   var currentDay = 1;

   $addDayButton.click(function(event){

      event.preventDefault();
      $days.append('<button class="btn btn-default day-button" id="' + currentDay + '">Day ' + currentDay +'</button>');

      var currentItinerary = {
        dayNumber: currentDay.toString(),
        hotels: null,
        restaurants: [],
        activities: []
      }

      $('#' + currentDay).click(function(event) {
        event.preventDefault();

        var thisItinerary = _.find(dayItineraries, { 'dayNumber': $(this).attr('id') })
        console.log(thisItinerary)
      })

      dayItineraries.push(currentItinerary)
      currentDay++;
   })

});