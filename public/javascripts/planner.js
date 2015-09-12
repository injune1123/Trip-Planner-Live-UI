$(document).ready(function() {

  /**
   *   ITINERARY ITEMS
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

  var added = [];
  var dayItineraries = []; 
  var dayToAdd = 1;
  var currentDay;

  function addItineraryItem(button, info, itinerary, itemName) {
    button.click(function(event) {
      event.preventDefault();

      var $currentItemId = info.val();
      var item = data[itemName];

      var currentItem = _.find(item, { _id: $currentItemId });

      var itineraryToUpdate = _.find(dayItineraries, { 'dayNumber': currentDay });

      itineraryToUpdate[itemName.toLowerCase()].push(currentItem.name);
     
      // if (added.indexOf($currentItemId) === -1) {
        itinerary.append('<li class="col-sm-10">' + currentItem.name + '&nbsp;&nbsp;<i class="glyphicon glyphicon-minus-sign" id="' + currentItem.name.split(' ')[0] + '"" style="font-size: 10px; cursor: pointer;"></i></li>');
        added.push($currentItemId);

        var icon = $('#' + currentItem.name.split(' ')[0]);

        icon.click(function(event) {
          event.preventDefault();
          
          $(this).parent().remove();
          
          // _.remove(added, item => item === $currentItemId);

          _.remove(itineraryToUpdate[itemName.toLowerCase()], function(item) {
            return item === currentItem.name;
          });

        });
      // }
    });
  }

  addItineraryItem($hotelsButton, $hotelsInfo, $hotelsItinerary, 'Hotels');
  addItineraryItem($restaurantsButton, $restaurantsInfo, $restaurantsItinerary, 'Restaurants');
  addItineraryItem($activitiesButton, $activitiesInfo, $activitiesItinerary, 'Activities');

  /**
   *    DAYS
   */

   var $addDayButton = $("#addDayButton");
   var $removeDayButton = $("#removeDayButton");

   var $days = $("#dayPanel");

   $addDayButton.click(function(event){

      event.preventDefault();

      $days.append('<div><button class="btn btn-default day-button" id="' + dayToAdd + '">Day ' + dayToAdd +'</button> <i class="glyphicon glyphicon-minus-sign dayRemoveButton" style="font-size: 10px; cursor: pointer;"></i></div>');

      var currentItinerary = {
        dayNumber: dayToAdd.toString(),
        hotels: [],
        restaurants: [],
        activities: []
      }

      $('#' + dayToAdd).click(function(event) {
        event.preventDefault();
        currentDay = $(this).attr('id');

        var thisItinerary = _.find(dayItineraries, { 'dayNumber': $(this).attr('id') })

        $hotelsItinerary.empty();
        $restaurantsItinerary.empty();
        $activitiesItinerary.empty();

        // THIS itemName refers to a different type of thing than the above itemName
        function addOldInfo(type, itemName) {
          var $list = $('#' + type + 'Itinerary');

          $list.append('<li class="col-sm-10">' + itemName + '&nbsp;&nbsp;<i class="glyphicon glyphicon-minus-sign" id="' + itemName.split(' ')[0] + '"" style="font-size: 10px; cursor: pointer;"></i></li>');

          var icon = $('#' + itemName.split(' ')[0]);

          icon.click(function(event) {
            event.preventDefault();
            
            $(this).parent().remove();

            _.remove(thisItinerary[type.toLowerCase()], function(item) {
              return item === itemName;
            });

            // _.remove(added, item => item === $currentItemId);
          });
          
        }

        thisItinerary.hotels.forEach(hotel => addOldInfo('Hotels', hotel));
        thisItinerary.restaurants.forEach(restaurants => addOldInfo('Restaurants', restaurants));
        thisItinerary.activities.forEach(activities => addOldInfo('Activities', activities));
      });
      
        $(".dayRemoveButton").click(function(event){
            event.preventDefault();
            var dayToDelete = $(this).prev().attr("id");
            _.remove(dayItineraries, item => item.dayNumber===dayToDelete);
            $(this).parent().remove();

        })


      dayItineraries.push(currentItinerary)
      dayToAdd++;
   });

});