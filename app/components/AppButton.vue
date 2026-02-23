<script setup lang="ts">
// Definimos las propiedades para hacerlo flexible
const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
}>();

// Mapeo de estilos de Tailwind según la variante
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm border-blue-700 focus:ring-blue-500',
  secondary: 'border rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm focus:ring-red-500',
  success: 'bg-green-600 text-white hover:bg-green-700 shadow-sm focus:ring-green-500',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 border-transparent focus:ring-slate-500',
};
</script>

<template>
  <button :type="type || 'button'" :disabled="disabled || loading" class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium 
    border transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-0 md:min-w-[150px]"
    :class="variants[variant || 'primary']">
    <svg v-if="loading" class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <slot v-else />
  </button>
</template>