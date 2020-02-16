function applyTempEventListeners(){
	let temperatureWheel = document.getElementById('temperatureWheel');
	var x = 0;
	var y = 0;
	temperatureWheel.addEventListener('touchstart',function(event){
		x = event.touches[0].clientX;
		y = event.touches[0].clientY;
	});
	temperatureWheel.addEventListener('touchmove',function(event){
		let currentX = event.touches[0].clientX;
		let currentY = event.touches[0].clientY;
		let differenceX = x - currentX;
		let differenceY = y - currentY;
		//Minimum distance for 1 degree rotation
		/*let moduloX = differenceX % 20;
		let moduloY = differenceY % 20;
		console.log(moduloY);
			console.log(moduloX);
		if(moduloY > 1 && moduloX > 1){
			rotate(1);
		}*/
	});
}

function rotate(angle){
	let temperatureWheel = document.getElementById('temperatureWheel');
	let oldAngle = temperatureWheel.getAttribute('data-angle');
	let newAngle = parseInt(oldAngle)+angle;
	temperatureWheel.setAttribute('data-angle',newAngle);
	temperatureWheel.style = 'transform: rotate(' +newAngle+ 'deg)';
}