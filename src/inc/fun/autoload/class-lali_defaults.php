<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Lali_defaults {


	protected $defaults = array();

	public function add_default( $arr ){
		$defaults = $this->defaults;
		$this->defaults = array_merge( $defaults , $arr);
	}
	
	public function get_default( $key ){
		if ( array_key_exists($key, $this->defaults) ){
			return $this->defaults[$key];

		}
			return null;
	}


}

function lali_init_defaults(){
	global $lali_defaults;
	
	$lali_defaults = new Lali_defaults();
	
	// $defaults = array(
	// 	// silence ...
	// );
	
	// $lali_defaults->add_default( $defaults );	
}
add_action( 'admin_init', 'lali_init_defaults', 1 );
add_action( 'init', 'lali_init_defaults', 1 );



?>