if (LUX = function() {
  function f() {
      return c && c.now ? c.now() : (Date.now ? Date.now() : +new Date) - o
  }

  function e(e) {
      if (c) {
          if (c.mark) return c.mark(e);
          if (c.webkitMark) return c.webkitMark(e)
      }
      a.push({
          name: e,
          entryType: "mark",
          startTime: f(),
          duration: 0
      })
  }

  function n(e, n, t) {
      if (void 0 === n && u(m) && (n = m), c) {
          if (c.measure) return n ? t ? c.measure(e, n, t) : c.measure(e, n) : c.measure(e);
          if (c.webkitMeasure) return c.webkitMeasure(e, n, t)
      }
      var r = 0,
          i = f();
      if (n) {
          var a = u(n);
          if (a) r = a.startTime;
          else {
              if (!(c && c.timing && c.timing[n])) return;
              r = c.timing[n] - c.timing.navigationStart
          }
      }
      if (t) {
          var o = u(t);
          if (o) i = o.startTime;
          else {
              if (!(c && c.timing && c.timing[t])) return;
              i = c.timing[t] - c.timing.navigationStart
          }
      }
      s.push({
          name: e,
          entryType: "measure",
          startTime: r,
          duration: i - r
      })
  }

  function u(e) {
      return t(e, r())
  }

  function t(e, n) {
      for (i = n.length - 1; 0 <= i; i--) {
          var t = n[i];
          if (e === t.name) return t
      }
      return undefined
  }

  function r() {
      if (c) {
          if (c.getEntriesByType) return c.getEntriesByType("mark");
          if (c.webkitGetEntriesByType) return c.webkitGetEntriesByType("mark")
      }
      return a
  }
  var a = "undefined" != typeof LUX && "undefined" != typeof LUX.gaMarks ? LUX.gaMarks : [],
      s = "undefined" != typeof LUX && "undefined" != typeof LUX.gaMeasures ? LUX.gaMeasures : [],
      m = "LUX_start",
      c = window.performance,
      o = "undefined" != typeof LUX && LUX.ns ? LUX.ns : Date.now ? Date.now() : +new Date;
  return c && c.timing && c.timing.navigationStart && (o = c.timing.navigationStart), {
      mark: e,
      measure: n,
      gaMarks: a,
      gaMeasures: s
  }
}(), LUX.ns = Date.now ? Date.now() : +new Date, LUX.ac = [], LUX.cmd = function(e) {
  LUX.ac.push(e)
}, LUX.init = function() {
  LUX.cmd(["init"])
}, LUX.send = function() {
  LUX.cmd(["send"])
}, LUX.addData = function(e, n) {
  LUX.cmd(["addData", e, n])
}, LUX_ae = [], window.addEventListener("error", function(e) {
  LUX_ae.push(e)
}), LUX_al = [], "function" == typeof PerformanceObserver && "function" == typeof PerformanceLongTaskTiming) {
var LongTaskObserver = new PerformanceObserver(function(e) {
  for (var n = e.getEntries(), t = 0; t < n.length; t++) {
      var r = n[t];
      LUX_al.push(r)
  }
});
try {
  LongTaskObserver.observe({
      type: ["longtask"]
  })
} catch (e) {}
}
var measureHTTPProtocol = function() {
var e = performance.getEntriesByType("navigation");
if (void 0 !== e && 0 < e.length) {
  var n = e[0].nextHopProtocol;
  LUX.addData("http-protocol", n)
}
};
try {
"undefined" != typeof performance && "undefined" != typeof performance.getEntriesByType && ("complete" === document.readyState ? measureHTTPProtocol() : window.addEventListener("load", function() {
  measureHTTPProtocol()
}))
} catch (e) {
console.error("Error in LUX reporting the HTTP protocol (" + window.location + "):", e)
}