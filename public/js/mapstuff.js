$( document ).ready(function() {
    console.log( "ready!" );
    initMap();
});

var mapLayers = {};
var map = null;


function setIcon(layer) {
    // Set a custom icon on each marker based on feature properties.
    layer.on('layeradd', function(e) {
        var marker = e.layer, feature = marker.feature;
        marker.setIcon(L.icon({
            "iconUrl": feature.properties.icon_path,
            "iconSize": [35, 50],
            "iconAnchor": [17, 50],
            "popupAnchor": [0, -5],
            "className": "dot"
        }));
    });
}

function initMap() {
    L.mapbox.accessToken = 'pk.eyJ1IjoieWFycnVtayIsImEiOiJVNVVkT2JvIn0.xja5Bz1L0dmNYUfNG3mlBw';

    map = L.mapbox.map('map', 'yarrumk.jg24a6oj').setView([53.3528823, -6.2349633], 12);

    L.control.locate().addTo(map);

    map.featureLayer.on('click', function(e) {
        map.panTo(e.layer.getLatLng());
    });

    mapLayers = {
        'all_shops': L.mapbox.featureLayer(),
        'closest_to_point': L.mapbox.featureLayer(),
        'closest_to_point_with_wifi': L.mapbox.featureLayer(),
        'closest_to_point_with_seats': L.mapbox.featureLayer(),
        '3fe_coffee': L.mapbox.featureLayer(),
        'roasted_brown_coffee': L.mapbox.featureLayer(),
        'cloud_picker_coffee': L.mapbox.featureLayer(),
        'full_circle_coffee': L.mapbox.featureLayer(),
        'breakfast': L.mapbox.featureLayer(),
        'pastry': L.mapbox.featureLayer(),
        'lunch': L.mapbox.featureLayer(),
        'hot_food': L.mapbox.featureLayer()
    };

    for (var layer in mapLayers) {
        setIcon(mapLayers[layer]);
    }

    mapLayers.all_shops.loadURL('/fs/all_shops.geojson');
    map.addLayer( mapLayers.all_shops );
}
