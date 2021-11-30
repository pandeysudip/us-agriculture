
function markerSize(value) {
    return (value) * 1400;
}
function getColor(d) {
    return d > 25 ? 'red' :
        d > 20 ? 'pink' :
            d > 15 ? 'orange' :
                d > 10 ? 'yellow' :
                    d > 5 ? 'blue' :
                        d > -5 ? 'green' :
                            'white';
}
// Perform a GET request to the query URL/
d3.json('/data/weather').then((data) => {
    var wMarkers = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i]
        // Setting the marker 
        wMarkers.push(
            L.circle([d.Lat, d.Lon], {
                color: "black",
                fillColor: getColor(d.Max_temp),
                fillOpacity: 0.75,
                radius: markerSize(d.Max_temp)
            })
                .bindPopup(`<h4>${d.County},${d.State}</h4> <hr> <p> Max Temp:${d.Max_temp}C</p> <hr> <p> Min Temp:${d.Min_temp}C</p><hr> <p> Description:${d.Description}</p> <hr> <p> Feels like:${d.Feels_like}</p>`)

        )
    }
    var weatherdata = L.layerGroup(wMarkers);

    // Send our earthquakes layer to the createMap function/
    createMap(weatherdata);
});

function createMap(weatherdata) {

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

    // Create an overlay object to hold our overlay.
    var overlayMaps = {
        Weather: weatherdata
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [googleStreets, weatherdata]
    });

    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend = L.control({ position: 'topleft' });

    // Then add all the details for the legend
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");

        var grades = ["-20 - -5", "-5 - 5", "5 - 10", "10 - 15", "15 - 20", "20 - 25", "25+"];
        var colors = [
            'gray',
            'green',
            'blue',
            'yellow',
            'orange',
            'pink',
            'red',
        ];
        var legendInfo = "<h6>Temp(°C)</h6>" +
            "<div class=\"labels\">" + "</div>";
        var allLabels = [];
        for (var i = 0; i < grades.length; i++) {
            allLabels.push('<li style\="background:' + colors[i] + '"\">' + grades[i] + '</li>');
        }
        div.innerHTML = legendInfo;
        div.innerHTML += "<ul>" + allLabels.join("") + "</ul>";
        return div;

    };

    // Finally, we our legend to the map.
    legend.addTo(myMap);
};