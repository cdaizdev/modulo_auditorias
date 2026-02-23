// server/utils/storage.ts
/**
 * Esta utilidad genera los mockups y los almacena en la memoria de Node 
 * mientras la aplicación esté ejecutandose. Actúa además como capa de datos, simulando operaciones de lectura
 * escritura en base de datos.
 */
import { generateAudits, templates } from '~/utils/mockdata';

let auditsDb: any[] = [];
let templatesDb: any[] = [];

export const getDb = () => {
  if (auditsDb.length === 0) {
    auditsDb = generateAudits(60).sort((a, b) => {
      const dateA = new Date(a.targetDate.split('/').reverse().join('-'));
      const dateB = new Date(b.targetDate.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });
  }

  return auditsDb;
};

export const getAuditDBById = (id: string) => {
  const templateDb = getTemplatesDb();

  const db = getDb();
  let audit = db.find(a => a.id === id);

  const template = templateDb.find(t => t.id === audit.templateId);

  if (template) {
    audit.checks = template.checks.map((check: any) => ({
      ...check
    }));
  } else {
    audit.checks = [];
  }
  if (!audit.checks || audit.checks.length === 0) return;

  const totalChecks = audit.checks.length;
  const completed = Math.round((audit.progress / 100) * totalChecks);

  // Inicialmente todos en pending
  audit.checks.forEach((check: any) => {
    check.status = 'pending';
    check.loading = false;
  });

  if (audit.status === 'done') {
    audit.checks.forEach((check: any) => {
      check.status = 'success';
    });
  }

  else if (audit.status === 'blocked') {
    for (let i = 0; i < completed; i++) {
      audit.checks[i].status = 'success';
    }

    if (completed > 0) {
      audit.checks[completed - 1].status = 'failed';
    }
  }

  else if (audit.status === 'in_progress') {
    for (let i = 0; i < completed; i++) {
      audit.checks[i].status = 'success';
    }
  }

  audit.templateName = template.name;
  
  return audit;
}

export const updateDb = (id: string, updates: any) => {
  const index = auditsDb.findIndex(a => a.id === id);

  if (index !== -1) {
    const current = auditsDb[index];

    auditsDb[index] = {
      ...current,
      ...updates,
      checks: updates.checks
        ? updates.checks.map((c: any) => ({ ...c }))
        : current.checks,
      updatedAt: new Date().toISOString()
    };

    return auditsDb[index];
  }

  return null;
};

/**
 * Gestión de Templates
 */
export const getTemplatesDb = () => {
  if (templatesDb.length === 0) {
    templatesDb = [...templates];
  }
  return templatesDb;
};

