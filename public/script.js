//Every room area is built with x,y coordinates. Always starting at top left corner, then going clockwise
function Plan(width,height) {
	this.bedroom1={color:"#C4CDE0",
	name:"Soverom 1",
	area:
	width*3/5+","+0+" "
	+width+","+0+" "
	+width+","+height*1/6+" "
	+width*3/5+","+height*1/6,
	x:width*3.5/5,y:height*1/6/2};

	this.bedroom2={color:"#CDE0C4",
	name:"Soverom 2",
	area:
	width*3/5+","+height*1/6+" "
	+width+","+height*1/6+" "
	+width+","+height*2/6+" "
	+width*3/5+","+height*2/6,
	x:width*3.5/5,y:height*1/4};

	this.bedroom3={color:"#CDE0C4",
	name:"Soverom 3",
	area:
	0+","+height*5/6+" "
	+width*2/6+","+height*5/6+" "
	+width*2/6+","+height+" "
	+0+","+height,
	x:width*1/10,y:height*11/12};

	this.hallway={color:"#A09CB3",
	name:"Gang",
	area:
	0+","+0+" "
	+width*3/5+","+0+" "
	+width*3/5+","+height*3/6+" "
	+width*2/5+","+height*3/6+" "
	+width*2/5+","+height*1/12+" "
	+0+","+height*1/12,
	x:width*1/5,y:height*0.6/12};

	this.office={color:"#C4CDE0",
	name:"Kontor",
	area:
	0+","+height*1/12+" "
	+width*2/5+","+height*1/12+" "
	+width*2/5+","+height*1.5/6+" "
	+0+","+height*1.5/6,
	x:width*1/6,y:height*1/6};

	this.livingroomAndKitchen={color:"#E0C4CD",
	name:"Stue og kjøkken",
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

	this.bathroom1={color:"#C4DBE0",
	name:"Bad 1",
	area:
	width*3/5+","+height*2/6+" "
	+width+","+height*2/6+" "
	+width+","+height*3/6+" "
	+width*3/5+","+height*3/6,
	x:width*3.5/5,y:height*4.2/10};

	this.bathroom2={color:"#C4DBE0",
	name:"Bad 2",
	area:
	0+","+height*1.5/6+" "
	+width*2/5+","+height*1.5/6+" "
	+width*2/5+","+height*2.5/6+" "
	+0+","+height*2.5/6,
	x:width*1/6,y:height*2/6};
};

function applyTempIndexEventListeners(){
	//temperatureValueArray contains temperatures matching the index from Plan obj.
	console.log(temperatureValueArray);
	let container = document.getElementById('svgContainer');
	let svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
	let width = document.body.clientWidth;
	let height = width*2;
	let romPlan = new Plan(width,height);
	let keys = Object.keys(romPlan);
	for (var i = 0; i < keys.length; i++) {
		let tempGroup = document.createElementNS("http://www.w3.org/2000/svg","g");
		let roomName = romPlan[keys[i]].name
		tempGroup.setAttribute("data-url",roomName);
		tempGroup.addEventListener("click",function(){
			let roomName = this.getAttribute("data-url");
			//console.log(roomName);
			window.location.href = "/temp/change?rom="+roomName.toLowerCase();
		});
		let tempPolygon = document.createElementNS("http://www.w3.org/2000/svg","polygon");
		let tempTextRoom = document.createElementNS("http://www.w3.org/2000/svg","text");
		tempTextRoom.innerHTML = roomName;
		tempTextRoom.setAttribute("x",romPlan[keys[i]].x);
		tempTextRoom.setAttribute("y",romPlan[keys[i]].y);
		let tempTextTemperature = document.createElementNS("http://www.w3.org/2000/svg","text");
		tempTextTemperature.innerHTML = temperatureValueArray[i]+"°C";
		tempTextTemperature.setAttribute("x",romPlan[keys[i]].x);
		tempTextTemperature.setAttribute("y",romPlan[keys[i]].y+20);
		tempPolygon.setAttribute("points",romPlan[keys[i]].area);
		tempPolygon.setAttribute("stroke","black");
		tempPolygon.setAttribute("fill",romPlan[keys[i]].color);
		tempGroup.appendChild(tempPolygon);
		tempGroup.appendChild(tempTextRoom);
		tempGroup.appendChild(tempTextTemperature);
		svg.appendChild(tempGroup);
	}
	
	svg.setAttribute("width",width);
	svg.setAttribute("height",height);


	container.appendChild(svg);
}

function findRoomId(roomName){
	let romPlan = new Plan(0,0);
	let keys = Object.keys(romPlan);
	for (var i = 0; i < keys.length; i++) {
		if (roomName==romPlan[keys[i]].name) {
			return i+1;
		}
	}
}

function applyTempChangeEventListeners(){
	//Smaller variable = quicker temperature update
	var responsiveness = 50;

	var currentAngle = 0;
	var tempChange = 0;

	var roomId = findRoomId(document.getElementById("romDiv").innerText);
	setInitalTemperature(roomId);
	
	var temperatureWheel = document.getElementById('temperatureWheel');
	var region = new ZingTouch.Region(temperatureWheel);
	region.bind(temperatureWheel, 'rotate', function(e){
		tempChange += e.detail.distanceFromLast;
		currentAngle += e.detail.distanceFromLast;
		temperatureWheel.style.transform = 'rotate(' + currentAngle + 'deg)';
		let temperatureDerivedFromAngle = Math.round(tempChange/responsiveness);
		if(temperatureDerivedFromAngle != 0){
			tempChange = 0;
			updateRoomTemperature(temperatureDerivedFromAngle,roomId);
		}
	});
}

function setInitalTemperature(id){
	var roomTemperatureDiv = document.getElementById('degrees');
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", function(){
		let data = JSON.parse(this.response);
		roomTemperatureDiv.innerText = data.temperatureValue;
	});
	oReq.open("POST", "/temp/getSpecificTemperature");
	oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	oReq.send("temperatureId="+id);
}

function updateRoomTemperature(degrees,id){
	let roomTemperatureDiv = document.getElementById('degrees');
	let oldTemperature = parseInt(roomTemperatureDiv.innerText);
	let newTemperature = oldTemperature+degrees;
	//User limit on temperature control
	if(newTemperature<=30 && newTemperature>=15){
		roomTemperatureDiv.innerText = newTemperature;
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", function(){
		});
		oReq.open("POST", "/temp/updateSpecificTemperature");
		oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		oReq.send("temperatureId="+id+"&temperatureValue="+newTemperature);
	}
}
