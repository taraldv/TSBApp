<?php
class HomeController extends Controller{
	public function index(){
		$this->view('login'.'/'.'index.php');
		$this->view->render();	
	}
}
?>