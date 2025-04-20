const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync.js");
const Campground = require("../models/campground.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// Aynı dizindeki istekler bu route ile gruplanabilir.
router
  .route("/")
  // MVC sistem ile fonksiyonlar refactoring edildi.
  .get(catchAsync(campgrounds.index))
  // isLoggedIn middleware i ile oturum giriş kontrolü yapılmıştır.
  .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));

// isLoggedIn fonksiyonu ile oturuma giriş yapılıp yapılmadığı kontrol middleware i eklenmiştir.
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  // isLoggedIn middleware i ile oturum giriş kontrolü yapılmıştır. Geçici olarak
  .get(catchAsync(campgrounds.showCampground))
  // Bu kısımda mongoose şema validators kullanılarak hata fırlatılır ve catchAsync ile tutulur.
  .put(isLoggedIn, isAuthor,upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
  // Kamp yerinin silinme isteğini gönderir.
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
