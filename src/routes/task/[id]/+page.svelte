<script>
	import swal from 'sweetalert';
  import { page } from '$app/stores';
	import { doc, getDoc, deleteDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

  let task;

  onMount(async () => {
    const docSnap = await getDoc(doc(db, "tugas", $page.params.id));
    task = docSnap.data();
  });

	function confirmToDelete() {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this imaginary file!',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				await deleteDoc(doc(db, 'tugas', $page.params.id));
				swal('Tugas sudah dihapus!', {
					icon: 'success'
				}).then(() => {
					goto('/');
				});
			}
		});
	}
</script>

<header class="flex justify-between mb-4">
	<div>
		<button
			class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
			>Arhive</button
		>
		<button
			on:click={confirmToDelete}
			class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
			>Delete</button
		>
	</div>
  <button class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Mark as Complete</button>
</header>

<article class="bg-white p-8 rounded-xl shadow">
  {#if task}
	<h1 class="text-4xl font-bold mb-4">{task.title}</h1>
	<p class="text-slate-600">{task.description}</p>
  {:else}
    <p class="text-4xl font-bold mb-4 h-8 bg-slate-200 animate-pulse"></p>
    <p class="text-slate-600 h-4 mb-2 bg-slate-200 animate-pulse w-11/12"></p>
    <p class="text-slate-600 h-4 mb-2 bg-slate-200 animate-pulse w-96"></p>
    <p class="text-slate-600 h-4 mb-2 bg-slate-200 animate-pulse w-72"></p>
  {/if}
</article>
