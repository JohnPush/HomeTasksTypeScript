type KeysOfType<T, SelectedKeys extends keyof T> = {
  [K in SelectedKeys]: T[K];
};

function pickObjectKeys<T extends object, SelectedKeys extends keyof T>(
  obj: T,
  keys: SelectedKeys[]
): KeysOfType<T, SelectedKeys> {
  const result: KeysOfType<T, SelectedKeys> = {} as KeysOfType<T, SelectedKeys>; //почему не могу поставить 'satisfies' вместо 'as'

  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result;
}

const user = {
  name: "Vasilii",
  age: 20,
  skills: ["ts", "js"],
};

const res = pickObjectKeys(user, ["age", "skills"]);

console.log(res);
