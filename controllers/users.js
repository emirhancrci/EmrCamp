const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

// Hatayı Tanımladığımız error handler a göndermek yerine biz içerde yakalayıp işledik.
// req.flash success kısmına gelemezse hata fırlatıcak.
module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    // Kullanıcı hatasız kayıt olduğunda direk login olması için
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Emr Camp 'ine Hoşgeldin.");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

// Giriş yapılırken passport un bize sağladığı middleware kullanılıyor authenticate
// middleware parametre olarak hangi stratejiyi kullanması gerektğini yazıyorum local
// ikinci parametre olarak ayarlar ekleniyor. hata çıkarsa flash ile cevap vermesi true olarak ekleniyor.
// hata çıkarsa hangi sayfaya yönlendireceğimi de istiyor.
module.exports.login = (req, res) => {
  req.flash("success", "Hoşgeldin Tekrardan.");
  // Sessionda böyle bir değişken yoksa /campgorunds değerini alıcak.
  // Session içinde bu değişkenin kalması kötü o yüzden başka bir değişkene alındıktan
  // sonra delete ile siliniyor.
  // Hangisi varsa onun url i alınacak.
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  // nesne içerisindeki property kaldırmaya yarar delete.
  // artık gerek yok çünkü passport otomatik siliyor.
  // delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// logout callback function olarak kullanılması gerekiyormuş çünkü hata işlemlerini
// bu fonksiyon içine taşımışlar.
module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Hoşçakal!");
    res.redirect("/campgrounds");
  });
};
