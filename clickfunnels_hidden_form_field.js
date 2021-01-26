(function()
{
  var getCookie = function(name)
  {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for(var i=0;i < ca.length;i++) {
      var c = ca[i]
      while (c.charAt(0)==' ') c = c.substring(1,c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
    }
    return null
  }

  var fbc = document.querySelector('div[data-title="fbc"]')
    , fbp = document.querySelector('div[data-title="fbp"]')
    , ua = document.querySelector('div[data-title="ua"]')
    , url = document.querySelector('div[data-title="current_url"]')

  ua && (ua.value = navigator.userAgent)
  url && (url.value = document.URL)

  var cookieFields = function()
  {
    fbc && (fbc.value = getCookie('_fbc'))
    fbp && (fbp.value = getCookie('_fbp'))
  }

  setTimeout(cookieFields)
  setTimeout(cookieFields, 2000)
  setTimeout(cookieFields, 5000)
  setTimeout(cookieFields, 8000)
})()
