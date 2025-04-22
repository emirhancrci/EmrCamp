# EmrCamp - Campground Review Application

## Amaç
+ Kamp tutkunları için geliştirilen EmrCamp, kullanıcıların deneyimlerini paylaştığı etkileşimli bir platformdur. Kullanıcılar kamp alanlarının konumlarını haritada işaretleyebilir, görseller, fiyatlar ve yorumlar gibi detayları ekleyerek diğer gezginler için hızlı ve kolay bir rehber oluşturabilirler.

## Canlı Demo
+ Uygulamanın güncel ve çalışan versiyonuna buradan erişebilirsiniz: [EmrCamp](https://emrcamp.onrender.com)

*Uygulamanın web sitesi şuan aktif olarak hizmet verdiğinden dolayı site ile etkileşimde bulunmanız mümkündür. Tam olarak yararlanmak için site içi üyelik ile devam edilmesi önerilir.*

## Özellikler
+ Kullanıcıların kamp alanlarını/konumları listeleyebilmesi ve görüntüleyebilmesi.
+ Kullanıcı hesabı oluşturma, giriş yapma ve güvenli çıkış yapma.
+ Kamp alanlarına yorum ve puan ekleme. 
+ Kamp alanları için resim yükleme.
+ Kamp alanlarını harita üzerinde görme.
+ Duyarlı tasarım sayesinde farklı cihazlarda uyumlu kullanım. 


## Kullanılan Teknolojiler
+ **Backend:** Node.js, Express.js, MongoDB, RESTful API, Passport.js, Helmet, Mongoose, Dotenv
+ **Frontend:** HTML5, CSS3, JavaScript (ES6+), Ejs (Embedded JavaScript templates), Mapbox GL JS, Bootstrap
+ **Veritabanı:** MongoDB
+ **Depolama:** Cloudinary (Resim yükleme ve yönetimi için) 
+ **Dağıtım:** Render

## Proje Dosya Yapısı
+ **/cloudinary**
    - Resim eklemek için kullanılacak **Cloudinary** depolama alanını ve projeye entegrasyonu sağlayabilmesi için **Multer** ayarlarını içerir.
+ **/controllers**
    - **Modüler** bir yapı sağlamak amacıyla istek atılan endpointlerin ilişkili sayfa ile işlevselliklerinin bulunduğu klasördür. İhtiyaç duyulan middleware, veritabanı şema-model vb. fonksiyonları içerir.
+ **/models**
    - Verilerin **Mongoose** ile  **MongoDB** veritabanına yerleştirilmesi ve uyumluluğunu sağlıyacak olan modellerin şemalarını içerir.
+ **/public**
    - İnternet tarayıcısının, sayfanın görüntülenmesinde kullanması gereken **CSS**, **JS** gibi yapıların ayar dosyalarını içerir.
+ **/routes**
    - Sayfaya yapılan **HTML** isteklerinin hangi endpoint lerin, hangi middleware lar ile kontrollerden geçeceği gibi rota ayarlarını içerir.
+ **/seeds**
    - Web sayfasının üretim sürecinde veri yönetimi ve şemalarının hazırlanmasında çeşitli denemelerin yapılması için hazırlanmış veri setlerini içerir. *(Çalışması için gerekli değildir.)*
+ **/utils**
    - **Express**'in otomatik hata yakalama fonksiyonu ayarlarını ve asenkron fonksiyonlardaki hataları yakalamak için kullanılan yardımcı yapıları içerir.
+ **/views**
    - **/campgrounds**
        * Uygulamanın web tarayıcısı üzerinde gösterilecek tasarım kodlarını ve **EJS** kullanarak verilerin entegre edildiği şablonları içerir.
    - **/layouts**
        * Uygulama sayfalarının şablon tasarım kodlarını içerir. Kod tekrarından kaçınılması ve tasarımdaki değişimlerin hızla sağlanmasını sağlar.
    - **/partials**
        * Uygulama sayfasının belli bölümlerinin şablon tasarım kodlarını içerir.
        * **Flash** bildirimleri, gibi sayfa dinamikliğini arttıran yapıyı da içerir.
+ **app.js**
    - Projenin başlatıcı dosyasıdır. 
    - Tüm çalışma zamanında gerekli olan yönlendirmeler, fonksiyonlar, frameworkler, veritabanı bağlantıları, cookie, session ve flash yönetimleri ve güvenliğin sağlanması için gerekli HTTP, veritabanı ve authentication gibi olaylardaki çeşitli zafiyetlerin giderilmesini sağlyan yapıları içerir.
+ **middleware.js**
    - Uygulamanın belli sayfalarında değil de genel bütünün de kontrolün sağlanmasını sağlayan middleware ları içerir.
+ **schema.js**
    - Kullanıcı tarafından yanlış veri gönderilmesini engelleme veya girilecek olan verilerin hangi formatlarının destekleneceği gibi ek kontrol sağlayan **JOI** nin tanımlanan kurallarını içerir.

## Lisans
![GitHub License](https://img.shields.io/github/license/emirhancrci/EmrCamp)
Tüm varlıklar ve kodlar [MIT LİSANSI](https://github.com/emirhancrci/EmrCamp/blob/main/LICENSE) altındadır. 
