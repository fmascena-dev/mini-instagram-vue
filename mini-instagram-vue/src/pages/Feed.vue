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
    const data = await response.json();
    photos.value = data;
  } catch (err) {
    error.value = "Erro ao carregar as fotos 😢";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white px-4 py-8">
    <h2 class="text-3xl font-bold text-center mb-8">Feed de Fotos 📸</h2>

    <div v-if="loading" class="text-center text-gray-400 animate-pulse">Carregando...</div>
    <div v-else-if="error" class="text-red-400 text-center animate-pulse">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="photo in photos" :key="photo.id" class="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <img :src="photo.urls.small" :alt="photo.alt_description || 'Foto do Unsplash'" class="w-full object-cover" />
        <div class="p-2 text-sm text-gray-300">{{ photo.user.name }}</div>
      </div>
    </div>
  </div>
</template>
