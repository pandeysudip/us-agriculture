// An array of cities and their locations

var cities = [
    {
        name: "New York",
        lat: 40.7128,
        lon: -74.0059,
        population: 8550405
    },
    {
        name: "Chicago",
        lat: 41.8781,
        lon: -87.6298,
        population: 2720546
    },
    {
        name: "Houston",
        lat: 29.7604,
        lon: -95.3698,
        population: 2296224
    },
    {
        name: "Los Angeles",
        lat: 34.0522,
        lon: -118.2437,
        population: 3971883
    },
    {
        name: "Omaha",
        lat: 41.2524,
        lon: -95.9980,
        population: 446599
    }
];


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
    "Street Map": streetmap,
    "Water Color": watercolor,
    "Dark": dark,
    "Google Street": googleStreets,
    "Google Sat": googleSat
};

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
//marker
// An array that will store the created cityMarkers
var cityMarkers = [];

for (var i = 0; i < cities.length; i++) {
    // loop through the cities array, create a new marker, and push it to the cityMarkers array
    cityMarkers.push(
        L.marker([cities[i].lat, cities[i].lon]).bindPopup("<h1>" + cities[i].name + "</h1>")
    );
}

// Add all the cityMarkers to a new layer group.
// Now, we can handle them as one group instead of referencing each one individually.
var cityLayer = L.layerGroup(cityMarkers);


// Create an overlay object to hold our overlay.
var overlayMaps = {
    "City Marker": cityLayer
};

// Create our map, giving it the streetmap and earthquakes layers to display on load.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [watercolor, cityLayer]
});

// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);



