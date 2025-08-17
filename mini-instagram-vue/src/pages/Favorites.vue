<script setup>
import { onMounted, ref } from "vue";
import PhotoModal from "../components/PhotoModal.vue";

const favorites = ref([]);
const selectedPhoto = ref(null);

// Carrega favoritos do localStorage
const loadFavorites = () => {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
    // Ordena por data de favorito (mais recente primeiro)
    favorites.value.sort(
      (a, b) => new Date(b.favoriteDate) - new Date(a.favoriteDate)
    );
  }
};

// Remove dos favoritos
const removeFavorite = (photoId, event) => {
  event.stopPropagation();
  const photoIndex = favorites.value.findIndex((fav) => fav.id === photoId);
  if (photoIndex > -1) {
    favorites.value.splice(photoIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }
};

// Limpa todos os favoritos
const clearAllFavorites = () => {
  if (confirm("Tem certeza que deseja remover todas as fotos dos favoritos?")) {
    favorites.value = [];
    localStorage.removeItem("favorites");
  }
};

const openModal = (photo) => {
  selectedPhoto.value = photo;
};

const closeModal = () => {
  selectedPhoto.value = null;
};

// Formata a data de quando foi favoritado
const formatFavoriteDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(loadFavorites);
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white p-8">
    <!-- Header da página -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Meus Favoritos ❤️</h1>

      <button
        v-if="favorites.length > 0"
        @click="clearAllFavorites"
        class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium"
      >
        Limpar Todos
      </button>
    </div>

    <!-- Estado vazio -->
    <div v-if="favorites.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">💔</div>
      <h2 class="text-2xl font-bold text-gray-400 mb-2">
        Nenhum favorito ainda
      </h2>
      <p class="text-gray-500 mb-6">
        Explore o feed e clique no coração para adicionar fotos aos seus
        favoritos!
      </p>
      <RouterLink
        to="/feed"
        class="inline-block px-6 py-3 bg-[#dc2743] hover:bg-[#bc1888] rounded-lg transition-colors font-medium"
      >
        Ir para o Feed
      </RouterLink>
    </div>

    <!-- Grid de favoritos -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="photo in favorites"
        :key="photo.id"
        @click="openModal(photo)"
        class="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col h-[380px] w-full cursor-pointer transition hover:transform hover:scale-105 relative group"
      >
        <!-- Botão de remover favorito -->
        <button
          @click="removeFavorite(photo.id, $event)"
          class="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Remover dos favoritos"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500 fill-red-500 hover:text-white transition-colors"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <!-- Badge de favorito -->
        <div
          class="absolute top-3 left-3 z-10 px-2 py-1 rounded-full bg-red-500/80 backdrop-blur-sm text-xs font-medium text-white"
        >
          ❤️ Favorito
        </div>

        <img
          :src="photo.urls.small"
          :alt="photo.alt_description || 'Foto do Unsplash'"
          class="h-[250px] w-full object-cover"
        />

        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-100 mb-1">
              {{ photo.user.name }}
            </h3>
            <p class="text-sm text-[#f09433]/80 line-clamp-2 mb-2">
              {{ photo.description || "Sem descrição" }}
            </p>
          </div>

          <div class="text-xs text-gray-400">
            Favoritado em: {{ formatFavoriteDate(photo.favoriteDate) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Estatísticas -->
    <div v-if="favorites.length > 0" class="mt-8 text-center">
      <p class="text-gray-400">
        {{ favorites.length }}
        {{ favorites.length === 1 ? "foto favoritada" : "fotos favoritadas" }}
      </p>
    </div>

    <!-- Modal -->
    <PhotoModal
      v-if="selectedPhoto"
      :photo="selectedPhoto"
      :is-favorite="true"
      @close="closeModal"
      @toggle-favorite="removeFavorite(selectedPhoto.id, $event)"
    />
  </div>
</template>
