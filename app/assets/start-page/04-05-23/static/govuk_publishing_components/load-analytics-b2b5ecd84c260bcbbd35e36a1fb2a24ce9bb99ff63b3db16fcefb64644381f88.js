! function() {
  "use strict";
  window.GOVUK = window.GOVUK || {};
  var a = {
          essential: !0,
          settings: !1,
          usage: !1,
          campaigns: !1
      },
      o = {
          cookies_policy: "essential",
          seen_cookie_message: "essential",
          cookie_preferences_set: "essential",
          cookies_preferences_set: "essential",
          "_email-alert-frontend_session": "essential",
          intervention_campaign: "essential",
          licensing_session: "essential",
          govuk_contact_referrer: "essential",
          multivariatetest_cohort_coronavirus_extremely_vulnerable_rate_limit: "essential",
          dgu_beta_banner_dismissed: "settings",
          global_bar_seen: "settings",
          govuk_browser_upgrade_dismisssed: "settings",
          govuk_not_first_visit: "settings",
          analytics_next_page_call: "usage",
          user_nation: "settings",
          _ga: "usage",
          _gid: "usage",
          _gat: "usage",
          "JS-Detection": "usage",
          TLSversion: "usage",
          _ga_VBLT2V3FZR: "usage",
          _ga_P1DGM6TVYF: "usage",
          _ga_S5RQ7FTGVR: "usage"
      };
  window.GOVUK.cookie = function(e, t, n) {
      return void 0 !== t ? !1 === t || null === t ? window.GOVUK.setCookie(e, "", {
          days: -1
      }) : (void 0 === n && (n = {
          days: 30
      }), window.GOVUK.setCookie(e, t, n)) : window.GOVUK.getCookie(e)
  }, window.GOVUK.setDefaultConsentCookie = function() {
      window.GOVUK.setConsentCookie(a)
  }, window.GOVUK.approveAllCookieTypes = function() {
      var e = {
          essential: !0,
          settings: !0,
          usage: !0,
          campaigns: !0
      };
      window.GOVUK.setCookie("cookies_policy", JSON.stringify(e), {
          days: 365
      })
  }, window.GOVUK.getConsentCookie = function() {
      var e, t = window.GOVUK.cookie("cookies_policy");
      if (!t) return null;
      try {
          e = JSON.parse(t)
      } catch (n) {
          return null
      }
      return "object" != typeof e && null !== e && (e = JSON.parse(e)), e
  }, window.GOVUK.setConsentCookie = function(e) {
      var t = window.GOVUK.getConsentCookie();
      for (var n in t || (t = JSON.parse(JSON.stringify(a))), e)
          if (t[n] = e[n], !e[n])
              for (var i in o) o[i] === n && window.GOVUK.deleteCookie(i);
      window.GOVUK.setCookie("cookies_policy", JSON.stringify(t), {
          days: 365
      })
  }, window.GOVUK.checkConsentCookieCategory = function(e, t) {
      var n = window.GOVUK.getConsentCookie();
      if (!n && o[e]) return !0;
      n = window.GOVUK.getConsentCookie();
      try {
          return n[t]
      } catch (i) {
          return console.error(i), !1
      }
  }, window.GOVUK.checkConsentCookie = function(e, t) {
      if ("cookies_policy" === e || null === t || !1 === t) return !0;
      if (e.match("^govuk_surveySeen") || e.match("^govuk_taken")) return window.GOVUK.checkConsentCookieCategory(e, "settings");
      if (o[e]) {
          var n = o[e];
          return window.GOVUK.checkConsentCookieCategory(e, n)
      }
      return !1
  }, window.GOVUK.setCookie = function(e, t, n) {
      if (window.GOVUK.checkConsentCookie(e, t)) {
          void 0 === n && (n = {});
          var i = e + "=" + t + "; path=/";
          if (n.days) {
              var a = new Date;
              a.setTime(a.getTime() + 24 * n.days * 60 * 60 * 1e3), i = i + "; expires=" + a.toGMTString()
          }
          "https:" === document.location.protocol && (i += "; Secure"), document.cookie = i
      }
  }, window.GOVUK.getCookie = function(e) {
      for (var t = e + "=", n = document.cookie.split(";"), i = 0, a = n.length; i < a; i++) {
          for (var o = n[i];
              " " === o.charAt(0);) o = o.substring(1, o.length);
          if (0 === o.indexOf(t)) return decodeURIComponent(o.substring(t.length))
      }
      return null
  }, window.GOVUK.getCookieCategory = function(e) {
      return o[e]
  }, window.GOVUK.deleteCookie = function(e) {
      window.GOVUK.cookie(e, null), window.GOVUK.cookie(e) && (document.cookie = e + "=;expires=" + new Date + ";", document.cookie = e + "=;expires=" + new Date + ";domain=" + window.location.hostname + ";path=/")
  }, window.GOVUK.deleteUnconsentedCookies = function() {
      var e = window.GOVUK.getConsentCookie();
      for (var t in e)
          if (!e[t])
              for (var n in o) o[n] === t && window.GOVUK.deleteCookie(n)
  }
}(window),
function() {
  "use strict";
  window.GOVUK = window.GOVUK || {}, window.GOVUK.extendObject = function(e) {
      e = e || {};
      for (var t = 1; t < arguments.length; t++)
          if (arguments[t])
              for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
      return e
  }
}(window),
function(e) {
  "use strict";

  function t() {
      return 0 < document.querySelectorAll('meta[name="govuk:static-analytics:strip-dates"]').length
  }

  function n() {
      return 0 < document.querySelectorAll('meta[name="govuk:static-analytics:strip-postcodes"]').length
  }

  function i() {
      var e = document.querySelector('meta[name="govuk:static-analytics:strip-query-string-parameters"]'),
          t = !1;
      e && (t = e.getAttribute("content"));
      var n = [];
      if (t)
          for (var i = t.split(","), a = 0; a < i.length; a++) n.push(i[a].trim());
      return n
  }
  var a = e.GOVUK || {},
      o = /[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g,
      r = /\b[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9](?!refund)[ABD-HJLNPQ-Z]{2,3}\b/gi,
      s = /\d{4}(-?)\d{2}(-?)\d{2}/g,
      c = /[|\\{}()[\]^$+*?.]/g,
      l = /reset_password_token=[a-zA-Z0-9-]+/g,
      u = /unlock_token=[a-zA-Z0-9-]+/g,
      d = /state=.[^&]+/g,
      g = function() {
          this.stripDatePII = t(), this.stripPostcodePII = n(), this.queryStringParametersToStrip = i()
      };
  g.prototype.stripPII = function(e) {
      return "string" == typeof e ? this.stripPIIFromString(e) : "[object Array]" === Object.prototype.toString.call(e) || "[object Arguments]" === Object.prototype.toString.call(e) ? this.stripPIIFromArray(e) : "object" == typeof e ? this.stripPIIFromObject(e) : e
  }, g.prototype.stripPIIFromString = function(e) {
      var t = e.replace(o, "[email]");
      return t = (t = (t = t.replace(l, "reset_password_token=[reset_password_token]")).replace(u, "unlock_token=[unlock_token]")).replace(d, "state=[state]"), t = this.stripQueryStringParameters(t), !0 === this.stripDatePII && (t = t.replace(s, "[date]")), !0 === this.stripPostcodePII && (t = t.replace(r, "[postcode]")), t
  }, g.prototype.stripPIIFromObject = function(e) {
      if (e) {
          if (e instanceof a.Analytics.PIISafe) return e.value;
          for (var t in e) {
              var n = e[t];
              e[t] = this.stripPII(n)
          }
          return e
      }
  }, g.prototype.stripPIIFromArray = function(e) {
      for (var t = 0, n = e.length; t < n; t++) {
          var i = e[t];
          e[t] = this.stripPII(i)
      }
      return e
  }, g.prototype.stripQueryStringParameters = function(e) {
      for (var t = 0; t < this.queryStringParametersToStrip.length; t++) {
          var n = this.queryStringParametersToStrip[t],
              i = n.replace(c, "\\$&"),
              a = new RegExp("((?:\\?|&)" + i + "=)(?:[^&#\\s]*)", "g");
          e = e.replace(a, "$1[" + n + "]")
      }
      return e
  }, a.Pii = g, e.GOVUK = a
}(window),
function(s) {
  "use strict";

  function c() {
      "function" == typeof s.ga && s.ga.apply(s, arguments)
  }
  var l, u = s.GOVUK || {},
      e = function(e, t) {
          function n() {
              c("create", e, t)
          }

          function i() {
              c("set", "anonymizeIp", !0)
          }

          function a() {
              c("set", "allowAdFeatures", !1)
          }

          function o() {
              c("set", "title", l.stripPII(document.title))
          }

          function r() {
              c("set", "location", l.stripPII(window.location.href))
          }

          function s() {
              var e = window.GOVUK.analyticsVars.primaryLinkedDomains;
              e && 0 < e.length && (c("require", "linker"), c("linker:autoLink", e))
          }
          l = new u.Pii, "string" == typeof t && (t = {
              cookieDomain: t
          }), n(), i(), a(), o(), r(), s()
      };
  e.load = function() {
      var e, t, n, i, a, o, r;
      e = s, t = document, n = "script", i = "https://www.google-analytics.com/analytics.js", a = "ga", e.GoogleAnalyticsObject = a, e[a] = e[a] || function() {
          (e[a].q = e[a].q || []).push(arguments)
      }, e[a].l = 1 * new Date, o = t.createElement(n), r = t.getElementsByTagName(n)[0], o.async = 1, o.src = i, r.parentNode.insertBefore(o, r)
  }, e.prototype.trackPageview = function(e, t, n) {
      function i(e) {
          if (void 0 === e) return !0;
          for (var t in e)
              if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
          return JSON.stringify(e) === JSON.stringify({})
      }
      var a, o = "";
      "string" == typeof e && (a = {
          page: e
      }), "string" == typeof t && ((a = a || {}).title = t), "object" == typeof n && (a = u.extendObject(a || {}, n), "string" == typeof n.trackerName && (o = n.trackerName + ".", delete n.trackerName)), i(a) ? c(o + "send", "pageview") : c(o + "send", "pageview", a)
  }, e.prototype.trackEvent = function(e, t, n) {
      var i, a = "",
          o = {
              hitType: "event",
              eventCategory: e,
              eventAction: t
          };
      "string" == typeof(n = n || {}).label && (o.eventLabel = n.label, delete n.label), (n.value || 0 === n.value) && ("number" != typeof(i = parseInt(n.value, 10)) || isNaN(i) || (n.eventValue = i), delete n.value), "string" == typeof n.trackerName && (a = n.trackerName + ".", delete n.trackerName), n.nonInteraction && (n.nonInteraction = 1), "object" == typeof n && (o = u.extendObject(o, n)), c(a + "send", o)
  }, e.prototype.trackSocial = function(e, t, n, i) {
      var a = {
          hitType: "social",
          socialNetwork: e,
          socialAction: t,
          socialTarget: n
      };
      c("send", a = u.extendObject(a, i))
  }, e.prototype.addLinkedTrackerDomain = function(e, t, n, i) {
      c("create", e, "auto", {
          name: t
      }), c(t + ".require", "linker"), c(t + ".linker:autoLink", n), c(t + ".set", "anonymizeIp", !0), c(t + ".set", "allowAdFeatures", !1), c(t + ".set", "title", l.stripPII(document.title)), c(t + ".set", "location", l.stripPII(window.location.href)), void 0 !== i && !0 !== i || c(t + ".send", "pageview")
  }, e.prototype.setDimension = function(e, t) {
      c("set", "dimension" + e, String(t))
  }, u.GoogleAnalyticsUniversalTracker = e, s.GOVUK = u
}(window),
function(n) {
  "use strict";
  var i = n.GOVUK || {},
      e = function(e) {
          if (this.pii = new i.Pii, this.trackers = [], "undefined" != typeof e.universalId) {
              var t = e.universalId;
              delete e.universalId, this.trackers.push(new i.GoogleAnalyticsUniversalTracker(t, e))
          }
      },
      t = function(e) {
          this.value = e
      };
  e.PIISafe = t, e.prototype.sendToTrackers = function(e, t) {
      for (var n = 0, i = this.trackers.length; n < i; n++) {
          var a = this.trackers[n],
              o = a[e];
          "function" == typeof o && o.apply(a, t)
      }
  }, e.load = function() {
      i.GoogleAnalyticsUniversalTracker.load()
  }, e.prototype.defaultPathForTrackPageview = function(e) {
      var t = e.protocol + "//" + e.hostname + (e.port ? ":" + e.port : "");
      return this.pii.stripPIIFromString(e.href.substring(t.length).split("#")[0])
  }, e.prototype.trackPageview = function() {
      arguments[0] = arguments[0] || this.defaultPathForTrackPageview(window.location), 0 === arguments.length && (arguments.length = 1), this.sendToTrackers("trackPageview", this.pii.stripPII(arguments))
  }, e.prototype.trackEvent = function() {
      this.sendToTrackers("trackEvent", this.pii.stripPII(arguments))
  }, e.prototype.trackShare = function(e, t) {
      this.sendToTrackers("trackSocial", this.pii.stripPII([e, "share", n.location.pathname, t]))
  }, e.prototype.setDimension = function() {
      this.sendToTrackers("setDimension", this.pii.stripPII(arguments))
  }, e.prototype.addLinkedTrackerDomain = function() {
      this.sendToTrackers("addLinkedTrackerDomain", arguments)
  }, i.Analytics = e, n.GOVUK = i
}(window),
function(i) {
  "use strict";
  var a = i.GOVUK || {};
  a.analyticsPlugins = a.analyticsPlugins || {}, a.analyticsPlugins.printIntent = function() {
      var t = function() {
          a.analytics.trackEvent("Print Intent", document.location.pathname), a.analytics.trackPageview("/print" + document.location.pathname)
      };
      if (i.matchMedia) {
          var e = i.matchMedia("print"),
              n = 0;
          e.addListener(function(e) {
              e.matches || 0 !== n || (t(), n++, setTimeout(function() {
                  n = 0
              }, 3e3))
          })
      }
      i.onafterprint && (i.onafterprint = t)
  }, i.GOVUK = a
}(window),
function(a) {
  "use strict";
  var o = a.GOVUK || {};
  o.analyticsPlugins = o.analyticsPlugins || {}, o.analyticsPlugins.error = function(e) {
      function i(e) {
          return !e || !t || !!t.test(e)
      }
      var t = (e = e || {}).filenameMustMatch,
          n = function(e) {
              var t = e.filename,
                  n = t + ": " + e.lineno;
              i(t) && o.analytics.trackEvent("JavaScript Error", e.message, {
                  label: n,
                  value: 1,
                  nonInteraction: !0
              })
          };
      a.addEventListener ? a.addEventListener("error", n, !1) : a.attachEvent ? a.attachEvent("onerror", n) : a.onerror = n
  }, a.GOVUK = o
}(window), this.Element && function(e) {
      e.matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.msMatchesSelector || function(e) {
          for (var t = this, n = (t.parentNode || t.document).querySelectorAll(e), i = -1; n[++i] && n[i] != t;);
          return !!n[i]
      }
  }(Element.prototype), this.Element && function(e) {
      e.closest = e.closest || function(e) {
          for (var t = this; t.matches && !t.matches(e);) t = t.parentNode;
          return t.matches ? t : null
      }
  }(Element.prototype),
  function(e) {
      "use strict";
      var a = e.GOVUK || {};
      a.analyticsPlugins = a.analyticsPlugins || {}, a.analyticsPlugins.mailtoLinkTracker = function() {
          function i(e, t) {
              var n = {
                      transport: "beacon"
                  },
                  i = e.textContent;
              i && (n.label = i.trim()), a.analytics.trackEvent("Mailto Link Clicked", t, n)
          }
          document.querySelector("body").addEventListener("click", function(e) {
              var t = e.target;
              if ("A" !== t.tagName && (t = t.closest("a")), t) {
                  var n = t.getAttribute("href");
                  n && "mailto:" === n.substring(0, 7) && i(t, n)
              }
          })
      }, e.GOVUK = a
  }(window),
  function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define("GOVUKFrontend", t) : t()
  }(0, function() {
      "use strict";
      (function() {
          "document" in this && "matches" in document.documentElement || (Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function a(e) {
              for (var t = this, n = (t.document || t.ownerDocument).querySelectorAll(e), i = 0; n[i] && n[i] !== t;) ++i;
              return !!n[i]
          })
      }).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
          function() {
              "document" in this && "closest" in document.documentElement || (Element.prototype.closest = function n(e) {
                  for (var t = this; t;) {
                      if (t.matches(e)) return t;
                      t = "SVGElement" in window && t instanceof SVGElement ? t.parentNode : t.parentElement
                  }
                  return null
              })
          }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {})
  }),
  function(e) {
      "use strict";
      var r = e.GOVUK || {};
      r.analyticsPlugins = r.analyticsPlugins || {}, r.analyticsPlugins.externalLinkTracker = function(e) {
          e = e || {}, r.analyticsPlugins.externalLinkTracker.options = e, document.querySelector("body").addEventListener("click", r.analyticsPlugins.externalLinkTracker.handleClick)
      }, r.analyticsPlugins.externalLinkTracker.handleClick = function(e) {
          var t = e.target;
          "A" !== t.tagName && (t = t.closest("a")), t && r.analyticsPlugins.externalLinkTracker.isExternalLink(t.getAttribute("href")) && r.analyticsPlugins.externalLinkTracker.trackClickEvent(t)
      }, r.analyticsPlugins.externalLinkTracker.isExternalLink = function(e) {
          if (!e) return !1;
          var t = r.analyticsPlugins.externalLinkTracker.getHostname();
          return "http" === e.substring(0, 4) && -1 === e.indexOf(t) || void 0
      }, r.analyticsPlugins.externalLinkTracker.trackClickEvent = function(e) {
          var t = {
                  transport: "beacon"
              },
              n = e.getAttribute("href"),
              i = e.textContent.trim();
          i && (t.label = i);
          var a = r.analyticsPlugins.externalLinkTracker.options.externalLinkUploadCustomDimension;
          if (a !== undefined) {
              var o = n;
              r.analytics.setDimension(a, o)
          }
          r.analytics.trackEvent("External Link Clicked", n, t)
      }, r.analyticsPlugins.externalLinkTracker.getHostname = function() {
          return e.location.hostname
      }, e.GOVUK = r
  }(window),
  function(e) {
      "use strict";
      var o = e.GOVUK || {};
      o.analyticsPlugins = o.analyticsPlugins || {}, o.analyticsPlugins.downloadLinkTracker = function(e) {
          function i(e) {
              var t = e.getAttribute("href"),
                  n = {
                      transport: "beacon"
                  },
                  i = e.textContent.trim();
              i && (n.label = i), o.analytics.trackEvent("Download Link Clicked", t, n)
          }
          var t = (e = e || {}).selector,
              a = t.split(",");
          t && document.querySelector("body").addEventListener("click", function(e) {
              var t = e.target;
              if ("A" !== t.tagName && (t = t.closest("a")), t)
                  for (var n = 0; n < a.length; n++)
                      if (t.matches(a[n].trim())) {
                          i(t);
                          break
                      }
          })
      }, e.GOVUK = o
  }(window), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(e) {
      function t(e) {
          this.$module = e
      }
      t.prototype.init = function() {
          var e = {
                  nonInteraction: 1
              },
              t = this.$module.getAttribute("data-track-category"),
              n = this.$module.getAttribute("data-track-action"),
              i = this.$module.getAttribute("data-track-label"),
              a = parseInt(this.$module.getAttribute("data-track-value"));
          "string" == typeof i && (e.label = i), (a || 0 === a) && (e.value = a), window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent(t, n, e)
      }, e.AutoTrackEvent = t
  }(window.GOVUK.Modules),
  function() {
      "use strict";

      function e(e) {
          var t = document.querySelector(e);
          if (t) return t.getAttribute("content").toLowerCase()
      }

      function n() {
          return "collections" === e(w) && "taxon" === e(m) && "grid" === e(p)
      }

      function i() {
          return "collections" === e(w) && "taxon" === e(m) && "accordion" === e(p)
      }

      function a() {
          return "collections" === e(w) && "taxon" === e(m) && "leaf" === e(p)
      }

      function o() {
          return "collections" === e(w) && "browse level 2" === e(p)
      }

      function r() {
          return "collections" === e(w) && ("browse level 0" === e(p) || "browse level 1" === e(p)) && "mainstream_browse_page" === e(m)
      }

      function s() {
          return "collections" === e(w) && "mainstream_browse_page" === e(m)
      }

      function c() {
          return "collections" === e(w) && "topic" === e(m)
      }

      function l() {
          return "whitehall" === e(w) && "placeholder_policy_area" === e(m)
      }

      function u() {
          return "government-frontend" === e(w) && "document_collection" === e(m)
      }

      function d() {
          return "finder-frontend" === e(w) && "finder" === e(m)
      }

      function g() {
          return "whitehall" === e(w) && "finder" === e(m)
      }

      function h(e) {
          for (var t = 0, n = 0; n < e.length; n++) {
              var i = window.getComputedStyle(e[n]);
              "none" !== i.display && "hidden" !== i.visibility && t++
          }
          return t
      }
      window.GOVUK = window.GOVUK || {};
      var t = function() {};
      t.getNumberOfSections = function() {
          switch (!0) {
              case n():
                  return 1 + document.querySelectorAll(".parent-topic-contents").length;
              case i():
                  return document.querySelectorAll('[data-track-count="accordionSection"]').length;
              case u():
                  return document.querySelectorAll(".document-collection .group-title").length;
              case o():
                  return document.querySelectorAll('[data-track-count="accordionSection"]').length || document.querySelectorAll("main .govuk-list").length;
              case r():
                  return document.querySelectorAll('[data-track-count="cardList"]').length;
              case s():
                  return h(document.querySelectorAll("#subsection ul")) || document.querySelectorAll("#section ul").length || document.querySelectorAll("#root ul").length;
              case c():
                  return document.querySelectorAll(".topics-page nav.index-list").length;
              case l():
                  return document.querySelectorAll(".topic section h1.label").length;
              case d():
              case g():
              case a():
                  return 1;
              default:
                  var e = document.querySelectorAll('[data-track-count="sidebarRelatedItemSection"]').length,
                      t = document.querySelectorAll('[data-track-count="sidebarTaxonSection"]').length;
                  return e || t
          }
      }, t.getNumberOfLinks = function() {
          switch (!0) {
              case n():
                  return document.querySelectorAll('a[data-track-category="navGridLinkClicked"]').length + document.querySelectorAll('a[data-track-category="navGridLeafLinkClicked"]').length;
              case i():
                  return document.querySelectorAll('a[data-track-category="navAccordionLinkClicked"]').length;
              case u():
                  return document.querySelectorAll(".document-collection .group-document-list li a").length;
              case o():
                  return document.querySelectorAll('[data-track-count="contentLink"]').length;
              case r():
                  return document.querySelectorAll('[data-track-count="cardLink"]').length;
              case s():
                  return h(document.querySelectorAll("#subsection ul a")) || document.querySelectorAll("#section ul a").length || document.querySelectorAll("#root ul a").length;
              case c():
                  return document.querySelectorAll(".topics-page .index-list ul a").length || document.querySelectorAll(".topics-page .topics ul a").length;
              case l():
                  return document.querySelectorAll("section.document-block a").length + document.querySelectorAll("section .collection-list h2 a").length;
              case d():
                  return document.querySelectorAll(".finder-frontend-content li.document a").length;
              case g():
                  return document.querySelectorAll(".document-list .document-row h3 a").length;
              case a():
                  return document.querySelectorAll('a[data-track-category="navLeafLinkClicked"]').length;
              default:
                  return document.querySelectorAll('a[data-track-category="relatedLinkClicked"]').length
          }
      };
      var w = 'meta[name="govuk:rendering-application"]',
          m = 'meta[name="govuk:format"]',
          p = 'meta[name="govuk:navigation-page-type"]';
      GOVUK.PageContent = t
  }(),
  function() {
      "use strict";

      function n() {
          var e = {
              dimension15: window.httpStatusCode || 200,
              dimension16: GOVUK.cookie("TLSversion") || "unknown",
              dimension95: GOVUK.analytics.gaClientId
          };
          return window.devicePixelRatio ? e.dimension11 = window.devicePixelRatio : e.dimension11 = window.screen.deviceXDPI / window.screen.logicalXDPI, e
      }

      function i() {
          for (var e = {
                  section: {
                      dimension: 1
                  },
                  format: {
                      dimension: 2
                  },
                  themes: {
                      dimension: 3,
                      defaultValue: "other"
                  },
                  "content-id": {
                      dimension: 4,
                      defaultValue: "00000000-0000-0000-0000-000000000000"
                  },
                  "search-result-count": {
                      dimension: 5
                  },
                  "publishing-government": {
                      dimension: 6
                  },
                  "political-status": {
                      dimension: 7
                  },
                  "analytics:organisations": {
                      dimension: 9
                  },
                  "analytics:world-locations": {
                      dimension: 10
                  },
                  withdrawn: {
                      dimension: 12,
                      defaultValue: "not withdrawn"
                  },
                  "schema-name": {
                      dimension: 17
                  },
                  "rendering-application": {
                      dimension: 20
                  },
                  "search-autocomplete-status": {
                      dimension: 21
                  },
                  "navigation-legacy": {
                      dimension: 30,
                      defaultValue: "none"
                  },
                  "navigation-list-type": {
                      dimension: 31,
                      defaultValue: "none"
                  },
                  "navigation-page-type": {
                      dimension: 32,
                      defaultValue: "none"
                  },
                  "taxon-slug": {
                      dimension: 56,
                      defaultValue: "other"
                  },
                  "taxon-id": {
                      dimension: 57,
                      defaultValue: "other"
                  },
                  "taxon-slugs": {
                      dimension: 58,
                      defaultValue: "other"
                  },
                  "taxon-ids": {
                      dimension: 59,
                      defaultValue: "other"
                  },
                  "content-has-history": {
                      dimension: 39,
                      defaultValue: "false"
                  },
                  "publishing-app": {
                      dimension: 89
                  },
                  "brexit-audience": {
                      dimension: 112
                  },
                  "brexit-superbreadcrumb": {
                      dimension: 111
                  },
                  stepnavs: {
                      dimension: 96
                  },
                  "relevant-result-shown": {
                      dimension: 83
                  },
                  "spelling-suggestion": {
                      dimension: 81
                  }
              }, t = document.querySelectorAll("meta[name^='govuk']"), n = {}, i = {}, a = 0; a < t.length; a++) {
              var o = t[a],
                  r = o.getAttribute("name").split("govuk:")[1];
              e[r] && (i[r] = o.getAttribute("content"))
          }
          for (var s in e) {
              var c = i[s] || e[s].defaultValue;
              void 0 !== c && (n["dimension" + e[s].dimension] = c)
          }
          return n
      }

      function a() {
          var e = document.getElementById("content");
          e && (e = e.getAttribute("lang"));
          var t = document.querySelector('[data-module="global-bar"]') || !1;
          return t && (t = "none" !== t.style.display), {
              dimension26: GOVUK.PageContent.getNumberOfSections(),
              dimension27: GOVUK.PageContent.getNumberOfLinks(),
              dimension23: e || "unknown",
              dimension38: t && "Global Banner viewed"
          }
      }

      function o() {
          for (var e = document.querySelectorAll("meta[name^='govuk:ab-test']"), t = {}, n = 0; n < e.length; n++) {
              var i = e[n],
                  a = parseInt(i.getAttribute("data-analytics-dimension")),
                  o = i.getAttribute("content");
              a && (t["dimension" + a] = o)
          }
          return t
      }
      window.GOVUK = window.GOVUK || {};
      var e = function() {};
      e.getAndExtendDefaultTrackingOptions = function(e) {
          var t = this.customDimensions();
          return GOVUK.extendObject(t, e)
      }, e.customDimensions = function() {
          var e = GOVUK.extendObject({}, n(), i(), a(), o());
          for (var t in e) e[t] = new GOVUK.Analytics.PIISafe(String(e[t]));
          return e
      }, GOVUK.CustomDimensions = e
  }(),
  function() {
      "use strict";

      function i() {
          try {
              var e = n.prototype.getCookie("analytics_next_page_call");
              return n.prototype.setCookie("analytics_next_page_call", null), e || {}
          } catch (t) {
              return {}
          }
      }
      window.GOVUK = window.GOVUK || {};
      var n = function(e) {
          var t = window.GOVUK.getConsentCookie();
          t && !t.usage || (this.analytics = new GOVUK.Analytics(e));
          var n = i();
          ga(function(e) {
              this.gaClientId = e.get("clientId"), GOVUK.triggerEvent(window, "gaClientSet"), GOVUK.Ecommerce.start(), this.trackPageview(null, null, n), GOVUK.analyticsPlugins.error({
                  filenameMustMatch: /gov\.uk/
              }), GOVUK.analyticsPlugins.printIntent(), GOVUK.analyticsPlugins.mailtoLinkTracker(), GOVUK.analyticsPlugins.externalLinkTracker({
                  externalLinkUploadCustomDimension: 36
              }), GOVUK.analyticsPlugins.downloadLinkTracker({
                  selector: 'a[href*="/government/uploads"], a[href*="assets.publishing.service.gov.uk"]'
              })
          }.bind(this))
      };
      n.load = function() {
          GOVUK.Analytics.load()
      }, n.prototype.trackPageview = function(e, t, n) {
          var i = !this.getCookie("seen_cookie_message"),
              a = {
                  dimension100: i ? i.toString() : "false"
              };
          n = GOVUK.extendObject(n, a);
          var o = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions(n);
          this.analytics.trackPageview(e, t, o)
      }, n.prototype.trackEvent = function(e, t, n) {
          var i = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions(n);
          this.analytics.trackEvent(e, t, i)
      }, n.prototype.setDimension = function(e, t, n, i) {
          void 0 !== t && this.analytics.setDimension(e, t, n, i)
      }, n.prototype.trackShare = function(e) {
          var t = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions();
          this.analytics.trackShare(e, t)
      }, n.prototype.addLinkedTrackerDomain = function(e, t, n, i) {
          this.analytics.addLinkedTrackerDomain(e, t, n, i)
      }, n.prototype.setOptionsForNextPageview = function(e) {
          if ("object" == typeof e) {
              var t = i();
              t = GOVUK.extendObject(t, e), this.setCookie("analytics_next_page_call", t)
          }
      }, n.prototype.setCookie = function(e, t) {
          GOVUK.cookie && (t ? GOVUK.cookie(e, JSON.stringify(JSON.stringify(t))) : GOVUK.cookie(e, null))
      }, n.prototype.getCookie = function(e) {
          if (GOVUK.cookie) try {
              return JSON.parse(JSON.parse(GOVUK.cookie(e)))
          } catch (t) {
              return null
          }
      }, n.prototype.stripPII = function(e) {
          return this.analytics.pii.stripPII(e)
      }, GOVUK.StaticAnalytics = n
  }(),
  function() {
      "use strict";
      window.GOVUK = window.GOVUK || {};
      var p = "Site search results",
          v = "Results",
          n = function() {
              function l(e, t, n, i, a, o, r) {
                  var s = {
                      position: n,
                      list: i,
                      dimension71: o
                  };
                  return a !== undefined && (s.dimension94 = a), e !== undefined && (s.id = e), t !== undefined && (s.name = t), r !== undefined && (s.variant = r), s
              }

              function w(e, t, n, i, a, o, r) {
                  if (e || t) {
                      var s = l(e, t, n, a, o, i, r);
                      ga("ec:addImpression", s)
                  }
              }

              function m(e, t, n, i, a, o, r, s, c) {
                  e.addEventListener("click", function() {
                      if (t || n) {
                          var e = l(t, n, i, o, r, a, s);
                          ga("ec:addProduct", e)
                      }
                      ga("ec:setAction", "click", {
                          list: o
                      }), GOVUK.analytics.trackEvent("UX", "click", GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions({
                          label: c
                      }))
                  })
              }
              this.init = function(e) {
                  for (var t = GOVUK.analytics.stripPII(e.getAttribute("data-search-query")).substring(0, 100).toLowerCase(), n = e.querySelectorAll("[data-ecommerce-row]"), i = parseInt(e.getAttribute("data-ecommerce-start-index"), 10), a = e.getAttribute("data-list-title") || p, o = e.getAttribute("data-ecommerce-variant") || undefined, r = e.getAttribute("data-track-click-label") || v, s = 0; s < n.length; s++) {
                      var c = n[s],
                          l = c.getAttribute("data-ecommerce-subheading") || undefined,
                          u = c.getAttribute("data-ecommerce-content-id") || undefined,
                          d = c.getAttribute("data-ecommerce-path"),
                          g = c.getAttribute("data-ecommerce-index"),
                          h = g ? parseInt(g, 10) - 1 : s;
                      w(u, d, h + i, t, a, l, o), m(c, u, d, h + i, t, a, l, o, r)
                  }
              }
          };
      n.ecLoaded = !1, n.start = function(e) {
          if (window.ga && 0 < (e = e || document.querySelectorAll("[data-analytics-ecommerce]")).length) {
              n.ecLoaded || (ga("require", "ec"), n.ecLoaded = !0);
              for (var t = 0; t < e.length; t++) {
                  (new n).init(e[t])
              }
          }
      }, GOVUK.Ecommerce = n
  }();
