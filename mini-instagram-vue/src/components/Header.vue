<script setup>
import Logo from "./Logo.vue";
</script>

<template>
  <header class="flex flex-col justify-between items-center px-8 lg:flex-row bg-gray-950 border-b border-gray-800 py-4">
    <Logo />
    <nav  class="flex items-center gap-4 font-medium px-2 space-x-6 text-[#e1e1e1] text-xl">
      <RouterLink to="/feed" class="relative group transition duration-500 font-bold hover:text-[#bc1888]">FEED</RouterLink>
      <RouterLink to="/favorites" class="relative group transition duration-500 font-bold hover:text-[#bc1888]">FAVORITOS</RouterLink>
      <RouterLink to="login" class="relative group transition duration-500 font-bold hover:text-[#bc1888]">SAIR</RouterLink>
    </nav>
  </header>
</template>
