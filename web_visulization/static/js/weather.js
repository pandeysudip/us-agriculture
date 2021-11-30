// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});


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
// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json('/data/weather').then((data) => {

    for (var i = 0; i < data.length; i++) {
        var d = data[i]
        // Setting the marker 
        L.circle([d.Lat, d.Lon], {
            color: "black",
            fillColor: getColor(d.Max_temp),
            fillOpacity: 0.75,
            radius: markerSize(d.Max_temp)
        })
            .bindPopup(`<h4>${d.County},${d.State}</h4> <hr> <p> Max Temp:${d.Max_temp}C</p> <hr> <p> Min Temp:${d.Min_temp}C</p><hr> <p> Description:${d.Description}</p> <hr> <p> Feels like:${d.Feels_like}</p>`)
            .addTo(myMap);

    }

});

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