// server/api/audits/[id].patch.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  
  const body = await readBody(event);

  const updatedAudit = updateDb(id!, body);

  if (!updatedAudit) {
    throw createError({
      statusCode: 404,
      statusMessage: `No se pudo actualizar: La auditoría ${id} no existe.`,
    });
  }

  return updatedAudit;
});