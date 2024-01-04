class ArrayObjects {
	private objects: ObjectItem[] = [];

	add(object: ObjectItem): void {
		this.objects.push(object);
	}

	createIterator(sortBy: 'id' | 'date' = 'id'): Iterator<ObjectItem> {
		return new ObjectIterator(this, sortBy);
	}

	getObjects(): ObjectItem[] {
		return this.objects;
	}

	resetSort(): void {
		this.objects = [...this.objects];
	}
}

interface ObjectItem {
	id: number;
	date: string;
	title: string;
}

interface Iterator<T> {
	current(): T;
	next(): IteratorResult<T>;
	hasNext(): boolean;
	rewind(): void;
	iterate(): T[];
}

class ObjectIterator implements Iterator<ObjectItem> {
	private array: ArrayObjects;
	private index: number = 0;
	private sortBy: 'id' | 'date';

	constructor(array: ArrayObjects, sortBy: 'id' | 'date') {
		this.array = array;
		this.sortBy = sortBy;
		this.sortObjects();
	}

	current(): ObjectItem {
		return this.array.getObjects()[this.index];
	}

	next(): IteratorResult<ObjectItem> {
		const currentObject = this.current();
		this.index++;
		return { value: currentObject };
	}

	hasNext(): boolean {
		return this.index < this.array.getObjects().length;
	}

	rewind(): void {
		this.index = 0;
	}

	private sortObjects(): void {
		const sortBy = this.sortBy;
		this.array.getObjects().sort((a, b) => {
			if (sortBy === 'id') {
				return a.id - b.id;
			} else if (sortBy === 'date') {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				return dateA.getTime() - dateB.getTime();
			} else {
				throw new Error('Invalid sortBy parameter');
			}
		});
	}

	iterate(): ObjectItem[] {
		this.rewind();
		const result: ObjectItem[] = [];
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
