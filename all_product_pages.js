/*
ThriveCart product page dataLayer provided by Better Than Data. Hello
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
if (user_data?.email) {
  user_data.email = standardize(_thrive.customer.email); // required https://support.google.com/google-ads/answer/10172785#zippy=%2Cenable-enhanced-conversions-in-google-tag-manager%2Cidentify-and-define-your-enhanced-conversions-variables%2Cpre-hashed-data-is-being-provided-in-your-enhanced-conversions%2Cvariables-werent-successfully-implemented-for-enhanced-conversions%2Ccode-copying-errors%2Cfind-enhanced-conversions-variables-on-your-conversion-page%2Cidentify-enhanced-conversions-css-selectors-and-input-into-google-tag-manager:~:text=Address%20(first%20name%2C%20last%20name%2C%20postal%20code%2C%20country%20are%20required%20if%20you%20choose%20to%20use%20this%20data)
  user_data.phone_number = standardize(_thrive.customer.contactno);
  if (_thrive.customer.firstname && _thrive.customer.lastname && _thrive.customer.address.zip && _thrive.customer.address.country) { // check if the required fields are there. If they aren't all there, don't add them to the object.
    address.first_name = standardize(_thrive.customer.firstname); // required
    address.last_name = standardize(_thrive.customer.lastname); // required
    address.street = standardize(_thrive.customer.address.line1);
    address.city = standardize(_thrive.customer.address.city);
    address.region = standardize(_thrive.customer.address.state);
    address.postal_code = standardize(_thrive.customer.address.zip); // required
    address.country = standardize(_thrive.customer.address.country); // required
    user_data.address = address;
  }
}

dataLayer = window.dataLayer || [];
dataLayer.push({
  //event: "user_data",
  user_data: user_data,
  meta_details: {
    customer_id: _thrive?.customer?.id,
    custom_fields: _thrive?.customer?.custom_fields,
    client_meta_fbc: _thrive?.customer?.client_meta_fbc,
    client_meta_fbp: _thrive?.customer?.client_meta_fbp,
    client_user_agent: _thrive?.customer?.client_user_agent,
    ip_address: _thrive?.customer?.ip_address,
    optin: _thrive?.customer?.optin,
    terms_and_conditions: _thrive?.customer?.tandc
  }
});

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
