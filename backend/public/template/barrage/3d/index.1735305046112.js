//Fri Aug 08 2025 11:01:59 GMT+0800 (中国标准时间)

const pc = function () {
const _0x4ce871 = document.createElement("link").relList;
if (_0x4ce871 && _0x4ce871.supports && _0x4ce871.supports("modulepreload")) return;
for (const _0x1506b0 of document.querySelectorAll("link[rel=\"modulepreload\"]")) _0xa59c19(_0x1506b0);
new MutationObserver(_0xe9537 => {
  for (const _0x3b4faa of _0xe9537) if (_0x3b4faa.type === "childList") {
	for (const _0x6e43e8 of _0x3b4faa.addedNodes) _0x6e43e8.tagName === "LINK" && _0x6e43e8.rel === "modulepreload" && _0xa59c19(_0x6e43e8);
  }
}).observe(document, {
  "childList": !0,
  "subtree": !0
});
function _0x21901c(_0x5bac21) {
  const _0x5a00cb = {};
  return _0x5bac21.integrity && (_0x5a00cb.integrity = _0x5bac21.integrity), _0x5bac21.referrerpolicy && (_0x5a00cb.referrerPolicy = _0x5bac21.referrerpolicy), _0x5bac21.crossorigin === "use-credentials" ? _0x5a00cb.credentials = "include" : _0x5bac21.crossorigin === "anonymous" ? _0x5a00cb.credentials = "omit" : _0x5a00cb.credentials = "same-origin", _0x5a00cb;
}
function _0xa59c19(_0x1b4490) {
  if (_0x1b4490.ep) return;
  _0x1b4490.ep = !0;
  const _0x4455c8 = _0x21901c(_0x1b4490);
  fetch(_0x1b4490.href, _0x4455c8);
}
};
pc();

/**
 * @vue/shared v3.5.11
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function bo(e) {
  const t = Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ae = {},
  nn = [],
  et = () => {},
  gc = () => !1,
  yr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  _o = (e) => e.startsWith("onUpdate:"),
  Ce = Object.assign,
  wo = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  mc = Object.prototype.hasOwnProperty,
  ie = (e, t) => mc.call(e, t),
  W = Array.isArray,
  rn = (e) => br(e) === "[object Map]",
  vi = (e) => br(e) === "[object Set]",
  G = (e) => typeof e == "function",
  ve = (e) => typeof e == "string",
  Dt = (e) => typeof e == "symbol",
  ge = (e) => e !== null && typeof e == "object",
  yi = (e) => (ge(e) || G(e)) && G(e.then) && G(e.catch),
  bi = Object.prototype.toString,
  br = (e) => bi.call(e),
  vc = (e) => br(e).slice(8, -1),
  _i = (e) => br(e) === "[object Object]",
  Eo = (e) => ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  xn = bo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  _r = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  yc = /-(\w)/g,
  Xe = _r((e) => e.replace(yc, (t, n) => (n ? n.toUpperCase() : ""))),
  bc = /\B([A-Z])/g,
  Mt = _r((e) => e.replace(bc, "-$1").toLowerCase()),
  wr = _r((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Fr = _r((e) => (e ? `on${wr(e)}` : "")),
  It = (e, t) => !Object.is(e, t),
  or = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  wi = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: r, value: n });
  },
  to = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  _c = (e) => {
    const t = ve(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Qo;
const xo = () =>
  Qo ||
  (Qo =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
function So(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = ve(r) ? Sc(r) : So(r);
      if (o) for (const s in o) t[s] = o[s];
    }
    return t;
  } else if (ve(e) || ge(e)) return e;
}
const wc = /;(?![^(]*\))/g,
  Ec = /:([^]+)/,
  xc = /\/\*[^]*?\*\//g;
function Sc(e) {
  const t = {};
  return (
    e
      .replace(xc, "")
      .split(wc)
      .forEach((n) => {
        if (n) {
          const r = n.split(Ec);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Co(e) {
  let t = "";
  if (ve(e)) t = e;
  else if (W(e))
    for (let n = 0; n < e.length; n++) {
      const r = Co(e[n]);
      r && (t += r + " ");
    }
  else if (ge(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Cc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ac = bo(Cc);
function Ei(e) {
  return !!e || e === "";
}
const xi = (e) => !!(e && e.__v_isRef === !0),
  Pc = (e) =>
    ve(e)
      ? e
      : e == null
      ? ""
      : W(e) || (ge(e) && (e.toString === bi || !G(e.toString)))
      ? xi(e)
        ? Pc(e.value)
        : JSON.stringify(e, Si, 2)
      : String(e),
  Si = (e, t) =>
    xi(t)
      ? Si(e, t.value)
      : rn(t)
      ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o], s) => ((n[Br(r, s) + " =>"] = o), n), {}) }
      : vi(t)
      ? { [`Set(${t.size})`]: [...t.values()].map((n) => Br(n)) }
      : Dt(t)
      ? Br(t)
      : ge(t) && !W(t) && !_i(t)
      ? String(t)
      : t,
  Br = (e, t = "") => {
    var n;
    return Dt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.5.11
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Ve;
class Tc {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = Ve),
      !t && Ve && (this.index = (Ve.scopes || (Ve.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ve;
      try {
        return (Ve = this), t();
      } finally {
        Ve = n;
      }
    }
  }
  on() {
    Ve = this;
  }
  off() {
    Ve = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Rc() {
  return Ve;
}
let de;
const Nr = new WeakSet();
class Ci {
  constructor(t) {
    (this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      Ve && Ve.active && Ve.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && ((this.flags &= -65), Nr.has(this) && (Nr.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Pi(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    (this.flags |= 2), es(this), Ti(this);
    const t = de,
      n = tt;
    (de = this), (tt = !0);
    try {
      return this.fn();
    } finally {
      Ri(this), (de = t), (tt = n), (this.flags &= -3);
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) To(t);
      (this.deps = this.depsTail = void 0), es(this), this.onStop && this.onStop(), (this.flags &= -2);
    }
  }
  trigger() {
    this.flags & 64 ? Nr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    no(this) && this.run();
  }
  get dirty() {
    return no(this);
  }
}
let Ai = 0,
  Sn,
  Cn;
function Pi(e, t = !1) {
  if (((e.flags |= 8), t)) {
    (e.next = Cn), (Cn = e);
    return;
  }
  (e.next = Sn), (Sn = e);
}
function Ao() {
  Ai++;
}
function Po() {
  if (--Ai > 0) return;
  if (Cn) {
    let t = Cn;
    for (Cn = void 0; t; ) {
      const n = t.next;
      (t.next = void 0), (t.flags &= -9), (t = n);
    }
  }
  let e;
  for (; Sn; ) {
    let t = Sn;
    for (Sn = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Ti(e) {
  for (let t = e.deps; t; t = t.nextDep) (t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t);
}
function Ri(e) {
  let t,
    n = e.depsTail,
    r = n;
  for (; r; ) {
    const o = r.prevDep;
    r.version === -1 ? (r === n && (n = o), To(r), Oc(r)) : (t = r), (r.dep.activeLink = r.prevActiveLink), (r.prevActiveLink = void 0), (r = o);
  }
  (e.deps = t), (e.depsTail = n);
}
function no(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || (t.dep.computed && (Oi(t.dep.computed) || t.dep.version !== t.version))) return !0;
  return !!e._dirty;
}
function Oi(e) {
  if ((e.flags & 4 && !(e.flags & 16)) || ((e.flags &= -17), e.globalVersion === Ln)) return;
  e.globalVersion = Ln;
  const t = e.dep;
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !no(e))) {
    e.flags &= -3;
    return;
  }
  const n = de,
    r = tt;
  (de = e), (tt = !0);
  try {
    Ti(e);
    const o = e.fn(e._value);
    (t.version === 0 || It(o, e._value)) && ((e._value = o), t.version++);
  } catch (o) {
    throw (t.version++, o);
  } finally {
    (de = n), (tt = r), Ri(e), (e.flags &= -3);
  }
}
function To(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: o } = e;
  if (
    (r && ((r.nextSub = o), (e.prevSub = void 0)), o && ((o.prevSub = r), (e.nextSub = void 0)), n.subs === e && (n.subs = r), !n.subs && n.computed)
  ) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep) To(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Oc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0));
}
let tt = !0;
const Ii = [];
function Ft() {
  Ii.push(tt), (tt = !1);
}
function Bt() {
  const e = Ii.pop();
  tt = e === void 0 ? !0 : e;
}
function es(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = de;
    de = void 0;
    try {
      t();
    } finally {
      de = n;
    }
  }
}
let Ln = 0;
class Ic {
  constructor(t, n) {
    (this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0);
  }
}
class Ro {
  constructor(t) {
    (this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0);
  }
  track(t) {
    if (!de || !tt || de === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== de)
      (n = this.activeLink = new Ic(de, this)),
        de.deps ? ((n.prevDep = de.depsTail), (de.depsTail.nextDep = n), (de.depsTail = n)) : (de.deps = de.depsTail = n),
        $i(n);
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const r = n.nextDep;
      (r.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = r),
        (n.prevDep = de.depsTail),
        (n.nextDep = void 0),
        (de.depsTail.nextDep = n),
        (de.depsTail = n),
        de.deps === n && (de.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ln++, this.notify(t);
  }
  notify(t) {
    Ao();
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
    } finally {
      Po();
    }
  }
}
function $i(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) $i(r);
    }
    const n = e.dep.subs;
    n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e);
  }
}
const ro = new WeakMap(),
  Kt = Symbol(""),
  oo = Symbol(""),
  Dn = Symbol("");
function Ie(e, t, n) {
  if (tt && de) {
    let r = ro.get(e);
    r || ro.set(e, (r = new Map()));
    let o = r.get(n);
    o || (r.set(n, (o = new Ro())), (o.map = r), (o.key = n)), o.track();
  }
}
function vt(e, t, n, r, o, s) {
  const i = ro.get(e);
  if (!i) {
    Ln++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ((Ao(), t === "clear")) i.forEach(l);
  else {
    const c = W(e),
      a = c && Eo(n);
    if (c && n === "length") {
      const u = Number(r);
      i.forEach((f, h) => {
        (h === "length" || h === Dn || (!Dt(h) && h >= u)) && l(f);
      });
    } else
      switch ((n !== void 0 && l(i.get(n)), a && l(i.get(Dn)), t)) {
        case "add":
          c ? a && l(i.get("length")) : (l(i.get(Kt)), rn(e) && l(i.get(oo)));
          break;
        case "delete":
          c || (l(i.get(Kt)), rn(e) && l(i.get(oo)));
          break;
        case "set":
          rn(e) && l(i.get(Kt));
          break;
      }
  }
  Po();
}
function Gt(e) {
  const t = ne(e);
  return t === e ? t : (Ie(t, "iterate", Dn), Ge(e) ? t : t.map(Oe));
}
function Er(e) {
  return Ie((e = ne(e)), "iterate", Dn), e;
}
const $c = {
  __proto__: null,
  [Symbol.iterator]() {
    return kr(this, Symbol.iterator, Oe);
  },
  concat(...e) {
    return Gt(this).concat(...e.map((t) => (W(t) ? Gt(t) : t)));
  },
  entries() {
    return kr(this, "entries", (e) => ((e[1] = Oe(e[1])), e));
  },
  every(e, t) {
    return dt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return dt(this, "filter", e, t, (n) => n.map(Oe), arguments);
  },
  find(e, t) {
    return dt(this, "find", e, t, Oe, arguments);
  },
  findIndex(e, t) {
    return dt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return dt(this, "findLast", e, t, Oe, arguments);
  },
  findLastIndex(e, t) {
    return dt(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return dt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Hr(this, "includes", e);
  },
  indexOf(...e) {
    return Hr(this, "indexOf", e);
  },
  join(e) {
    return Gt(this).join(e);
  },
  lastIndexOf(...e) {
    return Hr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return dt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return gn(this, "pop");
  },
  push(...e) {
    return gn(this, "push", e);
  },
  reduce(e, ...t) {
    return ts(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ts(this, "reduceRight", e, t);
  },
  shift() {
    return gn(this, "shift");
  },
  some(e, t) {
    return dt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return gn(this, "splice", e);
  },
  toReversed() {
    return Gt(this).toReversed();
  },
  toSorted(e) {
    return Gt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Gt(this).toSpliced(...e);
  },
  unshift(...e) {
    return gn(this, "unshift", e);
  },
  values() {
    return kr(this, "values", Oe);
  },
};
function kr(e, t, n) {
  const r = Er(e),
    o = r[t]();
  return (
    r !== e &&
      !Ge(e) &&
      ((o._next = o.next),
      (o.next = () => {
        const s = o._next();
        return s.value && (s.value = n(s.value)), s;
      })),
    o
  );
}
const Lc = Array.prototype;
function dt(e, t, n, r, o, s) {
  const i = Er(e),
    l = i !== e && !Ge(e),
    c = i[t];
  if (c !== Lc[t]) {
    const f = c.apply(e, s);
    return l ? Oe(f) : f;
  }
  let a = n;
  i !== e &&
    (l
      ? (a = function (f, h) {
          return n.call(this, Oe(f), h, e);
        })
      : n.length > 2 &&
        (a = function (f, h) {
          return n.call(this, f, h, e);
        }));
  const u = c.call(i, a, r);
  return l && o ? o(u) : u;
}
function ts(e, t, n, r) {
  const o = Er(e);
  let s = n;
  return (
    o !== e &&
      (Ge(e)
        ? n.length > 3 &&
          (s = function (i, l, c) {
            return n.call(this, i, l, c, e);
          })
        : (s = function (i, l, c) {
            return n.call(this, i, Oe(l), c, e);
          })),
    o[t](s, ...r)
  );
}
function Hr(e, t, n) {
  const r = ne(e);
  Ie(r, "iterate", Dn);
  const o = r[t](...n);
  return (o === -1 || o === !1) && Lo(n[0]) ? ((n[0] = ne(n[0])), r[t](...n)) : o;
}
function gn(e, t, n = []) {
  Ft(), Ao();
  const r = ne(e)[t].apply(e, n);
  return Po(), Bt(), r;
}
const Dc = bo("__proto__,__v_isRef,__isVue"),
  Li = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Dt)
  );
function Mc(e) {
  Dt(e) || (e = String(e));
  const t = ne(this);
  return Ie(t, "has", e), t.hasOwnProperty(e);
}
class Di {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._isShallow = n);
  }
  get(t, n, r) {
    const o = this._isReadonly,
      s = this._isShallow;
    if (n === "__v_isReactive") return !o;
    if (n === "__v_isReadonly") return o;
    if (n === "__v_isShallow") return s;
    if (n === "__v_raw") return r === (o ? (s ? qc : Ni) : s ? Bi : Fi).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = W(t);
    if (!o) {
      let c;
      if (i && (c = $c[n])) return c;
      if (n === "hasOwnProperty") return Mc;
    }
    const l = Reflect.get(t, n, Pe(t) ? t : r);
    return (Dt(n) ? Li.has(n) : Dc(n)) || (o || Ie(t, "get", n), s) ? l : Pe(l) ? (i && Eo(n) ? l : l.value) : ge(l) ? (o ? Hi(l) : Ke(l)) : l;
  }
}
class Mi extends Di {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, o) {
    let s = t[n];
    if (!this._isShallow) {
      const c = Yt(s);
      if ((!Ge(r) && !Yt(r) && ((s = ne(s)), (r = ne(r))), !W(t) && Pe(s) && !Pe(r))) return c ? !1 : ((s.value = r), !0);
    }
    const i = W(t) && Eo(n) ? Number(n) < t.length : ie(t, n),
      l = Reflect.set(t, n, r, Pe(t) ? t : o);
    return t === ne(o) && (i ? It(r, s) && vt(t, "set", n, r) : vt(t, "add", n, r)), l;
  }
  deleteProperty(t, n) {
    const r = ie(t, n);
    t[n];
    const o = Reflect.deleteProperty(t, n);
    return o && r && vt(t, "delete", n, void 0), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Dt(n) || !Li.has(n)) && Ie(t, "has", n), r;
  }
  ownKeys(t) {
    return Ie(t, "iterate", W(t) ? "length" : Kt), Reflect.ownKeys(t);
  }
}
class Fc extends Di {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Bc = new Mi(),
  Nc = new Fc(),
  kc = new Mi(!0);
const Oo = (e) => e,
  xr = (e) => Reflect.getPrototypeOf(e);
function Wn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = ne(e),
    s = ne(t);
  n || (It(t, s) && Ie(o, "get", t), Ie(o, "get", s));
  const { has: i } = xr(o),
    l = r ? Oo : n ? Do : Oe;
  if (i.call(o, t)) return l(e.get(t));
  if (i.call(o, s)) return l(e.get(s));
  e !== o && e.get(t);
}
function Yn(e, t = !1) {
  const n = this.__v_raw,
    r = ne(n),
    o = ne(e);
  return t || (It(e, o) && Ie(r, "has", e), Ie(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function qn(e, t = !1) {
  return (e = e.__v_raw), !t && Ie(ne(e), "iterate", Kt), Reflect.get(e, "size", e);
}
function ns(e, t = !1) {
  !t && !Ge(e) && !Yt(e) && (e = ne(e));
  const n = ne(this);
  return xr(n).has.call(n, e) || (n.add(e), vt(n, "add", e, e)), this;
}
function rs(e, t, n = !1) {
  !n && !Ge(t) && !Yt(t) && (t = ne(t));
  const r = ne(this),
    { has: o, get: s } = xr(r);
  let i = o.call(r, e);
  i || ((e = ne(e)), (i = o.call(r, e)));
  const l = s.call(r, e);
  return r.set(e, t), i ? It(t, l) && vt(r, "set", e, t) : vt(r, "add", e, t), this;
}
function os(e) {
  const t = ne(this),
    { has: n, get: r } = xr(t);
  let o = n.call(t, e);
  o || ((e = ne(e)), (o = n.call(t, e))), r && r.call(t, e);
  const s = t.delete(e);
  return o && vt(t, "delete", e, void 0), s;
}
function ss() {
  const e = ne(this),
    t = e.size !== 0,
    n = e.clear();
  return t && vt(e, "clear", void 0, void 0), n;
}
function Gn(e, t) {
  return function (r, o) {
    const s = this,
      i = s.__v_raw,
      l = ne(i),
      c = t ? Oo : e ? Do : Oe;
    return !e && Ie(l, "iterate", Kt), i.forEach((a, u) => r.call(o, c(a), c(u), s));
  };
}
function Xn(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = ne(o),
      i = rn(s),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      a = o[e](...r),
      u = n ? Oo : t ? Do : Oe;
    return (
      !t && Ie(s, "iterate", c ? oo : Kt),
      {
        next() {
          const { value: f, done: h } = a.next();
          return h ? { value: f, done: h } : { value: l ? [u(f[0]), u(f[1])] : u(f), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function _t(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Hc() {
  const e = {
      get(s) {
        return Wn(this, s);
      },
      get size() {
        return qn(this);
      },
      has: Yn,
      add: ns,
      set: rs,
      delete: os,
      clear: ss,
      forEach: Gn(!1, !1),
    },
    t = {
      get(s) {
        return Wn(this, s, !1, !0);
      },
      get size() {
        return qn(this);
      },
      has: Yn,
      add(s) {
        return ns.call(this, s, !0);
      },
      set(s, i) {
        return rs.call(this, s, i, !0);
      },
      delete: os,
      clear: ss,
      forEach: Gn(!1, !0),
    },
    n = {
      get(s) {
        return Wn(this, s, !0);
      },
      get size() {
        return qn(this, !0);
      },
      has(s) {
        return Yn.call(this, s, !0);
      },
      add: _t("add"),
      set: _t("set"),
      delete: _t("delete"),
      clear: _t("clear"),
      forEach: Gn(!0, !1),
    },
    r = {
      get(s) {
        return Wn(this, s, !0, !0);
      },
      get size() {
        return qn(this, !0);
      },
      has(s) {
        return Yn.call(this, s, !0);
      },
      add: _t("add"),
      set: _t("set"),
      delete: _t("delete"),
      clear: _t("clear"),
      forEach: Gn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (e[s] = Xn(s, !1, !1)), (n[s] = Xn(s, !0, !1)), (t[s] = Xn(s, !1, !0)), (r[s] = Xn(s, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [jc, zc, Vc, Uc] = Hc();
function Io(e, t) {
  const n = t ? (e ? Uc : Vc) : e ? zc : jc;
  return (r, o, s) =>
    o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(ie(n, o) && o in r ? n : r, o, s);
}
const Kc = { get: Io(!1, !1) },
  Wc = { get: Io(!1, !0) },
  Yc = { get: Io(!0, !1) };
const Fi = new WeakMap(),
  Bi = new WeakMap(),
  Ni = new WeakMap(),
  qc = new WeakMap();
function Gc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Xc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Gc(vc(e));
}
function Ke(e) {
  return Yt(e) ? e : $o(e, !1, Bc, Kc, Fi);
}
function ki(e) {
  return $o(e, !1, kc, Wc, Bi);
}
function Hi(e) {
  return $o(e, !0, Nc, Yc, Ni);
}
function $o(e, t, n, r, o) {
  if (!ge(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = o.get(e);
  if (s) return s;
  const i = Xc(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return o.set(e, l), l;
}
function on(e) {
  return Yt(e) ? on(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Yt(e) {
  return !!(e && e.__v_isReadonly);
}
function Ge(e) {
  return !!(e && e.__v_isShallow);
}
function Lo(e) {
  return e ? !!e.__v_raw : !1;
}
function ne(e) {
  const t = e && e.__v_raw;
  return t ? ne(t) : e;
}
function Zc(e) {
  return !ie(e, "__v_skip") && Object.isExtensible(e) && wi(e, "__v_skip", !0), e;
}
const Oe = (e) => (ge(e) ? Ke(e) : e),
  Do = (e) => (ge(e) ? Hi(e) : e);
function Pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function pe(e) {
  return ji(e, !1);
}
function Jc(e) {
  return ji(e, !0);
}
function ji(e, t) {
  return Pe(e) ? e : new Qc(e, t);
}
class Qc {
  constructor(t, n) {
    (this.dep = new Ro()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : ne(t)),
      (this._value = n ? t : Oe(t)),
      (this.__v_isShallow = n);
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue,
      r = this.__v_isShallow || Ge(t) || Yt(t);
    (t = r ? t : ne(t)), It(t, n) && ((this._rawValue = t), (this._value = r ? t : Oe(t)), this.dep.trigger());
  }
}
function ut(e) {
  return Pe(e) ? e.value : e;
}
const ea = {
  get: (e, t, n) => (t === "__v_raw" ? e : ut(Reflect.get(e, t, n))),
  set: (e, t, n, r) => {
    const o = e[t];
    return Pe(o) && !Pe(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function zi(e) {
  return on(e) ? e : new Proxy(e, ea);
}
class ta {
  constructor(t, n, r) {
    (this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new Ro(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Ln - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = r);
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && de !== this)) return Pi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Oi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function na(e, t, n = !1) {
  let r, o;
  return G(e) ? (r = e) : ((r = e.get), (o = e.set)), new ta(r, o, n);
}
const Zn = {},
  ar = new WeakMap();
let Vt;
function ra(e, t = !1, n = Vt) {
  if (n) {
    let r = ar.get(n);
    r || ar.set(n, (r = [])), r.push(e);
  }
}
function oa(e, t, n = ae) {
  const { immediate: r, deep: o, once: s, scheduler: i, augmentJob: l, call: c } = n,
    a = (v) => (o ? v : Ge(v) || o === !1 || o === 0 ? gt(v, 1) : gt(v));
  let u,
    f,
    h,
    g,
    y = !1,
    b = !1;
  if (
    (Pe(e)
      ? ((f = () => e.value), (y = Ge(e)))
      : on(e)
      ? ((f = () => a(e)), (y = !0))
      : W(e)
      ? ((b = !0),
        (y = e.some((v) => on(v) || Ge(v))),
        (f = () =>
          e.map((v) => {
            if (Pe(v)) return v.value;
            if (on(v)) return a(v);
            if (G(v)) return c ? c(v, 2) : v();
          })))
      : G(e)
      ? t
        ? (f = c ? () => c(e, 2) : e)
        : (f = () => {
            if (h) {
              Ft();
              try {
                h();
              } finally {
                Bt();
              }
            }
            const v = Vt;
            Vt = u;
            try {
              return c ? c(e, 3, [g]) : e(g);
            } finally {
              Vt = v;
            }
          })
      : (f = et),
    t && o)
  ) {
    const v = f,
      T = o === !0 ? 1 / 0 : o;
    f = () => gt(v(), T);
  }
  const P = Rc(),
    R = () => {
      u.stop(), P && wo(P.effects, u);
    };
  if (s && t) {
    const v = t;
    t = (...T) => {
      v(...T), R();
    };
  }
  let S = b ? new Array(e.length).fill(Zn) : Zn;
  const $ = (v) => {
    if (!(!(u.flags & 1) || (!u.dirty && !v)))
      if (t) {
        const T = u.run();
        if (o || y || (b ? T.some((H, j) => It(H, S[j])) : It(T, S))) {
          h && h();
          const H = Vt;
          Vt = u;
          try {
            const j = [T, S === Zn ? void 0 : b && S[0] === Zn ? [] : S, g];
            c ? c(t, 3, j) : t(...j), (S = T);
          } finally {
            Vt = H;
          }
        }
      } else u.run();
  };
  return (
    l && l($),
    (u = new Ci(f)),
    (u.scheduler = i ? () => i($, !1) : $),
    (g = (v) => ra(v, !1, u)),
    (h = u.onStop =
      () => {
        const v = ar.get(u);
        if (v) {
          if (c) c(v, 4);
          else for (const T of v) T();
          ar.delete(u);
        }
      }),
    t ? (r ? $(!0) : (S = u.run())) : i ? i($.bind(null, !0), !0) : u.run(),
    (R.pause = u.pause.bind(u)),
    (R.resume = u.resume.bind(u)),
    (R.stop = R),
    R
  );
}
function gt(e, t = 1 / 0, n) {
  if (t <= 0 || !ge(e) || e.__v_skip || ((n = n || new Set()), n.has(e))) return e;
  if ((n.add(e), t--, Pe(e))) gt(e.value, t, n);
  else if (W(e)) for (let r = 0; r < e.length; r++) gt(e[r], t, n);
  else if (vi(e) || rn(e))
    e.forEach((r) => {
      gt(r, t, n);
    });
  else if (_i(e)) {
    for (const r in e) gt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && gt(e[r], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.11
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function zn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (o) {
    Sr(o, t, n);
  }
}
function nt(e, t, n, r) {
  if (G(e)) {
    const o = zn(e, t, n, r);
    return (
      o &&
        yi(o) &&
        o.catch((s) => {
          Sr(s, t, n);
        }),
      o
    );
  }
  if (W(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++) o.push(nt(e[s], t, n, r));
    return o;
  }
}
function Sr(e, t, n, r = !0) {
  const o = t ? t.vnode : null,
    { errorHandler: s, throwUnhandledErrorInProduction: i } = (t && t.appContext.config) || ae;
  if (t) {
    let l = t.parent;
    const c = t.proxy,
      a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, c, a) === !1) return;
      }
      l = l.parent;
    }
    if (s) {
      Ft(), zn(s, null, 10, [e, c, a]), Bt();
      return;
    }
  }
  sa(e, n, o, r, i);
}
function sa(e, t, n, r = !0, o = !1) {
  if (o) throw e;
  console.error(e);
}
const Me = [];
let ct = -1;
const sn = [];
let Ct = null,
  Qt = 0;
const Vi = Promise.resolve();
let ur = null;
function Nt(e) {
  const t = ur || Vi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ia(e) {
  let t = ct + 1,
    n = Me.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      o = Me[r],
      s = Mn(o);
    s < e || (s === e && o.flags & 2) ? (t = r + 1) : (n = r);
  }
  return t;
}
function Mo(e) {
  if (!(e.flags & 1)) {
    const t = Mn(e),
      n = Me[Me.length - 1];
    !n || (!(e.flags & 2) && t >= Mn(n)) ? Me.push(e) : Me.splice(ia(t), 0, e), (e.flags |= 1), Ui();
  }
}
function Ui() {
  ur || (ur = Vi.then(Wi));
}
function la(e) {
  W(e) ? sn.push(...e) : Ct && e.id === -1 ? Ct.splice(Qt + 1, 0, e) : e.flags & 1 || (sn.push(e), (e.flags |= 1)), Ui();
}
function is(e, t, n = ct + 1) {
  for (; n < Me.length; n++) {
    const r = Me[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      Me.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function Ki(e) {
  if (sn.length) {
    const t = [...new Set(sn)].sort((n, r) => Mn(n) - Mn(r));
    if (((sn.length = 0), Ct)) {
      Ct.push(...t);
      return;
    }
    for (Ct = t, Qt = 0; Qt < Ct.length; Qt++) {
      const n = Ct[Qt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2);
    }
    (Ct = null), (Qt = 0);
  }
}
const Mn = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Wi(e) {
  const t = et;
  try {
    for (ct = 0; ct < Me.length; ct++) {
      const n = Me[ct];
      n && !(n.flags & 8) && (n.flags & 4 && (n.flags &= -2), zn(n, n.i, n.i ? 15 : 14), n.flags & 4 || (n.flags &= -2));
    }
  } finally {
    for (; ct < Me.length; ct++) {
      const n = Me[ct];
      n && (n.flags &= -2);
    }
    (ct = -1), (Me.length = 0), Ki(), (ur = null), (Me.length || sn.length) && Wi();
  }
}
let Ne = null,
  Yi = null;
function fr(e) {
  const t = Ne;
  return (Ne = e), (Yi = (e && e.type.__scopeId) || null), t;
}
function ca(e, t = Ne, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && ys(-1);
    const s = fr(t);
    let i;
    try {
      i = e(...o);
    } finally {
      fr(s), r._d && ys(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Fo(e, t) {
  if (Ne === null) return e;
  const n = $r(Ne),
    r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [s, i, l, c = ae] = t[o];
    s &&
      (G(s) && (s = { mounted: s, updated: s }), s.deep && gt(i), r.push({ dir: s, instance: n, value: i, oldValue: void 0, arg: l, modifiers: c }));
  }
  return e;
}
function kt(e, t, n, r) {
  const o = e.dirs,
    s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let c = l.dir[r];
    c && (Ft(), nt(c, n, 8, [e.el, l, e, t]), Bt());
  }
}
const qi = Symbol("_vte"),
  Gi = (e) => e.__isTeleport,
  An = (e) => e && (e.disabled || e.disabled === ""),
  aa = (e) => e && (e.defer || e.defer === ""),
  ls = (e) => typeof SVGElement != "undefined" && e instanceof SVGElement,
  cs = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement,
  so = (e, t) => {
    const n = e && e.to;
    return ve(n) ? (t ? t(n) : null) : n;
  },
  ua = {
    name: "Teleport",
    __isTeleport: !0,
    process(e, t, n, r, o, s, i, l, c, a) {
      const {
          mc: u,
          pc: f,
          pbc: h,
          o: { insert: g, querySelector: y, createText: b, createComment: P },
        } = a,
        R = An(t.props);
      let { shapeFlag: S, children: $, dynamicChildren: v } = t;
      if (e == null) {
        const T = (t.el = b("")),
          H = (t.anchor = b(""));
        g(T, n, r), g(H, n, r);
        const j = (w, N) => {
            S & 16 && (o && o.isCE && (o.ce._teleportTarget = w), u($, w, N, o, s, i, l, c));
          },
          Z = () => {
            const w = (t.target = so(t.props, y)),
              N = Xi(w, t, b, g);
            w && (i !== "svg" && ls(w) ? (i = "svg") : i !== "mathml" && cs(w) && (i = "mathml"), R || (j(w, N), sr(t)));
          };
        R && (j(n, H), sr(t)), aa(t.props) ? Fe(Z, s) : Z();
      } else {
        (t.el = e.el), (t.targetStart = e.targetStart);
        const T = (t.anchor = e.anchor),
          H = (t.target = e.target),
          j = (t.targetAnchor = e.targetAnchor),
          Z = An(e.props),
          w = Z ? n : H,
          N = Z ? T : j;
        if (
          (i === "svg" || ls(H) ? (i = "svg") : (i === "mathml" || cs(H)) && (i = "mathml"),
          v ? (h(e.dynamicChildren, v, w, o, s, i, l), ko(e, t, !0)) : c || f(e, t, w, N, o, s, i, l, !1),
          R)
        )
          Z ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Jn(t, n, T, a, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const V = (t.target = so(t.props, y));
          V && Jn(t, V, null, a, 0);
        } else Z && Jn(t, H, j, a, 1);
        sr(t);
      }
    },
    remove(e, t, n, { um: r, o: { remove: o } }, s) {
      const { shapeFlag: i, children: l, anchor: c, targetStart: a, targetAnchor: u, target: f, props: h } = e;
      if ((f && (o(a), o(u)), s && o(c), i & 16)) {
        const g = s || !An(h);
        for (let y = 0; y < l.length; y++) {
          const b = l[y];
          r(b, t, n, g, !!b.dynamicChildren);
        }
      }
    },
    move: Jn,
    hydrate: fa,
  };
function Jn(e, t, n, { o: { insert: r }, m: o }, s = 2) {
  s === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: l, shapeFlag: c, children: a, props: u } = e,
    f = s === 2;
  if ((f && r(i, t, n), (!f || An(u)) && c & 16)) for (let h = 0; h < a.length; h++) o(a[h], t, n, 2);
  f && r(l, t, n);
}
function fa(e, t, n, r, o, s, { o: { nextSibling: i, parentNode: l, querySelector: c, insert: a, createText: u } }, f) {
  const h = (t.target = so(t.props, c));
  if (h) {
    const g = h._lpa || h.firstChild;
    if (t.shapeFlag & 16)
      if (An(t.props)) (t.anchor = f(i(e), t, l(e), n, r, o, s)), (t.targetStart = g), (t.targetAnchor = g && i(g));
      else {
        t.anchor = i(e);
        let y = g;
        for (; y; ) {
          if (y && y.nodeType === 8) {
            if (y.data === "teleport start anchor") t.targetStart = y;
            else if (y.data === "teleport anchor") {
              (t.targetAnchor = y), (h._lpa = t.targetAnchor && i(t.targetAnchor));
              break;
            }
          }
          y = i(y);
        }
        t.targetAnchor || Xi(h, t, u, a), f(g && i(g), t, h, n, r, o, s);
      }
    sr(t);
  }
  return t.anchor && i(t.anchor);
}
const da = ua;
function sr(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.targetStart;
    for (; n && n !== e.targetAnchor; ) n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), (n = n.nextSibling);
    t.ut();
  }
}
function Xi(e, t, n, r) {
  const o = (t.targetStart = n("")),
    s = (t.targetAnchor = n(""));
  return (o[qi] = s), e && (r(o, e), r(s, e)), s;
}
const At = Symbol("_leaveCb"),
  Qn = Symbol("_enterCb");
function ha() {
  const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
  return (
    qt(() => {
      e.isMounted = !0;
    }),
    fn(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ye = [Function, Array],
  Zi = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Ye,
    onEnter: Ye,
    onAfterEnter: Ye,
    onEnterCancelled: Ye,
    onBeforeLeave: Ye,
    onLeave: Ye,
    onAfterLeave: Ye,
    onLeaveCancelled: Ye,
    onBeforeAppear: Ye,
    onAppear: Ye,
    onAfterAppear: Ye,
    onAppearCancelled: Ye,
  },
  Ji = (e) => {
    const t = e.subTree;
    return t.component ? Ji(t.component) : t;
  },
  pa = {
    name: "BaseTransition",
    props: Zi,
    setup(e, { slots: t }) {
      const n = dn(),
        r = ha();
      return () => {
        const o = t.default && tl(t.default(), !0);
        if (!o || !o.length) return;
        const s = Qi(o),
          i = ne(e),
          { mode: l } = i;
        if (r.isLeaving) return jr(s);
        const c = as(s);
        if (!c) return jr(s);
        let a = io(c, i, r, n, (h) => (a = h));
        c.type !== Be && Fn(c, a);
        const u = n.subTree,
          f = u && as(u);
        if (f && f.type !== Be && !Ut(c, f) && Ji(n).type !== Be) {
          const h = io(f, i, r, n);
          if ((Fn(f, h), l === "out-in" && c.type !== Be))
            return (
              (r.isLeaving = !0),
              (h.afterLeave = () => {
                (r.isLeaving = !1), n.job.flags & 8 || n.update(), delete h.afterLeave;
              }),
              jr(s)
            );
          l === "in-out" &&
            c.type !== Be &&
            (h.delayLeave = (g, y, b) => {
              const P = el(r, f);
              (P[String(f.key)] = f),
                (g[At] = () => {
                  y(), (g[At] = void 0), delete a.delayedLeave;
                }),
                (a.delayedLeave = b);
            });
        }
        return s;
      };
    },
  };
function Qi(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Be) {
        t = n;
        break;
      }
  }
  return t;
}
const ga = pa;
function el(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function io(e, t, n, r, o) {
  const {
      appear: s,
      mode: i,
      persisted: l = !1,
      onBeforeEnter: c,
      onEnter: a,
      onAfterEnter: u,
      onEnterCancelled: f,
      onBeforeLeave: h,
      onLeave: g,
      onAfterLeave: y,
      onLeaveCancelled: b,
      onBeforeAppear: P,
      onAppear: R,
      onAfterAppear: S,
      onAppearCancelled: $,
    } = t,
    v = String(e.key),
    T = el(n, e),
    H = (w, N) => {
      w && nt(w, r, 9, N);
    },
    j = (w, N) => {
      const V = N[1];
      H(w, N), W(w) ? w.every((D) => D.length <= 1) && V() : w.length <= 1 && V();
    },
    Z = {
      mode: i,
      persisted: l,
      beforeEnter(w) {
        let N = c;
        if (!n.isMounted)
          if (s) N = P || c;
          else return;
        w[At] && w[At](!0);
        const V = T[v];
        V && Ut(e, V) && V.el[At] && V.el[At](), H(N, [w]);
      },
      enter(w) {
        let N = a,
          V = u,
          D = f;
        if (!n.isMounted)
          if (s) (N = R || a), (V = S || u), (D = $ || f);
          else return;
        let X = !1;
        const he = (w[Qn] = (Le) => {
          X || ((X = !0), Le ? H(D, [w]) : H(V, [w]), Z.delayedLeave && Z.delayedLeave(), (w[Qn] = void 0));
        });
        N ? j(N, [w, he]) : he();
      },
      leave(w, N) {
        const V = String(e.key);
        if ((w[Qn] && w[Qn](!0), n.isUnmounting)) return N();
        H(h, [w]);
        let D = !1;
        const X = (w[At] = (he) => {
          D || ((D = !0), N(), he ? H(b, [w]) : H(y, [w]), (w[At] = void 0), T[V] === e && delete T[V]);
        });
        (T[V] = e), g ? j(g, [w, X]) : X();
      },
      clone(w) {
        const N = io(w, t, n, r, o);
        return o && o(N), N;
      },
    };
  return Z;
}
function jr(e) {
  if (Cr(e)) return (e = $t(e)), (e.children = null), e;
}
function as(e) {
  if (!Cr(e)) return Gi(e.type) && e.children ? Qi(e.children) : e;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && G(n.default)) return n.default();
  }
}
function Fn(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), Fn(e.component.subTree, t))
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function tl(e, t = !1, n) {
  let r = [],
    o = 0;
  for (let s = 0; s < e.length; s++) {
    let i = e[s];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
    i.type === Qe
      ? (i.patchFlag & 128 && o++, (r = r.concat(tl(i.children, t, l))))
      : (t || i.type !== Be) && r.push(l != null ? $t(i, { key: l }) : i);
  }
  if (o > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */ function $e(e, t) {
  return G(e) ? (() => Ce({ name: e.name }, t, { setup: e }))() : e;
}
function nl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function lo(e, t, n, r, o = !1) {
  if (W(e)) {
    e.forEach((y, b) => lo(y, t && (W(t) ? t[b] : t), n, r, o));
    return;
  }
  if (Pn(r) && !o) return;
  const s = r.shapeFlag & 4 ? $r(r.component) : r.el,
    i = o ? null : s,
    { i: l, r: c } = e,
    a = t && t.r,
    u = l.refs === ae ? (l.refs = {}) : l.refs,
    f = l.setupState,
    h = ne(f),
    g = f === ae ? () => !1 : (y) => ie(h, y);
  if ((a != null && a !== c && (ve(a) ? ((u[a] = null), g(a) && (f[a] = null)) : Pe(a) && (a.value = null)), G(c))) zn(c, l, 12, [i, u]);
  else {
    const y = ve(c),
      b = Pe(c);
    if (y || b) {
      const P = () => {
        if (e.f) {
          const R = y ? (g(c) ? f[c] : u[c]) : c.value;
          o
            ? W(R) && wo(R, s)
            : W(R)
            ? R.includes(s) || R.push(s)
            : y
            ? ((u[c] = [s]), g(c) && (f[c] = u[c]))
            : ((c.value = [s]), e.k && (u[e.k] = c.value));
        } else y ? ((u[c] = i), g(c) && (f[c] = i)) : b && ((c.value = i), e.k && (u[e.k] = i));
      };
      i ? ((P.id = -1), Fe(P, n)) : P();
    }
  }
}
const Pn = (e) => !!e.type.__asyncLoader,
  Cr = (e) => e.type.__isKeepAlive;
