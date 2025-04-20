// Error Sınıfının bazı özelliklerinin kullanılması için özel Hata sınıfı tanımlandı.
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
