//Every room area is built with x,y coordinates. Always starting at top left corner, then going clockwise
function Plan(width,height) {
	this.bedroom1={name:"Bedroom 1",
	area:
	width*3/5+","+0+" "
	+width+","+0+" "
	+width+","+height*1/6+" "
	+width*3/5+","+height*1/6,
	x:width*3.5/5,y:height*1/6/2};

	this.bedroom2={name:"Bedroom 2",
	area:
	width*3/5+","+height*1/6+" "
	+width+","+height*1/6+" "
	+width+","+height*2/6+" "
	+width*3/5+","+height*2/6,
	x:width*3.5/5,y:height*1/4};

	this.bedroom3={name:"Bedroom 3",
	area:
	0+","+height*5/6+" "
	+width*2/6+","+height*5/6+" "
	+width*2/6+","+height+" "
	+0+","+height,
	x:width*1/10,y:height*11/12};

	this.hallway={name:"Gang",
	area:
	0+","+0+" "
	+width*3/5+","+0+" "
	+width*3/5+","+height*3/6+" "
	+width*2/5+","+height*3/6+" "
	+width*2/5+","+height*1/12+" "
	+0+","+height*1/12,
	x:width*1/5,y:height*0.6/12};

	this.office={name:"Kontor",
	area:
	0+","+height*1/12+" "
	+width*2/5+","+height*1/12+" "
	+width*2/5+","+height*1.5/6+" "
	+0+","+height*1.5/6,
	x:width*1/6,y:height*1/6};

	this.livingroomAndKitchen={name:"Stue & kjøkken",
	area:
	0+","+height*2.5/6+" "
	+width*2/5+","+height*2.5/6+" "
	+width*2/5+","+height*3/6+" "
	+width+","+height*3/6+" "
	+width+","+height+" "
	+width*2/6+","+height+" "
	+width*2/6+","+height*5/6+" "
	+0+","+height*5/6+" ",
	x:width*1/2,y:height*3/4};

	this.bathroom1={name:"Bathroom 1",
	area:
	width*3/5+","+height*2/6+" "
	+width+","+height*2/6+" "
	+width+","+height*3/6+" "
	+width*3/5+","+height*3/6,
	x:width*3.5/5,y:height*4.2/10};

	this.bathroom2={name:"Bathroom 2",
	area:
	0+","+height*1.5/6+" "
	+width*2/5+","+height*1.5/6+" "
	+width*2/5+","+height*2.5/6+" "
	+0+","+height*2.5/6,
	x:width*1/6,y:height*2/6};
};

function applyTempIndexEventListeners(){
	let container = document.getElementById('svgContainer');
	let svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
	let width = document.body.clientWidth;
	let height = width*2;
	let romPlan = new Plan(width,height);
	let keys = Object.keys(romPlan);
	for (var i = keys.length - 1; i >= 0; i--) {
		let tempGroup = document.createElementNS("http://www.w3.org/2000/svg","g");
		let tempPolygon = document.createElementNS("http://www.w3.org/2000/svg","polygon");
		let tempTextRoom = document.createElementNS("http://www.w3.org/2000/svg","text");
		tempTextRoom.innerHTML = romPlan[keys[i]].name;
		tempTextRoom.setAttribute("x",romPlan[keys[i]].x);
		tempTextRoom.setAttribute("y",romPlan[keys[i]].y);
		let tempTextTemperature = document.createElementNS("http://www.w3.org/2000/svg","text");
		tempPolygon.setAttribute("points",romPlan[keys[i]].area);
		tempPolygon.setAttribute("stroke","black");
		tempPolygon.setAttribute("fill","none");
		tempGroup.appendChild(tempTextRoom);
		tempGroup.appendChild(tempTextTemperature);
		tempGroup.appendChild(tempPolygon);
		svg.appendChild(tempGroup);
	}
	
	svg.setAttribute("width",width);
	svg.setAttribute("height",height);


	container.appendChild(svg);
}

function applyTempChangeEventListeners(){
	//Smaller variable = quicker temperature update
	var responsiveness = 50;

	var currentAngle = 0;
	var tempChange = 0;

	var temperatureWheel = document.getElementById('temperatureWheel');
	var region = new ZingTouch.Region(temperatureWheel);
	region.bind(temperatureWheel, 'rotate', function(e){
		tempChange += e.detail.distanceFromLast;
		currentAngle += e.detail.distanceFromLast;
		temperatureWheel.style.transform = 'rotate(' + currentAngle + 'deg)';
		let temperatureDerivedFromAngle = Math.round(tempChange/responsiveness);
		if(temperatureDerivedFromAngle != 0){
			tempChange = 0;
			updateRoomTemperature(temperatureDerivedFromAngle);
		}
	});
}

function updateRoomTemperature(degrees){
	let roomTemperatureDiv = document.getElementById('degrees');
	let oldTemperature = parseInt(roomTemperatureDiv.innerText);
	let newTemperature = oldTemperature+degrees;
	//User limit on temperature control
	if(newTemperature<=30 && newTemperature>=15){
		roomTemperatureDiv.innerText = newTemperature;
	}
}
