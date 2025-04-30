//node_modules 'e yüklenen modüller projeye dahil edildi.
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground.js");

// Mongoose ile MongoDB veritabanına bağlandık.
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Veritabanina baglandi.");
  })
  .catch((err) => {
    console.log("Baglanti Hatasi: ", err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 100);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6776a57598092adbc7f8774a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
      // Değiştirildi. Bunun sebebini yaz notion a yazıldı.
      // image: "https://plus.unsplash.com/premium_photo-1681152386981-e3edcb781a94?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      //geometry: { type: "Point", coordinates: [-113.1331, 47.0202] },
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus ratione et neque nemo nostrum nobis, velit quo officia quidem illum qui obcaecati natus quae cumque quas, est, beatae dolor odio!",
      images: [
        {
          url: "https://res.cloudinary.com/dcsvujran/image/upload/v1737294800/EmrCamp/voe28xvgksfqwqgvf3x1.jpg",
          filename: "EmrCamp/voe28xvgksfqwqgvf3x1",
        },
        {
          url: "https://res.cloudinary.com/dcsvujran/image/upload/v1737294801/EmrCamp/ryljxhs8watdpazwzwtr.jpg",
          filename: "EmrCamp/ryljxhs8watdpazwzwtr",
        },
      ],
    });
    await camp.save();
  }
};

// seedDB fonksiyonu çalıştıktan sonra veritabanı bağlantısı kesilmiştir.
seedDB().then(() => {
  mongoose.connection.close();
});
