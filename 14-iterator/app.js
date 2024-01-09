"use strict";
class ArrayObjects {
    constructor() {
        this.objects = [];
    }
    add(object) {
        this.objects.push(object);
    }
    createIterator(sortBy = 'id') {
        return new ObjectIterator(this, sortBy);
    }
    getObjects() {
        return this.objects;
    }
    resetSort() {
        this.objects = [...this.objects];
    }
}
class ObjectIterator {
    constructor(array, sortBy) {
        this.index = 0;
        this.array = array;
        this.sortBy = sortBy;
        this.sortObjects();
    }
    current() {
        return this.array.getObjects()[this.index];
    }
    next() {
        const currentObject = this.current();
        this.index++;
        return { value: currentObject };
    }
    hasNext() {
        return this.index < this.array.getObjects().length;
    }
    rewind() {
        this.index = 0;
    }
    sortObjects() {
        const sortBy = this.sortBy;
        this.array.getObjects().sort((a, b) => {
            if (sortBy === 'id') {
                return a.id - b.id;
            }
            else if (sortBy === 'date') {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            }
            else {
                throw new Error('Invalid sortBy parameter');
            }
        });
    }
    iterate() {
        this.rewind();
        const result = [];
        while (this.hasNext()) {
            result.push(this.next().value);
        }
        return result;
    }
}
// Тест:
const arrayObjects = new ArrayObjects();
arrayObjects.add({ id: 3, date: '01-02-2023', title: 'Object 3' });
arrayObjects.add({ id: 1, date: '03-03-2023', title: 'Object 1' });
arrayObjects.add({ id: 2, date: '02-01-2023', title: 'Object 2' });
const iteratorByDate = arrayObjects.createIterator('date');
console.log('Sorting by date:');
console.log(iteratorByDate.iterate());
arrayObjects.resetSort();
const iteratorById = arrayObjects.createIterator('id');
console.log('\nSorting by id:');
console.log(iteratorById.iterate());
