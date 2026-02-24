// server/utils/storage.ts
import { generateAudits, templates } from '~/utils/mockdata';

let auditsDb: any[] = [];
let templatesDb: any[] = [];

/**
 * Genera la relación Audit-Template-Check basada en una auditoría.
 * Se encarga de clonar los checks y asignar estados según el progreso.
 */
const hydrateAuditWithChecks = (audit: any) => {
  const template = templates.find((t: any) => t.id === audit.templateId);
  if (!template) return { ...audit, checks: [], templateName: 'N/A' };

  const totalChecks = template.checks.length;
  const completedCount = Math.round((audit.progress / 100) * totalChecks);

  const checks = structuredClone(template.checks).map((check: any, index: number) => {
    let status = 'pending';

    if (audit.status === 'done') {
      status = 'success';
    } 
    else if (audit.status === 'blocked') {
      if (index < completedCount - 1) status = 'success';
      else if (index === completedCount - 1 && completedCount > 0) status = 'failed';
    } 
    else if (audit.status === 'in_progress') {
      if (index < completedCount) status = 'success';
    }

    return { ...check, status, loading: false };
  });

  return {
    ...audit,
    templateName: template.name,
    checks // Aquí queda la tabla de relación audit-template-check
  };
};

export const getDb = () => {
  if (auditsDb.length === 0) {
    // 1. Generamos las auditorías base
    const rawAudits = generateAudits(60);

    // 2. Las transformamos para incluir sus checks (la relación que pedías)
    auditsDb = rawAudits.map(audit => hydrateAuditWithChecks(audit))
      .sort((a, b) => {
        const dateA = new Date(a.targetDate.split('/').reverse().join('-'));
        const dateB = new Date(b.targetDate.split('/').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
  }

  return auditsDb;
};

export const getAuditDBById = (auditId: string) => {
  return auditsDb.filter((item: any) => item.id == auditId)[0];
}

export const updateDb = (id: string, updates: any) => {
  const index = auditsDb.findIndex(a => a.id === id);

  if (index !== -1) {
    const current = auditsDb[index];

    // Si el update cambia el progreso o el status, 
    // podrías querer recalcular los checks, pero aquí respetamos
    // lo que venga en el update o mantenemos los actuales.
    auditsDb[index] = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return auditsDb[index];
  }
  return null;
};

export const getTemplatesDb = () => {
  if (templatesDb.length === 0) {
    templatesDb = [...templates];
  }
  return templatesDb;
};