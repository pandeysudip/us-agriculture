console.log('hi')
var stateoption = "SC";
var typeoption = "Field Crops";
var cropoption = "Corn";
var uniquefieldcrop = [];
var uniquefruits = [];
var uniquevegetables = [];
var fielddata = [];
var fruitsdata = [];
var vegetablesdata = [];
var length2 = 0;

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//function for dropdown menu and initial graphs 
function init() {
    var agType = ["Field Crops", "Fruits", "Vegetables"];
    var menu1 = d3.select("#selDataset2");
    agType.forEach((type) => {
        menu1.append("option").text(type).property("value", type);
    });

    d3.json('/data/crops').then(function (data) {

        fielddata = data;
        var menu = d3.select("#selDataset1");
        //var uniqueState = states.filter(onlyUnique);
        var states = []
        for (let i = 0; i < 3000; i++) {
            s = data[i].State
            states.push(s)
        };
        var uniqueState = states.filter(onlyUnique)

        uniqueState.forEach((state) => {
            menu.append("option").text(state).property("value", state)
        });
        var menu = d3.select("#selDataset3");
        var field_crops = []
        for (let i = 0; i < 3000; i++) {
            s = data[i].Commodity
            field_crops.push(s)
        };

        //states.filter(onlyUnique)
        uniquefieldcrop = field_crops.filter(onlyUnique)
        uniquefieldcrop.forEach((crop) => {
            menu.append("option").text(crop)
        });

        d3.json('/data/fruits').then(function (data2) {

            fruitsdata = data2;
            var fruitsA = []
            for (let i = 0; i < 3000; i++) {
                s = data2[i].Commodity
                fruitsA.push(s)
            };

            //states.filter(onlyUnique)
            uniquefruits = fruitsA.filter(onlyUnique)

        });

        d3.json('/data/vegetables').then(function (data) {

            vegetablesdata = data;
            var vegetablesA = []
            for (let i = 0; i < 3000; i++) {
                s = data[i].Commodity
                vegetablesA.push(s)
            };

            //states.filter(onlyUnique)
            uniquevegetables = vegetablesA.filter(onlyUnique)
        });
    });

};

function optionChanged1(valor) {
    stateoption = valor;
    return stateoption
}

function optionChanged2(valor) {
    d3.select("#selDataset3").selectAll("option").remove();
    var menu = d3.select("#selDataset3");
    typeoption = valor;
    console.log(stateoption);
    console.log(typeoption);

    if (typeoption === "Field Crops") {
        cropoption = "Corn"
        uniquefieldcrop.forEach((crop) => {
            menu.append("option").text(crop)
        });
    }

    else if (typeoption === "Fruits") {
        console.log('here')

        cropoption = "Apples"
        uniquefruits.forEach((crop) => {
            menu.append("option").text(crop)
        });
    }

    else if (typeoption === "Vegetables") {
        cropoption = "Beans"
        uniquevegetables.forEach((crop) => {
            menu.append("option").text(crop)
        });
    }

    return typeoption
}

function optionChanged3(valor) {
    console.log(stateoption);
    console.log(typeoption);
    cropoption = valor;
    console.log(cropoption)
    //let bb = jsonname.map(function(item) {menu.append("option").text(item);

}

function selectdata(fielddatas) {
    return (fielddatas.State == stateoption) && (fielddatas.Commodity == cropoption);
}

function selectallstates(fielddatas) {
    return (fielddatas.Commodity == cropoption);
}

