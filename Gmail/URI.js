/*! URI.js v1.11.2 http://medialize.github.com/URI.js/ */
(function(f, m) {
    "object" === typeof exports ? module.exports = m() : "function" === typeof define && define.amd ? define(m) : f.IPv6 = m(f)
})(this, function(f) {
    var m = f && f.IPv6;
    return {
        best: function(g) {
            g = g.toLowerCase().split(":");
            var k = g.length,
                d = 8;
            "" === g[0] && "" === g[1] && "" === g[2] ? (g.shift(), g.shift()) : "" === g[0] && "" === g[1] ? g.shift() : "" === g[k - 1] && "" === g[k - 2] && g.pop();
            k = g.length; - 1 !== g[k - 1].indexOf(".") && (d = 7);
            var l;
            for (l = 0; l < k && "" !== g[l]; l++);
            if (l < d)
                for (g.splice(l, 1, "0000"); g.length < d;) g.splice(l, 0, "0000");
            for (l = 0; l < d; l++) {
                for (var k =
                        g[l].split(""), f = 0; 3 > f; f++)
                    if ("0" === k[0] && 1 < k.length) k.splice(0, 1);
                    else break;
                g[l] = k.join("")
            }
            var k = -1,
                m = f = 0,
                t = -1,
                v = !1;
            for (l = 0; l < d; l++) v ? "0" === g[l] ? m += 1 : (v = !1, m > f && (k = t, f = m)) : "0" == g[l] && (v = !0, t = l, m = 1);
            m > f && (k = t, f = m);
            1 < f && g.splice(k, f, "");
            k = g.length;
            d = "";
            "" === g[0] && (beststr = ":");
            for (l = 0; l < k; l++) {
                d += g[l];
                if (l === k - 1) break;
                d += ":"
            }
            "" === g[k - 1] && (d += ":");
            return d
        },
        noConflict: function() {
            f.IPv6 === this && (f.IPv6 = m);
            return this
        }
    }
});
(function(f) {
    function m(a) {
        throw RangeError(n[a]);
    }

    function g(a, b) {
        for (var c = a.length; c--;) a[c] = b(a[c]);
        return a
    }

    function k(a, b) {
        return g(a.split(h), b).join(".")
    }

    function d(a) {
        for (var b = [], c = 0, d = a.length, h, n; c < d;) h = a.charCodeAt(c++), 55296 <= h && 56319 >= h && c < d ? (n = a.charCodeAt(c++), 56320 == (n & 64512) ? b.push(((h & 1023) << 10) + (n & 1023) + 65536) : (b.push(h), c--)) : b.push(h);
        return b
    }

    function l(a) {
        return g(a, function(a) {
            var b = "";
            65535 < a && (a -= 65536, b += z(a >>> 10 & 1023 | 55296), a = 56320 | a & 1023);
            return b += z(a)
        }).join("")
    }

    function C(a,
        b) {
        return a + 22 + 75 * (26 > a) - ((0 != b) << 5)
    }

    function r(a, b, c) {
        var d = 0;
        a = c ? y(a / H) : a >> 1;
        for (a += y(a / b); a > w * x >> 1; d += p) a = y(a / w);
        return y(d + (w + 1) * a / (a + I))
    }

    function t(b) {
        var c = [],
            d = b.length,
            h, n = 0,
            e = F,
            w = G,
            g, f, k, q, z;
        g = b.lastIndexOf(a);
        0 > g && (g = 0);
        for (f = 0; f < g; ++f) 128 <= b.charCodeAt(f) && m("not-basic"), c.push(b.charCodeAt(f));
        for (g = 0 < g ? g + 1 : 0; g < d;) {
            f = n;
            h = 1;
            for (k = p;; k += p) {
                g >= d && m("invalid-input");
                q = b.charCodeAt(g++);
                q = 10 > q - 48 ? q - 22 : 26 > q - 65 ? q - 65 : 26 > q - 97 ? q - 97 : p;
                (q >= p || q > y((u - n) / h)) && m("overflow");
                n += q * h;
                z = k <= w ? s : k >= w + x ? x :
                    k - w;
                if (q < z) break;
                q = p - z;
                h > y(u / q) && m("overflow");
                h *= q
            }
            h = c.length + 1;
            w = r(n - f, h, 0 == f);
            y(n / h) > u - e && m("overflow");
            e += y(n / h);
            n %= h;
            c.splice(n++, 0, e)
        }
        return l(c)
    }

    function v(b) {
        var c, h, n, e, w, g, f, k, l, q = [],
            t, v, A;
        b = d(b);
        t = b.length;
        c = F;
        h = 0;
        w = G;
        for (g = 0; g < t; ++g) l = b[g], 128 > l && q.push(z(l));
        for ((n = e = q.length) && q.push(a); n < t;) {
            f = u;
            for (g = 0; g < t; ++g) l = b[g], l >= c && l < f && (f = l);
            v = n + 1;
            f - c > y((u - h) / v) && m("overflow");
            h += (f - c) * v;
            c = f;
            for (g = 0; g < t; ++g)
                if (l = b[g], l < c && ++h > u && m("overflow"), l == c) {
                    k = h;
                    for (f = p;; f += p) {
                        l = f <= w ? s : f >= w + x ? x : f - w;
                        if (k < l) break;
                        A = k - l;
                        k = p - l;
                        q.push(z(C(l + A % k, 0)));
                        k = y(A / k)
                    }
                    q.push(z(C(k, 0)));
                    w = r(h, v, n == e);
                    h = 0;
                    ++n
                }++h;
            ++c
        }
        return q.join("")
    }
    var D = "object" == typeof exports && exports,
        E = "object" == typeof module && module && module.exports == D && module,
        B = "object" == typeof global && global;
    if (B.global === B || B.window === B) f = B;
    var e, u = 2147483647,
        p = 36,
        s = 1,
        x = 26,
        I = 38,
        H = 700,
        G = 72,
        F = 128,
        a = "-",
        b = /^xn--/,
        c = /[^ -~]/,
        h = /\x2E|\u3002|\uFF0E|\uFF61/g,
        n = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
        },
        w = p - s,
        y = Math.floor,
        z = String.fromCharCode,
        A;
    e = {
        version: "1.2.3",
        ucs2: {
            decode: d,
            encode: l
        },
        decode: t,
        encode: v,
        toASCII: function(a) {
            return k(a, function(a) {
                return c.test(a) ? "xn--" + v(a) : a
            })
        },
        toUnicode: function(a) {
            return k(a, function(a) {
                return b.test(a) ? t(a.slice(4).toLowerCase()) : a
            })
        }
    };
    if ("function" == typeof define && "object" == typeof define.amd && define.amd) define(function() {
        return e
    });
    else if (D && !D.nodeType)
        if (E) E.exports = e;
        else
            for (A in e) e.hasOwnProperty(A) && (D[A] = e[A]);
    else f.punycode =
        e
})(this);
(function(f, m) {
    "object" === typeof exports ? module.exports = m() : "function" === typeof define && define.amd ? define(m) : f.SecondLevelDomains = m(f)
})(this, function(f) {
    var m = f && f.SecondLevelDomains,
        g = Object.prototype.hasOwnProperty,
        k = {
            list: {
                ac: "com|gov|mil|net|org",
                ae: "ac|co|gov|mil|name|net|org|pro|sch",
                af: "com|edu|gov|net|org",
                al: "com|edu|gov|mil|net|org",
                ao: "co|ed|gv|it|og|pb",
                ar: "com|edu|gob|gov|int|mil|net|org|tur",
                at: "ac|co|gv|or",
                au: "asn|com|csiro|edu|gov|id|net|org",
                ba: "co|com|edu|gov|mil|net|org|rs|unbi|unmo|unsa|untz|unze",
                bb: "biz|co|com|edu|gov|info|net|org|store|tv",
                bh: "biz|cc|com|edu|gov|info|net|org",
                bn: "com|edu|gov|net|org",
                bo: "com|edu|gob|gov|int|mil|net|org|tv",
                br: "adm|adv|agr|am|arq|art|ato|b|bio|blog|bmd|cim|cng|cnt|com|coop|ecn|edu|eng|esp|etc|eti|far|flog|fm|fnd|fot|fst|g12|ggf|gov|imb|ind|inf|jor|jus|lel|mat|med|mil|mus|net|nom|not|ntr|odo|org|ppg|pro|psc|psi|qsl|rec|slg|srv|tmp|trd|tur|tv|vet|vlog|wiki|zlg",
                bs: "com|edu|gov|net|org",
                bz: "du|et|om|ov|rg",
                ca: "ab|bc|mb|nb|nf|nl|ns|nt|nu|on|pe|qc|sk|yk",
                ck: "biz|co|edu|gen|gov|info|net|org",
                cn: "ac|ah|bj|com|cq|edu|fj|gd|gov|gs|gx|gz|ha|hb|he|hi|hl|hn|jl|js|jx|ln|mil|net|nm|nx|org|qh|sc|sd|sh|sn|sx|tj|tw|xj|xz|yn|zj",
                co: "com|edu|gov|mil|net|nom|org",
                cr: "ac|c|co|ed|fi|go|or|sa",
                cy: "ac|biz|com|ekloges|gov|ltd|name|net|org|parliament|press|pro|tm",
                "do": "art|com|edu|gob|gov|mil|net|org|sld|web",
                dz: "art|asso|com|edu|gov|net|org|pol",
                ec: "com|edu|fin|gov|info|med|mil|net|org|pro",
                eg: "com|edu|eun|gov|mil|name|net|org|sci",
                er: "com|edu|gov|ind|mil|net|org|rochest|w",
                es: "com|edu|gob|nom|org",
                et: "biz|com|edu|gov|info|name|net|org",
                fj: "ac|biz|com|info|mil|name|net|org|pro",
                fk: "ac|co|gov|net|nom|org",
                fr: "asso|com|f|gouv|nom|prd|presse|tm",
                gg: "co|net|org",
                gh: "com|edu|gov|mil|org",
                gn: "ac|com|gov|net|org",
                gr: "com|edu|gov|mil|net|org",
                gt: "com|edu|gob|ind|mil|net|org",
                gu: "com|edu|gov|net|org",
                hk: "com|edu|gov|idv|net|org",
                id: "ac|co|go|mil|net|or|sch|web",
                il: "ac|co|gov|idf|k12|muni|net|org",
                "in": "ac|co|edu|ernet|firm|gen|gov|i|ind|mil|net|nic|org|res",
                iq: "com|edu|gov|i|mil|net|org",
                ir: "ac|co|dnssec|gov|i|id|net|org|sch",
                it: "edu|gov",
                je: "co|net|org",
                jo: "com|edu|gov|mil|name|net|org|sch",
                jp: "ac|ad|co|ed|go|gr|lg|ne|or",
                ke: "ac|co|go|info|me|mobi|ne|or|sc",
                kh: "com|edu|gov|mil|net|org|per",
                ki: "biz|com|de|edu|gov|info|mob|net|org|tel",
                km: "asso|com|coop|edu|gouv|k|medecin|mil|nom|notaires|pharmaciens|presse|tm|veterinaire",
                kn: "edu|gov|net|org",
                kr: "ac|busan|chungbuk|chungnam|co|daegu|daejeon|es|gangwon|go|gwangju|gyeongbuk|gyeonggi|gyeongnam|hs|incheon|jeju|jeonbuk|jeonnam|k|kg|mil|ms|ne|or|pe|re|sc|seoul|ulsan",
                kw: "com|edu|gov|net|org",
                ky: "com|edu|gov|net|org",
                kz: "com|edu|gov|mil|net|org",
                lb: "com|edu|gov|net|org",
                lk: "assn|com|edu|gov|grp|hotel|int|ltd|net|ngo|org|sch|soc|web",
                lr: "com|edu|gov|net|org",
                lv: "asn|com|conf|edu|gov|id|mil|net|org",
                ly: "com|edu|gov|id|med|net|org|plc|sch",
                ma: "ac|co|gov|m|net|org|press",
                mc: "asso|tm",
                me: "ac|co|edu|gov|its|net|org|priv",
                mg: "com|edu|gov|mil|nom|org|prd|tm",
                mk: "com|edu|gov|inf|name|net|org|pro",
                ml: "com|edu|gov|net|org|presse",
                mn: "edu|gov|org",
                mo: "com|edu|gov|net|org",
                mt: "com|edu|gov|net|org",
                mv: "aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro",
                mw: "ac|co|com|coop|edu|gov|int|museum|net|org",
                mx: "com|edu|gob|net|org",
                my: "com|edu|gov|mil|name|net|org|sch",
                nf: "arts|com|firm|info|net|other|per|rec|store|web",
                ng: "biz|com|edu|gov|mil|mobi|name|net|org|sch",
                ni: "ac|co|com|edu|gob|mil|net|nom|org",
                np: "com|edu|gov|mil|net|org",
                nr: "biz|com|edu|gov|info|net|org",
                om: "ac|biz|co|com|edu|gov|med|mil|museum|net|org|pro|sch",
                pe: "com|edu|gob|mil|net|nom|org|sld",
                ph: "com|edu|gov|i|mil|net|ngo|org",
                pk: "biz|com|edu|fam|gob|gok|gon|gop|gos|gov|net|org|web",
                pl: "art|bialystok|biz|com|edu|gda|gdansk|gorzow|gov|info|katowice|krakow|lodz|lublin|mil|net|ngo|olsztyn|org|poznan|pwr|radom|slupsk|szczecin|torun|warszawa|waw|wroc|wroclaw|zgora",
                pr: "ac|biz|com|edu|est|gov|info|isla|name|net|org|pro|prof",
                ps: "com|edu|gov|net|org|plo|sec",
                pw: "belau|co|ed|go|ne|or",
                ro: "arts|com|firm|info|nom|nt|org|rec|store|tm|www",
                rs: "ac|co|edu|gov|in|org",
                sb: "com|edu|gov|net|org",
                sc: "com|edu|gov|net|org",
                sh: "co|com|edu|gov|net|nom|org",
                sl: "com|edu|gov|net|org",
                st: "co|com|consulado|edu|embaixada|gov|mil|net|org|principe|saotome|store",
                sv: "com|edu|gob|org|red",
                sz: "ac|co|org",
                tr: "av|bbs|bel|biz|com|dr|edu|gen|gov|info|k12|name|net|org|pol|tel|tsk|tv|web",
                tt: "aero|biz|cat|co|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel",
                tw: "club|com|ebiz|edu|game|gov|idv|mil|net|org",
                mu: "ac|co|com|gov|net|or|org",
                mz: "ac|co|edu|gov|org",
                na: "co|com",
                nz: "ac|co|cri|geek|gen|govt|health|iwi|maori|mil|net|org|parliament|school",
                pa: "abo|ac|com|edu|gob|ing|med|net|nom|org|sld",
                pt: "com|edu|gov|int|net|nome|org|publ",
                py: "com|edu|gov|mil|net|org",
                qa: "com|edu|gov|mil|net|org",
                re: "asso|com|nom",
                ru: "ac|adygeya|altai|amur|arkhangelsk|astrakhan|bashkiria|belgorod|bir|bryansk|buryatia|cbg|chel|chelyabinsk|chita|chukotka|chuvashia|com|dagestan|e-burg|edu|gov|grozny|int|irkutsk|ivanovo|izhevsk|jar|joshkar-ola|kalmykia|kaluga|kamchatka|karelia|kazan|kchr|kemerovo|khabarovsk|khakassia|khv|kirov|koenig|komi|kostroma|kranoyarsk|kuban|kurgan|kursk|lipetsk|magadan|mari|mari-el|marine|mil|mordovia|mosreg|msk|murmansk|nalchik|net|nnov|nov|novosibirsk|nsk|omsk|orenburg|org|oryol|penza|perm|pp|pskov|ptz|rnd|ryazan|sakhalin|samara|saratov|simbirsk|smolensk|spb|stavropol|stv|surgut|tambov|tatarstan|tom|tomsk|tsaritsyn|tsk|tula|tuva|tver|tyumen|udm|udmurtia|ulan-ude|vladikavkaz|vladimir|vladivostok|volgograd|vologda|voronezh|vrn|vyatka|yakutia|yamal|yekaterinburg|yuzhno-sakhalinsk",
                rw: "ac|co|com|edu|gouv|gov|int|mil|net",
                sa: "com|edu|gov|med|net|org|pub|sch",
                sd: "com|edu|gov|info|med|net|org|tv",
                se: "a|ac|b|bd|c|d|e|f|g|h|i|k|l|m|n|o|org|p|parti|pp|press|r|s|t|tm|u|w|x|y|z",
                sg: "com|edu|gov|idn|net|org|per",
                sn: "art|com|edu|gouv|org|perso|univ",
                sy: "com|edu|gov|mil|net|news|org",
                th: "ac|co|go|in|mi|net|or",
                tj: "ac|biz|co|com|edu|go|gov|info|int|mil|name|net|nic|org|test|web",
                tn: "agrinet|com|defense|edunet|ens|fin|gov|ind|info|intl|mincom|nat|net|org|perso|rnrt|rns|rnu|tourism",
                tz: "ac|co|go|ne|or",
                ua: "biz|cherkassy|chernigov|chernovtsy|ck|cn|co|com|crimea|cv|dn|dnepropetrovsk|donetsk|dp|edu|gov|if|in|ivano-frankivsk|kh|kharkov|kherson|khmelnitskiy|kiev|kirovograd|km|kr|ks|kv|lg|lugansk|lutsk|lviv|me|mk|net|nikolaev|od|odessa|org|pl|poltava|pp|rovno|rv|sebastopol|sumy|te|ternopil|uzhgorod|vinnica|vn|zaporizhzhe|zhitomir|zp|zt",
                ug: "ac|co|go|ne|or|org|sc",
                uk: "ac|bl|british-library|co|cym|gov|govt|icnet|jet|lea|ltd|me|mil|mod|national-library-scotland|nel|net|nhs|nic|nls|org|orgn|parliament|plc|police|sch|scot|soc",
                us: "dni|fed|isa|kids|nsn",
                uy: "com|edu|gub|mil|net|org",
                ve: "co|com|edu|gob|info|mil|net|org|web",
                vi: "co|com|k12|net|org",
                vn: "ac|biz|com|edu|gov|health|info|int|name|net|org|pro",
                ye: "co|com|gov|ltd|me|net|org|plc",
                yu: "ac|co|edu|gov|org",
                za: "ac|agric|alt|bourse|city|co|cybernet|db|edu|gov|grondar|iaccess|imt|inca|landesign|law|mil|net|ngo|nis|nom|olivetti|org|pix|school|tm|web",
                zm: "ac|co|com|edu|gov|net|org|sch"
            },
            has_expression: null,
            is_expression: null,
            has: function(d) {
                return !!d.match(k.has_expression)
            },
            is: function(d) {
                return !!d.match(k.is_expression)
            },
            get: function(d) {
                return (d = d.match(k.has_expression)) && d[1] || null
            },
            noConflict: function() {
                f.SecondLevelDomains === this && (f.SecondLevelDomains = m);
                return this
            },
            init: function() {
                var d = "",
                    f;
                for (f in k.list) g.call(k.list, f) && (d += "|(" + ("(" + k.list[f] + ")." + f) + ")");
                k.has_expression = RegExp("\\.(" + d.substr(1) + ")$", "i");
                k.is_expression = RegExp("^(" + d.substr(1) + ")$", "i")
            }
        };
    k.init();
    return k
});
(function(f, m) {
    "object" === typeof exports ? module.exports = m(require("./punycode"), require("./IPv6"), require("./SecondLevelDomains")) : "function" === typeof define && define.amd ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], m) : f.URI = m(f.punycode, f.IPv6, f.SecondLevelDomains, f)
})(this, function(f, m, g, k) {
    function d(a, b) {
        if (!(this instanceof d)) return new d(a, b);
        void 0 === a && (a = "undefined" !== typeof location ? location.href + "" : "");
        this.href(a);
        return void 0 !== b ? this.absoluteTo(b) : this
    }

    function l(a) {
        return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g,
            "\\$1")
    }

    function C(a) {
        return void 0 === a ? "Undefined" : String(Object.prototype.toString.call(a)).slice(8, -1)
    }

    function r(a) {
        return "Array" === C(a)
    }

    function t(a, b) {
        var c, d;
        if (r(b)) {
            c = 0;
            for (d = b.length; c < d; c++)
                if (!t(a, b[c])) return !1;
            return !0
        }
        var n = C(b);
        c = 0;
        for (d = a.length; c < d; c++)
            if ("RegExp" === n) {
                if ("string" === typeof a[c] && a[c].match(b)) return !0
            } else if (a[c] === b) return !0;
        return !1
    }

    function v(a, b) {
        if (!r(a) || !r(b) || a.length !== b.length) return !1;
        a.sort();
        b.sort();
        for (var c = 0, d = a.length; c < d; c++)
            if (a[c] !== b[c]) return !1;
        return !0
    }

    function D(a) {
        return escape(a)
    }

    function E(a) {
        return encodeURIComponent(a).replace(/[!'()*]/g, D).replace(/\*/g, "%2A")
    }
    var B = k && k.URI,
        e = d.prototype,
        u = Object.prototype.hasOwnProperty;
    d._parts = function() {
        return {
            protocol: null,
            username: null,
            password: null,
            hostname: null,
            urn: null,
            port: null,
            path: null,
            query: null,
            fragment: null,
            duplicateQueryParameters: d.duplicateQueryParameters,
            escapeQuerySpace: d.escapeQuerySpace
        }
    };
    d.duplicateQueryParameters = !1;
    d.escapeQuerySpace = !0;
    d.protocol_expression = /^[a-z][a-z0-9-+-]*$/i;
    d.idn_expression = /[^a-z0-9\.-]/i;
    d.punycode_expression = /(xn--)/i;
    d.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    d.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    d.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;
    d.defaultPorts = {
        http: "80",
        https: "443",
        ftp: "21",
        gopher: "70",
        ws: "80",
        wss: "443"
    };
    d.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
    d.domAttributes = {
        a: "href",
        blockquote: "cite",
        link: "href",
        base: "href",
        script: "src",
        form: "action",
        img: "src",
        area: "href",
        iframe: "src",
        embed: "src",
        source: "src",
        track: "src",
        input: "src"
    };
    d.getDomAttribute = function(a) {
        if (a && a.nodeName) {
            var b = a.nodeName.toLowerCase();
            return "input" === b && "image" !== a.type ? void 0 : d.domAttributes[b]
        }
    };
    d.encode = E;
    d.decode = decodeURIComponent;
    d.iso8859 = function() {
        d.encode = escape;
        d.decode = unescape
    };
    d.unicode = function() {
        d.encode = E;
        d.decode = decodeURIComponent
    };
    d.characters = {
        pathname: {
            encode: {
                expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
                map: {
                    "%24": "$",
                    "%26": "&",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                    "%3A": ":",
                    "%40": "@"
                }
            },
            decode: {
                expression: /[\/\?#]/g,
                map: {
                    "/": "%2F",
                    "?": "%3F",
                    "#": "%23"
                }
            }
        },
        reserved: {
            encode: {
                expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
                map: {
                    "%3A": ":",
                    "%2F": "/",
                    "%3F": "?",
                    "%23": "#",
                    "%5B": "[",
                    "%5D": "]",
                    "%40": "@",
                    "%21": "!",
                    "%24": "$",
                    "%26": "&",
                    "%27": "'",
                    "%28": "(",
                    "%29": ")",
                    "%2A": "*",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "="
                }
            }
        }
    };
    d.encodeQuery = function(a, b) {
        var c = d.encode(a + "");
        return b ? c.replace(/%20/g, "+") : c
    };
    d.decodeQuery = function(a, b) {
        a += "";
        try {
            return d.decode(b ?
                a.replace(/\+/g, "%20") : a)
        } catch (c) {
            return a
        }
    };
    d.recodePath = function(a) {
        a = (a + "").split("/");
        for (var b = 0, c = a.length; b < c; b++) a[b] = d.encodePathSegment(d.decode(a[b]));
        return a.join("/")
    };
    d.decodePath = function(a) {
        a = (a + "").split("/");
        for (var b = 0, c = a.length; b < c; b++) a[b] = d.decodePathSegment(a[b]);
        return a.join("/")
    };
    var p = {
            encode: "encode",
            decode: "decode"
        },
        s, x = function(a, b) {
            return function(c) {
                return d[b](c + "").replace(d.characters[a][b].expression, function(c) {
                    return d.characters[a][b].map[c]
                })
            }
        };
    for (s in p) d[s +
        "PathSegment"] = x("pathname", p[s]);
    d.encodeReserved = x("reserved", "encode");
    d.parse = function(a, b) {
        var c;
        b || (b = {});
        c = a.indexOf("#"); - 1 < c && (b.fragment = a.substring(c + 1) || null, a = a.substring(0, c));
        c = a.indexOf("?"); - 1 < c && (b.query = a.substring(c + 1) || null, a = a.substring(0, c));
        "//" === a.substring(0, 2) ? (b.protocol = null, a = a.substring(2), a = d.parseAuthority(a, b)) : (c = a.indexOf(":"), -1 < c && (b.protocol = a.substring(0, c) || null, b.protocol && !b.protocol.match(d.protocol_expression) ? b.protocol = void 0 : "file" === b.protocol ? a = a.substring(c +
            3) : "//" === a.substring(c + 1, c + 3) ? (a = a.substring(c + 3), a = d.parseAuthority(a, b)) : (a = a.substring(c + 1), b.urn = !0)));
        b.path = a;
        return b
    };
    d.parseHost = function(a, b) {
        var c = a.indexOf("/"),
            d; - 1 === c && (c = a.length);
        "[" === a.charAt(0) ? (d = a.indexOf("]"), b.hostname = a.substring(1, d) || null, b.port = a.substring(d + 2, c) || null) : a.indexOf(":") !== a.lastIndexOf(":") ? (b.hostname = a.substring(0, c) || null, b.port = null) : (d = a.substring(0, c).split(":"), b.hostname = d[0] || null, b.port = d[1] || null);
        b.hostname && "/" !== a.substring(c).charAt(0) && (c++,
            a = "/" + a);
        return a.substring(c) || "/"
    };
    d.parseAuthority = function(a, b) {
        a = d.parseUserinfo(a, b);
        return d.parseHost(a, b)
    };
    d.parseUserinfo = function(a, b) {
        var c = a.indexOf("/"),
            h = -1 < c ? a.lastIndexOf("@", c) : a.indexOf("@"); - 1 < h && (-1 === c || h < c) ? (c = a.substring(0, h).split(":"), b.username = c[0] ? d.decode(c[0]) : null, c.shift(), b.password = c[0] ? d.decode(c.join(":")) : null, a = a.substring(h + 1)) : (b.username = null, b.password = null);
        return a
    };
    d.parseQuery = function(a, b) {
        if (!a) return {};
        a = a.replace(/&+/g, "&").replace(/^\?*&*|&+$/g,
            "");
        if (!a) return {};
        for (var c = {}, h = a.split("&"), n = h.length, e, f, g = 0; g < n; g++) e = h[g].split("="), f = d.decodeQuery(e.shift(), b), e = e.length ? d.decodeQuery(e.join("="), b) : null, c[f] ? ("string" === typeof c[f] && (c[f] = [c[f]]), c[f].push(e)) : c[f] = e;
        return c
    };
    d.build = function(a) {
        var b = "";
        a.protocol && (b += a.protocol + ":");
        a.urn || !b && !a.hostname || (b += "//");
        b += d.buildAuthority(a) || "";
        "string" === typeof a.path && ("/" !== a.path.charAt(0) && "string" === typeof a.hostname && (b += "/"), b += a.path);
        "string" === typeof a.query && a.query && (b +=
            "?" + a.query);
        "string" === typeof a.fragment && a.fragment && (b += "#" + a.fragment);
        return b
    };
    d.buildHost = function(a) {
        var b = "";
        if (a.hostname) d.ip6_expression.test(a.hostname) ? b = a.port ? b + ("[" + a.hostname + "]:" + a.port) : b + a.hostname : (b += a.hostname, a.port && (b += ":" + a.port));
        else return "";
        return b
    };
    d.buildAuthority = function(a) {
        return d.buildUserinfo(a) + d.buildHost(a)
    };
    d.buildUserinfo = function(a) {
        var b = "";
        a.username && (b += d.encode(a.username), a.password && (b += ":" + d.encode(a.password)), b += "@");
        return b
    };
    d.buildQuery =
        function(a, b, c) {
            var h = "",
                n, e, f, g;
            for (e in a)
                if (u.call(a, e) && e)
                    if (r(a[e]))
                        for (n = {}, f = 0, g = a[e].length; f < g; f++) void 0 !== a[e][f] && void 0 === n[a[e][f] + ""] && (h += "&" + d.buildQueryParameter(e, a[e][f], c), !0 !== b && (n[a[e][f] + ""] = !0));
                    else void 0 !== a[e] && (h += "&" + d.buildQueryParameter(e, a[e], c));
            return h.substring(1)
        };
    d.buildQueryParameter = function(a, b, c) {
        return d.encodeQuery(a, c) + (null !== b ? "=" + d.encodeQuery(b, c) : "")
    };
    d.addQuery = function(a, b, c) {
        if ("object" === typeof b)
            for (var h in b) u.call(b, h) && d.addQuery(a, h, b[h]);
        else if ("string" === typeof b) void 0 === a[b] ? a[b] = c : ("string" === typeof a[b] && (a[b] = [a[b]]), r(c) || (c = [c]), a[b] = a[b].concat(c));
        else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
    };
    d.removeQuery = function(a, b, c) {
        var h;
        if (r(b))
            for (c = 0, h = b.length; c < h; c++) a[b[c]] = void 0;
        else if ("object" === typeof b)
            for (h in b) u.call(b, h) && d.removeQuery(a, h, b[h]);
        else if ("string" === typeof b)
            if (void 0 !== c)
                if (a[b] === c) a[b] = void 0;
                else {
                    if (r(a[b])) {
                        h = a[b];
                        var n = {},
                            e, f;
                        if (r(c))
                            for (e = 0, f = c.length; e <
                                f; e++) n[c[e]] = !0;
                        else n[c] = !0;
                        e = 0;
                        for (f = h.length; e < f; e++) void 0 !== n[h[e]] && (h.splice(e, 1), f--, e--);
                        a[b] = h
                    }
                }
        else a[b] = void 0;
        else throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");
    };
    d.hasQuery = function(a, b, c, h) {
        if ("object" === typeof b) {
            for (var e in b)
                if (u.call(b, e) && !d.hasQuery(a, e, b[e])) return !1;
            return !0
        }
        if ("string" !== typeof b) throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");
        switch (C(c)) {
            case "Undefined":
                return b in a;
            case "Boolean":
                return a =
                    Boolean(r(a[b]) ? a[b].length : a[b]), c === a;
            case "Function":
                return !!c(a[b], b, a);
            case "Array":
                return r(a[b]) ? (h ? t : v)(a[b], c) : !1;
            case "RegExp":
                return r(a[b]) ? h ? t(a[b], c) : !1 : Boolean(a[b] && a[b].match(c));
            case "Number":
                c = String(c);
            case "String":
                return r(a[b]) ? h ? t(a[b], c) : !1 : a[b] === c;
            default:
                throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");
        }
    };
    d.commonPath = function(a, b) {
        var c = Math.min(a.length, b.length),
            d;
        for (d = 0; d < c; d++)
            if (a.charAt(d) !==
                b.charAt(d)) {
                d--;
                break
            }
        if (1 > d) return a.charAt(0) === b.charAt(0) && "/" === a.charAt(0) ? "/" : "";
        if ("/" !== a.charAt(d) || "/" !== b.charAt(d)) d = a.substring(0, d).lastIndexOf("/");
        return a.substring(0, d + 1)
    };
    d.withinString = function(a, b) {
        return a.replace(d.find_uri_expression, b)
    };
    d.ensureValidHostname = function(a) {
        if (a.match(d.invalid_hostname_characters)) {
            if (!f) throw new TypeError("Hostname '" + a + "' contains characters other than [A-Z0-9.-] and Punycode.js is not available");
            if (f.toASCII(a).match(d.invalid_hostname_characters)) throw new TypeError("Hostname '" +
                a + "' contains characters other than [A-Z0-9.-]");
        }
    };
    d.noConflict = function(a) {
        if (a) return a = {
            URI: this.noConflict()
        }, URITemplate && "function" == typeof URITemplate.noConflict && (a.URITemplate = URITemplate.noConflict()), m && "function" == typeof m.noConflict && (a.IPv6 = m.noConflict()), SecondLevelDomains && "function" == typeof SecondLevelDomains.noConflict && (a.SecondLevelDomains = SecondLevelDomains.noConflict()), a;
        k.URI === this && (k.URI = B);
        return this
    };
    e.build = function(a) {
        if (!0 === a) this._deferred_build = !0;
        else if (void 0 ===
            a || this._deferred_build) this._string = d.build(this._parts), this._deferred_build = !1;
        return this
    };
    e.clone = function() {
        return new d(this)
    };
    e.valueOf = e.toString = function() {
        return this.build(!1)._string
    };
    p = {
        protocol: "protocol",
        username: "username",
        password: "password",
        hostname: "hostname",
        port: "port"
    };
    x = function(a) {
        return function(b, c) {
            if (void 0 === b) return this._parts[a] || "";
            this._parts[a] = b || null;
            this.build(!c);
            return this
        }
    };
    for (s in p) e[s] = x(p[s]);
    p = {
        query: "?",
        fragment: "#"
    };
    x = function(a, b) {
        return function(c,
            d) {
            if (void 0 === c) return this._parts[a] || "";
            null !== c && (c += "", c.charAt(0) === b && (c = c.substring(1)));
            this._parts[a] = c;
            this.build(!d);
            return this
        }
    };
    for (s in p) e[s] = x(s, p[s]);
    p = {
        search: ["?", "query"],
        hash: ["#", "fragment"]
    };
    x = function(a, b) {
        return function(c, d) {
            var e = this[a](c, d);
            return "string" === typeof e && e.length ? b + e : e
        }
    };
    for (s in p) e[s] = x(p[s][1], p[s][0]);
    e.pathname = function(a, b) {
        if (void 0 === a || !0 === a) {
            var c = this._parts.path || (this._parts.hostname ? "/" : "");
            return a ? d.decodePath(c) : c
        }
        this._parts.path = a ? d.recodePath(a) :
            "/";
        this.build(!b);
        return this
    };
    e.path = e.pathname;
    e.href = function(a, b) {
        var c;
        if (void 0 === a) return this.toString();
        this._string = "";
        this._parts = d._parts();
        var h = a instanceof d,
            e = "object" === typeof a && (a.hostname || a.path || a.pathname);
        a.nodeName && (e = d.getDomAttribute(a), a = a[e] || "", e = !1);
        !h && e && void 0 !== a.pathname && (a = a.toString());
        if ("string" === typeof a) this._parts = d.parse(a, this._parts);
        else if (h || e)
            for (c in h = h ? a._parts : a, h) u.call(this._parts, c) && (this._parts[c] = h[c]);
        else throw new TypeError("invalid input");
        this.build(!b);
        return this
    };
    e.is = function(a) {
        var b = !1,
            c = !1,
            h = !1,
            e = !1,
            f = !1,
            k = !1,
            l = !1,
            m = !this._parts.urn;
        this._parts.hostname && (m = !1, c = d.ip4_expression.test(this._parts.hostname), h = d.ip6_expression.test(this._parts.hostname), b = c || h, f = (e = !b) && g && g.has(this._parts.hostname), k = e && d.idn_expression.test(this._parts.hostname), l = e && d.punycode_expression.test(this._parts.hostname));
        switch (a.toLowerCase()) {
            case "relative":
                return m;
            case "absolute":
                return !m;
            case "domain":
            case "name":
                return e;
            case "sld":
                return f;
            case "ip":
                return b;
            case "ip4":
            case "ipv4":
            case "inet4":
                return c;
            case "ip6":
            case "ipv6":
            case "inet6":
                return h;
            case "idn":
                return k;
            case "url":
                return !this._parts.urn;
            case "urn":
                return !!this._parts.urn;
            case "punycode":
                return l
        }
        return null
    };
    var I = e.protocol,
        H = e.port,
        G = e.hostname;
    e.protocol = function(a, b) {
        if (void 0 !== a && a && (a = a.replace(/:(\/\/)?$/, ""), a.match(/[^a-zA-z0-9\.+-]/))) throw new TypeError("Protocol '" + a + "' contains characters other than [A-Z0-9.+-]");
        return I.call(this, a, b)
    };
    e.scheme = e.protocol;
    e.port = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 !== a && (0 === a && (a = null), a && (a += "", ":" === a.charAt(0) && (a = a.substring(1)), a.match(/[^0-9]/)))) throw new TypeError("Port '" + a + "' contains characters other than [0-9]");
        return H.call(this, a, b)
    };
    e.hostname = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 !== a) {
            var c = {};
            d.parseHost(a, c);
            a = c.hostname
        }
        return G.call(this, a, b)
    };
    e.host = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 === a) return this._parts.hostname ?
            d.buildHost(this._parts) : "";
        d.parseHost(a, this._parts);
        this.build(!b);
        return this
    };
    e.authority = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 === a) return this._parts.hostname ? d.buildAuthority(this._parts) : "";
        d.parseAuthority(a, this._parts);
        this.build(!b);
        return this
    };
    e.userinfo = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 === a) {
            if (!this._parts.username) return "";
            var c = d.buildUserinfo(this._parts);
            return c.substring(0, c.length - 1)
        }
        "@" !== a[a.length - 1] && (a +=
            "@");
        d.parseUserinfo(a, this._parts);
        this.build(!b);
        return this
    };
    e.resource = function(a, b) {
        var c;
        if (void 0 === a) return this.path() + this.search() + this.hash();
        c = d.parse(a);
        this._parts.path = c.path;
        this._parts.query = c.query;
        this._parts.fragment = c.fragment;
        this.build(!b);
        return this
    };
    e.subdomain = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP")) return "";
            var c = this._parts.hostname.length - this.domain().length - 1;
            return this._parts.hostname.substring(0,
                c) || ""
        }
        c = this._parts.hostname.length - this.domain().length;
        c = this._parts.hostname.substring(0, c);
        c = RegExp("^" + l(c));
        a && "." !== a.charAt(a.length - 1) && (a += ".");
        a && d.ensureValidHostname(a);
        this._parts.hostname = this._parts.hostname.replace(c, a);
        this.build(!b);
        return this
    };
    e.domain = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        "boolean" === typeof a && (b = a, a = void 0);
        if (void 0 === a) {
            if (!this._parts.hostname || this.is("IP")) return "";
            var c = this._parts.hostname.match(/\./g);
            if (c && 2 > c.length) return this._parts.hostname;
            c = this._parts.hostname.length - this.tld(b).length - 1;
            c = this._parts.hostname.lastIndexOf(".", c - 1) + 1;
            return this._parts.hostname.substring(c) || ""
        }
        if (!a) throw new TypeError("cannot set domain empty");
        d.ensureValidHostname(a);
        !this._parts.hostname || this.is("IP") ? this._parts.hostname = a : (c = RegExp(l(this.domain()) + "$"), this._parts.hostname = this._parts.hostname.replace(c, a));
        this.build(!b);
        return this
    };
    e.tld = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        "boolean" === typeof a && (b = a, a = void 0);
        if (void 0 ===
            a) {
            if (!this._parts.hostname || this.is("IP")) return "";
            var c = this._parts.hostname.lastIndexOf("."),
                c = this._parts.hostname.substring(c + 1);
            return !0 !== b && g && g.list[c.toLowerCase()] ? g.get(this._parts.hostname) || c : c
        }
        if (a)
            if (a.match(/[^a-zA-Z0-9-]/))
                if (g && g.is(a)) c = RegExp(l(this.tld()) + "$"), this._parts.hostname = this._parts.hostname.replace(c, a);
                else throw new TypeError("TLD '" + a + "' contains characters other than [A-Z0-9]");
        else {
            if (!this._parts.hostname || this.is("IP")) throw new ReferenceError("cannot set TLD on non-domain host");
            c = RegExp(l(this.tld()) + "$");
            this._parts.hostname = this._parts.hostname.replace(c, a)
        } else throw new TypeError("cannot set TLD empty");
        this.build(!b);
        return this
    };
    e.directory = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path && !this._parts.hostname) return "";
            if ("/" === this._parts.path) return "/";
            var c = this._parts.path.length - this.filename().length - 1,
                c = this._parts.path.substring(0, c) || (this._parts.hostname ? "/" : "");
            return a ? d.decodePath(c) : c
        }
        c = this._parts.path.length -
            this.filename().length;
        c = this._parts.path.substring(0, c);
        c = RegExp("^" + l(c));
        this.is("relative") || (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a));
        a && "/" !== a.charAt(a.length - 1) && (a += "/");
        a = d.recodePath(a);
        this._parts.path = this._parts.path.replace(c, a);
        this.build(!b);
        return this
    };
    e.filename = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || "/" === this._parts.path) return "";
            var c = this._parts.path.lastIndexOf("/"),
                c = this._parts.path.substring(c + 1);
            return a ?
                d.decodePathSegment(c) : c
        }
        c = !1;
        "/" === a.charAt(0) && (a = a.substring(1));
        a.match(/\.?\//) && (c = !0);
        var h = RegExp(l(this.filename()) + "$");
        a = d.recodePath(a);
        this._parts.path = this._parts.path.replace(h, a);
        c ? this.normalizePath(b) : this.build(!b);
        return this
    };
    e.suffix = function(a, b) {
        if (this._parts.urn) return void 0 === a ? "" : this;
        if (void 0 === a || !0 === a) {
            if (!this._parts.path || "/" === this._parts.path) return "";
            var c = this.filename(),
                h = c.lastIndexOf(".");
            if (-1 === h) return "";
            c = c.substring(h + 1);
            c = /^[a-z0-9%]+$/i.test(c) ? c :
                "";
            return a ? d.decodePathSegment(c) : c
        }
        "." === a.charAt(0) && (a = a.substring(1));
        if (c = this.suffix()) h = a ? RegExp(l(c) + "$") : RegExp(l("." + c) + "$");
        else {
            if (!a) return this;
            this._parts.path += "." + d.recodePath(a)
        }
        h && (a = d.recodePath(a), this._parts.path = this._parts.path.replace(h, a));
        this.build(!b);
        return this
    };
    e.segment = function(a, b, c) {
        var d = this._parts.urn ? ":" : "/",
            e = this.path(),
            f = "/" === e.substring(0, 1),
            e = e.split(d);
        void 0 !== a && "number" !== typeof a && (c = b, b = a, a = void 0);
        if (void 0 !== a && "number" !== typeof a) throw Error("Bad segment '" +
            a + "', must be 0-based integer");
        f && e.shift();
        0 > a && (a = Math.max(e.length + a, 0));
        if (void 0 === b) return void 0 === a ? e : e[a];
        if (null === a || void 0 === e[a])
            if (r(b)) {
                e = [];
                a = 0;
                for (var g = b.length; a < g; a++)
                    if (b[a].length || e.length && e[e.length - 1].length) e.length && !e[e.length - 1].length && e.pop(), e.push(b[a])
            } else {
                if (b || "string" === typeof b) "" === e[e.length - 1] ? e[e.length - 1] = b : e.push(b)
            }
        else b || "string" === typeof b && b.length ? e[a] = b : e.splice(a, 1);
        f && e.unshift("");
        return this.path(e.join(d), c)
    };
    e.segmentCoded = function(a, b, c) {
        var e,
            f;
        "number" !== typeof a && (c = b, b = a, a = void 0);
        if (void 0 === b) {
            a = this.segment(a, b, c);
            if (r(a))
                for (e = 0, f = a.length; e < f; e++) a[e] = d.decode(a[e]);
            else a = void 0 !== a ? d.decode(a) : void 0;
            return a
        }
        if (r(b))
            for (e = 0, f = b.length; e < f; e++) b[e] = d.decode(b[e]);
        else b = "string" === typeof b ? d.encode(b) : b;
        return this.segment(a, b, c)
    };
    var F = e.query;
    e.query = function(a, b) {
        if (!0 === a) return d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ("function" === typeof a) {
            var c = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
                e = a.call(this, c);
            this._parts.query = d.buildQuery(e || c, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            this.build(!b);
            return this
        }
        return void 0 !== a && "string" !== typeof a ? (this._parts.query = d.buildQuery(a, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace), this.build(!b), this) : F.call(this, a, b)
    };
    e.setQuery = function(a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        if ("object" === typeof a)
            for (var f in a) u.call(a, f) && (e[f] = a[f]);
        else if ("string" ===
            typeof a) e[a] = void 0 !== b ? b : null;
        else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");
        this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (c = b);
        this.build(!c);
        return this
    };
    e.addQuery = function(a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        d.addQuery(e, a, void 0 === b ? null : b);
        this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (c = b);
        this.build(!c);
        return this
    };
    e.removeQuery = function(a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        d.removeQuery(e, a, b);
        this._parts.query = d.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        "string" !== typeof a && (c = b);
        this.build(!c);
        return this
    };
    e.hasQuery = function(a, b, c) {
        var e = d.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        return d.hasQuery(e, a, b, c)
    };
    e.setSearch = e.setQuery;
    e.addSearch = e.addQuery;
    e.removeSearch =
        e.removeQuery;
    e.hasSearch = e.hasQuery;
    e.normalize = function() {
        return this._parts.urn ? this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build() : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()
    };
    e.normalizeProtocol = function(a) {
        "string" === typeof this._parts.protocol && (this._parts.protocol = this._parts.protocol.toLowerCase(), this.build(!a));
        return this
    };
    e.normalizeHostname = function(a) {
        this._parts.hostname &&
            (this.is("IDN") && f ? this._parts.hostname = f.toASCII(this._parts.hostname) : this.is("IPv6") && m && (this._parts.hostname = m.best(this._parts.hostname)), this._parts.hostname = this._parts.hostname.toLowerCase(), this.build(!a));
        return this
    };
    e.normalizePort = function(a) {
        "string" === typeof this._parts.protocol && this._parts.port === d.defaultPorts[this._parts.protocol] && (this._parts.port = null, this.build(!a));
        return this
    };
    e.normalizePath = function(a) {
        if (this._parts.urn || !this._parts.path || "/" === this._parts.path) return this;
        var b, c = this._parts.path,
            e, f;
        "/" !== c.charAt(0) && (b = !0, c = "/" + c);
        for (c = c.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/");;) {
            e = c.indexOf("/../");
            if (-1 === e) break;
            else if (0 === e) {
                c = c.substring(3);
                break
            }
            f = c.substring(0, e).lastIndexOf("/"); - 1 === f && (f = e);
            c = c.substring(0, f) + c.substring(e + 3)
        }
        b && this.is("relative") && (c = c.substring(1));
        c = d.recodePath(c);
        this._parts.path = c;
        this.build(!a);
        return this
    };
    e.normalizePathname = e.normalizePath;
    e.normalizeQuery = function(a) {
        "string" === typeof this._parts.query &&
            (this._parts.query.length ? this.query(d.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : this._parts.query = null, this.build(!a));
        return this
    };
    e.normalizeFragment = function(a) {
        this._parts.fragment || (this._parts.fragment = null, this.build(!a));
        return this
    };
    e.normalizeSearch = e.normalizeQuery;
    e.normalizeHash = e.normalizeFragment;
    e.iso8859 = function() {
        var a = d.encode,
            b = d.decode;
        d.encode = escape;
        d.decode = decodeURIComponent;
        this.normalize();
        d.encode = a;
        d.decode = b;
        return this
    };
    e.unicode = function() {
        var a =
            d.encode,
            b = d.decode;
        d.encode = E;
        d.decode = unescape;
        this.normalize();
        d.encode = a;
        d.decode = b;
        return this
    };
    e.readable = function() {
        var a = this.clone();
        a.username("").password("").normalize();
        var b = "";
        a._parts.protocol && (b += a._parts.protocol + "://");
        a._parts.hostname && (a.is("punycode") && f ? (b += f.toUnicode(a._parts.hostname), a._parts.port && (b += ":" + a._parts.port)) : b += a.host());
        a._parts.hostname && a._parts.path && "/" !== a._parts.path.charAt(0) && (b += "/");
        b += a.path(!0);
        if (a._parts.query) {
            for (var c = "", e = 0, g = a._parts.query.split("&"),
                    k = g.length; e < k; e++) {
                var l = (g[e] || "").split("="),
                    c = c + ("&" + d.decodeQuery(l[0], this._parts.escapeQuerySpace).replace(/&/g, "%26"));
                void 0 !== l[1] && (c += "=" + d.decodeQuery(l[1], this._parts.escapeQuerySpace).replace(/&/g, "%26"))
            }
            b += "?" + c.substring(1)
        }
        return b += d.decodeQuery(a.hash(), !0)
    };
    e.absoluteTo = function(a) {
        var b = this.clone(),
            c = ["protocol", "username", "password", "hostname", "port"],
            e, f;
        if (this._parts.urn) throw Error("URNs do not have any generally defined hierarchical components");
        a instanceof d || (a = new d(a));
        b._parts.protocol || (b._parts.protocol = a._parts.protocol);
        if (this._parts.hostname) return b;
        for (e = 0; f = c[e]; e++) b._parts[f] = a._parts[f];
        c = ["query", "path"];
        for (e = 0; f = c[e]; e++) !b._parts[f] && a._parts[f] && (b._parts[f] = a._parts[f]);
        "/" !== b.path().charAt(0) && (a = a.directory(), b._parts.path = (a ? a + "/" : "") + b._parts.path, b.normalizePath());
        b.build();
        return b
    };
    e.relativeTo = function(a) {
        var b = this.clone().normalize(),
            c, e, f, g;
        if (b._parts.urn) throw Error("URNs do not have any generally defined hierarchical components");
        a = (new d(a)).normalize();
        c = b._parts;
        e = a._parts;
        f = b.path();
        g = a.path();
        if ("/" !== f.charAt(0)) throw Error("URI is already relative");
        if ("/" !== g.charAt(0)) throw Error("Cannot calculate a URI relative to another relative URI");
        c.protocol === e.protocol && (c.protocol = null);
        if (c.username === e.username && c.password === e.password && null === c.protocol && null === c.username && null === c.password && c.hostname === e.hostname && c.port === e.port) c.hostname = null, c.port = null;
        else return b.build();
        if (f === g) return c.path = "", b.build();
        a = d.commonPath(b.path(), a.path());
        if (!a) return b.build();
        e = e.path.substring(a.length).replace(/[^\/]*$/, "").replace(/.*?\//g, "../");
        c.path = e + c.path.substring(a.length);
        return b.build()
    };
    e.equals = function(a) {
        var b = this.clone();
        a = new d(a);
        var c = {},
            e = {},
            f = {},
            g;
        b.normalize();
        a.normalize();
        if (b.toString() === a.toString()) return !0;
        c = b.query();
        e = a.query();
        b.query("");
        a.query("");
        if (b.toString() !== a.toString() || c.length !== e.length) return !1;
        c = d.parseQuery(c, this._parts.escapeQuerySpace);
        e = d.parseQuery(e, this._parts.escapeQuerySpace);
        for (g in c)
            if (u.call(c, g)) {
                if (!r(c[g])) {
                    if (c[g] !== e[g]) return !1
                } else if (!v(c[g], e[g])) return !1;
                f[g] = !0
            }
        for (g in e)
            if (u.call(e, g) && !f[g]) return !1;
        return !0
    };
    e.duplicateQueryParameters = function(a) {
        this._parts.duplicateQueryParameters = !!a;
        return this
    };
    e.escapeQuerySpace = function(a) {
        this._parts.escapeQuerySpace = !!a;
        return this
    };
    return d
});