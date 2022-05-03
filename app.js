const mapToken = "pk.eyJ1IjoibWljaGFlbHNwYXJrczEzIiwiYSI6ImNsMmRoczNjMDAwMWkzYm10dzRyb3gxenQifQ.56aTkg40fV3OsQibg27VEA"

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
    center: [-73.96188873928705,40.8081823158802], // Starting position [lng, lat]
    zoom: 13.5, // Starting zoom level
  });

  //proximity to Columbia Univ
  //-73.96188873928705,40.8081823158802

  //bounding box to manhattan
  //-74.01571639683117, 40.70428308369745, -73.9235075482862, 40.8288730385091

  const marker = new mapboxgl.Marker()
  .setLngLat([-73.96188873928705, 40.8081823158802])
  .addTo(map);

  const geocoder = new MapboxGeocoder({
    accessToken: mapToken,
    mapboxgl: mapboxgl,
    maker: false,
    placeholder: "Search for places near Columbia University",
    bbox: [-74.01571639683117, 40.70428308369745, -73.9235075482862, 40.8288730385091],
    proximity: {
      longitude: -73.96188873928705,
      latitude: 40.8081823158802
    }
  });

  map.addControl(geocoder);

  map.on('load', () => {
    map.addSource('single-point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
  
    map.addLayer({
      id: 'point',
      source: 'single-point',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#448ee4'
      }
    });
  
    // Listen for the `result` event from the Geocoder
    // `result` event is triggered when a user makes a selection
    //  Add a marker at the result's coordinates
    geocoder.on('result', (event) => {
      map.getSource('single-point').setData(event.result.geometry);
    });
  });

  const searchBox = document.querySelector(".mapboxgl-ctrl-geocoder")
  searchBox.style.marginRight = "30%";
  searchBox.style.width = "200%";