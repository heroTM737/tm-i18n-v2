<script setup lang="ts">
import ToastMessage from './components/ToastMessage.vue'
import Background from './components/Background/Background.vue';</script>

<template>
    <v-app class="theme-default">
        <div class="layer bg-layer">
            <Background />
        </div>
        <div class="layer app-layer">
            <router-view></router-view>
        </div>
        <ToastMessage />
    </v-app>
</template>

<style>
.layer {
    position: absolute;
    width: 100%;
    height: 100%;
}

.bg-layer {
    z-index: 1;
}

.app-layer {
    z-index: 2;
}
</style>
