<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';

const backgroundStore = useBackgroundStore();
const solidData = backgroundStore.solidData;
</script>

<template>
    <div>
        <div class="d-flex align-center mb-3">
            <div style="width: 150px"><b>Color</b>: {{ solidData.color }}</div>
            <div :style="{background: solidData.color}" class="color-sample"></div>
        </div>
        <v-color-picker v-model="solidData.color" />
    </div>
</template>

<style scoped lang="scss">
.color-sample {
    width: 30px;
    height: 30px;
    border-radius: 5px;
}
</style>