define(['jquery'], $ => {

  const getGeodataFormat = $div => {
    if ($div.hasClass('filter-geodata-geojson')) {
      return 'geojson';
    } else if ($div.hasClass('filter-geodata-point')) {
      return 'point';
    }
    return undefined;
  };

  const initiateGeodata = element => {
    const $element = $(element);
    if ($element.closest('textarea input .editor_atto').length) {
      return;
    }

    const format = getGeodataFormat($element);
    if (!format) {
      return;
    }

    const $geo = $('<geodata>')
      .attr('format', format)
      .css('display', 'none')
      .html($element.html());

    const $a = $('<a>')
      .attr('href', 'javascript:void(0);')
      .addClass('filter-geodata-a mx-1')
      .html($('<i>').addClass('fa fa-map-marker'))
      .append(' ')
      .append(M.str.filter_geodata.viewinmap)
      .append($geo);

    $element.replaceWith($a);
  };

  return $geos => {
    if ($geos.length) {
      $geos.each((idx, geo) => initiateGeodata(geo));
    }
  };
});
