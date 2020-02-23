<?php
class TempController extends Controller{
	public function change(){
		if(count($_GET) > 0){
			$this->view('temp'.'/'.'change.php',$_GET['rom']);
			$this->view->render();
		} else {
			header("/");
		}
	}
	public function index(){
		$this->view('temp'.'/'.'index.php');
		$this->view->render();
		
	}
}
?>