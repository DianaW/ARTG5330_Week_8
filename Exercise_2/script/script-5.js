/*A second line series: more efficient version*/
var margin = {t:50,r:100,b:50,l:100};
var width = $('.canvas').width() - margin.r - margin.l,
    height = $('.canvas').height() - margin.t - margin.b;

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

/* set up scale and axes*/
var scales = {};
scales.x = d3.scale.linear().range([0,width]);
scales.y = d3.scale.linear().range([height,0]);

var axisX = d3.svg.axis()
    .orient('bottom')
    .tickSize(-height,0)
    .scale(scales.x);
var axisY = d3.svg.axis()
    .orient('left')
    .tickSize(-width,0)
    .scale(scales.y);


var initValue; //helps in parsing


queue()
    .defer(d3.csv,'data/fao_tea_world_1963_2013.csv',parse)
    .defer(d3.csv,'data/fao_coffee_world_1963_2013.csv',parse)
    .defer(d3.csv,'data/fao_mate_world_1963_2013.csv',parse)
    .await(dataLoaded);

function dataLoaded(err,tea,coffee,mate){

    //Mine the data for max and min
    scales.x.domain( d3.extent(tea, function(d){ return d.year; }) );
    scales.y.domain( [-1,6] );

    //Draw axes once
    canvas.append('g')
        .attr('class','axis x')
        .attr('transform','translate(0,'+height+')')
        .call(axisX);
    canvas.append('g')
        .attr('class','axis y')
        .call(axisY);

    var crops = [
        {crop: "tea", array: tea},
        {crop: "coffee", array: coffee},
        {crop: "mate", array:mate}
    ];

    draw(crops);
}

function draw(crops){

    //Draw line
    var lineGenerator = d3.svg.line()
        .x( function(d){ return scales.x(d.year); })
        .y( function(d){ return scales.y(d.normalizedValue); })
        .interpolate('cardinal');


    //Using join to produce two <g> elements
    var cropGroups = canvas.selectAll('.crop')
        .data(crops)
        .enter()
        .append('g')
        .attr('class',function(d){
            return "crop " + d.crop;
        });

    cropGroups
        .append('path')
        .datum(function(d){ return d.array; })
        .attr('class','line')
        .attr('d', lineGenerator);

    cropGroups
        .selectAll('.dot')
        .data(function(d){ return d.array; })
        .enter()
        .append('circle')
        .attr('class','dot')
        .attr('transform',function(f){
            return 'translate('+scales.x(f.year)+','+scales.y(f.normalizedValue)+')';
        })
        .attr('r',3);

}

function parse(row,i){
    //@param row is each unparsed row from the dataset
    if(row.Year == "1963"){
        initValue = +row.Value;
    }

    if(row.Year && row.Value){
        console.log(row.ItemName, initValue);

        return {
            year: +row.Year,
            value: +row.Value,
            element: row.ItemName,
            normalizedValue: +row.Value/initValue
        }
    }else{
        return;
    }
}