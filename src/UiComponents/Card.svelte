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

	function delTodo(ev) {
		store.update((val) => {
			console.log("Deleted list:", val[ev.target.id]);
			delete val[ev.target.id];
			return val;
		});
	}
</script>

<div class="w3-card w3-border w3-border-teal w3-round w3-margin">
	<!-- Card Actions (mark all as completed/ delete list) -->
	<div class="w3-display-container w3-teal card-actions">
		<span
			class="w3-display-right w3-margin-right del-btn"
			id={listName}
			on:click={delTodo}>{"🗑 "}</span
		>
	</div>
	<div class="card-content" on:click={openTodos}>
		<h1 class="w3-center ">{listName}</h1>
		<span class="w3-margin">Todo:{$store[listName].notDone.length}</span>
		<span class="w3-margin">Completed:{$store[listName].done.length}</span>
	</div>
</div>
<TodosModal {...props} />

<style>
	.w3-card {
		min-width: 310px;
		height: 300px;
		display: inline-block;
		overflow: hidden;
	}

	h1 {
		margin: 0;
	}

	.card-content {
		cursor: var(--cursor);
		height: calc(100% - 10%);
	}

	.card-actions {
		height: 20%;
	}

	.del-btn {
		cursor: var(--cursor);
	}
</style>
