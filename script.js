require([
  'jquery',
  'filter_geodata/generatelink',
  'filter_geodata/mapdisplay'
], (
  $,
  GeodataGenerateLink,
  MapDisplay
) => {

  $(document).ready(() => {
    GeodataGenerateLink($('.filter-geodata'));

    $('body').on('click', '.filter-geodata-a', e => {
      MapDisplay($(e.target));
    });
  });

});
