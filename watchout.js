//screen width and height
var w = 640;
var h = 480;
var svg;
var dataset = [ 5, 10, 15, 20, 25, 3];

var score = 0, highScore=0, collisions=0;
var running, collisionRunning, keepScore;

var createSVG = function (w, h) {
  return d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "field");
}

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
}

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

var circlesTransition = function(svg){
  var circles = svg.selectAll(".enemies")[0].length;

  var result = [];
  for( var i=0; i<circles; i++ ) {
    result.push(Math.random() * 35 + 10);
  }

  svg.selectAll(".enemies")
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

  //detect if collision ocurring b/w 2 objects
  //loop over all enemies and call collision test
  // encapsulate in setTimeout figuring out best interval


var gameOver = function(svg){

  var player  = svg.selectAll(".player")[0][0];
  var enemies = svg.selectAll(".enemies");
  
  //loop over enemies calling detectCollision
  for( var i=0; i<enemies[0].length; i++ ) {
    if (isColliding(player, enemies[0][i])) {
      console.log("Game Over");
      $("svg").off("mousemove");
      collisions++;
      updateScore();
      clearInterval(running);
      clearInterval(collisionRunning);
      clearInterval(keepScore);
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
  $("svg").mousemove(function(event) {
    var location = [{x: event.offsetX, y: event.offsetY}];
    d3.selectAll(".player")
      .data(location)
      .attr("x", function(d) {
        return d.x - 10;
      })
      .attr("y", function(d) {
        return d.y - 10;
      })
      .transition()
      .duration(200);
  });
}

svg = createSVG(w, h);
initializePlayer(svg);
createCircles(svg, dataset);
$('.player').mousedown(trackPlayer);
$(".player").mouseup(function() {
  $("svg").off("mousemove");
});
// $('svg').mousemove(function(evt) {console.log(evt.offsetX, evt.offsetY);});
// mousedown on .player
// get client X & Y
// update player X & Y
// mouseup end event.

var updateScore = function() {
  d3.select(".scoreboard .high span").text(highScore);
  d3.select(".scoreboard .current span").text(score);
  d3.select(".scoreboard .collisions span").text(collisions);
};

var incrementScore = function(){
  score = score + 1;
  highScore = Math.max(score, highScore);
  updateScore();
};

var playAgain = function(){
//declare as var so we can stop setInterval call
  score = 0;
  running = setInterval(function() {circlesTransition(svg);}, 4000);
  collisionRunning = setInterval(function(){gameOver(svg);}, 200);
  keepScore = setInterval(incrementScore, 100);
};

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