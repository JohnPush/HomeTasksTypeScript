"use strict";
/*
Написать на TypeScript реализацию Map в виде класса. То есть:
- Класс Map с методами: set, delete, get, clear
- Хранить данные в buckets, hash которых рассчитывать по какой логике
- Если hash одинаков, элементы backet связываются друг с другом
*/
class Map {
    constructor() {
        this.buckets = new RelatedList();
    }
    calculateHash(key) {
        return String(key).length;
    }
    set(key, value) {
        const hash = this.calculateHash(key);
        let bucketElement = this.buckets.find((element) => element.key === hash);
        if (!bucketElement) {
            bucketElement = new MapBucketElement(hash, new MapBucket());
            this.buckets.append(bucketElement);
        }
        bucketElement.value.set(key, value);
    }
    get(key) {
        const hash = this.calculateHash(key);
        const bucketElement = this.buckets.find((element) => element.key === hash);
        if (bucketElement) {
            return bucketElement.value.get(key);
        }
        return undefined;
    }
    delete(key) {
        const hash = this.calculateHash(key);
        const bucketElement = this.buckets.find((element) => element.key === hash);
        if (bucketElement) {
            bucketElement.value.delete(key);
        }
    }
    clear() {
        this.buckets = new RelatedList();
    }
}
class MapBucketElement {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
class MapBucket {
    constructor() {
        this.entries = new RelatedList();
    }
    set(key, value) {
        const entry = this.entries.find((e) => e.key === key);
        if (entry) {
            entry.value = value;
        }
        else {
            this.entries.append(new MapEntry(key, value));
        }
    }
    get(key) {
        const entry = this.entries.find((e) => e.key === key);
        return entry ? entry.value : undefined;
    }
    delete(key) {
        this.entries.remove((e) => e.key === key);
    }
}
class RelatedListElement {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
class RelatedList {
    constructor() {
        this.head = null;
    }
    append(value) {
        const newElement = new RelatedListElement(value);
        if (!this.head) {
            this.head = newElement;
        }
        else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newElement;
        }
    }
    find(predicate) {
        let current = this.head;
        while (current) {
            if (predicate(current.value)) {
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    }
    remove(predicate) {
        if (!this.head) {
            return;
        }
        if (predicate(this.head.value)) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next) {
            if (predicate(current.next.value)) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }
}
class MapEntry {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
const myMap = new Map();
myMap.set("London", 10);
myMap.set("Berlin", 25);
myMap.set("London", 20);
console.log(myMap.get("London"));
console.log(myMap.get("Berlin"));
myMap.delete("Berlin");
console.log(myMap.get("Berlin"));
myMap.clear();
console.log(myMap.get("London"));
