<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';
import constants from '../../utils/constants';
import DynamicSakura from './dynamic/sakura/DynamicSakura.vue';
import DynamicWave from './dynamic/wave/DynamicWave.vue';

const backgroundStore = useBackgroundStore();
const dynamicData = backgroundStore.dynamicData;
</script>

<template>
    <div>
        <DynamicSakura v-if="dynamicData.id === constants.DYNAMIC_ID.SAKURA" />
        <DynamicWave v-if="dynamicData.id === constants.DYNAMIC_ID.WAVE" />
    </div>
</template>

<style scoped lang="scss">
</style>