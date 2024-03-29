/**
 * Grid sketch
 */

// Global: d3

let minRadius = 3;
let maxRadius = 10;
let gridUnit = maxRadius * 2 * 1;
let offsetTop = -9;
let offsetLeft = -17;
let offsetBottom = 14;
let offsetRight = 14;
let el = document.getElementById('sketchbook-canvas');
let width = el.clientWidth;
let height = el.clientHeight;

// Make a random radius
const makeRadius = () => (Math.random() * (maxRadius - minRadius)) + minRadius;

// Create grid
let grid = [];
for (let x = 0 + offsetLeft; x < width + offsetRight; x += gridUnit) {
  for (let y = 0 + offsetTop; y < height + offsetBottom; y += gridUnit) {
    grid.push({
      radius: makeRadius(),
      color: Math.random(),
      x: x,
      y: y,
      cx: x + gridUnit / 2,
      cy: y + gridUnit / 2
    });
  }
}

// Draw svg
let svg = d3.select("#sketchbook-canvas").append("svg")
  .attr("width", width)
  .attr("height", height);

// Color scale
let color = d3.scaleSequential(d3.interpolateSpectral);

// Draw circle
let groups = svg.selectAll('g.cell')
  .data(grid)
  .enter()
    .append('g')
    .classed('cell', true)
    .attr('transform', d => `translate(${d.x},${d.y})`);

let circles = groups.append('circle')
      .attr('cx', d => d.cx)
      .attr('cy', d => d.cy)
      .attr('r', d => d.radius)
      .attr('fill', d => color(d.color));

// Interval
let interval = 5000;
setInterval(() => {
  let t = d3.transition()
    .duration(interval)
    .ease(d3.easeLinear);

  circles.transition(t)
    .attr('fill', d => color(Math.random()))
    .attr('r', makeRadius);
}, interval)
