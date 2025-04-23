[ENG](#sayfa)

---
# EmrCamp - Kamp Alanı Uygulaması

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

## Lisans ![GitHub License](https://img.shields.io/github/license/emirhancrci/EmrCamp)
**EmrCamp**, tüm varlıkları ve kodları [MIT Lisansı](https://github.com/emirhancrci/EmrCamp/blob/main/LICENSE) altındadır. 


## sayfa


# 🇺🇸 • EmrCamp - Campground

## Purpose
+ Developed for camping enthusiasts, EmrCamp is an interactive platform where users share their experiences. Users can mark the locations of campgrounds on a map, add details such as images, prices, and reviews, creating a quick and easy guide for fellow travelers.

## Live Demo
+ You can access the current and working version of the application here: [EmrCamp](https://emrcamp.onrender.com)

*As the application's website is currently active and in service, you can interact with the site. It is recommended to proceed with in-site membership for full utilization.*

## Features
+ Users can list and view campgrounds/locations.
+ User account creation, login, and secure logout.
+ Add reviews and ratings to campgrounds.
+ Upload images for campgrounds.
+ View campgrounds on a map.
+ Responsive design for compatible use on different devices.

## Technologies Used
+ **Backend:** Node.js, Express.js, MongoDB, RESTful API, Passport.js, Helmet, Mongoose, Dotenv
+ **Frontend:** HTML5, CSS3, JavaScript (ES6+), Ejs (Embedded JavaScript templates), Mapbox GL JS, Bootstrap
+ **Database:** MongoDB
+ **Storage:** Cloudinary (For image upload and management)
+ **Deployment:** Render

## Project File Structure
+ **/cloudinary**
    - Contains settings for the Cloudinary storage area to be used for adding images and Multer settings for integration into the project.
+ **/controllers**
    - This folder contains the functionalities of endpoints related to the requested pages to provide a modular structure. It includes necessary middleware, database schema-model, etc., functions.
+ **/models**
    - Contains the schemas for models that will ensure the placement and compatibility of data in the MongoDB database with Mongoose.
+ **/public**
    - Contains configuration files for structures like CSS, JS that the web browser needs to use for displaying the page.
+ **/routes**
    - Contains routing settings for how HTML requests made to the page will pass through controls with which endpoints and middleware.
+ **/seeds**
    - Contains data sets prepared for various experiments in data management and schema preparation during the website's development process. *(Not required for operation.)*
+ **/utils**
    - Contains settings for Express's automatic error handling function and helper structures used to catch errors in asynchronous functions.
+ **/views**
    - Contains the design codes to be displayed on the web browser for the application and templates where data is integrated using EJS.
    - **/campgrounds**
        * Contains EJS templates specifically for displaying and managing campgrounds.
    - **/layouts**
        * Contains template design codes for application pages. It helps avoid code repetition and allows for rapid changes in design.
    - **/partials**
        * Contains template design codes for specific parts of application pages. It also includes structures that increase page dynamism, such as Flash notifications.
+ **app.js**
    - This is the project's startup file. It contains all necessary routing, functions, frameworks, database connections, cookie, session, and flash management, and structures that ensure security by addressing various vulnerabilities in HTTP, database, and authentication events during runtime.
+ **middleware.js**
    - Contains middleware that provides control across the entire application rather than just on specific pages.
+ **schema.js**
    - Contains the rules defined by JOI, which provides additional control such as preventing incorrect data submission by the user or specifying supported data formats.

## License ![GitHub License](https://img.shields.io/github/license/emirhancrci/EmrCamp)
**EmrCamp**, all its assets and code are under [MIT License](https://github.com/emirhancrci/EmrCamp/blob/main/LICENSE).

