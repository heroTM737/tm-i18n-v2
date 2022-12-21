<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';

const backgroundStore = useBackgroundStore();
const imageData = backgroundStore.imageData;

const onFileSelected = (e: any) => {
    imageData.file = e.target.files[0];
    imageData.fileUrl = URL.createObjectURL(imageData.file);
}
</script>

<template>
    <div>
        <div class="mb-3">
            <input type="file" @input="onFileSelected">
        </div>
        <img :src="imageData.fileUrl" alt="image" v-if="imageData.fileUrl">
    </div>
</template>

<style scoped lang="scss">
img {
    max-width: 300px;
    max-height: 300px;
}
</style>