import {
  b as He,
  m as W,
  n as le,
  d as Je,
  e as ce,
  f as ze,
  w as Q,
  o as Ve,
  g as We,
  h as R,
  i as Se,
  p as Xe,
  P as Ke,
  I as Ge,
  L as Ye,
  j as Qe,
  k as U,
  l as Ze,
  q as et,
  s as tt,
  t as rt,
  r as nt,
  v as st,
  x as at,
} from "./index.1735305046112.js";
let T = 0;
function it(e) {
  e ? (T || document.body.classList.add("van-toast--unclickable"), T++) : T && (T--, T || document.body.classList.remove("van-toast--unclickable"));
}
const [ot, A] = He("toast"),
  ut = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"],
  lt = {
    icon: String,
    show: Boolean,
    type: W("text"),
    overlay: Boolean,
    message: le,
    iconSize: le,
    duration: Je(2e3),
    position: W("middle"),
    teleport: [String, Object],
    className: ce,
    iconPrefix: String,
    transition: W("van-fade"),
    loadingType: String,
    forbidClick: Boolean,
    overlayClass: ce,
    overlayStyle: Object,
    closeOnClick: Boolean,
    closeOnClickOverlay: Boolean,
  };
var Oe = ze({
  name: ot,
  props: lt,
  emits: ["update:show"],
  setup(e, { emit: t }) {
    let r,
      s = !1;
    const n = () => {
        const i = e.show && e.forbidClick;
        s !== i && ((s = i), it(s));
      },
      a = (i) => t("update:show", i),
      o = () => {
        e.closeOnClick && a(!1);
      },
      u = () => clearTimeout(r),
      l = () => {
        const { icon: i, type: c, iconSize: m, iconPrefix: h, loadingType: k } = e;
        if (i || c === "success" || c === "fail") return R(Ge, { name: i || c, size: m, class: A("icon"), classPrefix: h }, null);
        if (c === "loading") return R(Ye, { class: A("loading"), size: m, type: k }, null);
      },
      f = () => {
        const { type: i, message: c } = e;
        if (Qe(c) && c !== "")
          return i === "html" ? R("div", { key: 0, class: A("text"), innerHTML: String(c) }, null) : R("div", { class: A("text") }, [c]);
      };
    return (
      Q(() => [e.show, e.forbidClick], n),
      Q(
        () => [e.show, e.type, e.message, e.duration],
        () => {
          u(),
            e.show &&
              e.duration > 0 &&
              (r = setTimeout(() => {
                a(!1);
              }, e.duration));
        }
      ),
      Ve(n),
      We(n),
      () =>
        R(
          Ke,
          Se(
            { class: [A([e.position, { [e.type]: !e.icon }]), e.className], lockScroll: !1, onClick: o, onClosed: u, "onUpdate:show": a },
            Xe(e, ut)
          ),
          { default: () => [l(), f()] }
        )
    );
  },
});
const xe = {
  icon: "",
  type: "text",
  message: "",
  className: "",
  overlay: !1,
  onClose: void 0,
  onOpened: void 0,
  duration: 2e3,
  teleport: "body",
  iconSize: void 0,
  iconPrefix: void 0,
  position: "middle",
  transition: "van-fade",
  forbidClick: !1,
  loadingType: void 0,
  overlayClass: "",
  overlayStyle: void 0,
  closeOnClick: !1,
  closeOnClickOverlay: !1,
};
let w = [],
  M = !1,
  q = U({}, xe);
