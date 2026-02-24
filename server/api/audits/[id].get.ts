// server/api/audits/[id].get.ts

import { getAuditDBById } from "~~/server/utils/storage";

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')?.trim();

  if (!idParam) {
    throw createError({
      statusCode: 400,
      message: 'El ID de auditoría es obligatorio.',
    });
  }

  const audit = getAuditDBById(idParam);

  if (!audit || audit.length === 0) {
    throw createError({
      statusCode: 404,
      message: `No se encontró la auditoría con código: ${idParam}`,
    });
  }

  return audit;
});