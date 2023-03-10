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

  var cookies = {};
  updateCookies();

  var product_id = +_thrive.product.idx
  var passthrough = _thrive.user.passthrough[product_id];

  if (window.self === window.top) {
    // Code to be executed if the current page is the top level page - not in an iframe
    if (getCookie("_ga")) passthrough["gaid"] = getCookie("_ga");
    if (getCookie2("_ga_")) passthrough["gas"] = getCookie2("_ga_");
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
    if (getQueryStringValue("cluid") || window?.CLabsgbVar?.generalProps?.uid || getCluid(cookies)) passthrough["cluid"] = getQueryStringValue("cluid") || CLabsgbVar.generalProps.uid || getCluid(cookies);
  } else {
    console.log('TC checkout is embedded');
    var cluid = getQueryStringValue("cluid") || getQueryStringValue("passthrough['cluid']");
    if (cluid) passthrough["cluid"] = cluid;
  }
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

function getCluid(cookies) {
  var cluid;
  for (var cookieName in cookies) {
    if (cookieName.indexOf('cl') === 0 && cookieName.indexOf('_uid') === cookieName.length - 4) {
      cluid = cookies[cookieName];
      break;
    }
  }
  if (cluid) {
    console.log('cluid found: ', cluid);
    //modifyAttribute('passthrough[cluid]', cluid);
    modifyAttribute('cluid', cluid);
  } else {
    console.log('cluid not found, polling');
    pollStartsEndsWithCookie('cl', '_uid', 'cluid');
  }
}

function updateCookies() {
  var cookieString = document.cookie;
  var cookieArray = cookieString ? cookieString.split(';') : [];

  cookies = cookieArray.reduce(function (acc, cur) {
    var nameValue = cur.trim().split('=');
    acc[nameValue[0]] = nameValue[1];
    return acc;
  }, {});
}

function pollStartsEndsWithCookie(startsWith, endsWith, newKeyName) {
  console.log('polling for cookie starting with ' + startsWith + ' and ending with ' + endsWith);
  var maxAttempts = 100;
  var attempts = 0;
  var intervalId = setInterval(() => {
    attempts++;
    for (var cookieKey in cookies) {
      if (cookieKey.startsWith(startsWith) && cookieKey.endsWith(endsWith)) {
        clearInterval(intervalId);
        var cookieValue = cookies[cookieKey];
        return cookieValue;
      }
    }
    if (attempts >= maxAttempts) {
      clearInterval(intervalId);
      console.log('Cookie starting with ' + startsWith + ' and ending with ' + endsWith + ' not found after ' + attempts + ' attempts');
    }
  }, 100);
}