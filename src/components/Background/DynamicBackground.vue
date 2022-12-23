<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';
import constants from '../../utils/constants';
import DynamicSakura from './dynamic/sakura/DynamicSakura.vue';
import DynamicWave from './dynamic/wave/DynamicWave.vue';
import DynamicGradient from './dynamic/gradient/DynamicGradient.vue';

const backgroundStore = useBackgroundStore();
const dynamicData = backgroundStore.dynamicData;
</script>

<template>
    <div>
        <DynamicSakura v-if="dynamicData.id === constants.DYNAMIC_ID.SAKURA" />
        <DynamicWave v-if="dynamicData.id === constants.DYNAMIC_ID.WAVE" />
        <DynamicGradient v-if="dynamicData.id === constants.DYNAMIC_ID.GRADIENT" />
    </div>
</template>

<style scoped lang="scss">
</style>