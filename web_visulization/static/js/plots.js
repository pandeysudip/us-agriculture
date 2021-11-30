// Initialized arrays
let countyfruits = []
let states = []
let commodity = []
let valuefruits = []
var countyfield = [];
var valuefield = [];
var countyvegie = [];
var valuevegie = [];
var fielddata = [];
var fruitsdata = [];
var vegetablesdata = [];
var fieldresult = [];
var fruitresult = [];
var vegieresult = [];
var Stateoption = " ";


function selectallstates(fielddatas) {
    return (fielddatas.State == Stateoption);
}


function Init(fruitsdata, vegetablesdata, fielddata) {

    fielddata.reduce(function (res, value) {
        if (!res[value.State]) {
            res[value.State] = { State: value.State, Value: 0 };
            fieldresult.push(res[value.State])
        }
        res[value.State].Value += value.Value;
        return res;
    }, {});
    console.log(fieldresult);



    fruitsdata.reduce(function (res, value) {
        if (!res[value.State]) {
            res[value.State] = { State: value.State, Value: 0 };
            fruitresult.push(res[value.State])
        }
        res[value.State].Value += value.Value;
        return res;
    }, {});
    console.log(fruitresult);

    vegetablesdata.reduce(function (res, value) {
        if (!res[value.State]) {
            res[value.State] = { State: value.State, Value: 0 };
            vegieresult.push(res[value.State])
        }
        res[value.State].Value += value.Value;
        return res;
    }, {});
    console.log(vegieresult);
    var xstate = [];
    var yfield = [];
    var yvegie = [];
    var yfruit = [];

    // For loop to populate arrays
    for (let i = 0; i < fruitresult.length; i++) {
        Stateoption = fruitresult[i].State;
        let Statevegieresult = vegieresult.filter(selectallstates);
        let Statefieldresult = fieldresult.filter(selectallstates);
        xstate.push(Stateoption);
        yfield.push(Statefieldresult[0].Value);
        yfruit.push(fruitresult[i].Value);
        yvegie.push(Statevegieresult[0].Value);
        //states.push(row.State);
        //commodity.push(row.Commodity);
        //value.push(row.value);

    }
    var totalfruits = 0;
    for (let i = 0; i < fruitsdata.length; i++) {
        countyfruits.push(fruitsdata[i].County);
        valuefruits.push(fruitsdata[i].Value);
        totalfruits = totalfruits + fruitsdata[i].Value;

    }
    var totalfields = 0;
    for (let i = 0; i < fielddata.length; i++) {
        countyfield.push(fielddata[i].County);
        valuefield.push(fielddata[i].Value);
        totalfields = totalfields + fielddata[i].Value;

    }
    var totalvegies = 0;
    for (let i = 0; i < vegetablesdata.length; i++) {
        countyvegie.push(vegetablesdata[i].County);
        valuevegie.push(vegetablesdata[i].Value);
        totalvegies = totalvegies + vegetablesdata[i].Value;

    }
    var totalusa = totalfruits + totalvegies + totalfields;
    console.log(xstate);
    console.log(yfield);
    console.log(yvegie);
    console.log(yfruit);
    Createbarchart(xstate, yfield, yvegie, yfruit, totalusa);
    CreatescatterchartsF(countyfruits, valuefruits, totalfruits);
    CreatescatterchartsFi(countyfield, valuefield, totalfields);
    CreatescatterchartsV(countyvegie, valuevegie, totalvegies);
}

function CreatescatterchartsF(countyfruits, valuefruits, totalfruits) {
    var trace1 = {
        x: countyfruits,
        y: valuefruits,
        mode: 'markers',
        type: 'scatter'

    };

    var data = [trace1];


    Plotly.newPlot('fruitplot', data);
    d3.select("#fruitsales").selectAll("h4").remove();
    var menu = d3.select("#fruitsales");
    menu.append("h4").text("Total Fruit sales:" + Number(totalfruits).toLocaleString())
}



function CreatescatterchartsFi(countyfield, valuefield, totalfields) {
    var trace1 = {
        x: countyfield,
        y: valuefield,
        mode: 'markers',
        type: 'scatter'

    };

    var data = [trace1];


    Plotly.newPlot('fieldplot', data);
    d3.select("#fieldsales").selectAll("h4").remove();
    var menu = d3.select("#fieldsales");
    menu.append("h4").text("Total Field Crops sales:" + Number(totalfields).toLocaleString())

}


function CreatescatterchartsV(countyvegie, valuevegie, totalvegies) {
    var trace1 = {
        x: countyvegie,
        y: valuevegie,
        mode: 'markers',
        type: 'scatter'

    };

    var data = [trace1];


    Plotly.newPlot('vegieplot', data);
    d3.select("#vegsales").selectAll("h4").remove();
    var menu = d3.select("#vegsales");
    menu.append("h4").text("Total Vegetable sales:" + Number(totalvegies).toLocaleString())
}


function Createbarchart(xstate, yfield, yvegie, yfruit, totalusa) {
    var trace1 = {
        x: xstate,
        y: yfield,
        name: 'Field Crops',
        type: 'bar'
    };

    var trace2 = {
        x: xstate,
        y: yvegie,
        name: 'Vegetables',
        type: 'bar'
    };

    var trace3 = {
        x: xstate,
        y: yfruit,
        name: 'Fruits',
        type: 'bar'
    };

    var data = [trace1, trace2, trace3];

    var layout = { barmode: 'group' };

    Plotly.newPlot('bar', data, layout);

    d3.select("#usasales").selectAll("h4").remove();
    var menu = d3.select("#usasales");
    menu.append("h4").text('Total sales USA:' + Number(totalusa).toLocaleString())
}


d3.json('/data/fruits').then(function (data2) {
    fruitsdata = data2;
    d3.json('/data/vegetables').then(function (data) {
        vegetablesdata = data;
        d3.json('/data/crops').then(function (data) {
            fielddata = data;
            Init(fruitsdata, vegetablesdata, fielddata);
        })
    })
});