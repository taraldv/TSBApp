<?php include VIEW.'header.php';?>
<?php include VIEW.'nav.php';?>
<img src="/img/logo2.png">
<div id='degrees'>20</div><div id='celcius'>°C</div>
<img data-angle='0' id='temperatureWheel' src="/img/wheel.png">
<script>
	applyTempEventListeners();
</script>
<?php include VIEW.'footer.php';?>