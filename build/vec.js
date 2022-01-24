"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec2 = exports.vec = void 0;
function vec(arr) {
    return {
        mul: function (c) {
            return vec(arr.map(function (x) { return x * c; }));
        },
        add: function (v) {
            if (v.dim !== this.dim) {
                throw new Error("".concat(v.dim, " != ").concat(this.dim));
            }
            return vec(this.elems.map(function (zi, i) { return zi + v.elems[i]; }));
        },
        elems: arr,
        dim: arr.length,
    };
}
exports.vec = vec;
function vec2() {
    var zs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        zs[_i] = arguments[_i];
    }
    return vec(zs);
}
exports.vec2 = vec2;
