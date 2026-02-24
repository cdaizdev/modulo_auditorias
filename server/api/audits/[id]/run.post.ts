// server/api/audits/[id]/start.post.ts
import { getAuditDBById, updateDb } from "#imports";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || '';
  const audit = getAuditDBById(id);
  const config = useRuntimeConfig();

  const prob = Number(config.public.checkProb);
  const delay = Number(config.public.checkDelay);

  if (!audit) throw createError({ statusCode: 404, message: 'Auditoría no encontrada' });
  if (audit.status === 'running') return { message: 'Ya está en ejecución' };

  // 1. Iniciamos el proceso
  updateDb(id, { status: 'running', progress: 0 });

  // 2. Ejecutamos la simulación en background
  event.waitUntil(simulateAuditProcess(id, prob, delay));

  return { message: 'Simulación iniciada', auditId: id };
});

async function simulateAuditProcess(id: string, prob: number, delay: number) {
  const audit = getAuditDBById(id);
  if (!audit) return;

  for (let i = 0; i < audit.checks.length; i++) {
    // Fase: Running
    audit.checks[i].status = 'running';
    updateDb(id, { checks: audit.checks, progress: Math.round((i / audit.checks.length) * 100) });
    
    await new Promise(r => setTimeout(r, delay));

    // Fase: Resultado
    const isSuccess = Math.random() > prob;
    audit.checks[i].status = isSuccess ? 'success' : 'failed';
    
    updateDb(id, { 
      checks: audit.checks, 
      progress: Math.round(((i + 1) / audit.checks.length) * 100) 
    });
  }

  // Finalización
  const hasFailed = audit.checks.some((c: any) => c.status === 'failed');
  updateDb(id, { 
    status: hasFailed ? 'REVIEW_REQUIRED' : 'done', 
    progress: 100 
  });
}