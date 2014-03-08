<?php

	// remove junk from head
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wp_generator');
	remove_action('wp_head', 'feed_links', 2);
	remove_action('wp_head', 'index_rel_link');
	remove_action('wp_head', 'wlwmanifest_link');
	remove_action('wp_head', 'feed_links_extra', 3);
	remove_action('wp_head', 'start_post_rel_link', 10, 0);
	remove_action('wp_head', 'parent_post_rel_link', 10, 0);
	remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);

	// add google analytics to footer
	function add_google_analytics() {
		echo '<script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>';
		echo '<script type="text/javascript">';
		echo 'var pageTracker = _gat._getTracker("UA-XXXXX-X");';
		echo 'pageTracker._trackPageview();';
		echo '</script>';
	}
	add_action('wp_footer', 'add_google_analytics');


	// Required external files
	require_once( 'external/starkers-utilities.php' );


	// Increase Image Quality
	function gpp_jpeg_quality_callback($arg){
		return (int)100;
	}
	add_filter('jpeg_quality', 'gpp_jpeg_quality_callback');


	// Thumbnails
	add_theme_support('post-thumbnails');
	add_image_size( 'native', 1600, 9999 );
	add_image_size( 'full', 1200, 9999 );
	add_image_size( 'large', 1000, 9999 );
	add_image_size( 'medium', 800, 9999 );
	add_image_size( 'small', 600, 9999 );
	add_image_size( 'thumb', 450, 9999 );
	
	// Page Excerpts
	add_action( 'init', 'my_add_excerpts_to_pages' );
	function my_add_excerpts_to_pages() {
	     add_post_type_support( 'page', 'excerpt' );
	}
	
	// Register Nav Menu
	register_nav_menus(array('primary' => 'Primary Navigation'));

	
	// Actions and Filters
	add_action( 'wp_enqueue_scripts', 'starkers_script_enqueuer' );
	add_filter( 'body_class', array( 'Starkers_Utilities', 'add_slug_to_body_class' ) );


	// Custom Post Types
	// require_once( 'custom-functions/meta_secondary-headline.php' );
	
	
	// Scripts
	function starkers_script_enqueuer() {
		wp_deregister_script( 'jquery' );

		wp_enqueue_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js','', '', true );
		
		wp_enqueue_script( 'site', get_template_directory_uri().'/_assets/js/site.min.js', array( 'jquery' ), '', true );

		wp_enqueue_style( 'screen', get_stylesheet_directory_uri().'/_assets/css/style.css', '', '', 'screen' );
	}	
