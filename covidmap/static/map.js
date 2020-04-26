"use strict";


var map = null;
var infowindow = null;
var markers = [];
var newMarkers = [];
var newMarkerIndex = 0;
var markerIndex = 0;
var iconBase = 'static/';


// Default to downtown Toronto
var defaultPosition = {
    coords: {
        latitude: 7.2858984,
        longitude: 80.6346887
    }
};


var getLocations = function (map, infoWindow, position, term) {

    var ajaxData = {
        limit: 10,
        radius: 200,
        sort: 'distance',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    if (term) {
        ajaxData.term = term;
    }

    $('.loc-loading-img').prop('hidden', false);

    $.ajax({
        method: "get",
        url: '/location',
        data: ajaxData
    }).done(function (data) {


        for (var i = 0; i < data.features.length; i++) {

            var address = data.features[i].properties.address;
            var name = data.features[i].properties.name;
            var cases = data.features[i].properties.cases;
            var info = data.features[i].properties.info;
            var lat = data.features[i].geometry.coordinates[0];
            var lng = data.features[i].geometry.coordinates[1];

            var marker = new google.maps.Marker({
                id: data.features[i].id,
                title: address,
                url: "business.url",
                position: {
                    lat: data.features[i].geometry.coordinates[0],
                    lng: data.features[i].geometry.coordinates[1]
                },
                map: map,
                icon: iconBase + 'patient.png'
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', (function (marker, key) {
                return function () {

                    var content = '<div> Address: ' + marker.title + '</div> <br> Loading .. <img class="loc-saving-img" src="static/loading_spinner.gif">';
                    infowindow.setContent(content);
                    infowindow.open(map, marker);

                    $.ajax({
                        method: "get",
                        url: '/location/' + marker.id,
                    }).done(function (data) {
                        console.log(data);

                        var popover = $(".location-update-popover").clone();
                        popover.find('#collapseExample').collapse('hide')
                        popover.css("visibility", "visible");
                        popover.find(".name").text("Covid-19 case");
                        popover.find(".address").text(data.properties.address);
                        popover.find(".place-name").text(data.properties.name);
                        popover.find(".numof-cases").text(data.properties.cases);
                        popover.find(".more-info").text(data.properties.info);

                        popover.find(".save-btn").css("visibility", "hidden");
                        popover.find(".update-btn").css("visibility", "visible");

                        popover.find("#marker-id").val(marker.id);
                        popover.find("#marker-index").val(marker.id);

                        popover.find("#loc-id").val(data.id);
                        popover.find("#address").val(data.properties.address);
                        popover.find("#lat").val(lat);
                        popover.find("#lng").val(lng);

                        var content = popover.get(0).outerHTML;

                        infowindow.setContent(content);
                        infowindow.open(map, marker);


                    }).fail(function (error) {
                        console.log("Unable to access");
                        console.log(error);
                    });

                    // var content = '<div><a target="_blank" href="' + marker.url + '">' + marker.title + '</a></div>';
                    // infowindow.setContent(content);
                    // infowindow.open(map, marker);
                };
            })(marker, marker.id));

            // google.maps.event.addListener(marker, 'click', (function (marker, key) {
            //     return function () {
            //         var popover = $(".location-update-popover").clone();

            //         popover.css("visibility", "visible");
            //         popover.find(".name").text("Covid-19 case");
            //         popover.find(".address").text(address);

            //         popover.find(".place-name1").text(name);

            //         popover.find("input[type=text].place-name").val(name);
            //         popover.find(".numof-cases").val(cases);
            //         popover.find(".more-info").val(info);

            //         var content = popover.get(0).outerHTML;

            //         var infowindow = new google.maps.InfoWindow({
            //             content: content
            //           });
            //         infowindow.open(map, marker);
            //     };
            // })(marker, i));

        }

        $('.loc-loading-img').prop('hidden', true);

    }).fail(function (error) {
        console.log("Unable to access yelp");
        console.log(error);
    });
};



