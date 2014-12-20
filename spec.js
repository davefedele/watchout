describe('watchout', function() {
  beforeEach(function() {
    var svg = createSVG(640, 480);
    createCircles(svg, [1]);
    initializePlayer(svg, 100, 100);
  });

  afterEach(function() {
    $("svg").remove();
  });

  it('should have an svg element', function() {
    expect(document.getElementsByTagName("svg").length).to.equal(1);
  });

  it('should contain a player', function(){
    expect(document.getElementsByClassName("player").length).to.equal(1);
  });

  describe('circlesTransition', function() {
    it('should move an enemy', function(){
      var enemies = d3.selectAll(".enemies");
      var cx = enemies.attr("cx");
      var cy = enemies.attr("cy");
      circlesTransition();
      expect(document.getElementsByClassName("enemies").length).to.equal(1);
    });

    it('should resize an enemy', function(){
      expect(document.getElementsByClassName("enemies").length).to.equal(1);
    });

    it('should contain an enemy', function(){
      expect(document.getElementsByClassName("enemies").length).to.equal(1);
    });

    it('should contain an enemy', function(){
      expect(document.getElementsByClassName("enemies").length).to.equal(1);
    });
  });
});
