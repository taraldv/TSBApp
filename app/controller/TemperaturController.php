<?php
class TemperaturController extends Controller{

	public function updateSpecificTemperature(){
		$this->model('TemperaturModel');
		$temperatureId = $_POST['temperatureId'];
		$temperatureValue = $_POST['temperatureValue'];
		$this->model->updateSpecificTemperature($temperatureValue,$temperatureId);
	}

	public function getSpecificTemperature(){
		$this->model('TemperaturModel');
		$temperatureId = $_POST['temperatureId'];
		$data = $this->model->getSpecificTemperature($temperatureId);
		echo json_encode($data);
	}

	public function endre(){
		if(count($_GET) > 0){
			$this->view('temperatur'.'/'.'endre.php',$_GET['rom']);
			$this->view->render();
		} else {
			header("/");
		}
	}
	public function index(){
		$this->model('TemperaturModel');
		$temperatures = $this->model->getAllTemperatures();
		$this->view('temperatur'.'/'.'index.php',$temperatures);
		$this->view->render();
		
	}
}
?>