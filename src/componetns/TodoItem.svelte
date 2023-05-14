<script>
	import { onMount } from 'svelte';
	import { doc, updateDoc } from 'firebase/firestore';
	import { db } from '../utils/firebase';

	export let task;

	let isDone = false;

	onMount(() => {
		if (task.isDone) {
			isDone = true;
		}
	});

	async function toggleDone() {
		isDone = !isDone;
		const taskRef = doc(db, 'tugas', task.id);
		// Set the "capital" field of the city 'DC'
		await updateDoc(taskRef, {
			isDone: isDone
		});
	}
</script>

<div class="bg-white rounded-xl p-6 flex justify-between items-center cursor-pointer shadow">
	<div class="inline-flex gap-2">
		<input type="checkbox" on:click={toggleDone} checked={isDone} />
		<p class="text-lg" class:line-through={isDone}>
			<a href="/task/{task.id}">
				{task.title}
			</a>
		</p>
	</div>
	<time class="rounded bg-slate-200 px-2">00:00:00</time>
</div>
