<script setup lang="ts">
const props = defineProps<{
    label: string,
    to: string
}>();

</script>
<template>
    <NuxtLink :to="to || '/'" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-[#2563eb70]" active-class="bg-blue-600 text-white">
        <slot></slot>
        {{ label }}
    </NuxtLink>
</template>
