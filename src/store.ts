import { writable } from "svelte/store";

export class Tasks {
	notDone: string[];
	done: string[];

	constructor(notDone: string[] = [], done: string[] = []) {
		this.notDone = notDone;
		this.done = done;
	}

	completeTodo(todoIdx: number) {
		this.done = [...this.done, this.notDone[todoIdx]];
		this.notDone = this.notDone.filter((_, idx) => idx !== todoIdx);
	}

	completeAll() {
		this.done = [...this.done, ...this.notDone];
		this.notDone = [];
	}

	addTodo(newTodo: string) {
		this.notDone = [...this.notDone, newTodo];
	}
}

const store = writable({});

export { store };
