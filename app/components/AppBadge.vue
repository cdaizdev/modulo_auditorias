<script setup lang="ts">
import { computed } from 'vue';

type Status = 'blocked' | 'running' | 'in_progress' | 'done' | 'review_required' | 'high' | 'medium' | 'low' | 'failed' | 'success';

type BadgeVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';

const props = defineProps<{
  variant?: BadgeVariant | string;
}>();

const emphasisMap: Record<string, BadgeVariant> = {
  blocked: 'danger',
  failed: 'danger',
  high: 'danger',
  running: 'warning',
  medium: 'warning',
  in_progress: 'primary',
  done: 'success',
  low: 'success',
  success: 'success',
  review_required: 'warning',
  pending: 'secondary'
};

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-blue-100 text-blue-700 border-blue-200',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  secondary: 'bg-slate-100 text-slate-700 border-slate-200',
  danger: 'bg-red-100 text-red-700 border-red-200',
};

const finalClass = computed(() => {
  const input: string = props.variant?.toLowerCase() || 'secondary';
  
  const resolvedVariant = (emphasisMap[input] || input) as BadgeVariant;
  
  return variantStyles[resolvedVariant] || variantStyles.secondary;
});
</script>

<template>
  <span class="inline-block justify-center px-2 py-1 rounded-full text-xs font-bold uppercase border"
    :class="finalClass">
    <slot></slot>
  </span>
</template>
