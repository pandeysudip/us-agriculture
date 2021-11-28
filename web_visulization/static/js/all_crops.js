// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});


// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json('/data/all_crops').then((data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var d = data[i]
        // Setting the marker 
        L.circle([d.Lat, d.Lon], {
            color: "red",
            fillColor: "red",
            fillOpacity: 0.75,
            radius: 1500
        })
            .bindPopup(`<h1>${d.County},${d.State}</h1><hr> <p>Total sell:$ ${d.Value.toLocaleString()}</p><hr> <p>Commodity: ${d.Commodity}</h3>`)
            .addTo(myMap);
    }
});


