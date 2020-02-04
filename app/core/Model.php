<?php
class Model extends PDO{
	private $dsm = 'mysql:dbname=tsb;host=localhost;charset=UTF8';
	private $user = 'tsb';
	private $pw = '';
	public function __construct(){
		parent::__construct($this->dsm,$this->user,$this->pw);
		}
}
?>
