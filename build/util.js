"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.sigmoid = exports.softmax = void 0;
function softmax(z) { }
exports.softmax = softmax;
function sigmoid(z) {
    var result = 1 / (1 + Math.exp(-z));
    return result;
}
exports.sigmoid = sigmoid;
function log(z) {
    var logResult = Math.log(z);
    return !isFinite(logResult) ? Math.sign(logResult) * Number.MAX_VALUE : logResult;
}
exports.log = log;
