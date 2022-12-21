<script setup lang="ts">
import router from '../../routes/routes';
import useBackgroundStore, { BackgroundType } from '../../stores/background.store';
import { reactive, ref } from 'vue';
import SolidEditor from './SolidEditor.vue';
import GradientEditor from './GradientEditor.vue';
import ImageEditor from './ImageEditor.vue';
import DynamicEditor from './DynamicEditor.vue';

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
        <v-expansion-panels v-model="panels" multiple>
            <v-expansion-panel title="Background" value="background">
                <v-expansion-panel-text>
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
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Translation" value="translation">
                <v-expansion-panel-text>
                    We are working on this cool feature. See you soon.
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
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