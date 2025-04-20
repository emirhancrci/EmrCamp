const Campground = require("../models/campground.js");
const Review = require("../models/review.js");

// İncelemeyi veritabanına kaydetme. İncelemeyi ilgili campgrounds ile referans olarak ekleme
module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  // Yorumu atan kişinin id sini yorumu ile ilişkilendirir.
  review.author = req.user._id;
  // campground un reviews keyine object id olarak gidiyor.
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Yeni Yorum Eklendi.");
  res.redirect(`/campgrounds/${campground._id}`);
};

// Yorum silme rotası.
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Başarıyla Yorum Silindi.");
  res.redirect(`/campgrounds/${id}`);
};