var populateMap = function (geoPosition, term) {



    $('#geolocation').hide();

    infowindow = new google.maps.InfoWindow({
        content: "hello"
    });

    var position = geoPosition;
    if (!position) {
        position = defaultPosition;
    }
    position = defaultPosition;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        },
        zoom: 9
        // styles: [
        //     { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        //     { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        //     { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        //     {
        //         featureType: 'administrative.locality',
        //         elementType: 'labels.text.fill',
        //         stylers: [{ color: '#d59563' }]
        //     },
        //     {
        //         featureType: 'poi',
        //         elementType: 'labels.text.fill',
        //         stylers: [{ color: '#d59563' }]
        //     },
        //     {
        //         featureType: 'poi.park',
        //         elementType: 'geometry',
        //         stylers: [{ color: '#263c3f' }]
        //     },
        //     {
        //         featureType: 'poi.park',
        //         elementType: 'labels.text.fill',
        //         stylers: [{ color: '#6b9a76' }]
        //     },
        //     {
        //         featureType: 'road',
        //         elementType: 'geometry',
        //         stylers: [{ color: '#38414e' }]
        //     },
        //     {
        //         featureType: 'road',
        //         elementType: 'geometry.stroke',
        //         stylers: [{ color: '#212a37' }]
        //     },
        //     {
        //         featureType: 'road',
        //         elementType: 'labels.text.fill',
        //         stylers: [{ color: '#9ca5b3' }]
        //     },
        //     {
        //         featureType: 'road.highway',
        //         elementType: 'geometry',
        //         stylers: [{ color: '#746855' }]
        //     },
        //     {
        //         featureType: 'road.highway',
        //         elementType: 'geometry.stroke',
        //         stylers: [{ color: '#1f2835' }]
        //     },
        //     {
        //         featureType: 'road.highway',
        //         elementType: 'labels.text.fill',
        //         stylers: [{ color: '#f3d19c' }]
        //     },
        //     {
        //         featureType: 'transit',
        //         elementType: 'geometry',
        //         stylers: [{ color: '#2f3948' }]
        //     },
        //     {
        //         featureType: 'transit.station',
        //         elementType: 'labels.text.fill',
        //         stylers: [{ color: '#d59563' }]
        //     },
        //     {
        //         featureType: 'water',
        //         elementType: 'geometry',
        //         stylers: [{ color: '#17263c' }]
        //     },
        //     {
        //         featureType: 'water',
        //         elementType: 'labels.text.fill',
        //         stylers: [{ color: '#515c6d' }]
        //     },
        //     {
        //         featureType: 'water',
        //         elementType: 'labels.text.stroke',
        //         stylers: [{ color: '#17263c' }]
        //     }
        // ]
    });

    autoComplete(map);

    // Make info window for marker show up above marker
    var windowOptions = {
        pixelOffset: {
            height: -32,
            width: 0
        }
    };

    getLocations(map, infowindow, position);

    var geocoder = new google.maps.Geocoder();
    // var infowindow = new google.maps.InfoWindow();
    //var service = new google.maps.places.PlacesService(map);

    google.maps.event.addListener(map, 'click', function (event) {

        var address = "";
        var lat = "";
        var lng = "";

        geocoder.geocode({
            'latLng': event.latLng
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    address = results[0].formatted_address;
                    lat = event.latLng.lat();
                    lng = event.latLng.lng();
                }
            }
        });

        

        var marker = new google.maps.Marker({
            id: newMarkerIndex++,
            position: event.latLng,
            map: map, 
            icon: iconBase + 'temp_patient.png'
        });

        newMarkers.push(marker);

        google.maps.event.addListener(marker, 'click', (function (marker, key) {
            return function () {
                var popover = $(".location-update-popover").clone();
                popover.find('#collapseExample').collapse('hide')
                popover.find(".location-details").remove();

                popover.find(".save-btn").css("visibility", "visible");
                popover.find(".update-btn").css("visibility", "hidden");

                popover.css("visibility", "visible");
                popover.find(".name").text("A new Covid-19 case located.");
                popover.find(".new-loc-address").text("Address: " + address);

                popover.find("#marker-id").val(marker.id);
                popover.find("#address").val(address);
                popover.find("#lat").val(lat);
                popover.find("#lng").val(lng);

                var content = popover.get(0).outerHTML;
                infowindow.setContent(content);
                infowindow.open(map, marker);
            };
        })(marker, 1));

    });

};


var geolocationFail = function () {
    populateMap(defaultPosition);
};


var initMap = function () {
    if (navigator.geolocation) {
        var location_timeout = setTimeout(geolocationFail, 5000);

        navigator.geolocation.getCurrentPosition(function (position) {
            clearTimeout(location_timeout);
            populateMap(position);
        }, function (error) {
            clearTimeout(location_timeout);
            geolocationFail();
        });
    } else {
        // Fallback for no geolocation
        geolocationFail();
    }
};


var clearMarkers = function (markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
};

function deleteMarkers() {
    for (var i = 0; i < newMarkers.length; i++) {
        newMarkers[i].setMap(null);
    }
    newMarkers = [];
}

