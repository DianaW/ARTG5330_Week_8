/*Start by setting up the canvas */
var margin = {t:50,r:100,b:100,l:100};
var width = $('.canvas').width() - margin.r - margin.l,
    height = $('.canvas').height() - margin.t - margin.b;

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Global variables
var year0 = 1963, year1 = 2013;

//import data
d3.csv("data/fao.csv",parse,dataLoaded);

function dataLoaded(err,data){

}

function parse(d){
    var newRow = {};

    newRow.region = d.AreaName;
    newRow.regionID = d.AreaCode;
    newRow.cropName = d.ItemName;
    newRow.dataSeries = [];

    for(var year=year0; year <= year1; year++){
        newRow.dataSeries.push({
            year:year,
            value:+d[year]
        })
    }

    return newRow;
}

