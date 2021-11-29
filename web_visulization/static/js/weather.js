// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});


// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json('/data/weather').then((data) => {

    for (var i = 0; i < data.length; i++) {
        var d = data[i]
        console.log(d)
        // Setting the marker 
        L.circle([d.Lat, d.Lon], {
            color: "red",
            fillColor: "red",
            fillOpacity: 0.75,
            radius: 1500
        })
            .bindPopup(`<h4>${d.County},${d.State}</h4> <hr> <p> Max Temp:${d.Max_temp}C</p> <hr> <p> Min Temp:${d.Min_temp}C</p><hr> <p> Description:${d.Description}</p> <hr> <p> Feels like:${d.Feels_like}</p>`)
            .addTo(myMap);

    }
});