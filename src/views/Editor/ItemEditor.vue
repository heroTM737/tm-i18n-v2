<script setup lang="ts">
import { reactive, ref } from 'vue';
import useAppStore from '../../stores/app.store';

const appStore = useAppStore()

// data
let i18nKey = ref<string>(appStore.keyClone || appStore.activeKey)
let syncAllKey = ref<boolean>(!appStore.activeKey)
let initialData: any[] = [];
appStore.activeData.forEach((languageData, language) => {
    initialData.push({
        name: language,
        value: appStore.keyClone ? appStore.activeData.get(language)[appStore.keyClone] : languageData[i18nKey.value]
    })
})
const data = reactive(initialData)

// methods
const onSave = () => {
    data.forEach(item => {
        appStore.activeData.get(item.name)[i18nKey.value] = item.value
        if (appStore.activeKey && (i18nKey.value !== appStore.activeKey)) {
            delete appStore.activeData.get(item.name)[appStore.activeKey]
        }
    })
    appStore.save()
}

const onCancel = () => {
    appStore.closeEditorContent()
}

const onValueChange = (e: any) => {
    if (syncAllKey.value) {
        let value = e.target.value
        data.forEach(item => {
            item.value = value
        })
    }
}
</script>

<template>
    <div class="ItemEditor">
        <div class="panel item-editor-header">
            <v-btn size="small" @click="onSave">Save</v-btn>
            <v-switch
                v-model="syncAllKey"
                :label="'Sync all keys - ' + (syncAllKey ? 'On' : 'Off')"
                hide-details
                class="mx-3"
            ></v-switch>
            <v-btn size="small" @click="onCancel" variant="outlined">Cancel</v-btn>
        </div>
        <div class="item-editor-language-list">
            <div class="panel item-editor-language">
                <div>
                    <b>Key {{ appStore.activeKey ? `( ${appStore.activeKey} )` : ' --- adding new key ---' }}</b>
                </div>
                <div>
                    <input type="text" v-model="i18nKey">
                </div>
            </div>
            <div
                v-for="item in data"
                :key="item.name"
                class="panel item-editor-language"
            >
                <div>
                    <b>{{ item.name }}</b>
                </div>
                <div>
                    <input type="text" v-model="item.value" @input="onValueChange">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item-editor-header {
    height: 45px;
    margin-bottom: 10px;
    padding: 5px 10px;
    color: var(--tm-item-text);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-editor-language-list {
    height: calc(100vh - 145px);
    overflow-y: auto;
}

.item-editor-language {
    margin-bottom: 10px;
    padding: 5px 10px;
    color: var(--tm-item-text);

    input {
        width: 100%;
        margin: 5px 0;
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 5px;
        padding: 5px;
        color: var(--tm-item-text);

        &:focus {
            outline: none;
        }

        &:focus, &:hover {
            border: 1px solid var(--tm-item-text);
        }
    }
}
</style>