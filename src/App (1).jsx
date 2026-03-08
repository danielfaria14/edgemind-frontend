import { useState, useRef, useEffect } from "react";

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const buildSystemPrompt = (profile, rules) => {
  const rulesList = Object.entries(rules)
    .filter(([, v]) => v.enabled)
    .map(([, v]) => `• ${v.label}: ${v.value}`)
    .join("\n");

  return `You are an elite trading performance psychologist and accountability coach named EdgeMind. You are direct, warm, honest, and deeply knowledgeable about trader psychology. You do not lecture. You coach.

TRADER PROFILE:
- Name: ${profile.name}
- Experience: ${profile.experience}
- Platform: ${profile.platform}
- Instrument: ${profile.instrument}
- Biggest Challenges: ${(profile.challenges||[]).join(", ")}

THEIR NON-NEGOTIABLE RULES:
${rulesList}

YOUR COACHING PHILOSOPHY:
- The market is not the enemy. The trader's own psychology is.
- Most traders know what to do. They fail to do it under emotional pressure.
- Rules set when calm are the only rules that count. The emotional version of a trader is not qualified to make trading decisions.
- Discipline is a skill built through structure, accountability, and repetition.
- Your motto: "You can make money in the market — but are you disciplined enough to keep it?"

KEY PSYCHOLOGICAL PATTERNS YOU UNDERSTAND DEEPLY:
- Revenge trading: loss → emotional escalation → bigger loss
- "I can always make more" trap: destroys winning days
- Identity attachment to P&L: self-worth tied to daily results
- Self-sabotage cycles: unconscious destruction of success
- Dopamine-seeking: trading for the high, not the edge
- Rule abandonment under stress: prefrontal cortex goes offline during emotional pressure
- Trading to escape financial pressure: desperation removes the edge
- Overtrading: compulsive position-taking disguised as opportunity

YOUR ROLE:
- Be their daily accountability partner
- When rules followed: celebrate genuinely, reinforce their identity as a disciplined trader
- When rules broken: no shame, but be direct — identify the trigger, name the pattern, redirect
- For check-ins (Done. Made/Lost $X. Rules: Yes/No): respond in under 120 words unless they need more
- Always ask ONE focused coaching question per response to build self-awareness
- Reference their specific rules and challenge by name
- Never be generic. Every response should feel like it was written specifically for this trader.

BROKEN RULE PROTOCOL:
When a rule is broken, always: (1) acknowledge without shame, (2) identify the specific psychological pattern at play, (3) ask what triggered it, (4) redirect to the rule and why it exists.

DAILY CHECK-IN FORMAT: "Done. Made/Lost $X. Rules: Yes/No"`;
};

// ─── RULE DEFINITIONS ─────────────────────────────────────────────────────────
const DEFAULT_RULES = {
  profitTarget:      { label: "Daily Profit Target",            category: "money",    type: "dollar",   defaultVal: "500",  icon: "💰", desc: "Hit this → close platform immediately. No exceptions.", enabled: true },
  lossLimit:         { label: "Daily Loss Limit",               category: "money",    type: "dollar",   defaultVal: "250",  icon: "🛑", desc: "Hit this → close platform immediately. No revenge.", enabled: true },
  singleTradeLoss:   { label: "Max Loss Per Single Trade",       category: "money",    type: "dollar",   defaultVal: "100",  icon: "⚡", desc: "One bad trade cannot destroy your day.", enabled: false },
  weeklyLoss:        { label: "Weekly Loss Limit",               category: "money",    type: "dollar",   defaultVal: "1000", icon: "📅", desc: "Hit this mid-week → done until Monday.", enabled: false },
  sessionStart:      { label: "Session Start Time",              category: "time",     type: "time",     defaultVal: "08:30",icon: "⏰", desc: "You do not exist as a trader before this time.", enabled: true },
  sessionEnd:        { label: "Session End Time",                category: "time",     type: "time",     defaultVal: "10:30",icon: "⏰", desc: "You do not exist as a trader after this time.", enabled: true },
  maxSessionMins:    { label: "Max Session Duration (minutes)",  category: "time",     type: "number",   defaultVal: "120",  icon: "⌛", desc: "Even inside your window — 2 hours maximum.", enabled: false },
  noNewsBefore:      { label: "No Trading X mins Before News",   category: "time",     type: "number",   defaultVal: "30",   icon: "📰", desc: "News events are not setups. They are gambling.", enabled: false },
  consecLossDays:    { label: "Consecutive Loss Days = Day Off", category: "time",     type: "number",   defaultVal: "3",    icon: "🔄", desc: "3 red days in a row → mandatory day off.", enabled: false },
  maxTrades:         { label: "Max Trades Per Day",              category: "behavior", type: "number",   defaultVal: "5",    icon: "🎯", desc: "Overtrading is a compulsion, not a strategy.", enabled: false },
  consecLossTrades:  { label: "Consecutive Losing Trades = Stop",category: "behavior", type: "number",   defaultVal: "3",    icon: "🚨", desc: "3 losing trades in a row → your mindset is compromised.", enabled: false },
  noAddToLoser:      { label: "Never Add To A Losing Position",  category: "behavior", type: "toggle",   defaultVal: "true", icon: "🚫", desc: "This is how accounts die. Non-negotiable.", enabled: false },
  noStressTrading:   { label: "No Trading After Stressful Events",category:"behavior", type: "toggle",   defaultVal: "true", icon: "🧠", desc: "Argument, anxiety, bad news = no trading. Your edge disappears.", enabled: false },
  preRoutine:        { label: "Pre-Session Routine Required",    category: "behavior", type: "toggle",   defaultVal: "true", icon: "🌅", desc: "No routine completed = no trading. Period.", enabled: false },
  journalRequired:   { label: "Journal Every Session",           category: "identity", type: "toggle",   defaultVal: "true", icon: "📓", desc: "3 sentences: what happened, how you felt, what changes.", enabled: false },
  weeklyReview:      { label: "Weekly Review Every Sunday",      category: "identity", type: "toggle",   defaultVal: "true", icon: "📊", desc: "Review discipline rate, not just P&L.", enabled: false },
  celebrateDiscipline:{ label:"Celebrate Rules, Not Just Profit",category: "identity", type: "toggle",   defaultVal: "true", icon: "🏆", desc: "A disciplined losing day beats an undisciplined winning day.", enabled: false },
  customRule1:       { label: "Custom Rule",                     category: "identity", type: "text",     defaultVal: "",     icon: "✍️", desc: "Your own rule in your own words.", enabled: false },
};

