/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */ const $s = "160",
  Hn = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 },
  Gn = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 },
  nc = 0,
  _a = 1,
  ic = 2,
  sl = 1,
  rc = 2,
  rn = 3,
  Sn = 0,
  Te = 1,
  sn = 2,
  ln = 0,
  fi = 1,
  Os = 2,
  va = 3,
  xa = 4,
  sc = 5,
  Dn = 100,
  ac = 101,
  oc = 102,
  Ma = 103,
  Sa = 104,
  lc = 200,
  cc = 201,
  hc = 202,
  uc = 203,
  Fs = 204,
  Bs = 205,
  fc = 206,
  dc = 207,
  pc = 208,
  mc = 209,
  gc = 210,
  _c = 211,
  vc = 212,
  xc = 213,
  Mc = 214,
  Sc = 0,
  yc = 1,
  Ec = 2,
  Dr = 3,
  Tc = 4,
  bc = 5,
  Ac = 6,
  wc = 7,
  Gr = 0,
  Rc = 1,
  Cc = 2,
  xn = 0,
  Pc = 1,
  Lc = 2,
  Dc = 3,
  Uc = 4,
  Ic = 5,
  Nc = 6,
  al = 300,
  mi = 301,
  gi = 302,
  zs = 303,
  Hs = 304,
  Vr = 306,
  Gs = 1e3,
  ze = 1001,
  Vs = 1002,
  me = 1003,
  ya = 1004,
  Qr = 1005,
  De = 1006,
  Oc = 1007,
  Oi = 1008,
  Mn = 1009,
  Fc = 1010,
  Bc = 1011,
  Qs = 1012,
  ol = 1013,
  _n = 1014,
  vn = 1015,
  cn = 1016,
  ll = 1017,
  cl = 1018,
  Nn = 1020,
  zc = 1021,
  He = 1023,
  Hc = 1024,
  Gc = 1025,
  On = 1026,
  _i = 1027,
  Vc = 1028,
  hl = 1029,
  kc = 1030,
  ul = 1031,
  fl = 1033,
  ts = 33776,
  es = 33777,
  ns = 33778,
  is = 33779,
  Ea = 35840,
  Ta = 35841,
  ba = 35842,
  Aa = 35843,
  dl = 36196,
  wa = 37492,
  Ra = 37496,
  Ca = 37808,
  Pa = 37809,
  La = 37810,
  Da = 37811,
  Ua = 37812,
  Ia = 37813,
  Na = 37814,
  Oa = 37815,
  Fa = 37816,
  Ba = 37817,
  za = 37818,
  Ha = 37819,
  Ga = 37820,
  Va = 37821,
  rs = 36492,
  ka = 36494,
  Wa = 36495,
  Wc = 36283,
  Xa = 36284,
  qa = 36285,
  Ya = 36286,
  pl = 3e3,
  Fn = 3001,
  Xc = 3200,
  qc = 3201,
  kr = 0,
  Yc = 1,
  Ne = "",
  ge = "srgb",
  hn = "srgb-linear",
  ta = "display-p3",
  Wr = "display-p3-linear",
  Ur = "linear",
  $t = "srgb",
  Ir = "rec709",
  Nr = "p3",
  Vn = 7680,
  ja = 519,
  jc = 512,
  Zc = 513,
  Kc = 514,
  ml = 515,
  Jc = 516,
  $c = 517,
  Qc = 518,
  th = 519,
  ks = 35044,
  Cg = 35048,
  Za = "300 es",
  Ws = 1035,
  an = 2e3,
  Or = 2001;
class zn {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
  }
  hasEventListener(t, e) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    if (this._listeners === void 0) return;
    const r = this._listeners[t];
    if (r !== void 0) {
      const s = r.indexOf(e);
      s !== -1 && r.splice(s, 1);
    }
  }
  dispatchEvent(t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[t.type];
    if (n !== void 0) {
      t.target = this;
      const r = n.slice(0);
      for (let s = 0, o = r.length; s < o; s++) r[s].call(this, t);
      t.target = null;
    }
  }
}
const ve = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff",
];
let Ka = 1234567;
const Pi = Math.PI / 180,
  Fi = 180 / Math.PI;
function qe() {
  const i = (Math.random() * 4294967295) | 0,
    t = (Math.random() * 4294967295) | 0,
    e = (Math.random() * 4294967295) | 0,
    n = (Math.random() * 4294967295) | 0;
  return (
    ve[i & 255] +
    ve[(i >> 8) & 255] +
    ve[(i >> 16) & 255] +
    ve[(i >> 24) & 255] +
    "-" +
    ve[t & 255] +
    ve[(t >> 8) & 255] +
    "-" +
    ve[((t >> 16) & 15) | 64] +
    ve[(t >> 24) & 255] +
    "-" +
    ve[(e & 63) | 128] +
    ve[(e >> 8) & 255] +
    "-" +
    ve[(e >> 16) & 255] +
    ve[(e >> 24) & 255] +
    ve[n & 255] +
    ve[(n >> 8) & 255] +
    ve[(n >> 16) & 255] +
    ve[(n >> 24) & 255]
  ).toLowerCase();
}
function pe(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function ea(i, t) {
  return ((i % t) + t) % t;
}
function eh(i, t, e, n, r) {
  return n + ((i - t) * (r - n)) / (e - t);
}
function nh(i, t, e) {
  return i !== t ? (e - i) / (t - i) : 0;
}
function Li(i, t, e) {
  return (1 - e) * i + e * t;
}
function ih(i, t, e, n) {
  return Li(i, t, 1 - Math.exp(-e * n));
}
function rh(i, t = 1) {
  return t - Math.abs(ea(i, t * 2) - t);
}
function sh(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : ((i = (i - t) / (e - t)), i * i * (3 - 2 * i));
}
function ah(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : ((i = (i - t) / (e - t)), i * i * i * (i * (i * 6 - 15) + 10));
}
function oh(i, t) {
  return i + Math.floor(Math.random() * (t - i + 1));
}
function lh(i, t) {
  return i + Math.random() * (t - i);
}
function ch(i) {
  return i * (0.5 - Math.random());
}
function hh(i) {
  i !== void 0 && (Ka = i);
  let t = (Ka += 1831565813);
  return (t = Math.imul(t ^ (t >>> 15), t | 1)), (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)), ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function uh(i) {
  return i * Pi;
}
function fh(i) {
  return i * Fi;
}
function Xs(i) {
  return (i & (i - 1)) === 0 && i !== 0;
}
function dh(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Fr(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function ph(i, t, e, n, r) {
  const s = Math.cos,
    o = Math.sin,
    a = s(e / 2),
    l = o(e / 2),
    c = s((t + n) / 2),
    h = o((t + n) / 2),
    u = s((t - n) / 2),
    d = o((t - n) / 2),
    p = s((n - t) / 2),
    g = o((n - t) / 2);
  switch (r) {
    case "XYX":
      i.set(a * h, l * u, l * d, a * c);
      break;
    case "YZY":
      i.set(l * d, a * h, l * u, a * c);
      break;
    case "ZXZ":
      i.set(l * u, l * d, a * h, a * c);
      break;
    case "XZX":
      i.set(a * h, l * g, l * p, a * c);
      break;
    case "YXY":
      i.set(l * p, a * h, l * g, a * c);
      break;
    case "ZYZ":
      i.set(l * g, l * p, a * h, a * c);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function Xe(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Kt(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const mh = {
  DEG2RAD: Pi,
  RAD2DEG: Fi,
  generateUUID: qe,
  clamp: pe,
  euclideanModulo: ea,
  mapLinear: eh,
  inverseLerp: nh,
  lerp: Li,
  damp: ih,
  pingpong: rh,
  smoothstep: sh,
  smootherstep: ah,
  randInt: oh,
  randFloat: lh,
  randFloatSpread: ch,
  seededRandom: hh,
  degToRad: uh,
  radToDeg: fh,
  isPowerOfTwo: Xs,
  ceilPowerOfTwo: dh,
  floorPowerOfTwo: Fr,
  setQuaternionFromProperEuler: ph,
  normalize: Kt,
  denormalize: Xe,
};
class Z {
  constructor(t = 0, e = 0) {
    (Z.prototype.isVector2 = !0), (this.x = t), (this.y = e);
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return (this.x = t), (this.y = e), this;
  }
  setScalar(t) {
    return (this.x = t), (this.y = t), this;
  }
  setX(t) {
    return (this.x = t), this;
  }
  setY(t) {
    return (this.y = t), this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return (this.x = t.x), (this.y = t.y), this;
  }
  add(t) {
    return (this.x += t.x), (this.y += t.y), this;
  }
  addScalar(t) {
    return (this.x += t), (this.y += t), this;
  }
  addVectors(t, e) {
    return (this.x = t.x + e.x), (this.y = t.y + e.y), this;
  }
  addScaledVector(t, e) {
    return (this.x += t.x * e), (this.y += t.y * e), this;
  }
  sub(t) {
    return (this.x -= t.x), (this.y -= t.y), this;
  }
  subScalar(t) {
    return (this.x -= t), (this.y -= t), this;
  }
  subVectors(t, e) {
    return (this.x = t.x - e.x), (this.y = t.y - e.y), this;
  }
  multiply(t) {
    return (this.x *= t.x), (this.y *= t.y), this;
  }
  multiplyScalar(t) {
    return (this.x *= t), (this.y *= t), this;
  }
  divide(t) {
    return (this.x /= t.x), (this.y /= t.y), this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x,
      n = this.y,
      r = t.elements;
    return (this.x = r[0] * e + r[3] * n + r[6]), (this.y = r[1] * e + r[4] * n + r[7]), this;
  }
  min(t) {
    return (this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), this;
  }
  max(t) {
    return (this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), this;
  }
  clamp(t, e) {
    return (this.x = Math.max(t.x, Math.min(e.x, this.x))), (this.y = Math.max(t.y, Math.min(e.y, this.y))), this;
  }
  clampScalar(t, e) {
    return (this.x = Math.max(t, Math.min(e, this.x))), (this.y = Math.max(t, Math.min(e, this.y))), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
  }
  ceil() {
    return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
  }
  round() {
    return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
  }
  roundToZero() {
    return (this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this;
  }
  negate() {
    return (this.x = -this.x), (this.y = -this.y), this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(pe(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x,
      n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return (this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), this;
  }
  lerpVectors(t, e, n) {
    return (this.x = t.x + (e.x - t.x) * n), (this.y = t.y + (e.y - t.y) * n), this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return (this.x = t[e]), (this.y = t[e + 1]), this;
  }
  toArray(t = [], e = 0) {
    return (t[e] = this.x), (t[e + 1] = this.y), t;
  }
  fromBufferAttribute(t, e) {
    return (this.x = t.getX(e)), (this.y = t.getY(e)), this;
  }
  rotateAround(t, e) {
    const n = Math.cos(e),
      r = Math.sin(e),
      s = this.x - t.x,
      o = this.y - t.y;
    return (this.x = s * n - o * r + t.x), (this.y = s * r + o * n + t.y), this;
  }
  random() {
    return (this.x = Math.random()), (this.y = Math.random()), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Xt {
  constructor(t, e, n, r, s, o, a, l, c) {
    (Xt.prototype.isMatrix3 = !0), (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]), t !== void 0 && this.set(t, e, n, r, s, o, a, l, c);
  }
  set(t, e, n, r, s, o, a, l, c) {
    const h = this.elements;
    return (h[0] = t), (h[1] = r), (h[2] = a), (h[3] = e), (h[4] = s), (h[5] = l), (h[6] = n), (h[7] = o), (h[8] = c), this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(t) {
    const e = this.elements,
      n = t.elements;
    return (
      (e[0] = n[0]), (e[1] = n[1]), (e[2] = n[2]), (e[3] = n[3]), (e[4] = n[4]), (e[5] = n[5]), (e[6] = n[6]), (e[7] = n[7]), (e[8] = n[8]), this
    );
  }
  extractBasis(t, e, n) {
    return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements,
      r = e.elements,
      s = this.elements,
      o = n[0],
      a = n[3],
      l = n[6],
      c = n[1],
      h = n[4],
      u = n[7],
      d = n[2],
      p = n[5],
      g = n[8],
      v = r[0],
      m = r[3],
      f = r[6],
      E = r[1],
      _ = r[4],
      b = r[7],
      U = r[2],
      R = r[5],
      w = r[8];
    return (
      (s[0] = o * v + a * E + l * U),
      (s[3] = o * m + a * _ + l * R),
      (s[6] = o * f + a * b + l * w),
      (s[1] = c * v + h * E + u * U),
      (s[4] = c * m + h * _ + u * R),
      (s[7] = c * f + h * b + u * w),
      (s[2] = d * v + p * E + g * U),
      (s[5] = d * m + p * _ + g * R),
      (s[8] = d * f + p * b + g * w),
      this
    );
  }
  multiplyScalar(t) {
    const e = this.elements;
    return (e[0] *= t), (e[3] *= t), (e[6] *= t), (e[1] *= t), (e[4] *= t), (e[7] *= t), (e[2] *= t), (e[5] *= t), (e[8] *= t), this;
  }
  determinant() {
    const t = this.elements,
      e = t[0],
      n = t[1],
      r = t[2],
      s = t[3],
      o = t[4],
      a = t[5],
      l = t[6],
      c = t[7],
      h = t[8];
    return e * o * h - e * a * c - n * s * h + n * a * l + r * s * c - r * o * l;
  }
  invert() {
    const t = this.elements,
      e = t[0],
      n = t[1],
      r = t[2],
      s = t[3],
      o = t[4],
      a = t[5],
      l = t[6],
      c = t[7],
      h = t[8],
      u = h * o - a * c,
      d = a * l - h * s,
      p = c * s - o * l,
      g = e * u + n * d + r * p;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const v = 1 / g;
    return (
      (t[0] = u * v),
      (t[1] = (r * c - h * n) * v),
      (t[2] = (a * n - r * o) * v),
      (t[3] = d * v),
      (t[4] = (h * e - r * l) * v),
      (t[5] = (r * s - a * e) * v),
      (t[6] = p * v),
      (t[7] = (n * l - c * e) * v),
      (t[8] = (o * e - n * s) * v),
      this
    );
  }
  transpose() {
    let t;
    const e = this.elements;
    return (t = e[1]), (e[1] = e[3]), (e[3] = t), (t = e[2]), (e[2] = e[6]), (e[6] = t), (t = e[5]), (e[5] = e[7]), (e[7] = t), this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return (
      (t[0] = e[0]), (t[1] = e[3]), (t[2] = e[6]), (t[3] = e[1]), (t[4] = e[4]), (t[5] = e[7]), (t[6] = e[2]), (t[7] = e[5]), (t[8] = e[8]), this
    );
  }
  setUvTransform(t, e, n, r, s, o, a) {
    const l = Math.cos(s),
      c = Math.sin(s);
    return this.set(n * l, n * c, -n * (l * o + c * a) + o + t, -r * c, r * l, -r * (-c * o + l * a) + a + e, 0, 0, 1), this;
  }
  scale(t, e) {
    return this.premultiply(ss.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(ss.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(ss.makeTranslation(t, e)), this;
  }
  makeTranslation(t, e) {
    return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1), this;
  }
  makeRotation(t) {
    const e = Math.cos(t),
      n = Math.sin(t);
    return this.set(e, -n, 0, n, e, 0, 0, 0, 1), this;
  }
  makeScale(t, e) {
    return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
  }
  equals(t) {
    const e = this.elements,
      n = t.elements;
    for (let r = 0; r < 9; r++) if (e[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return (
      (t[e] = n[0]),
      (t[e + 1] = n[1]),
      (t[e + 2] = n[2]),
      (t[e + 3] = n[3]),
      (t[e + 4] = n[4]),
      (t[e + 5] = n[5]),
      (t[e + 6] = n[6]),
      (t[e + 7] = n[7]),
      (t[e + 8] = n[8]),
      t
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const ss = new Xt();
function gl(i) {
  for (let t = i.length - 1; t >= 0; --t) if (i[t] >= 65535) return !0;
  return !1;
}
function Bi(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function gh() {
  const i = Bi("canvas");
  return (i.style.display = "block"), i;
}
const Ja = {};
function Di(i) {
  i in Ja || ((Ja[i] = !0), console.warn(i));
}
const $a = new Xt().set(0.8224621, 0.177538, 0, 0.0331941, 0.9668058, 0, 0.0170827, 0.0723974, 0.9105199),
  Qa = new Xt().set(1.2249401, -0.2249404, 0, -0.0420569, 1.0420571, 0, -0.0196376, -0.0786361, 1.0982735),
  Ki = {
    [hn]: { transfer: Ur, primaries: Ir, toReference: (i) => i, fromReference: (i) => i },
    [ge]: { transfer: $t, primaries: Ir, toReference: (i) => i.convertSRGBToLinear(), fromReference: (i) => i.convertLinearToSRGB() },
    [Wr]: { transfer: Ur, primaries: Nr, toReference: (i) => i.applyMatrix3(Qa), fromReference: (i) => i.applyMatrix3($a) },
    [ta]: {
      transfer: $t,
      primaries: Nr,
      toReference: (i) => i.convertSRGBToLinear().applyMatrix3(Qa),
      fromReference: (i) => i.applyMatrix3($a).convertLinearToSRGB(),
    },
  },
  _h = new Set([hn, Wr]),
  Jt = {
    enabled: !0,
    _workingColorSpace: hn,
    get workingColorSpace() {
      return this._workingColorSpace;
    },
    set workingColorSpace(i) {
      if (!_h.has(i)) throw new Error(`Unsupported working color space, "${i}".`);
      this._workingColorSpace = i;
    },
    convert: function (i, t, e) {
      if (this.enabled === !1 || t === e || !t || !e) return i;
      const n = Ki[t].toReference,
        r = Ki[e].fromReference;
      return r(n(i));
    },
    fromWorkingColorSpace: function (i, t) {
      return this.convert(i, this._workingColorSpace, t);
    },
    toWorkingColorSpace: function (i, t) {
      return this.convert(i, t, this._workingColorSpace);
    },
    getPrimaries: function (i) {
      return Ki[i].primaries;
    },
    getTransfer: function (i) {
      return i === Ne ? Ur : Ki[i].transfer;
    },
  };
function di(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function as(i) {
  return i < 0.0031308 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let kn;
class _l {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement == "undefined") return t.src;
    let e;
    if (t instanceof HTMLCanvasElement) e = t;
    else {
      kn === void 0 && (kn = Bi("canvas")), (kn.width = t.width), (kn.height = t.height);
      const n = kn.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), (e = kn);
    }
    return e.width > 2048 || e.height > 2048
      ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6))
      : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (
      (typeof HTMLImageElement != "undefined" && t instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement != "undefined" && t instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap != "undefined" && t instanceof ImageBitmap)
    ) {
      const e = Bi("canvas");
      (e.width = t.width), (e.height = t.height);
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const r = n.getImageData(0, 0, t.width, t.height),
        s = r.data;
      for (let o = 0; o < s.length; o++) s[o] = di(s[o] / 255) * 255;
      return n.putImageData(r, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray ? (e[n] = Math.floor(di(e[n] / 255) * 255)) : (e[n] = di(e[n]));
      return { data: e, width: t.width, height: t.height };
    } else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let vh = 0;
class vl {
  constructor(t = null) {
    (this.isSource = !0), Object.defineProperty(this, "id", { value: vh++ }), (this.uuid = qe()), (this.data = t), (this.version = 0);
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
    const n = { uuid: this.uuid, url: "" },
      r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let o = 0, a = r.length; o < a; o++) r[o].isDataTexture ? s.push(os(r[o].image)) : s.push(os(r[o]));
      } else s = os(r);
      n.url = s;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function os(i) {
  return (typeof HTMLImageElement != "undefined" && i instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement != "undefined" && i instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap != "undefined" && i instanceof ImageBitmap)
    ? _l.getDataURL(i)
    : i.data
    ? { data: Array.from(i.data), width: i.width, height: i.height, type: i.data.constructor.name }
    : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let xh = 0;
class Ee extends zn {
  constructor(t = Ee.DEFAULT_IMAGE, e = Ee.DEFAULT_MAPPING, n = ze, r = ze, s = De, o = Oi, a = He, l = Mn, c = Ee.DEFAULT_ANISOTROPY, h = Ne) {
    super(),
      (this.isTexture = !0),
      Object.defineProperty(this, "id", { value: xh++ }),
      (this.uuid = qe()),
      (this.name = ""),
      (this.source = new vl(t)),
      (this.mipmaps = []),
      (this.mapping = e),
      (this.channel = 0),
      (this.wrapS = n),
      (this.wrapT = r),
      (this.magFilter = s),
      (this.minFilter = o),
      (this.anisotropy = c),
      (this.format = a),
      (this.internalFormat = null),
      (this.type = l),
      (this.offset = new Z(0, 0)),
      (this.repeat = new Z(1, 1)),
      (this.center = new Z(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new Xt()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      typeof h == "string"
        ? (this.colorSpace = h)
        : (Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."), (this.colorSpace = h === Fn ? ge : Ne)),
      (this.userData = {}),
      (this.version = 0),
      (this.onUpdate = null),
      (this.isRenderTargetTexture = !1),
      (this.needsPMREMUpdate = !1);
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return (
      (this.name = t.name),
      (this.source = t.source),
      (this.mipmaps = t.mipmaps.slice(0)),
      (this.mapping = t.mapping),
      (this.channel = t.channel),
      (this.wrapS = t.wrapS),
      (this.wrapT = t.wrapT),
      (this.magFilter = t.magFilter),
      (this.minFilter = t.minFilter),
      (this.anisotropy = t.anisotropy),
      (this.format = t.format),
      (this.internalFormat = t.internalFormat),
      (this.type = t.type),
      this.offset.copy(t.offset),
      this.repeat.copy(t.repeat),
      this.center.copy(t.center),
      (this.rotation = t.rotation),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      this.matrix.copy(t.matrix),
      (this.generateMipmaps = t.generateMipmaps),
      (this.premultiplyAlpha = t.premultiplyAlpha),
      (this.flipY = t.flipY),
      (this.unpackAlignment = t.unpackAlignment),
      (this.colorSpace = t.colorSpace),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const n = {
      metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== al) return t;
    if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
      switch (this.wrapS) {
        case Gs:
          t.x = t.x - Math.floor(t.x);
          break;
        case ze:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case Vs:
          Math.abs(Math.floor(t.x) % 2) === 1 ? (t.x = Math.ceil(t.x) - t.x) : (t.x = t.x - Math.floor(t.x));
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case Gs:
          t.y = t.y - Math.floor(t.y);
          break;
        case ze:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case Vs:
          Math.abs(Math.floor(t.y) % 2) === 1 ? (t.y = Math.ceil(t.y) - t.y) : (t.y = t.y - Math.floor(t.y));
          break;
      }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, (this.source.needsUpdate = !0));
  }
  get encoding() {
    return Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === ge ? Fn : pl;
  }
  set encoding(t) {
    Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."), (this.colorSpace = t === Fn ? ge : Ne);
  }
}
Ee.DEFAULT_IMAGE = null;
Ee.DEFAULT_MAPPING = al;
Ee.DEFAULT_ANISOTROPY = 1;
class Qt {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    (Qt.prototype.isVector4 = !0), (this.x = t), (this.y = e), (this.z = n), (this.w = r);
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, r) {
    return (this.x = t), (this.y = e), (this.z = n), (this.w = r), this;
  }
  setScalar(t) {
    return (this.x = t), (this.y = t), (this.z = t), (this.w = t), this;
  }
  setX(t) {
    return (this.x = t), this;
  }
  setY(t) {
    return (this.y = t), this;
  }
  setZ(t) {
    return (this.z = t), this;
  }
  setW(t) {
    return (this.w = t), this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return (this.x = t.x), (this.y = t.y), (this.z = t.z), (this.w = t.w !== void 0 ? t.w : 1), this;
  }
  add(t) {
    return (this.x += t.x), (this.y += t.y), (this.z += t.z), (this.w += t.w), this;
  }
  addScalar(t) {
    return (this.x += t), (this.y += t), (this.z += t), (this.w += t), this;
  }
  addVectors(t, e) {
    return (this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), (this.w = t.w + e.w), this;
  }
  addScaledVector(t, e) {
    return (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), (this.w += t.w * e), this;
  }
  sub(t) {
    return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), (this.w -= t.w), this;
  }
  subScalar(t) {
    return (this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this;
  }
  subVectors(t, e) {
    return (this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), (this.w = t.w - e.w), this;
  }
  multiply(t) {
    return (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), (this.w *= t.w), this;
  }
  multiplyScalar(t) {
    return (this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this;
  }
  applyMatrix4(t) {
    const e = this.x,
      n = this.y,
      r = this.z,
      s = this.w,
      o = t.elements;
    return (
      (this.x = o[0] * e + o[4] * n + o[8] * r + o[12] * s),
      (this.y = o[1] * e + o[5] * n + o[9] * r + o[13] * s),
      (this.z = o[2] * e + o[6] * n + o[10] * r + o[14] * s),
      (this.w = o[3] * e + o[7] * n + o[11] * r + o[15] * s),
      this
    );
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return e < 1e-4 ? ((this.x = 1), (this.y = 0), (this.z = 0)) : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, n, r, s;
    const l = t.elements,
      c = l[0],
      h = l[4],
      u = l[8],
      d = l[1],
      p = l[5],
      g = l[9],
      v = l[2],
      m = l[6],
      f = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - v) < 0.01 && Math.abs(g - m) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + v) < 0.1 && Math.abs(g + m) < 0.1 && Math.abs(c + p + f - 3) < 0.1) return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const _ = (c + 1) / 2,
        b = (p + 1) / 2,
        U = (f + 1) / 2,
        R = (h + d) / 4,
        w = (u + v) / 4,
        k = (g + m) / 4;
      return (
        _ > b && _ > U
          ? _ < 0.01
            ? ((n = 0), (r = 0.707106781), (s = 0.707106781))
            : ((n = Math.sqrt(_)), (r = R / n), (s = w / n))
          : b > U
          ? b < 0.01
            ? ((n = 0.707106781), (r = 0), (s = 0.707106781))
            : ((r = Math.sqrt(b)), (n = R / r), (s = k / r))
          : U < 0.01
          ? ((n = 0.707106781), (r = 0.707106781), (s = 0))
          : ((s = Math.sqrt(U)), (n = w / s), (r = k / s)),
        this.set(n, r, s, e),
        this
      );
    }
    let E = Math.sqrt((m - g) * (m - g) + (u - v) * (u - v) + (d - h) * (d - h));
    return (
      Math.abs(E) < 0.001 && (E = 1),
      (this.x = (m - g) / E),
      (this.y = (u - v) / E),
      (this.z = (d - h) / E),
      (this.w = Math.acos((c + p + f - 1) / 2)),
      this
    );
  }
  min(t) {
    return (
      (this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), (this.z = Math.min(this.z, t.z)), (this.w = Math.min(this.w, t.w)), this
    );
  }
  max(t) {
    return (
      (this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), (this.z = Math.max(this.z, t.z)), (this.w = Math.max(this.w, t.w)), this
    );
  }
  clamp(t, e) {
    return (
      (this.x = Math.max(t.x, Math.min(e.x, this.x))),
      (this.y = Math.max(t.y, Math.min(e.y, this.y))),
      (this.z = Math.max(t.z, Math.min(e.z, this.z))),
      (this.w = Math.max(t.w, Math.min(e.w, this.w))),
      this
    );
  }
  clampScalar(t, e) {
    return (
      (this.x = Math.max(t, Math.min(e, this.x))),
      (this.y = Math.max(t, Math.min(e, this.y))),
      (this.z = Math.max(t, Math.min(e, this.z))),
      (this.w = Math.max(t, Math.min(e, this.w))),
      this
    );
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), (this.z = Math.floor(this.z)), (this.w = Math.floor(this.w)), this;
  }
  ceil() {
    return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), (this.w = Math.ceil(this.w)), this;
  }
  round() {
    return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), (this.z = Math.round(this.z)), (this.w = Math.round(this.w)), this;
  }
  roundToZero() {
    return (this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), (this.z = Math.trunc(this.z)), (this.w = Math.trunc(this.w)), this;
  }
  negate() {
    return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return (this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), (this.z += (t.z - this.z) * e), (this.w += (t.w - this.w) * e), this;
  }
  lerpVectors(t, e, n) {
    return (
      (this.x = t.x + (e.x - t.x) * n), (this.y = t.y + (e.y - t.y) * n), (this.z = t.z + (e.z - t.z) * n), (this.w = t.w + (e.w - t.w) * n), this
    );
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), (this.w = t[e + 3]), this;
  }
  toArray(t = [], e = 0) {
    return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), (t[e + 3] = this.w), t;
  }
  fromBufferAttribute(t, e) {
    return (this.x = t.getX(e)), (this.y = t.getY(e)), (this.z = t.getZ(e)), (this.w = t.getW(e)), this;
  }
  random() {
    return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), (this.w = Math.random()), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Mh extends zn {
  constructor(t = 1, e = 1, n = {}) {
    super(),
      (this.isRenderTarget = !0),
      (this.width = t),
      (this.height = e),
      (this.depth = 1),
      (this.scissor = new Qt(0, 0, t, e)),
      (this.scissorTest = !1),
      (this.viewport = new Qt(0, 0, t, e));
    const r = { width: t, height: e, depth: 1 };
    n.encoding !== void 0 &&
      (Di("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."), (n.colorSpace = n.encoding === Fn ? ge : Ne)),
      (n = Object.assign(
        { generateMipmaps: !1, internalFormat: null, minFilter: De, depthBuffer: !0, stencilBuffer: !1, depthTexture: null, samples: 0 },
        n
      )),
      (this.texture = new Ee(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace)),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.flipY = !1),
      (this.texture.generateMipmaps = n.generateMipmaps),
      (this.texture.internalFormat = n.internalFormat),
      (this.depthBuffer = n.depthBuffer),
      (this.stencilBuffer = n.stencilBuffer),
      (this.depthTexture = n.depthTexture),
      (this.samples = n.samples);
  }
  setSize(t, e, n = 1) {
    (this.width !== t || this.height !== e || this.depth !== n) &&
      ((this.width = t),
      (this.height = e),
      (this.depth = n),
      (this.texture.image.width = t),
      (this.texture.image.height = e),
      (this.texture.image.depth = n),
      this.dispose()),
      this.viewport.set(0, 0, t, e),
      this.scissor.set(0, 0, t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    (this.width = t.width),
      (this.height = t.height),
      (this.depth = t.depth),
      this.scissor.copy(t.scissor),
      (this.scissorTest = t.scissorTest),
      this.viewport.copy(t.viewport),
      (this.texture = t.texture.clone()),
      (this.texture.isRenderTargetTexture = !0);
    const e = Object.assign({}, t.texture.image);
    return (
      (this.texture.source = new vl(e)),
      (this.depthBuffer = t.depthBuffer),
      (this.stencilBuffer = t.stencilBuffer),
      t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()),
      (this.samples = t.samples),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Ge extends Mh {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), (this.isWebGLRenderTarget = !0);
  }
}
class xl extends Ee {
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null),
      (this.isDataArrayTexture = !0),
      (this.image = { data: t, width: e, height: n, depth: r }),
      (this.magFilter = me),
      (this.minFilter = me),
      (this.wrapR = ze),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
class Sh extends Ee {
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null),
      (this.isData3DTexture = !0),
      (this.image = { data: t, width: e, height: n, depth: r }),
      (this.magFilter = me),
      (this.minFilter = me),
      (this.wrapR = ze),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
class yn {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    (this.isQuaternion = !0), (this._x = t), (this._y = e), (this._z = n), (this._w = r);
  }
  static slerpFlat(t, e, n, r, s, o, a) {
    let l = n[r + 0],
      c = n[r + 1],
      h = n[r + 2],
      u = n[r + 3];
    const d = s[o + 0],
      p = s[o + 1],
      g = s[o + 2],
      v = s[o + 3];
    if (a === 0) {
      (t[e + 0] = l), (t[e + 1] = c), (t[e + 2] = h), (t[e + 3] = u);
      return;
    }
    if (a === 1) {
      (t[e + 0] = d), (t[e + 1] = p), (t[e + 2] = g), (t[e + 3] = v);
      return;
    }
    if (u !== v || l !== d || c !== p || h !== g) {
      let m = 1 - a;
      const f = l * d + c * p + h * g + u * v,
        E = f >= 0 ? 1 : -1,
        _ = 1 - f * f;
      if (_ > Number.EPSILON) {
        const U = Math.sqrt(_),
          R = Math.atan2(U, f * E);
        (m = Math.sin(m * R) / U), (a = Math.sin(a * R) / U);
      }
      const b = a * E;
      if (((l = l * m + d * b), (c = c * m + p * b), (h = h * m + g * b), (u = u * m + v * b), m === 1 - a)) {
        const U = 1 / Math.sqrt(l * l + c * c + h * h + u * u);
        (l *= U), (c *= U), (h *= U), (u *= U);
      }
    }
    (t[e] = l), (t[e + 1] = c), (t[e + 2] = h), (t[e + 3] = u);
  }
  static multiplyQuaternionsFlat(t, e, n, r, s, o) {
    const a = n[r],
      l = n[r + 1],
      c = n[r + 2],
      h = n[r + 3],
      u = s[o],
      d = s[o + 1],
      p = s[o + 2],
      g = s[o + 3];
    return (
      (t[e] = a * g + h * u + l * p - c * d),
      (t[e + 1] = l * g + h * d + c * u - a * p),
      (t[e + 2] = c * g + h * p + a * d - l * u),
      (t[e + 3] = h * g - a * u - l * d - c * p),
      t
    );
  }
  get x() {
    return this._x;
  }
  set x(t) {
    (this._x = t), this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    (this._y = t), this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    (this._z = t), this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    (this._w = t), this._onChangeCallback();
  }
  set(t, e, n, r) {
    return (this._x = t), (this._y = e), (this._z = n), (this._w = r), this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return (this._x = t.x), (this._y = t.y), (this._z = t.z), (this._w = t.w), this._onChangeCallback(), this;
  }
  setFromEuler(t, e = !0) {
    const n = t._x,
      r = t._y,
      s = t._z,
      o = t._order,
      a = Math.cos,
      l = Math.sin,
      c = a(n / 2),
      h = a(r / 2),
      u = a(s / 2),
      d = l(n / 2),
      p = l(r / 2),
      g = l(s / 2);
    switch (o) {
      case "XYZ":
        (this._x = d * h * u + c * p * g), (this._y = c * p * u - d * h * g), (this._z = c * h * g + d * p * u), (this._w = c * h * u - d * p * g);
        break;
      case "YXZ":
        (this._x = d * h * u + c * p * g), (this._y = c * p * u - d * h * g), (this._z = c * h * g - d * p * u), (this._w = c * h * u + d * p * g);
        break;
      case "ZXY":
        (this._x = d * h * u - c * p * g), (this._y = c * p * u + d * h * g), (this._z = c * h * g + d * p * u), (this._w = c * h * u - d * p * g);
        break;
      case "ZYX":
        (this._x = d * h * u - c * p * g), (this._y = c * p * u + d * h * g), (this._z = c * h * g - d * p * u), (this._w = c * h * u + d * p * g);
        break;
      case "YZX":
        (this._x = d * h * u + c * p * g), (this._y = c * p * u + d * h * g), (this._z = c * h * g - d * p * u), (this._w = c * h * u - d * p * g);
        break;
      case "XZY":
        (this._x = d * h * u - c * p * g), (this._y = c * p * u - d * h * g), (this._z = c * h * g + d * p * u), (this._w = c * h * u + d * p * g);
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o);
    }
    return e === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t, e) {
    const n = e / 2,
      r = Math.sin(n);
    return (this._x = t.x * r), (this._y = t.y * r), (this._z = t.z * r), (this._w = Math.cos(n)), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t) {
    const e = t.elements,
      n = e[0],
      r = e[4],
      s = e[8],
      o = e[1],
      a = e[5],
      l = e[9],
      c = e[2],
      h = e[6],
      u = e[10],
      d = n + a + u;
    if (d > 0) {
      const p = 0.5 / Math.sqrt(d + 1);
      (this._w = 0.25 / p), (this._x = (h - l) * p), (this._y = (s - c) * p), (this._z = (o - r) * p);
    } else if (n > a && n > u) {
      const p = 2 * Math.sqrt(1 + n - a - u);
      (this._w = (h - l) / p), (this._x = 0.25 * p), (this._y = (r + o) / p), (this._z = (s + c) / p);
    } else if (a > u) {
      const p = 2 * Math.sqrt(1 + a - n - u);
      (this._w = (s - c) / p), (this._x = (r + o) / p), (this._y = 0.25 * p), (this._z = (l + h) / p);
    } else {
      const p = 2 * Math.sqrt(1 + u - n - a);
      (this._w = (o - r) / p), (this._x = (s + c) / p), (this._y = (l + h) / p), (this._z = 0.25 * p);
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return (
      n < Number.EPSILON
        ? ((n = 0),
          Math.abs(t.x) > Math.abs(t.z)
            ? ((this._x = -t.y), (this._y = t.x), (this._z = 0), (this._w = n))
            : ((this._x = 0), (this._y = -t.z), (this._z = t.y), (this._w = n)))
        : ((this._x = t.y * e.z - t.z * e.y), (this._y = t.z * e.x - t.x * e.z), (this._z = t.x * e.y - t.y * e.x), (this._w = n)),
      this.normalize()
    );
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(pe(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const r = Math.min(1, e / n);
    return this.slerp(t, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return (this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return (
      t === 0
        ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
        : ((t = 1 / t), (this._x = this._x * t), (this._y = this._y * t), (this._z = this._z * t), (this._w = this._w * t)),
      this._onChangeCallback(),
      this
    );
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x,
      r = t._y,
      s = t._z,
      o = t._w,
      a = e._x,
      l = e._y,
      c = e._z,
      h = e._w;
    return (
      (this._x = n * h + o * a + r * c - s * l),
      (this._y = r * h + o * l + s * a - n * c),
      (this._z = s * h + o * c + n * l - r * a),
      (this._w = o * h - n * a - r * l - s * c),
      this._onChangeCallback(),
      this
    );
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x,
      r = this._y,
      s = this._z,
      o = this._w;
    let a = o * t._w + n * t._x + r * t._y + s * t._z;
    if ((a < 0 ? ((this._w = -t._w), (this._x = -t._x), (this._y = -t._y), (this._z = -t._z), (a = -a)) : this.copy(t), a >= 1))
      return (this._w = o), (this._x = n), (this._y = r), (this._z = s), this;
    const l = 1 - a * a;
    if (l <= Number.EPSILON) {
      const p = 1 - e;
      return (
        (this._w = p * o + e * this._w),
        (this._x = p * n + e * this._x),
        (this._y = p * r + e * this._y),
        (this._z = p * s + e * this._z),
        this.normalize(),
        this
      );
    }
    const c = Math.sqrt(l),
      h = Math.atan2(c, a),
      u = Math.sin((1 - e) * h) / c,
      d = Math.sin(e * h) / c;
    return (
      (this._w = o * u + this._w * d),
      (this._x = n * u + this._x * d),
      (this._y = r * u + this._y * d),
      (this._z = s * u + this._z * d),
      this._onChangeCallback(),
      this
    );
  }
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  random() {
    const t = Math.random(),
      e = Math.sqrt(1 - t),
      n = Math.sqrt(t),
      r = 2 * Math.PI * Math.random(),
      s = 2 * Math.PI * Math.random();
    return this.set(e * Math.cos(r), n * Math.sin(s), n * Math.cos(s), e * Math.sin(r));
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    return (this._x = t[e]), (this._y = t[e + 1]), (this._z = t[e + 2]), (this._w = t[e + 3]), this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return (t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._w), t;
  }
  fromBufferAttribute(t, e) {
    return (this._x = t.getX(e)), (this._y = t.getY(e)), (this._z = t.getZ(e)), (this._w = t.getW(e)), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return (this._onChangeCallback = t), this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class C {
  constructor(t = 0, e = 0, n = 0) {
    (C.prototype.isVector3 = !0), (this.x = t), (this.y = e), (this.z = n);
  }
  set(t, e, n) {
    return n === void 0 && (n = this.z), (this.x = t), (this.y = e), (this.z = n), this;
  }
  setScalar(t) {
    return (this.x = t), (this.y = t), (this.z = t), this;
  }
  setX(t) {
    return (this.x = t), this;
  }
  setY(t) {
    return (this.y = t), this;
  }
  setZ(t) {
    return (this.z = t), this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return (this.x = t.x), (this.y = t.y), (this.z = t.z), this;
  }
  add(t) {
    return (this.x += t.x), (this.y += t.y), (this.z += t.z), this;
  }
  addScalar(t) {
    return (this.x += t), (this.y += t), (this.z += t), this;
  }
  addVectors(t, e) {
    return (this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), this;
  }
  addScaledVector(t, e) {
    return (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this;
  }
  sub(t) {
    return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this;
  }
  subScalar(t) {
    return (this.x -= t), (this.y -= t), (this.z -= t), this;
  }
  subVectors(t, e) {
    return (this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), this;
  }
  multiply(t) {
    return (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this;
  }
  multiplyScalar(t) {
    return (this.x *= t), (this.y *= t), (this.z *= t), this;
  }
  multiplyVectors(t, e) {
    return (this.x = t.x * e.x), (this.y = t.y * e.y), (this.z = t.z * e.z), this;
  }
  applyEuler(t) {
    return this.applyQuaternion(to.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(to.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x,
      n = this.y,
      r = this.z,
      s = t.elements;
    return (this.x = s[0] * e + s[3] * n + s[6] * r), (this.y = s[1] * e + s[4] * n + s[7] * r), (this.z = s[2] * e + s[5] * n + s[8] * r), this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x,
      n = this.y,
      r = this.z,
      s = t.elements,
      o = 1 / (s[3] * e + s[7] * n + s[11] * r + s[15]);
    return (
      (this.x = (s[0] * e + s[4] * n + s[8] * r + s[12]) * o),
      (this.y = (s[1] * e + s[5] * n + s[9] * r + s[13]) * o),
      (this.z = (s[2] * e + s[6] * n + s[10] * r + s[14]) * o),
      this
    );
  }
  applyQuaternion(t) {
    const e = this.x,
      n = this.y,
      r = this.z,
      s = t.x,
      o = t.y,
      a = t.z,
      l = t.w,
      c = 2 * (o * r - a * n),
      h = 2 * (a * e - s * r),
      u = 2 * (s * n - o * e);
    return (this.x = e + l * c + o * u - a * h), (this.y = n + l * h + a * c - s * u), (this.z = r + l * u + s * h - o * c), this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x,
      n = this.y,
      r = this.z,
      s = t.elements;
    return (
      (this.x = s[0] * e + s[4] * n + s[8] * r),
      (this.y = s[1] * e + s[5] * n + s[9] * r),
      (this.z = s[2] * e + s[6] * n + s[10] * r),
      this.normalize()
    );
  }
  divide(t) {
    return (this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return (this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), (this.z = Math.min(this.z, t.z)), this;
  }
  max(t) {
    return (this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), (this.z = Math.max(this.z, t.z)), this;
  }
  clamp(t, e) {
    return (
      (this.x = Math.max(t.x, Math.min(e.x, this.x))),
      (this.y = Math.max(t.y, Math.min(e.y, this.y))),
      (this.z = Math.max(t.z, Math.min(e.z, this.z))),
      this
    );
  }
  clampScalar(t, e) {
    return (
      (this.x = Math.max(t, Math.min(e, this.x))), (this.y = Math.max(t, Math.min(e, this.y))), (this.z = Math.max(t, Math.min(e, this.z))), this
    );
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), (this.z = Math.floor(this.z)), this;
  }
  ceil() {
    return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), this;
  }
  round() {
    return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), (this.z = Math.round(this.z)), this;
  }
  roundToZero() {
    return (this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), (this.z = Math.trunc(this.z)), this;
  }
  negate() {
    return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return (this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), (this.z += (t.z - this.z) * e), this;
  }
  lerpVectors(t, e, n) {
    return (this.x = t.x + (e.x - t.x) * n), (this.y = t.y + (e.y - t.y) * n), (this.z = t.z + (e.z - t.z) * n), this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const n = t.x,
      r = t.y,
      s = t.z,
      o = e.x,
      a = e.y,
      l = e.z;
    return (this.x = r * l - s * a), (this.y = s * o - n * l), (this.z = n * a - r * o), this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return ls.copy(this).projectOnVector(t), this.sub(ls);
  }
  reflect(t) {
    return this.sub(ls.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(pe(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x,
      n = this.y - t.y,
      r = this.z - t.z;
    return e * e + n * n + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const r = Math.sin(e) * t;
    return (this.x = r * Math.sin(n)), (this.y = Math.cos(e) * t), (this.z = r * Math.cos(n)), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    return (this.x = t * Math.sin(e)), (this.y = n), (this.z = t * Math.cos(e)), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this;
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(),
      n = this.setFromMatrixColumn(t, 1).length(),
      r = this.setFromMatrixColumn(t, 2).length();
    return (this.x = e), (this.y = n), (this.z = r), this;
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return (this.x = t._x), (this.y = t._y), (this.z = t._z), this;
  }
  setFromColor(t) {
    return (this.x = t.r), (this.y = t.g), (this.z = t.b), this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this;
  }
  toArray(t = [], e = 0) {
    return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t;
  }
  fromBufferAttribute(t, e) {
    return (this.x = t.getX(e)), (this.y = t.getY(e)), (this.z = t.getZ(e)), this;
  }
  random() {
    return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this;
  }
  randomDirection() {
    const t = (Math.random() - 0.5) * 2,
      e = Math.random() * Math.PI * 2,
      n = Math.sqrt(1 - t ** 2);
    return (this.x = n * Math.cos(e)), (this.y = n * Math.sin(e)), (this.z = t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const ls = new C(),
  to = new yn();
class ki {
  constructor(t = new C(1 / 0, 1 / 0, 1 / 0), e = new C(-1 / 0, -1 / 0, -1 / 0)) {
    (this.isBox3 = !0), (this.min = t), (this.max = e);
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3) this.expandByPoint(Oe.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++) this.expandByPoint(Oe.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = Oe.copy(e).multiplyScalar(0.5);
    return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
  }
  setFromObject(t, e = !1) {
    return this.makeEmpty(), this.expandByObject(t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  makeEmpty() {
    return (this.min.x = this.min.y = this.min.z = 1 / 0), (this.max.x = this.max.y = this.max.z = -1 / 0), this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
  }
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
  }
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1);
    const n = t.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (e === !0 && s !== void 0 && t.isInstancedMesh !== !0)
        for (let o = 0, a = s.count; o < a; o++)
          t.isMesh === !0 ? t.getVertexPosition(o, Oe) : Oe.fromBufferAttribute(s, o), Oe.applyMatrix4(t.matrixWorld), this.expandByPoint(Oe);
      else
        t.boundingBox !== void 0
          ? (t.boundingBox === null && t.computeBoundingBox(), Ji.copy(t.boundingBox))
          : (n.boundingBox === null && n.computeBoundingBox(), Ji.copy(n.boundingBox)),
          Ji.applyMatrix4(t.matrixWorld),
          this.union(Ji);
    }
    const r = t.children;
    for (let s = 0, o = r.length; s < o; s++) this.expandByObject(r[s], e);
    return this;
  }
  containsPoint(t) {
    return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z);
  }
  containsBox(t) {
    return (
      this.min.x <= t.min.x &&
      t.max.x <= this.max.x &&
      this.min.y <= t.min.y &&
      t.max.y <= this.max.y &&
      this.min.z <= t.min.z &&
      t.max.z <= this.max.z
    );
  }
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(t) {
    return !(
      t.max.x < this.min.x ||
      t.min.x > this.max.x ||
      t.max.y < this.min.y ||
      t.min.y > this.max.y ||
      t.max.z < this.min.z ||
      t.min.z > this.max.z
    );
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, Oe), Oe.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return (
      t.normal.x > 0
        ? ((e = t.normal.x * this.min.x), (n = t.normal.x * this.max.x))
        : ((e = t.normal.x * this.max.x), (n = t.normal.x * this.min.x)),
      t.normal.y > 0
        ? ((e += t.normal.y * this.min.y), (n += t.normal.y * this.max.y))
        : ((e += t.normal.y * this.max.y), (n += t.normal.y * this.min.y)),
      t.normal.z > 0
        ? ((e += t.normal.z * this.min.z), (n += t.normal.z * this.max.z))
        : ((e += t.normal.z * this.max.z), (n += t.normal.z * this.min.z)),
      e <= -t.constant && n >= -t.constant
    );
  }
  intersectsTriangle(t) {
    if (this.isEmpty()) return !1;
    this.getCenter(Si),
      $i.subVectors(this.max, Si),
      Wn.subVectors(t.a, Si),
      Xn.subVectors(t.b, Si),
      qn.subVectors(t.c, Si),
      un.subVectors(Xn, Wn),
      fn.subVectors(qn, Xn),
      bn.subVectors(Wn, qn);
    let e = [
      0,
      -un.z,
      un.y,
      0,
      -fn.z,
      fn.y,
      0,
      -bn.z,
      bn.y,
      un.z,
      0,
      -un.x,
      fn.z,
      0,
      -fn.x,
      bn.z,
      0,
      -bn.x,
      -un.y,
      un.x,
      0,
      -fn.y,
      fn.x,
      0,
      -bn.y,
      bn.x,
      0,
    ];
    return !cs(e, Wn, Xn, qn, $i) || ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !cs(e, Wn, Xn, qn, $i))
      ? !1
      : (Qi.crossVectors(un, fn), (e = [Qi.x, Qi.y, Qi.z]), cs(e, Wn, Xn, qn, $i));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, Oe).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), (t.radius = this.getSize(Oe).length() * 0.5)), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty()
      ? this
      : (Je[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
        Je[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
        Je[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
        Je[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
        Je[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
        Je[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
        Je[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
        Je[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
        this.setFromPoints(Je),
        this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const Je = [new C(), new C(), new C(), new C(), new C(), new C(), new C(), new C()],
  Oe = new C(),
  Ji = new ki(),
  Wn = new C(),
  Xn = new C(),
  qn = new C(),
  un = new C(),
  fn = new C(),
  bn = new C(),
  Si = new C(),
  $i = new C(),
  Qi = new C(),
  An = new C();
function cs(i, t, e, n, r) {
  for (let s = 0, o = i.length - 3; s <= o; s += 3) {
    An.fromArray(i, s);
    const a = r.x * Math.abs(An.x) + r.y * Math.abs(An.y) + r.z * Math.abs(An.z),
      l = t.dot(An),
      c = e.dot(An),
      h = n.dot(An);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > a) return !1;
  }
  return !0;
}
const yh = new ki(),
  yi = new C(),
  hs = new C();
class Wi {
  constructor(t = new C(), e = -1) {
    (this.isSphere = !0), (this.center = t), (this.radius = e);
  }
  set(t, e) {
    return this.center.copy(t), (this.radius = e), this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : yh.setFromPoints(t).getCenter(n);
    let r = 0;
    for (let s = 0, o = t.length; s < o; s++) r = Math.max(r, n.distanceToSquared(t[s]));
    return (this.radius = Math.sqrt(r)), this;
  }
  copy(t) {
    return this.center.copy(t.center), (this.radius = t.radius), this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), (this.radius = -1), this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), (this.radius = this.radius * t.getMaxScaleOnAxis()), this;
  }
  translate(t) {
    return this.center.add(t), this;
  }
  expandByPoint(t) {
    if (this.isEmpty()) return this.center.copy(t), (this.radius = 0), this;
    yi.subVectors(t, this.center);
    const e = yi.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e),
        r = (n - this.radius) * 0.5;
      this.center.addScaledVector(yi, r / n), (this.radius += r);
    }
    return this;
  }
  union(t) {
    return t.isEmpty()
      ? this
      : this.isEmpty()
      ? (this.copy(t), this)
      : (this.center.equals(t.center) === !0
          ? (this.radius = Math.max(this.radius, t.radius))
          : (hs.subVectors(t.center, this.center).setLength(t.radius),
            this.expandByPoint(yi.copy(t.center).add(hs)),
            this.expandByPoint(yi.copy(t.center).sub(hs))),
        this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const $e = new C(),
  us = new C(),
  tr = new C(),
  dn = new C(),
  fs = new C(),
  er = new C(),
  ds = new C();
class Xr {
  constructor(t = new C(), e = new C(0, 0, -1)) {
    (this.origin = t), (this.direction = e);
  }
  set(t, e) {
    return this.origin.copy(t), this.direction.copy(e), this;
  }
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  recast(t) {
    return this.origin.copy(this.at(t, $e)), this;
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = $e.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : ($e.copy(this.origin).addScaledVector(this.direction, e), $e.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, r) {
    us.copy(t).add(e).multiplyScalar(0.5), tr.copy(e).sub(t).normalize(), dn.copy(this.origin).sub(us);
    const s = t.distanceTo(e) * 0.5,
      o = -this.direction.dot(tr),
      a = dn.dot(this.direction),
      l = -dn.dot(tr),
      c = dn.lengthSq(),
      h = Math.abs(1 - o * o);
    let u, d, p, g;
    if (h > 0)
      if (((u = o * l - a), (d = o * a - l), (g = s * h), u >= 0))
        if (d >= -g)
          if (d <= g) {
            const v = 1 / h;
            (u *= v), (d *= v), (p = u * (u + o * d + 2 * a) + d * (o * u + d + 2 * l) + c);
          } else (d = s), (u = Math.max(0, -(o * d + a))), (p = -u * u + d * (d + 2 * l) + c);
        else (d = -s), (u = Math.max(0, -(o * d + a))), (p = -u * u + d * (d + 2 * l) + c);
      else
        d <= -g
          ? ((u = Math.max(0, -(-o * s + a))), (d = u > 0 ? -s : Math.min(Math.max(-s, -l), s)), (p = -u * u + d * (d + 2 * l) + c))
          : d <= g
          ? ((u = 0), (d = Math.min(Math.max(-s, -l), s)), (p = d * (d + 2 * l) + c))
          : ((u = Math.max(0, -(o * s + a))), (d = u > 0 ? s : Math.min(Math.max(-s, -l), s)), (p = -u * u + d * (d + 2 * l) + c));
    else (d = o > 0 ? -s : s), (u = Math.max(0, -(o * d + a))), (p = -u * u + d * (d + 2 * l) + c);
    return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(us).addScaledVector(tr, d), p;
  }
  intersectSphere(t, e) {
    $e.subVectors(t.center, this.origin);
    const n = $e.dot(this.direction),
      r = $e.dot($e) - n * n,
      s = t.radius * t.radius;
    if (r > s) return null;
    const o = Math.sqrt(s - r),
      a = n - o,
      l = n + o;
    return l < 0 ? null : a < 0 ? this.at(l, e) : this.at(a, e);
  }
  intersectsSphere(t) {
    return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0) return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    return n >= 0 ? n : null;
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n, r, s, o, a, l;
    const c = 1 / this.direction.x,
      h = 1 / this.direction.y,
      u = 1 / this.direction.z,
      d = this.origin;
    return (
      c >= 0 ? ((n = (t.min.x - d.x) * c), (r = (t.max.x - d.x) * c)) : ((n = (t.max.x - d.x) * c), (r = (t.min.x - d.x) * c)),
      h >= 0 ? ((s = (t.min.y - d.y) * h), (o = (t.max.y - d.y) * h)) : ((s = (t.max.y - d.y) * h), (o = (t.min.y - d.y) * h)),
      n > o ||
      s > r ||
      ((s > n || isNaN(n)) && (n = s),
      (o < r || isNaN(r)) && (r = o),
      u >= 0 ? ((a = (t.min.z - d.z) * u), (l = (t.max.z - d.z) * u)) : ((a = (t.max.z - d.z) * u), (l = (t.min.z - d.z) * u)),
      n > l || a > r) ||
      ((a > n || n !== n) && (n = a), (l < r || r !== r) && (r = l), r < 0)
        ? null
        : this.at(n >= 0 ? n : r, e)
    );
  }
  intersectsBox(t) {
    return this.intersectBox(t, $e) !== null;
  }
  intersectTriangle(t, e, n, r, s) {
    fs.subVectors(e, t), er.subVectors(n, t), ds.crossVectors(fs, er);
    let o = this.direction.dot(ds),
      a;
    if (o > 0) {
      if (r) return null;
      a = 1;
    } else if (o < 0) (a = -1), (o = -o);
    else return null;
    dn.subVectors(this.origin, t);
    const l = a * this.direction.dot(er.crossVectors(dn, er));
    if (l < 0) return null;
    const c = a * this.direction.dot(fs.cross(dn));
    if (c < 0 || l + c > o) return null;
    const h = -a * dn.dot(ds);
    return h < 0 ? null : this.at(h / o, s);
  }
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class te {
  constructor(t, e, n, r, s, o, a, l, c, h, u, d, p, g, v, m) {
    (te.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      t !== void 0 && this.set(t, e, n, r, s, o, a, l, c, h, u, d, p, g, v, m);
  }
  set(t, e, n, r, s, o, a, l, c, h, u, d, p, g, v, m) {
    const f = this.elements;
    return (
      (f[0] = t),
      (f[4] = e),
      (f[8] = n),
      (f[12] = r),
      (f[1] = s),
      (f[5] = o),
      (f[9] = a),
      (f[13] = l),
      (f[2] = c),
      (f[6] = h),
      (f[10] = u),
      (f[14] = d),
      (f[3] = p),
      (f[7] = g),
      (f[11] = v),
      (f[15] = m),
      this
    );
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new te().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements,
      n = t.elements;
    return (
      (e[0] = n[0]),
      (e[1] = n[1]),
      (e[2] = n[2]),
      (e[3] = n[3]),
      (e[4] = n[4]),
      (e[5] = n[5]),
      (e[6] = n[6]),
      (e[7] = n[7]),
      (e[8] = n[8]),
      (e[9] = n[9]),
      (e[10] = n[10]),
      (e[11] = n[11]),
      (e[12] = n[12]),
      (e[13] = n[13]),
      (e[14] = n[14]),
      (e[15] = n[15]),
      this
    );
  }
  copyPosition(t) {
    const e = this.elements,
      n = t.elements;
    return (e[12] = n[12]), (e[13] = n[13]), (e[14] = n[14]), this;
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t, e, n) {
    return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t) {
    const e = this.elements,
      n = t.elements,
      r = 1 / Yn.setFromMatrixColumn(t, 0).length(),
      s = 1 / Yn.setFromMatrixColumn(t, 1).length(),
      o = 1 / Yn.setFromMatrixColumn(t, 2).length();
    return (
      (e[0] = n[0] * r),
      (e[1] = n[1] * r),
      (e[2] = n[2] * r),
      (e[3] = 0),
      (e[4] = n[4] * s),
      (e[5] = n[5] * s),
      (e[6] = n[6] * s),
      (e[7] = 0),
      (e[8] = n[8] * o),
      (e[9] = n[9] * o),
      (e[10] = n[10] * o),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0),
      (e[15] = 1),
      this
    );
  }
  makeRotationFromEuler(t) {
    const e = this.elements,
      n = t.x,
      r = t.y,
      s = t.z,
      o = Math.cos(n),
      a = Math.sin(n),
      l = Math.cos(r),
      c = Math.sin(r),
      h = Math.cos(s),
      u = Math.sin(s);
    if (t.order === "XYZ") {
      const d = o * h,
        p = o * u,
        g = a * h,
        v = a * u;
      (e[0] = l * h),
        (e[4] = -l * u),
        (e[8] = c),
        (e[1] = p + g * c),
        (e[5] = d - v * c),
        (e[9] = -a * l),
        (e[2] = v - d * c),
        (e[6] = g + p * c),
        (e[10] = o * l);
    } else if (t.order === "YXZ") {
      const d = l * h,
        p = l * u,
        g = c * h,
        v = c * u;
      (e[0] = d + v * a),
        (e[4] = g * a - p),
        (e[8] = o * c),
        (e[1] = o * u),
        (e[5] = o * h),
        (e[9] = -a),
        (e[2] = p * a - g),
        (e[6] = v + d * a),
        (e[10] = o * l);
    } else if (t.order === "ZXY") {
      const d = l * h,
        p = l * u,
        g = c * h,
        v = c * u;
      (e[0] = d - v * a),
        (e[4] = -o * u),
        (e[8] = g + p * a),
        (e[1] = p + g * a),
        (e[5] = o * h),
        (e[9] = v - d * a),
        (e[2] = -o * c),
        (e[6] = a),
        (e[10] = o * l);
    } else if (t.order === "ZYX") {
      const d = o * h,
        p = o * u,
        g = a * h,
        v = a * u;
      (e[0] = l * h),
        (e[4] = g * c - p),
        (e[8] = d * c + v),
        (e[1] = l * u),
        (e[5] = v * c + d),
        (e[9] = p * c - g),
        (e[2] = -c),
        (e[6] = a * l),
        (e[10] = o * l);
    } else if (t.order === "YZX") {
      const d = o * l,
        p = o * c,
        g = a * l,
        v = a * c;
      (e[0] = l * h),
        (e[4] = v - d * u),
        (e[8] = g * u + p),
        (e[1] = u),
        (e[5] = o * h),
        (e[9] = -a * h),
        (e[2] = -c * h),
        (e[6] = p * u + g),
        (e[10] = d - v * u);
    } else if (t.order === "XZY") {
      const d = o * l,
        p = o * c,
        g = a * l,
        v = a * c;
      (e[0] = l * h),
        (e[4] = -u),
        (e[8] = c * h),
        (e[1] = d * u + v),
        (e[5] = o * h),
        (e[9] = p * u - g),
        (e[2] = g * u - p),
        (e[6] = a * h),
        (e[10] = v * u + d);
    }
    return (e[3] = 0), (e[7] = 0), (e[11] = 0), (e[12] = 0), (e[13] = 0), (e[14] = 0), (e[15] = 1), this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Eh, t, Th);
  }
  lookAt(t, e, n) {
    const r = this.elements;
    return (
      Ae.subVectors(t, e),
      Ae.lengthSq() === 0 && (Ae.z = 1),
      Ae.normalize(),
      pn.crossVectors(n, Ae),
      pn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? (Ae.x += 1e-4) : (Ae.z += 1e-4), Ae.normalize(), pn.crossVectors(n, Ae)),
      pn.normalize(),
      nr.crossVectors(Ae, pn),
      (r[0] = pn.x),
      (r[4] = nr.x),
      (r[8] = Ae.x),
      (r[1] = pn.y),
      (r[5] = nr.y),
      (r[9] = Ae.y),
      (r[2] = pn.z),
      (r[6] = nr.z),
      (r[10] = Ae.z),
      this
    );
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements,
      r = e.elements,
      s = this.elements,
      o = n[0],
      a = n[4],
      l = n[8],
      c = n[12],
      h = n[1],
      u = n[5],
      d = n[9],
      p = n[13],
      g = n[2],
      v = n[6],
      m = n[10],
      f = n[14],
      E = n[3],
      _ = n[7],
      b = n[11],
      U = n[15],
      R = r[0],
      w = r[4],
      k = r[8],
      S = r[12],
      T = r[1],
      O = r[5],
      J = r[9],
      lt = r[13],
      D = r[2],
      F = r[6],
      G = r[10],
      j = r[14],
      Y = r[3],
      W = r[7],
      $ = r[11],
      Q = r[15];
    return (
      (s[0] = o * R + a * T + l * D + c * Y),
      (s[4] = o * w + a * O + l * F + c * W),
      (s[8] = o * k + a * J + l * G + c * $),
      (s[12] = o * S + a * lt + l * j + c * Q),
      (s[1] = h * R + u * T + d * D + p * Y),
      (s[5] = h * w + u * O + d * F + p * W),
      (s[9] = h * k + u * J + d * G + p * $),
      (s[13] = h * S + u * lt + d * j + p * Q),
      (s[2] = g * R + v * T + m * D + f * Y),
      (s[6] = g * w + v * O + m * F + f * W),
      (s[10] = g * k + v * J + m * G + f * $),
      (s[14] = g * S + v * lt + m * j + f * Q),
      (s[3] = E * R + _ * T + b * D + U * Y),
      (s[7] = E * w + _ * O + b * F + U * W),
      (s[11] = E * k + _ * J + b * G + U * $),
      (s[15] = E * S + _ * lt + b * j + U * Q),
      this
    );
  }
  multiplyScalar(t) {
    const e = this.elements;
    return (
      (e[0] *= t),
      (e[4] *= t),
      (e[8] *= t),
      (e[12] *= t),
      (e[1] *= t),
      (e[5] *= t),
      (e[9] *= t),
      (e[13] *= t),
      (e[2] *= t),
      (e[6] *= t),
      (e[10] *= t),
      (e[14] *= t),
      (e[3] *= t),
      (e[7] *= t),
      (e[11] *= t),
      (e[15] *= t),
      this
    );
  }
  determinant() {
    const t = this.elements,
      e = t[0],
      n = t[4],
      r = t[8],
      s = t[12],
      o = t[1],
      a = t[5],
      l = t[9],
      c = t[13],
      h = t[2],
      u = t[6],
      d = t[10],
      p = t[14],
      g = t[3],
      v = t[7],
      m = t[11],
      f = t[15];
    return (
      g * (+s * l * u - r * c * u - s * a * d + n * c * d + r * a * p - n * l * p) +
      v * (+e * l * p - e * c * d + s * o * d - r * o * p + r * c * h - s * l * h) +
      m * (+e * c * u - e * a * p - s * o * u + n * o * p + s * a * h - n * c * h) +
      f * (-r * a * h - e * l * u + e * a * d + r * o * u - n * o * d + n * l * h)
    );
  }
  transpose() {
    const t = this.elements;
    let e;
    return (
      (e = t[1]),
      (t[1] = t[4]),
      (t[4] = e),
      (e = t[2]),
      (t[2] = t[8]),
      (t[8] = e),
      (e = t[6]),
      (t[6] = t[9]),
      (t[9] = e),
      (e = t[3]),
      (t[3] = t[12]),
      (t[12] = e),
      (e = t[7]),
      (t[7] = t[13]),
      (t[13] = e),
      (e = t[11]),
      (t[11] = t[14]),
      (t[14] = e),
      this
    );
  }
  setPosition(t, e, n) {
    const r = this.elements;
    return t.isVector3 ? ((r[12] = t.x), (r[13] = t.y), (r[14] = t.z)) : ((r[12] = t), (r[13] = e), (r[14] = n)), this;
  }
  invert() {
    const t = this.elements,
      e = t[0],
      n = t[1],
      r = t[2],
      s = t[3],
      o = t[4],
      a = t[5],
      l = t[6],
      c = t[7],
      h = t[8],
      u = t[9],
      d = t[10],
      p = t[11],
      g = t[12],
      v = t[13],
      m = t[14],
      f = t[15],
      E = u * m * c - v * d * c + v * l * p - a * m * p - u * l * f + a * d * f,
      _ = g * d * c - h * m * c - g * l * p + o * m * p + h * l * f - o * d * f,
      b = h * v * c - g * u * c + g * a * p - o * v * p - h * a * f + o * u * f,
      U = g * u * l - h * v * l - g * a * d + o * v * d + h * a * m - o * u * m,
      R = e * E + n * _ + r * b + s * U;
    if (R === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const w = 1 / R;
    return (
      (t[0] = E * w),
      (t[1] = (v * d * s - u * m * s - v * r * p + n * m * p + u * r * f - n * d * f) * w),
      (t[2] = (a * m * s - v * l * s + v * r * c - n * m * c - a * r * f + n * l * f) * w),
      (t[3] = (u * l * s - a * d * s - u * r * c + n * d * c + a * r * p - n * l * p) * w),
      (t[4] = _ * w),
      (t[5] = (h * m * s - g * d * s + g * r * p - e * m * p - h * r * f + e * d * f) * w),
      (t[6] = (g * l * s - o * m * s - g * r * c + e * m * c + o * r * f - e * l * f) * w),
      (t[7] = (o * d * s - h * l * s + h * r * c - e * d * c - o * r * p + e * l * p) * w),
      (t[8] = b * w),
      (t[9] = (g * u * s - h * v * s - g * n * p + e * v * p + h * n * f - e * u * f) * w),
      (t[10] = (o * v * s - g * a * s + g * n * c - e * v * c - o * n * f + e * a * f) * w),
      (t[11] = (h * a * s - o * u * s - h * n * c + e * u * c + o * n * p - e * a * p) * w),
      (t[12] = U * w),
      (t[13] = (h * v * r - g * u * r + g * n * d - e * v * d - h * n * m + e * u * m) * w),
      (t[14] = (g * a * r - o * v * r - g * n * l + e * v * l + o * n * m - e * a * m) * w),
      (t[15] = (o * u * r - h * a * r + h * n * l - e * u * l - o * n * d + e * a * d) * w),
      this
    );
  }
  scale(t) {
    const e = this.elements,
      n = t.x,
      r = t.y,
      s = t.z;
    return (
      (e[0] *= n),
      (e[4] *= r),
      (e[8] *= s),
      (e[1] *= n),
      (e[5] *= r),
      (e[9] *= s),
      (e[2] *= n),
      (e[6] *= r),
      (e[10] *= s),
      (e[3] *= n),
      (e[7] *= r),
      (e[11] *= s),
      this
    );
  }
  getMaxScaleOnAxis() {
    const t = this.elements,
      e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
      n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
      r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, r));
  }
  makeTranslation(t, e, n) {
    return (
      t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this
    );
  }
  makeRotationX(t) {
    const e = Math.cos(t),
      n = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t) {
    const e = Math.cos(t),
      n = Math.sin(t);
    return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t) {
    const e = Math.cos(t),
      n = Math.sin(t);
    return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e),
      r = Math.sin(e),
      s = 1 - n,
      o = t.x,
      a = t.y,
      l = t.z,
      c = s * o,
      h = s * a;
    return (
      this.set(
        c * o + n,
        c * a - r * l,
        c * l + r * a,
        0,
        c * a + r * l,
        h * a + n,
        h * l - r * o,
        0,
        c * l - r * a,
        h * l + r * o,
        s * l * l + n,
        0,
        0,
        0,
        0,
        1
      ),
      this
    );
  }
  makeScale(t, e, n) {
    return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, e, n, r, s, o) {
    return this.set(1, n, s, 0, t, 1, o, 0, e, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, e, n) {
    const r = this.elements,
      s = e._x,
      o = e._y,
      a = e._z,
      l = e._w,
      c = s + s,
      h = o + o,
      u = a + a,
      d = s * c,
      p = s * h,
      g = s * u,
      v = o * h,
      m = o * u,
      f = a * u,
      E = l * c,
      _ = l * h,
      b = l * u,
      U = n.x,
      R = n.y,
      w = n.z;
    return (
      (r[0] = (1 - (v + f)) * U),
      (r[1] = (p + b) * U),
      (r[2] = (g - _) * U),
      (r[3] = 0),
      (r[4] = (p - b) * R),
      (r[5] = (1 - (d + f)) * R),
      (r[6] = (m + E) * R),
      (r[7] = 0),
      (r[8] = (g + _) * w),
      (r[9] = (m - E) * w),
      (r[10] = (1 - (d + v)) * w),
      (r[11] = 0),
      (r[12] = t.x),
      (r[13] = t.y),
      (r[14] = t.z),
      (r[15] = 1),
      this
    );
  }
  decompose(t, e, n) {
    const r = this.elements;
    let s = Yn.set(r[0], r[1], r[2]).length();
    const o = Yn.set(r[4], r[5], r[6]).length(),
      a = Yn.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), (t.x = r[12]), (t.y = r[13]), (t.z = r[14]), Fe.copy(this);
    const c = 1 / s,
      h = 1 / o,
      u = 1 / a;
    return (
      (Fe.elements[0] *= c),
      (Fe.elements[1] *= c),
      (Fe.elements[2] *= c),
      (Fe.elements[4] *= h),
      (Fe.elements[5] *= h),
      (Fe.elements[6] *= h),
      (Fe.elements[8] *= u),
      (Fe.elements[9] *= u),
      (Fe.elements[10] *= u),
      e.setFromRotationMatrix(Fe),
      (n.x = s),
      (n.y = o),
      (n.z = a),
      this
    );
  }
  makePerspective(t, e, n, r, s, o, a = an) {
    const l = this.elements,
      c = (2 * s) / (e - t),
      h = (2 * s) / (n - r),
      u = (e + t) / (e - t),
      d = (n + r) / (n - r);
    let p, g;
    if (a === an) (p = -(o + s) / (o - s)), (g = (-2 * o * s) / (o - s));
    else if (a === Or) (p = -o / (o - s)), (g = (-o * s) / (o - s));
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return (
      (l[0] = c),
      (l[4] = 0),
      (l[8] = u),
      (l[12] = 0),
      (l[1] = 0),
      (l[5] = h),
      (l[9] = d),
      (l[13] = 0),
      (l[2] = 0),
      (l[6] = 0),
      (l[10] = p),
      (l[14] = g),
      (l[3] = 0),
      (l[7] = 0),
      (l[11] = -1),
      (l[15] = 0),
      this
    );
  }
  makeOrthographic(t, e, n, r, s, o, a = an) {
    const l = this.elements,
      c = 1 / (e - t),
      h = 1 / (n - r),
      u = 1 / (o - s),
      d = (e + t) * c,
      p = (n + r) * h;
    let g, v;
    if (a === an) (g = (o + s) * u), (v = -2 * u);
    else if (a === Or) (g = s * u), (v = -1 * u);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return (
      (l[0] = 2 * c),
      (l[4] = 0),
      (l[8] = 0),
      (l[12] = -d),
      (l[1] = 0),
      (l[5] = 2 * h),
      (l[9] = 0),
      (l[13] = -p),
      (l[2] = 0),
      (l[6] = 0),
      (l[10] = v),
      (l[14] = -g),
      (l[3] = 0),
      (l[7] = 0),
      (l[11] = 0),
      (l[15] = 1),
      this
    );
  }
  equals(t) {
    const e = this.elements,
      n = t.elements;
    for (let r = 0; r < 16; r++) if (e[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return (
      (t[e] = n[0]),
      (t[e + 1] = n[1]),
      (t[e + 2] = n[2]),
      (t[e + 3] = n[3]),
      (t[e + 4] = n[4]),
      (t[e + 5] = n[5]),
      (t[e + 6] = n[6]),
      (t[e + 7] = n[7]),
      (t[e + 8] = n[8]),
      (t[e + 9] = n[9]),
      (t[e + 10] = n[10]),
      (t[e + 11] = n[11]),
      (t[e + 12] = n[12]),
      (t[e + 13] = n[13]),
      (t[e + 14] = n[14]),
      (t[e + 15] = n[15]),
      t
    );
  }
}
const Yn = new C(),
  Fe = new te(),
  Eh = new C(0, 0, 0),
  Th = new C(1, 1, 1),
  pn = new C(),
  nr = new C(),
  Ae = new C(),
  eo = new te(),
  no = new yn();
class qr {
  constructor(t = 0, e = 0, n = 0, r = qr.DEFAULT_ORDER) {
    (this.isEuler = !0), (this._x = t), (this._y = e), (this._z = n), (this._order = r);
  }
  get x() {
    return this._x;
  }
  set x(t) {
    (this._x = t), this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    (this._y = t), this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    (this._z = t), this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    (this._order = t), this._onChangeCallback();
  }
  set(t, e, n, r = this._order) {
    return (this._x = t), (this._y = e), (this._z = n), (this._order = r), this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return (this._x = t._x), (this._y = t._y), (this._z = t._z), (this._order = t._order), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, e = this._order, n = !0) {
    const r = t.elements,
      s = r[0],
      o = r[4],
      a = r[8],
      l = r[1],
      c = r[5],
      h = r[9],
      u = r[2],
      d = r[6],
      p = r[10];
    switch (e) {
      case "XYZ":
        (this._y = Math.asin(pe(a, -1, 1))),
          Math.abs(a) < 0.9999999 ? ((this._x = Math.atan2(-h, p)), (this._z = Math.atan2(-o, s))) : ((this._x = Math.atan2(d, c)), (this._z = 0));
        break;
      case "YXZ":
        (this._x = Math.asin(-pe(h, -1, 1))),
          Math.abs(h) < 0.9999999 ? ((this._y = Math.atan2(a, p)), (this._z = Math.atan2(l, c))) : ((this._y = Math.atan2(-u, s)), (this._z = 0));
        break;
      case "ZXY":
        (this._x = Math.asin(pe(d, -1, 1))),
          Math.abs(d) < 0.9999999 ? ((this._y = Math.atan2(-u, p)), (this._z = Math.atan2(-o, c))) : ((this._y = 0), (this._z = Math.atan2(l, s)));
        break;
      case "ZYX":
        (this._y = Math.asin(-pe(u, -1, 1))),
          Math.abs(u) < 0.9999999 ? ((this._x = Math.atan2(d, p)), (this._z = Math.atan2(l, s))) : ((this._x = 0), (this._z = Math.atan2(-o, c)));
        break;
      case "YZX":
        (this._z = Math.asin(pe(l, -1, 1))),
          Math.abs(l) < 0.9999999 ? ((this._x = Math.atan2(-h, c)), (this._y = Math.atan2(-u, s))) : ((this._x = 0), (this._y = Math.atan2(a, p)));
        break;
      case "XZY":
        (this._z = Math.asin(-pe(o, -1, 1))),
          Math.abs(o) < 0.9999999 ? ((this._x = Math.atan2(d, c)), (this._y = Math.atan2(a, s))) : ((this._x = Math.atan2(-h, p)), (this._y = 0));
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return (this._order = e), n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return eo.makeRotationFromQuaternion(t), this.setFromRotationMatrix(eo, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return no.setFromEuler(this), this.setFromQuaternion(no, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return (this._x = t[0]), (this._y = t[1]), (this._z = t[2]), t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return (t[e] = this._x), (t[e + 1] = this._y), (t[e + 2] = this._z), (t[e + 3] = this._order), t;
  }
  _onChange(t) {
    return (this._onChangeCallback = t), this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
qr.DEFAULT_ORDER = "XYZ";
class Ml {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = ((1 << t) | 0) >>> 0;
  }
  enable(t) {
    this.mask |= (1 << t) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= (1 << t) | 0;
  }
  disable(t) {
    this.mask &= ~((1 << t) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & ((1 << t) | 0)) !== 0;
  }
}
let bh = 0;
const io = new C(),
  jn = new yn(),
  Qe = new te(),
  ir = new C(),
  Ei = new C(),
  Ah = new C(),
  wh = new yn(),
  ro = new C(1, 0, 0),
  so = new C(0, 1, 0),
  ao = new C(0, 0, 1),
  Rh = { type: "added" },
  Ch = { type: "removed" };
class oe extends zn {
  constructor() {
    super(),
      (this.isObject3D = !0),
      Object.defineProperty(this, "id", { value: bh++ }),
      (this.uuid = qe()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = oe.DEFAULT_UP.clone());
    const t = new C(),
      e = new qr(),
      n = new yn(),
      r = new C(1, 1, 1);
    function s() {
      n.setFromEuler(e, !1);
    }
    function o() {
      e.setFromQuaternion(n, void 0, !1);
    }
    e._onChange(s),
      n._onChange(o),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: t },
        rotation: { configurable: !0, enumerable: !0, value: e },
        quaternion: { configurable: !0, enumerable: !0, value: n },
        scale: { configurable: !0, enumerable: !0, value: r },
        modelViewMatrix: { value: new te() },
        normalMatrix: { value: new Xt() },
      }),
      (this.matrix = new te()),
      (this.matrixWorld = new te()),
      (this.matrixAutoUpdate = oe.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldAutoUpdate = oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new Ml()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {});
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return jn.setFromAxisAngle(t, e), this.quaternion.multiply(jn), this;
  }
  rotateOnWorldAxis(t, e) {
    return jn.setFromAxisAngle(t, e), this.quaternion.premultiply(jn), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(ro, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(so, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(ao, t);
  }
  translateOnAxis(t, e) {
    return io.copy(t).applyQuaternion(this.quaternion), this.position.add(io.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(ro, t);
  }
  translateY(t) {
    return this.translateOnAxis(so, t);
  }
  translateZ(t) {
    return this.translateOnAxis(ao, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Qe.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? ir.copy(t) : ir.set(t, e, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1),
      Ei.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight ? Qe.lookAt(Ei, ir, this.up) : Qe.lookAt(ir, Ei, this.up),
      this.quaternion.setFromRotationMatrix(Qe),
      r && (Qe.extractRotation(r.matrixWorld), jn.setFromRotationMatrix(Qe), this.quaternion.premultiply(jn.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this;
    }
    return t === this
      ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this)
      : (t && t.isObject3D
          ? (t.parent !== null && t.parent.remove(t), (t.parent = this), this.children.push(t), t.dispatchEvent(Rh))
          : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t),
        this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && ((t.parent = null), this.children.splice(e, 1), t.dispatchEvent(Ch)), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return (
      this.updateWorldMatrix(!0, !1),
      Qe.copy(this.matrixWorld).invert(),
      t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Qe.multiply(t.parent.matrixWorld)),
      t.applyMatrix4(Qe),
      this.add(t),
      t.updateWorldMatrix(!1, !0),
      this
    );
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const o = this.children[n].getObjectByProperty(t, e);
      if (o !== void 0) return o;
    }
  }
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const r = this.children;
    for (let s = 0, o = r.length; s < o; s++) r[s].getObjectsByProperty(t, e, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ei, t, Ah), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ei, wh, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {}
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) e[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) e[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), (this.matrixWorldNeedsUpdate = !0);
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || t) &&
        (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (t = !0));
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++) {
      const s = e[n];
      (s.matrixWorldAutoUpdate === !0 || t === !0) && s.updateMatrixWorld(t);
    }
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (
      (t === !0 && n !== null && n.matrixWorldAutoUpdate === !0 && n.updateWorldMatrix(!0, !1),
      this.matrixAutoUpdate && this.updateMatrix(),
      this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
      e === !0)
    ) {
      const r = this.children;
      for (let s = 0, o = r.length; s < o; s++) {
        const a = r[s];
        a.matrixWorldAutoUpdate === !0 && a.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string",
      n = {};
    e &&
      ((t = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }),
      (n.metadata = { version: 4.6, type: "Object", generator: "Object3D.toJSON" }));
    const r = {};
    (r.uuid = this.uuid),
      (r.type = this.type),
      this.name !== "" && (r.name = this.name),
      this.castShadow === !0 && (r.castShadow = !0),
      this.receiveShadow === !0 && (r.receiveShadow = !0),
      this.visible === !1 && (r.visible = !1),
      this.frustumCulled === !1 && (r.frustumCulled = !1),
      this.renderOrder !== 0 && (r.renderOrder = this.renderOrder),
      Object.keys(this.userData).length > 0 && (r.userData = this.userData),
      (r.layers = this.layers.mask),
      (r.matrix = this.matrix.toArray()),
      (r.up = this.up.toArray()),
      this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1),
      this.isInstancedMesh &&
        ((r.type = "InstancedMesh"),
        (r.count = this.count),
        (r.instanceMatrix = this.instanceMatrix.toJSON()),
        this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())),
      this.isBatchedMesh &&
        ((r.type = "BatchedMesh"),
        (r.perObjectFrustumCulled = this.perObjectFrustumCulled),
        (r.sortObjects = this.sortObjects),
        (r.drawRanges = this._drawRanges),
        (r.reservedRanges = this._reservedRanges),
        (r.visibility = this._visibility),
        (r.active = this._active),
        (r.bounds = this._bounds.map((a) => ({
          boxInitialized: a.boxInitialized,
          boxMin: a.box.min.toArray(),
          boxMax: a.box.max.toArray(),
          sphereInitialized: a.sphereInitialized,
          sphereRadius: a.sphere.radius,
          sphereCenter: a.sphere.center.toArray(),
        }))),
        (r.maxGeometryCount = this._maxGeometryCount),
        (r.maxVertexCount = this._maxVertexCount),
        (r.maxIndexCount = this._maxIndexCount),
        (r.geometryInitialized = this._geometryInitialized),
        (r.geometryCount = this._geometryCount),
        (r.matricesTexture = this._matricesTexture.toJSON(t)),
        this.boundingSphere !== null && (r.boundingSphere = { center: r.boundingSphere.center.toArray(), radius: r.boundingSphere.radius }),
        this.boundingBox !== null && (r.boundingBox = { min: r.boundingBox.min.toArray(), max: r.boundingBox.max.toArray() }));
    function s(a, l) {
      return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background &&
        (this.background.isColor
          ? (r.background = this.background.toJSON())
          : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)),
        this.environment &&
          this.environment.isTexture &&
          this.environment.isRenderTargetTexture !== !0 &&
          (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const l = a.shapes;
        if (Array.isArray(l))
          for (let c = 0, h = l.length; c < h; c++) {
            const u = l[c];
            s(t.shapes, u);
          }
        else s(t.shapes, l);
      }
    }
    if (
      (this.isSkinnedMesh &&
        ((r.bindMode = this.bindMode),
        (r.bindMatrix = this.bindMatrix.toArray()),
        this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), (r.skeleton = this.skeleton.uuid))),
      this.material !== void 0)
    )
      if (Array.isArray(this.material)) {
        const a = [];
        for (let l = 0, c = this.material.length; l < c; l++) a.push(s(t.materials, this.material[l]));
        r.material = a;
      } else r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let a = 0; a < this.children.length; a++) r.children.push(this.children[a].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const l = this.animations[a];
        r.animations.push(s(t.animations, l));
      }
    }
    if (e) {
      const a = o(t.geometries),
        l = o(t.materials),
        c = o(t.textures),
        h = o(t.images),
        u = o(t.shapes),
        d = o(t.skeletons),
        p = o(t.animations),
        g = o(t.nodes);
      a.length > 0 && (n.geometries = a),
        l.length > 0 && (n.materials = l),
        c.length > 0 && (n.textures = c),
        h.length > 0 && (n.images = h),
        u.length > 0 && (n.shapes = u),
        d.length > 0 && (n.skeletons = d),
        p.length > 0 && (n.animations = p),
        g.length > 0 && (n.nodes = g);
    }
    return (n.object = r), n;
    function o(a) {
      const l = [];
      for (const c in a) {
        const h = a[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = !0) {
    if (
      ((this.name = t.name),
      this.up.copy(t.up),
      this.position.copy(t.position),
      (this.rotation.order = t.rotation.order),
      this.quaternion.copy(t.quaternion),
      this.scale.copy(t.scale),
      this.matrix.copy(t.matrix),
      this.matrixWorld.copy(t.matrixWorld),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
      (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
      (this.layers.mask = t.layers.mask),
      (this.visible = t.visible),
      (this.castShadow = t.castShadow),
      (this.receiveShadow = t.receiveShadow),
      (this.frustumCulled = t.frustumCulled),
      (this.renderOrder = t.renderOrder),
      (this.animations = t.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      e === !0)
    )
      for (let n = 0; n < t.children.length; n++) {
        const r = t.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
oe.DEFAULT_UP = new C(0, 1, 0);
oe.DEFAULT_MATRIX_AUTO_UPDATE = !0;
oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Be = new C(),
  tn = new C(),
  ps = new C(),
  en = new C(),
  Zn = new C(),
  Kn = new C(),
  oo = new C(),
  ms = new C(),
  gs = new C(),
  _s = new C();
let rr = !1;
class Ue {
  constructor(t = new C(), e = new C(), n = new C()) {
    (this.a = t), (this.b = e), (this.c = n);
  }
  static getNormal(t, e, n, r) {
    r.subVectors(n, e), Be.subVectors(t, e), r.cross(Be);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  static getBarycoord(t, e, n, r, s) {
    Be.subVectors(r, e), tn.subVectors(n, e), ps.subVectors(t, e);
    const o = Be.dot(Be),
      a = Be.dot(tn),
      l = Be.dot(ps),
      c = tn.dot(tn),
      h = tn.dot(ps),
      u = o * c - a * a;
    if (u === 0) return s.set(0, 0, 0), null;
    const d = 1 / u,
      p = (c * l - a * h) * d,
      g = (o * h - a * l) * d;
    return s.set(1 - p - g, g, p);
  }
  static containsPoint(t, e, n, r) {
    return this.getBarycoord(t, e, n, r, en) === null ? !1 : en.x >= 0 && en.y >= 0 && en.x + en.y <= 1;
  }
  static getUV(t, e, n, r, s, o, a, l) {
    return (
      rr === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), (rr = !0)),
      this.getInterpolation(t, e, n, r, s, o, a, l)
    );
  }
  static getInterpolation(t, e, n, r, s, o, a, l) {
    return this.getBarycoord(t, e, n, r, en) === null
      ? ((l.x = 0), (l.y = 0), "z" in l && (l.z = 0), "w" in l && (l.w = 0), null)
      : (l.setScalar(0), l.addScaledVector(s, en.x), l.addScaledVector(o, en.y), l.addScaledVector(a, en.z), l);
  }
  static isFrontFacing(t, e, n, r) {
    return Be.subVectors(n, e), tn.subVectors(t, e), Be.cross(tn).dot(r) < 0;
  }
  set(t, e, n) {
    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, e, n, r) {
    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[r]), this;
  }
  setFromAttributeAndIndices(t, e, n, r) {
    return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Be.subVectors(this.c, this.b), tn.subVectors(this.a, this.b), Be.cross(tn).length() * 0.5;
  }
  getMidpoint(t) {
    return t
      .addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Ue.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return Ue.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getUV(t, e, n, r, s) {
    return (
      rr === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), (rr = !0)),
      Ue.getInterpolation(t, this.a, this.b, this.c, e, n, r, s)
    );
  }
  getInterpolation(t, e, n, r, s) {
    return Ue.getInterpolation(t, this.a, this.b, this.c, e, n, r, s);
  }
  containsPoint(t) {
    return Ue.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Ue.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a,
      r = this.b,
      s = this.c;
    let o, a;
    Zn.subVectors(r, n), Kn.subVectors(s, n), ms.subVectors(t, n);
    const l = Zn.dot(ms),
      c = Kn.dot(ms);
    if (l <= 0 && c <= 0) return e.copy(n);
    gs.subVectors(t, r);
    const h = Zn.dot(gs),
      u = Kn.dot(gs);
    if (h >= 0 && u <= h) return e.copy(r);
    const d = l * u - h * c;
    if (d <= 0 && l >= 0 && h <= 0) return (o = l / (l - h)), e.copy(n).addScaledVector(Zn, o);
    _s.subVectors(t, s);
    const p = Zn.dot(_s),
      g = Kn.dot(_s);
    if (g >= 0 && p <= g) return e.copy(s);
    const v = p * c - l * g;
    if (v <= 0 && c >= 0 && g <= 0) return (a = c / (c - g)), e.copy(n).addScaledVector(Kn, a);
    const m = h * g - p * u;
    if (m <= 0 && u - h >= 0 && p - g >= 0) return oo.subVectors(s, r), (a = (u - h) / (u - h + (p - g))), e.copy(r).addScaledVector(oo, a);
    const f = 1 / (m + v + d);
    return (o = v * f), (a = d * f), e.copy(n).addScaledVector(Zn, o).addScaledVector(Kn, a);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const Sl = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  mn = { h: 0, s: 0, l: 0 },
  sr = { h: 0, s: 0, l: 0 };
function vs(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class Ft {
  constructor(t, e, n) {
    return (this.isColor = !0), (this.r = 1), (this.g = 1), (this.b = 1), this.set(t, e, n);
  }
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const r = t;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else this.setRGB(t, e, n);
    return this;
  }
  setScalar(t) {
    return (this.r = t), (this.g = t), (this.b = t), this;
  }
  setHex(t, e = ge) {
    return (
      (t = Math.floor(t)),
      (this.r = ((t >> 16) & 255) / 255),
      (this.g = ((t >> 8) & 255) / 255),
      (this.b = (t & 255) / 255),
      Jt.toWorkingColorSpace(this, e),
      this
    );
  }
  setRGB(t, e, n, r = Jt.workingColorSpace) {
    return (this.r = t), (this.g = e), (this.b = n), Jt.toWorkingColorSpace(this, r), this;
  }
  setHSL(t, e, n, r = Jt.workingColorSpace) {
    if (((t = ea(t, 1)), (e = pe(e, 0, 1)), (n = pe(n, 0, 1)), e === 0)) this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + e) : n + e - n * e,
        o = 2 * n - s;
      (this.r = vs(o, s, t + 1 / 3)), (this.g = vs(o, s, t)), (this.b = vs(o, s, t - 1 / 3));
    }
    return Jt.toWorkingColorSpace(this, r), this;
  }
  setStyle(t, e = ge) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
    }
    let r;
    if ((r = /^(\w+)\(([^\)]*)\)/.exec(t))) {
      let s;
      const o = r[1],
        a = r[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if ((s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)))
            return (
              n(s[4]),
              this.setRGB(
                Math.min(255, parseInt(s[1], 10)) / 255,
                Math.min(255, parseInt(s[2], 10)) / 255,
                Math.min(255, parseInt(s[3], 10)) / 255,
                e
              )
            );
          if ((s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)))
            return (
              n(s[4]),
              this.setRGB(
                Math.min(100, parseInt(s[1], 10)) / 100,
                Math.min(100, parseInt(s[2], 10)) / 100,
                Math.min(100, parseInt(s[3], 10)) / 100,
                e
              )
            );
          break;
        case "hsl":
        case "hsla":
          if ((s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)))
            return n(s[4]), this.setHSL(parseFloat(s[1]) / 360, parseFloat(s[2]) / 100, parseFloat(s[3]) / 100, e);
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if ((r = /^\#([A-Fa-f\d]+)$/.exec(t))) {
      const s = r[1],
        o = s.length;
      if (o === 3) return this.setRGB(parseInt(s.charAt(0), 16) / 15, parseInt(s.charAt(1), 16) / 15, parseInt(s.charAt(2), 16) / 15, e);
      if (o === 6) return this.setHex(parseInt(s, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0) return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = ge) {
    const n = Sl[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return (this.r = t.r), (this.g = t.g), (this.b = t.b), this;
  }
  copySRGBToLinear(t) {
    return (this.r = di(t.r)), (this.g = di(t.g)), (this.b = di(t.b)), this;
  }
  copyLinearToSRGB(t) {
    return (this.r = as(t.r)), (this.g = as(t.g)), (this.b = as(t.b)), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = ge) {
    return (
      Jt.fromWorkingColorSpace(xe.copy(this), t),
      Math.round(pe(xe.r * 255, 0, 255)) * 65536 + Math.round(pe(xe.g * 255, 0, 255)) * 256 + Math.round(pe(xe.b * 255, 0, 255))
    );
  }
  getHexString(t = ge) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = Jt.workingColorSpace) {
    Jt.fromWorkingColorSpace(xe.copy(this), e);
    const n = xe.r,
      r = xe.g,
      s = xe.b,
      o = Math.max(n, r, s),
      a = Math.min(n, r, s);
    let l, c;
    const h = (a + o) / 2;
    if (a === o) (l = 0), (c = 0);
    else {
      const u = o - a;
      switch (((c = h <= 0.5 ? u / (o + a) : u / (2 - o - a)), o)) {
        case n:
          l = (r - s) / u + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / u + 2;
          break;
        case s:
          l = (n - r) / u + 4;
          break;
      }
      l /= 6;
    }
    return (t.h = l), (t.s = c), (t.l = h), t;
  }
  getRGB(t, e = Jt.workingColorSpace) {
    return Jt.fromWorkingColorSpace(xe.copy(this), e), (t.r = xe.r), (t.g = xe.g), (t.b = xe.b), t;
  }
  getStyle(t = ge) {
    Jt.fromWorkingColorSpace(xe.copy(this), t);
    const e = xe.r,
      n = xe.g,
      r = xe.b;
    return t !== ge
      ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`
      : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(t, e, n) {
    return this.getHSL(mn), this.setHSL(mn.h + t, mn.s + e, mn.l + n);
  }
  add(t) {
    return (this.r += t.r), (this.g += t.g), (this.b += t.b), this;
  }
  addColors(t, e) {
    return (this.r = t.r + e.r), (this.g = t.g + e.g), (this.b = t.b + e.b), this;
  }
  addScalar(t) {
    return (this.r += t), (this.g += t), (this.b += t), this;
  }
  sub(t) {
    return (this.r = Math.max(0, this.r - t.r)), (this.g = Math.max(0, this.g - t.g)), (this.b = Math.max(0, this.b - t.b)), this;
  }
  multiply(t) {
    return (this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this;
  }
  multiplyScalar(t) {
    return (this.r *= t), (this.g *= t), (this.b *= t), this;
  }
  lerp(t, e) {
    return (this.r += (t.r - this.r) * e), (this.g += (t.g - this.g) * e), (this.b += (t.b - this.b) * e), this;
  }
  lerpColors(t, e, n) {
    return (this.r = t.r + (e.r - t.r) * n), (this.g = t.g + (e.g - t.g) * n), (this.b = t.b + (e.b - t.b) * n), this;
  }
  lerpHSL(t, e) {
    this.getHSL(mn), t.getHSL(sr);
    const n = Li(mn.h, sr.h, e),
      r = Li(mn.s, sr.s, e),
      s = Li(mn.l, sr.l, e);
    return this.setHSL(n, r, s), this;
  }
  setFromVector3(t) {
    return (this.r = t.x), (this.g = t.y), (this.b = t.z), this;
  }
  applyMatrix3(t) {
    const e = this.r,
      n = this.g,
      r = this.b,
      s = t.elements;
    return (this.r = s[0] * e + s[3] * n + s[6] * r), (this.g = s[1] * e + s[4] * n + s[7] * r), (this.b = s[2] * e + s[5] * n + s[8] * r), this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return (this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this;
  }
  toArray(t = [], e = 0) {
    return (t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t;
  }
  fromBufferAttribute(t, e) {
    return (this.r = t.getX(e)), (this.g = t.getY(e)), (this.b = t.getZ(e)), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const xe = new Ft();
Ft.NAMES = Sl;
let Ph = 0;
class je extends zn {
  constructor() {
    super(),
      (this.isMaterial = !0),
      Object.defineProperty(this, "id", { value: Ph++ }),
      (this.uuid = qe()),
      (this.name = ""),
      (this.type = "Material"),
      (this.blending = fi),
      (this.side = Sn),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = Fs),
      (this.blendDst = Bs),
      (this.blendEquation = Dn),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.blendColor = new Ft(0, 0, 0)),
      (this.blendAlpha = 0),
      (this.depthFunc = Dr),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = ja),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = Vn),
      (this.stencilZFail = Vn),
      (this.stencilZPass = Vn),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0);
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, (this._alphaTest = t);
  }
  onBuild() {}
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const n = t[e];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const r = this[e];
        if (r === void 0) {
          console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : (this[e] = n);
      }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = { textures: {}, images: {} });
    const n = { metadata: { version: 4.6, type: "Material", generator: "Material.toJSON" } };
    (n.uuid = this.uuid),
      (n.type = this.type),
      this.name !== "" && (n.name = this.name),
      this.color && this.color.isColor && (n.color = this.color.getHex()),
      this.roughness !== void 0 && (n.roughness = this.roughness),
      this.metalness !== void 0 && (n.metalness = this.metalness),
      this.sheen !== void 0 && (n.sheen = this.sheen),
      this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()),
      this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness),
      this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()),
      this.emissiveIntensity && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity),
      this.specular && this.specular.isColor && (n.specular = this.specular.getHex()),
      this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity),
      this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()),
      this.shininess !== void 0 && (n.shininess = this.shininess),
      this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat),
      this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness),
      this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
      this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid), (n.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
      this.iridescence !== void 0 && (n.iridescence = this.iridescence),
      this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR),
      this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange),
      this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid),
      this.iridescenceThicknessMap &&
        this.iridescenceThicknessMap.isTexture &&
        (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid),
      this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy),
      this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation),
      this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid),
      this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid),
      this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid),
      this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid),
      this.lightMap && this.lightMap.isTexture && ((n.lightMap = this.lightMap.toJSON(t).uuid), (n.lightMapIntensity = this.lightMapIntensity)),
      this.aoMap && this.aoMap.isTexture && ((n.aoMap = this.aoMap.toJSON(t).uuid), (n.aoMapIntensity = this.aoMapIntensity)),
      this.bumpMap && this.bumpMap.isTexture && ((n.bumpMap = this.bumpMap.toJSON(t).uuid), (n.bumpScale = this.bumpScale)),
      this.normalMap &&
        this.normalMap.isTexture &&
        ((n.normalMap = this.normalMap.toJSON(t).uuid), (n.normalMapType = this.normalMapType), (n.normalScale = this.normalScale.toArray())),
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((n.displacementMap = this.displacementMap.toJSON(t).uuid),
        (n.displacementScale = this.displacementScale),
        (n.displacementBias = this.displacementBias)),
      this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid),
      this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid),
      this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid),
      this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid),
      this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid),
      this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid),
      this.envMap && this.envMap.isTexture && ((n.envMap = this.envMap.toJSON(t).uuid), this.combine !== void 0 && (n.combine = this.combine)),
      this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity),
      this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity),
      this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio),
      this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid),
      this.transmission !== void 0 && (n.transmission = this.transmission),
      this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid),
      this.thickness !== void 0 && (n.thickness = this.thickness),
      this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid),
      this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance),
      this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()),
      this.size !== void 0 && (n.size = this.size),
      this.shadowSide !== null && (n.shadowSide = this.shadowSide),
      this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation),
      this.blending !== fi && (n.blending = this.blending),
      this.side !== Sn && (n.side = this.side),
      this.vertexColors === !0 && (n.vertexColors = !0),
      this.opacity < 1 && (n.opacity = this.opacity),
      this.transparent === !0 && (n.transparent = !0),
      this.blendSrc !== Fs && (n.blendSrc = this.blendSrc),
      this.blendDst !== Bs && (n.blendDst = this.blendDst),
      this.blendEquation !== Dn && (n.blendEquation = this.blendEquation),
      this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha),
      this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha),
      this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha),
      this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()),
      this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha),
      this.depthFunc !== Dr && (n.depthFunc = this.depthFunc),
      this.depthTest === !1 && (n.depthTest = this.depthTest),
      this.depthWrite === !1 && (n.depthWrite = this.depthWrite),
      this.colorWrite === !1 && (n.colorWrite = this.colorWrite),
      this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask),
      this.stencilFunc !== ja && (n.stencilFunc = this.stencilFunc),
      this.stencilRef !== 0 && (n.stencilRef = this.stencilRef),
      this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask),
      this.stencilFail !== Vn && (n.stencilFail = this.stencilFail),
      this.stencilZFail !== Vn && (n.stencilZFail = this.stencilZFail),
      this.stencilZPass !== Vn && (n.stencilZPass = this.stencilZPass),
      this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite),
      this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation),
      this.polygonOffset === !0 && (n.polygonOffset = !0),
      this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor),
      this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits),
      this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth),
      this.dashSize !== void 0 && (n.dashSize = this.dashSize),
      this.gapSize !== void 0 && (n.gapSize = this.gapSize),
      this.scale !== void 0 && (n.scale = this.scale),
      this.dithering === !0 && (n.dithering = !0),
      this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
      this.alphaHash === !0 && (n.alphaHash = !0),
      this.alphaToCoverage === !0 && (n.alphaToCoverage = !0),
      this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0),
      this.forceSinglePass === !0 && (n.forceSinglePass = !0),
      this.wireframe === !0 && (n.wireframe = !0),
      this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth),
      this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap),
      this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin),
      this.flatShading === !0 && (n.flatShading = !0),
      this.visible === !1 && (n.visible = !1),
      this.toneMapped === !1 && (n.toneMapped = !1),
      this.fog === !1 && (n.fog = !1),
      Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const o = [];
      for (const a in s) {
        const l = s[a];
        delete l.metadata, o.push(l);
      }
      return o;
    }
    if (e) {
      const s = r(t.textures),
        o = r(t.images);
      s.length > 0 && (n.textures = s), o.length > 0 && (n.images = o);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    (this.name = t.name),
      (this.blending = t.blending),
      (this.side = t.side),
      (this.vertexColors = t.vertexColors),
      (this.opacity = t.opacity),
      (this.transparent = t.transparent),
      (this.blendSrc = t.blendSrc),
      (this.blendDst = t.blendDst),
      (this.blendEquation = t.blendEquation),
      (this.blendSrcAlpha = t.blendSrcAlpha),
      (this.blendDstAlpha = t.blendDstAlpha),
      (this.blendEquationAlpha = t.blendEquationAlpha),
      this.blendColor.copy(t.blendColor),
      (this.blendAlpha = t.blendAlpha),
      (this.depthFunc = t.depthFunc),
      (this.depthTest = t.depthTest),
      (this.depthWrite = t.depthWrite),
      (this.stencilWriteMask = t.stencilWriteMask),
      (this.stencilFunc = t.stencilFunc),
      (this.stencilRef = t.stencilRef),
      (this.stencilFuncMask = t.stencilFuncMask),
      (this.stencilFail = t.stencilFail),
      (this.stencilZFail = t.stencilZFail),
      (this.stencilZPass = t.stencilZPass),
      (this.stencilWrite = t.stencilWrite);
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const r = e.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s) n[s] = e[s].clone();
    }
    return (
      (this.clippingPlanes = n),
      (this.clipIntersection = t.clipIntersection),
      (this.clipShadows = t.clipShadows),
      (this.shadowSide = t.shadowSide),
      (this.colorWrite = t.colorWrite),
      (this.precision = t.precision),
      (this.polygonOffset = t.polygonOffset),
      (this.polygonOffsetFactor = t.polygonOffsetFactor),
      (this.polygonOffsetUnits = t.polygonOffsetUnits),
      (this.dithering = t.dithering),
      (this.alphaTest = t.alphaTest),
      (this.alphaHash = t.alphaHash),
      (this.alphaToCoverage = t.alphaToCoverage),
      (this.premultipliedAlpha = t.premultipliedAlpha),
      (this.forceSinglePass = t.forceSinglePass),
      (this.visible = t.visible),
      (this.toneMapped = t.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(t.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
}
class na extends je {
  constructor(t) {
    super(),
      (this.isMeshBasicMaterial = !0),
      (this.type = "MeshBasicMaterial"),
      (this.color = new Ft(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = Gr),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.fog = !0),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.fog = t.fog),
      this
    );
  }
}
const ce = new C(),
  ar = new Z();
class Ve {
  constructor(t, e, n = !1) {
    if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    (this.isBufferAttribute = !0),
      (this.name = ""),
      (this.array = t),
      (this.itemSize = e),
      (this.count = t !== void 0 ? t.length / e : 0),
      (this.normalized = n),
      (this.usage = ks),
      (this._updateRange = { offset: 0, count: -1 }),
      (this.updateRanges = []),
      (this.gpuType = vn),
      (this.version = 0);
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  get updateRange() {
    return (
      console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange
    );
  }
  setUsage(t) {
    return (this.usage = t), this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return (
      (this.name = t.name),
      (this.array = new t.array.constructor(t.array)),
      (this.itemSize = t.itemSize),
      (this.count = t.count),
      (this.normalized = t.normalized),
      (this.usage = t.usage),
      (this.gpuType = t.gpuType),
      this
    );
  }
  copyAt(t, e, n) {
    (t *= this.itemSize), (n *= e.itemSize);
    for (let r = 0, s = this.itemSize; r < s; r++) this.array[t + r] = e.array[n + r];
    return this;
  }
  copyArray(t) {
    return this.array.set(t), this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, n = this.count; e < n; e++) ar.fromBufferAttribute(this, e), ar.applyMatrix3(t), this.setXY(e, ar.x, ar.y);
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++) ce.fromBufferAttribute(this, e), ce.applyMatrix3(t), this.setXYZ(e, ce.x, ce.y, ce.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++) ce.fromBufferAttribute(this, e), ce.applyMatrix4(t), this.setXYZ(e, ce.x, ce.y, ce.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++) ce.fromBufferAttribute(this, e), ce.applyNormalMatrix(t), this.setXYZ(e, ce.x, ce.y, ce.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++) ce.fromBufferAttribute(this, e), ce.transformDirection(t), this.setXYZ(e, ce.x, ce.y, ce.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = Xe(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = Kt(n, this.array)), (this.array[t * this.itemSize + e] = n), this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = Xe(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = Kt(e, this.array)), (this.array[t * this.itemSize] = e), this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = Xe(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = Kt(e, this.array)), (this.array[t * this.itemSize + 1] = e), this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = Xe(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = Kt(e, this.array)), (this.array[t * this.itemSize + 2] = e), this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = Xe(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = Kt(e, this.array)), (this.array[t * this.itemSize + 3] = e), this;
  }
  setXY(t, e, n) {
    return (
      (t *= this.itemSize),
      this.normalized && ((e = Kt(e, this.array)), (n = Kt(n, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = n),
      this
    );
  }
  setXYZ(t, e, n, r) {
    return (
      (t *= this.itemSize),
      this.normalized && ((e = Kt(e, this.array)), (n = Kt(n, this.array)), (r = Kt(r, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = n),
      (this.array[t + 2] = r),
      this
    );
  }
  setXYZW(t, e, n, r, s) {
    return (
      (t *= this.itemSize),
      this.normalized && ((e = Kt(e, this.array)), (n = Kt(n, this.array)), (r = Kt(r, this.array)), (s = Kt(s, this.array))),
      (this.array[t + 0] = e),
      (this.array[t + 1] = n),
      (this.array[t + 2] = r),
      (this.array[t + 3] = s),
      this
    );
  }
  onUpload(t) {
    return (this.onUploadCallback = t), this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
    return this.name !== "" && (t.name = this.name), this.usage !== ks && (t.usage = this.usage), t;
  }
}
class yl extends Ve {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class El extends Ve {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class Me extends Ve {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let Lh = 0;
const Le = new te(),
  xs = new oe(),
  Jn = new C(),
  we = new ki(),
  Ti = new ki(),
  de = new C();
class Ce extends zn {
  constructor() {
    super(),
      (this.isBufferGeometry = !0),
      Object.defineProperty(this, "id", { value: Lh++ }),
      (this.uuid = qe()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {});
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? (this.index = new (gl(t) ? El : yl)(t, 1)) : (this.index = t), this;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return (this.attributes[t] = e), this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({ start: t, count: e, materialIndex: n });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    (this.drawRange.start = t), (this.drawRange.count = e);
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), (e.needsUpdate = !0));
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Xt().getNormalMatrix(t);
      n.applyNormalMatrix(s), (n.needsUpdate = !0);
    }
    const r = this.attributes.tangent;
    return (
      r !== void 0 && (r.transformDirection(t), (r.needsUpdate = !0)),
      this.boundingBox !== null && this.computeBoundingBox(),
      this.boundingSphere !== null && this.computeBoundingSphere(),
      this
    );
  }
  applyQuaternion(t) {
    return Le.makeRotationFromQuaternion(t), this.applyMatrix4(Le), this;
  }
  rotateX(t) {
    return Le.makeRotationX(t), this.applyMatrix4(Le), this;
  }
  rotateY(t) {
    return Le.makeRotationY(t), this.applyMatrix4(Le), this;
  }
  rotateZ(t) {
    return Le.makeRotationZ(t), this.applyMatrix4(Le), this;
  }
  translate(t, e, n) {
    return Le.makeTranslation(t, e, n), this.applyMatrix4(Le), this;
  }
  scale(t, e, n) {
    return Le.makeScale(t, e, n), this.applyMatrix4(Le), this;
  }
  lookAt(t) {
    return xs.lookAt(t), xs.updateMatrix(), this.applyMatrix4(xs.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Jn).negate(), this.translate(Jn.x, Jn.y, Jn.z), this;
  }
  setFromPoints(t) {
    const e = [];
    for (let n = 0, r = t.length; n < r; n++) {
      const s = t[n];
      e.push(s.x, s.y, s.z || 0);
    }
    return this.setAttribute("position", new Me(e, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new ki());
    const t = this.attributes.position,
      e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error(
        'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
        this
      ),
        this.boundingBox.set(new C(-1 / 0, -1 / 0, -1 / 0), new C(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if ((this.boundingBox.setFromBufferAttribute(t), e))
        for (let n = 0, r = e.length; n < r; n++) {
          const s = e[n];
          we.setFromBufferAttribute(s),
            this.morphTargetsRelative
              ? (de.addVectors(this.boundingBox.min, we.min),
                this.boundingBox.expandByPoint(de),
                de.addVectors(this.boundingBox.max, we.max),
                this.boundingBox.expandByPoint(de))
              : (this.boundingBox.expandByPoint(we.min), this.boundingBox.expandByPoint(we.max));
        }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) &&
      console.error(
        'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
        this
      );
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Wi());
    const t = this.attributes.position,
      e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error(
        'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
        this
      ),
        this.boundingSphere.set(new C(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if ((we.setFromBufferAttribute(t), e))
        for (let s = 0, o = e.length; s < o; s++) {
          const a = e[s];
          Ti.setFromBufferAttribute(a),
            this.morphTargetsRelative
              ? (de.addVectors(we.min, Ti.min), we.expandByPoint(de), de.addVectors(we.max, Ti.max), we.expandByPoint(de))
              : (we.expandByPoint(Ti.min), we.expandByPoint(Ti.max));
        }
      we.getCenter(n);
      let r = 0;
      for (let s = 0, o = t.count; s < o; s++) de.fromBufferAttribute(t, s), (r = Math.max(r, n.distanceToSquared(de)));
      if (e)
        for (let s = 0, o = e.length; s < o; s++) {
          const a = e[s],
            l = this.morphTargetsRelative;
          for (let c = 0, h = a.count; c < h; c++)
            de.fromBufferAttribute(a, c), l && (Jn.fromBufferAttribute(t, c), de.add(Jn)), (r = Math.max(r, n.distanceToSquared(de)));
        }
      (this.boundingSphere.radius = Math.sqrt(r)),
        isNaN(this.boundingSphere.radius) &&
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this
          );
    }
  }
  computeTangents() {
    const t = this.index,
      e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.array,
      r = e.position.array,
      s = e.normal.array,
      o = e.uv.array,
      a = r.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ve(new Float32Array(4 * a), 4));
    const l = this.getAttribute("tangent").array,
      c = [],
      h = [];
    for (let T = 0; T < a; T++) (c[T] = new C()), (h[T] = new C());
    const u = new C(),
      d = new C(),
      p = new C(),
      g = new Z(),
      v = new Z(),
      m = new Z(),
      f = new C(),
      E = new C();
    function _(T, O, J) {
      u.fromArray(r, T * 3),
        d.fromArray(r, O * 3),
        p.fromArray(r, J * 3),
        g.fromArray(o, T * 2),
        v.fromArray(o, O * 2),
        m.fromArray(o, J * 2),
        d.sub(u),
        p.sub(u),
        v.sub(g),
        m.sub(g);
      const lt = 1 / (v.x * m.y - m.x * v.y);
      !isFinite(lt) ||
        (f.copy(d).multiplyScalar(m.y).addScaledVector(p, -v.y).multiplyScalar(lt),
        E.copy(p).multiplyScalar(v.x).addScaledVector(d, -m.x).multiplyScalar(lt),
        c[T].add(f),
        c[O].add(f),
        c[J].add(f),
        h[T].add(E),
        h[O].add(E),
        h[J].add(E));
    }
    let b = this.groups;
    b.length === 0 && (b = [{ start: 0, count: n.length }]);
    for (let T = 0, O = b.length; T < O; ++T) {
      const J = b[T],
        lt = J.start,
        D = J.count;
      for (let F = lt, G = lt + D; F < G; F += 3) _(n[F + 0], n[F + 1], n[F + 2]);
    }
    const U = new C(),
      R = new C(),
      w = new C(),
      k = new C();
    function S(T) {
      w.fromArray(s, T * 3), k.copy(w);
      const O = c[T];
      U.copy(O), U.sub(w.multiplyScalar(w.dot(O))).normalize(), R.crossVectors(k, O);
      const lt = R.dot(h[T]) < 0 ? -1 : 1;
      (l[T * 4] = U.x), (l[T * 4 + 1] = U.y), (l[T * 4 + 2] = U.z), (l[T * 4 + 3] = lt);
    }
    for (let T = 0, O = b.length; T < O; ++T) {
      const J = b[T],
        lt = J.start,
        D = J.count;
      for (let F = lt, G = lt + D; F < G; F += 3) S(n[F + 0]), S(n[F + 1]), S(n[F + 2]);
    }
  }
  computeVertexNormals() {
    const t = this.index,
      e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0) (n = new Ve(new Float32Array(e.count * 3), 3)), this.setAttribute("normal", n);
      else for (let d = 0, p = n.count; d < p; d++) n.setXYZ(d, 0, 0, 0);
      const r = new C(),
        s = new C(),
        o = new C(),
        a = new C(),
        l = new C(),
        c = new C(),
        h = new C(),
        u = new C();
      if (t)
        for (let d = 0, p = t.count; d < p; d += 3) {
          const g = t.getX(d + 0),
            v = t.getX(d + 1),
            m = t.getX(d + 2);
          r.fromBufferAttribute(e, g),
            s.fromBufferAttribute(e, v),
            o.fromBufferAttribute(e, m),
            h.subVectors(o, s),
            u.subVectors(r, s),
            h.cross(u),
            a.fromBufferAttribute(n, g),
            l.fromBufferAttribute(n, v),
            c.fromBufferAttribute(n, m),
            a.add(h),
            l.add(h),
            c.add(h),
            n.setXYZ(g, a.x, a.y, a.z),
            n.setXYZ(v, l.x, l.y, l.z),
            n.setXYZ(m, c.x, c.y, c.z);
        }
      else
        for (let d = 0, p = e.count; d < p; d += 3)
          r.fromBufferAttribute(e, d + 0),
            s.fromBufferAttribute(e, d + 1),
            o.fromBufferAttribute(e, d + 2),
            h.subVectors(o, s),
            u.subVectors(r, s),
            h.cross(u),
            n.setXYZ(d + 0, h.x, h.y, h.z),
            n.setXYZ(d + 1, h.x, h.y, h.z),
            n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), (n.needsUpdate = !0);
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++) de.fromBufferAttribute(t, e), de.normalize(), t.setXYZ(e, de.x, de.y, de.z);
  }
  toNonIndexed() {
    function t(a, l) {
      const c = a.array,
        h = a.itemSize,
        u = a.normalized,
        d = new c.constructor(l.length * h);
      let p = 0,
        g = 0;
      for (let v = 0, m = l.length; v < m; v++) {
        a.isInterleavedBufferAttribute ? (p = l[v] * a.data.stride + a.offset) : (p = l[v] * h);
        for (let f = 0; f < h; f++) d[g++] = c[p++];
      }
      return new Ve(d, h, u);
    }
    if (this.index === null) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Ce(),
      n = this.index.array,
      r = this.attributes;
    for (const a in r) {
      const l = r[a],
        c = t(l, n);
      e.setAttribute(a, c);
    }
    const s = this.morphAttributes;
    for (const a in s) {
      const l = [],
        c = s[a];
      for (let h = 0, u = c.length; h < u; h++) {
        const d = c[h],
          p = t(d, n);
        l.push(p);
      }
      e.morphAttributes[a] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, l = o.length; a < l; a++) {
      const c = o[a];
      e.addGroup(c.start, c.count, c.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = { metadata: { version: 4.6, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
    if (
      ((t.uuid = this.uuid),
      (t.type = this.type),
      this.name !== "" && (t.name = this.name),
      Object.keys(this.userData).length > 0 && (t.userData = this.userData),
      this.parameters !== void 0)
    ) {
      const l = this.parameters;
      for (const c in l) l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = { type: e.array.constructor.name, array: Array.prototype.slice.call(e.array) });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l],
        h = [];
      for (let u = 0, d = c.length; u < d; u++) {
        const p = c[u];
        h.push(p.toJSON(t.data));
      }
      h.length > 0 && ((r[l] = h), (s = !0));
    }
    s && ((t.data.morphAttributes = r), (t.data.morphTargetsRelative = this.morphTargetsRelative));
    const o = this.groups;
    o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
    const a = this.boundingSphere;
    return a !== null && (t.data.boundingSphere = { center: a.center.toArray(), radius: a.radius }), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null);
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone(e));
    const r = t.attributes;
    for (const c in r) {
      const h = r[c];
      this.setAttribute(c, h.clone(e));
    }
    const s = t.morphAttributes;
    for (const c in s) {
      const h = [],
        u = s[c];
      for (let d = 0, p = u.length; d < p; d++) h.push(u[d].clone(e));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const o = t.groups;
    for (let c = 0, h = o.length; c < h; c++) {
      const u = o[c];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = t.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const l = t.boundingSphere;
    return (
      l !== null && (this.boundingSphere = l.clone()),
      (this.drawRange.start = t.drawRange.start),
      (this.drawRange.count = t.drawRange.count),
      (this.userData = t.userData),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const lo = new te(),
  wn = new Xr(),
  or = new Wi(),
  co = new C(),
  $n = new C(),
  Qn = new C(),
  ti = new C(),
  Ms = new C(),
  lr = new C(),
  cr = new Z(),
  hr = new Z(),
  ur = new Z(),
  ho = new C(),
  uo = new C(),
  fo = new C(),
  fr = new C(),
  dr = new C();
class on extends oe {
  constructor(t = new Ce(), e = new na()) {
    super(), (this.isMesh = !0), (this.type = "Mesh"), (this.geometry = t), (this.material = e), this.updateMorphTargets();
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
      t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)),
      (this.material = Array.isArray(t.material) ? t.material.slice() : t.material),
      (this.geometry = t.geometry),
      this
    );
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      n = Object.keys(e);
    if (n.length > 0) {
      const r = e[n[0]];
      if (r !== void 0) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let s = 0, o = r.length; s < o; s++) {
          const a = r[s].name || String(s);
          this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = s);
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const n = this.geometry,
      r = n.attributes.position,
      s = n.morphAttributes.position,
      o = n.morphTargetsRelative;
    e.fromBufferAttribute(r, t);
    const a = this.morphTargetInfluences;
    if (s && a) {
      lr.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const h = a[l],
          u = s[l];
        h !== 0 && (Ms.fromBufferAttribute(u, t), o ? lr.addScaledVector(Ms, h) : lr.addScaledVector(Ms.sub(e), h));
      }
      e.add(lr);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry,
      r = this.material,
      s = this.matrixWorld;
    r !== void 0 &&
      (n.boundingSphere === null && n.computeBoundingSphere(),
      or.copy(n.boundingSphere),
      or.applyMatrix4(s),
      wn.copy(t.ray).recast(t.near),
      !(or.containsPoint(wn.origin) === !1 && (wn.intersectSphere(or, co) === null || wn.origin.distanceToSquared(co) > (t.far - t.near) ** 2)) &&
        (lo.copy(s).invert(),
        wn.copy(t.ray).applyMatrix4(lo),
        !(n.boundingBox !== null && wn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(t, e, wn)));
  }
  _computeIntersections(t, e, n) {
    let r;
    const s = this.geometry,
      o = this.material,
      a = s.index,
      l = s.attributes.position,
      c = s.attributes.uv,
      h = s.attributes.uv1,
      u = s.attributes.normal,
      d = s.groups,
      p = s.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let g = 0, v = d.length; g < v; g++) {
          const m = d[g],
            f = o[m.materialIndex],
            E = Math.max(m.start, p.start),
            _ = Math.min(a.count, Math.min(m.start + m.count, p.start + p.count));
          for (let b = E, U = _; b < U; b += 3) {
            const R = a.getX(b),
              w = a.getX(b + 1),
              k = a.getX(b + 2);
            (r = pr(this, f, t, n, c, h, u, R, w, k)), r && ((r.faceIndex = Math.floor(b / 3)), (r.face.materialIndex = m.materialIndex), e.push(r));
          }
        }
      else {
        const g = Math.max(0, p.start),
          v = Math.min(a.count, p.start + p.count);
        for (let m = g, f = v; m < f; m += 3) {
          const E = a.getX(m),
            _ = a.getX(m + 1),
            b = a.getX(m + 2);
          (r = pr(this, o, t, n, c, h, u, E, _, b)), r && ((r.faceIndex = Math.floor(m / 3)), e.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let g = 0, v = d.length; g < v; g++) {
          const m = d[g],
            f = o[m.materialIndex],
            E = Math.max(m.start, p.start),
            _ = Math.min(l.count, Math.min(m.start + m.count, p.start + p.count));
          for (let b = E, U = _; b < U; b += 3) {
            const R = b,
              w = b + 1,
              k = b + 2;
            (r = pr(this, f, t, n, c, h, u, R, w, k)), r && ((r.faceIndex = Math.floor(b / 3)), (r.face.materialIndex = m.materialIndex), e.push(r));
          }
        }
      else {
        const g = Math.max(0, p.start),
          v = Math.min(l.count, p.start + p.count);
        for (let m = g, f = v; m < f; m += 3) {
          const E = m,
            _ = m + 1,
            b = m + 2;
          (r = pr(this, o, t, n, c, h, u, E, _, b)), r && ((r.faceIndex = Math.floor(m / 3)), e.push(r));
        }
      }
  }
}
function Dh(i, t, e, n, r, s, o, a) {
  let l;
  if ((t.side === Te ? (l = n.intersectTriangle(o, s, r, !0, a)) : (l = n.intersectTriangle(r, s, o, t.side === Sn, a)), l === null)) return null;
  dr.copy(a), dr.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(dr);
  return c < e.near || c > e.far ? null : { distance: c, point: dr.clone(), object: i };
}
function pr(i, t, e, n, r, s, o, a, l, c) {
  i.getVertexPosition(a, $n), i.getVertexPosition(l, Qn), i.getVertexPosition(c, ti);
  const h = Dh(i, t, e, n, $n, Qn, ti, fr);
  if (h) {
    r &&
      (cr.fromBufferAttribute(r, a),
      hr.fromBufferAttribute(r, l),
      ur.fromBufferAttribute(r, c),
      (h.uv = Ue.getInterpolation(fr, $n, Qn, ti, cr, hr, ur, new Z()))),
      s &&
        (cr.fromBufferAttribute(s, a),
        hr.fromBufferAttribute(s, l),
        ur.fromBufferAttribute(s, c),
        (h.uv1 = Ue.getInterpolation(fr, $n, Qn, ti, cr, hr, ur, new Z())),
        (h.uv2 = h.uv1)),
      o &&
        (ho.fromBufferAttribute(o, a),
        uo.fromBufferAttribute(o, l),
        fo.fromBufferAttribute(o, c),
        (h.normal = Ue.getInterpolation(fr, $n, Qn, ti, ho, uo, fo, new C())),
        h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const u = { a, b: l, c, normal: new C(), materialIndex: 0 };
    Ue.getNormal($n, Qn, ti, u.normal), (h.face = u);
  }
  return h;
}
class Xi extends Ce {
  constructor(t = 1, e = 1, n = 1, r = 1, s = 1, o = 1) {
    super(),
      (this.type = "BoxGeometry"),
      (this.parameters = { width: t, height: e, depth: n, widthSegments: r, heightSegments: s, depthSegments: o });
    const a = this;
    (r = Math.floor(r)), (s = Math.floor(s)), (o = Math.floor(o));
    const l = [],
      c = [],
      h = [],
      u = [];
    let d = 0,
      p = 0;
    g("z", "y", "x", -1, -1, n, e, t, o, s, 0),
      g("z", "y", "x", 1, -1, n, e, -t, o, s, 1),
      g("x", "z", "y", 1, 1, t, n, e, r, o, 2),
      g("x", "z", "y", 1, -1, t, n, -e, r, o, 3),
      g("x", "y", "z", 1, -1, t, e, n, r, s, 4),
      g("x", "y", "z", -1, -1, t, e, -n, r, s, 5),
      this.setIndex(l),
      this.setAttribute("position", new Me(c, 3)),
      this.setAttribute("normal", new Me(h, 3)),
      this.setAttribute("uv", new Me(u, 2));
    function g(v, m, f, E, _, b, U, R, w, k, S) {
      const T = b / w,
        O = U / k,
        J = b / 2,
        lt = U / 2,
        D = R / 2,
        F = w + 1,
        G = k + 1;
      let j = 0,
        Y = 0;
      const W = new C();
      for (let $ = 0; $ < G; $++) {
        const Q = $ * O - lt;
        for (let dt = 0; dt < F; dt++) {
          const V = dt * T - J;
          (W[v] = V * E),
            (W[m] = Q * _),
            (W[f] = D),
            c.push(W.x, W.y, W.z),
            (W[v] = 0),
            (W[m] = 0),
            (W[f] = R > 0 ? 1 : -1),
            h.push(W.x, W.y, W.z),
            u.push(dt / w),
            u.push(1 - $ / k),
            (j += 1);
        }
      }
      for (let $ = 0; $ < k; $++)
        for (let Q = 0; Q < w; Q++) {
          const dt = d + Q + F * $,
            V = d + Q + F * ($ + 1),
            tt = d + (Q + 1) + F * ($ + 1),
            pt = d + (Q + 1) + F * $;
          l.push(dt, V, pt), l.push(V, tt, pt), (Y += 6);
        }
      a.addGroup(p, Y, S), (p += Y), (d += j);
    }
  }
  copy(t) {
    return super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this;
  }
  static fromJSON(t) {
    return new Xi(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function vi(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const r = i[e][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion)
        ? r.isRenderTargetTexture
          ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), (t[e][n] = null))
          : (t[e][n] = r.clone())
        : Array.isArray(r)
        ? (t[e][n] = r.slice())
        : (t[e][n] = r);
    }
  }
  return t;
}
function ye(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = vi(i[e]);
    for (const r in n) t[r] = n[r];
  }
  return t;
}
function Uh(i) {
  const t = [];
  for (let e = 0; e < i.length; e++) t.push(i[e].clone());
  return t;
}
function Tl(i) {
  return i.getRenderTarget() === null ? i.outputColorSpace : Jt.workingColorSpace;
}
const Br = { clone: vi, merge: ye };
var Ih = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  Nh = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Re extends je {
  constructor(t) {
    super(),
      (this.isShaderMaterial = !0),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = Ih),
      (this.fragmentShader = Nh),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = { derivatives: !1, fragDepth: !1, drawBuffers: !1, shaderTextureLOD: !1, clipCullDistance: !1 }),
      (this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      (this.fragmentShader = t.fragmentShader),
      (this.vertexShader = t.vertexShader),
      (this.uniforms = vi(t.uniforms)),
      (this.uniformsGroups = Uh(t.uniformsGroups)),
      (this.defines = Object.assign({}, t.defines)),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.fog = t.fog),
      (this.lights = t.lights),
      (this.clipping = t.clipping),
      (this.extensions = Object.assign({}, t.extensions)),
      (this.glslVersion = t.glslVersion),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    (e.glslVersion = this.glslVersion), (e.uniforms = {});
    for (const r in this.uniforms) {
      const o = this.uniforms[r].value;
      o && o.isTexture
        ? (e.uniforms[r] = { type: "t", value: o.toJSON(t).uuid })
        : o && o.isColor
        ? (e.uniforms[r] = { type: "c", value: o.getHex() })
        : o && o.isVector2
        ? (e.uniforms[r] = { type: "v2", value: o.toArray() })
        : o && o.isVector3
        ? (e.uniforms[r] = { type: "v3", value: o.toArray() })
        : o && o.isVector4
        ? (e.uniforms[r] = { type: "v4", value: o.toArray() })
        : o && o.isMatrix3
        ? (e.uniforms[r] = { type: "m3", value: o.toArray() })
        : o && o.isMatrix4
        ? (e.uniforms[r] = { type: "m4", value: o.toArray() })
        : (e.uniforms[r] = { value: o });
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines),
      (e.vertexShader = this.vertexShader),
      (e.fragmentShader = this.fragmentShader),
      (e.lights = this.lights),
      (e.clipping = this.clipping);
    const n = {};
    for (const r in this.extensions) this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (e.extensions = n), e;
  }
}
class bl extends oe {
  constructor() {
    super(),
      (this.isCamera = !0),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new te()),
      (this.projectionMatrix = new te()),
      (this.projectionMatrixInverse = new te()),
      (this.coordinateSystem = an);
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      this.matrixWorldInverse.copy(t.matrixWorldInverse),
      this.projectionMatrix.copy(t.projectionMatrix),
      this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
      (this.coordinateSystem = t.coordinateSystem),
      this
    );
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(t, e) {
    super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Ie extends bl {
  constructor(t = 50, e = 1, n = 0.1, r = 2e3) {
    super(),
      (this.isPerspectiveCamera = !0),
      (this.type = "PerspectiveCamera"),
      (this.fov = t),
      (this.zoom = 1),
      (this.near = n),
      (this.far = r),
      (this.focus = 10),
      (this.aspect = e),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix();
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.fov = t.fov),
      (this.zoom = t.zoom),
      (this.near = t.near),
      (this.far = t.far),
      (this.focus = t.focus),
      (this.aspect = t.aspect),
      (this.view = t.view === null ? null : Object.assign({}, t.view)),
      (this.filmGauge = t.filmGauge),
      (this.filmOffset = t.filmOffset),
      this
    );
  }
  setFocalLength(t) {
    const e = (0.5 * this.getFilmHeight()) / t;
    (this.fov = Fi * 2 * Math.atan(e)), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const t = Math.tan(Pi * 0.5 * this.fov);
    return (0.5 * this.getFilmHeight()) / t;
  }
  getEffectiveFOV() {
    return Fi * 2 * Math.atan(Math.tan(Pi * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  setViewOffset(t, e, n, r, s, o) {
    (this.aspect = t / e),
      this.view === null && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
      (this.view.enabled = !0),
      (this.view.fullWidth = t),
      (this.view.fullHeight = e),
      (this.view.offsetX = n),
      (this.view.offsetY = r),
      (this.view.width = s),
      (this.view.height = o),
      this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = (t * Math.tan(Pi * 0.5 * this.fov)) / this.zoom,
      n = 2 * e,
      r = this.aspect * n,
      s = -0.5 * r;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = o.fullWidth,
        c = o.fullHeight;
      (s += (o.offsetX * r) / l), (e -= (o.offsetY * n) / c), (r *= o.width / l), (n *= o.height / c);
    }
    const a = this.filmOffset;
    a !== 0 && (s += (t * a) / this.getFilmWidth()),
      this.projectionMatrix.makePerspective(s, s + r, e, e - n, t, this.far, this.coordinateSystem),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.fov = this.fov),
      (e.object.zoom = this.zoom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      (e.object.focus = this.focus),
      (e.object.aspect = this.aspect),
      this.view !== null && (e.object.view = Object.assign({}, this.view)),
      (e.object.filmGauge = this.filmGauge),
      (e.object.filmOffset = this.filmOffset),
      e
    );
  }
}
const ei = -90,
  ni = 1;
class Oh extends oe {
  constructor(t, e, n) {
    super(), (this.type = "CubeCamera"), (this.renderTarget = n), (this.coordinateSystem = null), (this.activeMipmapLevel = 0);
    const r = new Ie(ei, ni, t, e);
    (r.layers = this.layers), this.add(r);
    const s = new Ie(ei, ni, t, e);
    (s.layers = this.layers), this.add(s);
    const o = new Ie(ei, ni, t, e);
    (o.layers = this.layers), this.add(o);
    const a = new Ie(ei, ni, t, e);
    (a.layers = this.layers), this.add(a);
    const l = new Ie(ei, ni, t, e);
    (l.layers = this.layers), this.add(l);
    const c = new Ie(ei, ni, t, e);
    (c.layers = this.layers), this.add(c);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem,
      e = this.children.concat(),
      [n, r, s, o, a, l] = e;
    for (const c of e) this.remove(c);
    if (t === an)
      n.up.set(0, 1, 0),
        n.lookAt(1, 0, 0),
        r.up.set(0, 1, 0),
        r.lookAt(-1, 0, 0),
        s.up.set(0, 0, -1),
        s.lookAt(0, 1, 0),
        o.up.set(0, 0, 1),
        o.lookAt(0, -1, 0),
        a.up.set(0, 1, 0),
        a.lookAt(0, 0, 1),
        l.up.set(0, 1, 0),
        l.lookAt(0, 0, -1);
    else if (t === Or)
      n.up.set(0, -1, 0),
        n.lookAt(-1, 0, 0),
        r.up.set(0, -1, 0),
        r.lookAt(1, 0, 0),
        s.up.set(0, 0, 1),
        s.lookAt(0, 1, 0),
        o.up.set(0, 0, -1),
        o.lookAt(0, -1, 0),
        a.up.set(0, -1, 0),
        a.lookAt(0, 0, 1),
        l.up.set(0, -1, 0),
        l.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e) this.add(c), c.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== t.coordinateSystem && ((this.coordinateSystem = t.coordinateSystem), this.updateCoordinateSystem());
    const [s, o, a, l, c, h] = this.children,
      u = t.getRenderTarget(),
      d = t.getActiveCubeFace(),
      p = t.getActiveMipmapLevel(),
      g = t.xr.enabled;
    t.xr.enabled = !1;
    const v = n.texture.generateMipmaps;
    (n.texture.generateMipmaps = !1),
      t.setRenderTarget(n, 0, r),
      t.render(e, s),
      t.setRenderTarget(n, 1, r),
      t.render(e, o),
      t.setRenderTarget(n, 2, r),
      t.render(e, a),
      t.setRenderTarget(n, 3, r),
      t.render(e, l),
      t.setRenderTarget(n, 4, r),
      t.render(e, c),
      (n.texture.generateMipmaps = v),
      t.setRenderTarget(n, 5, r),
      t.render(e, h),
      t.setRenderTarget(u, d, p),
      (t.xr.enabled = g),
      (n.texture.needsPMREMUpdate = !0);
  }
}
class Al extends Ee {
  constructor(t, e, n, r, s, o, a, l, c, h) {
    (t = t !== void 0 ? t : []), (e = e !== void 0 ? e : mi), super(t, e, n, r, s, o, a, l, c, h), (this.isCubeTexture = !0), (this.flipY = !1);
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class Fh extends Ge {
  constructor(t = 1, e = {}) {
    super(t, t, e), (this.isWebGLCubeRenderTarget = !0);
    const n = { width: t, height: t, depth: 1 },
      r = [n, n, n, n, n, n];
    e.encoding !== void 0 &&
      (Di("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."), (e.colorSpace = e.encoding === Fn ? ge : Ne)),
      (this.texture = new Al(r, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace)),
      (this.texture.isRenderTargetTexture = !0),
      (this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : !1),
      (this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : De);
  }
  fromEquirectangularTexture(t, e) {
    (this.texture.type = e.type),
      (this.texture.colorSpace = e.colorSpace),
      (this.texture.generateMipmaps = e.generateMipmaps),
      (this.texture.minFilter = e.minFilter),
      (this.texture.magFilter = e.magFilter);
    const n = {
        uniforms: { tEquirect: { value: null } },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
      },
      r = new Xi(5, 5, 5),
      s = new Re({
        name: "CubemapFromEquirect",
        uniforms: vi(n.uniforms),
        vertexShader: n.vertexShader,
        fragmentShader: n.fragmentShader,
        side: Te,
        blending: ln,
      });
    s.uniforms.tEquirect.value = e;
    const o = new on(r, s),
      a = e.minFilter;
    return (
      e.minFilter === Oi && (e.minFilter = De), new Oh(1, 10, this).update(t, o), (e.minFilter = a), o.geometry.dispose(), o.material.dispose(), this
    );
  }
  clear(t, e, n, r) {
    const s = t.getRenderTarget();
    for (let o = 0; o < 6; o++) t.setRenderTarget(this, o), t.clear(e, n, r);
    t.setRenderTarget(s);
  }
}
const Ss = new C(),
  Bh = new C(),
  zh = new Xt();
class gn {
  constructor(t = new C(1, 0, 0), e = 0) {
    (this.isPlane = !0), (this.normal = t), (this.constant = e);
  }
  set(t, e) {
    return this.normal.copy(t), (this.constant = e), this;
  }
  setComponents(t, e, n, r) {
    return this.normal.set(t, e, n), (this.constant = r), this;
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return this.normal.copy(t), (this.constant = -e.dot(this.normal)), this;
  }
  setFromCoplanarPoints(t, e, n) {
    const r = Ss.subVectors(n, e).cross(Bh.subVectors(t, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, t), this;
  }
  copy(t) {
    return this.normal.copy(t.normal), (this.constant = t.constant), this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), (this.constant *= t), this;
  }
  negate() {
    return (this.constant *= -1), this.normal.negate(), this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const n = t.delta(Ss),
      r = this.normal.dot(n);
    if (r === 0) return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const s = -(t.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : e.copy(t.start).addScaledVector(n, s);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start),
      n = this.distanceToPoint(t.end);
    return (e < 0 && n > 0) || (n < 0 && e > 0);
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || zh.getNormalMatrix(t),
      r = this.coplanarPoint(Ss).applyMatrix4(t),
      s = this.normal.applyMatrix3(n).normalize();
    return (this.constant = -r.dot(s)), this;
  }
  translate(t) {
    return (this.constant -= t.dot(this.normal)), this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Rn = new Wi(),
  mr = new C();
class ia {
  constructor(t = new gn(), e = new gn(), n = new gn(), r = new gn(), s = new gn(), o = new gn()) {
    this.planes = [t, e, n, r, s, o];
  }
  set(t, e, n, r, s, o) {
    const a = this.planes;
    return a[0].copy(t), a[1].copy(e), a[2].copy(n), a[3].copy(r), a[4].copy(s), a[5].copy(o), this;
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
    return this;
  }
  setFromProjectionMatrix(t, e = an) {
    const n = this.planes,
      r = t.elements,
      s = r[0],
      o = r[1],
      a = r[2],
      l = r[3],
      c = r[4],
      h = r[5],
      u = r[6],
      d = r[7],
      p = r[8],
      g = r[9],
      v = r[10],
      m = r[11],
      f = r[12],
      E = r[13],
      _ = r[14],
      b = r[15];
    if (
      (n[0].setComponents(l - s, d - c, m - p, b - f).normalize(),
      n[1].setComponents(l + s, d + c, m + p, b + f).normalize(),
      n[2].setComponents(l + o, d + h, m + g, b + E).normalize(),
      n[3].setComponents(l - o, d - h, m - g, b - E).normalize(),
      n[4].setComponents(l - a, d - u, m - v, b - _).normalize(),
      e === an)
    )
      n[5].setComponents(l + a, d + u, m + v, b + _).normalize();
    else if (e === Or) n[5].setComponents(a, u, v, _).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0) t.boundingSphere === null && t.computeBoundingSphere(), Rn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), Rn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(Rn);
  }
  intersectsSprite(t) {
    return Rn.center.set(0, 0, 0), (Rn.radius = 0.7071067811865476), Rn.applyMatrix4(t.matrixWorld), this.intersectsSphere(Rn);
  }
  intersectsSphere(t) {
    const e = this.planes,
      n = t.center,
      r = -t.radius;
    for (let s = 0; s < 6; s++) if (e[s].distanceToPoint(n) < r) return !1;
    return !0;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = e[n];
      if (
        ((mr.x = r.normal.x > 0 ? t.max.x : t.min.x),
        (mr.y = r.normal.y > 0 ? t.max.y : t.min.y),
        (mr.z = r.normal.z > 0 ? t.max.z : t.min.z),
        r.distanceToPoint(mr) < 0)
      )
        return !1;
    }
    return !0;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function wl() {
  let i = null,
    t = !1,
    e = null,
    n = null;
  function r(s, o) {
    e(s, o), (n = i.requestAnimationFrame(r));
  }
  return {
    start: function () {
      t !== !0 && e !== null && ((n = i.requestAnimationFrame(r)), (t = !0));
    },
    stop: function () {
      i.cancelAnimationFrame(n), (t = !1);
    },
    setAnimationLoop: function (s) {
      e = s;
    },
    setContext: function (s) {
      i = s;
    },
  };
}
function Hh(i, t) {
  const e = t.isWebGL2,
    n = new WeakMap();
  function r(c, h) {
    const u = c.array,
      d = c.usage,
      p = u.byteLength,
      g = i.createBuffer();
    i.bindBuffer(h, g), i.bufferData(h, u, d), c.onUploadCallback();
    let v;
    if (u instanceof Float32Array) v = i.FLOAT;
    else if (u instanceof Uint16Array)
      if (c.isFloat16BufferAttribute)
        if (e) v = i.HALF_FLOAT;
        else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else v = i.UNSIGNED_SHORT;
    else if (u instanceof Int16Array) v = i.SHORT;
    else if (u instanceof Uint32Array) v = i.UNSIGNED_INT;
    else if (u instanceof Int32Array) v = i.INT;
    else if (u instanceof Int8Array) v = i.BYTE;
    else if (u instanceof Uint8Array) v = i.UNSIGNED_BYTE;
    else if (u instanceof Uint8ClampedArray) v = i.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + u);
    return { buffer: g, type: v, bytesPerElement: u.BYTES_PER_ELEMENT, version: c.version, size: p };
  }
  function s(c, h, u) {
    const d = h.array,
      p = h._updateRange,
      g = h.updateRanges;
    if ((i.bindBuffer(u, c), p.count === -1 && g.length === 0 && i.bufferSubData(u, 0, d), g.length !== 0)) {
      for (let v = 0, m = g.length; v < m; v++) {
        const f = g[v];
        e
          ? i.bufferSubData(u, f.start * d.BYTES_PER_ELEMENT, d, f.start, f.count)
          : i.bufferSubData(u, f.start * d.BYTES_PER_ELEMENT, d.subarray(f.start, f.start + f.count));
      }
      h.clearUpdateRanges();
    }
    p.count !== -1 &&
      (e
        ? i.bufferSubData(u, p.offset * d.BYTES_PER_ELEMENT, d, p.offset, p.count)
        : i.bufferSubData(u, p.offset * d.BYTES_PER_ELEMENT, d.subarray(p.offset, p.offset + p.count)),
      (p.count = -1)),
      h.onUploadCallback();
  }
  function o(c) {
    return c.isInterleavedBufferAttribute && (c = c.data), n.get(c);
  }
  function a(c) {
    c.isInterleavedBufferAttribute && (c = c.data);
    const h = n.get(c);
    h && (i.deleteBuffer(h.buffer), n.delete(c));
  }
  function l(c, h) {
    if (c.isGLBufferAttribute) {
      const d = n.get(c);
      (!d || d.version < c.version) && n.set(c, { buffer: c.buffer, type: c.type, bytesPerElement: c.elementSize, version: c.version });
      return;
    }
    c.isInterleavedBufferAttribute && (c = c.data);
    const u = n.get(c);
    if (u === void 0) n.set(c, r(c, h));
    else if (u.version < c.version) {
      if (u.size !== c.array.byteLength)
        throw new Error(
          "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported."
        );
      s(u.buffer, c, h), (u.version = c.version);
    }
  }
  return { get: o, remove: a, update: l };
}
class ra extends Ce {
  constructor(t = 1, e = 1, n = 1, r = 1) {
    super(), (this.type = "PlaneGeometry"), (this.parameters = { width: t, height: e, widthSegments: n, heightSegments: r });
    const s = t / 2,
      o = e / 2,
      a = Math.floor(n),
      l = Math.floor(r),
      c = a + 1,
      h = l + 1,
      u = t / a,
      d = e / l,
      p = [],
      g = [],
      v = [],
      m = [];
    for (let f = 0; f < h; f++) {
      const E = f * d - o;
      for (let _ = 0; _ < c; _++) {
        const b = _ * u - s;
        g.push(b, -E, 0), v.push(0, 0, 1), m.push(_ / a), m.push(1 - f / l);
      }
    }
    for (let f = 0; f < l; f++)
      for (let E = 0; E < a; E++) {
        const _ = E + c * f,
          b = E + c * (f + 1),
          U = E + 1 + c * (f + 1),
          R = E + 1 + c * f;
        p.push(_, b, R), p.push(b, U, R);
      }
    this.setIndex(p), this.setAttribute("position", new Me(g, 3)), this.setAttribute("normal", new Me(v, 3)), this.setAttribute("uv", new Me(m, 2));
  }
  copy(t) {
    return super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this;
  }
  static fromJSON(t) {
    return new ra(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var Gh = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  Vh = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  kh = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  Wh = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  Xh = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,
  qh = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  Yh = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  jh = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  Zh = `#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  Kh = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,
  Jh = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  $h = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  Qh = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  tu = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  eu = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  nu = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,
  iu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  ru = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  su = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  au = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,
  ou = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,
  lu = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,
  cu = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,
  hu = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  uu = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  fu = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  du = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  pu = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  mu = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  gu = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  _u = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  vu = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,
  xu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,
  Mu = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,
  Su = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  yu = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  Eu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  Tu = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  bu = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  Au = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  wu = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  Ru = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  Cu = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,
  Pu = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  Lu = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  Du = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  Uu = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
  Iu = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  Nu = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  Ou = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  Fu = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  Bu = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  zu = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  Hu = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  Gu = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  Vu = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  ku = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  Wu = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  Xu = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  qu = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,
  Yu = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,
  ju = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  Zu = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  Ku = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  Ju = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  $u = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  Qu = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  tf = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  ef = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,
  nf = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,
  rf = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,
  sf = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  af = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  of = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  lf = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  cf = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  hf = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  uf = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  ff = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  df = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  pf = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  mf = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  gf = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,
  _f = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  vf = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  xf = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  Mf = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  Sf = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  yf = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  Ef = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,
  Tf = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  bf = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  Af = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  wf = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  Rf = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  Cf = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  Pf = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  Lf = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  Df = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  Uf = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  If = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  Nf = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  Of = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  Ff = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  Bf = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  zf = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  Hf = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Gf = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  Vf = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  kf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  Wf = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Xf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  qf = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Yf = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  jf = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,
  Zf = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  Kf = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,
  Jf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  $f = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Qf = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  td = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  ed = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  nd = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  id = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  rd = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  sd = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  ad = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  od = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  ld = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  cd = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  hd = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  ud = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  fd = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  dd = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  pd = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  md = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  gd = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  _d = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  vd = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  xd = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  Md = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  Gt = {
    alphahash_fragment: Gh,
    alphahash_pars_fragment: Vh,
    alphamap_fragment: kh,
    alphamap_pars_fragment: Wh,
    alphatest_fragment: Xh,
    alphatest_pars_fragment: qh,
    aomap_fragment: Yh,
    aomap_pars_fragment: jh,
    batching_pars_vertex: Zh,
    batching_vertex: Kh,
    begin_vertex: Jh,
    beginnormal_vertex: $h,
    bsdfs: Qh,
    iridescence_fragment: tu,
    bumpmap_pars_fragment: eu,
    clipping_planes_fragment: nu,
    clipping_planes_pars_fragment: iu,
    clipping_planes_pars_vertex: ru,
    clipping_planes_vertex: su,
    color_fragment: au,
    color_pars_fragment: ou,
    color_pars_vertex: lu,
    color_vertex: cu,
    common: hu,
    cube_uv_reflection_fragment: uu,
    defaultnormal_vertex: fu,
    displacementmap_pars_vertex: du,
    displacementmap_vertex: pu,
    emissivemap_fragment: mu,
    emissivemap_pars_fragment: gu,
    colorspace_fragment: _u,
    colorspace_pars_fragment: vu,
    envmap_fragment: xu,
    envmap_common_pars_fragment: Mu,
    envmap_pars_fragment: Su,
    envmap_pars_vertex: yu,
    envmap_physical_pars_fragment: Iu,
    envmap_vertex: Eu,
    fog_vertex: Tu,
    fog_pars_vertex: bu,
    fog_fragment: Au,
    fog_pars_fragment: wu,
    gradientmap_pars_fragment: Ru,
    lightmap_fragment: Cu,
    lightmap_pars_fragment: Pu,
    lights_lambert_fragment: Lu,
    lights_lambert_pars_fragment: Du,
    lights_pars_begin: Uu,
    lights_toon_fragment: Nu,
    lights_toon_pars_fragment: Ou,
    lights_phong_fragment: Fu,
    lights_phong_pars_fragment: Bu,
    lights_physical_fragment: zu,
    lights_physical_pars_fragment: Hu,
    lights_fragment_begin: Gu,
    lights_fragment_maps: Vu,
    lights_fragment_end: ku,
    logdepthbuf_fragment: Wu,
    logdepthbuf_pars_fragment: Xu,
    logdepthbuf_pars_vertex: qu,
    logdepthbuf_vertex: Yu,
    map_fragment: ju,
    map_pars_fragment: Zu,
    map_particle_fragment: Ku,
    map_particle_pars_fragment: Ju,
    metalnessmap_fragment: $u,
    metalnessmap_pars_fragment: Qu,
    morphcolor_vertex: tf,
    morphnormal_vertex: ef,
    morphtarget_pars_vertex: nf,
    morphtarget_vertex: rf,
    normal_fragment_begin: sf,
    normal_fragment_maps: af,
    normal_pars_fragment: of,
    normal_pars_vertex: lf,
    normal_vertex: cf,
    normalmap_pars_fragment: hf,
    clearcoat_normal_fragment_begin: uf,
    clearcoat_normal_fragment_maps: ff,
    clearcoat_pars_fragment: df,
    iridescence_pars_fragment: pf,
    opaque_fragment: mf,
    packing: gf,
    premultiplied_alpha_fragment: _f,
    project_vertex: vf,
    dithering_fragment: xf,
    dithering_pars_fragment: Mf,
    roughnessmap_fragment: Sf,
    roughnessmap_pars_fragment: yf,
    shadowmap_pars_fragment: Ef,
    shadowmap_pars_vertex: Tf,
    shadowmap_vertex: bf,
    shadowmask_pars_fragment: Af,
    skinbase_vertex: wf,
    skinning_pars_vertex: Rf,
    skinning_vertex: Cf,
    skinnormal_vertex: Pf,
    specularmap_fragment: Lf,
    specularmap_pars_fragment: Df,
    tonemapping_fragment: Uf,
    tonemapping_pars_fragment: If,
    transmission_fragment: Nf,
    transmission_pars_fragment: Of,
    uv_pars_fragment: Ff,
    uv_pars_vertex: Bf,
    uv_vertex: zf,
    worldpos_vertex: Hf,
    background_vert: Gf,
    background_frag: Vf,
    backgroundCube_vert: kf,
    backgroundCube_frag: Wf,
    cube_vert: Xf,
    cube_frag: qf,
    depth_vert: Yf,
    depth_frag: jf,
    distanceRGBA_vert: Zf,
    distanceRGBA_frag: Kf,
    equirect_vert: Jf,
    equirect_frag: $f,
    linedashed_vert: Qf,
    linedashed_frag: td,
    meshbasic_vert: ed,
    meshbasic_frag: nd,
    meshlambert_vert: id,
    meshlambert_frag: rd,
    meshmatcap_vert: sd,
    meshmatcap_frag: ad,
    meshnormal_vert: od,
    meshnormal_frag: ld,
    meshphong_vert: cd,
    meshphong_frag: hd,
    meshphysical_vert: ud,
    meshphysical_frag: fd,
    meshtoon_vert: dd,
    meshtoon_frag: pd,
    points_vert: md,
    points_frag: gd,
    shadow_vert: _d,
    shadow_frag: vd,
    sprite_vert: xd,
    sprite_frag: Md,
  },
  ht = {
    common: {
      diffuse: { value: new Ft(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new Xt() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Xt() },
      alphaTest: { value: 0 },
    },
    specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Xt() } },
    envmap: { envMap: { value: null }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 } },
    aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new Xt() } },
    lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new Xt() } },
    bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new Xt() }, bumpScale: { value: 1 } },
    normalmap: { normalMap: { value: null }, normalMapTransform: { value: new Xt() }, normalScale: { value: new Z(1, 1) } },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new Xt() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Xt() } },
    metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new Xt() } },
    roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new Xt() } },
    gradientmap: { gradientMap: { value: null } },
    fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Ft(16777215) } },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: { value: [], properties: { direction: {}, color: {} } },
      directionalLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } },
      directionalShadowMap: { value: [] },
      directionalShadowMatrix: { value: [] },
      spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } },
      spotLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } },
      spotLightMap: { value: [] },
      spotShadowMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } },
      pointLightShadows: {
        value: [],
        properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} },
      },
      pointShadowMap: { value: [] },
      pointShadowMatrix: { value: [] },
      hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } },
      rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } },
      ltc_1: { value: null },
      ltc_2: { value: null },
    },
    points: {
      diffuse: { value: new Ft(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Xt() },
      alphaTest: { value: 0 },
      uvTransform: { value: new Xt() },
    },
    sprite: {
      diffuse: { value: new Ft(16777215) },
      opacity: { value: 1 },
      center: { value: new Z(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new Xt() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new Xt() },
      alphaTest: { value: 0 },
    },
  },
  We = {
    basic: {
      uniforms: ye([ht.common, ht.specularmap, ht.envmap, ht.aomap, ht.lightmap, ht.fog]),
      vertexShader: Gt.meshbasic_vert,
      fragmentShader: Gt.meshbasic_frag,
    },
    lambert: {
      uniforms: ye([
        ht.common,
        ht.specularmap,
        ht.envmap,
        ht.aomap,
        ht.lightmap,
        ht.emissivemap,
        ht.bumpmap,
        ht.normalmap,
        ht.displacementmap,
        ht.fog,
        ht.lights,
        { emissive: { value: new Ft(0) } },
      ]),
      vertexShader: Gt.meshlambert_vert,
      fragmentShader: Gt.meshlambert_frag,
    },
    phong: {
      uniforms: ye([
        ht.common,
        ht.specularmap,
        ht.envmap,
        ht.aomap,
        ht.lightmap,
        ht.emissivemap,
        ht.bumpmap,
        ht.normalmap,
        ht.displacementmap,
        ht.fog,
        ht.lights,
        { emissive: { value: new Ft(0) }, specular: { value: new Ft(1118481) }, shininess: { value: 30 } },
      ]),
      vertexShader: Gt.meshphong_vert,
      fragmentShader: Gt.meshphong_frag,
    },
    standard: {
      uniforms: ye([
        ht.common,
        ht.envmap,
        ht.aomap,
        ht.lightmap,
        ht.emissivemap,
        ht.bumpmap,
        ht.normalmap,
        ht.displacementmap,
        ht.roughnessmap,
        ht.metalnessmap,
        ht.fog,
        ht.lights,
        { emissive: { value: new Ft(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } },
      ]),
      vertexShader: Gt.meshphysical_vert,
      fragmentShader: Gt.meshphysical_frag,
    },
    toon: {
      uniforms: ye([
        ht.common,
        ht.aomap,
        ht.lightmap,
        ht.emissivemap,
        ht.bumpmap,
        ht.normalmap,
        ht.displacementmap,
        ht.gradientmap,
        ht.fog,
        ht.lights,
        { emissive: { value: new Ft(0) } },
      ]),
      vertexShader: Gt.meshtoon_vert,
      fragmentShader: Gt.meshtoon_frag,
    },
    matcap: {
      uniforms: ye([ht.common, ht.bumpmap, ht.normalmap, ht.displacementmap, ht.fog, { matcap: { value: null } }]),
      vertexShader: Gt.meshmatcap_vert,
      fragmentShader: Gt.meshmatcap_frag,
    },
    points: { uniforms: ye([ht.points, ht.fog]), vertexShader: Gt.points_vert, fragmentShader: Gt.points_frag },
    dashed: {
      uniforms: ye([ht.common, ht.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]),
      vertexShader: Gt.linedashed_vert,
      fragmentShader: Gt.linedashed_frag,
    },
    depth: { uniforms: ye([ht.common, ht.displacementmap]), vertexShader: Gt.depth_vert, fragmentShader: Gt.depth_frag },
    normal: {
      uniforms: ye([ht.common, ht.bumpmap, ht.normalmap, ht.displacementmap, { opacity: { value: 1 } }]),
      vertexShader: Gt.meshnormal_vert,
      fragmentShader: Gt.meshnormal_frag,
    },
    sprite: { uniforms: ye([ht.sprite, ht.fog]), vertexShader: Gt.sprite_vert, fragmentShader: Gt.sprite_frag },
    background: {
      uniforms: { uvTransform: { value: new Xt() }, t2D: { value: null }, backgroundIntensity: { value: 1 } },
      vertexShader: Gt.background_vert,
      fragmentShader: Gt.background_frag,
    },
    backgroundCube: {
      uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 } },
      vertexShader: Gt.backgroundCube_vert,
      fragmentShader: Gt.backgroundCube_frag,
    },
    cube: {
      uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } },
      vertexShader: Gt.cube_vert,
      fragmentShader: Gt.cube_frag,
    },
    equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: Gt.equirect_vert, fragmentShader: Gt.equirect_frag },
    distanceRGBA: {
      uniforms: ye([
        ht.common,
        ht.displacementmap,
        { referencePosition: { value: new C() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } },
      ]),
      vertexShader: Gt.distanceRGBA_vert,
      fragmentShader: Gt.distanceRGBA_frag,
    },
    shadow: {
      uniforms: ye([ht.lights, ht.fog, { color: { value: new Ft(0) }, opacity: { value: 1 } }]),
      vertexShader: Gt.shadow_vert,
      fragmentShader: Gt.shadow_frag,
    },
  };
We.physical = {
  uniforms: ye([
    We.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: new Xt() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: new Xt() },
      clearcoatNormalScale: { value: new Z(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: new Xt() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: new Xt() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: new Xt() },
      sheen: { value: 0 },
      sheenColor: { value: new Ft(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: new Xt() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: new Xt() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: new Xt() },
      transmissionSamplerSize: { value: new Z() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: new Xt() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: new Ft(0) },
      specularColor: { value: new Ft(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: new Xt() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: new Xt() },
      anisotropyVector: { value: new Z() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: new Xt() },
    },
  ]),
  vertexShader: Gt.meshphysical_vert,
  fragmentShader: Gt.meshphysical_frag,
};
const gr = { r: 0, b: 0, g: 0 };
function Sd(i, t, e, n, r, s, o) {
  const a = new Ft(0);
  let l = s === !0 ? 0 : 1,
    c,
    h,
    u = null,
    d = 0,
    p = null;
  function g(m, f) {
    let E = !1,
      _ = f.isScene === !0 ? f.background : null;
    _ && _.isTexture && (_ = (f.backgroundBlurriness > 0 ? e : t).get(_)), _ === null ? v(a, l) : _ && _.isColor && (v(_, 1), (E = !0));
    const b = i.xr.getEnvironmentBlendMode();
    b === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : b === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o),
      (i.autoClear || E) && i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil),
      _ && (_.isCubeTexture || _.mapping === Vr)
        ? (h === void 0 &&
            ((h = new on(
              new Xi(1, 1, 1),
              new Re({
                name: "BackgroundCubeMaterial",
                uniforms: vi(We.backgroundCube.uniforms),
                vertexShader: We.backgroundCube.vertexShader,
                fragmentShader: We.backgroundCube.fragmentShader,
                side: Te,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              })
            )),
            h.geometry.deleteAttribute("normal"),
            h.geometry.deleteAttribute("uv"),
            (h.onBeforeRender = function (U, R, w) {
              this.matrixWorld.copyPosition(w.matrixWorld);
            }),
            Object.defineProperty(h.material, "envMap", {
              get: function () {
                return this.uniforms.envMap.value;
              },
            }),
            r.update(h)),
          (h.material.uniforms.envMap.value = _),
          (h.material.uniforms.flipEnvMap.value = _.isCubeTexture && _.isRenderTargetTexture === !1 ? -1 : 1),
          (h.material.uniforms.backgroundBlurriness.value = f.backgroundBlurriness),
          (h.material.uniforms.backgroundIntensity.value = f.backgroundIntensity),
          (h.material.toneMapped = Jt.getTransfer(_.colorSpace) !== $t),
          (u !== _ || d !== _.version || p !== i.toneMapping) && ((h.material.needsUpdate = !0), (u = _), (d = _.version), (p = i.toneMapping)),
          h.layers.enableAll(),
          m.unshift(h, h.geometry, h.material, 0, 0, null))
        : _ &&
          _.isTexture &&
          (c === void 0 &&
            ((c = new on(
              new ra(2, 2),
              new Re({
                name: "BackgroundMaterial",
                uniforms: vi(We.background.uniforms),
                vertexShader: We.background.vertexShader,
                fragmentShader: We.background.fragmentShader,
                side: Sn,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              })
            )),
            c.geometry.deleteAttribute("normal"),
            Object.defineProperty(c.material, "map", {
              get: function () {
                return this.uniforms.t2D.value;
              },
            }),
            r.update(c)),
          (c.material.uniforms.t2D.value = _),
          (c.material.uniforms.backgroundIntensity.value = f.backgroundIntensity),
          (c.material.toneMapped = Jt.getTransfer(_.colorSpace) !== $t),
          _.matrixAutoUpdate === !0 && _.updateMatrix(),
          c.material.uniforms.uvTransform.value.copy(_.matrix),
          (u !== _ || d !== _.version || p !== i.toneMapping) && ((c.material.needsUpdate = !0), (u = _), (d = _.version), (p = i.toneMapping)),
          c.layers.enableAll(),
          m.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function v(m, f) {
    m.getRGB(gr, Tl(i)), n.buffers.color.setClear(gr.r, gr.g, gr.b, f, o);
  }
  return {
    getClearColor: function () {
      return a;
    },
    setClearColor: function (m, f = 1) {
      a.set(m), (l = f), v(a, l);
    },
    getClearAlpha: function () {
      return l;
    },
    setClearAlpha: function (m) {
      (l = m), v(a, l);
    },
    render: g,
  };
}
function yd(i, t, e, n) {
  const r = i.getParameter(i.MAX_VERTEX_ATTRIBS),
    s = n.isWebGL2 ? null : t.get("OES_vertex_array_object"),
    o = n.isWebGL2 || s !== null,
    a = {},
    l = m(null);
  let c = l,
    h = !1;
  function u(D, F, G, j, Y) {
    let W = !1;
    if (o) {
      const $ = v(j, G, F);
      c !== $ && ((c = $), p(c.object)), (W = f(D, j, G, Y)), W && E(D, j, G, Y);
    } else {
      const $ = F.wireframe === !0;
      (c.geometry !== j.id || c.program !== G.id || c.wireframe !== $) && ((c.geometry = j.id), (c.program = G.id), (c.wireframe = $), (W = !0));
    }
    Y !== null && e.update(Y, i.ELEMENT_ARRAY_BUFFER),
      (W || h) && ((h = !1), k(D, F, G, j), Y !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(Y).buffer));
  }
  function d() {
    return n.isWebGL2 ? i.createVertexArray() : s.createVertexArrayOES();
  }
  function p(D) {
    return n.isWebGL2 ? i.bindVertexArray(D) : s.bindVertexArrayOES(D);
  }
  function g(D) {
    return n.isWebGL2 ? i.deleteVertexArray(D) : s.deleteVertexArrayOES(D);
  }
  function v(D, F, G) {
    const j = G.wireframe === !0;
    let Y = a[D.id];
    Y === void 0 && ((Y = {}), (a[D.id] = Y));
    let W = Y[F.id];
    W === void 0 && ((W = {}), (Y[F.id] = W));
    let $ = W[j];
    return $ === void 0 && (($ = m(d())), (W[j] = $)), $;
  }
  function m(D) {
    const F = [],
      G = [],
      j = [];
    for (let Y = 0; Y < r; Y++) (F[Y] = 0), (G[Y] = 0), (j[Y] = 0);
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: F,
      enabledAttributes: G,
      attributeDivisors: j,
      object: D,
      attributes: {},
      index: null,
    };
  }
  function f(D, F, G, j) {
    const Y = c.attributes,
      W = F.attributes;
    let $ = 0;
    const Q = G.getAttributes();
    for (const dt in Q)
      if (Q[dt].location >= 0) {
        const tt = Y[dt];
        let pt = W[dt];
        if (
          (pt === void 0 &&
            (dt === "instanceMatrix" && D.instanceMatrix && (pt = D.instanceMatrix),
            dt === "instanceColor" && D.instanceColor && (pt = D.instanceColor)),
          tt === void 0 || tt.attribute !== pt || (pt && tt.data !== pt.data))
        )
          return !0;
        $++;
      }
    return c.attributesNum !== $ || c.index !== j;
  }
  function E(D, F, G, j) {
    const Y = {},
      W = F.attributes;
    let $ = 0;
    const Q = G.getAttributes();
    for (const dt in Q)
      if (Q[dt].location >= 0) {
        let tt = W[dt];
        tt === void 0 &&
          (dt === "instanceMatrix" && D.instanceMatrix && (tt = D.instanceMatrix),
          dt === "instanceColor" && D.instanceColor && (tt = D.instanceColor));
        const pt = {};
        (pt.attribute = tt), tt && tt.data && (pt.data = tt.data), (Y[dt] = pt), $++;
      }
    (c.attributes = Y), (c.attributesNum = $), (c.index = j);
  }
  function _() {
    const D = c.newAttributes;
    for (let F = 0, G = D.length; F < G; F++) D[F] = 0;
  }
  function b(D) {
    U(D, 0);
  }
  function U(D, F) {
    const G = c.newAttributes,
      j = c.enabledAttributes,
      Y = c.attributeDivisors;
    (G[D] = 1),
      j[D] === 0 && (i.enableVertexAttribArray(D), (j[D] = 1)),
      Y[D] !== F &&
        ((n.isWebGL2 ? i : t.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](D, F), (Y[D] = F));
  }
  function R() {
    const D = c.newAttributes,
      F = c.enabledAttributes;
    for (let G = 0, j = F.length; G < j; G++) F[G] !== D[G] && (i.disableVertexAttribArray(G), (F[G] = 0));
  }
  function w(D, F, G, j, Y, W, $) {
    $ === !0 ? i.vertexAttribIPointer(D, F, G, Y, W) : i.vertexAttribPointer(D, F, G, j, Y, W);
  }
  function k(D, F, G, j) {
    if (n.isWebGL2 === !1 && (D.isInstancedMesh || j.isInstancedBufferGeometry) && t.get("ANGLE_instanced_arrays") === null) return;
    _();
    const Y = j.attributes,
      W = G.getAttributes(),
      $ = F.defaultAttributeValues;
    for (const Q in W) {
      const dt = W[Q];
      if (dt.location >= 0) {
        let V = Y[Q];
        if (
          (V === void 0 &&
            (Q === "instanceMatrix" && D.instanceMatrix && (V = D.instanceMatrix), Q === "instanceColor" && D.instanceColor && (V = D.instanceColor)),
          V !== void 0)
        ) {
          const tt = V.normalized,
            pt = V.itemSize,
            Et = e.get(V);
          if (Et === void 0) continue;
          const xt = Et.buffer,
            Pt = Et.type,
            It = Et.bytesPerElement,
            yt = n.isWebGL2 === !0 && (Pt === i.INT || Pt === i.UNSIGNED_INT || V.gpuType === ol);
          if (V.isInterleavedBufferAttribute) {
            const Ut = V.data,
              P = Ut.stride,
              ct = V.offset;
            if (Ut.isInstancedInterleavedBuffer) {
              for (let q = 0; q < dt.locationSize; q++) U(dt.location + q, Ut.meshPerAttribute);
              D.isInstancedMesh !== !0 && j._maxInstanceCount === void 0 && (j._maxInstanceCount = Ut.meshPerAttribute * Ut.count);
            } else for (let q = 0; q < dt.locationSize; q++) b(dt.location + q);
            i.bindBuffer(i.ARRAY_BUFFER, xt);
            for (let q = 0; q < dt.locationSize; q++)
              w(dt.location + q, pt / dt.locationSize, Pt, tt, P * It, (ct + (pt / dt.locationSize) * q) * It, yt);
          } else {
            if (V.isInstancedBufferAttribute) {
              for (let Ut = 0; Ut < dt.locationSize; Ut++) U(dt.location + Ut, V.meshPerAttribute);
              D.isInstancedMesh !== !0 && j._maxInstanceCount === void 0 && (j._maxInstanceCount = V.meshPerAttribute * V.count);
            } else for (let Ut = 0; Ut < dt.locationSize; Ut++) b(dt.location + Ut);
            i.bindBuffer(i.ARRAY_BUFFER, xt);
            for (let Ut = 0; Ut < dt.locationSize; Ut++)
              w(dt.location + Ut, pt / dt.locationSize, Pt, tt, pt * It, (pt / dt.locationSize) * Ut * It, yt);
          }
        } else if ($ !== void 0) {
          const tt = $[Q];
          if (tt !== void 0)
            switch (tt.length) {
              case 2:
                i.vertexAttrib2fv(dt.location, tt);
                break;
              case 3:
                i.vertexAttrib3fv(dt.location, tt);
                break;
              case 4:
                i.vertexAttrib4fv(dt.location, tt);
                break;
              default:
                i.vertexAttrib1fv(dt.location, tt);
            }
        }
      }
    }
    R();
  }
  function S() {
    J();
    for (const D in a) {
      const F = a[D];
      for (const G in F) {
        const j = F[G];
        for (const Y in j) g(j[Y].object), delete j[Y];
        delete F[G];
      }
      delete a[D];
    }
  }
  function T(D) {
    if (a[D.id] === void 0) return;
    const F = a[D.id];
    for (const G in F) {
      const j = F[G];
      for (const Y in j) g(j[Y].object), delete j[Y];
      delete F[G];
    }
    delete a[D.id];
  }
  function O(D) {
    for (const F in a) {
      const G = a[F];
      if (G[D.id] === void 0) continue;
      const j = G[D.id];
      for (const Y in j) g(j[Y].object), delete j[Y];
      delete G[D.id];
    }
  }
  function J() {
    lt(), (h = !0), c !== l && ((c = l), p(c.object));
  }
  function lt() {
    (l.geometry = null), (l.program = null), (l.wireframe = !1);
  }
  return {
    setup: u,
    reset: J,
    resetDefaultState: lt,
    dispose: S,
    releaseStatesOfGeometry: T,
    releaseStatesOfProgram: O,
    initAttributes: _,
    enableAttribute: b,
    disableUnusedAttributes: R,
  };
}
function Ed(i, t, e, n) {
  const r = n.isWebGL2;
  let s;
  function o(h) {
    s = h;
  }
  function a(h, u) {
    i.drawArrays(s, h, u), e.update(u, s, 1);
  }
  function l(h, u, d) {
    if (d === 0) return;
    let p, g;
    if (r) (p = i), (g = "drawArraysInstanced");
    else if (((p = t.get("ANGLE_instanced_arrays")), (g = "drawArraysInstancedANGLE"), p === null)) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    p[g](s, h, u, d), e.update(u, s, d);
  }
  function c(h, u, d) {
    if (d === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null) for (let g = 0; g < d; g++) this.render(h[g], u[g]);
    else {
      p.multiDrawArraysWEBGL(s, h, 0, u, 0, d);
      let g = 0;
      for (let v = 0; v < d; v++) g += u[v];
      e.update(g, s, 1);
    }
  }
  (this.setMode = o), (this.render = a), (this.renderInstances = l), (this.renderMultiDraw = c);
}
function Td(i, t, e) {
  let n;
  function r() {
    if (n !== void 0) return n;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const w = t.get("EXT_texture_filter_anisotropic");
      n = i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else n = 0;
    return n;
  }
  function s(w) {
    if (w === "highp") {
      if (
        i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 &&
        i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0
      )
        return "highp";
      w = "mediump";
    }
    return w === "mediump" &&
      i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 &&
      i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0
      ? "mediump"
      : "lowp";
  }
  const o = typeof WebGL2RenderingContext != "undefined" && i.constructor.name === "WebGL2RenderingContext";
  let a = e.precision !== void 0 ? e.precision : "highp";
  const l = s(a);
  l !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", l, "instead."), (a = l));
  const c = o || t.has("WEBGL_draw_buffers"),
    h = e.logarithmicDepthBuffer === !0,
    u = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),
    d = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    p = i.getParameter(i.MAX_TEXTURE_SIZE),
    g = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),
    v = i.getParameter(i.MAX_VERTEX_ATTRIBS),
    m = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),
    f = i.getParameter(i.MAX_VARYING_VECTORS),
    E = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),
    _ = d > 0,
    b = o || t.has("OES_texture_float"),
    U = _ && b,
    R = o ? i.getParameter(i.MAX_SAMPLES) : 0;
  return {
    isWebGL2: o,
    drawBuffers: c,
    getMaxAnisotropy: r,
    getMaxPrecision: s,
    precision: a,
    logarithmicDepthBuffer: h,
    maxTextures: u,
    maxVertexTextures: d,
    maxTextureSize: p,
    maxCubemapSize: g,
    maxAttributes: v,
    maxVertexUniforms: m,
    maxVaryings: f,
    maxFragmentUniforms: E,
    vertexTextures: _,
    floatFragmentTextures: b,
    floatVertexTextures: U,
    maxSamples: R,
  };
}
function bd(i) {
  const t = this;
  let e = null,
    n = 0,
    r = !1,
    s = !1;
  const o = new gn(),
    a = new Xt(),
    l = { value: null, needsUpdate: !1 };
  (this.uniform = l),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (u, d) {
      const p = u.length !== 0 || d || n !== 0 || r;
      return (r = d), (n = u.length), p;
    }),
    (this.beginShadows = function () {
      (s = !0), h(null);
    }),
    (this.endShadows = function () {
      s = !1;
    }),
    (this.setGlobalState = function (u, d) {
      e = h(u, d, 0);
    }),
    (this.setState = function (u, d, p) {
      const g = u.clippingPlanes,
        v = u.clipIntersection,
        m = u.clipShadows,
        f = i.get(u);
      if (!r || g === null || g.length === 0 || (s && !m)) s ? h(null) : c();
      else {
        const E = s ? 0 : n,
          _ = E * 4;
        let b = f.clippingState || null;
        (l.value = b), (b = h(g, d, _, p));
        for (let U = 0; U !== _; ++U) b[U] = e[U];
        (f.clippingState = b), (this.numIntersection = v ? this.numPlanes : 0), (this.numPlanes += E);
      }
    });
  function c() {
    l.value !== e && ((l.value = e), (l.needsUpdate = n > 0)), (t.numPlanes = n), (t.numIntersection = 0);
  }
  function h(u, d, p, g) {
    const v = u !== null ? u.length : 0;
    let m = null;
    if (v !== 0) {
      if (((m = l.value), g !== !0 || m === null)) {
        const f = p + v * 4,
          E = d.matrixWorldInverse;
        a.getNormalMatrix(E), (m === null || m.length < f) && (m = new Float32Array(f));
        for (let _ = 0, b = p; _ !== v; ++_, b += 4) o.copy(u[_]).applyMatrix4(E, a), o.normal.toArray(m, b), (m[b + 3] = o.constant);
      }
      (l.value = m), (l.needsUpdate = !0);
    }
    return (t.numPlanes = v), (t.numIntersection = 0), m;
  }
}
function Ad(i) {
  let t = new WeakMap();
  function e(o, a) {
    return a === zs ? (o.mapping = mi) : a === Hs && (o.mapping = gi), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === zs || a === Hs)
        if (t.has(o)) {
          const l = t.get(o).texture;
          return e(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const c = new Fh(l.height / 2);
            return c.fromEquirectangularTexture(i, o), t.set(o, c), o.addEventListener("dispose", r), e(c.texture, o.mapping);
          } else return null;
        }
    }
    return o;
  }
  function r(o) {
    const a = o.target;
    a.removeEventListener("dispose", r);
    const l = t.get(a);
    l !== void 0 && (t.delete(a), l.dispose());
  }
  function s() {
    t = new WeakMap();
  }
  return { get: n, dispose: s };
}
class sa extends bl {
  constructor(t = -1, e = 1, n = 1, r = -1, s = 0.1, o = 2e3) {
    super(),
      (this.isOrthographicCamera = !0),
      (this.type = "OrthographicCamera"),
      (this.zoom = 1),
      (this.view = null),
      (this.left = t),
      (this.right = e),
      (this.top = n),
      (this.bottom = r),
      (this.near = s),
      (this.far = o),
      this.updateProjectionMatrix();
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      (this.left = t.left),
      (this.right = t.right),
      (this.top = t.top),
      (this.bottom = t.bottom),
      (this.near = t.near),
      (this.far = t.far),
      (this.zoom = t.zoom),
      (this.view = t.view === null ? null : Object.assign({}, t.view)),
      this
    );
  }
  setViewOffset(t, e, n, r, s, o) {
    this.view === null && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
      (this.view.enabled = !0),
      (this.view.fullWidth = t),
      (this.view.fullHeight = e),
      (this.view.offsetX = n),
      (this.view.offsetY = r),
      (this.view.width = s),
      (this.view.height = o),
      this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom),
      e = (this.top - this.bottom) / (2 * this.zoom),
      n = (this.right + this.left) / 2,
      r = (this.top + this.bottom) / 2;
    let s = n - t,
      o = n + t,
      a = r + e,
      l = r - e;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom,
        h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      (s += c * this.view.offsetX), (o = s + c * this.view.width), (a -= h * this.view.offsetY), (l = a - h * this.view.height);
    }
    this.projectionMatrix.makeOrthographic(s, o, a, l, this.near, this.far, this.coordinateSystem),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.zoom = this.zoom),
      (e.object.left = this.left),
      (e.object.right = this.right),
      (e.object.top = this.top),
      (e.object.bottom = this.bottom),
      (e.object.near = this.near),
      (e.object.far = this.far),
      this.view !== null && (e.object.view = Object.assign({}, this.view)),
      e
    );
  }
}
const li = 4,
  po = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  Un = 20,
  ys = new sa(),
  mo = new Ft();
let Es = null,
  Ts = 0,
  bs = 0;
const Ln = (1 + Math.sqrt(5)) / 2,
  ii = 1 / Ln,
  go = [
    new C(1, 1, 1),
    new C(-1, 1, 1),
    new C(1, 1, -1),
    new C(-1, 1, -1),
    new C(0, Ln, ii),
    new C(0, Ln, -ii),
    new C(ii, 0, Ln),
    new C(-ii, 0, Ln),
    new C(Ln, ii, 0),
    new C(-Ln, ii, 0),
  ];
class _o {
  constructor(t) {
    (this._renderer = t),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._lodPlanes = []),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._blurMaterial = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      this._compileMaterial(this._blurMaterial);
  }
  fromScene(t, e = 0, n = 0.1, r = 100) {
    (Es = this._renderer.getRenderTarget()),
      (Ts = this._renderer.getActiveCubeFace()),
      (bs = this._renderer.getActiveMipmapLevel()),
      this._setSize(256);
    const s = this._allocateTargets();
    return (s.depthBuffer = !0), this._sceneToCubeUV(t, n, r, s), e > 0 && this._blur(s, 0, 0, e), this._applyPMREM(s), this._cleanup(s), s;
  }
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && ((this._cubemapMaterial = Mo()), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && ((this._equirectMaterial = xo()), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(),
      this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
      this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  _setSize(t) {
    (this._lodMax = Math.floor(Math.log2(t))), (this._cubeSize = Math.pow(2, this._lodMax));
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodPlanes.length; t++) this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(Es, Ts, bs), (t.scissorTest = !1), _r(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === mi || t.mapping === gi
      ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width)
      : this._setSize(t.image.width / 4),
      (Es = this._renderer.getRenderTarget()),
      (Ts = this._renderer.getActiveCubeFace()),
      (bs = this._renderer.getActiveMipmapLevel());
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112),
      e = 4 * this._cubeSize,
      n = { magFilter: De, minFilter: De, generateMipmaps: !1, type: cn, format: He, colorSpace: hn, depthBuffer: !1 },
      r = vo(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), (this._pingPongRenderTarget = vo(t, e, n));
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = wd(s)), (this._blurMaterial = Rd(s, t, e));
    }
    return r;
  }
  _compileMaterial(t) {
    const e = new on(this._lodPlanes[0], t);
    this._renderer.compile(e, ys);
  }
  _sceneToCubeUV(t, e, n, r) {
    const a = new Ie(90, 1, e, n),
      l = [1, -1, 1, 1, 1, 1],
      c = [1, 1, 1, -1, -1, -1],
      h = this._renderer,
      u = h.autoClear,
      d = h.toneMapping;
    h.getClearColor(mo), (h.toneMapping = xn), (h.autoClear = !1);
    const p = new na({ name: "PMREM.Background", side: Te, depthWrite: !1, depthTest: !1 }),
      g = new on(new Xi(), p);
    let v = !1;
    const m = t.background;
    m ? m.isColor && (p.color.copy(m), (t.background = null), (v = !0)) : (p.color.copy(mo), (v = !0));
    for (let f = 0; f < 6; f++) {
      const E = f % 3;
      E === 0
        ? (a.up.set(0, l[f], 0), a.lookAt(c[f], 0, 0))
        : E === 1
        ? (a.up.set(0, 0, l[f]), a.lookAt(0, c[f], 0))
        : (a.up.set(0, l[f], 0), a.lookAt(0, 0, c[f]));
      const _ = this._cubeSize;
      _r(r, E * _, f > 2 ? _ : 0, _, _), h.setRenderTarget(r), v && h.render(g, a), h.render(t, a);
    }
    g.geometry.dispose(), g.material.dispose(), (h.toneMapping = d), (h.autoClear = u), (t.background = m);
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer,
      r = t.mapping === mi || t.mapping === gi;
    r
      ? (this._cubemapMaterial === null && (this._cubemapMaterial = Mo()),
        (this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1))
      : this._equirectMaterial === null && (this._equirectMaterial = xo());
    const s = r ? this._cubemapMaterial : this._equirectMaterial,
      o = new on(this._lodPlanes[0], s),
      a = s.uniforms;
    a.envMap.value = t;
    const l = this._cubeSize;
    _r(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(o, ys);
  }
  _applyPMREM(t) {
    const e = this._renderer,
      n = e.autoClear;
    e.autoClear = !1;
    for (let r = 1; r < this._lodPlanes.length; r++) {
      const s = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]),
        o = go[(r - 1) % go.length];
      this._blur(t, r - 1, r, s, o);
    }
    e.autoClear = n;
  }
  _blur(t, e, n, r, s) {
    const o = this._pingPongRenderTarget;
    this._halfBlur(t, o, e, n, r, "latitudinal", s), this._halfBlur(o, t, n, n, r, "longitudinal", s);
  }
  _halfBlur(t, e, n, r, s, o, a) {
    const l = this._renderer,
      c = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
    const h = 3,
      u = new on(this._lodPlanes[r], c),
      d = c.uniforms,
      p = this._sizeLods[n] - 1,
      g = isFinite(s) ? Math.PI / (2 * p) : (2 * Math.PI) / (2 * Un - 1),
      v = s / g,
      m = isFinite(s) ? 1 + Math.floor(h * v) : Un;
    m > Un && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Un}`);
    const f = [];
    let E = 0;
    for (let w = 0; w < Un; ++w) {
      const k = w / v,
        S = Math.exp((-k * k) / 2);
      f.push(S), w === 0 ? (E += S) : w < m && (E += 2 * S);
    }
    for (let w = 0; w < f.length; w++) f[w] = f[w] / E;
    (d.envMap.value = t.texture),
      (d.samples.value = m),
      (d.weights.value = f),
      (d.latitudinal.value = o === "latitudinal"),
      a && (d.poleAxis.value = a);
    const { _lodMax: _ } = this;
    (d.dTheta.value = g), (d.mipInt.value = _ - n);
    const b = this._sizeLods[r],
      U = 3 * b * (r > _ - li ? r - _ + li : 0),
      R = 4 * (this._cubeSize - b);
    _r(e, U, R, 3 * b, 2 * b), l.setRenderTarget(e), l.render(u, ys);
  }
}
function wd(i) {
  const t = [],
    e = [],
    n = [];
  let r = i;
  const s = i - li + 1 + po.length;
  for (let o = 0; o < s; o++) {
    const a = Math.pow(2, r);
    e.push(a);
    let l = 1 / a;
    o > i - li ? (l = po[o - i + li - 1]) : o === 0 && (l = 0), n.push(l);
    const c = 1 / (a - 2),
      h = -c,
      u = 1 + c,
      d = [h, h, u, h, u, u, h, h, u, u, h, u],
      p = 6,
      g = 6,
      v = 3,
      m = 2,
      f = 1,
      E = new Float32Array(v * g * p),
      _ = new Float32Array(m * g * p),
      b = new Float32Array(f * g * p);
    for (let R = 0; R < p; R++) {
      const w = ((R % 3) * 2) / 3 - 1,
        k = R > 2 ? 0 : -1,
        S = [w, k, 0, w + 2 / 3, k, 0, w + 2 / 3, k + 1, 0, w, k, 0, w + 2 / 3, k + 1, 0, w, k + 1, 0];
      E.set(S, v * g * R), _.set(d, m * g * R);
      const T = [R, R, R, R, R, R];
      b.set(T, f * g * R);
    }
    const U = new Ce();
    U.setAttribute("position", new Ve(E, v)), U.setAttribute("uv", new Ve(_, m)), U.setAttribute("faceIndex", new Ve(b, f)), t.push(U), r > li && r--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function vo(i, t, e) {
  const n = new Ge(i, t, e);
  return (n.texture.mapping = Vr), (n.texture.name = "PMREM.cubeUv"), (n.scissorTest = !0), n;
}
function _r(i, t, e, n, r) {
  i.viewport.set(t, e, n, r), i.scissor.set(t, e, n, r);
}
function Rd(i, t, e) {
  const n = new Float32Array(Un),
    r = new C(0, 1, 0);
  return new Re({
    name: "SphericalGaussianBlur",
    defines: { n: Un, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / e, CUBEUV_MAX_MIP: `${i}.0` },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r },
    },
    vertexShader: aa(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: ln,
    depthTest: !1,
    depthWrite: !1,
  });
}
function xo() {
  return new Re({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: aa(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: ln,
    depthTest: !1,
    depthWrite: !1,
  });
}
function Mo() {
  return new Re({
    name: "CubemapToCubeUV",
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: aa(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: ln,
    depthTest: !1,
    depthWrite: !1,
  });
}
function aa() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function Cd(i) {
  let t = new WeakMap(),
    e = null;
  function n(a) {
    if (a && a.isTexture) {
      const l = a.mapping,
        c = l === zs || l === Hs,
        h = l === mi || l === gi;
      if (c || h)
        if (a.isRenderTargetTexture && a.needsPMREMUpdate === !0) {
          a.needsPMREMUpdate = !1;
          let u = t.get(a);
          return e === null && (e = new _o(i)), (u = c ? e.fromEquirectangular(a, u) : e.fromCubemap(a, u)), t.set(a, u), u.texture;
        } else {
          if (t.has(a)) return t.get(a).texture;
          {
            const u = a.image;
            if ((c && u && u.height > 0) || (h && u && r(u))) {
              e === null && (e = new _o(i));
              const d = c ? e.fromEquirectangular(a) : e.fromCubemap(a);
              return t.set(a, d), a.addEventListener("dispose", s), d.texture;
            } else return null;
          }
        }
    }
    return a;
  }
  function r(a) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++) a[h] !== void 0 && l++;
    return l === c;
  }
  function s(a) {
    const l = a.target;
    l.removeEventListener("dispose", s);
    const c = t.get(l);
    c !== void 0 && (t.delete(l), c.dispose());
  }
  function o() {
    (t = new WeakMap()), e !== null && (e.dispose(), (e = null));
  }
  return { get: n, dispose: o };
}
function Pd(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0) return t[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r =
          i.getExtension("EXT_texture_filter_anisotropic") ||
          i.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r =
          i.getExtension("WEBGL_compressed_texture_s3tc") ||
          i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
          i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return (t[n] = r), r;
  }
  return {
    has: function (n) {
      return e(n) !== null;
    },
    init: function (n) {
      n.isWebGL2
        ? (e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"))
        : (e("WEBGL_depth_texture"),
          e("OES_texture_float"),
          e("OES_texture_half_float"),
          e("OES_texture_half_float_linear"),
          e("OES_standard_derivatives"),
          e("OES_element_index_uint"),
          e("OES_vertex_array_object"),
          e("ANGLE_instanced_arrays")),
        e("OES_texture_float_linear"),
        e("EXT_color_buffer_half_float"),
        e("WEBGL_multisampled_render_to_texture");
    },
    get: function (n) {
      const r = e(n);
      return r === null && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    },
  };
}
function Ld(i, t, e, n) {
  const r = {},
    s = new WeakMap();
  function o(u) {
    const d = u.target;
    d.index !== null && t.remove(d.index);
    for (const g in d.attributes) t.remove(d.attributes[g]);
    for (const g in d.morphAttributes) {
      const v = d.morphAttributes[g];
      for (let m = 0, f = v.length; m < f; m++) t.remove(v[m]);
    }
    d.removeEventListener("dispose", o), delete r[d.id];
    const p = s.get(d);
    p && (t.remove(p), s.delete(d)),
      n.releaseStatesOfGeometry(d),
      d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount,
      e.memory.geometries--;
  }
  function a(u, d) {
    return r[d.id] === !0 || (d.addEventListener("dispose", o), (r[d.id] = !0), e.memory.geometries++), d;
  }
  function l(u) {
    const d = u.attributes;
    for (const g in d) t.update(d[g], i.ARRAY_BUFFER);
    const p = u.morphAttributes;
    for (const g in p) {
      const v = p[g];
      for (let m = 0, f = v.length; m < f; m++) t.update(v[m], i.ARRAY_BUFFER);
    }
  }
  function c(u) {
    const d = [],
      p = u.index,
      g = u.attributes.position;
    let v = 0;
    if (p !== null) {
      const E = p.array;
      v = p.version;
      for (let _ = 0, b = E.length; _ < b; _ += 3) {
        const U = E[_ + 0],
          R = E[_ + 1],
          w = E[_ + 2];
        d.push(U, R, R, w, w, U);
      }
    } else if (g !== void 0) {
      const E = g.array;
      v = g.version;
      for (let _ = 0, b = E.length / 3 - 1; _ < b; _ += 3) {
        const U = _ + 0,
          R = _ + 1,
          w = _ + 2;
        d.push(U, R, R, w, w, U);
      }
    } else return;
    const m = new (gl(d) ? El : yl)(d, 1);
    m.version = v;
    const f = s.get(u);
    f && t.remove(f), s.set(u, m);
  }
  function h(u) {
    const d = s.get(u);
    if (d) {
      const p = u.index;
      p !== null && d.version < p.version && c(u);
    } else c(u);
    return s.get(u);
  }
  return { get: a, update: l, getWireframeAttribute: h };
}
function Dd(i, t, e, n) {
  const r = n.isWebGL2;
  let s;
  function o(p) {
    s = p;
  }
  let a, l;
  function c(p) {
    (a = p.type), (l = p.bytesPerElement);
  }
  function h(p, g) {
    i.drawElements(s, g, a, p * l), e.update(g, s, 1);
  }
  function u(p, g, v) {
    if (v === 0) return;
    let m, f;
    if (r) (m = i), (f = "drawElementsInstanced");
    else if (((m = t.get("ANGLE_instanced_arrays")), (f = "drawElementsInstancedANGLE"), m === null)) {
      console.error(
        "THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
      );
      return;
    }
    m[f](s, g, a, p * l, v), e.update(g, s, v);
  }
  function d(p, g, v) {
    if (v === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null) for (let f = 0; f < v; f++) this.render(p[f] / l, g[f]);
    else {
      m.multiDrawElementsWEBGL(s, g, 0, a, p, 0, v);
      let f = 0;
      for (let E = 0; E < v; E++) f += g[E];
      e.update(f, s, 1);
    }
  }
  (this.setMode = o), (this.setIndex = c), (this.render = h), (this.renderInstances = u), (this.renderMultiDraw = d);
}
function Ud(i) {
  const t = { geometries: 0, textures: 0 },
    e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  function n(s, o, a) {
    switch ((e.calls++, o)) {
      case i.TRIANGLES:
        e.triangles += a * (s / 3);
        break;
      case i.LINES:
        e.lines += a * (s / 2);
        break;
      case i.LINE_STRIP:
        e.lines += a * (s - 1);
        break;
      case i.LINE_LOOP:
        e.lines += a * s;
        break;
      case i.POINTS:
        e.points += a * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function r() {
    (e.calls = 0), (e.triangles = 0), (e.points = 0), (e.lines = 0);
  }
  return { memory: t, render: e, programs: null, autoReset: !0, reset: r, update: n };
}
function Id(i, t) {
  return i[0] - t[0];
}
function Nd(i, t) {
  return Math.abs(t[1]) - Math.abs(i[1]);
}
function Od(i, t, e) {
  const n = {},
    r = new Float32Array(8),
    s = new WeakMap(),
    o = new Qt(),
    a = [];
  for (let c = 0; c < 8; c++) a[c] = [c, 0];
  function l(c, h, u) {
    const d = c.morphTargetInfluences;
    if (t.isWebGL2 === !0) {
      const p = h.morphAttributes.position || h.morphAttributes.normal || h.morphAttributes.color,
        g = p !== void 0 ? p.length : 0;
      let v = s.get(h);
      if (v === void 0 || v.count !== g) {
        let D = function () {
          J.dispose(), s.delete(h), h.removeEventListener("dispose", D);
        };
        v !== void 0 && v.texture.dispose();
        const E = h.morphAttributes.position !== void 0,
          _ = h.morphAttributes.normal !== void 0,
          b = h.morphAttributes.color !== void 0,
          U = h.morphAttributes.position || [],
          R = h.morphAttributes.normal || [],
          w = h.morphAttributes.color || [];
        let k = 0;
        E === !0 && (k = 1), _ === !0 && (k = 2), b === !0 && (k = 3);
        let S = h.attributes.position.count * k,
          T = 1;
        S > t.maxTextureSize && ((T = Math.ceil(S / t.maxTextureSize)), (S = t.maxTextureSize));
        const O = new Float32Array(S * T * 4 * g),
          J = new xl(O, S, T, g);
        (J.type = vn), (J.needsUpdate = !0);
        const lt = k * 4;
        for (let F = 0; F < g; F++) {
          const G = U[F],
            j = R[F],
            Y = w[F],
            W = S * T * 4 * F;
          for (let $ = 0; $ < G.count; $++) {
            const Q = $ * lt;
            E === !0 && (o.fromBufferAttribute(G, $), (O[W + Q + 0] = o.x), (O[W + Q + 1] = o.y), (O[W + Q + 2] = o.z), (O[W + Q + 3] = 0)),
              _ === !0 && (o.fromBufferAttribute(j, $), (O[W + Q + 4] = o.x), (O[W + Q + 5] = o.y), (O[W + Q + 6] = o.z), (O[W + Q + 7] = 0)),
              b === !0 &&
                (o.fromBufferAttribute(Y, $),
                (O[W + Q + 8] = o.x),
                (O[W + Q + 9] = o.y),
                (O[W + Q + 10] = o.z),
                (O[W + Q + 11] = Y.itemSize === 4 ? o.w : 1));
          }
        }
        (v = { count: g, texture: J, size: new Z(S, T) }), s.set(h, v), h.addEventListener("dispose", D);
      }
      let m = 0;
      for (let E = 0; E < d.length; E++) m += d[E];
      const f = h.morphTargetsRelative ? 1 : 1 - m;
      u.getUniforms().setValue(i, "morphTargetBaseInfluence", f),
        u.getUniforms().setValue(i, "morphTargetInfluences", d),
        u.getUniforms().setValue(i, "morphTargetsTexture", v.texture, e),
        u.getUniforms().setValue(i, "morphTargetsTextureSize", v.size);
    } else {
      const p = d === void 0 ? 0 : d.length;
      let g = n[h.id];
      if (g === void 0 || g.length !== p) {
        g = [];
        for (let _ = 0; _ < p; _++) g[_] = [_, 0];
        n[h.id] = g;
      }
      for (let _ = 0; _ < p; _++) {
        const b = g[_];
        (b[0] = _), (b[1] = d[_]);
      }
      g.sort(Nd);
      for (let _ = 0; _ < 8; _++)
        _ < p && g[_][1] ? ((a[_][0] = g[_][0]), (a[_][1] = g[_][1])) : ((a[_][0] = Number.MAX_SAFE_INTEGER), (a[_][1] = 0));
      a.sort(Id);
      const v = h.morphAttributes.position,
        m = h.morphAttributes.normal;
      let f = 0;
      for (let _ = 0; _ < 8; _++) {
        const b = a[_],
          U = b[0],
          R = b[1];
        U !== Number.MAX_SAFE_INTEGER && R
          ? (v && h.getAttribute("morphTarget" + _) !== v[U] && h.setAttribute("morphTarget" + _, v[U]),
            m && h.getAttribute("morphNormal" + _) !== m[U] && h.setAttribute("morphNormal" + _, m[U]),
            (r[_] = R),
            (f += R))
          : (v && h.hasAttribute("morphTarget" + _) === !0 && h.deleteAttribute("morphTarget" + _),
            m && h.hasAttribute("morphNormal" + _) === !0 && h.deleteAttribute("morphNormal" + _),
            (r[_] = 0));
      }
      const E = h.morphTargetsRelative ? 1 : 1 - f;
      u.getUniforms().setValue(i, "morphTargetBaseInfluence", E), u.getUniforms().setValue(i, "morphTargetInfluences", r);
    }
  }
  return { update: l };
}
function Fd(i, t, e, n) {
  let r = new WeakMap();
  function s(l) {
    const c = n.render.frame,
      h = l.geometry,
      u = t.get(l, h);
    if (
      (r.get(u) !== c && (t.update(u), r.set(u, c)),
      l.isInstancedMesh &&
        (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a),
        r.get(l) !== c &&
          (e.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && e.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))),
      l.isSkinnedMesh)
    ) {
      const d = l.skeleton;
      r.get(d) !== c && (d.update(), r.set(d, c));
    }
    return u;
  }
  function o() {
    r = new WeakMap();
  }
  function a(l) {
    const c = l.target;
    c.removeEventListener("dispose", a), e.remove(c.instanceMatrix), c.instanceColor !== null && e.remove(c.instanceColor);
  }
  return { update: s, dispose: o };
}
class Rl extends Ee {
  constructor(t, e, n, r, s, o, a, l, c, h) {
    if (((h = h !== void 0 ? h : On), h !== On && h !== _i))
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === On && (n = _n),
      n === void 0 && h === _i && (n = Nn),
      super(null, r, s, o, a, l, h, n, c),
      (this.isDepthTexture = !0),
      (this.image = { width: t, height: e }),
      (this.magFilter = a !== void 0 ? a : me),
      (this.minFilter = l !== void 0 ? l : me),
      (this.flipY = !1),
      (this.generateMipmaps = !1),
      (this.compareFunction = null);
  }
  copy(t) {
    return super.copy(t), (this.compareFunction = t.compareFunction), this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const Cl = new Ee(),
  Pl = new Rl(1, 1);
Pl.compareFunction = ml;
const Ll = new xl(),
  Dl = new Sh(),
  Ul = new Al(),
  So = [],
  yo = [],
  Eo = new Float32Array(16),
  To = new Float32Array(9),
  bo = new Float32Array(4);
function xi(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = t * e;
  let s = So[r];
  if ((s === void 0 && ((s = new Float32Array(r)), (So[r] = s)), t !== 0)) {
    n.toArray(s, 0);
    for (let o = 1, a = 0; o !== t; ++o) (a += e), i[o].toArray(s, a);
  }
  return s;
}
function he(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++) if (i[e] !== t[e]) return !1;
  return !0;
}
function ue(i, t) {
  for (let e = 0, n = t.length; e < n; e++) i[e] = t[e];
}
function Yr(i, t) {
  let e = yo[t];
  e === void 0 && ((e = new Int32Array(t)), (yo[t] = e));
  for (let n = 0; n !== t; ++n) e[n] = i.allocateTextureUnit();
  return e;
}
function Bd(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), (e[0] = t));
}
function zd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (he(e, t)) return;
    i.uniform2fv(this.addr, t), ue(e, t);
  }
}
function Hd(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), (e[0] = t.r), (e[1] = t.g), (e[2] = t.b));
  else {
    if (he(e, t)) return;
    i.uniform3fv(this.addr, t), ue(e, t);
  }
}
function Gd(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
  else {
    if (he(e, t)) return;
    i.uniform4fv(this.addr, t), ue(e, t);
  }
}
function Vd(i, t) {
  const e = this.cache,
    n = t.elements;
  if (n === void 0) {
    if (he(e, t)) return;
    i.uniformMatrix2fv(this.addr, !1, t), ue(e, t);
  } else {
    if (he(e, n)) return;
    bo.set(n), i.uniformMatrix2fv(this.addr, !1, bo), ue(e, n);
  }
}
function kd(i, t) {
  const e = this.cache,
    n = t.elements;
  if (n === void 0) {
    if (he(e, t)) return;
    i.uniformMatrix3fv(this.addr, !1, t), ue(e, t);
  } else {
    if (he(e, n)) return;
    To.set(n), i.uniformMatrix3fv(this.addr, !1, To), ue(e, n);
  }
}
function Wd(i, t) {
  const e = this.cache,
    n = t.elements;
  if (n === void 0) {
    if (he(e, t)) return;
    i.uniformMatrix4fv(this.addr, !1, t), ue(e, t);
  } else {
    if (he(e, n)) return;
    Eo.set(n), i.uniformMatrix4fv(this.addr, !1, Eo), ue(e, n);
  }
}
function Xd(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), (e[0] = t));
}
function qd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (he(e, t)) return;
    i.uniform2iv(this.addr, t), ue(e, t);
  }
}
function Yd(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
  else {
    if (he(e, t)) return;
    i.uniform3iv(this.addr, t), ue(e, t);
  }
}
function jd(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
  else {
    if (he(e, t)) return;
    i.uniform4iv(this.addr, t), ue(e, t);
  }
}
function Zd(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), (e[0] = t));
}
function Kd(i, t) {
  const e = this.cache;
  if (t.x !== void 0) (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), (e[0] = t.x), (e[1] = t.y));
  else {
    if (he(e, t)) return;
    i.uniform2uiv(this.addr, t), ue(e, t);
  }
}
function Jd(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z));
  else {
    if (he(e, t)) return;
    i.uniform3uiv(this.addr, t), ue(e, t);
  }
}
function $d(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) &&
      (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), (e[0] = t.x), (e[1] = t.y), (e[2] = t.z), (e[3] = t.w));
  else {
    if (he(e, t)) return;
    i.uniform4uiv(this.addr, t), ue(e, t);
  }
}
function Qd(i, t, e) {
  const n = this.cache,
    r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), (n[0] = r));
  const s = this.type === i.SAMPLER_2D_SHADOW ? Pl : Cl;
  e.setTexture2D(t || s, r);
}
function tp(i, t, e) {
  const n = this.cache,
    r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), (n[0] = r)), e.setTexture3D(t || Dl, r);
}
function ep(i, t, e) {
  const n = this.cache,
    r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), (n[0] = r)), e.setTextureCube(t || Ul, r);
}
function np(i, t, e) {
  const n = this.cache,
    r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), (n[0] = r)), e.setTexture2DArray(t || Ll, r);
}
function ip(i) {
  switch (i) {
    case 5126:
      return Bd;
    case 35664:
      return zd;
    case 35665:
      return Hd;
    case 35666:
      return Gd;
    case 35674:
      return Vd;
    case 35675:
      return kd;
    case 35676:
      return Wd;
    case 5124:
    case 35670:
      return Xd;
    case 35667:
    case 35671:
      return qd;
    case 35668:
    case 35672:
      return Yd;
    case 35669:
    case 35673:
      return jd;
    case 5125:
      return Zd;
    case 36294:
      return Kd;
    case 36295:
      return Jd;
    case 36296:
      return $d;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Qd;
    case 35679:
    case 36299:
    case 36307:
      return tp;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return ep;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return np;
  }
}
function rp(i, t) {
  i.uniform1fv(this.addr, t);
}
function sp(i, t) {
  const e = xi(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function ap(i, t) {
  const e = xi(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function op(i, t) {
  const e = xi(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function lp(i, t) {
  const e = xi(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function cp(i, t) {
  const e = xi(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function hp(i, t) {
  const e = xi(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function up(i, t) {
  i.uniform1iv(this.addr, t);
}
function fp(i, t) {
  i.uniform2iv(this.addr, t);
}
function dp(i, t) {
  i.uniform3iv(this.addr, t);
}
function pp(i, t) {
  i.uniform4iv(this.addr, t);
}
function mp(i, t) {
  i.uniform1uiv(this.addr, t);
}
function gp(i, t) {
  i.uniform2uiv(this.addr, t);
}
function _p(i, t) {
  i.uniform3uiv(this.addr, t);
}
function vp(i, t) {
  i.uniform4uiv(this.addr, t);
}
function xp(i, t, e) {
  const n = this.cache,
    r = t.length,
    s = Yr(e, r);
  he(n, s) || (i.uniform1iv(this.addr, s), ue(n, s));
  for (let o = 0; o !== r; ++o) e.setTexture2D(t[o] || Cl, s[o]);
}
function Mp(i, t, e) {
  const n = this.cache,
    r = t.length,
    s = Yr(e, r);
  he(n, s) || (i.uniform1iv(this.addr, s), ue(n, s));
  for (let o = 0; o !== r; ++o) e.setTexture3D(t[o] || Dl, s[o]);
}
function Sp(i, t, e) {
  const n = this.cache,
    r = t.length,
    s = Yr(e, r);
  he(n, s) || (i.uniform1iv(this.addr, s), ue(n, s));
  for (let o = 0; o !== r; ++o) e.setTextureCube(t[o] || Ul, s[o]);
}
function yp(i, t, e) {
  const n = this.cache,
    r = t.length,
    s = Yr(e, r);
  he(n, s) || (i.uniform1iv(this.addr, s), ue(n, s));
  for (let o = 0; o !== r; ++o) e.setTexture2DArray(t[o] || Ll, s[o]);
}
function Ep(i) {
  switch (i) {
    case 5126:
      return rp;
    case 35664:
      return sp;
    case 35665:
      return ap;
    case 35666:
      return op;
    case 35674:
      return lp;
    case 35675:
      return cp;
    case 35676:
      return hp;
    case 5124:
    case 35670:
      return up;
    case 35667:
    case 35671:
      return fp;
    case 35668:
    case 35672:
      return dp;
    case 35669:
    case 35673:
      return pp;
    case 5125:
      return mp;
    case 36294:
      return gp;
    case 36295:
      return _p;
    case 36296:
      return vp;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return xp;
    case 35679:
    case 36299:
    case 36307:
      return Mp;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Sp;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return yp;
  }
}
class Tp {
  constructor(t, e, n) {
    (this.id = t), (this.addr = n), (this.cache = []), (this.type = e.type), (this.setValue = ip(e.type));
  }
}
class bp {
  constructor(t, e, n) {
    (this.id = t), (this.addr = n), (this.cache = []), (this.type = e.type), (this.size = e.size), (this.setValue = Ep(e.type));
  }
}
class Ap {
  constructor(t) {
    (this.id = t), (this.seq = []), (this.map = {});
  }
  setValue(t, e, n) {
    const r = this.seq;
    for (let s = 0, o = r.length; s !== o; ++s) {
      const a = r[s];
      a.setValue(t, e[a.id], n);
    }
  }
}
const As = /(\w+)(\])?(\[|\.)?/g;
function Ao(i, t) {
  i.seq.push(t), (i.map[t.id] = t);
}
function wp(i, t, e) {
  const n = i.name,
    r = n.length;
  for (As.lastIndex = 0; ; ) {
    const s = As.exec(n),
      o = As.lastIndex;
    let a = s[1];
    const l = s[2] === "]",
      c = s[3];
    if ((l && (a = a | 0), c === void 0 || (c === "[" && o + 2 === r))) {
      Ao(e, c === void 0 ? new Tp(a, i, t) : new bp(a, i, t));
      break;
    } else {
      let u = e.map[a];
      u === void 0 && ((u = new Ap(a)), Ao(e, u)), (e = u);
    }
  }
}
class Pr {
  constructor(t, e) {
    (this.seq = []), (this.map = {});
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = t.getActiveUniform(e, r),
        o = t.getUniformLocation(e, s.name);
      wp(s, o, this);
    }
  }
  setValue(t, e, n, r) {
    const s = this.map[e];
    s !== void 0 && s.setValue(t, n, r);
  }
  setOptional(t, e, n) {
    const r = e[n];
    r !== void 0 && this.setValue(t, n, r);
  }
  static upload(t, e, n, r) {
    for (let s = 0, o = e.length; s !== o; ++s) {
      const a = e[s],
        l = n[a.id];
      l.needsUpdate !== !1 && a.setValue(t, l.value, r);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let r = 0, s = t.length; r !== s; ++r) {
      const o = t[r];
      o.id in e && n.push(o);
    }
    return n;
  }
}
function wo(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const Rp = 37297;
let Cp = 0;
function Pp(i, t) {
  const e = i.split(`
`),
    n = [],
    r = Math.max(t - 6, 0),
    s = Math.min(t + 6, e.length);
  for (let o = r; o < s; o++) {
    const a = o + 1;
    n.push(`${a === t ? ">" : " "} ${a}: ${e[o]}`);
  }
  return n.join(`
`);
}
function Lp(i) {
  const t = Jt.getPrimaries(Jt.workingColorSpace),
    e = Jt.getPrimaries(i);
  let n;
  switch (
    (t === e ? (n = "") : t === Nr && e === Ir ? (n = "LinearDisplayP3ToLinearSRGB") : t === Ir && e === Nr && (n = "LinearSRGBToLinearDisplayP3"), i)
  ) {
    case hn:
    case Wr:
      return [n, "LinearTransferOETF"];
    case ge:
    case ta:
      return [n, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
  }
}
function Ro(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS),
    r = i.getShaderInfoLog(t).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const o = parseInt(s[1]);
    return (
      e.toUpperCase() +
      `

` +
      r +
      `

` +
      Pp(i.getShaderSource(t), o)
    );
  } else return r;
}
function Dp(i, t) {
  const e = Lp(t);
  return `vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`;
}
function Up(i, t) {
  let e;
  switch (t) {
    case Pc:
      e = "Linear";
      break;
    case Lc:
      e = "Reinhard";
      break;
    case Dc:
      e = "OptimizedCineon";
      break;
    case Uc:
      e = "ACESFilmic";
      break;
    case Nc:
      e = "AgX";
      break;
    case Ic:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), (e = "Linear");
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
function Ip(i) {
  return [
    i.extensionDerivatives ||
    !!i.envMapCubeUVHeight ||
    i.bumpMap ||
    i.normalMapTangentSpace ||
    i.clearcoatNormalMap ||
    i.flatShading ||
    i.shaderID === "physical"
      ? "#extension GL_OES_standard_derivatives : enable"
      : "",
    (i.extensionFragDepth || i.logarithmicDepthBuffer) && i.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
    i.extensionDrawBuffers && i.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
    (i.extensionShaderTextureLOD || i.envMap || i.transmission) && i.rendererExtensionShaderTextureLod
      ? "#extension GL_EXT_shader_texture_lod : enable"
      : "",
  ].filter(ci).join(`
`);
}
function Np(i) {
  return [i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : ""].filter(ci).join(`
`);
}
function Op(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function Fp(i, t) {
  const e = {},
    n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(t, r),
      o = s.name;
    let a = 1;
    s.type === i.FLOAT_MAT2 && (a = 2),
      s.type === i.FLOAT_MAT3 && (a = 3),
      s.type === i.FLOAT_MAT4 && (a = 4),
      (e[o] = { type: s.type, location: i.getAttribLocation(t, o), locationSize: a });
  }
  return e;
}
function ci(i) {
  return i !== "";
}
function Co(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i
    .replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, e)
    .replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Po(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const Bp = /^[ \t]*#include +<([\w\d./]+)>/gm;
function qs(i) {
  return i.replace(Bp, Hp);
}
const zp = new Map([
  ["encodings_fragment", "colorspace_fragment"],
  ["encodings_pars_fragment", "colorspace_pars_fragment"],
  ["output_fragment", "opaque_fragment"],
]);
function Hp(i, t) {
  let e = Gt[t];
  if (e === void 0) {
    const n = zp.get(t);
    if (n !== void 0) (e = Gt[n]), console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return qs(e);
}
const Gp =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Lo(i) {
  return i.replace(Gp, Vp);
}
function Vp(i, t, e, n) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(e); s++) r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Do(i) {
  let t =
    "precision " +
    i.precision +
    ` float;
precision ` +
    i.precision +
    " int;";
  return (
    i.precision === "highp"
      ? (t += `
#define HIGH_PRECISION`)
      : i.precision === "mediump"
      ? (t += `
#define MEDIUM_PRECISION`)
      : i.precision === "lowp" &&
        (t += `
#define LOW_PRECISION`),
    t
  );
}
function kp(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return (
    i.shadowMapType === sl
      ? (t = "SHADOWMAP_TYPE_PCF")
      : i.shadowMapType === rc
      ? (t = "SHADOWMAP_TYPE_PCF_SOFT")
      : i.shadowMapType === rn && (t = "SHADOWMAP_TYPE_VSM"),
    t
  );
}
function Wp(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case mi:
      case gi:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case Vr:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}
function Xp(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case gi:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return t;
}
function qp(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case Gr:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case Rc:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case Cc:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}
function Yp(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2,
    n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 7 * 16)), texelHeight: n, maxMip: e };
}
function jp(i, t, e, n) {
  const r = i.getContext(),
    s = e.defines;
  let o = e.vertexShader,
    a = e.fragmentShader;
  const l = kp(e),
    c = Wp(e),
    h = Xp(e),
    u = qp(e),
    d = Yp(e),
    p = e.isWebGL2 ? "" : Ip(e),
    g = Np(e),
    v = Op(s),
    m = r.createProgram();
  let f,
    E,
    _ = e.glslVersion
      ? "#version " +
        e.glslVersion +
        `
`
      : "";
  e.isRawShaderMaterial
    ? ((f = ["#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, v].filter(ci).join(`
`)),
      f.length > 0 &&
        (f += `
`),
      (E = [p, "#define SHADER_TYPE " + e.shaderType, "#define SHADER_NAME " + e.shaderName, v].filter(ci).join(`
`)),
      E.length > 0 &&
        (E += `
`))
    : ((f = [
        Do(e),
        "#define SHADER_TYPE " + e.shaderType,
        "#define SHADER_NAME " + e.shaderName,
        v,
        e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
        e.batching ? "#define USE_BATCHING" : "",
        e.instancing ? "#define USE_INSTANCING" : "",
        e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        e.useFog && e.fog ? "#define USE_FOG" : "",
        e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
        e.map ? "#define USE_MAP" : "",
        e.envMap ? "#define USE_ENVMAP" : "",
        e.envMap ? "#define " + h : "",
        e.lightMap ? "#define USE_LIGHTMAP" : "",
        e.aoMap ? "#define USE_AOMAP" : "",
        e.bumpMap ? "#define USE_BUMPMAP" : "",
        e.normalMap ? "#define USE_NORMALMAP" : "",
        e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
        e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        e.anisotropy ? "#define USE_ANISOTROPY" : "",
        e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        e.specularMap ? "#define USE_SPECULARMAP" : "",
        e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        e.metalnessMap ? "#define USE_METALNESSMAP" : "",
        e.alphaMap ? "#define USE_ALPHAMAP" : "",
        e.alphaHash ? "#define USE_ALPHAHASH" : "",
        e.transmission ? "#define USE_TRANSMISSION" : "",
        e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        e.mapUv ? "#define MAP_UV " + e.mapUv : "",
        e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
        e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
        e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
        e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
        e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
        e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
        e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "",
        e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
        e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
        e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "",
        e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
        e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "",
        e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "",
        e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "",
        e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "",
        e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "",
        e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "",
        e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
        e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "",
        e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "",
        e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "",
        e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
        e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
        e.vertexColors ? "#define USE_COLOR" : "",
        e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        e.vertexUv1s ? "#define USE_UV1" : "",
        e.vertexUv2s ? "#define USE_UV2" : "",
        e.vertexUv3s ? "#define USE_UV3" : "",
        e.pointsUvs ? "#define USE_POINTS_UV" : "",
        e.flatShading ? "#define FLAT_SHADED" : "",
        e.skinning ? "#define USE_SKINNING" : "",
        e.morphTargets ? "#define USE_MORPHTARGETS" : "",
        e.morphNormals && e.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
        e.morphColors && e.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
        e.morphTargetsCount > 0 && e.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
        e.morphTargetsCount > 0 && e.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "",
        e.morphTargetsCount > 0 && e.isWebGL2 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "",
        e.doubleSided ? "#define DOUBLE_SIDED" : "",
        e.flipSided ? "#define FLIP_SIDED" : "",
        e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        e.shadowMapEnabled ? "#define " + l : "",
        e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        e.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
        e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        e.logarithmicDepthBuffer && e.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
        "uniform mat4 modelMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 viewMatrix;",
        "uniform mat3 normalMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        "#ifdef USE_INSTANCING",
        "	attribute mat4 instanceMatrix;",
        "#endif",
        "#ifdef USE_INSTANCING_COLOR",
        "	attribute vec3 instanceColor;",
        "#endif",
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec2 uv;",
        "#ifdef USE_UV1",
        "	attribute vec2 uv1;",
        "#endif",
        "#ifdef USE_UV2",
        "	attribute vec2 uv2;",
        "#endif",
        "#ifdef USE_UV3",
        "	attribute vec2 uv3;",
        "#endif",
        "#ifdef USE_TANGENT",
        "	attribute vec4 tangent;",
        "#endif",
        "#if defined( USE_COLOR_ALPHA )",
        "	attribute vec4 color;",
        "#elif defined( USE_COLOR )",
        "	attribute vec3 color;",
        "#endif",
        "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
        "	attribute vec3 morphTarget0;",
        "	attribute vec3 morphTarget1;",
        "	attribute vec3 morphTarget2;",
        "	attribute vec3 morphTarget3;",
        "	#ifdef USE_MORPHNORMALS",
        "		attribute vec3 morphNormal0;",
        "		attribute vec3 morphNormal1;",
        "		attribute vec3 morphNormal2;",
        "		attribute vec3 morphNormal3;",
        "	#else",
        "		attribute vec3 morphTarget4;",
        "		attribute vec3 morphTarget5;",
        "		attribute vec3 morphTarget6;",
        "		attribute vec3 morphTarget7;",
        "	#endif",
        "#endif",
        "#ifdef USE_SKINNING",
        "	attribute vec4 skinIndex;",
        "	attribute vec4 skinWeight;",
        "#endif",
        `
`,
      ].filter(ci).join(`
`)),
      (E = [
        p,
        Do(e),
        "#define SHADER_TYPE " + e.shaderType,
        "#define SHADER_NAME " + e.shaderName,
        v,
        e.useFog && e.fog ? "#define USE_FOG" : "",
        e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
        e.map ? "#define USE_MAP" : "",
        e.matcap ? "#define USE_MATCAP" : "",
        e.envMap ? "#define USE_ENVMAP" : "",
        e.envMap ? "#define " + c : "",
        e.envMap ? "#define " + h : "",
        e.envMap ? "#define " + u : "",
        d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
        d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
        d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
        e.lightMap ? "#define USE_LIGHTMAP" : "",
        e.aoMap ? "#define USE_AOMAP" : "",
        e.bumpMap ? "#define USE_BUMPMAP" : "",
        e.normalMap ? "#define USE_NORMALMAP" : "",
        e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        e.anisotropy ? "#define USE_ANISOTROPY" : "",
        e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        e.clearcoat ? "#define USE_CLEARCOAT" : "",
        e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        e.iridescence ? "#define USE_IRIDESCENCE" : "",
        e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        e.specularMap ? "#define USE_SPECULARMAP" : "",
        e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        e.metalnessMap ? "#define USE_METALNESSMAP" : "",
        e.alphaMap ? "#define USE_ALPHAMAP" : "",
        e.alphaTest ? "#define USE_ALPHATEST" : "",
        e.alphaHash ? "#define USE_ALPHAHASH" : "",
        e.sheen ? "#define USE_SHEEN" : "",
        e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        e.transmission ? "#define USE_TRANSMISSION" : "",
        e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
        e.vertexColors || e.instancingColor ? "#define USE_COLOR" : "",
        e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        e.vertexUv1s ? "#define USE_UV1" : "",
        e.vertexUv2s ? "#define USE_UV2" : "",
        e.vertexUv3s ? "#define USE_UV3" : "",
        e.pointsUvs ? "#define USE_POINTS_UV" : "",
        e.gradientMap ? "#define USE_GRADIENTMAP" : "",
        e.flatShading ? "#define FLAT_SHADED" : "",
        e.doubleSided ? "#define DOUBLE_SIDED" : "",
        e.flipSided ? "#define FLIP_SIDED" : "",
        e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        e.shadowMapEnabled ? "#define " + l : "",
        e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        e.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
        e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        e.logarithmicDepthBuffer && e.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        e.toneMapping !== xn ? "#define TONE_MAPPING" : "",
        e.toneMapping !== xn ? Gt.tonemapping_pars_fragment : "",
        e.toneMapping !== xn ? Up("toneMapping", e.toneMapping) : "",
        e.dithering ? "#define DITHERING" : "",
        e.opaque ? "#define OPAQUE" : "",
        Gt.colorspace_pars_fragment,
        Dp("linearToOutputTexel", e.outputColorSpace),
        e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
        `
`,
      ].filter(ci).join(`
`))),
    (o = qs(o)),
    (o = Co(o, e)),
    (o = Po(o, e)),
    (a = qs(a)),
    (a = Co(a, e)),
    (a = Po(a, e)),
    (o = Lo(o)),
    (a = Lo(a)),
    e.isWebGL2 &&
      e.isRawShaderMaterial !== !0 &&
      ((_ = `#version 300 es
`),
      (f =
        [g, "precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) +
        `
` +
        f),
      (E =
        [
          "precision mediump sampler2DArray;",
          "#define varying in",
          e.glslVersion === Za ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
          e.glslVersion === Za ? "" : "#define gl_FragColor pc_fragColor",
          "#define gl_FragDepthEXT gl_FragDepth",
          "#define texture2D texture",
          "#define textureCube texture",
          "#define texture2DProj textureProj",
          "#define texture2DLodEXT textureLod",
          "#define texture2DProjLodEXT textureProjLod",
          "#define textureCubeLodEXT textureLod",
          "#define texture2DGradEXT textureGrad",
          "#define texture2DProjGradEXT textureProjGrad",
          "#define textureCubeGradEXT textureGrad",
        ].join(`
`) +
        `
` +
        E));
  const b = _ + f + o,
    U = _ + E + a,
    R = wo(r, r.VERTEX_SHADER, b),
    w = wo(r, r.FRAGMENT_SHADER, U);
  r.attachShader(m, R),
    r.attachShader(m, w),
    e.index0AttributeName !== void 0
      ? r.bindAttribLocation(m, 0, e.index0AttributeName)
      : e.morphTargets === !0 && r.bindAttribLocation(m, 0, "position"),
    r.linkProgram(m);
  function k(J) {
    if (i.debug.checkShaderErrors) {
      const lt = r.getProgramInfoLog(m).trim(),
        D = r.getShaderInfoLog(R).trim(),
        F = r.getShaderInfoLog(w).trim();
      let G = !0,
        j = !0;
      if (r.getProgramParameter(m, r.LINK_STATUS) === !1)
        if (((G = !1), typeof i.debug.onShaderError == "function")) i.debug.onShaderError(r, m, R, w);
        else {
          const Y = Ro(r, R, "vertex"),
            W = Ro(r, w, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " +
              r.getError() +
              " - VALIDATE_STATUS " +
              r.getProgramParameter(m, r.VALIDATE_STATUS) +
              `

Program Info Log: ` +
              lt +
              `
` +
              Y +
              `
` +
              W
          );
        }
      else lt !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", lt) : (D === "" || F === "") && (j = !1);
      j && (J.diagnostics = { runnable: G, programLog: lt, vertexShader: { log: D, prefix: f }, fragmentShader: { log: F, prefix: E } });
    }
    r.deleteShader(R), r.deleteShader(w), (S = new Pr(r, m)), (T = Fp(r, m));
  }
  let S;
  this.getUniforms = function () {
    return S === void 0 && k(this), S;
  };
  let T;
  this.getAttributes = function () {
    return T === void 0 && k(this), T;
  };
  let O = e.rendererExtensionParallelShaderCompile === !1;
  return (
    (this.isReady = function () {
      return O === !1 && (O = r.getProgramParameter(m, Rp)), O;
    }),
    (this.destroy = function () {
      n.releaseStatesOfProgram(this), r.deleteProgram(m), (this.program = void 0);
    }),
    (this.type = e.shaderType),
    (this.name = e.shaderName),
    (this.id = Cp++),
    (this.cacheKey = t),
    (this.usedTimes = 1),
    (this.program = m),
    (this.vertexShader = R),
    (this.fragmentShader = w),
    this
  );
}
let Zp = 0;
class Kp {
  constructor() {
    (this.shaderCache = new Map()), (this.materialCache = new Map());
  }
  update(t) {
    const e = t.vertexShader,
      n = t.fragmentShader,
      r = this._getShaderStage(e),
      s = this._getShaderStage(n),
      o = this._getShaderCacheForMaterial(t);
    return o.has(r) === !1 && (o.add(r), r.usedTimes++), o.has(s) === !1 && (o.add(s), s.usedTimes++), this;
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e) n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return n === void 0 && ((n = new Set()), e.set(t, n)), n;
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return n === void 0 && ((n = new Jp(t)), e.set(t, n)), n;
  }
}
class Jp {
  constructor(t) {
    (this.id = Zp++), (this.code = t), (this.usedTimes = 0);
  }
}
function $p(i, t, e, n, r, s, o) {
  const a = new Ml(),
    l = new Kp(),
    c = [],
    h = r.isWebGL2,
    u = r.logarithmicDepthBuffer,
    d = r.vertexTextures;
  let p = r.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite",
  };
  function v(S) {
    return S === 0 ? "uv" : `uv${S}`;
  }
  function m(S, T, O, J, lt) {
    const D = J.fog,
      F = lt.geometry,
      G = S.isMeshStandardMaterial ? J.environment : null,
      j = (S.isMeshStandardMaterial ? e : t).get(S.envMap || G),
      Y = !!j && j.mapping === Vr ? j.image.height : null,
      W = g[S.type];
    S.precision !== null &&
      ((p = r.getMaxPrecision(S.precision)),
      p !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", p, "instead."));
    const $ = F.morphAttributes.position || F.morphAttributes.normal || F.morphAttributes.color,
      Q = $ !== void 0 ? $.length : 0;
    let dt = 0;
    F.morphAttributes.position !== void 0 && (dt = 1),
      F.morphAttributes.normal !== void 0 && (dt = 2),
      F.morphAttributes.color !== void 0 && (dt = 3);
    let V, tt, pt, Et;
    if (W) {
      const se = We[W];
      (V = se.vertexShader), (tt = se.fragmentShader);
    } else (V = S.vertexShader), (tt = S.fragmentShader), l.update(S), (pt = l.getVertexShaderID(S)), (Et = l.getFragmentShaderID(S));
    const xt = i.getRenderTarget(),
      Pt = lt.isInstancedMesh === !0,
      It = lt.isBatchedMesh === !0,
      yt = !!S.map,
      Ut = !!S.matcap,
      P = !!j,
      ct = !!S.aoMap,
      q = !!S.lightMap,
      st = !!S.bumpMap,
      X = !!S.normalMap,
      Tt = !!S.displacementMap,
      mt = !!S.emissiveMap,
      M = !!S.metalnessMap,
      x = !!S.roughnessMap,
      I = S.anisotropy > 0,
      it = S.clearcoat > 0,
      et = S.iridescence > 0,
      K = S.sheen > 0,
      St = S.transmission > 0,
      ut = I && !!S.anisotropyMap,
      _t = it && !!S.clearcoatMap,
      Rt = it && !!S.clearcoatNormalMap,
      Bt = it && !!S.clearcoatRoughnessMap,
      nt = et && !!S.iridescenceMap,
      jt = et && !!S.iridescenceThicknessMap,
      Vt = K && !!S.sheenColorMap,
      Nt = K && !!S.sheenRoughnessMap,
      wt = !!S.specularMap,
      gt = !!S.specularColorMap,
      A = !!S.specularIntensityMap,
      at = St && !!S.transmissionMap,
      bt = St && !!S.thicknessMap,
      Mt = !!S.gradientMap,
      rt = !!S.alphaMap,
      L = S.alphaTest > 0,
      ot = !!S.alphaHash,
      ft = !!S.extensions,
      Lt = !!F.attributes.uv1,
      Ct = !!F.attributes.uv2,
      qt = !!F.attributes.uv3;
    let Yt = xn;
    return (
      S.toneMapped && (xt === null || xt.isXRRenderTarget === !0) && (Yt = i.toneMapping),
      {
        isWebGL2: h,
        shaderID: W,
        shaderType: S.type,
        shaderName: S.name,
        vertexShader: V,
        fragmentShader: tt,
        defines: S.defines,
        customVertexShaderID: pt,
        customFragmentShaderID: Et,
        isRawShaderMaterial: S.isRawShaderMaterial === !0,
        glslVersion: S.glslVersion,
        precision: p,
        batching: It,
        instancing: Pt,
        instancingColor: Pt && lt.instanceColor !== null,
        supportsVertexTextures: d,
        outputColorSpace: xt === null ? i.outputColorSpace : xt.isXRRenderTarget === !0 ? xt.texture.colorSpace : hn,
        map: yt,
        matcap: Ut,
        envMap: P,
        envMapMode: P && j.mapping,
        envMapCubeUVHeight: Y,
        aoMap: ct,
        lightMap: q,
        bumpMap: st,
        normalMap: X,
        displacementMap: d && Tt,
        emissiveMap: mt,
        normalMapObjectSpace: X && S.normalMapType === Yc,
        normalMapTangentSpace: X && S.normalMapType === kr,
        metalnessMap: M,
        roughnessMap: x,
        anisotropy: I,
        anisotropyMap: ut,
        clearcoat: it,
        clearcoatMap: _t,
        clearcoatNormalMap: Rt,
        clearcoatRoughnessMap: Bt,
        iridescence: et,
        iridescenceMap: nt,
        iridescenceThicknessMap: jt,
        sheen: K,
        sheenColorMap: Vt,
        sheenRoughnessMap: Nt,
        specularMap: wt,
        specularColorMap: gt,
        specularIntensityMap: A,
        transmission: St,
        transmissionMap: at,
        thicknessMap: bt,
        gradientMap: Mt,
        opaque: S.transparent === !1 && S.blending === fi,
        alphaMap: rt,
        alphaTest: L,
        alphaHash: ot,
        combine: S.combine,
        mapUv: yt && v(S.map.channel),
        aoMapUv: ct && v(S.aoMap.channel),
        lightMapUv: q && v(S.lightMap.channel),
        bumpMapUv: st && v(S.bumpMap.channel),
        normalMapUv: X && v(S.normalMap.channel),
        displacementMapUv: Tt && v(S.displacementMap.channel),
        emissiveMapUv: mt && v(S.emissiveMap.channel),
        metalnessMapUv: M && v(S.metalnessMap.channel),
        roughnessMapUv: x && v(S.roughnessMap.channel),
        anisotropyMapUv: ut && v(S.anisotropyMap.channel),
        clearcoatMapUv: _t && v(S.clearcoatMap.channel),
        clearcoatNormalMapUv: Rt && v(S.clearcoatNormalMap.channel),
        clearcoatRoughnessMapUv: Bt && v(S.clearcoatRoughnessMap.channel),
        iridescenceMapUv: nt && v(S.iridescenceMap.channel),
        iridescenceThicknessMapUv: jt && v(S.iridescenceThicknessMap.channel),
        sheenColorMapUv: Vt && v(S.sheenColorMap.channel),
        sheenRoughnessMapUv: Nt && v(S.sheenRoughnessMap.channel),
        specularMapUv: wt && v(S.specularMap.channel),
        specularColorMapUv: gt && v(S.specularColorMap.channel),
        specularIntensityMapUv: A && v(S.specularIntensityMap.channel),
        transmissionMapUv: at && v(S.transmissionMap.channel),
        thicknessMapUv: bt && v(S.thicknessMap.channel),
        alphaMapUv: rt && v(S.alphaMap.channel),
        vertexTangents: !!F.attributes.tangent && (X || I),
        vertexColors: S.vertexColors,
        vertexAlphas: S.vertexColors === !0 && !!F.attributes.color && F.attributes.color.itemSize === 4,
        vertexUv1s: Lt,
        vertexUv2s: Ct,
        vertexUv3s: qt,
        pointsUvs: lt.isPoints === !0 && !!F.attributes.uv && (yt || rt),
        fog: !!D,
        useFog: S.fog === !0,
        fogExp2: D && D.isFogExp2,
        flatShading: S.flatShading === !0,
        sizeAttenuation: S.sizeAttenuation === !0,
        logarithmicDepthBuffer: u,
        skinning: lt.isSkinnedMesh === !0,
        morphTargets: F.morphAttributes.position !== void 0,
        morphNormals: F.morphAttributes.normal !== void 0,
        morphColors: F.morphAttributes.color !== void 0,
        morphTargetsCount: Q,
        morphTextureStride: dt,
        numDirLights: T.directional.length,
        numPointLights: T.point.length,
        numSpotLights: T.spot.length,
        numSpotLightMaps: T.spotLightMap.length,
        numRectAreaLights: T.rectArea.length,
        numHemiLights: T.hemi.length,
        numDirLightShadows: T.directionalShadowMap.length,
        numPointLightShadows: T.pointShadowMap.length,
        numSpotLightShadows: T.spotShadowMap.length,
        numSpotLightShadowsWithMaps: T.numSpotLightShadowsWithMaps,
        numLightProbes: T.numLightProbes,
        numClippingPlanes: o.numPlanes,
        numClipIntersection: o.numIntersection,
        dithering: S.dithering,
        shadowMapEnabled: i.shadowMap.enabled && O.length > 0,
        shadowMapType: i.shadowMap.type,
        toneMapping: Yt,
        useLegacyLights: i._useLegacyLights,
        decodeVideoTexture: yt && S.map.isVideoTexture === !0 && Jt.getTransfer(S.map.colorSpace) === $t,
        premultipliedAlpha: S.premultipliedAlpha,
        doubleSided: S.side === sn,
        flipSided: S.side === Te,
        useDepthPacking: S.depthPacking >= 0,
        depthPacking: S.depthPacking || 0,
        index0AttributeName: S.index0AttributeName,
        extensionDerivatives: ft && S.extensions.derivatives === !0,
        extensionFragDepth: ft && S.extensions.fragDepth === !0,
        extensionDrawBuffers: ft && S.extensions.drawBuffers === !0,
        extensionShaderTextureLOD: ft && S.extensions.shaderTextureLOD === !0,
        extensionClipCullDistance: ft && S.extensions.clipCullDistance && n.has("WEBGL_clip_cull_distance"),
        rendererExtensionFragDepth: h || n.has("EXT_frag_depth"),
        rendererExtensionDrawBuffers: h || n.has("WEBGL_draw_buffers"),
        rendererExtensionShaderTextureLod: h || n.has("EXT_shader_texture_lod"),
        rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
        customProgramCacheKey: S.customProgramCacheKey(),
      }
    );
  }
  function f(S) {
    const T = [];
    if ((S.shaderID ? T.push(S.shaderID) : (T.push(S.customVertexShaderID), T.push(S.customFragmentShaderID)), S.defines !== void 0))
      for (const O in S.defines) T.push(O), T.push(S.defines[O]);
    return S.isRawShaderMaterial === !1 && (E(T, S), _(T, S), T.push(i.outputColorSpace)), T.push(S.customProgramCacheKey), T.join();
  }
  function E(S, T) {
    S.push(T.precision),
      S.push(T.outputColorSpace),
      S.push(T.envMapMode),
      S.push(T.envMapCubeUVHeight),
      S.push(T.mapUv),
      S.push(T.alphaMapUv),
      S.push(T.lightMapUv),
      S.push(T.aoMapUv),
      S.push(T.bumpMapUv),
      S.push(T.normalMapUv),
      S.push(T.displacementMapUv),
      S.push(T.emissiveMapUv),
      S.push(T.metalnessMapUv),
      S.push(T.roughnessMapUv),
      S.push(T.anisotropyMapUv),
      S.push(T.clearcoatMapUv),
      S.push(T.clearcoatNormalMapUv),
      S.push(T.clearcoatRoughnessMapUv),
      S.push(T.iridescenceMapUv),
      S.push(T.iridescenceThicknessMapUv),
      S.push(T.sheenColorMapUv),
      S.push(T.sheenRoughnessMapUv),
      S.push(T.specularMapUv),
      S.push(T.specularColorMapUv),
      S.push(T.specularIntensityMapUv),
      S.push(T.transmissionMapUv),
      S.push(T.thicknessMapUv),
      S.push(T.combine),
      S.push(T.fogExp2),
      S.push(T.sizeAttenuation),
      S.push(T.morphTargetsCount),
      S.push(T.morphAttributeCount),
      S.push(T.numDirLights),
      S.push(T.numPointLights),
      S.push(T.numSpotLights),
      S.push(T.numSpotLightMaps),
      S.push(T.numHemiLights),
      S.push(T.numRectAreaLights),
      S.push(T.numDirLightShadows),
      S.push(T.numPointLightShadows),
      S.push(T.numSpotLightShadows),
      S.push(T.numSpotLightShadowsWithMaps),
      S.push(T.numLightProbes),
      S.push(T.shadowMapType),
      S.push(T.toneMapping),
      S.push(T.numClippingPlanes),
      S.push(T.numClipIntersection),
      S.push(T.depthPacking);
  }
  function _(S, T) {
    a.disableAll(),
      T.isWebGL2 && a.enable(0),
      T.supportsVertexTextures && a.enable(1),
      T.instancing && a.enable(2),
      T.instancingColor && a.enable(3),
      T.matcap && a.enable(4),
      T.envMap && a.enable(5),
      T.normalMapObjectSpace && a.enable(6),
      T.normalMapTangentSpace && a.enable(7),
      T.clearcoat && a.enable(8),
      T.iridescence && a.enable(9),
      T.alphaTest && a.enable(10),
      T.vertexColors && a.enable(11),
      T.vertexAlphas && a.enable(12),
      T.vertexUv1s && a.enable(13),
      T.vertexUv2s && a.enable(14),
      T.vertexUv3s && a.enable(15),
      T.vertexTangents && a.enable(16),
      T.anisotropy && a.enable(17),
      T.alphaHash && a.enable(18),
      T.batching && a.enable(19),
      S.push(a.mask),
      a.disableAll(),
      T.fog && a.enable(0),
      T.useFog && a.enable(1),
      T.flatShading && a.enable(2),
      T.logarithmicDepthBuffer && a.enable(3),
      T.skinning && a.enable(4),
      T.morphTargets && a.enable(5),
      T.morphNormals && a.enable(6),
      T.morphColors && a.enable(7),
      T.premultipliedAlpha && a.enable(8),
      T.shadowMapEnabled && a.enable(9),
      T.useLegacyLights && a.enable(10),
      T.doubleSided && a.enable(11),
      T.flipSided && a.enable(12),
      T.useDepthPacking && a.enable(13),
      T.dithering && a.enable(14),
      T.transmission && a.enable(15),
      T.sheen && a.enable(16),
      T.opaque && a.enable(17),
      T.pointsUvs && a.enable(18),
      T.decodeVideoTexture && a.enable(19),
      S.push(a.mask);
  }
  function b(S) {
    const T = g[S.type];
    let O;
    if (T) {
      const J = We[T];
      O = Br.clone(J.uniforms);
    } else O = S.uniforms;
    return O;
  }
  function U(S, T) {
    let O;
    for (let J = 0, lt = c.length; J < lt; J++) {
      const D = c[J];
      if (D.cacheKey === T) {
        (O = D), ++O.usedTimes;
        break;
      }
    }
    return O === void 0 && ((O = new jp(i, T, S, s)), c.push(O)), O;
  }
  function R(S) {
    if (--S.usedTimes === 0) {
      const T = c.indexOf(S);
      (c[T] = c[c.length - 1]), c.pop(), S.destroy();
    }
  }
  function w(S) {
    l.remove(S);
  }
  function k() {
    l.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: f,
    getUniforms: b,
    acquireProgram: U,
    releaseProgram: R,
    releaseShaderCache: w,
    programs: c,
    dispose: k,
  };
}
function Qp() {
  let i = new WeakMap();
  function t(s) {
    let o = i.get(s);
    return o === void 0 && ((o = {}), i.set(s, o)), o;
  }
  function e(s) {
    i.delete(s);
  }
  function n(s, o, a) {
    i.get(s)[o] = a;
  }
  function r() {
    i = new WeakMap();
  }
  return { get: t, remove: e, update: n, dispose: r };
}
function tm(i, t) {
  return i.groupOrder !== t.groupOrder
    ? i.groupOrder - t.groupOrder
    : i.renderOrder !== t.renderOrder
    ? i.renderOrder - t.renderOrder
    : i.material.id !== t.material.id
    ? i.material.id - t.material.id
    : i.z !== t.z
    ? i.z - t.z
    : i.id - t.id;
}
function Uo(i, t) {
  return i.groupOrder !== t.groupOrder
    ? i.groupOrder - t.groupOrder
    : i.renderOrder !== t.renderOrder
    ? i.renderOrder - t.renderOrder
    : i.z !== t.z
    ? t.z - i.z
    : i.id - t.id;
}
function Io() {
  const i = [];
  let t = 0;
  const e = [],
    n = [],
    r = [];
  function s() {
    (t = 0), (e.length = 0), (n.length = 0), (r.length = 0);
  }
  function o(u, d, p, g, v, m) {
    let f = i[t];
    return (
      f === void 0
        ? ((f = { id: u.id, object: u, geometry: d, material: p, groupOrder: g, renderOrder: u.renderOrder, z: v, group: m }), (i[t] = f))
        : ((f.id = u.id),
          (f.object = u),
          (f.geometry = d),
          (f.material = p),
          (f.groupOrder = g),
          (f.renderOrder = u.renderOrder),
          (f.z = v),
          (f.group = m)),
      t++,
      f
    );
  }
  function a(u, d, p, g, v, m) {
    const f = o(u, d, p, g, v, m);
    p.transmission > 0 ? n.push(f) : p.transparent === !0 ? r.push(f) : e.push(f);
  }
  function l(u, d, p, g, v, m) {
    const f = o(u, d, p, g, v, m);
    p.transmission > 0 ? n.unshift(f) : p.transparent === !0 ? r.unshift(f) : e.unshift(f);
  }
  function c(u, d) {
    e.length > 1 && e.sort(u || tm), n.length > 1 && n.sort(d || Uo), r.length > 1 && r.sort(d || Uo);
  }
  function h() {
    for (let u = t, d = i.length; u < d; u++) {
      const p = i[u];
      if (p.id === null) break;
      (p.id = null), (p.object = null), (p.geometry = null), (p.material = null), (p.group = null);
    }
  }
  return { opaque: e, transmissive: n, transparent: r, init: s, push: a, unshift: l, finish: h, sort: c };
}
function em() {
  let i = new WeakMap();
  function t(n, r) {
    const s = i.get(n);
    let o;
    return s === void 0 ? ((o = new Io()), i.set(n, [o])) : r >= s.length ? ((o = new Io()), s.push(o)) : (o = s[r]), o;
  }
  function e() {
    i = new WeakMap();
  }
  return { get: t, dispose: e };
}
function nm() {
  const i = {};
  return {
    get: function (t) {
      if (i[t.id] !== void 0) return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = { direction: new C(), color: new Ft() };
          break;
        case "SpotLight":
          e = { position: new C(), direction: new C(), color: new Ft(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
          break;
        case "PointLight":
          e = { position: new C(), color: new Ft(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          e = { direction: new C(), skyColor: new Ft(), groundColor: new Ft() };
          break;
        case "RectAreaLight":
          e = { color: new Ft(), position: new C(), halfWidth: new C(), halfHeight: new C() };
          break;
      }
      return (i[t.id] = e), e;
    },
  };
}
function im() {
  const i = {};
  return {
    get: function (t) {
      if (i[t.id] !== void 0) return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Z() };
          break;
        case "SpotLight":
          e = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Z() };
          break;
        case "PointLight":
          e = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Z(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
          break;
      }
      return (i[t.id] = e), e;
    },
  };
}
let rm = 0;
function sm(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function am(i, t) {
  const e = new nm(),
    n = im(),
    r = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0,
    };
  for (let h = 0; h < 9; h++) r.probe.push(new C());
  const s = new C(),
    o = new te(),
    a = new te();
  function l(h, u) {
    let d = 0,
      p = 0,
      g = 0;
    for (let J = 0; J < 9; J++) r.probe[J].set(0, 0, 0);
    let v = 0,
      m = 0,
      f = 0,
      E = 0,
      _ = 0,
      b = 0,
      U = 0,
      R = 0,
      w = 0,
      k = 0,
      S = 0;
    h.sort(sm);
    const T = u === !0 ? Math.PI : 1;
    for (let J = 0, lt = h.length; J < lt; J++) {
      const D = h[J],
        F = D.color,
        G = D.intensity,
        j = D.distance,
        Y = D.shadow && D.shadow.map ? D.shadow.map.texture : null;
      if (D.isAmbientLight) (d += F.r * G * T), (p += F.g * G * T), (g += F.b * G * T);
      else if (D.isLightProbe) {
        for (let W = 0; W < 9; W++) r.probe[W].addScaledVector(D.sh.coefficients[W], G);
        S++;
      } else if (D.isDirectionalLight) {
        const W = e.get(D);
        if ((W.color.copy(D.color).multiplyScalar(D.intensity * T), D.castShadow)) {
          const $ = D.shadow,
            Q = n.get(D);
          (Q.shadowBias = $.bias),
            (Q.shadowNormalBias = $.normalBias),
            (Q.shadowRadius = $.radius),
            (Q.shadowMapSize = $.mapSize),
            (r.directionalShadow[v] = Q),
            (r.directionalShadowMap[v] = Y),
            (r.directionalShadowMatrix[v] = D.shadow.matrix),
            b++;
        }
        (r.directional[v] = W), v++;
      } else if (D.isSpotLight) {
        const W = e.get(D);
        W.position.setFromMatrixPosition(D.matrixWorld),
          W.color.copy(F).multiplyScalar(G * T),
          (W.distance = j),
          (W.coneCos = Math.cos(D.angle)),
          (W.penumbraCos = Math.cos(D.angle * (1 - D.penumbra))),
          (W.decay = D.decay),
          (r.spot[f] = W);
        const $ = D.shadow;
        if (
          (D.map && ((r.spotLightMap[w] = D.map), w++, $.updateMatrices(D), D.castShadow && k++), (r.spotLightMatrix[f] = $.matrix), D.castShadow)
        ) {
          const Q = n.get(D);
          (Q.shadowBias = $.bias),
            (Q.shadowNormalBias = $.normalBias),
            (Q.shadowRadius = $.radius),
            (Q.shadowMapSize = $.mapSize),
            (r.spotShadow[f] = Q),
            (r.spotShadowMap[f] = Y),
            R++;
        }
        f++;
      } else if (D.isRectAreaLight) {
        const W = e.get(D);
        W.color.copy(F).multiplyScalar(G), W.halfWidth.set(D.width * 0.5, 0, 0), W.halfHeight.set(0, D.height * 0.5, 0), (r.rectArea[E] = W), E++;
      } else if (D.isPointLight) {
        const W = e.get(D);
        if ((W.color.copy(D.color).multiplyScalar(D.intensity * T), (W.distance = D.distance), (W.decay = D.decay), D.castShadow)) {
          const $ = D.shadow,
            Q = n.get(D);
          (Q.shadowBias = $.bias),
            (Q.shadowNormalBias = $.normalBias),
            (Q.shadowRadius = $.radius),
            (Q.shadowMapSize = $.mapSize),
            (Q.shadowCameraNear = $.camera.near),
            (Q.shadowCameraFar = $.camera.far),
            (r.pointShadow[m] = Q),
            (r.pointShadowMap[m] = Y),
            (r.pointShadowMatrix[m] = D.shadow.matrix),
            U++;
        }
        (r.point[m] = W), m++;
      } else if (D.isHemisphereLight) {
        const W = e.get(D);
        W.skyColor.copy(D.color).multiplyScalar(G * T), W.groundColor.copy(D.groundColor).multiplyScalar(G * T), (r.hemi[_] = W), _++;
      }
    }
    E > 0 &&
      (t.isWebGL2
        ? i.has("OES_texture_float_linear") === !0
          ? ((r.rectAreaLTC1 = ht.LTC_FLOAT_1), (r.rectAreaLTC2 = ht.LTC_FLOAT_2))
          : ((r.rectAreaLTC1 = ht.LTC_HALF_1), (r.rectAreaLTC2 = ht.LTC_HALF_2))
        : i.has("OES_texture_float_linear") === !0
        ? ((r.rectAreaLTC1 = ht.LTC_FLOAT_1), (r.rectAreaLTC2 = ht.LTC_FLOAT_2))
        : i.has("OES_texture_half_float_linear") === !0
        ? ((r.rectAreaLTC1 = ht.LTC_HALF_1), (r.rectAreaLTC2 = ht.LTC_HALF_2))
        : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),
      (r.ambient[0] = d),
      (r.ambient[1] = p),
      (r.ambient[2] = g);
    const O = r.hash;
    (O.directionalLength !== v ||
      O.pointLength !== m ||
      O.spotLength !== f ||
      O.rectAreaLength !== E ||
      O.hemiLength !== _ ||
      O.numDirectionalShadows !== b ||
      O.numPointShadows !== U ||
      O.numSpotShadows !== R ||
      O.numSpotMaps !== w ||
      O.numLightProbes !== S) &&
      ((r.directional.length = v),
      (r.spot.length = f),
      (r.rectArea.length = E),
      (r.point.length = m),
      (r.hemi.length = _),
      (r.directionalShadow.length = b),
      (r.directionalShadowMap.length = b),
      (r.pointShadow.length = U),
      (r.pointShadowMap.length = U),
      (r.spotShadow.length = R),
      (r.spotShadowMap.length = R),
      (r.directionalShadowMatrix.length = b),
      (r.pointShadowMatrix.length = U),
      (r.spotLightMatrix.length = R + w - k),
      (r.spotLightMap.length = w),
      (r.numSpotLightShadowsWithMaps = k),
      (r.numLightProbes = S),
      (O.directionalLength = v),
      (O.pointLength = m),
      (O.spotLength = f),
      (O.rectAreaLength = E),
      (O.hemiLength = _),
      (O.numDirectionalShadows = b),
      (O.numPointShadows = U),
      (O.numSpotShadows = R),
      (O.numSpotMaps = w),
      (O.numLightProbes = S),
      (r.version = rm++));
  }
  function c(h, u) {
    let d = 0,
      p = 0,
      g = 0,
      v = 0,
      m = 0;
    const f = u.matrixWorldInverse;
    for (let E = 0, _ = h.length; E < _; E++) {
      const b = h[E];
      if (b.isDirectionalLight) {
        const U = r.directional[d];
        U.direction.setFromMatrixPosition(b.matrixWorld),
          s.setFromMatrixPosition(b.target.matrixWorld),
          U.direction.sub(s),
          U.direction.transformDirection(f),
          d++;
      } else if (b.isSpotLight) {
        const U = r.spot[g];
        U.position.setFromMatrixPosition(b.matrixWorld),
          U.position.applyMatrix4(f),
          U.direction.setFromMatrixPosition(b.matrixWorld),
          s.setFromMatrixPosition(b.target.matrixWorld),
          U.direction.sub(s),
          U.direction.transformDirection(f),
          g++;
      } else if (b.isRectAreaLight) {
        const U = r.rectArea[v];
        U.position.setFromMatrixPosition(b.matrixWorld),
          U.position.applyMatrix4(f),
          a.identity(),
          o.copy(b.matrixWorld),
          o.premultiply(f),
          a.extractRotation(o),
          U.halfWidth.set(b.width * 0.5, 0, 0),
          U.halfHeight.set(0, b.height * 0.5, 0),
          U.halfWidth.applyMatrix4(a),
          U.halfHeight.applyMatrix4(a),
          v++;
      } else if (b.isPointLight) {
        const U = r.point[p];
        U.position.setFromMatrixPosition(b.matrixWorld), U.position.applyMatrix4(f), p++;
      } else if (b.isHemisphereLight) {
        const U = r.hemi[m];
        U.direction.setFromMatrixPosition(b.matrixWorld), U.direction.transformDirection(f), m++;
      }
    }
  }
  return { setup: l, setupView: c, state: r };
}
function No(i, t) {
  const e = new am(i, t),
    n = [],
    r = [];
  function s() {
    (n.length = 0), (r.length = 0);
  }
  function o(u) {
    n.push(u);
  }
  function a(u) {
    r.push(u);
  }
  function l(u) {
    e.setup(n, u);
  }
  function c(u) {
    e.setupView(n, u);
  }
  return { init: s, state: { lightsArray: n, shadowsArray: r, lights: e }, setupLights: l, setupLightsView: c, pushLight: o, pushShadow: a };
}
function om(i, t) {
  let e = new WeakMap();
  function n(s, o = 0) {
    const a = e.get(s);
    let l;
    return a === void 0 ? ((l = new No(i, t)), e.set(s, [l])) : o >= a.length ? ((l = new No(i, t)), a.push(l)) : (l = a[o]), l;
  }
  function r() {
    e = new WeakMap();
  }
  return { get: n, dispose: r };
}
class lm extends je {
  constructor(t) {
    super(),
      (this.isMeshDepthMaterial = !0),
      (this.type = "MeshDepthMaterial"),
      (this.depthPacking = Xc),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      (this.depthPacking = t.depthPacking),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      this
    );
  }
}
class cm extends je {
  constructor(t) {
    super(),
      (this.isMeshDistanceMaterial = !0),
      (this.type = "MeshDistanceMaterial"),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      this
    );
  }
}
const hm = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  um = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function fm(i, t, e) {
  let n = new ia();
  const r = new Z(),
    s = new Z(),
    o = new Qt(),
    a = new lm({ depthPacking: qc }),
    l = new cm(),
    c = {},
    h = e.maxTextureSize,
    u = { [Sn]: Te, [Te]: Sn, [sn]: sn },
    d = new Re({
      defines: { VSM_SAMPLES: 8 },
      uniforms: { shadow_pass: { value: null }, resolution: { value: new Z() }, radius: { value: 4 } },
      vertexShader: hm,
      fragmentShader: um,
    }),
    p = d.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const g = new Ce();
  g.setAttribute("position", new Ve(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  const v = new on(g, d),
    m = this;
  (this.enabled = !1), (this.autoUpdate = !0), (this.needsUpdate = !1), (this.type = sl);
  let f = this.type;
  this.render = function (R, w, k) {
    if (m.enabled === !1 || (m.autoUpdate === !1 && m.needsUpdate === !1) || R.length === 0) return;
    const S = i.getRenderTarget(),
      T = i.getActiveCubeFace(),
      O = i.getActiveMipmapLevel(),
      J = i.state;
    J.setBlending(ln), J.buffers.color.setClear(1, 1, 1, 1), J.buffers.depth.setTest(!0), J.setScissorTest(!1);
    const lt = f !== rn && this.type === rn,
      D = f === rn && this.type !== rn;
    for (let F = 0, G = R.length; F < G; F++) {
      const j = R[F],
        Y = j.shadow;
      if (Y === void 0) {
        console.warn("THREE.WebGLShadowMap:", j, "has no shadow.");
        continue;
      }
      if (Y.autoUpdate === !1 && Y.needsUpdate === !1) continue;
      r.copy(Y.mapSize);
      const W = Y.getFrameExtents();
      if (
        (r.multiply(W),
        s.copy(Y.mapSize),
        (r.x > h || r.y > h) &&
          (r.x > h && ((s.x = Math.floor(h / W.x)), (r.x = s.x * W.x), (Y.mapSize.x = s.x)),
          r.y > h && ((s.y = Math.floor(h / W.y)), (r.y = s.y * W.y), (Y.mapSize.y = s.y))),
        Y.map === null || lt === !0 || D === !0)
      ) {
        const Q = this.type !== rn ? { minFilter: me, magFilter: me } : {};
        Y.map !== null && Y.map.dispose(),
          (Y.map = new Ge(r.x, r.y, Q)),
          (Y.map.texture.name = j.name + ".shadowMap"),
          Y.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(Y.map), i.clear();
      const $ = Y.getViewportCount();
      for (let Q = 0; Q < $; Q++) {
        const dt = Y.getViewport(Q);
        o.set(s.x * dt.x, s.y * dt.y, s.x * dt.z, s.y * dt.w),
          J.viewport(o),
          Y.updateMatrices(j, Q),
          (n = Y.getFrustum()),
          b(w, k, Y.camera, j, this.type);
      }
      Y.isPointLightShadow !== !0 && this.type === rn && E(Y, k), (Y.needsUpdate = !1);
    }
    (f = this.type), (m.needsUpdate = !1), i.setRenderTarget(S, T, O);
  };
  function E(R, w) {
    const k = t.update(v);
    d.defines.VSM_SAMPLES !== R.blurSamples &&
      ((d.defines.VSM_SAMPLES = R.blurSamples), (p.defines.VSM_SAMPLES = R.blurSamples), (d.needsUpdate = !0), (p.needsUpdate = !0)),
      R.mapPass === null && (R.mapPass = new Ge(r.x, r.y)),
      (d.uniforms.shadow_pass.value = R.map.texture),
      (d.uniforms.resolution.value = R.mapSize),
      (d.uniforms.radius.value = R.radius),
      i.setRenderTarget(R.mapPass),
      i.clear(),
      i.renderBufferDirect(w, null, k, d, v, null),
      (p.uniforms.shadow_pass.value = R.mapPass.texture),
      (p.uniforms.resolution.value = R.mapSize),
      (p.uniforms.radius.value = R.radius),
      i.setRenderTarget(R.map),
      i.clear(),
      i.renderBufferDirect(w, null, k, p, v, null);
  }
  function _(R, w, k, S) {
    let T = null;
    const O = k.isPointLight === !0 ? R.customDistanceMaterial : R.customDepthMaterial;
    if (O !== void 0) T = O;
    else if (
      ((T = k.isPointLight === !0 ? l : a),
      (i.localClippingEnabled && w.clipShadows === !0 && Array.isArray(w.clippingPlanes) && w.clippingPlanes.length !== 0) ||
        (w.displacementMap && w.displacementScale !== 0) ||
        (w.alphaMap && w.alphaTest > 0) ||
        (w.map && w.alphaTest > 0))
    ) {
      const J = T.uuid,
        lt = w.uuid;
      let D = c[J];
      D === void 0 && ((D = {}), (c[J] = D));
      let F = D[lt];
      F === void 0 && ((F = T.clone()), (D[lt] = F), w.addEventListener("dispose", U)), (T = F);
    }
    if (
      ((T.visible = w.visible),
      (T.wireframe = w.wireframe),
      S === rn ? (T.side = w.shadowSide !== null ? w.shadowSide : w.side) : (T.side = w.shadowSide !== null ? w.shadowSide : u[w.side]),
      (T.alphaMap = w.alphaMap),
      (T.alphaTest = w.alphaTest),
      (T.map = w.map),
      (T.clipShadows = w.clipShadows),
      (T.clippingPlanes = w.clippingPlanes),
      (T.clipIntersection = w.clipIntersection),
      (T.displacementMap = w.displacementMap),
      (T.displacementScale = w.displacementScale),
      (T.displacementBias = w.displacementBias),
      (T.wireframeLinewidth = w.wireframeLinewidth),
      (T.linewidth = w.linewidth),
      k.isPointLight === !0 && T.isMeshDistanceMaterial === !0)
    ) {
      const J = i.properties.get(T);
      J.light = k;
    }
    return T;
  }
  function b(R, w, k, S, T) {
    if (R.visible === !1) return;
    if (
      R.layers.test(w.layers) &&
      (R.isMesh || R.isLine || R.isPoints) &&
      (R.castShadow || (R.receiveShadow && T === rn)) &&
      (!R.frustumCulled || n.intersectsObject(R))
    ) {
      R.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, R.matrixWorld);
      const lt = t.update(R),
        D = R.material;
      if (Array.isArray(D)) {
        const F = lt.groups;
        for (let G = 0, j = F.length; G < j; G++) {
          const Y = F[G],
            W = D[Y.materialIndex];
          if (W && W.visible) {
            const $ = _(R, W, S, T);
            R.onBeforeShadow(i, R, w, k, lt, $, Y), i.renderBufferDirect(k, null, lt, $, R, Y), R.onAfterShadow(i, R, w, k, lt, $, Y);
          }
        }
      } else if (D.visible) {
        const F = _(R, D, S, T);
        R.onBeforeShadow(i, R, w, k, lt, F, null), i.renderBufferDirect(k, null, lt, F, R, null), R.onAfterShadow(i, R, w, k, lt, F, null);
      }
    }
    const J = R.children;
    for (let lt = 0, D = J.length; lt < D; lt++) b(J[lt], w, k, S, T);
  }
  function U(R) {
    R.target.removeEventListener("dispose", U);
    for (const k in c) {
      const S = c[k],
        T = R.target.uuid;
      T in S && (S[T].dispose(), delete S[T]);
    }
  }
}
function dm(i, t, e) {
  const n = e.isWebGL2;
  function r() {
    let L = !1;
    const ot = new Qt();
    let ft = null;
    const Lt = new Qt(0, 0, 0, 0);
    return {
      setMask: function (Ct) {
        ft !== Ct && !L && (i.colorMask(Ct, Ct, Ct, Ct), (ft = Ct));
      },
      setLocked: function (Ct) {
        L = Ct;
      },
      setClear: function (Ct, qt, Yt, ie, se) {
        se === !0 && ((Ct *= ie), (qt *= ie), (Yt *= ie)),
          ot.set(Ct, qt, Yt, ie),
          Lt.equals(ot) === !1 && (i.clearColor(Ct, qt, Yt, ie), Lt.copy(ot));
      },
      reset: function () {
        (L = !1), (ft = null), Lt.set(-1, 0, 0, 0);
      },
    };
  }
  function s() {
    let L = !1,
      ot = null,
      ft = null,
      Lt = null;
    return {
      setTest: function (Ct) {
        Ct ? It(i.DEPTH_TEST) : yt(i.DEPTH_TEST);
      },
      setMask: function (Ct) {
        ot !== Ct && !L && (i.depthMask(Ct), (ot = Ct));
      },
      setFunc: function (Ct) {
        if (ft !== Ct) {
          switch (Ct) {
            case Sc:
              i.depthFunc(i.NEVER);
              break;
            case yc:
              i.depthFunc(i.ALWAYS);
              break;
            case Ec:
              i.depthFunc(i.LESS);
              break;
            case Dr:
              i.depthFunc(i.LEQUAL);
              break;
            case Tc:
              i.depthFunc(i.EQUAL);
              break;
            case bc:
              i.depthFunc(i.GEQUAL);
              break;
            case Ac:
              i.depthFunc(i.GREATER);
              break;
            case wc:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          ft = Ct;
        }
      },
      setLocked: function (Ct) {
        L = Ct;
      },
      setClear: function (Ct) {
        Lt !== Ct && (i.clearDepth(Ct), (Lt = Ct));
      },
      reset: function () {
        (L = !1), (ot = null), (ft = null), (Lt = null);
      },
    };
  }
  function o() {
    let L = !1,
      ot = null,
      ft = null,
      Lt = null,
      Ct = null,
      qt = null,
      Yt = null,
      ie = null,
      se = null;
    return {
      setTest: function (Zt) {
        L || (Zt ? It(i.STENCIL_TEST) : yt(i.STENCIL_TEST));
      },
      setMask: function (Zt) {
        ot !== Zt && !L && (i.stencilMask(Zt), (ot = Zt));
      },
      setFunc: function (Zt, le, ke) {
        (ft !== Zt || Lt !== le || Ct !== ke) && (i.stencilFunc(Zt, le, ke), (ft = Zt), (Lt = le), (Ct = ke));
      },
      setOp: function (Zt, le, ke) {
        (qt !== Zt || Yt !== le || ie !== ke) && (i.stencilOp(Zt, le, ke), (qt = Zt), (Yt = le), (ie = ke));
      },
      setLocked: function (Zt) {
        L = Zt;
      },
      setClear: function (Zt) {
        se !== Zt && (i.clearStencil(Zt), (se = Zt));
      },
      reset: function () {
        (L = !1), (ot = null), (ft = null), (Lt = null), (Ct = null), (qt = null), (Yt = null), (ie = null), (se = null);
      },
    };
  }
  const a = new r(),
    l = new s(),
    c = new o(),
    h = new WeakMap(),
    u = new WeakMap();
  let d = {},
    p = {},
    g = new WeakMap(),
    v = [],
    m = null,
    f = !1,
    E = null,
    _ = null,
    b = null,
    U = null,
    R = null,
    w = null,
    k = null,
    S = new Ft(0, 0, 0),
    T = 0,
    O = !1,
    J = null,
    lt = null,
    D = null,
    F = null,
    G = null;
  const j = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let Y = !1,
    W = 0;
  const $ = i.getParameter(i.VERSION);
  $.indexOf("WebGL") !== -1
    ? ((W = parseFloat(/^WebGL (\d)/.exec($)[1])), (Y = W >= 1))
    : $.indexOf("OpenGL ES") !== -1 && ((W = parseFloat(/^OpenGL ES (\d)/.exec($)[1])), (Y = W >= 2));
  let Q = null,
    dt = {};
  const V = i.getParameter(i.SCISSOR_BOX),
    tt = i.getParameter(i.VIEWPORT),
    pt = new Qt().fromArray(V),
    Et = new Qt().fromArray(tt);
  function xt(L, ot, ft, Lt) {
    const Ct = new Uint8Array(4),
      qt = i.createTexture();
    i.bindTexture(L, qt), i.texParameteri(L, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(L, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Yt = 0; Yt < ft; Yt++)
      n && (L === i.TEXTURE_3D || L === i.TEXTURE_2D_ARRAY)
        ? i.texImage3D(ot, 0, i.RGBA, 1, 1, Lt, 0, i.RGBA, i.UNSIGNED_BYTE, Ct)
        : i.texImage2D(ot + Yt, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, Ct);
    return qt;
  }
  const Pt = {};
  (Pt[i.TEXTURE_2D] = xt(i.TEXTURE_2D, i.TEXTURE_2D, 1)),
    (Pt[i.TEXTURE_CUBE_MAP] = xt(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6)),
    n && ((Pt[i.TEXTURE_2D_ARRAY] = xt(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1)), (Pt[i.TEXTURE_3D] = xt(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1))),
    a.setClear(0, 0, 0, 1),
    l.setClear(1),
    c.setClear(0),
    It(i.DEPTH_TEST),
    l.setFunc(Dr),
    mt(!1),
    M(_a),
    It(i.CULL_FACE),
    X(ln);
  function It(L) {
    d[L] !== !0 && (i.enable(L), (d[L] = !0));
  }
  function yt(L) {
    d[L] !== !1 && (i.disable(L), (d[L] = !1));
  }
  function Ut(L, ot) {
    return p[L] !== ot
      ? (i.bindFramebuffer(L, ot),
        (p[L] = ot),
        n && (L === i.DRAW_FRAMEBUFFER && (p[i.FRAMEBUFFER] = ot), L === i.FRAMEBUFFER && (p[i.DRAW_FRAMEBUFFER] = ot)),
        !0)
      : !1;
  }
  function P(L, ot) {
    let ft = v,
      Lt = !1;
    if (L)
      if (((ft = g.get(ot)), ft === void 0 && ((ft = []), g.set(ot, ft)), L.isWebGLMultipleRenderTargets)) {
        const Ct = L.texture;
        if (ft.length !== Ct.length || ft[0] !== i.COLOR_ATTACHMENT0) {
          for (let qt = 0, Yt = Ct.length; qt < Yt; qt++) ft[qt] = i.COLOR_ATTACHMENT0 + qt;
          (ft.length = Ct.length), (Lt = !0);
        }
      } else ft[0] !== i.COLOR_ATTACHMENT0 && ((ft[0] = i.COLOR_ATTACHMENT0), (Lt = !0));
    else ft[0] !== i.BACK && ((ft[0] = i.BACK), (Lt = !0));
    Lt && (e.isWebGL2 ? i.drawBuffers(ft) : t.get("WEBGL_draw_buffers").drawBuffersWEBGL(ft));
  }
  function ct(L) {
    return m !== L ? (i.useProgram(L), (m = L), !0) : !1;
  }
  const q = { [Dn]: i.FUNC_ADD, [ac]: i.FUNC_SUBTRACT, [oc]: i.FUNC_REVERSE_SUBTRACT };
  if (n) (q[Ma] = i.MIN), (q[Sa] = i.MAX);
  else {
    const L = t.get("EXT_blend_minmax");
    L !== null && ((q[Ma] = L.MIN_EXT), (q[Sa] = L.MAX_EXT));
  }
  const st = {
    [lc]: i.ZERO,
    [cc]: i.ONE,
    [hc]: i.SRC_COLOR,
    [Fs]: i.SRC_ALPHA,
    [gc]: i.SRC_ALPHA_SATURATE,
    [pc]: i.DST_COLOR,
    [fc]: i.DST_ALPHA,
    [uc]: i.ONE_MINUS_SRC_COLOR,
    [Bs]: i.ONE_MINUS_SRC_ALPHA,
    [mc]: i.ONE_MINUS_DST_COLOR,
    [dc]: i.ONE_MINUS_DST_ALPHA,
    [_c]: i.CONSTANT_COLOR,
    [vc]: i.ONE_MINUS_CONSTANT_COLOR,
    [xc]: i.CONSTANT_ALPHA,
    [Mc]: i.ONE_MINUS_CONSTANT_ALPHA,
  };
  function X(L, ot, ft, Lt, Ct, qt, Yt, ie, se, Zt) {
    if (L === ln) {
      f === !0 && (yt(i.BLEND), (f = !1));
      return;
    }
    if ((f === !1 && (It(i.BLEND), (f = !0)), L !== sc)) {
      if (L !== E || Zt !== O) {
        if (((_ !== Dn || R !== Dn) && (i.blendEquation(i.FUNC_ADD), (_ = Dn), (R = Dn)), Zt))
          switch (L) {
            case fi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Os:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case va:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case xa:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", L);
              break;
          }
        else
          switch (L) {
            case fi:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Os:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case va:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case xa:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", L);
              break;
          }
        (b = null), (U = null), (w = null), (k = null), S.set(0, 0, 0), (T = 0), (E = L), (O = Zt);
      }
      return;
    }
    (Ct = Ct || ot),
      (qt = qt || ft),
      (Yt = Yt || Lt),
      (ot !== _ || Ct !== R) && (i.blendEquationSeparate(q[ot], q[Ct]), (_ = ot), (R = Ct)),
      (ft !== b || Lt !== U || qt !== w || Yt !== k) && (i.blendFuncSeparate(st[ft], st[Lt], st[qt], st[Yt]), (b = ft), (U = Lt), (w = qt), (k = Yt)),
      (ie.equals(S) === !1 || se !== T) && (i.blendColor(ie.r, ie.g, ie.b, se), S.copy(ie), (T = se)),
      (E = L),
      (O = !1);
  }
  function Tt(L, ot) {
    L.side === sn ? yt(i.CULL_FACE) : It(i.CULL_FACE);
    let ft = L.side === Te;
    ot && (ft = !ft),
      mt(ft),
      L.blending === fi && L.transparent === !1
        ? X(ln)
        : X(
            L.blending,
            L.blendEquation,
            L.blendSrc,
            L.blendDst,
            L.blendEquationAlpha,
            L.blendSrcAlpha,
            L.blendDstAlpha,
            L.blendColor,
            L.blendAlpha,
            L.premultipliedAlpha
          ),
      l.setFunc(L.depthFunc),
      l.setTest(L.depthTest),
      l.setMask(L.depthWrite),
      a.setMask(L.colorWrite);
    const Lt = L.stencilWrite;
    c.setTest(Lt),
      Lt &&
        (c.setMask(L.stencilWriteMask),
        c.setFunc(L.stencilFunc, L.stencilRef, L.stencilFuncMask),
        c.setOp(L.stencilFail, L.stencilZFail, L.stencilZPass)),
      I(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits),
      L.alphaToCoverage === !0 ? It(i.SAMPLE_ALPHA_TO_COVERAGE) : yt(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function mt(L) {
    J !== L && (L ? i.frontFace(i.CW) : i.frontFace(i.CCW), (J = L));
  }
  function M(L) {
    L !== nc
      ? (It(i.CULL_FACE), L !== lt && (L === _a ? i.cullFace(i.BACK) : L === ic ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK)))
      : yt(i.CULL_FACE),
      (lt = L);
  }
  function x(L) {
    L !== D && (Y && i.lineWidth(L), (D = L));
  }
  function I(L, ot, ft) {
    L ? (It(i.POLYGON_OFFSET_FILL), (F !== ot || G !== ft) && (i.polygonOffset(ot, ft), (F = ot), (G = ft))) : yt(i.POLYGON_OFFSET_FILL);
  }
  function it(L) {
    L ? It(i.SCISSOR_TEST) : yt(i.SCISSOR_TEST);
  }
  function et(L) {
    L === void 0 && (L = i.TEXTURE0 + j - 1), Q !== L && (i.activeTexture(L), (Q = L));
  }
  function K(L, ot, ft) {
    ft === void 0 && (Q === null ? (ft = i.TEXTURE0 + j - 1) : (ft = Q));
    let Lt = dt[ft];
    Lt === void 0 && ((Lt = { type: void 0, texture: void 0 }), (dt[ft] = Lt)),
      (Lt.type !== L || Lt.texture !== ot) &&
        (Q !== ft && (i.activeTexture(ft), (Q = ft)), i.bindTexture(L, ot || Pt[L]), (Lt.type = L), (Lt.texture = ot));
  }
  function St() {
    const L = dt[Q];
    L !== void 0 && L.type !== void 0 && (i.bindTexture(L.type, null), (L.type = void 0), (L.texture = void 0));
  }
  function ut() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function _t() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Rt() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Bt() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function nt() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function jt() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Vt() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function Nt() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function wt() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function gt() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (L) {
      console.error("THREE.WebGLState:", L);
    }
  }
  function A(L) {
    pt.equals(L) === !1 && (i.scissor(L.x, L.y, L.z, L.w), pt.copy(L));
  }
  function at(L) {
    Et.equals(L) === !1 && (i.viewport(L.x, L.y, L.z, L.w), Et.copy(L));
  }
  function bt(L, ot) {
    let ft = u.get(ot);
    ft === void 0 && ((ft = new WeakMap()), u.set(ot, ft));
    let Lt = ft.get(L);
    Lt === void 0 && ((Lt = i.getUniformBlockIndex(ot, L.name)), ft.set(L, Lt));
  }
  function Mt(L, ot) {
    const Lt = u.get(ot).get(L);
    h.get(ot) !== Lt && (i.uniformBlockBinding(ot, Lt, L.__bindingPointIndex), h.set(ot, Lt));
  }
  function rt() {
    i.disable(i.BLEND),
      i.disable(i.CULL_FACE),
      i.disable(i.DEPTH_TEST),
      i.disable(i.POLYGON_OFFSET_FILL),
      i.disable(i.SCISSOR_TEST),
      i.disable(i.STENCIL_TEST),
      i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),
      i.blendEquation(i.FUNC_ADD),
      i.blendFunc(i.ONE, i.ZERO),
      i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO),
      i.blendColor(0, 0, 0, 0),
      i.colorMask(!0, !0, !0, !0),
      i.clearColor(0, 0, 0, 0),
      i.depthMask(!0),
      i.depthFunc(i.LESS),
      i.clearDepth(1),
      i.stencilMask(4294967295),
      i.stencilFunc(i.ALWAYS, 0, 4294967295),
      i.stencilOp(i.KEEP, i.KEEP, i.KEEP),
      i.clearStencil(0),
      i.cullFace(i.BACK),
      i.frontFace(i.CCW),
      i.polygonOffset(0, 0),
      i.activeTexture(i.TEXTURE0),
      i.bindFramebuffer(i.FRAMEBUFFER, null),
      n === !0 && (i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null)),
      i.useProgram(null),
      i.lineWidth(1),
      i.scissor(0, 0, i.canvas.width, i.canvas.height),
      i.viewport(0, 0, i.canvas.width, i.canvas.height),
      (d = {}),
      (Q = null),
      (dt = {}),
      (p = {}),
      (g = new WeakMap()),
      (v = []),
      (m = null),
      (f = !1),
      (E = null),
      (_ = null),
      (b = null),
      (U = null),
      (R = null),
      (w = null),
      (k = null),
      (S = new Ft(0, 0, 0)),
      (T = 0),
      (O = !1),
      (J = null),
      (lt = null),
      (D = null),
      (F = null),
      (G = null),
      pt.set(0, 0, i.canvas.width, i.canvas.height),
      Et.set(0, 0, i.canvas.width, i.canvas.height),
      a.reset(),
      l.reset(),
      c.reset();
  }
  return {
    buffers: { color: a, depth: l, stencil: c },
    enable: It,
    disable: yt,
    bindFramebuffer: Ut,
    drawBuffers: P,
    useProgram: ct,
    setBlending: X,
    setMaterial: Tt,
    setFlipSided: mt,
    setCullFace: M,
    setLineWidth: x,
    setPolygonOffset: I,
    setScissorTest: it,
    activeTexture: et,
    bindTexture: K,
    unbindTexture: St,
    compressedTexImage2D: ut,
    compressedTexImage3D: _t,
    texImage2D: wt,
    texImage3D: gt,
    updateUBOMapping: bt,
    uniformBlockBinding: Mt,
    texStorage2D: Vt,
    texStorage3D: Nt,
    texSubImage2D: Rt,
    texSubImage3D: Bt,
    compressedTexSubImage2D: nt,
    compressedTexSubImage3D: jt,
    scissor: A,
    viewport: at,
    reset: rt,
  };
}
function pm(i, t, e, n, r, s, o) {
  const a = r.isWebGL2,
    l = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null,
    c = typeof navigator == "undefined" ? !1 : /OculusBrowser/g.test(navigator.userAgent),
    h = new WeakMap();
  let u;
  const d = new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas != "undefined" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {}
  function g(M, x) {
    return p ? new OffscreenCanvas(M, x) : Bi("canvas");
  }
  function v(M, x, I, it) {
    let et = 1;
    if (((M.width > it || M.height > it) && (et = it / Math.max(M.width, M.height)), et < 1 || x === !0))
      if (
        (typeof HTMLImageElement != "undefined" && M instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement != "undefined" && M instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap != "undefined" && M instanceof ImageBitmap)
      ) {
        const K = x ? Fr : Math.floor,
          St = K(et * M.width),
          ut = K(et * M.height);
        u === void 0 && (u = g(St, ut));
        const _t = I ? g(St, ut) : u;
        return (
          (_t.width = St),
          (_t.height = ut),
          _t.getContext("2d").drawImage(M, 0, 0, St, ut),
          console.warn("THREE.WebGLRenderer: Texture has been resized from (" + M.width + "x" + M.height + ") to (" + St + "x" + ut + ")."),
          _t
        );
      } else return "data" in M && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + M.width + "x" + M.height + ")."), M;
    return M;
  }
  function m(M) {
    return Xs(M.width) && Xs(M.height);
  }
  function f(M) {
    return a ? !1 : M.wrapS !== ze || M.wrapT !== ze || (M.minFilter !== me && M.minFilter !== De);
  }
  function E(M, x) {
    return M.generateMipmaps && x && M.minFilter !== me && M.minFilter !== De;
  }
  function _(M) {
    i.generateMipmap(M);
  }
  function b(M, x, I, it, et = !1) {
    if (a === !1) return x;
    if (M !== null) {
      if (i[M] !== void 0) return i[M];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + M + "'");
    }
    let K = x;
    if (
      (x === i.RED && (I === i.FLOAT && (K = i.R32F), I === i.HALF_FLOAT && (K = i.R16F), I === i.UNSIGNED_BYTE && (K = i.R8)),
      x === i.RED_INTEGER &&
        (I === i.UNSIGNED_BYTE && (K = i.R8UI),
        I === i.UNSIGNED_SHORT && (K = i.R16UI),
        I === i.UNSIGNED_INT && (K = i.R32UI),
        I === i.BYTE && (K = i.R8I),
        I === i.SHORT && (K = i.R16I),
        I === i.INT && (K = i.R32I)),
      x === i.RG && (I === i.FLOAT && (K = i.RG32F), I === i.HALF_FLOAT && (K = i.RG16F), I === i.UNSIGNED_BYTE && (K = i.RG8)),
      x === i.RGBA)
    ) {
      const St = et ? Ur : Jt.getTransfer(it);
      I === i.FLOAT && (K = i.RGBA32F),
        I === i.HALF_FLOAT && (K = i.RGBA16F),
        I === i.UNSIGNED_BYTE && (K = St === $t ? i.SRGB8_ALPHA8 : i.RGBA8),
        I === i.UNSIGNED_SHORT_4_4_4_4 && (K = i.RGBA4),
        I === i.UNSIGNED_SHORT_5_5_5_1 && (K = i.RGB5_A1);
    }
    return (
      (K === i.R16F || K === i.R32F || K === i.RG16F || K === i.RG32F || K === i.RGBA16F || K === i.RGBA32F) && t.get("EXT_color_buffer_float"), K
    );
  }
  function U(M, x, I) {
    return E(M, I) === !0 || (M.isFramebufferTexture && M.minFilter !== me && M.minFilter !== De)
      ? Math.log2(Math.max(x.width, x.height)) + 1
      : M.mipmaps !== void 0 && M.mipmaps.length > 0
      ? M.mipmaps.length
      : M.isCompressedTexture && Array.isArray(M.image)
      ? x.mipmaps.length
      : 1;
  }
  function R(M) {
    return M === me || M === ya || M === Qr ? i.NEAREST : i.LINEAR;
  }
  function w(M) {
    const x = M.target;
    x.removeEventListener("dispose", w), S(x), x.isVideoTexture && h.delete(x);
  }
  function k(M) {
    const x = M.target;
    x.removeEventListener("dispose", k), O(x);
  }
  function S(M) {
    const x = n.get(M);
    if (x.__webglInit === void 0) return;
    const I = M.source,
      it = d.get(I);
    if (it) {
      const et = it[x.__cacheKey];
      et.usedTimes--, et.usedTimes === 0 && T(M), Object.keys(it).length === 0 && d.delete(I);
    }
    n.remove(M);
  }
  function T(M) {
    const x = n.get(M);
    i.deleteTexture(x.__webglTexture);
    const I = M.source,
      it = d.get(I);
    delete it[x.__cacheKey], o.memory.textures--;
  }
  function O(M) {
    const x = M.texture,
      I = n.get(M),
      it = n.get(x);
    if (
      (it.__webglTexture !== void 0 && (i.deleteTexture(it.__webglTexture), o.memory.textures--),
      M.depthTexture && M.depthTexture.dispose(),
      M.isWebGLCubeRenderTarget)
    )
      for (let et = 0; et < 6; et++) {
        if (Array.isArray(I.__webglFramebuffer[et]))
          for (let K = 0; K < I.__webglFramebuffer[et].length; K++) i.deleteFramebuffer(I.__webglFramebuffer[et][K]);
        else i.deleteFramebuffer(I.__webglFramebuffer[et]);
        I.__webglDepthbuffer && i.deleteRenderbuffer(I.__webglDepthbuffer[et]);
      }
    else {
      if (Array.isArray(I.__webglFramebuffer)) for (let et = 0; et < I.__webglFramebuffer.length; et++) i.deleteFramebuffer(I.__webglFramebuffer[et]);
      else i.deleteFramebuffer(I.__webglFramebuffer);
      if (
        (I.__webglDepthbuffer && i.deleteRenderbuffer(I.__webglDepthbuffer),
        I.__webglMultisampledFramebuffer && i.deleteFramebuffer(I.__webglMultisampledFramebuffer),
        I.__webglColorRenderbuffer)
      )
        for (let et = 0; et < I.__webglColorRenderbuffer.length; et++)
          I.__webglColorRenderbuffer[et] && i.deleteRenderbuffer(I.__webglColorRenderbuffer[et]);
      I.__webglDepthRenderbuffer && i.deleteRenderbuffer(I.__webglDepthRenderbuffer);
    }
    if (M.isWebGLMultipleRenderTargets)
      for (let et = 0, K = x.length; et < K; et++) {
        const St = n.get(x[et]);
        St.__webglTexture && (i.deleteTexture(St.__webglTexture), o.memory.textures--), n.remove(x[et]);
      }
    n.remove(x), n.remove(M);
  }
  let J = 0;
  function lt() {
    J = 0;
  }
  function D() {
    const M = J;
    return (
      M >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + M + " texture units while this GPU supports only " + r.maxTextures),
      (J += 1),
      M
    );
  }
  function F(M) {
    const x = [];
    return (
      x.push(M.wrapS),
      x.push(M.wrapT),
      x.push(M.wrapR || 0),
      x.push(M.magFilter),
      x.push(M.minFilter),
      x.push(M.anisotropy),
      x.push(M.internalFormat),
      x.push(M.format),
      x.push(M.type),
      x.push(M.generateMipmaps),
      x.push(M.premultiplyAlpha),
      x.push(M.flipY),
      x.push(M.unpackAlignment),
      x.push(M.colorSpace),
      x.join()
    );
  }
  function G(M, x) {
    const I = n.get(M);
    if ((M.isVideoTexture && Tt(M), M.isRenderTargetTexture === !1 && M.version > 0 && I.__version !== M.version)) {
      const it = M.image;
      if (it === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (it.complete === !1) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        pt(I, M, x);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, I.__webglTexture, i.TEXTURE0 + x);
  }
  function j(M, x) {
    const I = n.get(M);
    if (M.version > 0 && I.__version !== M.version) {
      pt(I, M, x);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, I.__webglTexture, i.TEXTURE0 + x);
  }
  function Y(M, x) {
    const I = n.get(M);
    if (M.version > 0 && I.__version !== M.version) {
      pt(I, M, x);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, I.__webglTexture, i.TEXTURE0 + x);
  }
  function W(M, x) {
    const I = n.get(M);
    if (M.version > 0 && I.__version !== M.version) {
      Et(I, M, x);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, I.__webglTexture, i.TEXTURE0 + x);
  }
  const $ = { [Gs]: i.REPEAT, [ze]: i.CLAMP_TO_EDGE, [Vs]: i.MIRRORED_REPEAT },
    Q = {
      [me]: i.NEAREST,
      [ya]: i.NEAREST_MIPMAP_NEAREST,
      [Qr]: i.NEAREST_MIPMAP_LINEAR,
      [De]: i.LINEAR,
      [Oc]: i.LINEAR_MIPMAP_NEAREST,
      [Oi]: i.LINEAR_MIPMAP_LINEAR,
    },
    dt = { [jc]: i.NEVER, [th]: i.ALWAYS, [Zc]: i.LESS, [ml]: i.LEQUAL, [Kc]: i.EQUAL, [Qc]: i.GEQUAL, [Jc]: i.GREATER, [$c]: i.NOTEQUAL };
  function V(M, x, I) {
    if (
      (I
        ? (i.texParameteri(M, i.TEXTURE_WRAP_S, $[x.wrapS]),
          i.texParameteri(M, i.TEXTURE_WRAP_T, $[x.wrapT]),
          (M === i.TEXTURE_3D || M === i.TEXTURE_2D_ARRAY) && i.texParameteri(M, i.TEXTURE_WRAP_R, $[x.wrapR]),
          i.texParameteri(M, i.TEXTURE_MAG_FILTER, Q[x.magFilter]),
          i.texParameteri(M, i.TEXTURE_MIN_FILTER, Q[x.minFilter]))
        : (i.texParameteri(M, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE),
          i.texParameteri(M, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE),
          (M === i.TEXTURE_3D || M === i.TEXTURE_2D_ARRAY) && i.texParameteri(M, i.TEXTURE_WRAP_R, i.CLAMP_TO_EDGE),
          (x.wrapS !== ze || x.wrapT !== ze) &&
            console.warn(
              "THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."
            ),
          i.texParameteri(M, i.TEXTURE_MAG_FILTER, R(x.magFilter)),
          i.texParameteri(M, i.TEXTURE_MIN_FILTER, R(x.minFilter)),
          x.minFilter !== me &&
            x.minFilter !== De &&
            console.warn(
              "THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."
            )),
      x.compareFunction &&
        (i.texParameteri(M, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(M, i.TEXTURE_COMPARE_FUNC, dt[x.compareFunction])),
      t.has("EXT_texture_filter_anisotropic") === !0)
    ) {
      const it = t.get("EXT_texture_filter_anisotropic");
      if (
        x.magFilter === me ||
        (x.minFilter !== Qr && x.minFilter !== Oi) ||
        (x.type === vn && t.has("OES_texture_float_linear") === !1) ||
        (a === !1 && x.type === cn && t.has("OES_texture_half_float_linear") === !1)
      )
        return;
      (x.anisotropy > 1 || n.get(x).__currentAnisotropy) &&
        (i.texParameterf(M, it.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, r.getMaxAnisotropy())),
        (n.get(x).__currentAnisotropy = x.anisotropy));
    }
  }
  function tt(M, x) {
    let I = !1;
    M.__webglInit === void 0 && ((M.__webglInit = !0), x.addEventListener("dispose", w));
    const it = x.source;
    let et = d.get(it);
    et === void 0 && ((et = {}), d.set(it, et));
    const K = F(x);
    if (K !== M.__cacheKey) {
      et[K] === void 0 && ((et[K] = { texture: i.createTexture(), usedTimes: 0 }), o.memory.textures++, (I = !0)), et[K].usedTimes++;
      const St = et[M.__cacheKey];
      St !== void 0 && (et[M.__cacheKey].usedTimes--, St.usedTimes === 0 && T(x)), (M.__cacheKey = K), (M.__webglTexture = et[K].texture);
    }
    return I;
  }
  function pt(M, x, I) {
    let it = i.TEXTURE_2D;
    (x.isDataArrayTexture || x.isCompressedArrayTexture) && (it = i.TEXTURE_2D_ARRAY), x.isData3DTexture && (it = i.TEXTURE_3D);
    const et = tt(M, x),
      K = x.source;
    e.bindTexture(it, M.__webglTexture, i.TEXTURE0 + I);
    const St = n.get(K);
    if (K.version !== St.__version || et === !0) {
      e.activeTexture(i.TEXTURE0 + I);
      const ut = Jt.getPrimaries(Jt.workingColorSpace),
        _t = x.colorSpace === Ne ? null : Jt.getPrimaries(x.colorSpace),
        Rt = x.colorSpace === Ne || ut === _t ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY),
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha),
        i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment),
        i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Rt);
      const Bt = f(x) && m(x.image) === !1;
      let nt = v(x.image, Bt, !1, r.maxTextureSize);
      nt = mt(x, nt);
      const jt = m(nt) || a,
        Vt = s.convert(x.format, x.colorSpace);
      let Nt = s.convert(x.type),
        wt = b(x.internalFormat, Vt, Nt, x.colorSpace, x.isVideoTexture);
      V(it, x, jt);
      let gt;
      const A = x.mipmaps,
        at = a && x.isVideoTexture !== !0 && wt !== dl,
        bt = St.__version === void 0 || et === !0,
        Mt = U(x, nt, jt);
      if (x.isDepthTexture)
        (wt = i.DEPTH_COMPONENT),
          a
            ? x.type === vn
              ? (wt = i.DEPTH_COMPONENT32F)
              : x.type === _n
              ? (wt = i.DEPTH_COMPONENT24)
              : x.type === Nn
              ? (wt = i.DEPTH24_STENCIL8)
              : (wt = i.DEPTH_COMPONENT16)
            : x.type === vn && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),
          x.format === On &&
            wt === i.DEPTH_COMPONENT &&
            x.type !== Qs &&
            x.type !== _n &&
            (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),
            (x.type = _n),
            (Nt = s.convert(x.type))),
          x.format === _i &&
            wt === i.DEPTH_COMPONENT &&
            ((wt = i.DEPTH_STENCIL),
            x.type !== Nn &&
              (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),
              (x.type = Nn),
              (Nt = s.convert(x.type)))),
          bt &&
            (at ? e.texStorage2D(i.TEXTURE_2D, 1, wt, nt.width, nt.height) : e.texImage2D(i.TEXTURE_2D, 0, wt, nt.width, nt.height, 0, Vt, Nt, null));
      else if (x.isDataTexture)
        if (A.length > 0 && jt) {
          at && bt && e.texStorage2D(i.TEXTURE_2D, Mt, wt, A[0].width, A[0].height);
          for (let rt = 0, L = A.length; rt < L; rt++)
            (gt = A[rt]),
              at
                ? e.texSubImage2D(i.TEXTURE_2D, rt, 0, 0, gt.width, gt.height, Vt, Nt, gt.data)
                : e.texImage2D(i.TEXTURE_2D, rt, wt, gt.width, gt.height, 0, Vt, Nt, gt.data);
          x.generateMipmaps = !1;
        } else
          at
            ? (bt && e.texStorage2D(i.TEXTURE_2D, Mt, wt, nt.width, nt.height),
              e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, nt.width, nt.height, Vt, Nt, nt.data))
            : e.texImage2D(i.TEXTURE_2D, 0, wt, nt.width, nt.height, 0, Vt, Nt, nt.data);
      else if (x.isCompressedTexture)
        if (x.isCompressedArrayTexture) {
          at && bt && e.texStorage3D(i.TEXTURE_2D_ARRAY, Mt, wt, A[0].width, A[0].height, nt.depth);
          for (let rt = 0, L = A.length; rt < L; rt++)
            (gt = A[rt]),
              x.format !== He
                ? Vt !== null
                  ? at
                    ? e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, rt, 0, 0, 0, gt.width, gt.height, nt.depth, Vt, gt.data, 0, 0)
                    : e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, rt, wt, gt.width, gt.height, nt.depth, 0, gt.data, 0, 0)
                  : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()")
                : at
                ? e.texSubImage3D(i.TEXTURE_2D_ARRAY, rt, 0, 0, 0, gt.width, gt.height, nt.depth, Vt, Nt, gt.data)
                : e.texImage3D(i.TEXTURE_2D_ARRAY, rt, wt, gt.width, gt.height, nt.depth, 0, Vt, Nt, gt.data);
        } else {
          at && bt && e.texStorage2D(i.TEXTURE_2D, Mt, wt, A[0].width, A[0].height);
          for (let rt = 0, L = A.length; rt < L; rt++)
            (gt = A[rt]),
              x.format !== He
                ? Vt !== null
                  ? at
                    ? e.compressedTexSubImage2D(i.TEXTURE_2D, rt, 0, 0, gt.width, gt.height, Vt, gt.data)
                    : e.compressedTexImage2D(i.TEXTURE_2D, rt, wt, gt.width, gt.height, 0, gt.data)
                  : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()")
                : at
                ? e.texSubImage2D(i.TEXTURE_2D, rt, 0, 0, gt.width, gt.height, Vt, Nt, gt.data)
                : e.texImage2D(i.TEXTURE_2D, rt, wt, gt.width, gt.height, 0, Vt, Nt, gt.data);
        }
      else if (x.isDataArrayTexture)
        at
          ? (bt && e.texStorage3D(i.TEXTURE_2D_ARRAY, Mt, wt, nt.width, nt.height, nt.depth),
            e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, nt.width, nt.height, nt.depth, Vt, Nt, nt.data))
          : e.texImage3D(i.TEXTURE_2D_ARRAY, 0, wt, nt.width, nt.height, nt.depth, 0, Vt, Nt, nt.data);
      else if (x.isData3DTexture)
        at
          ? (bt && e.texStorage3D(i.TEXTURE_3D, Mt, wt, nt.width, nt.height, nt.depth),
            e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, nt.width, nt.height, nt.depth, Vt, Nt, nt.data))
          : e.texImage3D(i.TEXTURE_3D, 0, wt, nt.width, nt.height, nt.depth, 0, Vt, Nt, nt.data);
      else if (x.isFramebufferTexture) {
        if (bt)
          if (at) e.texStorage2D(i.TEXTURE_2D, Mt, wt, nt.width, nt.height);
          else {
            let rt = nt.width,
              L = nt.height;
            for (let ot = 0; ot < Mt; ot++) e.texImage2D(i.TEXTURE_2D, ot, wt, rt, L, 0, Vt, Nt, null), (rt >>= 1), (L >>= 1);
          }
      } else if (A.length > 0 && jt) {
        at && bt && e.texStorage2D(i.TEXTURE_2D, Mt, wt, A[0].width, A[0].height);
        for (let rt = 0, L = A.length; rt < L; rt++)
          (gt = A[rt]), at ? e.texSubImage2D(i.TEXTURE_2D, rt, 0, 0, Vt, Nt, gt) : e.texImage2D(i.TEXTURE_2D, rt, wt, Vt, Nt, gt);
        x.generateMipmaps = !1;
      } else
        at
          ? (bt && e.texStorage2D(i.TEXTURE_2D, Mt, wt, nt.width, nt.height), e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Vt, Nt, nt))
          : e.texImage2D(i.TEXTURE_2D, 0, wt, Vt, Nt, nt);
      E(x, jt) && _(it), (St.__version = K.version), x.onUpdate && x.onUpdate(x);
    }
    M.__version = x.version;
  }
  function Et(M, x, I) {
    if (x.image.length !== 6) return;
    const it = tt(M, x),
      et = x.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, M.__webglTexture, i.TEXTURE0 + I);
    const K = n.get(et);
    if (et.version !== K.__version || it === !0) {
      e.activeTexture(i.TEXTURE0 + I);
      const St = Jt.getPrimaries(Jt.workingColorSpace),
        ut = x.colorSpace === Ne ? null : Jt.getPrimaries(x.colorSpace),
        _t = x.colorSpace === Ne || St === ut ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY),
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha),
        i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment),
        i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, _t);
      const Rt = x.isCompressedTexture || x.image[0].isCompressedTexture,
        Bt = x.image[0] && x.image[0].isDataTexture,
        nt = [];
      for (let rt = 0; rt < 6; rt++)
        !Rt && !Bt ? (nt[rt] = v(x.image[rt], !1, !0, r.maxCubemapSize)) : (nt[rt] = Bt ? x.image[rt].image : x.image[rt]), (nt[rt] = mt(x, nt[rt]));
      const jt = nt[0],
        Vt = m(jt) || a,
        Nt = s.convert(x.format, x.colorSpace),
        wt = s.convert(x.type),
        gt = b(x.internalFormat, Nt, wt, x.colorSpace),
        A = a && x.isVideoTexture !== !0,
        at = K.__version === void 0 || it === !0;
      let bt = U(x, jt, Vt);
      V(i.TEXTURE_CUBE_MAP, x, Vt);
      let Mt;
      if (Rt) {
        A && at && e.texStorage2D(i.TEXTURE_CUBE_MAP, bt, gt, jt.width, jt.height);
        for (let rt = 0; rt < 6; rt++) {
          Mt = nt[rt].mipmaps;
          for (let L = 0; L < Mt.length; L++) {
            const ot = Mt[L];
            x.format !== He
              ? Nt !== null
                ? A
                  ? e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, L, 0, 0, ot.width, ot.height, Nt, ot.data)
                  : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, L, gt, ot.width, ot.height, 0, ot.data)
                : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()")
              : A
              ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, L, 0, 0, ot.width, ot.height, Nt, wt, ot.data)
              : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, L, gt, ot.width, ot.height, 0, Nt, wt, ot.data);
          }
        }
      } else {
        (Mt = x.mipmaps), A && at && (Mt.length > 0 && bt++, e.texStorage2D(i.TEXTURE_CUBE_MAP, bt, gt, nt[0].width, nt[0].height));
        for (let rt = 0; rt < 6; rt++)
          if (Bt) {
            A
              ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, 0, 0, 0, nt[rt].width, nt[rt].height, Nt, wt, nt[rt].data)
              : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, 0, gt, nt[rt].width, nt[rt].height, 0, Nt, wt, nt[rt].data);
            for (let L = 0; L < Mt.length; L++) {
              const ft = Mt[L].image[rt].image;
              A
                ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, L + 1, 0, 0, ft.width, ft.height, Nt, wt, ft.data)
                : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, L + 1, gt, ft.width, ft.height, 0, Nt, wt, ft.data);
            }
          } else {
            A
              ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, 0, 0, 0, Nt, wt, nt[rt])
              : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, 0, gt, Nt, wt, nt[rt]);
            for (let L = 0; L < Mt.length; L++) {
              const ot = Mt[L];
              A
                ? e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, L + 1, 0, 0, Nt, wt, ot.image[rt])
                : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, L + 1, gt, Nt, wt, ot.image[rt]);
            }
          }
      }
      E(x, Vt) && _(i.TEXTURE_CUBE_MAP), (K.__version = et.version), x.onUpdate && x.onUpdate(x);
    }
    M.__version = x.version;
  }
  function xt(M, x, I, it, et, K) {
    const St = s.convert(I.format, I.colorSpace),
      ut = s.convert(I.type),
      _t = b(I.internalFormat, St, ut, I.colorSpace);
    if (!n.get(x).__hasExternalTextures) {
      const Bt = Math.max(1, x.width >> K),
        nt = Math.max(1, x.height >> K);
      et === i.TEXTURE_3D || et === i.TEXTURE_2D_ARRAY
        ? e.texImage3D(et, K, _t, Bt, nt, x.depth, 0, St, ut, null)
        : e.texImage2D(et, K, _t, Bt, nt, 0, St, ut, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, M),
      X(x)
        ? l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, it, et, n.get(I).__webglTexture, 0, st(x))
        : (et === i.TEXTURE_2D || (et >= i.TEXTURE_CUBE_MAP_POSITIVE_X && et <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          i.framebufferTexture2D(i.FRAMEBUFFER, it, et, n.get(I).__webglTexture, K),
      e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Pt(M, x, I) {
    if ((i.bindRenderbuffer(i.RENDERBUFFER, M), x.depthBuffer && !x.stencilBuffer)) {
      let it = a === !0 ? i.DEPTH_COMPONENT24 : i.DEPTH_COMPONENT16;
      if (I || X(x)) {
        const et = x.depthTexture;
        et && et.isDepthTexture && (et.type === vn ? (it = i.DEPTH_COMPONENT32F) : et.type === _n && (it = i.DEPTH_COMPONENT24));
        const K = st(x);
        X(x)
          ? l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, K, it, x.width, x.height)
          : i.renderbufferStorageMultisample(i.RENDERBUFFER, K, it, x.width, x.height);
      } else i.renderbufferStorage(i.RENDERBUFFER, it, x.width, x.height);
      i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, M);
    } else if (x.depthBuffer && x.stencilBuffer) {
      const it = st(x);
      I && X(x) === !1
        ? i.renderbufferStorageMultisample(i.RENDERBUFFER, it, i.DEPTH24_STENCIL8, x.width, x.height)
        : X(x)
        ? l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, it, i.DEPTH24_STENCIL8, x.width, x.height)
        : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, x.width, x.height),
        i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, M);
    } else {
      const it = x.isWebGLMultipleRenderTargets === !0 ? x.texture : [x.texture];
      for (let et = 0; et < it.length; et++) {
        const K = it[et],
          St = s.convert(K.format, K.colorSpace),
          ut = s.convert(K.type),
          _t = b(K.internalFormat, St, ut, K.colorSpace),
          Rt = st(x);
        I && X(x) === !1
          ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Rt, _t, x.width, x.height)
          : X(x)
          ? l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Rt, _t, x.width, x.height)
          : i.renderbufferStorage(i.RENDERBUFFER, _t, x.width, x.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function It(M, x) {
    if (x && x.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if ((e.bindFramebuffer(i.FRAMEBUFFER, M), !(x.depthTexture && x.depthTexture.isDepthTexture)))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(x.depthTexture).__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) &&
      ((x.depthTexture.image.width = x.width), (x.depthTexture.image.height = x.height), (x.depthTexture.needsUpdate = !0)),
      G(x.depthTexture, 0);
    const it = n.get(x.depthTexture).__webglTexture,
      et = st(x);
    if (x.depthTexture.format === On)
      X(x)
        ? l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, it, 0, et)
        : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, it, 0);
    else if (x.depthTexture.format === _i)
      X(x)
        ? l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, it, 0, et)
        : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, it, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function yt(M) {
    const x = n.get(M),
      I = M.isWebGLCubeRenderTarget === !0;
    if (M.depthTexture && !x.__autoAllocateDepthBuffer) {
      if (I) throw new Error("target.depthTexture not supported in Cube render targets");
      It(x.__webglFramebuffer, M);
    } else if (I) {
      x.__webglDepthbuffer = [];
      for (let it = 0; it < 6; it++)
        e.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[it]),
          (x.__webglDepthbuffer[it] = i.createRenderbuffer()),
          Pt(x.__webglDepthbuffer[it], M, !1);
    } else e.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer), (x.__webglDepthbuffer = i.createRenderbuffer()), Pt(x.__webglDepthbuffer, M, !1);
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ut(M, x, I) {
    const it = n.get(M);
    x !== void 0 && xt(it.__webglFramebuffer, M, M.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), I !== void 0 && yt(M);
  }
  function P(M) {
    const x = M.texture,
      I = n.get(M),
      it = n.get(x);
    M.addEventListener("dispose", k),
      M.isWebGLMultipleRenderTargets !== !0 &&
        (it.__webglTexture === void 0 && (it.__webglTexture = i.createTexture()), (it.__version = x.version), o.memory.textures++);
    const et = M.isWebGLCubeRenderTarget === !0,
      K = M.isWebGLMultipleRenderTargets === !0,
      St = m(M) || a;
    if (et) {
      I.__webglFramebuffer = [];
      for (let ut = 0; ut < 6; ut++)
        if (a && x.mipmaps && x.mipmaps.length > 0) {
          I.__webglFramebuffer[ut] = [];
          for (let _t = 0; _t < x.mipmaps.length; _t++) I.__webglFramebuffer[ut][_t] = i.createFramebuffer();
        } else I.__webglFramebuffer[ut] = i.createFramebuffer();
    } else {
      if (a && x.mipmaps && x.mipmaps.length > 0) {
        I.__webglFramebuffer = [];
        for (let ut = 0; ut < x.mipmaps.length; ut++) I.__webglFramebuffer[ut] = i.createFramebuffer();
      } else I.__webglFramebuffer = i.createFramebuffer();
      if (K)
        if (r.drawBuffers) {
          const ut = M.texture;
          for (let _t = 0, Rt = ut.length; _t < Rt; _t++) {
            const Bt = n.get(ut[_t]);
            Bt.__webglTexture === void 0 && ((Bt.__webglTexture = i.createTexture()), o.memory.textures++);
          }
        } else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (a && M.samples > 0 && X(M) === !1) {
        const ut = K ? x : [x];
        (I.__webglMultisampledFramebuffer = i.createFramebuffer()),
          (I.__webglColorRenderbuffer = []),
          e.bindFramebuffer(i.FRAMEBUFFER, I.__webglMultisampledFramebuffer);
        for (let _t = 0; _t < ut.length; _t++) {
          const Rt = ut[_t];
          (I.__webglColorRenderbuffer[_t] = i.createRenderbuffer()), i.bindRenderbuffer(i.RENDERBUFFER, I.__webglColorRenderbuffer[_t]);
          const Bt = s.convert(Rt.format, Rt.colorSpace),
            nt = s.convert(Rt.type),
            jt = b(Rt.internalFormat, Bt, nt, Rt.colorSpace, M.isXRRenderTarget === !0),
            Vt = st(M);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Vt, jt, M.width, M.height),
            i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.RENDERBUFFER, I.__webglColorRenderbuffer[_t]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null),
          M.depthBuffer && ((I.__webglDepthRenderbuffer = i.createRenderbuffer()), Pt(I.__webglDepthRenderbuffer, M, !0)),
          e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (et) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, it.__webglTexture), V(i.TEXTURE_CUBE_MAP, x, St);
      for (let ut = 0; ut < 6; ut++)
        if (a && x.mipmaps && x.mipmaps.length > 0)
          for (let _t = 0; _t < x.mipmaps.length; _t++)
            xt(I.__webglFramebuffer[ut][_t], M, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ut, _t);
        else xt(I.__webglFramebuffer[ut], M, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ut, 0);
      E(x, St) && _(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (K) {
      const ut = M.texture;
      for (let _t = 0, Rt = ut.length; _t < Rt; _t++) {
        const Bt = ut[_t],
          nt = n.get(Bt);
        e.bindTexture(i.TEXTURE_2D, nt.__webglTexture),
          V(i.TEXTURE_2D, Bt, St),
          xt(I.__webglFramebuffer, M, Bt, i.COLOR_ATTACHMENT0 + _t, i.TEXTURE_2D, 0),
          E(Bt, St) && _(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let ut = i.TEXTURE_2D;
      if (
        ((M.isWebGL3DRenderTarget || M.isWebGLArrayRenderTarget) &&
          (a
            ? (ut = M.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY)
            : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),
        e.bindTexture(ut, it.__webglTexture),
        V(ut, x, St),
        a && x.mipmaps && x.mipmaps.length > 0)
      )
        for (let _t = 0; _t < x.mipmaps.length; _t++) xt(I.__webglFramebuffer[_t], M, x, i.COLOR_ATTACHMENT0, ut, _t);
      else xt(I.__webglFramebuffer, M, x, i.COLOR_ATTACHMENT0, ut, 0);
      E(x, St) && _(ut), e.unbindTexture();
    }
    M.depthBuffer && yt(M);
  }
  function ct(M) {
    const x = m(M) || a,
      I = M.isWebGLMultipleRenderTargets === !0 ? M.texture : [M.texture];
    for (let it = 0, et = I.length; it < et; it++) {
      const K = I[it];
      if (E(K, x)) {
        const St = M.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D,
          ut = n.get(K).__webglTexture;
        e.bindTexture(St, ut), _(St), e.unbindTexture();
      }
    }
  }
  function q(M) {
    if (a && M.samples > 0 && X(M) === !1) {
      const x = M.isWebGLMultipleRenderTargets ? M.texture : [M.texture],
        I = M.width,
        it = M.height;
      let et = i.COLOR_BUFFER_BIT;
      const K = [],
        St = M.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT,
        ut = n.get(M),
        _t = M.isWebGLMultipleRenderTargets === !0;
      if (_t)
        for (let Rt = 0; Rt < x.length; Rt++)
          e.bindFramebuffer(i.FRAMEBUFFER, ut.__webglMultisampledFramebuffer),
            i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Rt, i.RENDERBUFFER, null),
            e.bindFramebuffer(i.FRAMEBUFFER, ut.__webglFramebuffer),
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Rt, i.TEXTURE_2D, null, 0);
      e.bindFramebuffer(i.READ_FRAMEBUFFER, ut.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, ut.__webglFramebuffer);
      for (let Rt = 0; Rt < x.length; Rt++) {
        K.push(i.COLOR_ATTACHMENT0 + Rt), M.depthBuffer && K.push(St);
        const Bt = ut.__ignoreDepthValues !== void 0 ? ut.__ignoreDepthValues : !1;
        if (
          (Bt === !1 && (M.depthBuffer && (et |= i.DEPTH_BUFFER_BIT), M.stencilBuffer && (et |= i.STENCIL_BUFFER_BIT)),
          _t && i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ut.__webglColorRenderbuffer[Rt]),
          Bt === !0 && (i.invalidateFramebuffer(i.READ_FRAMEBUFFER, [St]), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [St])),
          _t)
        ) {
          const nt = n.get(x[Rt]).__webglTexture;
          i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, nt, 0);
        }
        i.blitFramebuffer(0, 0, I, it, 0, 0, I, it, et, i.NEAREST), c && i.invalidateFramebuffer(i.READ_FRAMEBUFFER, K);
      }
      if ((e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), _t))
        for (let Rt = 0; Rt < x.length; Rt++) {
          e.bindFramebuffer(i.FRAMEBUFFER, ut.__webglMultisampledFramebuffer),
            i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Rt, i.RENDERBUFFER, ut.__webglColorRenderbuffer[Rt]);
          const Bt = n.get(x[Rt]).__webglTexture;
          e.bindFramebuffer(i.FRAMEBUFFER, ut.__webglFramebuffer),
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Rt, i.TEXTURE_2D, Bt, 0);
        }
      e.bindFramebuffer(i.DRAW_FRAMEBUFFER, ut.__webglMultisampledFramebuffer);
    }
  }
  function st(M) {
    return Math.min(r.maxSamples, M.samples);
  }
  function X(M) {
    const x = n.get(M);
    return a && M.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1;
  }
  function Tt(M) {
    const x = o.render.frame;
    h.get(M) !== x && (h.set(M, x), M.update());
  }
  function mt(M, x) {
    const I = M.colorSpace,
      it = M.format,
      et = M.type;
    return (
      M.isCompressedTexture === !0 ||
        M.isVideoTexture === !0 ||
        M.format === Ws ||
        (I !== hn &&
          I !== Ne &&
          (Jt.getTransfer(I) === $t
            ? a === !1
              ? t.has("EXT_sRGB") === !0 && it === He
                ? ((M.format = Ws), (M.minFilter = De), (M.generateMipmaps = !1))
                : (x = _l.sRGBToLinear(x))
              : (it !== He || et !== Mn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")
            : console.error("THREE.WebGLTextures: Unsupported texture color space:", I))),
      x
    );
  }
  (this.allocateTextureUnit = D),
    (this.resetTextureUnits = lt),
    (this.setTexture2D = G),
    (this.setTexture2DArray = j),
    (this.setTexture3D = Y),
    (this.setTextureCube = W),
    (this.rebindTextures = Ut),
    (this.setupRenderTarget = P),
    (this.updateRenderTargetMipmap = ct),
    (this.updateMultisampleRenderTarget = q),
    (this.setupDepthRenderbuffer = yt),
    (this.setupFrameBufferTexture = xt),
    (this.useMultisampledRTT = X);
}
function mm(i, t, e) {
  const n = e.isWebGL2;
  function r(s, o = Ne) {
    let a;
    const l = Jt.getTransfer(o);
    if (s === Mn) return i.UNSIGNED_BYTE;
    if (s === ll) return i.UNSIGNED_SHORT_4_4_4_4;
    if (s === cl) return i.UNSIGNED_SHORT_5_5_5_1;
    if (s === Fc) return i.BYTE;
    if (s === Bc) return i.SHORT;
    if (s === Qs) return i.UNSIGNED_SHORT;
    if (s === ol) return i.INT;
    if (s === _n) return i.UNSIGNED_INT;
    if (s === vn) return i.FLOAT;
    if (s === cn) return n ? i.HALF_FLOAT : ((a = t.get("OES_texture_half_float")), a !== null ? a.HALF_FLOAT_OES : null);
    if (s === zc) return i.ALPHA;
    if (s === He) return i.RGBA;
    if (s === Hc) return i.LUMINANCE;
    if (s === Gc) return i.LUMINANCE_ALPHA;
    if (s === On) return i.DEPTH_COMPONENT;
    if (s === _i) return i.DEPTH_STENCIL;
    if (s === Ws) return (a = t.get("EXT_sRGB")), a !== null ? a.SRGB_ALPHA_EXT : null;
    if (s === Vc) return i.RED;
    if (s === hl) return i.RED_INTEGER;
    if (s === kc) return i.RG;
    if (s === ul) return i.RG_INTEGER;
    if (s === fl) return i.RGBA_INTEGER;
    if (s === ts || s === es || s === ns || s === is)
      if (l === $t)
        if (((a = t.get("WEBGL_compressed_texture_s3tc_srgb")), a !== null)) {
          if (s === ts) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (s === es) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (s === ns) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (s === is) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else return null;
      else if (((a = t.get("WEBGL_compressed_texture_s3tc")), a !== null)) {
        if (s === ts) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (s === es) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (s === ns) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (s === is) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
    if (s === Ea || s === Ta || s === ba || s === Aa)
      if (((a = t.get("WEBGL_compressed_texture_pvrtc")), a !== null)) {
        if (s === Ea) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (s === Ta) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (s === ba) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (s === Aa) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (s === dl) return (a = t.get("WEBGL_compressed_texture_etc1")), a !== null ? a.COMPRESSED_RGB_ETC1_WEBGL : null;
    if (s === wa || s === Ra)
      if (((a = t.get("WEBGL_compressed_texture_etc")), a !== null)) {
        if (s === wa) return l === $t ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
        if (s === Ra) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC;
      } else return null;
    if (
      s === Ca ||
      s === Pa ||
      s === La ||
      s === Da ||
      s === Ua ||
      s === Ia ||
      s === Na ||
      s === Oa ||
      s === Fa ||
      s === Ba ||
      s === za ||
      s === Ha ||
      s === Ga ||
      s === Va
    )
      if (((a = t.get("WEBGL_compressed_texture_astc")), a !== null)) {
        if (s === Ca) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (s === Pa) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (s === La) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (s === Da) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (s === Ua) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (s === Ia) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (s === Na) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (s === Oa) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (s === Fa) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (s === Ba) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (s === za) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (s === Ha) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (s === Ga) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (s === Va) return l === $t ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : a.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (s === rs || s === ka || s === Wa)
      if (((a = t.get("EXT_texture_compression_bptc")), a !== null)) {
        if (s === rs) return l === $t ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (s === ka) return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (s === Wa) return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (s === Wc || s === Xa || s === qa || s === Ya)
      if (((a = t.get("EXT_texture_compression_rgtc")), a !== null)) {
        if (s === rs) return a.COMPRESSED_RED_RGTC1_EXT;
        if (s === Xa) return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (s === qa) return a.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (s === Ya) return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return s === Nn
      ? n
        ? i.UNSIGNED_INT_24_8
        : ((a = t.get("WEBGL_depth_texture")), a !== null ? a.UNSIGNED_INT_24_8_WEBGL : null)
      : i[s] !== void 0
      ? i[s]
      : null;
  }
  return { convert: r };
}
class gm extends Ie {
  constructor(t = []) {
    super(), (this.isArrayCamera = !0), (this.cameras = t);
  }
}
class vr extends oe {
  constructor() {
    super(), (this.isGroup = !0), (this.type = "Group");
  }
}
const _m = { type: "move" };
class ws {
  constructor() {
    (this._targetRay = null), (this._grip = null), (this._hand = null);
  }
  getHandSpace() {
    return (
      this._hand === null &&
        ((this._hand = new vr()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 })),
      this._hand
    );
  }
  getTargetRaySpace() {
    return (
      this._targetRay === null &&
        ((this._targetRay = new vr()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new C()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new C())),
      this._targetRay
    );
  }
  getGripSpace() {
    return (
      this._grip === null &&
        ((this._grip = new vr()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new C()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new C())),
      this._grip
    );
  }
  dispatchEvent(t) {
    return (
      this._targetRay !== null && this._targetRay.dispatchEvent(t),
      this._grip !== null && this._grip.dispatchEvent(t),
      this._hand !== null && this._hand.dispatchEvent(t),
      this
    );
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e) for (const n of t.hand.values()) this._getHandJoint(e, n);
    }
    return this.dispatchEvent({ type: "connected", data: t }), this;
  }
  disconnect(t) {
    return (
      this.dispatchEvent({ type: "disconnected", data: t }),
      this._targetRay !== null && (this._targetRay.visible = !1),
      this._grip !== null && (this._grip.visible = !1),
      this._hand !== null && (this._hand.visible = !1),
      this
    );
  }
  update(t, e, n) {
    let r = null,
      s = null,
      o = null;
    const a = this._targetRay,
      l = this._grip,
      c = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (c && t.hand) {
        o = !0;
        for (const v of t.hand.values()) {
          const m = e.getJointPose(v, n),
            f = this._getHandJoint(c, v);
          m !== null &&
            (f.matrix.fromArray(m.transform.matrix),
            f.matrix.decompose(f.position, f.rotation, f.scale),
            (f.matrixWorldNeedsUpdate = !0),
            (f.jointRadius = m.radius)),
            (f.visible = m !== null);
        }
        const h = c.joints["index-finger-tip"],
          u = c.joints["thumb-tip"],
          d = h.position.distanceTo(u.position),
          p = 0.02,
          g = 0.005;
        c.inputState.pinching && d > p + g
          ? ((c.inputState.pinching = !1), this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this }))
          : !c.inputState.pinching &&
            d <= p - g &&
            ((c.inputState.pinching = !0), this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
      } else
        l !== null &&
          t.gripSpace &&
          ((s = e.getPose(t.gripSpace, n)),
          s !== null &&
            (l.matrix.fromArray(s.transform.matrix),
            l.matrix.decompose(l.position, l.rotation, l.scale),
            (l.matrixWorldNeedsUpdate = !0),
            s.linearVelocity ? ((l.hasLinearVelocity = !0), l.linearVelocity.copy(s.linearVelocity)) : (l.hasLinearVelocity = !1),
            s.angularVelocity ? ((l.hasAngularVelocity = !0), l.angularVelocity.copy(s.angularVelocity)) : (l.hasAngularVelocity = !1)));
      a !== null &&
        ((r = e.getPose(t.targetRaySpace, n)),
        r === null && s !== null && (r = s),
        r !== null &&
          (a.matrix.fromArray(r.transform.matrix),
          a.matrix.decompose(a.position, a.rotation, a.scale),
          (a.matrixWorldNeedsUpdate = !0),
          r.linearVelocity ? ((a.hasLinearVelocity = !0), a.linearVelocity.copy(r.linearVelocity)) : (a.hasLinearVelocity = !1),
          r.angularVelocity ? ((a.hasAngularVelocity = !0), a.angularVelocity.copy(r.angularVelocity)) : (a.hasAngularVelocity = !1),
          this.dispatchEvent(_m)));
    }
    return a !== null && (a.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = o !== null), this;
  }
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new vr();
      (n.matrixAutoUpdate = !1), (n.visible = !1), (t.joints[e.jointName] = n), t.add(n);
    }
    return t.joints[e.jointName];
  }
}
class vm extends zn {
  constructor(t, e) {
    super();
    const n = this;
    let r = null,
      s = 1,
      o = null,
      a = "local-floor",
      l = 1,
      c = null,
      h = null,
      u = null,
      d = null,
      p = null,
      g = null;
    const v = e.getContextAttributes();
    let m = null,
      f = null;
    const E = [],
      _ = [],
      b = new Z();
    let U = null;
    const R = new Ie();
    R.layers.enable(1), (R.viewport = new Qt());
    const w = new Ie();
    w.layers.enable(2), (w.viewport = new Qt());
    const k = [R, w],
      S = new gm();
    S.layers.enable(1), S.layers.enable(2);
    let T = null,
      O = null;
    (this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (V) {
        let tt = E[V];
        return tt === void 0 && ((tt = new ws()), (E[V] = tt)), tt.getTargetRaySpace();
      }),
      (this.getControllerGrip = function (V) {
        let tt = E[V];
        return tt === void 0 && ((tt = new ws()), (E[V] = tt)), tt.getGripSpace();
      }),
      (this.getHand = function (V) {
        let tt = E[V];
        return tt === void 0 && ((tt = new ws()), (E[V] = tt)), tt.getHandSpace();
      });
    function J(V) {
      const tt = _.indexOf(V.inputSource);
      if (tt === -1) return;
      const pt = E[tt];
      pt !== void 0 && (pt.update(V.inputSource, V.frame, c || o), pt.dispatchEvent({ type: V.type, data: V.inputSource }));
    }
    function lt() {
      r.removeEventListener("select", J),
        r.removeEventListener("selectstart", J),
        r.removeEventListener("selectend", J),
        r.removeEventListener("squeeze", J),
        r.removeEventListener("squeezestart", J),
        r.removeEventListener("squeezeend", J),
        r.removeEventListener("end", lt),
        r.removeEventListener("inputsourceschange", D);
      for (let V = 0; V < E.length; V++) {
        const tt = _[V];
        tt !== null && ((_[V] = null), E[V].disconnect(tt));
      }
      (T = null),
        (O = null),
        t.setRenderTarget(m),
        (p = null),
        (d = null),
        (u = null),
        (r = null),
        (f = null),
        dt.stop(),
        (n.isPresenting = !1),
        t.setPixelRatio(U),
        t.setSize(b.width, b.height, !1),
        n.dispatchEvent({ type: "sessionend" });
    }
    (this.setFramebufferScaleFactor = function (V) {
      (s = V), n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }),
      (this.setReferenceSpaceType = function (V) {
        (a = V), n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
      }),
      (this.getReferenceSpace = function () {
        return c || o;
      }),
      (this.setReferenceSpace = function (V) {
        c = V;
      }),
      (this.getBaseLayer = function () {
        return d !== null ? d : p;
      }),
      (this.getBinding = function () {
        return u;
      }),
      (this.getFrame = function () {
        return g;
      }),
      (this.getSession = function () {
        return r;
      }),
      (this.setSession = async function (V) {
        if (((r = V), r !== null)) {
          if (
            ((m = t.getRenderTarget()),
            r.addEventListener("select", J),
            r.addEventListener("selectstart", J),
            r.addEventListener("selectend", J),
            r.addEventListener("squeeze", J),
            r.addEventListener("squeezestart", J),
            r.addEventListener("squeezeend", J),
            r.addEventListener("end", lt),
            r.addEventListener("inputsourceschange", D),
            v.xrCompatible !== !0 && (await e.makeXRCompatible()),
            (U = t.getPixelRatio()),
            t.getSize(b),
            r.renderState.layers === void 0 || t.capabilities.isWebGL2 === !1)
          ) {
            const tt = {
              antialias: r.renderState.layers === void 0 ? v.antialias : !0,
              alpha: !0,
              depth: v.depth,
              stencil: v.stencil,
              framebufferScaleFactor: s,
            };
            (p = new XRWebGLLayer(r, e, tt)),
              r.updateRenderState({ baseLayer: p }),
              t.setPixelRatio(1),
              t.setSize(p.framebufferWidth, p.framebufferHeight, !1),
              (f = new Ge(p.framebufferWidth, p.framebufferHeight, {
                format: He,
                type: Mn,
                colorSpace: t.outputColorSpace,
                stencilBuffer: v.stencil,
              }));
          } else {
            let tt = null,
              pt = null,
              Et = null;
            v.depth && ((Et = v.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24), (tt = v.stencil ? _i : On), (pt = v.stencil ? Nn : _n));
            const xt = { colorFormat: e.RGBA8, depthFormat: Et, scaleFactor: s };
            (u = new XRWebGLBinding(r, e)),
              (d = u.createProjectionLayer(xt)),
              r.updateRenderState({ layers: [d] }),
              t.setPixelRatio(1),
              t.setSize(d.textureWidth, d.textureHeight, !1),
              (f = new Ge(d.textureWidth, d.textureHeight, {
                format: He,
                type: Mn,
                depthTexture: new Rl(d.textureWidth, d.textureHeight, pt, void 0, void 0, void 0, void 0, void 0, void 0, tt),
                stencilBuffer: v.stencil,
                colorSpace: t.outputColorSpace,
                samples: v.antialias ? 4 : 0,
              }));
            const Pt = t.properties.get(f);
            Pt.__ignoreDepthValues = d.ignoreDepthValues;
          }
          (f.isXRRenderTarget = !0),
            this.setFoveation(l),
            (c = null),
            (o = await r.requestReferenceSpace(a)),
            dt.setContext(r),
            dt.start(),
            (n.isPresenting = !0),
            n.dispatchEvent({ type: "sessionstart" });
        }
      }),
      (this.getEnvironmentBlendMode = function () {
        if (r !== null) return r.environmentBlendMode;
      });
    function D(V) {
      for (let tt = 0; tt < V.removed.length; tt++) {
        const pt = V.removed[tt],
          Et = _.indexOf(pt);
        Et >= 0 && ((_[Et] = null), E[Et].disconnect(pt));
      }
      for (let tt = 0; tt < V.added.length; tt++) {
        const pt = V.added[tt];
        let Et = _.indexOf(pt);
        if (Et === -1) {
          for (let Pt = 0; Pt < E.length; Pt++)
            if (Pt >= _.length) {
              _.push(pt), (Et = Pt);
              break;
            } else if (_[Pt] === null) {
              (_[Pt] = pt), (Et = Pt);
              break;
            }
          if (Et === -1) break;
        }
        const xt = E[Et];
        xt && xt.connect(pt);
      }
    }
    const F = new C(),
      G = new C();
    function j(V, tt, pt) {
      F.setFromMatrixPosition(tt.matrixWorld), G.setFromMatrixPosition(pt.matrixWorld);
      const Et = F.distanceTo(G),
        xt = tt.projectionMatrix.elements,
        Pt = pt.projectionMatrix.elements,
        It = xt[14] / (xt[10] - 1),
        yt = xt[14] / (xt[10] + 1),
        Ut = (xt[9] + 1) / xt[5],
        P = (xt[9] - 1) / xt[5],
        ct = (xt[8] - 1) / xt[0],
        q = (Pt[8] + 1) / Pt[0],
        st = It * ct,
        X = It * q,
        Tt = Et / (-ct + q),
        mt = Tt * -ct;
      tt.matrixWorld.decompose(V.position, V.quaternion, V.scale),
        V.translateX(mt),
        V.translateZ(Tt),
        V.matrixWorld.compose(V.position, V.quaternion, V.scale),
        V.matrixWorldInverse.copy(V.matrixWorld).invert();
      const M = It + Tt,
        x = yt + Tt,
        I = st - mt,
        it = X + (Et - mt),
        et = ((Ut * yt) / x) * M,
        K = ((P * yt) / x) * M;
      V.projectionMatrix.makePerspective(I, it, et, K, M, x), V.projectionMatrixInverse.copy(V.projectionMatrix).invert();
    }
    function Y(V, tt) {
      tt === null ? V.matrixWorld.copy(V.matrix) : V.matrixWorld.multiplyMatrices(tt.matrixWorld, V.matrix),
        V.matrixWorldInverse.copy(V.matrixWorld).invert();
    }
    this.updateCamera = function (V) {
      if (r === null) return;
      (S.near = w.near = R.near = V.near),
        (S.far = w.far = R.far = V.far),
        (T !== S.near || O !== S.far) && (r.updateRenderState({ depthNear: S.near, depthFar: S.far }), (T = S.near), (O = S.far));
      const tt = V.parent,
        pt = S.cameras;
      Y(S, tt);
      for (let Et = 0; Et < pt.length; Et++) Y(pt[Et], tt);
      pt.length === 2 ? j(S, R, w) : S.projectionMatrix.copy(R.projectionMatrix), W(V, S, tt);
    };
    function W(V, tt, pt) {
      pt === null ? V.matrix.copy(tt.matrixWorld) : (V.matrix.copy(pt.matrixWorld), V.matrix.invert(), V.matrix.multiply(tt.matrixWorld)),
        V.matrix.decompose(V.position, V.quaternion, V.scale),
        V.updateMatrixWorld(!0),
        V.projectionMatrix.copy(tt.projectionMatrix),
        V.projectionMatrixInverse.copy(tt.projectionMatrixInverse),
        V.isPerspectiveCamera && ((V.fov = Fi * 2 * Math.atan(1 / V.projectionMatrix.elements[5])), (V.zoom = 1));
    }
    (this.getCamera = function () {
      return S;
    }),
      (this.getFoveation = function () {
        if (!(d === null && p === null)) return l;
      }),
      (this.setFoveation = function (V) {
        (l = V), d !== null && (d.fixedFoveation = V), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = V);
      });
    let $ = null;
    function Q(V, tt) {
      if (((h = tt.getViewerPose(c || o)), (g = tt), h !== null)) {
        const pt = h.views;
        p !== null && (t.setRenderTargetFramebuffer(f, p.framebuffer), t.setRenderTarget(f));
        let Et = !1;
        pt.length !== S.cameras.length && ((S.cameras.length = 0), (Et = !0));
        for (let xt = 0; xt < pt.length; xt++) {
          const Pt = pt[xt];
          let It = null;
          if (p !== null) It = p.getViewport(Pt);
          else {
            const Ut = u.getViewSubImage(d, Pt);
            (It = Ut.viewport),
              xt === 0 &&
                (t.setRenderTargetTextures(f, Ut.colorTexture, d.ignoreDepthValues ? void 0 : Ut.depthStencilTexture), t.setRenderTarget(f));
          }
          let yt = k[xt];
          yt === void 0 && ((yt = new Ie()), yt.layers.enable(xt), (yt.viewport = new Qt()), (k[xt] = yt)),
            yt.matrix.fromArray(Pt.transform.matrix),
            yt.matrix.decompose(yt.position, yt.quaternion, yt.scale),
            yt.projectionMatrix.fromArray(Pt.projectionMatrix),
            yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),
            yt.viewport.set(It.x, It.y, It.width, It.height),
            xt === 0 && (S.matrix.copy(yt.matrix), S.matrix.decompose(S.position, S.quaternion, S.scale)),
            Et === !0 && S.cameras.push(yt);
        }
      }
      for (let pt = 0; pt < E.length; pt++) {
        const Et = _[pt],
          xt = E[pt];
        Et !== null && xt !== void 0 && xt.update(Et, tt, c || o);
      }
      $ && $(V, tt), tt.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: tt }), (g = null);
    }
    const dt = new wl();
    dt.setAnimationLoop(Q),
      (this.setAnimationLoop = function (V) {
        $ = V;
      }),
      (this.dispose = function () {});
  }
}
function xm(i, t) {
  function e(m, f) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), f.value.copy(m.matrix);
  }
  function n(m, f) {
    f.color.getRGB(m.fogColor.value, Tl(i)),
      f.isFog ? ((m.fogNear.value = f.near), (m.fogFar.value = f.far)) : f.isFogExp2 && (m.fogDensity.value = f.density);
  }
  function r(m, f, E, _, b) {
    f.isMeshBasicMaterial || f.isMeshLambertMaterial
      ? s(m, f)
      : f.isMeshToonMaterial
      ? (s(m, f), u(m, f))
      : f.isMeshPhongMaterial
      ? (s(m, f), h(m, f))
      : f.isMeshStandardMaterial
      ? (s(m, f), d(m, f), f.isMeshPhysicalMaterial && p(m, f, b))
      : f.isMeshMatcapMaterial
      ? (s(m, f), g(m, f))
      : f.isMeshDepthMaterial
      ? s(m, f)
      : f.isMeshDistanceMaterial
      ? (s(m, f), v(m, f))
      : f.isMeshNormalMaterial
      ? s(m, f)
      : f.isLineBasicMaterial
      ? (o(m, f), f.isLineDashedMaterial && a(m, f))
      : f.isPointsMaterial
      ? l(m, f, E, _)
      : f.isSpriteMaterial
      ? c(m, f)
      : f.isShadowMaterial
      ? (m.color.value.copy(f.color), (m.opacity.value = f.opacity))
      : f.isShaderMaterial && (f.uniformsNeedUpdate = !1);
  }
  function s(m, f) {
    (m.opacity.value = f.opacity),
      f.color && m.diffuse.value.copy(f.color),
      f.emissive && m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),
      f.map && ((m.map.value = f.map), e(f.map, m.mapTransform)),
      f.alphaMap && ((m.alphaMap.value = f.alphaMap), e(f.alphaMap, m.alphaMapTransform)),
      f.bumpMap &&
        ((m.bumpMap.value = f.bumpMap),
        e(f.bumpMap, m.bumpMapTransform),
        (m.bumpScale.value = f.bumpScale),
        f.side === Te && (m.bumpScale.value *= -1)),
      f.normalMap &&
        ((m.normalMap.value = f.normalMap),
        e(f.normalMap, m.normalMapTransform),
        m.normalScale.value.copy(f.normalScale),
        f.side === Te && m.normalScale.value.negate()),
      f.displacementMap &&
        ((m.displacementMap.value = f.displacementMap),
        e(f.displacementMap, m.displacementMapTransform),
        (m.displacementScale.value = f.displacementScale),
        (m.displacementBias.value = f.displacementBias)),
      f.emissiveMap && ((m.emissiveMap.value = f.emissiveMap), e(f.emissiveMap, m.emissiveMapTransform)),
      f.specularMap && ((m.specularMap.value = f.specularMap), e(f.specularMap, m.specularMapTransform)),
      f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    const E = t.get(f).envMap;
    if (
      (E &&
        ((m.envMap.value = E),
        (m.flipEnvMap.value = E.isCubeTexture && E.isRenderTargetTexture === !1 ? -1 : 1),
        (m.reflectivity.value = f.reflectivity),
        (m.ior.value = f.ior),
        (m.refractionRatio.value = f.refractionRatio)),
      f.lightMap)
    ) {
      m.lightMap.value = f.lightMap;
      const _ = i._useLegacyLights === !0 ? Math.PI : 1;
      (m.lightMapIntensity.value = f.lightMapIntensity * _), e(f.lightMap, m.lightMapTransform);
    }
    f.aoMap && ((m.aoMap.value = f.aoMap), (m.aoMapIntensity.value = f.aoMapIntensity), e(f.aoMap, m.aoMapTransform));
  }
  function o(m, f) {
    m.diffuse.value.copy(f.color), (m.opacity.value = f.opacity), f.map && ((m.map.value = f.map), e(f.map, m.mapTransform));
  }
  function a(m, f) {
    (m.dashSize.value = f.dashSize), (m.totalSize.value = f.dashSize + f.gapSize), (m.scale.value = f.scale);
  }
  function l(m, f, E, _) {
    m.diffuse.value.copy(f.color),
      (m.opacity.value = f.opacity),
      (m.size.value = f.size * E),
      (m.scale.value = _ * 0.5),
      f.map && ((m.map.value = f.map), e(f.map, m.uvTransform)),
      f.alphaMap && ((m.alphaMap.value = f.alphaMap), e(f.alphaMap, m.alphaMapTransform)),
      f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function c(m, f) {
    m.diffuse.value.copy(f.color),
      (m.opacity.value = f.opacity),
      (m.rotation.value = f.rotation),
      f.map && ((m.map.value = f.map), e(f.map, m.mapTransform)),
      f.alphaMap && ((m.alphaMap.value = f.alphaMap), e(f.alphaMap, m.alphaMapTransform)),
      f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function h(m, f) {
    m.specular.value.copy(f.specular), (m.shininess.value = Math.max(f.shininess, 1e-4));
  }
  function u(m, f) {
    f.gradientMap && (m.gradientMap.value = f.gradientMap);
  }
  function d(m, f) {
    (m.metalness.value = f.metalness),
      f.metalnessMap && ((m.metalnessMap.value = f.metalnessMap), e(f.metalnessMap, m.metalnessMapTransform)),
      (m.roughness.value = f.roughness),
      f.roughnessMap && ((m.roughnessMap.value = f.roughnessMap), e(f.roughnessMap, m.roughnessMapTransform)),
      t.get(f).envMap && (m.envMapIntensity.value = f.envMapIntensity);
  }
  function p(m, f, E) {
    (m.ior.value = f.ior),
      f.sheen > 0 &&
        (m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),
        (m.sheenRoughness.value = f.sheenRoughness),
        f.sheenColorMap && ((m.sheenColorMap.value = f.sheenColorMap), e(f.sheenColorMap, m.sheenColorMapTransform)),
        f.sheenRoughnessMap && ((m.sheenRoughnessMap.value = f.sheenRoughnessMap), e(f.sheenRoughnessMap, m.sheenRoughnessMapTransform))),
      f.clearcoat > 0 &&
        ((m.clearcoat.value = f.clearcoat),
        (m.clearcoatRoughness.value = f.clearcoatRoughness),
        f.clearcoatMap && ((m.clearcoatMap.value = f.clearcoatMap), e(f.clearcoatMap, m.clearcoatMapTransform)),
        f.clearcoatRoughnessMap &&
          ((m.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap), e(f.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)),
        f.clearcoatNormalMap &&
          ((m.clearcoatNormalMap.value = f.clearcoatNormalMap),
          e(f.clearcoatNormalMap, m.clearcoatNormalMapTransform),
          m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),
          f.side === Te && m.clearcoatNormalScale.value.negate())),
      f.iridescence > 0 &&
        ((m.iridescence.value = f.iridescence),
        (m.iridescenceIOR.value = f.iridescenceIOR),
        (m.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0]),
        (m.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1]),
        f.iridescenceMap && ((m.iridescenceMap.value = f.iridescenceMap), e(f.iridescenceMap, m.iridescenceMapTransform)),
        f.iridescenceThicknessMap &&
          ((m.iridescenceThicknessMap.value = f.iridescenceThicknessMap), e(f.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))),
      f.transmission > 0 &&
        ((m.transmission.value = f.transmission),
        (m.transmissionSamplerMap.value = E.texture),
        m.transmissionSamplerSize.value.set(E.width, E.height),
        f.transmissionMap && ((m.transmissionMap.value = f.transmissionMap), e(f.transmissionMap, m.transmissionMapTransform)),
        (m.thickness.value = f.thickness),
        f.thicknessMap && ((m.thicknessMap.value = f.thicknessMap), e(f.thicknessMap, m.thicknessMapTransform)),
        (m.attenuationDistance.value = f.attenuationDistance),
        m.attenuationColor.value.copy(f.attenuationColor)),
      f.anisotropy > 0 &&
        (m.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)),
        f.anisotropyMap && ((m.anisotropyMap.value = f.anisotropyMap), e(f.anisotropyMap, m.anisotropyMapTransform))),
      (m.specularIntensity.value = f.specularIntensity),
      m.specularColor.value.copy(f.specularColor),
      f.specularColorMap && ((m.specularColorMap.value = f.specularColorMap), e(f.specularColorMap, m.specularColorMapTransform)),
      f.specularIntensityMap && ((m.specularIntensityMap.value = f.specularIntensityMap), e(f.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function g(m, f) {
    f.matcap && (m.matcap.value = f.matcap);
  }
  function v(m, f) {
    const E = t.get(f).light;
    m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),
      (m.nearDistance.value = E.shadow.camera.near),
      (m.farDistance.value = E.shadow.camera.far);
  }
  return { refreshFogUniforms: n, refreshMaterialUniforms: r };
}
function Mm(i, t, e, n) {
  let r = {},
    s = {},
    o = [];
  const a = e.isWebGL2 ? i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function l(E, _) {
    const b = _.program;
    n.uniformBlockBinding(E, b);
  }
  function c(E, _) {
    let b = r[E.id];
    b === void 0 && (g(E), (b = h(E)), (r[E.id] = b), E.addEventListener("dispose", m));
    const U = _.program;
    n.updateUBOMapping(E, U);
    const R = t.render.frame;
    s[E.id] !== R && (d(E), (s[E.id] = R));
  }
  function h(E) {
    const _ = u();
    E.__bindingPointIndex = _;
    const b = i.createBuffer(),
      U = E.__size,
      R = E.usage;
    return (
      i.bindBuffer(i.UNIFORM_BUFFER, b),
      i.bufferData(i.UNIFORM_BUFFER, U, R),
      i.bindBuffer(i.UNIFORM_BUFFER, null),
      i.bindBufferBase(i.UNIFORM_BUFFER, _, b),
      b
    );
  }
  function u() {
    for (let E = 0; E < a; E++) if (o.indexOf(E) === -1) return o.push(E), E;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(E) {
    const _ = r[E.id],
      b = E.uniforms,
      U = E.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, _);
    for (let R = 0, w = b.length; R < w; R++) {
      const k = Array.isArray(b[R]) ? b[R] : [b[R]];
      for (let S = 0, T = k.length; S < T; S++) {
        const O = k[S];
        if (p(O, R, S, U) === !0) {
          const J = O.__offset,
            lt = Array.isArray(O.value) ? O.value : [O.value];
          let D = 0;
          for (let F = 0; F < lt.length; F++) {
            const G = lt[F],
              j = v(G);
            typeof G == "number" || typeof G == "boolean"
              ? ((O.__data[0] = G), i.bufferSubData(i.UNIFORM_BUFFER, J + D, O.__data))
              : G.isMatrix3
              ? ((O.__data[0] = G.elements[0]),
                (O.__data[1] = G.elements[1]),
                (O.__data[2] = G.elements[2]),
                (O.__data[3] = 0),
                (O.__data[4] = G.elements[3]),
                (O.__data[5] = G.elements[4]),
                (O.__data[6] = G.elements[5]),
                (O.__data[7] = 0),
                (O.__data[8] = G.elements[6]),
                (O.__data[9] = G.elements[7]),
                (O.__data[10] = G.elements[8]),
                (O.__data[11] = 0))
              : (G.toArray(O.__data, D), (D += j.storage / Float32Array.BYTES_PER_ELEMENT));
          }
          i.bufferSubData(i.UNIFORM_BUFFER, J, O.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function p(E, _, b, U) {
    const R = E.value,
      w = _ + "_" + b;
    if (U[w] === void 0) return typeof R == "number" || typeof R == "boolean" ? (U[w] = R) : (U[w] = R.clone()), !0;
    {
      const k = U[w];
      if (typeof R == "number" || typeof R == "boolean") {
        if (k !== R) return (U[w] = R), !0;
      } else if (k.equals(R) === !1) return k.copy(R), !0;
    }
    return !1;
  }
  function g(E) {
    const _ = E.uniforms;
    let b = 0;
    const U = 16;
    for (let w = 0, k = _.length; w < k; w++) {
      const S = Array.isArray(_[w]) ? _[w] : [_[w]];
      for (let T = 0, O = S.length; T < O; T++) {
        const J = S[T],
          lt = Array.isArray(J.value) ? J.value : [J.value];
        for (let D = 0, F = lt.length; D < F; D++) {
          const G = lt[D],
            j = v(G),
            Y = b % U;
          Y !== 0 && U - Y < j.boundary && (b += U - Y),
            (J.__data = new Float32Array(j.storage / Float32Array.BYTES_PER_ELEMENT)),
            (J.__offset = b),
            (b += j.storage);
        }
      }
    }
    const R = b % U;
    return R > 0 && (b += U - R), (E.__size = b), (E.__cache = {}), this;
  }
  function v(E) {
    const _ = { boundary: 0, storage: 0 };
    return (
      typeof E == "number" || typeof E == "boolean"
        ? ((_.boundary = 4), (_.storage = 4))
        : E.isVector2
        ? ((_.boundary = 8), (_.storage = 8))
        : E.isVector3 || E.isColor
        ? ((_.boundary = 16), (_.storage = 12))
        : E.isVector4
        ? ((_.boundary = 16), (_.storage = 16))
        : E.isMatrix3
        ? ((_.boundary = 48), (_.storage = 48))
        : E.isMatrix4
        ? ((_.boundary = 64), (_.storage = 64))
        : E.isTexture
        ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.")
        : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", E),
      _
    );
  }
  function m(E) {
    const _ = E.target;
    _.removeEventListener("dispose", m);
    const b = o.indexOf(_.__bindingPointIndex);
    o.splice(b, 1), i.deleteBuffer(r[_.id]), delete r[_.id], delete s[_.id];
  }
  function f() {
    for (const E in r) i.deleteBuffer(r[E]);
    (o = []), (r = {}), (s = {});
  }
  return { bind: l, update: c, dispose: f };
}
class Sm {
  constructor(t = {}) {
    const {
      canvas: e = gh(),
      context: n = null,
      depth: r = !0,
      stencil: s = !0,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: u = !1,
    } = t;
    this.isWebGLRenderer = !0;
    let d;
    n !== null ? (d = n.getContextAttributes().alpha) : (d = o);
    const p = new Uint32Array(4),
      g = new Int32Array(4);
    let v = null,
      m = null;
    const f = [],
      E = [];
    (this.domElement = e),
      (this.debug = { checkShaderErrors: !0, onShaderError: null }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this._outputColorSpace = ge),
      (this._useLegacyLights = !1),
      (this.toneMapping = xn),
      (this.toneMappingExposure = 1);
    const _ = this;
    let b = !1,
      U = 0,
      R = 0,
      w = null,
      k = -1,
      S = null;
    const T = new Qt(),
      O = new Qt();
    let J = null;
    const lt = new Ft(0);
    let D = 0,
      F = e.width,
      G = e.height,
      j = 1,
      Y = null,
      W = null;
    const $ = new Qt(0, 0, F, G),
      Q = new Qt(0, 0, F, G);
    let dt = !1;
    const V = new ia();
    let tt = !1,
      pt = !1,
      Et = null;
    const xt = new te(),
      Pt = new Z(),
      It = new C(),
      yt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function Ut() {
      return w === null ? j : 1;
    }
    let P = n;
    function ct(y, N) {
      for (let z = 0; z < y.length; z++) {
        const H = y[z],
          B = e.getContext(H, N);
        if (B !== null) return B;
      }
      return null;
    }
    try {
      const y = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: a,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: u,
      };
      if (
        ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${$s}`),
        e.addEventListener("webglcontextlost", rt, !1),
        e.addEventListener("webglcontextrestored", L, !1),
        e.addEventListener("webglcontextcreationerror", ot, !1),
        P === null)
      ) {
        const N = ["webgl2", "webgl", "experimental-webgl"];
        if ((_.isWebGL1Renderer === !0 && N.shift(), (P = ct(N, y)), P === null))
          throw ct(N) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
      typeof WebGLRenderingContext != "undefined" &&
        P instanceof WebGLRenderingContext &&
        console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),
        P.getShaderPrecisionFormat === void 0 &&
          (P.getShaderPrecisionFormat = function () {
            return { rangeMin: 1, rangeMax: 1, precision: 1 };
          });
    } catch (y) {
      throw (console.error("THREE.WebGLRenderer: " + y.message), y);
    }
    let q, st, X, Tt, mt, M, x, I, it, et, K, St, ut, _t, Rt, Bt, nt, jt, Vt, Nt, wt, gt, A, at;
    function bt() {
      (q = new Pd(P)),
        (st = new Td(P, q, t)),
        q.init(st),
        (gt = new mm(P, q, st)),
        (X = new dm(P, q, st)),
        (Tt = new Ud(P)),
        (mt = new Qp()),
        (M = new pm(P, q, X, mt, st, gt, Tt)),
        (x = new Ad(_)),
        (I = new Cd(_)),
        (it = new Hh(P, st)),
        (A = new yd(P, q, it, st)),
        (et = new Ld(P, it, Tt, A)),
        (K = new Fd(P, et, it, Tt)),
        (Vt = new Od(P, st, M)),
        (Bt = new bd(mt)),
        (St = new $p(_, x, I, q, st, A, Bt)),
        (ut = new xm(_, mt)),
        (_t = new em()),
        (Rt = new om(q, st)),
        (jt = new Sd(_, x, I, X, K, d, l)),
        (nt = new fm(_, K, st)),
        (at = new Mm(P, Tt, st, X)),
        (Nt = new Ed(P, q, Tt, st)),
        (wt = new Dd(P, q, Tt, st)),
        (Tt.programs = St.programs),
        (_.capabilities = st),
        (_.extensions = q),
        (_.properties = mt),
        (_.renderLists = _t),
        (_.shadowMap = nt),
        (_.state = X),
        (_.info = Tt);
    }
    bt();
    const Mt = new vm(_, P);
    (this.xr = Mt),
      (this.getContext = function () {
        return P;
      }),
      (this.getContextAttributes = function () {
        return P.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        const y = q.get("WEBGL_lose_context");
        y && y.loseContext();
      }),
      (this.forceContextRestore = function () {
        const y = q.get("WEBGL_lose_context");
        y && y.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return j;
      }),
      (this.setPixelRatio = function (y) {
        y !== void 0 && ((j = y), this.setSize(F, G, !1));
      }),
      (this.getSize = function (y) {
        return y.set(F, G);
      }),
      (this.setSize = function (y, N, z = !0) {
        if (Mt.isPresenting) {
          console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
          return;
        }
        (F = y),
          (G = N),
          (e.width = Math.floor(y * j)),
          (e.height = Math.floor(N * j)),
          z === !0 && ((e.style.width = y + "px"), (e.style.height = N + "px")),
          this.setViewport(0, 0, y, N);
      }),
      (this.getDrawingBufferSize = function (y) {
        return y.set(F * j, G * j).floor();
      }),
      (this.setDrawingBufferSize = function (y, N, z) {
        (F = y), (G = N), (j = z), (e.width = Math.floor(y * z)), (e.height = Math.floor(N * z)), this.setViewport(0, 0, y, N);
      }),
      (this.getCurrentViewport = function (y) {
        return y.copy(T);
      }),
      (this.getViewport = function (y) {
        return y.copy($);
      }),
      (this.setViewport = function (y, N, z, H) {
        y.isVector4 ? $.set(y.x, y.y, y.z, y.w) : $.set(y, N, z, H), X.viewport(T.copy($).multiplyScalar(j).floor());
      }),
      (this.getScissor = function (y) {
        return y.copy(Q);
      }),
      (this.setScissor = function (y, N, z, H) {
        y.isVector4 ? Q.set(y.x, y.y, y.z, y.w) : Q.set(y, N, z, H), X.scissor(O.copy(Q).multiplyScalar(j).floor());
      }),
      (this.getScissorTest = function () {
        return dt;
      }),
      (this.setScissorTest = function (y) {
        X.setScissorTest((dt = y));
      }),
      (this.setOpaqueSort = function (y) {
        Y = y;
      }),
      (this.setTransparentSort = function (y) {
        W = y;
      }),
      (this.getClearColor = function (y) {
        return y.copy(jt.getClearColor());
      }),
      (this.setClearColor = function () {
        jt.setClearColor.apply(jt, arguments);
      }),
      (this.getClearAlpha = function () {
        return jt.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        jt.setClearAlpha.apply(jt, arguments);
      }),
      (this.clear = function (y = !0, N = !0, z = !0) {
        let H = 0;
        if (y) {
          let B = !1;
          if (w !== null) {
            const vt = w.texture.format;
            B = vt === fl || vt === ul || vt === hl;
          }
          if (B) {
            const vt = w.texture.type,
              At = vt === Mn || vt === _n || vt === Qs || vt === Nn || vt === ll || vt === cl,
              Dt = jt.getClearColor(),
              Ot = jt.getClearAlpha(),
              kt = Dt.r,
              zt = Dt.g,
              Ht = Dt.b;
            At
              ? ((p[0] = kt), (p[1] = zt), (p[2] = Ht), (p[3] = Ot), P.clearBufferuiv(P.COLOR, 0, p))
              : ((g[0] = kt), (g[1] = zt), (g[2] = Ht), (g[3] = Ot), P.clearBufferiv(P.COLOR, 0, g));
          } else H |= P.COLOR_BUFFER_BIT;
        }
        N && (H |= P.DEPTH_BUFFER_BIT), z && ((H |= P.STENCIL_BUFFER_BIT), this.state.buffers.stencil.setMask(4294967295)), P.clear(H);
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        e.removeEventListener("webglcontextlost", rt, !1),
          e.removeEventListener("webglcontextrestored", L, !1),
          e.removeEventListener("webglcontextcreationerror", ot, !1),
          _t.dispose(),
          Rt.dispose(),
          mt.dispose(),
          x.dispose(),
          I.dispose(),
          K.dispose(),
          A.dispose(),
          at.dispose(),
          St.dispose(),
          Mt.dispose(),
          Mt.removeEventListener("sessionstart", se),
          Mt.removeEventListener("sessionend", Zt),
          Et && (Et.dispose(), (Et = null)),
          le.stop();
      });
    function rt(y) {
      y.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), (b = !0);
    }
    function L() {
      console.log("THREE.WebGLRenderer: Context Restored."), (b = !1);
      const y = Tt.autoReset,
        N = nt.enabled,
        z = nt.autoUpdate,
        H = nt.needsUpdate,
        B = nt.type;
      bt(), (Tt.autoReset = y), (nt.enabled = N), (nt.autoUpdate = z), (nt.needsUpdate = H), (nt.type = B);
    }
    function ot(y) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", y.statusMessage);
    }
    function ft(y) {
      const N = y.target;
      N.removeEventListener("dispose", ft), Lt(N);
    }
    function Lt(y) {
      Ct(y), mt.remove(y);
    }
    function Ct(y) {
      const N = mt.get(y).programs;
      N !== void 0 &&
        (N.forEach(function (z) {
          St.releaseProgram(z);
        }),
        y.isShaderMaterial && St.releaseShaderCache(y));
    }
    this.renderBufferDirect = function (y, N, z, H, B, vt) {
      N === null && (N = yt);
      const At = B.isMesh && B.matrixWorld.determinant() < 0,
        Dt = $l(y, N, z, H, B);
      X.setMaterial(H, At);
      let Ot = z.index,
        kt = 1;
      if (H.wireframe === !0) {
        if (((Ot = et.getWireframeAttribute(z)), Ot === void 0)) return;
        kt = 2;
      }
      const zt = z.drawRange,
        Ht = z.attributes.position;
      let ae = zt.start * kt,
        be = (zt.start + zt.count) * kt;
      vt !== null && ((ae = Math.max(ae, vt.start * kt)), (be = Math.min(be, (vt.start + vt.count) * kt))),
        Ot !== null ? ((ae = Math.max(ae, 0)), (be = Math.min(be, Ot.count))) : Ht != null && ((ae = Math.max(ae, 0)), (be = Math.min(be, Ht.count)));
      const fe = be - ae;
      if (fe < 0 || fe === 1 / 0) return;
      A.setup(B, H, Dt, z, Ot);
      let Ke,
        ee = Nt;
      if ((Ot !== null && ((Ke = it.get(Ot)), (ee = wt), ee.setIndex(Ke)), B.isMesh))
        H.wireframe === !0 ? (X.setLineWidth(H.wireframeLinewidth * Ut()), ee.setMode(P.LINES)) : ee.setMode(P.TRIANGLES);
      else if (B.isLine) {
        let Wt = H.linewidth;
        Wt === void 0 && (Wt = 1),
          X.setLineWidth(Wt * Ut()),
          B.isLineSegments ? ee.setMode(P.LINES) : B.isLineLoop ? ee.setMode(P.LINE_LOOP) : ee.setMode(P.LINE_STRIP);
      } else B.isPoints ? ee.setMode(P.POINTS) : B.isSprite && ee.setMode(P.TRIANGLES);
      if (B.isBatchedMesh) ee.renderMultiDraw(B._multiDrawStarts, B._multiDrawCounts, B._multiDrawCount);
      else if (B.isInstancedMesh) ee.renderInstances(ae, fe, B.count);
      else if (z.isInstancedBufferGeometry) {
        const Wt = z._maxInstanceCount !== void 0 ? z._maxInstanceCount : 1 / 0,
          Zr = Math.min(z.instanceCount, Wt);
        ee.renderInstances(ae, fe, Zr);
      } else ee.render(ae, fe);
    };
    function qt(y, N, z) {
      y.transparent === !0 && y.side === sn && y.forceSinglePass === !1
        ? ((y.side = Te), (y.needsUpdate = !0), Zi(y, N, z), (y.side = Sn), (y.needsUpdate = !0), Zi(y, N, z), (y.side = sn))
        : Zi(y, N, z);
    }
    (this.compile = function (y, N, z = null) {
      z === null && (z = y),
        (m = Rt.get(z)),
        m.init(),
        E.push(m),
        z.traverseVisible(function (B) {
          B.isLight && B.layers.test(N.layers) && (m.pushLight(B), B.castShadow && m.pushShadow(B));
        }),
        y !== z &&
          y.traverseVisible(function (B) {
            B.isLight && B.layers.test(N.layers) && (m.pushLight(B), B.castShadow && m.pushShadow(B));
          }),
        m.setupLights(_._useLegacyLights);
      const H = new Set();
      return (
        y.traverse(function (B) {
          const vt = B.material;
          if (vt)
            if (Array.isArray(vt))
              for (let At = 0; At < vt.length; At++) {
                const Dt = vt[At];
                qt(Dt, z, B), H.add(Dt);
              }
            else qt(vt, z, B), H.add(vt);
        }),
        E.pop(),
        (m = null),
        H
      );
    }),
      (this.compileAsync = function (y, N, z = null) {
        const H = this.compile(y, N, z);
        return new Promise((B) => {
          function vt() {
            if (
              (H.forEach(function (At) {
                mt.get(At).currentProgram.isReady() && H.delete(At);
              }),
              H.size === 0)
            ) {
              B(y);
              return;
            }
            setTimeout(vt, 10);
          }
          q.get("KHR_parallel_shader_compile") !== null ? vt() : setTimeout(vt, 10);
        });
      });
    let Yt = null;
    function ie(y) {
      Yt && Yt(y);
    }
    function se() {
      le.stop();
    }
    function Zt() {
      le.start();
    }
    const le = new wl();
    le.setAnimationLoop(ie),
      typeof self != "undefined" && le.setContext(self),
      (this.setAnimationLoop = function (y) {
        (Yt = y), Mt.setAnimationLoop(y), y === null ? le.stop() : le.start();
      }),
      Mt.addEventListener("sessionstart", se),
      Mt.addEventListener("sessionend", Zt),
      (this.render = function (y, N) {
        if (N !== void 0 && N.isCamera !== !0) {
          console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          return;
        }
        if (b === !0) return;
        y.matrixWorldAutoUpdate === !0 && y.updateMatrixWorld(),
          N.parent === null && N.matrixWorldAutoUpdate === !0 && N.updateMatrixWorld(),
          Mt.enabled === !0 && Mt.isPresenting === !0 && (Mt.cameraAutoUpdate === !0 && Mt.updateCamera(N), (N = Mt.getCamera())),
          y.isScene === !0 && y.onBeforeRender(_, y, N, w),
          (m = Rt.get(y, E.length)),
          m.init(),
          E.push(m),
          xt.multiplyMatrices(N.projectionMatrix, N.matrixWorldInverse),
          V.setFromProjectionMatrix(xt),
          (pt = this.localClippingEnabled),
          (tt = Bt.init(this.clippingPlanes, pt)),
          (v = _t.get(y, f.length)),
          v.init(),
          f.push(v),
          ke(y, N, 0, _.sortObjects),
          v.finish(),
          _.sortObjects === !0 && v.sort(Y, W),
          this.info.render.frame++,
          tt === !0 && Bt.beginShadows();
        const z = m.state.shadowsArray;
        if (
          (nt.render(z, y, N),
          tt === !0 && Bt.endShadows(),
          this.info.autoReset === !0 && this.info.reset(),
          jt.render(v, y),
          m.setupLights(_._useLegacyLights),
          N.isArrayCamera)
        ) {
          const H = N.cameras;
          for (let B = 0, vt = H.length; B < vt; B++) {
            const At = H[B];
            ua(v, y, At, At.viewport);
          }
        } else ua(v, y, N);
        w !== null && (M.updateMultisampleRenderTarget(w), M.updateRenderTargetMipmap(w)),
          y.isScene === !0 && y.onAfterRender(_, y, N),
          A.resetDefaultState(),
          (k = -1),
          (S = null),
          E.pop(),
          E.length > 0 ? (m = E[E.length - 1]) : (m = null),
          f.pop(),
          f.length > 0 ? (v = f[f.length - 1]) : (v = null);
      });
    function ke(y, N, z, H) {
      if (y.visible === !1) return;
      if (y.layers.test(N.layers)) {
        if (y.isGroup) z = y.renderOrder;
        else if (y.isLOD) y.autoUpdate === !0 && y.update(N);
        else if (y.isLight) m.pushLight(y), y.castShadow && m.pushShadow(y);
        else if (y.isSprite) {
          if (!y.frustumCulled || V.intersectsSprite(y)) {
            H && It.setFromMatrixPosition(y.matrixWorld).applyMatrix4(xt);
            const At = K.update(y),
              Dt = y.material;
            Dt.visible && v.push(y, At, Dt, z, It.z, null);
          }
        } else if ((y.isMesh || y.isLine || y.isPoints) && (!y.frustumCulled || V.intersectsObject(y))) {
          const At = K.update(y),
            Dt = y.material;
          if (
            (H &&
              (y.boundingSphere !== void 0
                ? (y.boundingSphere === null && y.computeBoundingSphere(), It.copy(y.boundingSphere.center))
                : (At.boundingSphere === null && At.computeBoundingSphere(), It.copy(At.boundingSphere.center)),
              It.applyMatrix4(y.matrixWorld).applyMatrix4(xt)),
            Array.isArray(Dt))
          ) {
            const Ot = At.groups;
            for (let kt = 0, zt = Ot.length; kt < zt; kt++) {
              const Ht = Ot[kt],
                ae = Dt[Ht.materialIndex];
              ae && ae.visible && v.push(y, At, ae, z, It.z, Ht);
            }
          } else Dt.visible && v.push(y, At, Dt, z, It.z, null);
        }
      }
      const vt = y.children;
      for (let At = 0, Dt = vt.length; At < Dt; At++) ke(vt[At], N, z, H);
    }
    function ua(y, N, z, H) {
      const B = y.opaque,
        vt = y.transmissive,
        At = y.transparent;
      m.setupLightsView(z),
        tt === !0 && Bt.setGlobalState(_.clippingPlanes, z),
        vt.length > 0 && Jl(B, vt, N, z),
        H && X.viewport(T.copy(H)),
        B.length > 0 && ji(B, N, z),
        vt.length > 0 && ji(vt, N, z),
        At.length > 0 && ji(At, N, z),
        X.buffers.depth.setTest(!0),
        X.buffers.depth.setMask(!0),
        X.buffers.color.setMask(!0),
        X.setPolygonOffset(!1);
    }
    function Jl(y, N, z, H) {
      if ((z.isScene === !0 ? z.overrideMaterial : null) !== null) return;
      const vt = st.isWebGL2;
      Et === null &&
        (Et = new Ge(1, 1, { generateMipmaps: !0, type: q.has("EXT_color_buffer_half_float") ? cn : Mn, minFilter: Oi, samples: vt ? 4 : 0 })),
        _.getDrawingBufferSize(Pt),
        vt ? Et.setSize(Pt.x, Pt.y) : Et.setSize(Fr(Pt.x), Fr(Pt.y));
      const At = _.getRenderTarget();
      _.setRenderTarget(Et), _.getClearColor(lt), (D = _.getClearAlpha()), D < 1 && _.setClearColor(16777215, 0.5), _.clear();
      const Dt = _.toneMapping;
      (_.toneMapping = xn), ji(y, z, H), M.updateMultisampleRenderTarget(Et), M.updateRenderTargetMipmap(Et);
      let Ot = !1;
      for (let kt = 0, zt = N.length; kt < zt; kt++) {
        const Ht = N[kt],
          ae = Ht.object,
          be = Ht.geometry,
          fe = Ht.material,
          Ke = Ht.group;
        if (fe.side === sn && ae.layers.test(H.layers)) {
          const ee = fe.side;
          (fe.side = Te), (fe.needsUpdate = !0), fa(ae, z, H, be, fe, Ke), (fe.side = ee), (fe.needsUpdate = !0), (Ot = !0);
        }
      }
      Ot === !0 && (M.updateMultisampleRenderTarget(Et), M.updateRenderTargetMipmap(Et)),
        _.setRenderTarget(At),
        _.setClearColor(lt, D),
        (_.toneMapping = Dt);
    }
    function ji(y, N, z) {
      const H = N.isScene === !0 ? N.overrideMaterial : null;
      for (let B = 0, vt = y.length; B < vt; B++) {
        const At = y[B],
          Dt = At.object,
          Ot = At.geometry,
          kt = H === null ? At.material : H,
          zt = At.group;
        Dt.layers.test(z.layers) && fa(Dt, N, z, Ot, kt, zt);
      }
    }
    function fa(y, N, z, H, B, vt) {
      y.onBeforeRender(_, N, z, H, B, vt),
        y.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse, y.matrixWorld),
        y.normalMatrix.getNormalMatrix(y.modelViewMatrix),
        B.onBeforeRender(_, N, z, H, y, vt),
        B.transparent === !0 && B.side === sn && B.forceSinglePass === !1
          ? ((B.side = Te),
            (B.needsUpdate = !0),
            _.renderBufferDirect(z, N, H, B, y, vt),
            (B.side = Sn),
            (B.needsUpdate = !0),
            _.renderBufferDirect(z, N, H, B, y, vt),
            (B.side = sn))
          : _.renderBufferDirect(z, N, H, B, y, vt),
        y.onAfterRender(_, N, z, H, B, vt);
    }
    function Zi(y, N, z) {
      N.isScene !== !0 && (N = yt);
      const H = mt.get(y),
        B = m.state.lights,
        vt = m.state.shadowsArray,
        At = B.state.version,
        Dt = St.getParameters(y, B.state, vt, N, z),
        Ot = St.getProgramCacheKey(Dt);
      let kt = H.programs;
      (H.environment = y.isMeshStandardMaterial ? N.environment : null),
        (H.fog = N.fog),
        (H.envMap = (y.isMeshStandardMaterial ? I : x).get(y.envMap || H.environment)),
        kt === void 0 && (y.addEventListener("dispose", ft), (kt = new Map()), (H.programs = kt));
      let zt = kt.get(Ot);
      if (zt !== void 0) {
        if (H.currentProgram === zt && H.lightsStateVersion === At) return pa(y, Dt), zt;
      } else
        (Dt.uniforms = St.getUniforms(y)),
          y.onBuild(z, Dt, _),
          y.onBeforeCompile(Dt, _),
          (zt = St.acquireProgram(Dt, Ot)),
          kt.set(Ot, zt),
          (H.uniforms = Dt.uniforms);
      const Ht = H.uniforms;
      return (
        ((!y.isShaderMaterial && !y.isRawShaderMaterial) || y.clipping === !0) && (Ht.clippingPlanes = Bt.uniform),
        pa(y, Dt),
        (H.needsLights = tc(y)),
        (H.lightsStateVersion = At),
        H.needsLights &&
          ((Ht.ambientLightColor.value = B.state.ambient),
          (Ht.lightProbe.value = B.state.probe),
          (Ht.directionalLights.value = B.state.directional),
          (Ht.directionalLightShadows.value = B.state.directionalShadow),
          (Ht.spotLights.value = B.state.spot),
          (Ht.spotLightShadows.value = B.state.spotShadow),
          (Ht.rectAreaLights.value = B.state.rectArea),
          (Ht.ltc_1.value = B.state.rectAreaLTC1),
          (Ht.ltc_2.value = B.state.rectAreaLTC2),
          (Ht.pointLights.value = B.state.point),
          (Ht.pointLightShadows.value = B.state.pointShadow),
          (Ht.hemisphereLights.value = B.state.hemi),
          (Ht.directionalShadowMap.value = B.state.directionalShadowMap),
          (Ht.directionalShadowMatrix.value = B.state.directionalShadowMatrix),
          (Ht.spotShadowMap.value = B.state.spotShadowMap),
          (Ht.spotLightMatrix.value = B.state.spotLightMatrix),
          (Ht.spotLightMap.value = B.state.spotLightMap),
          (Ht.pointShadowMap.value = B.state.pointShadowMap),
          (Ht.pointShadowMatrix.value = B.state.pointShadowMatrix)),
        (H.currentProgram = zt),
        (H.uniformsList = null),
        zt
      );
    }
    function da(y) {
      if (y.uniformsList === null) {
        const N = y.currentProgram.getUniforms();
        y.uniformsList = Pr.seqWithValue(N.seq, y.uniforms);
      }
      return y.uniformsList;
    }
    function pa(y, N) {
      const z = mt.get(y);
      (z.outputColorSpace = N.outputColorSpace),
        (z.batching = N.batching),
        (z.instancing = N.instancing),
        (z.instancingColor = N.instancingColor),
        (z.skinning = N.skinning),
        (z.morphTargets = N.morphTargets),
        (z.morphNormals = N.morphNormals),
        (z.morphColors = N.morphColors),
        (z.morphTargetsCount = N.morphTargetsCount),
        (z.numClippingPlanes = N.numClippingPlanes),
        (z.numIntersection = N.numClipIntersection),
        (z.vertexAlphas = N.vertexAlphas),
        (z.vertexTangents = N.vertexTangents),
        (z.toneMapping = N.toneMapping);
    }
    function $l(y, N, z, H, B) {
      N.isScene !== !0 && (N = yt), M.resetTextureUnits();
      const vt = N.fog,
        At = H.isMeshStandardMaterial ? N.environment : null,
        Dt = w === null ? _.outputColorSpace : w.isXRRenderTarget === !0 ? w.texture.colorSpace : hn,
        Ot = (H.isMeshStandardMaterial ? I : x).get(H.envMap || At),
        kt = H.vertexColors === !0 && !!z.attributes.color && z.attributes.color.itemSize === 4,
        zt = !!z.attributes.tangent && (!!H.normalMap || H.anisotropy > 0),
        Ht = !!z.morphAttributes.position,
        ae = !!z.morphAttributes.normal,
        be = !!z.morphAttributes.color;
      let fe = xn;
      H.toneMapped && (w === null || w.isXRRenderTarget === !0) && (fe = _.toneMapping);
      const Ke = z.morphAttributes.position || z.morphAttributes.normal || z.morphAttributes.color,
        ee = Ke !== void 0 ? Ke.length : 0,
        Wt = mt.get(H),
        Zr = m.state.lights;
      if (tt === !0 && (pt === !0 || y !== S)) {
        const Pe = y === S && H.id === k;
        Bt.setState(H, y, Pe);
      }
      let re = !1;
      H.version === Wt.__version
        ? ((Wt.needsLights && Wt.lightsStateVersion !== Zr.state.version) ||
            Wt.outputColorSpace !== Dt ||
            (B.isBatchedMesh && Wt.batching === !1) ||
            (!B.isBatchedMesh && Wt.batching === !0) ||
            (B.isInstancedMesh && Wt.instancing === !1) ||
            (!B.isInstancedMesh && Wt.instancing === !0) ||
            (B.isSkinnedMesh && Wt.skinning === !1) ||
            (!B.isSkinnedMesh && Wt.skinning === !0) ||
            (B.isInstancedMesh && Wt.instancingColor === !0 && B.instanceColor === null) ||
            (B.isInstancedMesh && Wt.instancingColor === !1 && B.instanceColor !== null) ||
            Wt.envMap !== Ot ||
            (H.fog === !0 && Wt.fog !== vt) ||
            (Wt.numClippingPlanes !== void 0 && (Wt.numClippingPlanes !== Bt.numPlanes || Wt.numIntersection !== Bt.numIntersection)) ||
            Wt.vertexAlphas !== kt ||
            Wt.vertexTangents !== zt ||
            Wt.morphTargets !== Ht ||
            Wt.morphNormals !== ae ||
            Wt.morphColors !== be ||
            Wt.toneMapping !== fe ||
            (st.isWebGL2 === !0 && Wt.morphTargetsCount !== ee)) &&
          (re = !0)
        : ((re = !0), (Wt.__version = H.version));
      let En = Wt.currentProgram;
      re === !0 && (En = Zi(H, N, B));
      let ma = !1,
        Mi = !1,
        Kr = !1;
      const _e = En.getUniforms(),
        Tn = Wt.uniforms;
      if ((X.useProgram(En.program) && ((ma = !0), (Mi = !0), (Kr = !0)), H.id !== k && ((k = H.id), (Mi = !0)), ma || S !== y)) {
        _e.setValue(P, "projectionMatrix", y.projectionMatrix), _e.setValue(P, "viewMatrix", y.matrixWorldInverse);
        const Pe = _e.map.cameraPosition;
        Pe !== void 0 && Pe.setValue(P, It.setFromMatrixPosition(y.matrixWorld)),
          st.logarithmicDepthBuffer && _e.setValue(P, "logDepthBufFC", 2 / (Math.log(y.far + 1) / Math.LN2)),
          (H.isMeshPhongMaterial ||
            H.isMeshToonMaterial ||
            H.isMeshLambertMaterial ||
            H.isMeshBasicMaterial ||
            H.isMeshStandardMaterial ||
            H.isShaderMaterial) &&
            _e.setValue(P, "isOrthographic", y.isOrthographicCamera === !0),
          S !== y && ((S = y), (Mi = !0), (Kr = !0));
      }
      if (B.isSkinnedMesh) {
        _e.setOptional(P, B, "bindMatrix"), _e.setOptional(P, B, "bindMatrixInverse");
        const Pe = B.skeleton;
        Pe &&
          (st.floatVertexTextures
            ? (Pe.boneTexture === null && Pe.computeBoneTexture(), _e.setValue(P, "boneTexture", Pe.boneTexture, M))
            : console.warn(
                "THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."
              ));
      }
      B.isBatchedMesh && (_e.setOptional(P, B, "batchingTexture"), _e.setValue(P, "batchingTexture", B._matricesTexture, M));
      const Jr = z.morphAttributes;
      if (
        ((Jr.position !== void 0 || Jr.normal !== void 0 || (Jr.color !== void 0 && st.isWebGL2 === !0)) && Vt.update(B, z, En),
        (Mi || Wt.receiveShadow !== B.receiveShadow) && ((Wt.receiveShadow = B.receiveShadow), _e.setValue(P, "receiveShadow", B.receiveShadow)),
        H.isMeshGouraudMaterial &&
          H.envMap !== null &&
          ((Tn.envMap.value = Ot), (Tn.flipEnvMap.value = Ot.isCubeTexture && Ot.isRenderTargetTexture === !1 ? -1 : 1)),
        Mi &&
          (_e.setValue(P, "toneMappingExposure", _.toneMappingExposure),
          Wt.needsLights && Ql(Tn, Kr),
          vt && H.fog === !0 && ut.refreshFogUniforms(Tn, vt),
          ut.refreshMaterialUniforms(Tn, H, j, G, Et),
          Pr.upload(P, da(Wt), Tn, M)),
        H.isShaderMaterial && H.uniformsNeedUpdate === !0 && (Pr.upload(P, da(Wt), Tn, M), (H.uniformsNeedUpdate = !1)),
        H.isSpriteMaterial && _e.setValue(P, "center", B.center),
        _e.setValue(P, "modelViewMatrix", B.modelViewMatrix),
        _e.setValue(P, "normalMatrix", B.normalMatrix),
        _e.setValue(P, "modelMatrix", B.matrixWorld),
        H.isShaderMaterial || H.isRawShaderMaterial)
      ) {
        const Pe = H.uniformsGroups;
        for (let $r = 0, ec = Pe.length; $r < ec; $r++)
          if (st.isWebGL2) {
            const ga = Pe[$r];
            at.update(ga, En), at.bind(ga, En);
          } else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
      }
      return En;
    }
    function Ql(y, N) {
      (y.ambientLightColor.needsUpdate = N),
        (y.lightProbe.needsUpdate = N),
        (y.directionalLights.needsUpdate = N),
        (y.directionalLightShadows.needsUpdate = N),
        (y.pointLights.needsUpdate = N),
        (y.pointLightShadows.needsUpdate = N),
        (y.spotLights.needsUpdate = N),
        (y.spotLightShadows.needsUpdate = N),
        (y.rectAreaLights.needsUpdate = N),
        (y.hemisphereLights.needsUpdate = N);
    }
    function tc(y) {
      return (
        y.isMeshLambertMaterial ||
        y.isMeshToonMaterial ||
        y.isMeshPhongMaterial ||
        y.isMeshStandardMaterial ||
        y.isShadowMaterial ||
        (y.isShaderMaterial && y.lights === !0)
      );
    }
    (this.getActiveCubeFace = function () {
      return U;
    }),
      (this.getActiveMipmapLevel = function () {
        return R;
      }),
      (this.getRenderTarget = function () {
        return w;
      }),
      (this.setRenderTargetTextures = function (y, N, z) {
        (mt.get(y.texture).__webglTexture = N), (mt.get(y.depthTexture).__webglTexture = z);
        const H = mt.get(y);
        (H.__hasExternalTextures = !0),
          H.__hasExternalTextures &&
            ((H.__autoAllocateDepthBuffer = z === void 0),
            H.__autoAllocateDepthBuffer ||
              (q.has("WEBGL_multisampled_render_to_texture") === !0 &&
                (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),
                (H.__useRenderToTexture = !1))));
      }),
      (this.setRenderTargetFramebuffer = function (y, N) {
        const z = mt.get(y);
        (z.__webglFramebuffer = N), (z.__useDefaultFramebuffer = N === void 0);
      }),
      (this.setRenderTarget = function (y, N = 0, z = 0) {
        (w = y), (U = N), (R = z);
        let H = !0,
          B = null,
          vt = !1,
          At = !1;
        if (y) {
          const Ot = mt.get(y);
          Ot.__useDefaultFramebuffer !== void 0
            ? (X.bindFramebuffer(P.FRAMEBUFFER, null), (H = !1))
            : Ot.__webglFramebuffer === void 0
            ? M.setupRenderTarget(y)
            : Ot.__hasExternalTextures && M.rebindTextures(y, mt.get(y.texture).__webglTexture, mt.get(y.depthTexture).__webglTexture);
          const kt = y.texture;
          (kt.isData3DTexture || kt.isDataArrayTexture || kt.isCompressedArrayTexture) && (At = !0);
          const zt = mt.get(y).__webglFramebuffer;
          y.isWebGLCubeRenderTarget
            ? (Array.isArray(zt[N]) ? (B = zt[N][z]) : (B = zt[N]), (vt = !0))
            : st.isWebGL2 && y.samples > 0 && M.useMultisampledRTT(y) === !1
            ? (B = mt.get(y).__webglMultisampledFramebuffer)
            : Array.isArray(zt)
            ? (B = zt[z])
            : (B = zt),
            T.copy(y.viewport),
            O.copy(y.scissor),
            (J = y.scissorTest);
        } else T.copy($).multiplyScalar(j).floor(), O.copy(Q).multiplyScalar(j).floor(), (J = dt);
        if (
          (X.bindFramebuffer(P.FRAMEBUFFER, B) && st.drawBuffers && H && X.drawBuffers(y, B), X.viewport(T), X.scissor(O), X.setScissorTest(J), vt)
        ) {
          const Ot = mt.get(y.texture);
          P.framebufferTexture2D(P.FRAMEBUFFER, P.COLOR_ATTACHMENT0, P.TEXTURE_CUBE_MAP_POSITIVE_X + N, Ot.__webglTexture, z);
        } else if (At) {
          const Ot = mt.get(y.texture),
            kt = N || 0;
          P.framebufferTextureLayer(P.FRAMEBUFFER, P.COLOR_ATTACHMENT0, Ot.__webglTexture, z || 0, kt);
        }
        k = -1;
      }),
      (this.readRenderTargetPixels = function (y, N, z, H, B, vt, At) {
        if (!(y && y.isWebGLRenderTarget)) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          return;
        }
        let Dt = mt.get(y).__webglFramebuffer;
        if ((y.isWebGLCubeRenderTarget && At !== void 0 && (Dt = Dt[At]), Dt)) {
          X.bindFramebuffer(P.FRAMEBUFFER, Dt);
          try {
            const Ot = y.texture,
              kt = Ot.format,
              zt = Ot.type;
            if (kt !== He && gt.convert(kt) !== P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
              return;
            }
            const Ht = zt === cn && (q.has("EXT_color_buffer_half_float") || (st.isWebGL2 && q.has("EXT_color_buffer_float")));
            if (
              zt !== Mn &&
              gt.convert(zt) !== P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE) &&
              !(zt === vn && (st.isWebGL2 || q.has("OES_texture_float") || q.has("WEBGL_color_buffer_float"))) &&
              !Ht
            ) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
              return;
            }
            N >= 0 && N <= y.width - H && z >= 0 && z <= y.height - B && P.readPixels(N, z, H, B, gt.convert(kt), gt.convert(zt), vt);
          } finally {
            const Ot = w !== null ? mt.get(w).__webglFramebuffer : null;
            X.bindFramebuffer(P.FRAMEBUFFER, Ot);
          }
        }
      }),
      (this.copyFramebufferToTexture = function (y, N, z = 0) {
        const H = Math.pow(2, -z),
          B = Math.floor(N.image.width * H),
          vt = Math.floor(N.image.height * H);
        M.setTexture2D(N, 0), P.copyTexSubImage2D(P.TEXTURE_2D, z, 0, 0, y.x, y.y, B, vt), X.unbindTexture();
      }),
      (this.copyTextureToTexture = function (y, N, z, H = 0) {
        const B = N.image.width,
          vt = N.image.height,
          At = gt.convert(z.format),
          Dt = gt.convert(z.type);
        M.setTexture2D(z, 0),
          P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL, z.flipY),
          P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL, z.premultiplyAlpha),
          P.pixelStorei(P.UNPACK_ALIGNMENT, z.unpackAlignment),
          N.isDataTexture
            ? P.texSubImage2D(P.TEXTURE_2D, H, y.x, y.y, B, vt, At, Dt, N.image.data)
            : N.isCompressedTexture
            ? P.compressedTexSubImage2D(P.TEXTURE_2D, H, y.x, y.y, N.mipmaps[0].width, N.mipmaps[0].height, At, N.mipmaps[0].data)
            : P.texSubImage2D(P.TEXTURE_2D, H, y.x, y.y, At, Dt, N.image),
          H === 0 && z.generateMipmaps && P.generateMipmap(P.TEXTURE_2D),
          X.unbindTexture();
      }),
      (this.copyTextureToTexture3D = function (y, N, z, H, B = 0) {
        if (_.isWebGL1Renderer) {
          console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
          return;
        }
        const vt = y.max.x - y.min.x + 1,
          At = y.max.y - y.min.y + 1,
          Dt = y.max.z - y.min.z + 1,
          Ot = gt.convert(H.format),
          kt = gt.convert(H.type);
        let zt;
        if (H.isData3DTexture) M.setTexture3D(H, 0), (zt = P.TEXTURE_3D);
        else if (H.isDataArrayTexture || H.isCompressedArrayTexture) M.setTexture2DArray(H, 0), (zt = P.TEXTURE_2D_ARRAY);
        else {
          console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
          return;
        }
        P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL, H.flipY),
          P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL, H.premultiplyAlpha),
          P.pixelStorei(P.UNPACK_ALIGNMENT, H.unpackAlignment);
        const Ht = P.getParameter(P.UNPACK_ROW_LENGTH),
          ae = P.getParameter(P.UNPACK_IMAGE_HEIGHT),
          be = P.getParameter(P.UNPACK_SKIP_PIXELS),
          fe = P.getParameter(P.UNPACK_SKIP_ROWS),
          Ke = P.getParameter(P.UNPACK_SKIP_IMAGES),
          ee = z.isCompressedTexture ? z.mipmaps[B] : z.image;
        P.pixelStorei(P.UNPACK_ROW_LENGTH, ee.width),
          P.pixelStorei(P.UNPACK_IMAGE_HEIGHT, ee.height),
          P.pixelStorei(P.UNPACK_SKIP_PIXELS, y.min.x),
          P.pixelStorei(P.UNPACK_SKIP_ROWS, y.min.y),
          P.pixelStorei(P.UNPACK_SKIP_IMAGES, y.min.z),
          z.isDataTexture || z.isData3DTexture
            ? P.texSubImage3D(zt, B, N.x, N.y, N.z, vt, At, Dt, Ot, kt, ee.data)
            : z.isCompressedArrayTexture
            ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),
              P.compressedTexSubImage3D(zt, B, N.x, N.y, N.z, vt, At, Dt, Ot, ee.data))
            : P.texSubImage3D(zt, B, N.x, N.y, N.z, vt, At, Dt, Ot, kt, ee),
          P.pixelStorei(P.UNPACK_ROW_LENGTH, Ht),
          P.pixelStorei(P.UNPACK_IMAGE_HEIGHT, ae),
          P.pixelStorei(P.UNPACK_SKIP_PIXELS, be),
          P.pixelStorei(P.UNPACK_SKIP_ROWS, fe),
          P.pixelStorei(P.UNPACK_SKIP_IMAGES, Ke),
          B === 0 && H.generateMipmaps && P.generateMipmap(zt),
          X.unbindTexture();
      }),
      (this.initTexture = function (y) {
        y.isCubeTexture
          ? M.setTextureCube(y, 0)
          : y.isData3DTexture
          ? M.setTexture3D(y, 0)
          : y.isDataArrayTexture || y.isCompressedArrayTexture
          ? M.setTexture2DArray(y, 0)
          : M.setTexture2D(y, 0),
          X.unbindTexture();
      }),
      (this.resetState = function () {
        (U = 0), (R = 0), (w = null), X.reset(), A.reset();
      }),
      typeof __THREE_DEVTOOLS__ != "undefined" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return an;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    (e.drawingBufferColorSpace = t === ta ? "display-p3" : "srgb"), (e.unpackColorSpace = Jt.workingColorSpace === Wr ? "display-p3" : "srgb");
  }
  get outputEncoding() {
    return (
      console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),
      this.outputColorSpace === ge ? Fn : pl
    );
  }
  set outputEncoding(t) {
    console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),
      (this.outputColorSpace = t === Fn ? ge : hn);
  }
  get useLegacyLights() {
    return (
      console.warn(
        "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."
      ),
      this._useLegacyLights
    );
  }
  set useLegacyLights(t) {
    console.warn(
      "THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."
    ),
      (this._useLegacyLights = t);
  }
}
class ym extends Sm {}
ym.prototype.isWebGL1Renderer = !0;
class Pg extends oe {
  constructor() {
    super(),
      (this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ != "undefined" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return (
      super.copy(t, e),
      t.background !== null && (this.background = t.background.clone()),
      t.environment !== null && (this.environment = t.environment.clone()),
      t.fog !== null && (this.fog = t.fog.clone()),
      (this.backgroundBlurriness = t.backgroundBlurriness),
      (this.backgroundIntensity = t.backgroundIntensity),
      t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()),
      (this.matrixAutoUpdate = t.matrixAutoUpdate),
      this
    );
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      this.fog !== null && (e.object.fog = this.fog.toJSON()),
      this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness),
      this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity),
      e
    );
  }
}
class Em {
  constructor(t, e) {
    (this.isInterleavedBuffer = !0),
      (this.array = t),
      (this.stride = e),
      (this.count = t !== void 0 ? t.length / e : 0),
      (this.usage = ks),
      (this._updateRange = { offset: 0, count: -1 }),
      (this.updateRanges = []),
      (this.version = 0),
      (this.uuid = qe());
  }
  onUploadCallback() {}
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  get updateRange() {
    return (
      console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),
      this._updateRange
    );
  }
  setUsage(t) {
    return (this.usage = t), this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return (this.array = new t.array.constructor(t.array)), (this.count = t.count), (this.stride = t.stride), (this.usage = t.usage), this;
  }
  copyAt(t, e, n) {
    (t *= this.stride), (n *= e.stride);
    for (let r = 0, s = this.stride; r < s; r++) this.array[t + r] = e.array[n + r];
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  clone(t) {
    t.arrayBuffers === void 0 && (t.arrayBuffers = {}),
      this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = qe()),
      t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const e = new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),
      n = new this.constructor(e, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(t) {
    return (this.onUploadCallback = t), this;
  }
  toJSON(t) {
    return (
      t.arrayBuffers === void 0 && (t.arrayBuffers = {}),
      this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = qe()),
      t.arrayBuffers[this.array.buffer._uuid] === void 0 &&
        (t.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))),
      { uuid: this.uuid, buffer: this.array.buffer._uuid, type: this.array.constructor.name, stride: this.stride }
    );
  }
}
const Se = new C();
class zr {
  constructor(t, e, n, r = !1) {
    (this.isInterleavedBufferAttribute = !0), (this.name = ""), (this.data = t), (this.itemSize = e), (this.offset = n), (this.normalized = r);
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(t) {
    this.data.needsUpdate = t;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.data.count; e < n; e++) Se.fromBufferAttribute(this, e), Se.applyMatrix4(t), this.setXYZ(e, Se.x, Se.y, Se.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++) Se.fromBufferAttribute(this, e), Se.applyNormalMatrix(t), this.setXYZ(e, Se.x, Se.y, Se.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++) Se.fromBufferAttribute(this, e), Se.transformDirection(t), this.setXYZ(e, Se.x, Se.y, Se.z);
    return this;
  }
  setX(t, e) {
    return this.normalized && (e = Kt(e, this.array)), (this.data.array[t * this.data.stride + this.offset] = e), this;
  }
  setY(t, e) {
    return this.normalized && (e = Kt(e, this.array)), (this.data.array[t * this.data.stride + this.offset + 1] = e), this;
  }
  setZ(t, e) {
    return this.normalized && (e = Kt(e, this.array)), (this.data.array[t * this.data.stride + this.offset + 2] = e), this;
  }
  setW(t, e) {
    return this.normalized && (e = Kt(e, this.array)), (this.data.array[t * this.data.stride + this.offset + 3] = e), this;
  }
  getX(t) {
    let e = this.data.array[t * this.data.stride + this.offset];
    return this.normalized && (e = Xe(e, this.array)), e;
  }
  getY(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 1];
    return this.normalized && (e = Xe(e, this.array)), e;
  }
  getZ(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 2];
    return this.normalized && (e = Xe(e, this.array)), e;
  }
  getW(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 3];
    return this.normalized && (e = Xe(e, this.array)), e;
  }
  setXY(t, e, n) {
    return (
      (t = t * this.data.stride + this.offset),
      this.normalized && ((e = Kt(e, this.array)), (n = Kt(n, this.array))),
      (this.data.array[t + 0] = e),
      (this.data.array[t + 1] = n),
      this
    );
  }
  setXYZ(t, e, n, r) {
    return (
      (t = t * this.data.stride + this.offset),
      this.normalized && ((e = Kt(e, this.array)), (n = Kt(n, this.array)), (r = Kt(r, this.array))),
      (this.data.array[t + 0] = e),
      (this.data.array[t + 1] = n),
      (this.data.array[t + 2] = r),
      this
    );
  }
  setXYZW(t, e, n, r, s) {
    return (
      (t = t * this.data.stride + this.offset),
      this.normalized && ((e = Kt(e, this.array)), (n = Kt(n, this.array)), (r = Kt(r, this.array)), (s = Kt(s, this.array))),
      (this.data.array[t + 0] = e),
      (this.data.array[t + 1] = n),
      (this.data.array[t + 2] = r),
      (this.data.array[t + 3] = s),
      this
    );
  }
  clone(t) {
    if (t === void 0) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const e = [];
      for (let n = 0; n < this.count; n++) {
        const r = n * this.data.stride + this.offset;
        for (let s = 0; s < this.itemSize; s++) e.push(this.data.array[r + s]);
      }
      return new Ve(new this.array.constructor(e), this.itemSize, this.normalized);
    } else
      return (
        t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}),
        t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)),
        new zr(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized)
      );
  }
  toJSON(t) {
    if (t === void 0) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const e = [];
      for (let n = 0; n < this.count; n++) {
        const r = n * this.data.stride + this.offset;
        for (let s = 0; s < this.itemSize; s++) e.push(this.data.array[r + s]);
      }
      return { itemSize: this.itemSize, type: this.array.constructor.name, array: e, normalized: this.normalized };
    } else
      return (
        t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}),
        t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)),
        { isInterleavedBufferAttribute: !0, itemSize: this.itemSize, data: this.data.uuid, offset: this.offset, normalized: this.normalized }
      );
  }
}
class Tm extends je {
  constructor(t) {
    super(),
      (this.isSpriteMaterial = !0),
      (this.type = "SpriteMaterial"),
      (this.color = new Ft(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.rotation = 0),
      (this.sizeAttenuation = !0),
      (this.transparent = !0),
      (this.fog = !0),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.rotation = t.rotation),
      (this.sizeAttenuation = t.sizeAttenuation),
      (this.fog = t.fog),
      this
    );
  }
}
let ri;
const bi = new C(),
  si = new C(),
  ai = new C(),
  oi = new Z(),
  Ai = new Z(),
  Il = new te(),
  xr = new C(),
  wi = new C(),
  Mr = new C(),
  Oo = new Z(),
  Rs = new Z(),
  Fo = new Z();
class Lg extends oe {
  constructor(t = new Tm()) {
    if ((super(), (this.isSprite = !0), (this.type = "Sprite"), ri === void 0)) {
      ri = new Ce();
      const e = new Float32Array([-0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5, 0, 0, 1]),
        n = new Em(e, 5);
      ri.setIndex([0, 1, 2, 0, 2, 3]), ri.setAttribute("position", new zr(n, 3, 0, !1)), ri.setAttribute("uv", new zr(n, 2, 3, !1));
    }
    (this.geometry = ri), (this.material = t), (this.center = new Z(0.5, 0.5));
  }
  raycast(t, e) {
    t.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),
      si.setFromMatrixScale(this.matrixWorld),
      Il.copy(t.camera.matrixWorld),
      this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld),
      ai.setFromMatrixPosition(this.modelViewMatrix),
      t.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && si.multiplyScalar(-ai.z);
    const n = this.material.rotation;
    let r, s;
    n !== 0 && ((s = Math.cos(n)), (r = Math.sin(n)));
    const o = this.center;
    Sr(xr.set(-0.5, -0.5, 0), ai, o, si, r, s),
      Sr(wi.set(0.5, -0.5, 0), ai, o, si, r, s),
      Sr(Mr.set(0.5, 0.5, 0), ai, o, si, r, s),
      Oo.set(0, 0),
      Rs.set(1, 0),
      Fo.set(1, 1);
    let a = t.ray.intersectTriangle(xr, wi, Mr, !1, bi);
    if (a === null && (Sr(wi.set(-0.5, 0.5, 0), ai, o, si, r, s), Rs.set(0, 1), (a = t.ray.intersectTriangle(xr, Mr, wi, !1, bi)), a === null))
      return;
    const l = t.ray.origin.distanceTo(bi);
    l < t.near ||
      l > t.far ||
      e.push({ distance: l, point: bi.clone(), uv: Ue.getInterpolation(bi, xr, wi, Mr, Oo, Rs, Fo, new Z()), face: null, object: this });
  }
  copy(t, e) {
    return super.copy(t, e), t.center !== void 0 && this.center.copy(t.center), (this.material = t.material), this;
  }
}
function Sr(i, t, e, n, r, s) {
  oi.subVectors(i, e).addScalar(0.5).multiply(n),
    r !== void 0 ? ((Ai.x = s * oi.x - r * oi.y), (Ai.y = r * oi.x + s * oi.y)) : Ai.copy(oi),
    i.copy(t),
    (i.x += Ai.x),
    (i.y += Ai.y),
    i.applyMatrix4(Il);
}
class Dg extends Ee {
  constructor(t = null, e = 1, n = 1, r, s, o, a, l, c = me, h = me, u, d) {
    super(null, o, a, l, c, h, r, s, u, d),
      (this.isDataTexture = !0),
      (this.image = { data: t, width: e, height: n }),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1);
  }
}
class bm extends je {
  constructor(t) {
    super(),
      (this.isLineBasicMaterial = !0),
      (this.type = "LineBasicMaterial"),
      (this.color = new Ft(16777215)),
      (this.map = null),
      (this.linewidth = 1),
      (this.linecap = "round"),
      (this.linejoin = "round"),
      (this.fog = !0),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.linewidth = t.linewidth),
      (this.linecap = t.linecap),
      (this.linejoin = t.linejoin),
      (this.fog = t.fog),
      this
    );
  }
}
const Bo = new C(),
  zo = new C(),
  Ho = new te(),
  Cs = new Xr(),
  yr = new Wi();
class Am extends oe {
  constructor(t = new Ce(), e = new bm()) {
    super(), (this.isLine = !0), (this.type = "Line"), (this.geometry = t), (this.material = e), this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), (this.material = Array.isArray(t.material) ? t.material.slice() : t.material), (this.geometry = t.geometry), this;
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position,
        n = [0];
      for (let r = 1, s = e.count; r < s; r++)
        Bo.fromBufferAttribute(e, r - 1), zo.fromBufferAttribute(e, r), (n[r] = n[r - 1]), (n[r] += Bo.distanceTo(zo));
      t.setAttribute("lineDistance", new Me(n, 1));
    } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(t, e) {
    const n = this.geometry,
      r = this.matrixWorld,
      s = t.params.Line.threshold,
      o = n.drawRange;
    if (
      (n.boundingSphere === null && n.computeBoundingSphere(),
      yr.copy(n.boundingSphere),
      yr.applyMatrix4(r),
      (yr.radius += s),
      t.ray.intersectsSphere(yr) === !1)
    )
      return;
    Ho.copy(r).invert(), Cs.copy(t.ray).applyMatrix4(Ho);
    const a = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      l = a * a,
      c = new C(),
      h = new C(),
      u = new C(),
      d = new C(),
      p = this.isLineSegments ? 2 : 1,
      g = n.index,
      m = n.attributes.position;
    if (g !== null) {
      const f = Math.max(0, o.start),
        E = Math.min(g.count, o.start + o.count);
      for (let _ = f, b = E - 1; _ < b; _ += p) {
        const U = g.getX(_),
          R = g.getX(_ + 1);
        if ((c.fromBufferAttribute(m, U), h.fromBufferAttribute(m, R), Cs.distanceSqToSegment(c, h, d, u) > l)) continue;
        d.applyMatrix4(this.matrixWorld);
        const k = t.ray.origin.distanceTo(d);
        k < t.near ||
          k > t.far ||
          e.push({ distance: k, point: u.clone().applyMatrix4(this.matrixWorld), index: _, face: null, faceIndex: null, object: this });
      }
    } else {
      const f = Math.max(0, o.start),
        E = Math.min(m.count, o.start + o.count);
      for (let _ = f, b = E - 1; _ < b; _ += p) {
        if ((c.fromBufferAttribute(m, _), h.fromBufferAttribute(m, _ + 1), Cs.distanceSqToSegment(c, h, d, u) > l)) continue;
        d.applyMatrix4(this.matrixWorld);
        const R = t.ray.origin.distanceTo(d);
        R < t.near ||
          R > t.far ||
          e.push({ distance: R, point: u.clone().applyMatrix4(this.matrixWorld), index: _, face: null, faceIndex: null, object: this });
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      n = Object.keys(e);
    if (n.length > 0) {
      const r = e[n[0]];
      if (r !== void 0) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let s = 0, o = r.length; s < o; s++) {
          const a = r[s].name || String(s);
          this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = s);
        }
      }
    }
  }
}
const Go = new C(),
  Vo = new C();
class Ug extends Am {
  constructor(t, e) {
    super(t, e), (this.isLineSegments = !0), (this.type = "LineSegments");
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position,
        n = [];
      for (let r = 0, s = e.count; r < s; r += 2)
        Go.fromBufferAttribute(e, r), Vo.fromBufferAttribute(e, r + 1), (n[r] = r === 0 ? 0 : n[r - 1]), (n[r + 1] = n[r] + Go.distanceTo(Vo));
      t.setAttribute("lineDistance", new Me(n, 1));
    } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class wm extends je {
  constructor(t) {
    super(),
      (this.isPointsMaterial = !0),
      (this.type = "PointsMaterial"),
      (this.color = new Ft(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.size = 1),
      (this.sizeAttenuation = !0),
      (this.fog = !0),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.alphaMap = t.alphaMap),
      (this.size = t.size),
      (this.sizeAttenuation = t.sizeAttenuation),
      (this.fog = t.fog),
      this
    );
  }
}
const ko = new te(),
  Ys = new Xr(),
  Er = new Wi(),
  Tr = new C();
class Ig extends oe {
  constructor(t = new Ce(), e = new wm()) {
    super(), (this.isPoints = !0), (this.type = "Points"), (this.geometry = t), (this.material = e), this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), (this.material = Array.isArray(t.material) ? t.material.slice() : t.material), (this.geometry = t.geometry), this;
  }
  raycast(t, e) {
    const n = this.geometry,
      r = this.matrixWorld,
      s = t.params.Points.threshold,
      o = n.drawRange;
    if (
      (n.boundingSphere === null && n.computeBoundingSphere(),
      Er.copy(n.boundingSphere),
      Er.applyMatrix4(r),
      (Er.radius += s),
      t.ray.intersectsSphere(Er) === !1)
    )
      return;
    ko.copy(r).invert(), Ys.copy(t.ray).applyMatrix4(ko);
    const a = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      l = a * a,
      c = n.index,
      u = n.attributes.position;
    if (c !== null) {
      const d = Math.max(0, o.start),
        p = Math.min(c.count, o.start + o.count);
      for (let g = d, v = p; g < v; g++) {
        const m = c.getX(g);
        Tr.fromBufferAttribute(u, m), Wo(Tr, m, l, r, t, e, this);
      }
    } else {
      const d = Math.max(0, o.start),
        p = Math.min(u.count, o.start + o.count);
      for (let g = d, v = p; g < v; g++) Tr.fromBufferAttribute(u, g), Wo(Tr, g, l, r, t, e, this);
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      n = Object.keys(e);
    if (n.length > 0) {
      const r = e[n[0]];
      if (r !== void 0) {
        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
        for (let s = 0, o = r.length; s < o; s++) {
          const a = r[s].name || String(s);
          this.morphTargetInfluences.push(0), (this.morphTargetDictionary[a] = s);
        }
      }
    }
  }
}
function Wo(i, t, e, n, r, s, o) {
  const a = Ys.distanceSqToPoint(i);
  if (a < e) {
    const l = new C();
    Ys.closestPointToPoint(i, l), l.applyMatrix4(n);
    const c = r.ray.origin.distanceTo(l);
    if (c < r.near || c > r.far) return;
    s.push({ distance: c, distanceToRay: Math.sqrt(a), point: l, index: t, face: null, object: o });
  }
}
class Ze {
  constructor() {
    (this.type = "Curve"), (this.arcLengthDivisions = 200);
  }
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
    return e;
  }
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
    return e;
  }
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    const e = [];
    let n,
      r = this.getPoint(0),
      s = 0;
    e.push(0);
    for (let o = 1; o <= t; o++) (n = this.getPoint(o / t)), (s += n.distanceTo(r)), e.push(s), (r = n);
    return (this.cacheArcLengths = e), e;
  }
  updateArcLengths() {
    (this.needsUpdate = !0), this.getLengths();
  }
  getUtoTmapping(t, e) {
    const n = this.getLengths();
    let r = 0;
    const s = n.length;
    let o;
    e ? (o = e) : (o = t * n[s - 1]);
    let a = 0,
      l = s - 1,
      c;
    for (; a <= l; )
      if (((r = Math.floor(a + (l - a) / 2)), (c = n[r] - o), c < 0)) a = r + 1;
      else if (c > 0) l = r - 1;
      else {
        l = r;
        break;
      }
    if (((r = l), n[r] === o)) return r / (s - 1);
    const h = n[r],
      d = n[r + 1] - h,
      p = (o - h) / d;
    return (r + p) / (s - 1);
  }
  getTangent(t, e) {
    let r = t - 1e-4,
      s = t + 1e-4;
    r < 0 && (r = 0), s > 1 && (s = 1);
    const o = this.getPoint(r),
      a = this.getPoint(s),
      l = e || (o.isVector2 ? new Z() : new C());
    return l.copy(a).sub(o).normalize(), l;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new C(),
      r = [],
      s = [],
      o = [],
      a = new C(),
      l = new te();
    for (let p = 0; p <= t; p++) {
      const g = p / t;
      r[p] = this.getTangentAt(g, new C());
    }
    (s[0] = new C()), (o[0] = new C());
    let c = Number.MAX_VALUE;
    const h = Math.abs(r[0].x),
      u = Math.abs(r[0].y),
      d = Math.abs(r[0].z);
    h <= c && ((c = h), n.set(1, 0, 0)),
      u <= c && ((c = u), n.set(0, 1, 0)),
      d <= c && n.set(0, 0, 1),
      a.crossVectors(r[0], n).normalize(),
      s[0].crossVectors(r[0], a),
      o[0].crossVectors(r[0], s[0]);
    for (let p = 1; p <= t; p++) {
      if (((s[p] = s[p - 1].clone()), (o[p] = o[p - 1].clone()), a.crossVectors(r[p - 1], r[p]), a.length() > Number.EPSILON)) {
        a.normalize();
        const g = Math.acos(pe(r[p - 1].dot(r[p]), -1, 1));
        s[p].applyMatrix4(l.makeRotationAxis(a, g));
      }
      o[p].crossVectors(r[p], s[p]);
    }
    if (e === !0) {
      let p = Math.acos(pe(s[0].dot(s[t]), -1, 1));
      (p /= t), r[0].dot(a.crossVectors(s[0], s[t])) > 0 && (p = -p);
      for (let g = 1; g <= t; g++) s[g].applyMatrix4(l.makeRotationAxis(r[g], p * g)), o[g].crossVectors(r[g], s[g]);
    }
    return { tangents: r, normals: s, binormals: o };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return (this.arcLengthDivisions = t.arcLengthDivisions), this;
  }
  toJSON() {
    const t = { metadata: { version: 4.6, type: "Curve", generator: "Curve.toJSON" } };
    return (t.arcLengthDivisions = this.arcLengthDivisions), (t.type = this.type), t;
  }
  fromJSON(t) {
    return (this.arcLengthDivisions = t.arcLengthDivisions), this;
  }
}
class oa extends Ze {
  constructor(t = 0, e = 0, n = 1, r = 1, s = 0, o = Math.PI * 2, a = !1, l = 0) {
    super(),
      (this.isEllipseCurve = !0),
      (this.type = "EllipseCurve"),
      (this.aX = t),
      (this.aY = e),
      (this.xRadius = n),
      (this.yRadius = r),
      (this.aStartAngle = s),
      (this.aEndAngle = o),
      (this.aClockwise = a),
      (this.aRotation = l);
  }
  getPoint(t, e) {
    const n = e || new Z(),
      r = Math.PI * 2;
    let s = this.aEndAngle - this.aStartAngle;
    const o = Math.abs(s) < Number.EPSILON;
    for (; s < 0; ) s += r;
    for (; s > r; ) s -= r;
    s < Number.EPSILON && (o ? (s = 0) : (s = r)), this.aClockwise === !0 && !o && (s === r ? (s = -r) : (s = s - r));
    const a = this.aStartAngle + t * s;
    let l = this.aX + this.xRadius * Math.cos(a),
      c = this.aY + this.yRadius * Math.sin(a);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation),
        u = Math.sin(this.aRotation),
        d = l - this.aX,
        p = c - this.aY;
      (l = d * h - p * u + this.aX), (c = d * u + p * h + this.aY);
    }
    return n.set(l, c);
  }
  copy(t) {
    return (
      super.copy(t),
      (this.aX = t.aX),
      (this.aY = t.aY),
      (this.xRadius = t.xRadius),
      (this.yRadius = t.yRadius),
      (this.aStartAngle = t.aStartAngle),
      (this.aEndAngle = t.aEndAngle),
      (this.aClockwise = t.aClockwise),
      (this.aRotation = t.aRotation),
      this
    );
  }
  toJSON() {
    const t = super.toJSON();
    return (
      (t.aX = this.aX),
      (t.aY = this.aY),
      (t.xRadius = this.xRadius),
      (t.yRadius = this.yRadius),
      (t.aStartAngle = this.aStartAngle),
      (t.aEndAngle = this.aEndAngle),
      (t.aClockwise = this.aClockwise),
      (t.aRotation = this.aRotation),
      t
    );
  }
  fromJSON(t) {
    return (
      super.fromJSON(t),
      (this.aX = t.aX),
      (this.aY = t.aY),
      (this.xRadius = t.xRadius),
      (this.yRadius = t.yRadius),
      (this.aStartAngle = t.aStartAngle),
      (this.aEndAngle = t.aEndAngle),
      (this.aClockwise = t.aClockwise),
      (this.aRotation = t.aRotation),
      this
    );
  }
}
class Rm extends oa {
  constructor(t, e, n, r, s, o) {
    super(t, e, n, n, r, s, o), (this.isArcCurve = !0), (this.type = "ArcCurve");
  }
}
function la() {
  let i = 0,
    t = 0,
    e = 0,
    n = 0;
  function r(s, o, a, l) {
    (i = s), (t = a), (e = -3 * s + 3 * o - 2 * a - l), (n = 2 * s - 2 * o + a + l);
  }
  return {
    initCatmullRom: function (s, o, a, l, c) {
      r(o, a, c * (a - s), c * (l - o));
    },
    initNonuniformCatmullRom: function (s, o, a, l, c, h, u) {
      let d = (o - s) / c - (a - s) / (c + h) + (a - o) / h,
        p = (a - o) / h - (l - o) / (h + u) + (l - a) / u;
      (d *= h), (p *= h), r(o, a, d, p);
    },
    calc: function (s) {
      const o = s * s,
        a = o * s;
      return i + t * s + e * o + n * a;
    },
  };
}
const br = new C(),
  Ps = new la(),
  Ls = new la(),
  Ds = new la();
class Cm extends Ze {
  constructor(t = [], e = !1, n = "centripetal", r = 0.5) {
    super(),
      (this.isCatmullRomCurve3 = !0),
      (this.type = "CatmullRomCurve3"),
      (this.points = t),
      (this.closed = e),
      (this.curveType = n),
      (this.tension = r);
  }
  getPoint(t, e = new C()) {
    const n = e,
      r = this.points,
      s = r.length,
      o = (s - (this.closed ? 0 : 1)) * t;
    let a = Math.floor(o),
      l = o - a;
    this.closed ? (a += a > 0 ? 0 : (Math.floor(Math.abs(a) / s) + 1) * s) : l === 0 && a === s - 1 && ((a = s - 2), (l = 1));
    let c, h;
    this.closed || a > 0 ? (c = r[(a - 1) % s]) : (br.subVectors(r[0], r[1]).add(r[0]), (c = br));
    const u = r[a % s],
      d = r[(a + 1) % s];
    if (
      (this.closed || a + 2 < s ? (h = r[(a + 2) % s]) : (br.subVectors(r[s - 1], r[s - 2]).add(r[s - 1]), (h = br)),
      this.curveType === "centripetal" || this.curveType === "chordal")
    ) {
      const p = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(c.distanceToSquared(u), p),
        v = Math.pow(u.distanceToSquared(d), p),
        m = Math.pow(d.distanceToSquared(h), p);
      v < 1e-4 && (v = 1),
        g < 1e-4 && (g = v),
        m < 1e-4 && (m = v),
        Ps.initNonuniformCatmullRom(c.x, u.x, d.x, h.x, g, v, m),
        Ls.initNonuniformCatmullRom(c.y, u.y, d.y, h.y, g, v, m),
        Ds.initNonuniformCatmullRom(c.z, u.z, d.z, h.z, g, v, m);
    } else
      this.curveType === "catmullrom" &&
        (Ps.initCatmullRom(c.x, u.x, d.x, h.x, this.tension),
        Ls.initCatmullRom(c.y, u.y, d.y, h.y, this.tension),
        Ds.initCatmullRom(c.z, u.z, d.z, h.z, this.tension));
    return n.set(Ps.calc(l), Ls.calc(l), Ds.calc(l)), n;
  }
  copy(t) {
    super.copy(t), (this.points = []);
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(r.clone());
    }
    return (this.closed = t.closed), (this.curveType = t.curveType), (this.tension = t.tension), this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const r = this.points[e];
      t.points.push(r.toArray());
    }
    return (t.closed = this.closed), (t.curveType = this.curveType), (t.tension = this.tension), t;
  }
  fromJSON(t) {
    super.fromJSON(t), (this.points = []);
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(new C().fromArray(r));
    }
    return (this.closed = t.closed), (this.curveType = t.curveType), (this.tension = t.tension), this;
  }
}
function Xo(i, t, e, n, r) {
  const s = (n - t) * 0.5,
    o = (r - e) * 0.5,
    a = i * i,
    l = i * a;
  return (2 * e - 2 * n + s + o) * l + (-3 * e + 3 * n - 2 * s - o) * a + s * i + e;
}
function Pm(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function Lm(i, t) {
  return 2 * (1 - i) * i * t;
}
function Dm(i, t) {
  return i * i * t;
}
function Ui(i, t, e, n) {
  return Pm(i, t) + Lm(i, e) + Dm(i, n);
}
function Um(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function Im(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function Nm(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function Om(i, t) {
  return i * i * i * t;
}
function Ii(i, t, e, n, r) {
  return Um(i, t) + Im(i, e) + Nm(i, n) + Om(i, r);
}
class Nl extends Ze {
  constructor(t = new Z(), e = new Z(), n = new Z(), r = new Z()) {
    super(), (this.isCubicBezierCurve = !0), (this.type = "CubicBezierCurve"), (this.v0 = t), (this.v1 = e), (this.v2 = n), (this.v3 = r);
  }
  getPoint(t, e = new Z()) {
    const n = e,
      r = this.v0,
      s = this.v1,
      o = this.v2,
      a = this.v3;
    return n.set(Ii(t, r.x, s.x, o.x, a.x), Ii(t, r.y, s.y, o.y, a.y)), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return (t.v0 = this.v0.toArray()), (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), (t.v3 = this.v3.toArray()), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class Fm extends Ze {
  constructor(t = new C(), e = new C(), n = new C(), r = new C()) {
    super(), (this.isCubicBezierCurve3 = !0), (this.type = "CubicBezierCurve3"), (this.v0 = t), (this.v1 = e), (this.v2 = n), (this.v3 = r);
  }
  getPoint(t, e = new C()) {
    const n = e,
      r = this.v0,
      s = this.v1,
      o = this.v2,
      a = this.v3;
    return n.set(Ii(t, r.x, s.x, o.x, a.x), Ii(t, r.y, s.y, o.y, a.y), Ii(t, r.z, s.z, o.z, a.z)), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return (t.v0 = this.v0.toArray()), (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), (t.v3 = this.v3.toArray()), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class Ol extends Ze {
  constructor(t = new Z(), e = new Z()) {
    super(), (this.isLineCurve = !0), (this.type = "LineCurve"), (this.v1 = t), (this.v2 = e);
  }
  getPoint(t, e = new Z()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new Z()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Bm extends Ze {
  constructor(t = new C(), e = new C()) {
    super(), (this.isLineCurve3 = !0), (this.type = "LineCurve3"), (this.v1 = t), (this.v2 = e);
  }
  getPoint(t, e = new C()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new C()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Fl extends Ze {
  constructor(t = new Z(), e = new Z(), n = new Z()) {
    super(), (this.isQuadraticBezierCurve = !0), (this.type = "QuadraticBezierCurve"), (this.v0 = t), (this.v1 = e), (this.v2 = n);
  }
  getPoint(t, e = new Z()) {
    const n = e,
      r = this.v0,
      s = this.v1,
      o = this.v2;
    return n.set(Ui(t, r.x, s.x, o.x), Ui(t, r.y, s.y, o.y)), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return (t.v0 = this.v0.toArray()), (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class zm extends Ze {
  constructor(t = new C(), e = new C(), n = new C()) {
    super(), (this.isQuadraticBezierCurve3 = !0), (this.type = "QuadraticBezierCurve3"), (this.v0 = t), (this.v1 = e), (this.v2 = n);
  }
  getPoint(t, e = new C()) {
    const n = e,
      r = this.v0,
      s = this.v1,
      o = this.v2;
    return n.set(Ui(t, r.x, s.x, o.x), Ui(t, r.y, s.y, o.y), Ui(t, r.z, s.z, o.z)), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return (t.v0 = this.v0.toArray()), (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Bl extends Ze {
  constructor(t = []) {
    super(), (this.isSplineCurve = !0), (this.type = "SplineCurve"), (this.points = t);
  }
  getPoint(t, e = new Z()) {
    const n = e,
      r = this.points,
      s = (r.length - 1) * t,
      o = Math.floor(s),
      a = s - o,
      l = r[o === 0 ? o : o - 1],
      c = r[o],
      h = r[o > r.length - 2 ? r.length - 1 : o + 1],
      u = r[o > r.length - 3 ? r.length - 1 : o + 2];
    return n.set(Xo(a, l.x, c.x, h.x, u.x), Xo(a, l.y, c.y, h.y, u.y)), n;
  }
  copy(t) {
    super.copy(t), (this.points = []);
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const r = this.points[e];
      t.points.push(r.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), (this.points = []);
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(new Z().fromArray(r));
    }
    return this;
  }
}
var js = Object.freeze({
  __proto__: null,
  ArcCurve: Rm,
  CatmullRomCurve3: Cm,
  CubicBezierCurve: Nl,
  CubicBezierCurve3: Fm,
  EllipseCurve: oa,
  LineCurve: Ol,
  LineCurve3: Bm,
  QuadraticBezierCurve: Fl,
  QuadraticBezierCurve3: zm,
  SplineCurve: Bl,
});
class Hm extends Ze {
  constructor() {
    super(), (this.type = "CurvePath"), (this.curves = []), (this.autoClose = !1);
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0),
      e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      const n = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new js[n](e, t));
    }
    return this;
  }
  getPoint(t, e) {
    const n = t * this.getLength(),
      r = this.getCurveLengths();
    let s = 0;
    for (; s < r.length; ) {
      if (r[s] >= n) {
        const o = r[s] - n,
          a = this.curves[s],
          l = a.getLength(),
          c = l === 0 ? 0 : 1 - o / l;
        return a.getPointAt(c, e);
      }
      s++;
    }
    return null;
  }
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  updateArcLengths() {
    (this.needsUpdate = !0), (this.cacheLengths = null), this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
    const t = [];
    let e = 0;
    for (let n = 0, r = this.curves.length; n < r; n++) (e += this.curves[n].getLength()), t.push(e);
    return (this.cacheLengths = t), t;
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
    return this.autoClose && e.push(e[0]), e;
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let r = 0, s = this.curves; r < s.length; r++) {
      const o = s[r],
        a = o.isEllipseCurve ? t * 2 : o.isLineCurve || o.isLineCurve3 ? 1 : o.isSplineCurve ? t * o.points.length : t,
        l = o.getPoints(a);
      for (let c = 0; c < l.length; c++) {
        const h = l[c];
        (n && n.equals(h)) || (e.push(h), (n = h));
      }
    }
    return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
  }
  copy(t) {
    super.copy(t), (this.curves = []);
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const r = t.curves[e];
      this.curves.push(r.clone());
    }
    return (this.autoClose = t.autoClose), this;
  }
  toJSON() {
    const t = super.toJSON();
    (t.autoClose = this.autoClose), (t.curves = []);
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const r = this.curves[e];
      t.curves.push(r.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), (this.autoClose = t.autoClose), (this.curves = []);
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const r = t.curves[e];
      this.curves.push(new js[r.type]().fromJSON(r));
    }
    return this;
  }
}
class Zs extends Hm {
  constructor(t) {
    super(), (this.type = "Path"), (this.currentPoint = new Z()), t && this.setFromPoints(t);
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y);
    return this;
  }
  moveTo(t, e) {
    return this.currentPoint.set(t, e), this;
  }
  lineTo(t, e) {
    const n = new Ol(this.currentPoint.clone(), new Z(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  quadraticCurveTo(t, e, n, r) {
    const s = new Fl(this.currentPoint.clone(), new Z(t, e), new Z(n, r));
    return this.curves.push(s), this.currentPoint.set(n, r), this;
  }
  bezierCurveTo(t, e, n, r, s, o) {
    const a = new Nl(this.currentPoint.clone(), new Z(t, e), new Z(n, r), new Z(s, o));
    return this.curves.push(a), this.currentPoint.set(s, o), this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t),
      n = new Bl(e);
    return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
  }
  arc(t, e, n, r, s, o) {
    const a = this.currentPoint.x,
      l = this.currentPoint.y;
    return this.absarc(t + a, e + l, n, r, s, o), this;
  }
  absarc(t, e, n, r, s, o) {
    return this.absellipse(t, e, n, n, r, s, o), this;
  }
  ellipse(t, e, n, r, s, o, a, l) {
    const c = this.currentPoint.x,
      h = this.currentPoint.y;
    return this.absellipse(t + c, e + h, n, r, s, o, a, l), this;
  }
  absellipse(t, e, n, r, s, o, a, l) {
    const c = new oa(t, e, n, r, s, o, a, l);
    if (this.curves.length > 0) {
      const u = c.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(c);
    const h = c.getPoint(1);
    return this.currentPoint.copy(h), this;
  }
  copy(t) {
    return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
  }
  toJSON() {
    const t = super.toJSON();
    return (t.currentPoint = this.currentPoint.toArray()), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
  }
}
class Lr extends Zs {
  constructor(t) {
    super(t), (this.uuid = qe()), (this.type = "Shape"), (this.holes = []);
  }
  getPointsHoles(t) {
    const e = [];
    for (let n = 0, r = this.holes.length; n < r; n++) e[n] = this.holes[n].getPoints(t);
    return e;
  }
  extractPoints(t) {
    return { shape: this.getPoints(t), holes: this.getPointsHoles(t) };
  }
  copy(t) {
    super.copy(t), (this.holes = []);
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const r = t.holes[e];
      this.holes.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    (t.uuid = this.uuid), (t.holes = []);
    for (let e = 0, n = this.holes.length; e < n; e++) {
      const r = this.holes[e];
      t.holes.push(r.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), (this.uuid = t.uuid), (this.holes = []);
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const r = t.holes[e];
      this.holes.push(new Zs().fromJSON(r));
    }
    return this;
  }
}
const Gm = {
  triangulate: function (i, t, e = 2) {
    const n = t && t.length,
      r = n ? t[0] * e : i.length;
    let s = zl(i, 0, r, e, !0);
    const o = [];
    if (!s || s.next === s.prev) return o;
    let a, l, c, h, u, d, p;
    if ((n && (s = qm(i, t, s, e)), i.length > 80 * e)) {
      (a = c = i[0]), (l = h = i[1]);
      for (let g = e; g < r; g += e) (u = i[g]), (d = i[g + 1]), u < a && (a = u), d < l && (l = d), u > c && (c = u), d > h && (h = d);
      (p = Math.max(c - a, h - l)), (p = p !== 0 ? 32767 / p : 0);
    }
    return zi(s, o, e, a, l, p, 0), o;
  },
};
function zl(i, t, e, n, r) {
  let s, o;
  if (r === ig(i, t, e, n) > 0) for (s = t; s < e; s += n) o = qo(s, i[s], i[s + 1], o);
  else for (s = e - n; s >= t; s -= n) o = qo(s, i[s], i[s + 1], o);
  return o && jr(o, o.next) && (Gi(o), (o = o.next)), o;
}
function Bn(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i,
    n;
  do
    if (((n = !1), !e.steiner && (jr(e, e.next) || ne(e.prev, e, e.next) === 0))) {
      if ((Gi(e), (e = t = e.prev), e === e.next)) break;
      n = !0;
    } else e = e.next;
  while (n || e !== t);
  return t;
}
function zi(i, t, e, n, r, s, o) {
  if (!i) return;
  !o && s && Jm(i, n, r, s);
  let a = i,
    l,
    c;
  for (; i.prev !== i.next; ) {
    if (((l = i.prev), (c = i.next), s ? km(i, n, r, s) : Vm(i))) {
      t.push((l.i / e) | 0), t.push((i.i / e) | 0), t.push((c.i / e) | 0), Gi(i), (i = c.next), (a = c.next);
      continue;
    }
    if (((i = c), i === a)) {
      o ? (o === 1 ? ((i = Wm(Bn(i), t, e)), zi(i, t, e, n, r, s, 2)) : o === 2 && Xm(i, t, e, n, r, s)) : zi(Bn(i), t, e, n, r, s, 1);
      break;
    }
  }
}
function Vm(i) {
  const t = i.prev,
    e = i,
    n = i.next;
  if (ne(t, e, n) >= 0) return !1;
  const r = t.x,
    s = e.x,
    o = n.x,
    a = t.y,
    l = e.y,
    c = n.y,
    h = r < s ? (r < o ? r : o) : s < o ? s : o,
    u = a < l ? (a < c ? a : c) : l < c ? l : c,
    d = r > s ? (r > o ? r : o) : s > o ? s : o,
    p = a > l ? (a > c ? a : c) : l > c ? l : c;
  let g = n.next;
  for (; g !== t; ) {
    if (g.x >= h && g.x <= d && g.y >= u && g.y <= p && hi(r, a, s, l, o, c, g.x, g.y) && ne(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function km(i, t, e, n) {
  const r = i.prev,
    s = i,
    o = i.next;
  if (ne(r, s, o) >= 0) return !1;
  const a = r.x,
    l = s.x,
    c = o.x,
    h = r.y,
    u = s.y,
    d = o.y,
    p = a < l ? (a < c ? a : c) : l < c ? l : c,
    g = h < u ? (h < d ? h : d) : u < d ? u : d,
    v = a > l ? (a > c ? a : c) : l > c ? l : c,
    m = h > u ? (h > d ? h : d) : u > d ? u : d,
    f = Ks(p, g, t, e, n),
    E = Ks(v, m, t, e, n);
  let _ = i.prevZ,
    b = i.nextZ;
  for (; _ && _.z >= f && b && b.z <= E; ) {
    if (
      (_.x >= p && _.x <= v && _.y >= g && _.y <= m && _ !== r && _ !== o && hi(a, h, l, u, c, d, _.x, _.y) && ne(_.prev, _, _.next) >= 0) ||
      ((_ = _.prevZ),
      b.x >= p && b.x <= v && b.y >= g && b.y <= m && b !== r && b !== o && hi(a, h, l, u, c, d, b.x, b.y) && ne(b.prev, b, b.next) >= 0)
    )
      return !1;
    b = b.nextZ;
  }
  for (; _ && _.z >= f; ) {
    if (_.x >= p && _.x <= v && _.y >= g && _.y <= m && _ !== r && _ !== o && hi(a, h, l, u, c, d, _.x, _.y) && ne(_.prev, _, _.next) >= 0) return !1;
    _ = _.prevZ;
  }
  for (; b && b.z <= E; ) {
    if (b.x >= p && b.x <= v && b.y >= g && b.y <= m && b !== r && b !== o && hi(a, h, l, u, c, d, b.x, b.y) && ne(b.prev, b, b.next) >= 0) return !1;
    b = b.nextZ;
  }
  return !0;
}
function Wm(i, t, e) {
  let n = i;
  do {
    const r = n.prev,
      s = n.next.next;
    !jr(r, s) &&
      Hl(r, n, n.next, s) &&
      Hi(r, s) &&
      Hi(s, r) &&
      (t.push((r.i / e) | 0), t.push((n.i / e) | 0), t.push((s.i / e) | 0), Gi(n), Gi(n.next), (n = i = s)),
      (n = n.next);
  } while (n !== i);
  return Bn(n);
}
function Xm(i, t, e, n, r, s) {
  let o = i;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && tg(o, a)) {
        let l = Gl(o, a);
        (o = Bn(o, o.next)), (l = Bn(l, l.next)), zi(o, t, e, n, r, s, 0), zi(l, t, e, n, r, s, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== i);
}
function qm(i, t, e, n) {
  const r = [];
  let s, o, a, l, c;
  for (s = 0, o = t.length; s < o; s++)
    (a = t[s] * n), (l = s < o - 1 ? t[s + 1] * n : i.length), (c = zl(i, a, l, n, !1)), c === c.next && (c.steiner = !0), r.push(Qm(c));
  for (r.sort(Ym), s = 0; s < r.length; s++) e = jm(r[s], e);
  return e;
}
function Ym(i, t) {
  return i.x - t.x;
}
function jm(i, t) {
  const e = Zm(i, t);
  if (!e) return t;
  const n = Gl(e, i);
  return Bn(n, n.next), Bn(e, e.next);
}
function Zm(i, t) {
  let e = t,
    n = -1 / 0,
    r;
  const s = i.x,
    o = i.y;
  do {
    if (o <= e.y && o >= e.next.y && e.next.y !== e.y) {
      const d = e.x + ((o - e.y) * (e.next.x - e.x)) / (e.next.y - e.y);
      if (d <= s && d > n && ((n = d), (r = e.x < e.next.x ? e : e.next), d === s)) return r;
    }
    e = e.next;
  } while (e !== t);
  if (!r) return null;
  const a = r,
    l = r.x,
    c = r.y;
  let h = 1 / 0,
    u;
  e = r;
  do
    s >= e.x &&
      e.x >= l &&
      s !== e.x &&
      hi(o < c ? s : n, o, l, c, o < c ? n : s, o, e.x, e.y) &&
      ((u = Math.abs(o - e.y) / (s - e.x)), Hi(e, i) && (u < h || (u === h && (e.x > r.x || (e.x === r.x && Km(r, e))))) && ((r = e), (h = u))),
      (e = e.next);
  while (e !== a);
  return r;
}
function Km(i, t) {
  return ne(i.prev, i, t.prev) < 0 && ne(t.next, i, i.next) < 0;
}
function Jm(i, t, e, n) {
  let r = i;
  do r.z === 0 && (r.z = Ks(r.x, r.y, t, e, n)), (r.prevZ = r.prev), (r.nextZ = r.next), (r = r.next);
  while (r !== i);
  (r.prevZ.nextZ = null), (r.prevZ = null), $m(r);
}
function $m(i) {
  let t,
    e,
    n,
    r,
    s,
    o,
    a,
    l,
    c = 1;
  do {
    for (e = i, i = null, s = null, o = 0; e; ) {
      for (o++, n = e, a = 0, t = 0; t < c && (a++, (n = n.nextZ), !!n); t++);
      for (l = c; a > 0 || (l > 0 && n); )
        a !== 0 && (l === 0 || !n || e.z <= n.z) ? ((r = e), (e = e.nextZ), a--) : ((r = n), (n = n.nextZ), l--),
          s ? (s.nextZ = r) : (i = r),
          (r.prevZ = s),
          (s = r);
      e = n;
    }
    (s.nextZ = null), (c *= 2);
  } while (o > 1);
  return i;
}
function Ks(i, t, e, n, r) {
  return (
    (i = ((i - e) * r) | 0),
    (t = ((t - n) * r) | 0),
    (i = (i | (i << 8)) & 16711935),
    (i = (i | (i << 4)) & 252645135),
    (i = (i | (i << 2)) & 858993459),
    (i = (i | (i << 1)) & 1431655765),
    (t = (t | (t << 8)) & 16711935),
    (t = (t | (t << 4)) & 252645135),
    (t = (t | (t << 2)) & 858993459),
    (t = (t | (t << 1)) & 1431655765),
    i | (t << 1)
  );
}
function Qm(i) {
  let t = i,
    e = i;
  do (t.x < e.x || (t.x === e.x && t.y < e.y)) && (e = t), (t = t.next);
  while (t !== i);
  return e;
}
function hi(i, t, e, n, r, s, o, a) {
  return (r - o) * (t - a) >= (i - o) * (s - a) && (i - o) * (n - a) >= (e - o) * (t - a) && (e - o) * (s - a) >= (r - o) * (n - a);
}
function tg(i, t) {
  return (
    i.next.i !== t.i &&
    i.prev.i !== t.i &&
    !eg(i, t) &&
    ((Hi(i, t) && Hi(t, i) && ng(i, t) && (ne(i.prev, i, t.prev) || ne(i, t.prev, t))) ||
      (jr(i, t) && ne(i.prev, i, i.next) > 0 && ne(t.prev, t, t.next) > 0))
  );
}
function ne(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function jr(i, t) {
  return i.x === t.x && i.y === t.y;
}
function Hl(i, t, e, n) {
  const r = wr(ne(i, t, e)),
    s = wr(ne(i, t, n)),
    o = wr(ne(e, n, i)),
    a = wr(ne(e, n, t));
  return !!((r !== s && o !== a) || (r === 0 && Ar(i, e, t)) || (s === 0 && Ar(i, n, t)) || (o === 0 && Ar(e, i, n)) || (a === 0 && Ar(e, t, n)));
}
function Ar(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function wr(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function eg(i, t) {
  let e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && Hl(e, e.next, i, t)) return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function Hi(i, t) {
  return ne(i.prev, i, i.next) < 0 ? ne(i, t, i.next) >= 0 && ne(i, i.prev, t) >= 0 : ne(i, t, i.prev) < 0 || ne(i, i.next, t) < 0;
}
function ng(i, t) {
  let e = i,
    n = !1;
  const r = (i.x + t.x) / 2,
    s = (i.y + t.y) / 2;
  do e.y > s != e.next.y > s && e.next.y !== e.y && r < ((e.next.x - e.x) * (s - e.y)) / (e.next.y - e.y) + e.x && (n = !n), (e = e.next);
  while (e !== i);
  return n;
}
function Gl(i, t) {
  const e = new Js(i.i, i.x, i.y),
    n = new Js(t.i, t.x, t.y),
    r = i.next,
    s = t.prev;
  return (i.next = t), (t.prev = i), (e.next = r), (r.prev = e), (n.next = e), (e.prev = n), (s.next = n), (n.prev = s), n;
}
function qo(i, t, e, n) {
  const r = new Js(i, t, e);
  return n ? ((r.next = n.next), (r.prev = n), (n.next.prev = r), (n.next = r)) : ((r.prev = r), (r.next = r)), r;
}
function Gi(i) {
  (i.next.prev = i.prev), (i.prev.next = i.next), i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function Js(i, t, e) {
  (this.i = i),
    (this.x = t),
    (this.y = e),
    (this.prev = null),
    (this.next = null),
    (this.z = 0),
    (this.prevZ = null),
    (this.nextZ = null),
    (this.steiner = !1);
}
function ig(i, t, e, n) {
  let r = 0;
  for (let s = t, o = e - n; s < e; s += n) (r += (i[o] - i[s]) * (i[s + 1] + i[o + 1])), (o = s);
  return r;
}
class pi {
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let r = e - 1, s = 0; s < e; r = s++) n += t[r].x * t[s].y - t[s].x * t[r].y;
    return n * 0.5;
  }
  static isClockWise(t) {
    return pi.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [],
      r = [],
      s = [];
    Yo(t), jo(n, t);
    let o = t.length;
    e.forEach(Yo);
    for (let l = 0; l < e.length; l++) r.push(o), (o += e[l].length), jo(n, e[l]);
    const a = Gm.triangulate(n, r);
    for (let l = 0; l < a.length; l += 3) s.push(a.slice(l, l + 3));
    return s;
  }
}
function Yo(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function jo(i, t) {
  for (let e = 0; e < t.length; e++) i.push(t[e].x), i.push(t[e].y);
}
class Vl extends Ce {
  constructor(t = new Lr([new Z(0.5, 0.5), new Z(-0.5, 0.5), new Z(-0.5, -0.5), new Z(0.5, -0.5)]), e = {}) {
    super(), (this.type = "ExtrudeGeometry"), (this.parameters = { shapes: t, options: e }), (t = Array.isArray(t) ? t : [t]);
    const n = this,
      r = [],
      s = [];
    for (let a = 0, l = t.length; a < l; a++) {
      const c = t[a];
      o(c);
    }
    this.setAttribute("position", new Me(r, 3)), this.setAttribute("uv", new Me(s, 2)), this.computeVertexNormals();
    function o(a) {
      const l = [],
        c = e.curveSegments !== void 0 ? e.curveSegments : 12,
        h = e.steps !== void 0 ? e.steps : 1,
        u = e.depth !== void 0 ? e.depth : 1;
      let d = e.bevelEnabled !== void 0 ? e.bevelEnabled : !0,
        p = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2,
        g = e.bevelSize !== void 0 ? e.bevelSize : p - 0.1,
        v = e.bevelOffset !== void 0 ? e.bevelOffset : 0,
        m = e.bevelSegments !== void 0 ? e.bevelSegments : 3;
      const f = e.extrudePath,
        E = e.UVGenerator !== void 0 ? e.UVGenerator : rg;
      let _,
        b = !1,
        U,
        R,
        w,
        k;
      f && ((_ = f.getSpacedPoints(h)), (b = !0), (d = !1), (U = f.computeFrenetFrames(h, !1)), (R = new C()), (w = new C()), (k = new C())),
        d || ((m = 0), (p = 0), (g = 0), (v = 0));
      const S = a.extractPoints(c);
      let T = S.shape;
      const O = S.holes;
      if (!pi.isClockWise(T)) {
        T = T.reverse();
        for (let P = 0, ct = O.length; P < ct; P++) {
          const q = O[P];
          pi.isClockWise(q) && (O[P] = q.reverse());
        }
      }
      const lt = pi.triangulateShape(T, O),
        D = T;
      for (let P = 0, ct = O.length; P < ct; P++) {
        const q = O[P];
        T = T.concat(q);
      }
      function F(P, ct, q) {
        return ct || console.error("THREE.ExtrudeGeometry: vec does not exist"), P.clone().addScaledVector(ct, q);
      }
      const G = T.length,
        j = lt.length;
      function Y(P, ct, q) {
        let st, X, Tt;
        const mt = P.x - ct.x,
          M = P.y - ct.y,
          x = q.x - P.x,
          I = q.y - P.y,
          it = mt * mt + M * M,
          et = mt * I - M * x;
        if (Math.abs(et) > Number.EPSILON) {
          const K = Math.sqrt(it),
            St = Math.sqrt(x * x + I * I),
            ut = ct.x - M / K,
            _t = ct.y + mt / K,
            Rt = q.x - I / St,
            Bt = q.y + x / St,
            nt = ((Rt - ut) * I - (Bt - _t) * x) / (mt * I - M * x);
          (st = ut + mt * nt - P.x), (X = _t + M * nt - P.y);
          const jt = st * st + X * X;
          if (jt <= 2) return new Z(st, X);
          Tt = Math.sqrt(jt / 2);
        } else {
          let K = !1;
          mt > Number.EPSILON
            ? x > Number.EPSILON && (K = !0)
            : mt < -Number.EPSILON
            ? x < -Number.EPSILON && (K = !0)
            : Math.sign(M) === Math.sign(I) && (K = !0),
            K ? ((st = -M), (X = mt), (Tt = Math.sqrt(it))) : ((st = mt), (X = M), (Tt = Math.sqrt(it / 2)));
        }
        return new Z(st / Tt, X / Tt);
      }
      const W = [];
      for (let P = 0, ct = D.length, q = ct - 1, st = P + 1; P < ct; P++, q++, st++)
        q === ct && (q = 0), st === ct && (st = 0), (W[P] = Y(D[P], D[q], D[st]));
      const $ = [];
      let Q,
        dt = W.concat();
      for (let P = 0, ct = O.length; P < ct; P++) {
        const q = O[P];
        Q = [];
        for (let st = 0, X = q.length, Tt = X - 1, mt = st + 1; st < X; st++, Tt++, mt++)
          Tt === X && (Tt = 0), mt === X && (mt = 0), (Q[st] = Y(q[st], q[Tt], q[mt]));
        $.push(Q), (dt = dt.concat(Q));
      }
      for (let P = 0; P < m; P++) {
        const ct = P / m,
          q = p * Math.cos((ct * Math.PI) / 2),
          st = g * Math.sin((ct * Math.PI) / 2) + v;
        for (let X = 0, Tt = D.length; X < Tt; X++) {
          const mt = F(D[X], W[X], st);
          xt(mt.x, mt.y, -q);
        }
        for (let X = 0, Tt = O.length; X < Tt; X++) {
          const mt = O[X];
          Q = $[X];
          for (let M = 0, x = mt.length; M < x; M++) {
            const I = F(mt[M], Q[M], st);
            xt(I.x, I.y, -q);
          }
        }
      }
      const V = g + v;
      for (let P = 0; P < G; P++) {
        const ct = d ? F(T[P], dt[P], V) : T[P];
        b
          ? (w.copy(U.normals[0]).multiplyScalar(ct.x), R.copy(U.binormals[0]).multiplyScalar(ct.y), k.copy(_[0]).add(w).add(R), xt(k.x, k.y, k.z))
          : xt(ct.x, ct.y, 0);
      }
      for (let P = 1; P <= h; P++)
        for (let ct = 0; ct < G; ct++) {
          const q = d ? F(T[ct], dt[ct], V) : T[ct];
          b
            ? (w.copy(U.normals[P]).multiplyScalar(q.x), R.copy(U.binormals[P]).multiplyScalar(q.y), k.copy(_[P]).add(w).add(R), xt(k.x, k.y, k.z))
            : xt(q.x, q.y, (u / h) * P);
        }
      for (let P = m - 1; P >= 0; P--) {
        const ct = P / m,
          q = p * Math.cos((ct * Math.PI) / 2),
          st = g * Math.sin((ct * Math.PI) / 2) + v;
        for (let X = 0, Tt = D.length; X < Tt; X++) {
          const mt = F(D[X], W[X], st);
          xt(mt.x, mt.y, u + q);
        }
        for (let X = 0, Tt = O.length; X < Tt; X++) {
          const mt = O[X];
          Q = $[X];
          for (let M = 0, x = mt.length; M < x; M++) {
            const I = F(mt[M], Q[M], st);
            b ? xt(I.x, I.y + _[h - 1].y, _[h - 1].x + q) : xt(I.x, I.y, u + q);
          }
        }
      }
      tt(), pt();
      function tt() {
        const P = r.length / 3;
        if (d) {
          let ct = 0,
            q = G * ct;
          for (let st = 0; st < j; st++) {
            const X = lt[st];
            Pt(X[2] + q, X[1] + q, X[0] + q);
          }
          (ct = h + m * 2), (q = G * ct);
          for (let st = 0; st < j; st++) {
            const X = lt[st];
            Pt(X[0] + q, X[1] + q, X[2] + q);
          }
        } else {
          for (let ct = 0; ct < j; ct++) {
            const q = lt[ct];
            Pt(q[2], q[1], q[0]);
          }
          for (let ct = 0; ct < j; ct++) {
            const q = lt[ct];
            Pt(q[0] + G * h, q[1] + G * h, q[2] + G * h);
          }
        }
        n.addGroup(P, r.length / 3 - P, 0);
      }
      function pt() {
        const P = r.length / 3;
        let ct = 0;
        Et(D, ct), (ct += D.length);
        for (let q = 0, st = O.length; q < st; q++) {
          const X = O[q];
          Et(X, ct), (ct += X.length);
        }
        n.addGroup(P, r.length / 3 - P, 1);
      }
      function Et(P, ct) {
        let q = P.length;
        for (; --q >= 0; ) {
          const st = q;
          let X = q - 1;
          X < 0 && (X = P.length - 1);
          for (let Tt = 0, mt = h + m * 2; Tt < mt; Tt++) {
            const M = G * Tt,
              x = G * (Tt + 1),
              I = ct + st + M,
              it = ct + X + M,
              et = ct + X + x,
              K = ct + st + x;
            It(I, it, et, K);
          }
        }
      }
      function xt(P, ct, q) {
        l.push(P), l.push(ct), l.push(q);
      }
      function Pt(P, ct, q) {
        yt(P), yt(ct), yt(q);
        const st = r.length / 3,
          X = E.generateTopUV(n, r, st - 3, st - 2, st - 1);
        Ut(X[0]), Ut(X[1]), Ut(X[2]);
      }
      function It(P, ct, q, st) {
        yt(P), yt(ct), yt(st), yt(ct), yt(q), yt(st);
        const X = r.length / 3,
          Tt = E.generateSideWallUV(n, r, X - 6, X - 3, X - 2, X - 1);
        Ut(Tt[0]), Ut(Tt[1]), Ut(Tt[3]), Ut(Tt[1]), Ut(Tt[2]), Ut(Tt[3]);
      }
      function yt(P) {
        r.push(l[P * 3 + 0]), r.push(l[P * 3 + 1]), r.push(l[P * 3 + 2]);
      }
      function Ut(P) {
        s.push(P.x), s.push(P.y);
      }
    }
  }
  copy(t) {
    return super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this;
  }
  toJSON() {
    const t = super.toJSON(),
      e = this.parameters.shapes,
      n = this.parameters.options;
    return sg(e, n, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let s = 0, o = t.shapes.length; s < o; s++) {
      const a = e[t.shapes[s]];
      n.push(a);
    }
    const r = t.options.extrudePath;
    return r !== void 0 && (t.options.extrudePath = new js[r.type]().fromJSON(r)), new Vl(n, t.options);
  }
}
const rg = {
  generateTopUV: function (i, t, e, n, r) {
    const s = t[e * 3],
      o = t[e * 3 + 1],
      a = t[n * 3],
      l = t[n * 3 + 1],
      c = t[r * 3],
      h = t[r * 3 + 1];
    return [new Z(s, o), new Z(a, l), new Z(c, h)];
  },
  generateSideWallUV: function (i, t, e, n, r, s) {
    const o = t[e * 3],
      a = t[e * 3 + 1],
      l = t[e * 3 + 2],
      c = t[n * 3],
      h = t[n * 3 + 1],
      u = t[n * 3 + 2],
      d = t[r * 3],
      p = t[r * 3 + 1],
      g = t[r * 3 + 2],
      v = t[s * 3],
      m = t[s * 3 + 1],
      f = t[s * 3 + 2];
    return Math.abs(a - h) < Math.abs(o - c)
      ? [new Z(o, 1 - l), new Z(c, 1 - u), new Z(d, 1 - g), new Z(v, 1 - f)]
      : [new Z(a, 1 - l), new Z(h, 1 - u), new Z(p, 1 - g), new Z(m, 1 - f)];
  },
};
function sg(i, t, e) {
  if (((e.shapes = []), Array.isArray(i)))
    for (let n = 0, r = i.length; n < r; n++) {
      const s = i[n];
      e.shapes.push(s.uuid);
    }
  else e.shapes.push(i.uuid);
  return (e.options = Object.assign({}, t)), t.extrudePath !== void 0 && (e.options.extrudePath = t.extrudePath.toJSON()), e;
}
class kl extends Ce {
  constructor(t = 1, e = 32, n = 16, r = 0, s = Math.PI * 2, o = 0, a = Math.PI) {
    super(),
      (this.type = "SphereGeometry"),
      (this.parameters = { radius: t, widthSegments: e, heightSegments: n, phiStart: r, phiLength: s, thetaStart: o, thetaLength: a }),
      (e = Math.max(3, Math.floor(e))),
      (n = Math.max(2, Math.floor(n)));
    const l = Math.min(o + a, Math.PI);
    let c = 0;
    const h = [],
      u = new C(),
      d = new C(),
      p = [],
      g = [],
      v = [],
      m = [];
    for (let f = 0; f <= n; f++) {
      const E = [],
        _ = f / n;
      let b = 0;
      f === 0 && o === 0 ? (b = 0.5 / e) : f === n && l === Math.PI && (b = -0.5 / e);
      for (let U = 0; U <= e; U++) {
        const R = U / e;
        (u.x = -t * Math.cos(r + R * s) * Math.sin(o + _ * a)),
          (u.y = t * Math.cos(o + _ * a)),
          (u.z = t * Math.sin(r + R * s) * Math.sin(o + _ * a)),
          g.push(u.x, u.y, u.z),
          d.copy(u).normalize(),
          v.push(d.x, d.y, d.z),
          m.push(R + b, 1 - _),
          E.push(c++);
      }
      h.push(E);
    }
    for (let f = 0; f < n; f++)
      for (let E = 0; E < e; E++) {
        const _ = h[f][E + 1],
          b = h[f][E],
          U = h[f + 1][E],
          R = h[f + 1][E + 1];
        (f !== 0 || o > 0) && p.push(_, b, R), (f !== n - 1 || l < Math.PI) && p.push(b, U, R);
      }
    this.setIndex(p), this.setAttribute("position", new Me(g, 3)), this.setAttribute("normal", new Me(v, 3)), this.setAttribute("uv", new Me(m, 2));
  }
  copy(t) {
    return super.copy(t), (this.parameters = Object.assign({}, t.parameters)), this;
  }
  static fromJSON(t) {
    return new kl(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}
class Ng extends je {
  constructor(t) {
    super(),
      (this.isMeshStandardMaterial = !0),
      (this.defines = { STANDARD: "" }),
      (this.type = "MeshStandardMaterial"),
      (this.color = new Ft(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Ft(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = kr),
      (this.normalScale = new Z(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapIntensity = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      (this.defines = { STANDARD: "" }),
      this.color.copy(t.color),
      (this.roughness = t.roughness),
      (this.metalness = t.metalness),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      this.emissive.copy(t.emissive),
      (this.emissiveMap = t.emissiveMap),
      (this.emissiveIntensity = t.emissiveIntensity),
      (this.bumpMap = t.bumpMap),
      (this.bumpScale = t.bumpScale),
      (this.normalMap = t.normalMap),
      (this.normalMapType = t.normalMapType),
      this.normalScale.copy(t.normalScale),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.roughnessMap = t.roughnessMap),
      (this.metalnessMap = t.metalnessMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      (this.envMapIntensity = t.envMapIntensity),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.flatShading = t.flatShading),
      (this.fog = t.fog),
      this
    );
  }
}
class Og extends je {
  constructor(t) {
    super(),
      (this.isMeshPhongMaterial = !0),
      (this.type = "MeshPhongMaterial"),
      (this.color = new Ft(16777215)),
      (this.specular = new Ft(1118481)),
      (this.shininess = 30),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Ft(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = kr),
      (this.normalScale = new Z(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = Gr),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      this.specular.copy(t.specular),
      (this.shininess = t.shininess),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      this.emissive.copy(t.emissive),
      (this.emissiveMap = t.emissiveMap),
      (this.emissiveIntensity = t.emissiveIntensity),
      (this.bumpMap = t.bumpMap),
      (this.bumpScale = t.bumpScale),
      (this.normalMap = t.normalMap),
      (this.normalMapType = t.normalMapType),
      this.normalScale.copy(t.normalScale),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.flatShading = t.flatShading),
      (this.fog = t.fog),
      this
    );
  }
}
class Fg extends je {
  constructor(t) {
    super(),
      (this.isMeshLambertMaterial = !0),
      (this.type = "MeshLambertMaterial"),
      (this.color = new Ft(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new Ft(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = kr),
      (this.normalScale = new Z(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = Gr),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      this.color.copy(t.color),
      (this.map = t.map),
      (this.lightMap = t.lightMap),
      (this.lightMapIntensity = t.lightMapIntensity),
      (this.aoMap = t.aoMap),
      (this.aoMapIntensity = t.aoMapIntensity),
      this.emissive.copy(t.emissive),
      (this.emissiveMap = t.emissiveMap),
      (this.emissiveIntensity = t.emissiveIntensity),
      (this.bumpMap = t.bumpMap),
      (this.bumpScale = t.bumpScale),
      (this.normalMap = t.normalMap),
      (this.normalMapType = t.normalMapType),
      this.normalScale.copy(t.normalScale),
      (this.displacementMap = t.displacementMap),
      (this.displacementScale = t.displacementScale),
      (this.displacementBias = t.displacementBias),
      (this.specularMap = t.specularMap),
      (this.alphaMap = t.alphaMap),
      (this.envMap = t.envMap),
      (this.combine = t.combine),
      (this.reflectivity = t.reflectivity),
      (this.refractionRatio = t.refractionRatio),
      (this.wireframe = t.wireframe),
      (this.wireframeLinewidth = t.wireframeLinewidth),
      (this.wireframeLinecap = t.wireframeLinecap),
      (this.wireframeLinejoin = t.wireframeLinejoin),
      (this.flatShading = t.flatShading),
      (this.fog = t.fog),
      this
    );
  }
}
const Hr = {
  enabled: !1,
  files: {},
  add: function (i, t) {
    this.enabled !== !1 && (this.files[i] = t);
  },
  get: function (i) {
    if (this.enabled !== !1) return this.files[i];
  },
  remove: function (i) {
    delete this.files[i];
  },
  clear: function () {
    this.files = {};
  },
};
class ag {
  constructor(t, e, n) {
    const r = this;
    let s = !1,
      o = 0,
      a = 0,
      l;
    const c = [];
    (this.onStart = void 0),
      (this.onLoad = t),
      (this.onProgress = e),
      (this.onError = n),
      (this.itemStart = function (h) {
        a++, s === !1 && r.onStart !== void 0 && r.onStart(h, o, a), (s = !0);
      }),
      (this.itemEnd = function (h) {
        o++, r.onProgress !== void 0 && r.onProgress(h, o, a), o === a && ((s = !1), r.onLoad !== void 0 && r.onLoad());
      }),
      (this.itemError = function (h) {
        r.onError !== void 0 && r.onError(h);
      }),
      (this.resolveURL = function (h) {
        return l ? l(h) : h;
      }),
      (this.setURLModifier = function (h) {
        return (l = h), this;
      }),
      (this.addHandler = function (h, u) {
        return c.push(h, u), this;
      }),
      (this.removeHandler = function (h) {
        const u = c.indexOf(h);
        return u !== -1 && c.splice(u, 2), this;
      }),
      (this.getHandler = function (h) {
        for (let u = 0, d = c.length; u < d; u += 2) {
          const p = c[u],
            g = c[u + 1];
          if ((p.global && (p.lastIndex = 0), p.test(h))) return g;
        }
        return null;
      });
  }
}
const og = new ag();
class qi {
  constructor(t) {
    (this.manager = t !== void 0 ? t : og),
      (this.crossOrigin = "anonymous"),
      (this.withCredentials = !1),
      (this.path = ""),
      (this.resourcePath = ""),
      (this.requestHeader = {});
  }
  load() {}
  loadAsync(t, e) {
    const n = this;
    return new Promise(function (r, s) {
      n.load(t, r, e, s);
    });
  }
  parse() {}
  setCrossOrigin(t) {
    return (this.crossOrigin = t), this;
  }
  setWithCredentials(t) {
    return (this.withCredentials = t), this;
  }
  setPath(t) {
    return (this.path = t), this;
  }
  setResourcePath(t) {
    return (this.resourcePath = t), this;
  }
  setRequestHeader(t) {
    return (this.requestHeader = t), this;
  }
}
qi.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const nn = {};
class lg extends Error {
  constructor(t, e) {
    super(t), (this.response = e);
  }
}
class cg extends qi {
  constructor(t) {
    super(t);
  }
  load(t, e, n, r) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), (t = this.manager.resolveURL(t));
    const s = Hr.get(t);
    if (s !== void 0)
      return (
        this.manager.itemStart(t),
        setTimeout(() => {
          e && e(s), this.manager.itemEnd(t);
        }, 0),
        s
      );
    if (nn[t] !== void 0) {
      nn[t].push({ onLoad: e, onProgress: n, onError: r });
      return;
    }
    (nn[t] = []), nn[t].push({ onLoad: e, onProgress: n, onError: r });
    const o = new Request(t, { headers: new Headers(this.requestHeader), credentials: this.withCredentials ? "include" : "same-origin" }),
      a = this.mimeType,
      l = this.responseType;
    fetch(o)
      .then((c) => {
        if (c.status === 200 || c.status === 0) {
          if (
            (c.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."),
            typeof ReadableStream == "undefined" || c.body === void 0 || c.body.getReader === void 0)
          )
            return c;
          const h = nn[t],
            u = c.body.getReader(),
            d = c.headers.get("Content-Length") || c.headers.get("X-File-Size"),
            p = d ? parseInt(d) : 0,
            g = p !== 0;
          let v = 0;
          const m = new ReadableStream({
            start(f) {
              E();
              function E() {
                u.read().then(({ done: _, value: b }) => {
                  if (_) f.close();
                  else {
                    v += b.byteLength;
                    const U = new ProgressEvent("progress", { lengthComputable: g, loaded: v, total: p });
                    for (let R = 0, w = h.length; R < w; R++) {
                      const k = h[R];
                      k.onProgress && k.onProgress(U);
                    }
                    f.enqueue(b), E();
                  }
                });
              }
            },
          });
          return new Response(m);
        } else throw new lg(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`, c);
      })
      .then((c) => {
        switch (l) {
          case "arraybuffer":
            return c.arrayBuffer();
          case "blob":
            return c.blob();
          case "document":
            return c.text().then((h) => new DOMParser().parseFromString(h, a));
          case "json":
            return c.json();
          default:
            if (a === void 0) return c.text();
            {
              const u = /charset="?([^;"\s]*)"?/i.exec(a),
                d = u && u[1] ? u[1].toLowerCase() : void 0,
                p = new TextDecoder(d);
              return c.arrayBuffer().then((g) => p.decode(g));
            }
        }
      })
      .then((c) => {
        Hr.add(t, c);
        const h = nn[t];
        delete nn[t];
        for (let u = 0, d = h.length; u < d; u++) {
          const p = h[u];
          p.onLoad && p.onLoad(c);
        }
      })
      .catch((c) => {
        const h = nn[t];
        if (h === void 0) throw (this.manager.itemError(t), c);
        delete nn[t];
        for (let u = 0, d = h.length; u < d; u++) {
          const p = h[u];
          p.onError && p.onError(c);
        }
        this.manager.itemError(t);
      })
      .finally(() => {
        this.manager.itemEnd(t);
      }),
      this.manager.itemStart(t);
  }
  setResponseType(t) {
    return (this.responseType = t), this;
  }
  setMimeType(t) {
    return (this.mimeType = t), this;
  }
}
class hg extends qi {
  constructor(t) {
    super(t);
  }
  load(t, e, n, r) {
    this.path !== void 0 && (t = this.path + t), (t = this.manager.resolveURL(t));
    const s = this,
      o = Hr.get(t);
    if (o !== void 0)
      return (
        s.manager.itemStart(t),
        setTimeout(function () {
          e && e(o), s.manager.itemEnd(t);
        }, 0),
        o
      );
    const a = Bi("img");
    function l() {
      h(), Hr.add(t, this), e && e(this), s.manager.itemEnd(t);
    }
    function c(u) {
      h(), r && r(u), s.manager.itemError(t), s.manager.itemEnd(t);
    }
    function h() {
      a.removeEventListener("load", l, !1), a.removeEventListener("error", c, !1);
    }
    return (
      a.addEventListener("load", l, !1),
      a.addEventListener("error", c, !1),
      t.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (a.crossOrigin = this.crossOrigin),
      s.manager.itemStart(t),
      (a.src = t),
      a
    );
  }
}
class Bg extends qi {
  constructor(t) {
    super(t);
  }
  load(t, e, n, r) {
    const s = new Ee(),
      o = new hg(this.manager);
    return (
      o.setCrossOrigin(this.crossOrigin),
      o.setPath(this.path),
      o.load(
        t,
        function (a) {
          (s.image = a), (s.needsUpdate = !0), e !== void 0 && e(s);
        },
        n,
        r
      ),
      s
    );
  }
}
class ca extends oe {
  constructor(t, e = 1) {
    super(), (this.isLight = !0), (this.type = "Light"), (this.color = new Ft(t)), (this.intensity = e);
  }
  dispose() {}
  copy(t, e) {
    return super.copy(t, e), this.color.copy(t.color), (this.intensity = t.intensity), this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return (
      (e.object.color = this.color.getHex()),
      (e.object.intensity = this.intensity),
      this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()),
      this.distance !== void 0 && (e.object.distance = this.distance),
      this.angle !== void 0 && (e.object.angle = this.angle),
      this.decay !== void 0 && (e.object.decay = this.decay),
      this.penumbra !== void 0 && (e.object.penumbra = this.penumbra),
      this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()),
      e
    );
  }
}
const Us = new te(),
  Zo = new C(),
  Ko = new C();
class Wl {
  constructor(t) {
    (this.camera = t),
      (this.bias = 0),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.blurSamples = 8),
      (this.mapSize = new Z(512, 512)),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new te()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new ia()),
      (this._frameExtents = new Z(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new Qt(0, 0, 1, 1)]);
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera,
      n = this.matrix;
    Zo.setFromMatrixPosition(t.matrixWorld),
      e.position.copy(Zo),
      Ko.setFromMatrixPosition(t.target.matrixWorld),
      e.lookAt(Ko),
      e.updateMatrixWorld(),
      Us.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(Us),
      n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
      n.multiply(Us);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(t) {
    return (this.camera = t.camera.clone()), (this.bias = t.bias), (this.radius = t.radius), this.mapSize.copy(t.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return (
      this.bias !== 0 && (t.bias = this.bias),
      this.normalBias !== 0 && (t.normalBias = this.normalBias),
      this.radius !== 1 && (t.radius = this.radius),
      (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()),
      (t.camera = this.camera.toJSON(!1).object),
      delete t.camera.matrix,
      t
    );
  }
}
const Jo = new te(),
  Ri = new C(),
  Is = new C();
class ug extends Wl {
  constructor() {
    super(new Ie(90, 1, 0.5, 500)),
      (this.isPointLightShadow = !0),
      (this._frameExtents = new Z(4, 2)),
      (this._viewportCount = 6),
      (this._viewports = [new Qt(2, 1, 1, 1), new Qt(0, 1, 1, 1), new Qt(3, 1, 1, 1), new Qt(1, 1, 1, 1), new Qt(3, 0, 1, 1), new Qt(1, 0, 1, 1)]),
      (this._cubeDirections = [new C(1, 0, 0), new C(-1, 0, 0), new C(0, 0, 1), new C(0, 0, -1), new C(0, 1, 0), new C(0, -1, 0)]),
      (this._cubeUps = [new C(0, 1, 0), new C(0, 1, 0), new C(0, 1, 0), new C(0, 1, 0), new C(0, 0, 1), new C(0, 0, -1)]);
  }
  updateMatrices(t, e = 0) {
    const n = this.camera,
      r = this.matrix,
      s = t.distance || n.far;
    s !== n.far && ((n.far = s), n.updateProjectionMatrix()),
      Ri.setFromMatrixPosition(t.matrixWorld),
      n.position.copy(Ri),
      Is.copy(n.position),
      Is.add(this._cubeDirections[e]),
      n.up.copy(this._cubeUps[e]),
      n.lookAt(Is),
      n.updateMatrixWorld(),
      r.makeTranslation(-Ri.x, -Ri.y, -Ri.z),
      Jo.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(Jo);
  }
}
class zg extends ca {
  constructor(t, e, n = 0, r = 2) {
    super(t, e), (this.isPointLight = !0), (this.type = "PointLight"), (this.distance = n), (this.decay = r), (this.shadow = new ug());
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(t) {
    this.intensity = t / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t, e) {
    return super.copy(t, e), (this.distance = t.distance), (this.decay = t.decay), (this.shadow = t.shadow.clone()), this;
  }
}
class fg extends Wl {
  constructor() {
    super(new sa(-5, 5, 5, -5, 0.5, 500)), (this.isDirectionalLightShadow = !0);
  }
}
class Hg extends ca {
  constructor(t, e) {
    super(t, e),
      (this.isDirectionalLight = !0),
      (this.type = "DirectionalLight"),
      this.position.copy(oe.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new oe()),
      (this.shadow = new fg());
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), (this.target = t.target.clone()), (this.shadow = t.shadow.clone()), this;
  }
}
class Gg extends ca {
  constructor(t, e) {
    super(t, e), (this.isAmbientLight = !0), (this.type = "AmbientLight");
  }
}
let Rr;
class Xl {
  static getContext() {
    return Rr === void 0 && (Rr = new (window.AudioContext || window.webkitAudioContext)()), Rr;
  }
  static setContext(t) {
    Rr = t;
  }
}
class Vg extends qi {
  constructor(t) {
    super(t);
  }
  load(t, e, n, r) {
    const s = this,
      o = new cg(this.manager);
    o.setResponseType("arraybuffer"),
      o.setPath(this.path),
      o.setRequestHeader(this.requestHeader),
      o.setWithCredentials(this.withCredentials),
      o.load(
        t,
        function (l) {
          try {
            const c = l.slice(0);
            Xl.getContext()
              .decodeAudioData(c, function (u) {
                e(u);
              })
              .catch(a);
          } catch (c) {
            a(c);
          }
        },
        n,
        r
      );
    function a(l) {
      r ? r(l) : console.error(l), s.manager.itemError(t);
    }
  }
}
class ql {
  constructor(t = !0) {
    (this.autoStart = t), (this.startTime = 0), (this.oldTime = 0), (this.elapsedTime = 0), (this.running = !1);
  }
  start() {
    (this.startTime = $o()), (this.oldTime = this.startTime), (this.elapsedTime = 0), (this.running = !0);
  }
  stop() {
    this.getElapsedTime(), (this.running = !1), (this.autoStart = !1);
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let t = 0;
    if (this.autoStart && !this.running) return this.start(), 0;
    if (this.running) {
      const e = $o();
      (t = (e - this.oldTime) / 1e3), (this.oldTime = e), (this.elapsedTime += t);
    }
    return t;
  }
}
function $o() {
  return (typeof performance == "undefined" ? Date : performance).now();
}
const Cn = new C(),
  Qo = new yn(),
  dg = new C(),
  Pn = new C();
class kg extends oe {
  constructor() {
    super(),
      (this.type = "AudioListener"),
      (this.context = Xl.getContext()),
      (this.gain = this.context.createGain()),
      this.gain.connect(this.context.destination),
      (this.filter = null),
      (this.timeDelta = 0),
      (this._clock = new ql());
  }
  getInput() {
    return this.gain;
  }
  removeFilter() {
    return (
      this.filter !== null &&
        (this.gain.disconnect(this.filter),
        this.filter.disconnect(this.context.destination),
        this.gain.connect(this.context.destination),
        (this.filter = null)),
      this
    );
  }
  getFilter() {
    return this.filter;
  }
  setFilter(t) {
    return (
      this.filter !== null
        ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination))
        : this.gain.disconnect(this.context.destination),
      (this.filter = t),
      this.gain.connect(this.filter),
      this.filter.connect(this.context.destination),
      this
    );
  }
  getMasterVolume() {
    return this.gain.gain.value;
  }
  setMasterVolume(t) {
    return this.gain.gain.setTargetAtTime(t, this.context.currentTime, 0.01), this;
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t);
    const e = this.context.listener,
      n = this.up;
    if (((this.timeDelta = this._clock.getDelta()), this.matrixWorld.decompose(Cn, Qo, dg), Pn.set(0, 0, -1).applyQuaternion(Qo), e.positionX)) {
      const r = this.context.currentTime + this.timeDelta;
      e.positionX.linearRampToValueAtTime(Cn.x, r),
        e.positionY.linearRampToValueAtTime(Cn.y, r),
        e.positionZ.linearRampToValueAtTime(Cn.z, r),
        e.forwardX.linearRampToValueAtTime(Pn.x, r),
        e.forwardY.linearRampToValueAtTime(Pn.y, r),
        e.forwardZ.linearRampToValueAtTime(Pn.z, r),
        e.upX.linearRampToValueAtTime(n.x, r),
        e.upY.linearRampToValueAtTime(n.y, r),
        e.upZ.linearRampToValueAtTime(n.z, r);
    } else e.setPosition(Cn.x, Cn.y, Cn.z), e.setOrientation(Pn.x, Pn.y, Pn.z, n.x, n.y, n.z);
  }
}
class Wg extends oe {
  constructor(t) {
    super(),
      (this.type = "Audio"),
      (this.listener = t),
      (this.context = t.context),
      (this.gain = this.context.createGain()),
      this.gain.connect(t.getInput()),
      (this.autoplay = !1),
      (this.buffer = null),
      (this.detune = 0),
      (this.loop = !1),
      (this.loopStart = 0),
      (this.loopEnd = 0),
      (this.offset = 0),
      (this.duration = void 0),
      (this.playbackRate = 1),
      (this.isPlaying = !1),
      (this.hasPlaybackControl = !0),
      (this.source = null),
      (this.sourceType = "empty"),
      (this._startedAt = 0),
      (this._progress = 0),
      (this._connected = !1),
      (this.filters = []);
  }
  getOutput() {
    return this.gain;
  }
  setNodeSource(t) {
    return (this.hasPlaybackControl = !1), (this.sourceType = "audioNode"), (this.source = t), this.connect(), this;
  }
  setMediaElementSource(t) {
    return (
      (this.hasPlaybackControl = !1), (this.sourceType = "mediaNode"), (this.source = this.context.createMediaElementSource(t)), this.connect(), this
    );
  }
  setMediaStreamSource(t) {
    return (
      (this.hasPlaybackControl = !1),
      (this.sourceType = "mediaStreamNode"),
      (this.source = this.context.createMediaStreamSource(t)),
      this.connect(),
      this
    );
  }
  setBuffer(t) {
    return (this.buffer = t), (this.sourceType = "buffer"), this.autoplay && this.play(), this;
  }
  play(t = 0) {
    if (this.isPlaying === !0) {
      console.warn("THREE.Audio: Audio is already playing.");
      return;
    }
    if (this.hasPlaybackControl === !1) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    this._startedAt = this.context.currentTime + t;
    const e = this.context.createBufferSource();
    return (
      (e.buffer = this.buffer),
      (e.loop = this.loop),
      (e.loopStart = this.loopStart),
      (e.loopEnd = this.loopEnd),
      (e.onended = this.onEnded.bind(this)),
      e.start(this._startedAt, this._progress + this.offset, this.duration),
      (this.isPlaying = !0),
      (this.source = e),
      this.setDetune(this.detune),
      this.setPlaybackRate(this.playbackRate),
      this.connect()
    );
  }
  pause() {
    if (this.hasPlaybackControl === !1) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    return (
      this.isPlaying === !0 &&
        ((this._progress += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate),
        this.loop === !0 && (this._progress = this._progress % (this.duration || this.buffer.duration)),
        this.source.stop(),
        (this.source.onended = null),
        (this.isPlaying = !1)),
      this
    );
  }
  stop() {
    if (this.hasPlaybackControl === !1) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    return (this._progress = 0), this.source !== null && (this.source.stop(), (this.source.onended = null)), (this.isPlaying = !1), this;
  }
  connect() {
    if (this.filters.length > 0) {
      this.source.connect(this.filters[0]);
      for (let t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].connect(this.filters[t]);
      this.filters[this.filters.length - 1].connect(this.getOutput());
    } else this.source.connect(this.getOutput());
    return (this._connected = !0), this;
  }
  disconnect() {
    if (this._connected !== !1) {
      if (this.filters.length > 0) {
        this.source.disconnect(this.filters[0]);
        for (let t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].disconnect(this.filters[t]);
        this.filters[this.filters.length - 1].disconnect(this.getOutput());
      } else this.source.disconnect(this.getOutput());
      return (this._connected = !1), this;
    }
  }
  getFilters() {
    return this.filters;
  }
  setFilters(t) {
    return t || (t = []), this._connected === !0 ? (this.disconnect(), (this.filters = t.slice()), this.connect()) : (this.filters = t.slice()), this;
  }
  setDetune(t) {
    if (((this.detune = t), this.source.detune !== void 0))
      return this.isPlaying === !0 && this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, 0.01), this;
  }
  getDetune() {
    return this.detune;
  }
  getFilter() {
    return this.getFilters()[0];
  }
  setFilter(t) {
    return this.setFilters(t ? [t] : []);
  }
  setPlaybackRate(t) {
    if (this.hasPlaybackControl === !1) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    return (
      (this.playbackRate = t),
      this.isPlaying === !0 && this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, 0.01),
      this
    );
  }
  getPlaybackRate() {
    return this.playbackRate;
  }
  onEnded() {
    this.isPlaying = !1;
  }
  getLoop() {
    return this.hasPlaybackControl === !1 ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop;
  }
  setLoop(t) {
    if (this.hasPlaybackControl === !1) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    return (this.loop = t), this.isPlaying === !0 && (this.source.loop = this.loop), this;
  }
  setLoopStart(t) {
    return (this.loopStart = t), this;
  }
  setLoopEnd(t) {
    return (this.loopEnd = t), this;
  }
  getVolume() {
    return this.gain.gain.value;
  }
  setVolume(t) {
    return this.gain.gain.setTargetAtTime(t, this.context.currentTime, 0.01), this;
  }
}
class Xg {
  constructor(t, e = 2048) {
    (this.analyser = t.context.createAnalyser()),
      (this.analyser.fftSize = e),
      (this.data = new Uint8Array(this.analyser.frequencyBinCount)),
      t.getOutput().connect(this.analyser);
  }
  getFrequencyData() {
    return this.analyser.getByteFrequencyData(this.data), this.data;
  }
  getAverageFrequency() {
    let t = 0;
    const e = this.getFrequencyData();
    for (let n = 0; n < e.length; n++) t += e[n];
    return t / e.length;
  }
}
class tl {
  constructor(t = 1, e = 0, n = 0) {
    return (this.radius = t), (this.phi = e), (this.theta = n), this;
  }
  set(t, e, n) {
    return (this.radius = t), (this.phi = e), (this.theta = n), this;
  }
  copy(t) {
    return (this.radius = t.radius), (this.phi = t.phi), (this.theta = t.theta), this;
  }
  makeSafe() {
    return (this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi))), this;
  }
  setFromVector3(t) {
    return this.setFromCartesianCoords(t.x, t.y, t.z);
  }
  setFromCartesianCoords(t, e, n) {
    return (
      (this.radius = Math.sqrt(t * t + e * e + n * n)),
      this.radius === 0 ? ((this.theta = 0), (this.phi = 0)) : ((this.theta = Math.atan2(t, n)), (this.phi = Math.acos(pe(e / this.radius, -1, 1)))),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class qg {
  constructor() {
    (this.type = "ShapePath"), (this.color = new Ft()), (this.subPaths = []), (this.currentPath = null);
  }
  moveTo(t, e) {
    return (this.currentPath = new Zs()), this.subPaths.push(this.currentPath), this.currentPath.moveTo(t, e), this;
  }
  lineTo(t, e) {
    return this.currentPath.lineTo(t, e), this;
  }
  quadraticCurveTo(t, e, n, r) {
    return this.currentPath.quadraticCurveTo(t, e, n, r), this;
  }
  bezierCurveTo(t, e, n, r, s, o) {
    return this.currentPath.bezierCurveTo(t, e, n, r, s, o), this;
  }
  splineThru(t) {
    return this.currentPath.splineThru(t), this;
  }
  toShapes(t) {
    function e(f) {
      const E = [];
      for (let _ = 0, b = f.length; _ < b; _++) {
        const U = f[_],
          R = new Lr();
        (R.curves = U.curves), E.push(R);
      }
      return E;
    }
    function n(f, E) {
      const _ = E.length;
      let b = !1;
      for (let U = _ - 1, R = 0; R < _; U = R++) {
        let w = E[U],
          k = E[R],
          S = k.x - w.x,
          T = k.y - w.y;
        if (Math.abs(T) > Number.EPSILON) {
          if ((T < 0 && ((w = E[R]), (S = -S), (k = E[U]), (T = -T)), f.y < w.y || f.y > k.y)) continue;
          if (f.y === w.y) {
            if (f.x === w.x) return !0;
          } else {
            const O = T * (f.x - w.x) - S * (f.y - w.y);
            if (O === 0) return !0;
            if (O < 0) continue;
            b = !b;
          }
        } else {
          if (f.y !== w.y) continue;
          if ((k.x <= f.x && f.x <= w.x) || (w.x <= f.x && f.x <= k.x)) return !0;
        }
      }
      return b;
    }
    const r = pi.isClockWise,
      s = this.subPaths;
    if (s.length === 0) return [];
    let o, a, l;
    const c = [];
    if (s.length === 1) return (a = s[0]), (l = new Lr()), (l.curves = a.curves), c.push(l), c;
    let h = !r(s[0].getPoints());
    h = t ? !h : h;
    const u = [],
      d = [];
    let p = [],
      g = 0,
      v;
    (d[g] = void 0), (p[g] = []);
    for (let f = 0, E = s.length; f < E; f++)
      (a = s[f]),
        (v = a.getPoints()),
        (o = r(v)),
        (o = t ? !o : o),
        o ? (!h && d[g] && g++, (d[g] = { s: new Lr(), p: v }), (d[g].s.curves = a.curves), h && g++, (p[g] = [])) : p[g].push({ h: a, p: v[0] });
    if (!d[0]) return e(s);
    if (d.length > 1) {
      let f = !1,
        E = 0;
      for (let _ = 0, b = d.length; _ < b; _++) u[_] = [];
      for (let _ = 0, b = d.length; _ < b; _++) {
        const U = p[_];
        for (let R = 0; R < U.length; R++) {
          const w = U[R];
          let k = !0;
          for (let S = 0; S < d.length; S++) n(w.p, d[S].p) && (_ !== S && E++, k ? ((k = !1), u[S].push(w)) : (f = !0));
          k && u[_].push(w);
        }
      }
      E > 0 && f === !1 && (p = u);
    }
    let m;
    for (let f = 0, E = d.length; f < E; f++) {
      (l = d[f].s), c.push(l), (m = p[f]);
      for (let _ = 0, b = m.length; _ < b; _++) l.holes.push(m[_].h);
    }
    return c;
  }
}
typeof __THREE_DEVTOOLS__ != "undefined" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: $s } }));
typeof window != "undefined" &&
  (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : (window.__THREE__ = $s));
const el = { type: "change" },
  Ns = { type: "start" },
  nl = { type: "end" },
  Cr = new Xr(),
  il = new gn(),
  pg = Math.cos(70 * mh.DEG2RAD);
class Yg extends zn {
  constructor(t, e) {
    super(),
      (this.object = t),
      (this.domElement = e),
      (this.domElement.style.touchAction = "none"),
      (this.enabled = !0),
      (this.target = new C()),
      (this.cursor = new C()),
      (this.minDistance = 0),
      (this.maxDistance = 1 / 0),
      (this.minZoom = 0),
      (this.maxZoom = 1 / 0),
      (this.minTargetRadius = 0),
      (this.maxTargetRadius = 1 / 0),
      (this.minPolarAngle = 0),
      (this.maxPolarAngle = Math.PI),
      (this.minAzimuthAngle = -1 / 0),
      (this.maxAzimuthAngle = 1 / 0),
      (this.enableDamping = !1),
      (this.dampingFactor = 0.05),
      (this.enableZoom = !0),
      (this.zoomSpeed = 1),
      (this.enableRotate = !0),
      (this.rotateSpeed = 1),
      (this.enablePan = !0),
      (this.panSpeed = 1),
      (this.screenSpacePanning = !0),
      (this.keyPanSpeed = 7),
      (this.zoomToCursor = !1),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2),
      (this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }),
      (this.mouseButtons = { LEFT: Hn.ROTATE, MIDDLE: Hn.DOLLY, RIGHT: Hn.PAN }),
      (this.touches = { ONE: Gn.ROTATE, TWO: Gn.DOLLY_PAN }),
      (this.target0 = this.target.clone()),
      (this.position0 = this.object.position.clone()),
      (this.zoom0 = this.object.zoom),
      (this._domElementKeyEvents = null),
      (this.getPolarAngle = function () {
        return a.phi;
      }),
      (this.getAzimuthalAngle = function () {
        return a.theta;
      }),
      (this.getDistance = function () {
        return this.object.position.distanceTo(this.target);
      }),
      (this.listenToKeyEvents = function (A) {
        A.addEventListener("keydown", Rt), (this._domElementKeyEvents = A);
      }),
      (this.stopListenToKeyEvents = function () {
        this._domElementKeyEvents.removeEventListener("keydown", Rt), (this._domElementKeyEvents = null);
      }),
      (this.saveState = function () {
        n.target0.copy(n.target), n.position0.copy(n.object.position), (n.zoom0 = n.object.zoom);
      }),
      (this.reset = function () {
        n.target.copy(n.target0),
          n.object.position.copy(n.position0),
          (n.object.zoom = n.zoom0),
          n.object.updateProjectionMatrix(),
          n.dispatchEvent(el),
          n.update(),
          (s = r.NONE);
      }),
      (this.update = (function () {
        const A = new C(),
          at = new yn().setFromUnitVectors(t.up, new C(0, 1, 0)),
          bt = at.clone().invert(),
          Mt = new C(),
          rt = new yn(),
          L = new C(),
          ot = 2 * Math.PI;
        return function (Lt = null) {
          const Ct = n.object.position;
          A.copy(Ct).sub(n.target),
            A.applyQuaternion(at),
            a.setFromVector3(A),
            n.autoRotate && s === r.NONE && J(T(Lt)),
            n.enableDamping ? ((a.theta += l.theta * n.dampingFactor), (a.phi += l.phi * n.dampingFactor)) : ((a.theta += l.theta), (a.phi += l.phi));
          let qt = n.minAzimuthAngle,
            Yt = n.maxAzimuthAngle;
          isFinite(qt) &&
            isFinite(Yt) &&
            (qt < -Math.PI ? (qt += ot) : qt > Math.PI && (qt -= ot),
            Yt < -Math.PI ? (Yt += ot) : Yt > Math.PI && (Yt -= ot),
            qt <= Yt
              ? (a.theta = Math.max(qt, Math.min(Yt, a.theta)))
              : (a.theta = a.theta > (qt + Yt) / 2 ? Math.max(qt, a.theta) : Math.min(Yt, a.theta))),
            (a.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, a.phi))),
            a.makeSafe(),
            n.enableDamping === !0 ? n.target.addScaledVector(h, n.dampingFactor) : n.target.add(h),
            n.target.sub(n.cursor),
            n.target.clampLength(n.minTargetRadius, n.maxTargetRadius),
            n.target.add(n.cursor),
            (n.zoomToCursor && R) || n.object.isOrthographicCamera ? (a.radius = $(a.radius)) : (a.radius = $(a.radius * c)),
            A.setFromSpherical(a),
            A.applyQuaternion(bt),
            Ct.copy(n.target).add(A),
            n.object.lookAt(n.target),
            n.enableDamping === !0
              ? ((l.theta *= 1 - n.dampingFactor), (l.phi *= 1 - n.dampingFactor), h.multiplyScalar(1 - n.dampingFactor))
              : (l.set(0, 0, 0), h.set(0, 0, 0));
          let ie = !1;
          if (n.zoomToCursor && R) {
            let se = null;
            if (n.object.isPerspectiveCamera) {
              const Zt = A.length();
              se = $(Zt * c);
              const le = Zt - se;
              n.object.position.addScaledVector(b, le), n.object.updateMatrixWorld();
            } else if (n.object.isOrthographicCamera) {
              const Zt = new C(U.x, U.y, 0);
              Zt.unproject(n.object),
                (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / c))),
                n.object.updateProjectionMatrix(),
                (ie = !0);
              const le = new C(U.x, U.y, 0);
              le.unproject(n.object), n.object.position.sub(le).add(Zt), n.object.updateMatrixWorld(), (se = A.length());
            } else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), (n.zoomToCursor = !1);
            se !== null &&
              (this.screenSpacePanning
                ? n.target.set(0, 0, -1).transformDirection(n.object.matrix).multiplyScalar(se).add(n.object.position)
                : (Cr.origin.copy(n.object.position),
                  Cr.direction.set(0, 0, -1).transformDirection(n.object.matrix),
                  Math.abs(n.object.up.dot(Cr.direction)) < pg
                    ? t.lookAt(n.target)
                    : (il.setFromNormalAndCoplanarPoint(n.object.up, n.target), Cr.intersectPlane(il, n.target))));
          } else
            n.object.isOrthographicCamera &&
              ((n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / c))), n.object.updateProjectionMatrix(), (ie = !0));
          return (
            (c = 1),
            (R = !1),
            ie || Mt.distanceToSquared(n.object.position) > o || 8 * (1 - rt.dot(n.object.quaternion)) > o || L.distanceToSquared(n.target) > 0
              ? (n.dispatchEvent(el), Mt.copy(n.object.position), rt.copy(n.object.quaternion), L.copy(n.target), !0)
              : !1
          );
        };
      })()),
      (this.dispose = function () {
        n.domElement.removeEventListener("contextmenu", jt),
          n.domElement.removeEventListener("pointerdown", M),
          n.domElement.removeEventListener("pointercancel", I),
          n.domElement.removeEventListener("wheel", K),
          n.domElement.removeEventListener("pointermove", x),
          n.domElement.removeEventListener("pointerup", I),
          n._domElementKeyEvents !== null && (n._domElementKeyEvents.removeEventListener("keydown", Rt), (n._domElementKeyEvents = null));
      });
    const n = this,
      r = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 };
    let s = r.NONE;
    const o = 1e-6,
      a = new tl(),
      l = new tl();
    let c = 1;
    const h = new C(),
      u = new Z(),
      d = new Z(),
      p = new Z(),
      g = new Z(),
      v = new Z(),
      m = new Z(),
      f = new Z(),
      E = new Z(),
      _ = new Z(),
      b = new C(),
      U = new Z();
    let R = !1;
    const w = [],
      k = {};
    let S = !1;
    function T(A) {
      return A !== null ? ((2 * Math.PI) / 60) * n.autoRotateSpeed * A : ((2 * Math.PI) / 60 / 60) * n.autoRotateSpeed;
    }
    function O(A) {
      const at = Math.abs(A * 0.01);
      return Math.pow(0.95, n.zoomSpeed * at);
    }
    function J(A) {
      l.theta -= A;
    }
    function lt(A) {
      l.phi -= A;
    }
    const D = (function () {
        const A = new C();
        return function (bt, Mt) {
          A.setFromMatrixColumn(Mt, 0), A.multiplyScalar(-bt), h.add(A);
        };
      })(),
      F = (function () {
        const A = new C();
        return function (bt, Mt) {
          n.screenSpacePanning === !0 ? A.setFromMatrixColumn(Mt, 1) : (A.setFromMatrixColumn(Mt, 0), A.crossVectors(n.object.up, A)),
            A.multiplyScalar(bt),
            h.add(A);
        };
      })(),
      G = (function () {
        const A = new C();
        return function (bt, Mt) {
          const rt = n.domElement;
          if (n.object.isPerspectiveCamera) {
            const L = n.object.position;
            A.copy(L).sub(n.target);
            let ot = A.length();
            (ot *= Math.tan(((n.object.fov / 2) * Math.PI) / 180)),
              D((2 * bt * ot) / rt.clientHeight, n.object.matrix),
              F((2 * Mt * ot) / rt.clientHeight, n.object.matrix);
          } else
            n.object.isOrthographicCamera
              ? (D((bt * (n.object.right - n.object.left)) / n.object.zoom / rt.clientWidth, n.object.matrix),
                F((Mt * (n.object.top - n.object.bottom)) / n.object.zoom / rt.clientHeight, n.object.matrix))
              : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), (n.enablePan = !1));
        };
      })();
    function j(A) {
      n.object.isPerspectiveCamera || n.object.isOrthographicCamera
        ? (c /= A)
        : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (n.enableZoom = !1));
    }
    function Y(A) {
      n.object.isPerspectiveCamera || n.object.isOrthographicCamera
        ? (c *= A)
        : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (n.enableZoom = !1));
    }
    function W(A, at) {
      if (!n.zoomToCursor) return;
      R = !0;
      const bt = n.domElement.getBoundingClientRect(),
        Mt = A - bt.left,
        rt = at - bt.top,
        L = bt.width,
        ot = bt.height;
      (U.x = (Mt / L) * 2 - 1), (U.y = -(rt / ot) * 2 + 1), b.set(U.x, U.y, 1).unproject(n.object).sub(n.object.position).normalize();
    }
    function $(A) {
      return Math.max(n.minDistance, Math.min(n.maxDistance, A));
    }
    function Q(A) {
      u.set(A.clientX, A.clientY);
    }
    function dt(A) {
      W(A.clientX, A.clientX), f.set(A.clientX, A.clientY);
    }
    function V(A) {
      g.set(A.clientX, A.clientY);
    }
    function tt(A) {
      d.set(A.clientX, A.clientY), p.subVectors(d, u).multiplyScalar(n.rotateSpeed);
      const at = n.domElement;
      J((2 * Math.PI * p.x) / at.clientHeight), lt((2 * Math.PI * p.y) / at.clientHeight), u.copy(d), n.update();
    }
    function pt(A) {
      E.set(A.clientX, A.clientY), _.subVectors(E, f), _.y > 0 ? j(O(_.y)) : _.y < 0 && Y(O(_.y)), f.copy(E), n.update();
    }
    function Et(A) {
      v.set(A.clientX, A.clientY), m.subVectors(v, g).multiplyScalar(n.panSpeed), G(m.x, m.y), g.copy(v), n.update();
    }
    function xt(A) {
      W(A.clientX, A.clientY), A.deltaY < 0 ? Y(O(A.deltaY)) : A.deltaY > 0 && j(O(A.deltaY)), n.update();
    }
    function Pt(A) {
      let at = !1;
      switch (A.code) {
        case n.keys.UP:
          A.ctrlKey || A.metaKey || A.shiftKey ? lt((2 * Math.PI * n.rotateSpeed) / n.domElement.clientHeight) : G(0, n.keyPanSpeed), (at = !0);
          break;
        case n.keys.BOTTOM:
          A.ctrlKey || A.metaKey || A.shiftKey ? lt((-2 * Math.PI * n.rotateSpeed) / n.domElement.clientHeight) : G(0, -n.keyPanSpeed), (at = !0);
          break;
        case n.keys.LEFT:
          A.ctrlKey || A.metaKey || A.shiftKey ? J((2 * Math.PI * n.rotateSpeed) / n.domElement.clientHeight) : G(n.keyPanSpeed, 0), (at = !0);
          break;
        case n.keys.RIGHT:
          A.ctrlKey || A.metaKey || A.shiftKey ? J((-2 * Math.PI * n.rotateSpeed) / n.domElement.clientHeight) : G(-n.keyPanSpeed, 0), (at = !0);
          break;
      }
      at && (A.preventDefault(), n.update());
    }
    function It(A) {
      if (w.length === 1) u.set(A.pageX, A.pageY);
      else {
        const at = gt(A),
          bt = 0.5 * (A.pageX + at.x),
          Mt = 0.5 * (A.pageY + at.y);
        u.set(bt, Mt);
      }
    }
    function yt(A) {
      if (w.length === 1) g.set(A.pageX, A.pageY);
      else {
        const at = gt(A),
          bt = 0.5 * (A.pageX + at.x),
          Mt = 0.5 * (A.pageY + at.y);
        g.set(bt, Mt);
      }
    }
    function Ut(A) {
      const at = gt(A),
        bt = A.pageX - at.x,
        Mt = A.pageY - at.y,
        rt = Math.sqrt(bt * bt + Mt * Mt);
      f.set(0, rt);
    }
    function P(A) {
      n.enableZoom && Ut(A), n.enablePan && yt(A);
    }
    function ct(A) {
      n.enableZoom && Ut(A), n.enableRotate && It(A);
    }
    function q(A) {
      if (w.length == 1) d.set(A.pageX, A.pageY);
      else {
        const bt = gt(A),
          Mt = 0.5 * (A.pageX + bt.x),
          rt = 0.5 * (A.pageY + bt.y);
        d.set(Mt, rt);
      }
      p.subVectors(d, u).multiplyScalar(n.rotateSpeed);
      const at = n.domElement;
      J((2 * Math.PI * p.x) / at.clientHeight), lt((2 * Math.PI * p.y) / at.clientHeight), u.copy(d);
    }
    function st(A) {
      if (w.length === 1) v.set(A.pageX, A.pageY);
      else {
        const at = gt(A),
          bt = 0.5 * (A.pageX + at.x),
          Mt = 0.5 * (A.pageY + at.y);
        v.set(bt, Mt);
      }
      m.subVectors(v, g).multiplyScalar(n.panSpeed), G(m.x, m.y), g.copy(v);
    }
    function X(A) {
      const at = gt(A),
        bt = A.pageX - at.x,
        Mt = A.pageY - at.y,
        rt = Math.sqrt(bt * bt + Mt * Mt);
      E.set(0, rt), _.set(0, Math.pow(E.y / f.y, n.zoomSpeed)), j(_.y), f.copy(E);
      const L = (A.pageX + at.x) * 0.5,
        ot = (A.pageY + at.y) * 0.5;
      W(L, ot);
    }
    function Tt(A) {
      n.enableZoom && X(A), n.enablePan && st(A);
    }
    function mt(A) {
      n.enableZoom && X(A), n.enableRotate && q(A);
    }
    function M(A) {
      n.enabled !== !1 &&
        (w.length === 0 &&
          (n.domElement.setPointerCapture(A.pointerId),
          n.domElement.addEventListener("pointermove", x),
          n.domElement.addEventListener("pointerup", I)),
        Vt(A),
        A.pointerType === "touch" ? Bt(A) : it(A));
    }
    function x(A) {
      n.enabled !== !1 && (A.pointerType === "touch" ? nt(A) : et(A));
    }
    function I(A) {
      Nt(A),
        w.length === 0 &&
          (n.domElement.releasePointerCapture(A.pointerId),
          n.domElement.removeEventListener("pointermove", x),
          n.domElement.removeEventListener("pointerup", I)),
        n.dispatchEvent(nl),
        (s = r.NONE);
    }
    function it(A) {
      let at;
      switch (A.button) {
        case 0:
          at = n.mouseButtons.LEFT;
          break;
        case 1:
          at = n.mouseButtons.MIDDLE;
          break;
        case 2:
          at = n.mouseButtons.RIGHT;
          break;
        default:
          at = -1;
      }
      switch (at) {
        case Hn.DOLLY:
          if (n.enableZoom === !1) return;
          dt(A), (s = r.DOLLY);
          break;
        case Hn.ROTATE:
          if (A.ctrlKey || A.metaKey || A.shiftKey) {
            if (n.enablePan === !1) return;
            V(A), (s = r.PAN);
          } else {
            if (n.enableRotate === !1) return;
            Q(A), (s = r.ROTATE);
          }
          break;
        case Hn.PAN:
          if (A.ctrlKey || A.metaKey || A.shiftKey) {
            if (n.enableRotate === !1) return;
            Q(A), (s = r.ROTATE);
          } else {
            if (n.enablePan === !1) return;
            V(A), (s = r.PAN);
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && n.dispatchEvent(Ns);
    }
    function et(A) {
      switch (s) {
        case r.ROTATE:
          if (n.enableRotate === !1) return;
          tt(A);
          break;
        case r.DOLLY:
          if (n.enableZoom === !1) return;
          pt(A);
          break;
        case r.PAN:
          if (n.enablePan === !1) return;
          Et(A);
          break;
      }
    }
    function K(A) {
      n.enabled === !1 || n.enableZoom === !1 || s !== r.NONE || (A.preventDefault(), n.dispatchEvent(Ns), xt(St(A)), n.dispatchEvent(nl));
    }
    function St(A) {
      const at = A.deltaMode,
        bt = { clientX: A.clientX, clientY: A.clientY, deltaY: A.deltaY };
      switch (at) {
        case 1:
          bt.deltaY *= 16;
          break;
        case 2:
          bt.deltaY *= 100;
          break;
      }
      return A.ctrlKey && !S && (bt.deltaY *= 10), bt;
    }
    function ut(A) {
      A.key === "Control" && ((S = !0), document.addEventListener("keyup", _t, { passive: !0, capture: !0 }));
    }
    function _t(A) {
      A.key === "Control" && ((S = !1), document.removeEventListener("keyup", _t, { passive: !0, capture: !0 }));
    }
    function Rt(A) {
      n.enabled === !1 || n.enablePan === !1 || Pt(A);
    }
    function Bt(A) {
      switch ((wt(A), w.length)) {
        case 1:
          switch (n.touches.ONE) {
            case Gn.ROTATE:
              if (n.enableRotate === !1) return;
              It(A), (s = r.TOUCH_ROTATE);
              break;
            case Gn.PAN:
              if (n.enablePan === !1) return;
              yt(A), (s = r.TOUCH_PAN);
              break;
            default:
              s = r.NONE;
          }
          break;
        case 2:
          switch (n.touches.TWO) {
            case Gn.DOLLY_PAN:
              if (n.enableZoom === !1 && n.enablePan === !1) return;
              P(A), (s = r.TOUCH_DOLLY_PAN);
              break;
            case Gn.DOLLY_ROTATE:
              if (n.enableZoom === !1 && n.enableRotate === !1) return;
              ct(A), (s = r.TOUCH_DOLLY_ROTATE);
              break;
            default:
              s = r.NONE;
          }
          break;
        default:
          s = r.NONE;
      }
      s !== r.NONE && n.dispatchEvent(Ns);
    }
    function nt(A) {
      switch ((wt(A), s)) {
        case r.TOUCH_ROTATE:
          if (n.enableRotate === !1) return;
          q(A), n.update();
          break;
        case r.TOUCH_PAN:
          if (n.enablePan === !1) return;
          st(A), n.update();
          break;
        case r.TOUCH_DOLLY_PAN:
          if (n.enableZoom === !1 && n.enablePan === !1) return;
          Tt(A), n.update();
          break;
        case r.TOUCH_DOLLY_ROTATE:
          if (n.enableZoom === !1 && n.enableRotate === !1) return;
          mt(A), n.update();
          break;
        default:
          s = r.NONE;
      }
    }
    function jt(A) {
      n.enabled !== !1 && A.preventDefault();
    }
    function Vt(A) {
      w.push(A.pointerId);
    }
    function Nt(A) {
      delete k[A.pointerId];
      for (let at = 0; at < w.length; at++)
        if (w[at] == A.pointerId) {
          w.splice(at, 1);
          return;
        }
    }
    function wt(A) {
      let at = k[A.pointerId];
      at === void 0 && ((at = new Z()), (k[A.pointerId] = at)), at.set(A.pageX, A.pageY);
    }
    function gt(A) {
      const at = A.pointerId === w[0] ? w[1] : w[0];
      return k[at];
    }
    n.domElement.addEventListener("contextmenu", jt),
      n.domElement.addEventListener("pointerdown", M),
      n.domElement.addEventListener("pointercancel", I),
      n.domElement.addEventListener("wheel", K, { passive: !1 }),
      document.addEventListener("keydown", ut, { passive: !0, capture: !0 }),
      this.update();
  }
}
var Ni = {
    Linear: {
      None: function (i) {
        return i;
      },
    },
    Quadratic: {
      In: function (i) {
        return i * i;
      },
      Out: function (i) {
        return i * (2 - i);
      },
      InOut: function (i) {
        return (i *= 2) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1);
      },
    },
    Cubic: {
      In: function (i) {
        return i * i * i;
      },
      Out: function (i) {
        return --i * i * i + 1;
      },
      InOut: function (i) {
        return (i *= 2) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2);
      },
    },
    Quartic: {
      In: function (i) {
        return i * i * i * i;
      },
      Out: function (i) {
        return 1 - --i * i * i * i;
      },
      InOut: function (i) {
        return (i *= 2) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2);
      },
    },
    Quintic: {
      In: function (i) {
        return i * i * i * i * i;
      },
      Out: function (i) {
        return --i * i * i * i * i + 1;
      },
      InOut: function (i) {
        return (i *= 2) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2);
      },
    },
    Sinusoidal: {
      In: function (i) {
        return 1 - Math.cos((i * Math.PI) / 2);
      },
      Out: function (i) {
        return Math.sin((i * Math.PI) / 2);
      },
      InOut: function (i) {
        return 0.5 * (1 - Math.cos(Math.PI * i));
      },
    },
    Exponential: {
      In: function (i) {
        return i === 0 ? 0 : Math.pow(1024, i - 1);
      },
      Out: function (i) {
        return i === 1 ? 1 : 1 - Math.pow(2, -10 * i);
      },
      InOut: function (i) {
        return i === 0 ? 0 : i === 1 ? 1 : (i *= 2) < 1 ? 0.5 * Math.pow(1024, i - 1) : 0.5 * (-Math.pow(2, -10 * (i - 1)) + 2);
      },
    },
    Circular: {
      In: function (i) {
        return 1 - Math.sqrt(1 - i * i);
      },
      Out: function (i) {
        return Math.sqrt(1 - --i * i);
      },
      InOut: function (i) {
        return (i *= 2) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1);
      },
    },
    Elastic: {
      In: function (i) {
        return i === 0 ? 0 : i === 1 ? 1 : -Math.pow(2, 10 * (i - 1)) * Math.sin((i - 1.1) * 5 * Math.PI);
      },
      Out: function (i) {
        return i === 0 ? 0 : i === 1 ? 1 : Math.pow(2, -10 * i) * Math.sin((i - 0.1) * 5 * Math.PI) + 1;
      },
      InOut: function (i) {
        return i === 0
          ? 0
          : i === 1
          ? 1
          : ((i *= 2),
            i < 1
              ? -0.5 * Math.pow(2, 10 * (i - 1)) * Math.sin((i - 1.1) * 5 * Math.PI)
              : 0.5 * Math.pow(2, -10 * (i - 1)) * Math.sin((i - 1.1) * 5 * Math.PI) + 1);
      },
    },
    Back: {
      In: function (i) {
        var t = 1.70158;
        return i * i * ((t + 1) * i - t);
      },
      Out: function (i) {
        var t = 1.70158;
        return --i * i * ((t + 1) * i + t) + 1;
      },
      InOut: function (i) {
        var t = 2.5949095;
        return (i *= 2) < 1 ? 0.5 * (i * i * ((t + 1) * i - t)) : 0.5 * ((i -= 2) * i * ((t + 1) * i + t) + 2);
      },
    },
    Bounce: {
      In: function (i) {
        return 1 - Ni.Bounce.Out(1 - i);
      },
      Out: function (i) {
        return i < 1 / 2.75
          ? 7.5625 * i * i
          : i < 2 / 2.75
          ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75
          : i < 2.5 / 2.75
          ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375
          : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
      },
      InOut: function (i) {
        return i < 0.5 ? Ni.Bounce.In(i * 2) * 0.5 : Ni.Bounce.Out(i * 2 - 1) * 0.5 + 0.5;
      },
    },
  },
  Ci;
typeof self == "undefined" && typeof process != "undefined" && process.hrtime
  ? (Ci = function () {
      var i = process.hrtime();
      return i[0] * 1e3 + i[1] / 1e6;
    })
  : typeof self != "undefined" && self.performance !== void 0 && self.performance.now !== void 0
  ? (Ci = self.performance.now.bind(self.performance))
  : Date.now !== void 0
  ? (Ci = Date.now)
  : (Ci = function () {
      return new Date().getTime();
    });
var In = Ci,
  Yl = (function () {
    function i() {
      (this._tweens = {}), (this._tweensAddedDuringUpdate = {});
    }
    return (
      (i.prototype.getAll = function () {
        var t = this;
        return Object.keys(this._tweens).map(function (e) {
          return t._tweens[e];
        });
      }),
      (i.prototype.removeAll = function () {
        this._tweens = {};
      }),
      (i.prototype.add = function (t) {
        (this._tweens[t.getId()] = t), (this._tweensAddedDuringUpdate[t.getId()] = t);
      }),
      (i.prototype.remove = function (t) {
        delete this._tweens[t.getId()], delete this._tweensAddedDuringUpdate[t.getId()];
      }),
      (i.prototype.update = function (t, e) {
        t === void 0 && (t = In()), e === void 0 && (e = !1);
        var n = Object.keys(this._tweens);
        if (n.length === 0) return !1;
        for (; n.length > 0; ) {
          this._tweensAddedDuringUpdate = {};
          for (var r = 0; r < n.length; r++) {
            var s = this._tweens[n[r]],
              o = !e;
            s && s.update(t, o) === !1 && !e && delete this._tweens[n[r]];
          }
          n = Object.keys(this._tweensAddedDuringUpdate);
        }
        return !0;
      }),
      i
    );
  })(),
  ui = {
    Linear: function (i, t) {
      var e = i.length - 1,
        n = e * t,
        r = Math.floor(n),
        s = ui.Utils.Linear;
      return t < 0 ? s(i[0], i[1], n) : t > 1 ? s(i[e], i[e - 1], e - n) : s(i[r], i[r + 1 > e ? e : r + 1], n - r);
    },
    Bezier: function (i, t) {
      for (var e = 0, n = i.length - 1, r = Math.pow, s = ui.Utils.Bernstein, o = 0; o <= n; o++) e += r(1 - t, n - o) * r(t, o) * i[o] * s(n, o);
      return e;
    },
    CatmullRom: function (i, t) {
      var e = i.length - 1,
        n = e * t,
        r = Math.floor(n),
        s = ui.Utils.CatmullRom;
      return i[0] === i[e]
        ? (t < 0 && (r = Math.floor((n = e * (1 + t)))), s(i[(r - 1 + e) % e], i[r], i[(r + 1) % e], i[(r + 2) % e], n - r))
        : t < 0
        ? i[0] - (s(i[0], i[0], i[1], i[1], -n) - i[0])
        : t > 1
        ? i[e] - (s(i[e], i[e], i[e - 1], i[e - 1], n - e) - i[e])
        : s(i[r ? r - 1 : 0], i[r], i[e < r + 1 ? e : r + 1], i[e < r + 2 ? e : r + 2], n - r);
    },
    Utils: {
      Linear: function (i, t, e) {
        return (t - i) * e + i;
      },
      Bernstein: function (i, t) {
        var e = ui.Utils.Factorial;
        return e(i) / e(t) / e(i - t);
      },
      Factorial: (function () {
        var i = [1];
        return function (t) {
          var e = 1;
          if (i[t]) return i[t];
          for (var n = t; n > 1; n--) e *= n;
          return (i[t] = e), e;
        };
      })(),
      CatmullRom: function (i, t, e, n, r) {
        var s = (e - i) * 0.5,
          o = (n - t) * 0.5,
          a = r * r,
          l = r * a;
        return (2 * t - 2 * e + s + o) * l + (-3 * t + 3 * e - 2 * s - o) * a + s * r + t;
      },
    },
  },
  ha = (function () {
    function i() {}
    return (
      (i.nextId = function () {
        return i._nextId++;
      }),
      (i._nextId = 0),
      i
    );
  })(),
  jl = new Yl(),
  mg = (function () {
    function i(t, e) {
      e === void 0 && (e = jl),
        (this._object = t),
        (this._group = e),
        (this._isPaused = !1),
        (this._pauseStart = 0),
        (this._valuesStart = {}),
        (this._valuesEnd = {}),
        (this._valuesStartRepeat = {}),
        (this._duration = 1e3),
        (this._initialRepeat = 0),
        (this._repeat = 0),
        (this._yoyo = !1),
        (this._isPlaying = !1),
        (this._reversed = !1),
        (this._delayTime = 0),
        (this._startTime = 0),
        (this._easingFunction = Ni.Linear.None),
        (this._interpolationFunction = ui.Linear),
        (this._chainedTweens = []),
        (this._onStartCallbackFired = !1),
        (this._id = ha.nextId()),
        (this._isChainStopped = !1),
        (this._goToEnd = !1);
    }
    return (
      (i.prototype.getId = function () {
        return this._id;
      }),
      (i.prototype.isPlaying = function () {
        return this._isPlaying;
      }),
      (i.prototype.isPaused = function () {
        return this._isPaused;
      }),
      (i.prototype.to = function (t, e) {
        return (this._valuesEnd = Object.create(t)), e !== void 0 && (this._duration = e), this;
      }),
      (i.prototype.duration = function (t) {
        return (this._duration = t), this;
      }),
      (i.prototype.start = function (t) {
        if (this._isPlaying) return this;
        if ((this._group && this._group.add(this), (this._repeat = this._initialRepeat), this._reversed)) {
          this._reversed = !1;
          for (var e in this._valuesStartRepeat) this._swapEndStartRepeatValues(e), (this._valuesStart[e] = this._valuesStartRepeat[e]);
        }
        return (
          (this._isPlaying = !0),
          (this._isPaused = !1),
          (this._onStartCallbackFired = !1),
          (this._isChainStopped = !1),
          (this._startTime = t !== void 0 ? (typeof t == "string" ? In() + parseFloat(t) : t) : In()),
          (this._startTime += this._delayTime),
          this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat),
          this
        );
      }),
      (i.prototype._setupProperties = function (t, e, n, r) {
        for (var s in n) {
          var o = t[s],
            a = Array.isArray(o),
            l = a ? "array" : typeof o,
            c = !a && Array.isArray(n[s]);
          if (!(l === "undefined" || l === "function")) {
            if (c) {
              var h = n[s];
              if (h.length === 0) continue;
              (h = h.map(this._handleRelativeValue.bind(this, o))), (n[s] = [o].concat(h));
            }
            if ((l === "object" || a) && o && !c) {
              e[s] = a ? [] : {};
              for (var u in o) e[s][u] = o[u];
              (r[s] = a ? [] : {}), this._setupProperties(o, e[s], n[s], r[s]);
            } else typeof e[s] == "undefined" && (e[s] = o), a || (e[s] *= 1), c ? (r[s] = n[s].slice().reverse()) : (r[s] = e[s] || 0);
          }
        }
      }),
      (i.prototype.stop = function () {
        return (
          this._isChainStopped || ((this._isChainStopped = !0), this.stopChainedTweens()),
          this._isPlaying
            ? (this._group && this._group.remove(this),
              (this._isPlaying = !1),
              (this._isPaused = !1),
              this._onStopCallback && this._onStopCallback(this._object),
              this)
            : this
        );
      }),
      (i.prototype.end = function () {
        return (this._goToEnd = !0), this.update(1 / 0), this;
      }),
      (i.prototype.pause = function (t) {
        return (
          t === void 0 && (t = In()),
          this._isPaused || !this._isPlaying ? this : ((this._isPaused = !0), (this._pauseStart = t), this._group && this._group.remove(this), this)
        );
      }),
      (i.prototype.resume = function (t) {
        return (
          t === void 0 && (t = In()),
          !this._isPaused || !this._isPlaying
            ? this
            : ((this._isPaused = !1), (this._startTime += t - this._pauseStart), (this._pauseStart = 0), this._group && this._group.add(this), this)
        );
      }),
      (i.prototype.stopChainedTweens = function () {
        for (var t = 0, e = this._chainedTweens.length; t < e; t++) this._chainedTweens[t].stop();
        return this;
      }),
      (i.prototype.group = function (t) {
        return (this._group = t), this;
      }),
      (i.prototype.delay = function (t) {
        return (this._delayTime = t), this;
      }),
      (i.prototype.repeat = function (t) {
        return (this._initialRepeat = t), (this._repeat = t), this;
      }),
      (i.prototype.repeatDelay = function (t) {
        return (this._repeatDelayTime = t), this;
      }),
      (i.prototype.yoyo = function (t) {
        return (this._yoyo = t), this;
      }),
      (i.prototype.easing = function (t) {
        return (this._easingFunction = t), this;
      }),
      (i.prototype.interpolation = function (t) {
        return (this._interpolationFunction = t), this;
      }),
      (i.prototype.chain = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return (this._chainedTweens = t), this;
      }),
      (i.prototype.onStart = function (t) {
        return (this._onStartCallback = t), this;
      }),
      (i.prototype.onUpdate = function (t) {
        return (this._onUpdateCallback = t), this;
      }),
      (i.prototype.onRepeat = function (t) {
        return (this._onRepeatCallback = t), this;
      }),
      (i.prototype.onComplete = function (t) {
        return (this._onCompleteCallback = t), this;
      }),
      (i.prototype.onStop = function (t) {
        return (this._onStopCallback = t), this;
      }),
      (i.prototype.update = function (t, e) {
        if ((t === void 0 && (t = In()), e === void 0 && (e = !0), this._isPaused)) return !0;
        var n,
          r,
          s = this._startTime + this._duration;
        if (!this._goToEnd && !this._isPlaying) {
          if (t > s) return !1;
          e && this.start(t);
        }
        if (((this._goToEnd = !1), t < this._startTime)) return !0;
        this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), (this._onStartCallbackFired = !0)),
          (r = (t - this._startTime) / this._duration),
          (r = this._duration === 0 || r > 1 ? 1 : r);
        var o = this._easingFunction(r);
        if (
          (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, o),
          this._onUpdateCallback && this._onUpdateCallback(this._object, r),
          r === 1)
        )
          if (this._repeat > 0) {
            isFinite(this._repeat) && this._repeat--;
            for (n in this._valuesStartRepeat)
              !this._yoyo &&
                typeof this._valuesEnd[n] == "string" &&
                (this._valuesStartRepeat[n] = this._valuesStartRepeat[n] + parseFloat(this._valuesEnd[n])),
                this._yoyo && this._swapEndStartRepeatValues(n),
                (this._valuesStart[n] = this._valuesStartRepeat[n]);
            return (
              this._yoyo && (this._reversed = !this._reversed),
              this._repeatDelayTime !== void 0 ? (this._startTime = t + this._repeatDelayTime) : (this._startTime = t + this._delayTime),
              this._onRepeatCallback && this._onRepeatCallback(this._object),
              !0
            );
          } else {
            this._onCompleteCallback && this._onCompleteCallback(this._object);
            for (var a = 0, l = this._chainedTweens.length; a < l; a++) this._chainedTweens[a].start(this._startTime + this._duration);
            return (this._isPlaying = !1), !1;
          }
        return !0;
      }),
      (i.prototype._updateProperties = function (t, e, n, r) {
        for (var s in n)
          if (e[s] !== void 0) {
            var o = e[s] || 0,
              a = n[s],
              l = Array.isArray(t[s]),
              c = Array.isArray(a),
              h = !l && c;
            h
              ? (t[s] = this._interpolationFunction(a, r))
              : typeof a == "object" && a
              ? this._updateProperties(t[s], o, a, r)
              : ((a = this._handleRelativeValue(o, a)), typeof a == "number" && (t[s] = o + (a - o) * r));
          }
      }),
      (i.prototype._handleRelativeValue = function (t, e) {
        return typeof e != "string" ? e : e.charAt(0) === "+" || e.charAt(0) === "-" ? t + parseFloat(e) : parseFloat(e);
      }),
      (i.prototype._swapEndStartRepeatValues = function (t) {
        var e = this._valuesStartRepeat[t],
          n = this._valuesEnd[t];
        typeof n == "string"
          ? (this._valuesStartRepeat[t] = this._valuesStartRepeat[t] + parseFloat(n))
          : (this._valuesStartRepeat[t] = this._valuesEnd[t]),
          (this._valuesEnd[t] = e);
      }),
      i
    );
  })(),
  gg = "18.6.4",
  _g = ha.nextId,
  Ye = jl,
  vg = Ye.getAll.bind(Ye),
  xg = Ye.removeAll.bind(Ye),
  Mg = Ye.add.bind(Ye),
  Sg = Ye.remove.bind(Ye),
  yg = Ye.update.bind(Ye),
  jg = {
    Easing: Ni,
    Group: Yl,
    Interpolation: ui,
    now: In,
    Sequence: ha,
    nextId: _g,
    Tween: mg,
    VERSION: gg,
    getAll: vg,
    removeAll: xg,
    add: Mg,
    remove: Sg,
    update: yg,
  };
const Zl = {
  name: "CopyShader",
  uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`,
};
class Yi {
  constructor() {
    (this.isPass = !0), (this.enabled = !0), (this.needsSwap = !0), (this.clear = !1), (this.renderToScreen = !1);
  }
  setSize() {}
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {}
}
const Eg = new sa(-1, 1, 1, -1, 0, 1);
class Tg extends Ce {
  constructor() {
    super(), this.setAttribute("position", new Me([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Me([0, 2, 0, 0, 2, 0], 2));
  }
}
const bg = new Tg();
class Kl {
  constructor(t) {
    this._mesh = new on(bg, t);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(t) {
    t.render(this._mesh, Eg);
  }
  get material() {
    return this._mesh.material;
  }
  set material(t) {
    this._mesh.material = t;
  }
}
class Ag extends Yi {
  constructor(t, e) {
    super(),
      (this.textureID = e !== void 0 ? e : "tDiffuse"),
      t instanceof Re
        ? ((this.uniforms = t.uniforms), (this.material = t))
        : t &&
          ((this.uniforms = Br.clone(t.uniforms)),
          (this.material = new Re({
            name: t.name !== void 0 ? t.name : "unspecified",
            defines: Object.assign({}, t.defines),
            uniforms: this.uniforms,
            vertexShader: t.vertexShader,
            fragmentShader: t.fragmentShader,
          }))),
      (this.fsQuad = new Kl(this.material));
  }
  render(t, e, n) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture),
      (this.fsQuad.material = this.material),
      this.renderToScreen
        ? (t.setRenderTarget(null), this.fsQuad.render(t))
        : (t.setRenderTarget(e), this.clear && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), this.fsQuad.render(t));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
class rl extends Yi {
  constructor(t, e) {
    super(), (this.scene = t), (this.camera = e), (this.clear = !0), (this.needsSwap = !1), (this.inverse = !1);
  }
  render(t, e, n) {
    const r = t.getContext(),
      s = t.state;
    s.buffers.color.setMask(!1), s.buffers.depth.setMask(!1), s.buffers.color.setLocked(!0), s.buffers.depth.setLocked(!0);
    let o, a;
    this.inverse ? ((o = 0), (a = 1)) : ((o = 1), (a = 0)),
      s.buffers.stencil.setTest(!0),
      s.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE),
      s.buffers.stencil.setFunc(r.ALWAYS, o, 4294967295),
      s.buffers.stencil.setClear(a),
      s.buffers.stencil.setLocked(!0),
      t.setRenderTarget(n),
      this.clear && t.clear(),
      t.render(this.scene, this.camera),
      t.setRenderTarget(e),
      this.clear && t.clear(),
      t.render(this.scene, this.camera),
      s.buffers.color.setLocked(!1),
      s.buffers.depth.setLocked(!1),
      s.buffers.color.setMask(!0),
      s.buffers.depth.setMask(!0),
      s.buffers.stencil.setLocked(!1),
      s.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295),
      s.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP),
      s.buffers.stencil.setLocked(!0);
  }
}
class wg extends Yi {
  constructor() {
    super(), (this.needsSwap = !1);
  }
  render(t) {
    t.state.buffers.stencil.setLocked(!1), t.state.buffers.stencil.setTest(!1);
  }
}
class Zg {
  constructor(t, e) {
    if (((this.renderer = t), (this._pixelRatio = t.getPixelRatio()), e === void 0)) {
      const n = t.getSize(new Z());
      (this._width = n.width),
        (this._height = n.height),
        (e = new Ge(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: cn })),
        (e.texture.name = "EffectComposer.rt1");
    } else (this._width = e.width), (this._height = e.height);
    (this.renderTarget1 = e),
      (this.renderTarget2 = e.clone()),
      (this.renderTarget2.texture.name = "EffectComposer.rt2"),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2),
      (this.renderToScreen = !0),
      (this.passes = []),
      (this.copyPass = new Ag(Zl)),
      (this.copyPass.material.blending = ln),
      (this.clock = new ql());
  }
  swapBuffers() {
    const t = this.readBuffer;
    (this.readBuffer = this.writeBuffer), (this.writeBuffer = t);
  }
  addPass(t) {
    this.passes.push(t), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(t, e) {
    this.passes.splice(e, 0, t), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(t) {
    const e = this.passes.indexOf(t);
    e !== -1 && this.passes.splice(e, 1);
  }
  isLastEnabledPass(t) {
    for (let e = t + 1; e < this.passes.length; e++) if (this.passes[e].enabled) return !1;
    return !0;
  }
  render(t) {
    t === void 0 && (t = this.clock.getDelta());
    const e = this.renderer.getRenderTarget();
    let n = !1;
    for (let r = 0, s = this.passes.length; r < s; r++) {
      const o = this.passes[r];
      if (o.enabled !== !1) {
        if (
          ((o.renderToScreen = this.renderToScreen && this.isLastEnabledPass(r)),
          o.render(this.renderer, this.writeBuffer, this.readBuffer, t, n),
          o.needsSwap)
        ) {
          if (n) {
            const a = this.renderer.getContext(),
              l = this.renderer.state.buffers.stencil;
            l.setFunc(a.NOTEQUAL, 1, 4294967295),
              this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, t),
              l.setFunc(a.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        rl !== void 0 && (o instanceof rl ? (n = !0) : o instanceof wg && (n = !1));
      }
    }
    this.renderer.setRenderTarget(e);
  }
  reset(t) {
    if (t === void 0) {
      const e = this.renderer.getSize(new Z());
      (this._pixelRatio = this.renderer.getPixelRatio()),
        (this._width = e.width),
        (this._height = e.height),
        (t = this.renderTarget1.clone()),
        t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      (this.renderTarget1 = t),
      (this.renderTarget2 = t.clone()),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2);
  }
  setSize(t, e) {
    (this._width = t), (this._height = e);
    const n = this._width * this._pixelRatio,
      r = this._height * this._pixelRatio;
    this.renderTarget1.setSize(n, r), this.renderTarget2.setSize(n, r);
    for (let s = 0; s < this.passes.length; s++) this.passes[s].setSize(n, r);
  }
  setPixelRatio(t) {
    (this._pixelRatio = t), this.setSize(this._width, this._height);
  }
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
class Kg extends Yi {
  constructor(t, e, n = null, r = null, s = null) {
    super(),
      (this.scene = t),
      (this.camera = e),
      (this.overrideMaterial = n),
      (this.clearColor = r),
      (this.clearAlpha = s),
      (this.clear = !0),
      (this.clearDepth = !1),
      (this.needsSwap = !1),
      (this._oldClearColor = new Ft());
  }
  render(t, e, n) {
    const r = t.autoClear;
    t.autoClear = !1;
    let s, o;
    this.overrideMaterial !== null && ((o = this.scene.overrideMaterial), (this.scene.overrideMaterial = this.overrideMaterial)),
      this.clearColor !== null && (t.getClearColor(this._oldClearColor), t.setClearColor(this.clearColor)),
      this.clearAlpha !== null && ((s = t.getClearAlpha()), t.setClearAlpha(this.clearAlpha)),
      this.clearDepth == !0 && t.clearDepth(),
      t.setRenderTarget(this.renderToScreen ? null : n),
      this.clear === !0 && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
      t.render(this.scene, this.camera),
      this.clearColor !== null && t.setClearColor(this._oldClearColor),
      this.clearAlpha !== null && t.setClearAlpha(s),
      this.overrideMaterial !== null && (this.scene.overrideMaterial = o),
      (t.autoClear = r);
  }
}
const Rg = {
  name: "LuminosityHighPassShader",
  shaderID: "luminosityHighPass",
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new Ft(0) },
    defaultOpacity: { value: 0 },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`,
};
class Vi extends Yi {
  constructor(t, e, n, r) {
    super(),
      (this.strength = e !== void 0 ? e : 1),
      (this.radius = n),
      (this.threshold = r),
      (this.resolution = t !== void 0 ? new Z(t.x, t.y) : new Z(256, 256)),
      (this.clearColor = new Ft(0, 0, 0)),
      (this.renderTargetsHorizontal = []),
      (this.renderTargetsVertical = []),
      (this.nMips = 5);
    let s = Math.round(this.resolution.x / 2),
      o = Math.round(this.resolution.y / 2);
    (this.renderTargetBright = new Ge(s, o, { type: cn })),
      (this.renderTargetBright.texture.name = "UnrealBloomPass.bright"),
      (this.renderTargetBright.texture.generateMipmaps = !1);
    for (let u = 0; u < this.nMips; u++) {
      const d = new Ge(s, o, { type: cn });
      (d.texture.name = "UnrealBloomPass.h" + u), (d.texture.generateMipmaps = !1), this.renderTargetsHorizontal.push(d);
      const p = new Ge(s, o, { type: cn });
      (p.texture.name = "UnrealBloomPass.v" + u),
        (p.texture.generateMipmaps = !1),
        this.renderTargetsVertical.push(p),
        (s = Math.round(s / 2)),
        (o = Math.round(o / 2));
    }
    const a = Rg;
    (this.highPassUniforms = Br.clone(a.uniforms)),
      (this.highPassUniforms.luminosityThreshold.value = r),
      (this.highPassUniforms.smoothWidth.value = 0.01),
      (this.materialHighPassFilter = new Re({ uniforms: this.highPassUniforms, vertexShader: a.vertexShader, fragmentShader: a.fragmentShader })),
      (this.separableBlurMaterials = []);
    const l = [3, 5, 7, 9, 11];
    (s = Math.round(this.resolution.x / 2)), (o = Math.round(this.resolution.y / 2));
    for (let u = 0; u < this.nMips; u++)
      this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),
        (this.separableBlurMaterials[u].uniforms.invSize.value = new Z(1 / s, 1 / o)),
        (s = Math.round(s / 2)),
        (o = Math.round(o / 2));
    (this.compositeMaterial = this.getCompositeMaterial(this.nMips)),
      (this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture),
      (this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture),
      (this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture),
      (this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture),
      (this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture),
      (this.compositeMaterial.uniforms.bloomStrength.value = e),
      (this.compositeMaterial.uniforms.bloomRadius.value = 0.1);
    const c = [1, 0.8, 0.6, 0.4, 0.2];
    (this.compositeMaterial.uniforms.bloomFactors.value = c),
      (this.bloomTintColors = [new C(1, 1, 1), new C(1, 1, 1), new C(1, 1, 1), new C(1, 1, 1), new C(1, 1, 1)]),
      (this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors);
    const h = Zl;
    (this.copyUniforms = Br.clone(h.uniforms)),
      (this.blendMaterial = new Re({
        uniforms: this.copyUniforms,
        vertexShader: h.vertexShader,
        fragmentShader: h.fragmentShader,
        blending: Os,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0,
      })),
      (this.enabled = !0),
      (this.needsSwap = !1),
      (this._oldClearColor = new Ft()),
      (this.oldClearAlpha = 1),
      (this.basic = new na()),
      (this.fsQuad = new Kl(null));
  }
  dispose() {
    for (let t = 0; t < this.renderTargetsHorizontal.length; t++) this.renderTargetsHorizontal[t].dispose();
    for (let t = 0; t < this.renderTargetsVertical.length; t++) this.renderTargetsVertical[t].dispose();
    this.renderTargetBright.dispose();
    for (let t = 0; t < this.separableBlurMaterials.length; t++) this.separableBlurMaterials[t].dispose();
    this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this.basic.dispose(), this.fsQuad.dispose();
  }
  setSize(t, e) {
    let n = Math.round(t / 2),
      r = Math.round(e / 2);
    this.renderTargetBright.setSize(n, r);
    for (let s = 0; s < this.nMips; s++)
      this.renderTargetsHorizontal[s].setSize(n, r),
        this.renderTargetsVertical[s].setSize(n, r),
        (this.separableBlurMaterials[s].uniforms.invSize.value = new Z(1 / n, 1 / r)),
        (n = Math.round(n / 2)),
        (r = Math.round(r / 2));
  }
  render(t, e, n, r, s) {
    t.getClearColor(this._oldClearColor), (this.oldClearAlpha = t.getClearAlpha());
    const o = t.autoClear;
    (t.autoClear = !1),
      t.setClearColor(this.clearColor, 0),
      s && t.state.buffers.stencil.setTest(!1),
      this.renderToScreen &&
        ((this.fsQuad.material = this.basic), (this.basic.map = n.texture), t.setRenderTarget(null), t.clear(), this.fsQuad.render(t)),
      (this.highPassUniforms.tDiffuse.value = n.texture),
      (this.highPassUniforms.luminosityThreshold.value = this.threshold),
      (this.fsQuad.material = this.materialHighPassFilter),
      t.setRenderTarget(this.renderTargetBright),
      t.clear(),
      this.fsQuad.render(t);
    let a = this.renderTargetBright;
    for (let l = 0; l < this.nMips; l++)
      (this.fsQuad.material = this.separableBlurMaterials[l]),
        (this.separableBlurMaterials[l].uniforms.colorTexture.value = a.texture),
        (this.separableBlurMaterials[l].uniforms.direction.value = Vi.BlurDirectionX),
        t.setRenderTarget(this.renderTargetsHorizontal[l]),
        t.clear(),
        this.fsQuad.render(t),
        (this.separableBlurMaterials[l].uniforms.colorTexture.value = this.renderTargetsHorizontal[l].texture),
        (this.separableBlurMaterials[l].uniforms.direction.value = Vi.BlurDirectionY),
        t.setRenderTarget(this.renderTargetsVertical[l]),
        t.clear(),
        this.fsQuad.render(t),
        (a = this.renderTargetsVertical[l]);
    (this.fsQuad.material = this.compositeMaterial),
      (this.compositeMaterial.uniforms.bloomStrength.value = this.strength),
      (this.compositeMaterial.uniforms.bloomRadius.value = this.radius),
      (this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors),
      t.setRenderTarget(this.renderTargetsHorizontal[0]),
      t.clear(),
      this.fsQuad.render(t),
      (this.fsQuad.material = this.blendMaterial),
      (this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture),
      s && t.state.buffers.stencil.setTest(!0),
      this.renderToScreen ? (t.setRenderTarget(null), this.fsQuad.render(t)) : (t.setRenderTarget(n), this.fsQuad.render(t)),
      t.setClearColor(this._oldClearColor, this.oldClearAlpha),
      (t.autoClear = o);
  }
  getSeperableBlurMaterial(t) {
    const e = [];
    for (let n = 0; n < t; n++) e.push((0.39894 * Math.exp((-0.5 * n * n) / (t * t))) / t);
    return new Re({
      defines: { KERNEL_RADIUS: t },
      uniforms: {
        colorTexture: { value: null },
        invSize: { value: new Z(0.5, 0.5) },
        direction: { value: new Z(0.5, 0.5) },
        gaussianCoefficients: { value: e },
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`,
    });
  }
  getCompositeMaterial(t) {
    return new Re({
      defines: { NUM_MIPS: t },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 },
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`,
    });
  }
}
Vi.BlurDirectionX = new Z(1, 0);
Vi.BlurDirectionY = new Z(0, 1);
export {
  kl as $,
  Gg as A,
  Ce as B,
  Ft as C,
  Hg as D,
  Vl as E,
  cg as F,
  vr as G,
  ql as H,
  na as I,
  ra as J,
  Tm as K,
  qi as L,
  Fg as M,
  Lg as N,
  Yg as O,
  Ie as P,
  sn as Q,
  He as R,
  qg as S,
  Bg as T,
  Vi as U,
  Z as V,
  Sm as W,
  Vc as X,
  Hc as Y,
  Dg as Z,
  Ng as _,
  Pg as a,
  zg as a0,
  Lr as a1,
  Ge as b,
  De as c,
  Zg as d,
  Ve as e,
  wm as f,
  Ig as g,
  Og as h,
  on as i,
  Kg as j,
  Ag as k,
  Ee as l,
  jg as m,
  C as n,
  Me as o,
  bm as p,
  je as q,
  Ug as r,
  kg as s,
  Wg as t,
  Vg as u,
  Xg as v,
  Xl as w,
  Re as x,
  Os as y,
  Cg as z,
};
