<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const error = ref("");

const handleLogin = () => {
  error.value = "";

  const emailValido = email.value.endsWith("@gmail.com");
  const passwordValido = password.value.length >= 6;

  if (!emailValido || !passwordValido) {
    error.value = "Email ou senha inválidos!";
    return;
  }

  router.push("/feed");
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-950 text-white"
  >
    <form
      class="bg-gray-900 p-8 rounded-lg shadow-md w-80 space-y-4"
      @submit.prevent="handleLogin"
    >
      <h2
        class="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient"
      >
        LOGIN
      </h2>
      <input
        v-model="email"
        type="text"
        placeholder="Digite o seu email"
        class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-[#f09433]"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Digite a sua senha"
        class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-[#f09433]"
      />

      <button
        type="submit"
        class="w-full py-2 rounded text-white font-semibold transition duration-300 cursor-pointer bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] bg-[length:200%_200%] animate-gradient"
      >
        ENTRAR
      </button>

      <p v-if="error" class="bg-red-400 p-2 rounded font-bold text-center mt-2">
        {{ error }}
      </p>
    </form>
  </div>
</template>
