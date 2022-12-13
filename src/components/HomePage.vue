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
const saveRecent = () => {
    utils.saveFile(fileName, JSON.stringify(recentList))
}

const readDir = (index: number) => {
    console.log(index)
}

const pickDir = () => {
    utils.selectFile().then((filePath: string) => {
        let itemIndex = recentList.findIndex(item => item.src === filePath)
        if (itemIndex >= 0) {
            recentList.splice(itemIndex, 1)
        }
        recentList.splice(0, 0, {
            name: filePath,
            src: filePath
        })
        saveRecent()
    });
}

const deleteRecentDir = (index: number) => {
    recentList.splice(index, 1);
    saveRecent()
}
</script>

<template>
    <div class="page HomePage">
        <button @click="pickDir">Select Source</button>
        <div v-for="(item, index) in recentList" :key="index" class="item" @click="readDir(index)">
            <div>
                <input class="item-name" v-model="item.name" @focusout="saveRecent">
                <div class="item-src">{{ item.src }}</div>
            </div>
            <div @click="deleteRecentDir(index)">
                X
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.HomePage {
    background: #354384;
    padding: 10px;
    box-sizing: border-box;

    .item {
        background: #273772;
        color: #fff;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background: #183bbf;
        }

        .item-name {
            font-weight: bold;
            font-size: 1.5em;
            margin-bottom: 5px;
            background: rgba(0, 0, 0, 0);
            border: 1px solid rgba(0, 0, 0, 0);
            border-radius: 5px;
            color: #fff;
            width: 100%;

            &:hover {
                border-color: #fff;
            }
        }
    }
}
</style>
