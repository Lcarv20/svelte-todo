<script lang="ts">
	import { store, Tasks } from "./store";
	import TodosLists from "./Components/TodosLists.svelte";

	export let title: string;

	let todoListName: string;

	function createTodoList() {
		store.update((store) => {
			store[todoListName] = new Tasks();
			return store;
		});
		todoListName = "";
	}

	// $: {
	// 	console.log($store);
	// }
</script>

<main>
	<div class="w3-container w3-teal w3-padding-64">
		<h1 class="w3-center">{title}!</h1>

		<div class="w3-container w3-center">
			<input
				maxlength="30"
				name="list-name"
				class="w3-input td-lists-inpt w3-leftbar w3-border-bottom w3-border-white w3-teal"
				type="text"
				placeholder="list name..."
				bind:value={todoListName}
				on:keydown={(e) => e.key === "Enter" && createTodoList()}
			/>

			<button
				class="w3-button w3-round w3-margin w3-border w3-border-white w3-ripple w3-hover-white"
				on:click={createTodoList}>Create list {"🔥"}</button
			>
		</div>
	</div>
</main>
<TodosLists />

<style>
	.td-lists-inpt {
		max-width: 300px;
		display: inline-block;
	}
	.w3-button {
		cursor: var(--cursor);
	}
</style>
