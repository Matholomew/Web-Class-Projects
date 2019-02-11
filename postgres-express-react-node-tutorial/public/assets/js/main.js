

window.onload = runSnackBar2();

function runSnackBar2() {
    var x = document.getElementById("snackbar2");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// Defined variables for global access
var oilData = "";
var oilPro = "";
var oilCon = "";

// Get Oil Production data from API
$.get("/api/get/Oil_Production", function(response){
    oilPro = response;
    oilPro = { oilPro };      // Save data to global variable as an object
    compileJSON()
});

// Get Oil Consumption data from API
$.get("/api/add/Oil_Consumption", function(response) {
    oilCon = response;
    oilCon = { oilCon }       // Save data to global variable as an object
    compileJSON()
});

// Function used to parse the JSON and compile it for use in D3
function compileJSON() {

    // Temp array to hold the new compiled JSON
    var compiledJSON = []
    // Make sure all objects have defined data before compiling
    if(typeof oilPro["oilPro"] !== 'undefined' && typeof oilCon["oilCon"] !== 'undefined'){

        // Loop through Oil Production Object
        for(var i = 0; i < oilPro["oilPro"].length; i++)
        {
            var proCountry = oilPro["oilPro"][i]["Country"]   // Get the first instance of the object's country name
            var conCountries = []

            // Loop through Oil Consumption Object
            for(var j = 0; j < oilCon["oilCon"].length; j++)
            {
                // Find in the Oil Consumption object where the Oil Consumption Country name is that of the Oil Production Country
                if(oilCon["oilCon"][j]["Country"] === proCountry) {
                    conCountries.push(oilCon["oilCon"][j])        // Push the Oil Consumption object to the array of ConCountries
                }
            }

            // Loop through the conCountries array
            for(var x = 0; x < conCountries.length; x++) {
                // Check if the Oil Consumption object where the Oil Consumption Country name is that of the Oil Production Country
                if(conCountries[x]["Country"] === proCountry)
                {
                    // Create a temporary object of the current oil production object and oil consumption object
                    var tempObject = {'oilPro':oilPro["oilPro"][i], 'oilCon':conCountries[x]}
                    // Push the temporary object to the compiledJSON variable
                    compiledJSON.push(tempObject)
                }
                else {
                    // Otherwise create a temporary object of just the current oil production object
                    var tempObject = {'oilPro':conCountries[x]}
                    // Push the temporary object to the compiledJSON variable
                    compiledJSON.push(tempObject)
                }
            }
        }

        // Save the compiled JSON to the global oilData variable for D3 to manipulate
        oilData = { compiledJSON }
        for(var i=0;i<oilData["compiledJSON"].length;i++){

            // Efficient jQuery selectors
            var div = $("<div/>").attr("id","sparkline_"+i);
            var label = $("<div/>").attr("id","sparkline_label_"+i).addClass("spark_label");
            var container = $("<div/>").css("margin-bottom","10px");
            container.append(div,label);

            $("#sparkline_row").append(container);

            // Separate production and consumption data
            var oilProJSON = oilData["compiledJSON"][i]['oilPro'];
            var oilConJSON = oilData["compiledJSON"][i]['oilCon'];

            // Pass separated data to loadGraphData function to begin to D3 magic
            loadGraphData(oilProJSON, oilConJSON, i);
        }
    }
}

// Extracts passed in data and does the usual D3 magic to make it all work
function loadGraphData(oilProData, oilConData, index) {

    //Split thing into con and pro
    var country = oilProData["Country"];
    $("#sparkline_label_"+index).text(country);

    // Delete the country from the passed in data
    delete oilProData["Country"];
    delete oilConData["Country"];

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

    // calculate max and min values in the data
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


