<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store'
import { v4 as uuid } from 'uuid'
import utils from '../../utils/utils'
import { onMounted, ref } from 'vue'
import fs from 'fs';

const backgroundStore = useBackgroundStore()
const imageData = backgroundStore.imageData
const availableImageList = ref<any[]>([])

const onFileSelected = (e: any) => {
    let file = e.target.files[0]
    imageData.fileUrl = URL.createObjectURL(file)
    let split = file.name.split('.')
    let fileExtension = split[split.length - 1]
    imageData.filePath = `${uuid()}.${fileExtension}`
    utils.writeFileBuffer(`user\\images\\${imageData.filePath}`, file)
}

const selectImage = (i: number) => {
    let item = availableImageList.value[i]
    backgroundStore.$patch({
        imageData: {
            filePath: item.filePath,
            fileUrl: item.fileUrl
        }
    })
}

onMounted(() => {
    let imageFolder = 'user\\images'
    let isDirectory = fs.lstatSync(imageFolder).isDirectory()
    if (!isDirectory) {
        return
    }
    let fileNameList = fs.readdirSync(imageFolder)
    fileNameList.forEach(fileName => {
        availableImageList.value.push({
            filePath: fileName,
            fileUrl: utils.readImage(`${imageFolder}\\${fileName}`)
        })
    })
})
</script>

<template>
    <div class="d-flex">
        <div class="input-container">
            <div class="mb-3">
                <input type="file" @input="onFileSelected">
            </div>
            <img :src="imageData.fileUrl" alt="image" v-if="imageData.fileUrl">
        </div>
        <div class="available-container">
            <div class="available-label">
                Available
            </div>
            <div class="d-flex image-list">
                <div v-for="(item, i) in availableImageList" :key="i" @click="selectImage(i)">
                    <img :src="item.fileUrl" alt="bg">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
img {
    max-width: 300px;
    max-height: 300px;
}

.input-container {
    padding-right: 10px;
}

.available-container {
    border-left: 1px solid #ccc;
    padding-left: 10px;
}

.available-label {
    height: 42px;
}

.image-list {
    img {
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>