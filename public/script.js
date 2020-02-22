
const circle = {
	radius: 195
};

function applyTempEventListeners(){
	let temperatureWheel = document.getElementById('temperatureWheel');
	var zt = new ZingTouch.Region(temperatureWheel);
	zt.bind(temperatureWheel, 'rotate', function(e){
	//Actions here
}, false);
	new ZingTouch.Rotate()
	/*var x = 0;
	var y = 0;
	temperatureWheel.addEventListener('touchstart',function(event){
		x = event.touches[0].clientX;
		y = event.touches[0].clientY;
	});
	temperatureWheel.addEventListener('touchmove',function(event){
		let currentX = event.touches[0].clientX;
		let currentY = event.touches[0].clientY;
		console.log(event);
		console.log(event.touches);
		console.log(currentX);
		console.log(currentY);
		let differenceX = x - currentX;
		let differenceY = y - currentY;
		x = currentX;
		y = currentY;
		//Where on the image the touch started, a swipe will increase or decrease angle/temp
		rotate(3);
		updateRoomTemperature(1);
	});*/
}

function rotate(angle){
	let temperatureWheel = document.getElementById('temperatureWheel');
	let oldAngle = temperatureWheel.getAttribute('data-angle');
	let newAngle = parseInt(oldAngle)+angle;
	temperatureWheel.setAttribute('data-angle',newAngle);
	temperatureWheel.style = 'transform: rotate(' +newAngle+ 'deg)';
	
	
}

function updateRoomTemperature(degrees){
	let roomTemperatureDiv = document.getElementById('degrees');
	let roomTemperature = roomTemperatureDiv.innerText;
	roomTemperatureDiv.innerText = parseInt(roomTemperature)+degrees;
}