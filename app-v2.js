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
  const ids = ['inicio','servicios','fuentes','filosofia','proceso','demo','contacto'];
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
          <li><a href="#filosofia">{t.nav[3]}</a></li>
          <li><a href="#contacto">{t.nav[6]}</a></li>
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
      <Philosophy t={t} />
      <Process t={t} />
      <Demo t={t} accent="#A9B8C7" />
      <Contact t={t} />
      <Footer t={t} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
