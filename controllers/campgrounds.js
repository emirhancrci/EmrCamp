const Campground = require("../models/campground.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const { cloudinary } = require("../cloudinary");
const { query } = require("express");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index.ejs", { campgrounds });
};

// Yeni kamp alanı ekleme sayfasını açar.
module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new.ejs");
};

// Yeni kamp alanı ekleyip veritabanına göndermek için.
module.exports.createCampground = async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  // Eksik bir form gönderisi yapıldıysa bu hata verilecek. Tarayıcıdan eksik gönderim yapamaz PostMan vb ile.
  //if (!req.body.campground) throw new ExpressError("Geçersiz Kamp Alanı Verisi", 400);
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  // Giriş doğrulandığı için authenticate ile req.user._id ile bu kişiye ulaşılır.
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
  // flash mesajı req.flash içine eklendi. success bir dizidir.
  req.flash("success", "Başarılı Şekilde Kamp Alanı Oluşturuldu.");
  res.redirect(`/campgrounds/${campground._id}`);
};

// id ye sahip verilerin özel sayfasını gösterir.
module.exports.showCampground = async (req, res) => {
  // catchAsync içine sarıldığı için database işlemi hatası error handler a yollanıyor.
  // sonra res.render devam ediyor.
  // flash mesajı için if bloğu koyduğumuz için res.render a girmiyecek.
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Kamp Alanı Bulunamıyor.");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show.ejs", { campground });
};

// Kamp Yerini Düzenleme sayfasını açar.
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Kamp Alanı Bulunamıyor.");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit.ejs", { campground });
};

// Düzenlenen kamp yerlerinin veritabanına kaydetmek için kullanılır.
module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true });
  // push ile yeni resimler öncekilerin yanına eklenmiş olundu.
  // push doğrudan kullanılamadı dizi içe dizi itelenemedi.
  // campground.images.push(req.files.map((f) => ({ url: f.path, filename: f.filename })));
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  console.log(...imgs);
  campground.images.push(...imgs);
  await campground.save();
  if (req.body.deleteImages) {
    // Silinecek dosya isimlerini tek tek alıp cloudinary hostinginden silecek.
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    // Filtreleme ile filename ismi istek ile gelenler olanları seçicez.
    // updateOne oto save yapmış oluyor.
    await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
  }
  req.flash("success", "Başarıyla kampalanı güncellendi.");
  res.redirect(`/campgrounds/${campground._id}`);
};

// Kamp yerinin silinme isteğini gönderir.
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Başarıyla Kamp Alanı Silindi.");
  res.redirect("/campgrounds");
};
