// loading data
// Define arrays to hold corn.
var cornMarkers = [];
d3.json('/data/crops').then((data) => {

    for (var i = 0; i < 10; i++) {
        // Setting the marker 
        cornMarkers.push(
            L.circle([data[i].Lat, data[i].Lon], {
                stroke: false,
                fillOpacity: 0.75,
                color: "black",
                fillColor: "red"
            })
        );

    }
});
console.log(cornMarkers);

// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// water color 
var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});

// dark map 
var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
});

// google street 
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

//google satellite
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Create a baseMaps object to hold the streetmap layer.
var baseMaps = {
    "Street Map0": streetmap,
    "Street Map1": streetmap,
    "Street Map": streetmap,
    "Water Color": watercolor,
    "Dark": dark,
    "Google Street": googleStreets,
    "Google Sat": googleSat
};
// Create  layer groups: 
var corn = L.layerGroup(cornMarkers);

// Create an overlay object to hold our overlay.
var overlayMaps = {
    "Crops Marker": corn
};

// Create our map, giving it the streetmap and earthquakes layers to display on load.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [googleStreets, corn]
});

// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
