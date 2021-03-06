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
if (_thrive.product.bump_price) {
  var bump = {
    id: "bump-" + _thrive.product.idx,
    name: "Bump Product",
    price: +_thrive.product.bump_price,
    category: "bump",
    quantity: 1
  };
  productsArray.push(bump);
}
var main = {
	id: "product-" + _thrive.product.idx,
	name: _thrive.product.name,
	price: +_thrive.product.price,
	category: "main",
	quantity: 1
};
productsArray.push(main);
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
