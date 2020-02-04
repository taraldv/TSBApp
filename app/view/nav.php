<?php 
$action = $this->getAction();
?>
<br>
<nav>
	<ul class='nav nav-pills justify-content-center'>
	<li class='nav-item'><a class='nav-link 
		<?php
		if($action == 'index.php'){
			echo 'active';
		}
		?>
		'href="/workout/index">Home</a></li>
	</ul>
</nav>
<br>

