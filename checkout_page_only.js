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
  if (getCookie("_ga")) passthrough["ga"] = getCookie("_ga").substr(6);
  if (getCookie2("_ga_")) passthrough["gas"] = getCookie2("_ga_").substr(6);
  if (getCookie("_fbc")) passthrough["fbc"] = getCookie("_fbc");
  if (getCookie("_ch_utm_source")) passthrough["_ch_utm_source"] = getCookie("_ch_utm_source");
  if (getCookie("_ch_utm_medium")) passthrough["_ch_utm_medium"] = getCookie("_ch_utm_medium");
  if (getCookie("_ch_utm_campaign")) passthrough["_ch_utm_campaign"] = getCookie("_ch_utm_campaign");
  if (getCookie("_ch_utm_content")) passthrough["_ch_utm_content"] = getCookie("_ch_utm_content");
  if (getCookie("_ch_utm_term")) passthrough["_ch_utm_term"] = getCookie("_ch_utm_term");
  if (getCookie("_ch_utm_id")) passthrough["_ch_utm_id"] = getCookie("_ch_utm_id");
  if (getCookie("first_utm_source")) passthrough["first_utm_source"] = getCookie("first_utm_source");
  if (getCookie("first_utm_medium")) passthrough["first_utm_medium"] = getCookie("first_utm_medium");
  if (getCookie("first_utm_campaign")) passthrough["first_utm_campaign"] = getCookie("first_utm_campaign");
  if (getCookie("first_utm_content")) passthrough["first_utm_content"] = getCookie("first_utm_content");
  if (getCookie("first_utm_term")) passthrough["first_utm_term"] = getCookie("first_utm_term");
  if (getCookie("first_utm_id")) passthrough["first_utm_id"] = getCookie("first_utm_id");
  if (getCookie("last_utm_source")) passthrough["last_utm_source"] = getCookie("last_utm_source");
  if (getCookie("last_utm_medium")) passthrough["last_utm_medium"] = getCookie("last_utm_medium");
  if (getCookie("last_utm_campaign")) passthrough["last_utm_campaign"] = getCookie("last_utm_campaign");
  if (getCookie("last_utm_content")) passthrough["last_utm_content"] = getCookie("last_utm_content");
  if (getCookie("last_utm_term")) passthrough["last_utm_term"] = getCookie("last_utm_term");
  if (getCookie("last_utm_id")) passthrough["last_utm_id"] = getCookie("last_utm_id");
  if (getQueryStringValue("cluid") || window?.CLabsgbVar?.generalProps?.uid) passthrough["cluid"] = getQueryStringValue("cluid") || CLabsgbVar.generalProps.uid;
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
