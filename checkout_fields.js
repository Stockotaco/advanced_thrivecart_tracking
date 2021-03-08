(function () {
  var getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  var fbc = document.getElementById("field-customer-custom-fbc"),
    fbp = document.getElementById("field-customer-custom-fbp"),
    ua = document.getElementById("field-customer-custom-ua");

  ua && (ua.value = navigator.userAgent);

  // hide meta fields
  fbc && (fbc.parentElement.parentElement.style.display = "none");
  fbp && (fbp.parentElement.parentElement.style.display = "none");
  ua && (ua.parentElement.parentElement.style.display = "none");

  var cookieFields = function (last) {
    fbc && (fbc.value = getCookie("_fbc"));
    fbp && (fbp.value = getCookie("_fbp"));

    // this is the last check - i.e after 5 seconds
    if (last) {
      // autofill based on fbclid if parameter present in query string

      if (!fbc.value) {
        var fbclid = (
          (location.search.match(/fbclid=([^\&])+/gi) || []).pop() || ""
        )
          .split(/fbclid=/i)
          .pop();
        fbc.value = fbclid ? ["fb.1.", +new Date(), ".", fbclid].join("") : "";
      }

      fbc.value = fbc.value || ".";
      fbp.value = fbp.value || ".";
    }
  };

  setTimeout(cookieFields);
  setTimeout(cookieFields, 2000);
  // pass 1 to the last timeout cookie check callback
  setTimeout(cookieFields, 5000, 1);
})();
