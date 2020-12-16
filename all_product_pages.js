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
    event_id: makeid(10),
    ecommerce: {
      detail: {
        products: [
          {
            name: _thrive.offer.name,
            id: _thrive.offer.type + "-" + _thrive.offer.offer.id,
            price: _thrive.offer.price / 100,
            category: _thrive.offer.type,
          },
        ],
      },
    },
  });
}
