
import { getDb, updateDb } from "#imports";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || '';
  const failureProbability = 0.35;
  const audit = getDb().find(a => a.id === id);

  if (!audit) throw createError({ statusCode: 404, statusMessage: 'Auditoría no encontrada' });

  // 1. Marcar inicio de la auditoría
  updateDb(id, { status: 'IN_PROGRESS' });
  event.waitUntil(simulateAuditProcess(audit, failureProbability));

  return { message: 'Ejecución iniciada', auditId: id };
});

async function simulateAuditProcess(audit: any, prob: number) {
  if (!audit || !audit.checks) return;
  audit.status = 'RUNNING';
  console.log('simulating...')

  for (const check of audit.checks) {
    if (check.status === 'SUCCESS' || check.status === 'FAILED') continue;
    console.log(check.status);

    // FASE: QUEUED -> RUNNING
    check.loading = true;
    check.status = 'RUNNING';

    updateAuditProgress(audit.id);

    await new Promise(resolve => setTimeout(resolve, 1200));

    // FASE: RUNNING -> SUCCESS/FAILED
    const isSuccess = Math.random() > prob;
    check.status = isSuccess ? 'SUCCESS' : 'FAILED';
    check.loading = false;
    
    updateAuditProgress(audit.id);
  }
  finalizeAudit(audit.id);
}

function updateAuditProgress(auditId: string) {
  const audit = getDb().find(a => a.id === auditId);
  if (!audit) return;
  
  const completed = audit.checks.filter((c: any) => ['SUCCESS', 'FAILED'].includes(c.status)).length;

  const progress = Math.round((completed / audit.checks.length) * 100);

  updateDb(auditId, {
    progress,
    checks: audit.checks
  });
}

function finalizeAudit(auditId: string) {
  const audit = getDb().find(a => a.id === auditId);
  if (!audit) return;

  const hasFailed = audit.checks.some((c: any) => c.status === 'FAILED');
  const finalStatus = hasFailed ? 'REVIEW_REQUIRED' : 'DONE';

  updateDb(auditId, {
    status: finalStatus,
    progress: 100
  });

}