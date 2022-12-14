<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import useAppStore from '../stores/app.store';

const props = defineProps({
    i18nKey: {
        required: true,
        type: String
    }
});

const appStore = useAppStore()

// data
let initialData: any[] = [];
appStore.activeData.forEach((languageData, language) => {
    initialData.push({
        name: language,
        value: languageData[props.i18nKey]
    })
})
const data = reactive(initialData)

// methods
const onSave = () => {
    console.log(JSON.parse(JSON.stringify(data)))
    data.forEach(item => {
        appStore.activeData.get(item.name)[props.i18nKey] = item.value
    })
    appStore.save()
}
</script>

<template>
    <div class="EditorContent">
        <div class="panel editor-header">
            <span>{{ props.i18nKey }}</span>
            <v-btn size="small" @click="onSave">Save</v-btn>
        </div>
        <div
            v-for="item in data"
            :key="item.name"
            class="panel editor-item"
        >
            <div><b>{{ item.name }}</b></div>
            <div>
                <input type="text" v-model="item.value">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.editor-header {
    height: 35px;
    margin-bottom: 10px;
    padding: 5px 10px;
    color: var(--tm-item-text);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.editor-item {
    margin-bottom: 10px;
    padding: 5px 10px;
    color: var(--tm-item-text);

    input {
        width: 100%;
        margin: 5px 0;
        border: 1px solid var(--tm-item-text);
        border-radius: 5px;
        padding: 5px;
        color: var(--tm-item-text);
    }
}
</style>