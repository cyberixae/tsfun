import * as Record_ from "fp-ts/lib/Record";

type Process = <
  I extends keyof D & keyof P & string,
  D extends Record<I, any>,
  P extends Record<I, (x: D[I]) => any>
>(
  d: D,
  p: P
) => Record<I, ReturnType<P[I]>>;

const process: Process = (inputs, processors) =>
  Record_.mapWithIndex((key, input) => processors[key](input))(inputs);

const result = process(
  { foo: 123, bar: "a b" },
  { foo: (x: number) => 2 * x, bar: (x: string) => x.split(" ") }
);

// { foo: 246, bar: ['a', 'b'] }
