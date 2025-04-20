const { campgroundSchema, reviewSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");
const Review = require("./models/review");

// Oturum açılıp açılmadığını kontrol eden middleware yazıldı.
module.exports.isLoggedIn = (req, res, next) => {
  // Oturum açmamış bir hesap ise oturum açması için flash mesajı verip login sayfasına
  // yönlendirir.
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Lütfen Giriş Yapınız");
    // return edilmezse res.redirect bloğu sonlandırmaz.
    return res.redirect("/login");
  }
  next();
};

// Kullanıcı giriş yaptığında passport bütün session u sildiği için o silmeden res.locals
// içerisine login sayfasına yönlendirilmeden önceki path aktarılmış olundu.
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

// Joi doğrulamasının kullanılmasını sağlayan fonksiyon
module.exports.validateCampground = (req, res, next) => {
  // req.body içindeki verilerin reviewSchema sına uygun olup olmadığını kontrol etmesi sağlanır.
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Değişiklik silme vb işler için yetki kontrol middleware i
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  // İsteği yapan kişinin user._id si eşitse değiştirme isteği atanla buna izin verilir.
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "Bunu yapmak için yetkin yok.!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  // İsteği yapan kişinin user._id si eşitse değiştirme isteği atanla buna izin verilir.
  // populate olmadan buna ulaştı çünkü bu referans olarak bir id tutuyor.
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "Bunu yapmak için yetkin yok.!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

// Joi doğrulamasının kullanılmasını sağlayan fonksiyon
module.exports.validateReview = (req, res, next) => {
  // req.body içindeki verilerin campgroundSchema sına uygun olup olmadığını kontrol etmesi sağlanır.
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
