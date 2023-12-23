"use strict";
function difference(obj1, obj2) {
    const result = Object.assign({}, obj1);
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            const typedKey = key;
            delete result[typedKey];
        }
    }
    return result;
}
let a = { a: 5, b: "" };
let b = { a: 10, c: true };
let v0 = difference(a, b);
console.log(v0);
