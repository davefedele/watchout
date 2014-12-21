//screen width and height
var w = 640;
var h = 480;
var svg;
// var dataset = [ 5, 10, 15, 20, 25, 3];
var dataset = [5];

var createSVG = function (w, h) {
  return d3.select(".svgContainer")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("x", 100)
    .attr("class", "field");
};

var initializePlayer = function(svg, x, y){
  x = x || (0.5 * w);
  y = y || (0.5 * h);
  svg.selectAll("rect")
    .data([{x:x, y:y}])
    .enter()
    .append("rect")
    .attr("x", function(d) {
              return d.x - 10;})
    .attr("y",  function(d) {
              return d.y - 10;})
    .attr("height", function(d){
      return 20;
    })
    .attr("width", function(d) {
      return 20;
    })
    .attr("class", "player")
    .style("fill", "steelblue");
};

var createCircles = function(svg, dataset) {
  return svg.selectAll("circle")
            .data(dataset).enter()
            .append("circle")
            .attr("cx", function(d, i) {
              return (i * 50) + 25;
            })
            .attr("cy", h/2)
            .attr("r", function(d) {
              return d;
          })
          .attr("class", "enemies");
};

var circlesTransition = function(svg, points){
  var points = [
    [480, 400],
    [580, 400],
    [380, 400]
  ];

  var path = svg.append("path")
      .data([points])
      .attr("d", d3.svg.line()
      .tension(0) // Catmull–Rom
      .interpolate("cardinal-open"));

  var circle = svg.append("circle")
      .attr("r", 13)
      .attr("transform", "translate(" + points[0] + ")");

  transition();

  function transition() {
    circle.transition()
        .duration(1000)
        .attrTween("transform", translateAlong(path.node()))
        // .each("end", transition)
        ;
  }

  // Returns an attrTween for translating along the specified path element.
  function translateAlong(path) {
    var l = path.getTotalLength();
    return function(d, i, a) {
      return function(t) {
        var p = path.getPointAtLength(t * l);
        return "translate(" + p.x + "," + p.y + ")";
      };
    };
  }

};

var gameOver = function(svg){

  var player  = svg.selectAll(".player")[0][0];
  var enemies = svg.selectAll(".enemies");
  
  //loop over enemies calling detectCollision
  for( var i=0; i<enemies[0].length; i++ ) {
    if (isColliding(player, enemies[0][i])) {
      console.log("Game Over");
      svg.on("mousemove", null);
      // clearInterval(running);
      // clearInterval(collisionRunning);
      d3.timer.flush();
    };
  }

  function isColliding(player, enemy){
    dx = player.attributes.x.value - enemy.attributes.cx.value;
    dy = player.attributes.y.value - enemy.attributes.cy.value;
    distance = Math.sqrt(dx * dx + dy * dy);
    return distance < parseInt(player.attributes.height.value) + parseInt(enemy.attributes.r.value);
  }
};

var trackPlayer = function(event) {
  svg.on("mousemove", function(){
    var location;
    location = d3.mouse(this);
    
    d3.select(".player")
      .attr("x", location[0] - 10)
      .attr("y", location[1] - 10);
  })
};

svg = createSVG(w, h);
initializePlayer(svg);
createCircles(svg, dataset);
var gameStartTime = Date.now();
// $('.player').mousedown(trackPlayer);
d3.select(".player").on("mousedown", trackPlayer);
d3.select(".player").on("mouseup", function() {
  console.log("mouse up");
  svg.on("mousemove", null);
});

// var running = setInterval(function() {circlesTransition(svg);}, 1000);
// var collisionRunning = setInterval(function(){gameOver(svg);}, 200);
d3.timer(function(){gameOver(svg);});

var scoreTimer = function(){
  var score = Math.floor((Date.now() - gameStartTime)/100);
  $(".current span").text(score);};
var keepScore = d3.timer(scoreTimer);
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