mapboxgl.accessToken = mapToken;

// map değişkenine mapboxgl in cluster map için kullanılacak fonksiyon ve değişkenleri atandı.
const map = new mapboxgl.Map({
  container: "cluster-map",
  // Mapbox için hazırlanmış conteiner ın stil ayarlarının yapıldığı yer.
  style: "mapbox://styles/mapbox/light-v10",
  center: [26.337812, 39.488006],
  zoom: 3,
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// on fonksionu harita üzerindeki etkileşimlerin dinlenmesini başlatır.
// load parametresi haritaya yüklenicek verileri tanımlar.
// type: eklenicek olan verinin tipi
// data: elenicek olan veri url i seti
map.on("load", () => {
  // Add a new source from our GeoJSON data and
  // set the 'cluster' option to true. GL-JS will
  // add the point_count property to your source data.
  map.addSource("campgrounds", {
    type: "geojson",
    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
    //data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
    data: campgrounds,
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  });

  // .addLayer Cluster Map içerisinde eklenen verilerin belirteçleri sembolleri vb
  // stil özelliklerinin ayarlanması sağlanır.
  // Kümelerin(cluster) görünümlerini ayarlar.
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "campgrounds",
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
      // Default mapbox değerleri;
      //   * 100 den az bir sayı olduğunda mavi 20px daire.
      //   * 100 ve 750 arasında bir sayı olduğunda sarı 30px daire.
      //   * 750 den fazla bir sayı olduğunda pembe 40px daire.

      // Hangi sayılarda küme dairelerinin ne renk olacağı ayarlanır.
      "circle-color": ["step", ["get", "point_count"], "#51bbd6", 10, "#f1f075", 30, "#f28cb1"],
      // Hangi sayılarda küme dairelerinin ne boyutta olacağı ayarlanır.(px,sayı,px,sayı,px,sayı)
      "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 30, 25],
    },
  });

  // .addLayer Cluster Map içerisinde eklenen verilerin belirteçleri sembolleri vb
  // stil özelliklerinin ayarlanması sağlanır.
  // Kümelerin içinde kaç tane yerin olduğunun gösterilmesini sağlayan yapının stillerini ayarlar.
  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "campgrounds",
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  // .addLayer Cluster Map içerisinde eklenen verilerin belirteçleri sembolleri vb
  // stil özelliklerinin ayarlanması sağlanır.
  // Kümelerin yakınlaştırılarak bölünüp son kalan noktayı ifade eder.
  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "campgrounds",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });

  // on fonksionu harita üzerindeki etkileşimlerin dinlenmesini başlatır.
  // click ve clusters parametreleri, haritadaki kümelere tıklandığında oluşacak işlemi yakalar.
  // Eğer haritadaki kümelere tıklanırsa harita zoom yapar ve ...
  map.on("click", "clusters", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    const clusterId = features[0].properties.cluster_id;
    map.getSource("campgrounds").getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;

      // Harita üzerinde tklanan kümeleri ortalar ve onlara zoom yapılmasını sağlar.
      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom,
      });
    });
  });

  // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.

  // on fonksionu harita üzerindeki etkileşimlerin dinlenmesini başlatır.
  // click ve unclustered-point parametreleri;
  // haritada yakınlaştırılarak 1 tane yerin kaldığı zaman o yeri vurgulayan daireye
  // tıklandığında tsunami tehlikesinin olup olmadığını bir kutu içerisinde açarak gösterir.
  map.on("click", "unclustered-point", (e) => {
    const { popUpMarkup } = e.features[0].properties;
    const coordinates = e.features[0].geometry.coordinates.slice();

    //const mag = e.features[0].properties.mag;
    // Tsunaminin olup olmadığı default ayarlarda kontrol ediliyor.
    //const tsunami = e.features[0].properties.tsunami === 1 ? "yes" : "no";

    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    if (["mercator", "equirectangular"].includes(map.getProjection().name)) {
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
    }

    // Harita içinde açılan Popup nesnesi ve gereken değişkenler.
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      // Açılan popup için tanımlanacak html verileri.
      .setHTML(popUpMarkup)
      .addTo(map);
  });

  // on fonksionu harita üzerindeki etkileşimlerin dinlenmesini başlatır.
  // mouseenter ve clusters parametreleri ile mouseun küme üzerine geldiğinde oluşacak durumları
  // dinler. Burada imlecin şeklinin değişmesi ayarlanıyor.
  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });
});
