<script lang="ts">
	import { store } from "./../store";
	export let showModal: boolean;
	export let todosList: string;

	let newTodo = "";

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
		newTodo = "";
	}
</script>

{#if todosList}
	<div class="w3-modal {(showModal && 'w3-show') || 'w3-hide'}">
		<div class="w3-modal-content w3-round">
			<span
				on:click={() => {
					showModal = false;
					todosList = "";
				}}
				class="close-btn w3-right w3-margin-right w3-margin-top w3-text-red"
			>
				<i class="material-icons">close</i>
			</span>

			<h1 class="w3-padding">Your "{todosList}" TODO list</h1>

			<!-- Todos -->
			<div class="w3-half w3-border-right">
				<h3>Todos</h3>
				<span class="complete-all w3-right w3-text-teal" on:click={completeAll}
					>Complete All <i class="material-icons">check</i>
				</span>

				<ul class="w3-padding">
					<input
						type="text"
						class="w3-leftbar w3-center w3-input w3-margin-bottom"
						data-text="Add todo"
						bind:value={newTodo}
						placeholder="Insert todo here"
						on:keydown={(e) => {
							if (e.key === "Enter") {
								addTodo();
							}
						}}
					/>

					{#each $store[todosList].notDone as todo, idx}
						<li
							class="w3-border-bottom w3-padding w3-khaki"
							on:click={() => completeTodo(idx)}
						>
							{todo}
						</li>
					{:else}
						<h3>You have no todos</h3>
					{/each}
				</ul>
			</div>

			<!-- Completed TODOS -->
			<div class="w3-half">
				<h3>Completed TODOS</h3>
				<ul class="w3-padding">
					{#each $store[todosList].done as completed}
						<li class="w3-border-bottom w3-padding w3-pale-blue">
							{completed}
						</li>
					{:else}
						<h3>You didn't complete any todos</h3>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}

<style>
	.close-btn {
		position: sticky;
		top: 1rem;
		cursor: var(--cursor);
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	::-webkit-scrollbar-thumb {
		width: 15px;
		background: teal;
	}

	span.complete-all {
		font-size: 1rem;
		position: relative;
		top: -45px;
		cursor: var(--cursor);
	}

	ul {
		list-style: none;
	}

	.w3-modal-content {
		height: 80vh;
		overflow: auto;
	}

	span > i {
		vertical-align: text-bottom;
	}

	input:focus::placeholder {
		color: transparent;
	}
</style>
