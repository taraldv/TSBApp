<?php
class TempController extends Controller{

	public function updateSpecificTemperature(){
		$this->model('TempModel');
		$temperatureId = $_POST['temperatureId'];
		$temperatureValue = $_POST['temperatureValue'];
		$this->model->updateSpecificTemperature($temperatureValue,$temperatureId);
	}

	public function getSpecificTemperature(){
		$this->model('TempModel');
		$temperatureId = $_POST['temperatureId'];
		$data = $this->model->getSpecificTemperature($temperatureId);
		echo json_encode($data);
	}

	public function change(){
		if(count($_GET) > 0){
			$this->view('temp'.'/'.'change.php',$_GET['rom']);
			$this->view->render();
		} else {
			header("/");
		}
	}
	public function index(){
		$this->model('TempModel');
		$temperatures = $this->model->getAllTemperatures();
		$this->view('temp'.'/'.'index.php',$temperatures);
		$this->view->render();
		
	}
}
?>