<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';

const backgroundStore = useBackgroundStore();
const solidData = backgroundStore.solidData;
</script>

<template>
    <div>
        <b>Color</b>: {{ solidData.color }}
        <div :style="{background: solidData.color}" class="color-sample"></div>
        <v-color-picker v-model="solidData.color" />
    </div>
</template>

<style scoped lang="scss">
.color-sample {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>