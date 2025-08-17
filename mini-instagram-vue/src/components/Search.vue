<script setup>
import { ref } from "vue";

const query = ref("");
const isSearching = ref(false);
const emit = defineEmits(["results"]);

let timeout;

const performSearch = async () => {
  clearTimeout(timeout);
  if (!query.value.trim()) {
    emit("results", []);
    isSearching.value = false;
    return;
  }

  isSearching.value = true;

  try {
    console.log("Buscando por:", query.value);

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query.value
      )}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=15`
    );

    if (!res.ok) {
      throw new Error(`Erro na busca: ${res.status}`);
    }

    const data = await res.json();
    console.log("Resultados encontrados:", data.results?.length || 0);

    emit("results", data.results || []);
  } catch (error) {
    console.error("Erro na pesquisa:", error);
    emit("results", []);
  } finally {
    isSearching.value = false;
  }
};

const handleSearch = () => {
  clearTimeout(timeout);
  timeout = setTimeout(performSearch, 500);
};

const handleEnterSearch = () => {
  clearTimeout(timeout);
  performSearch();
};

const handleButtonSearch = () => {
  clearTimeout(timeout);
  performSearch();
};

const clearSearch = () => {
  query.value = "";
  clearTimeout(timeout);
  emit("results", []);
  isSearching.value = false;
};
</script>

<template>
  <div class="flex items-center justify-center mb-6 w-full">
    <div class="relative w-full max-w-md">
      <input
        type="text"
        v-model="query"
        @input="handleSearch"
        @keydown.enter="handleEnterSearch"
        placeholder="Buscar imagens..."
        class="w-full px-4 py-2 pr-12 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#dc2743] transition"
      />

      <!-- Botão de pesquisa -->
      <button
        @click="handleButtonSearch"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#dc2743] transition-colors"
        aria-label="Pesquisar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <!-- Botão para limpar (aparece quando há texto) -->
      <button
        v-if="query.trim()"
        @click="clearSearch"
        class="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-red-400 transition-colors"
        aria-label="Limpar pesquisa"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>

  <div v-if="isSearching" class="text-center mb-4">
    <p class="text-gray-400 animate-pulse">Buscando...</p>
  </div>
</template>
