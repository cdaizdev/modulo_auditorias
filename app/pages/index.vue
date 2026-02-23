<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
definePageMeta({
  layout: false
})
</script>

<template>
    <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12">
        <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 animate-bounce">
            <span class="relative flex h-2 w-2">
                <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Nuxt 3 + Nitro Engine
        </div>

        <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 text-center tracking-tight mb-4">
            Sistema de <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Auditorías Pro</span>
        </h1>

        <p class="text-lg text-slate-600 text-center max-w-2xl mb-10">
            Una aplicación de alto rendimiento diseñada para la gestión técnica de procesos internos,
            optimizada con una arquitectura de datos en tiempo real.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-12">
            <div
                class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
                <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 class="font-bold text-slate-800 mb-2">Nitro API Mocks</h3>
                <p class="text-sm text-slate-500 italic">Generación dinámica de 80+ registros con latencia simulada para una experiencia realista.</p>
            </div>

            <div
                class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
                <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <h3 class="font-bold text-slate-800 mb-2">Real-time Streaming</h3>
                <p class="text-sm text-slate-500 italic">Ejecución de auditorías mediante flujos de datos asíncronos para evitar recargas de página.</p>
            </div>

            <div
                class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
                <div class="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <h3 class="font-bold text-slate-800 mb-2">TypeScript Core</h3>
                <p class="text-sm text-slate-500 italic">Tipado estricto en toda la aplicación para asegurar la integridad de los procesos.</p>
            </div>
        </div>

        <div class="flex gap-4">
            <NuxtLink to="/audits"
                class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200">
                Explorar Auditorías
            </NuxtLink>
            <a href="https://github.com/cdaizdev/modulo_auditorias.git" target="_blank"
                class="px-8 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all">
                Ver Repositorio
            </a>
        </div>
    </div>
</template>