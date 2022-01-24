export interface RNNCell {
  hidden: number;
  wh: number;
  wx: number;
  wy: number;
  by: number;
  ba: number;
}

export const rnn = {
  initialize(): RNNCell {
    return {
      hidden: Math.random() - 0.5,
      wh: Math.random() - 0.5,
      wx: Math.random() - 0.5,
      wy: Math.random() - 0.5,
      by: Math.random() - 0.5,
      ba: Math.random() - 0.5,
    };
  },
  forwards(rnn: RNNCell, input: number) {
    const { hidden, wh, wx, wy, by, ba } = rnn;
    const xa = wx * input;
    const hh = wh * hidden;
    const out_h = Math.tanh(ba + xa + hh);
    const out_y = by + wy * hidden;

    return {
      output: out_y,
      rnn: {
        ...rnn,
        hidden: out_h,
      },
    };
  },
  forwards_n(rnn: RNNCell, inputs: number[]): [RNNCell, number[]] {
    const n = inputs.length;
    if (n === 0) {
      return [rnn, []];
    } else {
      const activation = this.forwards(rnn, inputs[0]);
      const [final, outputs] = this.forwards_n(activation.rnn, inputs.slice(1));
      return [final, [activation.output, ...outputs]];
    }
  },
  generate_n(rnn: RNNCell, inputs: number[], n: number): number[] {
    if (n === 0) {
      return [];
    }
    if (n < inputs.length) {
      throw new Error(`Asked to generate ${n} outputs, but with ${inputs.length} inputs.`);
    } else {
      const [newRNN, outputs] = this.forwards_n(rnn, inputs);
      const last_output = outputs[outputs.length - 1];
      return [...outputs, ...this.generate_n(newRNN, [last_output], n - inputs.length)];
    }
  },
  backwards(rnn: RNNCell, inputs: number[], outputs: number[]) {
    if (inputs.length !== outputs.length) {
      throw new Error(`Inputs and outputs must have equal length`);
    }
  },
};