var analyticsInit = function() {
  "use strict";
  if (window.GOVUK.analyticsVars || !1) var e = window.GOVUK.analyticsVars.gaProperty || !1,
      t = window.GOVUK.analyticsVars.gaPropertyCrossDomain || !1,
      n = window.GOVUK.analyticsVars.linkedDomains || !1;
  window.GOVUK.Analytics.checkDigitalIdentityConsent = function(e) {
      if (e && e.search) {
          var t = /([?&]cookie_consent=)(accept|reject)/.exec(e.search);
          t && ("accept" === t[2] ? (window.GOVUK.setConsentCookie({
              usage: !0
          }), window.GOVUK.cookie("cookies_preferences_set", "true")) : "reject" === t[2] && (window.GOVUK.setConsentCookie({
              usage: !1
          }), window.GOVUK.cookie("cookies_preferences_set", "true")))
      }
  }, window.GOVUK.Analytics.checkDigitalIdentityConsent(window.location);
  var i = window.GOVUK.getConsentCookie(),
      a = {
          addLinkedTrackerDomain: function() {},
          setDimension: function() {},
          setOptionsForNextPageView: function() {},
          trackEvent: function() {},
          trackPageview: function() {},
          trackShare: function() {}
      },
      o = "ga-disable-" + e;
  if (window[o] = !0, i && i.usage) {
      if (window[o] = !1, window.GOVUK.StaticAnalytics.load(), e) {
          var r = "www.gov.uk" === document.domain ? ".www.gov.uk" : document.domain,
              s = new window.GOVUK.StaticAnalytics({
                  universalId: e,
                  cookieDomain: r,
                  allowLinker: !0
              });
          window.GOVUK.analytics = s, n && 0 < n.length && window.GOVUK.analytics.addLinkedTrackerDomain(t, "govuk", n)
      }
  } else window.GOVUK.analytics = a
};
window.GOVUK.analyticsInit = analyticsInit, window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, window.GOVUK.analyticsVars = window.GOVUK.analyticsVars || {},
  function(e) {
      function i(e) {
          this.$module = e, this.pageHeight = document.querySelector("body").clientHeight, this.trackedNodes = [], this.config = {
              allowHeadingsInside: ["main"],
              percentages: [20, 40, 60, 80, 100],
              scrollTimeoutDelay: 20,
              resizeTimeoutDelay: 100,
              pageHeightTimeoutDelay: 500
          }
      }
      i.prototype.init = function() {
          var e = window.GOVUK.getConsentCookie();
          e && e.settings ? this.startModule() : (this.startModule = this.startModule.bind(this), window.addEventListener("cookie-consent", this.startModule))
      }, i.prototype.startModule = function() {
          if (!window.GOVUK.analyticsVars.scrollTrackerStarted) {
              this.trackType = this.$module.getAttribute("data-track-type");
              var e = this.$module.getAttribute("data-track-headings");
              if (e) try {
                  this.config.trackHeadings = JSON.parse(e)
              } catch (n) {
                  return console.error("Scroll tracker configuration error: " + n.message, window.location), void(window.GOVUK.analyticsVars.scrollTrackerStarted = !1)
              }
              window.GOVUK.analyticsVars.scrollTrackerStarted = !0, "headings" === this.trackType ? this.track = new i.Heading(this.config) : this.track = new i.Percentage(this.config), this.getWindowDetails();
              var t = window.location.hash;
              t && document.getElementById(t.substring(1)) || this.trackVisibleNodes(), this.trackedNodes.length && (this.scrollEvent = this.onScroll.bind(this), window.addEventListener("scroll", this.scrollEvent), this.resizeEvent = this.onResize.bind(this), window.addEventListener("resize", this.resizeEvent), this.interval = window.setInterval(function() {
                  var e = document.querySelector("body").clientHeight;
                  e !== this.pageHeight && (this.pageHeight = e, this.getWindowDetails(), this.trackVisibleNodes())
              }.bind(this), this.config.pageHeightTimeoutDelay))
          }
      }, i.prototype.onScroll = function() {
          clearTimeout(this.scrollTimeout), this.scrollTimeout = setTimeout(function() {
              this.trackVisibleNodes()
          }.bind(this), this.config.scrollTimeoutDelay)
      }, i.prototype.onResize = function() {
          clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
              this.getWindowDetails(), this.trackVisibleNodes()
          }.bind(this), this.config.resizeTimeoutDelay)
      }, i.prototype.getWindowDetails = function() {
          this.pageHeight = document.querySelector("body").clientHeight, this.windowHeight = window.innerHeight, this.trackedNodes = this.track.getTrackingNodes(this.trackedNodes)
      }, i.prototype.trackVisibleNodes = function() {
          for (var e = 0; e < this.trackedNodes.length; e++) {
              var t = this.trackedNodes[e];
              if (this.isVisible(t.top, t.bottom) && !t.alreadySeen) {
                  t.alreadySeen = !0, t.node && t.node.setAttribute("data-autoscrolltracker-already-seen", !0);
                  var n = t.eventData.action,
                      i = t.eventData.label;
                  window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent("ScrollTo", n, {
                      label: i,
                      nonInteraction: !0
                  })
              }
          }
      }, i.prototype.isVisible = function(e, t) {
          var n = window.scrollY || document.documentElement.scrollTop;
          return n <= e && n + this.windowHeight >= t
      }, i.Heading = function(e) {
          this.config = e
      }, i.Heading.prototype.getTrackingNodes = function() {
          for (var e = [], t = this.findAllowedHeadings(), n = 0; n < t.length; n++) {
              var i = t[n];
              if (this.visible(i)) {
                  var a = i.getBoundingClientRect();
                  e.push({
                      node: i,
                      alreadySeen: i.getAttribute("data-autoscrolltracker-already-seen"),
                      top: a.top + document.documentElement.scrollTop,
                      bottom: a.bottom + document.documentElement.scrollTop,
                      eventData: {
                          action: "Heading",
                          label: i.textContent.replace(/\s+/g, " ").trim()
                      }
                  })
              }
          }
          return e
      }, i.Heading.prototype.findAllowedHeadings = function() {
          for (var e = [], t = ["h1", "h2", "h3", "h4", "h5", "h6"], n = this.config.trackHeadings, i = 0; i < this.config.allowHeadingsInside.length; i++)
              for (var a = document.querySelectorAll(this.config.allowHeadingsInside[i]), o = 0; o < a.length; o++)
                  for (var r = a[o].querySelectorAll(t), s = 0; s < r.length; s++) n ? n.includes(r[s].textContent.trim()) && e.push(r[s]) : e.push(r[s]);
          return e
      }, i.Heading.prototype.visible = function(e) {
          return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
      }, i.Percentage = function(e) {
          this.config = e
      }, i.Percentage.prototype.getTrackingNodes = function(e) {
          for (var t = document.body, n = document.documentElement, i = Math.max(t.scrollHeight, t.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight), a = [], o = 0; o < this.config.percentages.length; o++) {
              var r = this.config.percentages[o],
                  s = i / 100 * r - 1,
                  c = !1;
              e.length && (c = e[o].alreadySeen), a.push({
                  alreadySeen: c,
                  top: s,
                  bottom: s,
                  eventData: {
                      action: "Percent",
                      label: String(r)
                  }
              })
          }
          return a
      }, e.AutoScrollTracker = i
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(e) {
      function t(e) {
          this.$module = e
      }
      t.prototype.init = function() {
          this.attribute = "href", this.attributeValue = this.$module.getAttribute(this.attribute), this.eventType = "click", this.attributeValue || (this.attribute = "action", this.attributeValue = this.$module.getAttribute(this.attribute), this.eventType = "submit"), this.handleEvent = this.handleEvent.bind(this), this.handleCookiesAccepted = this.handleCookiesAccepted.bind(this), this.$module.addEventListener(this.eventType, this.handleEvent)
      }, t.prototype.decorate = function(e, t, n) {
          var i = e.getAttribute(n);
          i && (-1 !== i.indexOf("?") ? i += "&" + t : i += "?" + t, e.setAttribute(n, i))
      }, t.prototype.handleEvent = function(e) {
          e.preventDefault();
          var t = window.GOVUK.cookie("cookies_preferences_set"),
              n = window.GOVUK.getConsentCookie();
          "true" !== t ? this.decorate(this.$module, "cookie_consent=not-engaged", this.attribute) : n && !0 === n.usage ? this.handleCookiesAccepted() : this.decorate(this.$module, "cookie_consent=reject", this.attribute), this.$module.removeEventListener(this.eventType, this.handleEvent), "submit" === this.eventType ? this.$module.submit() : this.$module.click()
      }, t.prototype.handleCookiesAccepted = function() {
          var i = this.$module,
              a = this.attribute;
          this.decorate(i, "cookie_consent=accept", a), window.ga && window.ga(function() {
              var e = window.ga.getAll();
              if (e.length) {
                  var t = new window.gaplugins.Linker(e[0]),
                      n = i.getAttribute(a);
                  i.setAttribute(a, t.decorate(n))
              }
          })
      }, e.ExplicitCrossDomainLinks = t
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(e) {
      function t(e) {
          this.$module = e
      }
      t.prototype.init = function() {
          this.$module.handleClick = this.handleClick.bind(this);
          var n = this.$module.hasAttribute("data-track-links-only"),
              i = this.$module.getAttribute("data-limit-to-element-class"),
              a = this;
          this.$module.addEventListener("click", function(e) {
              var t = e.target;
              n ? n && t.closest("a") && (i ? i && t.closest("." + i) && a.$module.handleClick(t) : a.$module.handleClick(t)) : a.$module.handleClick(t)
          })
      }, t.prototype.handleClick = function(e) {
          var t, n = {
              transport: "beacon"
          };
          if (e.hasAttribute("data-track-category") || e.hasAttribute("data-track-action") || (t = e.getAttribute("href"), e = e.closest("[data-track-category][data-track-action]")), e) {
              var i = e.getAttribute("data-track-category"),
                  a = e.getAttribute("data-track-action"),
                  o = e.getAttribute("data-track-label") || t,
                  r = e.getAttribute("data-track-value"),
                  s = e.getAttribute("data-track-dimension"),
                  c = e.getAttribute("data-track-dimension-index"),
                  l = e.getAttribute(
                      "data-track-options");
              if (o && (n.label = o), r && (n.value = r), s && c && (n["dimension" + c] = s), l)
                  for (var u in l = JSON.parse(l)) n[u] = l[u];
              window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent(i, a, n)
          }
      }, e.GemTrackClick = t
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(e) {
      function t(e) {
          this.$module = e
      }
      t.prototype.init = function() {
          this.$module.trackChange = this.trackChange.bind(this), this.$module.fireTrackingChange = this.fireTrackingChange.bind(this), this.$module.addEventListener("change", this.trackChange)
      }, t.prototype.trackChange = function() {
          var e = this.options[this.selectedIndex];
          e.hasAttribute("data-track-category") && e.hasAttribute("data-track-action") && this.fireTrackingChange(e)
      }, t.prototype.fireTrackingChange = function(e) {
          var t = {
                  transport: "beacon"
              },
              n = e.getAttribute("data-track-category"),
              i = e.getAttribute("data-track-action"),
              a = e.getAttribute("data-track-label"),
              o = e.getAttribute("data-track-value"),
              r = e.getAttribute("data-track-dimension"),
              s = e.getAttribute("data-track-dimension-index"),
              c = e.getAttribute("data-track-options");
          if (a && (t.label = a), o && (t.value = o), r && s && (t["dimension" + s] = r), c)
              for (var l in c = JSON.parse(c)) t[l] = c[l];
          window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent(n, i, t)
      }, e.TrackSelectChange = t
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(o) {
      function e(e) {
          this.$module = e, o.crossDomainLinkedTrackers = o.crossDomainLinkedTrackers || []
      }
      e.prototype.init = function() {
          this.isTrackable(this.$module) ? this.addLinkedTrackerDomain(this.$module) : this.findTrackableElements()
      }, e.prototype.isTrackable = function(e) {
          if (e.getAttribute("href") && e.getAttribute("data-tracking-code") && e.getAttribute("data-tracking-name")) return !0
      }, e.prototype.findTrackableElements = function() {
          for (var e = this.$module.querySelectorAll("a"), t = 0; t < e.length; t++) this.isTrackable(e[t]) && this.addLinkedTrackerDomain(e[t])
      }, e.prototype.addLinkedTrackerDomain = function(e) {
          var n = e.getAttribute("data-tracking-name"),
              t = e.getAttribute("data-tracking-code"),
              i = "true" === e.getAttribute("data-tracking-track-event");
          if ("undefined" !== window.GOVUK.analytics) {
              if (-1 === o.crossDomainLinkedTrackers.indexOf(n)) {
                  var a = e.hostname;
                  window.GOVUK.analytics.addLinkedTrackerDomain(t, n, a), o.crossDomainLinkedTrackers.push(n)
              }
              i && e.addEventListener("click", function(e) {
                  var t = e.target;
                  window.GOVUK.analytics.trackEvent("External Link Clicked", t.textContent, {
                      trackerName: n
                  })
              })
          }
      }, o.CrossDomainTracking = e
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {},
  function() {
      "use strict";
      var e = {
          load: function() {
              var e = document.getElementsByTagName("script")[0],
                  t = document.createElement("script");
              t.async = !0, window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                  "gtm.blocklist": ["customPixels", "customScripts", "html", "nonGoogleScripts"]
              }), window.dataLayer.push({
                  "gtm.start": (new Date).getTime(),
                  event: "gtm.js"
              });
              var n = window.GOVUK.analyticsGa4.vars.auth || "",
                  i = window.GOVUK.analyticsGa4.vars.preview || "";
              n && (n = "&gtm_auth=" + n), i && (i = "&gtm_preview=" + i + "&gtm_cookies_win=x"), this.googleSrc = "https://www.googletagmanager.com/gtm.js?id=" + window.GOVUK.analyticsGa4.vars.id + n + i, t.src = this.googleSrc, e.parentNode.insertBefore(t, e)
          },
          sendData: function(e) {
              e.govuk_gem_version = this.getGemVersion(), window.dataLayer.push(e)
          },
          getGemVersion: function() {
              return window.GOVUK.analyticsGa4.vars.gem_version || "not found"
          },
          trackFunctions: {
              getDomainRegex: function() {
                  return /^(http:||https:)?(\/\/)([^\/]*)/
              },
              findTrackingAttributes: function(e, t) {
                  return e.hasAttribute("[" + t + "]") ? e : e.closest("[" + t + "]")
              },
              populateLinkPathParts: function(e) {
                  var t = "";
                  if ("/" !== (t = this.hrefIsRelative(e) || this.isMailToLink(e) ? e : e.replace(/^(http:||https:)?(\/\/)([^\/]*)/, "")) && 0 !== t.length) return this.splitStringIntoParts(t)
              },
              splitStringIntoParts: function(e) {
                  for (var t = e.match(/.{1,100}/g), n = {}, i = 0; i < 5; i++) n[(i + 1).toString()] = t[i];
                  return n
              },
              hrefIsRelative: function(e) {
                  return !this.getDomainRegex().exec(e)
              },
              isMailToLink: function(e) {
                  return "mailto:" === e.substring(0, 7)
              },
              getClickType: function(e) {
                  switch (e.type) {
                      case "click":
                          return e.ctrlKey ? "ctrl click" : e.metaKey ? "command/win click" : e.shiftKey ? "shift click" : "primary click";
                      case "mousedown":
                          return "middle click";
                      case "contextmenu":
                          return "secondary click"
                  }
              },
              isInternalLink: function(e) {
                  var t = window.GOVUK.analyticsGa4.vars.internalDomains;
                  if (this.hrefIsRelative(e)) return !0;
                  for (var n = !1, i = 0; i < t.length; i++) {
                      var a = t[i];
                      this.hrefPointsToDomain(e, a) && (n = !0)
                  }
                  return n
              },
              isExternalLink: function(e) {
                  return !this.isInternalLink(e)
              },
              hrefPointsToDomain: function(e, t) {
                  return "/" !== t.substring(t.length) && (t += "/"), "/" !== e.substring(e.length) && (e += "/"), new RegExp("^((http)*(s)*(:)*//)(" + t + ")", "g").test(e)
              },
              removeLinesAndExtraSpaces: function(e) {
                  return e = (e = (e = e.trim()).replace(/(\r\n|\n|\r)/gm, " ")).replace(/\s+/g, " ")
              },
              removeCrossDomainParams: function(e) {
                  return -1 === e.indexOf("_ga") && -1 === e.indexOf("_gl") || (e = (e = (e = e.replaceAll(/_g[al]=([^&]*)/g, "")).replaceAll(/(&&)+/g, "&")).replace("?&", "?"), (this.stringEndsWith(e, "?") || this.stringEndsWith(e, "&")) && (e = e.substring(0, e.length - 1))), e
              },
              stringStartsWith: function(e, t) {
                  return e.substring(0, t.length) === t
              },
              stringEndsWith: function(e, t) {
                  return e.substring(e.length - t.length, e.length) === t
              },
              populateLinkDomain: function(e) {
                  if (this.isMailToLink(e)) return undefined;
                  if (this.hrefIsRelative(e)) return this.getProtocol() + "//" + this.getHostname();
                  var t = this.getDomainRegex().exec(e);
                  return t ? t[0] : void 0
              },
              getProtocol: function() {
                  return window.location.protocol
              },
              getHostname: function() {
                  return window.location.hostname
              },
              appendDomainsWithoutWWW: function(e) {
                  for (var t = 0; t < e.length; t++) {
                      var n = e[t];
                      if (this.stringStartsWith(n, "www.")) {
                          var i = n.replace("www.", "");
                          e.push(i)
                      }
                  }
              },
              setIndexes: function(e) {
                  for (var t = e.querySelectorAll("a"), n = 0, i = 0; i < t.length; i++) {
                      var a = t[i];
                      a.getAttribute("data-ga4-ecommerce-path") || (n++, a.setAttribute("data-ga4-index", '{"index_link": ' + n + "}"))
                  }
                  try {
                      var o = JSON.parse(e.getAttribute("data-ga4-link"));
                      o.index_total = n, e.setAttribute("data-ga4-link", JSON.stringify(o))
                  } catch (r) {
                      console.error("Unable to JSON.parse or JSON.stringify index: " + r.message, window.location)
                  }
              },
              createIndexObject: function(e) {
                  if (void 0 === e) return undefined;
                  if ("object" == typeof e) return e;
                  switch ((e = e.toString().split(".")).length) {
                      case 1:
                          return {
                              index_section: parseInt(e[0])
                          };
                      case 2:
                          return {
                              index_section: parseInt(e[0]),
                              index_link: parseInt(e[1])
                          };
                      case 3:
                          return {
                              index_section: parseInt(e[1]),
                              index_link: parseInt(e[2])
                          }
                  }
              },
              addAttributesToElements: function(e, t) {
                  for (var n = document.querySelectorAll(e), i = 0; i < n.length; i++)
                      for (var a = n[i], o = 0; o < t.length; o++) {
                          var r = t[o].key,
                              s = t[o].value;
                          if (r && s !== undefined) {
                              var c = a.getAttribute(r);
                              "data-module" === r && c ? a.setAttribute(r, c + " " + s) : a.setAttribute(r, s)
                          }
                      }
              }
          },
          ecommerceHelperFunctions: {
              clearEcommerceObject: function() {
                  window.GOVUK.analyticsGa4.core.sendData({
                      search_results: {
                          ecommerce: null
                      }
                  })
              },
              getIndex: function(e, t) {
                  var n = e.getAttribute("data-ecommerce-index");
                  return n ? parseInt(n) + t - 1 : null
              },
              getResultCount: function(e, t) {
                  var n = e.querySelector("#" + t);
                  return n ? (n = (n = n.textContent.replace(",", "")).split(" ")[0], parseInt(n)) : null
              },
              populateEcommerceSchema: function(e) {
                  var t = e.element,
                      n = e.resultsId,
                      i = e.event !== undefined,
                      a = t.getAttribute("data-search-query"),
                      o = (new window.GOVUK.analyticsGa4.Schemas).ecommerceSchema(),
                      r = new window.GOVUK.analyticsGa4.PIIRemover,
                      s = "Smart answer results";
                  if (a) {
                      var c = r.stripPII(t.getAttribute("data-search-query")).substring(0, 100).toLowerCase(),
                          l = t.getAttribute("data-ecommerce-variant");
                      s = "Site search results"
                  }
                  var u = t.querySelectorAll("[data-ga4-ecommerce-path]"),
                      d = t.getAttribute("data-list-title") || s,
                      g = parseInt(t.getAttribute("data-ecommerce-start-index"), 10);
                  if (o.event = "search_results", o.search_results.event_name = i ? "select_item" : "view_item_list", o.search_results.results = window.GOVUK.analyticsGa4.core.ecommerceHelperFunctions.getResultCount(t, n), o.search_results.term = c || undefined, o.search_results.sort = l || undefined, i) {
                      var h = e.event.target;
                      o.search_results.ecommerce.items.push({
                          item_id: h.getAttribute("data-ga4-ecommerce-path"),
                          item_name: h.textContent,
                          item_list_name: d,
                          index: window.GOVUK.analyticsGa4.core.ecommerceHelperFunctions.getIndex(h, g)
                      }), o.event_data = {
                          external: window.GOVUK.analyticsGa4.core.trackFunctions.isExternalLink(h.getAttribute("data-ga4-ecommerce-path")) ? "true" : "false"
                      }
                  } else
                      for (var w = 0; w < u.length; w++) {
                          var m = u[w],
                              p = m.getAttribute("data-ga4-ecommerce-path");
                          m.getAttribute("data-ecommerce-index") || m.setAttribute("data-ecommerce-index", w + 1), o.search_results.ecommerce.items.push({
                              item_id: p,
                              item_list_name: d,
                              index: window.GOVUK.analyticsGa4.core.ecommerceHelperFunctions.getIndex(m, g)
                          })
                      }
                  return o
              }
          }
      };
      window.GOVUK.analyticsGa4.core = e
  }(),
  function(e) {
      "use strict";
      var t = e.GOVUK || {},
          n = function() {
              this.undefined = undefined
          };
      n.prototype.eventSchema = function() {
          return {
              event: this.undefined,
              event_data: {
                  event_name: this.undefined,
                  type: this.undefined,
                  url: this.undefined,
                  text: this.undefined,
                  index: this.undefined,
                  index_total: this.undefined,
                  section: this.undefined,
                  action: this.undefined,
                  external: this.undefined,
                  method: this.undefined,
                  link_domain: this.undefined,
                  link_path_parts: this.undefined,
                  tool_name: this.undefined
              }
          }
      }, n.prototype.ecommerceSchema = function() {
          return {
              event: this.undefined,
              search_results: {
                  event_name: this.undefined,
                  term: this.undefined,
                  sort: this.undefined,
                  results: this.undefined,
                  ecommerce: {
                      items: []
                  }
              },
              event_data: this.undefined
          }
      }, n.prototype.mergeProperties = function(e, t) {
          var n = this.eventSchema();
          for (var i in n.event = t, e) i in n.event_data && (n.event_data[i] = e[i]);
          return n
      }, t.analyticsGa4 = t.analyticsGa4 || {}, t.analyticsGa4.Schemas = n, e.GOVUK = t
  }(window),
  function(e) {
      "use strict";

      function t() {
          return 0 < document.querySelectorAll('meta[name="govuk:static-analytics:strip-dates"]').length
      }

      function n() {
          return 0 < document.querySelectorAll('meta[name="govuk:static-analytics:strip-postcodes"]').length
      }

      function i() {
          var e = document.querySelector('meta[name="govuk:static-analytics:strip-query-string-parameters"]'),
              t = !1;
          e && (t = e.getAttribute("content"));
          var n = [];
          if (t)
              for (var i = t.split(","), a = 0; a < i.length; a++) n.push(i[a].trim());
          return n
      }
      var a = e.GOVUK || {},
          o = /[^\s=/?&#]+(?:@|%40)[^\s=/?&]+/g,
          r = /\b[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9](?!refund)[ABD-HJLNPQ-Z]{2,3}\b/gi,
          s = /\d{4}(-?)\d{2}(-?)\d{2}/g,
          c = /\d{1,2}\s(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}/g,
          l = /[|\\{}()[\]^$+*?.]/g,
          u = /reset_password_token=[a-zA-Z0-9-]+/g,
          d = /unlock_token=[a-zA-Z0-9-]+/g,
          g = /state=.[^&]+/g,
          h = function() {
              this.stripDatePII = t(), this.stripPostcodePII = n(), this.queryStringParametersToStrip = i()
          };
      h.prototype.PIISafe = function(e) {
          this.value = e
      }, h.prototype.stripPII = function(e) {
          return "string" == typeof e ? this.stripPIIFromString(e) : "[object Array]" === Object.prototype.toString.call(e) || "[object Arguments]" === Object.prototype.toString.call(e) ? this.stripPIIFromArray(e) : "object" == typeof e ? this.stripPIIFromObject(e) : e
      }, h.prototype.stripPIIWithOverride = function(e, t, n) {
          var i = this.stripDatePII,
              a = this.stripPostcodePII;
          this.stripDatePII = t, this.stripPostcodePII = n;
          var o = this.stripPII(e);
          return this.stripDatePII = i, this.stripPostcodePII = a, o
      }, h.prototype.stripPIIFromString = function(e) {
          var t = e.replace(o, "[email]");
          return t = (t = (t = t.replace(u, "reset_password_token=[reset_password_token]")).replace(d, "unlock_token=[unlock_token]")).replace(g, "state=[state]"), t = this.stripQueryStringParameters(t), !0 === this.stripDatePII && (t = (t = t.replace(s, "[date]")).replace(c, "[date]")), !0 === this.stripPostcodePII && (t = t.replace(r, "[postcode]")), t
      }, h.prototype.stripPIIFromObject = function(e) {
          if (e) {
              if (e instanceof this.PIISafe) return e.value;
              for (var t in e) {
                  var n = e[t];
                  e[t] = this.stripPII(n)
              }
              return e
          }
      }, h.prototype.stripPIIFromArray = function(e) {
          for (var t = 0, n = e.length; t < n; t++) {
              var i = e[t];
              e[t] = this.stripPII(i)
          }
          return e
      }, h.prototype.stripQueryStringParameters = function(e) {
          for (var t = 0; t < this.queryStringParametersToStrip.length; t++) {
              var n = this.queryStringParametersToStrip[t],
                  i = n.replace(l, "\\$&"),
                  a = new RegExp("((?:\\?|&)" + i + "=)(?:[^&#\\s]*)", "g");
              e = e.replace(a, "$1[" + n + "]")
          }
          return e
      }, a.analyticsGa4 = a.analyticsGa4 || {}, a.analyticsGa4.PIIRemover = h, e.GOVUK = a
  }(window), window.GOVUK = window.GOVUK || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}, window.GOVUK.analyticsGa4.analyticsModules = window.GOVUK.analyticsGa4.analyticsModules || {},
  function(e) {
      "use strict";
      var t = {
          PIIRemover: new window.GOVUK.analyticsGa4.PIIRemover,
          nullValue: undefined,
          init: function(e) {
              if (window.dataLayer) {
                  var t = {
                      event: "page_view",
                      page_view: {
                          location: this.getLocation(),
                          referrer: e || this.getReferrer(),
                          title: this.getTitle(),
                          status_code: this.getStatusCode(),
                          document_type: this.getMetaContent("format"),
                          publishing_app: this.getMetaContent("publishing-app"),
                          rendering_app: this.getMetaContent("rendering-app"),
                          schema_name: this.getMetaContent("schema-name"),
                          content_id: this.getMetaContent("content-id"),
                          browse_topic: this.getMetaContent("section"),
                          taxonomy_level1: this.getMetaContent("themes"),
                          taxonomy_main: this.getMetaContent("taxon-slug"),
                          taxonomy_main_id: this.getMetaContent("taxon-id"),
                          taxonomy_all: this.splitLongMetaContent("taxon-slugs"),
                          taxonomy_all_ids: this.splitLongMetaContent("taxon-ids"),
                          language: this.getLanguage(),
                          history: this.getHistory(),
                          withdrawn: this.getWithDrawn(),
                          first_published_at: this.stripTimeFrom(this.getMetaContent("first-published-at")),
                          updated_at: this.stripTimeFrom(this.getMetaContent("updated-at")),
                          public_updated_at: this.stripTimeFrom(this.getMetaContent("public-updated-at")),
                          publishing_government: this.getMetaContent("publishing-government"),
                          political_status: this.getMetaContent("political-status"),
                          primary_publishing_organisation: this.getMetaContent("primary-publishing-organisation"),
                          organisations: this.getMetaContent("analytics:organisations"),
                          world_locations: this.getMetaContent("analytics:world-locations"),
                          dynamic: e ? "true" : "false"
                      }
                  };
                  window.GOVUK.analyticsGa4.core.sendData(t)
              }
          },
          getLocation: function() {
              return this.PIIRemover.stripPII(document.location.href)
          },
          getReferrer: function() {
              return this.PIIRemover.stripPIIWithOverride(document.referrer, !0, !0)
          },
          getTitle: function() {
              return this.PIIRemover.stripPII(document.title)
          },
          getStatusCode: function() {
              return window.httpStatusCode ? window.httpStatusCode.toString() : "200"
          },
          getMetaContent: function(e) {
              var t = document.querySelector('meta[name="govuk:' + e + '"]');
              return t ? t.getAttribute("content") : this.nullValue
          },
          getLanguage: function() {
              var e = document.getElementById("content");
              return e && e.getAttribute("lang") || this.nullValue
          },
          getHistory: function() {
              return "true" === this.getMetaContent("content-has-history") ? "true" : "false"
          },
          getWithDrawn: function() {
              return "withdrawn" === this.getMetaContent("withdrawn") ? "true" : "false"
          },
          splitLongMetaContent: function(e) {
              var t = this.getMetaContent(e);
              if (t) return window.GOVUK.analyticsGa4.core.trackFunctions.splitStringIntoParts(t)
          },
          stripTimeFrom: function(e) {
              return e !== undefined ? e.split("T")[0] : this.nullValue
          }
      };
      e.PageViewTracker = t
  }(window.GOVUK.analyticsGa4.analyticsModules), window.GOVUK = window.GOVUK || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}, window.GOVUK.analyticsGa4.analyticsModules = window.GOVUK.analyticsGa4.analyticsModules || {},
  function() {
      "use strict";
      var e = {
          init: function(e) {
              window.dataLayer && (e = e || {}, this.internalDownloadPaths = e.internalDownloadPaths || ["/government/uploads/"], this.dedicatedDownloadDomains = e.dedicatedDownloadDomains || ["assets.publishing.service.gov.uk"], window.GOVUK.analyticsGa4.core.trackFunctions.appendDomainsWithoutWWW(this.dedicatedDownloadDomains), this.handleClick = this.handleClick.bind(this), this.handleMousedown = this.handleMousedown.bind(this), document.querySelector("body").addEventListener("click", this.handleClick), document.querySelector("body").addEventListener("contextmenu", this.handleClick), document.querySelector("body").addEventListener("mousedown", this.handleMousedown))
          },
          stopTracking: function() {
              document.querySelector("body").removeEventListener("click", this.handleClick), document.querySelector("body").removeEventListener("contextmenu", this.handleClick), document.querySelector("body").removeEventListener("mousedown", this.handleMousedown)
          },
          handleClick: function(e) {
              var t = e.target;
              if ("A" !== t.tagName && (t = t.closest("a")), t && !t.closest("[data-ga4-link]") && !t.closest("[data-ga4-ecommerce-path]")) {
                  var n = t.getAttribute("href");
                  if (n) {
                      var i = {};
                      if (window.GOVUK.analyticsGa4.core.trackFunctions.isMailToLink(n) ? (i.event_name = "navigation", i.type = "email", i.external = "true") : this.isDownloadLink(n) ? (i.event_name = "file_download", i.type = this.isPreviewLink(n) ? "preview" : "generic download", i.external = window.GOVUK.analyticsGa4.core.trackFunctions.isExternalLink(n) ? "true" : "false") : window.GOVUK.analyticsGa4.core.trackFunctions.isExternalLink(n) && (i.event_name = "navigation", i.type = "generic link", i.external = "true"), 0 < Object.keys(i).length) {
                          i.url = n, i.url && (i.url = window.GOVUK.analyticsGa4.core.trackFunctions.removeCrossDomainParams(i.url), i.link_domain = window.GOVUK.analyticsGa4.core.trackFunctions.populateLinkDomain(i.url), i.link_path_parts = window.GOVUK.analyticsGa4.core.trackFunctions.populateLinkPathParts(i.url)), i.text = window.GOVUK.analyticsGa4.core.trackFunctions.removeLinesAndExtraSpaces(t.textContent), i.method = window.GOVUK.analyticsGa4.core.trackFunctions.getClickType(e);
                          var a = (new window.GOVUK.analyticsGa4.Schemas).mergeProperties(i, "event_data");
                          window.GOVUK.analyticsGa4.core.sendData(a)
                      }
                  }
              }
          },
          handleMousedown: function(e) {
              1 === e.button && this.handleClick(e)
          },
          isDownloadLink: function(e) {
              if (window.GOVUK.analyticsGa4.core.trackFunctions.isInternalLink(e) && this.hrefPointsToDownloadPath(e)) return !0;
              for (var t = !1, n = 0; n < this.dedicatedDownloadDomains.length; n++) {
                  var i = this.dedicatedDownloadDomains[n];
                  window.GOVUK.analyticsGa4.core.trackFunctions.hrefPointsToDomain(e, i) && (t = !0)
              }
              return t
          },
          isPreviewLink: function(e) {
              return /\.\w+\/preview/i.test(e)
          },
          hrefPointsToDownloadPath: function(e) {
              for (var t = !1, n = 0; n < this.internalDownloadPaths.length; n++) {
                  var i = this.internalDownloadPaths[n]; - 1 !== e.indexOf(i) && (t = !0)
              }
              return t
          }
      };
      window.GOVUK.analyticsGa4.analyticsModules.Ga4SpecialistLinkTracker = e
  }(), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(e) {
      "use strict";

      function t(e) {
          this.module = e, this.trackingTrigger = "data-ga4-link", this.trackLinksOnly = this.module.hasAttribute("data-ga4-track-links-only"), this.limitToElementClass = this.module.getAttribute("data-ga4-limit-to-element-class")
      }
      t.prototype.init = function() {
          var e = window.GOVUK.getConsentCookie();
          e && e.settings ? this.startModule() : (this.startModule = this.startModule.bind(this), window.addEventListener("cookie-consent", this.startModule))
      }, t.prototype.startModule = function() {
          window.dataLayer && (this.handleClick = this.handleClick.bind(this), this.handleMousedown = this.handleMousedown.bind(this), this.module.addEventListener("click", this.handleClick), this.module.addEventListener("contextmenu", this.handleClick), this.module.addEventListener("mousedown", this.handleMousedown), this.module.hasAttribute("data-ga4-set-indexes") && window.GOVUK.analyticsGa4.core.trackFunctions.setIndexes(this.module))
      }, t.prototype.handleClick = function(e) {
          var t = e.target;
          this.trackLinksOnly ? this.trackLinksOnly && t.closest("a") && (this.limitToElementClass ? t.closest("." + this.limitToElementClass) && this.trackClick(e) : this.trackClick(e)) : this.trackClick(e)
      }, t.prototype.handleMousedown = function(e) {
          1 === e.button && this.handleClick(e)
      }, t.prototype.trackClick = function(e) {
          var t = e.target,
              n = new window.GOVUK.analyticsGa4.PIIRemover;
          if (!t.closest("[data-ga4-ecommerce-path]")) {
              var i = window.GOVUK.analyticsGa4.core.trackFunctions.findTrackingAttributes(e.target, this.trackingTrigger);
              if (i) {
                  try {
                      var a = i.getAttribute(this.trackingTrigger);
                      a = JSON.parse(a)
                  } catch (c) {
                      return void console.error("GA4 configuration error: " + c.message, window.location)
                  }
                  var o = a.text || e.target.textContent;
                  a.text = window.GOVUK.analyticsGa4.core.trackFunctions.removeLinesAndExtraSpaces(o);
                  var r = a.url || this.findLink(e.target).getAttribute("href");
                  a.url = window.GOVUK.analyticsGa4.core.trackFunctions.removeCrossDomainParams(n.stripPII(r)), a.link_domain = window.GOVUK.analyticsGa4.core.trackFunctions.populateLinkDomain(a.url), a.link_path_parts = window.GOVUK.analyticsGa4.core.trackFunctions.populateLinkPathParts(a.url), a.method = window.GOVUK.analyticsGa4.core.trackFunctions.getClickType(e), a.external = window.GOVUK.analyticsGa4.core.trackFunctions.isExternalLink(a.url) ? "true" : "false", a.index = this.setIndex(a.index, e.target), "smart answer" === a.type && "change response" === a.action && (a.section = n.stripPIIWithOverride(a.section, !0, !0));
                  var s = (new window.GOVUK.analyticsGa4.Schemas).mergeProperties(a, "event_data");
                  window.GOVUK.analyticsGa4.core.sendData(s)
              }
          }
      }, t.prototype.findLink = function(e) {
          return "A" === e.tagName ? e : e.closest("a")
      }, t.prototype.setIndex = function(e, t) {
          var n = window.GOVUK.analyticsGa4.core.trackFunctions.createIndexObject(e);
          if (t.getAttribute("data-ga4-index")) try {
              var i = JSON.parse(t.getAttribute("data-ga4-index"));
              n = n ? window.GOVUK.extendObject(n, i) : i
          } catch (a) {
              return void console.error("Unable to parse index as JSON: " + a.message, window.location)
          }
          return n
      }, e.Ga4LinkTracker = t
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(e) {
      "use strict";

      function t(e) {
          this.module = e, this.trackingTrigger = "data-ga4-event"
      }
      t.prototype.init = function() {
          var e = window.GOVUK.getConsentCookie();
          e && e.settings ? this.startModule() : (this.startModule = this.startModule.bind(this), window.addEventListener("cookie-consent", this.startModule))
      }, t.prototype.startModule = function() {
          window.dataLayer && this.module.addEventListener("click", this.trackClick.bind(this), !0)
      }, t.prototype.trackClick = function(e) {
          var t = window.GOVUK.analyticsGa4.core.trackFunctions.findTrackingAttributes(e.target, this.trackingTrigger);
          if (t) {
              try {
                  var n = t.getAttribute(this.trackingTrigger);
                  n = JSON.parse(n)
              } catch (u) {
                  return void console.error("GA4 configuration error: " + u.message, window.location)
              }
              var i = n.text || e.target.textContent;
              n.text = window.GOVUK.analyticsGa4.core.trackFunctions.removeLinesAndExtraSpaces(i), n.index = window.GOVUK.analyticsGa4.core.trackFunctions.createIndexObject(n.index);
              var a = (new window.GOVUK.analyticsGa4.Schemas).mergeProperties(n, "event_data");
              if (t.closest("[data-ga4-expandable]")) var o = this.getClosestAttribute(t, "aria-expanded");
              var r = t.closest("details");
              if (o) a.event_data.text = n.text || t.innerText, a.event_data.action = "false" === o ? "opened" : "closed";
              else if (r) {
                  a.event_data.text = n.text || r.textContent;
                  var s = r.getAttribute("open");
                  a.event_data.action = null == s ? "opened" : "closed"
              }
              if (e.target.closest(".gem-c-tabs")) {
                  var c = e.target.closest("a");
                  if (c) {
                      var l = c.getAttribute("href");
                      l && (a.event_data.url = l)
                  }
              }
              window.GOVUK.analyticsGa4.core.sendData(a)
          }
      }, t.prototype.getClosestAttribute = function(e, t) {
          var n = e.getAttribute(t),
              i = e.querySelector("[" + t + "]");
          return n || "" === n ? n : i ? i.getAttribute(t) : void 0
      }, e.Ga4EventTracker = t
  }(window.GOVUK.Modules),
  function(e) {
      "use strict";
      var i = e.GOVUK || {};
      i.analyticsGa4 = i.analyticsGa4 || {}, i.analyticsGa4.Ga4EcommerceTracker = {
          init: function(e) {
              if (window.dataLayer) {
                  var t = !e;
                  if (this.searchResultsBlocks = document.querySelectorAll("[data-ga4-ecommerce]"), 0 === !this.searchResultsBlocks.length) return;
                  if (e) {
                      var n = window.GOVUK.analyticsGa4.analyticsModules.PageViewTracker;
                      n && n.init(e)
                  }
                  for (var i = 0; i < this.searchResultsBlocks.length; i++) this.trackResults(this.searchResultsBlocks[i]), t && this.searchResultsBlocks[i].addEventListener("click", this.handleClick.bind(this))
              }
          },
          trackResults: function(e) {
              var t = i.analyticsGa4.core.ecommerceHelperFunctions.populateEcommerceSchema({
                  element: e,
                  resultsId: "js-result-count"
              });
              i.analyticsGa4.core.ecommerceHelperFunctions.clearEcommerceObject(), i.analyticsGa4.core.sendData(t)
          },
          handleClick: function(e) {
              if (e.target.getAttribute("data-ga4-ecommerce-path")) {
                  var t = e.target.closest("[data-ga4-ecommerce]"),
                      n = i.analyticsGa4.core.ecommerceHelperFunctions.populateEcommerceSchema({
                          element: t,
                          resultsId: "js-result-count",
                          event: e
                      });
                  i.analyticsGa4.core.ecommerceHelperFunctions.clearEcommerceObject(), i.analyticsGa4.core.sendData(n)
              }
          }
      }, e.GOVUK = i
  }(window), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(e) {
      "use strict";

      function t(e) {
          this.module = e, this.trackingTrigger = "data-ga4-form", this.includeTextInputValues = this.module.hasAttribute("data-ga4-form-include-text"), this.redacted = !1
      }
      t.prototype.init = function() {
          var e = window.GOVUK.getConsentCookie();
          e && e.settings ? this.startModule() : (this.startModule = this.startModule.bind(this), window.addEventListener("cookie-consent", this.startModule))
      }, t.prototype.startModule = function() {
          window.dataLayer && this.module.addEventListener("submit", this.trackFormSubmit.bind(this))
      }, t.prototype.trackFormSubmit = function(e) {
          var t = window.GOVUK.analyticsGa4.core.trackFunctions.findTrackingAttributes(e.target, this.trackingTrigger);
          if (t) {
              try {
                  var n = t.getAttribute(this.trackingTrigger);
                  n = JSON.parse(n)
              } catch (r) {
                  return void console.warn("GA4 configuration error: " + r.message, window.location)
              }
              var i = this.getFormInputs(),
                  a = this.getInputValues(i);
              n.text = this.combineGivenAnswers(a) || "No answer given";
              var o = (new window.GOVUK.analyticsGa4.Schemas).mergeProperties(n, "event_data");
              window.GOVUK.analyticsGa4.core.sendData(o)
          }
      }, t.prototype.getFormInputs = function() {
          for (var e = [], t = this.module.querySelectorAll("label"), n = 0; n < t.length; n++) {
              var i = t[n],
                  a = i.getAttribute("for"),
                  o = !1;
              o = a ? this.module.querySelector("[id=" + a + "]") : i.querySelector("input"), e.push({
                  input: o,
                  label: i
              })
          }
          return e
      }, t.prototype.getInputValues = function(e) {
          for (var t = e.length - 1; 0 <= t; t--) {
              var n = e[t],
                  i = n.input,
                  a = n.label.innerText || n.label.textContent,
                  o = i.getAttribute("type"),
                  r = i.nodeName;
              if ("checkbox" === o && i.checked) n.answer = a;
              else if ("SELECT" === r && i.options[i.selectedIndex].value) n.answer = i.options[i.selectedIndex].text;
              else if ("text" !== o && "search" !== o || !i.value) "radio" === o && i.checked ? n.answer = a : e.splice(t, 1);
              else if (this.includeTextInputValues) {
                  var s = new window.GOVUK.analyticsGa4.PIIRemover;
                  n.answer = s.stripPIIWithOverride(i.value, !0, !0)
              } else this.redacted = !0
          }
          return e
      }, t.prototype.combineGivenAnswers = function(e) {
          for (var t = [], n = 0; n < e.length; n++) {
              var i = e[n].answer;
              i && t.push(i)
          }
          return this.redacted && t.push("[REDACTED]"), t = t.join(",")
      }, e.Ga4FormTracker = t
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
  function(e) {
      "use strict";

      function t(e) {
          this.module = e, this.trackingTrigger = "data-ga4-auto"
      }
      t.prototype.init = function() {
          var e = window.GOVUK.getConsentCookie();
          e && e.settings ? this.startModule() : (this.startModule = this.startModule.bind(this), window.addEventListener("cookie-consent", this.startModule))
      }, t.prototype.startModule = function() {
          this.sendEvent()
      }, t.prototype.sendEvent = function() {
          if (window.dataLayer) {
              try {
                  var e = this.module.getAttribute(this.trackingTrigger);
                  e = JSON.parse(e) || {}
              } catch (n) {
                  return void console.error("GA4 configuration error: " + n.message, window.location)
              }
              e.index && (e.index = window.GOVUK.analyticsGa4.core.trackFunctions.createIndexObject(e.index));
              var t = (new window.GOVUK.analyticsGa4.Schemas).mergeProperties(e, "event_data");
              window.GOVUK.analyticsGa4.core.sendData(t)
          }
      }, e.Ga4AutoTracker = t
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {},
  function(e) {
      "use strict";

      function t(e) {
          this.module = e
      }
      t.prototype.init = function() {
          var e = window.GOVUK.getConsentCookie();
          e && e.settings ? this.startModule() : (this.startModule = this.startModule.bind(this), window.addEventListener("cookie-consent", this.startModule))
      }, t.prototype.startModule = function() {
          window.dataLayer && this.module.querySelector("[data-ga4-ecommerce-path]") && (this.trackResults(), this.module.addEventListener("click", this.handleClick.bind(this)))
      }, t.prototype.trackResults = function() {
          var e = window.GOVUK.analyticsGa4.core.ecommerceHelperFunctions.populateEcommerceSchema({
              element: this.module,
              resultsId: "ga4-ecommerce-result-count"
          });
          window.GOVUK.analyticsGa4.core.ecommerceHelperFunctions.clearEcommerceObject(), window.GOVUK.analyticsGa4.core.sendData(e)
      }, t.prototype.handleClick = function(e) {
          if (e.target.getAttribute("data-ga4-ecommerce-path")) {
              var t = window.GOVUK.analyticsGa4.core.ecommerceHelperFunctions.populateEcommerceSchema({
                  element: this.module,
                  resultsId: "ga4-ecommerce-result-count",
                  event: e
              });
              window.GOVUK.analyticsGa4.core.ecommerceHelperFunctions.clearEcommerceObject(), window.GOVUK.analyticsGa4.core.sendData(t)
          }
      }, e.Ga4SmartAnswerResultsTracker = t
  }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {};
var initFunction = function() {
  var e = window.GOVUK.getConsentCookie();
  if (e && e.usage) {
      window.GOVUK.analyticsGa4.vars.internalDomains = [], window.GOVUK.analyticsGa4.vars.internalDomains.push(window.GOVUK.analyticsGa4.core.trackFunctions.getHostname()), window.GOVUK.analyticsGa4.core.trackFunctions.appendDomainsWithoutWWW(window.GOVUK.analyticsGa4.vars.internalDomains);
      var t = [{
          key: "data-module",
          value: "ga4-link-tracker"
      }, {
          key: "data-ga4-track-links-only",
          value: ""
      }, {
          key: "data-ga4-link",
          value: JSON.stringify({
              event_name: "navigation",
              type: "html attachment"
          })
      }];
      window.GOVUK.analyticsGa4.core.trackFunctions.addAttributesToElements("[data-ga4-attachment-link]", t), window.GOVUK.analyticsGa4.core.load();
      var n = window.GOVUK.analyticsGa4.analyticsModules;
      for (var i in n) {
          var a = n[i];
          if ("function" == typeof a.init) try {
              a.init()
          } catch (o) {
              console.warn("Error starting analytics module " + i + ": " + o.message, window.location)
          }
      }
  } else window.addEventListener("cookie-consent", window.GOVUK.analyticsGa4.init)
};
window.GOVUK.analyticsGa4.init = initFunction, window.GOVUK.analytics = window.GOVUK.analytics || {}, window.GOVUK.analytics.linkedDomains = ["access.service.gov.uk", "access.tax.service.gov.uk", "account.companieshouse.gov.uk", "accounts.manage-apprenticeships.service.gov.uk", "account.publishing.service.gov.uk", "add-driving-licence-check-code.service.gov.uk", "analyse-school-performance.service.gov.uk", "appeal-tax-tribunal.service.gov.uk", "apply-basic-criminal-record-check.service.gov.uk", "apply-blue-badge.service.gov.uk", "apply-company-tachograph-card.service.gov.uk", "apply-for-bankruptcy.service.gov.uk", "apply-for-debt-relief-order.service.gov.uk", "apply-for-environmental-permit.service.gov.uk", "apply-for-eu-settled-status.homeoffice.gov.uk", "apply-for-innovation-funding.service.gov.uk", "apply-for-refugee-integration-loan.service.gov.uk", "apply-licence.ozone-depleting-substances.service.gov.uk", "apply-quota.fluorinated-gas.service.gov.uk", "apply-quota.ozone-depleting-substances.service.gov.uk", "apprenticeships.gov.uk", "beta.companieshouse.gov.uk", "biometric-residence-permit.service.gov.uk", "businessreadinessfund.beis.gov.uk", "catchreturn.service.gov.uk", "checklegalaid.service.gov.uk", "check-mot.service.gov.uk", "check-payment-practices.service.gov.uk", "check-vehicle-recalls.service.gov.uk", "civil-service-careers.gov.uk", "civilservicejobs.service.gov.uk", "claim.redundancy-payments.service.gov.uk", "claim-power-of-attorney-refund.service.gov.uk", "compare-school-performance.service.gov.uk", "complete-deputy-report.service.gov.uk", "contractsfinder.service.gov.uk", "coronavirus.data.gov.uk", "coronavirus-business-volunteers.service.gov.uk", "coronavirus-shielding-support.service.gov.uk", "coronavirus-vulnerable-people.service.gov.uk", "courttribunalfinder.service.gov.uk", "create-energy-label.service.gov.uk", "create-qr-code-poster.service.gov.uk", "cymraeg.registertovote.service.gov.uk", "dartford-crossing-charge.service.gov.uk", "design-system.service.gov.uk", "devtracker.dfid.gov.uk", "digitalmarketplace.service.gov.uk", "eforms.homeoffice.gov.uk", "electronic-visa-waiver.service.gov.uk", "employmenttribunals.service.gov.uk", "eu-settled-status-enquiries.service.gov.uk", "faster-uk-entry.service.gov.uk", "finance.manage-apprenticeships.service.gov.uk", "find-and-update.company-information.service.gov.uk", "findapprenticeship.service.gov.uk", "find-coronavirus-support.service.gov.uk", "find-employer-schemes.education.gov.uk", "flood-map-for-planning.service.gov.uk", "flood-warning-information.service.gov.uk", "follow.company-information.service.gov.uk", "gender-pay-gap.service.gov.uk", "get-fishing-licence.service.gov.uk", "get-information-schools.service.gov.uk", "gro.gov.uk", "helpforhouseholds.campaign.gov.uk", "helpwithcourtfees.service.gov.uk", "help-with-prison-visits.service.gov.uk", "identity.company-information.service.gov.uk", "identity-sandbox.company-information.service.gov.uk", "import-products-animals-food-feed.service.gov.uk", "lastingpowerofattorney.service.gov.uk", "live.email-dvla.service.gov.uk", "live.dvla-web-chat.service.gov.uk", "loststolenpassport.service.gov.uk", "makeaplea.service.gov.uk", "managefleetvehicles.service.gov.uk", "manage-apprenticeships.service.gov.uk", "manage-fish-exports.service.gov.uk", "manage-quota.fluorinated-gas.service.gov.uk", "manage-water-abstraction-impoundment-licence.service.gov.uk",
  "match.redundancy-payments.service.gov.uk", "mot-testing.service.gov.uk", "nominate-uk-honour.service.gov.uk", "notice.redundancy-payments.service.gov.uk", "passport.service.gov.uk", "paydvlafine.service.gov.uk", "payments.service.gov.uk", "publish-payment-practices.service.gov.uk", "queens-awards-enterprise.service.gov.uk", "recruit.manage-apprenticeships.service.gov.uk", "register.fluorinated-gas.service.gov.uk", "register-trailer.service.gov.uk", "register.ozone-depleting-substances.service.gov.uk", "registertovote.service.gov.uk", "register-vehicle.service.gov.uk", "registers.service.gov.uk", "reminders.mot-testing.service.gov.uk", "renewable-heat-calculator.service.gov.uk", "reply-jury-summons.service.gov.uk", "report-director-conduct.service.gov.uk", "report.fluorinated-gas.service.gov.uk", "report.ozone-depleting-substances.service.gov.uk", "right-to-rent.homeoffice.gov.uk", "right-to-work.service.gov.uk", "ruralpayments.service.gov.uk", "schools-financial-benchmarking.service.gov.uk", "secured.studentfinanceni.co.uk", "secured.studentfinancewales.co.uk", "selfservice.payments.service.gov.uk", "send-money-to-prisoner.service.gov.uk", "signin.service.gov.uk", "sorn.service.gov.uk", "staff.helpwithcourtfees.service.gov.uk", "student-finance.service.gov.uk", "tax.service.gov.uk", "teacherservices.education.gov.uk", "teaching-vacancies.service.gov.uk", "to-visit-or-stay-in-the-uk.homeoffice.gov.uk", "trade-tariff.service.gov.uk", "tribunal-response.employmenttribunals.service.gov.uk", "ukri.org", "update-student-loan-employment-details.service.gov.uk", "vehicle-operator-licensing.service.gov.uk", "vehicleenquiry.service.gov.uk", "viewdrivingrecord.service.gov.uk", "view-and-prove-your-rights.homeoffice.gov.uk", "view-immigration-status.service.gov.uk", "visa-address-update.service.gov.uk", "visas-immigration.service.gov.uk", "your-defra-account.defra.gov.uk"
], window.GOVUK.loadAnalytics = {
  productionDomains: ["www.gov.uk", "www-origin.publishing.service.gov.uk", "assets.publishing.service.gov.uk"],
  stagingDomains: ["www.staging.publishing.service.gov.uk", "www-origin.staging.publishing.service.gov.uk", "assets.staging.publishing.service.gov.uk"],
  integrationDomains: ["www.integration.publishing.service.gov.uk", "www-origin.integration.publishing.service.gov.uk", "assets.integration.publishing.service.gov.uk"],
  developmentDomains: ["localhost", "127.0.0.1", "0.0.0.0"],
  linkedDomains: window.GOVUK.analytics.linkedDomains,
  ga4EnvironmentVariables: {
      production: {
          initialiseGA4: !0
      },
      staging: {
          initialiseGA4: !0,
          auth: "oJWs562CxSIjZKn_GlB5Bw",
          preview: "env-5"
      },
      integration: {
          initialiseGA4: !0,
          auth: "C7iYdcsOlYgGmiUJjZKrHQ",
          preview: "env-4"
      },
      development: {
          initialiseGA4: !0,
          auth: "bRiZ-jiEHtw6hHpGd6dF9w",
          preview: "env-3"
      }
  },
  loadUa: function(e) {
      e = e || window.location.hostname, window.GOVUK.analyticsVars = window.GOVUK.analyticsVars || {}, window.GOVUK.analyticsVars.primaryLinkedDomains = ["account.gov.uk"], window.GOVUK.analyticsVars.linkedDomains = this.linkedDomains, window.GOVUK.analyticsVars.gaProperty = "UA-UNSET", window.GOVUK.analyticsVars.gaPropertyCrossDomain = "UA-UNSET", this.arrayContains(e, this.productionDomains) ? (window.GOVUK.analyticsVars.gaProperty = "UA-26179049-1", window.GOVUK.analyticsVars.gaPropertyCrossDomain = "UA-145652997-1") : this.arrayContains(e, this.stagingDomains) ? (window.GOVUK.analyticsVars.gaProperty = "UA-26179049-20", window.GOVUK.analyticsVars.gaPropertyCrossDomain = "UA-145652997-1") : this.arrayContains(e, this.integrationDomains) && (window.GOVUK.analyticsVars.gaProperty = "UA-26179049-22", window.GOVUK.analyticsVars.gaPropertyCrossDomain = "UA-145652997-1"), "undefined" != typeof window.GOVUK.analyticsInit && window.GOVUK.analyticsInit()
  },
  loadGa4: function(e) {
      e = e || window.location.hostname;
      var t = "";
      if (this.arrayContains(e, this.productionDomains) ? t = "production" : this.arrayContains(e, this.stagingDomains) ? t = "staging" : this.arrayContains(e, this.integrationDomains) ? t = "integration" : (this.arrayContains(e, this.developmentDomains) || -1 !== e.indexOf(".dev.gov.uk")) && (t = "development"), t && "undefined" != typeof window.GOVUK.analyticsGa4.init && this.ga4EnvironmentVariables[t].initialiseGA4) {
          window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}, window.GOVUK.analyticsGa4.vars = window.GOVUK.analyticsGa4.vars || {}, window.GOVUK.analyticsGa4.vars.id = "GTM-MG7HG5W", window.GOVUK.analyticsGa4.vars.auth = this.ga4EnvironmentVariables[t].auth, window.GOVUK.analyticsGa4.vars.preview = this.ga4EnvironmentVariables[t].preview, window.GOVUK.analyticsGa4.vars.environment = t, window.GOVUK.analyticsGa4.vars.gem_version = "not found";
          var n = document.querySelector('meta[name="govuk:components_gem_version"]');
          n && (window.GOVUK.analyticsGa4.vars.gem_version = n.getAttribute("content")), window.GOVUK.analyticsGa4.init()
      }
  },
  arrayContains: function(e, t) {
      return -1 !== t.indexOf(e)
  }
};