<script setup lang="ts">
import useBackgroundStore, { BackgroundType } from '../../stores/background.store';
import SolidBackground from './SolidBackground.vue';
import GradientBackground from './GradientBackground.vue';
import ImageBackground from './ImageBackground.vue';

const backgroundStore = useBackgroundStore();
</script>

<template>
    <div class="Background">
        <SolidBackground class="background-renderer" v-if="backgroundStore.type === BackgroundType.SOLID" />
        <GradientBackground class="background-renderer" v-if="backgroundStore.type === BackgroundType.GRADIENT" />
        <ImageBackground class="background-renderer" v-if="backgroundStore.type === BackgroundType.IMAGE" />
    </div>
</template>

<style scoped>
.Background {
    width: 100%;
    height: 100%;
}

.background-renderer {
    width: 100%;
    height: 100%;
}
</style>