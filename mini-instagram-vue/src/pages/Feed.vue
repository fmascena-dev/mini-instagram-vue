<script setup>
import { onMounted, ref } from "vue";
import PhotoModal from "../components/PhotoModal.vue";

const photos = ref([]);
const defaultFeed = ref([]);
const loading = ref(true);
const error = ref("");
const selectedPhoto = ref(null);
const favorites = ref([]);

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const loadFavorites = () => {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
};

// Salvando Favoritos localmente
const saveFavorites = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};

// Verifica foto nos favoritos
const isFavorite = (photoId) => {
  return favorites.value.some(fav => fav.id === photoId);
};

const toogleFavorite = (photo, event) => {
  event.stopPropagation();

  const photoIndex = favorites.value.findIndex(fav => fav.id === photo.id);

  if (photoIndex > -1) {
    favorites.value.splice(photoIndex, 1);
  } else {
    favorites.value.push({
      id: photo.id,
      urls: photo.urls,
      alt_description: photo.alt_description,
      description: photo.description,
      user: photo.user,
      favoriteDate: new Date().toISOString(),
    });
  }

  saveFavorites();
};

const fetchPhotos = async () => {
  const cached = localStorage.getItem("unsplashPhotos");

  if (cached) {
    const cachedData = JSON.parse(cached);
    photos.value = cachedData.photos;
    defaultFeed.value = cachedData.photos;
    loading.value = false;
    return;
  }

  try {
    console.log("Usando key:", ACCESS_KEY);

    const response = await fetch(
      `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=20`
    );

    if (!response.ok) {
      throw new Error("Erro ao carregar fotos do Unsplash");
    }

    const data = await response.json();
    console.log("DATA:", data);
    photos.value = data;
    defaultFeed.value = data;

    localStorage.setItem("unsplashPhotos", JSON.stringify( data ));
  } catch (err) {
    error.value = err.message || "Erro ao carregar fotos";
  } finally {
    loading.value = false;
  }
};

const openModal = (photo) => {
  selectedPhoto.value = photo;
};

const closeModal = () => {
  selectedPhoto.value = null;
};

onMounted(() => {
  loadFavorites();
  fetchPhotos();
});
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white p-12">
    <h2 class="text-3xl font-bold text-center mb-12">Feed de Fotos 📸</h2>

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
        class="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col h-[330px] w-full cursor-pointer transition border border-[#f09433] hover:border-[#dc2743]"
      >
        <button
          @click="toogleFavorite(photo, $event)"
          class="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
          :class="{ '!opacity-100': isFavorite(photo.id) }"
          aria-label="Adicionar aos Favoritos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-colors duration-300"
            :class="{
              'text-red-500 fill-red-500': isFavorite(photo.id),
              'text-white hover:text-red-500': !isFavorite(photo.id),
            }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

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
    :is-favorite="isFavorite(selectedPhoto.id)"
    @onClose="closeModal"
    @toggle-favorite="toogleFavorite(selectedPhoto, $event)"
  />
</template>
