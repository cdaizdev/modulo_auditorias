//Definimos los datos de base que usaremos para generar auditorías.
export const departments = ['Compras', 'Ventas', 'Seguridad', 'RRHH', 'Operaciones', 'Calidad'];

const auditors: { [key: string]: string } = {
    compras: 'Julia Vila',
    ventas: 'Elena Gómez',
    seguridad: 'Marcos Sanz',
    rrhh: 'Javier León',
    operaciones: 'Marie Dobson',
    calidad: 'Alexander Smith'
};

/**
 * Plantillas, cada plantilla tiene 10 evaluaciones
 */
export const templates = 
[
  {
        id: 'tpl_1',
        name: 'ISO 27001 Base',
        process: 'Seguridad',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Cifrado de datos en reposo', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Control de acceso multifactor (MFA)', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Revisión de logs de auditoría', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Gestión de parches críticos', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Política de escritorio limpio', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Pruebas de restauración de backups', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Escaneo de vulnerabilidades externas', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Inventario de activos de hardware', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Revisión de privilegios de administrador', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Simulacro de respuesta ante incidentes', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_2',
        name: 'Control de Acceso',
        process: 'Operaciones',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Revocación de usuarios inactivos', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Validación de permisos de superusuario', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Cambio de contraseñas por defecto', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Acceso físico restringido a CPD', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Bitácora de visitantes al centro de datos', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Monitoreo de accesos fuera de horario', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Integridad de sellos en racks de servidores', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Revisión de certificados SSL/TLS', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Auditoría de llaves físicas y tarjetas', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Cierre de sesiones por inactividad', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_3',
        name: 'Gestión de Proveedores',
        process: 'Compras',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Verificación de acuerdos de confidencialidad', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Evaluación de desempeño trimestral', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Cumplimiento de niveles de servicio (SLA)', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Auditoría de facturación vs pedido', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Validación de solvencia financiera', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Certificaciones ISO de proveedores críticos', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Revisión de cláusulas de salida/terminación', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Inspección de condiciones de entrega/logística', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Cumplimiento de código de conducta', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Control de subcontratación no autorizada', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_4',
        name: 'Normativa RRHH',
        process: 'RRHH',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Firma de código ético por empleados', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Evidencia de formación en ciberseguridad', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Revisión de bajas en Seguridad Social', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Actualización de expedientes de personal', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Control de vacaciones y descansos legales', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Evaluación de riesgos laborales por puesto', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Firma de política de teletrabajo', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Verificación de antecedentes (si aplica)', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Registro de entrega de equipos (Laptop)', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Capacitación en diversidad e inclusión', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_5',
        name: 'Auditoría de Ventas',
        process: 'Ventas',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Validación de descuentos aplicados', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Integridad de datos en CRM', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Autorización de contratos de gran volumen', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Cumplimiento de ley de protección de datos (Lead)', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Revisión de comisiones calculadas', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Seguimiento de ofertas caducadas', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Verificación de identidad de clientes (KYC)', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Consistencia de precios en catálogo', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Encuestas de satisfacción post-venta', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Control de devoluciones y notas de crédito', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_6',
        name: 'Control de Calidad: Línea de Envasado',
        process: 'Calidad',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Validación de calibración de básculas de precisión', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Verificación de integridad de sellado térmico', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Control de trazabilidad de lote de materia prima', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Inspección visual de etiquetado y caducidad', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Muestreo microbiológico de superficies', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Control de temperatura en zona de envasado', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Prueba de detección de metales en línea', status: 'pending', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Limpieza de filtros y conductos', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Verificación de aire comprimido grado alimentario', status: 'pending', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Control de mermas y desperdicios', status: 'pending', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    }
];

const statuses: string[] = ['draft', 'in_progress', 'done', 'blocked'];


/**
 * Funcion que devuelve un item aleatorio de una lista
 * @param array
 * @returns 
 */
function getRandomElement(array: string[]) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Genera el estado de la auditoría y su progreso manteniendo la coherencia: 
 * draft -> 0%, done -> 100%, in_progress -> 1-99%
 */
const generateRandomStatus= () => {
    const status = getRandomElement(statuses);
    let progress = 0;
    if (status === 'done') progress = 100;
    else if (status === 'in_progress' || status === 'blocked') {
        progress = Math.floor(Math.random() * 90) + 5;
    }
    return {
        status: status,
        progress: progress
    };
}

/**
 * Genera una fecha aleatoria entre hoy y hace un mes.
 * @returns String en formato "dd/mm/yyyy"
 */
const generateRecentDate = () => new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    .toISOString();

const generateLimitDate = () => new Date(Date.now() + Math.random() * (new Date(new Date().getFullYear(), 11, 31).getTime() - Date.now()))
    .toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

/**
 * Genera auditorias aleatorias con los datos definidos arriba. Sólo se ejecuta una vez al iniciar la aplicación.
 * @param {*} count 
 * @returns 
 */
export const generateAudits = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
        const {status, progress} = generateRandomStatus();

        const process: string = getRandomElement(departments) || '';
        const auditorName = auditors[process.toLowerCase()] || 'Default User';

        return {
            id: `audit_${1001 + i}`,
            name: `Auditoría de ${process} Q${(i % 4) + 1}`,
            process: departments[i % departments.length],
            status: status,
            progress: progress,
            owner: {
                id: `u_${(i % departments.length) + 1}`,
                name: auditorName
            },
            targetDate: generateLimitDate(),
            updatedAt: new Date().toISOString(),
            createdAt: generateRecentDate(),
            templateId: templates.filter((item) => item.process == process).reduce((acc, item) => item.id, ''),
        };
    });
};

/**
 * Genera la auditoría relacionada con la plantilla a través de su id.
 * @param id 
 * @returns 
 */
export const generateAuditResults = () => {
  const auditsDb = getDb();

  return auditsDb.map((audit: any) => {
    const template = templates.find((t: any) => t.id === audit.templateId);
    
    if (!template) {
      return { auditId: audit.id, error: "Template not found", checks: [] };
    }

    const totalChecks = template.checks.length;
    const completedCount = Math.round((audit.progress / 100) * totalChecks);

    const auditChecks = structuredClone(template.checks).map((check: any, index: number) => {
      let status = 'pending';

      if (audit.status === 'done') {
        status = 'success';
      } 
      else if (audit.status === 'blocked') {
        if (index < completedCount - 1) {
          status = 'success';
        } else if (index === completedCount - 1 && completedCount > 0) {
          status = 'failed';
        }
      } 
      else if (audit.status === 'in_progress') {
        if (index < completedCount) {
          status = 'success';
        }
      }

      return {
        ...check,
        status,
        loading: false,
        lastUpdated: audit.updatedAt || new Date().toISOString()
      };
    });

    return {
      id: `rel-${audit.id}`,
      auditId: audit.id,
      templateId: template.id,
      templateName: template.name,
      checks: auditChecks
    };
  });
};

