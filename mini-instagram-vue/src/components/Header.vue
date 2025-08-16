<script setup>
import Logo from "./Logo.vue";
</script>

<template>
  <header>
    <Logo />
    <nav>
      <RouterLink to="/feed">FEED</RouterLink>
      <RouterLink to="/favorites">FAVORITOS</RouterLink>
      <RouterLink to="login">SAIR</RouterLink>
    </nav>
  </header>
</template>
