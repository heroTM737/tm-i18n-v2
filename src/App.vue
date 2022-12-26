<script setup lang="ts">
import ToastMessage from './components/ToastMessage.vue'
import Background from './components/Background/Background.vue';
import useAppStore from './stores/app.store';

const appStore = useAppStore()
</script>
<template>
    <v-app class="theme-default">
        <div class="layer bg-layer">
            <Background />
        </div>
        <div class="layer app-layer">
            <router-view></router-view>
            <div class="app-loading" v-if="appStore.loading">
                <div class="icon-container">
                    <v-icon icon="mdi-loading" class="tm-rotate"></v-icon>
                </div>
            </div>
        </div>
        <ToastMessage />
    </v-app>
</template>

<style lang="scss">
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

    .app-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-container {
            padding: 10px;
            background: #fff;
            border-radius: 10px;
        }
    }
}
</style>
