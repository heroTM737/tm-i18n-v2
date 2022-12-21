<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';

const backgroundStore = useBackgroundStore();
const imageData = backgroundStore.imageData;
</script>

<template>
    <img :src="imageData.fileUrl" alt="image" v-if="imageData.fileUrl">
</template>

<style scoped lang="scss">
img {
    object-fit: cover;
}
</style>