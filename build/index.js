"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dense_1 = require("./dense");
var util_1 = require("./util");
var cell = dense_1.dense.initialize();
var data = [
    [0, 1],
    [0.4, 1],
    [0.1, 1],
    [0.8, 0],
    [1.1, 0],
    [1, 0],
    [10, 0],
    [20, 0],
];
for (var i = 1; i < 10; ++i) {
    data.push([100, 0]);
}
function train(cell, data, learning_rate, callback) {
    var loss = function (yhat, y) {
        return -(y * (0, util_1.log)(yhat) + (1 - y) * (0, util_1.log)(1 - yhat));
    };
    var epoch = function () {
        var totalLoss = 0;
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var _a = data_2[_i], input = _a[0], actual = _a[1];
            var predicted = dense_1.dense.forwards(cell, input);
            var error = loss(predicted, actual);
            totalLoss += error / data.length;
            var ediv = predicted - actual;
            cell = dense_1.dense.backwards(cell, input, predicted, ediv, learning_rate);
        }
        return totalLoss;
    };
    var currentLoss = epoch();
    var i = 0;
    while (!callback(currentLoss, i)) {
        ++i;
        currentLoss = epoch();
    }
    return cell;
}
var trained_cell = train(cell, data, 1, function (loss, i) {
    if (i % 10000 === 0) {
        console.log("(".concat(i, ") Loss: "), loss);
    }
    if (isNaN(loss)) {
        return true;
    }
    return loss < 0.001;
});
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var entry = data_1[_i];
    console.log({ input: entry[0], predicted: Math.round(dense_1.dense.forwards(trained_cell, entry[0])), actual: entry[1] });
}
