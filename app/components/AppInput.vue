<script setup lang="ts">
const props = defineProps<{
    modelValue: string | number; // <--- Añadido para v-model
    id?: string;
    placeholder?: string;
    label?: string;
    required?: boolean;
    type?: 'text' | 'search' | 'date';
}>();

// Definimos el evento de actualización
const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="mb-4">
        <label v-if="label" class="block text-slate-700 text-sm font-bold mb-2" :for="id">
            {{ label }}
        </label>
        <input
            :id="id" 
            :type="type || 'text'" 
            :placeholder="placeholder"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="shadow-sm appearance-none border border-slate-300 rounded-lg w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
    </div>
</template>