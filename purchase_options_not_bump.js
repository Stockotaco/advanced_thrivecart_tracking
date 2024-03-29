/*
ThriveCart purchase dataLayer provided by Better Than Data. 
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

function standardize(input) {
  if (input == null || undefined) return input;
  else return input.trim().toLowerCase();
}

var products = [];
var user_data = {};
var address = {};
user_data.email = standardize(_thrive.customer.email); // required https://support.google.com/google-ads/answer/10172785#zippy=%2Cenable-enhanced-conversions-in-google-tag-manager%2Cidentify-and-define-your-enhanced-conversions-variables%2Cpre-hashed-data-is-being-provided-in-your-enhanced-conversions%2Cvariables-werent-successfully-implemented-for-enhanced-conversions%2Ccode-copying-errors%2Cfind-enhanced-conversions-variables-on-your-conversion-page%2Cidentify-enhanced-conversions-css-selectors-and-input-into-google-tag-manager%2Cenable-enhanced-conversions-in-google-tag-manager-and-create-custom-javascript-variable:~:text=the%20next%20section).-,Note%3A%20At%20least%20one%20of%20the%20following%20fields%20must%20be,number%20(optional)%20%2D%20Along%20with%20an%20email%2C%20or%20full%20name%20and%20address.,-The%20table%20below
user_data.phone_number = standardize(_thrive.customer.contactno);
address.first_name = standardize(_thrive.customer.firstname); // required
address.last_name = standardize(_thrive.customer.lastname); // required
address.street = standardize(_thrive.customer.address.line1);
address.city = standardize(_thrive.customer.address.city);
address.region = standardize(_thrive.customer.address.state);
address.postal_code = standardize(_thrive.customer.address.zip); // required
address.country = standardize(_thrive.customer.address.country); // required
user_data.address = address;

dataLayer = window.dataLayer || [];
dataLayer.push({
  event: "user_data",
  user_data: user_data,
  meta_details: {
    affiliate_id: _thrive_order.order.affiliate_id,
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
    event: "transaction_item",
    id: product.id,
    name: product.name,
    price: product.price,
    purchase_type: product.purchase_type,
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
    purchase_type: _thrive_order.order.bump.purchase_type,
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
    purchase_type: _thrive_order.order.product.purchase_type,
    quantity: _thrive_order.order.product.quantity,
    event_id:
      "tc-" +
      _thrive_order.order.id +
      "-" +
      "product" +
      "-" +
      _thrive_order.order.product.id +
      "-initial",
    category: "main",
  };
  atq(product);
}
if (_thrive_order.order.upsells) {
  for (keys in _thrive_order.order.upsells) {
    var product = {
      id: "upsell-" + _thrive_order.order.upsells[keys].id,
      name: _thrive_order.order.upsells[keys].name,
      price: _thrive_order.order.upsells[keys].total,
      purchase_type: _thrive_order.order.upsells[keys].purchase_type,
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
      purchase_type: _thrive_order.order.downsells[keys].purchase_type,
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
  event_id: makeid(32),
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
        coupon: localStorage.getItem('thrive_coupon'),
      },
      products: products,
    },
  },
});
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "purchase",
  event_id: makeid(32),
  ecommerce: {
    currency: _thrive_order.order.currency,
    transaction_id: "tc-" + _thrive_order.order.id + "-initial",
    affiliation: "Online Store",
    value: _thrive_order.order.total,
    tax: _thrive_order.order.tax,
    shipping: Number(_thrive_order.order.shipping),
    discount: 0,
    coupon: localStorage.getItem('thrive_coupon'),
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
let subscription_items = products.filter(function (item) { return item.purchase_type === "subscription" }).map(function (product) {
  return {
    item_id: product.id,
    item_name: product.name,
    price: product.price,
    item_category: product.category,
    quantity: product.quantity
  }
})
if (subscription_items.length >= 1) {
  let value = subscription_items.reduce(function (prev, item) {
    return prev + item.price * item.quantity || 1
  }, 0)
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "subscribe",
    event_id: makeid(32),
    ecommerce: {
      currency: _thrive_order.order.currency,
      transaction_id: "tc-" + _thrive_order.order.id + "-initial",
      value: value,
      predicted_ltv: value * 6,
      items: subscription_items
    },
  });
};

localStorage.removeItem('thrive_coupon');