const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          // Koyulan kurallar.
          allowedTags: [], // Herhangi bir tag yazılamaz.
          allowedAttributes: {}, // Herhangi bir attributes yazılamaz.
        });
        // Temizlenen veri ile gelen veri arasındaki fraklara bakılıyor ve bu değer mesaj
        // olarak gönderiliyor.
        if (clean !== value) return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

/* 
Module exports kullanım şekli böyle olmasının sebebi dışarıya bir obje göndermek istememiz.
Bu obje module.exports içerisine böyle atılıyor.
*/
// Joi doğrulama şeması oluşturulmuştur.
module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    location: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML(),
  }).required(),
});
