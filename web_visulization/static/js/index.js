//function for dropdown menu and initial graphs 
function init() {
    d3.json('/data/croplist').then((data) => {
        //select the dropdown.
        var menu = d3.select("#selDataset");

        //states.filter(onlyUnique)
        var uniqueCrops = data[0].crops
        uniqueCrops.forEach((crop) => {
            menu.append("option").text(crop).property("value", crop);
        });
        //creating function for initial plots 
        var initSample = uniqueCrops[0]
        console.log(initSample)
        createMap(initSample);
        graphs(initSample);
    })
};

function createMap(commodity) {
    //removing map if already exist
    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    // Create a map object.
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4
    });
    // Define a markerSize() function that will give each city a different radius based on its population.
    function markerSize(value) {
        return Math.sqrt(value) * 2;
    }

    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    d3.json('/data/all_crops').then((data) => {

        for (var i = 0; i < data.length; i++) {
            var d = data[i]
            //console.log(d);

            if (d.Commodity == commodity) {

                // Setting the marker 
                L.circle([d.Lat, d.Lon], {
                    color: "blue",
                    fillColor: "black",
                    fillOpacity: 0.75,
                    radius: markerSize(d.Value)
                }).bindPopup(`<h1>${d.County},${d.State}</h1>  <hr> <h3>Total sell:$ ${d.Value.toLocaleString()}</h3>`)
                    .addTo(myMap);
            }

        }
    });
}

function graphs(commodity) {

    d3.json("/data/scraper/" + commodity).then((data) => {
        var initTitle = d3.select("#sample-metadata-t");
        initTitle.html("");
        initTitle.append("h3").text(` Headlines for ${commodity}`);
        //select demographic table
        var initTable = d3.select("#sample-metadata");
        var title = data[0].news_title
        var parg = data[0].news_p

        //clearing table data
        initTable.html("");

        initTable.append("h5").text(`Title: ${title}`);
        initTable.append("p").text(`${parg}`);

        //news-img

        var news_image = data[0].news_image_url
        console.log(news_image)

        var initImg = d3.select("#sample-metadata-img");
        initImg.html("")

        initImg.append("svg").attr(`${news_image}`)
            .attr("width", "20")
            .attr("height", "40");

    });
};
function optionChanged(newSample) {
    createMap(newSample);
    graphs(newSample)
};

init();