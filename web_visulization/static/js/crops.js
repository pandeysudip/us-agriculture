// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json('/data/crops').then((data) => {

    for (var i = 0; i < data.length; i++) {
        var d = data[i]
        // Setting the marker 
        L.circle([d.Lat, d.Lon], {
            color: "green",
            fillColor: "green",
            fillOpacity: 0.75,
            radius: 100
        })
            .bindPopup(`<h1>${d.County},${d.State}</h1> <hr> <h3>Total sell($): ${d.Value.toLocaleString()}</h3>`)
            .addTo(myMap);

    }
});
