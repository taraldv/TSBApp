<?php include VIEW.'header.php';?>
<?php include VIEW.'nav.php';?>
<div class='container-fluid'>
	<div class='media'>
		<img class='img-fluid' src="/img/logo2.png">
	</div>
	<h1 class="text-center">
		<div>
			<?php
				echo ucfirst("$this->viewData");
			?>	
		</div>
		<div class='d-inline-block' id='degrees'>20</div>
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