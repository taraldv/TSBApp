<?php
class HomeController extends Controller{
	public function index(){
		$this->view('home'.'/'.'index.php');
		$this->view->render();	
	}
}
?>