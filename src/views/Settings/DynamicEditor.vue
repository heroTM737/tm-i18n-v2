<script setup lang="ts">
import { storeToRefs } from "pinia"
import constants from "../../utils/constants";
import useBackgroundStore from "../../stores/background.store";

const backgroundStore = useBackgroundStore();
const { dynamicData } = storeToRefs(backgroundStore);

const itemList = Object.values(constants.DYNAMIC_ID);
</script>

<template>
    <div>
        <v-radio-group style="flex: 0 0 20%" v-model="dynamicData.id">
            <v-radio
                v-for="item in itemList"
                :key="item"
                :label="item"
                :value="item"
            ></v-radio>
        </v-radio-group>
    </div>
</template>

<style scoped lang="scss">

</style>