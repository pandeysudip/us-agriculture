// Initialized arrays
let county = []
let states = []
let commodity = []
let value = []


// For loop to populate arrays
for (let i = 0; i < fruits.length; i++) {
    row = fruits[i];
    county.push(row.County);
    states.push(row.State);
    commodity.push(row.Commodity);
    value.push(row.value);
}

// Trace1 
let trace1 = {
    x: county,
    y: value,
    type: "bar"
};


// Create data array
let data = [trace1];

// Apply a title to the layout
let layout = {
    title: "county plot"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);
