<script setup lang="ts">
// Definimos las propiedades para hacerlo flexible
const props = defineProps<{
    item?: any
}>();

const statusClass = (status: string) => {
  const styles: Record<string, string> = {
    DONE: 'bg-green-100 text-green-700 border-green-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-200',
    DRAFT: 'bg-slate-100 text-slate-700 border-slate-200',
    BLOCKED: 'bg-red-100 text-red-700 border-red-200',
  };
  return styles[status] || 'bg-gray-100 text-gray-700 border-gray-200';
};
</script>

<template #cell-status="{ item }">
    <span class="px-2 py-1 rounded-full text-xs font-bold uppercase border" :class="statusClass(item.status)">
        {{ item.status }}
    </span>
</template>