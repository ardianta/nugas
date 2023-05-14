<script>
  import "../app.css";
  import Navbar from "$lib/componetns/Navbar.svelte";
</script>

<Navbar />

<div class="container mx-auto w-6/12 mt-16">
  <slot></slot>
</div>