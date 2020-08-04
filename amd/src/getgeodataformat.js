define([], () => {
  return  $element => {
    if ($element.hasClass('filter-geodata-geojson')) {
      return 'geojson';
    } else if ($element.hasClass('filter-geodata-point')) {
      return 'point';
    }
    return undefined;
  };
});