var autoComplete = function (map) {
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



function saveLocationInfo() {

    $('.loc-saving-img').prop('hidden', false);

    var placeName = $('#place-name').val();
    var numOfCaes = $('#numof-cases').val();
    var moreInfo = $('#more-info').val();

    if (placeName === "") {
        $(".error-msg").text("Place name is required.");
    }

    if (numOfCaes === "") {
        $(".error-msg1").text("Number of cases is required.");
    }

    if (moreInfo === "") {
        $(".error-msg2").text("More information is required.");
    }

    var markerId = $('#marker-id').val();
    var address = $('#address').val();
    var lat = $('#lat').val();
    var lng = $('#lng').val();

    var csrftoken = getCookie('csrftoken');

    var ajaxData = {
        name: placeName,
        address: address,
        cases: numOfCaes,
        info: moreInfo,
        point: "POINT(" + lat + " " + lng + ")"
    };


    $.ajax({
        method: "post",
        url: '/location',
        data: ajaxData,
        headers: { "X-CSRFToken": csrftoken }
    }).done(function (data) {

        populateSavedLodation(data.id, markerId);

    }).fail(function (error) {
        console.log("Unable to access yelp");
        console.log(error);
        $('.loc-saving-img').prop('hidden', true);
    });
}


function updateLocationInfo() {

    $('.loc-saving-img').prop('hidden', false);

    var placeName = $('#place-name').val();
    var numOfCaes = $('#numof-cases').val();
    var moreInfo = $('#more-info').val();

    if (placeName === "") {
        $(".error-msg").text("Place name is required.");
    }

    if (numOfCaes === "") {
        $(".error-msg1").text("Number of cases is required.");
    }

    if (moreInfo === "") {
        $(".error-msg2").text("More information is required.");
    }

    var address = $('#address').val();
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var locId = $('#loc-id').val();

    var csrftoken = getCookie('csrftoken');

    var ajaxData = {
        name: placeName,
        address: address,
        cases: numOfCaes,
        info: moreInfo,
        point: "POINT(" + lat + " " + lng + ")"
    };


    $.ajax({
        method: "PUT",
        url: '/location/' + locId,
        data: ajaxData,
        headers: { "X-CSRFToken": csrftoken }
    }).done(function (data) {
        console.log(data);
        $('.loc-saving-img').prop('hidden', true);
    }).fail(function (error) {
        console.log("Unable to access yelp");
        console.log(error);
        $('.loc-saving-img').prop('hidden', true);
    });
}

function removeNewLocation() {

    var markerId = $('#marker-id').val();

    newMarkers[markerId].setMap(null);
}

function removeLocation() {

    $('.loc-saving-img').prop('hidden', false);

    var locId = $('#marker-id').val();

    var csrftoken = getCookie('csrftoken');

    $.ajax({
        method: "DELETE",
        url: '/location/' + locId,
        headers: { "X-CSRFToken": csrftoken }
    }).done(function () {

        for (var i = 0; i < markers.length; i++) {
            if (markers[i].id == locId) {
                markers[i].setMap(null);
                break;
            }
        }

        $('.loc-saving-img').prop('hidden', true);

    }).fail(function (error) {
        console.log("Unable to access yelp");
        console.log(error);
        $('.loc-saving-img').prop('hidden', true);
    });

}

function populateSavedLodation(locId, markerId) {



    $.ajax({
        method: "get",
        url: '/location/' + locId,
    }).done(function (data) {

        var marker = new google.maps.Marker({
            id: data.id,
            title: address,
            url: "business.url",
            position: {
                lat: data.geometry.coordinates[0],
                lng: data.geometry.coordinates[1]
            },
            map: map,
            icon: iconBase + 'new_patient.png'
        });
        $('.loc-saving-img').prop('hidden', true);
        newMarkers[markerId].setMap(null);
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function (marker, key) {
            return function () {

                var content = '<div> Address: ' + marker.title + '</div> <br> Loading .. <img class="loc-saving-img" src="static/loading_spinner.gif">';
                infowindow.setContent(content);
                infowindow.open(map, marker);

                $.ajax({
                    method: "get",
                    url: '/location/' + marker.id,
                }).done(function (data) {
                    console.log(data);

                    var popover = $(".location-update-popover").clone();
                    popover.find('#collapseExample').collapse('hide')
                    popover.css("visibility", "visible");
                    popover.find(".name").text("Covid-19 case");
                    popover.find(".address").text(data.properties.address);
                    popover.find(".place-name").text(data.properties.name);
                    popover.find(".numof-cases").text(data.properties.cases);
                    popover.find(".more-info").text(data.properties.info);

                    popover.find(".save-btn").css("visibility", "hidden");
                    popover.find(".update-btn").css("visibility", "visible");

                    popover.find("#marker-id").val(marker.id);
                    popover.find("#marker-index").val(marker.id);

                    popover.find("#loc-id").val(data.id);
                    popover.find("#address").val(data.properties.address);
                    popover.find("#lat").val(lat);
                    popover.find("#lng").val(lng);

                    var content = popover.get(0).outerHTML;

                    infowindow.setContent(content);
                    infowindow.open(map, marker);


                }).fail(function (error) {
                    console.log("Unable to access");
                    console.log(error);
                });

                // var content = '<div><a target="_blank" href="' + marker.url + '">' + marker.title + '</a></div>';
                // infowindow.setContent(content);
                // infowindow.open(map, marker);
            };
        })(marker, marker.id));


    }).fail(function (error) {
        console.log("Unable to access");
        console.log(error);
    });

}