<?php
defined('MOODLE_INTERNAL') or die();

$plugin->version = 2020080300;
$plugin->requires = 2020061500;
$plugin->component = 'filter_geodata';
$plugin->dependencies = [
  'local_leaflet' => 2020080300
];
