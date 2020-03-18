//whenever the user clicks clear button, remove all drawn line based on the selcted color     
document.getElementById("clear").addEventListener("click", function(){

if(color == 'red'){
redArray = []
svg.selectAll("path.rline").remove();

}
else
if(color == 'green'){
greenArray = []
svg.selectAll("path.gline").remove();

}
else
if(color == 'blue'){
blueArray = []
svg.selectAll("path.bline").remove();

}

});

//this method is triggred, when the user clicks on submit button
function submit(){
redValues= new Array(256).fill(0);
greenValues= new Array(256).fill(0);
blueValues= new Array(256).fill(0);

//check if the user draw all the RGB channel, if not display a popup message    
if(redArray.length == 0)
{
swal({
icon: 'error',
title: 'Oops...',
text: "Please draw the red channel" })
}
else
if( greenArray.length == 0  )
{
swal({
icon: 'error',
title: 'Oops...',
text: "Please draw the green channel"})
}
else
if( blueArray.length == 0  )
{
swal({
icon: 'error',
title: 'Oops...',
text: "Please draw the blue channel"})
}
else //otherwise fill the three arrays
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

//sending the arrays to the server
$.getJSON('/background_process', {
  redValues: JSON.stringify(redValues),
  greenValues: JSON.stringify(greenValues),
  blueValues: JSON.stringify(blueValues),

}, function(data) {
//returned from the server
//display the image
document.getElementById("result").style.display = "block";
location.href = "#result";
document.getElementById("img").src = "../static/img/"+data.result+".png"
  console.log(data.result)
});}


console.log(redValues)
console.log(greenValues)
console.log(blueValues)
}

//if the user clicked on one of the RGB color button, activate the button and de-activate the rest
function show(col){
if(col == 'red'){
color = 'red'
document.getElementById('redButton').className = "btn btn-outline-danger active"
document.getElementById('greenButton').className = "btn btn-outline-success"
document.getElementById('blueButton').className = "btn btn-outline-primary"

}
else
if(col == 'green'){
color = 'green'
document.getElementById('redButton').className = "btn btn-outline-danger"
document.getElementById('greenButton').className = "btn btn-outline-success active"
document.getElementById('blueButton').className = "btn btn-outline-primary"
}
else
if(col == 'blue'){
color = 'blue'
document.getElementById('redButton').className = "btn btn-outline-danger"
document.getElementById('greenButton').className = "btn btn-outline-success"
document.getElementById('blueButton').className = "btn btn-outline-primary active"
}
}


