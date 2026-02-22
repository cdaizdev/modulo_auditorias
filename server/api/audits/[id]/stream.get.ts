// server/api/audits/[id]/stream.get.ts
import { getDb, updateDb } from "#imports";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || '';
  const db = getDb();
  const audit = db.find(a => a.id === id);

  if (!audit) {
    throw createError({ statusCode: 404, statusMessage: 'Auditoría no encontrada' });
  }

  // Configurar SSE
  const res = event.node.res;
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const send = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Enviar estado inicial
  send({
    status: audit.status,
    progress: audit.progress,
    checks: audit.checks,
  });

  // Función que simula el proceso de auditoría paso a paso
  const runChecks = async () => {
    for (let i = 0; i < audit.checks.length; i++) {
      const check = audit.checks[i];

      // Marcar el check como RUNNING, los anteriores como SUCCESS/FAILED, los siguientes como QUEUED
      audit.checks.forEach((c: any, idx: any) => {
        if (idx < i && !['SUCCESS', 'FAILED'].includes(c.status)) c.status = 'SUCCESS';
        if (idx === i) c.status = 'RUNNING';
        if (idx > i && !['SUCCESS', 'FAILED'].includes(c.status)) c.status = 'QUEUED';
      });

      audit.status = 'RUNNING';
      audit.progress = Math.round((i / audit.checks.length) * 100);
      updateDb(id, audit);
      send({ status: audit.status, progress: audit.progress, checks: audit.checks });

      // Simular tiempo de ejecución
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Marcar check actual como SUCCESS o FAILED aleatoriamente
      const isSuccess = Math.random() > 0.35;
      check.status = isSuccess ? 'SUCCESS' : 'FAILED';

      audit.progress = Math.round(((i + 1) / audit.checks.length) * 100);
      updateDb(id, audit);
      send({ status: audit.status, progress: audit.progress, checks: audit.checks });
    }

    // Finalizar auditoría
    const hasFailed = audit.checks.some((c: any) => c.status === 'FAILED');
    audit.status = hasFailed ? 'REVIEW_REQUIRED' : 'DONE';
    audit.progress = 100;
    updateDb(id, audit);
    send({ status: audit.status, progress: audit.progress, checks: audit.checks });

    res.end();
  };

  runChecks();

  // Mantener conexión abierta hasta terminar
  return new Promise(() => {}); // No resolver, SSE se cierra manualmente al finalizar
});