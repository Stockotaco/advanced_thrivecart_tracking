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

function standardize(input){
  return input.trim().toLowerCase();
}

var products = [];
var user_data = {};
var address = {};
user_data.email = standardize(_thrive.customer.email);
user_data.phone_number = standardize(_thrive.customer.contactno);
address.first_name = standardize(_thrive.customer.firstname);
address.last_name = standardize(_thrive.customer.lastname);
address.street = standardize(_thrive.customer.address.line1);
address.city = standardize(_thrive.customer.address.city);
address.region = standardize(_thrive.customer.address.state);
address.postal_code = standardize(_thrive.customer.address.zip);
address.country = standardize(_thrive.customer.address.country);
user_data.address = address;

dataLayer = window.dataLayer || [];
dataLayer.push({
  event: "user_data",
  user_data: user_data,
  meta_details: {
    customer_id: _thrive.customer.id,
    custom_fields: _thrive.customer.custom_fields,
    client_meta_fbc: _thrive.customer.client_meta_fbc,
    client_meta_fbp: _thrive.customer.client_meta_fbp,
    client_user_agent: _thrive.customer.client_user_agent,
    ip_address: _thrive.customer.ip_address,
    optin: _thrive.customer.optin,
    terms_and_conditions: _thrive.customer.tandc
  }
});

function atq(product) {
  products.push(product), (window.dataLayer = window.dataLayer || []);
  window.dataLayer.push({
    event: "purchase_item",
    id: product.id,
    name: product.name,
    price: product.price,
    type: product.category,
    quantity: product.quantity,
    event_id: product.event_id,
    currency: _thrive_order.order.currency
  });
}
if (_thrive_order.order.bump) {
  var bump = {
    id: "bump-" + _thrive_order.order.bump.id,
    name: _thrive_order.order.bump.name,
    price: _thrive_order.order.bump.total,
    quantity: _thrive_order.order.bump.quantity,
    event_id:
      "tc-" +
      _thrive_order.order.id +
      "-" +
      "bump" +
      "-" +
      _thrive_order.order.bump.id +
      "-initial",
    category: "bump",
  };
  atq(bump);
}
if (_thrive_order.order.product) {
  var product = {
    id: "product-" + _thrive_order.order.product.id,
    name: _thrive_order.order.product.name,
    price: _thrive_order.order.product.total,
    quantity: _thrive_order.order.product.quantity,
    event_id:
      "tc-" +
      _thrive_order.order.id +
      "-" +
      "product" +
      "-" +
      _thrive_order.order.product.id +
      "-initial",
    category: "product",
  };
  atq(product);
}
if (_thrive_order.order.upsells) {
  for (keys in _thrive_order.order.upsells) {
    var product = {
      id: "upsell-" + _thrive_order.order.upsells[keys].id,
      name: _thrive_order.order.upsells[keys].name,
      price: _thrive_order.order.upsells[keys].total,
      quantity: _thrive_order.order.upsells[keys].quantity,
      event_id:
        "tc-" +
        _thrive_order.order.id +
        "-" +
        "upsell" +
        "-" +
        _thrive_order.order.upsells[keys].id +
        "-initial",
      category: "upsell",
    };
    atq(product);
  }
}
if (_thrive_order.order.downsells) {
  for (keys in _thrive_order.order.downsells) {
    var product = {
      id: "downsell-" + _thrive_order.order.downsells[keys].id,
      name: _thrive_order.order.downsells[keys].name,
      price: _thrive_order.order.downsells[keys].total,
      quantity: _thrive_order.order.downsells[keys].quantity,
      event_id:
        "tc-" +
        _thrive_order.order.id +
        "-" +
        "downsell" +
        "-" +
        _thrive_order.order.downsells[keys].id +
        "-initial",
      category: "downsell",
    };
    atq(product);
  }
}
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  event: "eec.transactionComplete",
  event_id: makeid(30),
  ecommerce: {
    currencyCode: _thrive_order.order.currency,
    purchase: {
      actionField: {
        id: "tc-" + _thrive_order.order.id + "-initial",
        affiliation: "Online Store",
        revenue: _thrive_order.order.total,
        tax: _thrive_order.order.tax,
        shipping: _thrive_order.order.shipping,
        discount: 0,
        coupon: null,
      },
      products: products,
    },
  },
});
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "purchase",
  event_id: makeid(30),
  ecommerce: {
    currency: _thrive_order.order.currency,
    transaction_id: "tc-" + _thrive_order.order.id + "-initial",
    affiliation: "Online Store",
    value: _thrive_order.order.total,
    tax: _thrive_order.order.tax,
    shipping: Number(_thrive_order.order.shipping),
    discount: 0,
    coupon: null,
    items: products.map(function (product) {
      return {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: product.quantity
      }
    })
  },
});
