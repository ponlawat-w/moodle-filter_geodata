define(['jquery'], $ => {
  return () => {
    if (!$('link[href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"]').length) {
      $('<link>')
        .attr('rel', 'stylesheet')
        .attr('type', 'text/css')
        .attr('href', 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css')
        .appendTo($('head'));
    }

    $.ajax({
      url: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js',
      dataType: 'script',
      success: () => {}
    });
  };
});
