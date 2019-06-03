//
// Глобальный скрипт, отвечающий за работу выпадающего мобильного меню
//
var header = document.querySelector(".page-header");
var header_toggler = document.querySelector(".page-header__toggler");

header.classList.remove("page-header--opened");
header_toggler.classList.remove("page-header__toggler--opened");

header_toggler.addEventListener("click", function (evt) {
  header.classList.toggle("page-header--opened");
  header_toggler.classList.toggle("page-header__toggler--opened");
});

// Переключение карт с отзывами пользователей
if (document.querySelector(".reviews")) {
  var review_1 = document.querySelector(".reviews__container--1");
  var review_2 = document.querySelector(".reviews__container--2");
  var review_3 = document.querySelector(".reviews__container--3");
  var review_toggler_1 = document.querySelector(".reviews__toggler--1");
  var review_toggler_2 = document.querySelector(".reviews__toggler--2");
  var review_toggler_3 = document.querySelector(".reviews__toggler--3");

  review_toggler_1.addEventListener("click", function (evt) {
    var review_active = document.querySelector(".reviews__container--active");
    review_active.classList.remove("reviews__container--active");
    review_1.classList.add("reviews__container--active");
    var review_toggler_active = document.querySelector(".reviews__toggler--active");
    review_toggler_active.classList.remove("reviews__toggler--active");
    review_toggler_1.classList.add("reviews__toggler--active");
  });

  review_toggler_2.addEventListener("click", function (evt) {
    var review_active = document.querySelector(".reviews__container--active");
    review_active.classList.remove("reviews__container--active");
    review_2.classList.add("reviews__container--active");
    var review_toggler_active = document.querySelector(".reviews__toggler--active");
    review_toggler_active.classList.remove("reviews__toggler--active");
    review_toggler_2.classList.add("reviews__toggler--active");
  });

  review_toggler_3.addEventListener("click", function (evt) {
    var review_active = document.querySelector(".reviews__container--active");
    review_active.classList.remove("reviews__container--active");
    review_3.classList.add("reviews__container--active");
    var review_toggler_active = document.querySelector(".reviews__toggler--active");
    review_toggler_active.classList.remove("reviews__toggler--active");
    review_toggler_3.classList.add("reviews__toggler--active");
  });

  // Переключение карт с отзывами на десктопе
  var reviews = document.querySelectorAll(".reviews__container");
  var current_review = 0;
  var review_arrow_prev = document.querySelector(".reviews__arrow--prev");
  var review_arrow_next = document.querySelector(".reviews__arrow--next");

  review_arrow_prev.addEventListener("click", function (evt) {
    if (current_review > 0) {
      reviews[current_review].className = "reviews__container";
      current_review = (current_review -1 ) %reviews.length;
      reviews[current_review].className = "reviews__container  reviews__container--active";
    }
  });

  review_arrow_next.addEventListener("click", function (evt) {
    reviews[current_review].className = "reviews__container";
    current_review = (current_review +1 ) %reviews.length;
    reviews[current_review].className = "reviews__container  reviews__container--active";
  });
}

// Переключение карт с тарифами
if (document.querySelector(".price")) {
  var price = document.querySelector(".price__table");
  var price_toggler_base = document.querySelector(".price__toggler--base");
  var price_toggler_standart = document.querySelector(".price__toggler--standart");
  var price_toggler_unlim = document.querySelector(".price__toggler--unlim");

  price_toggler_base.addEventListener("click", function (evt) {
    var price_toggler_active = document.querySelector(".price__toggler--active");
    price_toggler_active.classList.remove("price__toggler--active");
    price_toggler_base.classList.add("price__toggler--active");
    price.classList.remove("price__table--translate-33");
    price.classList.remove("price__table--translate-66");
    price.classList.add("price__table--translate-0");
  });

  price_toggler_standart.addEventListener("click", function (evt) {
    var price_toggler_active = document.querySelector(".price__toggler--active");
    price_toggler_active.classList.remove("price__toggler--active");
    price_toggler_standart.classList.add("price__toggler--active");
    price.classList.remove("price__table--translate-0");
    price.classList.remove("price__table--translate-66");
    price.classList.add("price__table--translate-33");
  });

  price_toggler_unlim.addEventListener("click", function (evt) {
    var price_toggler_active = document.querySelector(".price__toggler--active");
    price_toggler_active.classList.remove("price__toggler--active");
    price_toggler_unlim.classList.add("price__toggler--active");
    price.classList.remove("price__table--translate-0");
    price.classList.remove("price__table--translate-33");
    price.classList.add("price__table--translate-66");
  });
}

