<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';

const backgroundStore = useBackgroundStore();
const gradientData = backgroundStore.gradientData;
</script>

<template>
    <div :style="{background: `linear-gradient(${gradientData.angle}deg, ${gradientData.color1}, ${gradientData.color2})`}"></div>
</template>

<style scoped lang="scss">

</style>