<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";

const props = defineProps({
  photo: Object,
  onClose: Function,
});

const isVisible = ref(true);
const isImageLoaded = ref(false);

const close = () => {
  isVisible.value = false;
};

watch(isVisible, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      props.onClose();
    }, 500);
  }
});

</script>

<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <Transition name="slide">
        <div
          class="bg-[#e1e1e1] rounded-xl m-4 shadow-lg max-w-xl w-full px-6 py-4 relative text-black"
        >
          <button
            @click="close"
            class="absolute -top-4 -right-4 w-10 h-10 rounded-full font-extrabold text-gray-800 hover:text-red-500 transition text-xl cursor-pointer bg-[#e1e1e1]"
            aria-label="Fechar Modal"
          >
            X
          </button>

          <div v-if="!isImageLoaded" class="w-full flex justify-center my-20">
            <p class="text-gray-600 animate-pulse text-2xl font-bold">
              Carregando imagem...
            </p>
          </div>

          <img :src="photo.urls.regular" :alt="photo.alt_description || 'Foto'" @load="isImageLoaded = true" class="rounded-xl max-h-[60vh] w-full object-contain mx-auto mb-4 transition-opacity duration-500" :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }" />

          <h2 class="text-xl font-bold">{{ photo.user.name }}</h2>

          <p v-if="photo.description" class="mt-2 text-gray-700 line-clamp-1">{{ photo.description }}</p>

          <a :href="photo.user.links.html" target="_blank" class="inline-block mt-4 text-blue-700 hover:underline font-bold">Ver perfil na Unsplash →</a>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease-in-out
}
.fade-enter-from, .fade-leave-to {
    opacity: 0
}

.slide-enter-active, .slide-leave-active {
    transition: all 0.5s ease-in-out
}

.slide-enter-from, .slide-leave-to {
    opacity: 0;
    transform: translateY(200px)
}
</style>
