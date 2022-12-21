<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';

const backgroundStore = useBackgroundStore();
const solidData = backgroundStore.solidData;
</script>

<template>
    <div :style="{background: solidData.color}"></div>
</template>

<style scoped lang="scss">

</style>