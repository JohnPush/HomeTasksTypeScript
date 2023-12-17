"use strict";
const obj = {
    a: 1,
    b: 2
};
const res = swapKeysAndValues(obj);
function swapKeysAndValues(obj) {
    const result = {};
    for (const key in obj) {
        result[obj[key]] = key;
    }
    return result;
}
console.log(res);
