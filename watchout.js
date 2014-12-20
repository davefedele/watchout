//screen width and height
var w = 640;
var h = 480;

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "field");

var dataset = [ 5, 10, 15, 20, 25, 30];

var initializePlayer = function(x,y){
  x = x || (0.5 * w);
  y = y || (0.5 * h);
  svg.selectAll("rect")
    .data([{x:x, y:y}])
    .enter()
    .append("rect")
    .attr("x", function(d) {
              return d.x;})
    .attr("y",  function(d) {
              return d.y;})
    .attr("height", function(d){
      return 20;
    })
    .attr("width", function(d) {
      return 20;
    })
    .attr("class", "player")
    .style("fill", "steelblue");
}

var createCircles = function(dataset) {
  return svg.selectAll("circle")
            .data(dataset).enter()
            .append("circle")
            .attr("cx", function(d, i) {
              return (i * 50) + 25;
            })
            .attr("cy", h/2)
            .attr("r", function(d) {
              return d;
          });
};

var circlesTransition = function(){
  var circles = svg.selectAll("circle")[0].length;

  var result = [];
  for( var i=0; i<circles; i++ ) {
    result.push(Math.random() * 35 + 10);
  }

  svg.selectAll("circle")
      .data(result)
      .transition()
      .duration(function(d, i ){
        return Math.random() * 2500 + 500;})
      .attr("cy", function(d){
        return Math.random() * (h - d) + d/2;
      })
      .attr("cx", function(d){
        return Math.random() * (w - d) + d/2;
      })
      .attr("r", function(d){
        return d;
      })
      .style("fill-opacity", 1);
};

initializePlayer();
createCircles(dataset);

//declare as var so we can stop setInterval call
var running = setInterval(circlesTransition, 4000);


// set boundaries for objects.
// 

/*
  * move objects randomly
  * create user objects
  * detect collisions between random and user objects
  * Enable user control
  * create stopwatch
  * auto-restart or button
  * Difficulty levels:
  *   Size of field
  *   Size of enemies
  *   Speed scaled with score or evolution
  *   Change enemy behavior - e.g. attracted to player
  *   Power-ups
  * Top-ten
  * orbit button
  */