const I = new Map();
function Pe(e) {
  return tt(e) ? e : { message: e };
}
function ct() {
  const { instance: e, unmount: t } = rt({
    setup() {
      const r = nt(""),
        { open: s, state: n, close: a, toggle: o } = st(),
        u = () => {
          M && ((w = w.filter((f) => f !== e)), t());
        },
        l = () => R(Oe, Se(n, { onClosed: u, "onUpdate:show": o }), null);
      return (
        Q(r, (f) => {
          n.message = f;
        }),
        (at().render = l),
        { open: s, clear: a, message: r }
      );
    },
  });
  return e;
}
function ft() {
  if (!w.length || M) {
    const e = ct();
    w.push(e);
  }
  return w[w.length - 1];
}
function y(e = {}) {
  if (!Ze) return {};
  const t = ft(),
    r = Pe(e);
  return t.open(U({}, q, I.get(r.type || q.type), r)), t;
}
const te = (e) => (t) => y(U({ type: e }, Pe(t)));
y.loading = te("loading");
y.success = te("success");
y.fail = te("fail");
y.clear = (e) => {
  var t;
  w.length &&
    (e
      ? (w.forEach((r) => {
          r.clear();
        }),
        (w = []))
      : M
      ? (t = w.shift()) == null || t.clear()
      : w[0].clear());
};
function dt(e, t) {
  typeof e == "string" ? I.set(e, t) : U(q, e);
}
y.setDefaultOptions = dt;
y.resetDefaultOptions = (e) => {
  typeof e == "string" ? I.delete(e) : ((q = U({}, xe)), I.clear());
};
y.allowMultiple = (e = !0) => {
  M = e;
};
y.install = (e) => {
  e.use(et(Oe)), (e.config.globalProperties.$toast = y);
};
var re = { exports: {} },
  Re = function (t, r) {
    return function () {
      for (var n = new Array(arguments.length), a = 0; a < n.length; a++) n[a] = arguments[a];
      return t.apply(r, n);
    };
  },
  ht = Re,
  E = Object.prototype.toString;
