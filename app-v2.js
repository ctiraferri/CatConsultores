// App v2 — editorial
const { useState: useStateM, useEffect: useEffectM } = React;


function useReveal() {
  useEffectM(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Clock() {
  const [t, setT] = useStateM(new Date());
  useInterval(() => setT(new Date()), 1000);
  const hh = String((t.getUTCHours() - 3 + 24) % 24).padStart(2, '0');
  const mm = String(t.getMinutes()).padStart(2, '0');
  const ss = String(t.getSeconds()).padStart(2, '0');
  return <span className="clock">{hh}:{mm}:{ss} ART</span>;
}

function TopBar({ lang, setLang, t }) {
  return (
    <div className="topbar">
      <div className="status">
        <span><span className="dot"></span>{t.status[0]}</span>
        <span>{t.status[1]}</span>
        <Clock />
      </div>
      <div className="brand">CAT<span>.</span>Consultores</div>
      <div className="lang">
        <button data-active={lang === 'es'} onClick={() => setLang('es')}>ES</button>
        <button data-active={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      </div>
    </div>
  );
}

function Nav({ t }) {
  const ids = ['inicio','servicios','fuentes','desarrollos','filosofia','proceso','demo','contacto'];
  return (
    <nav className="nav">
      <ul>
        {t.nav.map((n, i) => <li key={i}><a href={`#${ids[i]}`}>{n}</a></li>)}
      </ul>
      <a href="#contacto" className="cta">{t.cta_nav} →</a>
    </nav>
  );
}

function SectionLabel({ parts }) {
  return (
    <div className="section-label">
      <span className="idx">{parts[0]}</span>
      <span>— {parts[1]}</span>
      <span className="meta">{parts[2]}</span>
    </div>
  );
}

function Services({ t }) {
  return (
    <section id="servicios">
      <SectionLabel parts={t.sectionLabels.svc} />
      <div className="services-grid">
        {t.services.map((s, i) => (
          <div key={i} className="service reveal">
            <div>
              <div className="svc-num">{s.num} / {t.sectionLabels.svc[2]}</div>
              <h3>{i === 1 ? <em>{s.title}</em> : s.title}</h3>
              <p>{s.body}</p>
            </div>
            <div className="svc-tags">
              {s.tags.map((tg, j) => <span key={j}>{tg}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sources({ t }) {
  return (
    <section id="fuentes">
      <SectionLabel parts={t.sectionLabels.src} />
      <div className="sources">
        <div className="sources-copy reveal">
          <h2>{t.sources.title.split(' ').slice(0, -2).join(' ')} <em>{t.sources.title.split(' ').slice(-2).join(' ')}</em></h2>
          <p>{t.sources.body}</p>
          <div className="count-block">
            <div className="count-num">{t.sources.count.replace('+', '')}<em>+</em></div>
            <div className="count-lbl">{t.sources.countLabel}</div>
          </div>
        </div>
        <div className="source-pool">
          {t.src_list.map((src, i) => (
            <div key={i} className="src reveal">
              <div className="src-id">SRC.{String(i + 1).padStart(2, '0')}</div>
              <div className="src-name">{src}</div>
              <div className="src-dot">connected</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STACK = ['React', 'Next.js', 'TypeScript', 'Node', 'Tailwind', 'Flask', 'FastAPI', 'PostgreSQL', 'MySQL', 'GraphQL', '.NET', 'Python', 'y más'];

function Desarrollos({ lang, t }) {
  const es = lang === 'es';
  const parts = t.sectionLabels.dev;
  return (
    <section id="desarrollos">
      <SectionLabel parts={parts} />
      <div className="desarrollos">
        <div className="des-left">
          <h2 className="reveal">
            {es ? <>Aplicativos que simplifican, <em>automatizan</em> y escalan.</>
                : <>Applications that simplify, <em>automate</em> and scale.</>}
          </h2>
          <p className="lede reveal">
            {es
              ? 'Desarrollamos software a medida con las mismas herramientas que usan los mejores equipos del mundo. Aplicativos web o de escritorio que reemplazan procesos manuales, eliminan fricciones y ponen a tu equipo a hacer lo que realmente importa.'
              : 'We build custom software with the same tools used by the world\'s best engineering teams. Web or desktop applications that replace manual processes, remove friction and let your team focus on what actually matters.'}
          </p>
          <div className="mvp-stat reveal">
            <div className="num">2–<em>4</em></div>
            <div className="lbl">
              <strong>{es ? 'Semanas · MVP' : 'Weeks · MVP'}</strong>
              {es ? <>De kickoff a producción.<br/>Iteraciones ágiles, entregas<br/>funcionales desde el día uno.</>
                  : <>From kickoff to production.<br/>Agile iterations, functional<br/>deliveries from day one.</>}
            </div>
          </div>
          <div className="stack reveal">
            <div style={{marginBottom:'10px', color:'var(--fg)', letterSpacing:'0.1em', fontFamily:'var(--font-mono)', fontSize:'11px'}}>STACK</div>
            <div className="stack-row">
              {STACK.map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </div>
        </div>

        <div className="des-right">
          <div className="des-card reveal">
            <div className="ix">{es ? '01 / VELOCIDAD' : '01 / SPEED'}</div>
            <h3>{es ? 'Entrega' : 'Delivery'}</h3>
            <p>{es
              ? 'MVP en 2 a 4 semanas. Iteramos con metodología ágil y entregas funcionales desde el día uno, no al final del proyecto.'
              : 'MVP in 2 to 4 weeks. We iterate with agile methodology and working deliverables from day one, not at the end of the project.'}</p>
            <div className="viz">
              <div className="sprint-viz">
                {[['SPRINT 1','100%'],['SPRINT 2','92%'],['SPRINT 3','78%'],['SPRINT 4','54%']].map(([label, pct], i) => (
                  <div key={i} className="sprint-row">
                    <span>{label}</span>
                    <div className="bar-wrap">
                      <div className={`bar-fill${i > 0 ? ` r${i+1}` : ''}`} style={{'--target': pct}}></div>
                    </div>
                    <span className="snum">{pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tags">
              {(es ? ['Ágil','MVP','Sprint'] : ['Agile','MVP','Sprint']).map((tg,i) => <span key={i}>{tg}</span>)}
            </div>
          </div>

          <div className="des-card reveal">
            <div className="ix">{es ? '02 / FLEXIBILIDAD' : '02 / FLEXIBILITY'}</div>
            <h3><em>{es ? 'Adaptación' : 'Adaptation'}</em></h3>
            <p>{es
              ? 'Construimos sobre tus procesos reales, no sobre plantillas genéricas. La solución crece y cambia junto con tu operación.'
              : 'We build on your real processes, not generic templates. The solution grows and evolves with your operation.'}</p>
            <div className="viz">
              <div className="adapt-viz">
                <div className="adapt-block"></div>
                <div className="adapt-block"></div>
                <div className="adapt-block"></div>
                <div className="adapt-block"></div>
              </div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--fg-dim)',letterSpacing:'0.08em',marginTop:10,display:'flex',justifyContent:'space-between'}}>
                <span>{es ? 'MÓDULOS' : 'MODULES'}</span>
                <span style={{color:'var(--accent)'}}>◆ {es ? 'ESCALABLE' : 'SCALABLE'}</span>
              </div>
            </div>
            <div className="tags">
              {(es ? ['A medida','Escalable','Sin lock-in'] : ['Custom','Scalable','No lock-in']).map((tg,i) => <span key={i}>{tg}</span>)}
            </div>
          </div>

          <div className="des-card reveal">
            <div className="ix">{es ? '03 / ECONOMÍA' : '03 / ECONOMY'}</div>
            <h3>{es ? 'Inversión' : 'Investment'}</h3>
            <p>{es
              ? 'Sin licencias perpetuas ni dependencia de proveedores. El código es tuyo desde el primer commit.'
              : 'No perpetual licenses or vendor dependency. The code is yours from the very first commit.'}</p>
            <div className="viz">
              <div className="cost-viz">
                <div className="cost-row-head">
                  <span className="cost-label accent">{es ? 'Código propio' : 'Your code'}</span>
                  <span>{es ? '$ fijo' : '$ fixed'}</span>
                </div>
                <div className="cost-bar yours"><span></span></div>
                <div className="cost-row-head" style={{marginTop:8}}>
                  <span className="cost-label">{es ? 'Licencias SaaS' : 'SaaS Licenses'}</span>
                  <span>{es ? '$ creciente' : '$ growing'}</span>
                </div>
                <div className="cost-bar"><span></span></div>
              </div>
            </div>
            <div className="tags">
              {(es ? ['Open source','Sin vendor','Código propio'] : ['Open source','No vendor','Your code']).map((tg,i) => <span key={i}>{tg}</span>)}
            </div>
          </div>

          <div className="ai-card reveal">
            <div className="ai-main">
              <div className="ai-icon"><span>✦</span></div>
              <div>
                <h4>{es ? <>Todo el poder de la IA, <em>a tu servicio.</em></> : <>The full power of AI, <em>at your service.</em></>}</h4>
                <p className="ai-sub">
                  {es
                    ? 'Integramos GPT, Claude y Gemini directamente en tus procesos. No como herramientas externas — como parte del sistema que construimos juntos.'
                    : 'We integrate GPT, Claude and Gemini directly into your processes. Not as external tools — as part of the system we build together.'}
                </p>
              </div>
            </div>
            <div className="ai-chips">
              {['ChatGPT','Claude','Gemini','+ Custom models'].map((m,i) => <span key={i}>{m}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy({ t }) {
  return (
    <section id="filosofia">
      <SectionLabel parts={t.sectionLabels.phi} />
      <div className="philosophy">
        <p className="quote reveal" dangerouslySetInnerHTML={{__html: t.philosophy.quote.replace(/class="hl"/g, 'style="font-style: italic; color: var(--accent);"').replace(/<span[^>]*>/, '<em>').replace('</span>', '</em>')}} />
        <div className="body reveal">
          {t.philosophy.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="principle-row">
          {t.philosophy.principles.map((p, i) => (
            <div key={i} className="principle reveal">
              <div className="pnum">{p.n}</div>
              <h4>{p.t}</h4>
              <p>{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ t }) {
  const [activeStep, setActiveStep] = useStateM(0);
  useEffectM(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % t.process.steps.length), 2600);
    return () => clearInterval(id);
  }, [t.process.steps.length]);

  const progress = ((activeStep + 1) / t.process.steps.length) * 100;
  return (
    <section id="proceso">
      <SectionLabel parts={t.sectionLabels.prc} />
      <div className="process">
        <div className="process-head">
          <h2 className="reveal">{t.process.title.split('.')[0].split(' ').slice(0, -1).join(' ')} <em>{t.process.title.split('.')[0].split(' ').slice(-1)}</em>.</h2>
          <p className="reveal">{t.process.body}</p>
        </div>
        <div className="timeline">
          <div className="timeline-progress" style={{width: `${progress}%`}} />
          <div className="timeline-steps">
            {t.process.steps.map((s, i) => (
              <div key={i} className="tstep reveal" data-active={i === activeStep} onMouseEnter={() => setActiveStep(i)}>
                <div className="tick" />
                <div className="week">{s.w}</div>
                <div className="num">{i === activeStep ? <em>{s.n}</em> : s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.b}</p>
                <div className="barrow">{s.arr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Demo({ t, accent }) {
  return (
    <section id="demo">
      <SectionLabel parts={t.sectionLabels.dmo} />
      <div className="demo">
        <div className="demo-head">
          <h2 className="reveal">{t.demo.title.split(' ').slice(0, -1).join(' ')} <em>{t.demo.title.split(' ').slice(-1)}</em></h2>
          <p className="reveal">{t.demo.body}</p>
        </div>
        <div className="reveal">
          <DashboardDemo t={t} accent={accent} />
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const [status, setStatus] = useStateM('idle'); // idle | sending | success | error
  const formRef = React.useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(formRef.current);
    try {
      const res = await fetch('https://formsubmit.co/ctiraferri@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject') || 'Contacto desde CAT Consultores',
          message: formData.get('message'),
          _captcha: 'false',
          _template: 'table'
        })
      });
      if (res.ok) { setStatus('success'); formRef.current.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  const msgStyle = {
    marginTop: 12, padding: '10px 14px', borderRadius: 2,
    fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em'
  };

  return (
    <section id="contacto">
      <SectionLabel parts={t.sectionLabels.cta} />
      <div className="contact">
        <div className="contact-left">
          <h2>{t.contact.h} <em>{t.contact.hMark}</em> {t.contact.h2}</h2>
          <div className="info">
            {t.contact.info.map((it, i) => (
              <div key={i}>
                <div className="k">{it.k}</div>
                <div className="v">{it.v}</div>
              </div>
            ))}
          </div>
        </div>
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <div className="two-col">
            <div className="field">
              <label>{t.contact.fields.name} *</label>
              <input name="name" type="text" required placeholder="María López" />
            </div>
            <div className="field">
              <label>{t.contact.fields.email} *</label>
              <input name="email" type="email" required placeholder="maria@empresa.com" />
            </div>
          </div>
          <div className="field">
            <label>{t.contact.fields.subject}</label>
            <input name="subject" type="text" placeholder="Dashboard de ventas / KPIs operativos..." />
          </div>
          <div className="field">
            <label>{t.contact.fields.message}</label>
            <textarea name="message" placeholder="Contanos qué preguntas del negocio necesitás responder..." />
          </div>
          <button type="submit" className="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : status === 'success' ? '✓ Enviado' : t.contact.submit + ' →'}
          </button>
          {status === 'success' && (
            <div style={{...msgStyle, background: 'rgba(169,184,199,0.12)', color: 'var(--accent)', border: '1px solid var(--accent)'}}>
              ¡Mensaje enviado! Te contactaremos pronto.
            </div>
          )}
          {status === 'error' && (
            <div style={{...msgStyle, background: 'rgba(224,120,86,0.12)', color: '#E07856', border: '1px solid #E07856'}}>
              Hubo un error. Intentá nuevamente o escribinos directamente.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer>
      <div>
        <div className="f-brand">CAT<span>.</span>Consultores</div>
        <p className="disclaimer">{t.footer.disclaimer}</p>
      </div>
      <div>
        <h5>{t.footer.linksH}</h5>
        <ul>
          <li><a href="#inicio">{t.nav[0]}</a></li>
          <li><a href="#servicios">{t.nav[1]}</a></li>
          <li><a href="#filosofia">{t.nav[4]}</a></li>
          <li><a href="#contacto">{t.nav[7]}</a></li>
        </ul>
      </div>
      <div>
        <h5>{t.footer.socialH}</h5>
        <ul>
          <li><a href="https://www.linkedin.com/in/catconsultores">LinkedIn ↗</a></li>
          <li><a href="mailto:hola@catconsultores.com.ar">hola@catconsultores.com.ar</a></li>
        </ul>
      </div>
      <div className="bottom">
        <span>{t.footer.copy}</span>
        <span>{t.footer.powerbi}</span>
      </div>
    </footer>
  );
}

function App() {
  const [lang, setLang] = useStateM(() => localStorage.getItem('cat2.lang') || 'es');
  const [heroVariant] = useStateM('A');

  useEffectM(() => { localStorage.setItem('cat2.lang', lang); }, [lang]);
  useReveal();

  const t = CONTENT[lang];

  return (
    <React.Fragment>
      <TopBar lang={lang} setLang={setLang} t={t} />
      <Nav t={t} />

      <section id="inicio">
        <SectionLabel parts={['01 / HERO', lang === 'es' ? 'VISUALIZAR TUS DATOS' : 'VISUALIZE YOUR DATA', 'VARIANT · A']} />
        <div className="hero">
          <HeroA t={t} lang={lang} />
        </div>
      </section>

      <Services t={t} />
      <Sources t={t} />
      <Desarrollos lang={lang} t={t} />
      <Philosophy t={t} />
      <Process t={t} />
      <Demo t={t} accent="#A9B8C7" />
      <Contact t={t} />
      <Footer t={t} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
