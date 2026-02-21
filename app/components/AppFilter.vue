<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

// 1. Definimos props para recibir el estado desde la URL y emit para avisar el cambio
const props = defineProps<{
  modelValue?: string
}>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

// 2. Opciones para el dropdown
const options = [
  { label: 'Todos los estados', value: '' },
  { label: 'Finalizados', value: 'DONE' },
  { label: 'En progreso', value: 'IN_PROGRESS' },
  { label: 'Borrador', value: 'DRAFT' },
  { label: 'Bloqueados', value: 'BLOCKED' },
];

// 3. Referencia reactiva para la etiqueta visual
const selectedOption = computed(() => {
  return options.find(opt => opt.value === props.modelValue) ?? options[0];
});

const toggleDropdown = () => (isOpen.value = !isOpen.value);

// Emitir la opción al elemento padre
const selectOption = (option: typeof options[0]) => {
  isOpen.value = false;
  emit('update:modelValue', option.value);
};

// Cerrar el dropdown cuando se hace click fuera de este
const dropdownRef = ref<HTMLElement | null>(null);
const closeOnClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => window.addEventListener('click', closeOnClickOutside));
onUnmounted(() => window.removeEventListener('click', closeOnClickOutside));
</script>

<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <div class="w-auto md:w-56">
      <button @click="toggleDropdown" class="flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 shadow-sm transition 
               hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
               w-10 h-10 md:w-full md:h-auto md:py-2 md:px-3"
        :class="{ 'border-blue-500 ring-2 ring-blue-500/10': modelValue !== '' }">
        <span class="hidden md:block text-sm text-gray-800 truncate font-medium">
          {{ selectedOption?.label }}
        </span>

        <div class="flex items-center justify-center w-full md:w-auto">
          <svg class="h-5 w-5 md:h-4 md:w-4 text-gray-500" :class="{ 'text-blue-600': modelValue !== '' }" fill="none"
            stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h18M6 8h12M10 12h4M12 16v4" />
          </svg>
        </div>
      </button>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-if="isOpen"
        class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
        <div class="py-1">
          <button v-for="option in options" :key="option.value" @click="selectOption(option)" :class="[
            modelValue === option.value ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700',
            'block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition-colors'
          ]">
            <div class="flex items-center justify-between">
              {{ option.label }}
              <span v-if="modelValue === option.value" class="h-2 w-2 rounded-full bg-blue-600"></span>
            </div>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>