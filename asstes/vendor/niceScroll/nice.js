! function(e) { "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery) }(function(e) {
    "use strict";
    var E = !1,
        L = !1,
        M = 0,
        C = 2e3,
        N = 0,
        P = e,
        R = document,
        _ = window,
        I = P(_),
        O = [];
    var Y = _.requestAnimationFrame || _.webkitRequestAnimationFrame || _.mozRequestAnimationFrame || !1,
        H = _.cancelAnimationFrame || _.webkitCancelAnimationFrame || _.mozCancelAnimationFrame || !1;
    if (Y) _.cancelAnimationFrame || (H = function(e) {});
    else {
        var s = 0;
        Y = function(e, o) {
            var t = (new Date).getTime(),
                r = Math.max(0, 16 - (t - s)),
                i = _.setTimeout(function() { e(t + r) }, r);
            return s = t + r, i
        }, H = function(e) { _.clearTimeout(e) }
    }

    function l(e, o) {
        var b = this;
        this.version = "3.7.6", this.name = "nicescroll", this.me = o;
        var y = P("body"),
            x = this.opt = { doc: y, win: !1 };
        if (P.extend(x, D), x.snapbackspeed = 80, e)
            for (var t in x) void 0 !== e[t] && (x[t] = e[t]);
        if (x.disablemutationobserver && (B = !1), this.doc = x.doc, this.iddoc = this.doc && this.doc[0] && this.doc[0].id || "", this.ispage = /^BODY|HTML/.test(x.win ? x.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== x.win, this.win = x.win || (this.ispage ? I : this.doc), this.docscroll = this.ispage && !this.haswrapper ? I : this.win, this.body = y, this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != x.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = { x: 0, y: 0 }, this.scrollratio = { x: 0, y: 0 }, this.cursorheight = 20, this.scrollvaluemax = 0, "auto" == x.rtlmode) {
            var r = this.win[0] == _ ? this.body : this.win,
                i = r.css("writing-mode") || r.css("-webkit-writing-mode") || r.css("-ms-writing-mode") || r.css("-moz-writing-mode");
            "horizontal-tb" == i || "lr-tb" == i || "" === i ? (this.isrtlmode = "rtl" == r.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == i || "tb" == i || "tb-rl" == i || "rl-tb" == i, this.isvertical = "vertical-rl" == i || "tb" == i || "tb-rl" == i)
        } else this.isrtlmode = !0 === x.rtlmode, this.isvertical = !1;
        if (this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, (this.observerbody = !1) !== x.scrollbarid) this.id = x.scrollbarid;
        else
            for (; this.id = "ascrail" + C++, R.getElementById(this.id););
        this.rail = !1, this.cursor = !1, this.cursorfreezed = !1, this.selectiondrag = !1, this.zoom = !1, this.zoomactive = !1, this.hasfocus = !1, this.hasmousefocus = !1, this.railslocked = !1, this.locked = !1, this.hidden = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = x.overflowx, this.overflowy = x.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltax = 0, this.lastdeltay = 0, this.detected = function() {
            if (A) return A;
            var e = R.createElement("DIV"),
                s = e.style,
                o = navigator.userAgent,
                t = navigator.platform,
                n = {};
            return n.haspointerlock = "pointerLockElement" in R || "webkitPointerLockElement" in R || "mozPointerLockElement" in R, n.isopera = "opera" in _, n.isopera12 = n.isopera && "getUserMedia" in navigator, n.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(_.operamini), n.isie = "all" in R && "attachEvent" in e && !n.isopera, n.isieold = n.isie && !("msInterpolationMode" in s), n.isie7 = n.isie && !n.isieold && (!("documentMode" in R) || 7 === R.documentMode), n.isie8 = n.isie && "documentMode" in R && 8 === R.documentMode, n.isie9 = n.isie && "performance" in _ && 9 === R.documentMode, n.isie10 = n.isie && "performance" in _ && 10 === R.documentMode, n.isie11 = "msRequestFullscreen" in e && 11 <= R.documentMode, n.ismsedge = "msCredentials" in _, n.ismozilla = "MozAppearance" in s, n.iswebkit = !n.ismsedge && "WebkitAppearance" in s, n.ischrome = n.iswebkit && "chrome" in _, n.ischrome38 = n.ischrome && "touchAction" in s, n.ischrome22 = !n.ischrome38 && n.ischrome && n.haspointerlock, n.ischrome26 = !n.ischrome38 && n.ischrome && "transition" in s, n.cantouch = "ontouchstart" in R.documentElement || "ontouchstart" in _, n.hasw3ctouch = !!_.PointerEvent && (0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints), n.hasmstouch = !n.hasw3ctouch && (_.MSPointerEvent || !1), n.ismac = /^mac$/i.test(t), n.isios = n.cantouch && /iphone|ipad|ipod/i.test(t), n.isios4 = n.isios && !("seal" in Object), n.isios7 = n.isios && "webkitHidden" in R, n.isios8 = n.isios && "hidden" in R, n.isios10 = n.isios && _.Proxy, n.isandroid = /android/i.test(o), n.haseventlistener = "addEventListener" in e, n.trstyle = !1, n.hastransform = !1, n.hastranslate3d = !1, n.transitionstyle = !1, n.hastransition = !1, n.transitionend = !1, n.trstyle = "transform", n.hastransform = "transform" in s || function() {
                for (var e = ["msTransform", "webkitTransform", "MozTransform", "OTransform"], o = 0, t = e.length; o < t; o++)
                    if (void 0 !== s[e[o]]) { n.trstyle = e[o]; break }
                n.hastransform = !!n.trstyle
            }(), n.hastransform && (s[n.trstyle] = "translate3d(1px,2px,3px)", n.hastranslate3d = /translate3d/.test(s[n.trstyle])), n.transitionstyle = "transition", n.prefixstyle = "", n.transitionend = "transitionend", n.hastransition = "transition" in s || function() {
                n.transitionend = !1;
                for (var e = ["webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"], o = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"], t = ["webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"], r = 0, i = e.length; r < i; r++)
                    if (e[r] in s) { n.transitionstyle = e[r], n.prefixstyle = o[r], n.transitionend = t[r]; break }
                n.ischrome26 && (n.prefixstyle = o[1]), n.hastransition = n.transitionstyle
            }(), n.cursorgrabvalue = function() {
                var e = ["grab", "-webkit-grab", "-moz-grab"];
                (n.ischrome && !n.ischrome38 || n.isie) && (e = []);
                for (var o = 0, t = e.length; o < t; o++) { var r = e[o]; if (s.cursor = r, s.cursor == r) return r }
                return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize"
            }(), n.hasmousecapture = "setCapture" in e, n.hasMutationObserver = !1 !== B, e = null, A = n
        }();
        var S = P.extend({}, this.detected);

        function d(e, o, t, r, i, s, n) { this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = s || 0, this.p4 = n || 1, this.ts = X(), this.df = o - e }

        function s() { var e = b.doc.css(S.trstyle); return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) }
        if (this.canhwscroll = S.hastransform && x.hwacceleration, this.ishwscroll = this.canhwscroll && b.haswrapper, this.isrtlmode ? this.isvertical ? this.hasreversehr = !(S.iswebkit || S.isie || S.isie11) : this.hasreversehr = !(S.iswebkit || S.isie && !S.isie10 && !S.isie11) : this.hasreversehr = !1, this.istouchcapable = !1, (S.cantouch || !S.hasw3ctouch && !S.hasmstouch) && (!S.cantouch || S.isios || S.isandroid || !S.iswebkit && !S.ismozilla) || (this.istouchcapable = !0), x.enablemouselockapi || (S.hasmousecapture = !1, S.haspointerlock = !1), this.debounced = function(e, o, t) { b && (b.delaylist[e] || !1 || (b.delaylist[e] = { h: Y(function() { b.delaylist[e].fn.call(b), b.delaylist[e] = !1 }, t) }, o.call(b)), b.delaylist[e].fn = o) }, this.synched = function(e, o) { b.synclist[e] ? b.synclist[e] = o : (b.synclist[e] = o, Y(function() { b && (b.synclist[e] && b.synclist[e].call(b), b.synclist[e] = null) })) }, this.unsynched = function(e) { b.synclist[e] && (b.synclist[e] = !1) }, this.css = function(e, o) { for (var t in o) b.saved.css.push([e, t, e.css(t)]), e.css(t, o[t]) }, this.scrollTop = function(e) { return void 0 === e ? b.getScrollTop() : b.setScrollTop(e) }, this.scrollLeft = function(e) { return void 0 === e ? b.getScrollLeft() : b.setScrollLeft(e) }, d.prototype = {
                B2: function(e) { return 3 * (1 - e) * (1 - e) * e },
                B3: function(e) { return 3 * (1 - e) * e * e },
                B4: function(e) { return e * e * e },
                getPos: function() { return (X() - this.ts) / this.spd },
                getNow: function() {
                    var e = (X() - this.ts) / this.spd,
                        o = this.B2(e) + this.B3(e) + this.B4(e);
                    return 1 <= e ? this.ed : this.st + this.df * o | 0
                },
                update: function(e, o) { return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = X(), this.df = this.ed - this.st, this }
            }, this.ishwscroll) {
            this.doc.translate = { x: 0, y: 0, tx: "0px", ty: "0px" }, S.hastranslate3d && S.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function(e) { if (!e) { var o = s(); if (o) return 16 == o.length ? -o[13] : -o[5]; if (b.timerscroll && b.timerscroll.bz) return b.timerscroll.bz.getNow() } return b.doc.translate.y }, this.getScrollLeft = function(e) { if (!e) { var o = s(); if (o) return 16 == o.length ? -o[12] : -o[4]; if (b.timerscroll && b.timerscroll.bh) return b.timerscroll.bh.getNow() } return b.doc.translate.x }, this.notifyScrollEvent = function(e) {
                var o = R.createEvent("UIEvents");
                o.initUIEvent("scroll", !1, !1, _, 1), o.niceevent = !0, e.dispatchEvent(o)
            };
            var n = this.isrtlmode ? 1 : -1;
            S.hastranslate3d && x.enabletranslate3d ? (this.setScrollTop = function(e, o) { b.doc.translate.y = e, b.doc.translate.ty = -1 * e + "px", b.doc.css(S.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0)"), o || b.notifyScrollEvent(b.win[0]) }, this.setScrollLeft = function(e, o) { b.doc.translate.x = e, b.doc.translate.tx = e * n + "px", b.doc.css(S.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0)"), o || b.notifyScrollEvent(b.win[0]) }) : (this.setScrollTop = function(e, o) { b.doc.translate.y = e, b.doc.translate.ty = -1 * e + "px", b.doc.css(S.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")"), o || b.notifyScrollEvent(b.win[0]) }, this.setScrollLeft = function(e, o) { b.doc.translate.x = e, b.doc.translate.tx = e * n + "px", b.doc.css(S.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")"), o || b.notifyScrollEvent(b.win[0]) })
        } else this.getScrollTop = function() { return b.docscroll.scrollTop() }, this.setScrollTop = function(e) { b.docscroll.scrollTop(e) }, this.getScrollLeft = function() { return b.hasreversehr ? b.detected.ismozilla ? b.page.maxw - Math.abs(b.docscroll.scrollLeft()) : b.page.maxw - b.docscroll.scrollLeft() : b.docscroll.scrollLeft() }, this.setScrollLeft = function(e) { return setTimeout(function() { if (b) return b.hasreversehr && (e = b.detected.ismozilla ? -(b.page.maxw - e) : b.page.maxw - e), b.docscroll.scrollLeft(e) }, 1) };
        this.getTarget = function(e) { return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement) }, this.hasParent = function(e, o) { if (!e) return !1; for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) t = t.parentNode || !1; return !1 !== t };
        var l = { thin: 1, medium: 3, thick: 5 };

        function a(e, o, t) {
            var r = e.css(o),
                i = parseFloat(r);
            if (isNaN(i)) { var s = 3 == (i = l[r] || 0) ? t ? b.win.outerHeight() - b.win.innerHeight() : b.win.outerWidth() - b.win.innerWidth() : 1; return b.isie8 && i && (i += 1), s ? i : 0 }
            return i
        }
        this.getDocumentScrollOffset = function() { return { top: _.pageYOffset || R.documentElement.scrollTop, left: _.pageXOffset || R.documentElement.scrollLeft } }, this.getOffset = function() {
            if (b.isfixed) {
                var e = b.win.offset(),
                    o = b.getDocumentScrollOffset();
                return e.top -= o.top, e.left -= o.left, e
            }
            var t = b.win.offset();
            if (!b.viewport) return t;
            var r = b.viewport.offset();
            return { top: t.top - r.top, left: t.left - r.left }
        }, this.updateScrollBar = function(e) {
            var o, t;
            if (b.ishwscroll) b.rail.css({ height: b.win.innerHeight() - (x.railpadding.top + x.railpadding.bottom) }), b.railh && b.railh.css({ width: b.win.innerWidth() - (x.railpadding.left + x.railpadding.right) });
            else {
                var r = b.getOffset();
                if ((o = { top: r.top, left: r.left - (x.railpadding.left + x.railpadding.right) }).top += a(b.win, "border-top-width", !0), o.left += b.rail.align ? b.win.outerWidth() - a(b.win, "border-right-width") - b.rail.width : a(b.win, "border-left-width"), (t = x.railoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left)), b.railslocked || b.rail.css({ top: o.top, left: o.left, height: (e ? e.h : b.win.innerHeight()) - (x.railpadding.top + x.railpadding.bottom) }), b.zoom && b.zoom.css({ top: o.top + 1, left: 1 == b.rail.align ? o.left - 20 : o.left + b.rail.width + 4 }), b.railh && !b.railslocked) {
                    o = { top: r.top, left: r.left }, (t = x.railhoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left));
                    var i = b.railh.align ? o.top + a(b.win, "border-top-width", !0) + b.win.innerHeight() - b.railh.height : o.top + a(b.win, "border-top-width", !0),
                        s = o.left + a(b.win, "border-left-width");
                    b.railh.css({ top: i - (x.railpadding.top + x.railpadding.bottom), left: s, width: b.railh.width })
                }
            }
        }, this.doRailClick = function(e, o, t) {
            var r, i, s, n;
            b.railslocked || (b.cancelEvent(e), "pageY" in e || (e.pageX = e.clientX + R.documentElement.scrollLeft, e.pageY = e.clientY + R.documentElement.scrollTop), o ? (r = t ? b.doScrollLeft : b.doScrollTop, s = t ? (e.pageX - b.railh.offset().left - b.cursorwidth / 2) * b.scrollratio.x : (e.pageY - b.rail.offset().top - b.cursorheight / 2) * b.scrollratio.y, b.unsynched("relativexy"), r(0 | s)) : (r = t ? b.doScrollLeftBy : b.doScrollBy, s = t ? b.scroll.x : b.scroll.y, n = t ? e.pageX - b.railh.offset().left : e.pageY - b.rail.offset().top, i = t ? b.view.w : b.view.h, r(n <= s ? i : -i)))
        }, b.newscrolly = b.newscrollx = 0, b.hasanimationframe = "requestAnimationFrame" in _, b.hascancelanimationframe = "cancelAnimationFrame" in _, b.hasborderbox = !1, this.init = function() {
            if (b.saved.css = [], S.isoperamini) return !0;
            if (S.isandroid && !("hidden" in R)) return !0;
            x.emulatetouch = x.emulatetouch || x.touchbehavior, b.hasborderbox = _.getComputedStyle && "border-box" === _.getComputedStyle(R.body)["box-sizing"];
            var t = { "overflow-y": "hidden" };
            if ((S.isie11 || S.isie10) && (t["-ms-overflow-style"] = "none"), b.ishwscroll && (this.doc.css(S.transitionstyle, S.prefixstyle + "transform 0ms ease-out"), S.transitionend && b.bind(b.doc, S.transitionend, b.onScrollTransitionEnd, !1)), b.zindex = "auto", b.ispage || "auto" != x.zindex ? b.zindex = x.zindex : b.zindex = function() {
                    var e = b.win;
                    if ("zIndex" in e) return e.zIndex();
                    for (; 0 < e.length;) {
                        if (9 == e[0].nodeType) return !1;
                        var o = e.css("zIndex");
                        if (!isNaN(o) && 0 !== o) return parseInt(o);
                        e = e.parent()
                    }
                    return !1
                }() || "auto", !b.ispage && "auto" != b.zindex && b.zindex > N && (N = b.zindex), b.isie && 0 === b.zindex && "auto" == x.zindex && (b.zindex = "auto"), !b.ispage || !S.isieold) {
                var e = b.docscroll;
                b.ispage && (e = b.haswrapper ? b.win : b.doc), b.css(e, t), b.ispage && (S.isie11 || S.isie) && b.css(P("html"), t), !S.isios || b.ispage || b.haswrapper || b.css(y, { "-webkit-overflow-scrolling": "touch" });
                var o = P(R.createElement("div"));
                o.css({ position: "relative", top: 0, float: "right", width: x.cursorwidth, height: 0, "background-color": x.cursorcolor, border: x.cursorborder, "background-clip": "padding-box", "-webkit-border-radius": x.cursorborderradius, "-moz-border-radius": x.cursorborderradius, "border-radius": x.cursorborderradius }), o.addClass("nicescroll-cursors"), b.cursor = o;
                var r = P(R.createElement("div"));
                r.attr("id", b.id), r.addClass("nicescroll-rails nicescroll-rails-vr"), x.scrollCLass && r.addClass(x.scrollCLass);
                var i, s, n = ["left", "right", "top", "bottom"];
                for (var l in n) s = n[l], (i = x.railpadding[s] || 0) && r.css("padding-" + s, i + "px");
                r.append(o), r.width = Math.max(parseFloat(x.cursorwidth), o.outerWidth()), r.css({ width: r.width + "px", zIndex: b.zindex, background: x.background, cursor: "default" }), r.visibility = !0, r.scrollable = !0, r.align = "left" == x.railalign ? 0 : 1, b.rail = r;
                var a, c = b.rail.drag = !1;
                if (!x.boxzoom || b.ispage || S.isieold || (c = R.createElement("div"), b.bind(c, "click", b.doZoom), b.bind(c, "mouseenter", function() { b.zoom.css("opacity", x.cursoropacitymax) }), b.bind(c, "mouseleave", function() { b.zoom.css("opacity", x.cursoropacitymin) }), b.zoom = P(c), b.zoom.css({ cursor: "pointer", zIndex: b.zindex, backgroundImage: "url(" + x.scriptpath + "zoomico.png)", height: 18, width: 18, backgroundPosition: "0 0" }), x.dblclickzoom && b.bind(b.win, "dblclick", b.doZoom), S.cantouch && x.gesturezoom && (b.ongesturezoom = function(e) { return 1.5 < e.scale && b.doZoomIn(e), e.scale < .8 && b.doZoomOut(e), b.cancelEvent(e) }, b.bind(b.win, "gestureend", b.ongesturezoom))), b.railh = !1, x.horizrailenabled && (b.css(e, { overflowX: "hidden" }), (o = P(R.createElement("div"))).css({ position: "absolute", top: 0, height: x.cursorwidth, width: 0, backgroundColor: x.cursorcolor, border: x.cursorborder, backgroundClip: "padding-box", "-webkit-border-radius": x.cursorborderradius, "-moz-border-radius": x.cursorborderradius, "border-radius": x.cursorborderradius }), S.isieold && o.css("overflow", "hidden"), o.addClass("nicescroll-cursors"), b.cursorh = o, (a = P(R.createElement("div"))).attr("id", b.id + "-hr"), a.addClass("nicescroll-rails nicescroll-rails-hr"), x.scrollCLass && a.addClass(x.scrollCLass), a.height = Math.max(parseFloat(x.cursorwidth), o.outerHeight()), a.css({ height: a.height + "px", zIndex: b.zindex, background: x.background }), a.append(o), a.visibility = !0, a.scrollable = !0, a.align = "top" == x.railvalign ? 0 : 1, b.railh = a, b.railh.drag = !1), b.ispage) r.css({ position: "fixed", top: 0, height: "100%" }), r.css(r.align ? { right: 0 } : { left: 0 }), b.body.append(r), b.railh && (a.css({ position: "fixed", left: 0, width: "100%" }), a.css(a.align ? { bottom: 0 } : { top: 0 }), b.body.append(a));
                else {
                    if (b.ishwscroll) {
                        "static" == b.win.css("position") && b.css(b.win, { position: "relative" });
                        var d = "HTML" == b.win[0].nodeName ? b.body : b.win;
                        P(d).scrollTop(0).scrollLeft(0), b.zoom && (b.zoom.css({ position: "absolute", top: 1, right: 0, "margin-right": r.width + 4 }), d.append(b.zoom)), r.css({ position: "absolute", top: 0 }), r.css(r.align ? { right: 0 } : { left: 0 }), d.append(r), a && (a.css({ position: "absolute", left: 0, bottom: 0 }), a.css(a.align ? { bottom: 0 } : { top: 0 }), d.append(a))
                    } else {
                        b.isfixed = "fixed" == b.win.css("position");
                        var u = b.isfixed ? "fixed" : "absolute";
                        b.isfixed || (b.viewport = b.getViewport(b.win[0])), b.viewport && (b.body = b.viewport, /fixed|absolute/.test(b.viewport.css("position")) || b.css(b.viewport, { position: "relative" })), r.css({ position: u }), b.zoom && b.zoom.css({ position: u }), b.updateScrollBar(), b.body.append(r), b.zoom && b.body.append(b.zoom), b.railh && (a.css({ position: u }), b.body.append(a))
                    }
                    S.isios && b.css(b.win, { "-webkit-tap-highlight-color": "rgba(0,0,0,0)", "-webkit-touch-callout": "none" }), x.disableoutline && (S.isie && b.win.attr("hideFocus", "true"), S.iswebkit && b.win.css("outline", "none"))
                }
                if (!1 === x.autohidemode ? (b.autohidedom = !1, b.rail.css({ opacity: x.cursoropacitymax }), b.railh && b.railh.css({ opacity: x.cursoropacitymax })) : !0 === x.autohidemode || "leave" === x.autohidemode ? (b.autohidedom = P().add(b.rail), S.isie8 && (b.autohidedom = b.autohidedom.add(b.cursor)), b.railh && (b.autohidedom = b.autohidedom.add(b.railh)), b.railh && S.isie8 && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "scroll" == x.autohidemode ? (b.autohidedom = P().add(b.rail), b.railh && (b.autohidedom = b.autohidedom.add(b.railh))) : "cursor" == x.autohidemode ? (b.autohidedom = P().add(b.cursor), b.railh && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "hidden" == x.autohidemode && (b.autohidedom = !1, b.hide(), b.railslocked = !1), S.cantouch || b.istouchcapable || x.emulatetouch || S.hasmstouch) {
                    b.scrollmom = new q(b);
                    b.ontouchstart = function(e) {
                        if (b.locked) return !1;
                        if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
                        if (b.hasmoving = !1, b.scrollmom.timer && (b.triggerScrollEnd(), b.scrollmom.stop()), !b.railslocked) {
                            var o = b.getTarget(e);
                            if (o)
                                if (/INPUT/i.test(o.nodeName) && /range/i.test(o.type)) return b.stopPropagation(e);
                            var t = "mousedown" === e.type;
                            if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), b.forcescreen) {
                                var r = e;
                                (e = { original: e.original ? e.original : e }).clientX = r.screenX, e.clientY = r.screenY
                            }
                            if (b.rail.drag = { x: e.clientX, y: e.clientY, sx: b.scroll.x, sy: b.scroll.y, st: b.getScrollTop(), sl: b.getScrollLeft(), pt: 2, dl: !1, tg: o }, b.ispage || !x.directionlockdeadzone) b.rail.drag.dl = "f";
                            else {
                                var i = I.width(),
                                    s = I.height(),
                                    n = b.getContentSize(),
                                    l = n.h - s,
                                    a = n.w - i;
                                b.rail.scrollable && !b.railh.scrollable ? b.rail.drag.ck = 0 < l && "v" : !b.rail.scrollable && b.railh.scrollable ? b.rail.drag.ck = 0 < a && "h" : b.rail.drag.ck = !1
                            }
                            if (x.emulatetouch && b.isiframe && S.isie) {
                                var c = b.win.position();
                                b.rail.drag.x += c.left, b.rail.drag.y += c.top
                            }
                            if (b.hasmoving = !1, b.lastmouseup = !1, b.scrollmom.reset(e.clientX, e.clientY), o && t) {
                                if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName)) return S.hasmousecapture && o.setCapture(), x.emulatetouch ? (o.onclick && !o._onclick && (o._onclick = o.onclick, o.onclick = function(e) {
                                    if (b.hasmoving) return !1;
                                    o._onclick.call(this, e)
                                }), b.cancelEvent(e)) : b.stopPropagation(e);
                                /SUBMIT|CANCEL|BUTTON/i.test(P(o).attr("type")) && (b.preventclick = { tg: o, click: !1 })
                            }
                        }
                    }, b.ontouchend = function(e) {
                        if (!b.rail.drag) return !0;
                        if (2 == b.rail.drag.pt) {
                            if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
                            b.rail.drag = !1;
                            var o = "mouseup" === e.type;
                            if (b.hasmoving && (b.scrollmom.doMomentum(), b.lastmouseup = !0, b.hideCursor(), S.hasmousecapture && R.releaseCapture(), o)) return b.cancelEvent(e)
                        } else if (1 == b.rail.drag.pt) return b.onmouseup(e)
                    };
                    var m = x.emulatetouch && b.isiframe && !S.hasmousecapture,
                        f = .3 * x.directionlockdeadzone | 0;
                    b.ontouchmove = function(e, o) {
                        if (!b.rail.drag) return !0;
                        if (e.targetTouches && x.preventmultitouchscrolling && 1 < e.targetTouches.length) return !0;
                        if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !0;
                        if (2 != b.rail.drag.pt) return 1 == b.rail.drag.pt ? b.onmousemove(e) : void 0;
                        var t, r;
                        if ("changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), r = t = 0, m && !o) {
                            var i = b.win.position();
                            r = -i.left, t = -i.top
                        }
                        var s = e.clientY + t,
                            n = s - b.rail.drag.y,
                            l = e.clientX + r,
                            a = l - b.rail.drag.x,
                            c = b.rail.drag.st - n;
                        if (b.ishwscroll && x.bouncescroll) c < 0 ? c = Math.round(c / 2) : c > b.page.maxh && (c = b.page.maxh + Math.round((c - b.page.maxh) / 2));
                        else if (c < 0 ? s = c = 0 : c > b.page.maxh && (c = b.page.maxh, s = 0), 0 === s && !b.hasmoving) return b.ispage || (b.rail.drag = !1), !0;
                        var d = b.getScrollLeft();
                        if (b.railh && b.railh.scrollable && (d = b.isrtlmode ? a - b.rail.drag.sl : b.rail.drag.sl - a, b.ishwscroll && x.bouncescroll ? d < 0 ? d = Math.round(d / 2) : d > b.page.maxw && (d = b.page.maxw + Math.round((d - b.page.maxw) / 2)) : (d < 0 && (l = d = 0), d > b.page.maxw && (d = b.page.maxw, l = 0))), !b.hasmoving) {
                            if (b.rail.drag.y === e.clientY && b.rail.drag.x === e.clientX) return b.cancelEvent(e);
                            var u = Math.abs(n),
                                h = Math.abs(a),
                                p = x.directionlockdeadzone;
                            if (b.rail.drag.ck ? "v" == b.rail.drag.ck ? p < h && u <= f ? b.rail.drag = !1 : p < u && (b.rail.drag.dl = "v") : "h" == b.rail.drag.ck && (p < u && h <= f ? b.rail.drag = !1 : p < h && (b.rail.drag.dl = "h")) : p < u && p < h ? b.rail.drag.dl = "f" : p < u ? b.rail.drag.dl = f < h ? "f" : "v" : p < h && (b.rail.drag.dl = f < u ? "f" : "h"), !b.rail.drag.dl) return b.cancelEvent(e);
                            b.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), b.hasmoving = !0
                        }
                        return b.preventclick && !b.preventclick.click && (b.preventclick.click = b.preventclick.tg.onclick || !1, b.preventclick.tg.onclick = b.onpreventclick), b.rail.drag.dl && ("v" == b.rail.drag.dl ? d = b.rail.drag.sl : "h" == b.rail.drag.dl && (c = b.rail.drag.st)), b.synched("touchmove", function() { b.rail.drag && 2 == b.rail.drag.pt && (b.prepareTransition && b.resetTransition(), b.rail.scrollable && b.setScrollTop(c), b.scrollmom.update(l, s), b.railh && b.railh.scrollable ? (b.setScrollLeft(d), b.showCursor(c, d)) : b.showCursor(c), S.isie10 && R.selection.clear()) }), b.cancelEvent(e)
                    }, b.ontouchstartCursor = function(e, o) {
                        if (!b.rail.drag || 3 == b.rail.drag.pt) {
                            if (b.locked) return b.cancelEvent(e);
                            b.cancelScroll(), b.rail.drag = { x: e.touches[0].clientX, y: e.touches[0].clientY, sx: b.scroll.x, sy: b.scroll.y, pt: 3, hr: !!o };
                            var t = b.getTarget(e);
                            return !b.ispage && S.hasmousecapture && t.setCapture(), b.isiframe && !S.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), b.css(b.doc, { "pointer-events": "none" })), b.cancelEvent(e)
                        }
                    }, b.ontouchendCursor = function(e) { if (b.rail.drag) { if (S.hasmousecapture && R.releaseCapture(), b.isiframe && !S.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), 3 != b.rail.drag.pt) return; return b.rail.drag = !1, b.cancelEvent(e) } }, b.ontouchmoveCursor = function(e) {
                        if (b.rail.drag) {
                            if (3 != b.rail.drag.pt) return;
                            if (b.cursorfreezed = !0, b.rail.drag.hr) {
                                b.scroll.x = b.rail.drag.sx + (e.touches[0].clientX - b.rail.drag.x), b.scroll.x < 0 && (b.scroll.x = 0);
                                var o = b.scrollvaluemaxw;
                                b.scroll.x > o && (b.scroll.x = o)
                            } else {
                                b.scroll.y = b.rail.drag.sy + (e.touches[0].clientY - b.rail.drag.y), b.scroll.y < 0 && (b.scroll.y = 0);
                                var t = b.scrollvaluemax;
                                b.scroll.y > t && (b.scroll.y = t)
                            }
                            return b.synched("touchmove", function() { b.rail.drag && 3 == b.rail.drag.pt && (b.showCursor(), b.rail.drag.hr ? b.doScrollLeft(Math.round(b.scroll.x * b.scrollratio.x), x.cursordragspeed) : b.doScrollTop(Math.round(b.scroll.y * b.scrollratio.y), x.cursordragspeed)) }), b.cancelEvent(e)
                        }
                    }
                }
                if (b.onmousedown = function(e, o) {
                        if (!b.rail.drag || 1 == b.rail.drag.pt) {
                            if (b.railslocked) return b.cancelEvent(e);
                            b.cancelScroll(), b.rail.drag = { x: e.clientX, y: e.clientY, sx: b.scroll.x, sy: b.scroll.y, pt: 1, hr: o || !1 };
                            var t = b.getTarget(e);
                            return S.hasmousecapture && t.setCapture(), b.isiframe && !S.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), b.css(b.doc, { "pointer-events": "none" })), b.hasmoving = !1, b.cancelEvent(e)
                        }
                    }, b.onmouseup = function(e) { if (b.rail.drag) return 1 != b.rail.drag.pt || (S.hasmousecapture && R.releaseCapture(), b.isiframe && !S.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), b.rail.drag = !1, b.cursorfreezed = !1, b.hasmoving && b.triggerScrollEnd(), b.cancelEvent(e)) }, b.onmousemove = function(e) {
                        if (b.rail.drag) {
                            if (1 !== b.rail.drag.pt) return;
                            if (S.ischrome && 0 === e.which) return b.onmouseup(e);
                            if (b.cursorfreezed = !0, b.hasmoving || b.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), b.hasmoving = !0, b.rail.drag.hr) {
                                b.scroll.x = b.rail.drag.sx + (e.clientX - b.rail.drag.x), b.scroll.x < 0 && (b.scroll.x = 0);
                                var o = b.scrollvaluemaxw;
                                b.scroll.x > o && (b.scroll.x = o)
                            } else {
                                b.scroll.y = b.rail.drag.sy + (e.clientY - b.rail.drag.y), b.scroll.y < 0 && (b.scroll.y = 0);
                                var t = b.scrollvaluemax;
                                b.scroll.y > t && (b.scroll.y = t)
                            }
                            return b.synched("mousemove", function() { b.cursorfreezed && (b.showCursor(), b.rail.drag.hr ? b.scrollLeft(Math.round(b.scroll.x * b.scrollratio.x)) : b.scrollTop(Math.round(b.scroll.y * b.scrollratio.y))) }), b.cancelEvent(e)
                        }
                        b.checkarea = 0
                    }, S.cantouch || x.emulatetouch) b.onpreventclick = function(e) { if (b.preventclick) return b.preventclick.tg.onclick = b.preventclick.click, b.preventclick = !1, b.cancelEvent(e) }, b.onclick = !S.isios && function(e) { return !b.lastmouseup || (b.lastmouseup = !1, b.cancelEvent(e)) }, x.grabcursorenabled && S.cursorgrabvalue && (b.css(b.ispage ? b.doc : b.win, { cursor: S.cursorgrabvalue }), b.css(b.rail, { cursor: S.cursorgrabvalue }));
                else {
                    var h = function(e) {
                        if (b.selectiondrag) {
                            if (e) {
                                var o = b.win.outerHeight(),
                                    t = e.pageY - b.selectiondrag.top;
                                0 < t && t < o && (t = 0), o <= t && (t -= o), b.selectiondrag.df = t
                            }
                            if (0 !== b.selectiondrag.df) {
                                var r = -2 * b.selectiondrag.df / 6 | 0;
                                b.doScrollBy(r), b.debounced("doselectionscroll", function() { h() }, 50)
                            }
                        }
                    };
                    b.hasTextSelected = "getSelection" in R ? function() { return 0 < R.getSelection().rangeCount } : "selection" in R ? function() { return "None" != R.selection.type } : function() { return !1 }, b.onselectionstart = function(e) { b.ispage || (b.selectiondrag = b.win.offset()) }, b.onselectionend = function(e) { b.selectiondrag = !1 }, b.onselectiondrag = function(e) { b.selectiondrag && b.hasTextSelected() && b.debounced("selectionscroll", function() { h(e) }, 250) }
                }
                if (S.hasw3ctouch ? (b.css(b.ispage ? P("html") : b.win, { "touch-action": "none" }), b.css(b.rail, { "touch-action": "none" }), b.css(b.cursor, { "touch-action": "none" }), b.bind(b.win, "pointerdown", b.ontouchstart), b.bind(R, "pointerup", b.ontouchend), b.delegate(R, "pointermove", b.ontouchmove)) : S.hasmstouch ? (b.css(b.ispage ? P("html") : b.win, { "-ms-touch-action": "none" }), b.css(b.rail, { "-ms-touch-action": "none" }), b.css(b.cursor, { "-ms-touch-action": "none" }), b.bind(b.win, "MSPointerDown", b.ontouchstart), b.bind(R, "MSPointerUp", b.ontouchend), b.delegate(R, "MSPointerMove", b.ontouchmove), b.bind(b.cursor, "MSGestureHold", function(e) { e.preventDefault() }), b.bind(b.cursor, "contextmenu", function(e) { e.preventDefault() })) : S.cantouch && (b.bind(b.win, "touchstart", b.ontouchstart, !1, !0), b.bind(R, "touchend", b.ontouchend, !1, !0), b.bind(R, "touchcancel", b.ontouchend, !1, !0), b.delegate(R, "touchmove", b.ontouchmove, !1, !0)), x.emulatetouch && (b.bind(b.win, "mousedown", b.ontouchstart, !1, !0), b.bind(R, "mouseup", b.ontouchend, !1, !0), b.bind(R, "mousemove", b.ontouchmove, !1, !0)), !x.cursordragontouch && (S.cantouch || x.emulatetouch) || (b.rail.css({ cursor: "default" }), b.railh && b.railh.css({ cursor: "default" }), b.jqbind(b.rail, "mouseenter", function() {
                        if (!b.ispage && !b.win.is(":visible")) return !1;
                        b.canshowonmouseevent && b.showCursor(), b.rail.active = !0
                    }), b.jqbind(b.rail, "mouseleave", function() { b.rail.active = !1, b.rail.drag || b.hideCursor() }), x.sensitiverail && (b.bind(b.rail, "click", function(e) { b.doRailClick(e, !1, !1) }), b.bind(b.rail, "dblclick", function(e) { b.doRailClick(e, !0, !1) }), b.bind(b.cursor, "click", function(e) { b.cancelEvent(e) }), b.bind(b.cursor, "dblclick", function(e) { b.cancelEvent(e) })), b.railh && (b.jqbind(b.railh, "mouseenter", function() {
                        if (!b.ispage && !b.win.is(":visible")) return !1;
                        b.canshowonmouseevent && b.showCursor(), b.rail.active = !0
                    }), b.jqbind(b.railh, "mouseleave", function() { b.rail.active = !1, b.rail.drag || b.hideCursor() }), x.sensitiverail && (b.bind(b.railh, "click", function(e) { b.doRailClick(e, !1, !0) }), b.bind(b.railh, "dblclick", function(e) { b.doRailClick(e, !0, !0) }), b.bind(b.cursorh, "click", function(e) { b.cancelEvent(e) }), b.bind(b.cursorh, "dblclick", function(e) { b.cancelEvent(e) })))), x.cursordragontouch && (this.istouchcapable || S.cantouch) && (b.bind(b.cursor, "touchstart", b.ontouchstartCursor), b.bind(b.cursor, "touchmove", b.ontouchmoveCursor), b.bind(b.cursor, "touchend", b.ontouchendCursor), b.cursorh && b.bind(b.cursorh, "touchstart", function(e) { b.ontouchstartCursor(e, !0) }), b.cursorh && b.bind(b.cursorh, "touchmove", b.ontouchmoveCursor), b.cursorh && b.bind(b.cursorh, "touchend", b.ontouchendCursor)), x.emulatetouch || S.isandroid || S.isios ? (b.bind(S.hasmousecapture ? b.win : R, "mouseup", b.ontouchend), b.onclick && b.bind(R, "click", b.onclick), x.cursordragontouch ? (b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mouseup", b.onmouseup), b.cursorh && b.bind(b.cursorh, "mousedown", function(e) { b.onmousedown(e, !0) }), b.cursorh && b.bind(b.cursorh, "mouseup", b.onmouseup)) : (b.bind(b.rail, "mousedown", function(e) { e.preventDefault() }), b.railh && b.bind(b.railh, "mousedown", function(e) { e.preventDefault() }))) : (b.bind(S.hasmousecapture ? b.win : R, "mouseup", b.onmouseup), b.bind(R, "mousemove", b.onmousemove), b.onclick && b.bind(R, "click", b.onclick), b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mouseup", b.onmouseup), b.railh && (b.bind(b.cursorh, "mousedown", function(e) { b.onmousedown(e, !0) }), b.bind(b.cursorh, "mouseup", b.onmouseup)), !b.ispage && x.enablescrollonselection && (b.bind(b.win[0], "mousedown", b.onselectionstart), b.bind(R, "mouseup", b.onselectionend), b.bind(b.cursor, "mouseup", b.onselectionend), b.cursorh && b.bind(b.cursorh, "mouseup", b.onselectionend), b.bind(R, "mousemove", b.onselectiondrag)), b.zoom && (b.jqbind(b.zoom, "mouseenter", function() { b.canshowonmouseevent && b.showCursor(), b.rail.active = !0 }), b.jqbind(b.zoom, "mouseleave", function() { b.rail.active = !1, b.rail.drag || b.hideCursor() }))), x.enablemousewheel && (b.isiframe || b.mousewheel(S.isie && b.ispage ? R : b.win, b.onmousewheel), b.mousewheel(b.rail, b.onmousewheel), b.railh && b.mousewheel(b.railh, b.onmousewheelhr)), b.ispage || S.cantouch || /HTML|^BODY/.test(b.win[0].nodeName) || (b.win.attr("tabindex") || b.win.attr({ tabindex: ++M }), b.bind(b.win, "focus", function(e) { E = b.getTarget(e).id || b.getTarget(e) || !1, b.hasfocus = !0, b.canshowonmouseevent && b.noticeCursor() }), b.bind(b.win, "blur", function(e) { E = !1, b.hasfocus = !1 }), b.bind(b.win, "mouseenter", function(e) { L = b.getTarget(e).id || b.getTarget(e) || !1, b.hasmousefocus = !0, b.canshowonmouseevent && b.noticeCursor() }), b.bind(b.win, "mouseleave", function(e) { L = !1, b.hasmousefocus = !1, b.rail.drag || b.hideCursor() })), b.onkeypress = function(e) {
                        if (b.railslocked && 0 === b.page.maxh) return !0;
                        e = e || _.event;
                        var o = b.getTarget(e);
                        if (o && /INPUT|TEXTAREA|SELECT|OPTION/.test(o.nodeName) && (!(o.getAttribute("type") || o.type || !1) || !/submit|button|cancel/i.tp)) return !0;
                        if (P(o).attr("contenteditable")) return !0;
                        if (b.hasfocus || b.hasmousefocus && !E || b.ispage && !E && !L) {
                            var t = e.keyCode;
                            if (b.railslocked && 27 != t) return b.cancelEvent(e);
                            var r = e.ctrlKey || !1,
                                i = e.shiftKey || !1,
                                s = !1;
                            switch (t) {
                                case 38:
                                case 63233:
                                    b.doScrollBy(72), s = !0;
                                    break;
                                case 40:
                                case 63235:
                                    b.doScrollBy(-72), s = !0;
                                    break;
                                case 37:
                                case 63232:
                                    b.railh && (r ? b.doScrollLeft(0) : b.doScrollLeftBy(72), s = !0);
                                    break;
                                case 39:
                                case 63234:
                                    b.railh && (r ? b.doScrollLeft(b.page.maxw) : b.doScrollLeftBy(-72), s = !0);
                                    break;
                                case 33:
                                case 63276:
                                    b.doScrollBy(b.view.h), s = !0;
                                    break;
                                case 34:
                                case 63277:
                                    b.doScrollBy(-b.view.h), s = !0;
                                    break;
                                case 36:
                                case 63273:
                                    b.railh && r ? b.doScrollPos(0, 0) : b.doScrollTo(0), s = !0;
                                    break;
                                case 35:
                                case 63275:
                                    b.railh && r ? b.doScrollPos(b.page.maxw, b.page.maxh) : b.doScrollTo(b.page.maxh), s = !0;
                                    break;
                                case 32:
                                    x.spacebarenabled && (i ? b.doScrollBy(b.view.h) : b.doScrollBy(-b.view.h), s = !0);
                                    break;
                                case 27:
                                    b.zoomactive && (b.doZoom(), s = !0)
                            }
                            if (s) return b.cancelEvent(e)
                        }
                    }, x.enablekeyboard && b.bind(R, S.isopera && !S.isopera12 ? "keypress" : "keydown", b.onkeypress), b.bind(R, "keydown", function(e) {!e.ctrlKey && 1 || (b.wheelprevented = !0) }), b.bind(R, "keyup", function(e) { e.ctrlKey || !1 || (b.wheelprevented = !1) }), b.bind(_, "blur", function(e) { b.wheelprevented = !1 }), b.bind(_, "resize", b.onscreenresize), b.bind(_, "orientationchange", b.onscreenresize), b.bind(_, "load", b.lazyResize), S.ischrome && !b.ispage && !b.haswrapper) {
                    var p = b.win.attr("style"),
                        g = parseFloat(b.win.css("width")) + 1;
                    b.win.css("width", g), b.synched("chromefix", function() { b.win.attr("style", p) })
                }
                if (b.onAttributeChange = function(e) { b.lazyResize(b.isieold ? 250 : 30) }, x.enableobserver && (b.isie11 || !1 === B || (b.observerbody = new B(function(e) { if (e.forEach(function(e) { if ("attributes" == e.type) return y.hasClass("modal-open") && y.hasClass("modal-dialog") && !P.contains(P(".modal-dialog")[0], b.doc[0]) ? b.hide() : b.show() }), b.me.clientWidth != b.page.width || b.me.clientHeight != b.page.height) return b.lazyResize(30) }), b.observerbody.observe(R.body, { childList: !0, subtree: !0, characterData: !1, attributes: !0, attributeFilter: ["class"] })), !b.ispage && !b.haswrapper)) {
                    var v = b.win[0];
                    !1 !== B ? (b.observer = new B(function(e) { e.forEach(b.onAttributeChange) }), b.observer.observe(v, { childList: !0, characterData: !1, attributes: !0, subtree: !1 }), b.observerremover = new B(function(e) {
                        e.forEach(function(e) {
                            if (0 < e.removedNodes.length)
                                for (var o in e.removedNodes)
                                    if (b && e.removedNodes[o] === v) return b.remove()
                        })
                    }), b.observerremover.observe(v.parentNode, { childList: !0, characterData: !1, attributes: !1, subtree: !1 })) : (b.bind(v, S.isie && !S.isie9 ? "propertychange" : "DOMAttrModified", b.onAttributeChange), S.isie9 && v.attachEvent("onpropertychange", b.onAttributeChange), b.bind(v, "DOMNodeRemoved", function(e) { e.target === v && b.remove() }))
                }!b.ispage && x.boxzoom && b.bind(_, "resize", b.resizeZoom), b.istextarea && (b.bind(b.win, "keydown", b.lazyResize), b.bind(b.win, "mouseup", b.lazyResize)), b.lazyResize(30)
            }
            if ("IFRAME" == this.doc[0].nodeName) {
                var w = function() {
                    var o;
                    b.iframexd = !1;
                    try {
                        (o = "contentDocument" in this ? this.contentDocument : this.contentWindow._doc).domain
                    } catch (e) { o = !(b.iframexd = !0) }
                    if (b.iframexd) return "console" in _ && console.log("NiceScroll error: policy restriced iframe"), !0;
                    if (b.forcescreen = !0, b.isiframe && (b.iframe = { doc: P(o), html: b.doc.contents().find("html")[0], body: b.doc.contents().find("body")[0] }, b.getContentSize = function() { return { w: Math.max(b.iframe.html.scrollWidth, b.iframe.body.scrollWidth), h: Math.max(b.iframe.html.scrollHeight, b.iframe.body.scrollHeight) } }, b.docscroll = P(b.iframe.body)), !S.isios && x.iframeautoresize && !b.isiframe) {
                        b.win.scrollTop(0), b.doc.height("");
                        var e = Math.max(o.getElementsByTagName("html")[0].scrollHeight, o.body.scrollHeight);
                        b.doc.height(e)
                    }
                    b.lazyResize(30), b.css(P(b.iframe.body), t), S.isios && b.haswrapper && b.css(P(o.body), { "-webkit-transform": "translate3d(0,0,0)" }), "contentWindow" in this ? b.bind(this.contentWindow, "scroll", b.onscroll) : b.bind(o, "scroll", b.onscroll), x.enablemousewheel && b.mousewheel(o, b.onmousewheel), x.enablekeyboard && b.bind(o, S.isopera ? "keypress" : "keydown", b.onkeypress), S.cantouch ? (b.bind(o, "touchstart", b.ontouchstart), b.bind(o, "touchmove", b.ontouchmove)) : x.emulatetouch && (b.bind(o, "mousedown", b.ontouchstart), b.bind(o, "mousemove", function(e) { return b.ontouchmove(e, !0) }), x.grabcursorenabled && S.cursorgrabvalue && b.css(P(o.body), { cursor: S.cursorgrabvalue })), b.bind(o, "mouseup", b.ontouchend), b.zoom && (x.dblclickzoom && b.bind(o, "dblclick", b.doZoom), b.ongesturezoom && b.bind(o, "gestureend", b.ongesturezoom))
                };
                this.doc[0].readyState && "complete" === this.doc[0].readyState && setTimeout(function() { w.call(b.doc[0], !1) }, 500), b.bind(this.doc, "load", w)
            }
        }, this.showCursor = function(e, o) {
            if (b.cursortimeout && (clearTimeout(b.cursortimeout), b.cursortimeout = 0), b.rail) {
                if (b.autohidedom && (b.autohidedom.stop().css({ opacity: x.cursoropacitymax }), b.cursoractive = !0), b.rail.drag && 1 == b.rail.drag.pt || (void 0 !== e && !1 !== e && (b.scroll.y = e / b.scrollratio.y | 0), void 0 !== o && (b.scroll.x = o / b.scrollratio.x | 0)), b.cursor.css({ height: b.cursorheight, top: b.scroll.y }), b.cursorh) {
                    var t = b.hasreversehr ? b.scrollvaluemaxw - b.scroll.x : b.scroll.x;
                    b.cursorh.css({ width: b.cursorwidth, left: !b.rail.align && b.rail.visibility ? t + b.rail.width : t }), b.cursoractive = !0
                }
                b.zoom && b.zoom.stop().css({ opacity: x.cursoropacitymax })
            }
        }, this.hideCursor = function(e) { b.cursortimeout || b.rail && b.autohidedom && (b.hasmousefocus && "leave" === x.autohidemode || (b.cursortimeout = setTimeout(function() { b.rail.active && b.showonmouseevent || (b.autohidedom.stop().animate({ opacity: x.cursoropacitymin }), b.zoom && b.zoom.stop().animate({ opacity: x.cursoropacitymin }), b.cursoractive = !1), b.cursortimeout = 0 }, e || x.hidecursordelay))) }, this.noticeCursor = function(e, o, t) { b.showCursor(o, t), b.rail.active || b.hideCursor(e) }, this.getContentSize = b.ispage ? function() { return { w: Math.max(R.body.scrollWidth, R.documentElement.scrollWidth), h: Math.max(R.body.scrollHeight, R.documentElement.scrollHeight) } } : b.haswrapper ? function() { return { w: b.doc[0].offsetWidth, h: b.doc[0].offsetHeight } } : function() { return { w: b.docscroll[0].scrollWidth, h: b.docscroll[0].scrollHeight } }, this.onResize = function(e, o) {
            if (!b || !b.win) return !1;
            var t = b.page.maxh,
                r = b.page.maxw,
                i = b.view.h,
                s = b.view.w;
            if (b.view = { w: b.ispage ? b.win.width() : b.win[0].clientWidth, h: b.ispage ? b.win.height() : b.win[0].clientHeight }, b.page = o || b.getContentSize(), b.page.maxh = Math.max(0, b.page.h - b.view.h), b.page.maxw = Math.max(0, b.page.w - b.view.w), b.page.maxh == t && b.page.maxw == r && b.view.w == s && b.view.h == i) {
                if (b.ispage) return b;
                var n = b.win.offset();
                if (b.lastposition) { var l = b.lastposition; if (l.top == n.top && l.left == n.left) return b }
                b.lastposition = n
            }
            return 0 === b.page.maxh ? (b.hideRail(), b.scrollvaluemax = 0, b.scroll.y = 0, b.scrollratio.y = 0, b.cursorheight = 0, b.setScrollTop(0), b.rail && (b.rail.scrollable = !1)) : (b.page.maxh -= x.railpadding.top + x.railpadding.bottom, b.rail.scrollable = !0), 0 === b.page.maxw ? (b.hideRailHr(), b.scrollvaluemaxw = 0, b.scroll.x = 0, b.scrollratio.x = 0, b.cursorwidth = 0, b.setScrollLeft(0), b.railh && (b.railh.scrollable = !1)) : (b.page.maxw -= x.railpadding.left + x.railpadding.right, b.railh && (b.railh.scrollable = x.horizrailenabled)), b.railslocked = b.locked || 0 === b.page.maxh && 0 === b.page.maxw, b.railslocked ? (b.ispage || b.updateScrollBar(b.view), !1) : (b.hidden || (b.rail.visibility || b.showRail(), b.railh && !b.railh.visibility && b.showRailHr()), b.istextarea && b.win.css("resize") && "none" != b.win.css("resize") && (b.view.h -= 20), b.cursorheight = Math.min(b.view.h, Math.round(b.view.h * (b.view.h / b.page.h))), b.cursorheight = x.cursorfixedheight ? x.cursorfixedheight : Math.max(x.cursorminheight, b.cursorheight), b.cursorwidth = Math.min(b.view.w, Math.round(b.view.w * (b.view.w / b.page.w))), b.cursorwidth = x.cursorfixedheight ? x.cursorfixedheight : Math.max(x.cursorminheight, b.cursorwidth), b.scrollvaluemax = b.view.h - b.cursorheight - (x.railpadding.top + x.railpadding.bottom), b.hasborderbox || (b.scrollvaluemax -= b.cursor[0].offsetHeight - b.cursor[0].clientHeight), b.railh && (b.railh.width = 0 < b.page.maxh ? b.view.w - b.rail.width : b.view.w, b.scrollvaluemaxw = b.railh.width - b.cursorwidth - (x.railpadding.left + x.railpadding.right)), b.ispage || b.updateScrollBar(b.view), b.scrollratio = { x: b.page.maxw / b.scrollvaluemaxw, y: b.page.maxh / b.scrollvaluemax }, b.getScrollTop() > b.page.maxh ? b.doScrollTop(b.page.maxh) : (b.scroll.y = b.getScrollTop() / b.scrollratio.y | 0, b.scroll.x = b.getScrollLeft() / b.scrollratio.x | 0, b.cursoractive && b.noticeCursor()), b.scroll.y && 0 === b.getScrollTop() && b.doScrollTo(b.scroll.y * b.scrollratio.y | 0), b)
        }, this.resize = b.onResize;
        var c = 0;

        function u(t, r, i, e) { b._bind(t, r, function(e) { var o = { original: e = e || _.event, target: e.target || e.srcElement, type: "wheel", deltaMode: "MozMousePixelScroll" == e.type ? 0 : 1, deltaX: 0, deltaZ: 0, preventDefault: function() { return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1 }, stopImmediatePropagation: function() { e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.cancelBubble = !0 } }; return "mousewheel" == r ? (e.wheelDeltaX && (o.deltaX = -.025 * e.wheelDeltaX), e.wheelDeltaY && (o.deltaY = -.025 * e.wheelDeltaY), o.deltaY || o.deltaX || (o.deltaY = -.025 * e.wheelDelta)) : o.deltaY = e.detail, i.call(t, o) }, e) }
        this.onscreenresize = function(e) {
            clearTimeout(c);
            var o = !b.ispage && !b.haswrapper;
            o && b.hideRails(), c = setTimeout(function() { b && (o && b.showRails(), b.resize()), c = 0 }, 120)
        }, this.lazyResize = function(e) { return clearTimeout(c), e = isNaN(e) ? 240 : e, c = setTimeout(function() { b && b.resize(), c = 0 }, e), b }, this.jqbind = function(e, o, t) { b.events.push({ e: e, n: o, f: t, q: !0 }), P(e).on(o, t) };
        var h = !(this.mousewheel = function(e, o, t) {
            var r = "jquery" in e ? e[0] : e;
            if ("onwheel" in R.createElement("div")) b._bind(r, "wheel", o, t || !1);
            else {
                var i = void 0 !== R.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                u(r, i, o, t || !1), "DOMMouseScroll" == i && u(r, "MozMousePixelScroll", o, t || !1)
            }
        });
        if (S.haseventlistener) {
            try {
                var p = Object.defineProperty({}, "passive", { get: function() { h = !0 } });
                _.addEventListener("test", null, p)
            } catch (e) {}
            this.stopPropagation = function(e) { return e && (e = e.original ? e.original : e).stopPropagation(), !1 }, this.cancelEvent = function(e) { return e.cancelable && e.preventDefault(), e.stopImmediatePropagation(), e.preventManipulation && e.preventManipulation(), !1 }
        } else Event.prototype.preventDefault = function() { this.returnValue = !1 }, Event.prototype.stopPropagation = function() { this.cancelBubble = !0 }, _.constructor.prototype.addEventListener = R.constructor.prototype.addEventListener = Element.prototype.addEventListener = function(e, o, t) { this.attachEvent("on" + e, o) }, _.constructor.prototype.removeEventListener = R.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function(e, o, t) { this.detachEvent("on" + e, o) }, this.cancelEvent = function(e) { return (e = e || _.event) && (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1), !1 }, this.stopPropagation = function(e) { return (e = e || _.event) && (e.cancelBubble = !0), !1 };
        this.delegate = function(e, o, t, r, i) {
            var s = O[o] || !1;
            s || (s = {
                a: [],
                l: [],
                f: function(e) {
                    for (var o = s.l, t = !1, r = o.length - 1; 0 <= r; r--)
                        if (!1 === (t = o[r].call(e.target, e))) return !1;
                    return t
                }
            }, b.bind(e, o, s.f, r, i), O[o] = s), b.ispage ? (s.a = [b.id].concat(s.a), s.l = [t].concat(s.l)) : (s.a.push(b.id), s.l.push(t))
        }, this.undelegate = function(e, o, t, r, i) {
            var s = O[o] || !1;
            if (s && s.l)
                for (var n = 0, l = s.l.length; n < l; n++) s.a[n] === b.id && (s.a.splice(n), s.l.splice(n), 0 === s.a.length && (b._unbind(e, o, s.l.f), O[o] = null))
        }, this.bind = function(e, o, t, r, i) {
            var s = "jquery" in e ? e[0] : e;
            b._bind(s, o, t, r || !1, i || !1)
        }, this._bind = function(e, o, t, r, i) { b.events.push({ e: e, n: o, f: t, b: r, q: !1 }), h && (i || e == window.document || e == window.document.body || e == window) ? e.addEventListener(o, t, { passive: !1, capture: r }) : e.addEventListener(o, t, r || !1) }, this._unbind = function(e, o, t, r) { O[o] ? b.undelegate(e, o, t, r) : e.removeEventListener(o, t, r) }, this.unbindAll = function() {
            for (var e = 0; e < b.events.length; e++) {
                var o = b.events[e];
                o.q ? o.e.unbind(o.n, o.f) : b._unbind(o.e, o.n, o.f, o.b)
            }
        }, this.showRails = function() { return b.showRail().showRailHr() }, this.showRail = function() { return 0 === b.page.maxh || !b.ispage && "none" == b.win.css("display") || (b.rail.visibility = !0, b.rail.css("display", "block")), b }, this.showRailHr = function() { return b.railh && (0 === b.page.maxw || !b.ispage && "none" == b.win.css("display") || (b.railh.visibility = !0, b.railh.css("display", "block"))), b }, this.hideRails = function() { return b.hideRail().hideRailHr() }, this.hideRail = function() { return b.rail.visibility = !1, b.rail.css("display", "none"), b }, this.hideRailHr = function() { return b.railh && (b.railh.visibility = !1, b.railh.css("display", "none")), b }, this.show = function() { return b.hidden = !1, b.railslocked = !1, b.showRails() }, this.hide = function() { return b.hidden = !0, b.railslocked = !0, b.hideRails() }, this.toggle = function() { return b.hidden ? b.show() : b.hide() }, this.remove = function() {
            for (var e in b.stop(), b.cursortimeout && clearTimeout(b.cursortimeout), b.delaylist) b.delaylist[e] && H(b.delaylist[e].h);
            b.doZoomOut(), b.unbindAll(), S.isie9 && b.win[0].detachEvent("onpropertychange", b.onAttributeChange), !1 !== b.observer && b.observer.disconnect(), !1 !== b.observerremover && b.observerremover.disconnect(), !1 !== b.observerbody && b.observerbody.disconnect(), b.events = null, b.cursor && b.cursor.remove(), b.cursorh && b.cursorh.remove(), b.rail && b.rail.remove(), b.railh && b.railh.remove(), b.zoom && b.zoom.remove();
            for (var o = 0; o < b.saved.css.length; o++) {
                var t = b.saved.css[o];
                t[0].css(t[1], void 0 === t[2] ? "" : t[2])
            }
            b.saved = !1, b.me.data("__nicescroll", "");
            var r = P.nicescroll;
            for (var i in r.each(function(e) {
                    if (this && this.id === b.id) {
                        delete r[e];
                        for (var o = ++e; o < r.length; o++, e++) r[e] = r[o];
                        r.length--, r.length && delete r[r.length]
                    }
                }), b) b[i] = null, delete b[i];
            b = null
        }, this.scrollstart = function(e) { return this.onscrollstart = e, b }, this.scrollend = function(e) { return this.onscrollend = e, b }, this.scrollcancel = function(e) { return this.onscrollcancel = e, b }, this.zoomin = function(e) { return this.onzoomin = e, b }, this.zoomout = function(e) { return this.onzoomout = e, b }, this.isScrollable = function(e) {
            var o = e.target ? e.target : e;
            if ("OPTION" == o.nodeName) return !0;
            for (; o && 1 == o.nodeType && o !== this.me[0] && !/^BODY|HTML/.test(o.nodeName);) {
                var t = P(o),
                    r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
                o = !!o.parentNode && o.parentNode
            }
            return !1
        }, this.getViewport = function(e) {
            for (var o = !(!e || !e.parentNode) && e.parentNode; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
                var t = P(o);
                if (/fixed|absolute/.test(t.css("position"))) return t;
                var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight) return t;
                if (0 < t.getNiceScroll().length) return t;
                o = !!o.parentNode && o.parentNode
            }
            return !1
        }, this.triggerScrollStart = function(e, o, t, r, i) {
            if (b.onscrollstart) {
                var s = { type: "scrollstart", current: { x: e, y: o }, request: { x: t, y: r }, end: { x: b.newscrollx, y: b.newscrolly }, speed: i };
                b.onscrollstart.call(b, s)
            }
        }, this.triggerScrollEnd = function() {
            if (b.onscrollend) {
                var e = b.getScrollLeft(),
                    o = b.getScrollTop(),
                    t = { type: "scrollend", current: { x: e, y: o }, end: { x: e, y: o } };
                b.onscrollend.call(b, t)
            }
        };
        var m = 0,
            f = 0,
            g = 0,
            v = 1;

        function w(e, o, t, r) {
            b.scrollrunning || (b.newscrolly = b.getScrollTop(), b.newscrollx = b.getScrollLeft(), g = X());
            var i = X() - g;
            if (g = X(), 350 < i ? v = 1 : v += (2 - v) / 10, o = o * v | 0, e = e * v | 0) {
                if (r)
                    if (e < 0) { if (b.getScrollLeft() >= b.page.maxw) return !0 } else if (b.getScrollLeft() <= 0) return !0;
                var s = 0 < e ? 1 : -1;
                f !== s && (b.scrollmom && b.scrollmom.stop(), b.newscrollx = b.getScrollLeft(), f = s), b.lastdeltax -= e
            }
            if (o) {
                if (function() { var e = b.getScrollTop(); if (o < 0) { if (e >= b.page.maxh) return !0 } else if (e <= 0) return !0 }()) {
                    if (x.nativeparentscrolling && t && !b.ispage && !b.zoomactive) return !0;
                    var n = b.view.h >> 1;
                    o = b.newscrolly < -n ? (b.newscrolly = -n, -1) : b.newscrolly > b.page.maxh + n ? (b.newscrolly = b.page.maxh + n, 1) : 0
                }
                var l = 0 < o ? 1 : -1;
                m !== l && (b.scrollmom && b.scrollmom.stop(), b.newscrolly = b.getScrollTop(), m = l), b.lastdeltay -= o
            }(o || e) && b.synched("relativexy", function() {
                var e = b.lastdeltay + b.newscrolly;
                b.lastdeltay = 0;
                var o = b.lastdeltax + b.newscrollx;
                b.lastdeltax = 0, b.rail.drag || b.doScrollPos(o, e)
            })
        }
        var z = !1;

        function k(e, o, t) {
            var r, i;
            if (!t && z) return !0;
            0 === e.deltaMode ? (r = -e.deltaX * (x.mousescrollstep / 54) | 0, i = -e.deltaY * (x.mousescrollstep / 54) | 0) : 1 === e.deltaMode && (r = -e.deltaX * x.mousescrollstep * 50 / 80 | 0, i = -e.deltaY * x.mousescrollstep * 50 / 80 | 0), o && x.oneaxismousemode && 0 === r && i && (r = i, i = 0, !t || (r < 0 ? b.getScrollLeft() >= b.page.maxw : b.getScrollLeft() <= 0) && (i = r, r = 0));
            if (b.isrtlmode && (r = -r), !w(r, i, t, !0)) return z = !1, e.stopImmediatePropagation(), e.preventDefault();
            t && (z = !0)
        }
        if (this.onmousewheel = function(e) {
                if (b.wheelprevented || b.locked) return !1;
                if (b.railslocked) return b.debounced("checkunlock", b.resize, 250), !1;
                if (b.rail.drag) return b.cancelEvent(e);
                if ("auto" === x.oneaxismousemode && 0 !== e.deltaX && (x.oneaxismousemode = !1), x.oneaxismousemode && 0 === e.deltaX && !b.rail.scrollable) return !b.railh || !b.railh.scrollable || b.onmousewheelhr(e);
                var o = X(),
                    t = !1;
                if (x.preservenativescrolling && b.checkarea + 600 < o && (b.nativescrollingarea = b.isScrollable(e), t = !0), b.checkarea = o, b.nativescrollingarea) return !0;
                var r = k(e, !1, t);
                return r && (b.checkarea = 0), r
            }, this.onmousewheelhr = function(e) {
                if (!b.wheelprevented) {
                    if (b.railslocked || !b.railh.scrollable) return !0;
                    if (b.rail.drag) return b.cancelEvent(e);
                    var o = X(),
                        t = !1;
                    return x.preservenativescrolling && b.checkarea + 600 < o && (b.nativescrollingarea = b.isScrollable(e), t = !0), b.checkarea = o, !!b.nativescrollingarea || (b.railslocked ? b.cancelEvent(e) : k(e, !0, t))
                }
            }, this.stop = function() { return b.cancelScroll(), b.scrollmon && b.scrollmon.stop(), b.cursorfreezed = !1, b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), b.noticeCursor(), b }, this.getTransitionSpeed = function(e) { return 80 + e / 72 * x.scrollspeed | 0 }, x.smoothscroll)
            if (b.ishwscroll && S.hastransition && x.usetransition && x.smoothscroll) {
                var T = "";
                this.resetTransition = function() { T = "", b.doc.css(S.prefixstyle + "transition-duration", "0ms") }, this.prepareTransition = function(e, o) {
                    var t = o ? e : b.getTransitionSpeed(e),
                        r = t + "ms";
                    return T !== r && (T = r, b.doc.css(S.prefixstyle + "transition-duration", r)), t
                }, this.doScrollLeft = function(e, o) {
                    var t = b.scrollrunning ? b.newscrolly : b.getScrollTop();
                    b.doScrollPos(e, t, o)
                }, this.doScrollTop = function(e, o) {
                    var t = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
                    b.doScrollPos(t, e, o)
                }, this.cursorupdate = {
                    running: !1,
                    start: function() {
                        var e = this;
                        if (!e.running) {
                            e.running = !0;
                            var o = function() { e.running && Y(o), b.showCursor(b.getScrollTop(), b.getScrollLeft()), b.notifyScrollEvent(b.win[0]) };
                            Y(o)
                        }
                    },
                    stop: function() { this.running = !1 }
                }, this.doScrollPos = function(e, o, t) {
                    var r = b.getScrollTop(),
                        i = b.getScrollLeft();
                    if (((b.newscrolly - r) * (o - r) < 0 || (b.newscrollx - i) * (e - i) < 0) && b.cancelScroll(), x.bouncescroll ? (o < 0 ? o = o / 2 | 0 : o > b.page.maxh && (o = b.page.maxh + (o - b.page.maxh) / 2 | 0), e < 0 ? e = e / 2 | 0 : e > b.page.maxw && (e = b.page.maxw + (e - b.page.maxw) / 2 | 0)) : (o < 0 ? o = 0 : o > b.page.maxh && (o = b.page.maxh), e < 0 ? e = 0 : e > b.page.maxw && (e = b.page.maxw)), b.scrollrunning && e == b.newscrollx && o == b.newscrolly) return !1;
                    b.newscrolly = o, b.newscrollx = e;
                    var s = b.getScrollTop(),
                        n = b.getScrollLeft(),
                        l = {};
                    l.x = e - n, l.y = o - s;
                    var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
                        c = b.prepareTransition(a);
                    b.scrollrunning || (b.scrollrunning = !0, b.triggerScrollStart(n, s, e, o, c), b.cursorupdate.start()), b.scrollendtrapped = !0, S.transitionend || (b.scrollendtrapped && clearTimeout(b.scrollendtrapped), b.scrollendtrapped = setTimeout(b.onScrollTransitionEnd, c)), b.setScrollTop(b.newscrolly), b.setScrollLeft(b.newscrollx)
                }, this.cancelScroll = function() {
                    if (!b.scrollendtrapped) return !0;
                    var e = b.getScrollTop(),
                        o = b.getScrollLeft();
                    return b.scrollrunning = !1, S.transitionend || clearTimeout(S.transitionend), b.scrollendtrapped = !1, b.resetTransition(), b.setScrollTop(e), b.railh && b.setScrollLeft(o), b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm), b.timerscroll = !1, b.cursorfreezed = !1, b.cursorupdate.stop(), b.showCursor(e, o), b
                }, this.onScrollTransitionEnd = function() {
                    if (b.scrollendtrapped) {
                        var e = b.getScrollTop(),
                            o = b.getScrollLeft();
                        if (e < 0 ? e = 0 : e > b.page.maxh && (e = b.page.maxh), o < 0 ? o = 0 : o > b.page.maxw && (o = b.page.maxw), e != b.newscrolly || o != b.newscrollx) return b.doScrollPos(o, e, x.snapbackspeed);
                        b.scrollrunning && b.triggerScrollEnd(), b.scrollrunning = !1, b.scrollendtrapped = !1, b.resetTransition(), b.timerscroll = !1, b.setScrollTop(e), b.railh && b.setScrollLeft(o), b.cursorupdate.stop(), b.noticeCursor(!1, e, o), b.cursorfreezed = !1
                    }
                }
            } else this.doScrollLeft = function(e, o) {
                var t = b.scrollrunning ? b.newscrolly : b.getScrollTop();
                b.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = b.scrollrunning ? b.newscrollx : b.getScrollLeft();
                b.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                var r = b.getScrollTop(),
                    i = b.getScrollLeft();
                ((b.newscrolly - r) * (o - r) < 0 || (b.newscrollx - i) * (e - i) < 0) && b.cancelScroll();
                var s = !1;
                if (b.bouncescroll && b.rail.visibility || (o < 0 ? s = !(o = 0) : o > b.page.maxh && (o = b.page.maxh, s = !0)), b.bouncescroll && b.railh.visibility || (e < 0 ? s = !(e = 0) : e > b.page.maxw && (e = b.page.maxw, s = !0)), b.scrollrunning && b.newscrolly === o && b.newscrollx === e) return !0;
                b.newscrolly = o, b.newscrollx = e, b.dst = {}, b.dst.x = e - i, b.dst.y = o - r, b.dst.px = i, b.dst.py = r;
                var n = 0 | Math.sqrt(b.dst.x * b.dst.x + b.dst.y * b.dst.y),
                    l = b.getTransitionSpeed(n);
                b.bzscroll = {};
                var a = s ? 1 : .58;
                b.bzscroll.x = new d(i, b.newscrollx, l, 0, 0, a, 1), b.bzscroll.y = new d(r, b.newscrolly, l, 0, 0, a, 1);
                X();
                var c = function() {
                    if (b.scrollrunning) {
                        var e = b.bzscroll.y.getPos();
                        b.setScrollLeft(b.bzscroll.x.getNow()), b.setScrollTop(b.bzscroll.y.getNow()), e <= 1 ? b.timer = Y(c) : (b.scrollrunning = !1, b.timer = 0, b.triggerScrollEnd())
                    }
                };
                b.scrollrunning || (b.triggerScrollStart(i, r, e, o, l), b.scrollrunning = !0, b.timer = Y(c))
            }, this.cancelScroll = function() { return b.timer && H(b.timer), b.timer = 0, b.bzscroll = !1, b.scrollrunning = !1, b };
        else this.doScrollLeft = function(e, o) {
            var t = b.getScrollTop();
            b.doScrollPos(e, t, o)
        }, this.doScrollTop = function(e, o) {
            var t = b.getScrollLeft();
            b.doScrollPos(t, e, o)
        }, this.doScrollPos = function(e, o, t) {
            var r = e > b.page.maxw ? b.page.maxw : e;
            r < 0 && (r = 0);
            var i = o > b.page.maxh ? b.page.maxh : o;
            i < 0 && (i = 0), b.synched("scroll", function() { b.setScrollTop(i), b.setScrollLeft(r) })
        }, this.cancelScroll = function() {};
        this.doScrollBy = function(e, o) { w(0, e) }, this.doScrollLeftBy = function(e, o) { w(e, 0) }, this.doScrollTo = function(e, o) {
            var t = o ? Math.round(e * b.scrollratio.y) : e;
            t < 0 ? t = 0 : t > b.page.maxh && (t = b.page.maxh), b.cursorfreezed = !1, b.doScrollTop(e)
        }, this.checkContentSize = function() {
            var e = b.getContentSize();
            e.h == b.page.h && e.w == b.page.w || b.resize(!1, e)
        }, b.onscroll = function(e) { b.rail.drag || b.cursorfreezed || b.synched("scroll", function() { b.scroll.y = Math.round(b.getScrollTop() / b.scrollratio.y), b.railh && (b.scroll.x = Math.round(b.getScrollLeft() / b.scrollratio.x)), b.noticeCursor() }) }, b.bind(b.docscroll, "scroll", b.onscroll), this.doZoomIn = function(e) {
            if (!b.zoomactive) {
                b.zoomactive = !0, b.zoomrestore = { style: {} };
                var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
                    t = b.win[0].style;
                for (var r in o) {
                    var i = o[r];
                    b.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : ""
                }
                b.zoomrestore.style.width = b.win.css("width"), b.zoomrestore.style.height = b.win.css("height"), b.zoomrestore.padding = { w: b.win.outerWidth() - b.win.width(), h: b.win.outerHeight() - b.win.height() }, S.isios4 && (b.zoomrestore.scrollTop = I.scrollTop(), I.scrollTop(0)), b.win.css({ position: S.isios4 ? "absolute" : "fixed", top: 0, left: 0, zIndex: N + 100, margin: 0 });
                var s = b.win.css("backgroundColor");
                return "" !== s && !/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(s) || b.win.css("backgroundColor", "#fff"), b.rail.css({ zIndex: N + 101 }), b.zoom.css({ zIndex: N + 102 }), b.zoom.css("backgroundPosition", "0 -18px"), b.resizeZoom(), b.onzoomin && b.onzoomin.call(b), b.cancelEvent(e)
            }
        }, this.doZoomOut = function(e) { if (b.zoomactive) return b.zoomactive = !1, b.win.css("margin", ""), b.win.css(b.zoomrestore.style), S.isios4 && I.scrollTop(b.zoomrestore.scrollTop), b.rail.css({ "z-index": b.zindex }), b.zoom.css({ "z-index": b.zindex }), b.zoomrestore = !1, b.zoom.css("backgroundPosition", "0 0"), b.onResize(), b.onzoomout && b.onzoomout.call(b), b.cancelEvent(e) }, this.doZoom = function(e) { return b.zoomactive ? b.doZoomOut(e) : b.doZoomIn(e) }, this.resizeZoom = function() {
            if (b.zoomactive) {
                var e = b.getScrollTop();
                b.win.css({ width: I.width() - b.zoomrestore.padding.w + "px", height: I.height() - b.zoomrestore.padding.h + "px" }), b.onResize(), b.setScrollTop(Math.min(b.page.maxh, e))
            }
        }, this.init(), P.nicescroll.push(this)
    }
    var o, t, r, B = _.MutationObserver || _.WebKitMutationObserver || !1,
        X = Date.now || function() { return (new Date).getTime() },
        D = { zindex: "auto", cursoropacitymin: 0, cursoropacitymax: 1, cursorcolor: "#424242", cursorwidth: "6px", cursorborder: "1px solid #fff", cursorborderradius: "5px", scrollspeed: 40, mousescrollstep: 27, touchbehavior: !1, emulatetouch: !1, hwacceleration: !0, usetransition: !0, boxzoom: !1, dblclickzoom: !0, gesturezoom: !0, grabcursorenabled: !0, autohidemode: !0, background: "", iframeautoresize: !0, cursorminheight: 32, preservenativescrolling: !0, railoffset: !1, railhoffset: !1, bouncescroll: !0, spacebarenabled: !0, railpadding: { top: 0, right: 0, left: 0, bottom: 0 }, disableoutline: !0, horizrailenabled: !0, railalign: "right", railvalign: "bottom", enabletranslate3d: !0, enablemousewheel: !0, enablekeyboard: !0, smoothscroll: !0, sensitiverail: !0, enablemouselockapi: !0, cursorfixedheight: !1, directionlockdeadzone: 6, hidecursordelay: 400, nativeparentscrolling: !0, enablescrollonselection: !0, overflowx: !0, overflowy: !0, cursordragspeed: .3, rtlmode: "auto", cursordragontouch: !1, oneaxismousemode: "auto", scriptpath: (t = R.currentScript || !!(o = R.getElementsByTagName("script")).length && o[o.length - 1], r = t ? t.src.split("?")[0] : "", 0 < r.split("/").length ? r.split("/").slice(0, -1).join("/") + "/" : ""), preventmultitouchscrolling: !0, disablemutationobserver: !1, enableobserver: !0, scrollbarid: !1, scrollCLass: !1 },
        A = !1,
        q = function(e) {
            var f = this;
            this.nc = e, this.lastx = 0, this.lasty = 0, this.speedx = 0, this.speedy = 0, this.lasttime = 0, this.steptime = 0, this.snapx = !1, this.snapy = !1, this.demulx = 0, this.demuly = 0, this.lastscrollx = -1, this.lastscrolly = -1, this.chkx = 0, this.chky = 0, this.timer = 0, this.reset = function(e, o) { f.stop(), f.steptime = 0, f.lasttime = X(), f.speedx = 0, f.speedy = 0, f.lastx = e, f.lasty = o, f.lastscrollx = -1, f.lastscrolly = -1 }, this.update = function(e, o) {
                var t = X();
                f.steptime = t - f.lasttime, f.lasttime = t;
                var r = o - f.lasty,
                    i = e - f.lastx,
                    s = f.nc.getScrollTop() + r,
                    n = f.nc.getScrollLeft() + i;
                f.snapx = n < 0 || n > f.nc.page.maxw, f.snapy = s < 0 || s > f.nc.page.maxh, f.speedx = i, f.speedy = r, f.lastx = e, f.lasty = o
            }, this.stop = function() { f.nc.unsynched("domomentum2d"), f.timer && clearTimeout(f.timer), f.timer = 0, f.lastscrollx = -1, f.lastscrolly = -1 }, this.doSnapy = function(e, o) {
                var t = !1;
                o < 0 ? t = !(o = 0) : o > f.nc.page.maxh && (o = f.nc.page.maxh, t = !0), e < 0 ? t = !(e = 0) : e > f.nc.page.maxw && (e = f.nc.page.maxw, t = !0), t ? f.nc.doScrollPos(e, o, f.nc.opt.snapbackspeed) : f.nc.triggerScrollEnd()
            }, this.doMomentum = function(e) {
                var o = X(),
                    t = e ? o + e : f.lasttime,
                    r = f.nc.getScrollLeft(),
                    i = f.nc.getScrollTop(),
                    s = f.nc.page.maxh,
                    n = f.nc.page.maxw;
                f.speedx = 0 < n ? Math.min(60, f.speedx) : 0, f.speedy = 0 < s ? Math.min(60, f.speedy) : 0;
                var l = t && o - t <= 60;
                (i < 0 || s < i || r < 0 || n < r) && (l = !1);
                var a = !(!f.speedy || !l) && f.speedy,
                    c = !(!f.speedx || !l) && f.speedx;
                if (a || c) {
                    var d = Math.max(16, f.steptime);
                    if (50 < d) {
                        var u = d / 50;
                        f.speedx *= u, f.speedy *= u, d = 50
                    }
                    f.demulxy = 0, f.lastscrollx = f.nc.getScrollLeft(), f.chkx = f.lastscrollx, f.lastscrolly = f.nc.getScrollTop(), f.chky = f.lastscrolly;
                    var h = f.lastscrollx,
                        p = f.lastscrolly,
                        m = function() {
                            var e = 600 < X() - o ? .04 : .02;
                            f.speedx && (h = Math.floor(f.lastscrollx - f.speedx * (1 - f.demulxy)), ((f.lastscrollx = h) < 0 || n < h) && (e = .1)), f.speedy && (p = Math.floor(f.lastscrolly - f.speedy * (1 - f.demulxy)), ((f.lastscrolly = p) < 0 || s < p) && (e = .1)), f.demulxy = Math.min(1, f.demulxy + e), f.nc.synched("domomentum2d", function() {
                                if (f.speedx) {
                                    f.nc.getScrollLeft();
                                    f.chkx = h, f.nc.setScrollLeft(h)
                                }
                                if (f.speedy) {
                                    f.nc.getScrollTop();
                                    f.chky = p, f.nc.setScrollTop(p)
                                }
                                f.timer || (f.nc.hideCursor(), f.doSnapy(h, p))
                            }), f.demulxy < 1 ? f.timer = setTimeout(m, d) : (f.stop(), f.nc.hideCursor(), f.doSnapy(h, p))
                        };
                    m()
                } else f.doSnapy(f.nc.getScrollLeft(), f.nc.getScrollTop())
            }
        },
        i = e.fn.scrollTop;
    e.cssHooks.pageYOffset = { get: function(e, o, t) { var r = P.data(e, "__nicescroll") || !1; return r && r.ishwscroll ? r.getScrollTop() : i.call(e) }, set: function(e, o) { var t = P.data(e, "__nicescroll") || !1; return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : i.call(e, o), this } }, e.fn.scrollTop = function(o) {
        if (void 0 !== o) return this.each(function() {
            var e = P.data(this, "__nicescroll") || !1;
            e && e.ishwscroll ? e.setScrollTop(parseInt(o)) : i.call(P(this), o)
        });
        var e = this[0] && P.data(this[0], "__nicescroll") || !1;
        return e && e.ishwscroll ? e.getScrollTop() : i.call(this)
    };
    var n = e.fn.scrollLeft;
    P.cssHooks.pageXOffset = { get: function(e, o, t) { var r = P.data(e, "__nicescroll") || !1; return r && r.ishwscroll ? r.getScrollLeft() : n.call(e) }, set: function(e, o) { var t = P.data(e, "__nicescroll") || !1; return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : n.call(e, o), this } }, e.fn.scrollLeft = function(o) {
        if (void 0 !== o) return this.each(function() {
            var e = P.data(this, "__nicescroll") || !1;
            e && e.ishwscroll ? e.setScrollLeft(parseInt(o)) : n.call(P(this), o)
        });
        var e = this[0] && P.data(this[0], "__nicescroll") || !1;
        return e && e.ishwscroll ? e.getScrollLeft() : n.call(this)
    };

    function a(e) {
        var o = this;
        if (this.length = 0, this.name = "nicescrollarray", this.each = function(e) { return P.each(o, e), o }, this.push = function(e) { o[o.length] = e, o.length++ }, this.eq = function(e) { return o[e] }, e)
            for (var t = 0; t < e.length; t++) {
                var r = P.data(e[t], "__nicescroll") || !1;
                r && (this[this.length] = r, this.length++)
            }
        return this
    }! function(e, o, t) { for (var r = 0, i = o.length; r < i; r++) t(e, o[r]) }(a.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function(e, o) { e[o] = function() { var e = arguments; return this.each(function() { this[o].apply(this, e) }) } }), e.fn.getNiceScroll = function(e) { return void 0 === e ? new a(this) : this[e] && P.data(this[e], "__nicescroll") || !1 }, (e.expr.pseudos || e.expr[":"]).nicescroll = function(e) { return void 0 !== P.data(e, "__nicescroll") }, P.fn.niceScroll = function(i, s) {
        void 0 !== s || "object" != typeof i || "jquery" in i || (s = i, i = !1);
        var n = new a;
        return this.each(function() {
            var e = P(this),
                o = P.extend({}, s);
            if (i) {
                var t = P(i);
                o.doc = 1 < t.length ? P(i, e) : t, o.win = e
            }!("doc" in o) || "win" in o || (o.win = e);
            var r = e.data("__nicescroll") || !1;
            r || (o.doc = o.doc || e, r = new l(o, e), e.data("__nicescroll", r)), n.push(r)
        }), 1 === n.length ? n[0] : n
    }, _.NiceScroll = { getjQuery: function() { return e } }, P.nicescroll || (P.nicescroll = new a, P.nicescroll.options = D)
});