function Ar(e, t) {
  rl(e, "a", t);
}
function Vn(e, t) {
  rl(e, "da", t);
}
function rl(e, t, n = Ae) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((Pr(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; ) Cr(o.parent.vnode) && ma(r, t, n, o), (o = o.parent);
  }
}
function ma(e, t, n, r) {
  const o = Pr(t, e, r, !0);
  Tr(() => {
    wo(r[t], o);
  }, n);
}
function Pr(e, t, n = Ae, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...i) => {
          Ft();
          const l = Un(n),
            c = nt(t, n, e, i);
          return l(), Bt(), c;
        });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const bt =
    (e) =>
    (t, n = Ae) => {
      (!Ir || e === "sp") && Pr(e, (...r) => t(...r), n);
    },
  va = bt("bm"),
  qt = bt("m"),
  ya = bt("bu"),
  ba = bt("u"),
  fn = bt("bum"),
  Tr = bt("um"),
  _a = bt("sp"),
  wa = bt("rtg"),
  Ea = bt("rtc");
function xa(e, t = Ae) {
  Pr("ec", e, t);
}
const ol = "components",
  Sa = "directives";
function Ca(e, t) {
  return sl(ol, e, !0, t) || e;
}
const Aa = Symbol.for("v-ndc");
function Pa(e) {
  return sl(Sa, e);
}
function sl(e, t, n = !0, r = !1) {
  const o = Ne || Ae;
  if (o) {
    const s = o.type;
    if (e === ol) {
      const l = vu(s, !1);
      if (l && (l === t || l === Xe(t) || l === wr(Xe(t)))) return s;
    }
    const i = us(o[e] || s[e], t) || us(o.appContext[e], t);
    return !i && r ? s : i;
  }
}
function us(e, t) {
  return e && (e[t] || e[Xe(t)] || e[wr(Xe(t))]);
}
function Kh(e, t, n, r) {
  let o;
  const s = n && n[r],
    i = W(e);
  if (i || ve(e)) {
    const l = i && on(e);
    let c = !1;
    l && ((c = !Ge(e)), (e = Er(e))), (o = new Array(e.length));
    for (let a = 0, u = e.length; a < u; a++) o[a] = t(c ? Oe(e[a]) : e[a], a, void 0, s && s[a]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++) o[l] = t(l + 1, l, void 0, s && s[l]);
  } else if (ge(e))
    if (e[Symbol.iterator]) o = Array.from(e, (l, c) => t(l, c, void 0, s && s[c]));
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, a = l.length; c < a; c++) {
        const u = l[c];
        o[c] = t(e[u], u, c, s && s[c]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
const co = (e) => (e ? (Cl(e) ? $r(e) : co(e.parent)) : null),
  Tn = Ce(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => co(e.parent),
    $root: (e) => co(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Bo(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        Mo(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Nt.bind(e.proxy)),
    $watch: (e) => Xa.bind(e),
  }),
  zr = (e, t) => e !== ae && !e.__isScriptSetup && ie(e, t),
  Ta = {
    get({ _: e }, t) {
      if (t === "__v_skip") return !0;
      const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: c } = e;
      let a;
      if (t[0] !== "$") {
        const g = i[t];
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (zr(r, t)) return (i[t] = 1), r[t];
          if (o !== ae && ie(o, t)) return (i[t] = 2), o[t];
          if ((a = e.propsOptions[0]) && ie(a, t)) return (i[t] = 3), s[t];
          if (n !== ae && ie(n, t)) return (i[t] = 4), n[t];
          ao && (i[t] = 0);
        }
      }
      const u = Tn[t];
      let f, h;
      if (u) return t === "$attrs" && Ie(e.attrs, "get", ""), u(e);
      if ((f = l.__cssModules) && (f = f[t])) return f;
      if (n !== ae && ie(n, t)) return (i[t] = 4), n[t];
      if (((h = c.config.globalProperties), ie(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: s } = e;
      return zr(o, t)
        ? ((o[t] = n), !0)
        : r !== ae && ie(r, t)
        ? ((r[t] = n), !0)
        : ie(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((s[t] = n), !0);
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s } }, i) {
      let l;
      return !!n[i] || (e !== ae && ie(e, i)) || zr(t, i) || ((l = s[0]) && ie(l, i)) || ie(r, i) || ie(Tn, i) || ie(o.config.globalProperties, i);
    },
    defineProperty(e, t, n) {
      return n.get != null ? (e._.accessCache[t] = 0) : ie(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
    },
  };
function fs(e) {
  return W(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let ao = !0;
function Ra(e) {
  const t = Bo(e),
    n = e.proxy,
    r = e.ctx;
  (ao = !1), t.beforeCreate && ds(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    created: u,
    beforeMount: f,
    mounted: h,
    beforeUpdate: g,
    updated: y,
    activated: b,
    deactivated: P,
    beforeDestroy: R,
    beforeUnmount: S,
    destroyed: $,
    unmounted: v,
    render: T,
    renderTracked: H,
    renderTriggered: j,
    errorCaptured: Z,
    serverPrefetch: w,
    expose: N,
    inheritAttrs: V,
    components: D,
    directives: X,
    filters: he,
  } = t;
  if ((a && Oa(a, r, null), i))
    for (const re in i) {
      const te = i[re];
      G(te) && (r[re] = te.bind(n));
    }
  if (o) {
    const re = o.call(n, n);
    ge(re) && (e.data = Ke(re));
  }
  if (((ao = !0), s))
    for (const re in s) {
      const te = s[re],
        Ze = G(te) ? te.bind(n, n) : G(te.get) ? te.get.bind(n, n) : et,
        Y = !G(te) && G(te.set) ? te.set.bind(n) : et,
        oe = ee({ get: Ze, set: Y });
      Object.defineProperty(r, re, { enumerable: !0, configurable: !0, get: () => oe.value, set: (J) => (oe.value = J) });
    }
  if (l) for (const re in l) il(l[re], r, n, re);
  if (c) {
    const re = G(c) ? c.call(n) : c;
    Reflect.ownKeys(re).forEach((te) => {
      Wt(te, re[te]);
    });
  }
  u && ds(u, e, "c");
  function ue(re, te) {
    W(te) ? te.forEach((Ze) => re(Ze.bind(n))) : te && re(te.bind(n));
  }
  if ((ue(va, f), ue(qt, h), ue(ya, g), ue(ba, y), ue(Ar, b), ue(Vn, P), ue(xa, Z), ue(Ea, H), ue(wa, j), ue(fn, S), ue(Tr, v), ue(_a, w), W(N)))
    if (N.length) {
      const re = e.exposed || (e.exposed = {});
      N.forEach((te) => {
        Object.defineProperty(re, te, { get: () => n[te], set: (Ze) => (n[te] = Ze) });
      });
    } else e.exposed || (e.exposed = {});
  T && e.render === et && (e.render = T), V != null && (e.inheritAttrs = V), D && (e.components = D), X && (e.directives = X), w && nl(e);
}
function Oa(e, t, n = et) {
  W(e) && (e = uo(e));
  for (const r in e) {
    const o = e[r];
    let s;
    ge(o) ? ("default" in o ? (s = ke(o.from || r, o.default, !0)) : (s = ke(o.from || r))) : (s = ke(o)),
      Pe(s) ? Object.defineProperty(t, r, { enumerable: !0, configurable: !0, get: () => s.value, set: (i) => (s.value = i) }) : (t[r] = s);
  }
}
function ds(e, t, n) {
  nt(W(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function il(e, t, n, r) {
  let o = r.includes(".") ? yl(n, r) : () => n[r];
  if (ve(e)) {
    const s = t[e];
    G(s) && ye(o, s);
  } else if (G(e)) ye(o, e.bind(n));
  else if (ge(e))
    if (W(e)) e.forEach((s) => il(s, t, n, r));
    else {
      const s = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(s) && ye(o, s, e);
    }
}
function Bo(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = s.get(t);
  let c;
  return (
    l ? (c = l) : !o.length && !n && !r ? (c = t) : ((c = {}), o.length && o.forEach((a) => dr(c, a, i, !0)), dr(c, t, i)), ge(t) && s.set(t, c), c
  );
}
function dr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && dr(e, s, n, !0), o && o.forEach((i) => dr(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = Ia[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Ia = {
  data: hs,
  props: ps,
  emits: ps,
  methods: _n,
  computed: _n,
  beforeCreate: De,
  created: De,
  beforeMount: De,
  mounted: De,
  beforeUpdate: De,
  updated: De,
  beforeDestroy: De,
  beforeUnmount: De,
  destroyed: De,
  unmounted: De,
  activated: De,
  deactivated: De,
  errorCaptured: De,
  serverPrefetch: De,
  components: _n,
  directives: _n,
  watch: La,
  provide: hs,
  inject: $a,
};
function hs(e, t) {
  return t
    ? e
      ? function () {
          return Ce(G(e) ? e.call(this, this) : e, G(t) ? t.call(this, this) : t);
        }
      : t
    : e;
}
function $a(e, t) {
  return _n(uo(e), uo(t));
}
function uo(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function De(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function _n(e, t) {
  return e ? Ce(Object.create(null), e, t) : t;
}
function ps(e, t) {
  return e ? (W(e) && W(t) ? [...new Set([...e, ...t])] : Ce(Object.create(null), fs(e), fs(t != null ? t : {}))) : t;
}
function La(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ce(Object.create(null), e);
  for (const r in t) n[r] = De(e[r], t[r]);
  return n;
}
function ll() {
  return {
    app: null,
    config: {
      isNativeTag: gc,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Da = 0;
function Ma(e, t) {
  return function (r, o = null) {
    G(r) || (r = Ce({}, r)), o != null && !ge(o) && (o = null);
    const s = ll(),
      i = new WeakSet(),
      l = [];
    let c = !1;
    const a = (s.app = {
      _uid: Da++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: bu,
      get config() {
        return s.config;
      },
      set config(u) {},
      use(u, ...f) {
        return i.has(u) || (u && G(u.install) ? (i.add(u), u.install(a, ...f)) : G(u) && (i.add(u), u(a, ...f))), a;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), a;
      },
      component(u, f) {
        return f ? ((s.components[u] = f), a) : s.components[u];
      },
      directive(u, f) {
        return f ? ((s.directives[u] = f), a) : s.directives[u];
      },
      mount(u, f, h) {
        if (!c) {
          const g = a._ceVNode || O(r, o);
          return (
            (g.appContext = s),
            h === !0 ? (h = "svg") : h === !1 && (h = void 0),
            f && t ? t(g, u) : e(g, u, h),
            (c = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            $r(g.component)
          );
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c && (nt(l, a._instance, 16), e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, f) {
        return (s.provides[u] = f), a;
      },
      runWithContext(u) {
        const f = ln;
        ln = a;
        try {
          return u();
        } finally {
          ln = f;
        }
      },
    });
    return a;
  };
}
let ln = null;
function Wt(e, t) {
  if (Ae) {
    let n = Ae.provides;
    const r = Ae.parent && Ae.parent.provides;
    r === n && (n = Ae.provides = Object.create(r)), (n[e] = t);
  }
}
function ke(e, t, n = !1) {
  const r = Ae || Ne;
  if (r || ln) {
    const o = ln ? ln._context.provides : r ? (r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides) : void 0;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && G(t) ? t.call(r && r.proxy) : t;
  }
}
const cl = {},
  al = () => Object.create(cl),
  ul = (e) => Object.getPrototypeOf(e) === cl;
function Fa(e, t, n, r = !1) {
  const o = {},
    s = al();
  (e.propsDefaults = Object.create(null)), fl(e, t, o, s);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = r ? o : ki(o)) : e.type.props ? (e.props = o) : (e.props = s), (e.attrs = s);
}
function Ba(e, t, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: i },
    } = e,
    l = ne(o),
    [c] = e.propsOptions;
  let a = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (Rr(e.emitsOptions, h)) continue;
        const g = t[h];
        if (c)
          if (ie(s, h)) g !== s[h] && ((s[h] = g), (a = !0));
          else {
            const y = Xe(h);
            o[y] = fo(c, l, y, g, e, !1);
          }
        else g !== s[h] && ((s[h] = g), (a = !0));
      }
    }
  } else {
    fl(e, t, o, s) && (a = !0);
    let u;
    for (const f in l)
      (!t || (!ie(t, f) && ((u = Mt(f)) === f || !ie(t, u)))) &&
        (c ? n && (n[f] !== void 0 || n[u] !== void 0) && (o[f] = fo(c, l, f, void 0, e, !0)) : delete o[f]);
    if (s !== l) for (const f in s) (!t || (!ie(t, f) && !0)) && (delete s[f], (a = !0));
  }
  a && vt(e.attrs, "set", "");
}
function fl(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (xn(c)) continue;
      const a = t[c];
      let u;
      o && ie(o, (u = Xe(c)))
        ? !s || !s.includes(u)
          ? (n[u] = a)
          : ((l || (l = {}))[u] = a)
        : Rr(e.emitsOptions, c) || ((!(c in r) || a !== r[c]) && ((r[c] = a), (i = !0)));
    }
  if (s) {
    const c = ne(n),
      a = l || ae;
    for (let u = 0; u < s.length; u++) {
      const f = s[u];
      n[f] = fo(o, c, f, a[f], e, !ie(a, f));
    }
  }
  return i;
}
function fo(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = ie(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && G(c)) {
        const { propsDefaults: a } = o;
        if (n in a) r = a[n];
        else {
          const u = Un(o);
          (r = a[n] = c.call(null, t)), u();
        }
      } else r = c;
      o.ce && o.ce._setProp(n, r);
    }
    i[0] && (s && !l ? (r = !1) : i[1] && (r === "" || r === Mt(n)) && (r = !0));
  }
  return r;
}
const Na = new WeakMap();
function dl(e, t, n = !1) {
  const r = n ? Na : t.propsCache,
    o = r.get(e);
  if (o) return o;
  const s = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!G(e)) {
    const u = (f) => {
      c = !0;
      const [h, g] = dl(f, t, !0);
      Ce(i, h), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !c) return ge(e) && r.set(e, nn), nn;
  if (W(s))
    for (let u = 0; u < s.length; u++) {
      const f = Xe(s[u]);
      gs(f) && (i[f] = ae);
    }
  else if (s)
    for (const u in s) {
      const f = Xe(u);
      if (gs(f)) {
        const h = s[u],
          g = (i[f] = W(h) || G(h) ? { type: h } : Ce({}, h)),
          y = g.type;
        let b = !1,
          P = !0;
        if (W(y))
          for (let R = 0; R < y.length; ++R) {
            const S = y[R],
              $ = G(S) && S.name;
            if ($ === "Boolean") {
              b = !0;
              break;
            } else $ === "String" && (P = !1);
          }
        else b = G(y) && y.name === "Boolean";
        (g[0] = b), (g[1] = P), (b || ie(g, "default")) && l.push(f);
      }
    }
  const a = [i, l];
  return ge(e) && r.set(e, a), a;
}
function gs(e) {
  return e[0] !== "$" && !xn(e);
}
const hl = (e) => e[0] === "_" || e === "$stable",
  No = (e) => (W(e) ? e.map(at) : [at(e)]),
  ka = (e, t, n) => {
    if (t._n) return t;
    const r = ca((...o) => No(t(...o)), n);
    return (r._c = !1), r;
  },
  pl = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (hl(o)) continue;
      const s = e[o];
      if (G(s)) t[o] = ka(o, s, r);
      else if (s != null) {
        const i = No(s);
        t[o] = () => i;
      }
    }
  },
  gl = (e, t) => {
    const n = No(t);
    e.slots.default = () => n;
  },
  ml = (e, t, n) => {
    for (const r in t) (n || r !== "_") && (e[r] = t[r]);
  },
  Ha = (e, t, n) => {
    const r = (e.slots = al());
    if (e.vnode.shapeFlag & 32) {
      const o = t._;
      o ? (ml(r, t, n), n && wi(r, "_", o, !0)) : pl(t, r);
    } else t && gl(e, t);
  },
  ja = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let s = !0,
      i = ae;
    if (r.shapeFlag & 32) {
      const l = t._;
      l ? (n && l === 1 ? (s = !1) : ml(o, t, n)) : ((s = !t.$stable), pl(t, o)), (i = t);
    } else t && (gl(e, t), (i = { default: 1 }));
    if (s) for (const l in o) !hl(l) && i[l] == null && delete o[l];
  };
function za() {
  typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (xo().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1);
}
const Fe = ru;
function Va(e) {
  return Ua(e);
}
function Ua(e, t) {
  za();
  const n = xo();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: i,
      createText: l,
      createComment: c,
      setText: a,
      setElementText: u,
      parentNode: f,
      nextSibling: h,
      setScopeId: g = et,
      insertStaticContent: y,
    } = e,
    b = (d, p, m, x = null, _ = null, C = null, M = void 0, L = null, I = !!p.dynamicChildren) => {
      if (d === p) return;
      d && !Ut(d, p) && ((x = E(d)), J(d, _, C, !0), (d = null)), p.patchFlag === -2 && ((I = !1), (p.dynamicChildren = null));
      const { type: A, ref: K, shapeFlag: B } = p;
      switch (A) {
        case Or:
          P(d, p, m, x);
          break;
        case Be:
          R(d, p, m, x);
          break;
        case Kr:
          d == null && S(p, m, x, M);
          break;
        case Qe:
          D(d, p, m, x, _, C, M, L, I);
          break;
        default:
          B & 1
            ? T(d, p, m, x, _, C, M, L, I)
            : B & 6
            ? X(d, p, m, x, _, C, M, L, I)
            : (B & 64 || B & 128) && A.process(d, p, m, x, _, C, M, L, I, z);
      }
      K != null && _ && lo(K, d && d.ref, C, p || d, !p);
    },
    P = (d, p, m, x) => {
      if (d == null) r((p.el = l(p.children)), m, x);
      else {
        const _ = (p.el = d.el);
        p.children !== d.children && a(_, p.children);
      }
    },
    R = (d, p, m, x) => {
      d == null ? r((p.el = c(p.children || "")), m, x) : (p.el = d.el);
    },
    S = (d, p, m, x) => {
      [d.el, d.anchor] = y(d.children, p, m, x, d.el, d.anchor);
    },
    $ = ({ el: d, anchor: p }, m, x) => {
      let _;
      for (; d && d !== p; ) (_ = h(d)), r(d, m, x), (d = _);
      r(p, m, x);
    },
    v = ({ el: d, anchor: p }) => {
      let m;
      for (; d && d !== p; ) (m = h(d)), o(d), (d = m);
      o(p);
    },
    T = (d, p, m, x, _, C, M, L, I) => {
      p.type === "svg" ? (M = "svg") : p.type === "math" && (M = "mathml"), d == null ? H(p, m, x, _, C, M, L, I) : w(d, p, _, C, M, L, I);
    },
    H = (d, p, m, x, _, C, M, L) => {
      let I, A;
      const { props: K, shapeFlag: B, transition: U, dirs: q } = d;
      if (
        ((I = d.el = i(d.type, C, K && K.is, K)),
        B & 8 ? u(I, d.children) : B & 16 && Z(d.children, I, null, x, _, Vr(d, C), M, L),
        q && kt(d, null, x, "created"),
        j(I, d, d.scopeId, M, x),
        K)
      ) {
        for (const fe in K) fe !== "value" && !xn(fe) && s(I, fe, null, K[fe], C, x);
        "value" in K && s(I, "value", null, K.value, C), (A = K.onVnodeBeforeMount) && lt(A, x, d);
      }
      q && kt(d, null, x, "beforeMount");
      const Q = Ka(_, U);
      Q && U.beforeEnter(I),
        r(I, p, m),
        ((A = K && K.onVnodeMounted) || Q || q) &&
          Fe(() => {
            A && lt(A, x, d), Q && U.enter(I), q && kt(d, null, x, "mounted");
          }, _);
    },
    j = (d, p, m, x, _) => {
      if ((m && g(d, m), x)) for (let C = 0; C < x.length; C++) g(d, x[C]);
      if (_) {
        let C = _.subTree;
        if (p === C || (_l(C.type) && (C.ssContent === p || C.ssFallback === p))) {
          const M = _.vnode;
          j(d, M, M.scopeId, M.slotScopeIds, _.parent);
        }
      }
    },
    Z = (d, p, m, x, _, C, M, L, I = 0) => {
      for (let A = I; A < d.length; A++) {
        const K = (d[A] = L ? Pt(d[A]) : at(d[A]));
        b(null, K, p, m, x, _, C, M, L);
      }
    },
    w = (d, p, m, x, _, C, M) => {
      const L = (p.el = d.el);
      let { patchFlag: I, dynamicChildren: A, dirs: K } = p;
      I |= d.patchFlag & 16;
      const B = d.props || ae,
        U = p.props || ae;
      let q;
      if (
        (m && Ht(m, !1),
        (q = U.onVnodeBeforeUpdate) && lt(q, m, p, d),
        K && kt(p, d, m, "beforeUpdate"),
        m && Ht(m, !0),
        ((B.innerHTML && U.innerHTML == null) || (B.textContent && U.textContent == null)) && u(L, ""),
        A ? N(d.dynamicChildren, A, L, m, x, Vr(p, _), C) : M || te(d, p, L, null, m, x, Vr(p, _), C, !1),
        I > 0)
      ) {
        if (I & 16) V(L, B, U, m, _);
        else if ((I & 2 && B.class !== U.class && s(L, "class", null, U.class, _), I & 4 && s(L, "style", B.style, U.style, _), I & 8)) {
          const Q = p.dynamicProps;
          for (let fe = 0; fe < Q.length; fe++) {
            const le = Q[fe],
              He = B[le],
              Re = U[le];
            (Re !== He || le === "value") && s(L, le, He, Re, _, m);
          }
        }
        I & 1 && d.children !== p.children && u(L, p.children);
      } else !M && A == null && V(L, B, U, m, _);
      ((q = U.onVnodeUpdated) || K) &&
        Fe(() => {
          q && lt(q, m, p, d), K && kt(p, d, m, "updated");
        }, x);
    },
    N = (d, p, m, x, _, C, M) => {
      for (let L = 0; L < p.length; L++) {
        const I = d[L],
          A = p[L],
          K = I.el && (I.type === Qe || !Ut(I, A) || I.shapeFlag & 70) ? f(I.el) : m;
        b(I, A, K, null, x, _, C, M, !0);
      }
    },
    V = (d, p, m, x, _) => {
      if (p !== m) {
        if (p !== ae) for (const C in p) !xn(C) && !(C in m) && s(d, C, p[C], null, _, x);
        for (const C in m) {
          if (xn(C)) continue;
          const M = m[C],
            L = p[C];
          M !== L && C !== "value" && s(d, C, L, M, _, x);
        }
        "value" in m && s(d, "value", p.value, m.value, _);
      }
    },
    D = (d, p, m, x, _, C, M, L, I) => {
      const A = (p.el = d ? d.el : l("")),
        K = (p.anchor = d ? d.anchor : l(""));
      let { patchFlag: B, dynamicChildren: U, slotScopeIds: q } = p;
      q && (L = L ? L.concat(q) : q),
        d == null
          ? (r(A, m, x), r(K, m, x), Z(p.children || [], m, K, _, C, M, L, I))
          : B > 0 && B & 64 && U && d.dynamicChildren
          ? (N(d.dynamicChildren, U, m, _, C, M, L), (p.key != null || (_ && p === _.subTree)) && ko(d, p, !0))
          : te(d, p, m, K, _, C, M, L, I);
    },
    X = (d, p, m, x, _, C, M, L, I) => {
      (p.slotScopeIds = L), d == null ? (p.shapeFlag & 512 ? _.ctx.activate(p, m, x, M, I) : he(p, m, x, _, C, M, I)) : Le(d, p, I);
    },
    he = (d, p, m, x, _, C, M) => {
      const L = (d.component = du(d, x, _));
      if ((Cr(d) && (L.ctx.renderer = z), hu(L, !1, M), L.asyncDep)) {
        if ((_ && _.registerDep(L, ue, M), !d.el)) {
          const I = (L.subTree = O(Be));
          R(null, I, p, m);
        }
      } else ue(L, d, p, m, _, C, M);
    },
    Le = (d, p, m) => {
      const x = (p.component = d.component);
      if (tu(d, p, m))
        if (x.asyncDep && !x.asyncResolved) {
          re(x, p, m);
          return;
        } else (x.next = p), x.update();
      else (p.el = d.el), (x.vnode = p);
    },
    ue = (d, p, m, x, _, C, M) => {
      const L = () => {
        if (d.isMounted) {
          let { next: B, bu: U, u: q, parent: Q, vnode: fe } = d;
          {
            const je = vl(d);
            if (je) {
              B && ((B.el = fe.el), re(d, B, M)),
                je.asyncDep.then(() => {
                  d.isUnmounted || L();
                });
              return;
            }
          }
          let le = B,
            He;
          Ht(d, !1),
            B ? ((B.el = fe.el), re(d, B, M)) : (B = fe),
            U && or(U),
            (He = B.props && B.props.onVnodeBeforeUpdate) && lt(He, Q, B, fe),
            Ht(d, !0);
          const Re = Ur(d),
            Je = d.subTree;
          (d.subTree = Re),
            b(Je, Re, f(Je.el), E(Je), d, _, C),
            (B.el = Re.el),
            le === null && nu(d, Re.el),
            q && Fe(q, _),
            (He = B.props && B.props.onVnodeUpdated) && Fe(() => lt(He, Q, B, fe), _);
        } else {
          let B;
          const { el: U, props: q } = p,
            { bm: Q, m: fe, parent: le, root: He, type: Re } = d,
            Je = Pn(p);
          if ((Ht(d, !1), Q && or(Q), !Je && (B = q && q.onVnodeBeforeMount) && lt(B, le, p), Ht(d, !0), U && me)) {
            const je = () => {
              (d.subTree = Ur(d)), me(U, d.subTree, d, _, null);
            };
            Je && Re.__asyncHydrate ? Re.__asyncHydrate(U, d, je) : je();
          } else {
            He.ce && He.ce._injectChildStyle(Re);
            const je = (d.subTree = Ur(d));
            b(null, je, m, x, d, _, C), (p.el = je.el);
          }
          if ((fe && Fe(fe, _), !Je && (B = q && q.onVnodeMounted))) {
            const je = p;
            Fe(() => lt(B, le, je), _);
          }
          (p.shapeFlag & 256 || (le && Pn(le.vnode) && le.vnode.shapeFlag & 256)) && d.a && Fe(d.a, _), (d.isMounted = !0), (p = m = x = null);
        }
      };
      d.scope.on();
      const I = (d.effect = new Ci(L));
      d.scope.off();
      const A = (d.update = I.run.bind(I)),
        K = (d.job = I.runIfDirty.bind(I));
      (K.i = d), (K.id = d.uid), (I.scheduler = () => Mo(K)), Ht(d, !0), A();
    },
    re = (d, p, m) => {
      p.component = d;
      const x = d.vnode.props;
      (d.vnode = p), (d.next = null), Ba(d, p.props, x, m), ja(d, p.children, m), Ft(), is(d), Bt();
    },
    te = (d, p, m, x, _, C, M, L, I = !1) => {
      const A = d && d.children,
        K = d ? d.shapeFlag : 0,
        B = p.children,
        { patchFlag: U, shapeFlag: q } = p;
      if (U > 0) {
        if (U & 128) {
          Y(A, B, m, x, _, C, M, L, I);
          return;
        } else if (U & 256) {
          Ze(A, B, m, x, _, C, M, L, I);
          return;
        }
      }
      q & 8
        ? (K & 16 && Te(A, _, C), B !== A && u(m, B))
        : K & 16
        ? q & 16
          ? Y(A, B, m, x, _, C, M, L, I)
          : Te(A, _, C, !0)
        : (K & 8 && u(m, ""), q & 16 && Z(B, m, x, _, C, M, L, I));
    },
    Ze = (d, p, m, x, _, C, M, L, I) => {
      (d = d || nn), (p = p || nn);
      const A = d.length,
        K = p.length,
        B = Math.min(A, K);
      let U;
      for (U = 0; U < B; U++) {
        const q = (p[U] = I ? Pt(p[U]) : at(p[U]));
        b(d[U], q, m, null, _, C, M, L, I);
      }
      A > K ? Te(d, _, C, !0, !1, B) : Z(p, m, x, _, C, M, L, I, B);
    },
    Y = (d, p, m, x, _, C, M, L, I) => {
      let A = 0;
      const K = p.length;
      let B = d.length - 1,
        U = K - 1;
      for (; A <= B && A <= U; ) {
        const q = d[A],
          Q = (p[A] = I ? Pt(p[A]) : at(p[A]));
        if (Ut(q, Q)) b(q, Q, m, null, _, C, M, L, I);
        else break;
        A++;
      }
      for (; A <= B && A <= U; ) {
        const q = d[B],
          Q = (p[U] = I ? Pt(p[U]) : at(p[U]));
        if (Ut(q, Q)) b(q, Q, m, null, _, C, M, L, I);
        else break;
        B--, U--;
      }
      if (A > B) {
        if (A <= U) {
          const q = U + 1,
            Q = q < K ? p[q].el : x;
          for (; A <= U; ) b(null, (p[A] = I ? Pt(p[A]) : at(p[A])), m, Q, _, C, M, L, I), A++;
        }
      } else if (A > U) for (; A <= B; ) J(d[A], _, C, !0), A++;
      else {
        const q = A,
          Q = A,
          fe = new Map();
        for (A = Q; A <= U; A++) {
          const ze = (p[A] = I ? Pt(p[A]) : at(p[A]));
          ze.key != null && fe.set(ze.key, A);
        }
        let le,
          He = 0;
        const Re = U - Q + 1;
        let Je = !1,
          je = 0;
        const pn = new Array(Re);
        for (A = 0; A < Re; A++) pn[A] = 0;
        for (A = q; A <= B; A++) {
          const ze = d[A];
          if (He >= Re) {
            J(ze, _, C, !0);
            continue;
          }
          let it;
          if (ze.key != null) it = fe.get(ze.key);
          else
            for (le = Q; le <= U; le++)
              if (pn[le - Q] === 0 && Ut(ze, p[le])) {
                it = le;
                break;
              }
          it === void 0 ? J(ze, _, C, !0) : ((pn[it - Q] = A + 1), it >= je ? (je = it) : (Je = !0), b(ze, p[it], m, null, _, C, M, L, I), He++);
        }
        const Zo = Je ? Wa(pn) : nn;
        for (le = Zo.length - 1, A = Re - 1; A >= 0; A--) {
          const ze = Q + A,
            it = p[ze],
            Jo = ze + 1 < K ? p[ze + 1].el : x;
          pn[A] === 0 ? b(null, it, m, Jo, _, C, M, L, I) : Je && (le < 0 || A !== Zo[le] ? oe(it, m, Jo, 2) : le--);
        }
      }
    },
    oe = (d, p, m, x, _ = null) => {
      const { el: C, type: M, transition: L, children: I, shapeFlag: A } = d;
      if (A & 6) {
        oe(d.component.subTree, p, m, x);
        return;
      }
      if (A & 128) {
        d.suspense.move(p, m, x);
        return;
      }
      if (A & 64) {
        M.move(d, p, m, z);
        return;
      }
      if (M === Qe) {
        r(C, p, m);
        for (let B = 0; B < I.length; B++) oe(I[B], p, m, x);
        r(d.anchor, p, m);
        return;
      }
      if (M === Kr) {
        $(d, p, m);
        return;
      }
      if (x !== 2 && A & 1 && L)
        if (x === 0) L.beforeEnter(C), r(C, p, m), Fe(() => L.enter(C), _);
        else {
          const { leave: B, delayLeave: U, afterLeave: q } = L,
            Q = () => r(C, p, m),
            fe = () => {
              B(C, () => {
                Q(), q && q();
              });
            };
          U ? U(C, Q, fe) : fe();
        }
      else r(C, p, m);
    },
    J = (d, p, m, x = !1, _ = !1) => {
      const { type: C, props: M, ref: L, children: I, dynamicChildren: A, shapeFlag: K, patchFlag: B, dirs: U, cacheIndex: q } = d;
      if ((B === -2 && (_ = !1), L != null && lo(L, null, m, d, !0), q != null && (p.renderCache[q] = void 0), K & 256)) {
        p.ctx.deactivate(d);
        return;
      }
      const Q = K & 1 && U,
        fe = !Pn(d);
      let le;
      if ((fe && (le = M && M.onVnodeBeforeUnmount) && lt(le, p, d), K & 6)) st(d.component, m, x);
      else {
        if (K & 128) {
          d.suspense.unmount(m, x);
          return;
        }
        Q && kt(d, null, p, "beforeUnmount"),
          K & 64
            ? d.type.remove(d, p, m, z, x)
            : A && !A.hasOnce && (C !== Qe || (B > 0 && B & 64))
            ? Te(A, p, m, !1, !0)
            : ((C === Qe && B & 384) || (!_ && K & 16)) && Te(I, p, m),
          x && xe(d);
      }
      ((fe && (le = M && M.onVnodeUnmounted)) || Q) &&
        Fe(() => {
          le && lt(le, p, d), Q && kt(d, null, p, "unmounted");
        }, m);
    },
    xe = (d) => {
      const { type: p, el: m, anchor: x, transition: _ } = d;
      if (p === Qe) {
        Ee(m, x);
        return;
      }
      if (p === Kr) {
        v(d);
        return;
      }
      const C = () => {
        o(m), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (d.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: M, delayLeave: L } = _,
          I = () => M(m, C);
        L ? L(d.el, C, I) : I();
      } else C();
    },
    Ee = (d, p) => {
      let m;
      for (; d !== p; ) (m = h(d)), o(d), (d = m);
      o(p);
    },
    st = (d, p, m) => {
      const { bum: x, scope: _, job: C, subTree: M, um: L, m: I, a: A } = d;
      ms(I),
        ms(A),
        x && or(x),
        _.stop(),
        C && ((C.flags |= 8), J(M, d, p, m)),
        L && Fe(L, p),
        Fe(() => {
          d.isUnmounted = !0;
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          d.asyncDep &&
          !d.asyncResolved &&
          d.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve());
    },
    Te = (d, p, m, x = !1, _ = !1, C = 0) => {
      for (let M = C; M < d.length; M++) J(d[M], p, m, x, _);
    },
    E = (d) => {
      if (d.shapeFlag & 6) return E(d.component.subTree);
      if (d.shapeFlag & 128) return d.suspense.next();
      const p = h(d.anchor || d.el),
        m = p && p[qi];
      return m ? h(m) : p;
    };
  let k = !1;
  const F = (d, p, m) => {
      d == null ? p._vnode && J(p._vnode, null, null, !0) : b(p._vnode || null, d, p, null, null, null, m),
        (p._vnode = d),
        k || ((k = !0), is(), Ki(), (k = !1));
    },
    z = { p: b, um: J, m: oe, r: xe, mt: he, mc: Z, pc: te, pbc: N, n: E, o: e };
  let se, me;
  return t && ([se, me] = t(z)), { render: F, hydrate: se, createApp: Ma(F, se) };
}
function Vr({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") || (n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html"))
    ? void 0
    : n;
}
function Ht({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function Ka(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function ko(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (W(r) && W(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = o[s] = Pt(o[s])), (l.el = i.el)), !n && l.patchFlag !== -2 && ko(i, l)),
        l.type === Or && (l.el = i.el);
    }
}
function Wa(e) {
  const t = e.slice(),
    n = [0];
  let r, o, s, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const a = e[r];
    if (a !== 0) {
      if (((o = n[n.length - 1]), e[o] < a)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; ) (l = (s + i) >> 1), e[n[l]] < a ? (s = l + 1) : (i = l);
      a < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; ) (n[s] = i), (i = t[i]);
  return n;
}
function vl(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : vl(t);
}
function ms(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const Ya = Symbol.for("v-scx"),
  qa = () => ke(Ya);
function Ga(e, t) {
  return Ho(e, null, t);
}
function ye(e, t, n) {
  return Ho(e, t, n);
}
function Ho(e, t, n = ae) {
  const { immediate: r, deep: o, flush: s, once: i } = n,
    l = Ce({}, n);
  let c;
  if (Ir)
    if (s === "sync") {
      const h = qa();
      c = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!t || r) l.once = !0;
    else {
      const h = () => {};
      return (h.stop = et), (h.resume = et), (h.pause = et), h;
    }
  const a = Ae;
  l.call = (h, g, y) => nt(h, a, g, y);
  let u = !1;
  s === "post"
    ? (l.scheduler = (h) => {
        Fe(h, a && a.suspense);
      })
    : s !== "sync" &&
      ((u = !0),
      (l.scheduler = (h, g) => {
        g ? h() : Mo(h);
      })),
    (l.augmentJob = (h) => {
      t && (h.flags |= 4), u && ((h.flags |= 2), a && ((h.id = a.uid), (h.i = a)));
    });
  const f = oa(e, t, l);
  return c && c.push(f), f;
}
function Xa(e, t, n) {
  const r = this.proxy,
    o = ve(e) ? (e.includes(".") ? yl(r, e) : () => r[e]) : e.bind(r, r);
  let s;
  G(t) ? (s = t) : ((s = t.handler), (n = t));
  const i = Un(this),
    l = Ho(o, s.bind(r), n);
  return i(), l;
}
function yl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
const Za = (e, t) =>
  t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Xe(t)}Modifiers`] || e[`${Mt(t)}Modifiers`];
function Ja(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ae;
  let o = n;
  const s = t.startsWith("update:"),
    i = s && Za(r, t.slice(7));
  i && (i.trim && (o = n.map((u) => (ve(u) ? u.trim() : u))), i.number && (o = n.map(to)));
  let l,
    c = r[(l = Fr(t))] || r[(l = Fr(Xe(t)))];
  !c && s && (c = r[(l = Fr(Mt(t)))]), c && nt(c, e, 6, o);
  const a = r[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), nt(a, e, 6, o);
  }
}
function bl(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const s = e.emits;
  let i = {},
    l = !1;
  if (!G(e)) {
    const c = (a) => {
      const u = bl(a, t, !0);
      u && ((l = !0), Ce(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !l ? (ge(e) && r.set(e, null), null) : (W(s) ? s.forEach((c) => (i[c] = null)) : Ce(i, s), ge(e) && r.set(e, i), i);
}
function Rr(e, t) {
  return !e || !yr(t) ? !1 : ((t = t.slice(2).replace(/Once$/, "")), ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, Mt(t)) || ie(e, t));
}
function Ur(e) {
  const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: o,
      propsOptions: [s],
      slots: i,
      attrs: l,
      emit: c,
      render: a,
      renderCache: u,
      props: f,
      data: h,
      setupState: g,
      ctx: y,
      inheritAttrs: b,
    } = e,
    P = fr(e);
  let R, S;
  try {
    if (n.shapeFlag & 4) {
      const v = o || r,
        T = v;
      (R = at(a.call(T, v, u, f, g, h, y))), (S = l);
    } else {
      const v = t;
      (R = at(v.length > 1 ? v(f, { attrs: l, slots: i, emit: c }) : v(f, null))), (S = t.props ? l : Qa(l));
    }
  } catch (v) {
    (Rn.length = 0), Sr(v, e, 1), (R = O(Be));
  }
  let $ = R;
  if (S && b !== !1) {
    const v = Object.keys(S),
      { shapeFlag: T } = $;
    v.length && T & 7 && (s && v.some(_o) && (S = eu(S, s)), ($ = $t($, S, !1, !0)));
  }
  return (
    n.dirs && (($ = $t($, null, !1, !0)), ($.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs)), n.transition && Fn($, n.transition), (R = $), fr(P), R
  );
}
const Qa = (e) => {
    let t;
    for (const n in e) (n === "class" || n === "style" || yr(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  eu = (e, t) => {
    const n = {};
    for (const r in e) (!_o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function tu(e, t, n) {
  const { props: r, children: o, component: s } = e,
    { props: i, children: l, patchFlag: c } = t,
    a = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? vs(r, i, a) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (i[h] !== r[h] && !Rr(a, h)) return !0;
      }
    }
  } else return (o || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? (i ? vs(r, i, a) : !0) : !!i;
  return !1;
}
function vs(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !Rr(n, s)) return !0;
  }
  return !1;
}
function nu({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)) ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const _l = (e) => e.__isSuspense;
function ru(e, t) {
  t && t.pendingBranch ? (W(e) ? t.effects.push(...e) : t.effects.push(e)) : la(e);
}
const Qe = Symbol.for("v-fgt"),
  Or = Symbol.for("v-txt"),
  Be = Symbol.for("v-cmt"),
  Kr = Symbol.for("v-stc"),
  Rn = [];
let Ue = null;
function wl(e = !1) {
  Rn.push((Ue = e ? null : []));
}
function ou() {
  Rn.pop(), (Ue = Rn[Rn.length - 1] || null);
}
let Bn = 1;
function ys(e) {
  (Bn += e), e < 0 && Ue && (Ue.hasOnce = !0);
}
function El(e) {
  return (e.dynamicChildren = Bn > 0 ? Ue || nn : null), ou(), Bn > 0 && Ue && Ue.push(e), e;
}
function su(e, t, n, r, o, s) {
  return El(Sl(e, t, n, r, o, s, !0));
}
function iu(e, t, n, r, o) {
  return El(O(e, t, n, r, o, !0));
}
function Nn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ut(e, t) {
  return e.type === t.type && e.key === t.key;
}
const xl = ({ key: e }) => (e != null ? e : null),
  ir = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e), e != null ? (ve(e) || Pe(e) || G(e) ? { i: Ne, r: e, k: t, f: !!n } : e) : null
  );
function Sl(e, t = null, n = null, r = 0, o = null, s = e === Qe ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xl(t),
    ref: t && ir(t),
    scopeId: Yi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne,
  };
  return (
    l ? (jo(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= ve(n) ? 8 : 16),
    Bn > 0 && !i && Ue && (c.patchFlag > 0 || s & 6) && c.patchFlag !== 32 && Ue.push(c),
    c
  );
}
const O = lu;
function lu(e, t = null, n = null, r = 0, o = null, s = !1) {
  if (((!e || e === Aa) && (e = Be), Nn(e))) {
    const l = $t(e, t, !0);
    return n && jo(l, n), Bn > 0 && !s && Ue && (l.shapeFlag & 6 ? (Ue[Ue.indexOf(e)] = l) : Ue.push(l)), (l.patchFlag = -2), l;
  }
  if ((yu(e) && (e = e.__vccOpts), t)) {
    t = cu(t);
    let { class: l, style: c } = t;
    l && !ve(l) && (t.class = Co(l)), ge(c) && (Lo(c) && !W(c) && (c = Ce({}, c)), (t.style = So(c)));
  }
  const i = ve(e) ? 1 : _l(e) ? 128 : Gi(e) ? 64 : ge(e) ? 4 : G(e) ? 2 : 0;
  return Sl(e, t, n, r, o, i, s, !0);
}
function cu(e) {
  return e ? (Lo(e) || ul(e) ? Ce({}, e) : e) : null;
}
function $t(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: l, transition: c } = e,
    a = t ? Lt(o || {}, t) : o,
    u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: a,
      key: a && xl(a),
      ref: t && t.ref ? (n && s ? (W(s) ? s.concat(ir(t)) : [s, ir(t)]) : ir(t)) : s,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Qe ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && $t(e.ssContent),
      ssFallback: e.ssFallback && $t(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return c && r && Fn(u, c.clone(u)), u;
}
function au(e = " ", t = 0) {
  return O(Or, null, e, t);
}
function Wh(e = "", t = !1) {
  return t ? (wl(), iu(Be, null, e)) : O(Be, null, e);
}
function at(e) {
  return e == null || typeof e == "boolean" ? O(Be) : W(e) ? O(Qe, null, e.slice()) : Nn(e) ? Pt(e) : O(Or, null, String(e));
}
function Pt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : $t(e);
}
function jo(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (W(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), jo(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !ul(t) ? (t._ctx = Ne) : o === 3 && Ne && (Ne.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else G(t) ? ((t = { default: t, _ctx: Ne }), (n = 32)) : ((t = String(t)), r & 64 ? ((n = 16), (t = [au(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Lt(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class") t.class !== r.class && (t.class = Co([t.class, r.class]));
      else if (o === "style") t.style = So([t.style, r.style]);
      else if (yr(o)) {
        const s = t[o],
          i = r[o];
        i && s !== i && !(W(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function lt(e, t, n, r = null) {
  nt(e, t, 7, [n, r]);
}
const uu = ll();
let fu = 0;
function du(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || uu,
    s = {
      uid: fu++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Tc(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: dl(r, o),
      emitsOptions: bl(r, o),
      emit: null,
      emitted: null,
      propsDefaults: ae,
      inheritAttrs: r.inheritAttrs,
      ctx: ae,
      data: ae,
      props: ae,
      attrs: ae,
      slots: ae,
      refs: ae,
      setupState: ae,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (s.ctx = { _: s }), (s.root = t ? t.root : s), (s.emit = Ja.bind(null, s)), e.ce && e.ce(s), s;
}
let Ae = null;
const dn = () => Ae || Ne;
let hr, ho;
{
  const e = xo(),
    t = (n, r) => {
      let o;
      return (
        (o = e[n]) || (o = e[n] = []),
        o.push(r),
        (s) => {
          o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
        }
      );
    };
  (hr = t("__VUE_INSTANCE_SETTERS__", (n) => (Ae = n))), (ho = t("__VUE_SSR_SETTERS__", (n) => (Ir = n)));
}
const Un = (e) => {
    const t = Ae;
    return (
      hr(e),
      e.scope.on(),
      () => {
        e.scope.off(), hr(t);
      }
    );
  },
  bs = () => {
    Ae && Ae.scope.off(), hr(null);
  };
function Cl(e) {
  return e.vnode.shapeFlag & 4;
}
let Ir = !1;
function hu(e, t = !1, n = !1) {
  t && ho(t);
  const { props: r, children: o } = e.vnode,
    s = Cl(e);
  Fa(e, r, s, t), Ha(e, o, n);
  const i = s ? pu(e, t) : void 0;
  return t && ho(!1), i;
}
function pu(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Ta));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? mu(e) : null),
      s = Un(e);
    Ft();
    const i = zn(r, e, 0, [e.props, o]);
    if ((Bt(), s(), yi(i))) {
      if ((Pn(e) || nl(e), i.then(bs, bs), t))
        return i
          .then((l) => {
            _s(e, l, t);
          })
          .catch((l) => {
            Sr(l, e, 0);
          });
      e.asyncDep = i;
    } else _s(e, i, t);
  } else Al(e, t);
}
function _s(e, t, n) {
  G(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : ge(t) && (e.setupState = zi(t)), Al(e, n);
}
let ws;
function Al(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && ws && !r.render) {
      const o = r.template || Bo(e).template;
      if (o) {
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = r,
          a = Ce(Ce({ isCustomElement: s, delimiters: l }, i), c);
        r.render = ws(o, a);
      }
    }
    e.render = r.render || et;
  }
  {
    const o = Un(e);
    Ft();
    try {
      Ra(e);
    } finally {
      Bt(), o();
    }
  }
}
const gu = {
  get(e, t) {
    return Ie(e, "get", ""), e[t];
  },
};
function mu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return { attrs: new Proxy(e.attrs, gu), slots: e.slots, emit: e.emit, expose: t };
}
function $r(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(zi(Zc(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in Tn) return Tn[n](e);
          },
          has(t, n) {
            return n in t || n in Tn;
          },
        }))
    : e.proxy;
}
function vu(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function yu(e) {
  return G(e) && "__vccOpts" in e;
}
const ee = (e, t) => na(e, t, Ir);
function zo(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? ge(t) && !W(t)
      ? Nn(t)
        ? O(e, null, [t])
        : O(e, t)
      : O(e, null, t)
    : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && Nn(n) && (n = [n]), O(e, t, n));
}
const bu = "3.5.11";
/**
 * @vue/runtime-dom v3.5.11
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let po;
const Es = typeof window != "undefined" && window.trustedTypes;
if (Es)
  try {
    po = Es.createPolicy("vue", { createHTML: (e) => e });
  } catch {}
const Pl = po ? (e) => po.createHTML(e) : (e) => e,
  _u = "http://www.w3.org/2000/svg",
  wu = "http://www.w3.org/1998/Math/MathML",
  pt = typeof document != "undefined" ? document : null,
  xs = pt && pt.createElement("template"),
  Eu = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o =
        t === "svg"
          ? pt.createElementNS(_u, e)
          : t === "mathml"
          ? pt.createElementNS(wu, e)
          : n
          ? pt.createElement(e, { is: n })
          : pt.createElement(e);
      return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
    },
    createText: (e) => pt.createTextNode(e),
    createComment: (e) => pt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => pt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, s) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === s || o.nextSibling)) for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); );
      else {
        xs.innerHTML = Pl(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
        const l = xs.content;
        if (r === "svg" || r === "mathml") {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
    },
  },
  wt = "transition",
  mn = "animation",
  kn = Symbol("_vtc"),
  Tl = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  xu = Ce({}, Zi, Tl),
  Su = (e) => ((e.displayName = "Transition"), (e.props = xu), e),
  Rl = Su((e, { slots: t }) => zo(ga, Cu(e), t)),
  jt = (e, t = []) => {
    W(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Ss = (e) => (e ? (W(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Cu(e) {
  const t = {};
  for (const D in e) D in Tl || (t[D] = e[D]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: o,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = s,
      appearActiveClass: a = i,
      appearToClass: u = l,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: g = `${n}-leave-to`,
    } = e,
    y = Au(o),
    b = y && y[0],
    P = y && y[1],
    {
      onBeforeEnter: R,
      onEnter: S,
      onEnterCancelled: $,
      onLeave: v,
      onLeaveCancelled: T,
      onBeforeAppear: H = R,
      onAppear: j = S,
      onAppearCancelled: Z = $,
    } = t,
    w = (D, X, he) => {
      zt(D, X ? u : l), zt(D, X ? a : i), he && he();
    },
    N = (D, X) => {
      (D._isLeaving = !1), zt(D, f), zt(D, g), zt(D, h), X && X();
    },
    V = (D) => (X, he) => {
      const Le = D ? j : S,
        ue = () => w(X, D, he);
      jt(Le, [X, ue]),
        Cs(() => {
          zt(X, D ? c : s), Et(X, D ? u : l), Ss(Le) || As(X, r, b, ue);
        });
    };
  return Ce(t, {
    onBeforeEnter(D) {
      jt(R, [D]), Et(D, s), Et(D, i);
    },
    onBeforeAppear(D) {
      jt(H, [D]), Et(D, c), Et(D, a);
    },
    onEnter: V(!1),
    onAppear: V(!0),
    onLeave(D, X) {
      D._isLeaving = !0;
      const he = () => N(D, X);
      Et(D, f),
        Et(D, h),
        Ru(),
        Cs(() => {
          !D._isLeaving || (zt(D, f), Et(D, g), Ss(v) || As(D, r, P, he));
        }),
        jt(v, [D, he]);
    },
    onEnterCancelled(D) {
      w(D, !1), jt($, [D]);
    },
    onAppearCancelled(D) {
      w(D, !0), jt(Z, [D]);
    },
    onLeaveCancelled(D) {
      N(D), jt(T, [D]);
    },
  });
}
function Au(e) {
  if (e == null) return null;
  if (ge(e)) return [Wr(e.enter), Wr(e.leave)];
  {
    const t = Wr(e);
    return [t, t];
  }
}
function Wr(e) {
  return _c(e);
}
function Et(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[kn] || (e[kn] = new Set())).add(t);
}
function zt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const n = e[kn];
  n && (n.delete(t), n.size || (e[kn] = void 0));
}
function Cs(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Pu = 0;
function As(e, t, n, r) {
  const o = (e._endId = ++Pu),
    s = () => {
      o === e._endId && r();
    };
  if (n != null) return setTimeout(s, n);
  const { type: i, timeout: l, propCount: c } = Tu(e, t);
  if (!i) return r();
  const a = i + "end";
  let u = 0;
  const f = () => {
      e.removeEventListener(a, h), s();
    },
    h = (g) => {
      g.target === e && ++u >= c && f();
    };
  setTimeout(() => {
    u < c && f();
  }, l + 1),
    e.addEventListener(a, h);
}
function Tu(e, t) {
  const n = window.getComputedStyle(e),
    r = (y) => (n[y] || "").split(", "),
    o = r(`${wt}Delay`),
    s = r(`${wt}Duration`),
    i = Ps(o, s),
    l = r(`${mn}Delay`),
    c = r(`${mn}Duration`),
    a = Ps(l, c);
  let u = null,
    f = 0,
    h = 0;
  t === wt
    ? i > 0 && ((u = wt), (f = i), (h = s.length))
    : t === mn
    ? a > 0 && ((u = mn), (f = a), (h = c.length))
    : ((f = Math.max(i, a)), (u = f > 0 ? (i > a ? wt : mn) : null), (h = u ? (u === wt ? s.length : c.length) : 0));
  const g = u === wt && /\b(transform|all)(,|$)/.test(r(`${wt}Property`).toString());
  return { type: u, timeout: f, propCount: h, hasTransform: g };
}
function Ps(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Ts(n) + Ts(e[r])));
}
function Ts(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Ru() {
  return document.body.offsetHeight;
}
function Ou(e, t, n) {
  const r = e[kn];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
const pr = Symbol("_vod"),
  Ol = Symbol("_vsh"),
  Il = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e[pr] = e.style.display === "none" ? "" : e.style.display), n && t ? n.beforeEnter(e) : vn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), vn(e, !0), r.enter(e))
            : r.leave(e, () => {
                vn(e, !1);
              })
          : vn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      vn(e, t);
    },
  };
function vn(e, t) {
  (e.style.display = t ? e[pr] : "none"), (e[Ol] = !t);
}
const Iu = Symbol(""),
  $u = /(^|;)\s*display\s*:/;
function Lu(e, t, n) {
  const r = e.style,
    o = ve(n);
  let s = !1;
  if (n && !o) {
    if (t)
      if (ve(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && lr(r, l, "");
        }
      else for (const i in t) n[i] == null && lr(r, i, "");
    for (const i in n) i === "display" && (s = !0), lr(r, i, n[i]);
  } else if (o) {
    if (t !== n) {
      const i = r[Iu];
      i && (n += ";" + i), (r.cssText = n), (s = $u.test(n));
    }
  } else t && e.removeAttribute("style");
  pr in e && ((e[pr] = s ? r.display : ""), e[Ol] && (r.display = "none"));
}
const Rs = /\s*!important$/;
function lr(e, t, n) {
  if (W(n)) n.forEach((r) => lr(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Du(e, t);
    Rs.test(n) ? e.setProperty(Mt(r), n.replace(Rs, ""), "important") : (e[r] = n);
  }
}
const Os = ["Webkit", "Moz", "ms"],
  Yr = {};
function Du(e, t) {
  const n = Yr[t];
  if (n) return n;
  let r = Xe(t);
  if (r !== "filter" && r in e) return (Yr[t] = r);
  r = wr(r);
  for (let o = 0; o < Os.length; o++) {
    const s = Os[o] + r;
    if (s in e) return (Yr[t] = s);
  }
  return t;
}
const Is = "http://www.w3.org/1999/xlink";
function $s(e, t, n, r, o, s = Ac(t)) {
  r && t.startsWith("xlink:")
    ? n == null
      ? e.removeAttributeNS(Is, t.slice(6, t.length))
      : e.setAttributeNS(Is, t, n)
    : n == null || (s && !Ei(n))
    ? e.removeAttribute(t)
    : e.setAttribute(t, s ? "" : Dt(n) ? String(n) : n);
}
function Ls(e, t, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Pl(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const i = o === "OPTION" ? e.getAttribute("value") || "" : e.value,
      l = n == null ? (e.type === "checkbox" ? "on" : "") : String(n);
    (i !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), (e._value = n);
    return;
  }
  let s = !1;
  if (n === "" || n == null) {
    const i = typeof e[t];
    i === "boolean" ? (n = Ei(n)) : n == null && i === "string" ? ((n = ""), (s = !0)) : i === "number" && ((n = 0), (s = !0));
  }
  try {
    e[t] = n;
  } catch {}
  s && e.removeAttribute(t);
}
function en(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Mu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Ds = Symbol("_vei");
function Fu(e, t, n, r, o = null) {
  const s = e[Ds] || (e[Ds] = {}),
    i = s[t];
  if (r && i) i.value = r;
  else {
    const [l, c] = Bu(t);
    if (r) {
      const a = (s[t] = Hu(r, o));
      en(e, l, a, c);
    } else i && (Mu(e, l, i, c), (s[t] = void 0));
  }
}
const Ms = /(?:Once|Passive|Capture)$/;
function Bu(e) {
  let t;
  if (Ms.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Ms)); ) (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Mt(e.slice(2)), t];
}
let qr = 0;
const Nu = Promise.resolve(),
  ku = () => qr || (Nu.then(() => (qr = 0)), (qr = Date.now()));
function Hu(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    nt(ju(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = ku()), n;
}
function ju(e, t) {
  if (W(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const Fs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  zu = (e, t, n, r, o, s) => {
    const i = o === "svg";
    t === "class"
      ? Ou(e, r, i)
      : t === "style"
      ? Lu(e, n, r)
      : yr(t)
      ? _o(t) || Fu(e, t, n, r, s)
      : (t[0] === "." ? ((t = t.slice(1)), !0) : t[0] === "^" ? ((t = t.slice(1)), !1) : Vu(e, t, r, i))
      ? (Ls(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && $s(e, t, r, i, s, t !== "value"))
      : e._isVueCE && (/[A-Z]/.test(t) || !ve(r))
      ? Ls(e, Xe(t), r)
      : (t === "true-value" ? (e._trueValue = r) : t === "false-value" && (e._falseValue = r), $s(e, t, r, i));
  };
function Vu(e, t, n, r) {
  if (r) return !!(t === "innerHTML" || t === "textContent" || (t in e && Fs(t) && G(n)));
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE") return !1;
  }
  return Fs(t) && ve(n) ? !1 : t in e;
}
const Bs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return W(t) ? (n) => or(t, n) : t;
};
function Uu(e) {
  e.target.composing = !0;
}
function Ns(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Gr = Symbol("_assign"),
  Yh = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
      e[Gr] = Bs(o);
      const s = r || (o.props && o.props.type === "number");
      en(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), s && (l = to(l)), e[Gr](l);
      }),
        n &&
          en(e, "change", () => {
            e.value = e.value.trim();
          }),
        t || (en(e, "compositionstart", Uu), en(e, "compositionend", Ns), en(e, "change", Ns));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? "" : t;
    },
    beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: o, number: s } }, i) {
      if (((e[Gr] = Bs(i)), e.composing)) return;
      const l = (s || e.type === "number") && !/^0\d/.test(e.value) ? to(e.value) : e.value,
        c = t == null ? "" : t;
      l !== c && ((document.activeElement === e && e.type !== "range" && ((r && t === n) || (o && e.value.trim() === c))) || (e.value = c));
    },
  },
  Ku = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" },
  qh = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      r = t.join(".");
    return (
      n[r] ||
      (n[r] = (o) => {
        if (!("key" in o)) return;
        const s = Mt(o.key);
        if (t.some((i) => i === s || Ku[i] === s)) return e(o);
      })
    );
  },
  Wu = Ce({ patchProp: zu }, Eu);
let ks;
function Yu() {
  return ks || (ks = Va(Wu));
}
const $l = (...e) => {
  const t = Yu().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const o = Gu(r);
      if (!o) return;
      const s = t._component;
      !G(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
      const i = n(o, !1, qu(o));
      return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
    }),
    t
  );
};
function qu(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Gu(e) {
  return ve(e) ? document.querySelector(e) : e;
}
var Xu = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t) n[r] = o;
  return n;
};
const Zu = {};
function Ju(e, t) {
  const n = Ca("router-view");
  return wl(), su("div", null, [O(n)]);
}
var Qu = Xu(Zu, [["render", Ju]]);
const ef = "modulepreload",
  Hs = {},
  tf = "/",
  xt = function (t, n) {
    alert("d");
    return !n || n.length === 0
      ? t()
      : Promise.all(
          n.map((r) => {
            if (((r = `${tf}${r}`), r in Hs)) return;
            Hs[r] = !0;
            const o = r.endsWith(".css"),
              s = o ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${r}"]${s}`)) return;
            const i = document.createElement("link");
            if (((i.rel = o ? "stylesheet" : ef), o || ((i.as = "script"), (i.crossOrigin = "")), (i.href = r), document.head.appendChild(i), o))
              return new Promise((l, c) => {
                i.addEventListener("load", l), i.addEventListener("error", () => c(new Error(`Unable to preload CSS for ${r}`)));
              });
          })
        ).then(() => t());
  };
