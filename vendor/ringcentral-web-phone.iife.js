(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/blueimp-md5/js/md5.js
  var require_md5 = __commonJS({
    "node_modules/blueimp-md5/js/md5.js"(exports2, module) {
      (function($) {
        "use strict";
        function safeAdd(x, y) {
          var lsw = (x & 65535) + (y & 65535);
          var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return msw << 16 | lsw & 65535;
        }
        function bitRotateLeft(num, cnt) {
          return num << cnt | num >>> 32 - cnt;
        }
        function md5cmn(q, a, b, x, s, t) {
          return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
        }
        function md5ff(a, b, c, d, x, s, t) {
          return md5cmn(b & c | ~b & d, a, b, x, s, t);
        }
        function md5gg(a, b, c, d, x, s, t) {
          return md5cmn(b & d | c & ~d, a, b, x, s, t);
        }
        function md5hh(a, b, c, d, x, s, t) {
          return md5cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5ii(a, b, c, d, x, s, t) {
          return md5cmn(c ^ (b | ~d), a, b, x, s, t);
        }
        function binlMD5(x, len) {
          x[len >> 5] |= 128 << len % 32;
          x[(len + 64 >>> 9 << 4) + 14] = len;
          var i;
          var olda;
          var oldb;
          var oldc;
          var oldd;
          var a = 1732584193;
          var b = -271733879;
          var c = -1732584194;
          var d = 271733878;
          for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd);
          }
          return [a, b, c, d];
        }
        function binl2rstr(input) {
          var i;
          var output = "";
          var length32 = input.length * 32;
          for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
          }
          return output;
        }
        function rstr2binl(input) {
          var i;
          var output = [];
          output[(input.length >> 2) - 1] = void 0;
          for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
          }
          var length8 = input.length * 8;
          for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32;
          }
          return output;
        }
        function rstrMD5(s) {
          return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
        }
        function rstrHMACMD5(key, data) {
          var i;
          var bkey = rstr2binl(key);
          var ipad = [];
          var opad = [];
          var hash;
          ipad[15] = opad[15] = void 0;
          if (bkey.length > 16) {
            bkey = binlMD5(bkey, key.length * 8);
          }
          for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 909522486;
            opad[i] = bkey[i] ^ 1549556828;
          }
          hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
          return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
        }
        function rstr2hex(input) {
          var hexTab = "0123456789abcdef";
          var output = "";
          var x;
          var i;
          for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15);
          }
          return output;
        }
        function str2rstrUTF8(input) {
          return unescape(encodeURIComponent(input));
        }
        function rawMD5(s) {
          return rstrMD5(str2rstrUTF8(s));
        }
        function hexMD5(s) {
          return rstr2hex(rawMD5(s));
        }
        function rawHMACMD5(k, d) {
          return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
        }
        function hexHMACMD5(k, d) {
          return rstr2hex(rawHMACMD5(k, d));
        }
        function md52(string, key, raw) {
          if (!key) {
            if (!raw) {
              return hexMD5(string);
            }
            return rawMD5(string);
          }
          if (!raw) {
            return hexHMACMD5(key, string);
          }
          return rawHMACMD5(key, string);
        }
        if (typeof define === "function" && define.amd) {
          define(function() {
            return md52;
          });
        } else if (typeof module === "object" && module.exports) {
          module.exports = md52;
        } else {
          $.md5 = md52;
        }
      })(exports2);
    }
  });

  // node_modules/sdp-transform/lib/grammar.js
  var require_grammar = __commonJS({
    "node_modules/sdp-transform/lib/grammar.js"(exports2, module) {
      var grammar = module.exports = {
        v: [{
          name: "version",
          reg: /^(\d*)$/
        }],
        o: [{
          // o=- 20518 0 IN IP4 203.0.113.1
          // NB: sessionId will be a String in most cases because it is huge
          name: "origin",
          reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
          names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
          format: "%s %s %d %s IP%d %s"
        }],
        // default parsing of these only (though some of these feel outdated)
        s: [{ name: "name" }],
        i: [{ name: "description" }],
        u: [{ name: "uri" }],
        e: [{ name: "email" }],
        p: [{ name: "phone" }],
        z: [{ name: "timezones" }],
        // TODO: this one can actually be parsed properly...
        r: [{ name: "repeats" }],
        // TODO: this one can also be parsed properly
        // k: [{}], // outdated thing ignored
        t: [{
          // t=0 0
          name: "timing",
          reg: /^(\d*) (\d*)/,
          names: ["start", "stop"],
          format: "%d %d"
        }],
        c: [{
          // c=IN IP4 10.47.197.26
          name: "connection",
          reg: /^IN IP(\d) (\S*)/,
          names: ["version", "ip"],
          format: "IN IP%d %s"
        }],
        b: [{
          // b=AS:4000
          push: "bandwidth",
          reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
          names: ["type", "limit"],
          format: "%s:%s"
        }],
        m: [{
          // m=video 51744 RTP/AVP 126 97 98 34 31
          // NB: special - pushes to session
          // TODO: rtp/fmtp should be filtered by the payloads found here?
          reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
          names: ["type", "port", "protocol", "payloads"],
          format: "%s %d %s %s"
        }],
        a: [
          {
            // a=rtpmap:110 opus/48000/2
            push: "rtp",
            reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
            names: ["payload", "codec", "rate", "encoding"],
            format: function(o) {
              return o.encoding ? "rtpmap:%d %s/%s/%s" : o.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
            }
          },
          {
            // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
            // a=fmtp:111 minptime=10; useinbandfec=1
            push: "fmtp",
            reg: /^fmtp:(\d*) ([\S| ]*)/,
            names: ["payload", "config"],
            format: "fmtp:%d %s"
          },
          {
            // a=control:streamid=0
            name: "control",
            reg: /^control:(.*)/,
            format: "control:%s"
          },
          {
            // a=rtcp:65179 IN IP4 193.84.77.194
            name: "rtcp",
            reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
            names: ["port", "netType", "ipVer", "address"],
            format: function(o) {
              return o.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
            }
          },
          {
            // a=rtcp-fb:98 trr-int 100
            push: "rtcpFbTrrInt",
            reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
            names: ["payload", "value"],
            format: "rtcp-fb:%s trr-int %d"
          },
          {
            // a=rtcp-fb:98 nack rpsi
            push: "rtcpFb",
            reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
            names: ["payload", "type", "subtype"],
            format: function(o) {
              return o.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
            }
          },
          {
            // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
            // a=extmap:1/recvonly URI-gps-string
            // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
            push: "ext",
            reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
            names: ["value", "direction", "encrypt-uri", "uri", "config"],
            format: function(o) {
              return "extmap:%d" + (o.direction ? "/%s" : "%v") + (o["encrypt-uri"] ? " %s" : "%v") + " %s" + (o.config ? " %s" : "");
            }
          },
          {
            // a=extmap-allow-mixed
            name: "extmapAllowMixed",
            reg: /^(extmap-allow-mixed)/
          },
          {
            // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
            push: "crypto",
            reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
            names: ["id", "suite", "config", "sessionConfig"],
            format: function(o) {
              return o.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
            }
          },
          {
            // a=setup:actpass
            name: "setup",
            reg: /^setup:(\w*)/,
            format: "setup:%s"
          },
          {
            // a=connection:new
            name: "connectionType",
            reg: /^connection:(new|existing)/,
            format: "connection:%s"
          },
          {
            // a=mid:1
            name: "mid",
            reg: /^mid:([^\s]*)/,
            format: "mid:%s"
          },
          {
            // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
            push: "msid",
            reg: /^msid:([\w-]+)(?: ([\w-]+))?/,
            names: ["id", "appdata"],
            format: "msid:%s %s"
          },
          {
            // a=ptime:20
            name: "ptime",
            reg: /^ptime:(\d*(?:\.\d*)*)/,
            format: "ptime:%d"
          },
          {
            // a=maxptime:60
            name: "maxptime",
            reg: /^maxptime:(\d*(?:\.\d*)*)/,
            format: "maxptime:%d"
          },
          {
            // a=sendrecv
            name: "direction",
            reg: /^(sendrecv|recvonly|sendonly|inactive)/
          },
          {
            // a=ice-lite
            name: "icelite",
            reg: /^(ice-lite)/
          },
          {
            // a=ice-ufrag:F7gI
            name: "iceUfrag",
            reg: /^ice-ufrag:(\S*)/,
            format: "ice-ufrag:%s"
          },
          {
            // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
            name: "icePwd",
            reg: /^ice-pwd:(\S*)/,
            format: "ice-pwd:%s"
          },
          {
            // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
            name: "fingerprint",
            reg: /^fingerprint:(\S*) (\S*)/,
            names: ["type", "hash"],
            format: "fingerprint:%s %s"
          },
          {
            // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
            // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
            // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
            // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
            // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
            push: "candidates",
            reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
            names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
            format: function(o) {
              var str = "candidate:%s %d %s %d %s %d typ %s";
              str += o.raddr != null ? " raddr %s rport %d" : "%v%v";
              str += o.tcptype != null ? " tcptype %s" : "%v";
              if (o.generation != null) {
                str += " generation %d";
              }
              str += o["network-id"] != null ? " network-id %d" : "%v";
              str += o["network-cost"] != null ? " network-cost %d" : "%v";
              return str;
            }
          },
          {
            // a=end-of-candidates (keep after the candidates line for readability)
            name: "endOfCandidates",
            reg: /^(end-of-candidates)/
          },
          {
            // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
            name: "remoteCandidates",
            reg: /^remote-candidates:(.*)/,
            format: "remote-candidates:%s"
          },
          {
            // a=ice-options:google-ice
            name: "iceOptions",
            reg: /^ice-options:(\S*)/,
            format: "ice-options:%s"
          },
          {
            // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
            push: "ssrcs",
            reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
            names: ["id", "attribute", "value"],
            format: function(o) {
              var str = "ssrc:%d";
              if (o.attribute != null) {
                str += " %s";
                if (o.value != null) {
                  str += ":%s";
                }
              }
              return str;
            }
          },
          {
            // a=ssrc-group:FEC 1 2
            // a=ssrc-group:FEC-FR 3004364195 1080772241
            push: "ssrcGroups",
            // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
            reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
            names: ["semantics", "ssrcs"],
            format: "ssrc-group:%s %s"
          },
          {
            // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
            name: "msidSemantic",
            reg: /^msid-semantic:\s?(\w*) (\S*)/,
            names: ["semantic", "token"],
            format: "msid-semantic: %s %s"
            // space after ':' is not accidental
          },
          {
            // a=group:BUNDLE audio video
            push: "groups",
            reg: /^group:(\w*) (.*)/,
            names: ["type", "mids"],
            format: "group:%s %s"
          },
          {
            // a=rtcp-mux
            name: "rtcpMux",
            reg: /^(rtcp-mux)/
          },
          {
            // a=rtcp-rsize
            name: "rtcpRsize",
            reg: /^(rtcp-rsize)/
          },
          {
            // a=sctpmap:5000 webrtc-datachannel 1024
            name: "sctpmap",
            reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
            names: ["sctpmapNumber", "app", "maxMessageSize"],
            format: function(o) {
              return o.maxMessageSize != null ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
            }
          },
          {
            // a=x-google-flag:conference
            name: "xGoogleFlag",
            reg: /^x-google-flag:([^\s]*)/,
            format: "x-google-flag:%s"
          },
          {
            // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
            push: "rids",
            reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
            names: ["id", "direction", "params"],
            format: function(o) {
              return o.params ? "rid:%s %s %s" : "rid:%s %s";
            }
          },
          {
            // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
            // a=imageattr:* send [x=800,y=640] recv *
            // a=imageattr:100 recv [x=320,y=240]
            push: "imageattrs",
            reg: new RegExp(
              // a=imageattr:97
              "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
            ),
            names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
            format: function(o) {
              return "imageattr:%s %s %s" + (o.dir2 ? " %s %s" : "");
            }
          },
          {
            // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
            // a=simulcast:recv 1;4,5 send 6;7
            name: "simulcast",
            reg: new RegExp(
              // a=simulcast:
              "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"
            ),
            names: ["dir1", "list1", "dir2", "list2"],
            format: function(o) {
              return "simulcast:%s %s" + (o.dir2 ? " %s %s" : "");
            }
          },
          {
            // old simulcast draft 03 (implemented by Firefox)
            //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
            // a=simulcast: recv pt=97;98 send pt=97
            // a=simulcast: send rid=5;6;7 paused=6,7
            name: "simulcast_03",
            reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
            names: ["value"],
            format: "simulcast: %s"
          },
          {
            // a=framerate:25
            // a=framerate:29.97
            name: "framerate",
            reg: /^framerate:(\d+(?:$|\.\d+))/,
            format: "framerate:%s"
          },
          {
            // RFC4570
            // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
            name: "sourceFilter",
            reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
            names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
            format: "source-filter: %s %s %s %s %s"
          },
          {
            // a=bundle-only
            name: "bundleOnly",
            reg: /^(bundle-only)/
          },
          {
            // a=label:1
            name: "label",
            reg: /^label:(.+)/,
            format: "label:%s"
          },
          {
            // RFC version 26 for SCTP over DTLS
            // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
            name: "sctpPort",
            reg: /^sctp-port:(\d+)$/,
            format: "sctp-port:%s"
          },
          {
            // RFC version 26 for SCTP over DTLS
            // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
            name: "maxMessageSize",
            reg: /^max-message-size:(\d+)$/,
            format: "max-message-size:%s"
          },
          {
            // RFC7273
            // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
            push: "tsRefClocks",
            reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
            names: ["clksrc", "clksrcExt"],
            format: function(o) {
              return "ts-refclk:%s" + (o.clksrcExt != null ? "=%s" : "");
            }
          },
          {
            // RFC7273
            // a=mediaclk:direct=963214424
            name: "mediaClk",
            reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
            names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"],
            format: function(o) {
              var str = "mediaclk:";
              str += o.id != null ? "id=%s %s" : "%v%s";
              str += o.mediaClockValue != null ? "=%s" : "";
              str += o.rateNumerator != null ? " rate=%s" : "";
              str += o.rateDenominator != null ? "/%s" : "";
              return str;
            }
          },
          {
            // a=keywds:keywords
            name: "keywords",
            reg: /^keywds:(.+)$/,
            format: "keywds:%s"
          },
          {
            // a=content:main
            name: "content",
            reg: /^content:(.+)/,
            format: "content:%s"
          },
          // BFCP https://tools.ietf.org/html/rfc4583
          {
            // a=floorctrl:c-s
            name: "bfcpFloorCtrl",
            reg: /^floorctrl:(c-only|s-only|c-s)/,
            format: "floorctrl:%s"
          },
          {
            // a=confid:1
            name: "bfcpConfId",
            reg: /^confid:(\d+)/,
            format: "confid:%s"
          },
          {
            // a=userid:1
            name: "bfcpUserId",
            reg: /^userid:(\d+)/,
            format: "userid:%s"
          },
          {
            // a=floorid:1
            name: "bfcpFloorId",
            reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
            names: ["id", "mStream"],
            format: "floorid:%s mstrm:%s"
          },
          {
            // any a= that we don't understand is kept verbatim on media.invalid
            push: "invalid",
            names: ["value"]
          }
        ]
      };
      Object.keys(grammar).forEach(function(key) {
        var objs = grammar[key];
        objs.forEach(function(obj) {
          if (!obj.reg) {
            obj.reg = /(.*)/;
          }
          if (!obj.format) {
            obj.format = "%s";
          }
        });
      });
    }
  });

  // node_modules/sdp-transform/lib/parser.js
  var require_parser = __commonJS({
    "node_modules/sdp-transform/lib/parser.js"(exports2) {
      var toIntIfInt = function(v) {
        return String(Number(v)) === v ? Number(v) : v;
      };
      var attachProperties = function(match, location, names, rawName) {
        if (rawName && !names) {
          location[rawName] = toIntIfInt(match[1]);
        } else {
          for (var i = 0; i < names.length; i += 1) {
            if (match[i + 1] != null) {
              location[names[i]] = toIntIfInt(match[i + 1]);
            }
          }
        }
      };
      var parseReg = function(obj, location, content) {
        var needsBlank = obj.name && obj.names;
        if (obj.push && !location[obj.push]) {
          location[obj.push] = [];
        } else if (needsBlank && !location[obj.name]) {
          location[obj.name] = {};
        }
        var keyLocation = obj.push ? {} : (
          // blank object that will be pushed
          needsBlank ? location[obj.name] : location
        );
        attachProperties(content.match(obj.reg), keyLocation, obj.names, obj.name);
        if (obj.push) {
          location[obj.push].push(keyLocation);
        }
      };
      var grammar = require_grammar();
      var validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
      exports2.parse = function(sdp) {
        var session = {}, media = [], location = session;
        sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach(function(l) {
          var type = l[0];
          var content = l.slice(2);
          if (type === "m") {
            media.push({ rtp: [], fmtp: [] });
            location = media[media.length - 1];
          }
          for (var j = 0; j < (grammar[type] || []).length; j += 1) {
            var obj = grammar[type][j];
            if (obj.reg.test(content)) {
              return parseReg(obj, location, content);
            }
          }
        });
        session.media = media;
        return session;
      };
      var paramReducer = function(acc, expr) {
        var s = expr.split(/=(.+)/, 2);
        if (s.length === 2) {
          acc[s[0]] = toIntIfInt(s[1]);
        } else if (s.length === 1 && expr.length > 1) {
          acc[s[0]] = void 0;
        }
        return acc;
      };
      exports2.parseParams = function(str) {
        return str.split(/;\s?/).reduce(paramReducer, {});
      };
      exports2.parseFmtpConfig = exports2.parseParams;
      exports2.parsePayloads = function(str) {
        return str.toString().split(" ").map(Number);
      };
      exports2.parseRemoteCandidates = function(str) {
        var candidates = [];
        var parts = str.split(" ").map(toIntIfInt);
        for (var i = 0; i < parts.length; i += 3) {
          candidates.push({
            component: parts[i],
            ip: parts[i + 1],
            port: parts[i + 2]
          });
        }
        return candidates;
      };
      exports2.parseImageAttributes = function(str) {
        return str.split(" ").map(function(item) {
          return item.substring(1, item.length - 1).split(",").reduce(paramReducer, {});
        });
      };
      exports2.parseSimulcastStreamList = function(str) {
        return str.split(";").map(function(stream) {
          return stream.split(",").map(function(format) {
            var scid, paused = false;
            if (format[0] !== "~") {
              scid = toIntIfInt(format);
            } else {
              scid = toIntIfInt(format.substring(1, format.length));
              paused = true;
            }
            return {
              scid,
              paused
            };
          });
        });
      };
    }
  });

  // node_modules/sdp-transform/lib/writer.js
  var require_writer = __commonJS({
    "node_modules/sdp-transform/lib/writer.js"(exports2, module) {
      var grammar = require_grammar();
      var formatRegExp = /%[sdv%]/g;
      var format = function(formatStr) {
        var i = 1;
        var args = arguments;
        var len = args.length;
        return formatStr.replace(formatRegExp, function(x) {
          if (i >= len) {
            return x;
          }
          var arg = args[i];
          i += 1;
          switch (x) {
            case "%%":
              return "%";
            case "%s":
              return String(arg);
            case "%d":
              return Number(arg);
            case "%v":
              return "";
          }
        });
      };
      var makeLine = function(type, obj, location) {
        var str = obj.format instanceof Function ? obj.format(obj.push ? location : location[obj.name]) : obj.format;
        var args = [type + "=" + str];
        if (obj.names) {
          for (var i = 0; i < obj.names.length; i += 1) {
            var n = obj.names[i];
            if (obj.name) {
              args.push(location[obj.name][n]);
            } else {
              args.push(location[obj.names[i]]);
            }
          }
        } else {
          args.push(location[obj.name]);
        }
        return format.apply(null, args);
      };
      var defaultOuterOrder = [
        "v",
        "o",
        "s",
        "i",
        "u",
        "e",
        "p",
        "c",
        "b",
        "t",
        "r",
        "z",
        "a"
      ];
      var defaultInnerOrder = ["i", "c", "b", "a"];
      module.exports = function(session, opts) {
        opts = opts || {};
        if (session.version == null) {
          session.version = 0;
        }
        if (session.name == null) {
          session.name = " ";
        }
        session.media.forEach(function(mLine) {
          if (mLine.payloads == null) {
            mLine.payloads = "";
          }
        });
        var outerOrder = opts.outerOrder || defaultOuterOrder;
        var innerOrder = opts.innerOrder || defaultInnerOrder;
        var sdp = [];
        outerOrder.forEach(function(type) {
          grammar[type].forEach(function(obj) {
            if (obj.name in session && session[obj.name] != null) {
              sdp.push(makeLine(type, obj, session));
            } else if (obj.push in session && session[obj.push] != null) {
              session[obj.push].forEach(function(el) {
                sdp.push(makeLine(type, obj, el));
              });
            }
          });
        });
        session.media.forEach(function(mLine) {
          sdp.push(makeLine("m", grammar.m[0], mLine));
          innerOrder.forEach(function(type) {
            grammar[type].forEach(function(obj) {
              if (obj.name in mLine && mLine[obj.name] != null) {
                sdp.push(makeLine(type, obj, mLine));
              } else if (obj.push in mLine && mLine[obj.push] != null) {
                mLine[obj.push].forEach(function(el) {
                  sdp.push(makeLine(type, obj, el));
                });
              }
            });
          });
        });
        return sdp.join("\r\n") + "\r\n";
      };
    }
  });

  // node_modules/sdp-transform/lib/index.js
  var require_lib = __commonJS({
    "node_modules/sdp-transform/lib/index.js"(exports2) {
      var parser = require_parser();
      var writer = require_writer();
      var grammar = require_grammar();
      exports2.grammar = grammar;
      exports2.write = writer;
      exports2.parse = parser.parse;
      exports2.parseParams = parser.parseParams;
      exports2.parseFmtpConfig = parser.parseFmtpConfig;
      exports2.parsePayloads = parser.parsePayloads;
      exports2.parseRemoteCandidates = parser.parseRemoteCandidates;
      exports2.parseImageAttributes = parser.parseImageAttributes;
      exports2.parseSimulcastStreamList = parser.parseSimulcastStreamList;
    }
  });

  // src/utils.ts
  var import_blueimp_md5 = __toESM(require_md5(), 1);
  var counter = 0;
  var uuid = () => {
    counter = (counter + 1) % Number.MAX_SAFE_INTEGER;
    const timePart = Date.now().toString(36);
    const countPart = counter.toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timePart}${countPart}${randomPart}`;
  };
  var branch = () => "z9hG4bK-" + uuid();
  var generateResponse = (sipInfo, endpoint, nonce) => {
    const ha1 = (0, import_blueimp_md5.default)(
      `${sipInfo.authorizationId}:${sipInfo.domain}:${sipInfo.password}`
    );
    const ha2 = (0, import_blueimp_md5.default)(endpoint);
    const response = (0, import_blueimp_md5.default)(`${ha1}:${nonce}:${ha2}`);
    return response;
  };
  var generateAuthorization = (sipInfo, nonce, method) => {
    const authObj = {
      "Digest algorithm": "MD5",
      username: sipInfo.authorizationId,
      realm: sipInfo.domain,
      nonce,
      uri: `sip:${sipInfo.domain}`,
      response: generateResponse(
        sipInfo,
        `${method}:sip:${sipInfo.domain}`,
        nonce
      )
    };
    return Object.entries(authObj).map(([key, value]) => `${key}="${value}"`).join(", ");
  };
  var withoutTag = (s) => s.replace(/;tag=.*$/, "");
  var extractAddress = (s) => s.match(/<(sip:.+?)>/)[1];
  var extractNumber = (s) => s.match(/<sip:(.+?)@/)[1];
  var extractTag = (peer) => peer.match(/;tag=(.*)/)[1];
  var fakeDomain = uuid() + ".invalid";
  var fakeEmail = uuid() + "@" + fakeDomain;

  // src/sip-message/index.ts
  var SipMessage = class _SipMessage {
    static fromString(str) {
      const sipMessage = new _SipMessage();
      const [init, ...body] = str.split("\r\n\r\n");
      sipMessage.body = body.join("\r\n\r\n");
      const [subject, ...headers] = init.split("\r\n");
      sipMessage.subject = subject;
      sipMessage.headers = Object.fromEntries(
        headers.map((line) => line.split(": "))
      );
      if (sipMessage.headers.To && !sipMessage.headers.To.includes(";tag=")) {
        sipMessage.headers.To += ";tag=" + uuid();
      }
      return sipMessage;
    }
    subject;
    headers;
    body;
    direction;
    constructor(subject = "", headers = {}, body = "") {
      this.subject = subject;
      this.headers = headers;
      this.body = body.trim().split(/[\r\n]+/).join("\r\n");
      if (this.body.length > 0) {
        this.body += "\r\n";
      }
    }
    toString() {
      const r = [
        this.subject,
        ...Object.keys(this.headers).map((key) => `${key}: ${this.headers[key]}`),
        "",
        this.body
      ].join("\r\n");
      return r;
    }
    get shortString() {
      return `${this.direction} - ${this.subject}`;
    }
  };
  var sip_message_default = SipMessage;

  // src/sip-message/outbound/index.ts
  var OutboundMessage = class extends sip_message_default {
    static fromString(str) {
      const sipMessage = sip_message_default.fromString(str);
      sipMessage.direction = "outbound";
      return sipMessage;
    }
    constructor(subject = "", headers = {}, body = "") {
      super(subject, headers, body);
      this.direction = "outbound";
      this.headers["Content-Length"] = this.body.length.toString();
      this.headers["User-Agent"] = "ringcentral-web-phone-2";
      this.headers["Max-Forwards"] = "70";
    }
  };
  var outbound_default = OutboundMessage;

  // src/sip-message/response-codes.ts
  var responseCodes = {
    100: "Trying",
    180: "Ringing",
    181: "Call is Being Forwarded",
    182: "Queued",
    183: "Session Progress",
    199: "Early Dialog Terminated",
    200: "OK",
    202: "Accepted",
    204: "No Notification",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Moved Temporarily",
    305: "Use Proxy",
    380: "Alternative Service",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Conditional Request Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Unsupported URI Scheme",
    417: "Unknown Resource-Priority",
    420: "Bad Extension",
    421: "Extension Required",
    422: "Session Interval Too Small",
    423: "Interval Too Brief",
    424: "Bad Location Information",
    425: "Bad Alert Message",
    428: "Use Identity Header",
    429: "Provide Referrer Identity",
    430: "Flow Failed",
    433: "Anonymity Disallowed",
    436: "Bad Identity-Info",
    437: "Unsupported Certificate",
    438: "Invalid Identity Header",
    439: "First Hop Lacks Outbound Support",
    440: "Max-Breadth Exceeded",
    469: "Bad Info Package",
    470: "Consent Needed",
    480: "Temporarily Unavailable",
    481: "Call/Transaction Does Not Exist",
    482: "Loop Detected",
    483: "Too Many Hops",
    484: "Address Incomplete",
    485: "Ambiguous",
    486: "Busy Here",
    487: "Request Terminated",
    488: "Not Acceptable Here",
    489: "Bad Event",
    491: "Request Pending",
    493: "Undecipherable",
    494: "Security Agreement Required",
    500: "Server Internal Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Server Time-out",
    505: "Version Not Supported",
    513: "Message Too Large",
    555: "Push Notification Service Not Supported",
    580: "Precondition Failure",
    600: "Busy Everywhere",
    603: "Decline",
    604: "Does Not Exist Anywhere",
    606: "Not Acceptable",
    607: "Unwanted",
    608: "Rejected"
  };
  var response_codes_default = responseCodes;

  // src/sip-message/outbound/response.ts
  var ResponseMessage = class extends outbound_default {
    constructor(inboundMessage, {
      responseCode,
      headers = {},
      body = ""
    }) {
      super(void 0, { ...headers }, body);
      this.subject = `SIP/2.0 ${responseCode} ${response_codes_default[responseCode]}`;
      const keys = ["Via", "From", "To", "Call-Id", "CSeq"];
      for (const key of keys) {
        if (inboundMessage.headers[key]) {
          this.headers[key] = inboundMessage.headers[key];
        }
      }
    }
  };
  var response_default = ResponseMessage;

  // src/sip-message/outbound/request.ts
  var cseq = Math.floor(Math.random() * 1e4);
  var RequestMessage = class _RequestMessage extends outbound_default {
    constructor(subject = "", headers = {}, body = "") {
      super(subject, headers, body);
      if (this.headers.CSeq === void 0) {
        this.newCseq();
      }
    }
    newCseq() {
      this.headers.CSeq = `${++cseq} ${this.subject.split(" ")[0]}`;
    }
    fork() {
      const newMessage = new _RequestMessage(
        this.subject,
        { ...this.headers },
        this.body
      );
      newMessage.newCseq();
      if (newMessage.headers.Via) {
        newMessage.headers.Via = newMessage.headers.Via.replace(
          /;branch=.+?$/,
          `;branch=${branch()}`
        );
      }
      return newMessage;
    }
  };
  var request_default = RequestMessage;

  // src/call-session/index.ts
  var import_sdp_transform = __toESM(require_lib(), 1);

  // src/event-emitter.ts
  var EventEmitter = class {
    // deno-lint-ignore no-explicit-any
    listeners = /* @__PURE__ */ new Map();
    // This is used to store temporary listeners that are only called once
    // deno-lint-ignore no-explicit-any
    tempListeners = /* @__PURE__ */ new Map();
    // deno-lint-ignore no-explicit-any
    on(eventName, listener) {
      if (!this.listeners.has(eventName)) {
        this.listeners.set(eventName, []);
      }
      this.listeners.get(eventName).push(listener);
    }
    // deno-lint-ignore no-explicit-any
    once(eventName, listener) {
      if (!this.tempListeners.has(eventName)) {
        this.tempListeners.set(eventName, []);
      }
      this.tempListeners.get(eventName).push(listener);
    }
    // deno-lint-ignore no-explicit-any
    off(eventName, listener) {
      let list = this.listeners.get(eventName);
      if (list) {
        this.listeners.set(
          eventName,
          list.filter((l) => l !== listener)
        );
      }
      list = this.tempListeners.get(eventName);
      if (list) {
        this.tempListeners.set(
          eventName,
          list.filter((l) => l !== listener)
        );
      }
    }
    // deno-lint-ignore no-explicit-any
    emit(eventName, ...args) {
      (this.listeners.get(eventName) ?? []).forEach(
        (listener) => listener(...args)
      );
      (this.tempListeners.get(eventName) ?? []).forEach(
        (listener) => listener(...args)
      );
      this.tempListeners.delete(eventName);
    }
    removeAllListeners() {
      this.listeners.clear();
      this.tempListeners.clear();
    }
  };
  var event_emitter_default = EventEmitter;

  // src/call-session/index.ts
  var DEFAULT_TRANSFER_TIMEOUT_MS = 1e4;
  var CallSession = class extends event_emitter_default {
    webPhone;
    sipMessage;
    localPeer;
    remotePeer;
    rtcPeerConnection;
    _mediaStream;
    audioElement;
    state = "init";
    direction;
    inputDeviceId;
    outputDeviceId;
    reqid = 1;
    sdpVersion = 1;
    constructor(webPhone) {
      super();
      this.webPhone = webPhone;
    }
    get mediaStream() {
      return this._mediaStream;
    }
    set mediaStream(stream) {
      this._mediaStream = stream;
      this.emit("mediaStreamSet", stream);
    }
    // for inbound call, this.sipMessage?.headers["Call-Id"] will be the call id
    // for outbound call, this._callId will be the call id. Once the call session is out of "init" state, this.sipMessage will be set
    _callId = uuid();
    get callId() {
      return this.sipMessage?.headers["Call-Id"] ?? this._callId;
    }
    get sessionId() {
      return this.sipMessage?.headers["p-rc-api-ids"].match(
        /session-id=(s-[0-9a-fz]+?)$/
      )?.[1];
    }
    get partyId() {
      return this.sipMessage?.headers["p-rc-api-ids"].match(
        /party-id=(p-[0-9a-fz]+?-\d);/
      )?.[1];
    }
    get remoteNumber() {
      return extractNumber(this.remotePeer);
    }
    get localNumber() {
      return this.localPeer ? extractNumber(this.localPeer) : this.webPhone.sipInfo.username;
    }
    get remoteTag() {
      return extractTag(this.remotePeer);
    }
    get localTag() {
      return extractTag(this.localPeer);
    }
    get isConference() {
      return this.remotePeer ? extractNumber(this.remotePeer).startsWith("conf_") : false;
    }
    async init() {
      this.rtcPeerConnection = new RTCPeerConnection({
        iceServers: this.webPhone.sipInfo.stunServers?.map((url) => ({
          urls: `stun:${url}`
        })) ?? []
      });
      const tempStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      tempStream.getTracks().forEach((track) => track.stop());
      this.inputDeviceId = await this.webPhone.deviceManager.getInputDeviceId();
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: { deviceId: { exact: this.inputDeviceId } }
      });
      this.mediaStream.getAudioTracks().forEach((track) => {
        const rtcRtpSender = this.rtcPeerConnection.addTrack(track);
        const params = rtcRtpSender.getParameters();
        if (!params.encodings || params.encodings.length === 0) {
          params.encodings = [{}];
        }
        params.encodings.forEach((encoding) => {
          encoding.priority = "high";
        });
        rtcRtpSender.setParameters(params);
      });
      this.rtcPeerConnection.ontrack = async (event) => {
        const remoteStream = event.streams[0];
        this.audioElement = document.createElement("audio");
        this.audioElement.hidden = true;
        this.audioElement.autoplay = true;
        this.audioElement.srcObject = remoteStream;
        this.outputDeviceId = await this.webPhone.deviceManager.getOutputDeviceId();
        if (this.outputDeviceId) {
          this.audioElement.setSinkId(this.outputDeviceId);
        }
      };
    }
    async changeInputDevice(deviceId) {
      this.inputDeviceId = deviceId;
      this.mediaStream?.getAudioTracks().forEach((track) => track.stop());
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: { deviceId: { exact: deviceId } }
      });
      const newAudioTrack = this.mediaStream.getAudioTracks()[0];
      const sender = this.rtcPeerConnection.getSenders().find((sender2) => sender2.track?.kind === "audio");
      if (sender) {
        sender.replaceTrack(newAudioTrack);
      }
    }
    async changeOutputDevice(deviceId) {
      this.outputDeviceId = deviceId;
      if (deviceId) {
        await this.audioElement.setSinkId(deviceId);
      }
    }
    async transfer(target, timeout = DEFAULT_TRANSFER_TIMEOUT_MS) {
      return await this._transfer(`sip:${target}@sip.ringcentral.com`, timeout);
    }
    async warmTransfer(target, options) {
      await this.hold();
      const newSession = await this.webPhone.call(target, options?.callerId);
      return {
        // complete the transfer
        complete: async () => {
          await this.completeWarmTransfer(
            newSession,
            options?.timeout ?? DEFAULT_TRANSFER_TIMEOUT_MS
          );
        },
        // cancel the transfer
        cancel: async () => {
          await newSession.hangup();
          await this.unhold();
        },
        newSession
      };
    }
    async completeWarmTransfer(existingSession, timeout = DEFAULT_TRANSFER_TIMEOUT_MS) {
      const target = existingSession.remoteNumber;
      await this._transfer(
        `"${target}@sip.ringcentral.com" <sip:${target}@sip.ringcentral.com;transport=wss?Replaces=${existingSession.callId}%3Bto-tag%3D${existingSession.remoteTag}%3Bfrom-tag%3D${existingSession.localTag}>`,
        timeout
      );
    }
    async hangup() {
      const requestMessage = new request_default(
        `BYE sip:${this.webPhone.sipInfo.domain} SIP/2.0`,
        {
          "Call-Id": this.callId,
          From: this.localPeer,
          To: this.remotePeer,
          Via: `SIP/2.0/WSS ${fakeDomain};branch=${branch()}`
        }
      );
      await this.webPhone.sipClient.request(requestMessage);
    }
    async startRecording() {
      return await this.sendJsonMessage("startcallrecord");
    }
    async stopRecording() {
      return await this.sendJsonMessage("stopcallrecord");
    }
    async flip(target) {
      const flipResult = await this.sendJsonMessage("callflip", {
        target
      });
      return flipResult;
    }
    async park() {
      const parkResult = await this.sendJsonMessage("callpark");
      if (parkResult.code === 0) {
        await this.hangup();
      }
      return parkResult;
    }
    async hold() {
      await this.toggleReceive(false);
    }
    async unhold() {
      await this.toggleReceive(true);
    }
    mute() {
      this.toggleTrack(false);
    }
    unmute() {
      this.toggleTrack(true);
    }
    sendDtmf(tones, duration, interToneGap) {
      for (const sender of this.rtcPeerConnection.getSenders()) {
        if (sender.dtmf?.canInsertDTMF) {
          sender.dtmf?.insertDTMF(tones, duration, interToneGap);
        }
      }
    }
    dispose() {
      this.rtcPeerConnection?.close();
      this.mediaStream?.getTracks().forEach((track) => track.stop());
      if (this.audioElement) {
        this.audioElement.srcObject = null;
      }
      this.state = "disposed";
      this.emit("disposed");
      this.removeAllListeners();
    }
    // for mute/unmute
    toggleTrack(enabled) {
      this.rtcPeerConnection.getSenders().forEach((sender) => {
        if (sender.track) {
          sender.track.enabled = enabled;
        }
      });
    }
    // send re-INVITE.
    // If the call is on hold and you don't want to unhold it, set toReceive to false
    async reInvite(toReceive = true) {
      const offer = await this.rtcPeerConnection.createOffer({
        iceRestart: true
      });
      await this.rtcPeerConnection.setLocalDescription(offer);
      await new Promise((resolve) => {
        this.rtcPeerConnection.onicecandidate = (event) => {
          if (event.candidate === null) {
            resolve(true);
          }
        };
        setTimeout(() => resolve(false), 2e3);
      });
      let sdp = this.rtcPeerConnection.localDescription.sdp;
      if (!toReceive) {
        sdp = sdp.replace(/a=sendrecv/g, "a=sendonly");
      }
      const requestMessage = new request_default(
        `INVITE ${extractAddress(this.remotePeer)} SIP/2.0`,
        {
          "Call-Id": this.callId,
          From: this.localPeer,
          To: this.remotePeer,
          Via: `SIP/2.0/WSS ${fakeDomain};branch=${branch()}`,
          "Content-Type": "application/sdp"
        },
        sdp
      );
      const replyMessage = await this.webPhone.sipClient.request(requestMessage);
      await this.rtcPeerConnection.setRemoteDescription({
        type: "answer",
        sdp: replyMessage.body
      });
      const ackMessage = new request_default(
        `ACK ${extractAddress(this.remotePeer)} SIP/2.0`,
        {
          "Call-Id": this.callId,
          From: this.localPeer,
          To: this.remotePeer,
          Via: replyMessage.headers.Via,
          CSeq: replyMessage.headers.CSeq.replace(" INVITE", " ACK")
        }
      );
      await this.webPhone.sipClient.reply(ackMessage);
    }
    // handle re-INVITE from SIP server
    async handleReInvite(reInviteMessage) {
      this.sipMessage = reInviteMessage;
      await this.rtcPeerConnection.setRemoteDescription({
        type: "offer",
        sdp: reInviteMessage.body
      });
      const answer = await this.rtcPeerConnection.createAnswer();
      await this.rtcPeerConnection.setLocalDescription(answer);
      await new Promise((resolve) => {
        this.rtcPeerConnection.onicecandidate = (event) => {
          if (event.candidate === null) {
            resolve(true);
          }
        };
        setTimeout(() => resolve(false), 2e3);
      });
      const newMessage = new response_default(this.sipMessage, {
        responseCode: 200,
        headers: {
          "Content-Type": "application/sdp"
        },
        body: this.rtcPeerConnection.localDescription.sdp
      });
      await this.webPhone.sipClient.reply(newMessage);
    }
    // for hold/unhold
    // toggle between a=sendrecv and a=sendonly
    async toggleReceive(toReceive) {
      if (!this.rtcPeerConnection?.localDescription) {
        return;
      }
      let sdp = this.rtcPeerConnection.localDescription.sdp;
      if (!toReceive) {
        sdp = sdp.replace(/a=sendrecv/g, "a=sendonly");
      }
      const res = import_sdp_transform.default.parse(sdp);
      this.sdpVersion = Math.max(this.sdpVersion, res.origin.sessionVersion + 1);
      res.origin.sessionVersion = this.sdpVersion++;
      sdp = import_sdp_transform.default.write(res);
      const requestMessage = new request_default(
        `INVITE ${extractAddress(this.remotePeer)} SIP/2.0`,
        {
          "Call-Id": this.callId,
          From: this.localPeer,
          To: this.remotePeer,
          Via: `SIP/2.0/WSS ${fakeDomain};branch=${branch()}`,
          "Content-Type": "application/sdp"
        },
        sdp
      );
      const replyMessage = await this.webPhone.sipClient.request(requestMessage);
      const ackMessage = new request_default(
        `ACK ${extractAddress(this.remotePeer)} SIP/2.0`,
        {
          "Call-Id": this.callId,
          From: this.localPeer,
          To: this.remotePeer,
          Via: replyMessage.headers.Via,
          CSeq: replyMessage.headers.CSeq.replace(" INVITE", " ACK")
        }
      );
      await this.webPhone.sipClient.reply(ackMessage);
    }
    async sendJsonMessage(command, args = {}) {
      const reqid = this.reqid++;
      const jsonBody = JSON.stringify({ request: { reqid, command, ...args } });
      const requestMessage = new request_default(
        `INFO sip:${this.webPhone.sipInfo.domain} SIP/2.0`,
        {
          "Call-Id": this.callId,
          From: this.localPeer,
          To: this.remotePeer,
          Via: `SIP/2.0/WSS ${fakeDomain};branch=${branch()}`,
          "Content-Type": "application/json;charset=utf-8"
        },
        jsonBody
      );
      await this.webPhone.sipClient.request(requestMessage);
      return new Promise((resolve) => {
        const resultHandler = (inboundMessage) => {
          if (!inboundMessage.subject.startsWith("INFO sip:")) {
            return;
          }
          const response = JSON.parse(inboundMessage.body).response;
          if (!response || response.reqid !== reqid || response.command !== command) {
            return;
          }
          this.webPhone.sipClient.off("inboundMessage", resultHandler);
          resolve(response.result);
        };
        this.webPhone.sipClient.on("inboundMessage", resultHandler);
      });
    }
    async _transfer(uri, timeout = DEFAULT_TRANSFER_TIMEOUT_MS) {
      const requestMessage = new request_default(
        `REFER ${extractAddress(this.remotePeer)} SIP/2.0`,
        {
          "Call-Id": this.callId,
          From: this.localPeer,
          To: this.remotePeer,
          Via: `SIP/2.0/WSS ${fakeDomain};branch=${branch()}`,
          "Refer-To": uri,
          "Referred-By": `<${extractAddress(this.localPeer)}>`
        }
      );
      await this.webPhone.sipClient.request(requestMessage);
      let timeoutId;
      return new Promise((resolve, reject) => {
        const handler = (inboundMessage) => {
          if (inboundMessage.subject.startsWith("BYE sip:") && inboundMessage.headers["Call-Id"] === this.callId) {
            clearTimeout(timeoutId);
            this.webPhone.sipClient.off("inboundMessage", handler);
            resolve();
          }
        };
        timeoutId = setTimeout(() => {
          this.webPhone.sipClient.off("inboundMessage", handler);
          reject(
            new Error(
              `"REFER ${extractAddress(
                this.remotePeer
              )} SIP/2.0" request timed out. It often means either you don't have permission or the call is not in a correct state.`
            )
          );
        }, timeout);
        this.webPhone.sipClient.on("inboundMessage", handler);
      });
    }
  };
  var call_session_default = CallSession;

  // node_modules/fast-xml-parser/src/util.js
  var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
  var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
  var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
  var regexName = new RegExp("^" + nameRegexp + "$");
  function getAllMatches(string, regex) {
    const matches = [];
    let match = regex.exec(string);
    while (match) {
      const allmatches = [];
      allmatches.startIndex = regex.lastIndex - match[0].length;
      const len = match.length;
      for (let index = 0; index < len; index++) {
        allmatches.push(match[index]);
      }
      matches.push(allmatches);
      match = regex.exec(string);
    }
    return matches;
  }
  var isName = function(string) {
    const match = regexName.exec(string);
    return !(match === null || typeof match === "undefined");
  };
  function isExist(v) {
    return typeof v !== "undefined";
  }
  var DANGEROUS_PROPERTY_NAMES = [
    // '__proto__',
    // 'constructor',
    // 'prototype',
    "hasOwnProperty",
    "toString",
    "valueOf",
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__"
  ];
  var criticalProperties = ["__proto__", "constructor", "prototype"];

  // node_modules/fast-xml-parser/src/validator.js
  var defaultOptions = {
    allowBooleanAttributes: false,
    //A tag can have attributes without any value
    unpairedTags: []
  };
  function validate(xmlData, options) {
    options = Object.assign({}, defaultOptions, options);
    const tags = [];
    let tagFound = false;
    let reachedRoot = false;
    if (xmlData[0] === "\uFEFF") {
      xmlData = xmlData.substr(1);
    }
    for (let i = 0; i < xmlData.length; i++) {
      if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
        i += 2;
        i = readPI(xmlData, i);
        if (i.err) return i;
      } else if (xmlData[i] === "<") {
        let tagStartPos = i;
        i++;
        if (xmlData[i] === "!") {
          i = readCommentAndCDATA(xmlData, i);
          continue;
        } else {
          let closingTag = false;
          if (xmlData[i] === "/") {
            closingTag = true;
            i++;
          }
          let tagName = "";
          for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
            tagName += xmlData[i];
          }
          tagName = tagName.trim();
          if (tagName[tagName.length - 1] === "/") {
            tagName = tagName.substring(0, tagName.length - 1);
            i--;
          }
          if (!validateTagName(tagName)) {
            let msg;
            if (tagName.trim().length === 0) {
              msg = "Invalid space after '<'.";
            } else {
              msg = "Tag '" + tagName + "' is an invalid name.";
            }
            return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
          }
          const result = readAttributeStr(xmlData, i);
          if (result === false) {
            return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
          }
          let attrStr = result.value;
          i = result.index;
          if (attrStr[attrStr.length - 1] === "/") {
            const attrStrStart = i - attrStr.length;
            attrStr = attrStr.substring(0, attrStr.length - 1);
            const isValid = validateAttributeString(attrStr, options);
            if (isValid === true) {
              tagFound = true;
            } else {
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
            }
          } else if (closingTag) {
            if (!result.tagClosed) {
              return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
            } else if (attrStr.trim().length > 0) {
              return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
            } else if (tags.length === 0) {
              return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
            } else {
              const otg = tags.pop();
              if (tagName !== otg.tagName) {
                let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                return getErrorObject(
                  "InvalidTag",
                  "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.",
                  getLineNumberForPosition(xmlData, tagStartPos)
                );
              }
              if (tags.length == 0) {
                reachedRoot = true;
              }
            }
          } else {
            const isValid = validateAttributeString(attrStr, options);
            if (isValid !== true) {
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
            }
            if (reachedRoot === true) {
              return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
            } else if (options.unpairedTags.indexOf(tagName) !== -1) {
            } else {
              tags.push({ tagName, tagStartPos });
            }
            tagFound = true;
          }
          for (i++; i < xmlData.length; i++) {
            if (xmlData[i] === "<") {
              if (xmlData[i + 1] === "!") {
                i++;
                i = readCommentAndCDATA(xmlData, i);
                continue;
              } else if (xmlData[i + 1] === "?") {
                i = readPI(xmlData, ++i);
                if (i.err) return i;
              } else {
                break;
              }
            } else if (xmlData[i] === "&") {
              const afterAmp = validateAmpersand(xmlData, i);
              if (afterAmp == -1)
                return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
              i = afterAmp;
            } else {
              if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
              }
            }
          }
          if (xmlData[i] === "<") {
            i--;
          }
        }
      } else {
        if (isWhiteSpace(xmlData[i])) {
          continue;
        }
        return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
      }
    }
    if (!tagFound) {
      return getErrorObject("InvalidXml", "Start tag expected.", 1);
    } else if (tags.length == 1) {
      return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
    } else if (tags.length > 0) {
      return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
    }
    return true;
  }
  function isWhiteSpace(char) {
    return char === " " || char === "	" || char === "\n" || char === "\r";
  }
  function readPI(xmlData, i) {
    const start = i;
    for (; i < xmlData.length; i++) {
      if (xmlData[i] == "?" || xmlData[i] == " ") {
        const tagname = xmlData.substr(start, i - start);
        if (i > 5 && tagname === "xml") {
          return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
        } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
          i++;
          break;
        } else {
          continue;
        }
      }
    }
    return i;
  }
  function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
      for (i += 3; i < xmlData.length; i++) {
        if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
          i += 2;
          break;
        }
      }
    } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
      let angleBracketsCount = 1;
      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === "<") {
          angleBracketsCount++;
        } else if (xmlData[i] === ">") {
          angleBracketsCount--;
          if (angleBracketsCount === 0) {
            break;
          }
        }
      }
    } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
          i += 2;
          break;
        }
      }
    }
    return i;
  }
  var doubleQuote = '"';
  var singleQuote = "'";
  function readAttributeStr(xmlData, i) {
    let attrStr = "";
    let startChar = "";
    let tagClosed = false;
    for (; i < xmlData.length; i++) {
      if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
        if (startChar === "") {
          startChar = xmlData[i];
        } else if (startChar !== xmlData[i]) {
        } else {
          startChar = "";
        }
      } else if (xmlData[i] === ">") {
        if (startChar === "") {
          tagClosed = true;
          break;
        }
      }
      attrStr += xmlData[i];
    }
    if (startChar !== "") {
      return false;
    }
    return {
      value: attrStr,
      index: i,
      tagClosed
    };
  }
  var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
  function validateAttributeString(attrStr, options) {
    const matches = getAllMatches(attrStr, validAttrStrRegxp);
    const attrNames = {};
    for (let i = 0; i < matches.length; i++) {
      if (matches[i][1].length === 0) {
        return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
      } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
        return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
      } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
        return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
      }
      const attrName = matches[i][2];
      if (!validateAttrName(attrName)) {
        return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
      }
      if (!Object.prototype.hasOwnProperty.call(attrNames, attrName)) {
        attrNames[attrName] = 1;
      } else {
        return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
      }
    }
    return true;
  }
  function validateNumberAmpersand(xmlData, i) {
    let re = /\d/;
    if (xmlData[i] === "x") {
      i++;
      re = /[\da-fA-F]/;
    }
    for (; i < xmlData.length; i++) {
      if (xmlData[i] === ";")
        return i;
      if (!xmlData[i].match(re))
        break;
    }
    return -1;
  }
  function validateAmpersand(xmlData, i) {
    i++;
    if (xmlData[i] === ";")
      return -1;
    if (xmlData[i] === "#") {
      i++;
      return validateNumberAmpersand(xmlData, i);
    }
    let count = 0;
    for (; i < xmlData.length; i++, count++) {
      if (xmlData[i].match(/\w/) && count < 20)
        continue;
      if (xmlData[i] === ";")
        break;
      return -1;
    }
    return i;
  }
  function getErrorObject(code, message, lineNumber) {
    return {
      err: {
        code,
        msg: message,
        line: lineNumber.line || lineNumber,
        col: lineNumber.col
      }
    };
  }
  function validateAttrName(attrName) {
    return isName(attrName);
  }
  function validateTagName(tagname) {
    return isName(tagname);
  }
  function getLineNumberForPosition(xmlData, index) {
    const lines = xmlData.substring(0, index).split(/\r?\n/);
    return {
      line: lines.length,
      // column number is last line's length + 1, because column numbering starts at 1:
      col: lines[lines.length - 1].length + 1
    };
  }
  function getPositionFromMatch(match) {
    return match.startIndex + match[1].length;
  }

  // node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
  var defaultOnDangerousProperty = (name) => {
    if (DANGEROUS_PROPERTY_NAMES.includes(name)) {
      return "__" + name;
    }
    return name;
  };
  var defaultOptions2 = {
    preserveOrder: false,
    attributeNamePrefix: "@_",
    attributesGroupName: false,
    textNodeName: "#text",
    ignoreAttributes: true,
    removeNSPrefix: false,
    // remove NS from tag name or attribute name if true
    allowBooleanAttributes: false,
    //a tag can have attributes without any value
    //ignoreRootElement : false,
    parseTagValue: true,
    parseAttributeValue: false,
    trimValues: true,
    //Trim string values of tag and attributes
    cdataPropName: false,
    numberParseOptions: {
      hex: true,
      leadingZeros: true,
      eNotation: true
    },
    tagValueProcessor: function(tagName, val) {
      return val;
    },
    attributeValueProcessor: function(attrName, val) {
      return val;
    },
    stopNodes: [],
    //nested tags will not be parsed even for errors
    alwaysCreateTextNode: false,
    isArray: () => false,
    commentPropName: false,
    unpairedTags: [],
    processEntities: true,
    htmlEntities: false,
    ignoreDeclaration: false,
    ignorePiTags: false,
    transformTagName: false,
    transformAttributeName: false,
    updateTag: function(tagName, jPath, attrs) {
      return tagName;
    },
    // skipEmptyListItem: false
    captureMetaData: false,
    maxNestedTags: 100,
    strictReservedNames: true,
    jPath: true,
    // if true, pass jPath string to callbacks; if false, pass matcher instance
    onDangerousProperty: defaultOnDangerousProperty
  };
  function validatePropertyName(propertyName, optionName) {
    if (typeof propertyName !== "string") {
      return;
    }
    const normalized = propertyName.toLowerCase();
    if (DANGEROUS_PROPERTY_NAMES.some((dangerous) => normalized === dangerous.toLowerCase())) {
      throw new Error(
        `[SECURITY] Invalid ${optionName}: "${propertyName}" is a reserved JavaScript keyword that could cause prototype pollution`
      );
    }
    if (criticalProperties.some((dangerous) => normalized === dangerous.toLowerCase())) {
      throw new Error(
        `[SECURITY] Invalid ${optionName}: "${propertyName}" is a reserved JavaScript keyword that could cause prototype pollution`
      );
    }
  }
  function normalizeProcessEntities(value) {
    if (typeof value === "boolean") {
      return {
        enabled: value,
        // true or false
        maxEntitySize: 1e4,
        maxExpansionDepth: 10,
        maxTotalExpansions: 1e3,
        maxExpandedLength: 1e5,
        maxEntityCount: 100,
        allowedTags: null,
        tagFilter: null
      };
    }
    if (typeof value === "object" && value !== null) {
      return {
        enabled: value.enabled !== false,
        maxEntitySize: Math.max(1, value.maxEntitySize ?? 1e4),
        maxExpansionDepth: Math.max(1, value.maxExpansionDepth ?? 1e4),
        maxTotalExpansions: Math.max(1, value.maxTotalExpansions ?? Infinity),
        maxExpandedLength: Math.max(1, value.maxExpandedLength ?? 1e5),
        maxEntityCount: Math.max(1, value.maxEntityCount ?? 1e3),
        allowedTags: value.allowedTags ?? null,
        tagFilter: value.tagFilter ?? null
      };
    }
    return normalizeProcessEntities(true);
  }
  var buildOptions = function(options) {
    const built = Object.assign({}, defaultOptions2, options);
    const propertyNameOptions = [
      { value: built.attributeNamePrefix, name: "attributeNamePrefix" },
      { value: built.attributesGroupName, name: "attributesGroupName" },
      { value: built.textNodeName, name: "textNodeName" },
      { value: built.cdataPropName, name: "cdataPropName" },
      { value: built.commentPropName, name: "commentPropName" }
    ];
    for (const { value, name } of propertyNameOptions) {
      if (value) {
        validatePropertyName(value, name);
      }
    }
    if (built.onDangerousProperty === null) {
      built.onDangerousProperty = defaultOnDangerousProperty;
    }
    built.processEntities = normalizeProcessEntities(built.processEntities);
    built.unpairedTagsSet = new Set(built.unpairedTags);
    if (built.stopNodes && Array.isArray(built.stopNodes)) {
      built.stopNodes = built.stopNodes.map((node) => {
        if (typeof node === "string" && node.startsWith("*.")) {
          return ".." + node.substring(2);
        }
        return node;
      });
    }
    return built;
  };

  // node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
  var METADATA_SYMBOL;
  if (typeof Symbol !== "function") {
    METADATA_SYMBOL = "@@xmlMetadata";
  } else {
    METADATA_SYMBOL = /* @__PURE__ */ Symbol("XML Node Metadata");
  }
  var XmlNode = class {
    constructor(tagname) {
      this.tagname = tagname;
      this.child = [];
      this[":@"] = /* @__PURE__ */ Object.create(null);
    }
    add(key, val) {
      if (key === "__proto__") key = "#__proto__";
      this.child.push({ [key]: val });
    }
    addChild(node, startIndex) {
      if (node.tagname === "__proto__") node.tagname = "#__proto__";
      if (node[":@"] && Object.keys(node[":@"]).length > 0) {
        this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
      } else {
        this.child.push({ [node.tagname]: node.child });
      }
      if (startIndex !== void 0) {
        this.child[this.child.length - 1][METADATA_SYMBOL] = { startIndex };
      }
    }
    /** symbol used for metadata */
    static getMetaDataSymbol() {
      return METADATA_SYMBOL;
    }
  };

  // node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
  var DocTypeReader = class {
    constructor(options) {
      this.suppressValidationErr = !options;
      this.options = options;
    }
    readDocType(xmlData, i) {
      const entities = /* @__PURE__ */ Object.create(null);
      let entityCount = 0;
      if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
        i = i + 9;
        let angleBracketsCount = 1;
        let hasBody = false, comment = false;
        let exp = "";
        for (; i < xmlData.length; i++) {
          if (xmlData[i] === "<" && !comment) {
            if (hasBody && hasSeq(xmlData, "!ENTITY", i)) {
              i += 7;
              let entityName, val;
              [entityName, val, i] = this.readEntityExp(xmlData, i + 1, this.suppressValidationErr);
              if (val.indexOf("&") === -1) {
                if (this.options.enabled !== false && this.options.maxEntityCount != null && entityCount >= this.options.maxEntityCount) {
                  throw new Error(
                    `Entity count (${entityCount + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`
                  );
                }
                const escaped = entityName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                entities[entityName] = {
                  regx: RegExp(`&${escaped};`, "g"),
                  val
                };
                entityCount++;
              }
            } else if (hasBody && hasSeq(xmlData, "!ELEMENT", i)) {
              i += 8;
              const { index } = this.readElementExp(xmlData, i + 1);
              i = index;
            } else if (hasBody && hasSeq(xmlData, "!ATTLIST", i)) {
              i += 8;
            } else if (hasBody && hasSeq(xmlData, "!NOTATION", i)) {
              i += 9;
              const { index } = this.readNotationExp(xmlData, i + 1, this.suppressValidationErr);
              i = index;
            } else if (hasSeq(xmlData, "!--", i)) comment = true;
            else throw new Error(`Invalid DOCTYPE`);
            angleBracketsCount++;
            exp = "";
          } else if (xmlData[i] === ">") {
            if (comment) {
              if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
                comment = false;
                angleBracketsCount--;
              }
            } else {
              angleBracketsCount--;
            }
            if (angleBracketsCount === 0) {
              break;
            }
          } else if (xmlData[i] === "[") {
            hasBody = true;
          } else {
            exp += xmlData[i];
          }
        }
        if (angleBracketsCount !== 0) {
          throw new Error(`Unclosed DOCTYPE`);
        }
      } else {
        throw new Error(`Invalid Tag instead of DOCTYPE`);
      }
      return { entities, i };
    }
    readEntityExp(xmlData, i) {
      i = skipWhitespace(xmlData, i);
      const startIndex = i;
      while (i < xmlData.length && !/\s/.test(xmlData[i]) && xmlData[i] !== '"' && xmlData[i] !== "'") {
        i++;
      }
      let entityName = xmlData.substring(startIndex, i);
      validateEntityName(entityName);
      i = skipWhitespace(xmlData, i);
      if (!this.suppressValidationErr) {
        if (xmlData.substring(i, i + 6).toUpperCase() === "SYSTEM") {
          throw new Error("External entities are not supported");
        } else if (xmlData[i] === "%") {
          throw new Error("Parameter entities are not supported");
        }
      }
      let entityValue = "";
      [i, entityValue] = this.readIdentifierVal(xmlData, i, "entity");
      if (this.options.enabled !== false && this.options.maxEntitySize != null && entityValue.length > this.options.maxEntitySize) {
        throw new Error(
          `Entity "${entityName}" size (${entityValue.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`
        );
      }
      i--;
      return [entityName, entityValue, i];
    }
    readNotationExp(xmlData, i) {
      i = skipWhitespace(xmlData, i);
      const startIndex = i;
      while (i < xmlData.length && !/\s/.test(xmlData[i])) {
        i++;
      }
      let notationName = xmlData.substring(startIndex, i);
      !this.suppressValidationErr && validateEntityName(notationName);
      i = skipWhitespace(xmlData, i);
      const identifierType = xmlData.substring(i, i + 6).toUpperCase();
      if (!this.suppressValidationErr && identifierType !== "SYSTEM" && identifierType !== "PUBLIC") {
        throw new Error(`Expected SYSTEM or PUBLIC, found "${identifierType}"`);
      }
      i += identifierType.length;
      i = skipWhitespace(xmlData, i);
      let publicIdentifier = null;
      let systemIdentifier = null;
      if (identifierType === "PUBLIC") {
        [i, publicIdentifier] = this.readIdentifierVal(xmlData, i, "publicIdentifier");
        i = skipWhitespace(xmlData, i);
        if (xmlData[i] === '"' || xmlData[i] === "'") {
          [i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
        }
      } else if (identifierType === "SYSTEM") {
        [i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
        if (!this.suppressValidationErr && !systemIdentifier) {
          throw new Error("Missing mandatory system identifier for SYSTEM notation");
        }
      }
      return { notationName, publicIdentifier, systemIdentifier, index: --i };
    }
    readIdentifierVal(xmlData, i, type) {
      let identifierVal = "";
      const startChar = xmlData[i];
      if (startChar !== '"' && startChar !== "'") {
        throw new Error(`Expected quoted string, found "${startChar}"`);
      }
      i++;
      const startIndex = i;
      while (i < xmlData.length && xmlData[i] !== startChar) {
        i++;
      }
      identifierVal = xmlData.substring(startIndex, i);
      if (xmlData[i] !== startChar) {
        throw new Error(`Unterminated ${type} value`);
      }
      i++;
      return [i, identifierVal];
    }
    readElementExp(xmlData, i) {
      i = skipWhitespace(xmlData, i);
      const startIndex = i;
      while (i < xmlData.length && !/\s/.test(xmlData[i])) {
        i++;
      }
      let elementName = xmlData.substring(startIndex, i);
      if (!this.suppressValidationErr && !isName(elementName)) {
        throw new Error(`Invalid element name: "${elementName}"`);
      }
      i = skipWhitespace(xmlData, i);
      let contentModel = "";
      if (xmlData[i] === "E" && hasSeq(xmlData, "MPTY", i)) i += 4;
      else if (xmlData[i] === "A" && hasSeq(xmlData, "NY", i)) i += 2;
      else if (xmlData[i] === "(") {
        i++;
        const startIndex2 = i;
        while (i < xmlData.length && xmlData[i] !== ")") {
          i++;
        }
        contentModel = xmlData.substring(startIndex2, i);
        if (xmlData[i] !== ")") {
          throw new Error("Unterminated content model");
        }
      } else if (!this.suppressValidationErr) {
        throw new Error(`Invalid Element Expression, found "${xmlData[i]}"`);
      }
      return {
        elementName,
        contentModel: contentModel.trim(),
        index: i
      };
    }
    readAttlistExp(xmlData, i) {
      i = skipWhitespace(xmlData, i);
      let startIndex = i;
      while (i < xmlData.length && !/\s/.test(xmlData[i])) {
        i++;
      }
      let elementName = xmlData.substring(startIndex, i);
      validateEntityName(elementName);
      i = skipWhitespace(xmlData, i);
      startIndex = i;
      while (i < xmlData.length && !/\s/.test(xmlData[i])) {
        i++;
      }
      let attributeName = xmlData.substring(startIndex, i);
      if (!validateEntityName(attributeName)) {
        throw new Error(`Invalid attribute name: "${attributeName}"`);
      }
      i = skipWhitespace(xmlData, i);
      let attributeType = "";
      if (xmlData.substring(i, i + 8).toUpperCase() === "NOTATION") {
        attributeType = "NOTATION";
        i += 8;
        i = skipWhitespace(xmlData, i);
        if (xmlData[i] !== "(") {
          throw new Error(`Expected '(', found "${xmlData[i]}"`);
        }
        i++;
        let allowedNotations = [];
        while (i < xmlData.length && xmlData[i] !== ")") {
          const startIndex2 = i;
          while (i < xmlData.length && xmlData[i] !== "|" && xmlData[i] !== ")") {
            i++;
          }
          let notation = xmlData.substring(startIndex2, i);
          notation = notation.trim();
          if (!validateEntityName(notation)) {
            throw new Error(`Invalid notation name: "${notation}"`);
          }
          allowedNotations.push(notation);
          if (xmlData[i] === "|") {
            i++;
            i = skipWhitespace(xmlData, i);
          }
        }
        if (xmlData[i] !== ")") {
          throw new Error("Unterminated list of notations");
        }
        i++;
        attributeType += " (" + allowedNotations.join("|") + ")";
      } else {
        const startIndex2 = i;
        while (i < xmlData.length && !/\s/.test(xmlData[i])) {
          i++;
        }
        attributeType += xmlData.substring(startIndex2, i);
        const validTypes = ["CDATA", "ID", "IDREF", "IDREFS", "ENTITY", "ENTITIES", "NMTOKEN", "NMTOKENS"];
        if (!this.suppressValidationErr && !validTypes.includes(attributeType.toUpperCase())) {
          throw new Error(`Invalid attribute type: "${attributeType}"`);
        }
      }
      i = skipWhitespace(xmlData, i);
      let defaultValue = "";
      if (xmlData.substring(i, i + 8).toUpperCase() === "#REQUIRED") {
        defaultValue = "#REQUIRED";
        i += 8;
      } else if (xmlData.substring(i, i + 7).toUpperCase() === "#IMPLIED") {
        defaultValue = "#IMPLIED";
        i += 7;
      } else {
        [i, defaultValue] = this.readIdentifierVal(xmlData, i, "ATTLIST");
      }
      return {
        elementName,
        attributeName,
        attributeType,
        defaultValue,
        index: i
      };
    }
  };
  var skipWhitespace = (data, index) => {
    while (index < data.length && /\s/.test(data[index])) {
      index++;
    }
    return index;
  };
  function hasSeq(data, seq, i) {
    for (let j = 0; j < seq.length; j++) {
      if (seq[j] !== data[i + j + 1]) return false;
    }
    return true;
  }
  function validateEntityName(name) {
    if (isName(name))
      return name;
    else
      throw new Error(`Invalid entity name ${name}`);
  }

  // node_modules/strnum/strnum.js
  var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
  var numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
  var consider = {
    hex: true,
    // oct: false,
    leadingZeros: true,
    decimalPoint: ".",
    eNotation: true,
    //skipLike: /regex/,
    infinity: "original"
    // "null", "infinity" (Infinity type), "string" ("Infinity" (the string literal))
  };
  function toNumber(str, options = {}) {
    options = Object.assign({}, consider, options);
    if (!str || typeof str !== "string") return str;
    let trimmedStr = str.trim();
    if (trimmedStr.length === 0) return str;
    else if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr)) return str;
    else if (trimmedStr === "0") return 0;
    else if (options.hex && hexRegex.test(trimmedStr)) {
      return parse_int(trimmedStr, 16);
    } else if (!isFinite(trimmedStr)) {
      return handleInfinity(str, Number(trimmedStr), options);
    } else if (trimmedStr.includes("e") || trimmedStr.includes("E")) {
      return resolveEnotation(str, trimmedStr, options);
    } else {
      const match = numRegex.exec(trimmedStr);
      if (match) {
        const sign = match[1] || "";
        const leadingZeros = match[2];
        let numTrimmedByZeros = trimZeros(match[3]);
        const decimalAdjacentToLeadingZeros = sign ? (
          // 0., -00., 000.
          str[leadingZeros.length + 1] === "."
        ) : str[leadingZeros.length] === ".";
        if (!options.leadingZeros && (leadingZeros.length > 1 || leadingZeros.length === 1 && !decimalAdjacentToLeadingZeros)) {
          return str;
        } else {
          const num = Number(trimmedStr);
          const parsedStr = String(num);
          if (num === 0) return num;
          if (parsedStr.search(/[eE]/) !== -1) {
            if (options.eNotation) return num;
            else return str;
          } else if (trimmedStr.indexOf(".") !== -1) {
            if (parsedStr === "0") return num;
            else if (parsedStr === numTrimmedByZeros) return num;
            else if (parsedStr === `${sign}${numTrimmedByZeros}`) return num;
            else return str;
          }
          let n = leadingZeros ? numTrimmedByZeros : trimmedStr;
          if (leadingZeros) {
            return n === parsedStr || sign + n === parsedStr ? num : str;
          } else {
            return n === parsedStr || n === sign + parsedStr ? num : str;
          }
        }
      } else {
        return str;
      }
    }
  }
  var eNotationRegx = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
  function resolveEnotation(str, trimmedStr, options) {
    if (!options.eNotation) return str;
    const notation = trimmedStr.match(eNotationRegx);
    if (notation) {
      let sign = notation[1] || "";
      const eChar = notation[3].indexOf("e") === -1 ? "E" : "e";
      const leadingZeros = notation[2];
      const eAdjacentToLeadingZeros = sign ? (
        // 0E.
        str[leadingZeros.length + 1] === eChar
      ) : str[leadingZeros.length] === eChar;
      if (leadingZeros.length > 1 && eAdjacentToLeadingZeros) return str;
      else if (leadingZeros.length === 1 && (notation[3].startsWith(`.${eChar}`) || notation[3][0] === eChar)) {
        return Number(trimmedStr);
      } else if (leadingZeros.length > 0) {
        if (options.leadingZeros && !eAdjacentToLeadingZeros) {
          trimmedStr = (notation[1] || "") + notation[3];
          return Number(trimmedStr);
        } else return str;
      } else {
        return Number(trimmedStr);
      }
    } else {
      return str;
    }
  }
  function trimZeros(numStr) {
    if (numStr && numStr.indexOf(".") !== -1) {
      numStr = numStr.replace(/0+$/, "");
      if (numStr === ".") numStr = "0";
      else if (numStr[0] === ".") numStr = "0" + numStr;
      else if (numStr[numStr.length - 1] === ".") numStr = numStr.substring(0, numStr.length - 1);
      return numStr;
    }
    return numStr;
  }
  function parse_int(numStr, base) {
    if (parseInt) return parseInt(numStr, base);
    else if (Number.parseInt) return Number.parseInt(numStr, base);
    else if (window && window.parseInt) return window.parseInt(numStr, base);
    else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
  }
  function handleInfinity(str, num, options) {
    const isPositive = num === Infinity;
    switch (options.infinity.toLowerCase()) {
      case "null":
        return null;
      case "infinity":
        return num;
      // Return Infinity or -Infinity
      case "string":
        return isPositive ? "Infinity" : "-Infinity";
      case "original":
      default:
        return str;
    }
  }

  // node_modules/fast-xml-parser/src/ignoreAttributes.js
  function getIgnoreAttributesFn(ignoreAttributes) {
    if (typeof ignoreAttributes === "function") {
      return ignoreAttributes;
    }
    if (Array.isArray(ignoreAttributes)) {
      return (attrName) => {
        for (const pattern of ignoreAttributes) {
          if (typeof pattern === "string" && attrName === pattern) {
            return true;
          }
          if (pattern instanceof RegExp && pattern.test(attrName)) {
            return true;
          }
        }
      };
    }
    return () => false;
  }

  // node_modules/path-expression-matcher/src/Expression.js
  var Expression = class {
    /**
     * Create a new Expression
     * @param {string} pattern - Pattern string (e.g., "root.users.user", "..user[id]")
     * @param {Object} options - Configuration options
     * @param {string} options.separator - Path separator (default: '.')
     */
    constructor(pattern, options = {}, data) {
      this.pattern = pattern;
      this.separator = options.separator || ".";
      this.segments = this._parse(pattern);
      this.data = data;
      this._hasDeepWildcard = this.segments.some((seg) => seg.type === "deep-wildcard");
      this._hasAttributeCondition = this.segments.some((seg) => seg.attrName !== void 0);
      this._hasPositionSelector = this.segments.some((seg) => seg.position !== void 0);
    }
    /**
     * Parse pattern string into segments
     * @private
     * @param {string} pattern - Pattern to parse
     * @returns {Array} Array of segment objects
     */
    _parse(pattern) {
      const segments = [];
      let i = 0;
      let currentPart = "";
      while (i < pattern.length) {
        if (pattern[i] === this.separator) {
          if (i + 1 < pattern.length && pattern[i + 1] === this.separator) {
            if (currentPart.trim()) {
              segments.push(this._parseSegment(currentPart.trim()));
              currentPart = "";
            }
            segments.push({ type: "deep-wildcard" });
            i += 2;
          } else {
            if (currentPart.trim()) {
              segments.push(this._parseSegment(currentPart.trim()));
            }
            currentPart = "";
            i++;
          }
        } else {
          currentPart += pattern[i];
          i++;
        }
      }
      if (currentPart.trim()) {
        segments.push(this._parseSegment(currentPart.trim()));
      }
      return segments;
    }
    /**
     * Parse a single segment
     * @private
     * @param {string} part - Segment string (e.g., "user", "ns::user", "user[id]", "ns::user:first")
     * @returns {Object} Segment object
     */
    _parseSegment(part) {
      const segment = { type: "tag" };
      let bracketContent = null;
      let withoutBrackets = part;
      const bracketMatch = part.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
      if (bracketMatch) {
        withoutBrackets = bracketMatch[1] + bracketMatch[3];
        if (bracketMatch[2]) {
          const content = bracketMatch[2].slice(1, -1);
          if (content) {
            bracketContent = content;
          }
        }
      }
      let namespace = void 0;
      let tagAndPosition = withoutBrackets;
      if (withoutBrackets.includes("::")) {
        const nsIndex = withoutBrackets.indexOf("::");
        namespace = withoutBrackets.substring(0, nsIndex).trim();
        tagAndPosition = withoutBrackets.substring(nsIndex + 2).trim();
        if (!namespace) {
          throw new Error(`Invalid namespace in pattern: ${part}`);
        }
      }
      let tag = void 0;
      let positionMatch = null;
      if (tagAndPosition.includes(":")) {
        const colonIndex = tagAndPosition.lastIndexOf(":");
        const tagPart = tagAndPosition.substring(0, colonIndex).trim();
        const posPart = tagAndPosition.substring(colonIndex + 1).trim();
        const isPositionKeyword = ["first", "last", "odd", "even"].includes(posPart) || /^nth\(\d+\)$/.test(posPart);
        if (isPositionKeyword) {
          tag = tagPart;
          positionMatch = posPart;
        } else {
          tag = tagAndPosition;
        }
      } else {
        tag = tagAndPosition;
      }
      if (!tag) {
        throw new Error(`Invalid segment pattern: ${part}`);
      }
      segment.tag = tag;
      if (namespace) {
        segment.namespace = namespace;
      }
      if (bracketContent) {
        if (bracketContent.includes("=")) {
          const eqIndex = bracketContent.indexOf("=");
          segment.attrName = bracketContent.substring(0, eqIndex).trim();
          segment.attrValue = bracketContent.substring(eqIndex + 1).trim();
        } else {
          segment.attrName = bracketContent.trim();
        }
      }
      if (positionMatch) {
        const nthMatch = positionMatch.match(/^nth\((\d+)\)$/);
        if (nthMatch) {
          segment.position = "nth";
          segment.positionValue = parseInt(nthMatch[1], 10);
        } else {
          segment.position = positionMatch;
        }
      }
      return segment;
    }
    /**
     * Get the number of segments
     * @returns {number}
     */
    get length() {
      return this.segments.length;
    }
    /**
     * Check if expression contains deep wildcard
     * @returns {boolean}
     */
    hasDeepWildcard() {
      return this._hasDeepWildcard;
    }
    /**
     * Check if expression has attribute conditions
     * @returns {boolean}
     */
    hasAttributeCondition() {
      return this._hasAttributeCondition;
    }
    /**
     * Check if expression has position selectors
     * @returns {boolean}
     */
    hasPositionSelector() {
      return this._hasPositionSelector;
    }
    /**
     * Get string representation
     * @returns {string}
     */
    toString() {
      return this.pattern;
    }
  };

  // node_modules/path-expression-matcher/src/ExpressionSet.js
  var ExpressionSet = class {
    constructor() {
      this._byDepthAndTag = /* @__PURE__ */ new Map();
      this._wildcardByDepth = /* @__PURE__ */ new Map();
      this._deepWildcards = [];
      this._patterns = /* @__PURE__ */ new Set();
      this._sealed = false;
    }
    /**
     * Add an Expression to the set.
     * Duplicate patterns (same pattern string) are silently ignored.
     *
     * @param {import('./Expression.js').default} expression - A pre-constructed Expression instance
     * @returns {this} for chaining
     * @throws {TypeError} if called after seal()
     *
     * @example
     * set.add(new Expression('root.users.user'));
     * set.add(new Expression('..script'));
     */
    add(expression) {
      if (this._sealed) {
        throw new TypeError(
          "ExpressionSet is sealed. Create a new ExpressionSet to add more expressions."
        );
      }
      if (this._patterns.has(expression.pattern)) return this;
      this._patterns.add(expression.pattern);
      if (expression.hasDeepWildcard()) {
        this._deepWildcards.push(expression);
        return this;
      }
      const depth = expression.length;
      const lastSeg = expression.segments[expression.segments.length - 1];
      const tag = lastSeg?.tag;
      if (!tag || tag === "*") {
        if (!this._wildcardByDepth.has(depth)) this._wildcardByDepth.set(depth, []);
        this._wildcardByDepth.get(depth).push(expression);
      } else {
        const key = `${depth}:${tag}`;
        if (!this._byDepthAndTag.has(key)) this._byDepthAndTag.set(key, []);
        this._byDepthAndTag.get(key).push(expression);
      }
      return this;
    }
    /**
     * Add multiple expressions at once.
     *
     * @param {import('./Expression.js').default[]} expressions - Array of Expression instances
     * @returns {this} for chaining
     *
     * @example
     * set.addAll([
     *   new Expression('root.users.user'),
     *   new Expression('root.config.setting'),
     * ]);
     */
    addAll(expressions) {
      for (const expr of expressions) this.add(expr);
      return this;
    }
    /**
     * Check whether a pattern string is already present in the set.
     *
     * @param {import('./Expression.js').default} expression
     * @returns {boolean}
     */
    has(expression) {
      return this._patterns.has(expression.pattern);
    }
    /**
     * Number of expressions in the set.
     * @type {number}
     */
    get size() {
      return this._patterns.size;
    }
    /**
     * Seal the set against further modifications.
     * Useful to prevent accidental mutations after config is built.
     * Calling add() or addAll() on a sealed set throws a TypeError.
     *
     * @returns {this}
     */
    seal() {
      this._sealed = true;
      return this;
    }
    /**
     * Whether the set has been sealed.
     * @type {boolean}
     */
    get isSealed() {
      return this._sealed;
    }
    /**
     * Test whether the matcher's current path matches any expression in the set.
     *
     * Evaluation order (cheapest → most expensive):
     *  1. Exact depth + tag bucket  — O(1) lookup, typically 0–2 expressions
     *  2. Depth-only wildcard bucket — O(1) lookup, rare
     *  3. Deep-wildcard list         — always checked, but usually small
     *
     * @param {import('./Matcher.js').default} matcher - Matcher instance (or readOnly view)
     * @returns {boolean} true if any expression matches the current path
     *
     * @example
     * if (stopNodes.matchesAny(matcher)) {
     *   // handle stop node
     * }
     */
    matchesAny(matcher) {
      return this.findMatch(matcher) !== null;
    }
    /**
    * Find and return the first Expression that matches the matcher's current path.
    *
    * Uses the same evaluation order as matchesAny (cheapest → most expensive):
    *  1. Exact depth + tag bucket
    *  2. Depth-only wildcard bucket
    *  3. Deep-wildcard list
    *
    * @param {import('./Matcher.js').default} matcher - Matcher instance (or readOnly view)
    * @returns {import('./Expression.js').default | null} the first matching Expression, or null
    *
    * @example
    * const expr = stopNodes.findMatch(matcher);
    * if (expr) {
    *   // access expr.config, expr.pattern, etc.
    * }
    */
    findMatch(matcher) {
      const depth = matcher.getDepth();
      const tag = matcher.getCurrentTag();
      const exactKey = `${depth}:${tag}`;
      const exactBucket = this._byDepthAndTag.get(exactKey);
      if (exactBucket) {
        for (let i = 0; i < exactBucket.length; i++) {
          if (matcher.matches(exactBucket[i])) return exactBucket[i];
        }
      }
      const wildcardBucket = this._wildcardByDepth.get(depth);
      if (wildcardBucket) {
        for (let i = 0; i < wildcardBucket.length; i++) {
          if (matcher.matches(wildcardBucket[i])) return wildcardBucket[i];
        }
      }
      for (let i = 0; i < this._deepWildcards.length; i++) {
        if (matcher.matches(this._deepWildcards[i])) return this._deepWildcards[i];
      }
      return null;
    }
  };

  // node_modules/path-expression-matcher/src/Matcher.js
  var MUTATING_METHODS = /* @__PURE__ */ new Set(["push", "pop", "reset", "updateCurrent", "restore"]);
  var Matcher = class {
    /**
     * Create a new Matcher
     * @param {Object} options - Configuration options
     * @param {string} options.separator - Default path separator (default: '.')
     */
    constructor(options = {}) {
      this.separator = options.separator || ".";
      this.path = [];
      this.siblingStacks = [];
      this._pathStringCache = null;
      this._frozenPathCache = null;
      this._frozenSiblingsCache = null;
    }
    /**
     * Push a new tag onto the path
     * @param {string} tagName - Name of the tag
     * @param {Object} attrValues - Attribute key-value pairs for current node (optional)
     * @param {string} namespace - Namespace for the tag (optional)
     */
    push(tagName, attrValues = null, namespace = null) {
      this._pathStringCache = null;
      this._frozenPathCache = null;
      this._frozenSiblingsCache = null;
      if (this.path.length > 0) {
        const prev = this.path[this.path.length - 1];
        prev.values = void 0;
      }
      const currentLevel = this.path.length;
      if (!this.siblingStacks[currentLevel]) {
        this.siblingStacks[currentLevel] = /* @__PURE__ */ new Map();
      }
      const siblings = this.siblingStacks[currentLevel];
      const siblingKey = namespace ? `${namespace}:${tagName}` : tagName;
      const counter2 = siblings.get(siblingKey) || 0;
      let position = 0;
      for (const count of siblings.values()) {
        position += count;
      }
      siblings.set(siblingKey, counter2 + 1);
      const node = {
        tag: tagName,
        position,
        counter: counter2
      };
      if (namespace !== null && namespace !== void 0) {
        node.namespace = namespace;
      }
      if (attrValues !== null && attrValues !== void 0) {
        node.values = attrValues;
      }
      this.path.push(node);
    }
    /**
     * Pop the last tag from the path
     * @returns {Object|undefined} The popped node
     */
    pop() {
      if (this.path.length === 0) return void 0;
      this._pathStringCache = null;
      this._frozenPathCache = null;
      this._frozenSiblingsCache = null;
      const node = this.path.pop();
      if (this.siblingStacks.length > this.path.length + 1) {
        this.siblingStacks.length = this.path.length + 1;
      }
      return node;
    }
    /**
     * Update current node's attribute values
     * Useful when attributes are parsed after push
     * @param {Object} attrValues - Attribute values
     */
    updateCurrent(attrValues) {
      if (this.path.length > 0) {
        const current = this.path[this.path.length - 1];
        if (attrValues !== null && attrValues !== void 0) {
          current.values = attrValues;
          this._frozenPathCache = null;
        }
      }
    }
    /**
     * Get current tag name
     * @returns {string|undefined}
     */
    getCurrentTag() {
      return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
    }
    /**
     * Get current namespace
     * @returns {string|undefined}
     */
    getCurrentNamespace() {
      return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
    }
    /**
     * Get current node's attribute value
     * @param {string} attrName - Attribute name
     * @returns {*} Attribute value or undefined
     */
    getAttrValue(attrName) {
      if (this.path.length === 0) return void 0;
      const current = this.path[this.path.length - 1];
      return current.values?.[attrName];
    }
    /**
     * Check if current node has an attribute
     * @param {string} attrName - Attribute name
     * @returns {boolean}
     */
    hasAttr(attrName) {
      if (this.path.length === 0) return false;
      const current = this.path[this.path.length - 1];
      return current.values !== void 0 && attrName in current.values;
    }
    /**
     * Get current node's sibling position (child index in parent)
     * @returns {number}
     */
    getPosition() {
      if (this.path.length === 0) return -1;
      return this.path[this.path.length - 1].position ?? 0;
    }
    /**
     * Get current node's repeat counter (occurrence count of this tag name)
     * @returns {number}
     */
    getCounter() {
      if (this.path.length === 0) return -1;
      return this.path[this.path.length - 1].counter ?? 0;
    }
    /**
     * Get current node's sibling index (alias for getPosition for backward compatibility)
     * @returns {number}
     * @deprecated Use getPosition() or getCounter() instead
     */
    getIndex() {
      return this.getPosition();
    }
    /**
     * Get current path depth
     * @returns {number}
     */
    getDepth() {
      return this.path.length;
    }
    /**
     * Get path as string
     * @param {string} separator - Optional separator (uses default if not provided)
     * @param {boolean} includeNamespace - Whether to include namespace in output (default: true)
     * @returns {string}
     */
    toString(separator, includeNamespace = true) {
      const sep = separator || this.separator;
      const isDefault = sep === this.separator && includeNamespace === true;
      if (isDefault) {
        if (this._pathStringCache !== null && this._pathStringCache !== void 0) {
          return this._pathStringCache;
        }
        const result = this.path.map(
          (n) => includeNamespace && n.namespace ? `${n.namespace}:${n.tag}` : n.tag
        ).join(sep);
        this._pathStringCache = result;
        return result;
      }
      return this.path.map(
        (n) => includeNamespace && n.namespace ? `${n.namespace}:${n.tag}` : n.tag
      ).join(sep);
    }
    /**
     * Get path as array of tag names
     * @returns {string[]}
     */
    toArray() {
      return this.path.map((n) => n.tag);
    }
    /**
     * Reset the path to empty
     */
    reset() {
      this._pathStringCache = null;
      this._frozenPathCache = null;
      this._frozenSiblingsCache = null;
      this.path = [];
      this.siblingStacks = [];
    }
    /**
     * Match current path against an Expression
     * @param {Expression} expression - The expression to match against
     * @returns {boolean} True if current path matches the expression
     */
    matches(expression) {
      const segments = expression.segments;
      if (segments.length === 0) {
        return false;
      }
      if (expression.hasDeepWildcard()) {
        return this._matchWithDeepWildcard(segments);
      }
      return this._matchSimple(segments);
    }
    /**
     * Match simple path (no deep wildcards)
     * @private
     */
    _matchSimple(segments) {
      if (this.path.length !== segments.length) {
        return false;
      }
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const node = this.path[i];
        const isCurrentNode = i === this.path.length - 1;
        if (!this._matchSegment(segment, node, isCurrentNode)) {
          return false;
        }
      }
      return true;
    }
    /**
     * Match path with deep wildcards
     * @private
     */
    _matchWithDeepWildcard(segments) {
      let pathIdx = this.path.length - 1;
      let segIdx = segments.length - 1;
      while (segIdx >= 0 && pathIdx >= 0) {
        const segment = segments[segIdx];
        if (segment.type === "deep-wildcard") {
          segIdx--;
          if (segIdx < 0) {
            return true;
          }
          const nextSeg = segments[segIdx];
          let found = false;
          for (let i = pathIdx; i >= 0; i--) {
            const isCurrentNode = i === this.path.length - 1;
            if (this._matchSegment(nextSeg, this.path[i], isCurrentNode)) {
              pathIdx = i - 1;
              segIdx--;
              found = true;
              break;
            }
          }
          if (!found) {
            return false;
          }
        } else {
          const isCurrentNode = pathIdx === this.path.length - 1;
          if (!this._matchSegment(segment, this.path[pathIdx], isCurrentNode)) {
            return false;
          }
          pathIdx--;
          segIdx--;
        }
      }
      return segIdx < 0;
    }
    /**
     * Match a single segment against a node
     * @private
     * @param {Object} segment - Segment from Expression
     * @param {Object} node - Node from path
     * @param {boolean} isCurrentNode - Whether this is the current (last) node
     * @returns {boolean}
     */
    _matchSegment(segment, node, isCurrentNode) {
      if (segment.tag !== "*" && segment.tag !== node.tag) {
        return false;
      }
      if (segment.namespace !== void 0) {
        if (segment.namespace !== "*" && segment.namespace !== node.namespace) {
          return false;
        }
      }
      if (segment.attrName !== void 0) {
        if (!isCurrentNode) {
          return false;
        }
        if (!node.values || !(segment.attrName in node.values)) {
          return false;
        }
        if (segment.attrValue !== void 0) {
          const actualValue = node.values[segment.attrName];
          if (String(actualValue) !== String(segment.attrValue)) {
            return false;
          }
        }
      }
      if (segment.position !== void 0) {
        if (!isCurrentNode) {
          return false;
        }
        const counter2 = node.counter ?? 0;
        if (segment.position === "first" && counter2 !== 0) {
          return false;
        } else if (segment.position === "odd" && counter2 % 2 !== 1) {
          return false;
        } else if (segment.position === "even" && counter2 % 2 !== 0) {
          return false;
        } else if (segment.position === "nth") {
          if (counter2 !== segment.positionValue) {
            return false;
          }
        }
      }
      return true;
    }
    /**
    * Match any expression in the given set against the current path.
    * @param {ExpressionSet} exprSet - The set of expressions to match against.
    * @returns {boolean} - True if any expression in the set matches the current path, false otherwise.
    */
    matchesAny(exprSet) {
      return exprSet.matchesAny(this);
    }
    /**
     * Create a snapshot of current state
     * @returns {Object} State snapshot
     */
    snapshot() {
      return {
        path: this.path.map((node) => ({ ...node })),
        siblingStacks: this.siblingStacks.map((map) => new Map(map))
      };
    }
    /**
     * Restore state from snapshot
     * @param {Object} snapshot - State snapshot
     */
    restore(snapshot) {
      this._pathStringCache = null;
      this._frozenPathCache = null;
      this._frozenSiblingsCache = null;
      this.path = snapshot.path.map((node) => ({ ...node }));
      this.siblingStacks = snapshot.siblingStacks.map((map) => new Map(map));
    }
    /**
     * Return a read-only view of this matcher.
     *
     * The returned object exposes all query/inspection methods but throws a
     * TypeError if any state-mutating method is called (`push`, `pop`, `reset`,
     * `updateCurrent`, `restore`).  Property reads (e.g. `.path`, `.separator`)
     * are allowed but the returned arrays/objects are frozen so callers cannot
     * mutate internal state through them either.
     *
     * @returns {ReadOnlyMatcher} A proxy that forwards read operations and blocks writes.
     *
     * @example
     * const matcher = new Matcher();
     * matcher.push("root", {});
     *
     * const ro = matcher.readOnly();
     * ro.matches(expr);      // ✓ works
     * ro.getCurrentTag();    // ✓ works
     * ro.push("child", {}); // ✗ throws TypeError
     * ro.reset();            // ✗ throws TypeError
     */
    readOnly() {
      const self = this;
      return new Proxy(self, {
        get(target, prop, receiver) {
          if (MUTATING_METHODS.has(prop)) {
            return () => {
              throw new TypeError(
                `Cannot call '${prop}' on a read-only Matcher. Obtain a writable instance to mutate state.`
              );
            };
          }
          if (prop === "path") {
            if (target._frozenPathCache === null) {
              target._frozenPathCache = Object.freeze(
                target.path.map((node) => Object.freeze({ ...node }))
              );
            }
            return target._frozenPathCache;
          }
          if (prop === "siblingStacks") {
            if (target._frozenSiblingsCache === null) {
              target._frozenSiblingsCache = Object.freeze(
                target.siblingStacks.map((map) => Object.freeze(new Map(map)))
              );
            }
            return target._frozenSiblingsCache;
          }
          const value = Reflect.get(target, prop, receiver);
          if (typeof value === "function") {
            return value.bind(target);
          }
          return value;
        },
        // Prevent any property assignment on the read-only view
        set(_target, prop) {
          throw new TypeError(
            `Cannot set property '${String(prop)}' on a read-only Matcher.`
          );
        },
        // Prevent property deletion
        deleteProperty(_target, prop) {
          throw new TypeError(
            `Cannot delete property '${String(prop)}' from a read-only Matcher.`
          );
        }
      });
    }
  };

  // node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
  function extractRawAttributes(prefixedAttrs, options) {
    if (!prefixedAttrs) return {};
    const attrs = options.attributesGroupName ? prefixedAttrs[options.attributesGroupName] : prefixedAttrs;
    if (!attrs) return {};
    const rawAttrs = {};
    for (const key in attrs) {
      if (key.startsWith(options.attributeNamePrefix)) {
        const rawName = key.substring(options.attributeNamePrefix.length);
        rawAttrs[rawName] = attrs[key];
      } else {
        rawAttrs[key] = attrs[key];
      }
    }
    return rawAttrs;
  }
  function extractNamespace(rawTagName) {
    if (!rawTagName || typeof rawTagName !== "string") return void 0;
    const colonIndex = rawTagName.indexOf(":");
    if (colonIndex !== -1 && colonIndex > 0) {
      const ns = rawTagName.substring(0, colonIndex);
      if (ns !== "xmlns") {
        return ns;
      }
    }
    return void 0;
  }
  var OrderedObjParser = class {
    constructor(options) {
      this.options = options;
      this.currentNode = null;
      this.tagsNodeStack = [];
      this.docTypeEntities = {};
      this.lastEntities = {
        "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
        "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
        "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
        "quot": { regex: /&(quot|#34|#x22);/g, val: '"' }
      };
      this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
      this.htmlEntities = {
        "space": { regex: /&(nbsp|#160);/g, val: " " },
        // "lt" : { regex: /&(lt|#60);/g, val: "<" },
        // "gt" : { regex: /&(gt|#62);/g, val: ">" },
        // "amp" : { regex: /&(amp|#38);/g, val: "&" },
        // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
        // "apos" : { regex: /&(apos|#39);/g, val: "'" },
        "cent": { regex: /&(cent|#162);/g, val: "\xA2" },
        "pound": { regex: /&(pound|#163);/g, val: "\xA3" },
        "yen": { regex: /&(yen|#165);/g, val: "\xA5" },
        "euro": { regex: /&(euro|#8364);/g, val: "\u20AC" },
        "copyright": { regex: /&(copy|#169);/g, val: "\xA9" },
        "reg": { regex: /&(reg|#174);/g, val: "\xAE" },
        "inr": { regex: /&(inr|#8377);/g, val: "\u20B9" },
        "num_dec": { regex: /&#([0-9]{1,7});/g, val: (_, str) => fromCodePoint(str, 10, "&#") },
        "num_hex": { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (_, str) => fromCodePoint(str, 16, "&#x") }
      };
      this.addExternalEntities = addExternalEntities;
      this.parseXml = parseXml;
      this.parseTextData = parseTextData;
      this.resolveNameSpace = resolveNameSpace;
      this.buildAttributesMap = buildAttributesMap;
      this.isItStopNode = isItStopNode;
      this.replaceEntitiesValue = replaceEntitiesValue;
      this.readStopNodeData = readStopNodeData;
      this.saveTextToParentTag = saveTextToParentTag;
      this.addChild = addChild;
      this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
      this.entityExpansionCount = 0;
      this.currentExpandedLength = 0;
      this.matcher = new Matcher();
      this.readonlyMatcher = this.matcher.readOnly();
      this.isCurrentNodeStopNode = false;
      this.stopNodeExpressionsSet = new ExpressionSet();
      const stopNodesOpts = this.options.stopNodes;
      if (stopNodesOpts && stopNodesOpts.length > 0) {
        for (let i = 0; i < stopNodesOpts.length; i++) {
          const stopNodeExp = stopNodesOpts[i];
          if (typeof stopNodeExp === "string") {
            this.stopNodeExpressionsSet.add(new Expression(stopNodeExp));
          } else if (stopNodeExp instanceof Expression) {
            this.stopNodeExpressionsSet.add(stopNodeExp);
          }
        }
        this.stopNodeExpressionsSet.seal();
      }
    }
  };
  function addExternalEntities(externalEntities) {
    const entKeys = Object.keys(externalEntities);
    for (let i = 0; i < entKeys.length; i++) {
      const ent = entKeys[i];
      const escaped = ent.replace(/[.\-+*:]/g, "\\.");
      this.lastEntities[ent] = {
        regex: new RegExp("&" + escaped + ";", "g"),
        val: externalEntities[ent]
      };
    }
  }
  function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
    const options = this.options;
    if (val !== void 0) {
      if (options.trimValues && !dontTrim) {
        val = val.trim();
      }
      if (val.length > 0) {
        if (!escapeEntities) val = this.replaceEntitiesValue(val, tagName, jPath);
        const jPathOrMatcher = options.jPath ? jPath.toString() : jPath;
        const newval = options.tagValueProcessor(tagName, val, jPathOrMatcher, hasAttributes, isLeafNode);
        if (newval === null || newval === void 0) {
          return val;
        } else if (typeof newval !== typeof val || newval !== val) {
          return newval;
        } else if (options.trimValues) {
          return parseValue(val, options.parseTagValue, options.numberParseOptions);
        } else {
          const trimmedVal = val.trim();
          if (trimmedVal === val) {
            return parseValue(val, options.parseTagValue, options.numberParseOptions);
          } else {
            return val;
          }
        }
      }
    }
  }
  function resolveNameSpace(tagname) {
    if (this.options.removeNSPrefix) {
      const tags = tagname.split(":");
      const prefix = tagname.charAt(0) === "/" ? "/" : "";
      if (tags[0] === "xmlns") {
        return "";
      }
      if (tags.length === 2) {
        tagname = prefix + tags[1];
      }
    }
    return tagname;
  }
  var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
  function buildAttributesMap(attrStr, jPath, tagName) {
    const options = this.options;
    if (options.ignoreAttributes !== true && typeof attrStr === "string") {
      const matches = getAllMatches(attrStr, attrsRegx);
      const len = matches.length;
      const attrs = {};
      const processedVals = new Array(len);
      let hasRawAttrs = false;
      const rawAttrsForMatcher = {};
      for (let i = 0; i < len; i++) {
        const attrName = this.resolveNameSpace(matches[i][1]);
        const oldVal = matches[i][4];
        if (attrName.length && oldVal !== void 0) {
          let val = oldVal;
          if (options.trimValues) val = val.trim();
          val = this.replaceEntitiesValue(val, tagName, this.readonlyMatcher);
          processedVals[i] = val;
          rawAttrsForMatcher[attrName] = val;
          hasRawAttrs = true;
        }
      }
      if (hasRawAttrs && typeof jPath === "object" && jPath.updateCurrent) {
        jPath.updateCurrent(rawAttrsForMatcher);
      }
      const jPathStr = options.jPath ? jPath.toString() : this.readonlyMatcher;
      let hasAttrs = false;
      for (let i = 0; i < len; i++) {
        const attrName = this.resolveNameSpace(matches[i][1]);
        if (this.ignoreAttributesFn(attrName, jPathStr)) continue;
        let aName = options.attributeNamePrefix + attrName;
        if (attrName.length) {
          if (options.transformAttributeName) {
            aName = options.transformAttributeName(aName);
          }
          aName = sanitizeName(aName, options);
          if (matches[i][4] !== void 0) {
            const oldVal = processedVals[i];
            const newVal = options.attributeValueProcessor(attrName, oldVal, jPathStr);
            if (newVal === null || newVal === void 0) {
              attrs[aName] = oldVal;
            } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
              attrs[aName] = newVal;
            } else {
              attrs[aName] = parseValue(oldVal, options.parseAttributeValue, options.numberParseOptions);
            }
            hasAttrs = true;
          } else if (options.allowBooleanAttributes) {
            attrs[aName] = true;
            hasAttrs = true;
          }
        }
      }
      if (!hasAttrs) return;
      if (options.attributesGroupName) {
        const attrCollection = {};
        attrCollection[options.attributesGroupName] = attrs;
        return attrCollection;
      }
      return attrs;
    }
  }
  var parseXml = function(xmlData) {
    xmlData = xmlData.replace(/\r\n?/g, "\n");
    const xmlObj = new XmlNode("!xml");
    let currentNode = xmlObj;
    let textData = "";
    this.matcher.reset();
    this.entityExpansionCount = 0;
    this.currentExpandedLength = 0;
    this.docTypeEntitiesKeys = [];
    this.lastEntitiesKeys = Object.keys(this.lastEntities);
    this.htmlEntitiesKeys = this.options.htmlEntities ? Object.keys(this.htmlEntities) : [];
    const options = this.options;
    const docTypeReader = new DocTypeReader(options.processEntities);
    const xmlLen = xmlData.length;
    for (let i = 0; i < xmlLen; i++) {
      const ch = xmlData[i];
      if (ch === "<") {
        const c1 = xmlData.charCodeAt(i + 1);
        if (c1 === 47) {
          const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
          let tagName = xmlData.substring(i + 2, closeIndex).trim();
          if (options.removeNSPrefix) {
            const colonIndex = tagName.indexOf(":");
            if (colonIndex !== -1) {
              tagName = tagName.substr(colonIndex + 1);
            }
          }
          tagName = transformTagName(options.transformTagName, tagName, "", options).tagName;
          if (currentNode) {
            textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
          }
          const lastTagName = this.matcher.getCurrentTag();
          if (tagName && options.unpairedTagsSet.has(tagName)) {
            throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
          }
          if (lastTagName && options.unpairedTagsSet.has(lastTagName)) {
            this.matcher.pop();
            this.tagsNodeStack.pop();
          }
          this.matcher.pop();
          this.isCurrentNodeStopNode = false;
          currentNode = this.tagsNodeStack.pop();
          textData = "";
          i = closeIndex;
        } else if (c1 === 63) {
          let tagData = readTagExp(xmlData, i, false, "?>");
          if (!tagData) throw new Error("Pi Tag is not closed.");
          textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
          if (options.ignoreDeclaration && tagData.tagName === "?xml" || options.ignorePiTags) {
          } else {
            const childNode = new XmlNode(tagData.tagName);
            childNode.add(options.textNodeName, "");
            if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
              childNode[":@"] = this.buildAttributesMap(tagData.tagExp, this.matcher, tagData.tagName);
            }
            this.addChild(currentNode, childNode, this.readonlyMatcher, i);
          }
          i = tagData.closeIndex + 1;
        } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 45 && xmlData.charCodeAt(i + 3) === 45) {
          const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
          if (options.commentPropName) {
            const comment = xmlData.substring(i + 4, endIndex - 2);
            textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
            currentNode.add(options.commentPropName, [{ [options.textNodeName]: comment }]);
          }
          i = endIndex;
        } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 68) {
          const result = docTypeReader.readDocType(xmlData, i);
          this.docTypeEntities = result.entities;
          this.docTypeEntitiesKeys = Object.keys(this.docTypeEntities) || [];
          i = result.i;
        } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 91) {
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
          const tagExp = xmlData.substring(i + 9, closeIndex);
          textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher);
          let val = this.parseTextData(tagExp, currentNode.tagname, this.readonlyMatcher, true, false, true, true);
          if (val == void 0) val = "";
          if (options.cdataPropName) {
            currentNode.add(options.cdataPropName, [{ [options.textNodeName]: tagExp }]);
          } else {
            currentNode.add(options.textNodeName, val);
          }
          i = closeIndex + 2;
        } else {
          let result = readTagExp(xmlData, i, options.removeNSPrefix);
          if (!result) {
            const context = xmlData.substring(Math.max(0, i - 50), Math.min(xmlLen, i + 50));
            throw new Error(`readTagExp returned undefined at position ${i}. Context: "${context}"`);
          }
          let tagName = result.tagName;
          const rawTagName = result.rawTagName;
          let tagExp = result.tagExp;
          let attrExpPresent = result.attrExpPresent;
          let closeIndex = result.closeIndex;
          ({ tagName, tagExp } = transformTagName(options.transformTagName, tagName, tagExp, options));
          if (options.strictReservedNames && (tagName === options.commentPropName || tagName === options.cdataPropName || tagName === options.textNodeName || tagName === options.attributesGroupName)) {
            throw new Error(`Invalid tag name: ${tagName}`);
          }
          if (currentNode && textData) {
            if (currentNode.tagname !== "!xml") {
              textData = this.saveTextToParentTag(textData, currentNode, this.readonlyMatcher, false);
            }
          }
          const lastTag = currentNode;
          if (lastTag && options.unpairedTagsSet.has(lastTag.tagname)) {
            currentNode = this.tagsNodeStack.pop();
            this.matcher.pop();
          }
          let isSelfClosing = false;
          if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
            isSelfClosing = true;
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substr(0, tagName.length - 1);
              tagExp = tagName;
            } else {
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }
            attrExpPresent = tagName !== tagExp;
          }
          let prefixedAttrs = null;
          let rawAttrs = {};
          let namespace = void 0;
          namespace = extractNamespace(rawTagName);
          if (tagName !== xmlObj.tagname) {
            this.matcher.push(tagName, {}, namespace);
          }
          if (tagName !== tagExp && attrExpPresent) {
            prefixedAttrs = this.buildAttributesMap(tagExp, this.matcher, tagName);
            if (prefixedAttrs) {
              rawAttrs = extractRawAttributes(prefixedAttrs, options);
            }
          }
          if (tagName !== xmlObj.tagname) {
            this.isCurrentNodeStopNode = this.isItStopNode();
          }
          const startIndex = i;
          if (this.isCurrentNodeStopNode) {
            let tagContent = "";
            if (isSelfClosing) {
              i = result.closeIndex;
            } else if (options.unpairedTagsSet.has(tagName)) {
              i = result.closeIndex;
            } else {
              const result2 = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
              if (!result2) throw new Error(`Unexpected end of ${rawTagName}`);
              i = result2.i;
              tagContent = result2.tagContent;
            }
            const childNode = new XmlNode(tagName);
            if (prefixedAttrs) {
              childNode[":@"] = prefixedAttrs;
            }
            childNode.add(options.textNodeName, tagContent);
            this.matcher.pop();
            this.isCurrentNodeStopNode = false;
            this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
          } else {
            if (isSelfClosing) {
              ({ tagName, tagExp } = transformTagName(options.transformTagName, tagName, tagExp, options));
              const childNode = new XmlNode(tagName);
              if (prefixedAttrs) {
                childNode[":@"] = prefixedAttrs;
              }
              this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
              this.matcher.pop();
              this.isCurrentNodeStopNode = false;
            } else if (options.unpairedTagsSet.has(tagName)) {
              const childNode = new XmlNode(tagName);
              if (prefixedAttrs) {
                childNode[":@"] = prefixedAttrs;
              }
              this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
              this.matcher.pop();
              this.isCurrentNodeStopNode = false;
              i = result.closeIndex;
              continue;
            } else {
              const childNode = new XmlNode(tagName);
              if (this.tagsNodeStack.length > options.maxNestedTags) {
                throw new Error("Maximum nested tags exceeded");
              }
              this.tagsNodeStack.push(currentNode);
              if (prefixedAttrs) {
                childNode[":@"] = prefixedAttrs;
              }
              this.addChild(currentNode, childNode, this.readonlyMatcher, startIndex);
              currentNode = childNode;
            }
            textData = "";
            i = closeIndex;
          }
        }
      } else {
        textData += xmlData[i];
      }
    }
    return xmlObj.child;
  };
  function addChild(currentNode, childNode, matcher, startIndex) {
    if (!this.options.captureMetaData) startIndex = void 0;
    const jPathOrMatcher = this.options.jPath ? matcher.toString() : matcher;
    const result = this.options.updateTag(childNode.tagname, jPathOrMatcher, childNode[":@"]);
    if (result === false) {
    } else if (typeof result === "string") {
      childNode.tagname = result;
      currentNode.addChild(childNode, startIndex);
    } else {
      currentNode.addChild(childNode, startIndex);
    }
  }
  function replaceEntitiesValue(val, tagName, jPath) {
    const entityConfig = this.options.processEntities;
    if (!entityConfig || !entityConfig.enabled) {
      return val;
    }
    if (entityConfig.allowedTags) {
      const jPathOrMatcher = this.options.jPath ? jPath.toString() : jPath;
      const allowed = Array.isArray(entityConfig.allowedTags) ? entityConfig.allowedTags.includes(tagName) : entityConfig.allowedTags(tagName, jPathOrMatcher);
      if (!allowed) {
        return val;
      }
    }
    if (entityConfig.tagFilter) {
      const jPathOrMatcher = this.options.jPath ? jPath.toString() : jPath;
      if (!entityConfig.tagFilter(tagName, jPathOrMatcher)) {
        return val;
      }
    }
    for (const entityName of this.docTypeEntitiesKeys) {
      const entity = this.docTypeEntities[entityName];
      const matches = val.match(entity.regx);
      if (matches) {
        this.entityExpansionCount += matches.length;
        if (entityConfig.maxTotalExpansions && this.entityExpansionCount > entityConfig.maxTotalExpansions) {
          throw new Error(
            `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${entityConfig.maxTotalExpansions}`
          );
        }
        const lengthBefore = val.length;
        val = val.replace(entity.regx, entity.val);
        if (entityConfig.maxExpandedLength) {
          this.currentExpandedLength += val.length - lengthBefore;
          if (this.currentExpandedLength > entityConfig.maxExpandedLength) {
            throw new Error(
              `Total expanded content size exceeded: ${this.currentExpandedLength} > ${entityConfig.maxExpandedLength}`
            );
          }
        }
      }
    }
    if (val.indexOf("&") === -1) return val;
    for (const entityName of this.lastEntitiesKeys) {
      const entity = this.lastEntities[entityName];
      const matches = val.match(entity.regex);
      if (matches) {
        this.entityExpansionCount += matches.length;
        if (entityConfig.maxTotalExpansions && this.entityExpansionCount > entityConfig.maxTotalExpansions) {
          throw new Error(
            `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${entityConfig.maxTotalExpansions}`
          );
        }
      }
      val = val.replace(entity.regex, entity.val);
    }
    if (val.indexOf("&") === -1) return val;
    for (const entityName of this.htmlEntitiesKeys) {
      const entity = this.htmlEntities[entityName];
      const matches = val.match(entity.regex);
      if (matches) {
        this.entityExpansionCount += matches.length;
        if (entityConfig.maxTotalExpansions && this.entityExpansionCount > entityConfig.maxTotalExpansions) {
          throw new Error(
            `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${entityConfig.maxTotalExpansions}`
          );
        }
      }
      val = val.replace(entity.regex, entity.val);
    }
    val = val.replace(this.ampEntity.regex, this.ampEntity.val);
    return val;
  }
  function saveTextToParentTag(textData, parentNode, matcher, isLeafNode) {
    if (textData) {
      if (isLeafNode === void 0) isLeafNode = parentNode.child.length === 0;
      textData = this.parseTextData(
        textData,
        parentNode.tagname,
        matcher,
        false,
        parentNode[":@"] ? Object.keys(parentNode[":@"]).length !== 0 : false,
        isLeafNode
      );
      if (textData !== void 0 && textData !== "")
        parentNode.add(this.options.textNodeName, textData);
      textData = "";
    }
    return textData;
  }
  function isItStopNode() {
    if (this.stopNodeExpressionsSet.size === 0) return false;
    return this.matcher.matchesAny(this.stopNodeExpressionsSet);
  }
  function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
    let attrBoundary = 0;
    const chars = [];
    const len = xmlData.length;
    const closeCode0 = closingChar.charCodeAt(0);
    const closeCode1 = closingChar.length > 1 ? closingChar.charCodeAt(1) : -1;
    for (let index = i; index < len; index++) {
      const code = xmlData.charCodeAt(index);
      if (attrBoundary) {
        if (code === attrBoundary) attrBoundary = 0;
      } else if (code === 34 || code === 39) {
        attrBoundary = code;
      } else if (code === closeCode0) {
        if (closeCode1 !== -1) {
          if (xmlData.charCodeAt(index + 1) === closeCode1) {
            return { data: String.fromCharCode(...chars), index };
          }
        } else {
          return { data: String.fromCharCode(...chars), index };
        }
      } else if (code === 9) {
        chars.push(32);
        continue;
      }
      chars.push(code);
    }
  }
  function findClosingIndex(xmlData, str, i, errMsg) {
    const closingIndex = xmlData.indexOf(str, i);
    if (closingIndex === -1) {
      throw new Error(errMsg);
    } else {
      return closingIndex + str.length - 1;
    }
  }
  function findClosingChar(xmlData, char, i, errMsg) {
    const closingIndex = xmlData.indexOf(char, i);
    if (closingIndex === -1) throw new Error(errMsg);
    return closingIndex;
  }
  function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
    const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
    if (!result) return;
    let tagExp = result.data;
    const closeIndex = result.index;
    const separatorIndex = tagExp.search(/\s/);
    let tagName = tagExp;
    let attrExpPresent = true;
    if (separatorIndex !== -1) {
      tagName = tagExp.substring(0, separatorIndex);
      tagExp = tagExp.substring(separatorIndex + 1).trimStart();
    }
    const rawTagName = tagName;
    if (removeNSPrefix) {
      const colonIndex = tagName.indexOf(":");
      if (colonIndex !== -1) {
        tagName = tagName.substr(colonIndex + 1);
        attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
      }
    }
    return {
      tagName,
      tagExp,
      closeIndex,
      attrExpPresent,
      rawTagName
    };
  }
  function readStopNodeData(xmlData, tagName, i) {
    const startIndex = i;
    let openTagCount = 1;
    const xmllen = xmlData.length;
    for (; i < xmllen; i++) {
      if (xmlData[i] === "<") {
        const c1 = xmlData.charCodeAt(i + 1);
        if (c1 === 47) {
          const closeIndex = findClosingChar(xmlData, ">", i, `${tagName} is not closed`);
          let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
          if (closeTagName === tagName) {
            openTagCount--;
            if (openTagCount === 0) {
              return {
                tagContent: xmlData.substring(startIndex, i),
                i: closeIndex
              };
            }
          }
          i = closeIndex;
        } else if (c1 === 63) {
          const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
          i = closeIndex;
        } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 45 && xmlData.charCodeAt(i + 3) === 45) {
          const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
          i = closeIndex;
        } else if (c1 === 33 && xmlData.charCodeAt(i + 2) === 91) {
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
          i = closeIndex;
        } else {
          const tagData = readTagExp(xmlData, i, ">");
          if (tagData) {
            const openTagName = tagData && tagData.tagName;
            if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
              openTagCount++;
            }
            i = tagData.closeIndex;
          }
        }
      }
    }
  }
  function parseValue(val, shouldParse, options) {
    if (shouldParse && typeof val === "string") {
      const newval = val.trim();
      if (newval === "true") return true;
      else if (newval === "false") return false;
      else return toNumber(val, options);
    } else {
      if (isExist(val)) {
        return val;
      } else {
        return "";
      }
    }
  }
  function fromCodePoint(str, base, prefix) {
    const codePoint = Number.parseInt(str, base);
    if (codePoint >= 0 && codePoint <= 1114111) {
      return String.fromCodePoint(codePoint);
    } else {
      return prefix + str + ";";
    }
  }
  function transformTagName(fn, tagName, tagExp, options) {
    if (fn) {
      const newTagName = fn(tagName);
      if (tagExp === tagName) {
        tagExp = newTagName;
      }
      tagName = newTagName;
    }
    tagName = sanitizeName(tagName, options);
    return { tagName, tagExp };
  }
  function sanitizeName(name, options) {
    if (criticalProperties.includes(name)) {
      throw new Error(`[SECURITY] Invalid name: "${name}" is a reserved JavaScript keyword that could cause prototype pollution`);
    } else if (DANGEROUS_PROPERTY_NAMES.includes(name)) {
      return options.onDangerousProperty(name);
    }
    return name;
  }

  // node_modules/fast-xml-parser/src/xmlparser/node2json.js
  var METADATA_SYMBOL2 = XmlNode.getMetaDataSymbol();
  function stripAttributePrefix(attrs, prefix) {
    if (!attrs || typeof attrs !== "object") return {};
    if (!prefix) return attrs;
    const rawAttrs = {};
    for (const key in attrs) {
      if (key.startsWith(prefix)) {
        const rawName = key.substring(prefix.length);
        rawAttrs[rawName] = attrs[key];
      } else {
        rawAttrs[key] = attrs[key];
      }
    }
    return rawAttrs;
  }
  function prettify(node, options, matcher, readonlyMatcher) {
    return compress(node, options, matcher, readonlyMatcher);
  }
  function compress(arr, options, matcher, readonlyMatcher) {
    let text;
    const compressedObj = {};
    for (let i = 0; i < arr.length; i++) {
      const tagObj = arr[i];
      const property = propName(tagObj);
      if (property !== void 0 && property !== options.textNodeName) {
        const rawAttrs = stripAttributePrefix(
          tagObj[":@"] || {},
          options.attributeNamePrefix
        );
        matcher.push(property, rawAttrs);
      }
      if (property === options.textNodeName) {
        if (text === void 0) text = tagObj[property];
        else text += "" + tagObj[property];
      } else if (property === void 0) {
        continue;
      } else if (tagObj[property]) {
        let val = compress(tagObj[property], options, matcher, readonlyMatcher);
        const isLeaf = isLeafTag(val, options);
        if (tagObj[":@"]) {
          assignAttributes(val, tagObj[":@"], readonlyMatcher, options);
        } else if (Object.keys(val).length === 1 && val[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
          val = val[options.textNodeName];
        } else if (Object.keys(val).length === 0) {
          if (options.alwaysCreateTextNode) val[options.textNodeName] = "";
          else val = "";
        }
        if (tagObj[METADATA_SYMBOL2] !== void 0 && typeof val === "object" && val !== null) {
          val[METADATA_SYMBOL2] = tagObj[METADATA_SYMBOL2];
        }
        if (compressedObj[property] !== void 0 && Object.prototype.hasOwnProperty.call(compressedObj, property)) {
          if (!Array.isArray(compressedObj[property])) {
            compressedObj[property] = [compressedObj[property]];
          }
          compressedObj[property].push(val);
        } else {
          const jPathOrMatcher = options.jPath ? readonlyMatcher.toString() : readonlyMatcher;
          if (options.isArray(property, jPathOrMatcher, isLeaf)) {
            compressedObj[property] = [val];
          } else {
            compressedObj[property] = val;
          }
        }
        if (property !== void 0 && property !== options.textNodeName) {
          matcher.pop();
        }
      }
    }
    if (typeof text === "string") {
      if (text.length > 0) compressedObj[options.textNodeName] = text;
    } else if (text !== void 0) compressedObj[options.textNodeName] = text;
    return compressedObj;
  }
  function propName(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== ":@") return key;
    }
  }
  function assignAttributes(obj, attrMap, readonlyMatcher, options) {
    if (attrMap) {
      const keys = Object.keys(attrMap);
      const len = keys.length;
      for (let i = 0; i < len; i++) {
        const atrrName = keys[i];
        const rawAttrName = atrrName.startsWith(options.attributeNamePrefix) ? atrrName.substring(options.attributeNamePrefix.length) : atrrName;
        const jPathOrMatcher = options.jPath ? readonlyMatcher.toString() + "." + rawAttrName : readonlyMatcher;
        if (options.isArray(atrrName, jPathOrMatcher, true, true)) {
          obj[atrrName] = [attrMap[atrrName]];
        } else {
          obj[atrrName] = attrMap[atrrName];
        }
      }
    }
  }
  function isLeafTag(obj, options) {
    const { textNodeName } = options;
    const propCount = Object.keys(obj).length;
    if (propCount === 0) {
      return true;
    }
    if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
      return true;
    }
    return false;
  }

  // node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
  var XMLParser = class {
    constructor(options) {
      this.externalEntities = {};
      this.options = buildOptions(options);
    }
    /**
     * Parse XML dats to JS object 
     * @param {string|Uint8Array} xmlData 
     * @param {boolean|Object} validationOption 
     */
    parse(xmlData, validationOption) {
      if (typeof xmlData !== "string" && xmlData.toString) {
        xmlData = xmlData.toString();
      } else if (typeof xmlData !== "string") {
        throw new Error("XML data is accepted in String or Bytes[] form.");
      }
      if (validationOption) {
        if (validationOption === true) validationOption = {};
        const result = validate(xmlData, validationOption);
        if (result !== true) {
          throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
        }
      }
      const orderedObjParser = new OrderedObjParser(this.options);
      orderedObjParser.addExternalEntities(this.externalEntities);
      const orderedResult = orderedObjParser.parseXml(xmlData);
      if (this.options.preserveOrder || orderedResult === void 0) return orderedResult;
      else return prettify(orderedResult, this.options, orderedObjParser.matcher, orderedObjParser.readonlyMatcher);
    }
    /**
     * Add Entity which is not by default supported by this library
     * @param {string} key 
     * @param {string} value 
     */
    addEntity(key, value) {
      if (value.indexOf("&") !== -1) {
        throw new Error("Entity value can't have '&'");
      } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
        throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
      } else if (value === "&") {
        throw new Error("An entity with value '&' is not permitted");
      } else {
        this.externalEntities[key] = value;
      }
    }
    /**
     * Returns a Symbol that can be used to access the metadata
     * property on a node.
     * 
     * If Symbol is not available in the environment, an ordinary property is used
     * and the name of the property is here returned.
     * 
     * The XMLMetaData property is only present when `captureMetaData`
     * is true in the options.
     */
    static getMetaDataSymbol() {
      return XmlNode.getMetaDataSymbol();
    }
  };

  // node_modules/fast-xml-builder/node_modules/path-expression-matcher/src/Expression.js
  var Expression2 = class {
    /**
     * Create a new Expression
     * @param {string} pattern - Pattern string (e.g., "root.users.user", "..user[id]")
     * @param {Object} options - Configuration options
     * @param {string} options.separator - Path separator (default: '.')
     */
    constructor(pattern, options = {}) {
      this.pattern = pattern;
      this.separator = options.separator || ".";
      this.segments = this._parse(pattern);
      this._hasDeepWildcard = this.segments.some((seg) => seg.type === "deep-wildcard");
      this._hasAttributeCondition = this.segments.some((seg) => seg.attrName !== void 0);
      this._hasPositionSelector = this.segments.some((seg) => seg.position !== void 0);
    }
    /**
     * Parse pattern string into segments
     * @private
     * @param {string} pattern - Pattern to parse
     * @returns {Array} Array of segment objects
     */
    _parse(pattern) {
      const segments = [];
      let i = 0;
      let currentPart = "";
      while (i < pattern.length) {
        if (pattern[i] === this.separator) {
          if (i + 1 < pattern.length && pattern[i + 1] === this.separator) {
            if (currentPart.trim()) {
              segments.push(this._parseSegment(currentPart.trim()));
              currentPart = "";
            }
            segments.push({ type: "deep-wildcard" });
            i += 2;
          } else {
            if (currentPart.trim()) {
              segments.push(this._parseSegment(currentPart.trim()));
            }
            currentPart = "";
            i++;
          }
        } else {
          currentPart += pattern[i];
          i++;
        }
      }
      if (currentPart.trim()) {
        segments.push(this._parseSegment(currentPart.trim()));
      }
      return segments;
    }
    /**
     * Parse a single segment
     * @private
     * @param {string} part - Segment string (e.g., "user", "ns::user", "user[id]", "ns::user:first")
     * @returns {Object} Segment object
     */
    _parseSegment(part) {
      const segment = { type: "tag" };
      let bracketContent = null;
      let withoutBrackets = part;
      const bracketMatch = part.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
      if (bracketMatch) {
        withoutBrackets = bracketMatch[1] + bracketMatch[3];
        if (bracketMatch[2]) {
          const content = bracketMatch[2].slice(1, -1);
          if (content) {
            bracketContent = content;
          }
        }
      }
      let namespace = void 0;
      let tagAndPosition = withoutBrackets;
      if (withoutBrackets.includes("::")) {
        const nsIndex = withoutBrackets.indexOf("::");
        namespace = withoutBrackets.substring(0, nsIndex).trim();
        tagAndPosition = withoutBrackets.substring(nsIndex + 2).trim();
        if (!namespace) {
          throw new Error(`Invalid namespace in pattern: ${part}`);
        }
      }
      let tag = void 0;
      let positionMatch = null;
      if (tagAndPosition.includes(":")) {
        const colonIndex = tagAndPosition.lastIndexOf(":");
        const tagPart = tagAndPosition.substring(0, colonIndex).trim();
        const posPart = tagAndPosition.substring(colonIndex + 1).trim();
        const isPositionKeyword = ["first", "last", "odd", "even"].includes(posPart) || /^nth\(\d+\)$/.test(posPart);
        if (isPositionKeyword) {
          tag = tagPart;
          positionMatch = posPart;
        } else {
          tag = tagAndPosition;
        }
      } else {
        tag = tagAndPosition;
      }
      if (!tag) {
        throw new Error(`Invalid segment pattern: ${part}`);
      }
      segment.tag = tag;
      if (namespace) {
        segment.namespace = namespace;
      }
      if (bracketContent) {
        if (bracketContent.includes("=")) {
          const eqIndex = bracketContent.indexOf("=");
          segment.attrName = bracketContent.substring(0, eqIndex).trim();
          segment.attrValue = bracketContent.substring(eqIndex + 1).trim();
        } else {
          segment.attrName = bracketContent.trim();
        }
      }
      if (positionMatch) {
        const nthMatch = positionMatch.match(/^nth\((\d+)\)$/);
        if (nthMatch) {
          segment.position = "nth";
          segment.positionValue = parseInt(nthMatch[1], 10);
        } else {
          segment.position = positionMatch;
        }
      }
      return segment;
    }
    /**
     * Get the number of segments
     * @returns {number}
     */
    get length() {
      return this.segments.length;
    }
    /**
     * Check if expression contains deep wildcard
     * @returns {boolean}
     */
    hasDeepWildcard() {
      return this._hasDeepWildcard;
    }
    /**
     * Check if expression has attribute conditions
     * @returns {boolean}
     */
    hasAttributeCondition() {
      return this._hasAttributeCondition;
    }
    /**
     * Check if expression has position selectors
     * @returns {boolean}
     */
    hasPositionSelector() {
      return this._hasPositionSelector;
    }
    /**
     * Get string representation
     * @returns {string}
     */
    toString() {
      return this.pattern;
    }
  };

  // node_modules/fast-xml-builder/node_modules/path-expression-matcher/src/Matcher.js
  var MUTATING_METHODS2 = /* @__PURE__ */ new Set(["push", "pop", "reset", "updateCurrent", "restore"]);
  var Matcher2 = class {
    /**
     * Create a new Matcher
     * @param {Object} options - Configuration options
     * @param {string} options.separator - Default path separator (default: '.')
     */
    constructor(options = {}) {
      this.separator = options.separator || ".";
      this.path = [];
      this.siblingStacks = [];
    }
    /**
     * Push a new tag onto the path
     * @param {string} tagName - Name of the tag
     * @param {Object} attrValues - Attribute key-value pairs for current node (optional)
     * @param {string} namespace - Namespace for the tag (optional)
     */
    push(tagName, attrValues = null, namespace = null) {
      if (this.path.length > 0) {
        const prev = this.path[this.path.length - 1];
        prev.values = void 0;
      }
      const currentLevel = this.path.length;
      if (!this.siblingStacks[currentLevel]) {
        this.siblingStacks[currentLevel] = /* @__PURE__ */ new Map();
      }
      const siblings = this.siblingStacks[currentLevel];
      const siblingKey = namespace ? `${namespace}:${tagName}` : tagName;
      const counter2 = siblings.get(siblingKey) || 0;
      let position = 0;
      for (const count of siblings.values()) {
        position += count;
      }
      siblings.set(siblingKey, counter2 + 1);
      const node = {
        tag: tagName,
        position,
        counter: counter2
      };
      if (namespace !== null && namespace !== void 0) {
        node.namespace = namespace;
      }
      if (attrValues !== null && attrValues !== void 0) {
        node.values = attrValues;
      }
      this.path.push(node);
    }
    /**
     * Pop the last tag from the path
     * @returns {Object|undefined} The popped node
     */
    pop() {
      if (this.path.length === 0) {
        return void 0;
      }
      const node = this.path.pop();
      if (this.siblingStacks.length > this.path.length + 1) {
        this.siblingStacks.length = this.path.length + 1;
      }
      return node;
    }
    /**
     * Update current node's attribute values
     * Useful when attributes are parsed after push
     * @param {Object} attrValues - Attribute values
     */
    updateCurrent(attrValues) {
      if (this.path.length > 0) {
        const current = this.path[this.path.length - 1];
        if (attrValues !== null && attrValues !== void 0) {
          current.values = attrValues;
        }
      }
    }
    /**
     * Get current tag name
     * @returns {string|undefined}
     */
    getCurrentTag() {
      return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
    }
    /**
     * Get current namespace
     * @returns {string|undefined}
     */
    getCurrentNamespace() {
      return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
    }
    /**
     * Get current node's attribute value
     * @param {string} attrName - Attribute name
     * @returns {*} Attribute value or undefined
     */
    getAttrValue(attrName) {
      if (this.path.length === 0) return void 0;
      const current = this.path[this.path.length - 1];
      return current.values?.[attrName];
    }
    /**
     * Check if current node has an attribute
     * @param {string} attrName - Attribute name
     * @returns {boolean}
     */
    hasAttr(attrName) {
      if (this.path.length === 0) return false;
      const current = this.path[this.path.length - 1];
      return current.values !== void 0 && attrName in current.values;
    }
    /**
     * Get current node's sibling position (child index in parent)
     * @returns {number}
     */
    getPosition() {
      if (this.path.length === 0) return -1;
      return this.path[this.path.length - 1].position ?? 0;
    }
    /**
     * Get current node's repeat counter (occurrence count of this tag name)
     * @returns {number}
     */
    getCounter() {
      if (this.path.length === 0) return -1;
      return this.path[this.path.length - 1].counter ?? 0;
    }
    /**
     * Get current node's sibling index (alias for getPosition for backward compatibility)
     * @returns {number}
     * @deprecated Use getPosition() or getCounter() instead
     */
    getIndex() {
      return this.getPosition();
    }
    /**
     * Get current path depth
     * @returns {number}
     */
    getDepth() {
      return this.path.length;
    }
    /**
     * Get path as string
     * @param {string} separator - Optional separator (uses default if not provided)
     * @param {boolean} includeNamespace - Whether to include namespace in output (default: true)
     * @returns {string}
     */
    toString(separator, includeNamespace = true) {
      const sep = separator || this.separator;
      return this.path.map((n) => {
        if (includeNamespace && n.namespace) {
          return `${n.namespace}:${n.tag}`;
        }
        return n.tag;
      }).join(sep);
    }
    /**
     * Get path as array of tag names
     * @returns {string[]}
     */
    toArray() {
      return this.path.map((n) => n.tag);
    }
    /**
     * Reset the path to empty
     */
    reset() {
      this.path = [];
      this.siblingStacks = [];
    }
    /**
     * Match current path against an Expression
     * @param {Expression} expression - The expression to match against
     * @returns {boolean} True if current path matches the expression
     */
    matches(expression) {
      const segments = expression.segments;
      if (segments.length === 0) {
        return false;
      }
      if (expression.hasDeepWildcard()) {
        return this._matchWithDeepWildcard(segments);
      }
      return this._matchSimple(segments);
    }
    /**
     * Match simple path (no deep wildcards)
     * @private
     */
    _matchSimple(segments) {
      if (this.path.length !== segments.length) {
        return false;
      }
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const node = this.path[i];
        const isCurrentNode = i === this.path.length - 1;
        if (!this._matchSegment(segment, node, isCurrentNode)) {
          return false;
        }
      }
      return true;
    }
    /**
     * Match path with deep wildcards
     * @private
     */
    _matchWithDeepWildcard(segments) {
      let pathIdx = this.path.length - 1;
      let segIdx = segments.length - 1;
      while (segIdx >= 0 && pathIdx >= 0) {
        const segment = segments[segIdx];
        if (segment.type === "deep-wildcard") {
          segIdx--;
          if (segIdx < 0) {
            return true;
          }
          const nextSeg = segments[segIdx];
          let found = false;
          for (let i = pathIdx; i >= 0; i--) {
            const isCurrentNode = i === this.path.length - 1;
            if (this._matchSegment(nextSeg, this.path[i], isCurrentNode)) {
              pathIdx = i - 1;
              segIdx--;
              found = true;
              break;
            }
          }
          if (!found) {
            return false;
          }
        } else {
          const isCurrentNode = pathIdx === this.path.length - 1;
          if (!this._matchSegment(segment, this.path[pathIdx], isCurrentNode)) {
            return false;
          }
          pathIdx--;
          segIdx--;
        }
      }
      return segIdx < 0;
    }
    /**
     * Match a single segment against a node
     * @private
     * @param {Object} segment - Segment from Expression
     * @param {Object} node - Node from path
     * @param {boolean} isCurrentNode - Whether this is the current (last) node
     * @returns {boolean}
     */
    _matchSegment(segment, node, isCurrentNode) {
      if (segment.tag !== "*" && segment.tag !== node.tag) {
        return false;
      }
      if (segment.namespace !== void 0) {
        if (segment.namespace !== "*" && segment.namespace !== node.namespace) {
          return false;
        }
      }
      if (segment.attrName !== void 0) {
        if (!isCurrentNode) {
          return false;
        }
        if (!node.values || !(segment.attrName in node.values)) {
          return false;
        }
        if (segment.attrValue !== void 0) {
          const actualValue = node.values[segment.attrName];
          if (String(actualValue) !== String(segment.attrValue)) {
            return false;
          }
        }
      }
      if (segment.position !== void 0) {
        if (!isCurrentNode) {
          return false;
        }
        const counter2 = node.counter ?? 0;
        if (segment.position === "first" && counter2 !== 0) {
          return false;
        } else if (segment.position === "odd" && counter2 % 2 !== 1) {
          return false;
        } else if (segment.position === "even" && counter2 % 2 !== 0) {
          return false;
        } else if (segment.position === "nth") {
          if (counter2 !== segment.positionValue) {
            return false;
          }
        }
      }
      return true;
    }
    /**
     * Create a snapshot of current state
     * @returns {Object} State snapshot
     */
    snapshot() {
      return {
        path: this.path.map((node) => ({ ...node })),
        siblingStacks: this.siblingStacks.map((map) => new Map(map))
      };
    }
    /**
     * Restore state from snapshot
     * @param {Object} snapshot - State snapshot
     */
    restore(snapshot) {
      this.path = snapshot.path.map((node) => ({ ...node }));
      this.siblingStacks = snapshot.siblingStacks.map((map) => new Map(map));
    }
    /**
     * Return a read-only view of this matcher.
     *
     * The returned object exposes all query/inspection methods but throws a
     * TypeError if any state-mutating method is called (`push`, `pop`, `reset`,
     * `updateCurrent`, `restore`).  Property reads (e.g. `.path`, `.separator`)
     * are allowed but the returned arrays/objects are frozen so callers cannot
     * mutate internal state through them either.
     *
     * @returns {ReadOnlyMatcher} A proxy that forwards read operations and blocks writes.
     *
     * @example
     * const matcher = new Matcher();
     * matcher.push("root", {});
     *
     * const ro = matcher.readOnly();
     * ro.matches(expr);      // ✓ works
     * ro.getCurrentTag();    // ✓ works
     * ro.push("child", {}); // ✗ throws TypeError
     * ro.reset();            // ✗ throws TypeError
     */
    readOnly() {
      const self = this;
      return new Proxy(self, {
        get(target, prop, receiver) {
          if (MUTATING_METHODS2.has(prop)) {
            return () => {
              throw new TypeError(
                `Cannot call '${prop}' on a read-only Matcher. Obtain a writable instance to mutate state.`
              );
            };
          }
          const value = Reflect.get(target, prop, receiver);
          if (prop === "path" || prop === "siblingStacks") {
            return Object.freeze(
              Array.isArray(value) ? value.map(
                (item) => item instanceof Map ? Object.freeze(new Map(item)) : Object.freeze({ ...item })
                // freeze a copy of each node
              ) : value
            );
          }
          if (typeof value === "function") {
            return value.bind(target);
          }
          return value;
        },
        // Prevent any property assignment on the read-only view
        set(_target, prop) {
          throw new TypeError(
            `Cannot set property '${String(prop)}' on a read-only Matcher.`
          );
        },
        // Prevent property deletion
        deleteProperty(_target, prop) {
          throw new TypeError(
            `Cannot delete property '${String(prop)}' from a read-only Matcher.`
          );
        }
      });
    }
  };

  // node_modules/fast-xml-builder/src/orderedJs2Xml.js
  var EOL = "\n";
  function toXml(jArray, options) {
    let indentation = "";
    if (options.format && options.indentBy.length > 0) {
      indentation = EOL;
    }
    const stopNodeExpressions = [];
    if (options.stopNodes && Array.isArray(options.stopNodes)) {
      for (let i = 0; i < options.stopNodes.length; i++) {
        const node = options.stopNodes[i];
        if (typeof node === "string") {
          stopNodeExpressions.push(new Expression2(node));
        } else if (node instanceof Expression2) {
          stopNodeExpressions.push(node);
        }
      }
    }
    const matcher = new Matcher2();
    return arrToStr(jArray, options, indentation, matcher, stopNodeExpressions);
  }
  function arrToStr(arr, options, indentation, matcher, stopNodeExpressions) {
    let xmlStr = "";
    let isPreviousElementTag = false;
    if (options.maxNestedTags && matcher.getDepth() > options.maxNestedTags) {
      throw new Error("Maximum nested tags exceeded");
    }
    if (!Array.isArray(arr)) {
      if (arr !== void 0 && arr !== null) {
        let text = arr.toString();
        text = replaceEntitiesValue2(text, options);
        return text;
      }
      return "";
    }
    for (let i = 0; i < arr.length; i++) {
      const tagObj = arr[i];
      const tagName = propName2(tagObj);
      if (tagName === void 0) continue;
      const attrValues = extractAttributeValues(tagObj[":@"], options);
      matcher.push(tagName, attrValues);
      const isStopNode = checkStopNode(matcher, stopNodeExpressions);
      if (tagName === options.textNodeName) {
        let tagText = tagObj[tagName];
        if (!isStopNode) {
          tagText = options.tagValueProcessor(tagName, tagText);
          tagText = replaceEntitiesValue2(tagText, options);
        }
        if (isPreviousElementTag) {
          xmlStr += indentation;
        }
        xmlStr += tagText;
        isPreviousElementTag = false;
        matcher.pop();
        continue;
      } else if (tagName === options.cdataPropName) {
        if (isPreviousElementTag) {
          xmlStr += indentation;
        }
        xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
        isPreviousElementTag = false;
        matcher.pop();
        continue;
      } else if (tagName === options.commentPropName) {
        xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
        isPreviousElementTag = true;
        matcher.pop();
        continue;
      } else if (tagName[0] === "?") {
        const attStr2 = attr_to_str(tagObj[":@"], options, isStopNode);
        const tempInd = tagName === "?xml" ? "" : indentation;
        let piTextNodeName = tagObj[tagName][0][options.textNodeName];
        piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
        xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
        isPreviousElementTag = true;
        matcher.pop();
        continue;
      }
      let newIdentation = indentation;
      if (newIdentation !== "") {
        newIdentation += options.indentBy;
      }
      const attStr = attr_to_str(tagObj[":@"], options, isStopNode);
      const tagStart = indentation + `<${tagName}${attStr}`;
      let tagValue;
      if (isStopNode) {
        tagValue = getRawContent(tagObj[tagName], options);
      } else {
        tagValue = arrToStr(tagObj[tagName], options, newIdentation, matcher, stopNodeExpressions);
      }
      if (options.unpairedTags.indexOf(tagName) !== -1) {
        if (options.suppressUnpairedNode) xmlStr += tagStart + ">";
        else xmlStr += tagStart + "/>";
      } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
        xmlStr += tagStart + "/>";
      } else if (tagValue && tagValue.endsWith(">")) {
        xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
      } else {
        xmlStr += tagStart + ">";
        if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
          xmlStr += indentation + options.indentBy + tagValue + indentation;
        } else {
          xmlStr += tagValue;
        }
        xmlStr += `</${tagName}>`;
      }
      isPreviousElementTag = true;
      matcher.pop();
    }
    return xmlStr;
  }
  function extractAttributeValues(attrMap, options) {
    if (!attrMap || options.ignoreAttributes) return null;
    const attrValues = {};
    let hasAttrs = false;
    for (let attr in attrMap) {
      if (!Object.prototype.hasOwnProperty.call(attrMap, attr)) continue;
      const cleanAttrName = attr.startsWith(options.attributeNamePrefix) ? attr.substr(options.attributeNamePrefix.length) : attr;
      attrValues[cleanAttrName] = attrMap[attr];
      hasAttrs = true;
    }
    return hasAttrs ? attrValues : null;
  }
  function getRawContent(arr, options) {
    if (!Array.isArray(arr)) {
      if (arr !== void 0 && arr !== null) {
        return arr.toString();
      }
      return "";
    }
    let content = "";
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const tagName = propName2(item);
      if (tagName === options.textNodeName) {
        content += item[tagName];
      } else if (tagName === options.cdataPropName) {
        content += item[tagName][0][options.textNodeName];
      } else if (tagName === options.commentPropName) {
        content += item[tagName][0][options.textNodeName];
      } else if (tagName && tagName[0] === "?") {
        continue;
      } else if (tagName) {
        const attStr = attr_to_str_raw(item[":@"], options);
        const nestedContent = getRawContent(item[tagName], options);
        if (!nestedContent || nestedContent.length === 0) {
          content += `<${tagName}${attStr}/>`;
        } else {
          content += `<${tagName}${attStr}>${nestedContent}</${tagName}>`;
        }
      }
    }
    return content;
  }
  function attr_to_str_raw(attrMap, options) {
    let attrStr = "";
    if (attrMap && !options.ignoreAttributes) {
      for (let attr in attrMap) {
        if (!Object.prototype.hasOwnProperty.call(attrMap, attr)) continue;
        let attrVal = attrMap[attr];
        if (attrVal === true && options.suppressBooleanAttributes) {
          attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
        } else {
          attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
        }
      }
    }
    return attrStr;
  }
  function propName2(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      if (key !== ":@") return key;
    }
  }
  function attr_to_str(attrMap, options, isStopNode) {
    let attrStr = "";
    if (attrMap && !options.ignoreAttributes) {
      for (let attr in attrMap) {
        if (!Object.prototype.hasOwnProperty.call(attrMap, attr)) continue;
        let attrVal;
        if (isStopNode) {
          attrVal = attrMap[attr];
        } else {
          attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
          attrVal = replaceEntitiesValue2(attrVal, options);
        }
        if (attrVal === true && options.suppressBooleanAttributes) {
          attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
        } else {
          attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
        }
      }
    }
    return attrStr;
  }
  function checkStopNode(matcher, stopNodeExpressions) {
    if (!stopNodeExpressions || stopNodeExpressions.length === 0) return false;
    for (let i = 0; i < stopNodeExpressions.length; i++) {
      if (matcher.matches(stopNodeExpressions[i])) {
        return true;
      }
    }
    return false;
  }
  function replaceEntitiesValue2(textValue, options) {
    if (textValue && textValue.length > 0 && options.processEntities) {
      for (let i = 0; i < options.entities.length; i++) {
        const entity = options.entities[i];
        textValue = textValue.replace(entity.regex, entity.val);
      }
    }
    return textValue;
  }

  // node_modules/fast-xml-builder/src/ignoreAttributes.js
  function getIgnoreAttributesFn2(ignoreAttributes) {
    if (typeof ignoreAttributes === "function") {
      return ignoreAttributes;
    }
    if (Array.isArray(ignoreAttributes)) {
      return (attrName) => {
        for (const pattern of ignoreAttributes) {
          if (typeof pattern === "string" && attrName === pattern) {
            return true;
          }
          if (pattern instanceof RegExp && pattern.test(attrName)) {
            return true;
          }
        }
      };
    }
    return () => false;
  }

  // node_modules/fast-xml-builder/src/fxb.js
  var defaultOptions3 = {
    attributeNamePrefix: "@_",
    attributesGroupName: false,
    textNodeName: "#text",
    ignoreAttributes: true,
    cdataPropName: false,
    format: false,
    indentBy: "  ",
    suppressEmptyNode: false,
    suppressUnpairedNode: true,
    suppressBooleanAttributes: true,
    tagValueProcessor: function(key, a) {
      return a;
    },
    attributeValueProcessor: function(attrName, a) {
      return a;
    },
    preserveOrder: false,
    commentPropName: false,
    unpairedTags: [],
    entities: [
      { regex: new RegExp("&", "g"), val: "&amp;" },
      //it must be on top
      { regex: new RegExp(">", "g"), val: "&gt;" },
      { regex: new RegExp("<", "g"), val: "&lt;" },
      { regex: new RegExp("'", "g"), val: "&apos;" },
      { regex: new RegExp('"', "g"), val: "&quot;" }
    ],
    processEntities: true,
    stopNodes: [],
    // transformTagName: false,
    // transformAttributeName: false,
    oneListGroup: false,
    maxNestedTags: 100,
    jPath: true
    // When true, callbacks receive string jPath; when false, receive Matcher instance
  };
  function Builder(options) {
    this.options = Object.assign({}, defaultOptions3, options);
    if (this.options.stopNodes && Array.isArray(this.options.stopNodes)) {
      this.options.stopNodes = this.options.stopNodes.map((node) => {
        if (typeof node === "string" && node.startsWith("*.")) {
          return ".." + node.substring(2);
        }
        return node;
      });
    }
    this.stopNodeExpressions = [];
    if (this.options.stopNodes && Array.isArray(this.options.stopNodes)) {
      for (let i = 0; i < this.options.stopNodes.length; i++) {
        const node = this.options.stopNodes[i];
        if (typeof node === "string") {
          this.stopNodeExpressions.push(new Expression2(node));
        } else if (node instanceof Expression2) {
          this.stopNodeExpressions.push(node);
        }
      }
    }
    if (this.options.ignoreAttributes === true || this.options.attributesGroupName) {
      this.isAttribute = function() {
        return false;
      };
    } else {
      this.ignoreAttributesFn = getIgnoreAttributesFn2(this.options.ignoreAttributes);
      this.attrPrefixLen = this.options.attributeNamePrefix.length;
      this.isAttribute = isAttribute;
    }
    this.processTextOrObjNode = processTextOrObjNode;
    if (this.options.format) {
      this.indentate = indentate;
      this.tagEndChar = ">\n";
      this.newLine = "\n";
    } else {
      this.indentate = function() {
        return "";
      };
      this.tagEndChar = ">";
      this.newLine = "";
    }
  }
  Builder.prototype.build = function(jObj) {
    if (this.options.preserveOrder) {
      return toXml(jObj, this.options);
    } else {
      if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
        jObj = {
          [this.options.arrayNodeName]: jObj
        };
      }
      const matcher = new Matcher2();
      return this.j2x(jObj, 0, matcher).val;
    }
  };
  Builder.prototype.j2x = function(jObj, level, matcher) {
    let attrStr = "";
    let val = "";
    if (this.options.maxNestedTags && matcher.getDepth() >= this.options.maxNestedTags) {
      throw new Error("Maximum nested tags exceeded");
    }
    const jPath = this.options.jPath ? matcher.toString() : matcher;
    const isCurrentStopNode = this.checkStopNode(matcher);
    for (let key in jObj) {
      if (!Object.prototype.hasOwnProperty.call(jObj, key)) continue;
      if (typeof jObj[key] === "undefined") {
        if (this.isAttribute(key)) {
          val += "";
        }
      } else if (jObj[key] === null) {
        if (this.isAttribute(key)) {
          val += "";
        } else if (key === this.options.cdataPropName) {
          val += "";
        } else if (key[0] === "?") {
          val += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
        } else {
          val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        }
      } else if (jObj[key] instanceof Date) {
        val += this.buildTextValNode(jObj[key], key, "", level, matcher);
      } else if (typeof jObj[key] !== "object") {
        const attr = this.isAttribute(key);
        if (attr && !this.ignoreAttributesFn(attr, jPath)) {
          attrStr += this.buildAttrPairStr(attr, "" + jObj[key], isCurrentStopNode);
        } else if (!attr) {
          if (key === this.options.textNodeName) {
            let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
            val += this.replaceEntitiesValue(newval);
          } else {
            matcher.push(key);
            const isStopNode = this.checkStopNode(matcher);
            matcher.pop();
            if (isStopNode) {
              const textValue = "" + jObj[key];
              if (textValue === "") {
                val += this.indentate(level) + "<" + key + this.closeTag(key) + this.tagEndChar;
              } else {
                val += this.indentate(level) + "<" + key + ">" + textValue + "</" + key + this.tagEndChar;
              }
            } else {
              val += this.buildTextValNode(jObj[key], key, "", level, matcher);
            }
          }
        }
      } else if (Array.isArray(jObj[key])) {
        const arrLen = jObj[key].length;
        let listTagVal = "";
        let listTagAttr = "";
        for (let j = 0; j < arrLen; j++) {
          const item = jObj[key][j];
          if (typeof item === "undefined") {
          } else if (item === null) {
            if (key[0] === "?") val += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
            else val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
          } else if (typeof item === "object") {
            if (this.options.oneListGroup) {
              matcher.push(key);
              const result = this.j2x(item, level + 1, matcher);
              matcher.pop();
              listTagVal += result.val;
              if (this.options.attributesGroupName && item.hasOwnProperty(this.options.attributesGroupName)) {
                listTagAttr += result.attrStr;
              }
            } else {
              listTagVal += this.processTextOrObjNode(item, key, level, matcher);
            }
          } else {
            if (this.options.oneListGroup) {
              let textValue = this.options.tagValueProcessor(key, item);
              textValue = this.replaceEntitiesValue(textValue);
              listTagVal += textValue;
            } else {
              matcher.push(key);
              const isStopNode = this.checkStopNode(matcher);
              matcher.pop();
              if (isStopNode) {
                const textValue = "" + item;
                if (textValue === "") {
                  listTagVal += this.indentate(level) + "<" + key + this.closeTag(key) + this.tagEndChar;
                } else {
                  listTagVal += this.indentate(level) + "<" + key + ">" + textValue + "</" + key + this.tagEndChar;
                }
              } else {
                listTagVal += this.buildTextValNode(item, key, "", level, matcher);
              }
            }
          }
        }
        if (this.options.oneListGroup) {
          listTagVal = this.buildObjectNode(listTagVal, key, listTagAttr, level);
        }
        val += listTagVal;
      } else {
        if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
          const Ks = Object.keys(jObj[key]);
          const L = Ks.length;
          for (let j = 0; j < L; j++) {
            attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]], isCurrentStopNode);
          }
        } else {
          val += this.processTextOrObjNode(jObj[key], key, level, matcher);
        }
      }
    }
    return { attrStr, val };
  };
  Builder.prototype.buildAttrPairStr = function(attrName, val, isStopNode) {
    if (!isStopNode) {
      val = this.options.attributeValueProcessor(attrName, "" + val);
      val = this.replaceEntitiesValue(val);
    }
    if (this.options.suppressBooleanAttributes && val === "true") {
      return " " + attrName;
    } else return " " + attrName + '="' + val + '"';
  };
  function processTextOrObjNode(object, key, level, matcher) {
    const attrValues = this.extractAttributes(object);
    matcher.push(key, attrValues);
    const isStopNode = this.checkStopNode(matcher);
    if (isStopNode) {
      const rawContent = this.buildRawContent(object);
      const attrStr = this.buildAttributesForStopNode(object);
      matcher.pop();
      return this.buildObjectNode(rawContent, key, attrStr, level);
    }
    const result = this.j2x(object, level + 1, matcher);
    matcher.pop();
    if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
      return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level, matcher);
    } else {
      return this.buildObjectNode(result.val, key, result.attrStr, level);
    }
  }
  Builder.prototype.extractAttributes = function(obj) {
    if (!obj || typeof obj !== "object") return null;
    const attrValues = {};
    let hasAttrs = false;
    if (this.options.attributesGroupName && obj[this.options.attributesGroupName]) {
      const attrGroup = obj[this.options.attributesGroupName];
      for (let attrKey in attrGroup) {
        if (!Object.prototype.hasOwnProperty.call(attrGroup, attrKey)) continue;
        const cleanKey = attrKey.startsWith(this.options.attributeNamePrefix) ? attrKey.substring(this.options.attributeNamePrefix.length) : attrKey;
        attrValues[cleanKey] = attrGroup[attrKey];
        hasAttrs = true;
      }
    } else {
      for (let key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
        const attr = this.isAttribute(key);
        if (attr) {
          attrValues[attr] = obj[key];
          hasAttrs = true;
        }
      }
    }
    return hasAttrs ? attrValues : null;
  };
  Builder.prototype.buildRawContent = function(obj) {
    if (typeof obj === "string") {
      return obj;
    }
    if (typeof obj !== "object" || obj === null) {
      return String(obj);
    }
    if (obj[this.options.textNodeName] !== void 0) {
      return obj[this.options.textNodeName];
    }
    let content = "";
    for (let key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      if (this.isAttribute(key)) continue;
      if (this.options.attributesGroupName && key === this.options.attributesGroupName) continue;
      const value = obj[key];
      if (key === this.options.textNodeName) {
        content += value;
      } else if (Array.isArray(value)) {
        for (let item of value) {
          if (typeof item === "string" || typeof item === "number") {
            content += `<${key}>${item}</${key}>`;
          } else if (typeof item === "object" && item !== null) {
            const nestedContent = this.buildRawContent(item);
            const nestedAttrs = this.buildAttributesForStopNode(item);
            if (nestedContent === "") {
              content += `<${key}${nestedAttrs}/>`;
            } else {
              content += `<${key}${nestedAttrs}>${nestedContent}</${key}>`;
            }
          }
        }
      } else if (typeof value === "object" && value !== null) {
        const nestedContent = this.buildRawContent(value);
        const nestedAttrs = this.buildAttributesForStopNode(value);
        if (nestedContent === "") {
          content += `<${key}${nestedAttrs}/>`;
        } else {
          content += `<${key}${nestedAttrs}>${nestedContent}</${key}>`;
        }
      } else {
        content += `<${key}>${value}</${key}>`;
      }
    }
    return content;
  };
  Builder.prototype.buildAttributesForStopNode = function(obj) {
    if (!obj || typeof obj !== "object") return "";
    let attrStr = "";
    if (this.options.attributesGroupName && obj[this.options.attributesGroupName]) {
      const attrGroup = obj[this.options.attributesGroupName];
      for (let attrKey in attrGroup) {
        if (!Object.prototype.hasOwnProperty.call(attrGroup, attrKey)) continue;
        const cleanKey = attrKey.startsWith(this.options.attributeNamePrefix) ? attrKey.substring(this.options.attributeNamePrefix.length) : attrKey;
        const val = attrGroup[attrKey];
        if (val === true && this.options.suppressBooleanAttributes) {
          attrStr += " " + cleanKey;
        } else {
          attrStr += " " + cleanKey + '="' + val + '"';
        }
      }
    } else {
      for (let key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
        const attr = this.isAttribute(key);
        if (attr) {
          const val = obj[key];
          if (val === true && this.options.suppressBooleanAttributes) {
            attrStr += " " + attr;
          } else {
            attrStr += " " + attr + '="' + val + '"';
          }
        }
      }
    }
    return attrStr;
  };
  Builder.prototype.buildObjectNode = function(val, key, attrStr, level) {
    if (val === "") {
      if (key[0] === "?") return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
      else {
        return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
      }
    } else {
      let tagEndExp = "</" + key + this.tagEndChar;
      let piClosingChar = "";
      if (key[0] === "?") {
        piClosingChar = "?";
        tagEndExp = "";
      }
      if ((attrStr || attrStr === "") && val.indexOf("<") === -1) {
        return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val + tagEndExp;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
        return this.indentate(level) + `<!--${val}-->` + this.newLine;
      } else {
        return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val + this.indentate(level) + tagEndExp;
      }
    }
  };
  Builder.prototype.closeTag = function(key) {
    let closeTag = "";
    if (this.options.unpairedTags.indexOf(key) !== -1) {
      if (!this.options.suppressUnpairedNode) closeTag = "/";
    } else if (this.options.suppressEmptyNode) {
      closeTag = "/";
    } else {
      closeTag = `></${key}`;
    }
    return closeTag;
  };
  Builder.prototype.checkStopNode = function(matcher) {
    if (!this.stopNodeExpressions || this.stopNodeExpressions.length === 0) return false;
    for (let i = 0; i < this.stopNodeExpressions.length; i++) {
      if (matcher.matches(this.stopNodeExpressions[i])) {
        return true;
      }
    }
    return false;
  };
  Builder.prototype.buildTextValNode = function(val, key, attrStr, level, matcher) {
    if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
      return this.indentate(level) + `<![CDATA[${val}]]>` + this.newLine;
    } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
      return this.indentate(level) + `<!--${val}-->` + this.newLine;
    } else if (key[0] === "?") {
      return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
    } else {
      let textValue = this.options.tagValueProcessor(key, val);
      textValue = this.replaceEntitiesValue(textValue);
      if (textValue === "") {
        return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
      } else {
        return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
      }
    }
  };
  Builder.prototype.replaceEntitiesValue = function(textValue) {
    if (textValue && textValue.length > 0 && this.options.processEntities) {
      for (let i = 0; i < this.options.entities.length; i++) {
        const entity = this.options.entities[i];
        textValue = textValue.replace(entity.regex, entity.val);
      }
    }
    return textValue;
  };
  function indentate(level) {
    return this.options.indentBy.repeat(level);
  }
  function isAttribute(name) {
    if (name.startsWith(this.options.attributeNamePrefix) && name !== this.options.textNodeName) {
      return name.substr(this.attrPrefixLen);
    } else {
      return false;
    }
  }

  // node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js
  var json2xml_default = Builder;

  // src/rc-message/rc-message.ts
  var RcMessage = class _RcMessage {
    static xmlOptions = {
      ignoreAttributes: false,
      attributeNamePrefix: "",
      attributesGroupName: "$",
      format: false,
      suppressEmptyNode: true
    };
    static fromXml(_xmlStr) {
      let xmlStr = _xmlStr;
      if (xmlStr.startsWith("P-rc: ")) {
        xmlStr = xmlStr.substring(6);
      }
      const parser = new XMLParser(_RcMessage.xmlOptions);
      const parsed = parser.parse(xmlStr);
      return new _RcMessage(parsed.Msg.Hdr.$, parsed.Msg.Bdy.$);
    }
    headers;
    body;
    constructor(headers, body) {
      this.headers = headers;
      this.body = body;
    }
    toXml() {
      const builder = new json2xml_default(_RcMessage.xmlOptions);
      const obj = {
        Msg: {
          Hdr: {
            $: this.headers
          },
          Bdy: {
            $: this.body
          }
        }
      };
      return builder.build(obj);
    }
  };
  var rc_message_default = RcMessage;

  // src/rc-message/call-control-commands.ts
  var callControlCommands = {
    // one way messages from server to client
    ChangeMessage: 1,
    ServerFreeResources: 2,
    NewMsg: 3,
    ReLogin: 4,
    ChangePhones: 5,
    // Call control messages from server to client
    IncomingCall: 6,
    AlreadyProcessed: 7,
    ClientMinimize: 8,
    SessionClose: 9,
    // Call control messages from client to server
    ClientForward: 10,
    ClientVoicemail: 11,
    ClientReject: 12,
    ClientStartReply: 13,
    ClientReply: 14,
    ClientNotProcessed: 15,
    ClientClosed: 16,
    ClientReceiveConfirm: 17
  };
  var call_control_commands_default = callControlCommands;

  // src/call-session/inbound.ts
  var InboundCallSession = class extends call_session_default {
    constructor(webPhone, inviteMessage) {
      super(webPhone);
      this.sipMessage = inviteMessage;
      this.localPeer = inviteMessage.headers.To;
      this.remotePeer = inviteMessage.headers.From;
      this.direction = "inbound";
      this.state = "ringing";
      this.emit("ringing");
    }
    // for inbound calls from call queue, there might be p-rc-api-call-info header:
    // p-rc-api-call-info: callAttributes=queue-call,reject;callerIdName=WIRELESS CALLER;displayInfo=queueName;displayInfoSub=callerIdName;queueName=Tyler's call queue
    // when there is no such a header, the method returns undefined
    get rcApiCallInfo() {
      if (!this.sipMessage.headers["p-rc-api-call-info"]) {
        return void 0;
      }
      return Object.fromEntries(
        this.sipMessage.headers["p-rc-api-call-info"].split(";").map((pair) => pair.trim()).filter(Boolean).map((pair) => {
          const [key, ...rest] = pair.split("=");
          return [key, rest.join("=")];
        })
      );
    }
    async confirmReceive() {
      await this.sendRcMessage(call_control_commands_default.ClientReceiveConfirm);
    }
    async toVoicemail() {
      await this.sendRcMessage(call_control_commands_default.ClientVoicemail);
      return new Promise((resolve) => {
        const handler = (outboundMessage) => {
          if (outboundMessage.headers["Call-Id"] === this.callId && outboundMessage.headers.CSeq.endsWith(" CANCEL")) {
            this.webPhone.sipClient.off("outboundMessage", handler);
            resolve();
          }
        };
        this.webPhone.sipClient.on("outboundMessage", handler);
      });
    }
    async decline() {
      await this.sendRcMessage(call_control_commands_default.ClientReject);
      return new Promise((resolve) => {
        const handler = (outboundMessage) => {
          if (outboundMessage.headers["Call-Id"] === this.callId && outboundMessage.headers.CSeq.endsWith(" CANCEL")) {
            this.webPhone.sipClient.off("outboundMessage", handler);
            resolve();
          }
        };
        this.webPhone.sipClient.on("outboundMessage", handler);
      });
    }
    async forward(target) {
      await this.sendRcMessage(call_control_commands_default.ClientForward, {
        FwdDly: "0",
        Phn: target,
        PhnTp: "3"
      });
      return new Promise((resolve) => {
        const handler = (inboundMessage) => {
          if (inboundMessage.subject.startsWith("CANCEL sip:")) {
            this.webPhone.sipClient.off("inboundMessage", handler);
            resolve();
          }
        };
        this.webPhone.sipClient.on("inboundMessage", handler);
      });
    }
    async startReply() {
      await this.sendRcMessage(call_control_commands_default.ClientStartReply);
    }
    async reply(text) {
      await this.sendRcMessage(call_control_commands_default.ClientReply, {
        RepTp: "0",
        Bdy: text
      });
      return new Promise((resolve) => {
        const sessionCloseHandler = async (inboundMessage) => {
          if (inboundMessage.subject.startsWith("MESSAGE sip:")) {
            const rcMessage = await rc_message_default.fromXml(inboundMessage.body);
            if (rcMessage.headers.Cmd === call_control_commands_default.SessionClose.toString()) {
              this.webPhone.sipClient.off("inboundMessage", sessionCloseHandler);
              resolve(rcMessage);
            }
          }
        };
        this.webPhone.sipClient.on("inboundMessage", sessionCloseHandler);
      });
    }
    async answer() {
      await this.init();
      if (this.sipMessage.body.length > 0) {
        await this.rtcPeerConnection.setRemoteDescription({
          type: "offer",
          sdp: this.sipMessage.body
        });
        const answer = await this.rtcPeerConnection.createAnswer();
        await this.rtcPeerConnection.setLocalDescription(answer);
        await new Promise((resolve) => {
          this.rtcPeerConnection.onicecandidate = (event) => {
            if (event.candidate === null) {
              resolve(true);
            }
          };
          setTimeout(() => resolve(false), 2e3);
        });
        const newMessage = new response_default(this.sipMessage, {
          responseCode: 200,
          headers: {
            "Content-Type": "application/sdp"
          },
          body: this.rtcPeerConnection.localDescription.sdp
        });
        await this.webPhone.sipClient.reply(newMessage);
      } else {
        const offer = await this.rtcPeerConnection.createOffer({
          iceRestart: true
        });
        await this.rtcPeerConnection.setLocalDescription(offer);
        await new Promise((resolve) => {
          const timeout = setTimeout(() => {
            if (this.webPhone.options.debug) {
              console.warn(
                "srflx candidate not found within 2 seconds \u2014 proceeding anyway."
              );
            }
            cleanup();
            resolve();
          }, 2e3);
          const onIceCandidate = (event) => {
            const candidate = event.candidate?.candidate;
            if (!candidate) return;
            if (candidate.includes("typ srflx")) {
              cleanup();
              setTimeout(() => {
                resolve();
              }, 500);
            }
          };
          const cleanup = () => {
            clearTimeout(timeout);
            this.rtcPeerConnection.removeEventListener(
              "icecandidate",
              onIceCandidate
            );
          };
          this.rtcPeerConnection.addEventListener("icecandidate", onIceCandidate);
        });
        const newMessage = new response_default(this.sipMessage, {
          responseCode: 200,
          headers: {
            "Content-Type": "application/sdp"
          },
          body: this.rtcPeerConnection.localDescription.sdp
        });
        const ackMessage = await this.webPhone.sipClient.request(
          newMessage
        );
        this.rtcPeerConnection.setRemoteDescription({
          type: "answer",
          sdp: ackMessage.body
        });
      }
      this.state = "answered";
      this.emit("answered");
      return new Promise((resolve) => {
        const handler = async (inboundMessage) => {
          if (inboundMessage.subject.startsWith("MESSAGE sip:")) {
            const rcMessage = await rc_message_default.fromXml(inboundMessage.body);
            if (rcMessage.headers.Cmd === call_control_commands_default.AlreadyProcessed.toString()) {
              this.webPhone.sipClient.off("inboundMessage", handler);
              resolve();
            }
          }
        };
        this.webPhone.sipClient.on("inboundMessage", handler);
      });
    }
    async sendRcMessage(cmd, body = {}) {
      if (!this.sipMessage.headers["P-rc"]) {
        return;
      }
      const rcMessage = await rc_message_default.fromXml(this.sipMessage.headers["P-rc"]);
      const newRcMessage = new rc_message_default(
        {
          SID: rcMessage.headers.SID,
          Req: rcMessage.headers.Req,
          From: rcMessage.headers.To,
          To: rcMessage.headers.From,
          Cmd: cmd.toString()
        },
        {
          Cln: this.webPhone.sipInfo.authorizationId,
          ...body
        }
      );
      const requestSipMessage = new request_default(
        `MESSAGE sip:${newRcMessage.headers.To} SIP/2.0`,
        {
          Via: `SIP/2.0/WSS ${fakeDomain};branch=${branch()}`,
          To: `<sip:${newRcMessage.headers.To}>`,
          From: `<sip:${this.webPhone.sipInfo.username}@${this.webPhone.sipInfo.domain}>;tag=${uuid()}`,
          "Call-Id": this.callId,
          "Content-Type": "x-rc/agent"
        },
        newRcMessage.toXml()
      );
      await this.webPhone.sipClient.request(requestSipMessage);
    }
  };
  var inbound_default = InboundCallSession;

  // src/call-session/outbound.ts
  var OutboundCallSession = class extends call_session_default {
    constructor(webPhone, callee) {
      super(webPhone);
      this.callee = callee;
      this.direction = "outbound";
    }
    callee;
    get remoteNumber() {
      return this.remotePeer ? super.remoteNumber : this.callee;
    }
    async call(callerId, options) {
      const offer = await this.rtcPeerConnection.createOffer({
        iceRestart: true
      });
      await this.rtcPeerConnection.setLocalDescription(offer);
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          if (this.webPhone.options.debug) {
            console.warn(
              "srflx candidate not found within 2 seconds \u2014 proceeding anyway."
            );
          }
          cleanup();
          resolve();
        }, 2e3);
        const onIceCandidate = (event) => {
          const candidate = event.candidate?.candidate;
          if (!candidate) return;
          if (candidate.includes("typ srflx")) {
            cleanup();
            setTimeout(() => {
              resolve();
            }, 500);
          }
        };
        const cleanup = () => {
          clearTimeout(timeout);
          this.rtcPeerConnection.removeEventListener(
            "icecandidate",
            onIceCandidate
          );
        };
        this.rtcPeerConnection.addEventListener("icecandidate", onIceCandidate);
      });
      const inviteMessage = new request_default(
        `INVITE sip:${this.callee}@${this.webPhone.sipInfo.domain} SIP/2.0`,
        {
          "Call-Id": this.callId,
          Contact: `<sip:${fakeEmail};transport=wss>;expires=60`,
          From: `<sip:${this.webPhone.sipInfo.username}@${this.webPhone.sipInfo.domain}>;tag=${uuid()}`,
          To: `<sip:${this.callee}@${this.webPhone.sipInfo.domain}>`,
          Via: `SIP/2.0/WSS ${fakeDomain};branch=${branch()}`,
          "Content-Type": "application/sdp"
        },
        this.rtcPeerConnection.localDescription.sdp
      );
      if (callerId) {
        inviteMessage.headers["P-Asserted-Identity"] = `sip:${callerId}@${this.webPhone.sipInfo.domain}`;
      }
      if (options?.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
          inviteMessage.headers[key] = value;
        }
      }
      const inboundMessage = await this.webPhone.sipClient.request(inviteMessage);
      if (inboundMessage.subject.startsWith("SIP/2.0 403 ")) {
        return;
      }
      const proxyAuthenticate = inboundMessage.headers["Proxy-Authenticate"];
      const nonce = proxyAuthenticate.match(/, nonce="(.+?)"/)[1];
      const newMessage = inviteMessage.fork();
      newMessage.headers["Proxy-Authorization"] = generateAuthorization(
        this.webPhone.sipInfo,
        nonce,
        "INVITE"
      );
      const progressMessage = await this.webPhone.sipClient.request(newMessage);
      this.sipMessage = progressMessage;
      this.state = "ringing";
      this.emit("ringing");
      this.localPeer = progressMessage.headers.From;
      this.remotePeer = progressMessage.headers.To;
      return new Promise((resolve) => {
        const answerHandler = async (message) => {
          if (message.headers.CSeq === this.sipMessage.headers.CSeq) {
            this.webPhone.sipClient.off("inboundMessage", answerHandler);
            if (message.subject !== "SIP/2.0 200 OK") {
              this.state = "failed";
              this.emit("failed", message.subject);
              const index = this.webPhone.callSessions.findIndex(
                (callSession) => callSession.callId === message.headers["Call-Id"]
              );
              if (index !== -1) {
                this.webPhone.callSessions.splice(index, 1);
              }
              this.dispose();
              resolve(false);
              return;
            }
            this.state = "answered";
            this.emit("answered");
            this.rtcPeerConnection.setRemoteDescription({
              type: "answer",
              sdp: message.body
            });
            const ackMessage = new request_default(
              `ACK ${extractAddress(this.remotePeer)} SIP/2.0`,
              {
                "Call-Id": this.callId,
                From: this.localPeer,
                To: this.remotePeer,
                Via: this.sipMessage.headers.Via,
                CSeq: this.sipMessage.headers.CSeq.replace(" INVITE", " ACK")
              }
            );
            await this.webPhone.sipClient.reply(ackMessage);
            resolve(true);
          }
        };
        this.webPhone.sipClient.on("inboundMessage", answerHandler);
      });
    }
    async cancel() {
      const requestMessage = new request_default(
        `CANCEL ${extractAddress(this.remotePeer)} SIP/2.0`,
        {
          "Call-Id": this.callId,
          From: this.localPeer,
          To: withoutTag(this.remotePeer),
          Via: this.sipMessage.headers.Via,
          CSeq: this.sipMessage.headers.CSeq.replace(" INVITE", " CANCEL")
        }
      );
      await this.webPhone.sipClient.request(requestMessage);
    }
  };
  var outbound_default2 = OutboundCallSession;

  // src/sip-message/inbound.ts
  var InboundMessage = class extends sip_message_default {
    static fromString(str) {
      const sipMessage = sip_message_default.fromString(str);
      sipMessage.direction = "inbound";
      return sipMessage;
    }
  };
  var inbound_default2 = InboundMessage;

  // src/sip-client.ts
  var maxExpires = 60;
  var DefaultSipClient = class extends event_emitter_default {
    disposed = false;
    wsc;
    sipInfo;
    instanceId;
    debug;
    timeoutHandle;
    constructor(options) {
      super();
      this.sipInfo = options.sipInfo;
      this.instanceId = options.instanceId ?? this.sipInfo.authorizationId;
      this.debug = options.debug ?? false;
    }
    async start() {
      await this.connect();
      if (this.timeoutHandle) {
        clearInterval(this.timeoutHandle);
      }
      await this.register(maxExpires);
    }
    useBackupOutboundProxy = false;
    toggleBackupOutboundProxy(enabled = true) {
      this.useBackupOutboundProxy = enabled;
    }
    connect() {
      this.wsc = new WebSocket(
        "wss://" + (this.useBackupOutboundProxy ? this.sipInfo.outboundProxyBackup : this.sipInfo.outboundProxy),
        "sip"
      );
      if (this.debug) {
        const wscSend = this.wsc.send.bind(this.wsc);
        this.wsc.send = (message) => {
          console.log(`Sending...(${/* @__PURE__ */ new Date()})
` + message);
          return wscSend(message);
        };
      }
      this.wsc.addEventListener("message", async (event) => {
        const inboundMessage = inbound_default2.fromString(event.data);
        if (inboundMessage.subject.startsWith("MESSAGE sip:")) {
          const rcMessage = await rc_message_default.fromXml(inboundMessage.body);
          if (rcMessage.body.Cln && rcMessage.body.Cln !== this.sipInfo.authorizationId) {
            return;
          }
        }
        if (this.debug) {
          console.log(`Receiving...(${/* @__PURE__ */ new Date()})
` + event.data);
        }
        this.emit("inboundMessage", inboundMessage);
        if (inboundMessage.subject.startsWith("MESSAGE sip:") || inboundMessage.subject.startsWith("BYE sip:") || inboundMessage.subject.startsWith("CANCEL sip:") || inboundMessage.subject.startsWith("INFO sip:") || inboundMessage.subject.startsWith("NOTIFY sip:")) {
          await this.reply(
            new response_default(inboundMessage, { responseCode: 200 })
          );
        }
      });
      return new Promise((resolve, reject) => {
        const openEventHandler = () => {
          this.wsc.removeEventListener("open", openEventHandler);
          resolve();
        };
        this.wsc.addEventListener("open", openEventHandler);
        const errorEventHandler = (e) => {
          this.wsc.removeEventListener("error", errorEventHandler);
          reject(e);
        };
        this.wsc.addEventListener("error", errorEventHandler);
      });
    }
    async dispose() {
      this.disposed = true;
      clearInterval(this.timeoutHandle);
      this.removeAllListeners();
      await this.unregister();
      this.wsc.close();
    }
    async register(expires) {
      const requestMessage = new request_default(
        `REGISTER sip:${this.sipInfo.domain} SIP/2.0`,
        {
          "Call-Id": uuid(),
          Contact: `<sip:${fakeEmail};transport=wss>;+sip.instance="<urn:uuid:${this.instanceId}>";expires=${expires}`,
          From: `<sip:${this.sipInfo.username}@${this.sipInfo.domain}>;tag=${uuid()}`,
          To: `<sip:${this.sipInfo.username}@${this.sipInfo.domain}>`,
          Via: `SIP/2.0/WSS ${fakeDomain};branch=${branch()}`
        }
      );
      const closeHandle = setTimeout(() => this.wsc.close(), 5e3);
      let inboundMessage = await this.request(requestMessage);
      clearTimeout(closeHandle);
      const wwwAuth = inboundMessage.headers["Www-Authenticate"] || inboundMessage.headers["WWW-Authenticate"];
      if (wwwAuth) {
        const nonce = wwwAuth.match(/, nonce="(.+?)"/)[1];
        const newMessage = requestMessage.fork();
        newMessage.headers.Authorization = generateAuthorization(
          this.sipInfo,
          nonce,
          "REGISTER"
        );
        inboundMessage = await this.request(newMessage);
      } else if (inboundMessage.subject.startsWith("SIP/2.0 603 ")) {
        throw new Error("Registration failed: " + inboundMessage.subject);
      }
      if (expires > 0) {
        const serverExpires = Number(
          inboundMessage.headers.Contact.match(/;expires=(\d+)/)[1]
        );
        this.timeoutHandle = setTimeout(
          () => {
            this.register(expires);
          },
          (serverExpires - 3) * 1e3
          // 3 seconds before server expires
        );
      }
    }
    async unregister() {
      await this.register(0);
    }
    async request(message) {
      return await this.send(message, true);
    }
    async reply(message) {
      await this.send(message, false);
    }
    send(message, waitForReply = false) {
      this.wsc.send(message.toString());
      this.emit("outboundMessage", message);
      if (!waitForReply) {
        return new Promise((resolve) => {
          resolve(new inbound_default2());
        });
      }
      return new Promise((resolve) => {
        const messageListerner = (inboundMessage) => {
          if (inboundMessage.headers.CSeq.trim().split(/\s+/)[0] !== message.headers.CSeq.trim().split(/\s+/)[0]) {
            return;
          }
          if (inboundMessage.subject.startsWith("SIP/2.0 100 ")) {
            return;
          }
          this.off("inboundMessage", messageListerner);
          resolve(inboundMessage);
        };
        this.on("inboundMessage", messageListerner);
      });
    }
  };
  var DummySipClient = class _DummySipClient extends event_emitter_default {
    static inboundMessage = new inbound_default2();
    disposed = false;
    wsc;
    async start() {
    }
    request() {
      return Promise.resolve(_DummySipClient.inboundMessage);
    }
    async reply() {
    }
    dispose() {
      this.disposed = true;
      return Promise.resolve();
    }
  };

  // src/device-manager.ts
  var DefaultDeviceManager = class {
    async getInputDeviceId() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const defaultInputDevice = devices.find(
        (device) => device.kind === "audioinput"
      );
      return defaultInputDevice.deviceId;
    }
    async getOutputDeviceId() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const defaultOutputDevice = devices.find(
        (device) => device.kind === "audiooutput"
      );
      return defaultOutputDevice?.deviceId;
    }
  };

  // src/index.ts
  var WebPhone = class extends event_emitter_default {
    sipInfo;
    sipClient;
    deviceManager;
    callSessions = [];
    autoAnswer = true;
    options;
    disposed = false;
    constructor(options) {
      super();
      this.options = options;
      this.sipInfo = options.sipInfo;
      this.sipClient = options.sipClient ?? new DefaultSipClient(options);
      this.deviceManager = options.deviceManager ?? new DefaultDeviceManager();
      this.autoAnswer = options.autoAnswer ?? true;
      this.sipClient.on(
        "inboundMessage",
        async (inboundMessage) => {
          if (inboundMessage.headers.CSeq.endsWith(" BYE") || inboundMessage.headers.CSeq.endsWith(" CANCEL")) {
            const index = this.callSessions.findIndex(
              (callSession2) => callSession2.callId === inboundMessage.headers["Call-Id"]
            );
            if (index !== -1) {
              const callSession2 = this.callSessions[index];
              this.callSessions.splice(index, 1);
              callSession2.dispose();
            }
          }
          if (!inboundMessage.subject.startsWith("INVITE sip:")) {
            return;
          }
          const callSession = this.callSessions.find((callSession2) => {
            return callSession2.callId === inboundMessage.headers["Call-Id"] && callSession2.localPeer === inboundMessage.headers.To && callSession2.remotePeer === inboundMessage.headers.From;
          });
          if (callSession) {
            callSession.handleReInvite(inboundMessage);
            return;
          }
          this.callSessions.push(new inbound_default(this, inboundMessage));
          const inboundCallSession = this.callSessions[this.callSessions.length - 1];
          this.emit("inboundCall", inboundCallSession);
          let tempMesage = new response_default(inboundMessage, {
            responseCode: 100
          });
          await this.sipClient.reply(tempMesage);
          tempMesage = new response_default(inboundMessage, { responseCode: 180 });
          await this.sipClient.reply(tempMesage);
          await inboundCallSession.confirmReceive();
          if (!this.autoAnswer) {
            return;
          }
          if (inboundCallSession.sipMessage.headers["Alert-Info"] !== "Auto Answer") {
            return;
          }
          let delay = 0;
          const callInfoHeader = inboundCallSession.sipMessage.headers["Call-Info"];
          if (callInfoHeader) {
            const match = callInfoHeader.match(/Answer-After=(\d+)/);
            if (match) {
              delay = parseInt(match[1], 10);
            }
          }
          setTimeout(() => {
            inboundCallSession.answer();
          }, delay);
        }
      );
    }
    async start() {
      await this.sipClient.start();
    }
    async dispose() {
      this.disposed = true;
      for (const callSession of this.callSessions) {
        if (callSession.state === "answered") {
          await callSession.hangup();
        } else if (callSession.direction === "inbound") {
          await callSession.decline();
        } else {
          await callSession.cancel();
        }
      }
      this.removeAllListeners();
      await this.sipClient.dispose();
    }
    // make an outbound call
    async call(callee, callerId, options) {
      this.callSessions.push(new outbound_default2(this, callee));
      const outboundCallSession = this.callSessions[this.callSessions.length - 1];
      this.emit("outboundCall", outboundCallSession);
      await outboundCallSession.init();
      await outboundCallSession.call(callerId, options);
      return outboundCallSession;
    }
  };
  var src_default = WebPhone;

  // browser-entry.ts
  globalThis.WebPhone = src_default;
})();
