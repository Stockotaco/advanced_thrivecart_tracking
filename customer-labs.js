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

  var cookieFields = function (last) {
    var fbc = document.getElementById("field-customer-custom-fbc"),
      fbp = document.getElementById("field-customer-custom-fbp"),
      ua = document.getElementById("field-customer-custom-ua");
    uid = document.getElementById("field-customer-custom-uid");

    // hide meta fields
    fbc && (fbc.parentElement.parentElement.style.display = "none");
    fbp && (fbp.parentElement.parentElement.style.display = "none");
    ua && (ua.parentElement.parentElement.style.display = "none");
    uid && (uid.parentElement.parentElement.style.display = "none");

    fbc && (fbc.value = getCookie("_fbc"));
    fbp && (fbp.value = getCookie("_fbp"));
    ua && (ua.value = navigator.userAgent);
    setTimeout(function () {
      uid && (uid.value = CLabsgbVar.generalProps.uid);
    }, 2000);

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

      // fallback to a dot since fields are required
      fbc.value = fbc.value || ".";
      fbp.value = fbp.value || ".";
      uid.value = uid.value || ".";
    }
  };

  setTimeout(cookieFields, 10);
  setTimeout(cookieFields, 2000);
  // pass 1 to the last timeout cookie check callback
  setTimeout(cookieFields, 5000, 1);
})();
