//node_modules 'e yüklenen modüller projeye dahil edildi.
const mongoose = require("mongoose");
const Review = require("./review");
const { types, required } = require("joi");
// Kısaltmak için bir değikene atanmıştır.
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
); 

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href=/campgrounds/${this._id}>${this.title}</a></strong>
  <p>${this.description.substring(0,100)}...</p>`;
});

// Bu fonksiyon ile silinen nesneye erişimimizi sağlayan middleware
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  // Silinme işlemi başarılı olup olmadığnı geren değerin olup olmaması ile test ediyoruz.
  if (doc) {
    // Silinen kamp alanında tanımlı yorumlar bulunup silinir.
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

// Mongoose modeli ve şeması oluşturulup dışarıya aktarıldı.
module.exports = mongoose.model("Campground", CampgroundSchema);
