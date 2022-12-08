// class SearchObject {
//   constructor(defaultValue, currentValue){
//     this.defaultValue = defaultValue;
//     this.currentValue = currentValue;
//   }
// }
// const SEARCHDEFAULT = "search default";
var map;
// let coords = [];
var infoClicked = false;
function initMap() {
  // var mapDiv = document.getElementById("map");
  if (map == null) {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
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
        mapTypeIds: [
          google.maps.MapTypeId.ROADMAP,
          google.maps.MapTypeId.HYBRID,
        ],
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
  }
  // const latlong = { lat: -25.363, lng: 131.044 };

  // map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 4,
  //   center: latlong,
  // });

  // new google.maps.Marker({
  //   position: latlong,
  //   map,
  //   title: "title",
  // });

  // addMarker();
  console.log("map done");
}
// const searchButton = document.getElementById("form-inline");

//Need to add function that assigns the attractionId variable as the search bar input
//add event listener that runs this func only after enter or search button is pressed.
function getSearch() {
  //--------------------CODE DUMP INBOUND----------------------//
  // var currentVal = document.getElementById("searchInput");
  // console.log("search default: " + SEARCHDEFAULT);
  // console.log("currentVal innerHTML: " + currentVal.innerHTML);

  // if (currentVal.innerHTML !== "Search artist to display tour dates") {
  //   return currentVal.innerHTML;
  // } else {
  //   return SEARCHDEFAULT;
  // }

  // console.log(searchInput);
  // searchButton.addEventListener("click", () => {
  //   const inputValue = searchInput.value;
  //   return inputValue;
  // });
  const searchInput = document.getElementById("search-input");
  console.log(searchInput.value);

  return searchInput.value;
  //figure out what to return here
}
let keyword;
//Event handler for the search
document
  .querySelector("#search-button")
  .addEventListener("submit", getEventDetails);

function getEventDetails() {
  // var currentVal = getSearch();
  var e = document.getElementById("events1");
  e.innerHTML = " ";
  var t = document.getElementById("upcomingtoursTitle");
  t.innerHTML = "Upcoming Tours";
  const searchInput = document.getElementById("search-input");
  console.log(searchInput.value);
  var currentVal = searchInput.value;
  console.log("got the keyword on like 178: " + currentVal);
  //clean this up later its atrocious
  keyword = currentVal;
  showPosition();
  // return keyword; //do something about this return idk
}
//Gets geolocation of browser user. Browser will automatically ask users for permission in order to access latitude and longitude values.
//This also runs showPosition() so that you can get the filtered results
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
//Pass in the keyword instead of the position, show all events.
function showPosition(position) {
  //Find the events
  // var x = document.getElementById("location");
  // x.innerHTML =
  //   "Latitude: " +
  //   position.coords.latitude +
  //   "<br>Longitude: " +
  //   position.coords.longitude;
  // var latlon = position.coords.latitude + "," + position.coords.longitude;
  // var keyword = getEventDetails();

  //Filter the results
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=kshjKAwSA1epUdiKUQuDvHKBAmMaubAC&keyword=" +
      keyword, // changed to keyword, much better :)
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      // var e = document.getElementById("events");
      // e.innerHTML = " Recent Attractions Near You: ";
      if (keyword != undefined) {
        var n = document.getElementById("artistname");
        n.innerHTML = keyword;
      }

      showEvents(json); //adds events to the DOM
      initMap();
      // initMap(position, json); //why does this need position??? in case this crashes: position, json;
      console.log("position:" + position);
    },
    error: function (xhr, status, err) {
      var r = document.getElementById("notFound");
      r.innerHTML = "No events were found under the name " + keyword;
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

//Gets the name of the event and shows is t
function showEvents(json) {
  let lat;
  let long;
  // var p = document.getElementById("placeholder");
  // console.log(json._embedded.events[i].images[0]);
  // p.src = json._embedded.events[i].images[0];

  //   $.ajax({
  //   type:"GET",
  //   url:"https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?apikey=kshjKAwSA1epUdiKUQuDvHKBAmMaubAC&keyword=",
  //   async:true,
  //   dataType: "json",
  //   success: function(json) {
  //               console.log(json);
  //               // Parse the response.
  //               // Do other things.
  //            },
  //   error: function(xhr, status, err) {
  //               // This time, we do not end up here!
  //            }
  // });

  // for (var i = 0; i < 2; i++) {
  for (var i = 0; i < json.page.size; i++) {
    // if (i <= 20) {
    $("#events1").append("<p>" + json._embedded.events[i].name + "</p>");

    // var date = document.getElementById("eventdate");
    // date.innerHTML = json._embedded.events[i].dates.start.localDate;

    // var city = document.getElementById("city");
    // city.innerHTML = json._embedded.events[i]._embedded.venues[0].city;

    // var state = document.getElementById("state");
    // state.innerHTML =
    //   json._embedded.events[i]._embedded.venues[0].state.stateCode;

    // var country = document.getElementById("country");
    // country.innerHTML =
    //   json._embedded.events[i]._embedded.venues[0].country.countryCode;

    // var venue = document.getElementById("venue");
    // venue.innerHTML = json._embedded.events[i]._embedded.venues[0].name;

    // $("#eventname").append("<p>" + json._embedded.events[i].name + "</p>");
    //   console.log(i);
    // } else if (i >= 5) {
    //   $("#events2").append("<p>" + json._embedded.events[i].name + "</p>");
    // }

    // console.log(json._embedded.events[i].name);

    lat = parseFloat(
      json._embedded.events[i]._embedded.venues[0].location.latitude
    );

    long = parseFloat(
      json._embedded.events[i]._embedded.venues[0].location.longitude
    );

    // latlong = json._embedded.events[i].latlong;

    console.log("adding marker");
    console.log(long);

    addMarker(lat, long); //takes the event object from json, gets the name of the event
  }
}

//Adds these events onto the map
//THIS IS RUNNING BUT WHY ISNT IT WORKING
function addMarker(lati, long) {
  console.log("add marker");
  console.log(lati, long);
  let latlong = { lati, long };
  console.log(latlong);
  let image = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  // console.log(latlong);
  console.log(this.map);

  var marker = new google.maps.Marker({
    position: { lat: lati, lng: long },
    // position: new google.maps.LatLng(lati, long),
    // map: this.map,
    // icon: image,
  });
  // markers.push(marker);

  // console.log(markers);
  // marker.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
  marker.setMap(map);
}

window.initMap = initMap;
getLocation();
//Event listeners for navbar
function homebuttonClick() {
  console.log("Home Button Clicked");
}

// document.querySelector("#searchIcon").addEventListener("onclick", getSearch());

function questionMarkClick() {
  console.log("Question Button Clicked");
  if (infoClicked == false) {
    on();
    infoClicked = true;
  }
}

document
  .querySelector("#questionMarkIcon")
  .addEventListener("onclick", questionMarkClick());

function bookmarkClick() {
  console.log("Bookmark Button Clicked");
}

// document
//   .querySelector("#bookmarkicon")
//   .addEventListener("onclick", bookmarkClick());

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
