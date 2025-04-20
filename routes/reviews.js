const express = require("express");
// üst rotada tanımlı req:params değerlerinin alınması için mergeParams: true
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync.js");
const Campground = require("../models/campground.js");
const Review = require("../models/review.js");
const reviews = require("../controllers/reviews");
const campground = require("../models/campground.js");

// relationships
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Yorum silme rotası.
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
