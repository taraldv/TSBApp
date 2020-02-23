<?php
class TemperaturModel extends Model{
	
	public function getAllTemperatures(){
		$data = $this->query("SELECT temperatureValue FROM temperatureTable")->fetchAll();
		return $data;
	}

	public function getSpecificTemperature($id){
		$data = $this->query("SELECT temperatureValue FROM temperatureTable WHERE temperatureId = $id")->fetch();
		return $data;
	}

	public function updateSpecificTemperature($temperature,$id){
		$data = $this->query("UPDATE temperatureTable SET temperatureValue = $temperature WHERE temperatureId = $id")->fetch();
		return $data;
	}
}
?>