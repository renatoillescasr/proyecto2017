// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]),
y1 = d3.scale.linear().domain([20, 90]).range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxisLeft = d3.svg.axis()
    .scale(y0)
    .orient("left")
    .ticks(4);

var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");

// add the SVG element
var svg = d3.select("#graficaD3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// load the data
d3.json("../data/catalogo1.json", function(error, data) {
  data.catalogo.forEach(function(d){
  //data.forEach(function(d) {
    d.nombre = d.nombre;
    d.precio = +d.precio;
    d.descuento = +d.descuento;
    console.log(d.descuento);
  });

// scale the range of the data
x.domain(data.catalogo.map(function(d) { return d.nombre; }));
y0.domain([0, d3.max(data.catalogo, function(d) { return d.precio; })]);
y1.domain([0, d3.max(data.catalogo, function(d) { return d.descuento; })]);

// add axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis axisLeft")
    .attr("transform", "translate(0,0)")
	  .call(yAxisLeft)
  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .style("text-anchor", "end")
    .text("costo");

 svg.append("g")
      .attr("class", "y axis axisRight")
      .attr("transform", "translate(" + (width) + ",0)")
      .call(yAxisRight)
    .append("text")
      .attr("y", 6)
      .attr("dy", "-2em")
      .attr("dx", "2em")
      .style("text-anchor", "end")
      .text("descuento");


// Add bar chart
bars = svg.selectAll(".bar").data(data.catalogo).enter();
  bars.append("rect")
    .attr("class", "bar1")
    .attr("x", function(d) { return x(d.nombre); })
    .attr("width", x.rangeBand()/2)
    .attr("y", function(d) { return y0(d.precio); })
    .attr("height", function(d) { return height - y0(d.precio); });

  bars.append("rect")
    .attr("class", "bar2")
    .attr("x", function(d) { return x(d.nombre) + x.rangeBand()/2; })
    .attr("width", x.rangeBand()/2)
    .attr("y", function(d) { return y1(d.descuento); })
  	.attr("height", function(d) { return height - y1(d.descuento); });

});
