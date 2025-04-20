mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  projection: "globe",
  zoom: 11,
  center: campground.geometry.coordinates,
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-left");

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h5>${campground.title}</h5><p>${campground.location}</p>`
    )
  )
  .addTo(map);
