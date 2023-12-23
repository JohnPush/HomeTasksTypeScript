function allowFunc(validator: (value: number) => boolean) {
  return function (target: any, propertyKey: string) {
    let value: number = target[propertyKey];

    const getter = function () {
      return value;
    };

    const setter = function (newValue: number) {
      if (validator(newValue)) {
        value = newValue;
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

class User {
  @allowFunc((a: number) => a > 0) // раскоментировать // "experimentalDecorators": true в tsconfig.json
  age: number = 30;
}

const person = new User();
console.log(person.age);

person.age = 0;
console.log(person.age);

person.age = 20;
console.log(person.age);
