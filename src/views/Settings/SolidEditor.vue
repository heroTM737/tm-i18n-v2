<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';

const backgroundStore = useBackgroundStore();
</script>

<template>
    <div>
        <b>Color</b>: {{ backgroundStore.solidData.color }}
        <div :style="{background: backgroundStore.solidData.color}" class="color-sample"></div>
        <v-color-picker v-model="backgroundStore.solidData.color" />
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