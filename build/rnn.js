"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rnn = void 0;
exports.rnn = {
    initialize: function () {
        return {
            hidden: Math.random() - 0.5,
            wh: Math.random() - 0.5,
            wx: Math.random() - 0.5,
            wy: Math.random() - 0.5,
            by: Math.random() - 0.5,
            ba: Math.random() - 0.5,
        };
    },
    forwards: function (rnn, input) {
        var hidden = rnn.hidden, wh = rnn.wh, wx = rnn.wx, wy = rnn.wy, by = rnn.by, ba = rnn.ba;
        var xa = wx * input;
        var hh = wh * hidden;
        var out_h = Math.tanh(ba + xa + hh);
        var out_y = by + wy * hidden;
        return {
            output: out_y,
            rnn: __assign(__assign({}, rnn), { hidden: out_h }),
        };
    },
    forwards_n: function (rnn, inputs) {
        var n = inputs.length;
        if (n === 0) {
            return [rnn, []];
        }
        else {
            var activation = this.forwards(rnn, inputs[0]);
            var _a = this.forwards_n(activation.rnn, inputs.slice(1)), final = _a[0], outputs = _a[1];
            return [final, __spreadArray([activation.output], outputs, true)];
        }
    },
    generate_n: function (rnn, inputs, n) {
        if (n === 0) {
            return [];
        }
        if (n < inputs.length) {
            throw new Error("Asked to generate ".concat(n, " outputs, but with ").concat(inputs.length, " inputs."));
        }
        else {
            var _a = this.forwards_n(rnn, inputs), newRNN = _a[0], outputs = _a[1];
            var last_output = outputs[outputs.length - 1];
            return __spreadArray(__spreadArray([], outputs, true), this.generate_n(newRNN, [last_output], n - inputs.length), true);
        }
    },
    backwards: function (rnn, inputs, outputs) {
        if (inputs.length !== outputs.length) {
            throw new Error("Inputs and outputs must have equal length");
        }
    },
};
