//Definimos los datos de base que usaremos para generar auditorías.
const departments = ['Compras', 'Ventas', 'Seguridad', 'RRHH', 'Operaciones', 'Calidad'];

const auditors = {
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
const templates = [
    {
        id: 'tpl_1',
        name: 'ISO 27001 Base',
        process: 'Seguridad',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Cifrado de datos en reposo', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Control de acceso multifactor (MFA)', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Revisión de logs de auditoría', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Gestión de parches críticos', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Política de escritorio limpio', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Pruebas de restauración de backups', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Escaneo de vulnerabilidades externas', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Inventario de activos de hardware', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Revisión de privilegios de administrador', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Simulacro de respuesta ante incidentes', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_2',
        name: 'Control de Acceso',
        process: 'Operaciones',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Revocación de usuarios inactivos', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Validación de permisos de superusuario', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Cambio de contraseñas por defecto', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Acceso físico restringido a CPD', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Bitácora de visitantes al centro de datos', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Monitoreo de accesos fuera de horario', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Integridad de sellos en racks de servidores', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Revisión de certificados SSL/TLS', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Auditoría de llaves físicas y tarjetas', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Cierre de sesiones por inactividad', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_3',
        name: 'Gestión de Proveedores',
        process: 'Compras',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Verificación de acuerdos de confidencialidad', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Evaluación de desempeño trimestral', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Cumplimiento de niveles de servicio (SLA)', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Auditoría de facturación vs pedido', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Validación de solvencia financiera', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Certificaciones ISO de proveedores críticos', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Revisión de cláusulas de salida/terminación', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Inspección de condiciones de entrega/logística', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Cumplimiento de código de conducta', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Control de subcontratación no autorizada', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_4',
        name: 'Normativa RRHH',
        process: 'RRHH',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Firma de código ético por empleados', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Evidencia de formación en ciberseguridad', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Revisión de bajas en Seguridad Social', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Actualización de expedientes de personal', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Control de vacaciones y descansos legales', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Evaluación de riesgos laborales por puesto', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Firma de política de teletrabajo', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Verificación de antecedentes (si aplica)', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Registro de entrega de equipos (Laptop)', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Capacitación en diversidad e inclusión', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_5',
        name: 'Auditoría de Ventas',
        process: 'Ventas',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Validación de descuentos aplicados', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Integridad de datos en CRM', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Autorización de contratos de gran volumen', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Cumplimiento de ley de protección de datos (Lead)', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Revisión de comisiones calculadas', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Seguimiento de ofertas caducadas', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Verificación de identidad de clientes (KYC)', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Consistencia de precios en catálogo', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Encuestas de satisfacción post-venta', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Control de devoluciones y notas de crédito', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    },
    {
        id: 'tpl_6',
        name: 'Control de Calidad: Línea de Envasado',
        process: 'Calidad',
        checkCount: 10,
        checks: [
            { id: 1, title: 'Validación de calibración de básculas de precisión', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 2, title: 'Verificación de integridad de sellado térmico', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 3, title: 'Control de trazabilidad de lote de materia prima', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 4, title: 'Inspección visual de etiquetado y caducidad', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 5, title: 'Muestreo microbiológico de superficies', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 6, title: 'Control de temperatura en zona de envasado', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 7, title: 'Prueba de detección de metales en línea', status: 'PENDING', evidence: '', priority: 'high', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 8, title: 'Limpieza de filtros y conductos', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 9, title: 'Verificación de aire comprimido grado alimentario', status: 'PENDING', evidence: '', priority: 'medium', reviewed: false, updatedAt: new Date().toISOString() },
            { id: 10, title: 'Control de mermas y desperdicios', status: 'PENDING', evidence: '', priority: 'low', reviewed: false, updatedAt: new Date().toISOString() }
        ]
    }
];

const statuses = ['DRAFT', 'IN_PROGRESS', 'DONE', 'BLOCKED'];


/**
 * Funcion que devuelve un item aleatorio de una lista
 * @param array
 * @returns 
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Genera el estado de la auditoría y su progreso manteniendo la coherencia: 
 * DRAFT -> 0%, DONE -> 100%, IN_PROGRESS -> 1-99%
 */
const generateRandomStatus= () => {
    const status = getRandomElement(statuses);
    let progress = 0;
    if (status === 'DONE') progress = 100;
    else if (status === 'IN_PROGRESS' || status === 'BLOCKED') {
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
const generateAudits = (count) => {
    return Array.from({ length: count }, (_, i) => {
        const {status, progress} = generateRandomStatus();

        const process = getRandomElement(departments);

        return {
            id: `audit_${1001 + i}`,
            name: `Auditoría de ${process} Q${(i % 4) + 1}`,
            process: departments[i % departments.length],
            status: status,
            progress: progress,
            owner: {
                id: `u_${(i % departments.length) + 1}`,
                name: auditors[process.toLowerCase()] || 'Alfonso'
            },
            targetDate: generateLimitDate(),
            updatedAt: new Date().toISOString(),
            createdAt: generateRecentDate(),
            templateId: templates.filter((item) => item.process == process).reduce((acc, item) => item.id, ''),
        };
    });
};

