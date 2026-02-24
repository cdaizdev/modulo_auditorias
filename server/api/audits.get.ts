// server/api/audits.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const status = query.status as string;
  const db = getDb();
  let filtered = [...db];

  if (status) {
    filtered = filtered.filter(a => a.status === status);
  }

  const start = (page - 1) * pageSize;
  
  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length
  };
});