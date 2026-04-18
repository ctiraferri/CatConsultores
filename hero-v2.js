// Hero v2 — editorial collage with living cards
const { useState, useEffect, useRef, useMemo } = React;

function useInterval(cb, ms) {
  useEffect(() => { const t = setInterval(cb, ms); return () => clearInterval(t); }, [ms]);
}

function useLiveSeries(n = 40, start = 50, drift = 4) {
  const [series, setSeries] = useState(() => {
    const out = []; let v = start;
    for (let i = 0; i < n; i++) { v += (Math.random() - 0.5) * drift; out.push(Math.max(5, v)); }
    return out;
  });
  useInterval(() => {
    setSeries(s => {
      let v = s[s.length - 1] + (Math.random() - 0.5) * drift;
      v = Math.max(5, Math.min(120, v));
      return [...s.slice(1), v];
    });
  }, 1400);
  return series;
}

function Sparkline({ data, w = 240, h = 60, stroke = 'var(--accent)', fill = true }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return [x, y];
  });
  // Smoothed path using cubic bezier
  let d = '';
  pts.forEach((p, i) => {
    if (i === 0) d += `M ${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    else {
      const prev = pts[i-1];
      const cx1 = prev[0] + (p[0] - prev[0]) / 2;
      const cy1 = prev[1];
      const cx2 = prev[0] + (p[0] - prev[0]) / 2;
      const cy2 = p[1];
      d += ` C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    }
  });
  const fillD = d + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {fill && <path d={fillD} className="sparkline-fill" />}
      <path d={d} className="sparkline-path" style={{ stroke }} />
    </svg>
  );
}

function BarMini({ data, w = 240, h = 60, highlight = -1 }) {
  const max = Math.max(...data) || 1;
  const bw = w / data.length - 2;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {data.map((v, i) => {
        const bh = (v / max) * (h - 4);
        return <rect key={i} x={i * (bw + 2)} y={h - bh} width={bw} height={bh} rx="1"
          className={`bar ${i === highlight ? 'hi' : ''}`} />;
      })}
    </svg>
  );
}

function useCounter(target, duration = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let f, start;
    const step = t => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) f = requestAnimationFrame(step);
    };
    f = requestAnimationFrame(step);
    return () => cancelAnimationFrame(f);
  }, [target, duration]);
  return v;
}

function fmt(n, d = 0) { return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }

