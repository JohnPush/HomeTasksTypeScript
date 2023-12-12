const obj: Record<string, number> = {
	a: 1,
	b: 2
}

const res = swapKeysAndValues(obj);

function swapKeysAndValues(obj: Record<string, number>): Record<number, string> {
  const result: Record<number, string> = {};

  for (const key in obj) {
    result[obj[key]] = key;
  }

  return result;
}

console.log(res);