// server/api/audits/[id].get.ts

import { getAuditById } from "~~/server/utils/storage";

export default defineEventHandler(async (event) => {
  try {
    const idParam = getRouterParam(event, 'id');

    // 1. Validación inicial del ID
    if (!idParam) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El ID proporcionado no es un número válido.',
      });
    }

    const audit: any = await getAuditById(idParam);
    
    // 2. Validación de existencia
    if (!audit) {
      throw createError({
        statusCode: 404,
        statusMessage: `La auditoría con ID ${idParam} no existe en el servidor.`,
      });
    }

    return audit;

  } catch (error: any) {
    // 3. Captura de errores personalizados y genéricos
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Error interno del servidor',
    });
  }
});