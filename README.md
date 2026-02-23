# Requisitos
- Entorno local con Nodejs versión 18x o superior
- Gestor de paquetes: npm

# Instalación
Instala las dependencias, ignorando warnings con:
```bash
# npm
npm install
```

## Ejecutar la aplicación en modo revisión
Ejecuta el servidor de desarrollo en `http://localhost:3000`:
```bash
# npm
npm run dev
```

Locally preview production build:
```bash
# npm
npm run preview
```

## API simulada
- En principio creé un mockup que genera datos aleatorios de prueba. Estos datos se generan una sola vez y luego se almacenan en el servidor Nitro. 
- El servidor Nitro es un servidor en memoria que usa Nuxtjs para guardar datos de manera temporal.
- La latencia se simula con una promesa, esto sirve para validar el estado de carga con skeletons y asegurar que la interfaz no se bloquee.
- Se genera un error aleatorio (probabilidad del 15%) para mostrar que la aplicación se puede recuperar de fallos de red mediante un patrón de "Retry"
- He usado un Record para que cada responsable se asocie en el mockup a un departamento y no lo hagan aleatoriamente.
- Con Nitro puedo guardar las nuevas auditorias que cree.

## Flujo esperado
- El usuario accede al panel principal donde se muestran las auditorias
- Puede navegar entre las diferentes páginas, si recarga el navegador se mantendrá en la página que estaba visualizando.
- La página que visita se muestra en la url por ejemplo: "?page=6"
- El usuario puede filtrar los resultados por el estado de progreso (Finalizados, en progreso y bloqueados), el filtro se muestra en la url: "status=blocked&page=1".
- En la página principal hay un botón para crear una nueva auditoría. Al pulsarlo le dirige al wizzard de dos pasos, que no se puede completar sin
rellenar los datos necesarios. 
- Al completar el paso 1 se pasa al paso dos que consiste en elegir una plantilla de auditoría. Al pulsar finalizar se redirige a la página de checklist
- En el checklist se muestra la información introducida por el usuario, en esta página tiene un botón que al pulsarlo simula la ejecución de la auditoría, la cual puede tener dos resultados "success" o "FAIL" con una probabilidad del 20% de que sea "fail".
- Si la ejecución de la auditoría falla se queda bloqueada, si la auditoriá es exitosa se marca como "done", al acceder al listado puede ver la nueva auditoría con su resultado.


## Diseño UI escogido
- Librería CSS: TailwindCSS. Lo he escogido porque me permite mayor flexibilidad de diseño e integración rápida con vue.
- Mi estilo preferido: Modern Enterprise UI (similar al de Material Design de Google)
- Botones con un tamaño mínimo
- Responsividad: en pantallas grandes se muestra un menú lateral y los datos en una tabla. en pantallas pequeñas el menú lateral se elimina y los datos 
se muestran en cards.

## Datos de prueba
- Al leer "Auditoría ISO 27001 - Compras" he deducido que se tratan de auditorías relativas a normas UNE o ISO así que he agregado algunas más
- He relacionado los departamentos con los responsables para que sea más creíble.
- 