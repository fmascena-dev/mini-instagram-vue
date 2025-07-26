<script setup>
import { onMounted, ref } from "vue";

const photos = ref([]);
const loading = ref(true);
const error = ref("");

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

onMounted(async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
    );
    const data = await responde.json();
    photos.value = data;
  } catch (err) {
    error.value = "Erro ao carregar as fotos 😢";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h2>Feed de Fotos 📸</h2>

    <div>
      <div>
        <img src="" alt="" />
        <div></div>
      </div>
    </div>
  </div>
</template>
