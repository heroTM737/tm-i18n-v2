<template>
    <div>
        EditorPage
        <div>
            {{ appStore.activeSource }}
        </div>
        <v-btn @click="backToHomePage">Back</v-btn>
    </div>
</template>

<script setup lang="ts">
import router from '../routes/routes';
import useAppStore from '../stores/app.store';

const appStore = useAppStore()

const backToHomePage = () => {
    router.push('/')
}
</script>

<style scoped>

</style>