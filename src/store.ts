import { writable } from "svelte/store";

export class Tasks {
	notDone: string[] = [];
	done: string[] = [];

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

const test = new Tasks();

test.done = ["Study hard", "Read more"];
test.notDone = ["Read about micro frontend", "learn angular"];

store.set({
	"The test TODOS list": test,
});

export { store };
