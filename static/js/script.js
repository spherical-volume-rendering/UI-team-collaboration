   
console.log("hi")
var margin = {top: 20, right: 50, bottom: 20, left: 20};
	width = 1160 - margin.left - margin.right,
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
    
var output = d3.select('#output');

var line = d3.svg.line()
    .interpolate("bundle") // basis, see http://bl.ocks.org/mbostock/4342190
    .tension(1)
    .x(function(d, i) { return d.x; })
    .y(function(d, i) { return d.y; });

var svg = d3.select("#sketch").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
	

svg
  .on("mousedown", listen)
  .on("touchstart", listen)
  .on("touchend", ignore)
  .on("touchleave", ignore)
  .on("mouseup", ignore)
  .on("mouseleave", ignore);


// ignore default touch behavior
var touchEvents = ['touchstart', 'touchmove', 'touchend'];
touchEvents.forEach(function (eventName) {
  document.body.addEventListener(eventName, function(e){
    e.preventDefault();
  });  
});

    

      // We're passing in a function in d3.max to tell it what we're maxing (x value)
      var x = d3.scale.linear()
          .domain([0, 256])
          .range([margin.left, width - margin.right]);  // Set margins for x specific

      // We're passing in a function in d3.max to tell it what we're maxing (y value)
      var y = d3.scale.linear()
          .domain([0, 1])
          .range([ height - margin.bottom,margin.top]);  // Set margins for y specific
    
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(20);

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(15)
    .innerTickSize(-width+70)
    .outerTickSize(0)
    .tickPadding(10);
    
    svg.append("g")
    .attr("class", "axis") // class to style
    	.attr("transform", "translate(" + 10 + "," + (height-20) + ")")
	.call(xAxis);

	svg.append("g")
    .attr("class", "axis")
	.attr("transform", "translate(" + 30 + ",0)")
	.call(yAxis);
    
    
 
   

    
function listen () {
  drawing = true;
  output.text('event: ' + d3.event.type);
  reddata = []; // reset point data
  greendata=[];
  bluedata=[];
  redpath = svg.append("path") // start a new line
    .data([reddata])
    .attr("class", "rline")
    .attr("d", line);
    
  greenpath = svg.append("path") // start a new line
    .data([greendata])
    .attr("class", "gline")
    .attr("d", line);
    
   bluepath = svg.append("path") // start a new line
    .data([bluedata])
    .attr("class", "bline")
    .attr("d", line);   
  if (d3.event.type === 'mousedown') {
    svg.on("mousemove", onmove);
  } else {
    svg.on("touchmove", onmove);
  }
}

function ignore () {
  var before, after;
  output.text('event: ' + d3.event.type);
  svg.on("mousemove", null);
  svg.on("touchmove", null);

  // skip out if we're not drawing
  if (!drawing) return;
  drawing = false;

}


function onmove (e) {
  var type = d3.event.type;
  var point;

  if (type === 'mousemove') {
    point = d3.mouse(this);
  } else {
    // only deal with a single touch input
    point = d3.touches(this)[0];
  }

  // push a new data point onto the back
    xmouse = Math.round(x.invert(point[0] ))
    ymouse = y.invert(point[1])
    //so they don't draw outside the canvas
    if( xmouse<256 && ymouse >=0 && x.invert(point[0]) >=0){

    console.log({x: Math.round( x.invert(point[0])),  // Takes the pixel number to convert to number
            y:  y.invert(point[1])})
   str = {x: Math.round( x.invert(point[0])),  y:  y.invert(point[1])}
    if(color== 'red'){
        redArray.push(str)
        reddata.push({ x: point[0], y: point[1] });
        tick(redpath);
        }
    else 
        if(color== 'green'){
        greenArray.push(str)
        greendata.push({ x: point[0], y: point[1] });
        tick(greenpath);
       }
     if(color== 'blue'){
        blueArray.push(str)
        bluedata.push({ x: point[0], y: point[1] });
        tick(bluepath);
        }
 
    }
}

function tick(path) {
  path.attr("d", function(d) { return line(d); }) // Redraw the path:
}
    
    
//end of D3    

document.getElementById("clear").addEventListener("click", function(){

       if(color == 'red'){
       redArray = []
       redpath.attr("d", [] )

	   }
    else 
     if(color == 'green'){
       greenArray = []
       greenpath.attr("d", [] )

       }
    else 
     if(color == 'blue'){
       blueArray = []
       bluepath.attr("d", [] )

	   }
    	
    });


function submit(){
    redValues= new Array(256).fill(0);
    greenValues= new Array(256).fill(0);
    blueValues= new Array(256).fill(0);
    
    console.log(redArray)
    console.log(greenArray)
    console.log(blueArray)
    if(redArray.length == 0)
    { 
     swal({
  icon: 'error',
  title: 'Oops...',
  text: "Please draw the red channel",
  
})}
    else
        if( greenArray.length == 0  )
    { 
     swal({
  icon: 'error',
  title: 'Oops...',
  text: "Please draw the green channel",
  
})}
      else
        if( blueArray.length == 0  )
    { 
     swal({
  icon: 'error',
  title: 'Oops...',
  text: "Please draw the blue channel",
  
})}
    else
    {
    for (ind = 0 ; ind < redArray.length; ind++)    
        { 
        index = redArray[ind]['x']
        value = redArray[ind]['y']
        redValues[index]= value;}
    for (ind = 0 ; ind < greenArray.length; ind++)    
        {
        index = greenArray[ind]['x']
        value = greenArray[ind]['y']
        greenValues[index]= value;}
    for (ind = 0 ; ind < blueArray.length; ind++) {   

        index = blueArray[ind]['x']
        value = blueArray[ind]['y']
        blueValues[index]= value;
        }
   
    
    $.getJSON('/background_process', {
				  redValues: JSON.stringify(redValues),
                  greenValues: JSON.stringify(greenValues),
				  blueValues: JSON.stringify(blueValues),

				}, function(data) {
        // returned from the server
        document.getElementById("result").style.display = "block";
        location.href = "#result";
				  console.log(data.result)
				});}
    
       
    //console.log(redValues)
    //console.log(greenValues)
    //console.log(blueValues)
}  
    


function show(col){
    if(col == 'red'){
     color = 'red'   
    }
    else
    if(col == 'green'){
     color = 'green'  
    }
    else
    if(col == 'blue'){
     color = 'blue' 
    }
}
 
  
    
   
 