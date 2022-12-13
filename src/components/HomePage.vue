<script setup lang="ts">
import { reactive } from 'vue'
import utils from '../utils/utils';
import { RecentItem } from '../models/RecentItem';

defineProps<{}>()

// data
let fileName = 'recent.json'
let fileContent = utils.readFile(fileName);
let recentList = reactive<RecentItem[]>(fileContent ? JSON.parse(fileContent) : [])

// methods
const readDir = (index: number) => {
    console.log(index)
}

const pickDir = () => {
    utils.selectFile().then((filePath: string) => {
        recentList.push({
            name: filePath,
            src: filePath
        })
    });
}
</script>

<template>
    <div>
        <h1>Recent</h1>
        <button @click="pickDir">Select source</button>
    </div>

    <div v-for="(item, index) in recentList" :key="index" class="mb-3">
        <button @click="readDir(index)" class="mr-3">
            {{ item.name }}
        </button>
        <span style="color: #fff">{{ item.src }}</span>
    </div>
</template>

<style scoped lang="scss">
div {
    background: red;
}
</style>
