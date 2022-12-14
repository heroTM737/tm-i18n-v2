<script setup lang="ts">
import router from '../routes/routes';
import useAppStore from '../stores/app.store';
import EditorContent from './EditorContent.vue';
import constants from '../utils/constants';
import { ref } from 'vue';
import utils from '../utils/utils';

const appStore = useAppStore()

// data
let searchKey = ref('')

// methods
const backToHomePage = () => {
    router.push('/')
}

const onSelectKey = (key: string) => {
    appStore.openEditorContent(key)
}

const onAddKey = () => {
    appStore.openEditorContent('')
}

const onClearSearch = () => {
    searchKey.value = ''
}
</script>

<template>
    <div class="page EditorPage">
        <div class="panel page-header" style="padding: 10px">
            <v-btn size="small" @click="backToHomePage" class="mr-3">Back</v-btn>
            <b>{{ appStore.activeSource?.name }}</b> &nbsp;|
            {{ appStore.activeSource?.src.split(constants.PATH_SEPARATOR).join(" > ") }}
        </div>
        <div class="d-flex" style="margin-top: 10px">
            <div style="flex: 1 1 50%; width: 50%">
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
                    >Add</v-btn>
                </div>
                <div class="panel key-container">
                    <template v-for="(item, index) in appStore.activeKeyMap">
                        <div
                            :key="index"
                            v-if="item[0].toLowerCase().includes(searchKey.toLowerCase())"
                            class="item"
                            @click="onSelectKey(item[0])"
                        >
                            {{ item[0] }}
                            <v-icon
                                size="small"
                                icon="mdi-content-copy"
                                color="#fff"
                                @click.stop="utils.copyToClipboard(item[0])"
                            ></v-icon>
                        </div>
                    </template>
                </div>
            </div>
            <div style="margin-left: 10px; flex: 1 1 50%; width: 50%">
                <EditorContent
                    v-if="appStore.visibleEditorContent"
                    :key="appStore.activeKey || 'add'"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.EditorPage {
    padding: 10px;
}

.page-header {
    color: var(--tm-item-text);
    display: flex;
    align-items: center;
}

.key-container {
    height: calc(100vh - 155px);
    overflow-y: scroll;
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
    justify-content: space-between;

    &:hover {
        background: var(--tm-item-bg-hover);

        &::v-deep .v-icon {
            display: block;
        }
    }

    &::v-deep .v-icon {
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