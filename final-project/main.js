class eventMarkers {}
let map;
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
            color: "#333739",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#2ecc71",
          },
        ],
      },
      {
        featureType: "poi",
        stylers: [
          {
            color: "#2ecc71",
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
            color: "#2ecc71",
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
            color: "#2ecc71",
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
            color: "#2ecc71",
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
            color: "#ffffff",
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
            color: "#333739",
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
            color: "#2ecc71",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#333739",
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

  var maincolor = "#D9D9D9";
  // for (var i = 0; i < json.page.size; i++) {
  //   addMarker(map, json._embedded.events[i]);
  // }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
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

function showPosition(position) {
  var x = document.getElementById("location");
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
  var latlon = position.coords.latitude + "," + position.coords.longitude;

  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?{kshjKAwSA1epUdiKUQuDvHKBAmMaubAC}" +
      latlon,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      var e = document.getElementById("events");
      e.innerHTML = json.page.totalElements + " events found.";
      showEvents(json);
      initMap(position, json);
    },
    error: function (xhr, status, err) {
      console.log(err);
    },
  });
}

function showEvents(json) {
  for (var i = 0; i < json.page.size; i++) {
    $("#events").append("<p>" + json._embedded.events[i].name + "</p>");
  }
}

function addMarker(map) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(
      // event._embedded.venues[0].location.latitude,
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

// getLocation();
window.initMap = initMap;
addMarker(map);
