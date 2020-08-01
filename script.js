require([
  'jquery',
  'core/modal_factory',
  'core/modal_events'
], (
  $,
  ModalFactory,
  ModalEvents
) => {

  let MAP = null;

  const mapModalHidden = (modal) => {
    if (MAP) {
      MAP.off();
      MAP.remove();
    }
    modal.destroy();
  };

  const zeroBounds = bounds => {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    return ne.lat === sw.lat && ne.lng === sw.lng;
  };

  const toBounds = bounds => {
    if (zeroBounds(bounds)) {
      MAP.setView(bounds.getCenter(), 15);
    } else {
      MAP.fitBounds(bounds);
    }
  };

  const mapRenderGeojson = data => {
    const geojsonLayer = L.geoJSON(data);
    geojsonLayer.addTo(MAP);
    toBounds(geojsonLayer.getBounds());
  };

  const addBasemap = () => {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(MAP);
  };

  const mapModalShown = () => {
    const $geo = $('#filter-geodata-modal geodata');
    if (!$geo.length) {
      return;
    }

    MAP = L.map('filter-geodata-map');
    addBasemap();
    if($geo.attr('format') === 'geojson') {
      mapRenderGeojson(JSON.parse($geo.html()))
    }
  };

  const showMapModal = modal => {
    modal.getRoot().on(ModalEvents.hidden, () => mapModalHidden(modal));
    modal.getRoot().on(ModalEvents.shown, mapModalShown);
    modal.show();
  };

  const geoLinkClicked = e => {
    if (!L) {
      return;
    }

    const $target = $(e.target);
    const geo = $target.find('geodata')[0].outerHTML;
    ModalFactory.create({
      title: M.str.filter_geodata.mapviewer,
      body: '<div id="filter-geodata-modal"><div id="filter-geodata-map" style="width:100%;height:60vh;"></div>' + geo + '</div>',
      large: true,
      type: ModalFactory.types.ALERT
    }).then(showMapModal);
  };

  const getGeodataFormat = $div => {
    if ($div.hasClass('filter-geodata-geojson')) {
      return 'geojson';
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

  const lazyLoad = () => {
    $.ajax({
      url: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js',
      dataType: 'script',
      success: () => {}
    });
    $('<link>')
      .attr('rel', 'stylesheet')
      .attr('type', 'text/css')
      .attr('href', 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css')
      .appendTo('head');
  };

  $(document).ready(() => {
    lazyLoad();

    const $geoDivs = $('.filter-geodata');
    if ($geoDivs.length) {
      $geoDivs.each((idx, geoDiv) => initiateGeodata(geoDiv));
    }

    $('body').on('click', '.filter-geodata-a', geoLinkClicked);
  });
});
