<script setup lang="ts">
import useBackgroundStore from '../../stores/background.store';

const backgroundStore = useBackgroundStore();
const gradientData = backgroundStore.gradientData;
</script>

<template>
    <div>
        <div>
            <v-slider
                v-model="gradientData.angle"
                color="blue"
                label="Angle"
                min="0"
                max="360"
                step="1"
            >
                <template v-slot:append>
                    <v-text-field
                        v-model="gradientData.angle"
                        hide-details
                        single-line
                        density="compact"
                        type="number"
                        style="width: 100px"
                        readonly
                    ></v-text-field>
                </template>
            </v-slider>
        </div>
        <div class="d-flex">
            <div class="flex-grow-1">
                <b>Color 1</b>: {{ gradientData.color1 }}
                <div :style="{background: gradientData.color1}" class="color-sample"></div>
                <v-color-picker v-model="gradientData.color1" />
            </div>
            <div class="flex-grow-1">
                <b>Color 2</b>: {{ gradientData.color2 }}
                <div :style="{background: gradientData.color2}" class="color-sample"></div>
                <v-color-picker v-model="gradientData.color2" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>