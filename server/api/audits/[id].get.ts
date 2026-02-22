// server/api/audits/[id].get.ts

import { getAuditDBById } from "~~/server/utils/storage";
import { simulateNetwork } from "~/utils/network";

export default defineEventHandler(async (event) => {
  try {
    const idParam = getRouterParam(event, 'id')?.trim();

    if (!idParam) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El ID de auditoría es obligatorio.',
      });
    }
    
    const audit = await getAuditDBById(idParam);
    
    if (!audit) {
      throw createError({
        statusCode: 404,
        statusMessage: `No se encontró la auditoría con código: ${idParam}`,
      });
    }
    
    return audit;

  } catch (error: any) {
    if (error.statusCode) throw error;

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error interno del servidor',
    });
  }
});