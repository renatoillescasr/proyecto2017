var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]),
y1 = d3.scale.linear().domain([20, 80]).range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y0).ticks(4).orient("left");
// create right yAxis
var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");

var svg = d3.select("#graficaD3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json("../data/catalogo.json", type, function(error, data) {
  data.forEach(function(d) {
    d.marca = d.marca;
    d.precio = +d.precio;
    d.descuento = +d.descuento;
  });

  x.domain(data.map(function(d) { return d.marca; }));
  y0.domain([0, d3.max(data, function(d) { return d.precio; })]);
  y1.domain([0, d3.max(data, function(d) { return d.descuento; })]);

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

  bars = svg.selectAll(".bar").data(data).enter();
  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.marca); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.precio); })
	  .attr("height", function(d) { return height - y0(d.precio); });
  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.marca) + x.rangeBand()/2; })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y1(d.descuento); })
	  .attr("height", function(d) { return height - y1(d.descuento); });
});

function type(d) {
  d.precio = +d.precio;
  return d;
}
