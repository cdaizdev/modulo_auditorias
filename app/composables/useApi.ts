// app/composables/useApi.ts
import { simulateNetwork, templates } from "#imports";

/**
 * Centraliza y encapsula la lógica reactiva de las peticiones a la API
 * @returns any
 */
export const useApi = () => {
    const isLoading = ref(false);
    const apiError = ref<string | null>(null);
    

    /**
     * GET /audits
     * Llama al endpoint de Nitro que consulta el objeto en memoria de Node
     */
    const getAudits = async (options: {
        page: number,
        pageSize: number,
        status?: string,
        search?: string
    }) => {
        await simulateNetwork();
        return await $fetch('/api/audits', {
            params: {
                page: options.page,
                pageSize: options.pageSize,
                status: options.status,
                search: options.search
            }
        });
    }

    /**
     * GET /audits/:id
     */
    const getAuditById = async (id: string) => {
        await simulateNetwork();
        return await $fetch(`/api/audits/${id}`);
    }

    /**
     * POST /audits
     */
    const createAudit = async (newAudit: any) => {
        await simulateNetwork();
        return await $fetch('/api/audits', {
            method: 'POST',
            body: newAudit
        });
    }

    /**
     * PATCH /audits/:id
     * Actualiza el objeto en la memoria de Node
     */
    const patchAudit = async (id: string, updates: any) => {
        await simulateNetwork();
        return await $fetch(`/api/audits/${id}`, {
            method: 'PATCH',
            body: updates
        });
    }

    const getTemplates = async () => {
        await simulateNetwork()
        return templates
    }

    return {
        getAudits,
        createAudit,
        getAuditById,
        patchAudit,
        getTemplates,
        isLoading,
        apiError
    }
}
