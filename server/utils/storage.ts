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

  // Inicialmente todos en PENDING
  audit.checks.forEach((check: any) => {
    check.status = 'PENDING';
    check.loading = false;
  });

  if (audit.status === 'DONE') {
    audit.checks.forEach((check: any) => {
      check.status = 'SUCCESS';
    });
  }

  else if (audit.status === 'BLOCKED') {
    for (let i = 0; i < completed; i++) {
      audit.checks[i].status = 'SUCCESS';
    }

    if (completed > 0) {
      audit.checks[completed - 1].status = 'FAILED';
    }
  }

  else if (audit.status === 'IN_PROGRESS') {
    for (let i = 0; i < completed; i++) {
      audit.checks[i].status = 'SUCCESS';
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

export const getTemplateById = (id: string) => {
  const db = getTemplatesDb();
  return db.find(t => t.id === id) || null;
};

export const updateTemplateDb = (id: string, updates: any) => {
  const db = getTemplatesDb();
  const index = db.findIndex(t => t.id === id);
  if (index !== -1) {
    db[index] = {
      ...db[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return db[index];
  }
  return null;
};

/**
 * Agrega un nuevo template a la base de datos
 */
export const createTemplateDb = (template: any) => {
  const db = getTemplatesDb();
  const newTemplate = {
    ...template,
    id: `tpl_${db.length + 1}`,
    updatedAt: new Date().toISOString()
  };
  db.push(newTemplate);
  return newTemplate;
};