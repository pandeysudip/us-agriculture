

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//function for dropdown menu and initial graphs 
function init() {
    var agType = ["Field Crops", "Fruits", "Vegetables"];
    var menu1 = d3.select("#selDataset1");
    agType.forEach((type) => {
        menu1.append("option").text(type).property("value", type);
    });
    //creating function for initial plots 
    var initType = agType[0]
    graphs(initType);

    d3.json('/data/vegetables').then((data) => {
        //select the dropdown.
        var menu = d3.select("#selDataset");
        //var uniqueState = states.filter(onlyUnique);
        var states = []
        for (let i = 0; i < 3000; i++) {
            s = data[i].State
            states.push(s);
        }
        //states.filter(onlyUnique)
        var uniqueState = states.filter(onlyUnique)
        uniqueState.forEach((state) => {
            menu.append("option").text(state).property("value", state);
        });
        //creating function for initial plots 
        var initSample = data.uniqueState
        graphs(initSample);
    })
};

function graphs(names) {

};

function optionChanged(newSample) {
    graphs(newSample);
};

init();

