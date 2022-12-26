<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    title: string
}>()

const bodyRef = ref<HTMLElement>()
const bodyInnerRef = ref<HTMLElement>()

const isOpen = ref<boolean>(false);
const toggleOpen = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        let rect = bodyInnerRef.value?.getBoundingClientRect();
        if (bodyRef.value) {
            bodyRef.value.style.height = rect ? `${rect.height}px` : '0'
            setTimeout(() => {
                bodyRef.value.style.height = 'auto'
            }, 400)
        }
    } else {
        let rect = bodyInnerRef.value?.getBoundingClientRect();
        if (bodyRef.value) {
            bodyRef.value.style.height = rect ? `${rect.height}px` : '0'
            setTimeout(() => {
                bodyRef.value.style.height = '0'
            }, 0)
        }
    }
}
</script>

<template>
    <div :class="`tm-expansion-panel${isOpen ? ' open' : ''}`">
        <div class="tm-expansion-panel-header" @click="toggleOpen">
            {{ props.title }}
            <v-icon icon="mdi-chevron-down"></v-icon>
        </div>
        <div class="tm-expansion-panel-body" ref="bodyRef">
            <div class="tm-expansion-panel-body-inner" ref="bodyInnerRef">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tm-expansion-panel {
    background: #fff;
    border-radius: 5px;

    .tm-expansion-panel-header {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 10px;
        cursor: pointer;
        user-select: none;
        display: flex;
        justify-content: space-between;
        transition: var(--tm-transition);
    }

    &:deep(.v-icon) {
        transition: var(--tm-transition);
    }

    .tm-expansion-panel-body {
        height: 0;
        transition: var(--tm-transition);
        overflow: hidden;
    }

    &.open {
        .tm-expansion-panel-header {
            background: #e5e5e5;
        }

        &:deep(.v-icon) {
            transform: rotateZ(180deg);
        }
    }
}

</style>