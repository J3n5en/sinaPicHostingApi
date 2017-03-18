var sinaSSOEncoder = sinaSSOEncoder || {};
(function() {
  var i = 0;
  var g = 8;
  this.hex_sha1 = function(j) {
    return h(b(f(j), j.length * g))
  };
  var b = function(A, r) {
    A[r >> 5] |= 128 << (24 - r % 32);
    A[((r + 64 >> 9) << 4) + 15] = r;
    var B = Array(80);
    var z = 1732584193;
    var y = -271733879;
    var v = -1732584194;
    var u = 271733878;
    var s = -1009589776;
    for (var o = 0; o < A.length; o += 16) {
      var q = z;
      var p = y;
      var n = v;
      var m = u;
      var k = s;
      for (var l = 0; l < 80; l++) {
        if (l < 16) {
          B[l] = A[o + l]
        } else {
          B[l] = d(B[l - 3] ^ B[l - 8] ^ B[l - 14] ^ B[l - 16], 1)
        }
        var C = e(e(d(z, 5), a(l, y, v, u)), e(e(s, B[l]), c(l)));
        s = u;
        u = v;
        v = d(y, 30);
        y = z;
        z = C
      }
      z = e(z, q);
      y = e(y, p);
      v = e(v, n);
      u = e(u, m);
      s = e(s, k)
    }
    return Array(z, y, v, u, s)
  };
  var a = function(k, j, m, l) {
    if (k < 20) {
      return (j & m) | ((~j) & l)
    }
    if (k < 40) {
      return j ^ m ^ l
    }
    if (k < 60) {
      return (j & m) | (j & l) | (m & l)
    }
    return j ^ m ^ l
  };
  var c = function(j) {
    return (j < 20) ? 1518500249 : (j < 40) ? 1859775393 : (j < 60) ? -1894007588 : -899497514
  };
  var e = function(j, m) {
    var l = (j & 65535) + (m & 65535);
    var k = (j >> 16) + (m >> 16) + (l >> 16);
    return (k << 16) | (l & 65535)
  };
  var d = function(j, k) {
    return (j << k) | (j >>> (32 - k))
  };
  var f = function(m) {
    var l = Array();
    var j = (1 << g) - 1;
    for (var k = 0; k < m.length * g; k += g) {
      l[k >> 5] |= (m.charCodeAt(k / g) & j) << (24 - k % 32)
    }
    return l
  };
  var h = function(l) {
    var k = i ? "0123456789ABCDEF" : "0123456789abcdef";
    var m = "";
    for (var j = 0; j < l.length * 4; j++) {
      m += k.charAt((l[j >> 2] >> ((3 - j % 4) * 8 + 4)) & 15) + k.charAt((l[j >> 2] >> ((3 - j % 4) * 8)) & 15)
    }
    return m
  };
  this.base64 = {
    encode: function(l) {
      l = "" + l;
      if (l == "") {
        return ""
      }
      var j = "";
      var s, q, o = "";
      var r, p, n, m = "";
      var k = 0;
      do {
        s = l.charCodeAt(k++);
        q = l.charCodeAt(k++);
        o = l.charCodeAt(k++);
        r = s >> 2;
        p = ((s & 3) << 4) | (q >> 4);
        n = ((q & 15) << 2) | (o >> 6);
        m = o & 63;
        if (isNaN(q)) {
          n = m = 64
        } else {
          if (isNaN(o)) {
            m = 64
          }
        }
        j = j + this._keys.charAt(r) + this._keys.charAt(p) + this._keys.charAt(n) + this._keys.charAt(m);
        s = q = o = "";
        r = p = n = m = ""
      } while (k < l.length);
      return j
    },
    decode: function(s, p, l) {
      var r = function(j, C) {
        for (var B = 0; B < j.length; B++) {
          if (j[B] === C) {
            return B
          }
        }
        return -1
      };
      if (typeof(s) == "string") {
        s = s.split("")
      }
      var m = [];
      var A, y, v = "";
      var z, x, u, t = "";
      if (s.length % 4 != 0) {}
      var k = /[^A-Za-z0-9\+\/\=]/g;
      var w = this._keys.split("");
      if (p == "urlsafe") {
        k = /[^A-Za-z0-9\-_\=]/g;
        w = this._keys_urlsafe.split("")
      }
      var o = 0;
      if (p == "binnary") {
        w = [];
        for (o = 0; o <= 64; o++) {
          w[o] = o + 128
        }
      }
      if (p != "binnary" && k.exec(s.join(""))) {
        return l == "array" ? [] : ""
      }
      o = 0;
      do {
        z = r(w, s[o++]);
        x = r(w, s[o++]);
        u = r(w, s[o++]);
        t = r(w, s[o++]);
        A = (z << 2) | (x >> 4);
        y = ((x & 15) << 4) | (u >> 2);
        v = ((u & 3) << 6) | t;
        m.push(A);
        if (u != 64 && u != -1) {
          m.push(y)
        }
        if (t != 64 && t != -1) {
          m.push(v)
        }
        A = y = v = "";
        z = x = u = t = ""
      } while (o < s.length);
      if (l == "array") {
        return m
      }
      var q = "",
        n = 0;
      for (; n < m.lenth; n++) {
        q += String.fromCharCode(m[n])
      }
      return q
    },
    _keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    _keys_urlsafe: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="
  };
  this.Cookie = {
    decode: function(n) {
      var p = function(q) {
        var r = "",
          s = 0;
        for (; s < q.length; s++) {
          r += "%" + l(q[s])
        }
        return decodeURIComponent(r)
      };
      var l = function(q) {
        var r = "0" + q.toString(16);
        return r.length <= 2 ? r : r.substr(1)
      };
      var m = [];
      var k = n.substr(0, 3);
      var j = n.substr(3);
      switch (k) {
        case "v01":
          for (var o = 0; o < j.length; o += 2) {
            m.push(parseInt(j.substr(o, 2), 16))
          }
          return decodeURIComponent(p(sinaSSOEncoder.base64.decode(m, "binnary", "array")));
          break;
        case "v02":
          m = sinaSSOEncoder.base64.decode(j, "urlsafe", "array");
          return p(sinaSSOEncoder.base64.decode(m, "binnary", "array"));
          break;
        default:
          return decodeURIComponent(n)
      }
    }
  }
}).call(sinaSSOEncoder);
(function() {
  var av;
  var ah = 244837814094590;
  var Y = ((ah & 16777215) == 15715070);

  function aq(z, t, az) {
    if (z != null) {
      if ("number" == typeof z) {
        this.fromNumber(z, t, az)
      } else {
        if (t == null && "string" != typeof z) {
          this.fromString(z, 256)
        } else {
          this.fromString(z, t)
        }
      }
    }
  }

  function h() {
    return new aq(null)
  }

  function b(aB, t, z, aA, aD, aC) {
    while (--aC >= 0) {
      var az = t * this[aB++] + z[aA] + aD;
      aD = Math.floor(az / 67108864);
      z[aA++] = az & 67108863
    }
    return aD
  }

  function ax(aB, aG, aH, aA, aE, t) {
    var aD = aG & 32767,
      aF = aG >> 15;
    while (--t >= 0) {
      var az = this[aB] & 32767;
      var aC = this[aB++] >> 15;
      var z = aF * az + aC * aD;
      az = aD * az + ((z & 32767) << 15) + aH[aA] + (aE & 1073741823);
      aE = (az >>> 30) + (z >>> 15) + aF * aC + (aE >>> 30);
      aH[aA++] = az & 1073741823
    }
    return aE
  }

  function aw(aB, aG, aH, aA, aE, t) {
    var aD = aG & 16383,
      aF = aG >> 14;
    while (--t >= 0) {
      var az = this[aB] & 16383;
      var aC = this[aB++] >> 14;
      var z = aF * az + aC * aD;
      az = aD * az + ((z & 16383) << 14) + aH[aA] + aE;
      aE = (az >> 28) + (z >> 14) + aF * aC;
      aH[aA++] = az & 268435455
    }
    return aE
  }
  // if (Y && (navigator.appName == "Microsoft Internet Explorer")) {
  //   aq.prototype.am = ax;
  //   av = 30
  // } else {
    // if (Y && (navigator.appName != "Netscape")) {
    //   aq.prototype.am = b;
    //   av = 26
    // } else {
      aq.prototype.am = aw;
      av = 28
    // }
  // }
  aq.prototype.DB = av;
  aq.prototype.DM = ((1 << av) - 1);
  aq.prototype.DV = (1 << av);
  var Z = 52;
  aq.prototype.FV = Math.pow(2, Z);
  aq.prototype.F1 = Z - av;
  aq.prototype.F2 = 2 * av - Z;
  var ad = "0123456789abcdefghijklmnopqrstuvwxyz";
  var af = new Array();
  var ao, v;
  ao = "0".charCodeAt(0);
  for (v = 0; v <= 9; ++v) {
    af[ao++] = v
  }
  ao = "a".charCodeAt(0);
  for (v = 10; v < 36; ++v) {
    af[ao++] = v
  }
  ao = "A".charCodeAt(0);
  for (v = 10; v < 36; ++v) {
    af[ao++] = v
  }

  function ay(t) {
    return ad.charAt(t)
  }

  function A(z, t) {
    var az = af[z.charCodeAt(t)];
    return (az == null) ? -1 : az
  }

  function X(z) {
    for (var t = this.t - 1; t >= 0; --t) {
      z[t] = this[t]
    }
    z.t = this.t;
    z.s = this.s
  }

  function n(t) {
    this.t = 1;
    this.s = (t < 0) ? -1 : 0;
    if (t > 0) {
      this[0] = t
    } else {
      if (t < -1) {
        this[0] = t + DV
      } else {
        this.t = 0
      }
    }
  }

  function c(t) {
    var z = h();
    z.fromInt(t);
    return z
  }

  function w(aD, z) {
    var aA;
    if (z == 16) {
      aA = 4
    } else {
      if (z == 8) {
        aA = 3
      } else {
        if (z == 256) {
          aA = 8
        } else {
          if (z == 2) {
            aA = 1
          } else {
            if (z == 32) {
              aA = 5
            } else {
              if (z == 4) {
                aA = 2
              } else {
                this.fromRadix(aD, z);
                return
              }
            }
          }
        }
      }
    }
    this.t = 0;
    this.s = 0;
    var aC = aD.length,
      az = false,
      aB = 0;
    while (--aC >= 0) {
      var t = (aA == 8) ? aD[aC] & 255 : A(aD, aC);
      if (t < 0) {
        if (aD.charAt(aC) == "-") {
          az = true
        }
        continue
      }
      az = false;
      if (aB == 0) {
        this[this.t++] = t
      } else {
        if (aB + aA > this.DB) {
          this[this.t - 1] |= (t & ((1 << (this.DB - aB)) - 1)) << aB;
          this[this.t++] = (t >> (this.DB - aB))
        } else {
          this[this.t - 1] |= t << aB
        }
      }
      aB += aA;
      if (aB >= this.DB) {
        aB -= this.DB
      }
    }
    if (aA == 8 && (aD[0] & 128) != 0) {
      this.s = -1;
      if (aB > 0) {
        this[this.t - 1] |= ((1 << (this.DB - aB)) - 1) << aB
      }
    }
    this.clamp();
    if (az) {
      aq.ZERO.subTo(this, this)
    }
  }

  function O() {
    var t = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == t) {
      --this.t
    }
  }

  function q(z) {
    if (this.s < 0) {
      return "-" + this.negate().toString(z)
    }
    var az;
    if (z == 16) {
      az = 4
    } else {
      if (z == 8) {
        az = 3
      } else {
        if (z == 2) {
          az = 1
        } else {
          if (z == 32) {
            az = 5
          } else {
            if (z == 4) {
              az = 2
            } else {
              return this.toRadix(z)
            }
          }
        }
      }
    }
    var aB = (1 << az) - 1,
      aE, t = false,
      aC = "",
      aA = this.t;
    var aD = this.DB - (aA * this.DB) % az;
    if (aA-- > 0) {
      if (aD < this.DB && (aE = this[aA] >> aD) > 0) {
        t = true;
        aC = ay(aE)
      }
      while (aA >= 0) {
        if (aD < az) {
          aE = (this[aA] & ((1 << aD) - 1)) << (az - aD);
          aE |= this[--aA] >> (aD += this.DB - az)
        } else {
          aE = (this[aA] >> (aD -= az)) & aB;
          if (aD <= 0) {
            aD += this.DB;
            --aA
          }
        }
        if (aE > 0) {
          t = true
        }
        if (t) {
          aC += ay(aE)
        }
      }
    }
    return t ? aC : "0"
  }

  function R() {
    var t = h();
    aq.ZERO.subTo(this, t);
    return t
  }

  function ak() {
    return (this.s < 0) ? this.negate() : this
  }

  function G(t) {
    var az = this.s - t.s;
    if (az != 0) {
      return az
    }
    var z = this.t;
    az = z - t.t;
    if (az != 0) {
      return az
    }
    while (--z >= 0) {
      if ((az = this[z] - t[z]) != 0) {
        return az
      }
    }
    return 0
  }

  function j(z) {
    var aA = 1,
      az;
    if ((az = z >>> 16) != 0) {
      z = az;
      aA += 16
    }
    if ((az = z >> 8) != 0) {
      z = az;
      aA += 8
    }
    if ((az = z >> 4) != 0) {
      z = az;
      aA += 4
    }
    if ((az = z >> 2) != 0) {
      z = az;
      aA += 2
    }
    if ((az = z >> 1) != 0) {
      z = az;
      aA += 1
    }
    return aA
  }

  function u() {
    if (this.t <= 0) {
      return 0
    }
    return this.DB * (this.t - 1) + j(this[this.t - 1] ^ (this.s & this.DM))
  }

  function ap(az, z) {
    var t;
    for (t = this.t - 1; t >= 0; --t) {
      z[t + az] = this[t]
    }
    for (t = az - 1; t >= 0; --t) {
      z[t] = 0
    }
    z.t = this.t + az;
    z.s = this.s
  }

  function W(az, z) {
    for (var t = az; t < this.t; ++t) {
      z[t - az] = this[t]
    }
    z.t = Math.max(this.t - az, 0);
    z.s = this.s
  }

  function s(aE, aA) {
    var z = aE % this.DB;
    var t = this.DB - z;
    var aC = (1 << t) - 1;
    var aB = Math.floor(aE / this.DB),
      aD = (this.s << z) & this.DM,
      az;
    for (az = this.t - 1; az >= 0; --az) {
      aA[az + aB + 1] = (this[az] >> t) | aD;
      aD = (this[az] & aC) << z
    }
    for (az = aB - 1; az >= 0; --az) {
      aA[az] = 0
    }
    aA[aB] = aD;
    aA.t = this.t + aB + 1;
    aA.s = this.s;
    aA.clamp()
  }

  function l(aD, aA) {
    aA.s = this.s;
    var aB = Math.floor(aD / this.DB);
    if (aB >= this.t) {
      aA.t = 0;
      return
    }
    var z = aD % this.DB;
    var t = this.DB - z;
    var aC = (1 << z) - 1;
    aA[0] = this[aB] >> z;
    for (var az = aB + 1; az < this.t; ++az) {
      aA[az - aB - 1] |= (this[az] & aC) << t;
      aA[az - aB] = this[az] >> z
    }
    if (z > 0) {
      aA[this.t - aB - 1] |= (this.s & aC) << t
    }
    aA.t = this.t - aB;
    aA.clamp()
  }

  function aa(z, aA) {
    var az = 0,
      aB = 0,
      t = Math.min(z.t, this.t);
    while (az < t) {
      aB += this[az] - z[az];
      aA[az++] = aB & this.DM;
      aB >>= this.DB
    }
    if (z.t < this.t) {
      aB -= z.s;
      while (az < this.t) {
        aB += this[az];
        aA[az++] = aB & this.DM;
        aB >>= this.DB
      }
      aB += this.s
    } else {
      aB += this.s;
      while (az < z.t) {
        aB -= z[az];
        aA[az++] = aB & this.DM;
        aB >>= this.DB
      }
      aB -= z.s
    }
    aA.s = (aB < 0) ? -1 : 0;
    if (aB < -1) {
      aA[az++] = this.DV + aB
    } else {
      if (aB > 0) {
        aA[az++] = aB
      }
    }
    aA.t = az;
    aA.clamp()
  }

  function D(z, aA) {
    var t = this.abs(),
      aB = z.abs();
    var az = t.t;
    aA.t = az + aB.t;
    while (--az >= 0) {
      aA[az] = 0
    }
    for (az = 0; az < aB.t; ++az) {
      aA[az + t.t] = t.am(0, aB[az], aA, az, 0, t.t)
    }
    aA.s = 0;
    aA.clamp();
    if (this.s != z.s) {
      aq.ZERO.subTo(aA, aA)
    }
  }

  function Q(az) {
    var t = this.abs();
    var z = az.t = 2 * t.t;
    while (--z >= 0) {
      az[z] = 0
    }
    for (z = 0; z < t.t - 1; ++z) {
      var aA = t.am(z, t[z], az, 2 * z, 0, 1);
      if ((az[z + t.t] += t.am(z + 1, 2 * t[z], az, 2 * z + 1, aA, t.t - z - 1)) >= t.DV) {
        az[z + t.t] -= t.DV;
        az[z + t.t + 1] = 1
      }
    }
    if (az.t > 0) {
      az[az.t - 1] += t.am(z, t[z], az, 2 * z, 0, 1)
    }
    az.s = 0;
    az.clamp()
  }

  function E(aH, aE, aD) {
    var aN = aH.abs();
    if (aN.t <= 0) {
      return
    }
    var aF = this.abs();
    if (aF.t < aN.t) {
      if (aE != null) {
        aE.fromInt(0)
      }
      if (aD != null) {
        this.copyTo(aD)
      }
      return
    }
    if (aD == null) {
      aD = h()
    }
    var aB = h(),
      z = this.s,
      aG = aH.s;
    var aM = this.DB - j(aN[aN.t - 1]);
    if (aM > 0) {
      aN.lShiftTo(aM, aB);
      aF.lShiftTo(aM, aD)
    } else {
      aN.copyTo(aB);
      aF.copyTo(aD)
    }
    var aJ = aB.t;
    var az = aB[aJ - 1];
    if (az == 0) {
      return
    }
    var aI = az * (1 << this.F1) + ((aJ > 1) ? aB[aJ - 2] >> this.F2 : 0);
    var aQ = this.FV / aI,
      aP = (1 << this.F1) / aI,
      aO = 1 << this.F2;
    var aL = aD.t,
      aK = aL - aJ,
      aC = (aE == null) ? h() : aE;
    aB.dlShiftTo(aK, aC);
    if (aD.compareTo(aC) >= 0) {
      aD[aD.t++] = 1;
      aD.subTo(aC, aD)
    }
    aq.ONE.dlShiftTo(aJ, aC);
    aC.subTo(aB, aB);
    while (aB.t < aJ) {
      aB[aB.t++] = 0
    }
    while (--aK >= 0) {
      var aA = (aD[--aL] == az) ? this.DM : Math.floor(aD[aL] * aQ + (aD[aL - 1] + aO) * aP);
      if ((aD[aL] += aB.am(0, aA, aD, aK, 0, aJ)) < aA) {
        aB.dlShiftTo(aK, aC);
        aD.subTo(aC, aD);
        while (aD[aL] < --aA) {
          aD.subTo(aC, aD)
        }
      }
    }
    if (aE != null) {
      aD.drShiftTo(aJ, aE);
      if (z != aG) {
        aq.ZERO.subTo(aE, aE)
      }
    }
    aD.t = aJ;
    aD.clamp();
    if (aM > 0) {
      aD.rShiftTo(aM, aD)
    }
    if (z < 0) {
      aq.ZERO.subTo(aD, aD)
    }
  }

  function N(t) {
    var z = h();
    this.abs().divRemTo(t, null, z);
    if (this.s < 0 && z.compareTo(aq.ZERO) > 0) {
      t.subTo(z, z)
    }
    return z
  }

  function K(t) {
    this.m = t
  }

  function U(t) {
    if (t.s < 0 || t.compareTo(this.m) >= 0) {
      return t.mod(this.m)
    } else {
      return t
    }
  }

  function aj(t) {
    return t
  }

  function J(t) {
    t.divRemTo(this.m, null, t)
  }

  function H(t, az, z) {
    t.multiplyTo(az, z);
    this.reduce(z)
  }

  function at(t, z) {
    t.squareTo(z);
    this.reduce(z)
  }
  K.prototype.convert = U;
  K.prototype.revert = aj;
  K.prototype.reduce = J;
  K.prototype.mulTo = H;
  K.prototype.sqrTo = at;

  function B() {
    if (this.t < 1) {
      return 0
    }
    var t = this[0];
    if ((t & 1) == 0) {
      return 0
    }
    var z = t & 3;
    z = (z * (2 - (t & 15) * z)) & 15;
    z = (z * (2 - (t & 255) * z)) & 255;
    z = (z * (2 - (((t & 65535) * z) & 65535))) & 65535;
    z = (z * (2 - t * z % this.DV)) % this.DV;
    return (z > 0) ? this.DV - z : -z
  }

  function f(t) {
    this.m = t;
    this.mp = t.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << (t.DB - 15)) - 1;
    this.mt2 = 2 * t.t
  }

  function ai(t) {
    var z = h();
    t.abs().dlShiftTo(this.m.t, z);
    z.divRemTo(this.m, null, z);
    if (t.s < 0 && z.compareTo(aq.ZERO) > 0) {
      this.m.subTo(z, z)
    }
    return z
  }

  function ar(t) {
    var z = h();
    t.copyTo(z);
    this.reduce(z);
    return z
  }

  function P(t) {
    while (t.t <= this.mt2) {
      t[t.t++] = 0
    }
    for (var az = 0; az < this.m.t; ++az) {
      var z = t[az] & 32767;
      var aA = (z * this.mpl + (((z * this.mph + (t[az] >> 15) * this.mpl) & this.um) << 15)) & t.DM;
      z = az + this.m.t;
      t[z] += this.m.am(0, aA, t, az, 0, this.m.t);
      while (t[z] >= t.DV) {
        t[z] -= t.DV;
        t[++z]++
      }
    }
    t.clamp();
    t.drShiftTo(this.m.t, t);
    if (t.compareTo(this.m) >= 0) {
      t.subTo(this.m, t)
    }
  }

  function al(t, z) {
    t.squareTo(z);
    this.reduce(z)
  }

  function y(t, az, z) {
    t.multiplyTo(az, z);
    this.reduce(z)
  }
  f.prototype.convert = ai;
  f.prototype.revert = ar;
  f.prototype.reduce = P;
  f.prototype.mulTo = y;
  f.prototype.sqrTo = al;

  function i() {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
  }

  function x(aE, aF) {
    if (aE > 4294967295 || aE < 1) {
      return aq.ONE
    }
    var aD = h(),
      az = h(),
      aC = aF.convert(this),
      aB = j(aE) - 1;
    aC.copyTo(aD);
    while (--aB >= 0) {
      aF.sqrTo(aD, az);
      if ((aE & (1 << aB)) > 0) {
        aF.mulTo(az, aC, aD)
      } else {
        var aA = aD;
        aD = az;
        az = aA
      }
    }
    return aF.revert(aD)
  }

  function am(az, t) {
    var aA;
    if (az < 256 || t.isEven()) {
      aA = new K(t)
    } else {
      aA = new f(t)
    }
    return this.exp(az, aA)
  }
  aq.prototype.copyTo = X;
  aq.prototype.fromInt = n;
  aq.prototype.fromString = w;
  aq.prototype.clamp = O;
  aq.prototype.dlShiftTo = ap;
  aq.prototype.drShiftTo = W;
  aq.prototype.lShiftTo = s;
  aq.prototype.rShiftTo = l;
  aq.prototype.subTo = aa;
  aq.prototype.multiplyTo = D;
  aq.prototype.squareTo = Q;
  aq.prototype.divRemTo = E;
  aq.prototype.invDigit = B;
  aq.prototype.isEven = i;
  aq.prototype.exp = x;
  aq.prototype.toString = q;
  aq.prototype.negate = R;
  aq.prototype.abs = ak;
  aq.prototype.compareTo = G;
  aq.prototype.bitLength = u;
  aq.prototype.mod = N;
  aq.prototype.modPowInt = am;
  aq.ZERO = c(0);
  aq.ONE = c(1);

  function k() {
    this.i = 0;
    this.j = 0;
    this.S = new Array()
  }

  function e(aB) {
    var aA, z, az;
    for (aA = 0; aA < 256; ++aA) {
      this.S[aA] = aA
    }
    z = 0;
    for (aA = 0; aA < 256; ++aA) {
      z = (z + this.S[aA] + aB[aA % aB.length]) & 255;
      az = this.S[aA];
      this.S[aA] = this.S[z];
      this.S[z] = az
    }
    this.i = 0;
    this.j = 0
  }

  function a() {
    var z;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    z = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = z;
    return this.S[(z + this.S[this.i]) & 255]
  }
  k.prototype.init = e;
  k.prototype.next = a;

  function an() {
    return new k()
  }
  var M = 256;
  var m;
  var T;
  var ab;

  function d(t) {
    T[ab++] ^= t & 255;
    T[ab++] ^= (t >> 8) & 255;
    T[ab++] ^= (t >> 16) & 255;
    T[ab++] ^= (t >> 24) & 255;
    if (ab >= M) {
      ab -= M
    }
  }

  function S() {
    d(new Date().getTime())
  }
  if (T == null) {
    T = new Array();
    ab = 0;
    var I;
    // if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && typeof(window.crypto.random) === "function") {
    //   var F = window.crypto.random(32);
    //   for (I = 0; I < F.length; ++I) {
    //     T[ab++] = F.charCodeAt(I) & 255
    //   }
    // }
    while (ab < M) {
      I = Math.floor(65536 * Math.random());
      T[ab++] = I >>> 8;
      T[ab++] = I & 255
    }
    ab = 0;
    S()
  }

  function C() {
    if (m == null) {
      S();
      m = an();
      m.init(T);
      for (ab = 0; ab < T.length; ++ab) {
        T[ab] = 0
      }
      ab = 0
    }
    return m.next()
  }

  function au(z) {
    var t;
    for (t = 0; t < z.length; ++t) {
      z[t] = C()
    }
  }

  function ac() {}
  ac.prototype.nextBytes = au;

  function g(z, t) {
    return new aq(z, t)
  }

  function ag(az, aA) {
    var t = "";
    var z = 0;
    while (z + aA < az.length) {
      t += az.substring(z, z + aA) + "\n";
      z += aA
    }
    return t + az.substring(z, az.length)
  }

  function r(t) {
    if (t < 16) {
      return "0" + t.toString(16)
    } else {
      return t.toString(16)
    }
  }

  function ae(aA, aD) {
    if (aD < aA.length + 11) {
      console.log("Message too long for RSA");
      return null
    }
    var aC = new Array();
    var az = aA.length - 1;
    while (az >= 0 && aD > 0) {
      var aB = aA.charCodeAt(az--);
      if (aB < 128) {
        aC[--aD] = aB
      } else {
        if ((aB > 127) && (aB < 2048)) {
          aC[--aD] = (aB & 63) | 128;
          aC[--aD] = (aB >> 6) | 192
        } else {
          aC[--aD] = (aB & 63) | 128;
          aC[--aD] = ((aB >> 6) & 63) | 128;
          aC[--aD] = (aB >> 12) | 224
        }
      }
    }
    aC[--aD] = 0;
    var z = new ac();
    var t = new Array();
    while (aD > 2) {
      t[0] = 0;
      while (t[0] == 0) {
        z.nextBytes(t)
      }
      aC[--aD] = t[0]
    }
    aC[--aD] = 2;
    aC[--aD] = 0;
    return new aq(aC)
  }

  function L() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null
  }

  function o(z, t) {
    if (z != null && t != null && z.length > 0 && t.length > 0) {
      this.n = g(z, 16);
      this.e = parseInt(t, 16)
    } else {
      console.log("Invalid RSA public key")
    }
  }

  function V(t) {
    return t.modPowInt(this.e, this.n)
  }

  function p(az) {
    var t = ae(az, (this.n.bitLength() + 7) >> 3);
    if (t == null) {
      return null
    }
    var aA = this.doPublic(t);
    if (aA == null) {
      return null
    }
    var z = aA.toString(16);
    if ((z.length & 1) == 0) {
      return z
    } else {
      return "0" + z
    }
  }
  L.prototype.doPublic = V;
  L.prototype.setPublic = o;
  L.prototype.encrypt = p;
  this.RSAKey = L
}).call(sinaSSOEncoder);
// sinaSSOController = new SSOController();
// sinaSSOController.init();


// var RSAKey = new sinaSSOEncoder.RSAKey();
// // console.log(pubkey,servertime,nonce)
// var pubkey = "EB2A38568661887FA180BDDB5CABD5F21C7BFD59C090CB2D245A87AC253062882729293E5506350508E7F9AA3BB77F4333231490F915F6D63C55FE2F08A49B353F444AD3993CACC02DB784ABBB8E42A9B1BBFFFB38BE18D78E87A0E41B9B8F73A928EE0CCEE1F6739884B9777E4FE9E88A1BBE495927AC4A799B3181D6442443"
// var servertime = '1489562283'
// var nonce = '7ZSUDN'

  // RSAKey.setPublic(pubkey, "10001");
  // password = RSAKey.encrypt([servertime, nonce].join("\t") + "\n" + "352033412")
  // console.log(password)

module.exports = sinaSSOEncoder