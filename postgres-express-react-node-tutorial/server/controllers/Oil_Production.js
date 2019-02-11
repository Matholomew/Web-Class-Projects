// Oil production controller file
// Imports oil production model
const Oil_Production = require('../models').Oil_Production;
var oil_prod_array = []
module.exports = {
    fetchData(req, res) {
        return Oil_Production
            .findAll({
                attributes: {exclude: ['id']}
            })
            .then(oil => res.status(200).send(oil))
            .catch(error => res.status(400).send(error));
    },
   // Function that parses in the CSV file and store into the database
    createCSV(req, res) {
        oil_prod_array = []     //Array for the oil_prod rows
        var fs = require('fs');
        const parse = require('csv-parse')
        fs.createReadStream("public/VisualisationData/Oil_Production.csv")      //Read in Csv from file
            .pipe(parse({delimiter: ',', columns: true}))
            .on('data', function(data){

                var countryName = data["Crude oil production, per capita (toe)"];

                //Push object to oil_prod array for each row in the CSV
                oil_prod_array.push({Country: countryName,
                    oneNineSixFive: data["1965"],
                    oneNineSixSix: data["1966"],
                    oneNineSixSeven: data["1967"],
                    oneNineSixEight: data["1968"],
                    oneNineSixNine: data["1969"],
                    oneNineSevenZero: data["1970"],
                    oneNineSevenOne: data["1971"],
                    oneNineSevenTwo: data["1972"],
                    oneNineSevenThree: data["1973"],
                    oneNineSevenFour: data["1974"],
                    oneNineSevenFive: data["1975"],
                    oneNineSevenSix: data["1976"],
                    oneNineSevenSeven: data["1977"],
                    oneNineSevenEight: data["1978"],
                    oneNineSevenNine: data["1979"],
                    oneNineEightZero: data["1980"],
                    oneNineEightOne: data["1981"],
                    oneNineEightTwo: data["1982"],
                    oneNineEightThree: data["1983"],
                    oneNineEightFour: data["1984"],
                    oneNineEightFive: data["1985"],
                    oneNineEightSix: data["1986"],
                    oneNineEightSeven: data["1987"],
                    oneNineEightEight: data["1988"],
                    oneNineEightNine: data["1989"],
                    oneNineNineZero: data["1990"],
                    oneNineNineOne: data["1991"],
                    oneNineNineTwo: data["1992"],
                    oneNineNineThree: data["1993"],
                    oneNineNineFour: data["1994"],
                    oneNineNineFive: data["1995"],
                    oneNineNineSix: data["1996"],
                    oneNineNineSeven: data["1997"],
                    oneNineNineEight: data["1998"],
                    oneNineNineNine: data["1999"],
                    twoZeroZeroZero: data["2000"],
                    twoZeroZeroOne: data["2001"],
                    twoZeroZeroTwo: data["2002"],
                    twoZeroZeroThree: data["2003"],
                    twoZeroZeroFour: data["2004"],
                    twoZeroZeroFive: data["2005"],
                    twoZeroZeroSix: data["2006"],
                    twoZeroZeroSeven: data["2007"],
                    twoZeroZeroEight: data["2008"],
                    twoZeroZeroNine: data["2009"],
                    twoZeroOneZero: data["2010"],
                    twoZeroOneOne: data["2011"]})

                Oil_Production.destroy({ truncate : true, cascade: false })     // Clear table
                Oil_Production.create(oil_prod_array[oil_prod_array.length - 1])    //Create table
                    .catch(error => res.status(400).send(error));
            })
            .on("end", function(){
                res.status(201).send(oil_prod_array);           // Send json array to page for API get
            })
    }
};