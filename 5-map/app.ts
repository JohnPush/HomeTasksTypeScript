/*
Написать на TypeScript реализацию Map в виде класса. То есть:
- Класс Map с методами: set, delete, get, clear
- Хранить данные в buckets, hash которых рассчитывать по какой логике
- Если hash одинаков, элементы backet связываются друг с другом
*/


class Map {
    buckets: RelatedList;

    constructor() {
        this.buckets = new RelatedList();
    }

    private calculateHash(key: string): number {
        return String(key).length;
    }

    set(key: string, value: number): void {
        const hash = this.calculateHash(key);
        let bucketElement = this.buckets.find((element) => element.key === hash);

        if (!bucketElement) {
            bucketElement = new MapBucketElement(hash, new MapBucket());
            this.buckets.append(bucketElement);
        }

        bucketElement.value.set(key, value);
    }

    get(key: string): number | undefined {
        const hash = this.calculateHash(key);
        const bucketElement = this.buckets.find((element) => element.key === hash);

        if (bucketElement) {
            return bucketElement.value.get(key);
        }

        return undefined;
    }

    delete(key: string): void {
        const hash = this.calculateHash(key);
        const bucketElement = this.buckets.find((element) => element.key === hash);

        if (bucketElement) {
            bucketElement.value.delete(key);
        }
    }

    clear(): void {
        this.buckets = new RelatedList();
    }
}

class MapBucketElement {
    constructor(public key: number, public value: MapBucket, public next: MapBucketElement | null = null) {}
}

class MapBucket {
    private entries: RelatedList;

    constructor() {
        this.entries = new RelatedList();
    }

    set(key: string, value: number): void {
        const entry = this.entries.find((e) => e.key === key);

        if (entry) {
            entry.value = value;
        } else {
            this.entries.append(new MapEntry(key, value));
        }
    }

    get(key: string): number | undefined {
        const entry = this.entries.find((e) => e.key === key);

        return entry ? entry.value : undefined;
    }

    delete(key: string): void {
        this.entries.remove((e) => e.key === key);
    }
}

class RelatedListElement {
    constructor(public value: any, public next: RelatedListElement | null = null) {}
}

class RelatedList {
    private head: RelatedListElement | null = null;

    append(value: any): void {
        const newElement = new RelatedListElement(value);

        if (!this.head) {
            this.head = newElement;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newElement;
        }
    }

    find(predicate: (value: any) => boolean): any | undefined {
        let current = this.head;
        while (current) {
            if (predicate(current.value)) {
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    }

    remove(predicate: (value: any) => boolean): void {
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
    constructor(public key: string, public value: number) {}
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
