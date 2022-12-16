<script setup lang="ts">
import router from '../../routes/routes';
import useAppStore from '../../stores/app.store';
import ItemEditor from './ItemEditor.vue';
import constants from '../../utils/constants';
import ItemList from './ItemList.vue';

const appStore = useAppStore()

// methods
const backToHomePage = () => {
    router.push('/')
}
</script>

<template>
    <div class="page EditorPage">
        <div class="panel page-header" style="padding: 10px">
            <v-btn size="small" @click="backToHomePage" class="mr-3">Back</v-btn>
            <div>
                <b>{{ appStore.activeSource?.name }}</b> <br>
                {{ appStore.activeSource?.src.split(constants.PATH_SEPARATOR).join(" > ") }}
            </div>
        </div>
        <div class="d-flex" style="margin-top: 10px">
            <div style="flex: 1 1 50%; width: 50%">
                <ItemList />
            </div>
            <div style="margin-left: 10px; flex: 1 1 50%; width: 50%">
                <ItemEditor
                    v-if="appStore.visibleEditorContent"
                    :key="appStore.count"
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
</style>