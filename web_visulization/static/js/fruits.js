function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//function for dropdown menu and initial graphs 
function init() {
    d3.json('/data/fruits').then((data) => {
        //select the dropdown.
        var menu = d3.select("#selDataset");
        //var uniqueState = states.filter(onlyUnique);
        var crops = []
        for (let i = 0; i < 3000; i++) {
            c = data[i].Commodity
            crops.push(c);
        }
        //states.filter(onlyUnique)
        var uniqueCrops = crops.filter(onlyUnique)
        uniqueCrops.forEach((crop) => {
            menu.append("option").text(crop).property("value", crop);
        });
        //creating function for initial plots 
        var initSample = data.uniqueCrops
        createMap(initSample);
    })
};

function createMap(commodity) {
    // Create a map object.
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5
    });
    // Define a markerSize() function that will give each city a different radius based on its population.
    function markerSize(value) {
        return Math.sqrt(value) * 2;
    }

    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    d3.json('/data/crops').then((data) => {

        for (var i = 0; i < data.length; i++) {
            if (data[i].Commodity == commodity) {
                var d = data[i]
                // Setting the marker 
                L.circle([d.Lat, d.Lon], {
                    color: "black",
                    fillColor: "green",
                    fillOpacity: 0.75,
                    radius: markerSize(d.Value)
                })
                    .bindPopup(`<h1>${d.County},${d.State}</h1> <hr> <h3> Max Temp:${d.Max_temp}C</h3> <hr> <h3>Total sell:$ ${d.Value.toLocaleString()}</h3>`)
                    .addTo(myMap);


            }

        }
    });

};

function optionChanged(newSample) {
    createMap(newSample);
};

init();