<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { createAudit } = useApi();

const currentStep = ref(1);
const isSubmitting = ref(false);
const error = ref<string | null>(null);

const form = reactive({
    name: '',
    process: '',
    standard: 'ISO 27001',
    targetDate: '',
    templateId: ''
});

const selectedOption = ref(null);

const isStep1Valid = computed(() => {
    return form.name.length > 3 && form.process !== '' && form.targetDate !== '';
});

const nextStep = () => {
    if (isStep1Valid.value) currentStep.value = 2;
};

const prevStep = () => {
    currentStep.value = 1;
};

const handleCreate = async () => {
    isSubmitting.value = true;
    error.value = null;

    const selectedTpl = templates.find(t => t.id === form.templateId);

    try {
        const newAuditData = {
            id: `audit_${Date.now()}`,
            name: form.name,
            process: form.process,
            standard: form.standard,
            targetDate: form.targetDate,
            status: 'DRAFT',
            progress: 0,
            owner: { name: 'Default User' }, //hardcode
            templateId: form.templateId,
            createdAt: new Date().toISOString(),
            checks: selectedTpl ? JSON.parse(JSON.stringify(selectedTpl.checks)) : []
        };

        await createAudit(newAuditData);

        router.push(`/audits/${newAuditData.id}`);

    } catch (e: any) {
        error.value = e.message || "Error al crear la auditoría";
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <div class="max-w-2xl mx-auto p-6 bg-white border border-slate-200 rounded-xl shadow-sm">

        <div class="mb-8">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Paso {{ currentStep }} de 2
                </span>
                <span class="text-xs font-medium text-slate-500">
                    {{ currentStep === 1 ? 'Datos de la auditoría' : 'Selección de plantilla' }}
                </span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-blue-600 h-full transition-all duration-500 ease-out" :style="{ width: currentStep === 1 ? '50%' : '100%' }"></div>
            </div>
        </div>

        <transition name="fade-slide" mode="out-in">
            <div v-if="currentStep === 1" key="step1">
                <div class="space-y-4 min-h-[300px]">
                    <div>
                        <h2 class="text-xl font-bold text-slate-800">Datos de la auditoría</h2>
                        <p class="pb-4">Rellena los campos para pasar al siguiente paso.</p>
                    </div>
                    <div>
                        <AppInput v-model="form.name" label="Nombre de la Auditoría"
                            placeholder="Ej: Auditoría Anual de Compras" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-col gap-1">
                            <label class="text-sm font-medium text-slate-700">Proceso / Depto.</label>
                            <select v-model="form.process" class="border rounded-lg p-2 bg-white">
                                <option value="" disabled>Selecciona uno</option>
                                <option v-for="p in departments" :key="p" :value="p">{{ p }}</option>
                            </select>
                        </div>
                        <AppInput v-model="form.targetDate" type="date" label="Fecha Límite" />
                    </div>
                </div>
                <div class="flex justify-end pt-6">
                    <AppButton :disabled="!isStep1Valid" @click="nextStep">
                        Siguiente: Selección de Modelo
                    </AppButton>
                </div>
            </div>

            <div v-else key="step2">
                <div class="space-y-4 min-h-[300px]">
                    <h2 class="text-2xl font-bold text-slate-800">Selección de plantilla</h2>
                    <p class="text-slate-600">Selecciona las opciones para finalizar el proceso:</p>
                    <div class="grid gap-3 overflow-y-scroll">
                        <div v-for="tpl in templates" :key="tpl.id" @click="form.templateId = tpl.id"
                            :class="['p-4 border-2 rounded-lg cursor-pointer transition-all',
                                form.templateId === tpl.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200']">
                            <p class="font-medium"
                                :class="form.templateId === tpl.id ? 'text-blue-700' : 'text-slate-700'">
                                {{ tpl.name }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-6">
                    <AppButton variant="ghost" @click="prevStep">Atrás</AppButton>
                    <AppButton :loading="isSubmitting" :disabled="!form.templateId" @click="handleCreate">
                        Finalizar y Crear
                    </AppButton>
                </div>
            </div>
        </transition>
    </div>
</template>



<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>