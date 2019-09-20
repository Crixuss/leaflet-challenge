function createMap(markersLayer) {
    const light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
      });
    let baseMaps = {
        'Light Map': light
    };
    let overelayMaps = {
        'Earthquakes': markersLayer
    };
    let map = L.map('map', {
        center: [38.045984, -98.645964],
        zoom: 4,
        layers: [light, markersLayer]
    });
}


function chooseColor(magnitude){
    if (magnitude > 5) {
        return 'red'
    } else if (magnitude > 4) {
        return '#ff5959'
    } else if (magnitude > 3) {
        return 'orange'
    } else if (magnitude > 2) {
        return 'gold'
    } else if (magnitude > 1) {
        return 'yellowgreen'
    } else {
        return 'greenyellow'
    }
};

function createMarkers(response) {
    console.log(response.features);
    let coords = response.features;
    let markers = [];
    coords.forEach(coord => {
        let marker = L.circleMarker([coord.geometry.coordinates[1], coord.geometry.coordinates[0]], {radius: (coord.properties.mag * 3), color: 'black', weight: .5, fillColor: chooseColor(coord.properties.mag), fillOpacity: 1});
        markers.push(marker)});
    let markersLayer = L.layerGroup(markers);
    createMap(markersLayer);
}


d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson', createMarkers);