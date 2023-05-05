! function() {
  "use strict";

  function qe(e, n, t) {
      for (var r = e.slice(0, n.maxBeaconUTEntries), o = e.slice(n.maxBeaconUTEntries);
          (t + "&UT=" + r.join(",")).length > n.maxBeaconUrlLength && 1 < r.length;) o.unshift(r.pop());
      return [r, o]
  }

  function ze(e) {
      var n = t(e, "auto", !0);
      return {
          auto: n,
          beaconUrl: t(e, "beaconUrl", "https://lux.speedcurve.com/lux/"),
          customerid: t(e, "customerid", undefined),
          debug: t(e, "debug", !1),
          errorBeaconUrl: t(e, "errorBeaconUrl", "https://lux.speedcurve.com/error/"),
          jspagelabel: t(e, "jspagelabel", undefined),
          label: t(e, "label", undefined),
          maxBeaconUrlLength: t(e, "maxBeaconUrlLength", 8190),
          maxBeaconUTEntries: t(e, "maxBeaconUTEntries", 20),
          maxErrors: t(e, "maxErrors", 5),
          maxMeasureTime: t(e, "maxMeasureTime", 6e4),
          measureUntil: t(e, "measureUntil", "onload"),
          minMeasureTime: t(e, "minMeasureTime", 0),
          samplerate: t(e, "samplerate", 100),
          sendBeaconOnPageHidden: t(e, "sendBeaconOnPageHidden", n),
          trackErrors: t(e, "trackErrors", !0),
          pagegroups: t(e, "pagegroups", undefined)
      }
  }

  function t(e, n, t) {
      return "undefined" != typeof e[n] ? e[n] : t
  }

  function Ge(e, n) {
      var t = typeof n;
      c[e] !== n && (f[e] = n), "string" !== t && "number" !== t && "boolean" !== t || (c[e] = n), "undefined" !== t && null !== n || delete c[e]
  }

  function $e() {
      return c
  }

  function Je() {
      return f
  }

  function Ke() {
      f = {}
  }

  function Qe(e) {
      var n = [];
      for (var t in e) {
          var r = "" + e[t];
          t = t.replace(/,/g, "").replace(/\|/g, ""), r = r.replace(/,/g, "").replace(/\|/g, ""), n.push(t + "|" + r)
      }
      return encodeURIComponent(n.join(","))
  }

  function Ze(e, n) {
      return e | n
  }

  function a(e) {
      return !(!e.parentNode || !e.parentNode.tagName)
  }

  function en(e) {
      var n = i(e);
      if (n) return n;
      if (e.id) return e.id;
      var t = "INPUT" === e.tagName && "submit" === e.type,
          r = "BUTTON" === e.tagName,
          o = "A" === e.tagName;
      return t && e.value ? e.value : (r || o) && e.innerText ? e.innerText : a(e) ? en(e.parentNode) : ""
  }

  function i(e) {
      var n;
      if (e.hasAttribute("data-sctrack")) {
          var t = null === (n = e.getAttribute("data-sctrack")) || void 0 === n ? void 0 : n.trim();
          if (t) return t
      }
      return a(e) ? i(e.parentNode) : null
  }

  function r() {
      return Date.now ? Date.now() : +new Date
  }

  function nn(e) {
      if (!e.hadRecentInput) {
          var n = l[0],
              t = l[l.length - 1];
          l.length && (1e3 <= e.startTime - t.startTime || 5e3 <= e.startTime - n.startTime) && tn(), s += e.value, l.push(e)
      }
  }

  function tn() {
      s = 0, l = []
  }

  function rn() {
      return s
  }

  function on() {
      return Ln.now ? Ln.now() : r() - bn.navigationStart
  }

  function an() {
      return Ln.navigation && "undefined" != typeof Ln.navigation.type ? Ln.navigation.type : ""
  }

  function un() {
      var e = dn("navigation");
      if (e.length) return e[0];
      var n = an(),
          t = {
              activationStart: 0,
              startTime: 0,
              type: 2 == n ? "back_forward" : 1 === n ? "reload" : "navigate"
          };
      if (__ENABLE_POLYFILLS)
          for (var r in bn) "number" == typeof bn[r] && "navigationStart" !== r && (t[r] = Math.max(0, bn[r] - bn.navigationStart));
      return t
  }

  function dn(e) {
      if ("function" == typeof Ln.getEntriesByType) {
          var n = Ln.getEntriesByType(e);
          if (n && n.length) return n
      }
      return []
  }

  function cn() {
      p = 0, v = [], g = {}
  }

  function fn(e) {
      if (e.interactionId || "first-input" === e.entryType && !u(e)) {
          var n = e.duration,
              t = e.startTime,
              r = e.interactionId,
              o = g[r];
          o ? o.duration = Math.max(n, o.duration) : (p++, g[r] = {
              duration: n,
              interactionId: r,
              startTime: t
          }, v.push(g[r])), v.sort(function(e, n) {
              return n.duration - e.duration
          }), v.splice(m).forEach(function(e) {
              delete g[e.interactionId]
          })
      }
  }

  function u(n) {
      return v.some(function(e) {
          return n.startTime === e.startTime && n.duration === e.duration
      })
  }

  function sn() {
      var e, n = Math.min(v.length - 1, Math.floor(o() / 50));
      return null === (e = v[n]) || void 0 === e ? void 0 : e.duration
  }

  function o() {
      return "interactionCount" in Ln ? Ln.interactionCount : p
  }

  function ln(e, n, t) {
      if ("function" == typeof PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes(e)) {
          var r = new PerformanceObserver(function(e) {
              e.getEntries().forEach(function(e) {
                  return n(e)
              })
          });
          return r.observe(h({
              type: e,
              buffered: !0
          }, t)), r
      }
      return undefined
  }

  function mn(n) {
      return Nn.filter(function(e) {
          return e.entryType === n
      })
  }

  function vn(e) {
      Nn.push(e)
  }

  function gn() {
      Nn.splice(0)
  }

  function pn(e, n, t) {
      var r = d(e);
      return "/" === e.charAt(0) ? r.test(t) : r.test(n + t)
  }

  function d(e) {
      return new RegExp("^" + n(e).replaceAll("*", ".*") + "$", "i")
  }

  function n(e) {
      return e.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&")
  }
  var e, hn = "LUX_start",
      En = "LUX_end",
      c = {},
      f = {},
      Tn = {
          InitCalled: 1,
          NavTimingNotSupported: 2,
          UserTimingNotSupported: 4,
          VisibilityStateNotVisible: 8,
          BeaconSentFromUnloadHandler: 16,
          BeaconSentAfterTimeout: 32,
          PageLabelFromDocumentTitle: 64,
          PageLabelFromLabelProp: 128,
          PageLabelFromGlobalVariable: 256,
          PageLabelFromPagegroup: 512
      },
      yn = {
          EvaluationStart: 1,
          EvaluationEnd: 2,
          InitCalled: 3,
          MarkCalled: 4,
          MeasureCalled: 5,
          AddDataCalled: 6,
          SendCalled: 7,
          ForceSampleCalled: 8,
          DataCollectionStart: 9,
          UnloadHandlerTriggered: 10,
          OnloadHandlerTriggered: 11,
          MarkLoadTimeCalled: 12,
          SessionIsSampled: 21,
          SessionIsNotSampled: 22,
          MainBeaconSent: 23,
          UserTimingBeaconSent: 24,
          InteractionBeaconSent: 25,
          CustomDataBeaconSent: 26,
          NavigationStart: 41,
          PerformanceEntryReceived: 42,
          PerformanceEntryProcessed: 43,
          PerformanceObserverError: 51,
          InputEventPermissionError: 52,
          InnerHtmlAccessError: 53,
          EventTargetAccessError: 54,
          CookieReadError: 55,
          CookieSetError: 56,
          PageLabelEvaluationError: 57,
          NavTimingNotSupported: 71,
          PaintTimingNotSupported: 72
      },
      Sn = function() {
          function e() {
              this.events = []
          }
          return e.prototype.logEvent = function(e, n) {
              void 0 === n && (n = []), this.events.push([r(), e, n])
          }, e.prototype.getEvents = function() {
              return this.events
          }, e
      }(),
      s = 0,
      l = [],
      wn = r(),
      Ln = window.performance || {},
      bn = Ln.timing || {
          navigationStart: (null === (e = window.LUX) || void 0 === e ? void 0 : e.ns) || wn
      },
      m = 10,
      v = [],
      g = {},
      p = 0,
      h = function() {
          return (h = Object.assign || function a(e) {
              for (var n, t = 1, r = arguments.length; t < r; t++)
                  for (var o in n = arguments[t]) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
              return e
          }).apply(this, arguments)
      },
      Nn = [],
      Pn = window.LUX || {},
      Mn = wn;
  Pn = function() {
      function e(e) {
          Se.trackErrors && (we++, e && "undefined" != typeof e.filename && "undefined" != typeof e.message && (-1 < e.filename.indexOf("/lux.js?") || -1 < e.message.indexOf("LUX") || we <= Se.maxErrors && N()) && ((new Image).src = Se.errorBeaconUrl + "?v=" + Te + "&id=" + _() + "&fn=" + encodeURIComponent(e.filename) + "&ln=" + e.lineno + "&cn=" + e.colno + "&msg=" + encodeURIComponent(e.message) + "&l=" + encodeURIComponent(ve()) + (X() ? "&ct=" + X() : "") + "&HN=" + encodeURIComponent(document.location.hostname) + "&PN=" + encodeURIComponent(document.location.pathname)))
      }

      function i(e) {
          Ae || (Ae = Math.round(e), Re.forEach(function(e) {
              removeEventListener(e, n, Xe)
          }))
      }

      function u(e) {
          function n() {
              i(e), r()
          }

          function t() {
              r()
          }

          function r() {
              window.removeEventListener("pointerup", n, Xe), window.removeEventListener("pointercancel", t, Xe)
          }
          window.addEventListener("pointerup", n, Xe), window.addEventListener("pointercancel", t, Xe)
      }

      function n(e) {
          var n = !1;
          try {
              n = e.cancelable
          } catch (a) {
              return void ye.logEvent(yn.InputEventPermissionError)
          }
          if (n) {
              var t = v(!0),
                  r = e.timeStamp;
              if (152e7 < r && (t = Number(new Date)), t < r) return;
              var o = t - r;
              "pointerdown" === e.type ? u(o) : i(o)
          }
      }

      function v(e) {
          var n = on(),
              t = E(hn);
          return t && !e ? n - t.startTime : n
      }

      function t() {
          for (var e, n, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
          if (ye.logEvent(yn.MarkCalled, t), Ln.mark) return Ln.mark.apply(Ln, t);
          if (__ENABLE_POLYFILLS) {
              var o = {
                  entryType: "mark",
                  duration: 0,
                  name: t[0],
                  detail: (null === (e = t[1]) || void 0 === e ? void 0 : e.detail) || null,
                  startTime: (null === (n = t[1]) || void 0 === n ? void 0 : n.startTime) || v()
              };
              return Ue.push(o), Me = Ze(Me, Tn.UserTimingNotSupported), o
          }
      }

      function r() {
          for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
          ye.logEvent(yn.MeasureCalled, e);
          var t, r = e[0],
              o = e[1],
              a = e[2];
          if ("object" == typeof o && (o = (t = e[1]).start, a = t.end), void 0 === o && (o = E(hn) ? hn : "navigationStart", t ? t.end && t.duration || (e[1].start = o) : e[1] = o), Ln.measure) return Ln.measure.apply(Ln, e);
          if (__ENABLE_POLYFILLS) {
              var i = "number" == typeof o ? o : 0,
                  u = "number" == typeof a ? a : v(),
                  d = function(e) {
                      throw new DOMException("Failed to execute 'measure' on 'Performance': The mark '" + e + "' does not exist")
                  };
              if ("string" == typeof o) {
                  var c = E(o);
                  c ? i = c.startTime : bn[o] ? i = bn[o] - bn.navigationStart : d(o)
              }
              if ("string" == typeof a) {
                  var f = E(a);
                  f ? u = f.startTime : bn[a] ? u = bn[a] - bn.navigationStart : d(a)
              }
              var s = Math.round(u) - Math.round(i),
                  l = null;
              t && (t.duration && (s = t.duration), l = t.detail);
              var m = {
                  entryType: "measure",
                  name: r,
                  detail: l,
                  startTime: i,
                  duration: s
              };
              return Be.push(m), Me = Ze(Me, Tn.UserTimingNotSupported), m
          }
      }

      function E(e) {
          return o(e, c())
      }

      function o(e, n) {
          if (n)
              for (var t = n.length - 1; 0 <= t; t--) {
                  var r = n[t];
                  if (e === r.name) return r
              }
          return undefined
      }

      function c() {
          var e = dn("mark");
          return e.length ? e : Ue
      }

      function f() {
          var e = dn("measure");
          return e.length ? e : Be
      }

      function T() {
          var o = {},
              a = E(hn),
              i = a ? a.startTime : 0;
          c().forEach(function(e) {
              var n = e.name;
              if (n !== hn && n !== En) {
                  var t = Math.round(e.startTime - i);
                  t < 0 || ("undefined" == typeof o[n] ? o[n] = {
                      startTime: t
                  } : o[n].startTime = Math.max(t, o[n].startTime))
              }
          }), f().forEach(function(e) {
              if (!(a && e.startTime < a.startTime)) {
                  var n = e.name,
                      t = Math.round(e.startTime - i),
                      r = Math.round(e.duration);
                  ("undefined" == typeof o[n] || t > o[n].startTime) && (o[n] = {
                      startTime: t,
                      duration: r
                  })
              }
          });
          var e = [];
          for (var n in o) {
              var t = o[n],
                  r = t.startTime,
                  u = t.duration,
                  d = [n, r];
              void 0 !== u && d.push(u), e.push(d.join("|"))
          }
          return e
      }

      function y() {
          var n = [],
              e = E(hn),
              t = e ? e.startTime : 0;
          return mn("element").forEach(function(e) {
              e.identifier && e.startTime && (ye.logEvent(yn.PerformanceEntryProcessed, [e]), n.push(e.identifier + "|" + Math.round(e.startTime - t)))
          }), n.join(",")
      }

      function S() {
          if (!("PerformanceLongTaskTiming" in self)) return "";
          var e = "",
              r = {},
              o = {},
              n = mn("longtask");
          if (n.length) {
              var t = E(hn),
                  a = t ? t.startTime : 0,
                  i = bn.loadEventEnd - bn.navigationStart;
              if (t) {
                  var u = E(En);
                  u && (i = u.startTime)
              }
              n.forEach(function(e) {
                  var n = Math.round(e.duration);
                  if (e.startTime < a) n -= a - e.startTime;
                  else if (e.startTime >= i) return;
                  ye.logEvent(yn.PerformanceEntryProcessed, [e]);
                  var t = e.attribution[0].name;
                  r[t] || (r[t] = 0, o[t] = ""), r[t] += n, o[t] += "," + Math.round(e.startTime) + "|" + n
              })
          }
          var d = "undefined" != typeof r.script ? "script" : "unknown";
          "undefined" == typeof r[d] && (r[d] = 0, o[d] = "");
          var c = s(o[d]),
              f = ",n|" + c.count + ",d|" + c.median + ",x|" + c.max + (0 === c.fci ? "" : ",i|" + c.fci);
          return e += "s|" + r[d] + f + o[d]
      }

      function s(e) {
          for (var n = 0, t = p() || 0, r = 0 === t, o = [], a = e.split(","), i = 0; i < a.length; i++) {
              var u = a[i].split("|");
              if (2 === u.length) {
                  var d = parseInt(u[0]),
                      c = parseInt(u[1]);
                  o.push(c), n = n < c ? c : n, !r && t < d && (5e3 < d - t ? r = !0 : t = d + c)
              }
          }
          return {
              count: o.length,
              median: l(o),
              max: n,
              fci: t
          }
      }

      function w() {
          return "LayoutShift" in self ? rn().toFixed(6) : undefined
      }

      function l(e) {
          if (0 === e.length) return 0;
          var n = Math.floor(e.length / 2);
          return e.sort(function(e, n) {
              return e - n
          }), e.length % 2 ? e[n] : Math.round((e[n - 1] + e[n]) / 2)
      }

      function L() {
          var e = "";
          if (Ln.getEntriesByName) {
              var n = O("/js/lux.js");
              if (n) {
                  var t = Ln.getEntriesByName(n.src);
                  if (t && t.length) {
                      var r = t[0],
                          o = Math.round(r.domainLookupEnd - r.domainLookupStart),
                          a = Math.round(r.connectEnd - r.connectStart),
                          i = Math.round(r.responseStart - r.requestStart),
                          u = Math.round(r.responseEnd - r.responseStart),
                          d = o + a + i + u,
                          c = Mn - wn,
                          f = r.encodedBodySize ? r.encodedBodySize : 0;
                      e = "d" + o + "t" + a + "f" + i + "c" + u + "n" + d + "e" + c + "r" + Se.samplerate + ("number" == typeof f ? "x" + f : "") + ("number" == typeof De ? "l" + De : "") + "s" + (wn - bn.navigationStart)
                  }
              }
          }
          return e
      }

      function a() {
          Ie = {}
      }

      function b() {
          var e = [];
          for (var n in Ie) e.push(n + "|" + Ie[n]);
          return e.join(",")
      }

      function d(e, n) {
          ye.logEvent(yn.AddDataCalled, [e, n]), "string" == typeof e && Ge(e, n), Ce && (Ne && window.clearTimeout(Ne), Ne = window.setTimeout(ee, 100))
      }

      function N() {
          if (void 0 === je || "undefined" == typeof Se.samplerate) return !1;
          var e = ("" + je).substr(-2);
          return parseInt(e) < Se.samplerate
      }

      function m() {
          E(En) && (ye.logEvent(yn.InitCalled), a(), ce(), de(), _e = ke = Ce = xe = 0, Fe = fe(), je = se(Fe), gn(), tn(), cn(), we = 0, Ae = undefined, Me = Ze(Me = 0, Tn.InitCalled), t(hn), G())
      }

      function P() {
          var e = Y();
          if (!e) return g();
          for (var n = document.getElementsByTagName("script"), t = 0, r = 0, o = n.length; r < o; r++) {
              var a = n[r];
              !a.src || a.async || a.defer || 0 == (4 & a.compareDocumentPosition(e)) || t++
          }
          return t
      }

      function M() {
          for (var e = 0, n = document.getElementsByTagName("link"), t = 0, r = n.length; t < r; t++) {
              var o = n[t];
              o.href && "stylesheet" === o.rel && 0 !== o.href.indexOf("data:") && (o.onloadcssdefined || "print" === o.media || "style" === o.as || "function" == typeof o.onload && "all" === o.media || e++)
          }
          return e
      }

      function g() {
          for (var e = document.getElementsByTagName("script"), n = 0, t = 0, r = e.length; t < r; t++) {
              var o = e[t];
              !o.src || o.async || o.defer || n++
          }
          return n
      }

      function U() {
          for (var e = document.getElementsByTagName("script"), n = 0, t = 0, r = e.length; t < r; t++) {
              e[t].src && n++
          }
          return n
      }

      function B() {
          for (var e = document.getElementsByTagName("link"), n = 0, t = 0, r = e.length; t < r; t++) {
              var o = e[t];
              o.href && "stylesheet" == o.rel && n++
          }
          return n
      }

      function I(e) {
          for (var n = document.getElementsByTagName(e), t = 0, r = 0, o = n.length; r < o; r++) {
              var a = n[r];
              try {
                  t += a.innerHTML.length
              } catch (a) {
                  return ye.logEvent(yn.InnerHtmlAccessError), -1
              }
          }
          return t
      }

      function C() {
          var e = "",
              n = bn.navigationStart,
              t = E(hn),
              r = E(En);
          if (t && r) {
              var o = Math.round(t.startTime);
              e = (n += o) + "fs0ls" + (c = Math.round(r.startTime) - o) + "le" + c
          } else if (Ln.timing) {
              var a = bn,
                  i = x(),
                  u = p(),
                  d = h();
              e = n + (a.redirectStart ? "rs" + (a.redirectStart - n) : "") + (a.redirectEnd ? "re" + (a.redirectEnd - n) : "") + (a.fetchStart ? "fs" + (a.fetchStart - n) : "") + (a.domainLookupStart ? "ds" + (a.domainLookupStart - n) : "") + (a.domainLookupEnd ? "de" + (a.domainLookupEnd - n) : "") + (a.connectStart ? "cs" + (a.connectStart - n) : "") + (a.secureConnectionStart ? "sc" + (a.secureConnectionStart - n) : "") + (a.connectEnd ? "ce" + (a.connectEnd - n) : "") + (a.requestStart ? "qs" + (a.requestStart - n) : "") + (a.responseStart ? "bs" + (a.responseStart - n) : "") + (a.responseEnd ? "be" + (a.responseEnd - n) : "") + (a.domLoading ? "ol" + (a.domLoading - n) : "") + (a.domInteractive ? "oi" + (a.domInteractive - n) : "") + (a.domContentLoadedEventStart ? "os" + (a.domContentLoadedEventStart - n) : "") + (a.domContentLoadedEventEnd ? "oe" + (a.domContentLoadedEventEnd - n) : "") + (a.domComplete ? "oc" + (a.domComplete - n) : "") + (a.loadEventStart ? "ls" + (a.loadEventStart - n) : "") + (a.loadEventEnd ? "le" + (a.loadEventEnd - n) : "") + (void 0 !== i ? "sr" + i : "") + (void 0 !== u ? "fc" + u : "") + (void 0 !== d ? "lc" + d : "")
          } else if (r) {
              var c;
              e = n + "fs0ls" + (c = Math.round(r.startTime)) + "le" + c
          }
          return e
      }

      function p() {
          for (var e = dn("paint"), n = 0; n < e.length; n++) {
              var t = e[n];
              if ("first-contentful-paint" === t.name) return Math.round(t.startTime)
          }
          return undefined
      }

      function h() {
          var e = mn("largest-contentful-paint");
          if (e.length) {
              var n = e[e.length - 1];
              return ye.logEvent(yn.PerformanceEntryProcessed, [n]), Math.max(0, Math.round(n.startTime - un().activationStart))
          }
          return undefined
      }

      function x() {
          if (Ln.timing) {
              var e = dn("paint");
              if (e.length)
                  for (var n = 0; n < e.length; n++) {
                      var t = e[n];
                      if ("first-paint" === t.name) return Math.round(t.startTime)
                  } else if (bn.msFirstPaint && __ENABLE_POLYFILLS) return Math.round(bn.msFirstPaint - bn.navigationStart)
          }
          return ye.logEvent(yn.PaintTimingNotSupported), undefined
      }

      function k() {
          return "PerformanceEventTiming" in self ? sn() : undefined
      }

      function _() {
          if ("undefined" == typeof Pn.customerid) {
              var e = O("/js/lux.js");
              e && (Pn.customerid = F(e.src, "id"))
          }
          return Pn.customerid || ""
      }

      function O(e) {
          for (var n = document.getElementsByTagName("script"), t = 0, r = n.length; t < r; t++) {
              var o = n[t];
              if (o.src && -1 !== o.src.indexOf(e)) return o
          }
          return undefined
      }

      function F(e, n) {
          for (var t = e.split("?")[1].split("&"), r = 0, o = t.length; r < o; r++) {
              var a = t[r].split("=");
              if (n === a[0]) return a[1]
          }
          return undefined
      }

      function j() {
          for (var e = document.getElementsByTagName("*"), n = e.length, t = 0; n--;) t += A(e[n]);
          return Math.round(t / e.length)
      }

      function A(e) {
          var n = 0;
          if (e.parentNode)
              for (; e = e.parentNode;) n++;
          return n
      }

      function D(e) {
          var n = e.body,
              t = e.documentElement;
          return Math.max(n ? n.scrollHeight : 0, n ? n.offsetHeight : 0, t ? t.clientHeight : 0, t ? t.scrollHeight : 0, t ? t.offsetHeight : 0)
      }

      function H(e) {
          var n = e.body,
              t = e.documentElement;
          return Math.max(n ? n.scrollWidth : 0, n ? n.offsetWidth : 0, t ? t.clientWidth : 0, t ? t.scrollWidth : 0, t ? t.offsetWidth : 0)
      }

      function R() {
          return un().encodedBodySize || 0
      }

      function X() {
          var e = navigator.connection,
              n = "";
          return e && e.effectiveType && (n = "slow-2g" === (n = e.effectiveType) ? "Slow 2G" : "2g" === n || "3g" === n || "4g" === n || "5g" === n ? n.toUpperCase() : n.charAt(0).toUpperCase() + n.slice(1)), n
      }

      function W() {
          var e = document.getElementsByTagName("img"),
              n = [];
          if (e)
              for (var t = 0, r = e.length; t < r; t++) {
                  var o = e[t];
                  V(o) && n.push(o)
              }
          return n
      }

      function Y(e) {
          var n;
          if (e || (e = document.body), e) {
              var t = e.children;
              if (t)
                  for (var r = 0, o = t.length; r < o; r++) {
                      var a = t[r];
                      V(a) && (n = a)
                  }
          }
          return n ? Y(n) : e
      }

      function V(e) {
          var n = document.documentElement.clientHeight,
              t = document.documentElement.clientWidth,
              r = q(e);
          return 0 <= r[0] && 0 <= r[1] && r[0] < t && r[1] < n && 0 < e.offsetWidth && 0 < e.offsetHeight
      }

      function q(e) {
          for (var n = 0, t = 0; e;) n += e.offsetLeft, t += e.offsetTop, e = e.offsetParent;
          return [n, t]
      }

      function z(e) {
          ye.logEvent(yn.MarkLoadTimeCalled, [e]), e ? t(En, {
              startTime: e
          }) : t(En)
      }

      function G() {
          $(), Pe = window.setTimeout(function() {
              Me = Ze(Me, Tn.BeaconSentAfterTimeout), K()
          }, Se.maxMeasureTime - v())
      }

      function $() {
          Pe && window.clearTimeout(Pe)
      }

      function J(e) {
          var n = ["v=" + Te, "id=" + _(), "sid=" + Fe, "uid=" + je, "l=" + encodeURIComponent(ve()), "HN=" + encodeURIComponent(document.location.hostname), "PN=" + encodeURIComponent(document.location.pathname)];
          Me && n.push("fl=" + Me);
          var t = Qe(e);
          return t && (n.push("CD=" + t), Ke()), Se.beaconUrl + "?" + n.join("&")
      }

      function K() {
          var e;
          if ($(), _() && Fe && N() && !Ce) {
              ye.logEvent(yn.DataCollectionStart);
              var n = E(hn),
                  t = E(En);
              (!n || t && t.startTime < n.startTime) && z();
              var r = "",
                  o = k();
              ke || "" === (r = b()) && (o = undefined);
              var a = y(),
                  i = S(),
                  u = w(),
                  d = L();
              document.visibilityState && "visible" !== document.visibilityState && (Me = Ze(Me, Tn.VisibilityStateNotVisible));
              var c = J($e()),
                  f = I("script"),
                  s = I("style"),
                  l = (xe ? "" : "&NT=" + C()) + (_e ? "&LJS=" + d : "") + "&PS=ns" + U() + "bs" + P() + (-1 < f ? "is" + f : "") + "ss" + B() + "bc" + M() + (-1 < s ? "ic" + s : "") + "ia" + W().length + "it" + document.getElementsByTagName("img").length + "dd" + j() + "nd" + document.getElementsByTagName("*").length + "vh" + document.documentElement.clientHeight + "vw" + document.documentElement.clientWidth + "dh" + D(document) + "dw" + H(document) + (R() ? "ds" + R() : "") + (X() ? "ct" + X() + "_" : "") + "er" + we + "nt" + an() + (navigator.deviceMemory ? "dm" + Math.round(navigator.deviceMemory) : "") + (r ? "&IX=" + r : "") + (void 0 !== Ae ? "&FID=" + Ae : "") + (i ? "&CPU=" + i : "") + (a ? "&ET=" + a : "") + (void 0 !== u ? "&CLS=" + u : "") + (void 0 !== o ? "&INP=" + o : ""),
                  m = qe(T(), Se, c + l),
                  v = m[0],
                  g = m[1],
                  p = c + l + (0 < v.length ? "&UT=" + v.join(",") : "");
              for (ye.logEvent(yn.MainBeaconSent, [p]), ne(p), xe = Ce = 1, ke = r ? 1 : 0; g.length;) {
                  v = (e = qe(g, Se, c))[0], g = e[1];
                  var h = c + "&UT=" + v.join(",");
                  ye.logEvent(yn.UserTimingBeaconSent, [h]), ne(h)
              }
          }
      }

      function Q() {
          window.clearTimeout(He), He = window.setTimeout(Z, 100)
      }

      function Z() {
          if (_() && Fe && N() && !ke && Ce) {
              var e = b(),
                  n = k();
              if (e) {
                  var t = J(Je()) + "&IX=" + e + (void 0 !== Ae ? "&FID=" + Ae : "") + (void 0 !== n ? "&INP=" + n : "");
                  ye.logEvent(yn.InteractionBeaconSent, [t]), ne(t), ke = 1
              }
          }
      }

      function ee() {
          if (_() && Fe && N() && Ce && Qe(Je())) {
              var e = J(Je());
              ye.logEvent(yn.CustomDataBeaconSent, [e]), ne(e)
          }
      }

      function ne(e) {
          (new Image).src = e
      }

      function te() {
          "undefined" == typeof Ie.s && (Ie.s = Math.round(v()))
      }

      function re(e) {
          if (ce(), "undefined" == typeof Ie.k) {
              if (Ie.k = Math.round(v()), e && e.target instanceof Element) {
                  var n = en(e.target);
                  n && (Ie.ki = n)
              }
              Q()
          }
      }

      function oe(e) {
          if (ce(), "undefined" == typeof Ie.c) {
              Ie.c = Math.round(v());
              var n = void 0;
              try {
                  e && e.target instanceof Element && (n = e.target)
              } catch (e) {
                  ye.logEvent(yn.EventTargetAccessError)
              }
              if (n) {
                  e.clientX && (Ie.cx = e.clientX, Ie.cy = e.clientY);
                  var t = en(n);
                  t && (Ie.ci = t)
              }
              Q()
          }
      }

      function ae(e, n, t) {
          void 0 === t && (t = !1), window.addEventListener ? window.addEventListener(e, n, t) : window.attachEvent && __ENABLE_POLYFILLS && window.attachEvent("on" + e, n)
      }

      function ie(e, n, t) {
          void 0 === t && (t = !1), window.removeEventListener ? window.removeEventListener(e, n, t) : window.detachEvent && __ENABLE_POLYFILLS && window.detachEvent("on" + e, n)
      }

      function ue() {
          var e = function() {
              Me = Ze(Me, Tn.BeaconSentFromUnloadHandler), ye.logEvent(yn.UnloadHandlerTriggered), K(), Z()
          };
          "onpagehide" in self ? ae("pagehide", e, !0) : (ae("unload", e, !0), ae("beforeunload", e, !0)), ae("visibilitychange", function() {
              "hidden" === document.visibilityState && e()
          }, !0)
      }

      function de() {
          ae("scroll", te), ae("keydown", re), ae("mousedown", oe)
      }

      function ce() {
          ie("scroll", te), ie("keydown", re), ie("mousedown", oe)
      }

      function fe(e) {
          return void 0 === e && (e = !1), e ? Number(new Date) + "00000" : Number(new Date) + he(String(Math.round(1e5 * Math.random())), "00000")
      }

      function se(e) {
          var n = ge("lux_uid");
          if (!n || n.length < 11) n = e;
          else {
              var t = parseInt(n.substring(0, 10));
              86400 < Number(new Date) / 1e3 - t && (n = e)
          }
          return le(n), n
      }

      function le(e) {
          return pe("lux_uid", e, Oe), e
      }

      function me() {
          return je
      }

      function ve() {
          if (Pn.label) return Me = Ze(Me, Tn.PageLabelFromLabelProp), Pn.label;
          if ("undefined" != typeof Pn.pagegroups) {
              var t = Pn.pagegroups,
                  r = "",
                  e = function(n) {
                      var e = t[n];
                      if (Array.isArray(e) && e.every(function(e) {
                              return !pn(e, document.location.hostname, document.location.pathname) || (r = n, !1)
                          }), r) return Me = Ze(Me, Tn.PageLabelFromPagegroup), {
                          value: r
                      }
                  };
              for (var n in t) {
                  var o = e(n);
                  if ("object" == typeof o) return o.value
              }
          }
          if ("undefined" != typeof Pn.jspagelabel) {
              var a = Function('"use strict"; return ' + Pn.jspagelabel);
              try {
                  var i = a();
                  if (i) return Me = Ze(Me, Tn.PageLabelFromGlobalVariable), i
              } catch (u) {
                  ye.logEvent(yn.PageLabelEvaluationError, [Pn.jspagelabel, u])
              }
          }
          return Me = Ze(Me, Tn.PageLabelFromDocumentTitle), document.title
      }

      function ge(e) {
          try {
              for (var n = document.cookie.split(";"), t = 0; t < n.length; t++) {
                  var r = n[t].split("=");
                  if (e === r[0].trim()) return unescape(r[1])
              }
          } catch (o) {
              ye.logEvent(yn.CookieReadError)
          }
          return undefined
      }

      function pe(e, n, t) {
          try {
              document.cookie = e + "=" + escape(n) + (t ? "; max-age=" + t : "") + "; path=/; SameSite=Lax"
          } catch (r) {
              ye.logEvent(yn.CookieSetError)
          }
      }

      function he(e, n) {
          return (n + e).slice(-n.length)
      }

      function Ee(e) {
          var n = e[0],
              t = e.slice(1);
          "function" == typeof Ye[n] && Ye[n].apply(Ye, t)
      }
      Pn.samplerate = 1;
      var Te = "307",
          ye = new Sn,
          Se = ze(Pn);
      ye.logEvent(yn.EvaluationStart, [Te]);
      var we = 0;
      window.addEventListener("error", e);
      var Le = function(e) {
              ye.logEvent(yn.PerformanceEntryReceived, [e])
          },
          be = function(e) {
              vn(e), Le(e)
          };
      ("object" == typeof window.LUX_al ? window.LUX_al : []).forEach(be);
      try {
          ln("longtask", function(e) {
              -1 === Nn.indexOf(e) && be(e)
          }), ln("largest-contentful-paint", be), ln("element", be), ln("paint", be), ln("layout-shift", function(e) {
              nn(e), Le(e)
          }), ln("first-input", function(e) {
              var n = e.processingStart - e.startTime;
              (!Ae || Ae < n) && (Ae = n), fn(e)
          }), ln("event", fn)
      } catch (Ve) {
          ye.logEvent(yn.PerformanceObserverError, [Ve])
      }
      var Ne, Pe, Me = 0,
          Ue = [],
          Be = [],
          Ie = {},
          Ce = 0,
          xe = 0,
          ke = 0,
          _e = 1,
          Oe = 1800,
          Fe = fe(),
          je = se(Fe);
      N() ? ye.logEvent(yn.SessionIsSampled, [Se.samplerate]) : ye.logEvent(yn.SessionIsNotSampled, [Se.samplerate]);
      var Ae, De = Pn.ns ? Pn.ns - bn.navigationStart : 0;
      Ln.timing || (ye.logEvent(yn.NavTimingNotSupported), Me = Ze(Me, Tn.NavTimingNotSupported)), ye.logEvent(yn.NavigationStart, [bn.navigationStart]);
      var He, Re = ["click", "mousedown", "keydown", "touchstart", "pointerdown"],
          Xe = {
              passive: !0,
              capture: !0
          };
      if (Re.forEach(function(e) {
              window.addEventListener(e, n, Xe)
          }), Se.auto) {
          var We = function() {
              var e = v(),
                  n = Se.minMeasureTime - e;
              n <= 0 ? (ye.logEvent(yn.OnloadHandlerTriggered, [e, Se.minMeasureTime]), "complete" === document.readyState ? K() : ae("load", function() {
                  setTimeout(K, 200)
              })) : setTimeout(We, n)
          };
          We()
      }
      Se.sendBeaconOnPageHidden && ue(), de(), G();
      var Ye = Se;
      return Ye.mark = t, Ye.measure = r, Ye.init = m, Ye.markLoadTime = z, Ye.send = function() {
          ye.logEvent(yn.SendCalled), K()
      }, Ye.addData = d, Ye.getSessionId = me, Ye.getDebug = function() {
          return ye.getEvents()
      }, Ye.forceSample = function() {
          ye.logEvent(yn.ForceSampleCalled), le(fe(!0))
      }, Ye.doUpdate = function() {}, Ye.cmd = Ee, Ye.version = Te, Pn.ac && Pn.ac.length && Pn.ac.forEach(Ee), "undefined" != typeof window.LUX_ae && window.LUX_ae.forEach(e), ye.logEvent(yn.EvaluationEnd), Ye
  }(), window.LUX = Pn, Mn = r(), Pn.customerid = 47044334
}();