<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

// --- RUTA ---
const route = useRoute();
const auditId = route.params.id as string;

// --- HOOKS ---
const { getAuditById } = useApi();

// --- ESTADOS ---
const audit = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const isExecuting = ref(false);
let evtSource: EventSource | null = null;

// --- FETCH INICIAL ---
const loadData = async () => {
	loading.value = true;
	error.value = null;
	try {
		audit.value = await getAuditById(auditId);
	} catch (err: any) {
		console.error(err);
		error.value = 'No se pudo cargar la auditoría';
	} finally {
		loading.value = false;
		if (import.meta.client) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
};

// --- EJECUTAR AUDITORÍA ---
const runAudit = async () => {
	if (isExecuting.value) return;
	isExecuting.value = true;

	try {
		await $fetch(`/api/audits/${auditId}/run`, { method: 'POST' });

		evtSource = new EventSource(`/api/audits/${auditId}/stream`);

		evtSource.onmessage = (event) => {
			const update = JSON.parse(event.data);

			audit.value.status = update.status;
			audit.value.progress = update.progress;

			if (update.checks) {
				audit.value.checks = update.checks;
			}

			if (['done', 'REVIEW_REQUIRED'].includes(update.status)) {
				isExecuting.value = false;
				evtSource?.close();
				evtSource = null;
			}
		};

		evtSource.onerror = (err) => {
			console.error('SSE error', err);
			isExecuting.value = false;
			evtSource?.close();
			evtSource = null;
		};

	} catch (err) {
		console.error(err);
		isExecuting.value = false;
	}
};

// --- LIMPIEZA ---
onUnmounted(() => {
	evtSource?.close();
});

// --- CARGA INICIAL ---
loadData();
</script>

<template>
	<div class="max-w-5xl mx-auto py-8 px-4 space-y-6">
		<!-- CARGA -->
		<div v-if="loading" class="space-y-6 animate-pulse">
			<div class="flex justify-between items-center mb-4">
				<div class="h-6 bg-slate-200 rounded w-1/3"></div>
				<div class="h-6 bg-slate-200 rounded w-1/6"></div>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
				<div class="space-y-2">
					<div class="h-3 bg-slate-200 rounded w-3/4"></div>
					<div class="h-3 bg-slate-100 rounded w-1/2"></div>
				</div>
				<div class="space-y-2">
					<div class="h-3 bg-slate-200 rounded w-3/4"></div>
					<div class="h-3 bg-slate-100 rounded w-1/2"></div>
				</div>
				<div class="space-y-2 hidden md:block">
					<div class="h-3 bg-slate-200 rounded w-3/4"></div>
					<div class="h-3 bg-slate-100 rounded w-1/2"></div>
				</div>
				<div class="space-y-2 hidden md:block">
					<div class="h-3 bg-slate-200 rounded w-3/4"></div>
					<div class="h-3 bg-slate-100 rounded w-1/2"></div>
				</div>
			</div>

			<div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-4">
				<div class="bg-blue-600 h-full w-1/4"></div>
			</div>

			<div class="h-10 bg-slate-200 rounded w-1/3 mx-auto"></div>

			<div class="space-y-2 mt-4">
				<div v-for="i in 5" :key="i" class="flex justify-between items-center py-2">
					<div class="flex items-center gap-3">
						<div class="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
						<div class="h-3 bg-slate-100 rounded w-32"></div>
					</div>
					<div class="h-3 bg-slate-200 rounded w-12"></div>
				</div>
			</div>
		</div>

		<!-- ERROR -->
		<div v-else-if="error" class="bg-red-50 border border-red-200 p-8 rounded-xl text-center">
			<p class="text-red-600 font-medium mb-4">{{ error }}</p>
			<AppButton @click="loadData" variant=danger>
				Reintentar carga
			</AppButton>
		</div>

		<!-- AUDITORÍA -->
		<div v-else>
			<section class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
				<div class="flex justify-between items-center mb-4">
					<h1 class="text-2xl font-bold">{{ audit.name }}</h1>
					<AppBadge :variant="audit.status">{{ audit.status }}</AppBadge>
				</div>

				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
					<div>
						<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Responsable</p>
						<p class="text-sm font-medium text-slate-700">{{ audit.owner?.name || 'Sin asignar' }}</p>
					</div>
					<div>
						<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha Límite</p>
						<p class="text-sm font-medium text-slate-700">{{ audit.targetDate || 'Sin fecha' }}</p>
					</div>
				</div>

				<div class="flex justify-between items-center">
					<span class="text-sm font-bold">Progreso</span>
					<span class="text-2xl font-black text-blue-600">{{ audit.progress }}%</span>
				</div>
				<div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-4">
					<div class="bg-blue-600 h-full transition-all duration-500"
						:style="{ width: audit.progress + '%' }">
					</div>
				</div>

				<button class="w-full py-2 px-4 rounded text-white font-bold"
					:class="isExecuting || ['done', 'REVIEW_REQUIRED'].includes(audit.status) ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'"
					:disabled="isExecuting || ['done', 'REVIEW_REQUIRED'].includes(audit.status)" @click="runAudit">
					<span v-if="isExecuting">Ejecutando auditoría</span>
					<span v-else-if="audit.status === 'done'">Auditoría Finalizada</span>
					<span v-else-if="audit.status === 'REVIEW_REQUIRED'">Revisión requerida</span>
					<span v-else>Ejecutar Auditoría</span>
				</button>
			</section>

			<!-- CHECKS -->
			<section class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-4">
				<h2 class="text-xl font-bold mb-2 border-b">{{ audit.templateName }}</h2>
				<h2 class="mb-2">Puntos de Control</h2>
				<div v-for="check in audit.checks" :key="check.id"
					class="flex justify-between items-center py-2 border-b">
					<div class="flex items-center gap-3">
						<!-- Indicador de estado -->
						<div class="w-2.5 h-2.5 rounded-full relative">
							<template v-if="check.status === 'running'">
								<svg class="animate-spin h-4 w-4 text-orange-500" xmlns="http://www.w3.org/2000/svg"
									fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
										stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
									</path>
								</svg>
							</template>
							<template v-else>
								<div
									:class="['w-2.5 h-2.5 rounded-full', check.status === 'success' ? 'bg-green-500' : check.status === 'failed' ? 'bg-red-500' : 'bg-slate-300']">
								</div>
							</template>
						</div>
						<span>{{ check.title }}</span>

						<AppBadge :variant="check.priority">
							{{ check.priority?.toUpperCase() }}
						</AppBadge>
					</div>
					<AppBadge :variant="check.status">
						<div class="flex justify-center items-center gap-2">
							<template v-if="check.status === 'running'">
								<svg class="animate-spin h-4 w-4 text-orange-500" xmlns="http://www.w3.org/2000/svg"
									fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
										stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
									</path>
								</svg>
							</template>
							{{ check.status?.toUpperCase() }}
						</div>
					</AppBadge>
				</div>
			</section>
		</div>
	</div>
</template>