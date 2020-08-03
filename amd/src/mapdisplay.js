define([
  'jquery',
  'core/modal_factory',
  'core/modal_events',
  'filter_geodata/initleaflet'
], (
  $,
  ModalFactory,
  ModalEvents,
  initLeaflet
) => {

  let MAP = null;

  initLeaflet();

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
      mapRenderGeojson(JSON.parse($geo.html()));
    }
  };

  const showMapModal = modal => {
    modal.getRoot().on(ModalEvents.hidden, () => mapModalHidden(modal));
    modal.getRoot().on(ModalEvents.shown, mapModalShown);
    modal.show();
  };

  return $target => {
    if (!L) {
      console.error('Leaflet is not initialised!');
      return;
    }

    const geo = $target.find('geodata')[0].outerHTML;
    ModalFactory.create({
      title: M.str.filter_geodata.mapviewer,
      body: '<div id="filter-geodata-modal"><div id="filter-geodata-map" style="width:100%;height:60vh;"></div>' + geo + '</div>',
      large: true,
      type: ModalFactory.types.ALERT
    }).then(showMapModal);
  };

});
