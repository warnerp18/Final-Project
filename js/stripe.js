(function() {
    var e, t, n, r, i, s = {}.hasOwnProperty,
        o = function(e, t) {
            function r() {
                this.constructor = e
            }
            for (var n in t) s.call(t, n) && (e[n] = t[n]);
            return r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype, e
        },
        u = this;
    this.Stripe = function() {
        function e() {}
        return e.version = 2, e.endpoint = "https://api.stripe.com/v1", e.setPublishableKey = function(t) {
            return e.key = t, e.utils.validateProtocol(e.key)
        }, e._corsGateAmount = 0, e._corsGate = function() {
            return Math.random() < this._corsGateAmount
        }, e._transport = typeof window != "undefined" && window !== null && e._corsGate() && "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest ? "cors" : "jsonp", e.request = function(t) {
            return t.data.payment_user_agent ? t.data.payment_user_agent = "" + t.data.payment_user_agent + " (" + e.stripejs_ua + ")" : t.data.payment_user_agent = e.stripejs_ua, this._transport === "cors" ? this.xhr(t) : this.ajaxJSONP(t)
        }, e.complete = function(t, n) {
            return function(r, i, s) {
                var o;
                if (r !== "success") return o = Math.round((new Date).getTime() / 1e3), (new Image).src = "https://q.stripe.com?event=stripejs-error&type=" + r + "&key=" + e.key + "&timestamp=" + o + "&payment_user_agent=" + encodeURIComponent(e.stripejs_ua), typeof t == "function" ? t(500, {
                    error: {
                        code: r,
                        type: r,
                        message: n
                    }
                }) : void 0
            }
        }, e
    }.call(this), e = this.Stripe, this.Stripe.token = function() {
        function t() {}
        return t.validate = function(e, t) {
            if (!e) throw t + " required";
            if (typeof e != "object") throw t + " invalid"
        }, t.formatData = function(t, n) {
            return e.utils.isElement(t) && (t = e.utils.paramsFromForm(t, n)), e.utils.underscoreKeys(t), t
        }, t.create = function(t, n) {
            return t.key || (t.key = e.key || e.publishableKey), e.utils.validateKey(t.key), e.request({
                url: "" + e.endpoint + "/tokens",
                data: t,
                method: "POST",
                success: function(e, t) {
                    return typeof n == "function" ? n(t, e) : void 0
                },
                complete: e.complete(n, "A network error has occurred, and you have not been charged. Please try again."),
                timeout: 4e4
            })
        }, t.get = function(t, n) {
            if (!t) throw "token required";
            return e.utils.validateKey(e.key), e.request({
                url: "" + e.endpoint + "/tokens/" + t,
                data: {
                    key: e.key
                },
                success: function(e, t) {
                    return typeof n == "function" ? n(t, e) : void 0
                },
                complete: e.complete(n, "A network error has occurred loading data from Stripe. Please try again."),
                timeout: 4e4
            })
        }, t
    }.call(this), this.Stripe.card = function(t) {
        function n() {
            return n.__super__.constructor.apply(this, arguments)
        }
        return o(n, t), n.tokenName = "card", n.whitelistedAttrs = ["number", "cvc", "exp_month", "exp_year", "name", "address_line1", "address_line2", "address_city", "address_state", "address_zip", "address_country"], n.createToken = function(t, r, i) {
            var s;
            return r == null && (r = {}), e.token.validate(t, "card"), typeof r == "function" ? (i = r, r = {}) : typeof r != "object" && (s = parseInt(r, 10), r = {}, s > 0 && (r.amount = s)), r[n.tokenName] = e.token.formatData(t, n.whitelistedAttrs), e.token.create(r, i)
        }, n.getToken = function(t, n) {
            return e.token.get(t, n)
        }, n.validateCardNumber = function(e) {
            return e = (e + "").replace(/\s+|-/g, ""), e.length >= 10 && e.length <= 16 && n.luhnCheck(e)
        }, n.validateCVC = function(t) {
            return t = e.utils.trim(t), /^\d+$/.test(t) && t.length >= 3 && t.length <= 4
        }, n.validateExpiry = function(t, n) {
            var r, i;
            return t = e.utils.trim(t), n = e.utils.trim(n), /^\d+$/.test(t) ? /^\d+$/.test(n) ? 1 <= t && t <= 12 ? (n.length === 2 && (n < 70 ? n = "20" + n : n = "19" + n), n.length !== 4 ? !1 : (i = new Date(n, t), r = new Date, i.setMonth(i.getMonth() - 1), i.setMonth(i.getMonth() + 1, 1), i > r)) : !1 : !1 : !1
        }, n.luhnCheck = function(e) {
            var t, n, r, i, s, o;
            r = !0, i = 0, n = (e + "").split("").reverse();
            for (s = 0, o = n.length; s < o; s++) {
                t = n[s], t = parseInt(t, 10);
                if (r = !r) t *= 2;
                t > 9 && (t -= 9), i += t
            }
            return i % 10 === 0
        }, n.cardType = function(e) {
            return n.cardTypes[e.slice(0, 2)] || "Unknown"
        }, n.cardBrand = function(e) {
            return n.cardType(e)
        }, n.cardTypes = function() {
            var e, t, n, r;
            t = {};
            for (e = n = 40; n <= 49; e = ++n) t[e] = "Visa";
            for (e = r = 50; r <= 59; e = ++r) t[e] = "MasterCard";
            return t[34] = t[37] = "American Express", t[60] = t[62] = t[64] = t[65] = "Discover", t[35] = "JCB", t[30] = t[36] = t[38] = t[39] = "Diners Club", t
        }(), n
    }.call(this, this.Stripe.token), this.Stripe.bankAccount = function(t) {
        function n() {
            return n.__super__.constructor.apply(this, arguments)
        }
        return o(n, t), n.tokenName = "bank_account", n.whitelistedAttrs = ["country", "routing_number", "account_number"], n.createToken = function(t, r, i) {
            return r == null && (r = {}), e.token.validate(t, "bank account"), typeof r == "function" && (i = r, r = {}), r[n.tokenName] = e.token.formatData(t, n.whitelistedAttrs), e.token.create(r, i)
        }, n.getToken = function(t, n) {
            return e.token.get(t, n)
        }, n.validateRoutingNumber = function(t, r) {
            t = e.utils.trim(t);
            switch (r) {
                case "US":
                    return /^\d+$/.test(t) && t.length === 9 && n.routingChecksum(t);
                case "CA":
                    return /\d{5}\-\d{3}/.test(t) && t.length === 9;
                default:
                    return !0
            }
        }, n.validateAccountNumber = function(t, n) {
            t = e.utils.trim(t);
            switch (n) {
                case "US":
                    return /^\d+$/.test(t) && t.length >= 1 && t.length <= 17;
                default:
                    return !0
            }
        }, n.routingChecksum = function(e) {
            var t, n, r, i, s, o;
            r = 0, t = (e + "").split(""), o = [0, 3, 6];
            for (i = 0, s = o.length; i < s; i++) n = o[i], r += parseInt(t[n]) * 3, r += parseInt(t[n + 1]) * 7, r += parseInt(t[n + 2]);
            return r !== 0 && r % 10 === 0
        }, n
    }.call(this, this.Stripe.token), this.Stripe.bitcoinReceiver = function() {
        function t() {}
        return t._whitelistedAttrs = ["amount", "currency", "email", "description"], t.createReceiver = function(t, n) {
            var r;
            return e.token.validate(t, "bitcoin_receiver data"), r = e.token.formatData(t, this._whitelistedAttrs), r.key = e.key || e.publishableKey, e.utils.validateKey(r.key), e.request({
                url: "" + e.endpoint + "/bitcoin/receivers",
                data: r,
                method: "POST",
                success: function(e, t) {
                    return typeof n == "function" ? n(t, e) : void 0
                },
                complete: e.complete(n, "A network error has occurred while creating a Bitcoin address. Please try again."),
                timeout: 4e4
            })
        }, t.getReceiver = function(t, n) {
            var r;
            if (!t) throw "receiver id required";
            return r = e.key || e.publishableKey, e.utils.validateKey(r), e.request({
                url: "" + e.endpoint + "/bitcoin/receivers/" + t,
                data: {
                    key: r
                },
                success: function(e, t) {
                    return typeof n == "function" ? n(t, e) : void 0
                },
                complete: e.complete(n, "A network error has occurred loading data from Stripe. Please try again."),
                timeout: 4e4
            })
        }, t._activeReceiverPolls = {}, t._clearReceiverPoll = function(e) {
            return delete t._activeReceiverPolls[e]
        }, t._pollInterval = 1500, t.pollReceiver = function(e, t) {
            if (this._activeReceiverPolls[e] != null) throw "You are already polling receiver " + e + ". Please cancel that poll before polling it again.";
            return this._activeReceiverPolls[e] = {}, this._pollReceiver(e, t)
        }, t._pollReceiver = function(e, n) {
            t.getReceiver(e, function(r, i) {
                var s, o;
                if (t._activeReceiverPolls[e] == null) return;
                return r === 200 && i.filled ? (t._clearReceiverPoll(e), typeof n == "function" ? n(r, i) : void 0) : r >= 400 && r < 500 ? (t._clearReceiverPoll(e), typeof n == "function" ? n(r, i) : void 0) : (s = r === 500 ? 5e3 : t._pollInterval, o = setTimeout(function() {
                    return t._pollReceiver(e, n)
                }, s), t._activeReceiverPolls[e].timeoutId = o)
            })
        }, t.cancelReceiverPoll = function(e) {
            var n;
            n = t._activeReceiverPolls[e];
            if (n == null) throw "You are not polling receiver " + e + ".";
            n["timeoutId"] != null && clearTimeout(n.timeoutId), t._clearReceiverPoll(e)
        }, t
    }.call(this), t = ["createToken", "getToken", "cardType", "validateExpiry", "validateCVC", "validateCardNumber"];
    for (r = 0, i = t.length; r < i; r++) n = t[r], this.Stripe[n] = this.Stripe.card[n];
    typeof module != "undefined" && module !== null && (module.exports = this.Stripe), typeof define == "function" && define("stripe", [], function() {
        return u.Stripe
    })
}).call(this),
    function() {
        var e = [].indexOf || function(e) {
            for (var t = 0, n = this.length; t < n; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
        this.Stripe.utils = function() {
            function r() {}
            var t, n;
            return n = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g, t = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, r.trim = function(e) {
                return e === null ? "" : (e + "").replace(t, "")
            }, r.parseJSON = function(e) {
                var t, r, i, s;
                if ((s = window.JSON) != null ? s.parse : void 0) return window.JSON.parse(e + "");
                r = void 0, t = null, i = Stripe.utils.trim(e + "");
                if (i && !Stripe.utils.trim(i.replace(n, function(e, n, i, s) {
                        return r && n && (t = 0), t === 0 ? e : (r = i || n, t += !s - !i, "")
                    }))) return Function("return " + i)();
                throw new Error("Invalid JSON: " + e)
            }, r.serialize = function(e, t, n) {
                var r, i;
                t == null && (t = []);
                try {
                    for (r in e) i = e[r], n && (r = "" + n + "[" + r + "]"), typeof i == "object" ? this.serialize(i, t, r) : t.push("" + r + "=" + encodeURIComponent(i));
                    return t.join("&").replace(/%20/g, "+")
                } catch (s) {
                    throw new Error("Unable to serialize: " + e)
                }
            }, r.underscore = function(e) {
                return (e + "").replace(/([A-Z])/g, function(e) {
                    return "_" + e.toLowerCase()
                }).replace(/-/g, "_")
            }, r.underscoreKeys = function(e) {
                var t, n, r;
                r = [];
                for (t in e) n = e[t], delete e[t], r.push(e[this.underscore(t)] = n);
                return r
            }, r.isElement = function(e) {
                return typeof e != "object" ? !1 : e.jquery ? !0 : e.nodeType === 1
            }, r.paramsFromForm = function(t, n) {
                var r, i, s, o, u, a, f, l, c, h;
                n == null && (n = []), t.jquery && (t = t[0]), s = t.getElementsByTagName("input"), u = t.getElementsByTagName("select"), a = {};
                for (f = 0, c = s.length; f < c; f++) {
                    i = s[f], r = this.underscore(i.getAttribute("data-stripe"));
                    if (e.call(n, r) < 0) continue;
                    a[r] = i.value
                }
                for (l = 0, h = u.length; l < h; l++) {
                    o = u[l], r = this.underscore(o.getAttribute("data-stripe"));
                    if (e.call(n, r) < 0) continue;
                    o.selectedIndex != null && (a[r] = o.options[o.selectedIndex].value)
                }
                return a
            }, r.validateProtocol = function(e) {
                var t;
                if (!e || typeof e != "string") return;
                if (/_live_/g.test(e) && window.location.protocol !== "https:" && ((t = window.console) != null ? t.warn : void 0) != null) return window.console.warn("You are using Stripe.js in live mode over an insecure connection. This is considered unsafe. Please conduct live requests only on sites served over https. For more info, see https://stripe.com/help/ssl")
            }, r.validateKey = function(e) {
                if (!e || typeof e != "string") throw new Error("You did not set a valid publishable key. Call Stripe.setPublishableKey() with your publishable key. For more info, see https://stripe.com/docs/stripe.js");
                if (/\s/g.test(e)) throw new Error("Your key is invalid, as it contains whitespace. For more info, see https://stripe.com/docs/stripe.js");
                if (/^sk_/.test(e)) throw new Error("You are using a secret key with Stripe.js, instead of the publishable one. For more info, see https://stripe.com/docs/stripe.js")
            }, r
        }()
    }.call(this),
    function() {
        var e, t = [].slice;
        e = (new Date).getTime(), this.Stripe.ajaxJSONP = function(n) {
            var r, i, s, o, u, a;
            return n == null && (n = {}), s = "sjsonp" + ++e, u = document.createElement("script"), i = null, r = function(e) {
                var t;
                return e == null && (e = "abort"), clearTimeout(i), (t = u.parentNode) != null && t.removeChild(u), s in window && (window[s] = function() {}), typeof n.complete == "function" ? n.complete(e, a, n) : void 0
            }, a = {
                abort: r
            }, u.onerror = function() {
                return a.abort(), typeof n.error == "function" ? n.error(a, n) : void 0
            }, window[s] = function() {
                var e;
                e = 1 <= arguments.length ? t.call(arguments, 0) : [], clearTimeout(i), u.parentNode.removeChild(u);
                try {
                    delete window[s]
                } catch (r) {
                    window[s] = void 0
                }
                return typeof n.success == "function" && n.success.apply(n, e), typeof n.complete == "function" ? n.complete("success", a, n) : void 0
            }, n.data || (n.data = {}), n.data.callback = s, n.method && (n.data._method = n.method), u.src = n.url + "?" + Stripe.utils.serialize(n.data), o = document.getElementsByTagName("head")[0], o.appendChild(u), n.timeout > 0 && (i = setTimeout(function() {
                return a.abort("timeout")
            }, n.timeout)), a
        }
    }.call(this),
    function() {
        var e, t, n, r, i, s, o, u, a, f = {}.hasOwnProperty;
        t = {
            contentType: "application/x-www-form-urlencoded",
            accept: {
                json: "application/json"
            }
        }, o = /^(20\d|1223)$/, s = "invalid_json_response", r = function(e, t, n) {
            return function() {
                if (e._aborted) return n("aborted");
                if (e.request && e.request.readyState === 4) return e.request.onreadystatechange = function() {}, o.test(e.request.status) ? t(e.request, e.request.status) : (t(e.request, e.request.status), n("response_code"))
            }
        }, u = function(e, n) {
            var r, i, s;
            i = n.headers || {}, i.Accept || (i.Accept = t.accept.json), i["Content-Type"] || (i["Content-Type"] = t.contentType), s = [];
            for (r in i) {
                if (!f.call(i, r)) continue;
                "setRequestHeader" in e ? s.push(e.setRequestHeader(r, i[r])) : s.push(void 0)
            }
            return s
        }, a = function(e, t) {
            return /\?/.test(e) ? e + "&" + t : e + "?" + t
        }, n = function(e, t) {
            var n, i, s, o, f, l, c, h;
            return f = this.o, o = (f.method || "GET").toUpperCase(), l = f.url, s = (c = f.data) != null ? c.key : void 0, n = Stripe.utils.serialize(f.data), i = void 0, o === "GET" && n && (l = a(l, n), n = null), h = new XMLHttpRequest, h.open(o, l, !0), u(h, f), h.onreadystatechange = r(this, e, t), h.send(n), h
        }, e = function(e) {
            return this.o = e, i.apply(this, arguments)
        }, i = function(e) {
            var t, r, i, o = this;
            return this.url = e.url, this.timeout = null, this._successHandler = function() {}, this._errorHandlers = [], this._completeHandlers = [], e.timeout && (this.timeout = setTimeout(function() {
                return o.abort()
            }, e.timeout)), e.success && (this._successHandler = function() {
                return e.success.apply(e, arguments)
            }), e.error && this._errorHandlers.push(function() {
                return e.error.apply(e, arguments)
            }), e.complete && this._completeHandlers.push(function() {
                return e.complete.apply(e, arguments)
            }), t = function(t) {
                var n;
                e.timeout && clearTimeout(o.timeout), o.timeout = null, n = [];
                while (o._completeHandlers.length > 0) n.push(o._completeHandlers.shift()("success", t, e));
                return n
            }, i = function(e, n) {
                var i;
                i = e.responseText;
                if (i) try {
                    e = Stripe.utils.parseJSON(i)
                } catch (u) {
                    r(s)
                }
                return o._successHandler(e, n), t(e)
            }, r = function(e) {
                var n, r;
                r = o.request, n = r.responseText;
                if (n) try {
                    r = Stripe.utils.parseJSON(n)
                } catch (i) {
                    e = s
                }
                while (o._errorHandlers.length > 0) o._errorHandlers.shift()(r, e);
                return t(r)
            }, this.request = n.call(this, i, r)
        }, e.prototype = {
            abort: function() {
                return this._aborted = !0, this.request.abort()
            }
        }, this.Stripe.xhr = function(t) {
            return new e(t)
        }
    }.call(this),
    function() {
        var e = [].indexOf || function(e) {
            for (var t = 0, n = this.length; t < n; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
        this.Stripe.validator = {
            "boolean": function(e, t) {
                if (t !== "true" && t !== "false") return "Enter a boolean string (true or false)"
            },
            integer: function(e, t) {
                if (!/^\d+$/.test(t)) return "Enter an integer"
            },
            positive: function(e, t) {
                if (!(!this.integer(e, t) && parseInt(t, 10) > 0)) return "Enter a positive value"
            },
            range: function(t, n) {
                var r;
                if (r = parseInt(n, 10), e.call(t, r) < 0) return "Needs to be between " + t[0] + " and " + t[t.length - 1]
            },
            required: function(e, t) {
                if (e && (t == null || t === "")) return "Required"
            },
            year: function(e, t) {
                if (!/^\d{4}$/.test(t)) return "Enter a 4-digit year"
            },
            birthYear: function(e, t) {
                var n;
                n = this.year(e, t);
                if (n) return n;
                if (parseInt(t, 10) > 2e3) return "You must be over 18";
                if (parseInt(t, 10) < 1900) return "Enter your birth year"
            },
            month: function(e, t) {
                if (this.integer(e, t)) return "Please enter a month";
                if (this.range([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], t)) return "Needs to be between 1 and 12"
            },
            choices: function(t, n) {
                if (e.call(t, n) < 0) return "Not an acceptable value for this field"
            },
            email: function(e, t) {
                if (!/^[^@<\s>]+@[^@<\s>]+$/.test(t)) return "That doesn't look like an email address"
            },
            url: function(e, t) {
                if (!/^https?:\/\/.+\..+/.test(t)) return "Not a valid url"
            },
            usTaxID: function(e, t) {
                if (!/^\d{2}-?\d{1}-?\d{2}-?\d{4}$/.test(t)) return "Not a valid tax ID"
            },
            ein: function(e, t) {
                if (!/^\d{2}-?\d{7}$/.test(t)) return "Not a valid EIN"
            },
            ssnLast4: function(e, t) {
                if (!/^\d{4}$/.test(t)) return "Not a valid last 4 digits for an SSN"
            },
            ownerPersonalID: function(e, t) {
                var n;
                n = function() {
                    switch (e) {
                        case "CA":
                            return /^\d{3}-?\d{3}-?\d{3}$/.test(t);
                        case "US":
                            return !0
                    }
                }();
                if (!n) return "Not a valid ID"
            },
            bizTaxID: function(e, t) {
                var n, r, i, s, o, u, a, f;
                u = {
                    CA: ["Tax ID", [/^\d{9}$/]],
                    US: ["EIN", [/^\d{2}-?\d{7}$/]]
                }, o = u[e];
                if (o != null) {
                    n = o[0], s = o[1], r = !1;
                    for (a = 0, f = s.length; a < f; a++) {
                        i = s[a];
                        if (i.test(t)) {
                            r = !0;
                            break
                        }
                    }
                    if (!r) return "Not a valid " + n
                }
            },
            zip: function(e, t) {
                var n;
                n = function() {
                    switch (e.toUpperCase()) {
                        case "CA":
                            return /^[\d\w]{6}$/.test(t != null ? t.replace(/\s+/g, "") : void 0);
                        case "US":
                            return /^\d{5}$/.test(t) || /^\d{9}$/.test(t)
                    }
                }();
                if (!n) return "Not a valid zip"
            },
            bankAccountNumber: function(e, t) {
                if (!/^\d{1,17}$/.test(t)) return "Invalid bank account number"
            },
            usRoutingNumber: function(e) {
                var t, n, r, i, s, o, u;
                if (!/^\d{9}$/.test(e)) return "Routing number must have 9 digits";
                s = 0;
                for (t = o = 0, u = e.length - 1; o <= u; t = o += 3) n = parseInt(e.charAt(t), 10) * 3, r = parseInt(e.charAt(t + 1), 10) * 7, i = parseInt(e.charAt(t + 2), 10), s += n + r + i;
                if (s === 0 || s % 10 !== 0) return "Invalid routing number"
            },
            caRoutingNumber: function(e) {
                if (!/^\d{5}\-\d{3}$/.test(e)) return "Invalid transit number"
            },
            routingNumber: function(e, t) {
                switch (e.toUpperCase()) {
                    case "CA":
                        return this.caRoutingNumber(t);
                    case "US":
                        return this.usRoutingNumber(t)
                }
            },
            phoneNumber: function(e, t) {
                var n;
                n = t.replace(/[^0-9]/g, "");
                if (n.length !== 10) return "Invalid phone number"
            },
            bizDBA: function(e, t) {
                if (!/^.{1,23}$/.test(t)) return "Statement descriptors can only have up to 23 characters"
            },
            nameLength: function(e, t) {
                if (t.length === 1) return "Names need to be longer than one character"
            }
        }
    }.call(this),
    function() {
        this.Stripe.stripejs_ua = "stripe.js/e1c92db"
    }.call(this);
