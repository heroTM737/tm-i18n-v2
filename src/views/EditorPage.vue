<template>
    <div>
        <div>
            <v-btn @click="backToHomePage">Back</v-btn> <b>{{ appStore.activeSource?.name }}</b> | {{ appStore.activeSource?.src }}
        </div>
        <div>
            <div v-for="(item, index) in appStore.activeData" :key="index">
                {{ item.name }}
            </div>
        </div>
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