// server/utils/storage.ts
/**
 * Esta utilidad genera los mockups y los almacena en la memoria de Node 
 * mientras la aplicación esté ejecutandose
 */
import { generateMockAudits, mockTemplates } from '~/utils/mockdata';

let auditsDb: any[] = [];
let templatesDb: any[] = [];

export const getDb = () => {
  if (auditsDb.length === 0) {
    auditsDb = generateMockAudits(60).sort((a, b) => {
      const dateA = new Date(a.targetDate.split('/').reverse().join('-'));
      const dateB = new Date(b.targetDate.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });

    const templateDb = getTemplatesDb();

    auditsDb.forEach(audit => {
      const template = templateDb.find(t => t.id === audit.templateId);

      if (template) {
        audit.checks = template.checks.map((check: any) => ({
          ...check
        }));
      } else {
        audit.checks = [];
      }
    });

    // Generamos el estado inicial de los checks
    auditsDb.forEach(audit => {
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

        // Forzamos al menos un fallo si hay progreso
        if (completed > 0) {
          audit.checks[completed - 1].status = 'FAILED';
        }
      }

      else if (audit.status === 'IN_PROGRESS') {
        for (let i = 0; i < completed; i++) {
          audit.checks[i].status = 'SUCCESS';
        }
      }
    });
  }

  return auditsDb;
};

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
    templatesDb = [...mockTemplates];
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