/*Start by setting up the canvas */
var margin = {t:50,r:50,b:100,l:50};
var width = $('.canvas').width() - margin.r - margin.l,
    height = $('.canvas').height() - margin.t - margin.b;

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');


//Area 1
var area1 = canvas.append('g')
    .attr('transform','translate('+width/6+','+height/2+')');
area1.append('circle')
    .attr('r',3);
area1.append('text')
    .text("Area 1 (0,0)")
    .attr('text-anchor','middle')
    .attr('dy',-10);

//Area 2
var area2 = canvas.append('g')
    .attr('transform','translate('+width/3+','+height/2+')');
area2.append('circle')
    .attr('r',3);
area2.append('text')
    .text("Area 2 (0,0)")
    .attr('text-anchor','middle')
    .attr('dy',-10);

//SVG generator
//Let's draw some arcs in area 1
var arcGenerator = d3.svg.arc();

var data = {
        startAngle:Math.PI*2*0,
        endAngle:Math.PI*2/3,
        innerRadius:75,
        outerRadius:100
    };

var data2 = {
        x0:180,
        x1:270,
        r:150
    }

//Let's draw a line in area 2
var lineGenerator = d3.svg.line()
    .interpolate('cardinal');

var data3 = [
        [0,10],
        [40,45],
        [80,0],
        [120,100],
        [160,320],
        [200,40],
        [350,130],
        [450,20]
    ];

var data4 = [
        [0,10],
        [40,45],
        [80,0],
        [120,undefined],
        [160,320],
        [200,40],
        [350,130],
        [450,20]
    ];

var data5 = [
        {a:0,b:50},
        {a:40,b:67},
        {a:80,b:undefined},
        {a:120,b:55},
        {a:160,b:70},
        {a:200,b:90},
        {a:350,b:180},
        {a:450,b:100}
    ];


//Let's draw an area in area 2
var areaGenerator = d3.svg.area();



