<script setup>
import { onMounted, ref } from "vue";
import PhotoModal from "../components/PhotoModal.vue";


const photos = ref([]);
const loading = ref(true);
const error = ref("");

const selectedPhoto = ref(null);

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

onMounted(async () => {
  const cached = localStorage.getItem("unsplashPhotos");

  if (cached) {
    photos.value = JSON.parse(cached);
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar fotos do Unsplash");
    }

    const data = await response.json();
    photos.value = data;

    localStorage.setItem("unsplashPhotos", JSON.stringify(data));
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const openModal = (photo) => {
  selectedPhoto.value = photo;
};

const closeModal = () => {
  selectedPhoto.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white px-4 py-8">
    <h2 class="text-3xl font-bold text-center mb-8">Feed de Fotos 📸</h2>

    <div v-if="loading" class="text-center text-gray-400 animate-pulse">
      Carregando...
    </div>
    <div v-else-if="error" class="text-red-400 text-center animate-pulse">
      {{ error }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="photo in photos"
        :key="photo.id"
        @click="openModal(photo)"
        class="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col h-[330px] w-full cursor-pointer hover:scale-[1.01] transition"
      >
        <img
          :src="photo.urls.small"
          :alt="photo.alt_description || 'Foto do Unsplash'"
          class="h-[250px] w-full object-cover"
        />
        <div class="p-2 text-center">
          <h3 class="text-xl text-gray-100">{{ photo.user.name }}</h3>
          <p class="text-sm text-[#f09433]/80 line-clamp-1">
            {{ photo.description || "Not Description" }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <PhotoModal
    v-if="selectedPhoto"
    :photo="selectedPhoto"
    :onClose="closeModal"
  />
</template>
