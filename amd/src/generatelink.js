define(['jquery'], $ => {

  const getGeodataFormat = $div => {
    if ($div.hasClass('filter-geodata-geojson')) {
      return 'geojson';
    } else if ($div.hasClass('filter-geodata-point')) {
      return 'point';
    }
    return undefined;
  };

  const initiateGeodata = div => {
    const $div = $(div);
    if ($div.parent('textarea input').length) {
      return;
    }

    const format = getGeodataFormat($div);
    if (!format) {
      return;
    }

    const $geo = $('<geodata>')
      .attr('format', format)
      .css('display', 'none')
      .html($div.html());

    const $a = $('<a>')
      .attr('href', 'javascript:void(0);')
      .addClass('filter-geodata-a mx-1')
      .html($('<i>').addClass('fa fa-map-marker'))
      .append(' ')
      .append(M.str.filter_geodata.viewinmap)
      .append($geo);

    $div.replaceWith($a);
  };

  return $geoDivs => {
    if ($geoDivs.length) {
      $geoDivs.each((idx, geoDiv) => initiateGeodata(geoDiv));
    }
  };
});