function Donut({ value, segments }) {
  // value 0-100, donut with segments
  const r = 46;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" style={{maxHeight: 180}}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--rule)" strokeWidth="8" />
      {segments.map((s, i) => {
        const len = (s.v / 100) * c;
        const dash = `${len} ${c - len}`;
        const el = (
          <circle key={i} cx="60" cy="60" r={r} fill="none"
            stroke={i === 0 ? 'var(--accent)' : i === 1 ? 'var(--fg)' : 'var(--fg-faint)'}
            strokeWidth="8"
            strokeDasharray={dash}
            strokeDashoffset={-offset}
            transform="rotate(-90 60 60)"
            style={{transition: 'stroke-dasharray 0.6s, stroke-dashoffset 0.6s'}}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function LiveFeed({ lang }) {
  const actions = lang === 'es'
    ? { order: 'Nuevo pedido', refund: 'Reembolso', upsell: 'Upsell' }
    : { order: 'New order', refund: 'Refund', upsell: 'Upsell' };
  const [rows, setRows] = useState([
    { id: 'TX-84219', t: actions.order, v: '+$2,340' },
    { id: 'TX-84218', t: actions.refund, v: '-$410', down: true },
    { id: 'TX-84217', t: actions.order, v: '+$1,890' },
    { id: 'TX-84216', t: actions.upsell, v: '+$680' },
  ]);
  useEffect(() => {
    setRows([
      { id: 'TX-84219', t: actions.order, v: '+$2,340' },
      { id: 'TX-84218', t: actions.refund, v: '-$410', down: true },
      { id: 'TX-84217', t: actions.order, v: '+$1,890' },
      { id: 'TX-84216', t: actions.upsell, v: '+$680' },
    ]);
  }, [lang]);
  useInterval(() => {
    const id = 'TX-' + Math.floor(80000 + Math.random() * 9999);
    const r = Math.random();
    const isDown = r < 0.2;
    const isUp = r > 0.75 && !isDown;
    const amt = Math.floor(Math.random() * 4000 + 100);
    const t = isDown ? actions.refund : isUp ? actions.upsell : actions.order;
    setRows(rs => [{ id, t, v: (isDown ? '-' : '+') + '$' + amt.toLocaleString(), down: isDown }, ...rs].slice(0, 4));
  }, 2800);

  return (
    <div>
      <div className="c-tag" style={{marginBottom: 12}}>
        <span>{lang === 'es' ? 'ACTIVIDAD EN VIVO' : 'LIVE ACTIVITY'}</span>
        <span className="id">[FEED]</span>
      </div>
      <div>
        {rows.map((r, i) => (
          <div key={r.id + i} className="feed-row">
            <span className="f-id">{r.id}</span>
            <span className="f-t">{r.t}</span>
            <span className={`f-v ${r.down ? 'down' : ''}`}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroA({ t, lang }) {
  const s1 = useLiveSeries(40, 60, 5);
  const [val1, setVal1] = useState(142836);
  const [val2, setVal2] = useState(87.4);
  const [delta1, setDelta1] = useState(12.4);
  const [donutSegs, setDonutSegs] = useState([
    { v: 42 }, { v: 31 }, { v: 27 }
  ]);

  useInterval(() => {
    setVal1(v => v + Math.round((Math.random() - 0.35) * 120));
    setVal2(v => Math.max(70, Math.min(95, v + (Math.random() - 0.5) * 0.8)));
    setDelta1(d => Math.max(-5, Math.min(20, d + (Math.random() - 0.5) * 0.3)));
  }, 1500);

  useInterval(() => {
    setDonutSegs(s => {
      const jiggle = s.map(x => ({ v: Math.max(10, x.v + (Math.random() - 0.5) * 3) }));
      const total = jiggle.reduce((a, b) => a + b.v, 0);
      return jiggle.map(x => ({ v: (x.v / total) * 100 }));
    });
  }, 3200);

  const sources = t.src_list.slice(0, 3);

  return (
    <div className="hero-grid">
      <div className="hero-left">
        <div>
          <div className="hero-eyebrow">{t.hero.eyebrow}</div>
          <h1>
            {t.hero.line1} <span className="outline">{t.hero.strike}</span><br/>
            <em>{t.hero.line3}</em>{' '}{t.hero.line4}<br/>
            {t.hero.line5}
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-cta-row">
            <a href="#contacto" className="hero-cta primary">{t.hero.cta_primary} →</a>
            <a href="#proceso" className="hero-cta">{t.hero.cta_secondary}</a>
          </div>
        </div>
        <div className="hero-stats">
          {t.hero.stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="num">{i === 1 ? <em>{s[0]}</em> : s[0]}</div>
              <div className="lbl">{s[1]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-collage">
          <div className="card kpi-1">
            <div className="c-tag">
              <span>{lang === 'es' ? 'INGRESOS · MTD' : 'REVENUE · MTD'}</span>
              <span className="id">K.01</span>
            </div>
            <div className="c-val">$<em>{fmt(val1)}</em></div>
            <div className={`c-delta ${delta1 < 0 ? 'down' : ''}`}>
              {delta1 >= 0 ? '↗' : '↘'} {Math.abs(delta1).toFixed(1)}% {lang === 'es' ? 'vs mes anterior' : 'vs last month'}
            </div>
          </div>

          <div className="card kpi-2">
            <div className="c-tag">
              <span>{lang === 'es' ? 'TASA CONVERSIÓN' : 'CONVERSION RATE'}</span>
              <span className="id">K.02</span>
            </div>
            <div className="c-val">{val2.toFixed(1)}<em>%</em></div>
            <div className="c-delta">↗ 2.1 pp · {lang === 'es' ? 'tendencia positiva' : 'positive trend'}</div>
          </div>

          <div className="card chart-main">
            <div className="c-tag">
              <span>{lang === 'es' ? 'INGRESOS NETOS · 40 DÍAS' : 'NET REVENUE · 40 DAYS'}</span>
              <span className="id">C.01</span>
            </div>
            <div className="chart-body">
              <Sparkline data={s1} w={600} h={180} />
            </div>
          </div>

          <div className="card donut">
            <div className="c-tag">
              <span>{lang === 'es' ? 'CANALES' : 'CHANNELS'}</span>
              <span className="id">C.02</span>
            </div>
            <div style={{position: 'relative', marginTop: 8, height: 'calc(100% - 24px)'}}>
              <Donut segments={donutSegs} />
              <div className="ring-label">
                <div className="num">{Math.round(donutSegs[0].v)}<em style={{fontStyle:'italic', color:'var(--accent)'}}>%</em></div>
                <div className="lbl">{sources[0]}</div>
              </div>
            </div>
          </div>

          <div className="card feed">
            <LiveFeed lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroB({ t, lang }) {
  const marqueeItems = useMemo(() => {
    const labels = lang === 'es'
      ? ['ingresos', 'conversión', 'operaciones', 'ticket promedio', 'retención', 'usuarios activos', 'NPS', 'ROAS', 'pedidos', 'ciclo de ventas']
      : ['revenue', 'conversion', 'operations', 'avg ticket', 'retention', 'active users', 'NPS', 'ROAS', 'orders', 'sales cycle'];
    return labels;
  }, [lang]);

  return (
    <div className="hero-b">
      <div>
        <div className="hero-eyebrow" style={{marginBottom: 28}}>{t.hero.eyebrow}</div>
        <h1>
          {t.hero.line1} <span className="outline">{t.hero.strike}</span><br/>
          <em>{t.hero.line3}</em><br/>
          {t.hero.line4} {t.hero.line5}
        </h1>
        <p className="hero-sub" style={{marginTop: 40, maxWidth: '64ch'}}>{t.hero.sub}</p>
        <div className="hero-cta-row">
          <a href="#contacto" className="hero-cta primary">{t.hero.cta_primary} →</a>
          <a href="#proceso" className="hero-cta">{t.hero.cta_secondary}</a>
        </div>
      </div>

      <div className="meta-row">
        {t.hero.stats.map((s, i) => (
          <div key={i}>
            <div style={{fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: '-0.02em', color: 'var(--fg)'}}>
              {i % 2 ? <em style={{fontStyle:'italic', color:'var(--accent)'}}>{s[0]}</em> : s[0]}
            </div>
            <div style={{marginTop: 6}}>{s[1]}</div>
          </div>
        ))}
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((it, i) => (
            <span key={i}>
              <em>{it}</em><span className="sep"> · </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroA, HeroB, Sparkline, BarMini, useInterval, useLiveSeries, useCounter, fmt, Donut });
