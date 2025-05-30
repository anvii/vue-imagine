import { defineComponent as O, mergeModels as F, useModel as Y, computed as K, ref as z, watch as S, createElementBlock as Z, openBlock as C, withModifiers as y, normalizeStyle as W, createElementVNode as P, renderSlot as R, unref as L, onMounted as Q, onUnmounted as ee } from "vue";
const te = /* @__PURE__ */ O({
  __name: "ImageZoomer",
  props: /* @__PURE__ */ F({
    minZoom: { default: 0.1 },
    maxZoom: { default: 10 },
    zoomFactor: { default: 1.1 },
    transition: { default: "none" }
  }, {
    zoom: { default: 1 },
    zoomModifiers: {},
    scrollX: { default: 0 },
    scrollXModifiers: {},
    scrollY: { default: 0 },
    scrollYModifiers: {}
  }),
  emits: ["update:zoom", "update:scrollX", "update:scrollY"],
  setup(s, { expose: M }) {
    const a = Y(s, "zoom"), u = Y(s, "scrollX"), l = Y(s, "scrollY"), n = K(() => {
      const e = x.value.children[0], { cw: t, ch: o } = { cw: e.offsetWidth * a.value, ch: e.offsetHeight * a.value }, { rw: f, rh: r } = { rw: d.value.clientWidth, rh: d.value.clientHeight }, p = {
        left: Math.min(t - f, 0),
        top: Math.min(o - r, 0),
        right: Math.max(t - f, 0),
        bottom: Math.max(o - r, 0)
      };
      return t < f && (p.left = p.right = (t - f) / 2), o < r && (p.top = p.bottom = (o - r) / 2), p;
    }), d = z({}), x = z({});
    let b = !1, T = !1;
    const c = {}, h = {};
    S(a, (e) => {
      D(e), $(u.value), w(l.value);
    }), S(u, (e) => {
      $(e);
    }), S(l, (e) => {
      w(e);
    });
    function v(e, t, o) {
      return Math.max(Math.min(e, o), t);
    }
    function $(e) {
      u.value = v(e, n.value.left, n.value.right);
    }
    function w(e) {
      l.value = v(e, n.value.top, n.value.bottom);
    }
    function D(e) {
      a.value = v(e, s.minZoom, s.maxZoom);
    }
    function k(e, t) {
      const o = d.value.getBoundingClientRect();
      return {
        x: e - Math.round(o.left),
        y: t - Math.round(o.top)
      };
    }
    function X(e, t, o) {
      return o ?? (o = a.value), {
        x: (e + u.value) / o,
        y: (t + l.value) / o
      };
    }
    function I(e, t, o) {
      return o ?? (o = a.value), {
        x: e * o - u.value,
        y: t * o - l.value
      };
    }
    function i(e, t) {
      g(a.value * s.zoomFactor, e, t);
    }
    function m(e, t) {
      g(a.value / s.zoomFactor, e, t);
    }
    function g(e, t, o) {
      t ?? (t = d.value.clientWidth / 2), o ?? (o = d.value.clientHeight / 2), e = v(e, s.minZoom, s.maxZoom);
      const f = X(t, o), r = I(f.x, f.y, e);
      a.value = e, u.value -= t - r.x, l.value -= o - r.y;
    }
    function A(e) {
      b && (u.value = v(u.value - e.movementX, n.value.left, n.value.right), l.value = v(l.value - e.movementY, n.value.top, n.value.bottom), T = !0);
    }
    function B(e) {
      b = e;
    }
    function _(e) {
      T && (T = !1, e.stopPropagation());
    }
    function N(e) {
      const { x: t, y: o } = k(e.clientX, e.clientY);
      e.deltaY < 0 ? i(t, o) : e.deltaY > 0 && m(t, o);
    }
    function U(e) {
      for (const t of e.changedTouches) {
        const { identifier: o, clientX: f, clientY: r } = t;
        c[o] = k(f, r), h[o] = { ...c[o] };
      }
    }
    function E(e) {
      for (const t of e.changedTouches)
        delete c[t.identifier], delete h[t.identifier];
    }
    function G(e) {
      for (const t of e.changedTouches) {
        const { identifier: o, clientX: f, clientY: r } = t;
        c[o] = k(f, r);
      }
      {
        const t = parseInt(Object.keys(c)[0]), o = c[t].x - h[t].x, f = c[t].y - h[t].y;
        u.value -= o, l.value -= f;
      }
      if (Object.keys(c).length == 2) {
        const t = parseInt(Object.keys(c)[0]), o = parseInt(Object.keys(c)[1]), f = j(h[t], h[o]), r = j(c[t], c[o]), p = c[t].x, H = c[t].y;
        g(a.value * r / f, p, H);
      }
      for (const t in c)
        h[t] = { ...c[t] };
    }
    function j(e, t) {
      return Math.hypot(e.x - t.x, e.y - t.y);
    }
    function J(e) {
      const t = x.value.children[0], o = d.value.clientWidth / t.offsetWidth, f = d.value.clientHeight / t.offsetHeight;
      let r = a.value;
      if (e == "contain")
        r = Math.min(o, f);
      else if (e == "cover")
        r = Math.max(o, f);
      else {
        console.error("Invalid fit mode. Possible modes are: contain, cover");
        return;
      }
      a.value = r;
      const p = (d.value.clientWidth - t.offsetWidth * r) / 2, H = (d.value.clientHeight - t.offsetHeight * r) / 2;
      u.value = v(-p, n.value.left, n.value.right), l.value = v(-H, n.value.top, n.value.bottom);
    }
    return M({
      zoomIn: i,
      zoomOut: m,
      toClient: k,
      scale: X,
      unscale: I,
      fit: J
    }), (e, t) => (C(), Z("div", {
      ref_key: "root",
      ref: d,
      class: "__image-zoom",
      style: W(`--sx: ${u.value}px; --sy: ${l.value}px; --zoom: ${a.value};`),
      onDragstart: y((o) => !1, ["prevent"]),
      onMousedown: t[0] || (t[0] = y((o) => B(!0), ["left"])),
      onMouseup: t[1] || (t[1] = y((o) => B(!1), ["left"])),
      onMouseleave: t[2] || (t[2] = (o) => B(!1)),
      onMousemove: A,
      onWheel: y(N, ["prevent"]),
      onClick: _,
      onTouchstart: U,
      onTouchend: E,
      onTouchcancel: E,
      onTouchmove: G
    }, [
      P("div", {
        ref_key: "inner",
        ref: x,
        class: "__image-zoom-inner",
        style: W(`transition: ${e.transition};`)
      }, [
        R(e.$slots, "default", {}, void 0, !0)
      ], 4)
    ], 36));
  }
}), q = (s, M) => {
  const a = s.__vccOpts || s;
  for (const [u, l] of M)
    a[u] = l;
  return a;
}, le = /* @__PURE__ */ q(te, [["__scopeId", "data-v-7fd3b0ca"]]), V = 0.3, oe = /* @__PURE__ */ O({
  __name: "ImageSlider",
  props: /* @__PURE__ */ F({
    disabled: { type: Boolean, default: !1 },
    transition: { default: "none" }
  }, {
    modelValue: { default: 0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s, { expose: M }) {
    const a = z(), u = z(), l = Y(s, "modelValue"), n = z(0);
    let d = !1, x = !1, b = 0;
    S(l, (i) => {
      l.value = T(i, 0, u.value.childElementCount - 1), n.value = 0;
    });
    function T(i, m, g) {
      return Math.max(Math.min(i, g), m);
    }
    function c() {
      s.disabled || l.value++;
    }
    function h() {
      s.disabled || l.value--;
    }
    function v() {
      const i = a.value.clientWidth;
      n.value >= i * V ? h() : n.value <= -i * V && c(), n.value = 0;
    }
    function $(i) {
      d = i, i || v();
    }
    function w(i) {
      d && !s.disabled && (n.value += i.movementX, x = !0);
    }
    function D(i) {
      x && (i.stopPropagation(), x = !1);
    }
    function k(i) {
      b = i.touches[0].clientX, d = !0;
    }
    function X() {
      v(), b = 0, d = !1;
    }
    function I(i) {
      s.disabled || (n.value = i.touches[0].clientX - b);
    }
    return M({
      next: c,
      prev: h
    }), (i, m) => (C(), Z("div", {
      ref_key: "root",
      ref: a,
      class: "__image-slider",
      style: W(`--slide-index: ${l.value}; --slide-scroll: ${n.value}px;`),
      onMousedown: m[0] || (m[0] = y((g) => $(!0), ["left"])),
      onMouseup: m[1] || (m[1] = y((g) => $(!1), ["left"])),
      onMouseleave: m[2] || (m[2] = (g) => $(!1)),
      onMousemove: w,
      onClick: D,
      onTouchstart: k,
      onTouchmove: I,
      onTouchend: X,
      onTouchcancel: X,
      onDragstart: y((g) => !1, ["prevent"])
    }, [
      P("div", {
        ref_key: "container",
        ref: u,
        class: "__container",
        style: W(`transition: ${L(d) ? "none" : i.transition};`)
      }, [
        R(i.$slots, "default", {}, void 0, !0)
      ], 4)
    ], 36));
  }
}), ie = /* @__PURE__ */ q(oe, [["__scopeId", "data-v-c5fa25b5"]]), ae = /* @__PURE__ */ O({
  __name: "AdaptiveDiv",
  emits: ["update:width", "update:height", "update:square"],
  setup(s, { emit: M }) {
    const a = z();
    let u;
    const l = M;
    return Q(() => {
      u = new ResizeObserver(([n]) => {
        l("update:width", n.contentRect.width), l("update:height", n.contentRect.height), l("update:square", n.contentRect.width * n.contentRect.height);
      }), u.observe(a.value, { box: "device-pixel-content-box" });
    }), ee(() => {
      u.disconnect();
    }), (n, d) => (C(), Z("div", {
      ref_key: "root",
      ref: a,
      class: "__adaptive-div"
    }, [
      R(n.$slots, "default")
    ], 512));
  }
});
export {
  ae as AdaptiveDiv,
  ie as ImageSlider,
  le as ImageZoomer
};
