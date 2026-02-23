
import { getDb, updateDb } from "#imports";
import { debug } from "~/utils/debug";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || '';
  const failureProbability = 0.35;
  const audit = getDb().find(a => a.id === id);

  if (!audit) throw createError({ statusCode: 404, statusMessage: 'Auditoría no encontrada' });

  // 1. Marcar inicio de la auditoría
  updateDb(id, { status: 'in_progress' });
  event.waitUntil(simulateAuditProcess(audit, failureProbability));

  return { message: 'Ejecución iniciada', auditId: id };
});

async function simulateAuditProcess(audit: any, prob: number) {
  if (!audit || !audit.checks) return;
  audit.status = 'running';
  for (const check of audit.checks) {
    if (check.status === 'success' || check.status === 'failed') continue;
    debug(check.status);

    // FASE: QUEUED -> running
    check.loading = true;
    check.status = 'running';

    updateAuditProgress(audit.id);

    await new Promise(resolve => setTimeout(resolve, 1200));

    // FASE: running -> success/failed
    const isSuccess = Math.random() > prob;
    check.status = isSuccess ? 'success' : 'failed';
    check.loading = false;
    
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