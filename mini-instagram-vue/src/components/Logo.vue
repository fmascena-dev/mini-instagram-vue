<template>
  <h1
    class="text-5xl font-bold leading-[5rem] tracking-[-0.02em] bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient"
  >
    InstaPocket
  </h1>
</template>

<style>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 4s ease infinite;
}
</style>
