<script setup lang="ts">
defineProps<{
    item: any;
    loading?: boolean;
}>();

defineEmits(['click']);
</script>

<template>
    <div @click="$emit('click', item)" class="bg-white border border-slate-200 rounded-xl p-4 mb-4 shadow-sm active:bg-slate-50 transition-colors cursor-pointer">
        <div v-if="loading" class="animate-pulse space-y-3">
            <div class="h-4 bg-slate-200 rounded w-3/4"></div>
            <div class="h-3 bg-slate-100 rounded w-1/2"></div>
            <div class="flex justify-between pt-2">
                <div class="h-6 bg-slate-100 rounded w-20"></div>
                <div class="h-6 bg-slate-100 rounded w-16"></div>
            </div>
        </div>

        <div v-else class="space-y-3">
            <div class="flex justify-between items-start gap-4">
                <h3 class="font-bold text-slate-900 leading-snug">
                    <slot name="title" :item="item">{{ item.name }}</slot>
                </h3>
                <slot name="badge" :item="item"></slot>
            </div>

            <div class="grid grid-cols-2 gap-y-2 text-sm text-slate-500">
                <div>
                    <span class="block text-[10px] uppercase tracking-wider font-semibold text-slate-400">Proceso</span>
                    <AppBadge name="process" :item="item">{{ item.process }}</AppBadge>
                </div>
                <div class="text-right">
                    <span class="block text-[10px] uppercase tracking-wider font-semibold text-slate-400">Fecha</span>
                    <slot name="date" :item="item">{{ item.targetDate }}</slot>
                </div>
            </div>

            <div class="pt-3 border-t border-slate-50 flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <div
                        class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
                    </div>
                    <span class="text-xs text-slate-600 font-medium">{{ item.owner.name }}</span>
                </div>
                <div class="text-blue-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>