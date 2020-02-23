<?php
class Application{
	protected $controller = 'HomeController';
	protected $action = 'index';

	public function __construct(){
		$this->prepareURL();
		$this->controller = ucfirst($this->controller);
		if(file_exists(CONTROLLER.$this->controller.'.php')){
			$this->controller = new $this->controller;
			if(method_exists($this->controller,$this->action)){
				call_user_func_array([$this->controller,$this->action],[]);
			}
		}
	}

	/* Splits URL into controller object and controller function. Updates variables if they exist.  */
	protected function prepareURL(){
		$request = trim($_SERVER['REQUEST_URI'],'/');
		if(!empty($request)){
			//Removes request parameters from url
			$token = explode('?', $request);
			$urlArray = explode('/',$token[0]);
			if(isset($urlArray[0])){
				$this->controller = $urlArray[0].'Controller';
			}
			if(isset($urlArray[1])){
				$this->action =  $urlArray[1];
			}
		} 
	}

	/* Redirects to login if session not set and not visiting a login page */
	/*protected function checkSession(){
		session_start();
		if(!isset($_SESSION['email']) && $this->controller!='LoginController'){
			header('Location: /login');
		}
	}*/
}
?>
