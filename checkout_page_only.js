var dataLayer = window.dataLayer || [];
var productsArray = [];
if (_thrive.product.bump_price) {
  var bump = {
    id: "bump-" + _thrive.product.idx,
    name: "Bump Product",
    price: +_thrive.product.bump_price,
    category: "bump",
  };
  productsArray.push(bump);
}
var main = {
  id: "product-" + _thrive.product.idx,
  name: _thrive.product.name,
  price: +_thrive.product.price,
  category: "main",
};
productsArray.push(main);
dataLayer.push({
  event: "eec.checkout",
  event_id: makeid(10),
  ecommerce: {
    detail: {
      products: productsArray,
    },
  },
});
