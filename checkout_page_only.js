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
  event_id: makeid(30),
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
//   event_id: makeid(30),
//   ecommerce: {
//     currency: _thrive.product.currency,
//     items: itemsArray
//   }
// });
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: 'begin_checkout',
  event_id: makeid(30),
  ecommerce: {
    currency: _thrive.product.currency,
    items: itemsArray
  }
});

document.querySelectorAll('[class*="fields_control_next"] button').forEach(function (e) {
  e.addEventListener("click", function () {
    console.log('value is: ', String(document.querySelectorAll('.coupon-field')[0].value))
    localStorage.setItem("thrive_coupon", String(document.querySelectorAll('.coupon-field')[0].value))
  })
})