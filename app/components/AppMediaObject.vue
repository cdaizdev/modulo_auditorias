<script setup lang="ts">
const props = defineProps<{
    fullname?: string,
    jobPosition?: string
}>();

</script>
<template>
    <div class="flex items-center gap-4">
        <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold leading-none">{{ fullname || 'Default User'}}</p>
            <p class="text-xs text-slate-500 mt-1">{{ jobPosition || 'Responsable de Hardcoding' }}</p>
        </div>
        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 cursor-not-allowed">
            {{ fullname?.split(' ').map(item => item.charAt(0)).filter((a,b) => b < 2).join('').toUpperCase() || 'DU' }}
        </div>
    </div>
</template>
