/* Bootstrap in form alanı doğrulama özelliğini kullanmak için eklenmiştir.
Form alanları boş ise submit gönderilmez ve hata ifadeleri sayfada gözükür.

Bu script sayesinde addEventListener olduğu için alanlar anlık doldurulduğunda renkleri değişiyor.
Submit e basıldığında addeventlistener çalışıyor.
*/

(function () {
  "use strict";

  bsCustomFileInput.init();

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".validated-form");

  // Loop over them and prevent submission
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
