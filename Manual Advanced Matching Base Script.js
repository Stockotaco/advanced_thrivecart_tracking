<!-- Facebook Pixel Code -->
<script>
  pixelId = "123,456";

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var customer_email = urlParams.get("thrivecart[customer][email]");
  var customer_firstName = urlParams.get("thrivecart[customer][firstname]");
  var customer_lastName = urlParams.get("thrivecart[customer][lastname]");
  var idArr = pixelId.split(",");
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  idArr.forEach(function (id) {
    fbq("init", id, {
      em: customer_email,
      fn: customer_firstName,
      ln: customer_lastName,
    });
  });
  fbq("track", "PageView");
</script>
<!-- End Facebook Pixel Code -->