const CATEGORIES = [
  { id: "money",    label: "💰 Money Rules",    desc: "Protect your capital at all costs" },
  { id: "time",     label: "⏰ Time Rules",     desc: "When you trade matters as much as how" },
  { id: "behavior", label: "🧠 Behavior Rules", desc: "Target the psychological patterns directly" },
  { id: "identity", label: "🏆 Identity Rules", desc: "Who you are as a trader, every single day" },
];

const CHALLENGES = [
  "Revenge trading after losses",
  "Can't stop when I'm up — always want more",
  "Trading outside my session hours",
  "Overtrading / too many positions",
  "Can't cut losses early",
  "Self-sabotage on winning days",
  "Emotional decision-making under pressure",
  "Adding to losing positions",
];

const EXPERIENCES = ["Under 1 year", "1–2 years", "2–5 years", "5–10 years", "10+ years"];
const PLATFORMS = ["TopStep", "FTMO", "Apex Trader Funding", "My Funded Futures", "Bulenox", "Retail (no prop firm)", "Other"];
const INSTRUMENTS = ["Futures (ES, NQ, MNQ, MES)", "Forex", "Stocks", "Options", "Crypto", "Multiple"];

const formatTime12 = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

// ─── MARKDOWN RENDERER ────────────────────────────────────────────────────────
const Md = ({ text }) => {
  const lines = (text || "").split("\n");
  return lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return (
      <span key={li}>
        {parts.map((p, i) => {
          if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} style={{ color: "#FFD166", fontWeight: 700 }}>{p.slice(2,-2)}</strong>;
          if (p.startsWith("*") && p.endsWith("*")) return <em key={i} style={{ color: "#A8D8A8" }}>{p.slice(1,-1)}</em>;
          return <span key={i}>{p}</span>;
        })}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
};