// Настройки Google Maps API
if (document.querySelector(".map")) {
  function initMap() {
    var pink = {lat: 59.938797, lng: 30.323370};
    var map = new google.maps.Map(document.querySelector(".map__container"), {
      zoom: 17,
      center: {lat: 59.939036, lng: 30.323350},
      disableDefaultUI: true
    });
    var svg = {
      url: "img/icon-map-marker.svg",
      scaledSize: new google.maps.Size(36, 36)
    };
    var marker = new google.maps.Marker({
      position: pink,
      map: map,
      optimized: false,
      icon: svg
    });
  }
}

// Переключение регуляторов обработки изобажения
if (document.querySelector(".editor")) {
  var tab_crop = document.querySelector(".editor__tab--crop");
  var tab_fill = document.querySelector(".editor__tab--fill");
  var tab_contrast = document.querySelector(".editor__tab--contrast");
  var range_crop = document.querySelector(".editor__range--crop");
  var range_fill = document.querySelector(".editor__range--fill");
  var range_contrast = document.querySelector(".editor__range--contrast");

  tab_crop.addEventListener("click", function (evt) {
    var tab_active = document.querySelector(".editor__tab--active");
    tab_active.classList.remove("editor__tab--active");
    tab_crop.classList.add("editor__tab--active");
    var range_active = document.querySelector(".editor__range--active");
    range_active.classList.remove("editor__range--active");
    range_crop.classList.add("editor__range--active");
  });

  tab_fill.addEventListener("click", function (evt) {
    var tab_active = document.querySelector(".editor__tab--active");
    tab_active.classList.remove("editor__tab--active");
    tab_fill.classList.add("editor__tab--active");
    var range_active = document.querySelector(".editor__range--active");
    range_active.classList.remove("editor__range--active");
    range_fill.classList.add("editor__range--active");
  });

  tab_contrast.addEventListener("click", function (evt) {
    var tab_active = document.querySelector(".editor__tab--active");
    tab_active.classList.remove("editor__tab--active");
    tab_contrast.classList.add("editor__tab--active");
    var range_active = document.querySelector(".editor__range--active");
    range_active.classList.remove("editor__range--active");
    range_contrast.classList.add("editor__range--active");
  });
}

// Проверка валидности формы и механика всплывающих сообщений
if (document.querySelector(".form")) {
  var form = document.querySelector(".form__form");
  var form_submit = document.querySelector(".form__submit");
  var user_surename = form.querySelector("[name=user-surename]");
  var user_name = form.querySelector("[name=user-name]");
  var user_email = form.querySelector("[name=user-email]");
  var modal_fail = document.querySelector(".modal--fail");
  var modal_success = document.querySelector(".modal--success");
  var modal_fail_close = modal_fail.querySelector(".modal__button");
  var modal_success_close = modal_success.querySelector(".modal__button");

  form_submit.addEventListener("click", function (evt) {
    if (!user_surename.value || !user_name.value || !user_email.value || !(user_email.value.indexOf("@") > -1)) {
      evt.preventDefault();
      modal_fail.classList.add("modal--active");
      user_surename.classList.add("form__text-input--error");
      user_name.classList.add("form__text-input--error");
      user_email.classList.add("form__text-input--error");
    } else {
      modal_success.classList.add("modal--active");
      if (user_surename.classList.contains("form__text-input--error")) {
        user_surename.classList.remove("form__text-input--error");
        user_name.classList.remove("form__text-input--error");
        user_email.classList.remove("form__text-input--error");
      }
    }
  });

  modal_fail_close.addEventListener("click", function (evt) {
    modal_fail.classList.remove("modal--active");
  });

  modal_success_close.addEventListener("click", function (evt) {
    modal_success.classList.remove("modal--active");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (modal_fail.classList.contains("modal--active")) {
        modal_fail.classList.remove("modal--active");
      } else if (modal_success.classList.contains("modal--active")) {
        modal_success.classList.remove("modal--active");
      }
    }
  });
}
