var margin = { top: 30, right: 30, bottom: 70, left: 70 };
let original_width = window.innerWidth / 1.5;
let original_height = window.innerHeight / 1.5;
let width = original_width - margin.left - margin.right;
let height = original_height - margin.top - margin.bottom;
let line_appear;
let arr = [];
let arr2 = [];
let arr2_unique;
let data_arr = [];
let total_arr = [];
let total_d = [];
let count = 0;
let index;
let t = d3.transition().duration(500);
let g = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", original_width)
  .attr("height", original_height);

let svg = g
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("width", width)
  .attr("height", height);

//X scale
let x = d3.scaleLinear().range([0, width]);

//Y scale
let y = d3.scaleLinear().range([height, 0]);

//create x axis
let XGroup = svg
  .append("g")
  .attr("class", "x_axis")
  .attr("transform", `translate(0,${height})`);

//create y axis
let YGroup = svg.append("g").attr("class", "y_axis");

//X label
let Xlabel = svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", height + 50)
  .attr("text-anchor", "middle")
  .attr("font-size", "24px")
  .text("Total");
let newZone1 = svg.append("g").append("path").attr("class", "first");
let newZone2 = svg.append("g").append("path").attr("class", "second");
let svgg = svg.append("g").attr("class", "circ");
let newZone3 = svg.append("g").attr("class", "grid_vert");
let newZone4 = svg.append("g").attr("class", "grid_hor");
//Y label
let Ylabel = svg
  .append("text")
  .attr("x", -(height / 2))
  .attr("y", -40)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .attr("font-size", "24px")
  .text("Wins");

function f(win_s, win_r) {
  update(win_s, win_r);
}

let update = (win_s, win_r) => {
  //update X scale
  x.domain([1, +number]);
  //update Y scale
  y.domain([0, +number - (+number * 20) / 100]);

  //X axis
  let x_axis = d3.axisBottom(x).ticks(13).tickSizeOuter(0);
  XGroup.call(x_axis);
  //Y axis
  let y_axis = d3.axisLeft(y).ticks(13).tickSizeOuter(0);
  YGroup.call(y_axis);

  grid(x_axis, y_axis);

  if (counter === +number) {
    //1 JOIN new data with old elements
    let bar1 = svgg.selectAll(".circ").data([win_count_s, win_count_r]);
    bar1.exit().attr("fill", "red").remove();
    //4 ENTER new elements presente in new data
    bar1
      .enter()
      .append("circle")
      .attr("cx", x(loss_count_r))
      .attr("cy", y(0))
      .attr("r", 5)
      .attr("fill-opacity", 0)
      .merge(bar1) //3 UPDATE old elements present in new data
      .attr("cx", (d, i) => {
        return x(number);
      })
      .attr("cy", (data) => y(data))
      .attr("r", 3)
      .attr("fill-opacity", 1)
      .attr("fill", "red");
  }

  first1(win_r, +number);
  second2(win_s, +number);
};

function first1(arr, tot) {
  //console.log(arr, arr.length, "FIR");
  let area = d3
    .area()
    .x((d, i) => {
      return x(i + 1);
    })
    .y0(y(0))
    .y1((d) => {
      return y(d);
    });

  let area1 = svg.selectAll(".first").datum(arr);
  area1.exit().remove();
  area1
    .enter()
    .append("path")
    .merge(area1)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", area)
    .attr("opacity", "0.5")
    .attr("fill", "#00008b");
}
function second2(arr, tot) {
  // console.log(arr, arr.length, "SEC");
  let area22 = d3
    .area()
    .x((d, i) => {
      return x(i + 1);
    })
    .y0(y(0))
    .y1((d, i) => {
      return y(d);
    });
  let area2 = svg.selectAll(".second").datum(arr);

  area2.exit().remove();
  area2
    .enter()
    .append("path")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .merge(area2)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", area22)
    .attr("opacity", "0.5")
    .attr("fill", "green");
}

function grid(x, y) {
  let grid1 = svg.selectAll(".grid_vert");

  grid1.exit().remove();
  grid1
    .enter()
    .append("g")
    .attr("stroke-width", 1.5)
    .attr("transform", "translate(0," + height + ")")
    .merge(grid1)
    .attr("opacity", "0.2")
    .call(x.tickSize(height, 0, 0).tickFormat("").tickSizeOuter(0));

  //GRID
  let grid2 = svg.selectAll(".grid_hor");

  grid2.exit().remove();
  grid2
    .enter()
    .append("g")
    .attr("stroke-width", 1.5)
    .merge(grid2)
    .attr("opacity", "0.2")
    .call(y.tickSize(-width, 0, 0).tickFormat("").tickSizeOuter(0));
}
