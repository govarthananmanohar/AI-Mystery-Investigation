import { useMemo, useState } from 'react';
import { Activity, ArrowDownRight, ArrowLeft, ArrowRight, AudioLines, BadgeCheck, BookOpen, Check, ChevronDown, Clock3, FileText, Fingerprint, Image, KeyRound, Lightbulb, Menu, MessageCircle, Search, Shield, Sparkles, Video, X } from 'lucide-react';

const icons = { file: FileText, message: MessageCircle, image: Image, video: Video, key: KeyRound, eye: Search };

function App() {
  const [view, setView] = useState('home');
  const [scenario, setScenario] = useState('');
  const [caseData, setCaseData] = useState(null);
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBriefing, setShowBriefing] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const studied = useMemo(() => activeEvidence ? caseData?.evidence.findIndex(item => item.id === activeEvidence.id) + 1 : 0, [activeEvidence, caseData]);

  async function startCase(text = scenario) {
    setLoading(true); setError(''); setResult(null); setSelected('');
    try {
      const response = await fetch('/api/mysteries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ scenario: text }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not open a new case.');
      setCaseData(data); setScenario(text); setActiveEvidence(data.evidence[0]); setShowBriefing(true); setView('investigation');
    } catch (e) { setError(e.message || 'The case server is not responding. Start the server with npm run dev.'); }
    finally { setLoading(false); }
  }

  async function submitAnswer() {
    if (!selected) return;
    setLoading(true); setError('');
    try {
      const response = await fetch(`/api/mysteries/${caseData.id}/answer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ suspectId: selected }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not submit your answer.');
      setResult(data); setView('solution');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function newCase() { setView('home'); setCaseData(null); setResult(null); setScenario(''); setError(''); }

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={newCase} aria-label="Casefile home"><span className="brand-mark"><Fingerprint size={19}/></span><span>CASEFILE<span className="brand-period">.</span></span><span className="brand-divider"/><span className="brand-sub">AN INVESTIGATION ROOM</span></button>
      <div className="top-status"><span className="status-dot"/> SYSTEM ONLINE <span className="top-separator">/</span> <span className="top-muted">FIELD OFFICE 07</span></div>
      <button className="menu-button" onClick={() => setShowMobileMenu(!showMobileMenu)} aria-label="Toggle menu">{showMobileMenu ? <X size={18}/> : <Menu size={18}/>}</button>
      <nav className={showMobileMenu ? 'nav-links open' : 'nav-links'}><button onClick={newCase}>CASE FILES</button><a href="#about">HOW IT WORKS</a><span className="avatar">D</span></nav>
    </header>

    {view === 'home' && <main className="landing">
      <div className="landing-grid"/>
      <section className="hero-copy"><div className="eyebrow"><span/> THE TRUTH IS IN THE DETAILS</div><h1>Every clue<br/>has a <em>story.</em></h1><p className="hero-description">Step inside an unsolved mystery. Follow the evidence, question every alibi, and find out who’s really telling the truth.</p>
        <div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById('case-input')?.focus()}>OPEN A CASE <ArrowRight size={16}/></button><div className="case-count"><span className="count-icon"><Activity size={15}/></span><span><b>YOUR NEXT CASE</b><small>is waiting to be solved</small></span></div></div>
        <div className="hero-foot"><span><Shield size={13}/> COMPLETELY FICTIONAL</span><span><Clock3 size={13}/> 10–15 MIN INVESTIGATION</span></div>
      </section>
      <section className="case-preview" aria-label="Preview of a case file"><div className="file-top"><span>ACTIVE CASE FILE</span><span className="file-stamp">NO. 00841</span></div><div className="file-photo"><div className="photo-grain"/><div className="moon"/><div className="silhouette-house"><i/><i/><i/><i/></div><div className="photo-caption">BELLWEATHER HOUSE · 9:40 PM</div><div className="photo-cross"/></div><div className="file-details"><div><span className="detail-label">CASE TYPE</span><b>Suspicious incident</b></div><div><span className="detail-label">EVIDENCE</span><b>06 items recovered</b></div><div><span className="detail-label">STATUS</span><b className="status-open">● Open investigation</b></div></div><div className="file-footer"><span>PROPERTY OF THE INVESTIGATION DESK</span><span>RESTRICTED ACCESS</span></div><div className="paperclip"/></section>
      <div className="hero-index">01 <span/> 04</div>
      <section className="start-section" id="about"><div className="section-heading"><span>01 / THE BRIEF</span><h2>Put the pieces<br/><em>together.</em></h2><p>Every investigation begins with a story. Give us the details, and we’ll prepare the case file.</p></div><div className="input-panel"><div className="input-header"><div className="input-icon"><AudioLines size={18}/></div><div><strong>YOUR CASE BEGINS HERE</strong><span>SET THE SCENE. WE’LL BUILD THE MYSTERY.</span></div><span className="input-step">01 — 03</span></div><textarea id="case-input" maxLength={1200} value={scenario} onChange={e => setScenario(e.target.value)} placeholder="A quiet town. A missing heirloom. Three people with something to hide..."/><div className="input-footer"><span>{scenario.length} / 1,200 CHARACTERS</span><button className="text-button" onClick={() => setScenario('A famous chef is found unconscious in the locked kitchen just before the final round of a cooking competition. Three contestants each had a reason to stop the show.')}>TRY AN EXAMPLE <ArrowDownRight size={14}/></button></div><button className="primary-button generate-button" disabled={loading} onClick={() => startCase()}>{loading ? <><span className="spinner"/> BUILDING YOUR CASE…</> : <>GENERATE INVESTIGATION <Sparkles size={16}/></>}</button>{error && <p className="error-message">{error}</p>}</div></section>
      <section className="steps"><div className="step"><span>01</span><div><b>SET THE SCENE</b><p>Give us a place, a moment, a mystery.</p></div></div><div className="step"><span>02</span><div><b>FOLLOW THE EVIDENCE</b><p>Every detail holds a piece of the story.</p></div></div><div className="step"><span>03</span><div><b>NAME YOUR SUSPECT</b><p>Make your call. Then see if you were right.</p></div></div></section>
      <footer className="footer"><span>CASEFILE © 2025</span><span>FICTIONAL CASES. REAL DEDUCTION.</span><button onClick={() => startCase('')}>OPEN A RANDOM CASE <ArrowRight size={13}/></button></footer>
    </main>}

    {view === 'investigation' && caseData && <main className="investigation"><div className="investigation-top"><button className="back-button" onClick={newCase}><ArrowLeft size={15}/> ALL CASES</button><div className="case-meta"><span className="live-tag"><i/> LIVE INVESTIGATION</span><span>CASE NO. {caseData.id.slice(-6).toUpperCase()}</span></div><div className="timer"><Clock3 size={14}/> FIELD NOTES <ChevronDown size={13}/></div></div>
      <div className="investigation-heading"><div><div className="eyebrow"><span/> CASE FILE / INVESTIGATION</div><h1>{caseData.title}</h1><p className="case-location"><span>⌖</span> PRIVATE DOSSIER <b>·</b> {caseData.evidence.length} PIECES OF EVIDENCE</p></div><button className="hint-button" onClick={() => alert(caseData.hint || 'Review the evidence closely and compare the timelines.') }><Lightbulb size={15}/> NEED A HINT?</button></div>
      {showBriefing && <section className="briefing"><div className="briefing-symbol"><BookOpen size={18}/></div><div className="briefing-content"><span>THE BRIEFING</span><p>{caseData.briefing}</p></div><button aria-label="Dismiss briefing" onClick={() => setShowBriefing(false)}><X size={16}/></button></section>}
      <div className="investigation-grid"><section className="evidence-column"><div className="column-title"><span><span className="title-number">01</span> EVIDENCE BOARD</span><span>{caseData.evidence.length} ITEMS <span className="subtle">/ {studied} REVIEWED</span></span></div><div className="evidence-grid">{caseData.evidence.map((item, i) => { const Icon = icons[item.icon] || FileText; return <button key={item.id} className={`evidence-card ${activeEvidence?.id === item.id ? 'active' : ''}`} onClick={() => setActiveEvidence(item)}><div className={`evidence-art art-${i % 6}`}><span className="evidence-index">E-{String(i + 1).padStart(2, '0')}</span><Icon size={i === 0 ? 35 : 29}/><span className="evidence-art-label">{item.type}</span></div><div className="evidence-card-info"><div><span>{item.location}</span><Check size={13} className={activeEvidence?.id === item.id ? 'checked' : ''}/></div><b>{item.title}</b><span className="view-evidence">EXAMINE FILE <ArrowRight size={12}/></span></div></button>; })}</div></section>
      <aside className="suspect-column"><div className="column-title"><span><span className="title-number">02</span> PERSONS OF INTEREST</span><span>{caseData.suspects.length} SUSPECTS</span></div><div className="suspect-list">{caseData.suspects.map((person, i) => <button key={person.id} onClick={() => setSelected(person.id)} className={`suspect-card ${selected === person.id ? 'selected' : ''}`}><span className={`suspect-avatar suspect-${i % 4}`}>{person.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span><span className="suspect-info"><b>{person.name}</b><small>{person.role}{person.age ? ` · ${person.age}` : ''}</small><span className="suspect-motive">MOTIVE <i/>{person.motive}</span></span><span className="select-ring">{selected === person.id && <Check size={12}/>}</span></button>)}</div><div className="selection-note"><Fingerprint size={15}/><span>Select your suspect<br/><b>when you’re ready to make your call.</b></span></div><button className="primary-button submit-button" disabled={!selected || loading} onClick={submitAnswer}>{loading ? 'SUBMITTING…' : <>MAKE YOUR ACCUSATION <ArrowRight size={15}/></>}</button>{error && <p className="error-message">{error}</p>}</aside></div>
      {activeEvidence && <section className="evidence-detail"><div className="detail-heading"><span className="title-number">03</span><span>ON THE EVIDENCE TABLE</span><button onClick={() => setActiveEvidence(null)} aria-label="Close evidence detail"><X size={15}/></button></div><div className="evidence-detail-body"><div className="detail-type">{activeEvidence.type} <span>·</span> {activeEvidence.location}</div><h2>{activeEvidence.title}</h2><p>{activeEvidence.content}</p><div className="evidence-detail-stamp"><Search size={13}/> RECORD YOUR OBSERVATIONS</div></div></section>}
      <footer className="footer"><span>CASEFILE © 2025</span><span>ALL PERSONS & EVENTS ARE FICTIONAL</span><button onClick={newCase}>CLOSE CASE <X size={13}/></button></footer>
    </main>}

    {view === 'solution' && caseData && result && <main className="solution-page"><button className="back-button" onClick={newCase}><ArrowLeft size={15}/> ALL CASES</button><section className="solution-card"><div className={`result-seal ${result.correct ? 'correct' : ''}`}><BadgeCheck size={29}/></div><div className="eyebrow"><span/> CASE CLOSED / FINAL REPORT</div><h1>{result.correct ? 'Well observed.' : 'The evidence had another story.'}</h1><p className="result-summary">{result.correct ? 'You connected the clues and identified the right suspect.' : `Your accusation was ${caseData.suspects.find(s => s.id === selected)?.name}. The evidence points elsewhere.`}</p><div className="culprit-panel"><span>THE CULPRIT</span><h2>{caseData.suspects.find(s => s.id === result.culpritId)?.name}</h2><p>{caseData.suspects.find(s => s.id === result.culpritId)?.role}</p></div><div className="solution-copy"><div><FileText size={15}/> HOW THE CLUES CONNECT</div><p>{result.solution}</p></div><button className="primary-button" onClick={newCase}>OPEN A NEW CASE <ArrowRight size={15}/></button></section><footer className="footer"><span>CASEFILE © 2025</span><span>THE TRUTH WAS THERE ALL ALONG.</span></footer></main>}
    <div className="ambient-orb orb-one"/><div className="ambient-orb orb-two"/>
  </div>;
}

export default App;
