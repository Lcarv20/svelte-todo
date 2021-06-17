<script lang="ts">
	import { store } from "./../store";
	export let showModal: boolean;
	export let todosList: string;

	let newTodo = "insert new todo..";

	function completeTodo(todoIdx: number) {
		store.update((s) => {
			s[todosList].completeTodo(todoIdx);
			return s;
		});
	}

	function completeAll() {
		store.update((s) => {
			s[todosList].completeAll();
			return s;
		});
	}

	function addTodo() {
		store.update((s) => {
			s[todosList].addTodo(newTodo);
			return s;
		});
	}

	// $: {
	// 	console.log("List: ", todosList);
	// 	console.log("showModal: ", showModal);
	// }
</script>

<div class="w3-modal {(showModal && 'w3-show') || 'w3-hide'}">
	<div class="w3-modal-content">
		<span
			on:click={() => {
				showModal = false;
				todosList = "";
			}}
			class="w3-right">x</span
		>

		<h1>Your "{todosList}" TODO list</h1>

		<button on:click={completeAll}>Complete All</button>

		{#if todosList !== ""}
			<ul>
				<h3>Todos</h3>
				<li>
					<div
						class="add-todo w3-border w3-bar-left"
						contenteditable
						bind:innerHTML={newTodo}
					/>
					<button on:click={addTodo} class="w3-button">add</button>
				</li>
				{#each $store[todosList].notDone as todo, idx}
					<li on:click={() => completeTodo(idx)}>{todo}</li>
				{:else}
					<h3>You have no todos</h3>
				{/each}
			</ul>
			<hr />
			<ul>
				<h3>Completed TODOS</h3>
				{#each $store[todosList].done as completed}
					<li>{completed}</li>
				{:else}
					<h3>You didn't complete any todos</h3>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	ul {
		list-style: none;
		padding: 0;
	}
	.w3-modal-content {
		height: 80vh;
		overflow: scroll;
	}
	.add-todo {
		display: inline-block;
	}
</style>
