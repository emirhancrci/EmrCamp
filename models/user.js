const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    // mongoDB veritabanında save yapılırken aynı email görürse hata fırlatır.
    unique: true,
  },
});

/* Bu şemaya bir plugin eklendi.
Bu pluginin görevleri;
- Kimlik doğrulama işlemlerini dahil eder.
- Güvenli şifre saklama yapıları sağlar. pbkdf2 algoritmasını kullanır.
- Varsayılan olarak şemaya username ve password(salted hash) ekler.
- Bazı gerekli metodlar ekler.
- Sıfırdan kod yazılmasının önüne geçilmiş olunur.
- Passport.js ile uyumlu çalışır.
- Plugin 'in eklediği metotlar;
  - authenticate
  - serializeUser,
  - deserializeUser
  - register
*/
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
