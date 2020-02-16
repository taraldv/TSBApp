<?php
class TempController extends Controller{
	public function index(){
		if(count($_GET) > 0){
			$this->view('temp'.'/'.'index.php',$_GET['rom']);
			$this->view->render();
		} else {
			header("/");
		}
	}
}
?>