export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = getDb();

  db.unshift(body);

  return { success: true, item: body };
});