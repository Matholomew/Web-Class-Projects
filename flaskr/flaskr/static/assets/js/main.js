window.onload = runSnackBar2();

function runSnackBar2() {
    var x = document.getElementById("snackbar2");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// Defined variable for global access
var oilData = "";

// Get Oil data from API
$.get("/oilData", function(response){
    oilData = response;
    oilData = JSON.parse(oilData);      // Save the compiled JSON to the global oilData variable for D3 to manipulate

    for(var i=0;i<oilData.length;i++){

        // Efficient jQuery selectors
        var div = $("<div/>").attr("id","sparkline_"+i);
        var label = $("<div/>").attr("id","sparkline_label_"+i).addClass("spark_label");
        var container = $("<div/>").css("margin-bottom","10px");
        container.append(div,label);

        $("#sparkline_row").append(container);

        // Separate production and consumption data
        var oilProJSON = oilData[i]['oilPro'];
        var oilConJSON = oilData[i]['oilCon'];

        // Pass separated data to loadGraphData function to begin to D3 magic
        loadGraphData(oilProJSON, oilConJSON, i);
    }

});

function loadGraphData(oilProData, oilConData, index) {

    //Split thing into con and pro
    var country = oilProData["Crude oil production, per capita (toe)"];
    $("#sparkline_label_"+index).text(country);

    // Delete the country from the passed in data
    delete oilProData["Crude oil production, per capita (toe)"];
    delete oilConData["Oil Consumption per capita (tonnes per year)"];
    delete oilProData["_id"];
    delete oilConData["_id"];

    var vals1 = [];
    var vals2 = []

    //loop through oil production data and pushing the values to an array
    $.each(oilProData,function(i,e){
        vals1.push(e);
    });

    //loop through oil consumption data and pushing the values to an array
    $.each(oilConData,function(i,e){
        vals2.push(e);
    });

    //Create a json object to hold the oil pro/con values
    var json = {
        pro: vals1,
        con: vals2
    }

    // This checks whether a date-format tries to be a d3 vector point and throws NaN
    if(isNaN(json["pro"][json["pro"].length - 1] )) {

        json["pro"].pop(json["pro"])
        json["pro"].pop(json["pro"])
    }


    // calculate max and min values in the NLWest data
    var max=0, min=0, len=0;
    for(var team in json) {
        min = d3.min([d3.min(json[team]), min]);
        max = d3.max([d3.max(json[team]), max]);
        len = d3.max([json[team].length, len]);
    }

    var h = 50,     //Set the height
        w = 250,    //Set the width
        p = 2,
        fill = d3.scale.category10(),
        x = d3.scale.linear().domain([0, len]).range([p, w - p]),
        y = d3.scale.linear().domain([min, max]).range([h - p, p]),
        line = d3.svg.line()
            .x(function(d, i) { return x(i); })
            .y(function(d) { return y(d); });

    var svg = d3.select("#sparkline_"+index)
        .append("svg:svg")
        .attr("height", h)
        .attr("width", w);


    //Loop through the json and set the appropriate vector point based on the float
    for(var team in json) {

        var g = svg.append("svg:g");
        g.append("svg:path")
            .attr("d", line(json[team]))
            .attr("stroke", function(d) { return fill(team);  })
            .attr("class", "team");
        g.append("svg:title")
            .text(team);
    }
    runSnackBar();      // Notify user graphs are finished loading
}


function runSnackBar() {        // This method displays whether the graphs are still loading in or not
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
