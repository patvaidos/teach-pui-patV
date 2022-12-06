// class SearchObject {
//   constructor(defaultValue, currentValue){
//     this.defaultValue = defaultValue;
//     this.currentValue = currentValue;
//   }
// }

var infoClicked = false;
function initMap() {
  // var mapDiv = document.getElementById("map");
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 40.4406, lng: -79.9959 },
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#D9D9D9",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
        ],
      },
      {
        featureType: "poi",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: -7,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: -28,
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            visibility: "on",
          },
          {
            lightness: -15,
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: -18,
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#2ecc71",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#2ecc71",
          },
          {
            lightness: -34,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#000000",
          },
          {
            weight: 0.8,
          },
        ],
      },
      {
        featureType: "poi.park",
        stylers: [
          {
            color: "#000000",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000",
          },
          {
            weight: 0.3,
          },
          {
            lightness: 10,
          },
        ],
      },
    ],
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
    },
    disableDefaultUI: true,
    mapTypeControl: false,
    scaleControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  addMarker(map);
}

//Need to add function that assigns the attractionId variable as the search bar input
//add event listener that runs this func only after enter or search button is pressed.
function getSearch() {
  var currentVal = document.getElementById("searchInput");
  const SEARCHDEFAULT = document.getElementById("searchInput");
  if (currentVal !== SEARCHDEFAULT) {
    return currentVal;
  } else {
    return "Search Query"; //figure out what to return here
  }
}
function getEventDetails() {
  var currentVal = getSearch();
  console.log(currentVal);
  //clean this up later its atrocious
  var attractionId = currentVal;
  return attractionId; //do something about this return idk
}
//Gets geolocation of browser user. Browser will automatically ask users for permission in order to access latitude and longitude values.
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
    console.log(
      "current location: " +
        navigator.geolocation.getCurrentPosition(showPosition, showError)
    );
  } else {
    var x = document.getElementById("location");
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

//Find events from Discovery API and filter results
function showPosition(position) {
  //Find the events
  // var x = document.getElementById("location");
  // x.innerHTML =
  //   "Latitude: " +
  //   position.coords.latitude +
  //   "<br>Longitude: " +
  //   position.coords.longitude;
  // var latlon = position.coords.latitude + "," + position.coords.longitude;
  var attractionId = getEventDetails();

  //Filter the results
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=kshjKAwSA1epUdiKUQuDvHKBAmMaubAC&attractionId=" +
      attractionId, //event search -- filters by lat.long -- replace with artists name
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      var e = document.getElementById("events");
      e.innerHTML = json.page.totalElements + " events found.";
      showEvents(json); //adds events to the DOM
      initMap(position, json); //why does this need position??? in case this crashes: position, json;
      console.log(position);
    },
    error: function (xhr, status, err) {
      console.log(err);
    },
  });
}

//Gets event objects from the filtered results and appends to
// function showEvents(json) {
//   for (var i = 0; i < json.page.size; i++) {
//     $("#events").append("<p>" + json._embedded.events[i]._links + "</p>");
//   }
// }
9;
//Adds events to the DOM as a list
function showEvents(json) {
  for (var i = 0; i < json.page.size; i++) {
    $("#events").append("<p>" + json._embedded.events[i].name + "</p>");
  }
}

//Adds these events onto the map
function addMarker(map) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(
      // event._embedded.venues[0].location.latitude, //replace these with the events' lat/long filtered by artist name, event details
      // event._embedded.venues[0].location.longitude
      41.8781,
      -87.6298
    ),
    map: map,
  });
  marker.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
  marker.setMap();
  console.log(marker);
}

window.initMap = initMap;
getLocation();
//Event listeners for navbar
function homebuttonClick() {
  console.log("Home Button Clicked");
}

document
  .querySelector("#searchIcon")
  .addEventListener("click", homebuttonClick);

function questionMarkClick() {
  console.log("Question Button Clicked");
  if (infoClicked == false) {
    on();
    infoClicked = true;
  }
}

document
  .querySelector("#questionMarkIcon")
  .addEventListener("click", questionMarkClick());

function bookmarkClick() {
  console.log("Bookmark Button Clicked");
}

document
  .querySelector("#bookmarkicon")
  .addEventListener("click", bookmarkClick());

//Event listeners for info overlay
function on() {
  document.getElementById("info-overlay").style.display = "block";
  document.getElementById("info").style.display = "block";
  console.log("infoCLicked:" + infoClicked);
  console.log("on");
}

function off() {
  document.getElementById("info-overlay").style.display = "none";
  document.getElementById("info").style.display = "none";
  infoClicked = false;
  console.log("infoCLicked:" + infoClicked);
  console.log("off");
}
