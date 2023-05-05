! function() {
  var e = function() {
          try {
              for (var e = document.cookie.split(";"), r = 0; r < e.length; r++) {
                  var t = e[r].replace(/\s/g, ""),
                      o = "cookies_policy=";
                  if (0 === t.indexOf(o)) return JSON.parse(t.substring(o.length))
              }
          } catch (n) {
              console.error(n)
          }
          return {}
      }(),
      r = function() {
          var e = document.querySelector("script[data-lux-reporter-script]");
          if (e) {
              var r = document.createElement("script");
              r.src = e.getAttribute("data-lux-reporter-script"), r.async = !0, r.defer = !0, e.parentNode.insertBefore(r, e)
          } else console.error("Failed to configure real-user-monitoring because couldn't the lux-reporter script path wasn't available")
      };
  !0 === e.usage ? r() : window.addEventListener("cookie-consent", function() {
      r()
  })
}();