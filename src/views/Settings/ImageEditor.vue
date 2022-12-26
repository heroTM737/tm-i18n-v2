<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store'
import { v4 as uuid } from 'uuid'
import utils from '../../utils/utils';

const backgroundStore = useBackgroundStore();
const imageData = backgroundStore.imageData;

const onFileSelected = (e: any) => {
    let file = e.target.files[0]
    imageData.file = file
    imageData.fileUrl = URL.createObjectURL(imageData.file)
    let split = file.name.split('.')
    let fileExtension = split[split.length-1]
    imageData.filePath = `${uuid()}.${fileExtension}`
    utils.writeFileBuffer(`user\\images\\${imageData.filePath}`, file)
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