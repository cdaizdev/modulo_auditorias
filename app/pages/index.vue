<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 1. Hooks de Nuxt y API
const route = useRoute();
const router = useRouter();
const { getAudits } = useApi();

// 2. Estado reactivo
const audits = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const total = ref(0);

// 3. Configuración de columnas
const columns = [
	{ key: 'name', label: 'Nombre / ID' },
	{ key: 'status', label: 'Estado' },
	{ key: 'progress', label: 'Progreso', class: 'w-48' },
	{ key: 'owner', label: 'Responsable' },
	{ key: 'targetDate', label: 'Fecha límite' }
];

// 4. Parámetros de paginación sincronizados con la URL
const page = computed(() => Number(route.query.page) || 1);
const pageSize = ref(10);
const selectedStatus = computed(() => (route.query.status as string) || '');

// 5. Cálculos de Rango
const from = computed(() => {
	if (total.value === 0) return 0;
	return (page.value - 1) * pageSize.value + 1;
});

const to = computed(() => {
	const currentEnd = page.value * pageSize.value;
	return currentEnd > total.value ? total.value : currentEnd;
});

// 6. Función de carga de datos
const loadData = async () => {
	loading.value = true;
	error.value = null;

	try {
		const response = await getAudits({
			page: page.value,
			pageSize: pageSize.value,
			status: selectedStatus.value
		});

		audits.value = response.items || [];
		total.value = response.total || 0;
	} catch (e: any) {
		error.value = e.message || 'Error al cargar las auditorías';
	} finally {
		loading.value = false;
		if (import.meta.client) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
};

// 7. Watcher Maestro: Si la URL cambia (página o filtro), recargamos datos
watch(
	() => route.query,
	() => loadData(),
	{ immediate: true, deep: true }
);

// 8. Métodos para cambiar estado (actualizan la URL)
const changePage = (newPage: number) => {
	router.push({
		query: { ...route.query, page: newPage.toString() }
	});
};

const handleFilter = (status: string) => {
	router.push({
		query: { ...route.query, status: status || undefined, page: '1' }
	});
};
</script>

<template>
	<div class="space-y-6">
		<div class="flex flex-wrap items-center justify-between gap-4 mb-6">
			<h1 class="text-xl md:text-2xl font-bold text-slate-800">
				Auditorías
			</h1>
			<div class="flex items-center gap-2 ml-auto">
				<AppFilter :model-value="selectedStatus" @update:model-value="handleFilter" />
				<AppButton @click="$router.push('/wizzard')">
					<span>+</span>
					<span class="hidden md:inline">Nueva Auditoría</span>
					<span class="inline md:hidden font-medium">Nueva</span>
				</AppButton>
			</div>
		</div>

		<div class="md:hidden">
			<div v-if="loading">
				<AppCard v-for="n in 5" :key="n" :item="{}" loading />
			</div>
			<div v-else>
				<AppCard v-for="audit in audits" :key="audit.id" :item="audit" @click="(audit) => $router.push(`/audits/${audit.id}`)"></AppCard>
			</div>
		</div>

		<div class="hidden md:block">
			<div v-if="error" class="bg-red-50 border border-red-200 p-8 rounded-xl text-center">
				<p class="text-red-600 font-medium mb-4">{{ error }}</p>
				<AppButton @click="loadData" variant=danger>
					Reintentar carga
				</AppButton>
			</div>

			<div v-else class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
				<AppTable :columns="columns" :items="audits" :loading="loading" :error="error" @retry="loadData"
					@row-click="(audit) => $router.push(`/audits/${audit.id}`)">
					<template #cell-name="{ item }">
						<div class="font-bold text-slate-800">{{ item.name }}</div>
						<div class="text-xs text-slate-400">{{ item.id }}</div>
					</template>
					<template #cell-status="{ item }">
						<AppBadge :item="item"> {{ item.status }} </AppBadge>
					</template>
					<template #cell-progress="{ item }">
						<AppProgressBar :progress="item.progress"></AppProgressBar>
					</template>
					<template #cell-owner="{ item }">
						{{ item.owner.name }}
					</template>
				</AppTable>
			</div>
		</div>

		<div v-if="!loading && !error && total > 0"
			class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 mt-6">
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
						<button v-if="n <= Math.ceil(total / pageSize)" @click="changePage(n)" :class="[
							'w-10 h-10 rounded-full text-sm font-bold transition-all duration-300',
							page === n
								? 'bg-blue-600 text-white scale-110 shadow-lg ring-4 ring-blue-100'
								: 'bg-transparent text-gray-500 hover:bg-white hover:shadow-sm hover:text-blue-600'
						]">
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
		</div>
	</div>
</template>