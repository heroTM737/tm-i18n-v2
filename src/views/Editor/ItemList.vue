<script setup lang="ts">
import { ref } from 'vue';
import useAppStore from '../../stores/app.store';
import utils from '../../utils/utils';

const appStore = useAppStore()

// data
let searchKey = ref('')

// methods
const onClearSearch = () => {
    searchKey.value = ''
}

const onSelectKey = (key: string) => {
    appStore.openEditorContent(key)
}

const onCloneKey = (key: string) => {
    appStore.openEditorContent('', key)
}

const onAddKey = () => {
    appStore.openEditorContent('')
}

const onDeleteKey = (key: string) => {
    appStore.deleteKey(key);
}
</script>

<template>
    <div class="ItemList">
        <div class="panel d-flex align-center" style="margin-bottom: 10px">
            <input type="text" placeholder="&hearts; Search" class="item-search" v-model="searchKey">
            <v-icon
                size="small"
                class="ml-3"
                icon="mdi-close-circle-outline"
                color="#fff"
                @click="onClearSearch"
            ></v-icon>
            <v-btn
                size="small"
                class="mx-3"
                @click="onAddKey"
            >Add
            </v-btn>
        </div>
        <div class="panel item-list">
            <template v-for="(item, index) in appStore.activeKeyMap">
                <div
                    :key="index"
                    v-if="item[0].toLowerCase().includes(searchKey.toLowerCase())"
                    class="item"
                    @click="onSelectKey(item[0])"
                >
                    {{ item[0] }}
                    <div class="flex-grow-1"></div>
                    <v-icon
                        size="small"
                        icon="mdi-close-circle-outline"
                        color="#fff"
                        @click.stop="onDeleteKey(item[0])"
                        class="mr-3"
                    ></v-icon>
                    <v-icon
                        size="small"
                        icon="mdi-content-copy"
                        color="#fff"
                        @click.stop="onCloneKey(item[0])"
                        class="mr-3"
                    ></v-icon>
                    <v-icon
                        size="small"
                        icon="mdi-format-text"
                        color="#fff"
                        @click.stop="utils.copyToClipboard(item[0])"
                    ></v-icon>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item-list {
    height: calc(100vh - 145px);
    overflow-y: scroll;
    overflow-x: auto;
}

.item {
    border-bottom: 1px solid var(--tm-page-bg);
    cursor: pointer;
    padding: 5px 10px;
    color: var(--tm-item-text);
    height: 35px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    &:hover {
        background: var(--tm-item-bg-hover);

        &:deep(.v-icon) {
            display: block;
            transition: all 0.3s ease;
        }

        &:deep(.v-icon:hover) {
            color: yellow !important;
        }
    }

    &:deep(.v-icon) {
        display: none;
    }
}

.item-search {
    padding: 5px 10px;
    width: 100%;
    height: 45px;
    color: var(--tm-item-text);

    &:focus {
        outline: none;
        border: none;
    }
}
</style>