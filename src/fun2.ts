
import { pipe } from 'fp-ts/lib/pipeable';
import { Prepend, Reverse } from 'typescript-tuple'

const Tuple_ = {
  cons: <X, A extends Array<any>>(arg: X, args: A) => [arg, ...args] as Prepend<A, X>,
};

const prepend = <X>(arg: X) => <A extends Array<any>>(args: A): Prepend<A, X> => [arg, ...args] as Prepend<A, X>;

export function add<A extends Array<any>>(a: A): Prepend<A, string> {
  return Tuple_.cons('foo', a);
}

const four = pipe(
  [] as [],
  prepend('foo'),
  prepend('bar'),
  prepend<null>(null),
  prepend(123),
);

const reverse = <A extends Four>(a: Reverse<A>): A => a.reverse() as unknown as A;

const omgi: Reverse<typeof four> = reverse(four);
const omge: [string, string, null, number] = reverse(four);

type Four = Array<any>;

type Func<A extends Four, R> = (...a: A) => R;
type Flip = <A extends Four, R>(f: Func<A, R>) => (...a: Reverse<A>) => R;

const flip: Flip = <A extends Four, R>(fn: Func<A, R>) =>  (...args: Reverse<A>): R => fn(...reverse(args));

const foo = (a: string, b: string, c: null, d: number): void => console.log(a, b, c, d);

flip(foo)(1, null, 'bar', 'foo');
