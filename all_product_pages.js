if (_thrive.offer) {
  var dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: "eec." + _thrive.offer.type,
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
