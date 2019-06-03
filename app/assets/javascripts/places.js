// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

const initMap = (lat, lng) => {
    const myCoords = new google.maps.LatLng(lat, lng);
    const mapOptions = {
        center: myCoords,
        zoom: 14
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    new google.maps.Marker({
        position: myCoords,
        map: map
    });
};

const initMap2 = () => {
    let lat = document.getElementById('place_latitude').value;
    let lng = document.getElementById('place_logitude').value;

    // if not defined create default position
    if (!lat || !lng){
        lat=51.5;
        lng=-0.125;
        document.getElementById('place_latitude').value = lat;
        document.getElementById('place_logitude').value = lng;
    }
    const myCoords = new google.maps.LatLng(lat, lng);
    const mapOptions = {
        center: myCoords,
        zoom: 14
    };
    const map = new google.maps.Map(document.getElementById('map2'), mapOptions);
    const marker = new google.maps.Marker({
        position: myCoords,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true
    });
    // refresh marker position and recenter map on marker
    const refreshMarker = () => {
        let lat = document.getElementById('place_latitude').value;
        let lng = document.getElementById('place_logitude').value;
        const myCoords = new google.maps.LatLng(lat, lng);
        marker.setPosition(myCoords);
        map.setCenter(marker.getPosition());
    }
    // when input values change call refreshMarker
    document.getElementById('place_latitude').onchange = refreshMarker;
    document.getElementById('place_logitude').onchange = refreshMarker;
    // when marker is dragged update input values
    marker.addListener('drag', function() {
        latlng = marker.getPosition();
        newlat=(Math.round(latlng.lat()*1000000))/1000000;
        newlng=(Math.round(latlng.lng()*1000000))/1000000;
        document.getElementById('place_latitude').value = newlat;
        document.getElementById('place_logitude').value = newlng;
    });
    // When drag ends, center (pan) the map on the marker position
    marker.addListener('dragend', function() {
        map.panTo(marker.getPosition());
    });
}
