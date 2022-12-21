<script setup lang="ts">
import useBackgroundStore, { BackgroundType } from '../../stores/background.store';
import SolidBackground from './SolidBackground.vue';
import GradientBackground from './GradientBackground.vue';

const backgroundStore = useBackgroundStore();
</script>

<template>
    <div class="Background">
        <SolidBackground class="background-renderer" v-if="backgroundStore.type === BackgroundType.SOLID" />
        <GradientBackground class="background-renderer" v-if="backgroundStore.type === BackgroundType.GRADIENT" />
    </div>
</template>

<style scoped>
.Background {
    width: 100%;
    height: 100%;
    /*background: var(--tm-page-bg);*/
    /*background: red;*/
    /*background: url("/img/vivamagenta.jpg");*/
    background: linear-gradient(to right, #673ab7, #bfc3d9);
}

.background-renderer {
    width: 100%;
    height: 100%;
}
</style>