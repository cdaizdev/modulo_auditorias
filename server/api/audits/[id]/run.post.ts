
import { getDb, updateDb } from "#imports";

const config = useRuntimeConfig();

const failureProbability = Number(config.public.checkProb);
const DELAY = Number(config.public.checkDelay);

// Revisar hay acciones que ya se realizan en el stream.
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || '';
  
  const audit = getAuditDBById(id);

  if (!audit) throw createError({ statusCode: 404, statusMessage: 'Auditoría no encontrada' });

  // 1. Marcar inicio de la auditoría
  updateDb(id, { status: 'in_progress' });
  event.waitUntil(simulateAuditProcess(audit, failureProbability));

  return { message: 'Ejecución iniciada', auditId: id };
});

async function simulateAuditProcess(audit: any, prob: number) {
  if (!audit || !audit.checks) return;

  //Poner cada check pendiente en 'queued'
  audit.checks.forEach((item: any) => {
    if (item.status == 'pending') item.status = 'queued';
    updateAuditProgress(audit.id);
  });

  audit.status = 'running';
  const checksToProcess = audit.checks.filter((c: any) => c.status === 'queued');

  for (const check of checksToProcess) {
    if (check.status === 'success' || check.status === 'failed') continue;
    // FASE: QUEUED -> running
    check.loading = true;
    check.status = 'running';

    updateAuditProgress(audit.id);
    await new Promise(resolve => setTimeout(resolve, DELAY));

    updateAuditProgress(audit.id);
  }
  finalizeAudit(audit.id);
}

function updateAuditProgress(auditId: string) {
  const audit = getDb().find(a => a.id === auditId);
  if (!audit) return;

  const completed = audit.checks.filter((c: any) => ['success', 'failed'].includes(c.status)).length;

  const progress = Math.round((completed / audit.checks.length) * 100);

  updateDb(auditId, {
    progress,
    checks: audit.checks
  });
}

function finalizeAudit(auditId: string) {
  const audit = getDb().find(a => a.id === auditId);
  if (!audit) return;

  const hasFailed = audit.checks.some((c: any) => c.status === 'failed');
  const finalStatus = hasFailed ? 'REVIEW_REQUIRED' : 'done';

  updateDb(auditId, {
    status: finalStatus,
    progress: 100
  });

}