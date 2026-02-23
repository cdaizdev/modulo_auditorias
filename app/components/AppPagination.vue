<script setup lang="ts">
const route = useRoute();
const router = useRouter();
defineProps<{
    from: number,
    to: number
    total: number
}>();

const from = computed(() => {
	if (total.value === 0) return 0;
	return (page.value - 1) * pageSize.value + 1;
});

const to = computed(() => {
	const currentEnd = page.value * pageSize.value;
	return currentEnd > total.value ? total.value : currentEnd;
});

// Métodos para cambiar estado (actualizan la URL)
const changePage = (newPage: number) => {
	router.push({
		query: { ...route.query, page: newPage.toString() }
	});
};
</script>

<template>
    <p class="font-medium">
        Mostrando <span class="text-slate-900">{{ from }}-{{ to }}</span> de <span class="text-slate-900">{{
            total
            }}</span> resultados
    </p>
    <nav class="flex items-center justify-center space-x-4 bg-gray-50 p-4 rounded-full shadow-inner w-fit mx-auto"
        aria-label="Navegación de resultados">
        <div class="flex items-center border-r border-gray-200 pr-4 gap-1">
            <button @click="changePage(1)" :disabled="page === 1"
                class="p-2 text-xs font-bold uppercase tracking-tighter text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all">
                Inicio
            </button>
            <button @click="changePage(page - 1)" :disabled="page === 1"
                class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </div>
        <div class="flex items-center gap-2">
            <template v-for="n in [page, page + 1, page + 2]" :key="n">
                <button v-if="n <= Math.ceil(total / pageSize)" @click="changePage(n)" :class="['w-10 h-10 rounded-full text-sm font-bold transition-all duration-300',
                    page === n ? 'bg-blue-600 text-white scale-110 shadow-lg ring-4 ring-blue-100'
                        : 'bg-transparent text-gray-500 hover:bg-white hover:shadow-sm hover:text-blue-600']">
                    {{ n }}
                </button>
            </template>
            <span v-if="page + 2 < Math.ceil(total / pageSize)" class="text-gray-300 px-1 font-mono">···</span>
        </div>
        <div class="flex items-center border-l border-gray-200 pl-4 gap-1">
            <button @click="changePage(page + 1)" :disabled="page * pageSize >= total"
                class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <button @click="changePage(Math.ceil(total / pageSize))" :disabled="page * pageSize >= total"
                class="p-2 text-xs font-bold uppercase tracking-tighter text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-all">
                Fin
            </button>
        </div>
    </nav>
</template>
