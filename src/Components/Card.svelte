<script lang="ts">
	import { store } from "./../store";

	import TodosModal from "./TodosModal.svelte";

	export let props = {
		showModal: false,
		todosList: "",
	};

	export let listName: string;

	function openTodos() {
		props.showModal = true;
		props.todosList = listName;
	}

	function delTodo(list: string) {
		store.update((val) => {
			console.log("Deleted list:", list);
			delete val[list];
			return val;
		});
	}
</script>

<div class="w3-card w3-border w3-border-teal w3-round w3-margin">
	<!-- Card Actions (mark all as completed/ delete list) -->
	<div class="delBtn-wrapper w3-display-container w3-teal card-actions">
		<span
			class="w3-display-right w3-margin-right"
			on:click={() => {
				delTodo(listName);
			}}
		>
			<i class="material-icons w3-text-deep-orange">delete</i>
		</span>
	</div>
	<div class="card-content w3-display-container" on:click={openTodos}>
		<h1 class="w3-display-topmiddle w3-center w3-padding">{listName}</h1>
		<span class="w3-display-bottomleft todo-data w3-margin"
			>Todo:{$store[listName].notDone.length}</span
		>
		<span class="todo-data w3-margin w3-display-bottomright"
			>Completed:{$store[listName].done.length}</span
		>
	</div>
</div>
<TodosModal {...props} />

<style>
	.w3-card {
		min-width: 310px;
		max-width: 370px;
		height: 200px;
		display: inline-block;
		overflow: hidden;
	}

	h1 {
		width: 100%;
		margin: 0;
		word-wrap: break-word;
	}

	.card-content {
		cursor: var(--cursor);
		height: calc(100% - 20%);
	}

	.card-actions {
		height: 20%;
	}

	.todo-data {
		margin-top: auto;
	}

	.delBtn-wrapper {
		cursor: var(--cursor);
		font-size: 2rem;
	}
</style>