function createpie(dataselected) {
    console.log('createpie');
    let Piechartdata = dataselected.filter(selectdata);
    Piechartdata.sort(function (b, a) { return a.Value - b.Value; })
    console.log(Piechartdata);
    var Sales = [];
    var Counties = [];
    for (var i = 0; i < Piechartdata.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        Sales.push(Piechartdata[i].Value)
        Counties.push(Piechartdata[i].County)

    }
    let sales2 = Sales.slice(0, 10);
    let counties2 = Counties.slice(0, 10);

    var data = [{
        values: sales2,
        labels: counties2,
        type: "pie"
    }];

    var layout = {
        title: cropoption,
        height: 600,
        width: 900
    };

    Plotly.newPlot("pie", data, layout);

    var pietitle = d3.select("#PieTitle");
    d3.select("#PieTitle").selectAll("h3").remove();
    pietitle.append("h3").text("Top 10 Counties With Most Sales in " + stateoption);
    console.log(sales2)
    console.log(counties2)
    var Msize = 2;
    var Markersizes = [];
    for (var i = 0; i < Counties.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        Msize = Msize + 2;
        Markersizes.push(Msize);
    }
    Markersizes.sort(function (b, a) { return a - b; })

    var Color = 120;
    var Markerscolors = [];
    for (var i = 0; i < Counties.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        Color = Color + 10;
        Markerscolors.push(Color);
    }
    console.log(Markersizes)
    var trace2 = {
        x: Counties,
        y: Sales,
        text: Counties,
        mode: 'markers',
        marker: {
            //color: samplesid.otu_ids,
            color: Markerscolors,
            size: Markersizes

        }
    };

    var bubbledata = [trace2];

    var blayout = {
        title: cropoption,
        showlegend: false,
        height: 600,
        width: 1870
    };

    Plotly.newPlot('bubble', bubbledata, blayout);


    let Allstatesbycrop = dataselected.filter(selectallstates);
    console.log('allstates')
    console.log(Allstatesbycrop)
    Allstatesbycrop.sort(function (a, b) {
        if (a.State < b.State)
            return -1;
        if (a.State > b.State)
            return 1;
    })
    console.log(Allstatesbycrop)
    var AllStates = [];
    var TotalSales = [];

    var result = [];
    Allstatesbycrop.reduce(function (res, value) {
        if (!res[value.State]) {
            res[value.State] = { State: value.State, Value: 0 };
            result.push(res[value.State])
        }
        res[value.State].Value += value.Value;
        return res;
    }, {});

    console.log(result)
    for (var i = 0; i < result.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        AllStates.push(result[i].State);
        TotalSales.push(result[i].Value)
    }
    console.log(AllStates);
    console.log(TotalSales);

    let trace3 = {
        x: AllStates,
        y: TotalSales,
        text: AllStates,
        name: "Biodiversity",
        type: "bar",

    };

    let traceData3 = [trace3];
    console.log(traceData3);
    let layout3 = {
        title: cropoption,
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }


    };
    // var menubar = d3.select("#bar"); 
    //menubar.append('div').attr("id","plot"); 
    Plotly.newPlot("bar", traceData3, layout3);
}

function GraphsInfo() {
    console.log(stateoption);
    console.log(typeoption);
    console.log(cropoption);
    if (typeoption === "Field Crops") {

        let Filterstate = fielddata.filter(selectdata);
        var acumulator = 0;
        var cont = 0;
        for (var i = 0; i < Filterstate.length; i++) {
            // Setting the marker radius for the state by passing population into the markerSize function
            acumulator = Filterstate[i].Value + acumulator;
            cont = cont + 1;
        }
        acumulator = acumulator.toFixed(2);

        length2 = Filterstate.lenght;
        var mean = (acumulator / cont);
        mean = mean.toFixed(2);
        console.log(Filterstate.length)
        console.log(mean)
        console.log(acumulator)
        d3.select("#panel").selectAll("h3").remove();
        var panel = d3.select("#panel");
        panel.append("h3").text("Number of Counties:" + cont);
        panel.append("h3").text("Total Sales per State:" + "$" + acumulator);
        panel.append("h3").text("Average Sales per County:" + "$" + mean);
        createpie(fielddata);
    }

    else if (typeoption === "Fruits") {
        let Filterstate = fruitsdata.filter(selectdata);
        var acumulator = 0;
        var cont = 0;
        for (var i = 0; i < Filterstate.length; i++) {
            // Setting the marker radius for the state by passing population into the markerSize function
            acumulator = Filterstate[i].Value + acumulator;
            cont = cont + 1;
        }
        acumulator = acumulator.toFixed(2);

        length2 = Filterstate.lenght;
        var mean = (acumulator / cont);
        mean = mean.toFixed(2);
        console.log(Filterstate.length)
        console.log(mean)
        console.log(acumulator)
        d3.select("#panel").selectAll("h3").remove();
        var panel = d3.select("#panel");
        panel.append("h3").text("Number of Counties:" + cont);
        panel.append("h3").text("Total Sales per State:" + "$" + acumulator);
        panel.append("h3").text("Average Sales per County:" + "$" + mean);
        createpie(fruitsdata)
    }

    else if (typeoption === "Vegetables") {
        let Filterstate = vegetablesdata.filter(selectdata);
        var acumulator = 0;
        var cont = 0;
        for (var i = 0; i < Filterstate.length; i++) {
            // Setting the marker radius for the state by passing population into the markerSize function
            acumulator = Filterstate[i].Value + acumulator;
            cont = cont + 1;
        }

        acumulator = acumulator.toFixed(2);

        length2 = Filterstate.lenght;
        var mean = (acumulator / cont);
        mean = mean.toFixed(2);
        console.log(Filterstate.length)
        console.log(mean)
        console.log(acumulator)
        d3.select("#panel").selectAll("h3").remove();
        var panel = d3.select("#panel");
        panel.append("h3").text("Number of Counties:" + cont);
        panel.append("h3").text("Total Sales per State:" + "$" + acumulator);
        panel.append("h3").text("Average Sales per County:" + "$" + mean);
        createpie(vegetablesdata)
    }

}

arr = [{ 'nombre': 'Adela', 'cuanto': 25 }, { 'nombre': 'Adela', 'cuanto': 71 }, { 'nombre': 'Adela', 'cuanto': 3 }]
console.log(arr)
var test = arr.sort(function (b, a) { return a.cuanto - b.cuanto; })
console.log(test)
init();

