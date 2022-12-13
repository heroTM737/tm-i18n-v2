<script setup lang="ts">
import { reactive } from 'vue'
import utils from '../utils/utils';
import { RecentItemInterface } from '../models/models';
import constants from '../utils/constants';

defineProps<{}>()

// data
let fileName = 'recent.json'
let fileContent = utils.readFile(fileName);
let recentList = reactive<RecentItemInterface[]>(fileContent ? JSON.parse(fileContent) : [])

// methods
const saveRecent = () => {
    utils.saveFile(fileName, JSON.stringify(recentList))
}

const readDir = (index: number) => {
    console.log(index)
}

const selectDir = () => {
    utils.selectFileOrDirectory().then((filePath: string) => {
        let i18nPath = utils.findI18nFile(filePath)
        if (!i18nPath) {
            utils.toast('Can not find i18n folder', constants.TOAST.ERROR)
            return
        }
        let itemIndex = recentList.findIndex(item => item.src === i18nPath)
        if (itemIndex >= 0) {
            recentList.splice(itemIndex, 1)
        }
        recentList.splice(0, 0, {
            name: utils.getItemNameFromPath(i18nPath),
            src: i18nPath
        })
        saveRecent()
    });
}

const deleteRecentDir = (event: any, index: number) => {
    event.stopPropagation();
    recentList.splice(index, 1);
    saveRecent()
}
</script>

<template>
    <div class="page HomePage">
        <v-btn size="small" @click="selectDir">Select</v-btn>
        <div v-for="(item, index) in recentList" :key="index" class="item" @click="readDir(index)">
            <div class="flex-grow-1">
                <input class="item-name" v-model="item.name" @focusout="saveRecent">
                <div class="item-src">{{ item.src }}</div>
            </div>
            <div @click="deleteRecentDir($event, index)" class="d-flex align-center pa-2">
                <v-icon icon="mdi-close-circle-outline" class="icon-delete"></v-icon>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.HomePage {
    background: #354384;
    padding: 10px;

    .item {
        background: #273772;
        color: #fff;
        padding: 10px 5px;
        margin: 10px 0;
        border-radius: 5px;
        cursor: pointer;
        display: flex;

        &:hover {
            background: #183bbf;
        }

        .item-name {
            font-weight: bold;
            font-size: 1.5em;
            background: rgba(0, 0, 0, 0);
            border: 1px solid rgba(0, 0, 0, 0);
            border-radius: 5px;
            color: #fff;
            width: 100%;
            padding-left: 5px;

            &:hover {
                border-color: #fff;
            }
        }

        .item-src {
            padding-left: 5px;
        }

        .icon-delete {
            transition: all 0.3s ease;

            &:hover {
                font-size: 2.5em;
            }
        }
    }
}
</style>
