function initMap() {
  const hci_office = {
    lat: 40.4406,
    lng: 79.9959,
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    // Set the zoom of the map
    zoom: 17.56,
    center: hci_office,
  });
}

window.initMap = initMap;