/*!
 * vue-router v4.4.5
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */ const tn = typeof document != "undefined";
function Ll(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function nf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module" || (e.default && Ll(e.default));
}
const ce = Object.assign;
function Xr(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = rt(o) ? o.map(e) : e(o);
  }
  return n;
}
const On = () => {},
  rt = Array.isArray,
  Dl = /#/g,
  rf = /&/g,
  of = /\//g,
  sf = /=/g,
  lf = /\?/g,
  Ml = /\+/g,
  cf = /%5B/g,
  af = /%5D/g,
  Fl = /%5E/g,
  uf = /%60/g,
  Bl = /%7B/g,
  ff = /%7C/g,
  Nl = /%7D/g,
  df = /%20/g;
function Vo(e) {
  return encodeURI("" + e)
    .replace(ff, "|")
    .replace(cf, "[")
    .replace(af, "]");
}
function hf(e) {
  return Vo(e).replace(Bl, "{").replace(Nl, "}").replace(Fl, "^");
}
function go(e) {
  return Vo(e)
    .replace(Ml, "%2B")
    .replace(df, "+")
    .replace(Dl, "%23")
    .replace(rf, "%26")
    .replace(uf, "`")
    .replace(Bl, "{")
    .replace(Nl, "}")
    .replace(Fl, "^");
}
function pf(e) {
  return go(e).replace(sf, "%3D");
}
function gf(e) {
  return Vo(e).replace(Dl, "%23").replace(lf, "%3F");
}
function mf(e) {
  return e == null ? "" : gf(e).replace(of, "%2F");
}
function Hn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
const vf = /\/$/,
  yf = (e) => e.replace(vf, "");
