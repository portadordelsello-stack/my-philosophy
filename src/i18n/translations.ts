// translations.ts
// All scene text in Spanish and English.
// Every string used in the narrative is defined here.

export type Lang = 'es' | 'en';

export const translations = {
  hero: {
    thesis: {
      en: ['No.', "I don't start there.", 'Software starts long before code.'],
      es: ['No.', 'No empiezo por ahí.', 'El software comienza mucho antes del código.'],
    },
  },

  listening: {
    label: { en: 'User', es: 'Usuario' },
    subtitle: {
      en: 'Every project begins by listening.',
      es: 'Todo proyecto comienza escuchando.',
    },
  },

  thoughts: {
    phrases: {
      en: [
        'The workshop still uses paper.',
        'Technicians forget things.',
        'Customers keep calling.',
        'We lose track of equipment.',
        "Employees don't want another system.",
        'Everything depends on memory.',
        'No one knows who has what.',
        'The same questions every day.',
      ],
      es: [
        'El taller todavía usa papel.',
        'Los técnicos olvidan cosas.',
        'Los clientes siguen llamando.',
        'Perdemos el rastro del equipo.',
        'Los empleados no quieren otro sistema.',
        'Todo depende de la memoria.',
        'Nadie sabe quién tiene qué.',
        'Las mismas preguntas todos los días.',
      ],
    },
    label:   { en: 'Listening',                    es: 'Escuchando' },
    heading: { en: 'Before any solution,',         es: 'Antes de cualquier solución,' },
    sub:     { en: 'there is a world that speaks.', es: 'hay un mundo que habla.' },
  },

  priority: {
    words: {
      en: ['Problem', 'Process', 'People', 'Business', 'Technology'],
      es: ['Problema', 'Proceso', 'Personas', 'Negocio', 'Tecnología'],
    },
    caption: {
      en: 'Technology is always the last consideration.',
      es: 'La tecnología siempre es la última consideración.',
    },
  },

  workflow: {
    label:   { en: 'Understanding the work',               es: 'Entendiendo el trabajo' },
    heading: { en: 'The workflow already exists.',         es: 'El flujo de trabajo ya existe.' },
    sub:     { en: 'Software should serve it — not replace it.', es: 'El software debe servirlo — no reemplazarlo.' },
    nodes: {
      en: [
        { label: 'Receiving',  sub: 'Equipment arrives' },
        { label: 'Diagnosis',  sub: 'Problem identified' },
        { label: 'Quotation',  sub: 'Value defined' },
        { label: 'Approval',   sub: 'Decision made' },
        { label: 'Repair',     sub: 'Work begins' },
        { label: 'Delivery',   sub: 'Trust completed' },
      ],
      es: [
        { label: 'Recepción',   sub: 'Equipo llega' },
        { label: 'Diagnóstico', sub: 'Problema identificado' },
        { label: 'Cotización',  sub: 'Valor definido' },
        { label: 'Aprobación',  sub: 'Decisión tomada' },
        { label: 'Reparación',  sub: 'Trabajo inicia' },
        { label: 'Entrega',     sub: 'Confianza cumplida' },
      ],
    },
  },

  people: {
    heading: { en: 'Software connects people.', es: 'El software conecta personas.' },
    sub:     { en: 'Not screens.',              es: 'No pantallas.' },
    roles: {
      en: ['Customer', 'Administrator', 'Technician', 'Logistics'],
      es: ['Cliente',  'Administrador', 'Técnico',    'Logística'],
    },
  },

  product: {
    label:   { en: 'Product.', es: 'Producto.' },
    sub:     { en: 'Not software.', es: 'No software.' },
    lines: {
      en: ['Design before programming.', "Don't build features.", 'Solve problems.'],
      es: ['Diseño antes de programar.', 'No construyas funciones.', 'Resuelve problemas.'],
    },
  },

  code: {
    caption:   { en: 'Only now, does code appear.', es: 'Solo ahora, aparece el código.' },
    functions: {
      en: [
        { name: 'listen()',      comment: '// understand the world' },
        { name: 'understand()',  comment: '// map what matters' },
        { name: 'model()',       comment: '// find the structure' },
        { name: 'design()',      comment: '// define the experience' },
        { name: 'build()',       comment: '// code with purpose' },
        { name: 'deploy()',      comment: '// deliver value' },
        { name: 'learn()',       comment: '// listen again' },
        { name: 'iterate()',     comment: '// never stop' },
      ],
      es: [
        { name: 'escuchar()',    comment: '// entender el mundo' },
        { name: 'comprender()', comment: '// mapear lo que importa' },
        { name: 'modelar()',     comment: '// encontrar la estructura' },
        { name: 'diseñar()',     comment: '// definir la experiencia' },
        { name: 'construir()',   comment: '// código con propósito' },
        { name: 'desplegar()',   comment: '// entregar valor' },
        { name: 'aprender()',    comment: '// volver a escuchar' },
        { name: 'iterar()',      comment: '// nunca parar' },
      ],
    },
  },

  technology: {
    caption: {
      en: 'Technology serves the product. Not the opposite.',
      es: 'La tecnología sirve al producto. No al revés.',
    },
  },

  flowAlive: {
    heading: { en: 'Everything flows.',             es: 'Todo fluye.' },
    sub:     { en: 'Nothing breaks. Nothing waits.', es: 'Nada se rompe. Nada espera.' },
    caption: { en: 'The visitor should feel harmony.', es: 'El visitante debe sentir armonía.' },
    roles: {
      en: ['Customer', 'Administrator', 'Technician', 'Logistics', 'Customer'],
      es: ['Cliente',  'Administrador', 'Técnico',    'Logística',  'Cliente'],
    },
  },

  feedback: {
    heading: { en: 'Software evolves.', es: 'El software evoluciona.' },
    sub:     { en: 'It never ends.',    es: 'Nunca termina.' },
    v1:      { en: 'v1.0',             es: 'v1.0' },
    v2:      { en: 'v2.0',             es: 'v2.0' },
    learning:{ en: 'learning',         es: 'aprendizaje' },
    feedbackLoop: { en: 'Feedback loop', es: 'Ciclo de retroalimentación' },
    nodes: {
      v1: {
        en: ['Receiving', 'Diagnosis', 'Quotation', 'Approval', 'Repair', 'Delivery'],
        es: ['Recepción', 'Diagnóstico', 'Cotización', 'Aprobación', 'Reparación', 'Entrega'],
      },
      v2: {
        en: ['Intake', 'Triage', 'Estimate', 'Auth', 'Build', 'Ship', 'Notify'],
        es: ['Ingreso', 'Triaje', 'Estimado', 'Auth', 'Construir', 'Enviar', 'Notificar'],
      },
    },
  },

  comparison: {
    heading: { en: 'Two ways to start.',      es: 'Dos formas de empezar.' },
    sub:     { en: 'One collapses. One compounds.', es: 'Una colapsa. La otra crece.' },
    wrong:   { en: 'Most software',           es: 'La mayoría del software' },
    right:   { en: 'My process',              es: 'Mi proceso' },
    wrongPath: {
      en: ['Framework', 'Code', 'Application', 'User'],
      es: ['Framework', 'Código', 'Aplicación', 'Usuario'],
    },
    rightPath: {
      en: ['User', 'Process', 'Problem', 'Discovery', 'Product', 'Software', 'Feedback', 'Iteration'],
      es: ['Usuario', 'Proceso', 'Problema', 'Descubrimiento', 'Producto', 'Software', 'Retroalimentación', 'Iteración'],
    },
  },

  philosophy: {
    sentences: {
      en: [
        { a: "I don't build screens.",      b: null },
        { a: 'I build processes.',          b: null },
        { a: "I don't sell software.",      b: null },
        { a: 'I solve problems.',           b: null },
        { a: "I don't start with React.",   b: null },
        { a: 'I start with people.',        b: null },
        { a: "I don't write code",          b: 'to create products.' },
        { a: 'I write code',                b: 'to improve how people work.' },
      ],
      es: [
        { a: 'No construyo pantallas.',           b: null },
        { a: 'Construyo procesos.',               b: null },
        { a: 'No vendo software.',                b: null },
        { a: 'Resuelvo problemas.',               b: null },
        { a: 'No empiezo con React.',             b: null },
        { a: 'Empiezo con personas.',             b: null },
        { a: 'No escribo código',                 b: 'para crear productos.' },
        { a: 'Escribo código',                    b: 'para mejorar cómo trabajan las personas.' },
      ],
    },
  },

  final: {
    closing: {
      en: [
        { text: 'The best software',          size: 'large', color: 'rgba(255,255,255,0.9)',  delay: 0.2 },
        { text: 'is not born from code.',     size: 'large', color: 'rgba(255,255,255,0.55)', delay: 1.0 },
        { text: 'It is born',                 size: 'large', color: 'rgba(255,255,255,0.75)', delay: 2.2 },
        { text: 'from understanding people.', size: 'large', color: 'rgba(255,255,255,0.9)',  delay: 3.0 },
        { text: 'The technology',             size: 'small', color: 'rgba(255,255,255,0.3)',  delay: 4.4 },
        { text: 'is only the medium.',        size: 'small', color: 'rgba(255,255,255,0.2)',  delay: 5.0 },
      ],
      es: [
        { text: 'El mejor software',          size: 'large', color: 'rgba(255,255,255,0.9)',  delay: 0.2 },
        { text: 'no nace del código.',        size: 'large', color: 'rgba(255,255,255,0.55)', delay: 1.0 },
        { text: 'Nace',                       size: 'large', color: 'rgba(255,255,255,0.75)', delay: 2.2 },
        { text: 'de entender a las personas.', size: 'large', color: 'rgba(255,255,255,0.9)', delay: 3.0 },
        { text: 'La tecnología',              size: 'small', color: 'rgba(255,255,255,0.3)',  delay: 4.4 },
        { text: 'es solo el medio.',          size: 'small', color: 'rgba(255,255,255,0.2)',  delay: 5.0 },
      ],
    },
    chain: {
      en: ['User', 'Process', 'Product', 'Software', 'Learning', 'Iteration'],
      es: ['Usuario', 'Proceso', 'Producto', 'Software', 'Aprendizaje', 'Iteración'],
    },
  },
} as const;

export type Translations = typeof translations;
