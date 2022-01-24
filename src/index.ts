import { dense, DenseCell } from "./dense";
import { log } from "./util";

const cell = dense.initialize();

const data = [
  [0, 1],
  [0.4, 1],
  [0.1, 1],
  [0.8, 0],
  [1.1, 0],
  [1, 0],
  [10, 0],
  [20, 0],
] as [number, 0 | 1][];

for (let i = 1; i < 10; ++i) {
  data.push([100, 0]);
}

function train(
  cell: DenseCell,
  data: [number, 0 | 1][],
  learning_rate: number,
  callback: (loss: number, i: number) => boolean
) {
  const loss = (yhat: number, y: number) => {
    return -(y * log(yhat) + (1 - y) * log(1 - yhat));
  };

  const epoch = () => {
    let totalLoss = 0;
    for (const [input, actual] of data) {
      const predicted = dense.forwards(cell, input);
      const error = loss(predicted, actual);
      totalLoss += error / data.length;
      const ediv = predicted - actual;
      cell = dense.backwards(cell, input, predicted, ediv, learning_rate);
    }
    return totalLoss;
  };

  let currentLoss = epoch();
  let i = 0;
  while (!callback(currentLoss, i)) {
    ++i;
    currentLoss = epoch();
  }

  return cell;
}

const trained_cell = train(cell, data, 1, (loss, i) => {
  if (i % 10000 === 0) {
    console.log(`(${i}) Loss: `, loss);
  }
  if (isNaN(loss)) {
    return true;
  }
  return loss < 0.001;
});

for (const entry of data) {
  console.log({ input: entry[0], predicted: Math.round(dense.forwards(trained_cell, entry[0])), actual: entry[1] });
}
