<script setup></script>

<template>
  <div class="min-h-screen bg-gray-950 text-white p-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Favoritos ❤️</h1>

      <button
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors hover:cursor-pointer duration-500"
      >
        Limpar todos
      </button>
    </div>

    <!-- Favoritos vazio -->
     <div>
        <div class="text-xl mb-4">💔</div>
        <h2>Nenhuma foto favoritada ainda</h2>
        <p>Explore o Feed e clique no coração para adicionar fotos aos seus favoritos!</p>

        <RouterLink>
            Ir para o Feed
        </RouterLink>

     </div>

     
  </div>
</template>
