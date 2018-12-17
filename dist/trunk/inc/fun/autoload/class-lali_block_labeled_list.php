<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Lali_Block_Labeled_list {

	protected static $instance = null;
	protected $namspace = 'lali/labeled-list';

	protected $handles = array(
		'editor' => 'lali_block_labeled_list_editor',
		'frontend' => 'lali_block_labeled_list_frontend',
	);

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
			self::$instance->hooks();
		}

		return self::$instance;
	}

	protected function __construct() {
		// ... silence
	}

	public function hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_frontend_assets' ) );
	}

	public function register_block() {
		if ( function_exists( 'register_block_type' ) ) {
			register_block_type( $this->namspace, array(
				'editor_script' => $this->get_handle( 'editor' ),
				'editor_style' => $this->get_handle( 'editor' ),
			) );
		}
	}

	protected function get_handle( $key ){
		$handles = $this->handles;
		if ( array_key_exists( $key, $handles ) ){
			return $handles[$key];
		}

	}

	// protected function get_localize_data(){
	// 	return array();
	// }

	// hooked on enqueue_block_assets. So function will run in admin and frontend.
	// But we will use it only on frontend if the post has this block
	public function enqueue_frontend_assets() {

		// check if we are on frontend
		if ( is_admin() )
			return;

		$handle = $this->get_handle( 'frontend' );

		wp_enqueue_style(
			$handle,
			Lali_Labeled_list_block::plugin_dir_url() . '/css/' . $handle . '.min.css',
			array(),
			filemtime( Lali_Labeled_list_block::plugin_dir_path() . 'css/' . $handle . '.min.css' )
		);

	}

	// hooked on enqueue_block_editor_assets. So function will only run in admin
	public function enqueue_editor_assets() {
		$handle = $this->get_handle( 'editor' );

		wp_register_script(
			$handle,
			Lali_Labeled_list_block::plugin_dir_url() . '/js/' . $handle . '.min.js',
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
			),
			filemtime( Lali_Labeled_list_block::plugin_dir_path() . 'js/' . $handle . '.min.js' )
		);

		// wp_localize_script( $handle, 'laliData', $this->get_localize_data() );
		wp_set_script_translations( $handle, 'lali', Lali_Labeled_list_block::plugin_dir_path() . 'languages' );
		wp_enqueue_script( $handle );

		wp_enqueue_style(
			$handle,
			Lali_Labeled_list_block::plugin_dir_url() . '/css/' . $handle . '.min.css',
			array( 'wp-edit-blocks' ),
			filemtime( Lali_Labeled_list_block::plugin_dir_path() . 'css/' . $handle . '.min.css' )
		);
	}

}

function lali_block_labeled_list_init() {
	return Lali_Block_Labeled_list::get_instance();
}

lali_block_labeled_list_init();

?>