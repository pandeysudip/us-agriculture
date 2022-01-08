
//function for dropdown menu and initial graphs 
function init() {
    d3.json('/data/croplist').then((data) => {
        //select the dropdown.
        var menu = d3.select("#selDataset");
        console.log(data)
        //states.filter(onlyUnique)
        var uniqueCrops = data[0].crops
        uniqueCrops.forEach((crop) => {
            menu.append("option").text(crop).property("value", crop);
        });
        //creating function for initial plots 
        var initSample = uniqueCrops[9]
        console.log(initSample)
        createMap(initSample);
        graphs(initSample);
    })
};

function createMap(commodity) {
    //removing map if already exist
    var container = L.DomUtil.get('map1');
    if (container != null) {
        container._leaflet_id = null;
    }

    // Create a map object.
    var myMap = L.map("map1", {
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
        var initimg = d3.select("#sample-metadata-img");
        initimg.html("");


        var url = data[0].news_image_url;

        console.log(url)
        var image = new Image();
        image.src = url + ".png";

        document.getElementById('sample-metadata-img').appendChild(image);

        var initpic = d3.select("#sample-metadata-pic");
        initpic.html("");

        var url2 = data[0].image;
        console.log(url2)

        var image2 = new Image();
        image2.src = url2;
        document.getElementById('sample-metadata-pic').appendChild(image2);

    });
};
function optionChanged(newSample) {
    createMap(newSample);
    graphs(newSample)
};
init();