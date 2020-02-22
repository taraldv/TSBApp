function applyTempEventListeners(){
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
	if(newTemperature<=30 && newTemperature>=10){
		roomTemperatureDiv.innerText = newTemperature;
	}
}