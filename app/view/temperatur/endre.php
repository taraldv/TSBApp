<?php include VIEW.'header.php';?>
<?php include VIEW.'nav.php';?>
<div class='container-fluid'>
	<h1 class="text-center">
		<div class='d-inline-block' id='romDiv'>
			<?php
				echo ucfirst("$this->viewData");
			?>
			
		</div>
		<br>
		<div class='d-inline-block'> temperatur:</div>
		<div class='d-inline-block' id='degrees'></div>
		<div class='d-inline-block' id='celcius'>°C</div>
	</h1>
	<div id='temperatureWheelContainer' class='media ml-5 mr-5'>
		<img class='img-fluid' data-angle='0' id='temperatureWheel' src="/img/wheel.png">
	</div>
</div>
<script>
	applyTempChangeEventListeners();
</script>
<?php include VIEW.'footer.php';?>