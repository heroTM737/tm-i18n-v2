<script setup lang="ts">
import fs from 'fs'

defineProps<{ msg: string }>()

// data
let recentList: any[]
let fileName = 'recent.json'
if (fs.existsSync(fileName)) {
    recentList = JSON.parse(fs.readFileSync(fileName, 'utf8'))
} else {
    recentList = []
}

console.log(recentList);

// method
const readDir = (index: number) => {
    console.log(index)
}

</script>

<template>
  <h1>Recent</h1>

    <div v-for="(item, index) in recentList" :key="index" class="mb-3">
        <button @click="readDir(index)" class="mr-3">
            {{item.name}}
        </button>
        <span style="color: #fff" >{{item.src}}</span>
    </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
