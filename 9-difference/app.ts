type Difference<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

function difference<T extends object, U extends object>(
  obj1: T,
  obj2: U
): Difference<T, U> {
  const result: Partial<T> = { ...obj1 };

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      const typedKey = key as unknown as keyof T;
      delete result[typedKey];
    }
  }

  return result as Difference<T, U>;
}

let a: IA = { a: 5, b: "" };
let b: IB = { a: 10, c: true };

let v0: Difference<IA, IB> = difference(a, b);

console.log(v0);
