// Content dictionary: ES + EN
window.CONTENT = {
  es: {
    nav: ['INICIO', 'SERVICIOS', 'FUENTES', 'FILOSOFÍA', 'PROCESO', 'DEMO', 'CONTACTO'],
    cta_nav: 'EMPEZAR',
    status: ['SISTEMA OPERATIVO', 'BUENOS AIRES / AR', 'DATA STREAM'],
    hero: {
      eyebrow: 'CAT CONSULTORES / DESDE 2015 / POWER BI',
      line1: 'De los datos',
      line2: 'crudos',
      line3: 'a decisiones',
      line4: 'que mueven',
      line5: 'el negocio.',
      strike: 'planillas',
      sub: 'Consultoría en visualización de datos para empresas que están cansadas de mirar planillas y quieren empezar a leer su negocio en tiempo real. Convertimos tus fuentes dispersas en un sistema único, vivo y accionable.',
      cta_primary: 'HABLEMOS',
      cta_secondary: 'VER PROCESO',
      stats: [
        ['11', 'AÑOS OPERANDO'],
        ['50+', 'TABLEROS DESPLEGADOS'],
        ['12', 'FUENTES INTEGRABLES'],
        ['< 4 SEM', 'TIEMPO A PRODUCCIÓN']
      ]
    },
    sectionLabels: {
      svc: ['02 / SERVICIOS', 'QUÉ HACEMOS', 'TRES DISCIPLINAS'],
      src: ['03 / FUENTES', 'DE DÓNDE VIENEN LOS DATOS', '12+ INTEGRACIONES'],
      phi: ['04 / FILOSOFÍA', 'CÓMO PENSAMOS', 'MEJORA CONTINUA'],
      prc: ['05 / PROCESO', 'CÓMO TRABAJAMOS', '5 FASES / ~4 SEMANAS'],
      dmo: ['06 / DEMO', 'JUGÁ CON LOS DATOS', 'INTERACTIVO'],
      cta: ['07 / CONTACTO', 'HABLEMOS', 'CABA · ARG']
    },
    services: [
      {
        num: '01',
        title: 'Relevamiento',
        body: 'Relevamos todos los medios a tu alcance para capturar los datos relevantes para tu información. Entrevistas, auditoría de fuentes, mapeo de flujos.',
        tags: ['Entrevistas', 'Auditoría', 'Mapeo de fuentes', 'Diagnóstico']
      },
      {
        num: '02',
        title: 'Diseño',
        body: 'Diseñamos visualizaciones de reportes y KPIs para que extraigas el valor real de tus datos. Cada gráfico existe por una razón: responder una pregunta del negocio.',
        tags: ['Dashboards', 'KPIs', 'Reportes', 'Data storytelling']
      },
      {
        num: '03',
        title: 'Mejora continua',
        body: 'No terminamos cuando se entrega. Seguimos con vos iterando tu tablero en sincronía con cómo evoluciona tu negocio. Todo tablero es un organismo vivo.',
        tags: ['Iteración', 'Capacitación', 'Soporte', 'Evolución']
      }
    ],
    sources: {
      title: 'Todos tus datos. Una sola verdad.',
      body: 'No importa dónde vivan los números: planillas en OneDrive, un ERP vetusto, la API de tu ecommerce o la última campaña en redes. Los ordenamos, los relacionamos y los transformamos en información vital.',
      count: '12+',
      countLabel: 'fuentes integrables'
    },
    src_list: ['Excel', 'SQL Server', 'MySQL', 'PostgreSQL', 'Google Analytics', 'Meta Ads', 'Google Sheets', 'SharePoint', 'CSV / TXT', 'APIs REST', 'Web scraping', 'Dataverse'],
    philosophy: {
      quote: 'Pensamos que la mejora continua es la <span class="hl">única</span> forma de mejora.',
      body: [
        'Entendemos las organizaciones como un conjunto de personas en constante colaboración, brindando sus saberes, competencias, pasiones y voluntad.',
        'Brindamos las herramientas —formularios, bases de datos, servidores, reportes— para que los actores clave desarrollen el pensamiento crítico necesario para evaluar y decidir.',
        'Nos enfocamos en trabajo en equipo, análisis de condiciones, recursos y medios: información que mejora el conocimiento y por consiguiente impulsa el desarrollo.'
      ],
      principles: [
        { n: 'P.01', t: 'Personas primero', b: 'Los datos no deciden. Las personas deciden con datos.' },
        { n: 'P.02', t: 'Una sola verdad', b: 'Un tablero, una fuente consolidada. Fin de los debates sobre qué número es el correcto.' },
        { n: 'P.03', t: 'Preguntas antes que gráficos', b: 'Diseñamos cada visual respondiendo una pregunta concreta del negocio.' },
        { n: 'P.04', t: 'Iteración infinita', b: 'Ningún tablero queda "terminado". Evolucionan con el negocio.' }
      ]
    },
    process: {
      title: 'De kickoff a producción en ~4 semanas.',
      body: 'Un proceso probado, medible, con entregables en cada fase. No desaparecemos después del kickoff.',
      steps: [
        { w: 'SEM 01', n: '01', t: 'Descubrir', b: 'Entrevistas con stakeholders. Qué preguntas necesita responder el negocio.', arr: 'PREGUNTAS →' },
        { w: 'SEM 01-02', n: '02', t: 'Mapear', b: 'Auditoría de fuentes de datos. Calidad, frecuencia, acceso, limpieza.', arr: 'FUENTES →' },
        { w: 'SEM 02-03', n: '03', t: 'Modelar', b: 'Modelo de datos unificado. Relaciones, medidas DAX, jerarquías.', arr: 'MODELO →' },
        { w: 'SEM 03', n: '04', t: 'Visualizar', b: 'Diseño de tableros. KPIs, gráficos, interactividad, drill-down.', arr: 'TABLERO →' },
        { w: 'SEM 04+', n: '05', t: 'Iterar', b: 'Capacitación al equipo. Ajustes semanales. Mejora continua.', arr: 'CICLO ↻' }
      ]
    },
    demo: {
      title: 'Un tablero vivo. Tocalo.',
      body: 'No una captura de pantalla. Un tablero real. Cambiá los filtros, alterná vistas, mirá cómo todo se recalcula.',
      tabs: ['VENTAS', 'OPERACIONES', 'MARKETING'],
      filters: {
        period: 'PERÍODO',
        periods: ['7D', '30D', '90D', 'YTD', 'ALL'],
        region: 'REGIÓN',
        regions: ['AR', 'BR', 'CL', 'MX', 'UY'],
        segment: 'SEGMENTO',
        segments: ['Retail', 'Mayorista', 'E-commerce', 'B2B']
      },
      kpis: {
        rev: 'Ingresos totales',
        deals: 'Operaciones cerradas',
        avg: 'Ticket promedio',
        conv: 'Tasa de conversión'
      },
      chartTitle: 'TENDENCIA · INGRESOS',
      barTitle: 'INGRESOS POR SEGMENTO',
      insightsHeader: 'INSIGHTS AUTOMÁTICOS',
      insights: [
        { t: 'ALERTA', b: 'Conversión cayó 12% vs. semana pasada en el segmento Retail.' },
        { t: 'OPORTUNIDAD', b: 'E-commerce AR superó su proyección mensual en día 18.' },
        { t: 'PATRÓN', b: 'Los martes concentran el 23% de las operaciones semanales.' }
      ]
    },
    contact: {
      h: 'Queremos',
      hMark: 'saber',
      h2: 'de vos.',
      fields: { name: 'Nombre', email: 'Email', subject: 'Asunto', message: 'Tu desafío' },
      submit: 'ENVIAR MENSAJE',
      info: [
        { k: 'Ubicación', v: 'Caballito · CABA · Argentina' },
        { k: 'LinkedIn', v: 'linkedin.com/in/catconsultores' },
        { k: 'Horario', v: 'Lun a Vie · 10:00 – 19:00 ART' }
      ]
    },
    footer: {
      disclaimer: 'Por políticas de confidencialidad y resguardo de la información, CAT Consultores se abstiene de mencionar clientes particulares o empresas que hayan contratado nuestros servicios.',
      linksH: 'NAVEGACIÓN',
      socialH: 'CONECTAR',
      copy: '© 2015–2026 CAT Consultores · César Augusto Tiraferri',
      powerbi: 'Power BI es marca registrada de Microsoft.'
    }
  },
  en: {
    nav: ['HOME', 'SERVICES', 'SOURCES', 'PHILOSOPHY', 'PROCESS', 'DEMO', 'CONTACT'],
    cta_nav: 'START',
    status: ['SYSTEM OPERATIONAL', 'BUENOS AIRES / AR', 'DATA STREAM'],
    hero: {
      eyebrow: 'CAT CONSULTORES / SINCE 2015 / POWER BI',
      line1: 'From raw',
      line2: 'data',
      line3: 'to decisions',
      line4: 'that move',
      line5: 'the business.',
      strike: 'spreadsheets',
      sub: 'Data visualization consultancy for companies tired of staring at spreadsheets and ready to read their business in real time. We turn scattered sources into a single, living, actionable system.',
      cta_primary: 'LET\'S TALK',
      cta_secondary: 'SEE PROCESS',
      stats: [
        ['11', 'YEARS OPERATING'],
        ['50+', 'DASHBOARDS SHIPPED'],
        ['12', 'INTEGRABLE SOURCES'],
        ['< 4 WK', 'TIME TO PROD']
      ]
    },
    sectionLabels: {
      svc: ['02 / SERVICES', 'WHAT WE DO', 'THREE DISCIPLINES'],
      src: ['03 / SOURCES', 'WHERE YOUR DATA LIVES', '12+ INTEGRATIONS'],
      phi: ['04 / PHILOSOPHY', 'HOW WE THINK', 'CONTINUOUS IMPROVEMENT'],
      prc: ['05 / PROCESS', 'HOW WE WORK', '5 PHASES / ~4 WEEKS'],
      dmo: ['06 / DEMO', 'PLAY WITH THE DATA', 'INTERACTIVE'],
      cta: ['07 / CONTACT', 'LET\'S TALK', 'CABA · ARG']
    },
    services: [
      {
        num: '01',
        title: 'Discovery',
        body: 'We survey every channel at your disposal to capture the data that actually matters. Stakeholder interviews, source audits, flow mapping.',
        tags: ['Interviews', 'Audit', 'Source mapping', 'Diagnosis']
      },
      {
        num: '02',
        title: 'Design',
        body: 'We design report visualizations and KPIs so you extract real value from your data. Every chart exists for a reason — to answer a business question.',
        tags: ['Dashboards', 'KPIs', 'Reports', 'Data storytelling']
      },
      {
        num: '03',
        title: 'Continuous',
        body: 'We don\'t disappear at delivery. We keep iterating your dashboard in sync with how your business evolves. Every dashboard is a living organism.',
        tags: ['Iteration', 'Training', 'Support', 'Evolution']
      }
    ],
    sources: {
      title: 'All your data. One single truth.',
      body: 'It doesn\'t matter where the numbers live — a OneDrive spreadsheet, a legacy ERP, your ecommerce API, or last week\'s ad campaign. We order, relate, and transform them into vital information.',
      count: '12+',
      countLabel: 'integrable sources'
    },
    src_list: ['Excel', 'SQL Server', 'MySQL', 'PostgreSQL', 'Google Analytics', 'Meta Ads', 'Google Sheets', 'SharePoint', 'CSV / TXT', 'REST APIs', 'Web scraping', 'Dataverse'],
    philosophy: {
      quote: 'We think continuous improvement is the <span class="hl">only</span> kind of improvement.',
      body: [
        'We see organizations as groups of people in constant collaboration, sharing their knowledge, skills, passions and will.',
        'We provide the tools — forms, databases, servers, reports — so key players in your organization can develop the critical thinking needed to evaluate and decide.',
        'We focus on teamwork, analysis of conditions, resources and means: information that improves knowledge and therefore drives development.'
      ],
      principles: [
        { n: 'P.01', t: 'People first', b: 'Data does not decide. People decide, with data.' },
        { n: 'P.02', t: 'Single source of truth', b: 'One dashboard, one consolidated source. End of arguments over which number is right.' },
        { n: 'P.03', t: 'Questions before charts', b: 'We design every visual to answer one concrete business question.' },
        { n: 'P.04', t: 'Infinite iteration', b: 'No dashboard is ever "done". They evolve with the business.' }
      ]
    },
    process: {
      title: 'From kickoff to production in ~4 weeks.',
      body: 'A proven, measurable process with deliverables at every phase. We don\'t vanish after the kickoff call.',
      steps: [
        { w: 'WK 01', n: '01', t: 'Discover', b: 'Stakeholder interviews. What questions does the business need answered?', arr: 'QUESTIONS →' },
        { w: 'WK 01-02', n: '02', t: 'Map', b: 'Data source audit. Quality, frequency, access, cleanliness.', arr: 'SOURCES →' },
        { w: 'WK 02-03', n: '03', t: 'Model', b: 'Unified data model. Relationships, DAX measures, hierarchies.', arr: 'MODEL →' },
        { w: 'WK 03', n: '04', t: 'Visualize', b: 'Dashboard design. KPIs, charts, interactivity, drill-down.', arr: 'BOARD →' },
        { w: 'WK 04+', n: '05', t: 'Iterate', b: 'Team training. Weekly tweaks. Continuous improvement.', arr: 'LOOP ↻' }
      ]
    },
    demo: {
      title: 'A live dashboard. Touch it.',
      body: 'Not a screenshot. A real dashboard. Change filters, switch views, watch everything recalculate.',
      tabs: ['SALES', 'OPERATIONS', 'MARKETING'],
      filters: {
        period: 'PERIOD',
        periods: ['7D', '30D', '90D', 'YTD', 'ALL'],
        region: 'REGION',
        regions: ['AR', 'BR', 'CL', 'MX', 'UY'],
        segment: 'SEGMENT',
        segments: ['Retail', 'Wholesale', 'E-commerce', 'B2B']
      },
      kpis: {
        rev: 'Total revenue',
        deals: 'Deals closed',
        avg: 'Avg. ticket',
        conv: 'Conversion rate'
      },
      chartTitle: 'TREND · REVENUE',
      barTitle: 'REVENUE BY SEGMENT',
      insightsHeader: 'AUTOMATED INSIGHTS',
      insights: [
        { t: 'ALERT', b: 'Conversion down 12% vs. last week in the Retail segment.' },
        { t: 'OPPORTUNITY', b: 'AR e-commerce beat its monthly projection on day 18.' },
        { t: 'PATTERN', b: 'Tuesdays concentrate 23% of all weekly operations.' }
      ]
    },
    contact: {
      h: 'We want',
      hMark: 'to hear',
      h2: 'from you.',
      fields: { name: 'Name', email: 'Email', subject: 'Subject', message: 'Your challenge' },
      submit: 'SEND MESSAGE',
      info: [
        { k: 'Location', v: 'Caballito · BA · Argentina' },
        { k: 'LinkedIn', v: 'linkedin.com/in/catconsultores' },
        { k: 'Hours', v: 'Mon–Fri · 10:00 – 19:00 ART' }
      ]
    },
    footer: {
      disclaimer: 'Out of confidentiality and information-protection policies, CAT Consultores does not disclose the names of specific clients or companies that have retained our services.',
      linksH: 'NAVIGATION',
      socialH: 'CONNECT',
      copy: '© 2015–2026 CAT Consultores · César Augusto Tiraferri',
      powerbi: 'Power BI is a registered trademark of Microsoft.'
    }
  }
};
