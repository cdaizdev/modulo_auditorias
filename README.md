# Dashboard de gestión de auditorias
Plataforma para la gestión y seguimiento de procesos de auditoría por departamentos

## Stack tecnológico empleado
He decidido usar **Nuxt** 3 y **Vue 3** para realizar la aplicación, decidí usar este stack aunque no es mi
fuerte para demostrar mi adaptabilidad a diferentes tecnologías, aunque me ha resultado beneficioso tener una base sólida
en JavaScript nativo. 

Nuxt y Vue usan **TypeScript** lo que ayuda a garantizar la integridad de los datos en toda la aplicación.

Para generar los datos de prueba y garantizar su persistencia durante la ejecución de la aplicación he usado **Nitro**. Este motor de Nuxt 3 
me permite simular el comportamiento en producción de la API como latencia de red, generación de errores y cambios de estado.

He creado un archivo de gestión de variables de entorno **.env** para manejar desde un solo punto los requisitos de latencia, simulación de errores de red,
simulación de chequeos fallidos.

Para el diseño frontend he utilizado **Tailwindcss** ya que integra bastante bien con Vue y me permite diseñar el comportamiento responsivo fácilmente.

## API y gestión de estados
Los datos se generan mediante un mockup propio en *app/utils/mockdata.ts*. Aquí se definen los datos mínimos de las auditorías y se establecen relaciones fijas
para mantener la coherencia de los datos durante la ejecución de la aplicación.

La latencia del servidor y la probabilidad de errores de red simulado se configura en una sola función en */app/utils/network.ts*

La gestión de estados se realiza con un SSE propio creado en Nitro en *server/audits/[id]/stream.get.ts*. Este fue un punto complicado ya que tenía que conseguir que el servidor comunicase los cambios de estados de los checks mientras se ejecutaba la auditoría y que los datos se matengan incluso al cambiar de auditoría o realizar otros procesos.

El **SSE** (*Server-Sent Events*) el servidor envia los datos al cliente mediante una conexión HTTP abierta. Lo he probado incluso ejecutando a la vez varias auditorias y funciona. 
En principio, parece ser que esto se puede conseguir también con  **Pinia** que es el almacén de estados oficial de Vuejs y Nuxt, pero lo descubrí tarde así que
mantuve la solución del SSE.

## Diseño UX/UI
El estilo de frontend empleado es el conocido como **Modern Enterprise UI** que da un aspecto similar al de Material Design de Google y por lo que el usuario se puede sentir más familiarizado con su diseño.

Para manejar la responsividad en pantallas grandes se muestra un menú lateral y los datos en una tabla. En pantallas pequeñas el menú lateral se elimina y los datos 
se muestran en **cards**, de este modo es más fácil de leer los datos de cada autoría.

Mientras iba desarrollando el proyecto me encontré varios elementos que podía convertir en componentes de vue, como botones, barra de navegación, barras de progreso, 
etc. Seguramente muchos otros elementos se pueden aún convertir en componentes.

## Estructura de datos
Por sencillez se ha usado la siguiente estructura de datos.
- Auditorias: 
- Plantillas (templates):
- Relación auditorias - plantillas 

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

## Uso de IA
Para desarrollar esta aplicación se ha usado **Gemini AI**, en especial para generar de manera rápida las principales estructuras, el wizzard, la presentación, las tablas y cards. Igualmente ha requerido bastante trabajo de revisión del código, para conseguir la coherencia buscada en el dataset, separar un poco los componentes y funciones (tools o helpers) que pueden reutilizarse en varias partes del código, el desarrollo de un sistema de variables de entorno para controlar el comportamiento de la aplicación y garantizar una la interfaz atractiva y con suficiente espaciado, márgenes, con responsividad y con un comportamiento visual esperado. 

## Lo aprendido en este proyecto.
Este proyecto me ha permitido conocer un poco más el framework Vuejs + Nuxtjs, he aprendido lo que es el Server-sent que para pruebas está bien pero no debe usarse en producción por el riesgo de ataques DoS al mantener esas conexiones abiertas si no configuramos el servidor adecuadamente.

## Errores a corregir
- Audits no debe mostrar el listado de comprobaciones (checks)
- El estado de los checks se mantiene pero no aparecen asociados a la auditoría.

# Instalación y ejecución.
Para ejecutar la aplicación sólo se necesita 

# Requisitos
- Entorno local con Nodejs versión 18x o superior
- Gestor de paquetes: npm

## Instalación
Instala las dependencias:
```bash
# npm
npm install
```

## Ejecutar la aplicación en modo revisión
Construir el proyecto para su revisión:
```bash
# npm
npm run build
```

Generar el modo revisión
```bash
# npm
npm run preview
```