function ne(e) {
  return Array.isArray(e);
}
function Z(e) {
  return typeof e == "undefined";
}
function pt(e) {
  return (
    e !== null && !Z(e) && e.constructor !== null && !Z(e.constructor) && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e)
  );
}
function Ne(e) {
  return E.call(e) === "[object ArrayBuffer]";
}
function mt(e) {
  return E.call(e) === "[object FormData]";
}
function vt(e) {
  var t;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? (t = ArrayBuffer.isView(e)) : (t = e && e.buffer && Ne(e.buffer)), t;
}
function yt(e) {
  return typeof e == "string";
}
function bt(e) {
  return typeof e == "number";
}
function Te(e) {
  return e !== null && typeof e == "object";
}
function j(e) {
  if (E.call(e) !== "[object Object]") return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function wt(e) {
  return E.call(e) === "[object Date]";
}
function Ct(e) {
  return E.call(e) === "[object File]";
}
function gt(e) {
  return E.call(e) === "[object Blob]";
}
function Ae(e) {
  return E.call(e) === "[object Function]";
}
function Et(e) {
  return Te(e) && Ae(e.pipe);
}
function St(e) {
  return E.call(e) === "[object URLSearchParams]";
}
function Ot(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function xt() {
  return typeof navigator != "undefined" &&
    (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")
    ? !1
    : typeof window != "undefined" && typeof document != "undefined";
}
function se(e, t) {
  if (!(e === null || typeof e == "undefined"))
    if ((typeof e != "object" && (e = [e]), ne(e))) for (var r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
    else for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.call(null, e[n], n, e);
}
function ee() {
  var e = {};
  function t(n, a) {
    j(e[a]) && j(n) ? (e[a] = ee(e[a], n)) : j(n) ? (e[a] = ee({}, n)) : ne(n) ? (e[a] = n.slice()) : (e[a] = n);
  }
  for (var r = 0, s = arguments.length; r < s; r++) se(arguments[r], t);
  return e;
}
function Pt(e, t, r) {
  return (
    se(t, function (n, a) {
      r && typeof n == "function" ? (e[a] = ht(n, r)) : (e[a] = n);
    }),
    e
  );
}
function Rt(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var p = {
    isArray: ne,
    isArrayBuffer: Ne,
    isBuffer: pt,
    isFormData: mt,
    isArrayBufferView: vt,
    isString: yt,
    isNumber: bt,
    isObject: Te,
    isPlainObject: j,
    isUndefined: Z,
    isDate: wt,
    isFile: Ct,
    isBlob: gt,
    isFunction: Ae,
    isStream: Et,
    isURLSearchParams: St,
    isStandardBrowserEnv: xt,
    forEach: se,
    merge: ee,
    extend: Pt,
    trim: Ot,
    stripBOM: Rt,
  },
  x = p;
function fe(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
var Ue = function (t, r, s) {
    if (!r) return t;
    var n;
    if (s) n = s(r);
    else if (x.isURLSearchParams(r)) n = r.toString();
    else {
      var a = [];
      x.forEach(r, function (l, f) {
        l === null ||
          typeof l == "undefined" ||
          (x.isArray(l) ? (f = f + "[]") : (l = [l]),
          x.forEach(l, function (c) {
            x.isDate(c) ? (c = c.toISOString()) : x.isObject(c) && (c = JSON.stringify(c)), a.push(fe(f) + "=" + fe(c));
          }));
      }),
        (n = a.join("&"));
    }
    if (n) {
      var o = t.indexOf("#");
      o !== -1 && (t = t.slice(0, o)), (t += (t.indexOf("?") === -1 ? "?" : "&") + n);
    }
    return t;
  },
  Nt = p;
function _() {
  this.handlers = [];
}
_.prototype.use = function (t, r, s) {
  return (
    this.handlers.push({ fulfilled: t, rejected: r, synchronous: s ? s.synchronous : !1, runWhen: s ? s.runWhen : null }), this.handlers.length - 1
  );
};
_.prototype.eject = function (t) {
  this.handlers[t] && (this.handlers[t] = null);
};
_.prototype.forEach = function (t) {
  Nt.forEach(this.handlers, function (s) {
    s !== null && t(s);
  });
};
var Tt = _,
  At = p,
  Ut = function (t, r) {
    At.forEach(t, function (n, a) {
      a !== r && a.toUpperCase() === r.toUpperCase() && ((t[r] = n), delete t[a]);
    });
  },
  $e = function (t, r, s, n, a) {
    return (
      (t.config = r),
      s && (t.code = s),
      (t.request = n),
      (t.response = a),
      (t.isAxiosError = !0),
      (t.toJSON = function () {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null,
        };
      }),
      t
    );
  },
  ke = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
  $t = $e,
  Be = function (t, r, s, n, a) {
    var o = new Error(t);
    return $t(o, r, s, n, a);
  },
  kt = Be,
  Bt = function (t, r, s) {
    var n = s.config.validateStatus;
    !s.status || !n || n(s.status) ? t(s) : r(kt("Request failed with status code " + s.status, s.config, null, s.request, s));
  },
  B = p,
  Lt = B.isStandardBrowserEnv()
    ? (function () {
        return {
          write: function (r, s, n, a, o, u) {
            var l = [];
            l.push(r + "=" + encodeURIComponent(s)),
              B.isNumber(n) && l.push("expires=" + new Date(n).toGMTString()),
              B.isString(a) && l.push("path=" + a),
              B.isString(o) && l.push("domain=" + o),
              u === !0 && l.push("secure"),
              (document.cookie = l.join("; "));
          },
          read: function (r) {
            var s = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
            return s ? decodeURIComponent(s[3]) : null;
          },
          remove: function (r) {
            this.write(r, "", Date.now() - 864e5);
          },
        };
      })()
    : (function () {
        return {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
      })(),
  jt = function (t) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
  },
  Dt = function (t, r) {
    return r ? t.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : t;
  },
  qt = jt,
  It = Dt,
  Mt = function (t, r) {
    return t && !qt(r) ? It(t, r) : r;
  },
  X = p,
  _t = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ],
  Ft = function (t) {
    var r = {},
      s,
      n,
      a;
    return (
      t &&
        X.forEach(
          t.split(`
`),
          function (u) {
            if (((a = u.indexOf(":")), (s = X.trim(u.substr(0, a)).toLowerCase()), (n = X.trim(u.substr(a + 1))), s)) {
              if (r[s] && _t.indexOf(s) >= 0) return;
              s === "set-cookie" ? (r[s] = (r[s] ? r[s] : []).concat([n])) : (r[s] = r[s] ? r[s] + ", " + n : n);
            }
          }
        ),
      r
    );
  },
  de = p,
  Ht = de.isStandardBrowserEnv()
    ? (function () {
        var t = /(msie|trident)/i.test(navigator.userAgent),
          r = document.createElement("a"),
          s;
        function n(a) {
          var o = a;
          return (
            t && (r.setAttribute("href", o), (o = r.href)),
            r.setAttribute("href", o),
            {
              href: r.href,
              protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
              host: r.host,
              search: r.search ? r.search.replace(/^\?/, "") : "",
              hash: r.hash ? r.hash.replace(/^#/, "") : "",
              hostname: r.hostname,
              port: r.port,
              pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname,
            }
          );
        }
        return (
          (s = n(window.location.href)),
          function (o) {
            var u = de.isString(o) ? n(o) : o;
            return u.protocol === s.protocol && u.host === s.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })();
function ae(e) {
  this.message = e;
}
ae.prototype.toString = function () {
  return "Cancel" + (this.message ? ": " + this.message : "");
};
ae.prototype.__CANCEL__ = !0;
var F = ae,
  L = p,
  Jt = Bt,
  zt = Lt,
  Vt = Ue,
  Wt = Mt,
  Xt = Ft,
  Kt = Ht,
  K = Be,
  Gt = ke,
  Yt = F,
  he = function (t) {
    return new Promise(function (s, n) {
      var a = t.data,
        o = t.headers,
        u = t.responseType,
        l;
      function f() {
        t.cancelToken && t.cancelToken.unsubscribe(l), t.signal && t.signal.removeEventListener("abort", l);
      }
      L.isFormData(a) && delete o["Content-Type"];
      var i = new XMLHttpRequest();
      if (t.auth) {
        var c = t.auth.username || "",
          m = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
        o.Authorization = "Basic " + btoa(c + ":" + m);
      }
      var h = Wt(t.baseURL, t.url);
      i.open(t.method.toUpperCase(), Vt(h, t.params, t.paramsSerializer), !0), (i.timeout = t.timeout);
      function k() {
        if (!!i) {
          var b = "getAllResponseHeaders" in i ? Xt(i.getAllResponseHeaders()) : null,
            O = !u || u === "text" || u === "json" ? i.responseText : i.response,
            S = { data: O, status: i.status, statusText: i.statusText, headers: b, config: t, request: i };
          Jt(
            function (V) {
              s(V), f();
            },
            function (V) {
              n(V), f();
            },
            S
          ),
            (i = null);
        }
      }
      if (
        ("onloadend" in i
          ? (i.onloadend = k)
          : (i.onreadystatechange = function () {
              !i || i.readyState !== 4 || (i.status === 0 && !(i.responseURL && i.responseURL.indexOf("file:") === 0)) || setTimeout(k);
            }),
        (i.onabort = function () {
          !i || (n(K("Request aborted", t, "ECONNABORTED", i)), (i = null));
        }),
        (i.onerror = function () {
          n(K("Network Error", t, null, i)), (i = null);
        }),
        (i.ontimeout = function () {
          var O = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded",
            S = t.transitional || Gt;
          t.timeoutErrorMessage && (O = t.timeoutErrorMessage), n(K(O, t, S.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", i)), (i = null);
        }),
        L.isStandardBrowserEnv())
      ) {
        var z = (t.withCredentials || Kt(h)) && t.xsrfCookieName ? zt.read(t.xsrfCookieName) : void 0;
        z && (o[t.xsrfHeaderName] = z);
      }
      "setRequestHeader" in i &&
        L.forEach(o, function (O, S) {
          typeof a == "undefined" && S.toLowerCase() === "content-type" ? delete o[S] : i.setRequestHeader(S, O);
        }),
        L.isUndefined(t.withCredentials) || (i.withCredentials = !!t.withCredentials),
        u && u !== "json" && (i.responseType = t.responseType),
        typeof t.onDownloadProgress == "function" && i.addEventListener("progress", t.onDownloadProgress),
        typeof t.onUploadProgress == "function" && i.upload && i.upload.addEventListener("progress", t.onUploadProgress),
        (t.cancelToken || t.signal) &&
          ((l = function (b) {
            !i || (n(!b || (b && b.type) ? new Yt("canceled") : b), i.abort(), (i = null));
          }),
          t.cancelToken && t.cancelToken.subscribe(l),
          t.signal && (t.signal.aborted ? l() : t.signal.addEventListener("abort", l))),
        a || (a = null),
        i.send(a);
    });
  },
  d = p,
  pe = Ut,
  Qt = $e,
  Zt = ke,
  er = { "Content-Type": "application/x-www-form-urlencoded" };
function me(e, t) {
  !d.isUndefined(e) && d.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
}
function tr() {
  var e;
  return (
    (typeof XMLHttpRequest != "undefined" || (typeof process != "undefined" && Object.prototype.toString.call(process) === "[object process]")) &&
      (e = he),
    e
  );
}
function rr(e, t, r) {
  if (d.isString(e))
    try {
      return (t || JSON.parse)(e), d.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError") throw s;
    }
  return (r || JSON.stringify)(e);
}
var H = {
  transitional: Zt,
  adapter: tr(),
  transformRequest: [
    function (t, r) {
      return (
        pe(r, "Accept"),
        pe(r, "Content-Type"),
        d.isFormData(t) || d.isArrayBuffer(t) || d.isBuffer(t) || d.isStream(t) || d.isFile(t) || d.isBlob(t)
          ? t
          : d.isArrayBufferView(t)
          ? t.buffer
          : d.isURLSearchParams(t)
          ? (me(r, "application/x-www-form-urlencoded;charset=utf-8"), t.toString())
          : d.isObject(t) || (r && r["Content-Type"] === "application/json")
          ? (me(r, "application/json"), rr(t))
          : t
      );
    },
  ],
  transformResponse: [
    function (t) {
      var r = this.transitional || H.transitional,
        s = r && r.silentJSONParsing,
        n = r && r.forcedJSONParsing,
        a = !s && this.responseType === "json";
      if (a || (n && d.isString(t) && t.length))
        try {
          return JSON.parse(t);
        } catch (o) {
          if (a) throw o.name === "SyntaxError" ? Qt(o, this, "E_JSON_PARSE") : o;
        }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
d.forEach(["delete", "get", "head"], function (t) {
  H.headers[t] = {};
});
d.forEach(["post", "put", "patch"], function (t) {
  H.headers[t] = d.merge(er);
});
var ie = H,
  nr = p,
  sr = ie,
  ar = function (t, r, s) {
    var n = this || sr;
    return (
      nr.forEach(s, function (o) {
        t = o.call(n, t, r);
      }),
      t
    );
  },
  Le = function (t) {
    return !!(t && t.__CANCEL__);
  },
  ve = p,
  G = ar,
  ir = Le,
  or = ie,
  ur = F;
function Y(e) {
  if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)) throw new ur("canceled");
}
var lr = function (t) {
    Y(t),
      (t.headers = t.headers || {}),
      (t.data = G.call(t, t.data, t.headers, t.transformRequest)),
      (t.headers = ve.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers)),
      ve.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (n) {
        delete t.headers[n];
      });
    var r = t.adapter || or.adapter;
    return r(t).then(
      function (n) {
        return Y(t), (n.data = G.call(t, n.data, n.headers, t.transformResponse)), n;
      },
      function (n) {
        return (
          ir(n) || (Y(t), n && n.response && (n.response.data = G.call(t, n.response.data, n.response.headers, t.transformResponse))),
          Promise.reject(n)
        );
      }
    );
  },
  v = p,
  je = function (t, r) {
    r = r || {};
    var s = {};
    function n(i, c) {
      return v.isPlainObject(i) && v.isPlainObject(c) ? v.merge(i, c) : v.isPlainObject(c) ? v.merge({}, c) : v.isArray(c) ? c.slice() : c;
    }
    function a(i) {
      if (v.isUndefined(r[i])) {
        if (!v.isUndefined(t[i])) return n(void 0, t[i]);
      } else return n(t[i], r[i]);
    }
    function o(i) {
      if (!v.isUndefined(r[i])) return n(void 0, r[i]);
    }
    function u(i) {
      if (v.isUndefined(r[i])) {
        if (!v.isUndefined(t[i])) return n(void 0, t[i]);
      } else return n(void 0, r[i]);
    }
    function l(i) {
      if (i in r) return n(t[i], r[i]);
      if (i in t) return n(void 0, t[i]);
    }
    var f = {
      url: o,
      method: o,
      data: o,
      baseURL: u,
      transformRequest: u,
      transformResponse: u,
      paramsSerializer: u,
      timeout: u,
      timeoutMessage: u,
      withCredentials: u,
      adapter: u,
      responseType: u,
      xsrfCookieName: u,
      xsrfHeaderName: u,
      onUploadProgress: u,
      onDownloadProgress: u,
      decompress: u,
      maxContentLength: u,
      maxBodyLength: u,
      transport: u,
      httpAgent: u,
      httpsAgent: u,
      cancelToken: u,
      socketPath: u,
      responseEncoding: u,
      validateStatus: l,
    };
    return (
      v.forEach(Object.keys(t).concat(Object.keys(r)), function (c) {
        var m = f[c] || a,
          h = m(c);
        (v.isUndefined(h) && m !== l) || (s[c] = h);
      }),
      s
    );
  },
  De = { version: "0.26.1" },
  cr = De.version,
  oe = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function (e, t) {
  oe[e] = function (s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
var ye = {};
oe.transitional = function (t, r, s) {
  function n(a, o) {
    return "[Axios v" + cr + "] Transitional option '" + a + "'" + o + (s ? ". " + s : "");
  }
  return function (a, o, u) {
    if (t === !1) throw new Error(n(o, " has been removed" + (r ? " in " + r : "")));
    return (
      r && !ye[o] && ((ye[o] = !0), console.warn(n(o, " has been deprecated since v" + r + " and will be removed in the near future"))),
      t ? t(a, o, u) : !0
    );
  };
};
function fr(e, t, r) {
  if (typeof e != "object") throw new TypeError("options must be an object");
  for (var s = Object.keys(e), n = s.length; n-- > 0; ) {
    var a = s[n],
      o = t[a];
    if (o) {
      var u = e[a],
        l = u === void 0 || o(u, a, e);
      if (l !== !0) throw new TypeError("option " + a + " must be " + l);
      continue;
    }
    if (r !== !0) throw Error("Unknown option " + a);
  }
}
var dr = { assertOptions: fr, validators: oe },
  qe = p,
  hr = Ue,
  be = Tt,
  we = lr,
  J = je,
  Ie = dr,
  P = Ie.validators;
function $(e) {
  (this.defaults = e), (this.interceptors = { request: new be(), response: new be() });
}
$.prototype.request = function (t, r) {
  typeof t == "string" ? ((r = r || {}), (r.url = t)) : (r = t || {}),
    (r = J(this.defaults, r)),
    r.method ? (r.method = r.method.toLowerCase()) : this.defaults.method ? (r.method = this.defaults.method.toLowerCase()) : (r.method = "get");
  var s = r.transitional;
  s !== void 0 &&
    Ie.assertOptions(
      s,
      { silentJSONParsing: P.transitional(P.boolean), forcedJSONParsing: P.transitional(P.boolean), clarifyTimeoutError: P.transitional(P.boolean) },
      !1
    );
  var n = [],
    a = !0;
  this.interceptors.request.forEach(function (h) {
    (typeof h.runWhen == "function" && h.runWhen(r) === !1) || ((a = a && h.synchronous), n.unshift(h.fulfilled, h.rejected));
  });
  var o = [];
  this.interceptors.response.forEach(function (h) {
    o.push(h.fulfilled, h.rejected);
  });
  var u;
  if (!a) {
    var l = [we, void 0];
    for (Array.prototype.unshift.apply(l, n), l = l.concat(o), u = Promise.resolve(r); l.length; ) u = u.then(l.shift(), l.shift());
    return u;
  }
  for (var f = r; n.length; ) {
    var i = n.shift(),
      c = n.shift();
    try {
      f = i(f);
    } catch (m) {
      c(m);
      break;
    }
  }
  try {
    u = we(f);
  } catch (m) {
    return Promise.reject(m);
  }
  for (; o.length; ) u = u.then(o.shift(), o.shift());
  return u;
};
$.prototype.getUri = function (t) {
  return (t = J(this.defaults, t)), hr(t.url, t.params, t.paramsSerializer).replace(/^\?/, "");
};
qe.forEach(["delete", "get", "head", "options"], function (t) {
  $.prototype[t] = function (r, s) {
    return this.request(J(s || {}, { method: t, url: r, data: (s || {}).data }));
  };
});
qe.forEach(["post", "put", "patch"], function (t) {
  $.prototype[t] = function (r, s, n) {
    return this.request(J(n || {}, { method: t, url: r, data: s }));
  };
});
var pr = $,
  mr = F;
function N(e) {
  if (typeof e != "function") throw new TypeError("executor must be a function.");
  var t;
  this.promise = new Promise(function (n) {
    t = n;
  });
  var r = this;
  this.promise.then(function (s) {
    if (!!r._listeners) {
      var n,
        a = r._listeners.length;
      for (n = 0; n < a; n++) r._listeners[n](s);
      r._listeners = null;
    }
  }),
    (this.promise.then = function (s) {
      var n,
        a = new Promise(function (o) {
          r.subscribe(o), (n = o);
        }).then(s);
      return (
        (a.cancel = function () {
          r.unsubscribe(n);
        }),
        a
      );
    }),
    e(function (n) {
      r.reason || ((r.reason = new mr(n)), t(r.reason));
    });
}
N.prototype.throwIfRequested = function () {
  if (this.reason) throw this.reason;
};
N.prototype.subscribe = function (t) {
  if (this.reason) {
    t(this.reason);
    return;
  }
  this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
};
N.prototype.unsubscribe = function (t) {
  if (!!this._listeners) {
    var r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
};
N.source = function () {
  var t,
    r = new N(function (n) {
      t = n;
    });
  return { token: r, cancel: t };
};
var vr = N,
  yr = function (t) {
    return function (s) {
      return t.apply(null, s);
    };
  },
  br = p,
  wr = function (t) {
    return br.isObject(t) && t.isAxiosError === !0;
  },
  Ce = p,
  Cr = Re,
  D = pr,
  gr = je,
  Er = ie;
function Me(e) {
  var t = new D(e),
    r = Cr(D.prototype.request, t);
  return (
    Ce.extend(r, D.prototype, t),
    Ce.extend(r, t),
    (r.create = function (n) {
      return Me(gr(e, n));
    }),
    r
  );
}
var C = Me(Er);
C.Axios = D;
C.Cancel = F;
C.CancelToken = vr;
C.isCancel = Le;
C.VERSION = De.version;
C.all = function (t) {
  return Promise.all(t);
};
C.spread = yr;
C.isAxiosError = wr;
re.exports = C;
re.exports.default = C;
var _e = re.exports;
const Pr = (e, t) => {
    sessionStorage.setItem(e, t);
  },
  ge = (e) => sessionStorage.getItem(e) || "",
  Rr = (e) => {
    let s = window.decodeURIComponent(window.location.search).substring(1).split("&");
    for (let n = 0; n < s.length; n++) {
      let a = s[n].split("=");
      if (a[0] == e) return a[1];
    }
    return !1;
  };
let ue = _e.create({ timeout: 3e4, baseURL: "", headers: { "client-type": "PC" } });
_e.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
ue.interceptors.request.use(
  (e) => {
    if (e.method === "formdata") {
      (e.headers.post["Content-Type"] = "multipart/form-data;charset=utf-8"), (e.method = "post");
      let t = new FormData();
      for (let r in e.params) t.append(r, e.params[r]);
      (e.data = t), (e.params = "");
    } else
      e.method === "query"
        ? ((e.method = "post"), (e.data = e.params), (e.params = ""))
        : e.method === "post" && ((e.data = e.params), (e.params = ""));
    return (e.headers["access-token"] = ge("token")), (e.headers.uid = ge("uid")), (e.headers["Cache-Control"] = "no-cache"), e;
  },
  (e) => Promise.reject(e)
);
ue.interceptors.response.use(
  (e) => (e.status === 200 ? e.data : (y("\u7CFB\u7EDF\u5F02\u5E38\uFF01\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF01"), Ee(e))),
  (e) => (y("\u7CFB\u7EDF\u5F02\u5E38\uFF01\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF01"), Ee(e))
);
const Ee = (e) => (console.error(e, "axios/error"), Promise.reject(e.data)),
  Sr = (e) => {
    let r = Object.assign({ url: "", data: {}, method: "post" }, e);
    return new Promise((s, n) => {
      console.log(r.url),
        ue({ url: r.url, params: r.data, method: r.method })
          .then((a) => {
            s(a);
          })
          .catch((a) => {
            n(a);
          });
    });
  },
  g = (e = "", t = {}, r = "post") => ((e = Or(e)), Sr({ url: e, method: r, data: t })),
  Or = (e) => {
    if (e.indexOf("/Beta.") == 0 || e.indexOf("Beta.") == 0) {
      e.indexOf("/") > 0 && (e = "/" + e);
      let r = e.split("/")[1];
      return (r = r.replace(/\./g, "")), process.env["VUE_APP_" + r] + e;
    } else return e;
  },
  Nr = (e) => g("https://api.shenchuliwu.com/confessionWall/add", e, "post"),
  Tr = (e) => g("https://api.shenchuliwu.com/confessionWall/modify", e, "post"),
  Ar = (e) => g("https://api.shenchuliwu.com/confessionWall/get", e, "get"),
  Ur = (e) => g("https://api.shenchuliwu.com/space/getMsgList", e, "get"),
  $r = (e) => g("https://api.shenchuliwu.com/user/bindUser", e, "post"),
  kr = (e) => g("https://api.shenchuliwu.com/user/login", e, "post"),
  Br = (e) => g("https://api.shenchuliwu.com/space/sendMsg", e, "post"),
  Lr = (e) => g("https://api.shenchuliwu.com/space/deleteMsg", e, "post"),
  jr = (e) => g("https://api.shenchuliwu.com/cloud/getUploadSignature", e, "get");
export { y as T, Ar as a, Nr as b, Ur as c, Lr as d, $r as e, jr as f, Rr as g, Br as h, kr as l, Tr as m, Pr as s };
