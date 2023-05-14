<script>
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import TodoItem from '$lib/componetns/TodoItem.svelte';
	import TodoItemSkeleton from '$lib/componetns/TodoItemSkeleton.svelte';
	import { onMount } from 'svelte';

	let tasks = [];
	let loadComplete = false;

	onMount(async () => {
		const q = query(collection(db, 'tugas'), where('isArchived', '==', true));
		const querySnapshot = await getDocs(q);
		tasks = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		loadComplete = true;
	});
</script>

<svelte:head>
  <title>Arhived</title>
</svelte:head>

<header class="flex justify-between items-center mb-16">
	<div>
		<h1 class="text-4xl font-bold mb-4">Arsip Tugas</h1>
		<p class="text-slate-600">Tugas-tugas yang sudah gak aktif.</p>
	</div>

	<a
		href="/task/new"
		class="inline-flex gap-2 bg-blue-600 text-white rounded-full font-medium px-4 py-2 items-center"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			<path
				fill-rule="evenodd"
				d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
				clip-rule="evenodd"
			/>
		</svg>
		Tugas Baru</a
	>
</header>

<div class="flex flex-col gap-4">
	{#each tasks as task}
		<TodoItem {task} />
	{:else}
		{#if loadComplete}
			<p>Empty Data</p>
		{:else}
			<TodoItemSkeleton />
		{/if}
	{/each}
</div>
