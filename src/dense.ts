import { sigmoid } from "./util";

export interface DenseCell {
  weight: number;
  bias: number;
}

export const dense = {
  initialize(): DenseCell {
    return {
      weight: Math.random() - 0.5,
      bias: Math.random() - 0.5,
    };
  },
  forwards({ weight, bias }: DenseCell, input: number): number {
    return sigmoid(weight * input + bias);
  },
  backwards(dense: DenseCell, input: number, activation: number, forwards_div: number, rate: number): DenseCell {
    const sigdiv = activation * (1 - activation) * forwards_div;
    return {
      bias: dense.bias - rate * sigdiv,
      weight: dense.weight - rate * sigdiv * input,
    };
  },
};
