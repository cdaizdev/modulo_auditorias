<script setup lang="ts">
// Definimos las interfaces para que sea robusto
  interface Column {
    key: string;
    label: string;
    class?: string;
  }

  defineProps<{
    columns: Column[];
    items: any[];
    loading?: boolean;
    error?: string | null;
  }>();

  defineEmits(['row-click', 'retry']);
</script>

<template>
  <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
    <table class="w-full text-left border-collapse">
      <thead class="bg-slate-50 border-b border-slate-200">
        <tr>
          <th v-for="col in columns" :key="col.key" class="p-4 font-semibold text-slate-600 text-sm uppercase tracking-wider" :class="col.class">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      
      <tbody class="divide-y divide-slate-100">
        <tr v-if="loading" v-for="n in 5" :key="`skeleton-${n}`" class="animate-pulse">
          <td v-for="col in columns" :key="`col-${col.key}`" class="p-4">
            <div class="h-4 bg-slate-200 rounded w-2/3"></div>
          </td>
        </tr>

        <tr v-else-if="error">
          <td :colspan="columns.length" class="p-12 text-center">
            <p class="text-red-500 font-medium mb-3">{{ error }}</p>
            <AppButton @click="$emit('retry')" variant=danger>
              Intentar de nuevo
            </AppButton>
          </td>
        </tr>

        <tr v-else-if="items.length === 0">
          <td :colspan="columns.length" class="p-12 text-center text-slate-400">
            No se han encontrado registros.
          </td>
        </tr>

        <tr v-else v-for="(item, index) in items" :key="item.id || index" @click="$emit('row-click', item)"
          class="hover:bg-slate-50 cursor-pointer transition-colors">
          <td v-for="col in columns" :key="col.key" class="p-4" :class="col.class">
            <slot :name="`cell-${col.key}`" :item="item">
              {{ item[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>