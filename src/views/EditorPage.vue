<script setup lang="ts">
import router from '../routes/routes';
import useAppStore from '../stores/app.store';
import { reactive, ref } from 'vue';
import EditorContent from './EditorContent.vue';
import constants from '../utils/constants';

const appStore = useAppStore()

// data
const selectedKey = ref('');
let initialData: any[] = [];
appStore.activeData.forEach((value, language) => {
    initialData.push({
        name: language,
        value: ''
    })
})
const data = reactive(initialData)

// methods
const backToHomePage = () => {
    router.push('/')
}

const onSelectKey = (key: string) => {
    selectedKey.value = key
    appStore.activeData.forEach((value, language) => {
        initialData.push({
            name: language,
            value: value[key]
        })
    })
}
</script>

<template>
    <div class="page EditorPage">
        <div class="panel page-header" style="padding: 10px">
            <v-btn size="small" @click="backToHomePage" class="mr-3">Back</v-btn>
            <b>{{ appStore.activeSource?.name }}</b> | {{ appStore.activeSource?.src.split(constants.PATH_SEPARATOR).join(" > ") }}
        </div>
        <div class="d-flex" style="margin-top: 10px">
            <div style="flex: 1 1 50%; width: 50%">
                <div class="panel" style="margin-bottom: 10px">
                    <input type="text" placeholder="Search" class="item-search">
                </div>
                <div class="panel key-container">
                    <div
                        v-for="(item, index) in appStore.activeKeyMap"
                        :key="index"
                        class="item"
                        @click="onSelectKey(item[0])"
                    >
                        {{ item[0] }}
                    </div>
                </div>
            </div>
            <div style="margin-left: 10px; flex: 1 1 50%; width: 50%">
                <EditorContent
                    v-if="!!selectedKey"
                    :i18n-key="selectedKey"
                    :key="selectedKey"
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
}

.key-container {
    height: calc(100vh - 135px);
    overflow-y: scroll;
}

.item {
    border-bottom: 1px solid var(--tm-page-bg);
    cursor: pointer;
    padding: 5px 10px;
    color: var(--tm-item-text);
    height: 35px;

    &:hover {
        background: var(--tm-item-bg-hover);
    }
}

.item-search {
    padding: 5px 10px;
    width: 100%;
    height: 35px;

    &:focus {
        outline: none;
        border: none;
    }
}
</style>