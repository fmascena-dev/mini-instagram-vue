<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  photo: Object,
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "toggleFavorite"]);

const isVisible = ref(true);
const isImageLoaded = ref(false);

const close = () => {
  isVisible.value = false;
};

// Quando isVisible se torna false, aguarda a animação e depois emite o evento de fechar
watch(isVisible, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      emit("close");
    }, 500); // Reduzido para 500ms para melhor UX
  }
});

// Função para fechar ao clicar no backdrop
const closeOnBackdrop = (event) => {
  if (event.target === event.currentTarget) {
    close();
  }
};

// Função para fechar com ESC
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    close();
  }
};

// Adiciona listener para ESC quando o modal é criado
onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  // Previne scroll do body quando o modal está aberto
  document.body.style.overflow = "";
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  // Restaura scroll do body
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isVisible"
        @click="closeOnBackdrop"
        class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      >
        <Transition name="slide">
          <div
            v-if="isVisible"
            class="bg-white rounded-xl m-4 shadow-lg max-w-xl w-full px-6 py-4 relative text-black"
            @click.stop
          >
            <button
              @click="close"
              class="absolute -top-4 -right-4 w-10 h-10 rounded-full font-extrabold text-gray-800 hover:text-red-500 transition text-xl cursor-pointer bg-white flex items-center justify-center"
              aria-label="Fechar Modal"
            >
              ✕
            </button>

            <!-- Botão de favorito no modal -->
            <button
              @click="emit('toggleFavorite')"
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full transition text-xl cursor-pointer flex items-center justify-center"
              :class="{
                'bg-red-500 hover:bg-red-600 text-white': props.isFavorite,
                'bg-white text-gray-600 hover:text-red-500':
                  !props.isFavorite,
              }"
              :aria-label="
                props.isFavorite
                  ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                :class="{
                  'fill-current': props.isFavorite,
                }"
                fill="none"
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

            <div v-if="!isImageLoaded" class="w-full flex justify-center my-20">
              <p class="text-gray-600 animate-pulse text-2xl font-bold">
                Carregando imagem...
              </p>
            </div>

            <img
              :src="photo.urls.regular"
              :alt="photo.alt_description || 'Foto'"
              @load="isImageLoaded = true"
              @error="isImageLoaded = true"
              class="rounded-xl max-h-[60vh] w-full object-contain mx-auto mb-4 transition-opacity duration-500"
              :class="{
                'opacity-0': !isImageLoaded,
                'opacity-100': isImageLoaded,
              }"
            />

            <div v-if="isImageLoaded">
              <h2 class="text-xl font-bold">{{ photo.user.name }}</h2>

              <p v-if="photo.description" class="mt-2 text-gray-700 line-clamp-1">
                {{ photo.description }}
              </p>

              <a
                :href="photo.user.links.html"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block mt-4 text-blue-700 hover:underline font-bold"
              >
                Ver perfil na Unsplash →
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(100px) scale(0.9);
}
</style>
