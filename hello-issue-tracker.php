<?php

/*
Plugin Name: Hello Issue Tracker
Plugin URI: https://github.com/SayHelloGmbH/hello-issue-tracker
Description: A WordPress Plugin to create, edit and delete Gitlab Issues right from the WP-Admin
Author: Nico Martin / Say Hello GmbH (nico@sayhello.ch)
Version: 0.1.32
Author URI: https://sayhello.ch
Text Domain: hello-issue-tracker
Domain Path: /languages
*/

defined('ABSPATH') or die();

add_action('init', function () {
	load_plugin_textdomain('hello-issue-tracker', false, basename(dirname(__FILE__)) . '/languages');
});

require_once 'src/Plugin.php';
function helloissuetracker()
{
	return SayHello\IssueTracker\Plugin::getInstance(__FILE__);
}

require_once 'src/Vendor/Helpers.php';
helloissuetracker();
helloissuetracker()->run();

require_once 'src/Vendor/Settings.php';
helloissuetracker()->settings = SayHello\IssueTracker\Settings::getInstance('helloissuetracker');
helloissuetracker()->settings->setParentPage(helloissuetracker()->prefix);

require_once 'src/Package/Assets.php';
helloissuetracker()->Assets = new SayHello\IssueTracker\Assets();
helloissuetracker()->Assets->run();

require_once 'src/Package/SettingsPage.php';
helloissuetracker()->SettingsPage = new SayHello\IssueTracker\SettingsPage();
helloissuetracker()->SettingsPage->run();
