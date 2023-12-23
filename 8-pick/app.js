"use strict";
function pickObjectKeys(obj, keys) {
    const result = {};
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
