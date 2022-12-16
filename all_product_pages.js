/*
ThriveCart product page dataLayer provided by Better Than Data. 
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

if (_thrive.offer) {
  var dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: "eec." + _thrive.offer.type,
    event_id: makeid(32),
    ecommerce: {
      currencyCode: _thrive.product.currency,
      detail: {
        products: [
          {
            name: _thrive.offer.name,
            id: _thrive.offer.type + "-" + _thrive.offer.offer.id,
            price: _thrive.offer.price / 100,
            category: _thrive.offer.type,
            quantity: 1,
          },
        ],
      },
    },
  });
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: 'view_item',
    event_id: makeid(32),
    ecommerce: {
      currency: _thrive.product.currency,
      items: [{
        item_id: _thrive.offer.type + "-" + _thrive.offer.offer.id,
        item_name: _thrive.offer.name,
        item_price: _thrive.offer.price / 100,
        item_quantity: 1,
        item_category: _thrive.offer.type
      }]
    }
  });
}
