/*
ThriveCart checkout page dataLayer provided by Better Than Data. 
*/
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var dataLayer = window.dataLayer || [];
var productsArray = [];
var itemsArray = [];
if (_thrive.product.bump_price) {
  var bump = {
    id: "bump-" + _thrive.product.idx,
    name: "Bump Product",
    price: +_thrive.product.bump_price,
    category: "bump",
    quantity: 1
  };
  var bumpGa4 = {
    item_id: "bump-" + _thrive.product.idx,
    item_name: "Bump Product",
    price: +_thrive.product.bump_price,
    item_category: "bump",
    quantity: 1
  };
  productsArray.push(bump);
  itemsArray.push(bumpGa4);
}
var main = {
  id: "product-" + _thrive.product.idx,
  name: _thrive.product.name,
  price: +_thrive.product.price,
  category: "main",
  quantity: 1
};
var mainGa4 = {
  item_id: "product-" + _thrive.product.idx,
  item_name: _thrive.product.name,
  price: +_thrive.product.price,
  item_category: "main",
  quantity: 1
}
productsArray.push(main);
itemsArray.push(mainGa4);
dataLayer.push({
  event: "eec.checkout",
  event_id: makeid(32),
  ecommerce: {
    currencyCode: _thrive.product.currency,
    detail: {
      products: productsArray,
    },
  },
});
// dataLayer.push({ ecommerce: null });
// dataLayer.push({
//   event: 'view_item',
//   event_id: makeid(32),
//   ecommerce: {
//     currency: _thrive.product.currency,
//     items: itemsArray
//   }
// });
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: 'begin_checkout',
  event_id: makeid(32),
  ecommerce: {
    currency: _thrive.product.currency,
    items: itemsArray
  }
});

window.addEventListener('load', function () {

  var product_id = +_thrive.product.idx
  var passthrough = _thrive.user.passthrough[product_id];
  if (getCookie("_ga")) passthrough.ga = getCookie("_ga").substr(6);
  if (getCookie2("_ga_")) passthrough.gas = getCookie2("_ga_").substr(6);
  if (getCookie("_fbc")) passthrough.fbc = getCookie("_fbc");
  if (getCookie("_ch_utm_source")) passthrough.fbc = getCookie("_ch_utm_source");
  if (getCookie("_ch_utm_medium")) passthrough.fbc = getCookie("_ch_utm_medium");
  if (getCookie("_ch_utm_campaign")) passthrough.fbc = getCookie("_ch_utm_campaign");
  if (getCookie("_ch_utm_content")) passthrough.fbc = getCookie("_ch_utm_content");
  if (getCookie("_ch_utm_term")) passthrough.fbc = getCookie("_ch_utm_term");
  if (getCookie("_ch_utm_id")) passthrough.fbc = getCookie("_ch_utm_id");
  if (getQueryStringValue("cluid") || window?.CLabsgbVar?.generalProps?.uid) passthrough.cluid = getQueryStringValue("cluid") || CLabsgbVar.generalProps.uid;

});

document.querySelectorAll('[class*="fields_control_next"] button').forEach(function (e) {
  e.addEventListener("click", function () {
    console.log('coupon name is: ', String(document.querySelectorAll('.coupon-field')[0].value))
    localStorage.setItem("thrive_coupon", String(document.querySelectorAll('.coupon-field')[0].value))
  })
})

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.split('=')[0] === name) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

function getCookie2(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name) && cookie.substring(name.length).indexOf('=') !== -1) {
      const valueStart = cookie.indexOf('=', name.length) + 1;
      return decodeURIComponent(cookie.substring(valueStart, cookie.length));
    }
  }
  return null;
}

function getQueryStringValue(key) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
}
