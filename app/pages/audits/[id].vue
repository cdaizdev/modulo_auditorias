<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const auditId = route.params.id as string;
const { getAuditById, patchAudit } = useApi();
const { data: audit, refresh } = await useFetch(`/api/audits/${auditId}`);

// 1. Estado reactivo principal
const isExecuting = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);


/**
 * 2. Carga de datos y vinculación con la plantilla
 * En un entorno real, aquí solo cargamos los datos de la base de datos. Otra opción sería generar otra lista 
 */
const fetchAuditData = async () => {
	try {
		loading.value = true;

		// Cargamos los datos de la auditoria
		const data: any = await getAuditById(auditId);

		audit.value = data;
	} catch (e: any) {
		error.value = e;
	} finally {
		loading.value = false;
	}
};

onMounted(fetchAuditData);

/**
 * Ejecuta la auditoria si no está terminada o pendiente
 */
const runAudit = async () => {
	await $fetch(`/api/audits/${auditId}/run`, {
		method: 'POST',
	});
	refresh();
};

let timer: any = null;

const startPolling = () => {
  if (timer) return;
  timer = setInterval(async () => {
    await refresh();
    if (audit.value.status !== 'IN_PROGRESS') {
      stopPolling();
    }
  }, 1000);
};

const stopPolling = () => {
  clearInterval(timer);
  timer = null;
};

onMounted(() => {
  watch(() => audit.value?.status, (newStatus) => {
    if (newStatus === 'IN_PROGRESS') {
      startPolling();
    } else {
      stopPolling();
    }
  }, { immediate: true });
});

onUnmounted(() => stopPolling());

// 4. Clases dinámicas para los estados
const getStatusClass = (status: string) => {
	const map: Record<string, string> = {
		SUCCESS: 'bg-green-100 text-green-700 border-green-200',
		FAILED: 'bg-red-100 text-red-700 border-red-200',
		RUNNING: 'bg-orange-100 text-orange-700 border-orange-200',
		PENDING: 'bg-slate-100 text-slate-500 border-slate-200 animate-pulse',
		DONE: 'bg-green-100 text-green-700',
		BLOCKED: 'bg-red-100 text-red-700',
	};
	return map[status] || 'bg-blue-100 text-blue-700';
};
const getPriorityClass = (status: string) => {
	const map: Record<string, string> = {
		MEDIUM: 'bg-orange-100 text-orange-700',
		LOW: 'bg-green-100 text-green-700',
		HIGH: 'bg-red-100 text-red-700',
	};
	return map[status] || 'bg-blue-100 text-blue-700';
};

</script>

