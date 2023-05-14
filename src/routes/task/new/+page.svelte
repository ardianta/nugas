<script>
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "$lib/firebase";
  import { goto } from '$app/navigation';

  let isSubmitting = false;

  async function addTask(e){
    isSubmitting = true;
    const taskData = Object.fromEntries(new FormData(e.target));
    const docRef = await addDoc(collection(db, "tugas"), {
      ...taskData,
      isDone: false,
      isArchived: false
    });
    console.log("Document written with ID: ", docRef.id);
    isSubmitting = false;
    goto('/');
  }
</script>

<div class="bg-white p-8 rounded-xl shadow">
	<h1 class="text-3xl font-bold mb-4">Buat Tugas baru</h1>

  <form method="post" class="flex flex-col gap-4" on:submit|preventDefault={addTask}>
    <div class="flex flex-col gap-2">
      <label for="title" class="text-slate-600 text-sm">Judul Tugas</label>
      <input type="text" name="title" placeholder="Contoh: Tugas Pemrograman"
      class="border p-2 rounded w-full" required/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="deadline" class="text-slate-600 text-sm">Deadline</label>
      <input type="datetime-local" name="deadline" placeholder="Contoh: Tugas Pemrograman"
      class="border p-2 rounded w-full"/>
    </div>
    
    <div class="flex flex-col gap-2">
      <label for="description" class="text-slate-600 text-sm">Deskripsi</label>
      <textarea name="description" rows="5" placeholder="Isi dengan deskripsi tugas"
      class="border p-2 rounded w-full"/>
    </div>

    <div class="flex flex-col gap-2">
      <button 
        type="submit"
        disabled={isSubmitting}
        class="text-center bg-blue-600 disabled:bg-blue-600/50 text-white rounded-full font-medium px-4 py-2 items-center">
        {isSubmitting ? 'Menyimpan...': 'Simpan'}
      </button>
    </div>

  </form>
</div>