// ─── RULE VALUE DISPLAY ───────────────────────────────────────────────────────
const ruleValueDisplay = (key, rule) => {
  if (!rule.enabled) return null;
  if (rule.type === "dollar") return `$${rule.value || rule.defaultVal}`;
  if (rule.type === "time") return rule.value || rule.defaultVal;
  if (rule.type === "number") return rule.value || rule.defaultVal;
  if (rule.type === "toggle") return "Active";
  if (rule.type === "text") return rule.value || "Set";
  return rule.value;
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: "", experience: "", platform: "", instrument: "", challenges: [] });
  const [rules, setRules] = useState(() => {
    const r = {};
    Object.entries(DEFAULT_RULES).forEach(([k, v]) => { r[k] = { ...v, value: v.defaultVal }; });
    return r;
  });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("coach");
  const [sessions, setSessions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [expandedCat, setExpandedCat] = useState("money");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const enabledRules = Object.entries(rules).filter(([,v]) => v.enabled);

  const toggleRule = (key) => {
    setRules(prev => ({ ...prev, [key]: { ...prev[key], enabled: !prev[key].enabled } }));
  };

  const setRuleValue = (key, val) => {
    setRules(prev => ({ ...prev, [key]: { ...prev[key], value: val } }));
  };

  const startCoach = () => {
    const ruleLines = enabledRules.map(([,v]) => `${v.icon} **${v.label}:** ${ruleValueDisplay(null, v)}`).join("\n");
    setMessages([{
      role: "assistant",
      content: `Welcome, ${profile.name}. I've read your profile and I know your rules.\n\nYou've identified your biggest challenges as *${(profile.challenges||[]).join(", ")}*. That's exactly what we're going to dismantle — one session at a time.\n\nYour rules are locked:\n${ruleLines}\n\nThese were set by the calm, rational version of you. That version made the right calls. Trust them.\n\nAfter every session, send me:\n*"Done. Made $X / Lost $X. Rules: Yes/No"*\n\nHow are you feeling going into your next session?`,
      time: formatTime12(),
    }]);
    setScreen("dashboard");
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim(), time: formatTime12() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);

    const lower = input.toLowerCase();
    if (lower.includes("done") && (lower.includes("made") || lower.includes("lost"))) {
      const madeMatch = input.match(/made \$?([\d,]+)/i);
      const lostMatch = input.match(/lost \$?([\d,]+)/i);
      const rulesYes = /rules?\s*:?\s*yes/i.test(input);
      const pnl = madeMatch ? parseInt(madeMatch[1].replace(/,/g,"")) : lostMatch ? -parseInt(lostMatch[1].replace(/,/g,"")) : 0;
      setSessions(prev => [...prev, { date: new Date().toLocaleDateString(), pnl, rulesFollowed: rulesYes, time: formatTime12() }]);
      setStreak(s => rulesYes ? s + 1 : 0);
    }

    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(profile, rules),
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content?.[0]?.text || "I'm here. Keep going.", time: formatTime12() }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection issue. Your rules haven't changed.", time: formatTime12() }]);
    }
    setLoading(false);
  };

  const totalPnl = sessions.reduce((a, s) => a + s.pnl, 0);
  const disciplineRate = sessions.length > 0 ? Math.round((sessions.filter(s => s.rulesFollowed).length / sessions.length) * 100) : 0;

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::-webkit-scrollbar{width:3px;}
    ::-webkit-scrollbar-thumb{background:#1c2333;border-radius:2px;}
    .fade{animation:fade 0.6s ease forwards;}
    .up{animation:up 0.4s ease forwards;}
    @keyframes fade{from{opacity:0}to{opacity:1}}
    @keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .msg{animation:msg 0.25s ease forwards;}
    @keyframes msg{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
    .dot{animation:blink 1.4s infinite;}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
    .rule-row:hover{background:#111827!important;}
    .tab:hover{color:#FFD166!important;}
    .qbtn:hover{border-color:#FFD166!important;color:#FFD166!important;}
    .glow:hover{box-shadow:0 0 24px #FFD16640;transform:translateY(-1px);}
    input[type=time]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
    select option{background:#0d1117;}
    textarea:focus,input:focus,select:focus{outline:none;}
    .cat-btn:hover{background:#111827!important;}
    .send-btn:hover{opacity:0.9;}
  `;

  const inp = {
    width:"100%", padding:"10px 14px",
    background:"#0d1117", border:"1px solid #1c2333",
    borderRadius:8, color:"#E5E7EB", fontSize:14,
    fontFamily:"'DM Sans',sans-serif", transition:"border-color 0.2s",
  };
  const lbl = { display:"block", fontSize:11, color:"#6B7280", marginBottom:6, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" };

  // ── LANDING ────────────────────────────────────────────────────────────────
  if (screen === "landing") return (
    <div style={{ minHeight:"100vh", background:"#060810", fontFamily:"'DM Sans',sans-serif", color:"#E5E7EB" }}>
      <style>{CSS}</style>

      <nav style={{ padding:"18px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #0d1117" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:"#FFD166", letterSpacing:2 }}>EDGEMIND</div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <span style={{ fontSize:12, color:"#374151", fontWeight:500 }}>$29 / month</span>
          <button onClick={() => setScreen("onboarding")} className="glow" style={{ padding:"9px 22px", background:"#FFD166", border:"none", borderRadius:6, color:"#060810", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:1, transition:"all 0.2s" }}>
            START FREE TRIAL
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:760, margin:"0 auto", padding:"80px 24px 60px", textAlign:"center" }}>
        <div className="fade" style={{ display:"inline-block", padding:"5px 14px", background:"#FFD16612", border:"1px solid #FFD16628", borderRadius:20, fontSize:11, color:"#FFD166", marginBottom:28, fontWeight:600, letterSpacing:"0.08em" }}>
          AI TRADING PERFORMANCE COACH
        </div>
        <h1 className="fade" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,9vw,96px)", color:"#F9FAFB", lineHeight:0.95, letterSpacing:2, marginBottom:24 }}>
          YOU CAN MAKE<br />MONEY IN THE<br /><span style={{ color:"#FFD166" }}>MARKET.</span>
        </h1>
        <p className="up" style={{ fontSize:20, color:"#4B5563", fontWeight:500, marginBottom:12 }}>
          But are you disciplined enough to keep it?
        </p>
        <p className="up" style={{ fontSize:15, color:"#374151", lineHeight:1.8, maxWidth:480, margin:"0 auto 48px" }}>
          EdgeMind is the AI accountability coach that sits between you and your worst trading decisions. Your rules. Your psychology. Enforced every single day.
        </p>
        <button onClick={() => setScreen("onboarding")} className="glow" style={{ padding:"16px 44px", background:"#FFD166", border:"none", borderRadius:8, color:"#060810", fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:2, transition:"all 0.2s", marginBottom:14 }}>
          BUILD MY RULE SYSTEM →
        </button>
        <div style={{ fontSize:12, color:"#1F2937" }}>7-day free trial · No credit card required</div>

        <div className="up" style={{ display:"flex", gap:48, justifyContent:"center", marginTop:72, flexWrap:"wrap" }}>
          {[["73%","of trader failures are psychological, not strategic"],["4 Categories","of non-negotiable rules enforced by your coach"],["$29/mo","less than a single prop firm reset"]].map(([v,d])=>(
            <div key={v} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:"#FFD166", letterSpacing:1 }}>{v}</div>
              <div style={{ fontSize:12, color:"#374151", maxWidth:140, marginTop:4, lineHeight:1.5 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto 80px", padding:"0 24px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
        {[
          { icon:"💰", t:"Money Rules", d:"Daily targets, loss limits, single-trade caps, weekly drawdown protection." },
          { icon:"⏰", t:"Time Rules",  d:"Trading windows, session limits, news blackouts, mandatory rest days." },
          { icon:"🧠", t:"Behavior Rules", d:"Trade caps, consecutive loss stops, no adding to losers, stress protocols." },
          { icon:"🏆", t:"Identity Rules", d:"Journaling, weekly reviews, discipline tracking, custom personal rules." },
        ].map(f=>(
          <div key={f.t} style={{ padding:"22px 20px", background:"#0a0d14", border:"1px solid #111827", borderRadius:12 }}>
            <div style={{ fontSize:26, marginBottom:10 }}>{f.icon}</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, color:"#F9FAFB", letterSpacing:1, marginBottom:8 }}>{f.t}</div>
            <div style={{ fontSize:12, color:"#374151", lineHeight:1.6 }}>{f.d}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── ONBOARDING ─────────────────────────────────────────────────────────────
  const onboarding = [
    {
      title: "WHO ARE YOU AS A TRADER?",
      sub: "Your coach needs to know you before it can help you.",
      valid: profile.name && profile.experience && profile.platform && profile.instrument,
      content: (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div><label style={lbl}>Your Name</label><input style={inp} value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="First name" /></div>
          <div><label style={lbl}>Experience</label>
            <select style={inp} value={profile.experience} onChange={e=>setProfile({...profile,experience:e.target.value})}>
              <option value="">Select...</option>{EXPERIENCES.map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <div style={{ flex:1 }}><label style={lbl}>Platform / Prop Firm</label>
              <select style={inp} value={profile.platform} onChange={e=>setProfile({...profile,platform:e.target.value})}>
                <option value="">Select...</option>{PLATFORMS.map(x=><option key={x}>{x}</option>)}
              </select>
            </div>
            <div style={{ flex:1 }}><label style={lbl}>Instrument</label>
              <select style={inp} value={profile.instrument} onChange={e=>setProfile({...profile,instrument:e.target.value})}>
                <option value="">Select...</option>{INSTRUMENTS.map(x=><option key={x}>{x}</option>)}
              </select>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "YOUR BIGGEST CHALLENGE.",
      sub: "Honesty here is everything. This is what your coach will focus on.",
      valid: profile.challenges && profile.challenges.length > 0,
      content: (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ fontSize:11, color:"#FFD166", marginBottom:4, fontWeight:600, letterSpacing:"0.06em" }}>SELECT ALL THAT APPLY</div>
          {CHALLENGES.map(c=>{
            const selected = (profile.challenges||[]).includes(c);
            return (
              <button key={c} onClick={()=>{
                const prev = profile.challenges||[];
                const next = prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c];
                setProfile({...profile, challenges: next});
              }} style={{ padding:"13px 16px", textAlign:"left", background:selected?"#FFD16612":"#0a0d14", border:`1px solid ${selected?"#FFD166":"#111827"}`, borderRadius:8, color:selected?"#FFD166":"#6B7280", fontSize:14, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ width:16, height:16, borderRadius:3, border:`2px solid ${selected?"#FFD166":"#374151"}`, background:selected?"#FFD166":"transparent", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#060810", fontWeight:800, flexShrink:0 }}>{selected?"✓":""}</span>
                {c}
              </button>
            );
          })}
        </div>
      ),
    },
    {
      title: "BUILD YOUR RULE SYSTEM.",
      sub: "Turn on the rules that apply to you. Set your numbers. These are non-negotiable.",
      valid: rules.profitTarget.enabled && rules.lossLimit.enabled && rules.sessionStart.enabled && rules.sessionEnd.enabled,
      content: (
        <div>
          {CATEGORIES.map(cat => (
            <div key={cat.id} style={{ marginBottom:10 }}>
              <button className="cat-btn" onClick={()=>setExpandedCat(expandedCat===cat.id?null:cat.id)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:"#0a0d14", border:"1px solid #111827", borderRadius:expandedCat===cat.id?"8px 8px 0 0":"8px", cursor:"pointer", transition:"background 0.15s" }}>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, color:"#F9FAFB", letterSpacing:1 }}>{cat.label}</div>
                  <div style={{ fontSize:11, color:"#374151", marginTop:2 }}>{cat.desc}</div>
                </div>
                <div style={{ color:"#374151", fontSize:14 }}>{expandedCat===cat.id?"▲":"▼"}</div>
              </button>

              {expandedCat===cat.id && (
                <div style={{ border:"1px solid #111827", borderTop:"none", borderRadius:"0 0 8px 8px", overflow:"hidden" }}>
                  {Object.entries(rules).filter(([,v])=>v.category===cat.id).map(([key,rule])=>(
                    <div key={key} className="rule-row" style={{ padding:"14px 16px", background:"#080b12", borderBottom:"1px solid #0d1117", transition:"background 0.15s" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                        <div style={{ paddingTop:2, cursor:"pointer" }} onClick={()=>toggleRule(key)}>
                          <div style={{ width:20, height:20, borderRadius:4, background:rule.enabled?"#FFD166":"transparent", border:`2px solid ${rule.enabled?"#FFD166":"#374151"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#060810", fontWeight:800, transition:"all 0.15s", flexShrink:0 }}>
                            {rule.enabled?"✓":""}
                          </div>
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                            <span style={{ fontSize:14 }}>{rule.icon}</span>
                            <span style={{ fontSize:13, color:"#E5E7EB", fontWeight:600 }}>{rule.label}</span>
                          </div>
                          <div style={{ fontSize:11, color:"#374151", lineHeight:1.5, marginBottom: rule.enabled && rule.type !== "toggle" ? 10 : 0 }}>{rule.desc}</div>
                          {rule.enabled && rule.type === "dollar" && (
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
                              <span style={{ color:"#6B7280", fontSize:13 }}>$</span>
                              <input style={{ ...inp, width:120, padding:"6px 10px", fontSize:13 }} type="number" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder={rule.defaultVal} />
                            </div>
                          )}
                          {rule.enabled && rule.type === "time" && (
                            <input style={{ ...inp, width:130, padding:"6px 10px", fontSize:13, marginTop:8 }} type="time" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} />
                          )}
                          {rule.enabled && rule.type === "number" && (
                            <input style={{ ...inp, width:120, padding:"6px 10px", fontSize:13, marginTop:8 }} type="number" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder={rule.defaultVal} />
                          )}
                          {rule.enabled && rule.type === "text" && (
                            <input style={{ ...inp, width:"100%", padding:"6px 10px", fontSize:13, marginTop:8 }} type="text" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder="Write your rule in your own words..." />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ padding:"10px 14px", background:"#FFD16608", border:"1px solid #FFD16620", borderRadius:8, fontSize:12, color:"#FFD166", lineHeight:1.6, marginTop:8 }}>
            💡 The 4 core rules (profit target, loss limit, session start/end) are required. All others are yours to choose.
          </div>
        </div>
      ),
    },
    {
      title: "YOUR COMMITMENT.",
      sub: "Read this. Mean it. Then begin.",
      valid: true,
      content: (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ padding:"20px", background:"#0a0d14", border:"1px solid #111827", borderRadius:10, lineHeight:1.9, fontSize:14, color:"#9CA3AF" }}>
            I, <strong style={{ color:"#FFD166" }}>{profile.name}</strong>, understand that the market is not my enemy.<br/>
            My enemy is the version of me that shows up after a loss.<br/><br/>
            I set these rules when I was calm and thinking clearly.<br/>
            I commit to trusting that version of myself — every single session.<br/><br/>
            <strong style={{ color:"#F9FAFB" }}>I trade to be disciplined. The money follows the discipline.</strong>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {enabledRules.slice(0,6).map(([key,rule])=>(
              <div key={key} style={{ display:"flex", justifyContent:"space-between", padding:"8px 14px", background:"#080b12", border:"1px solid #111827", borderRadius:6 }}>
                <span style={{ fontSize:13, color:"#6B7280" }}>{rule.icon} {rule.label}</span>
                <span style={{ fontSize:13, color:"#FFD166", fontWeight:700 }}>{ruleValueDisplay(key,rule)}</span>
              </div>
            ))}
            {enabledRules.length > 6 && <div style={{ fontSize:11, color:"#374151", textAlign:"center" }}>+{enabledRules.length-6} more rules active</div>}
          </div>
        </div>
      ),
    },
  ];

  if (screen === "onboarding") {
    const s = onboarding[step];
    return (
      <div style={{ minHeight:"100vh", background:"#060810", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'DM Sans',sans-serif" }}>
        <style>{CSS}</style>
        <div className="up" style={{ width:"100%", maxWidth:520 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#FFD166", letterSpacing:2, marginBottom:28 }}>EDGEMIND</div>

          <div style={{ display:"flex", gap:5, marginBottom:28 }}>
            {onboarding.map((_,i)=>(
              <div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=step?"#FFD166":"#111827", transition:"background 0.3s" }} />
            ))}
          </div>

          <div style={{ fontSize:11, color:"#374151", marginBottom:6, fontWeight:700, letterSpacing:"0.1em" }}>STEP {step+1} OF {onboarding.length}</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#F9FAFB", marginBottom:6, letterSpacing:1, lineHeight:1 }}>{s.title}</h2>
          <p style={{ fontSize:13, color:"#4B5563", marginBottom:24, lineHeight:1.6 }}>{s.sub}</p>

          <div style={{ maxHeight:"50vh", overflowY:"auto", paddingRight:4 }}>{s.content}</div>

          <div style={{ display:"flex", gap:10, marginTop:24 }}>
            {step > 0 && (
              <button onClick={()=>setStep(s=>s-1)} style={{ flex:1, padding:13, background:"transparent", border:"1px solid #111827", borderRadius:8, color:"#6B7280", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:1, fontSize:14 }}>← BACK</button>
            )}
            <button onClick={()=>step<onboarding.length-1?setStep(s=>s+1):startCoach()} disabled={!s.valid} className={s.valid?"glow":""} style={{ flex:2, padding:13, background:s.valid?"#FFD166":"#111827", border:"none", borderRadius:8, color:s.valid?"#060810":"#374151", fontWeight:800, fontSize:15, cursor:s.valid?"pointer":"not-allowed", fontFamily:"'Bebas Neue',sans-serif", letterSpacing:2, transition:"all 0.2s" }}>
              {step<onboarding.length-1?"CONTINUE →":"BEGIN MY JOURNEY →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  const TABS = [["coach","🎯 Coach"],["stats","📊 Stats"],["rules","📋 Rules"]];

  return (
    <div style={{ height:"100vh", background:"#060810", display:"flex", flexDirection:"column", fontFamily:"'DM Sans',sans-serif", overflow:"hidden" }}>
      <style>{CSS}</style>

      {/* Header */}
      <div style={{ padding:"10px 18px", borderBottom:"1px solid #0d1117", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#080b12", flexShrink:0 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:"#FFD166", letterSpacing:2 }}>EDGEMIND</div>
        <div style={{ display:"flex", gap:5 }}>
          {[
            { v:`$${rules.profitTarget.value||rules.profitTarget.defaultVal}`, c:"#10B981", l:"TARGET" },
            { v:`$${rules.lossLimit.value||rules.lossLimit.defaultVal}`,    c:"#EF4444", l:"LIMIT" },
            { v:`${rules.sessionStart.value}–${rules.sessionEnd.value}`,    c:"#FFD166", l:"WINDOW" },
          ].map(r=>(
            <div key={r.l} style={{ padding:"3px 9px", background:"#0a0d14", border:`1px solid ${r.c}18`, borderRadius:4, textAlign:"center" }}>
              <div style={{ fontSize:9, color:"#374151", letterSpacing:"0.08em", fontWeight:700 }}>{r.l}</div>
              <div style={{ fontSize:11, color:r.c, fontWeight:700, marginTop:1 }}>{r.v}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", display:"inline-block" }} className="dot" />
          <span style={{ fontSize:12, color:"#374151", fontWeight:500 }}>{profile.name}</span>
          {streak > 0 && <span style={{ fontSize:11, padding:"2px 8px", background:"#FFD16615", border:"1px solid #FFD16625", borderRadius:10, color:"#FFD166" }}>🔥 {streak}</span>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid #0d1117", background:"#080b12", flexShrink:0 }}>
        {TABS.map(([id,label])=>(
          <button key={id} className="tab" onClick={()=>setActiveTab(id)} style={{ padding:"10px 18px", background:"transparent", border:"none", borderBottom:activeTab===id?"2px solid #FFD166":"2px solid transparent", color:activeTab===id?"#FFD166":"#374151", fontSize:13, cursor:"pointer", fontWeight:activeTab===id?600:400, fontFamily:"'DM Sans',sans-serif", transition:"color 0.15s" }}>{label}</button>
        ))}
      </div>

      {/* ── COACH TAB ── */}
      {activeTab==="coach" && <>
        <div style={{ flex:1, overflowY:"auto", padding:"18px 18px 0", display:"flex", flexDirection:"column", gap:14 }}>
          {messages.map((msg,i)=>(
            <div key={i} className="msg" style={{ display:"flex", flexDirection:msg.role==="user"?"row-reverse":"row", gap:10, alignItems:"flex-start" }}>
              <div style={{ width:28, height:28, borderRadius:6, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, background:msg.role==="user"?"#111827":"#0a0d14", border:`1px solid ${msg.role==="user"?"#1c2333":"#111827"}` }}>
                {msg.role==="user"?"👤":"🎯"}
              </div>
              <div style={{ maxWidth:"76%", display:"flex", flexDirection:"column", gap:3, alignItems:msg.role==="user"?"flex-end":"flex-start" }}>
                <div style={{ padding:"11px 14px", borderRadius:msg.role==="user"?"10px 3px 10px 10px":"3px 10px 10px 10px", background:msg.role==="user"?"#111827":"#0a0d14", border:`1px solid ${msg.role==="user"?"#1c2333":"#111827"}`, fontSize:13, lineHeight:1.75, color:msg.role==="user"?"#C7D2FE":"#D1D5DB", whiteSpace:"pre-wrap" }}>
                  <Md text={msg.content} />
                </div>
                <div style={{ fontSize:10, color:"#1F2937", padding:"0 3px" }}>{msg.role==="assistant"?"Coach":"You"} · {msg.time}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg" style={{ display:"flex", gap:10 }}>
              <div style={{ width:28, height:28, borderRadius:6, background:"#0a0d14", border:"1px solid #111827", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>🎯</div>
              <div style={{ padding:"13px 16px", background:"#0a0d14", border:"1px solid #111827", borderRadius:"3px 10px 10px 10px", display:"flex", gap:5, alignItems:"center" }}>
                {[0,0.2,0.4].map((d,i)=><div key={i} className="dot" style={{ width:6, height:6, borderRadius:"50%", background:"#FFD166", animationDelay:`${d}s` }} />)}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        <div style={{ padding:"10px 18px 0", display:"flex", gap:6, flexWrap:"wrap", flexShrink:0 }}>
          {[
            `Done. Made $${rules.profitTarget.value||500}. Rules: Yes ✅`,
            `Done. Lost $${rules.lossLimit.value||250}. Rules: Yes ✅`,
            "I want to keep trading 🚨",
            "I broke a rule",
            "Pre-session check-in",
          ].map(s=>(
            <button key={s} className="qbtn" onClick={()=>setInput(s)} style={{ padding:"4px 10px", background:"transparent", border:"1px solid #111827", borderRadius:14, color:"#374151", fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding:"10px 18px 16px", flexShrink:0 }}>
          <div style={{ display:"flex", gap:8, background:"#0a0d14", border:"1px solid #111827", borderRadius:10, padding:"8px 12px", alignItems:"flex-end" }}>
            <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}}
              placeholder="Check in or talk it through... (Enter to send)"
              rows={1}
              style={{ flex:1, background:"transparent", border:"none", color:"#E5E7EB", fontSize:13, fontFamily:"'DM Sans',sans-serif", resize:"none", lineHeight:1.5, maxHeight:100, overflowY:"auto" }}
              onInput={e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,100)+"px";}}
            />
            <button onClick={sendMessage} disabled={loading||!input.trim()} className="send-btn" style={{ width:32, height:32, borderRadius:6, background:!loading&&input.trim()?"#FFD166":"#111827", border:"none", color:!loading&&input.trim()?"#060810":"#374151", cursor:!loading&&input.trim()?"pointer":"not-allowed", fontSize:15, fontWeight:800, flexShrink:0, transition:"all 0.15s" }}>↑</button>
          </div>
          <div style={{ textAlign:"center", marginTop:6, fontSize:10, color:"#111827" }}>The rules were made by the calm version of you. Trust them.</div>
        </div>
      </>}

      {/* ── STATS TAB ── */}
      {activeTab==="stats" && (
        <div style={{ flex:1, overflowY:"auto", padding:18 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
            {[
              { l:"Total Sessions", v:sessions.length||"—", c:"#F9FAFB" },
              { l:"🔥 Streak", v:streak>0?`${streak} days`:"—", c:"#FFD166" },
              { l:"Discipline Rate", v:sessions.length?`${disciplineRate}%`:"—", c:disciplineRate>=80?"#10B981":disciplineRate>=50?"#FFD166":"#EF4444" },
              { l:"Total P&L", v:sessions.length?`${totalPnl>=0?"+":""}$${totalPnl.toLocaleString()}`:"—", c:totalPnl>=0?"#10B981":"#EF4444" },
            ].map(s=>(
              <div key={s.l} style={{ padding:"16px", background:"#0a0d14", border:"1px solid #111827", borderRadius:10 }}>
                <div style={{ fontSize:10, color:"#374151", marginBottom:6, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" }}>{s.l}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, color:s.c, letterSpacing:1 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:14, color:"#F9FAFB", letterSpacing:1, marginBottom:10 }}>SESSION HISTORY</div>
          {sessions.length===0 ? (
            <div style={{ padding:24, textAlign:"center", color:"#1F2937", fontSize:13, background:"#0a0d14", border:"1px solid #111827", borderRadius:10 }}>
              No sessions yet. Check in after your first trade.
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {[...sessions].reverse().map((s,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 14px", background:"#0a0d14", border:"1px solid #111827", borderRadius:8 }}>
                  <span style={{ fontSize:11, color:"#374151" }}>{s.date}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:s.pnl>=0?"#10B981":"#EF4444" }}>{s.pnl>=0?"+":""}${s.pnl}</span>
                  <span style={{ fontSize:11, padding:"2px 8px", borderRadius:10, background:s.rulesFollowed?"#10B98118":"#EF444418", color:s.rulesFollowed?"#10B981":"#EF4444", fontWeight:600 }}>
                    {s.rulesFollowed?"✓ Rules kept":"✗ Rules broken"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── RULES TAB ── */}
      {activeTab==="rules" && (
        <div style={{ flex:1, overflowY:"auto", padding:18 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#F9FAFB", letterSpacing:1, marginBottom:4 }}>YOUR RULE SYSTEM</div>
          <div style={{ fontSize:12, color:"#374151", marginBottom:20 }}>Set by you. Enforced by your coach. These do not bend.</div>

          {CATEGORIES.map(cat=>{
            const catRules = enabledRules.filter(([,v])=>v.category===cat.id);
            if(catRules.length===0) return null;
            return (
              <div key={cat.id} style={{ marginBottom:14 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, color:"#FFD166", letterSpacing:1, marginBottom:8 }}>{cat.label}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {catRules.map(([key,rule])=>(
                    <div key={key} style={{ display:"flex", gap:12, alignItems:"center", padding:"12px 14px", background:"#0a0d14", border:"1px solid #111827", borderRadius:8 }}>
                      <span style={{ fontSize:18 }}>{rule.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, color:"#6B7280", fontWeight:600 }}>{rule.label}</div>
                        <div style={{ fontSize:11, color:"#374151", marginTop:2 }}>{rule.desc}</div>
                      </div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, color:"#FFD166", letterSpacing:0.5 }}>{ruleValueDisplay(key,rule)}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{ padding:"16px", background:"#FFD16608", border:"1px solid #FFD16618", borderRadius:10, marginTop:8 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, color:"#FFD166", letterSpacing:1, marginBottom:6 }}>YOUR CHALLENGE TO OVERCOME</div>
            <div style={{ fontSize:14, color:"#D1D5DB", lineHeight:1.6 }}>{(profile.challenges||[]).join(", ")}</div>
          </div>

          <div style={{ padding:"14px 16px", background:"#0a0d14", border:"1px solid #111827", borderRadius:10, marginTop:10 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, color:"#6B7280", letterSpacing:1, marginBottom:6 }}>THE RULE ABOVE ALL RULES</div>
            <div style={{ fontSize:13, color:"#4B5563", lineHeight:1.7, fontStyle:"italic" }}>
              "The rules you set when calm are the only rules that count. The version of you that wants to break them is not qualified to make trading decisions."
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
