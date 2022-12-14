<script setup lang="ts">
import ToastMessage from './components/ToastMessage.vue'
</script>

<template>
    <div class="theme-default">
        <router-view></router-view>
        <ToastMessage />
    </div>
</template>

<style>
</style>
