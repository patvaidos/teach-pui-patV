//Global variables declared here
let map;
let markers = [];
let infoClicked = false;
let keyword;

//Initiates map with style and position defaults
function initMap() {
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
}

//Event handler for the search
document
  .querySelector("#search-button")
  .addEventListener("submit", getEventDetails);

function getEventDetails() {
  let e = document.getElementById("events1");
  e.innerHTML = " ";
  let t = document.getElementById("upcomingtoursTitle");
  t.innerHTML = "Upcoming Tours";
  const searchInput = document.getElementById("search-input");

  let currentVal = searchInput.value;

  keyword = currentVal;
  showPosition();
}

//Gets geolocation of browser user. Browser will automatically ask users for permission in order to access latitude and longitude values.
//This also runs showPosition() so that you can get the filtered results
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    let x = document.getElementById("location");
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
  //Filter the results
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=kshjKAwSA1epUdiKUQuDvHKBAmMaubAC&keyword=" +
      keyword,
    async: true,
    dataType: "json",
    success: function (json) {
      if (keyword != undefined) {
        let n = document.getElementById("artistname");
        n.innerHTML = keyword;
      }

      showEvents(json);
      initMap();
    },
    error: function (xhr, status, err) {
      let r = document.getElementById("notFound");
      r.innerHTML = "No events were found under the name " + keyword;
      console.log(err);
    },
  });
}

//Retrieves event information and displays it on the DOM. This also retrieves the event's coordinates and
//feeds it into the addMarker() function as an input.
function showEvents(json) {
  let lat;
  let long;

  for (let i = 0; i < json.page.size; i++) {
    $("#events1").append(
      "<p" +
        "id='eventname'>" +
        json._embedded.events[i].name +
        "</p>" +
        "<p id='eventdate'>" +
        json._embedded.events[i].dates.start.localDate +
        "</p>" +
        "<p id='eventlocation'>" +
        json._embedded.events[i]._embedded.venues[0].city.name +
        ", " +
        json._embedded.events[i]._embedded.venues[0].state.stateCode +
        ", " +
        json._embedded.events[i]._embedded.venues[0].country.countryCode +
        "</p>" +
        "<p id='venue'>" +
        json._embedded.events[i]._embedded.venues[0].name +
        "</p>" +
        "<p>" +
        "<a id='link' href=" +
        json._embedded.events[i].url +
        ">" +
        "Click here for more info" +
        "</p>"
    );

    lat = parseFloat(
      json._embedded.events[i]._embedded.venues[0].location.latitude
    );

    long = parseFloat(
      json._embedded.events[i]._embedded.venues[0].location.longitude
    );

    addMarker(lat, long);
  }
}

//Adds markers onto the map
function addMarker(lati, long) {
  let marker = new google.maps.Marker({
    position: { lat: lati, lng: long },
  });
  markers.push(marker);

  marker.setMap(map);
}

//Removes location markers from the map.
function removeMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

window.initMap = initMap;
getLocation();

//Event listeners for navbar
function homebuttonClick() {
  console.log("Home Button Clicked");
}

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
  console.log("off");
}
