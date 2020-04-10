//deciding on the width and height of the canvas
var margin = {top: 20, right: 20, bottom: 20, left: 20};
width = 1150 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

//variable delcartion
var reddata = [];
var greendata = [];
var bluedata = [];
var session = [];
var redpath;
var greenpath;
var bluepath;
var drawing = false;
var redArray = []
var greenArray =[]
var blueArray = []
var color = "red"
var flag = false;
var firstread = false


var line = d3.svg.line()
.interpolate("bundle") // basis, see http://bl.ocks.org/mbostock/4342190
.tension(1)
.x(function(d, i) { return d.x; })
.y(function(d, i) { return d.y; });

// creating the svg for the canvas
var svg = d3.select("#sketch_2").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)

svg.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// adding events to the svg
svg
.on("mousedown", listen)
.on("touchstart", listen)
.on("dblclick", listen)
.on("touchend", ignore)
.on("touchleave", ignore)
.on("mouseup", ignore)
.on("mouseleave", ignore);


// ignore default touch behavior
var touchEvents = ['touchstart', 'touchmove', 'touchend' ];
touchEvents.forEach(function (eventName) {
document.body.addEventListener(eventName, function(e){
e.preventDefault();
});
});



// We're passing in a range [0,256] to tell it what we're maxing (x value)
var x = d3.scale.linear()
.domain([0, 256])
.range([margin.left, width - margin.right]);  // Set margins for x specific

// We're passing in a range [0,1] to tell it what we're maxing (y value)
var y = d3.scale.linear()
.domain([0, 1])
.range([ height - margin.bottom,margin.top]);  // Set margins for y specific

//darwing the x-axis
var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")
.ticks(20);

svg.append("g")
.attr("class", "axis") //adding class for style purposes
.attr("transform", "translate(" + 0 + "," + (height-20) + ")")
.call(xAxis);

// text label for the x axis
svg.append("text")             
.attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 7) + ")")
.style("text-anchor", "middle")
.attr("class", "xlabel")
.text("Points");
        
//darwing the y-axis
var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(15)
.innerTickSize(-width+70)
.outerTickSize(0)
.tickPadding(4);   

svg.append("g")
.attr("class", "axis") //adding class for style purposes
.attr("transform", "translate(" + (width - 1090) + ",0)")
.call(yAxis);
        
//method that listens to the user's mouse behaviour
function listen () {
drawing = true;
reddata = []; // reset point data
greendata=[]; // reset point data
bluedata=[];  // reset point data
redpath = svg.append("path") // start a new line for the red channel
.data([reddata])
.attr("class", "rline")
.attr("d", line);

greenpath = svg.append("path") // start a new line for the green channel
.data([greendata])
.attr("class", "gline")
.attr("d", line);

bluepath = svg.append("path") // start a new line for the blue channel
.data([bluedata])
.attr("class", "bline")
.attr("d", line);


//when the user clicks and hold it, triggers mousemove to start drawing    
if (d3.event.type === 'mousedown') {
svg.on("mousemove", onmove);
}
else if (d3.event.type === 'dblclick'){
flag = true ;
firstread = false;
svg.on("mousemove", onmove);
         }
else{
svg.on("mousemove", onmove);

}
}

function ignore () {
var before, after;
svg.on("mousemove", null);
svg.on("touchmove", null);
flag = false    

// skip out if we're not drawing
if (!drawing) return;
drawing = false;

}

//when the users moves their mouse add the points and draw the line 
function onmove (e) {
var type = d3.event.type;
var point;

if (type === 'mousemove') {
point = d3.mouse(this);
} else {
// only deal with a single touch input
point = d3.touches(this)[0];
}

// push a new data point 
xmouse = Math.round(x.invert(point[0] ))
ymouse = y.invert(point[1])


//limit the range, so they don't draw outside the canvas
if( xmouse<256 && ymouse >=0 && x.invert(point[0]) >=0){

position = {x: xmouse,  y: ymouse}
    
if(!firstread){
firstpoint = point[1]
firstread = true
}
if(color== 'red'){
if(flag){
reddata.push({ x: point[0], y: firstpoint });
for (const x of Array(256).keys()) { 
redArray.push({x:x ,  y:  y.invert(firstpoint)})
}   
}
else{    
reddata.push({ x: point[0], y: point[1] });
redArray.push(position)
console.log("red",redArray)

}
    
tick(redpath);
}
else
if(color== 'green'){
if(flag){
greendata.push({ x: point[0], y: firstpoint });
for (const x of Array(256).keys()) { 
greenArray.push({x:x ,  y:  y.invert(firstpoint)})
}   
}
else{    
greendata.push({ x: point[0], y: point[1] });
greenArray.push(position)}
tick(greenpath);
}
if(color== 'blue'){
if(flag){
bluedata.push({ x: point[0], y: firstpoint });
for (const x of Array(256).keys()) { 
blueArray.push({x:x ,  y:  y.invert(firstpoint)})
}   
}
else{    
bluedata.push({ x: point[0], y: point[1] });
blueArray.push(position)}
tick(bluepath);
}
}//end if
 
}// end onmove method

function tick(path) {
path.attr("d", function(d) { return line(d); }) // Redraw the path:
}

