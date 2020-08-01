<?php

class filter_geodata extends moodle_text_filter {
  public function setup($page, $context) {
    $page->requires->strings_for_js(['viewinmap', 'mapviewer'], 'filter_geodata');
    $page->requires->js(new moodle_url('/filter/geodata/script.js'));
  }

  public function filter($text, array $options = []) {
    return $text;
  }
}
