<script setup>
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <form class="bg-gray-800 p-8 rounded-lg shadow-md w-80 space-y-4">
            <h2 class="text-2xl font-bold text-center mb-8">Login</h2>
            <input v-model="email" type="text" placeholder="Digite o seu email" class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none" />
            <input v-model="password" type="password" placeholder="Digite a sua senha" class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none" />

            <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Entrar</button>

            <p></p>
        </form>
    </div>

</template>