<template>
	<div class="max-w-5xl mx-auto py-8 px-4 space-y-6">
		<div v-if="loading" class="animate-pulse space-y-6">
			<section class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
				<div class="flex flex-col md:flex-row justify-between gap-6">

					<div class="flex-1">
						<div class="flex items-center gap-3 mb-2">
							<div class="h-8 bg-slate-200 rounded-lg w-2/3"></div>
							<div class="h-6 bg-slate-100 rounded-full w-20"></div>
						</div>

						<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
							<div v-for="i in 2" :key="i" class="space-y-2">
								<div class="h-2 bg-slate-100 rounded w-16"></div>
								<div class="h-4 bg-slate-200 rounded w-24"></div>
							</div>
						</div>
					</div>

					<div class="md:w-64 space-y-4">
						<div class="flex justify-between items-end">
							<div class="h-4 bg-slate-200 rounded w-24"></div>
							<div class="h-8 bg-slate-200 rounded w-12"></div>
						</div>
						<div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden"></div>
						<div class="h-10 bg-slate-200 rounded-xl w-full"></div>
					</div>
				</div>
			</section>

			<section class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
				<div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
					<div class="h-5 bg-slate-200 rounded w-48"></div>
				</div>

				<div class="divide-y divide-slate-100">
					<div v-for="i in 5" :key="i" class="p-4 flex items-center justify-between">
						<div class="flex items-center gap-3 flex-1">
							<div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
							<div class="h-4 bg-slate-200 rounded w-1/2"></div>
						</div>
						<div class="h-6 bg-slate-100 rounded w-16"></div>
					</div>
				</div>
			</section>

			<p class="text-center text-slate-300 text-xs font-medium uppercase tracking-wider">
				Preparando auditoría...
			</p>
		</div>

		<div v-else-if="error" class="bg-red-50 border border-red-200 p-6 rounded-2xl text-center space-y-4">
			<p class="text-red-600 font-bold">{{ error }}</p>
			<div class="flex flex-col items-center gap-3">
				<AppButton variant="danger">
					Reintentar carga
				</AppButton>

				<NuxtLink to="/" class="text-red-700 underline text-sm hover:text-red-800 transition-colors">
					Volver al listado
				</NuxtLink>
			</div>
		</div>

		<template v-else>
			<section class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
				<div class="flex flex-col md:flex-row justify-between gap-6">
					<div class="flex-1">
						<div class="flex items-center gap-3 mb-2">
							<h1 class="text-2xl font-bold text-slate-900">{{ audit.name }}</h1>
							<span :class="[
								'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight',
								audit.status === 'DONE' ? 'bg-green-100 text-green-700' :
									audit.status === 'BLOCKED' ? 'bg-red-100 text-red-700' :
										'bg-blue-100 text-blue-700'
							]">
								{{ audit.status }}
							</span>
						</div>
						<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
							<div>
								<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Responsable
								</p>
								<p class="text-sm font-medium text-slate-700">{{ audit.owner?.name || audit.owner ||
									'Sin asignar' }}
								</p>
							</div>
							<div>
								<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha Límite
								</p>
								<p class="text-sm font-medium text-slate-700">{{ audit.targetDate || 'Sin fecha' }}</p>
							</div>
						</div>
					</div>

					<div class="md:w-64 space-y-4">
						<div class="flex justify-between items-end">
							<span class="text-sm font-bold text-slate-700">Progreso Total</span>
							<span class="text-2xl font-black text-blue-600">{{ audit.progress }}%</span>
						</div>
						<div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
							<div class="bg-blue-600 h-full transition-all duration-500 ease-out"
								:style="{ width: `${audit.progress}%` }"></div>
						</div>
						<AppButton class="w-full" :loading="isExecuting" @click="runAudit"
							:variant="audit.status === 'DONE' ? 'secondary' : 'primary'"
							:disabled="audit.status === 'DONE' || audit.status === 'REVIEW_REQUIRED'">
							{{ audit.status === 'DONE' ? 'Auditoría Finalizada' : audit.status === 'REVIEW_REQUIRED' ? 'Revisión requerida' : 'Ejecutar Auditoría' }}
						</AppButton>
					</div>
				</div>
			</section>

			<section class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
				<div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
					<h2 class="font-bold text-slate-800">Puntos de Control (Checklist)</h2>
				</div>
				<div class="divide-y divide-slate-100">
					<div v-if="audit.checks">
						<div v-for="check in audit.checks" :key="check.id"
							class="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
							<div class="flex justify-between items-center gap-6">
								<div class="flex items-center gap-3">
									<div
										:class="['w-2.5 h-2.5 rounded-full shadow-sm', check.status === 'SUCCESS' ? 'bg-green-500' : check.status === 'FAILED' ? 'bg-red-500' : 'bg-slate-300 shadow-none']">
									</div>
									<span class="text-sm font-medium text-slate-700">{{ check.title }}</span>
								</div>
								<div>
									<span
										:class="['flex gap-2 px-2.5 py-1 rounded text-[10px] font-bold', getPriorityClass(check.priority?.toUpperCase())]">
										{{ check.priority?.toUpperCase() }}
									</span>
								</div>
							</div>
							<span
								:class="['flex gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold border', getStatusClass(check.status)]">
								<svg v-if="check.loading" class="animate-spin h-4 w-4 text-current"
									xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
										stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
									</path>
								</svg>
								{{ check.status }}
							</span>
						</div>
					</div>
				</div>
			</section>
		</template>
	</div>
</template>