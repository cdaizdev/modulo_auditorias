// server/api/audits/[id].get.ts

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const db = getDb();

  let audit = db.find(a => a.id === id);
  
  if (!audit) {
    throw createError({
      statusCode: 404,
      statusMessage: `La auditoría con ID ${id} no existe en el servidor.`,
    });
  }

  return audit;
});