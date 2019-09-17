class Utils {
  constructor() {}
  /**
   * 隨機字串
   * @param {int} minLength 最小長度
   * @param {int} maxLength 最大長度
   * @param {string} data 可以使用的內容文字
   */
  randomString(minLength: number, maxLength: number, data: string) {
    // 隨機字串
    if (typeof data === undefined) {
      data = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    }
    let chars = data.split('')

    let length = Math.round(Math.random() * (maxLength - minLength)) + minLength

    // if (length < minLength) {
    // length = minLength
    // }
    // else if (length > maxLength) {
    // length = maxLength
    // }

    var str = ''
    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str
  }
  /**
   * GUID
   */
  guid() {
    // GUID
    return 'xxxxxxxx-xxxx-0xxx-yxyx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function(c) {
        let string = (Math.random() * 16) | 0
        // let v = c === 'x' ? string : (string & 0x3) | 0x8
        return string.toString(16)
      })
      .toUpperCase()
  }
  /**
   * 驗證 JSON 格式是否正確
   * @param {object} value 物件來源
   */
  isJSON(value: any) {
    try {
      return JSON.parse(value) && !!value
    } catch (e) {
      return false
    }
  }
  /**
   * 找階層子項目
   * @param {object} obj  物件來源
   * @param {string} name  要比對的欄位名稱
   * @param {object} value  要比對的內容
   * @param {string} children  子項目欄位名稱
   */
  findChildren(obj: any, name: string, value: any, children: string) {
    let data = obj.find(function(item: any) {
      return item[name] === value
    })
    if (data === undefined || data.length === 0) {
      for (let item in obj) {
        if (typeof obj[item][children] !== 'undefined') {
          let tmp: any = this.findChildren(
            obj[item][children],
            name,
            value,
            children
          )
          if (tmp.length > 0) {
            return tmp
          }
        }
      }
      return []
    } else {
      return data[children] === undefined ? [] : data[children]
    }
  }
  /**
   * 找出所有階層
   * @param {object} obj  物件來源
   * @param {string} name  要比對的欄位名稱
   * @param {object} value  要比對的內容
   * @param {string} children  子項目欄位名稱
   */
  findAllLevel(obj: any, name: string, value: any, children: string) {
    let arr: any = []
    for (let item in obj) {
      if (obj[item].value === value) {
        arr.push(obj[item].value)
        return arr
      } else if (
        obj[item].value !== value &&
        typeof obj[item][children] !== 'undefined'
      ) {
        let tmp: any = this.findAllLevel(
          obj[item][children],
          name,
          value,
          children
        )
        if (tmp.length > 0) {
          arr.push(obj[item].value)
          arr = arr.concat(tmp)
          return arr
        }
      }
    }

    return arr
  }
  /**
   * MD5
   * @param {string} value 要編碼的內容
   */
  md5(value: string) {
    // var MD5 = function (s) { function L(k, d) { return (k << d) | (k >>> (32 - d)) } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r(d, F, k) { return (d & F) | ((~d) & k) } function q(d, F, k) { return (d & k) | (F & (~k)) } function p(d, F, k) { return (d ^ F ^ k) } function n(d, F, k) { return (F ^ (d | (~k))) } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J(k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase() };
    var MD5 = function(string: string) {
      function RotateLeft(lValue: any, iShiftBits: any) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
      }
      function AddUnsigned(lX: any, lY: any) {
        var lX4, lY4, lX8, lY8, lResult
        lX8 = lX & 0x80000000
        lY8 = lY & 0x80000000
        lX4 = lX & 0x40000000
        lY4 = lY & 0x40000000
        lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff)
        if (lX4 & lY4) {
          return lResult ^ 0x80000000 ^ lX8 ^ lY8
        }
        if (lX4 | lY4) {
          if (lResult & 0x40000000) {
            return lResult ^ 0xc0000000 ^ lX8 ^ lY8
          } else {
            return lResult ^ 0x40000000 ^ lX8 ^ lY8
          }
        } else {
          return lResult ^ lX8 ^ lY8
        }
      }

      function F(x: any, y: any, z: any) {
        return (x & y) | (~x & z)
      }
      function G(x: any, y: any, z: any) {
        return (x & z) | (y & ~z)
      }
      function H(x: any, y: any, z: any) {
        return x ^ y ^ z
      }
      function I(x: any, y: any, z: any) {
        return y ^ (x | ~z)
      }
      function FF(a: any, b: any, c: any, d: any, x: any, s: any, ac: any) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac))

        return AddUnsigned(RotateLeft(a, s), b)
      }
      function GG(a: any, b: any, c: any, d: any, x: any, s: any, ac: any) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac))

        return AddUnsigned(RotateLeft(a, s), b)
      }

      function HH(a: any, b: any, c: any, d: any, x: any, s: any, ac: any) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac))

        return AddUnsigned(RotateLeft(a, s), b)
      }

      function II(a: any, b: any, c: any, d: any, x: any, s: any, ac: any) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac))

        return AddUnsigned(RotateLeft(a, s), b)
      }

      function ConvertToWordArray(string: any) {
        var lWordCount
        var lMessageLength = string.length
        var lNumberOfWordsTemp1 = lMessageLength + 8
        var lNumberOfWordsTemp2 =
          (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
        var lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
        var lWordArray = Array(lNumberOfWords - 1)
        var lBytePosition = 0
        var lByteCount = 0

        while (lByteCount < lMessageLength) {
          lWordCount = (lByteCount - (lByteCount % 4)) / 4
          lBytePosition = (lByteCount % 4) * 8
          lWordArray[lWordCount] =
            lWordArray[lWordCount] |
            (string.charCodeAt(lByteCount) << lBytePosition)

          lByteCount++
        }

        lWordCount = (lByteCount - (lByteCount % 4)) / 4

        lBytePosition = (lByteCount % 4) * 8

        lWordArray[lWordCount] =
          lWordArray[lWordCount] | (0x80 << lBytePosition)

        lWordArray[lNumberOfWords - 2] = lMessageLength << 3

        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29

        return lWordArray
      }

      function WordToHex(lValue: any) {
        var WordToHexValue = ''
        var WordToHexValueTemp = ''
        var lByte
        var lCount

        for (lCount = 0; lCount <= 3; lCount++) {
          lByte = (lValue >>> (lCount * 8)) & 255

          WordToHexValueTemp = '0' + lByte.toString(16)

          WordToHexValue =
            WordToHexValue +
            WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
        }

        return WordToHexValue
      }

      function Utf8Encode(string: any) {
        string = string.replace(/\r\n/g, '\n')

        var utftext = ''

        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n)

          if (c < 128) {
            utftext += String.fromCharCode(c)
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode((c >> 6) | 192)

            utftext += String.fromCharCode((c & 63) | 128)
          } else {
            utftext += String.fromCharCode((c >> 12) | 224)

            utftext += String.fromCharCode(((c >> 6) & 63) | 128)

            utftext += String.fromCharCode((c & 63) | 128)
          }
        }

        return utftext
      }

      var x: any = []

      var k, AA, BB, CC, DD, a, b, c, d

      var S11 = 7
      var S12 = 12
      var S13 = 17
      var S14 = 22

      var S21 = 5
      var S22 = 9
      var S23 = 14
      var S24 = 20

      var S31 = 4
      var S32 = 11
      var S33 = 16
      var S34 = 23

      var S41 = 6
      var S42 = 10
      var S43 = 15
      var S44 = 21

      string = Utf8Encode(string)

      x = ConvertToWordArray(string)

      a = 0x67452301
      b = 0xefcdab89
      c = 0x98badcfe
      d = 0x10325476

      for (k = 0; k < x.length; k += 16) {
        AA = a
        BB = b
        CC = c
        DD = d

        a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478)

        d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756)

        c = FF(c, d, a, b, x[k + 2], S13, 0x242070db)

        b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee)

        a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf)

        d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a)

        c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613)

        b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501)

        a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8)

        d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af)

        c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1)

        b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be)

        a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122)

        d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193)

        c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e)

        b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821)

        a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562)

        d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340)

        c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51)

        b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa)

        a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d)

        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)

        c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681)

        b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)

        a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6)

        d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6)

        c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87)

        b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed)

        a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905)

        d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)

        c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9)

        b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)

        a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942)

        d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681)

        c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122)

        b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c)

        a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44)

        d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)

        c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60)

        b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70)

        a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6)

        d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa)

        c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085)

        b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05)

        a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039)

        d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5)

        c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8)

        b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665)

        a = II(a, b, c, d, x[k + 0], S41, 0xf4292244)

        d = II(d, a, b, c, x[k + 7], S42, 0x432aff97)

        c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7)

        b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039)

        a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3)

        d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)

        c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d)

        b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1)

        a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f)

        d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)

        c = II(c, d, a, b, x[k + 6], S43, 0xa3014314)

        b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1)

        a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82)

        d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235)

        c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb)

        b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391)

        a = AddUnsigned(a, AA)

        b = AddUnsigned(b, BB)

        c = AddUnsigned(c, CC)

        d = AddUnsigned(d, DD)
      }

      var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)

      return temp.toLowerCase()
    }
    var result = MD5(value)

    return result
  }
  /**
   * 驗證
   * @param {object} reg 正規表達式
   * @param {string} value 驗證內容
   */
  validate(reg: any, value: string) {
    var re = new RegExp(reg)
    return re.test(value)
  }
}
export default Utils