function Zr(e, t, n = "/") {
  let r,
    o = {},
    s = "",
    i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    l < c && l >= 0 && (c = -1),
    c > -1 && ((r = t.slice(0, c)), (s = t.slice(c + 1, l > -1 ? l : t.length)), (o = e(s))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = Ef(r != null ? r : t, n)),
    { fullPath: r + (s && "?") + s + i, path: r, query: o, hash: Hn(i) }
  );
}
function bf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function js(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function _f(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1;
  return r > -1 && r === o && cn(t.matched[r], n.matched[o]) && kl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function cn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function kl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!wf(e[n], t[n])) return !1;
  return !0;
}
function wf(e, t) {
  return rt(e) ? zs(e, t) : rt(t) ? zs(t, e) : e === t;
}
function zs(e, t) {
  return rt(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
function Ef(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    o = r[r.length - 1];
  (o === ".." || o === ".") && r.push("");
  let s = n.length - 1,
    i,
    l;
  for (i = 0; i < r.length; i++)
    if (((l = r[i]), l !== "."))
      if (l === "..") s > 1 && s--;
      else break;
  return n.slice(0, s).join("/") + "/" + r.slice(i).join("/");
}
const St = { path: "/", name: void 0, params: {}, query: {}, hash: "", fullPath: "/", matched: [], meta: {}, redirectedFrom: void 0 };
var jn;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(jn || (jn = {}));
var In;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(In || (In = {}));
function xf(e) {
  if (!e)
    if (tn) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"), (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), yf(e);
}
const Sf = /^[^#]+#/;
function Cf(e, t) {
  return e.replace(Sf, "#") + t;
}
function Af(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return { behavior: t.behavior, left: r.left - n.left - (t.left || 0), top: r.top - n.top - (t.top || 0) };
}
const Lr = () => ({ left: window.scrollX, top: window.scrollY });
function Pf(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      o = typeof n == "string" ? (r ? document.getElementById(n.slice(1)) : document.querySelector(n)) : n;
    if (!o) return;
    t = Af(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function Vs(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const mo = new Map();
function Tf(e, t) {
  mo.set(e, t);
}
function Rf(e) {
  const t = mo.get(e);
  return mo.delete(e), t;
}
let Of = () => location.protocol + "//" + location.host;
function Hl(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    s = e.indexOf("#");
  if (s > -1) {
    let l = o.includes(e.slice(s)) ? e.slice(s).length : 1,
      c = o.slice(l);
    return c[0] !== "/" && (c = "/" + c), js(c, "");
  }
  return js(n, e) + r + o;
}
function If(e, t, n, r) {
  let o = [],
    s = [],
    i = null;
  const l = ({ state: h }) => {
    const g = Hl(e, location),
      y = n.value,
      b = t.value;
    let P = 0;
    if (h) {
      if (((n.value = g), (t.value = h), i && i === y)) {
        i = null;
        return;
      }
      P = b ? h.position - b.position : 0;
    } else r(g);
    o.forEach((R) => {
      R(n.value, y, { delta: P, type: jn.pop, direction: P ? (P > 0 ? In.forward : In.back) : In.unknown });
    });
  };
  function c() {
    i = n.value;
  }
  function a(h) {
    o.push(h);
    const g = () => {
      const y = o.indexOf(h);
      y > -1 && o.splice(y, 1);
    };
    return s.push(g), g;
  }
  function u() {
    const { history: h } = window;
    !h.state || h.replaceState(ce({}, h.state, { scroll: Lr() }), "");
  }
  function f() {
    for (const h of s) h();
    (s = []), window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", u);
  }
  return (
    window.addEventListener("popstate", l), window.addEventListener("beforeunload", u, { passive: !0 }), { pauseListeners: c, listen: a, destroy: f }
  );
}
function Us(e, t, n, r = !1, o = !1) {
  return { back: e, current: t, forward: n, replaced: r, position: window.history.length, scroll: o ? Lr() : null };
}
function $f(e) {
  const { history: t, location: n } = window,
    r = { value: Hl(e, n) },
    o = { value: t.state };
  o.value || s(r.value, { back: null, current: r.value, forward: null, position: t.length - 1, replaced: !0, scroll: null }, !0);
  function s(c, a, u) {
    const f = e.indexOf("#"),
      h = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + c : Of() + e + c;
    try {
      t[u ? "replaceState" : "pushState"](a, "", h), (o.value = a);
    } catch (g) {
      console.error(g), n[u ? "replace" : "assign"](h);
    }
  }
  function i(c, a) {
    const u = ce({}, t.state, Us(o.value.back, c, o.value.forward, !0), a, { position: o.value.position });
    s(c, u, !0), (r.value = c);
  }
  function l(c, a) {
    const u = ce({}, o.value, t.state, { forward: c, scroll: Lr() });
    s(u.current, u, !0);
    const f = ce({}, Us(r.value, c, null), { position: u.position + 1 }, a);
    s(c, f, !1), (r.value = c);
  }
  return { location: r, state: o, push: l, replace: i };
}
function Lf(e) {
  e = xf(e);
  const t = $f(e),
    n = If(e, t.state, t.location, t.replace);
  function r(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const o = ce({ location: "", base: e, go: r, createHref: Cf.bind(null, e) }, t, n);
  return (
    Object.defineProperty(o, "location", { enumerable: !0, get: () => t.location.value }),
    Object.defineProperty(o, "state", { enumerable: !0, get: () => t.state.value }),
    o
  );
}
function Df(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function jl(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const zl = Symbol("");
var Ks;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"), (e[(e.cancelled = 8)] = "cancelled"), (e[(e.duplicated = 16)] = "duplicated");
})(Ks || (Ks = {}));
function an(e, t) {
  return ce(new Error(), { type: e, [zl]: !0 }, t);
}
function ht(e, t) {
  return e instanceof Error && zl in e && (t == null || !!(e.type & t));
}
const Ws = "[^/]+?",
  Mf = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Ff = /[.+*?^${}()[\]/\\]/g;
function Bf(e, t) {
  const n = ce({}, Mf, t),
    r = [];
  let o = n.start ? "^" : "";
  const s = [];
  for (const a of e) {
    const u = a.length ? [] : [90];
    n.strict && !a.length && (o += "/");
    for (let f = 0; f < a.length; f++) {
      const h = a[f];
      let g = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0) f || (o += "/"), (o += h.value.replace(Ff, "\\$&")), (g += 40);
      else if (h.type === 1) {
        const { value: y, repeatable: b, optional: P, regexp: R } = h;
        s.push({ name: y, repeatable: b, optional: P });
        const S = R || Ws;
        if (S !== Ws) {
          g += 10;
          try {
            new RegExp(`(${S})`);
          } catch (v) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${S}): ` + v.message);
          }
        }
        let $ = b ? `((?:${S})(?:/(?:${S}))*)` : `(${S})`;
        f || ($ = P && a.length < 2 ? `(?:/${$})` : "/" + $),
          P && ($ += "?"),
          (o += $),
          (g += 20),
          P && (g += -8),
          b && (g += -20),
          S === ".*" && (g += -50);
      }
      u.push(g);
    }
    r.push(u);
  }
  if (n.strict && n.end) {
    const a = r.length - 1;
    r[a][r[a].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function l(a) {
    const u = a.match(i),
      f = {};
    if (!u) return null;
    for (let h = 1; h < u.length; h++) {
      const g = u[h] || "",
        y = s[h - 1];
      f[y.name] = g && y.repeatable ? g.split("/") : g;
    }
    return f;
  }
  function c(a) {
    let u = "",
      f = !1;
    for (const h of e) {
      (!f || !u.endsWith("/")) && (u += "/"), (f = !1);
      for (const g of h)
        if (g.type === 0) u += g.value;
        else if (g.type === 1) {
          const { value: y, repeatable: b, optional: P } = g,
            R = y in a ? a[y] : "";
          if (rt(R) && !b) throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const S = rt(R) ? R.join("/") : R;
          if (!S)
            if (P) h.length < 2 && (u.endsWith("/") ? (u = u.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${y}"`);
          u += S;
        }
    }
    return u || "/";
  }
  return { re: i, score: r, keys: s, parse: l, stringify: c };
}
function Nf(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Vl(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const s = Nf(r[n], o[n]);
    if (s) return s;
    n++;
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (Ys(r)) return 1;
    if (Ys(o)) return -1;
  }
  return o.length - r.length;
}
function Ys(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const kf = { type: 0, value: "" },
  Hf = /[a-zA-Z0-9_]/;
function jf(e) {
  if (!e) return [[]];
  if (e === "/") return [[kf]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${a}": ${g}`);
  }
  let n = 0,
    r = n;
  const o = [];
  let s;
  function i() {
    s && o.push(s), (s = []);
  }
  let l = 0,
    c,
    a = "",
    u = "";
  function f() {
    !a ||
      (n === 0
        ? s.push({ type: 0, value: a })
        : n === 1 || n === 2 || n === 3
        ? (s.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`),
          s.push({ type: 1, value: a, regexp: u, repeatable: c === "*" || c === "+", optional: c === "*" || c === "?" }))
        : t("Invalid state to consume buffer"),
      (a = ""));
  }
  function h() {
    a += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (a && f(), i()) : c === ":" ? (f(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        c === "(" ? (n = 2) : Hf.test(c) ? h() : (f(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")" ? (u[u.length - 1] == "\\" ? (u = u.slice(0, -1) + c) : (n = 3)) : (u += c);
        break;
      case 3:
        f(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--, (u = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${a}"`), f(), i(), o;
}
function zf(e, t, n) {
  const r = Bf(jf(e.path), n),
    o = ce(r, { record: e, parent: t, children: [], alias: [] });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function Vf(e, t) {
  const n = [],
    r = new Map();
  t = Zs({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(f) {
    return r.get(f);
  }
  function s(f, h, g) {
    const y = !g,
      b = Gs(f);
    b.aliasOf = g && g.record;
    const P = Zs(t, f),
      R = [b];
    if ("alias" in f) {
      const v = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const T of v) R.push(Gs(ce({}, b, { components: g ? g.record.components : b.components, path: T, aliasOf: g ? g.record : b })));
    }
    let S, $;
    for (const v of R) {
      const { path: T } = v;
      if (h && T[0] !== "/") {
        const H = h.record.path,
          j = H[H.length - 1] === "/" ? "" : "/";
        v.path = h.record.path + (T && j + T);
      }
      if (
        ((S = zf(v, h, P)),
        g ? g.alias.push(S) : (($ = $ || S), $ !== S && $.alias.push(S), y && f.name && !Xs(S) && i(f.name)),
        Ul(S) && c(S),
        b.children)
      ) {
        const H = b.children;
        for (let j = 0; j < H.length; j++) s(H[j], S, g && g.children[j]);
      }
      g = g || S;
    }
    return $
      ? () => {
          i($);
        }
      : On;
  }
  function i(f) {
    if (jl(f)) {
      const h = r.get(f);
      h && (r.delete(f), n.splice(n.indexOf(h), 1), h.children.forEach(i), h.alias.forEach(i));
    } else {
      const h = n.indexOf(f);
      h > -1 && (n.splice(h, 1), f.record.name && r.delete(f.record.name), f.children.forEach(i), f.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(f) {
    const h = Wf(f, n);
    n.splice(h, 0, f), f.record.name && !Xs(f) && r.set(f.record.name, f);
  }
  function a(f, h) {
    let g,
      y = {},
      b,
      P;
    if ("name" in f && f.name) {
      if (((g = r.get(f.name)), !g)) throw an(1, { location: f });
      (P = g.record.name),
        (y = ce(
          qs(
            h.params,
            g.keys
              .filter(($) => !$.optional)
              .concat(g.parent ? g.parent.keys.filter(($) => $.optional) : [])
              .map(($) => $.name)
          ),
          f.params &&
            qs(
              f.params,
              g.keys.map(($) => $.name)
            )
        )),
        (b = g.stringify(y));
    } else if (f.path != null) (b = f.path), (g = n.find(($) => $.re.test(b))), g && ((y = g.parse(b)), (P = g.record.name));
    else {
      if (((g = h.name ? r.get(h.name) : n.find(($) => $.re.test(h.path))), !g)) throw an(1, { location: f, currentLocation: h });
      (P = g.record.name), (y = ce({}, h.params, f.params)), (b = g.stringify(y));
    }
    const R = [];
    let S = g;
    for (; S; ) R.unshift(S.record), (S = S.parent);
    return { name: P, path: b, params: y, matched: R, meta: Kf(R) };
  }
  e.forEach((f) => s(f));
  function u() {
    (n.length = 0), r.clear();
  }
  return { addRoute: s, resolve: a, removeRoute: i, clearRoutes: u, getRoutes: l, getRecordMatcher: o };
}
function qs(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Gs(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Uf(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component },
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function Uf(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t;
}
function Xs(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Kf(e) {
  return e.reduce((t, n) => ce(t, n.meta), {});
}
function Zs(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Wf(e, t) {
  let n = 0,
    r = t.length;
  for (; n !== r; ) {
    const s = (n + r) >> 1;
    Vl(e, t[s]) < 0 ? (r = s) : (n = s + 1);
  }
  const o = Yf(e);
  return o && (r = t.lastIndexOf(o, r - 1)), r;
}
function Yf(e) {
  let t = e;
  for (; (t = t.parent); ) if (Ul(t) && Vl(e, t) === 0) return t;
}
function Ul({ record: e }) {
  return !!(e.name || (e.components && Object.keys(e.components).length) || e.redirect);
}
function qf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const s = r[o].replace(Ml, " "),
      i = s.indexOf("="),
      l = Hn(i < 0 ? s : s.slice(0, i)),
      c = i < 0 ? null : Hn(s.slice(i + 1));
    if (l in t) {
      let a = t[l];
      rt(a) || (a = t[l] = [a]), a.push(c);
    } else t[l] = c;
  }
  return t;
}
function Js(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = pf(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (rt(r) ? r.map((s) => s && go(s)) : [r && go(r)]).forEach((s) => {
      s !== void 0 && ((t += (t.length ? "&" : "") + n), s != null && (t += "=" + s));
    });
  }
  return t;
}
function Gf(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 && (t[n] = rt(r) ? r.map((o) => (o == null ? null : "" + o)) : r == null ? r : "" + r);
  }
  return t;
}
const Xf = Symbol(""),
  Qs = Symbol(""),
  Dr = Symbol(""),
  Kl = Symbol(""),
  vo = Symbol("");
function yn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Tt(e, t, n, r, o, s = (i) => i()) {
  const i = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((l, c) => {
      const a = (h) => {
          h === !1
            ? c(an(4, { from: n, to: t }))
            : h instanceof Error
            ? c(h)
            : Df(h)
            ? c(an(2, { from: t, to: h }))
            : (i && r.enterCallbacks[o] === i && typeof h == "function" && i.push(h), l());
        },
        u = s(() => e.call(r && r.instances[o], t, n, a));
      let f = Promise.resolve(u);
      e.length < 3 && (f = f.then(a)), f.catch((h) => c(h));
    });
}
function Jr(e, t, n, r, o = (s) => s()) {
  const s = [];
  for (const i of e)
    for (const l in i.components) {
      let c = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (Ll(c)) {
          const u = (c.__vccOpts || c)[t];
          u && s.push(Tt(u, n, r, i, l, o));
        } else {
          let a = c();
          s.push(() =>
            a.then((u) => {
              if (!u) throw new Error(`Couldn't resolve component "${l}" at "${i.path}"`);
              const f = nf(u) ? u.default : u;
              (i.mods[l] = u), (i.components[l] = f);
              const g = (f.__vccOpts || f)[t];
              return g && Tt(g, n, r, i, l, o)();
            })
          );
        }
    }
  return s;
}
function ei(e) {
  const t = ke(Dr),
    n = ke(Kl),
    r = ee(() => {
      const c = ut(e.to);
      return t.resolve(c);
    }),
    o = ee(() => {
      const { matched: c } = r.value,
        { length: a } = c,
        u = c[a - 1],
        f = n.matched;
      if (!u || !f.length) return -1;
      const h = f.findIndex(cn.bind(null, u));
      if (h > -1) return h;
      const g = ti(c[a - 2]);
      return a > 1 && ti(u) === g && f[f.length - 1].path !== g ? f.findIndex(cn.bind(null, c[a - 2])) : h;
    }),
    s = ee(() => o.value > -1 && ed(n.params, r.value.params)),
    i = ee(() => o.value > -1 && o.value === n.matched.length - 1 && kl(n.params, r.value.params));
  function l(c = {}) {
    return Qf(c) ? t[ut(e.replace) ? "replace" : "push"](ut(e.to)).catch(On) : Promise.resolve();
  }
  return { route: r, href: ee(() => r.value.href), isActive: s, isExactActive: i, navigate: l };
}
const Zf = $e({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: ei,
    setup(e, { slots: t }) {
      const n = Ke(ei(e)),
        { options: r } = ke(Dr),
        o = ee(() => ({
          [ni(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
          [ni(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive,
        }));
      return () => {
        const s = t.default && t.default(n);
        return e.custom
          ? s
          : zo("a", { "aria-current": n.isExactActive ? e.ariaCurrentValue : null, href: n.href, onClick: n.navigate, class: o.value }, s);
      };
    },
  }),
  Jf = Zf;
function Qf(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function ed(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == "string") {
      if (r !== o) return !1;
    } else if (!rt(o) || o.length !== r.length || r.some((s, i) => s !== o[i])) return !1;
  }
  return !0;
}
function ti(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const ni = (e, t, n) => (e != null ? e : t != null ? t : n),
  td = $e({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = ke(vo),
        o = ee(() => e.route || r.value),
        s = ke(Qs, 0),
        i = ee(() => {
          let a = ut(s);
          const { matched: u } = o.value;
          let f;
          for (; (f = u[a]) && !f.components; ) a++;
          return a;
        }),
        l = ee(() => o.value.matched[i.value]);
      Wt(
        Qs,
        ee(() => i.value + 1)
      ),
        Wt(Xf, l),
        Wt(vo, o);
      const c = pe();
      return (
        ye(
          () => [c.value, l.value, e.name],
          ([a, u, f], [h, g, y]) => {
            u &&
              ((u.instances[f] = a),
              g &&
                g !== u &&
                a &&
                a === h &&
                (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards), u.updateGuards.size || (u.updateGuards = g.updateGuards))),
              a && u && (!g || !cn(u, g) || !h) && (u.enterCallbacks[f] || []).forEach((b) => b(a));
          },
          { flush: "post" }
        ),
        () => {
          const a = o.value,
            u = e.name,
            f = l.value,
            h = f && f.components[u];
          if (!h) return ri(n.default, { Component: h, route: a });
          const g = f.props[u],
            y = g ? (g === !0 ? a.params : typeof g == "function" ? g(a) : g) : null,
            P = zo(
              h,
              ce({}, y, t, {
                onVnodeUnmounted: (R) => {
                  R.component.isUnmounted && (f.instances[u] = null);
                },
                ref: c,
              })
            );
          return ri(n.default, { Component: P, route: a }) || P;
        }
      );
    },
  });
function ri(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const nd = td;
function rd(e) {
  const t = Vf(e.routes, e),
    n = e.parseQuery || qf,
    r = e.stringifyQuery || Js,
    o = e.history,
    s = yn(),
    i = yn(),
    l = yn(),
    c = Jc(St);
  let a = St;
  tn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const u = Xr.bind(null, (E) => "" + E),
    f = Xr.bind(null, mf),
    h = Xr.bind(null, Hn);
  function g(E, k) {
    let F, z;
    return jl(E) ? ((F = t.getRecordMatcher(E)), (z = k)) : (z = E), t.addRoute(z, F);
  }
  function y(E) {
    const k = t.getRecordMatcher(E);
    k && t.removeRoute(k);
  }
  function b() {
    return t.getRoutes().map((E) => E.record);
  }
  function P(E) {
    return !!t.getRecordMatcher(E);
  }
  function R(E, k) {
    if (((k = ce({}, k || c.value)), typeof E == "string")) {
      const p = Zr(n, E, k.path),
        m = t.resolve({ path: p.path }, k),
        x = o.createHref(p.fullPath);
      return ce(p, m, { params: h(m.params), hash: Hn(p.hash), redirectedFrom: void 0, href: x });
    }
    let F;
    if (E.path != null) F = ce({}, E, { path: Zr(n, E.path, k.path).path });
    else {
      const p = ce({}, E.params);
      for (const m in p) p[m] == null && delete p[m];
      (F = ce({}, E, { params: f(p) })), (k.params = f(k.params));
    }
    const z = t.resolve(F, k),
      se = E.hash || "";
    z.params = u(h(z.params));
    const me = bf(r, ce({}, E, { hash: hf(se), path: z.path })),
      d = o.createHref(me);
    return ce({ fullPath: me, hash: se, query: r === Js ? Gf(E.query) : E.query || {} }, z, { redirectedFrom: void 0, href: d });
  }
  function S(E) {
    return typeof E == "string" ? Zr(n, E, c.value.path) : ce({}, E);
  }
  function $(E, k) {
    if (a !== E) return an(8, { from: k, to: E });
  }
  function v(E) {
    return j(E);
  }
  function T(E) {
    return v(ce(S(E), { replace: !0 }));
  }
  function H(E) {
    const k = E.matched[E.matched.length - 1];
    if (k && k.redirect) {
      const { redirect: F } = k;
      let z = typeof F == "function" ? F(E) : F;
      return (
        typeof z == "string" && ((z = z.includes("?") || z.includes("#") ? (z = S(z)) : { path: z }), (z.params = {})),
        ce({ query: E.query, hash: E.hash, params: z.path != null ? {} : E.params }, z)
      );
    }
  }
  function j(E, k) {
    const F = (a = R(E)),
      z = c.value,
      se = E.state,
      me = E.force,
      d = E.replace === !0,
      p = H(F);
    if (p) return j(ce(S(p), { state: typeof p == "object" ? ce({}, se, p.state) : se, force: me, replace: d }), k || F);
    const m = F;
    m.redirectedFrom = k;
    let x;
    return (
      !me && _f(r, z, F) && ((x = an(16, { to: m, from: z })), oe(z, z, !0, !1)),
      (x ? Promise.resolve(x) : N(m, z))
        .catch((_) => (ht(_) ? (ht(_, 2) ? _ : Y(_)) : te(_, m, z)))
        .then((_) => {
          if (_) {
            if (ht(_, 2)) return j(ce({ replace: d }, S(_.to), { state: typeof _.to == "object" ? ce({}, se, _.to.state) : se, force: me }), k || m);
          } else _ = D(m, z, !0, d, se);
          return V(m, z, _), _;
        })
    );
  }
  function Z(E, k) {
    const F = $(E, k);
    return F ? Promise.reject(F) : Promise.resolve();
  }
  function w(E) {
    const k = Ee.values().next().value;
    return k && typeof k.runWithContext == "function" ? k.runWithContext(E) : E();
  }
  function N(E, k) {
    let F;
    const [z, se, me] = od(E, k);
    F = Jr(z.reverse(), "beforeRouteLeave", E, k);
    for (const p of z)
      p.leaveGuards.forEach((m) => {
        F.push(Tt(m, E, k));
      });
    const d = Z.bind(null, E, k);
    return (
      F.push(d),
      Te(F)
        .then(() => {
          F = [];
          for (const p of s.list()) F.push(Tt(p, E, k));
          return F.push(d), Te(F);
        })
        .then(() => {
          F = Jr(se, "beforeRouteUpdate", E, k);
          for (const p of se)
            p.updateGuards.forEach((m) => {
              F.push(Tt(m, E, k));
            });
          return F.push(d), Te(F);
        })
        .then(() => {
          F = [];
          for (const p of me)
            if (p.beforeEnter)
              if (rt(p.beforeEnter)) for (const m of p.beforeEnter) F.push(Tt(m, E, k));
              else F.push(Tt(p.beforeEnter, E, k));
          return F.push(d), Te(F);
        })
        .then(() => (E.matched.forEach((p) => (p.enterCallbacks = {})), (F = Jr(me, "beforeRouteEnter", E, k, w)), F.push(d), Te(F)))
        .then(() => {
          F = [];
          for (const p of i.list()) F.push(Tt(p, E, k));
          return F.push(d), Te(F);
        })
        .catch((p) => (ht(p, 8) ? p : Promise.reject(p)))
    );
  }
  function V(E, k, F) {
    l.list().forEach((z) => w(() => z(E, k, F)));
  }
  function D(E, k, F, z, se) {
    const me = $(E, k);
    if (me) return me;
    const d = k === St,
      p = tn ? history.state : {};
    F && (z || d ? o.replace(E.fullPath, ce({ scroll: d && p && p.scroll }, se)) : o.push(E.fullPath, se)), (c.value = E), oe(E, k, F, d), Y();
  }
  let X;
  function he() {
    X ||
      (X = o.listen((E, k, F) => {
        if (!st.listening) return;
        const z = R(E),
          se = H(z);
        if (se) {
          j(ce(se, { replace: !0 }), z).catch(On);
          return;
        }
        a = z;
        const me = c.value;
        tn && Tf(Vs(me.fullPath, F.delta), Lr()),
          N(z, me)
            .catch((d) =>
              ht(d, 12)
                ? d
                : ht(d, 2)
                ? (j(d.to, z)
                    .then((p) => {
                      ht(p, 20) && !F.delta && F.type === jn.pop && o.go(-1, !1);
                    })
                    .catch(On),
                  Promise.reject())
                : (F.delta && o.go(-F.delta, !1), te(d, z, me))
            )
            .then((d) => {
              (d = d || D(z, me, !1)), d && (F.delta && !ht(d, 8) ? o.go(-F.delta, !1) : F.type === jn.pop && ht(d, 20) && o.go(-1, !1)), V(z, me, d);
            })
            .catch(On);
      }));
  }
  let Le = yn(),
    ue = yn(),
    re;
  function te(E, k, F) {
    Y(E);
    const z = ue.list();
    return z.length ? z.forEach((se) => se(E, k, F)) : console.error(E), Promise.reject(E);
  }
  function Ze() {
    return re && c.value !== St
      ? Promise.resolve()
      : new Promise((E, k) => {
          Le.add([E, k]);
        });
  }
  function Y(E) {
    return re || ((re = !E), he(), Le.list().forEach(([k, F]) => (E ? F(E) : k())), Le.reset()), E;
  }
  function oe(E, k, F, z) {
    const { scrollBehavior: se } = e;
    if (!tn || !se) return Promise.resolve();
    const me = (!F && Rf(Vs(E.fullPath, 0))) || ((z || !F) && history.state && history.state.scroll) || null;
    return Nt()
      .then(() => se(E, k, me))
      .then((d) => d && Pf(d))
      .catch((d) => te(d, E, k));
  }
  const J = (E) => o.go(E);
  let xe;
  const Ee = new Set(),
    st = {
      currentRoute: c,
      listening: !0,
      addRoute: g,
      removeRoute: y,
      clearRoutes: t.clearRoutes,
      hasRoute: P,
      getRoutes: b,
      resolve: R,
      options: e,
      push: v,
      replace: T,
      go: J,
      back: () => J(-1),
      forward: () => J(1),
      beforeEach: s.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: ue.add,
      isReady: Ze,
      install(E) {
        const k = this;
        E.component("RouterLink", Jf),
          E.component("RouterView", nd),
          (E.config.globalProperties.$router = k),
          Object.defineProperty(E.config.globalProperties, "$route", { enumerable: !0, get: () => ut(c) }),
          tn && !xe && c.value === St && ((xe = !0), v(o.location).catch((se) => {}));
        const F = {};
        for (const se in St) Object.defineProperty(F, se, { get: () => c.value[se], enumerable: !0 });
        E.provide(Dr, k), E.provide(Kl, ki(F)), E.provide(vo, c);
        const z = E.unmount;
        Ee.add(E),
          (E.unmount = function () {
            Ee.delete(E), Ee.size < 1 && ((a = St), X && X(), (X = null), (c.value = St), (xe = !1), (re = !1)), z();
          });
      },
    };
  function Te(E) {
    return E.reduce((k, F) => k.then(() => w(F)), Promise.resolve());
  }
  return st;
}
function od(e, t) {
  const n = [],
    r = [],
    o = [],
    s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const l = t.matched[i];
    l && (e.matched.find((a) => cn(a, l)) ? r.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((a) => cn(a, c)) || o.push(c));
  }
  return [n, r, o];
}
function Gh() {
  return ke(Dr);
}
const sd = [
    {
      path: "/love",
      component: () =>
        xt(
          () => import("./love.1735305046112.js"),
          [
            "assets/love.1735305046112.js",
            "assets/love.1735305046112.css",
            "assets/UnrealBloomPass.1735305046112.js",
            "assets/jszip.min.1735305046112.js",
            "assets/_commonjsHelpers.1735305046112.js",
            "assets/api.1735305046112.js",
          ]
        ),
    },
    {
      path: "/add",
      component: () =>
        xt(() => import("./add.1735305046112.js"), ["assets/add.1735305046112.js", "assets/add.1735305046112.css", "assets/api.1735305046112.js"]),
    },
    {
      path: "/edit",
      component: () =>
        xt(
          () => import("./edit.1735305046112.js"),
          [
            "assets/edit.1735305046112.js",
            "assets/edit.1735305046112.css",
            "assets/api.1735305046112.js",
            "assets/OpencvQr.1735305046112.js",
            "assets/_commonjsHelpers.1735305046112.js",
          ]
        ),
    },
    {
      path: "/letter",
      component: () =>
        xt(
          () => import("./letter.1735305046112.js"),
          ["assets/letter.1735305046112.js", "assets/letter.1735305046112.css", "assets/api.1735305046112.js"]
        ),
    },
    {
      path: "/christmas",
      component: () =>
        xt(
          () => import("./christmas.1735305046112.js"),
          [
            "assets/christmas.1735305046112.js",
            "assets/christmas.1735305046112.css",
            "assets/UnrealBloomPass.1735305046112.js",
            "assets/jszip.min.1735305046112.js",
            "assets/_commonjsHelpers.1735305046112.js",
            "assets/api.1735305046112.js",
          ]
        ),
    },
    {
      path: "/addChristmas",
      component: () =>
        xt(
          () => import("./addChristmas.1735305046112.js"),
          [
            "assets/addChristmas.1735305046112.js",
            "assets/addChristmas.1735305046112.css",
            "assets/add_christmas_head.1735305046112.js",
            "assets/api.1735305046112.js",
          ]
        ),
    },
    {
      path: "/editChristmas",
      component: () =>
        xt(
          () => import("./editChristmas.1735305046112.js"),
          [
            "assets/editChristmas.1735305046112.js",
            "assets/editChristmas.1735305046112.css",
            "assets/add_christmas_head.1735305046112.js",
            "assets/api.1735305046112.js",
            "assets/OpencvQr.1735305046112.js",
            "assets/_commonjsHelpers.1735305046112.js",
          ]
        ),
    },
    {
      path: "/demo",
      component: () =>
        xt(
          () => import("./demo.1735305046112.js"),
          ["assets/demo.1735305046112.js", "assets/demo.1735305046112.css", "assets/UnrealBloomPass.1735305046112.js"]
        ),
    },
  ],
  id = rd({ history: Lf((/(\/prp\/[^/]+)/i.test(location.pathname) ? RegExp.$1 : "") + "/"), routes: sd });
(function (e, t) {
  var n = e.document,
    r = n.documentElement,
    o = n.querySelector('meta[name="viewport"]'),
    s = n.querySelector('meta[name="flexible"]'),
    i = 0,
    l = 0,
    c,
    a = t.flexible || (t.flexible = {});
  if (o) {
    console.warn("\u5C06\u6839\u636E\u5DF2\u6709\u7684meta\u6807\u7B7E\u6765\u8BBE\u7F6E\u7F29\u653E\u6BD4\u4F8B");
    var u = o.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
    u && ((l = parseFloat(u[1])), (i = parseInt(1 / l)));
  } else if (s) {
    var f = s.getAttribute("content");
    if (f) {
      var h = f.match(/initial\-dpr=([\d\.]+)/),
        g = f.match(/maximum\-dpr=([\d\.]+)/);
      h && ((i = parseFloat(h[1])), (l = parseFloat((1 / i).toFixed(2)))), g && ((i = parseFloat(g[1])), (l = parseFloat((1 / i).toFixed(2))));
    }
  }
  if (!i && !l) {
    e.navigator.appVersion.match(/android/gi);
    var y = e.navigator.appVersion.match(/iphone/gi),
      b = e.devicePixelRatio;
    y ? (b >= 3 && (!i || i >= 3) ? (i = 3) : b >= 2 && (!i || i >= 2) ? (i = 2) : (i = 1)) : (i = 1), (l = 1 / i);
  }
  if ((r.setAttribute("data-dpr", i), !o))
    if (
      ((o = n.createElement("meta")),
      o.setAttribute("name", "viewport"),
      o.setAttribute("content", "initial-scale=" + l + ", maximum-scale=" + l + ", minimum-scale=" + l + ", user-scalable=no"),
      r.firstElementChild)
    )
      r.firstElementChild.appendChild(o);
    else {
      var P = n.createElement("div");
      P.appendChild(o), n.write(P.innerHTML);
    }
  function R() {
    var S = r.getBoundingClientRect().width;
    S / i > 540 && (S = 540 * i);
    var $ = S / 10;
    (r.style.fontSize = $ + "px"), (a.rem = e.rem = $);
  }
  e.addEventListener(
    "resize",
    function () {
      clearTimeout(c), (c = setTimeout(R, 300));
    },
    !1
  ),
    e.addEventListener(
      "pageshow",
      function (S) {
        S.persisted && (clearTimeout(c), (c = setTimeout(R, 300)));
      },
      !1
    ),
    n.readyState === "complete"
      ? (n.body.style.fontSize = 12 * i + "px")
      : n.addEventListener(
          "DOMContentLoaded",
          function (S) {
            n.body.style.fontSize = 12 * i + "px";
          },
          !1
        ),
    R(),
    (a.dpr = e.dpr = i),
    (a.refreshRem = R),
    (a.rem2px = function (S) {
      var $ = parseFloat(S) * this.rem;
      return typeof S == "string" && S.match(/rem$/) && ($ += "px"), $;
    }),
    (a.px2rem = function (S) {
      var $ = parseFloat(S) / this.rem;
      return typeof S == "string" && S.match(/px$/) && ($ += "rem"), $;
    });
})(window, window.lib || (window.lib = {}));
const yt = (e) => e != null,
  gr = (e) => typeof e == "function",
  Uo = (e) => e !== null && typeof e == "object",
  Wl = (e) => Uo(e) && gr(e.then) && gr(e.catch),
  Yl = (e) => typeof e == "number" || /^\d+(\.\d+)?$/.test(e),
  ld = () => (Ko ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1);
function cd() {}
const ft = Object.assign,
  Ko = typeof window != "undefined";
function oi(e, t) {
  const n = t.split(".");
  let r = e;
  return (
    n.forEach((o) => {
      var s;
      r = Uo(r) && (s = r[o]) != null ? s : "";
    }),
    r
  );
}
function wn(e, t, n) {
  return t.reduce((r, o) => ((!n || e[o] !== void 0) && (r[o] = e[o]), r), {});
}
const ql = (e) => (Array.isArray(e) ? e : [e]),
  mr = null,
  _e = [Number, String],
  we = { type: Boolean, default: !0 },
  En = (e) => ({ type: e, required: !0 }),
  Gl = () => ({ type: Array, default: () => [] }),
  Xh = (e) => ({ type: Number, default: e }),
  mt = (e) => ({ type: _e, default: e }),
  be = (e) => ({ type: String, default: e });
var Kn = typeof window != "undefined";
function si(e) {
  return Kn ? requestAnimationFrame(e) : -1;
}
function er(e) {
  si(() => si(e));
}
var ad = (e) => e === window,
  ii = (e, t) => ({ top: 0, left: 0, right: e, bottom: t, width: e, height: t }),
  ud = (e) => {
    const t = ut(e);
    if (ad(t)) {
      const n = t.innerWidth,
        r = t.innerHeight;
      return ii(n, r);
    }
    return t != null && t.getBoundingClientRect ? t.getBoundingClientRect() : ii(0, 0);
  };
function fd(e) {
  const t = ke(e, null);
  if (t) {
    const n = dn(),
      { link: r, unlink: o, internalChildren: s } = t;
    r(n), Tr(() => o(n));
    const i = ee(() => s.indexOf(n));
    return { parent: t, index: i };
  }
  return { parent: null, index: pe(-1) };
}
function dd(e) {
  const t = [],
    n = (r) => {
      Array.isArray(r) &&
        r.forEach((o) => {
          var s;
          Nn(o) &&
            (t.push(o),
            (s = o.component) != null && s.subTree && (t.push(o.component.subTree), n(o.component.subTree.children)),
            o.children && n(o.children));
        });
    };
  return n(e), t;
}
var li = (e, t) => {
  const n = e.indexOf(t);
  return n === -1 ? e.findIndex((r) => t.key !== void 0 && t.key !== null && r.type === t.type && r.key === t.key) : n;
};
function hd(e, t, n) {
  const r = dd(e.subTree.children);
  n.sort((s, i) => li(r, s.vnode) - li(r, i.vnode));
  const o = n.map((s) => s.proxy);
  t.sort((s, i) => {
    const l = o.indexOf(s),
      c = o.indexOf(i);
    return l - c;
  });
}
function pd(e) {
  const t = Ke([]),
    n = Ke([]),
    r = dn();
  return {
    children: t,
    linkChildren: (s) => {
      Wt(
        e,
        Object.assign(
          {
            link: (c) => {
              c.proxy && (n.push(c), t.push(c.proxy), hd(r, t, n));
            },
            unlink: (c) => {
              const a = n.indexOf(c);
              t.splice(a, 1), n.splice(a, 1);
            },
            children: t,
            internalChildren: n,
          },
          s
        )
      );
    },
  };
}
function Xl(e) {
  let t;
  qt(() => {
    e(),
      Nt(() => {
        t = !0;
      });
  }),
    Ar(() => {
      t && e();
    });
}
function Mr(e, t, n = {}) {
  if (!Kn) return;
  const { target: r = window, passive: o = !1, capture: s = !1 } = n;
  let i = !1,
    l;
  const c = (f) => {
      if (i) return;
      const h = ut(f);
      h && !l && (h.addEventListener(e, t, { capture: s, passive: o }), (l = !0));
    },
    a = (f) => {
      if (i) return;
      const h = ut(f);
      h && l && (h.removeEventListener(e, t, s), (l = !1));
    };
  Tr(() => a(r)), Vn(() => a(r)), Xl(() => c(r));
  let u;
  return (
    Pe(r) &&
      (u = ye(r, (f, h) => {
        a(h), c(f);
      })),
    () => {
      u == null || u(), a(r), (i = !0);
    }
  );
}
var tr, Qr;
function gd() {
  if (!tr && ((tr = pe(0)), (Qr = pe(0)), Kn)) {
    const e = () => {
      (tr.value = window.innerWidth), (Qr.value = window.innerHeight);
    };
    e(), window.addEventListener("resize", e, { passive: !0 }), window.addEventListener("orientationchange", e, { passive: !0 });
  }
  return { width: tr, height: Qr };
}
var md = /scroll|auto|overlay/i,
  vd = Kn ? window : void 0;
function yd(e) {
  return e.tagName !== "HTML" && e.tagName !== "BODY" && e.nodeType === 1;
}
function bd(e, t = vd) {
  let n = e;
  for (; n && n !== t && yd(n); ) {
    const { overflowY: r } = window.getComputedStyle(n);
    if (md.test(r)) return n;
    n = n.parentNode;
  }
  return t;
}
var nr;
function _d() {
  if (!nr && ((nr = pe("visible")), Kn)) {
    const e = () => {
      nr.value = document.hidden ? "hidden" : "visible";
    };
    e(), window.addEventListener("visibilitychange", e);
  }
  return nr;
}
var wd = Symbol("van-field");
function Ed(e) {
  const t = ke(wd, null);
  t &&
    !t.customValue.value &&
    ((t.customValue.value = e),
    ye(e, () => {
      t.resetValidation(), t.validateWithTrigger("onChange");
    }));
}
ld();
const xd = (e) => e.stopPropagation();
function un(e, t) {
  (typeof e.cancelable != "boolean" || e.cancelable) && e.preventDefault(), t && xd(e);
}
function ci(e) {
  const t = ut(e);
  if (!t) return !1;
  const n = window.getComputedStyle(t),
    r = n.display === "none",
    o = t.offsetParent === null && n.position !== "fixed";
  return r || o;
}
const { width: Zl, height: Jl } = gd();
function qe(e) {
  if (yt(e)) return Yl(e) ? `${e}px` : String(e);
}
function Wo(e) {
  if (yt(e)) {
    if (Array.isArray(e)) return { width: qe(e[0]), height: qe(e[1]) };
    const t = qe(e);
    return { width: t, height: t };
  }
}
function Sd(e) {
  const t = {};
  return e !== void 0 && (t.zIndex = +e), t;
}
const Cd = /-(\w)/g,
  Ql = (e) => e.replace(Cd, (t, n) => n.toUpperCase()),
  Ad = (e) =>
    e
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, ""),
  Rt = (e, t, n) => Math.min(Math.max(e, t), n),
  { hasOwnProperty: Pd } = Object.prototype;
function Td(e, t, n) {
  const r = t[n];
  !yt(r) || (!Pd.call(e, n) || !Uo(r) ? (e[n] = r) : (e[n] = ec(Object(e[n]), r)));
}
function ec(e, t) {
  return (
    Object.keys(t).forEach((n) => {
      Td(e, t, n);
    }),
    e
  );
}
var Rd = {
  name: "\u59D3\u540D",
  tel: "\u7535\u8BDD",
  save: "\u4FDD\u5B58",
  confirm: "\u786E\u8BA4",
  cancel: "\u53D6\u6D88",
  delete: "\u5220\u9664",
  loading: "\u52A0\u8F7D\u4E2D...",
  noCoupon: "\u6682\u65E0\u4F18\u60E0\u5238",
  nameEmpty: "\u8BF7\u586B\u5199\u59D3\u540D",
  addContact: "\u6DFB\u52A0\u8054\u7CFB\u4EBA",
  telInvalid: "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u7535\u8BDD",
  vanCalendar: {
    end: "\u7ED3\u675F",
    start: "\u5F00\u59CB",
    title: "\u65E5\u671F\u9009\u62E9",
    weekdays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
    monthTitle: (e, t) => `${e}\u5E74${t}\u6708`,
    rangePrompt: (e) => `\u6700\u591A\u9009\u62E9 ${e} \u5929`,
  },
  vanCascader: { select: "\u8BF7\u9009\u62E9" },
  vanPagination: { prev: "\u4E0A\u4E00\u9875", next: "\u4E0B\u4E00\u9875" },
  vanPullRefresh: { pulling: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...", loosing: "\u91CA\u653E\u5373\u53EF\u5237\u65B0..." },
  vanSubmitBar: { label: "\u5408\u8BA1:" },
  vanCoupon: { unlimited: "\u65E0\u95E8\u69DB", discount: (e) => `${e}\u6298`, condition: (e) => `\u6EE1${e}\u5143\u53EF\u7528` },
  vanCouponCell: { title: "\u4F18\u60E0\u5238", count: (e) => `${e}\u5F20\u53EF\u7528` },
  vanCouponList: {
    exchange: "\u5151\u6362",
    close: "\u4E0D\u4F7F\u7528",
    enable: "\u53EF\u7528",
    disabled: "\u4E0D\u53EF\u7528",
    placeholder: "\u8F93\u5165\u4F18\u60E0\u7801",
  },
  vanAddressEdit: {
    area: "\u5730\u533A",
    postal: "\u90AE\u653F\u7F16\u7801",
    areaEmpty: "\u8BF7\u9009\u62E9\u5730\u533A",
    addressEmpty: "\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740",
    postalEmpty: "\u90AE\u653F\u7F16\u7801\u4E0D\u6B63\u786E",
    addressDetail: "\u8BE6\u7EC6\u5730\u5740",
    defaultAddress: "\u8BBE\u4E3A\u9ED8\u8BA4\u6536\u8D27\u5730\u5740",
  },
  vanAddressList: { add: "\u65B0\u589E\u5730\u5740" },
};
const ai = pe("zh-CN"),
  ui = Ke({ "zh-CN": Rd }),
  Od = {
    messages() {
      return ui[ai.value];
    },
    use(e, t) {
      (ai.value = e), this.add({ [e]: t });
    },
    add(e = {}) {
      ec(ui, e);
    },
  };
var Id = Od;
function $d(e) {
  const t = Ql(e) + ".";
  return (n, ...r) => {
    const o = Id.messages(),
      s = oi(o, t + n) || oi(o, n);
    return gr(s) ? s(...r) : s;
  };
}
function yo(e, t) {
  return t
    ? typeof t == "string"
      ? ` ${e}--${t}`
      : Array.isArray(t)
      ? t.reduce((n, r) => n + yo(e, r), "")
      : Object.keys(t).reduce((n, r) => n + (t[r] ? yo(e, r) : ""), "")
    : "";
}
function Ld(e) {
  return (t, n) => (t && typeof t != "string" && ((n = t), (t = "")), (t = t ? `${e}__${t}` : e), `${t}${yo(t, n)}`);
}
function We(e) {
  const t = `van-${e}`;
  return [t, Ld(t), $d(t)];
}
const Yo = "van-hairline",
  Zh = `${Yo}--top`,
  Jh = `${Yo}--left`,
  Dd = `${Yo}--surround`,
  tc = "van-haptics-feedback";
function qo(e, { args: t = [], done: n, canceled: r }) {
  if (e) {
    const o = e.apply(null, t);
    Wl(o)
      ? o
          .then((s) => {
            s ? n() : r && r();
          })
          .catch(cd)
      : o
      ? n()
      : r && r();
  } else n();
}
function ot(e) {
  return (
    (e.install = (t) => {
      const { name: n } = e;
      n && (t.component(n, e), t.component(Ql(`-${n}`), e));
    }),
    e
  );
}
const nc = Symbol();
function Md(e) {
  const t = ke(nc, null);
  t &&
    ye(t, (n) => {
      n && e();
    });
}
function hn(e) {
  const t = dn();
  t && ft(t.proxy, e);
}
const Fd = { to: [String, Object], url: String, replace: Boolean };
function Bd({ to: e, url: t, replace: n, $router: r }) {
  e && r ? r[n ? "replace" : "push"](e) : t && (n ? location.replace(t) : (location.href = t));
}
function Nd() {
  const e = dn().proxy;
  return () => Bd(e);
}
const [kd, fi] = We("badge"),
  Hd = { dot: Boolean, max: _e, tag: be("div"), color: String, offset: Array, content: _e, showZero: we, position: be("top-right") };
var jd = $e({
  name: kd,
  props: Hd,
  setup(e, { slots: t }) {
    const n = () => {
        if (t.content) return !0;
        const { content: i, showZero: l } = e;
        return yt(i) && i !== "" && (l || (i !== 0 && i !== "0"));
      },
      r = () => {
        const { dot: i, max: l, content: c } = e;
        if (!i && n()) return t.content ? t.content() : yt(l) && Yl(c) && +c > l ? `${l}+` : c;
      },
      o = ee(() => {
        const i = { background: e.color };
        if (e.offset) {
          const [l, c] = e.offset;
          t.default
            ? ((i.top = qe(c)), typeof l == "number" ? (i.right = qe(-l)) : (i.right = l.startsWith("-") ? l.replace("-", "") : `-${l}`))
            : ((i.marginTop = qe(c)), (i.marginLeft = qe(l)));
        }
        return i;
      }),
      s = () => {
        if (n() || e.dot) return O("div", { class: fi([e.position, { dot: e.dot, fixed: !!t.default }]), style: o.value }, [r()]);
      };
    return () => {
      if (t.default) {
        const { tag: i } = e;
        return O(i, { class: fi("wrapper") }, { default: () => [t.default(), s()] });
      }
      return s();
    };
  },
});
const zd = ot(jd);
let rc = 2e3;
const Vd = () => ++rc,
  Ud = (e) => {
    rc = e;
  },
  [oc, Kd] = We("config-provider"),
  sc = Symbol(oc),
  Wd = { tag: be("div"), zIndex: Number, themeVars: Object, iconPrefix: String };
function Yd(e) {
  const t = {};
  return (
    Object.keys(e).forEach((n) => {
      t[`--van-${Ad(n)}`] = e[n];
    }),
    t
  );
}
$e({
  name: oc,
  props: Wd,
  setup(e, { slots: t }) {
    const n = ee(() => {
      if (e.themeVars) return Yd(e.themeVars);
    });
    return (
      Wt(sc, e),
      Ga(() => {
        e.zIndex !== void 0 && Ud(e.zIndex);
      }),
      () =>
        O(
          e.tag,
          { class: Kd(), style: n.value },
          {
            default: () => {
              var r;
              return [(r = t.default) == null ? void 0 : r.call(t)];
            },
          }
        )
    );
  },
});
const [qd, di] = We("icon"),
  Gd = (e) => (e == null ? void 0 : e.includes("/")),
  Xd = { dot: Boolean, tag: be("i"), name: String, size: _e, badge: _e, color: String, badgeProps: Object, classPrefix: String };
var Zd = $e({
  name: qd,
  props: Xd,
  setup(e, { slots: t }) {
    const n = ke(sc, null),
      r = ee(() => e.classPrefix || (n == null ? void 0 : n.iconPrefix) || di());
    return () => {
      const { tag: o, dot: s, name: i, size: l, badge: c, color: a } = e,
        u = Gd(i);
      return O(
        zd,
        Lt({ dot: s, tag: o, class: [r.value, u ? "" : `${r.value}-${i}`], style: { color: a, fontSize: qe(l) }, content: c }, e.badgeProps),
        {
          default: () => {
            var f;
            return [(f = t.default) == null ? void 0 : f.call(t), u && O("img", { class: di("image"), src: i }, null)];
          },
        }
      );
    };
  },
});
const Ot = ot(Zd),
  [Jd, $n] = We("loading"),
  Qd = Array(12)
    .fill(null)
    .map((e, t) => O("i", { class: $n("line", String(t + 1)) }, null)),
  eh = O("svg", { class: $n("circular"), viewBox: "25 25 50 50" }, [O("circle", { cx: "50", cy: "50", r: "20", fill: "none" }, null)]),
  th = { size: _e, type: be("circular"), color: String, vertical: Boolean, textSize: _e, textColor: String };
var nh = $e({
  name: Jd,
  props: th,
  setup(e, { slots: t }) {
    const n = ee(() => ft({ color: e.color }, Wo(e.size))),
      r = () => {
        var o;
        if (t.default)
          return O("span", { class: $n("text"), style: { fontSize: qe(e.textSize), color: (o = e.textColor) != null ? o : e.color } }, [t.default()]);
      };
    return () => {
      const { type: o, vertical: s } = e;
      return O("div", { class: $n([o, { vertical: s }]), "aria-live": "polite", "aria-busy": !0 }, [
        O("span", { class: $n("spinner", o), style: n.value }, [o === "spinner" ? Qd : eh]),
        r(),
      ]);
    };
  },
});
const Go = ot(nh),
  [rh, Xt] = We("button"),
  oh = ft({}, Fd, {
    tag: be("button"),
    text: String,
    icon: String,
    type: be("default"),
    size: be("normal"),
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    nativeType: be("button"),
    loadingSize: _e,
    loadingText: String,
    loadingType: String,
    iconPosition: be("left"),
  });
var sh = $e({
  name: rh,
  props: oh,
  emits: ["click"],
  setup(e, { emit: t, slots: n }) {
    const r = Nd(),
      o = () => (n.loading ? n.loading() : O(Go, { size: e.loadingSize, type: e.loadingType, class: Xt("loading") }, null)),
      s = () => {
        if (e.loading) return o();
        if (n.icon) return O("div", { class: Xt("icon") }, [n.icon()]);
        if (e.icon) return O(Ot, { name: e.icon, class: Xt("icon"), classPrefix: e.iconPrefix }, null);
      },
      i = () => {
        let a;
        if ((e.loading ? (a = e.loadingText) : (a = n.default ? n.default() : e.text), a)) return O("span", { class: Xt("text") }, [a]);
      },
      l = () => {
        const { color: a, plain: u } = e;
        if (a) {
          const f = { color: u ? a : "white" };
          return u || (f.background = a), a.includes("gradient") ? (f.border = 0) : (f.borderColor = a), f;
        }
      },
      c = (a) => {
        e.loading ? un(a) : e.disabled || (t("click", a), r());
      };
    return () => {
      const {
          tag: a,
          type: u,
          size: f,
          block: h,
          round: g,
          plain: y,
          square: b,
          loading: P,
          disabled: R,
          hairline: S,
          nativeType: $,
          iconPosition: v,
        } = e,
        T = [Xt([u, f, { plain: y, block: h, round: g, square: b, loading: P, disabled: R, hairline: S }]), { [Dd]: S }];
      return O(
        a,
        { type: $, class: T, style: l(), disabled: R, onClick: c },
        { default: () => [O("div", { class: Xt("content") }, [v === "left" && s(), i(), v === "right" && s()])] }
      );
    };
  },
});
const ih = ot(sh),
  ic = {
    show: Boolean,
    zIndex: _e,
    overlay: we,
    duration: _e,
    teleport: [String, Object],
    lockScroll: we,
    lazyRender: we,
    beforeClose: Function,
    overlayStyle: Object,
    overlayClass: mr,
    transitionAppear: Boolean,
    closeOnClickOverlay: we,
  },
  Qh = Object.keys(ic);
function lh(e, t) {
  return e > t ? "horizontal" : t > e ? "vertical" : "";
}
function Xo() {
  const e = pe(0),
    t = pe(0),
    n = pe(0),
    r = pe(0),
    o = pe(0),
    s = pe(0),
    i = pe(""),
    l = () => i.value === "vertical",
    c = () => i.value === "horizontal",
    a = () => {
      (n.value = 0), (r.value = 0), (o.value = 0), (s.value = 0), (i.value = "");
    };
  return {
    move: (h) => {
      const g = h.touches[0];
      (n.value = (g.clientX < 0 ? 0 : g.clientX) - e.value),
        (r.value = g.clientY - t.value),
        (o.value = Math.abs(n.value)),
        (s.value = Math.abs(r.value));
      const y = 10;
      (!i.value || (o.value < y && s.value < y)) && (i.value = lh(o.value, s.value));
    },
    start: (h) => {
      a(), (e.value = h.touches[0].clientX), (t.value = h.touches[0].clientY);
    },
    reset: a,
    startX: e,
    startY: t,
    deltaX: n,
    deltaY: r,
    offsetX: o,
    offsetY: s,
    direction: i,
    isVertical: l,
    isHorizontal: c,
  };
}
let bn = 0;
const hi = "van-overflow-hidden";
function ch(e, t) {
  const n = Xo(),
    r = "01",
    o = "10",
    s = (u) => {
      n.move(u);
      const f = n.deltaY.value > 0 ? o : r,
        h = bd(u.target, e.value),
        { scrollHeight: g, offsetHeight: y, scrollTop: b } = h;
      let P = "11";
      b === 0 ? (P = y >= g ? "00" : "01") : b + y >= g && (P = "10"),
        P !== "11" && n.isVertical() && !(parseInt(P, 2) & parseInt(f, 2)) && un(u, !0);
    },
    i = () => {
      document.addEventListener("touchstart", n.start),
        document.addEventListener("touchmove", s, { passive: !1 }),
        bn || document.body.classList.add(hi),
        bn++;
    },
    l = () => {
      bn &&
        (document.removeEventListener("touchstart", n.start),
        document.removeEventListener("touchmove", s),
        bn--,
        bn || document.body.classList.remove(hi));
    },
    c = () => t() && i(),
    a = () => t() && l();
  Xl(c),
    Vn(a),
    fn(a),
    ye(t, (u) => {
      u ? i() : l();
    });
}
function lc(e) {
  const t = pe(!1);
  return (
    ye(
      e,
      (n) => {
        n && (t.value = n);
      },
      { immediate: !0 }
    ),
    (n) => () => t.value ? n() : null
  );
}
const [ah, uh] = We("overlay"),
  fh = { show: Boolean, zIndex: _e, duration: _e, className: mr, lockScroll: we, lazyRender: we, customStyle: Object };
var dh = $e({
  name: ah,
  props: fh,
  setup(e, { slots: t }) {
    const n = pe(),
      r = lc(() => e.show || !e.lazyRender),
      o = (i) => {
        e.lockScroll && un(i, !0);
      },
      s = r(() => {
        var i;
        const l = ft(Sd(e.zIndex), e.customStyle);
        return (
          yt(e.duration) && (l.animationDuration = `${e.duration}s`),
          Fo(O("div", { ref: n, style: l, class: [uh(), e.className] }, [(i = t.default) == null ? void 0 : i.call(t)]), [[Il, e.show]])
        );
      });
    return Mr("touchmove", o, { target: n }), () => O(Rl, { name: "van-fade", appear: !0 }, { default: s });
  },
});
const hh = ot(dh),
  ph = ft({}, ic, {
    round: Boolean,
    position: be("center"),
    closeIcon: be("cross"),
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
    closeOnPopstate: Boolean,
    closeIconPosition: be("top-right"),
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean,
  }),
  [gh, pi] = We("popup");
var mh = $e({
  name: gh,
  inheritAttrs: !1,
  props: ph,
  emits: ["open", "close", "opened", "closed", "keydown", "update:show", "click-overlay", "click-close-icon"],
  setup(e, { emit: t, attrs: n, slots: r }) {
    let o, s;
    const i = pe(),
      l = pe(),
      c = lc(() => e.show || !e.lazyRender),
      a = ee(() => {
        const T = { zIndex: i.value };
        if (yt(e.duration)) {
          const H = e.position === "center" ? "animationDuration" : "transitionDuration";
          T[H] = `${e.duration}s`;
        }
        return T;
      }),
      u = () => {
        o || ((o = !0), (i.value = e.zIndex !== void 0 ? +e.zIndex : Vd()), t("open"));
      },
      f = () => {
        o &&
          qo(e.beforeClose, {
            done() {
              (o = !1), t("close"), t("update:show", !1);
            },
          });
      },
      h = (T) => {
        t("click-overlay", T), e.closeOnClickOverlay && f();
      },
      g = () => {
        if (e.overlay)
          return O(
            hh,
            {
              show: e.show,
              class: e.overlayClass,
              zIndex: i.value,
              duration: e.duration,
              customStyle: e.overlayStyle,
              role: e.closeOnClickOverlay ? "button" : void 0,
              tabindex: e.closeOnClickOverlay ? 0 : void 0,
              onClick: h,
            },
            { default: r["overlay-content"] }
          );
      },
      y = (T) => {
        t("click-close-icon", T), f();
      },
      b = () => {
        if (e.closeable)
          return O(
            Ot,
            {
              role: "button",
              tabindex: 0,
              name: e.closeIcon,
              class: [pi("close-icon", e.closeIconPosition), tc],
              classPrefix: e.iconPrefix,
              onClick: y,
            },
            null
          );
      },
      P = () => t("opened"),
      R = () => t("closed"),
      S = (T) => t("keydown", T),
      $ = c(() => {
        var T;
        const { round: H, position: j, safeAreaInsetTop: Z, safeAreaInsetBottom: w } = e;
        return Fo(
          O(
            "div",
            Lt(
              {
                ref: l,
                style: a.value,
                role: "dialog",
                tabindex: 0,
                class: [pi({ round: H, [j]: j }), { "van-safe-area-top": Z, "van-safe-area-bottom": w }],
                onKeydown: S,
              },
              n
            ),
            [(T = r.default) == null ? void 0 : T.call(r), b()]
          ),
          [[Il, e.show]]
        );
      }),
      v = () => {
        const { position: T, transition: H, transitionAppear: j } = e,
          Z = T === "center" ? "van-fade" : `van-popup-slide-${T}`;
        return O(Rl, { name: H || Z, appear: j, onAfterEnter: P, onAfterLeave: R }, { default: $ });
      };
    return (
      ye(
        () => e.show,
        (T) => {
          T &&
            !o &&
            (u(),
            n.tabindex === 0 &&
              Nt(() => {
                var H;
                (H = l.value) == null || H.focus();
              })),
            !T && o && ((o = !1), t("close"));
        }
      ),
      hn({ popupRef: l }),
      ch(l, () => e.show && e.lockScroll),
      Mr("popstate", () => {
        e.closeOnPopstate && (f(), (s = !1));
      }),
      qt(() => {
        e.show && u();
      }),
      Ar(() => {
        s && (t("update:show", !0), (s = !1));
      }),
      Vn(() => {
        e.show && e.teleport && (f(), (s = !0));
      }),
      Wt(nc, () => e.show),
      () => (e.teleport ? O(da, { to: e.teleport }, { default: () => [g(), v()] }) : O(Qe, null, [g(), v()]))
    );
  },
});
const vh = ot(mh);
function yh() {
  const e = Ke({ show: !1 }),
    t = (o) => {
      e.show = o;
    },
    n = (o) => {
      ft(e, o, { transitionAppear: !0 }), t(!0);
    },
    r = () => t(!1);
  return hn({ open: n, close: r, toggle: t }), { open: n, close: r, state: e, toggle: t };
}
function bh(e) {
  const t = $l(e),
    n = document.createElement("div");
  return (
    document.body.appendChild(n),
    {
      instance: t.mount(n),
      unmount() {
        t.unmount(), document.body.removeChild(n);
      },
    }
  );
}
const [_h, Zt] = We("image"),
  wh = {
    src: String,
    alt: String,
    fit: String,
    position: String,
    round: Boolean,
    block: Boolean,
    width: _e,
    height: _e,
    radius: _e,
    lazyLoad: Boolean,
    iconSize: _e,
    showError: we,
    errorIcon: be("photo-fail"),
    iconPrefix: String,
    showLoading: we,
    loadingIcon: be("photo"),
  };
var Eh = $e({
  name: _h,
  props: wh,
  emits: ["load", "error"],
  setup(e, { emit: t, slots: n }) {
    const r = pe(!1),
      o = pe(!0),
      s = pe(),
      { $Lazyload: i } = dn().proxy,
      l = ee(() => {
        const b = { width: qe(e.width), height: qe(e.height) };
        return yt(e.radius) && ((b.overflow = "hidden"), (b.borderRadius = qe(e.radius))), b;
      });
    ye(
      () => e.src,
      () => {
        (r.value = !1), (o.value = !0);
      }
    );
    const c = (b) => {
        (o.value = !1), t("load", b);
      },
      a = (b) => {
        (r.value = !0), (o.value = !1), t("error", b);
      },
      u = (b, P, R) => (R ? R() : O(Ot, { name: b, size: e.iconSize, class: P, classPrefix: e.iconPrefix }, null)),
      f = () => {
        if (o.value && e.showLoading) return O("div", { class: Zt("loading") }, [u(e.loadingIcon, Zt("loading-icon"), n.loading)]);
        if (r.value && e.showError) return O("div", { class: Zt("error") }, [u(e.errorIcon, Zt("error-icon"), n.error)]);
      },
      h = () => {
        if (r.value || !e.src) return;
        const b = { alt: e.alt, class: Zt("img"), style: { objectFit: e.fit, objectPosition: e.position } };
        return e.lazyLoad
          ? Fo(O("img", Lt({ ref: s }, b), null), [[Pa("lazy"), e.src]])
          : O("img", Lt({ src: e.src, onLoad: c, onError: a }, b), null);
      },
      g = ({ el: b }) => {
        const P = () => {
          b === s.value && o.value && c();
        };
        s.value ? P() : Nt(P);
      },
      y = ({ el: b }) => {
        b === s.value && !r.value && a();
      };
    return (
      i &&
        Ko &&
        (i.$on("loaded", g),
        i.$on("error", y),
        fn(() => {
          i.$off("loaded", g), i.$off("error", y);
        })),
      () => {
        var b;
        return O("div", { class: Zt({ round: e.round, block: e.block }), style: l.value }, [h(), f(), (b = n.default) == null ? void 0 : b.call(n)]);
      }
    );
  },
});
const cc = ot(Eh),
  [ac, rr] = We("swipe"),
  xh = {
    loop: we,
    width: _e,
    height: _e,
    vertical: Boolean,
    autoplay: mt(0),
    duration: mt(500),
    touchable: we,
    lazyRender: Boolean,
    initialSwipe: mt(0),
    indicatorColor: String,
    showIndicators: we,
    stopPropagation: we,
  },
  uc = Symbol(ac);
var Sh = $e({
  name: ac,
  props: xh,
  emits: ["change"],
  setup(e, { emit: t, slots: n }) {
    const r = pe(),
      o = pe(),
      s = Ke({ rect: null, width: 0, height: 0, offset: 0, active: 0, swiping: !1 }),
      i = Xo(),
      { children: l, linkChildren: c } = pd(uc),
      a = ee(() => l.length),
      u = ee(() => s[e.vertical ? "height" : "width"]),
      f = ee(() => (e.vertical ? i.deltaY.value : i.deltaX.value)),
      h = ee(() => (s.rect ? (e.vertical ? s.rect.height : s.rect.width) - u.value * a.value : 0)),
      g = ee(() => Math.ceil(Math.abs(h.value) / u.value)),
      y = ee(() => a.value * u.value),
      b = ee(() => (s.active + a.value) % a.value),
      P = ee(() => {
        const Y = e.vertical ? "vertical" : "horizontal";
        return i.direction.value === Y;
      }),
      R = ee(() => {
        const Y = { transitionDuration: `${s.swiping ? 0 : e.duration}ms`, transform: `translate${e.vertical ? "Y" : "X"}(${s.offset}px)` };
        if (u.value) {
          const oe = e.vertical ? "height" : "width",
            J = e.vertical ? "width" : "height";
          (Y[oe] = `${y.value}px`), (Y[J] = e[J] ? `${e[J]}px` : "");
        }
        return Y;
      }),
      S = (Y) => {
        const { active: oe } = s;
        return Y ? (e.loop ? Rt(oe + Y, -1, a.value) : Rt(oe + Y, 0, g.value)) : oe;
      },
      $ = (Y, oe = 0) => {
        let J = Y * u.value;
        e.loop || (J = Math.min(J, -h.value));
        let xe = oe - J;
        return e.loop || (xe = Rt(xe, h.value, 0)), xe;
      },
      v = ({ pace: Y = 0, offset: oe = 0, emitChange: J }) => {
        if (a.value <= 1) return;
        const { active: xe } = s,
          Ee = S(Y),
          st = $(Ee, oe);
        if (e.loop) {
          if (l[0] && st !== h.value) {
            const Te = st < h.value;
            l[0].setOffset(Te ? y.value : 0);
          }
          if (l[a.value - 1] && st !== 0) {
            const Te = st > 0;
            l[a.value - 1].setOffset(Te ? -y.value : 0);
          }
        }
        (s.active = Ee), (s.offset = st), J && Ee !== xe && t("change", b.value);
      },
      T = () => {
        (s.swiping = !0), s.active <= -1 ? v({ pace: a.value }) : s.active >= a.value && v({ pace: -a.value });
      },
      H = () => {
        T(),
          i.reset(),
          er(() => {
            (s.swiping = !1), v({ pace: -1, emitChange: !0 });
          });
      },
      j = () => {
        T(),
          i.reset(),
          er(() => {
            (s.swiping = !1), v({ pace: 1, emitChange: !0 });
          });
      };
    let Z;
    const w = () => clearTimeout(Z),
      N = () => {
        w(),
          e.autoplay > 0 &&
            a.value > 1 &&
            (Z = setTimeout(() => {
              j(), N();
            }, +e.autoplay));
      },
      V = (Y = +e.initialSwipe) => {
        if (!r.value) return;
        const oe = () => {
          var J, xe;
          if (!ci(r)) {
            const Ee = { width: r.value.offsetWidth, height: r.value.offsetHeight };
            (s.rect = Ee), (s.width = +((J = e.width) != null ? J : Ee.width)), (s.height = +((xe = e.height) != null ? xe : Ee.height));
          }
          a.value && (Y = Math.min(a.value - 1, Y)),
            (s.active = Y),
            (s.swiping = !0),
            (s.offset = $(Y)),
            l.forEach((Ee) => {
              Ee.setOffset(0);
            }),
            N();
        };
        ci(r) ? Nt().then(oe) : oe();
      },
      D = () => V(s.active);
    let X;
    const he = (Y) => {
        !e.touchable || (i.start(Y), (X = Date.now()), w(), T());
      },
      Le = (Y) => {
        e.touchable &&
          s.swiping &&
          (i.move(Y),
          P.value &&
            ((!e.loop && ((s.active === 0 && f.value > 0) || (s.active === a.value - 1 && f.value < 0))) ||
              (un(Y, e.stopPropagation), v({ offset: f.value }))));
      },
      ue = () => {
        if (!e.touchable || !s.swiping) return;
        const Y = Date.now() - X,
          oe = f.value / Y;
        if ((Math.abs(oe) > 0.25 || Math.abs(f.value) > u.value / 2) && P.value) {
          const xe = e.vertical ? i.offsetY.value : i.offsetX.value;
          let Ee = 0;
          e.loop ? (Ee = xe > 0 ? (f.value > 0 ? -1 : 1) : 0) : (Ee = -Math[f.value > 0 ? "ceil" : "floor"](f.value / u.value)),
            v({ pace: Ee, emitChange: !0 });
        } else f.value && v({ pace: 0 });
        (s.swiping = !1), N();
      },
      re = (Y, oe = {}) => {
        T(),
          i.reset(),
          er(() => {
            let J;
            e.loop && Y === a.value ? (J = s.active === 0 ? 0 : Y) : (J = Y % a.value),
              oe.immediate
                ? er(() => {
                    s.swiping = !1;
                  })
                : (s.swiping = !1),
              v({ pace: J - s.active, emitChange: !0 });
          });
      },
      te = (Y, oe) => {
        const J = oe === b.value,
          xe = J ? { backgroundColor: e.indicatorColor } : void 0;
        return O("i", { style: xe, class: rr("indicator", { active: J }) }, null);
      },
      Ze = () => {
        if (n.indicator) return n.indicator({ active: b.value, total: a.value });
        if (e.showIndicators && a.value > 1)
          return O("div", { class: rr("indicators", { vertical: e.vertical }) }, [Array(a.value).fill("").map(te)]);
      };
    return (
      hn({ prev: H, next: j, state: s, resize: D, swipeTo: re }),
      c({ size: u, props: e, count: a, activeIndicator: b }),
      ye(
        () => e.initialSwipe,
        (Y) => V(+Y)
      ),
      ye(a, () => V(s.active)),
      ye(() => e.autoplay, N),
      ye([Zl, Jl], D),
      ye(_d(), (Y) => {
        Y === "visible" ? N() : w();
      }),
      qt(V),
      Ar(() => V(s.active)),
      Md(() => V(s.active)),
      Vn(w),
      fn(w),
      Mr("touchmove", Le, { target: o }),
      () => {
        var Y;
        return O("div", { ref: r, class: rr() }, [
          O(
            "div",
            { ref: o, style: R.value, class: rr("track", { vertical: e.vertical }), onTouchstartPassive: he, onTouchend: ue, onTouchcancel: ue },
            [(Y = n.default) == null ? void 0 : Y.call(n)]
          ),
          Ze(),
        ]);
      }
    );
  },
});
const Ch = ot(Sh),
  [Ah, Ph] = We("swipe-item");
var Th = $e({
  name: Ah,
  setup(e, { slots: t }) {
    let n;
    const r = Ke({ offset: 0, inited: !1, mounted: !1 }),
      { parent: o, index: s } = fd(uc);
    if (!o) return;
    const i = ee(() => {
        const a = {},
          { vertical: u } = o.props;
        return (
          o.size.value && (a[u ? "height" : "width"] = `${o.size.value}px`), r.offset && (a.transform = `translate${u ? "Y" : "X"}(${r.offset}px)`), a
        );
      }),
      l = ee(() => {
        const { loop: a, lazyRender: u } = o.props;
        if (!u || n) return !0;
        if (!r.mounted) return !1;
        const f = o.activeIndicator.value,
          h = o.count.value - 1,
          g = f === 0 && a ? h : f - 1,
          y = f === h && a ? 0 : f + 1;
        return (n = s.value === f || s.value === g || s.value === y), n;
      }),
      c = (a) => {
        r.offset = a;
      };
    return (
      qt(() => {
        Nt(() => {
          r.mounted = !0;
        });
      }),
      hn({ setOffset: c }),
      () => {
        var a;
        return O("div", { class: Ph(), style: i.value }, [l.value ? ((a = t.default) == null ? void 0 : a.call(t)) : null]);
      }
    );
  },
});
const Rh = ot(Th),
  gi = (e) => Math.sqrt((e[0].clientX - e[1].clientX) ** 2 + (e[0].clientY - e[1].clientY) ** 2),
  eo = We("image-preview")[1];
var Oh = $e({
  props: { src: String, show: Boolean, active: Number, minZoom: En(_e), maxZoom: En(_e), rootWidth: En(Number), rootHeight: En(Number) },
  emits: ["scale", "close"],
  setup(e, { emit: t, slots: n }) {
    const r = Ke({ scale: 1, moveX: 0, moveY: 0, moving: !1, zooming: !1, imageRatio: 0, displayWidth: 0, displayHeight: 0 }),
      o = Xo(),
      s = pe(),
      i = ee(() => {
        const { rootWidth: w, rootHeight: N } = e,
          V = N / w;
        return r.imageRatio > V;
      }),
      l = ee(() => {
        const { scale: w, moveX: N, moveY: V, moving: D, zooming: X } = r,
          he = { transitionDuration: X || D ? "0s" : ".3s" };
        if (w !== 1) {
          const Le = N / w,
            ue = V / w;
          he.transform = `scale(${w}, ${w}) translate(${Le}px, ${ue}px)`;
        }
        return he;
      }),
      c = ee(() => {
        if (r.imageRatio) {
          const { rootWidth: w, rootHeight: N } = e,
            V = i.value ? N / r.imageRatio : w;
          return Math.max(0, (r.scale * V - w) / 2);
        }
        return 0;
      }),
      a = ee(() => {
        if (r.imageRatio) {
          const { rootWidth: w, rootHeight: N } = e,
            V = i.value ? N : w * r.imageRatio;
          return Math.max(0, (r.scale * V - N) / 2);
        }
        return 0;
      }),
      u = (w) => {
        (w = Rt(w, +e.minZoom, +e.maxZoom + 1)), w !== r.scale && ((r.scale = w), t("scale", { scale: w, index: e.active }));
      },
      f = () => {
        u(1), (r.moveX = 0), (r.moveY = 0);
      },
      h = () => {
        const w = r.scale > 1 ? 1 : 2;
        u(w), (r.moveX = 0), (r.moveY = 0);
      };
    let g, y, b, P, R, S, $;
    const v = (w) => {
        const { touches: N } = w,
          { offsetX: V } = o;
        o.start(w),
          (g = N.length),
          (y = r.moveX),
          (b = r.moveY),
          ($ = Date.now()),
          (r.moving = g === 1 && r.scale !== 1),
          (r.zooming = g === 2 && !V.value),
          r.zooming && ((P = r.scale), (R = gi(w.touches)));
      },
      T = (w) => {
        const { touches: N } = w;
        if ((o.move(w), (r.moving || r.zooming) && un(w, !0), r.moving)) {
          const { deltaX: V, deltaY: D } = o,
            X = V.value + y,
            he = D.value + b;
          (r.moveX = Rt(X, -c.value, c.value)), (r.moveY = Rt(he, -a.value, a.value));
        }
        if (r.zooming && N.length === 2) {
          const V = gi(N),
            D = (P * V) / R;
          u(D);
        }
      },
      H = () => {
        if (g > 1) return;
        const { offsetX: w, offsetY: N } = o,
          V = Date.now() - $,
          D = 250,
          X = 5;
        w.value < X &&
          N.value < X &&
          V < D &&
          (S
            ? (clearTimeout(S), (S = null), h())
            : (S = setTimeout(() => {
                t("close"), (S = null);
              }, D)));
      },
      j = (w) => {
        let N = !1;
        (r.moving || r.zooming) &&
          ((N = !0),
          r.moving && y === r.moveX && b === r.moveY && (N = !1),
          w.touches.length ||
            (r.zooming && ((r.moveX = Rt(r.moveX, -c.value, c.value)), (r.moveY = Rt(r.moveY, -a.value, a.value)), (r.zooming = !1)),
            (r.moving = !1),
            (y = 0),
            (b = 0),
            (P = 1),
            r.scale < 1 && f(),
            r.scale > e.maxZoom && (r.scale = +e.maxZoom))),
          un(w, N),
          H(),
          o.reset();
      },
      Z = (w) => {
        const { naturalWidth: N, naturalHeight: V } = w.target;
        r.imageRatio = V / N;
      };
    return (
      ye(() => e.active, f),
      ye(
        () => e.show,
        (w) => {
          w || f();
        }
      ),
      Mr("touchmove", T, {
        target: ee(() => {
          var w;
          return (w = s.value) == null ? void 0 : w.$el;
        }),
      }),
      () => {
        const w = { loading: () => O(Go, { type: "spinner" }, null) };
        return O(
          Rh,
          { ref: s, class: eo("swipe-item"), onTouchstartPassive: v, onTouchend: j, onTouchcancel: j },
          {
            default: () => [
              n.image
                ? O("div", { class: eo("image-wrap") }, [n.image({ src: e.src })])
                : O(cc, { src: e.src, fit: "contain", class: eo("image", { vertical: i.value }), style: l.value, onLoad: Z }, w),
            ],
          }
        );
      }
    );
  },
});
const [Ih, Jt] = We("image-preview"),
  $h = ["show", "transition", "overlayStyle", "closeOnPopstate"],
  Lh = {
    show: Boolean,
    loop: we,
    images: Gl(),
    minZoom: mt(1 / 3),
    maxZoom: mt(3),
    overlay: we,
    closeable: Boolean,
    showIndex: we,
    className: mr,
    closeIcon: be("clear"),
    transition: String,
    beforeClose: Function,
    overlayClass: mr,
    overlayStyle: Object,
    swipeDuration: mt(300),
    startPosition: mt(0),
    showIndicators: Boolean,
    closeOnPopstate: we,
    closeIconPosition: be("top-right"),
  };
var fc = $e({
  name: Ih,
  props: Lh,
  emits: ["scale", "close", "closed", "change", "update:show"],
  setup(e, { emit: t, slots: n }) {
    const r = pe(),
      o = Ke({ active: 0, rootWidth: 0, rootHeight: 0 }),
      s = () => {
        if (r.value) {
          const P = ud(r.value.$el);
          (o.rootWidth = P.width), (o.rootHeight = P.height), r.value.resize();
        }
      },
      i = (P) => t("scale", P),
      l = (P) => t("update:show", P),
      c = () => {
        qo(e.beforeClose, { args: [o.active], done: () => l(!1) });
      },
      a = (P) => {
        P !== o.active && ((o.active = P), t("change", P));
      },
      u = () => {
        if (e.showIndex) return O("div", { class: Jt("index") }, [n.index ? n.index({ index: o.active }) : `${o.active + 1} / ${e.images.length}`]);
      },
      f = () => {
        if (n.cover) return O("div", { class: Jt("cover") }, [n.cover()]);
      },
      h = () =>
        O(
          Ch,
          {
            ref: r,
            lazyRender: !0,
            loop: e.loop,
            class: Jt("swipe"),
            duration: e.swipeDuration,
            initialSwipe: e.startPosition,
            showIndicators: e.showIndicators,
            indicatorColor: "white",
            onChange: a,
          },
          {
            default: () => [
              e.images.map((P) =>
                O(
                  Oh,
                  {
                    src: P,
                    show: e.show,
                    active: o.active,
                    maxZoom: e.maxZoom,
                    minZoom: e.minZoom,
                    rootWidth: o.rootWidth,
                    rootHeight: o.rootHeight,
                    onScale: i,
                    onClose: c,
                  },
                  { image: n.image }
                )
              ),
            ],
          }
        ),
      g = () => {
        if (e.closeable) return O(Ot, { role: "button", name: e.closeIcon, class: [Jt("close-icon", e.closeIconPosition), tc], onClick: c }, null);
      },
      y = () => t("closed"),
      b = (P, R) => {
        var S;
        return (S = r.value) == null ? void 0 : S.swipeTo(P, R);
      };
    return (
      hn({ swipeTo: b }),
      qt(s),
      ye([Zl, Jl], s),
      ye(
        () => e.startPosition,
        (P) => a(+P)
      ),
      ye(
        () => e.show,
        (P) => {
          const { images: R, startPosition: S } = e;
          P
            ? (a(+S),
              Nt(() => {
                s(), b(+S, { immediate: !0 });
              }))
            : t("close", { index: o.active, url: R[o.active] });
        }
      ),
      () =>
        O(vh, Lt({ class: [Jt(), e.className], overlayClass: [Jt("overlay"), e.overlayClass], onClosed: y, "onUpdate:show": l }, wn(e, $h)), {
          default: () => [g(), h(), u(), f()],
        })
    );
  },
});
let cr;
const Dh = {
  loop: !0,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: void 0,
  onClose: void 0,
  onChange: void 0,
  teleport: "body",
  className: "",
  showIndex: !0,
  closeable: !1,
  closeIcon: "clear",
  transition: void 0,
  beforeClose: void 0,
  overlayStyle: void 0,
  overlayClass: void 0,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: !1,
  closeOnPopstate: !0,
  closeIconPosition: "top-right",
};




const vr = (e, t = 0) => {
  if (!!Ko) return cr || Mh(), (e = Array.isArray(e) ? { images: e, startPosition: t } : e), cr.open(ft({}, Dh, e)), cr;
};
vr.Component = ot(fc);
vr.install = (e) => {
  e.use(vr.Component);
};
const [Fh, Se, Bh] = We("uploader");
function mi(e, t) {
  return new Promise((n) => {
    if (t === "file") {
      n();
      return;
    }
    const r = new FileReader();
    (r.onload = (o) => {
      n(o.target.result);
    }),
      t === "dataUrl" ? r.readAsDataURL(e) : t === "text" && r.readAsText(e);
  });
}
function dc(e, t) {
  return ql(e).some((n) => (n.file ? (gr(t) ? t(n.file) : n.file.size > t) : !1));
}
function Nh(e, t) {
  const n = [],
    r = [];
  return (
    e.forEach((o) => {
      dc(o, t) ? r.push(o) : n.push(o);
    }),
    { valid: n, invalid: r }
  );
}
const kh = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|avif)/i,
  Hh = (e) => kh.test(e);
function hc(e) {
  return e.isImage
    ? !0
    : e.file && e.file.type
    ? e.file.type.indexOf("image") === 0
    : e.url
    ? Hh(e.url)
    : typeof e.content == "string"
    ? e.content.indexOf("data:image") === 0
    : !1;
}
var jh = $e({
  props: {
    name: _e,
    item: En(Object),
    index: Number,
    imageFit: String,
    lazyLoad: Boolean,
    deletable: Boolean,
    previewSize: [Number, String, Array],
    beforeDelete: Function,
  },
  emits: ["delete", "preview"],
  setup(e, { emit: t, slots: n }) {
    const r = () => {
        const { status: a, message: u } = e.item;
        if (a === "uploading" || a === "failed") {
          const f = a === "failed" ? O(Ot, { name: "close", class: Se("mask-icon") }, null) : O(Go, { class: Se("loading") }, null),
            h = yt(u) && u !== "";
          return O("div", { class: Se("mask") }, [f, h && O("div", { class: Se("mask-message") }, [u])]);
        }
      },
      o = (a) => {
        const { name: u, item: f, index: h, beforeDelete: g } = e;
        a.stopPropagation(), qo(g, { args: [f, { name: u, index: h }], done: () => t("delete") });
      },
      s = () => t("preview"),
      i = () => {
        if (e.deletable && e.item.status !== "uploading") {
          const a = n["preview-delete"];
          return O("div", { role: "button", class: Se("preview-delete", { shadow: !a }), tabindex: 0, "aria-label": Bh("delete"), onClick: o }, [
            a ? a() : O(Ot, { name: "cross", class: Se("preview-delete-icon") }, null),
          ]);
        }
      },
      l = () => {
        if (n["preview-cover"]) {
          const { index: a, item: u } = e;
          return O("div", { class: Se("preview-cover") }, [n["preview-cover"](ft({ index: a }, u))]);
        }
      },
      c = () => {
        const { item: a, lazyLoad: u, imageFit: f, previewSize: h } = e;
        return hc(a)
          ? O(
              cc,
              {
                fit: f,
                src: a.objectUrl || a.content || a.url,
                class: Se("preview-image"),
                width: Array.isArray(h) ? h[0] : h,
                height: Array.isArray(h) ? h[1] : h,
                lazyLoad: u,
                onClick: s,
              },
              { default: l }
            )
          : O("div", { class: Se("file"), style: Wo(e.previewSize) }, [
              O(Ot, { class: Se("file-icon"), name: "description" }, null),
              O("div", { class: [Se("file-name"), "van-ellipsis"] }, [a.file ? a.file.name : a.url]),
              l(),
            ]);
      };
    return () => O("div", { class: Se("preview") }, [c(), r(), i()]);
  },
});
const zh = {
  name: mt(""),
  accept: be("image/*"),
  capture: String,
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  lazyLoad: Boolean,
  maxCount: mt(1 / 0),
  imageFit: be("cover"),
  resultType: be("dataUrl"),
  uploadIcon: be("photograph"),
  uploadText: String,
  deletable: we,
  afterRead: Function,
  showUpload: we,
  modelValue: Gl(),
  beforeRead: Function,
  beforeDelete: Function,
  previewSize: [Number, String, Array],
  previewImage: we,
  previewOptions: Object,
  previewFullImage: we,
  maxSize: { type: [Number, String, Function], default: 1 / 0 },
};
var Vh = $e({
  name: Fh,
  props: zh,
  emits: ["delete", "oversize", "click-upload", "close-preview", "click-preview", "update:modelValue"],
  setup(e, { emit: t, slots: n }) {
    const r = pe(),
      o = [],
      s = (v = e.modelValue.length) => ({ name: e.name, index: v }),
      i = () => {
        r.value && (r.value.value = "");
      },
      l = (v) => {
        if ((i(), dc(v, e.maxSize)))
          if (Array.isArray(v)) {
            const T = Nh(v, e.maxSize);
            if (((v = T.valid), t("oversize", T.invalid, s()), !v.length)) return;
          } else {
            t("oversize", v, s());
            return;
          }
        (v = Ke(v)), t("update:modelValue", [...e.modelValue, ...ql(v)]), e.afterRead && e.afterRead(v, s());
      },
      c = (v) => {
        const { maxCount: T, modelValue: H, resultType: j } = e;
        if (Array.isArray(v)) {
          const Z = +T - H.length;
          v.length > Z && (v = v.slice(0, Z)),
            Promise.all(v.map((w) => mi(w, j))).then((w) => {
              const N = v.map((V, D) => {
                const X = { file: V, status: "", message: "", objectUrl: URL.createObjectURL(V) };
                return w[D] && (X.content = w[D]), X;
              });
              l(N);
            });
        } else
          mi(v, j).then((Z) => {
            const w = { file: v, status: "", message: "", objectUrl: URL.createObjectURL(v) };
            Z && (w.content = Z), l(w);
          });
      },
      a = (v) => {
        const { files: T } = v.target;
        if (e.disabled || !T || !T.length) return;
        const H = T.length === 1 ? T[0] : [].slice.call(T);
        if (e.beforeRead) {
          const j = e.beforeRead(H, s());
          if (!j) {
            i();
            return;
          }
          if (Wl(j)) {
            j.then((Z) => {
              c(Z || H);
            }).catch(i);
            return;
          }
        }
        c(H);
      };
    let u;
    const f = () => t("close-preview"),
      h = (v) => {
        if (e.previewFullImage) {
          const T = e.modelValue.filter(hc),
            H = T.map((j) => (j.objectUrl && !j.url && j.status !== "failed" && ((j.url = j.objectUrl), o.push(j.url)), j.url)).filter(Boolean);
          u = vr(ft({ images: H, startPosition: T.indexOf(v), onClose: f }, e.previewOptions));
        }
      },
      g = () => {
        u && u.close();
      },
      y = (v, T) => {
        const H = e.modelValue.slice(0);
        H.splice(T, 1), t("update:modelValue", H), t("delete", v, s(T));
      },
      b = (v, T) => {
        const H = ["imageFit", "deletable", "previewSize", "beforeDelete"],
          j = ft(wn(e, H), wn(v, H, !0));
        return O(
          jh,
          Lt(
            { item: v, index: T, onClick: () => t("click-preview", v, s(T)), onDelete: () => y(v, T), onPreview: () => h(v) },
            wn(e, ["name", "lazyLoad"]),
            j
          ),
          wn(n, ["preview-cover", "preview-delete"])
        );
      },
      P = () => {
        if (e.previewImage) return e.modelValue.map(b);
      },
      R = (v) => t("click-upload", v),
      S = () => {
        if (e.modelValue.length >= e.maxCount || !e.showUpload) return;
        const v = e.readonly
          ? null
          : O(
              "input",
              {
                ref: r,
                type: "file",
                class: Se("input"),
                accept: e.accept,
                capture: e.capture,
                multiple: e.multiple,
                disabled: e.disabled,
                onChange: a,
              },
              null
            );
        return n.default
          ? O("div", { class: Se("input-wrapper"), onClick: R }, [n.default(), v])
          : O("div", { class: Se("upload", { readonly: e.readonly }), style: Wo(e.previewSize), onClick: R }, [
              O(Ot, { name: e.uploadIcon, class: Se("upload-icon") }, null),
              e.uploadText && O("span", { class: Se("upload-text") }, [e.uploadText]),
              v,
            ]);
      },
      $ = () => {
        r.value && !e.disabled && r.value.click();
      };
    return (
      fn(() => {
        o.forEach((v) => URL.revokeObjectURL(v));
      }),
      hn({ chooseFile: $, closeImagePreview: g }),
      Ed(() => e.modelValue),
      () => O("div", { class: Se() }, [O("div", { class: Se("wrapper", { disabled: e.disabled }) }, [P(), S()])])
    );
  },
});
const Uh = ot(Vh);
$l(Qu).use(id).use(ih).use(Uh).mount("#app");
export {
  gr as $,
  Sl as A,
  Fo as B,
  Yh as C,
  ut as D,
  ca as E,
  Co as F,
  au as G,
  Nt as H,
  Ot as I,
  Md as J,
  ud as K,
  Go as L,
  pd as M,
  we as N,
  Fd as O,
  vh as P,
  Nd as Q,
  fd as R,
  ee as S,
  hn as T,
  ih as U,
  ic as V,
  Qh as W,
  qh as X,
  qe as Y,
  cd as Z,
  Xu as _,
  wl as a,
  Jh as a0,
  Zh as a1,
  qo as a2,
  Pc as a3,
  Qe as a4,
  Kh as a5,
  Pe as a6,
  Wh as a7,
  We as b,
  su as c,
  Xh as d,
  mr as e,
  $e as f,
  Tr as g,
  O as h,
  Lt as i,
  yt as j,
  ft as k,
  Ko as l,
  be as m,
  _e as n,
  qt as o,
  wn as p,
  ot as q,
  pe as r,
  Uo as s,
  bh as t,
  Gh as u,
  yh as v,
  ye as w,
  dn as x,
  Ke as y,
  Ca as z,
};
