<script setup>
</script>

<template>
    <div>
        <form>
            <h2>Login</h2>
            <input v-model="email" type="text" placeholder="Digite o seu email">
            <input v-model="password" type="password" placeholder="Digite a sua senha">

            <button type="submit">Entrar</button>

            <p></p>
        </form>
    </div>

</template>
