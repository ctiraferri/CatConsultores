// Demo v2 — editorial dashboard
function DashboardDemo({ t, accent }) {
  const [tab, setTab] = useState(0);
  const [period, setPeriod] = useState(1);
  const [regions, setRegions] = useState([true, true, false, true, false]);
  const [segments, setSegments] = useState([true, false, true, false]);

  const multiplier = [0.3, 1, 2.2, 4.5, 8][period] * (tab === 0 ? 1 : tab === 1 ? 0.75 : 1.3);
  const activeRegions = regions.filter(Boolean).length || 1;
  const activeSegments = segments.filter(Boolean).length || 1;

  const baseRev = 142836;
  const rev = Math.round(baseRev * multiplier * (activeRegions / 3) * (activeSegments / 2));
  const deals = Math.round(2341 * multiplier * (activeRegions / 3));
  const avgTicket = Math.round(rev / Math.max(1, deals));
  const conv = Math.min(99, 12 + multiplier * 4 + activeSegments * 2);

  const vr = useCounter(rev, 700);
  const vd = useCounter(deals, 700);
  const va = useCounter(avgTicket, 700);
  const vc = useCounter(conv, 700);

  const series = useMemo(() => {
    const out = []; let v = 40 + multiplier * 2;
    const n = 60;
    for (let i = 0; i < n; i++) {
      v += (Math.random() - 0.45) * (3 + multiplier * 0.5) + Math.sin(i / 6) * 3;
      out.push(Math.max(8, v));
    }
    return out;
  }, [period, tab, regions.join(), segments.join()]);

  const bars = t.demo.filters.segments.map((s, i) => ({
    label: s,
    value: segments[i] ? Math.round(rev * (0.4 - i * 0.05) * (1 + Math.random() * 0.2)) : 0
  }));
  const maxBar = Math.max(...bars.map(b => b.value), 1);

  return (
    <div className="demo-frame">
      <div className="demo-tabs">
        {t.demo.tabs.map((tabName, i) => (
          <button key={i} data-active={tab === i} onClick={() => setTab(i)}>{tabName}</button>
        ))}
        <div style={{marginLeft: 'auto', padding: '16px 24px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--fg-dim)', display: 'flex', alignItems: 'center', gap: 8}}>
          <span style={{display:'inline-block',width:6,height:6,background:'var(--accent)',borderRadius:'50%'}}></span>
          LIVE
        </div>
      </div>

      <div className="demo-body">
        <div className="demo-filters">
          <div className="flabel">{t.demo.filters.period}</div>
          <div>
            {t.demo.filters.periods.map((p, i) => (
              <span key={i} className="pill" data-on={period === i} onClick={() => setPeriod(i)}>{p}</span>
            ))}
          </div>

          <div className="flabel">{t.demo.filters.region}</div>
          <div>
            {t.demo.filters.regions.map((r, i) => (
              <span key={i} className="pill" data-on={regions[i]}
                onClick={() => setRegions(rs => rs.map((v, j) => j === i ? !v : v))}>{r}</span>
            ))}
          </div>

          <div className="flabel">{t.demo.filters.segment}</div>
          <div>
            {t.demo.filters.segments.map((s, i) => (
              <span key={i} className="pill" data-on={segments[i]}
                onClick={() => setSegments(ss => ss.map((v, j) => j === i ? !v : v))}>{s}</span>
            ))}
          </div>

          <div className="flabel">REFRESH</div>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-dim)', lineHeight: 1.8}}>
            <div style={{display:'flex',justifyContent:'space-between'}}><span>Últ. act.</span><span style={{color:'var(--accent)'}}>LIVE</span></div>
            <div style={{display:'flex',justifyContent:'space-between'}}><span>Filas</span><span>{fmt(1400000 + deals * 12)}</span></div>
            <div style={{display:'flex',justifyContent:'space-between'}}><span>Fuentes</span><span>{3 + activeRegions}</span></div>
          </div>
        </div>

        <div className="demo-canvas">
          <div className="kpi">
            <div className="klbl">{t.demo.kpis.rev}</div>
            <div className="kval">$<em>{fmt(vr)}</em></div>
            <div className="kdelta">↗ {(12 + multiplier).toFixed(1)}% vs prev.</div>
          </div>
          <div className="kpi">
            <div className="klbl">{t.demo.kpis.deals}</div>
            <div className="kval">{fmt(vd)}</div>
            <div className="kdelta">↗ {(8 + activeRegions).toFixed(1)}%</div>
          </div>

          <div className="chart">
            <div className="chart-title"><span>{t.demo.chartTitle}</span><span>y-axis · USD</span></div>
            <div style={{height: 'calc(100% - 22px)'}}>
              <Sparkline data={series} w={600} h={200} />
            </div>
          </div>

          <div className="bars">
            <div className="chart-title"><span>{t.demo.barTitle}</span><span>click to filter →</span></div>
            <div style={{display: 'grid', gap: 10, marginTop: 12}}>
              {bars.map((b, i) => (
                <div key={i} style={{display: 'grid', gridTemplateColumns: '120px 1fr 110px', alignItems: 'center', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 12, color: segments[i] ? 'var(--fg)' : 'var(--fg-faint)'}}>
                  <span>{b.label}</span>
                  <div style={{height: 14, background: 'var(--rule)', borderRadius: 2, position: 'relative', overflow: 'hidden'}}>
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: `${(b.value / maxBar) * 100}%`,
                      background: segments[i] ? 'var(--accent)' : 'var(--fg-faint)',
                      transition: 'width 0.5s cubic-bezier(.3,.9,.4,1)'
                    }} />
                  </div>
                  <span style={{textAlign: 'right', fontVariantNumeric: 'tabular-nums'}}>${fmt(b.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="demo-insights">
          <div className="ih">{t.demo.insightsHeader}</div>
          {t.demo.insights.map((ins, i) => (
            <div key={i} className="insight">
              <span className="tag">{ins.t}</span>
              {ins.b}
            </div>
          ))}
          <div className="ih" style={{marginTop: 28}}>KPIs</div>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-dim)', lineHeight: 1.8}}>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid var(--rule)',padding:'6px 0'}}><span>{t.demo.kpis.avg}</span><span style={{color:'var(--fg)'}}>${fmt(va)}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid var(--rule)',padding:'6px 0'}}><span>{t.demo.kpis.conv}</span><span style={{color:'var(--fg)'}}>{vc.toFixed(1)}%</span></div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><span>Regiones</span><span style={{color:'var(--accent)'}}>{activeRegions}/5</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardDemo });
