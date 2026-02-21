<script setup lang="ts">
const props = defineProps<{
    progress?: 0
}>()

</script>
<template>
    <div class="flex items-center gap-2">
        <div class="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500" :style="{ width: `${progress}%` }"></div>
        </div>
        <span class="text-xs text-slate-500">{{ progress }}%</span>
    </div>
</template>