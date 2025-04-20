// Asenkron fonksiyonları sarmalayan bir hata yakalama fonksiyonu yazılmıştır.
// Asenkron olan fonksiyon promise dir ve .catch() ile bu hata alınıp next 'e gönderilir.
module.exports = (func) => {

  return (req, res, next) => {
    func(req, res, next).catch(next);
  };

};
