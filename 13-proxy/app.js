"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class API {
    static getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://dummyjson.com/products/${id}`;
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        });
    }
}
class APIProxy {
    static getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (id < 10) {
                    return yield API.getProduct(id);
                }
                else {
                    throw new Error("Product ID is greater than or equal to 10");
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                else {
                    console.error("An unknown error occurred");
                }
                throw error;
            }
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = 1;
        const response = yield APIProxy.getProduct(productId);
        console.log(response);
    }
    catch (error) { }
}))();
