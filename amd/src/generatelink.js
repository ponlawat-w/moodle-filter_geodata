define(['jquery', 'filter_geodata/getgeodataformat'], ($, GetGeodataFormat) => {

  const initiateGeodata = element => {
    const $element = $(element);
    if ($element.closest('textarea').length ||
        $element.closest('input').length ||
        $element.closest('.editor_atto').length) {
      return;
    }

    const format = GetGeodataFormat($element);
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
