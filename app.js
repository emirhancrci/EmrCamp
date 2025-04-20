if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//node_modules 'e yüklenen modüller projeye dahil edildi.
const express = require("express");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
//passport.js ve passport-local projeye dahil edildi.
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const helmet = require("helmet");
// Mongo Injection engellemek için kullanıldı.
const mongoSanitize = require("express-mongo-sanitize");

// Rotalar dahil edildi.
const usersRoutes = require("./routes/users.js");
const campgroundsRoutes = require("./routes/campgrounds.js");
const reviewsRoutes = require("./routes/reviews.js");

// .env MongoDB bağlantı değişkeni
//const dbUrl = process.env.DB_URL;
const dbUrl = "mongodb://127.0.0.1:27017/emr-camp";

// Mongoose ile MongoDB veritabanına bağlandı.
// LOCAL ADRESS "mongodb://127.0.0.1:27017/emr-camp"
// MongoDB Atlas dbUrl
// Deneysel işlemler için local veritabanı kullanılıyor.
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Veritabanina baglandi.");
  })
  .catch((err) => {
    console.log("Baglanti Hatasi: ", err);
  });

/* Eski yöntem.
// mongoose.connection kullanılarak bağlantıda hata olup olmadığına bakılmıştır.
// console.error -> Hata mesajının farklı renkte görülmesini sağlar.
// bind ise hata mesajından önce konsola "connection error" ifadesinin yazılmasını sağlar.
// on olayın sürekli dinlenmesini sağlayan listener dır.
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Baglanti Hatasi: "));
// once veritabanı bağlanana kadar dinlenir. Bir kere bağlandığında listener işi biter.
db.once("open", () => {
  console.log("Veritabanina bağlandi.");
});
*/

const app = express();

// varsayılan şablon motorunu ayarlar modülerlik için.
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
// views klasörünün main dosyaya göre konumunu ayarlamaktadır.
app.set("views", path.join(__dirname, "views"));

// Gelenx-www-form-urlencoded türündeki verileri ayrıştırmak için kullanılan middleware
// Gelen POST isteklkerinin iç içe geçerek toplu durmasını sağlar example[body]
app.use(express.urlencoded({ extended: true }));
// PUT, DELETE, PATCH gibi isteklerin okunması için normal istek methodlarının değiştirilmesini sağlar.
app.use(methodOverride("_method"));
// Static dosyaların kök konumu "/" public klasörü olmuştur.
app.use(express.static(path.join(__dirname, "public")));
// Mongo Injection önlemek için proje kullanımına sunuldu.
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

// MongoDB bağlantılı Session ayarları. Lokalde sessionların tutulmamasını sağlar.
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  secret,
});

// Sunucuda çalışan Session ayarları
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // https kullanıldığında aktifleştirilmeli.
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

// Helmet Ayarları
app.use(helmet());
const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com",
  "https://api.tiles.mapbox.com",
  "https://api.mapbox.com",
  "https://kit.fontawesome.com",
  "https://cdnjs.cloudflare.com",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com",
  "https://stackpath.bootstrapcdn.com",
  "https://api.mapbox.com",
  "https://api.tiles.mapbox.com",
  "https://fonts.googleapis.com",
  "https://use.fontawesome.com",
];
const connectSrcUrls = [
  "https://api.mapbox.com",
  "https://*.tiles.mapbox.com",
  "https://events.mapbox.com",
];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      childSrc: ["blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/dcsvujran/",
        "https://images.unsplash.com",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

// Passport Yapısı
// req nesnesine passport middlewarelerinin eklenmesi sağlandı.
app.use(passport.initialize());
// Oturum yönetimleri takibi ile kullanılmak isteniyorsa bu da eklenir.
app.use(passport.session());
// Authenticate işlemlerinin yapılması için ilgili model ekleniyor.
passport.use(new LocalStrategy(User.authenticate()));

// Kullanıcıyı tanımlamak ve bilgilerini oturum boyunca taşımak ve oturumdan
// kaldırmak için kullanılır.
// Modele eklediğimiz iki tane daha middleware dir.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash ve benzeri değişkenlerin genellikle .ejs dosyalarındaki erişimleri için locals bloğu..
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Express Hazırlanan Rotalar projeye eklendi.
// İlk parametre prefix belirler.
app.use("/", usersRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Herhangi bir url isteği cevaplanmaz ise bu kod çalışır.
app.all("*", (req, res, next) => {
  next(new ExpressError("Sayfa Bulunamadı.", 404));
});

// Error Middleware - Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Bir şeyler ters gitti.";
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(3000, () => {
  console.log("3000 numarali port hizmet veriyor.");
});
