// server/api/audits/[id]/stream.get.ts
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || '';
  const res = event.node.res;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const interval = setInterval(() => {
    const audit = getAuditDBById(id);
    if (!audit) return;

    res.write(`data: ${JSON.stringify({
      status: audit.status,
      progress: audit.progress,
      checks: audit.checks
    })}\n\n`);

    if (audit.status === 'done' || audit.status === 'REVIEW_REQUIRED') {
      clearInterval(interval);
      res.end();
    }
  }, 500);

  event._handled = true;
});