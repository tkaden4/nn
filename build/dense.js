"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dense = void 0;
var util_1 = require("./util");
exports.dense = {
    initialize: function () {
        return {
            weight: Math.random() - 0.5,
            bias: Math.random() - 0.5,
        };
    },
    forwards: function (_a, input) {
        var weight = _a.weight, bias = _a.bias;
        return (0, util_1.sigmoid)(weight * input + bias);
    },
    backwards: function (dense, input, activation, forwards_div, rate) {
        var sigdiv = activation * (1 - activation) * forwards_div;
        return {
            bias: dense.bias - rate * sigdiv,
            weight: dense.weight - rate * sigdiv * input,
        };
    },
};
