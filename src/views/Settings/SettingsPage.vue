<script setup lang="ts">
import router from '../../routes/routes';

const goToHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="page SettingsPage">
        <div class="d-flex panel">
            <v-btn size="small" @click="goToHome">Back</v-btn>
        </div>
    </div>
</template>

<style scoped>

</style>