<script setup lang="ts">
import router from '../../routes/routes';
import useBackgroundStore, { BackgroundType } from '../../stores/background.store';
import { ref } from 'vue';
import SolidEditor from './SolidEditor.vue';
import GradientEditor from './GradientEditor.vue';
import ImageEditor from './ImageEditor.vue';
import DynamicEditor from './DynamicEditor.vue';
import TmExpansionPanel from '../../components/tm-expansion-panel.vue';

const backgroundStore = useBackgroundStore();

const panels = ref(['background']);

const goToHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="page SettingsPage">
        <div class="panel header">
            <v-btn size="small" @click="goToHome">Back</v-btn>
            <b style="margin-left: 10px">Settings</b>
        </div>
        <tm-expansion-panel title="Background" class="mb-3">
            <div class="d-flex">
                <v-radio-group style="flex: 0 0 20%" v-model="backgroundStore.type">
                    <v-radio label="Solid" :value="BackgroundType.SOLID"></v-radio>
                    <v-radio label="Gradient" :value="BackgroundType.GRADIENT"></v-radio>
                    <v-radio label="Image" :value="BackgroundType.IMAGE"></v-radio>
                    <v-radio label="Dynamic" :value="BackgroundType.DYNAMIC"></v-radio>
                </v-radio-group>
                <div style="flex: 1 1 1px">
                    <SolidEditor v-if="backgroundStore.type === BackgroundType.SOLID"/>
                    <GradientEditor v-if="backgroundStore.type === BackgroundType.GRADIENT"/>
                    <ImageEditor v-if="backgroundStore.type === BackgroundType.IMAGE"/>
                    <DynamicEditor v-if="backgroundStore.type === BackgroundType.DYNAMIC"/>
                </div>
            </div>
        </tm-expansion-panel>
        <tm-expansion-panel title="Translation" class="mb-3">
            <div class="pa-3">
                We are working on this cool feature. See you soon.
            </div>
        </tm-expansion-panel>
    </div>
</template>

<style scoped lang="scss">
.SettingsPage {
    padding: 10px;

    .header {
        padding: 10px;
        color: var(--tm-item-text);
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
}
</style>