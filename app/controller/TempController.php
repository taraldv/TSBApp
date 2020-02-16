<?php
class TempController extends Controller{
	public function index(){
		$this->view('temp'.'/'.'index.php');
		$this->view->render();	
	}
}
?>