import { useState, useRef, useEffect } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    nav_cta: "START FREE TRIAL",
    hero_line1: "YOU CAN MAKE",
    hero_line2: "MONEY IN THE",
    hero_line3: "MARKET.",
    hero_sub: "Most traders lose not because of their strategy — but because of their mind.",
    hero_body: "EdgeMind is a performance coaching system built on the same psychology frameworks used by professional prop firm coaches. Your rules. Your accountability. Delivered to your phone every single day.",
    hero_cta: "BUILD MY RULE SYSTEM →",
    hero_trial: "7-day free trial · No credit card required",
    stat1_v: "73%", stat1_d: "of trader failures are psychological, not strategic",
    stat2_v: "Daily Coaching", stat2_d: "briefings, check-ins, and accountability — every session",
    stat3_v: "$15/mo", stat3_d: "less than one single prop firm reset fee",
    feat1_t: "Money Rules", feat1_d: "Profit targets, loss limits, single-trade caps, weekly drawdown protection — locked before you open the platform.",
    feat2_t: "Time Rules", feat2_d: "Session windows, time-based exits, news blackouts, mandatory rest days — structure is your edge.",
    feat3_t: "Behavior Rules", feat3_d: "Overtrading limits, consecutive loss protocols, stress-state rules — the patterns that destroy accounts, addressed directly.",
    feat4_t: "Identity Rules", feat4_d: "Journaling, weekly reviews, discipline scoring, custom rules — because who you are as a trader matters more than any setup.",
    pricing_title: "SIMPLE PRICING.",
    pricing_sub: "Choose your level of accountability.",
    plan1_name: "ACCOUNTABILITY", plan1_price_mo: "$15", plan1_price_yr: "$129", plan1_per_mo: "/month", plan1_per_yr: "/year",
    plan1_desc: "Daily coaching structure for the trader who knows what to do — but struggles to do it consistently.",
    plan1_features: ["Morning briefing (7:00 AM)", "Rules reminder (8:15 AM)", "Post-market recap", "Evening check-in", "5 coaching interactions/day"],
    plan2_name: "PERFORMANCE", plan2_price_mo: "$29", plan2_price_yr: "$249", plan2_per_mo: "/month", plan2_per_yr: "/year",
    plan2_desc: "Active coaching throughout your session — briefings, check-ins, recaps, and a coach who holds you to your word.",
    plan2_badge: "MOST POPULAR",
    plan2_features: ["Everything in Accountability", "Intra-session check-ins", "End of day recap", "Sunday weekly review", "15 coaching interactions/day"],
    plan3_name: "ELITE COACH", plan3_price_mo: "$59", plan3_price_yr: "$499", plan3_per_mo: "/month", plan3_per_yr: "/year",
    plan3_desc: "Full-access coaching for the serious prop trader. Your coach is available every time you need it, every session.",
    plan3_features: ["Everything in Performance", "Priority coaching responses", "Unlimited daily check-ins", "Weekly performance review", "Unlimited sessions/day"],
    plan_cta: "START FREE TRIAL →",
    plan_trial: "7-day free trial · Cancel anytime",
    annual_save: "SAVE 30%",
    billing_mo: "Monthly",
    billing_yr: "Annual",
  },
  es: {
    nav_cta: "PRUEBA GRATIS",
    hero_line1: "PUEDES GANAR",
    hero_line2: "DINERO EN EL",
    hero_line3: "MERCADO.",
    hero_sub: "La mayoría de los traders fallan por su mente, no por su estrategia.",
    hero_body: "EdgeMind es un sistema de coaching de rendimiento construido sobre los mismos marcos psicológicos que usan los coaches profesionales de prop firms. Tus reglas. Tu responsabilidad. Entregadas a tu teléfono cada día.",
    hero_cta: "CONSTRUIR MI SISTEMA →",
    hero_trial: "7 días gratis · Sin tarjeta de crédito",
    stat1_v: "73%", stat1_d: "de los fracasos son psicológicos, no estratégicos",
    stat2_v: "Coaching Diario", stat2_d: "briefings, check-ins y responsabilidad — en cada sesión",
    stat3_v: "$15/mes", stat3_d: "menos que un solo reset de firma prop",
    feat1_t: "Reglas de Dinero", feat1_d: "Objetivos diarios, límites de pérdida, protección semanal.",
    feat2_t: "Reglas de Tiempo", feat2_d: "Ventanas de trading, límites de sesión, apagones de noticias.",
    feat3_t: "Reglas de Comportamiento", feat3_d: "Límites de trades, paradas por pérdidas consecutivas.",
    feat4_t: "Reglas de Identidad", feat4_d: "Journaling, revisiones semanales, seguimiento de disciplina.",
    pricing_title: "PRECIOS SIMPLES.",
    pricing_sub: "Elige tu nivel de responsabilidad.",
    plan1_name: "RESPONSABILIDAD", plan1_price_mo: "$15", plan1_price_yr: "$129", plan1_per_mo: "/mes", plan1_per_yr: "/año",
    plan1_desc: "Estructura de coaching diaria para el trader que sabe lo que debe hacer — pero lucha para hacerlo consistentemente.",
    plan1_features: ["Briefing matutino (7:00 AM)", "Recordatorio de reglas (8:15 AM)", "Resumen post-mercado", "Check-in nocturno", "5 interacciones de coaching/día"],
    plan2_name: "RENDIMIENTO", plan2_price_mo: "$29", plan2_price_yr: "$249", plan2_per_mo: "/mes", plan2_per_yr: "/año",
    plan2_desc: "Coaching activo durante toda tu sesión — briefings, check-ins, recaps y un coach que te mantiene en tu palabra.",
    plan2_badge: "MÁS POPULAR",
    plan2_features: ["Todo en Responsabilidad", "Check-ins durante la sesión", "Resumen del día", "Revisión semanal dominical", "15 interacciones/día"],
    plan3_name: "COACH ÉLITE", plan3_price_mo: "$59", plan3_price_yr: "$499", plan3_per_mo: "/mes", plan3_per_yr: "/año",
    plan3_desc: "Coaching completo para el trader prop serio. Tu coach está disponible cada vez que lo necesitas.",
    plan3_features: ["Todo en Rendimiento", "Respuestas de coaching prioritarias", "Check-ins ilimitados al día", "Revisión semanal de rendimiento", "Sesiones ilimitadas/día"],
    plan_cta: "COMENZAR PRUEBA GRATIS →",
    plan_trial: "7 días de prueba · Cancela cuando quieras",
    annual_save: "AHORRA 30%",
    billing_mo: "Mensual",
    billing_yr: "Anual",
  },
  pt: {
    nav_cta: "TESTE GRÁTIS",
    hero_line1: "VOCÊ PODE",
    hero_line2: "LUCRAR NO",
    hero_line3: "MERCADO.",
    hero_sub: "A maioria dos traders falha pela mente, não pela estratégia.",
    hero_body: "EdgeMind é um sistema de coaching de performance construído sobre os mesmos frameworks psicológicos usados por coaches profissionais de prop firms. Suas regras. Sua responsabilidade. Entregues no seu celular todos os dias.",
    hero_cta: "CRIAR MEU SISTEMA →",
    hero_trial: "7 dias grátis · Sem cartão de crédito",
    stat1_v: "73%", stat1_d: "das falhas de traders são psicológicas, não estratégicas",
    stat2_v: "Coaching Diário", stat2_d: "briefings, check-ins e responsabilidade — em cada sessão",
    stat3_v: "$15/mês", stat3_d: "menos que um único reset de firma prop",
    feat1_t: "Regras Financeiras", feat1_d: "Metas diárias, limites de perda, proteção semanal de drawdown.",
    feat2_t: "Regras de Tempo", feat2_d: "Janelas de trading, limites de sessão, bloqueios de notícias.",
    feat3_t: "Regras de Comportamento", feat3_d: "Limites de trades, paradas por perdas consecutivas.",
    feat4_t: "Regras de Identidade", feat4_d: "Journaling, revisões semanais, rastreamento de disciplina.",
    pricing_title: "PREÇOS SIMPLES.",
    pricing_sub: "Escolha seu nível de responsabilidade.",
    plan1_name: "RESPONSABILIDADE", plan1_price_mo: "$15", plan1_price_yr: "$129", plan1_per_mo: "/mês", plan1_per_yr: "/ano",
    plan1_desc: "Estrutura de coaching diária para o trader que sabe o que fazer — mas luta para fazer isso consistentemente.",
    plan1_features: ["Briefing matinal (7:00 AM)", "Lembrete de regras (8:15 AM)", "Resumo pós-mercado", "Check-in noturno", "5 interações de coaching/dia"],
    plan2_name: "PERFORMANCE", plan2_price_mo: "$29", plan2_price_yr: "$249", plan2_per_mo: "/mês", plan2_per_yr: "/ano",
    plan2_desc: "Coaching ativo durante toda a sua sessão — briefings, check-ins, recaps e um coach que te mantém fiel às suas regras.",
    plan2_badge: "MAIS POPULAR",
    plan2_features: ["Tudo em Responsabilidade", "Check-ins durante a sessão", "Resumo do dia", "Revisão semanal de domingo", "15 interações/dia"],
    plan3_name: "COACH ELITE", plan3_price_mo: "$59", plan3_price_yr: "$499", plan3_per_mo: "/mês", plan3_per_yr: "/ano",
    plan3_desc: "Coaching completo para o trader prop sério. Seu coach está disponível sempre que você precisar.",
    plan3_features: ["Tudo em Performance", "Respostas de coaching prioritárias", "Check-ins ilimitados por dia", "Revisão semanal de desempenho", "Sessões ilimitadas/dia"],
    plan_cta: "COMEÇAR TESTE GRÁTIS →",
    plan_trial: "7 dias de teste · Cancele quando quiser",
    annual_save: "ECONOMIZE 30%",
    billing_mo: "Mensal",
    billing_yr: "Anual",
  },
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const VALID_PROMOS = {
  "FREE10": { plan: "performance", months: 3, label: "3 months Performance FREE" },
  "ELITE30": { plan: "elite", months: 1, label: "1 month Elite Coach FREE" },
};

const TESTIMONIALS = [
  { name: "Marcus T.", platform: "TopStep", quote: "I stopped revenge trading completely after 2 weeks. My discipline score went from 42 to 87.", result: "+$4,200 saved in avoided losses", avatar: "MT" },
  { name: "Sofia R.", platform: "FTMO", quote: "The morning briefing alone changed everything. I show up prepared now instead of reactive.", result: "Passed FTMO challenge on first try", avatar: "SR" },
  { name: "James K.", platform: "Apex Trader", quote: "Lost 3 accounts before EdgeMind. Haven't broken a rule in 31 days straight.", result: "🔥 31-day streak active", avatar: "JK" },
  { name: "Diego M.", platform: "Retail", quote: "The emergency stop button has saved me at least 4 times when I was about to revenge trade.", result: "+$2,800 protected capital", avatar: "DM" },
];

const ACTIVE_TRADERS = 847;

const buildSystemPrompt = (profile, rules, quizAnswers) => {
  const rulesList = Object.entries(rules).filter(([,v])=>v.enabled).map(([,v])=>`• ${v.label}: ${v.value}`).join("\n");
  const quizContext = quizAnswers ? `\nPRE-SESSION STATE:\n- Sleep quality: ${quizAnswers.sleep}/5\n- Stress level: ${quizAnswers.stress}/5\n- Financial pressure today: ${quizAnswers.pressure}` : "";
  return `You are an elite trading performance coach named EdgeMind. You are direct, warm, honest, and deeply knowledgeable about trader psychology. You do not lecture. You coach. You never mention being an AI or a bot — you are simply the trader's coach. If asked what you are, say you are a performance coaching system built on proven psychological frameworks.

TRADER PROFILE:
- Name: ${profile.name}
- Experience: ${profile.experience}
- Platform: ${profile.platform}
- Instrument: ${profile.instrument}
- Biggest Challenges: ${(profile.challenges||[]).join(", ")}
${quizContext}

THEIR NON-NEGOTIABLE RULES:
${rulesList}

YOUR COACHING PHILOSOPHY:
- The market is not the enemy. The trader's own psychology is.
- Rules set when calm are the only rules that count. The emotional version of a trader is not qualified to make trading decisions.
- Discipline is a skill built through structure, accountability, and repetition.
- Your motto: "You can make money in the market — but are you disciplined enough to keep it?"

KEY PSYCHOLOGICAL PATTERNS YOU UNDERSTAND DEEPLY:
- Revenge trading: loss → emotional escalation → bigger loss
- "I can always make more" trap: destroys winning days
- Identity attachment to P&L: self-worth tied to daily results
- Self-sabotage cycles: unconscious destruction of success
- Dopamine-seeking: trading for the high, not the edge
- Rule abandonment under stress: prefrontal cortex goes offline under pressure

YOUR ROLE:
- Be their daily accountability partner
- When rules followed: celebrate genuinely, reinforce their identity as a disciplined trader
- When rules broken: no shame, but be direct — identify the trigger, name the pattern, redirect
- For check-ins (Done. Made/Lost $X. Rules: Yes/No): respond in under 120 words unless they need more
- Always ask ONE focused coaching question per response to build self-awareness
- Reference their specific rules and challenges by name
- Never be generic. Every response should feel written specifically for this trader.
- If pre-session stress is high (4-5) or sleep is poor (1-2): warn them gently before they trade

BROKEN RULE PROTOCOL:
When a rule is broken: (1) acknowledge without shame, (2) identify the psychological pattern, (3) ask what triggered it, (4) redirect to the rule and why it exists.

EMERGENCY STOP PROTOCOL:
If user sends 🚨 STOP or mentions emergency stop: immediately respond with a calming circuit breaker. Tell them to close the platform NOW, step away for 10 minutes, and come back only when they can name what emotion triggered the urge. Be firm but compassionate.

DAILY CHECK-IN FORMAT: "Done. Made/Lost $X. Rules: Yes/No"`;
};

const DEFAULT_RULES = {
  profitTarget:     { label:"Daily Profit Target",            category:"money",    type:"dollar",  defaultVal:"500",  icon:"💰", desc:"Hit this → close platform immediately. No exceptions.", enabled:true },
  lossLimit:        { label:"Daily Loss Limit",               category:"money",    type:"dollar",  defaultVal:"250",  icon:"🛑", desc:"Hit this → close platform immediately. No revenge.", enabled:true },
  singleTradeLoss:  { label:"Max Loss Per Single Trade",      category:"money",    type:"dollar",  defaultVal:"100",  icon:"⚡", desc:"One bad trade cannot destroy your day.", enabled:false },
  weeklyLoss:       { label:"Weekly Loss Limit",              category:"money",    type:"dollar",  defaultVal:"1000", icon:"📅", desc:"Hit this mid-week → done until Monday.", enabled:false },
  sessionStart:     { label:"Session Start Time",             category:"time",     type:"time",    defaultVal:"08:30",icon:"⏰", desc:"You do not exist as a trader before this time.", enabled:true },
  sessionEnd:       { label:"Session End Time",               category:"time",     type:"time",    defaultVal:"10:30",icon:"⏰", desc:"You do not exist as a trader after this time.", enabled:true },
  maxSessionMins:   { label:"Max Session Duration (mins)",    category:"time",     type:"number",  defaultVal:"120",  icon:"⌛", desc:"Even inside your window — 2 hours maximum.", enabled:false },
  noNewsBefore:     { label:"No Trading X mins Before News",  category:"time",     type:"number",  defaultVal:"30",   icon:"📰", desc:"News events are not setups. They are gambling.", enabled:false },
  consecLossDays:   { label:"Consecutive Loss Days = Day Off",category:"time",     type:"number",  defaultVal:"3",    icon:"🔄", desc:"3 red days in a row → mandatory day off.", enabled:false },
  maxTrades:        { label:"Max Trades Per Day",             category:"behavior", type:"number",  defaultVal:"5",    icon:"🎯", desc:"Overtrading is a compulsion, not a strategy.", enabled:false },
  consecLossTrades: { label:"Consecutive Losses = Stop",     category:"behavior", type:"number",  defaultVal:"3",    icon:"🚨", desc:"3 losing trades in a row → mindset is compromised.", enabled:false },
  noAddToLoser:     { label:"Never Add To A Losing Position", category:"behavior", type:"toggle",  defaultVal:"true", icon:"🚫", desc:"This is how accounts die. Non-negotiable.", enabled:false },
  noStressTrading:  { label:"No Trading After Stressful Events",category:"behavior",type:"toggle", defaultVal:"true", icon:"🧠", desc:"Argument, anxiety, bad news = no trading.", enabled:false },
  preRoutine:       { label:"Pre-Session Routine Required",   category:"behavior", type:"toggle",  defaultVal:"true", icon:"🌅", desc:"No routine completed = no trading. Period.", enabled:false },
  journalRequired:  { label:"Journal Every Session",          category:"identity", type:"toggle",  defaultVal:"true", icon:"📓", desc:"3 sentences: what happened, how you felt, what changes.", enabled:false },
  weeklyReview:     { label:"Weekly Review Every Sunday",     category:"identity", type:"toggle",  defaultVal:"true", icon:"📊", desc:"Review discipline rate, not just P&L.", enabled:false },
  celebrateDiscipline:{label:"Celebrate Rules, Not Just Profit",category:"identity",type:"toggle", defaultVal:"true", icon:"🏆", desc:"A disciplined losing day beats an undisciplined winning day.", enabled:false },
  customRule1:      { label:"Custom Rule",                    category:"identity", type:"text",    defaultVal:"",     icon:"✍️", desc:"Your own rule in your own words.", enabled:false },
};

const CATEGORIES = [
  { id:"money",    label:"💰 Money Rules",    desc:"Protect your capital at all costs" },
  { id:"time",     label:"⏰ Time Rules",     desc:"When you trade matters as much as how" },
  { id:"behavior", label:"🧠 Behavior Rules", desc:"Target psychological patterns directly" },
  { id:"identity", label:"🏆 Identity Rules", desc:"Who you are as a trader, every single day" },
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

const EXPERIENCES = ["Under 1 year","1–2 years","2–5 years","5–10 years","10+ years"];
const PLATFORMS   = ["TopStep","FTMO","Apex Trader Funding","My Funded Futures","Bulenox","Retail (no prop firm)","Other"];
const INSTRUMENTS = ["Futures (ES, NQ, MNQ, MES)","Forex","Stocks","Options","Crypto","Multiple"];

const formatTime12 = () => new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});

// ─── DISCIPLINE SCORE ─────────────────────────────────────────────────────────
const calcDisciplineScore = (sessions, streak) => {
  if (sessions.length === 0) return 0;
  const rateScore    = (sessions.filter(s=>s.rulesFollowed).length / sessions.length) * 50;
  const streakScore  = Math.min(streak * 2, 30);
  const volumeScore  = Math.min(sessions.length * 2, 20);
  return Math.round(rateScore + streakScore + volumeScore);
};

const scoreColor = (score) => {
  if (score >= 80) return "#00E676";
  if (score >= 60) return "#FFD166";
  if (score >= 40) return "#FB923C";
  return "#EF4444";
};

const scoreLabel = (score) => {
  if (score >= 80) return "ELITE";
  if (score >= 60) return "SOLID";
  if (score >= 40) return "BUILDING";
  return "STARTING";
};

// ─── MARKDOWN ─────────────────────────────────────────────────────────────────
const Md = ({ text }) => {
  const lines = (text||"").split("\n");
  return lines.map((line,li) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return (
      <span key={li}>
        {parts.map((p,i) => {
          if (p.startsWith("**")&&p.endsWith("**")) return <strong key={i} style={{color:"#00E676",fontWeight:700}}>{p.slice(2,-2)}</strong>;
          if (p.startsWith("*")&&p.endsWith("*"))   return <em key={i} style={{color:"#6FCF6F"}}>{p.slice(1,-1)}</em>;
          return <span key={i}>{p}</span>;
        })}
        {li < lines.length-1 && <br/>}
      </span>
    );
  });
};

const ruleValueDisplay = (key, rule) => {
  if (!rule.enabled) return null;
  if (rule.type==="dollar")  return `$${rule.value||rule.defaultVal}`;
  if (rule.type==="time")    return rule.value||rule.defaultVal;
  if (rule.type==="number")  return rule.value||rule.defaultVal;
  if (rule.type==="toggle")  return "Active";
  if (rule.type==="text")    return rule.value||"Set";
  return rule.value;
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]               = useState("en");
  const t = T[lang];

  const [screen, setScreen]           = useState("landing");
  const [step, setStep]               = useState(0);
  const [profile, setProfile]         = useState({ name:"", experience:"", platform:"", instrument:"", challenges:[], phone:"" });
  const [rules, setRules]             = useState(() => { const r={}; Object.entries(DEFAULT_RULES).forEach(([k,v])=>{r[k]={...v,value:v.defaultVal};}); return r; });
  const [messages, setMessages]       = useState([]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [activeTab, setActiveTab]     = useState("coach");
  const [sessions, setSessions]       = useState([]);
  const [streak, setStreak]           = useState(0);
  const [expandedCat, setExpandedCat] = useState("money");
  const [selectedPlan, setSelectedPlan] = useState("performance");
  const [billing, setBilling]         = useState("monthly"); // monthly | annual
  const [promoCode, setPromoCode]     = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError]   = useState("");
  const [quizAnswers, setQuizAnswers] = useState(null);
  const [showQuiz, setShowQuiz]       = useState(false);
  const [quizStep, setQuizStep]       = useState(0);
  const [tempQuiz, setTempQuiz]       = useState({ sleep:3, stress:3, pressure:"no" });
  const [referralCode]                = useState(() => "EDGE" + Math.random().toString(36).substr(2,6).toUpperCase());
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [calcLoss, setCalcLoss]       = useState("");
  const [showCalcResult, setShowCalcResult] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  useEffect(()=>{ messagesEndRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  const enabledRules      = Object.entries(rules).filter(([,v])=>v.enabled);
  const disciplineScore   = calcDisciplineScore(sessions, streak);
  const totalPnl          = sessions.reduce((a,s)=>a+s.pnl, 0);
  const disciplineRate    = sessions.length > 0 ? Math.round((sessions.filter(s=>s.rulesFollowed).length/sessions.length)*100) : 0;

  const toggleRule   = (key) => setRules(prev=>({...prev,[key]:{...prev[key],enabled:!prev[key].enabled}}));
  const setRuleValue = (key,val) => setRules(prev=>({...prev,[key]:{...prev[key],value:val}}));

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (VALID_PROMOS[code]) {
      setPromoApplied(VALID_PROMOS[code]);
      setSelectedPlan(VALID_PROMOS[code].plan);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try FREE10.");
      setPromoApplied(null);
    }
  };

  const startCoach = async () => {
    const ruleLines = enabledRules.map(([,v])=>`${v.icon} **${v.label}:** ${ruleValueDisplay(null,v)}`).join("\n");
    setMessages([{
      role:"assistant",
      content:`Welcome, ${profile.name}. I've read your profile and I know your rules.\n\nYour rules are locked:\n${ruleLines}\n\nThese were set by the calm, rational version of you. Trust them.\n\n📱 Your coach just sent you a WhatsApp message — check your phone and confirm you received it.\n\nBefore your next session, complete your **pre-session check** using the button above the chat.`,
      time:formatTime12(),
    }]);
    try {
      const rulesPayload = {};
      enabledRules.forEach(([k,v])=>{ rulesPayload[k]={label:v.label,value:v.value||v.defaultVal,icon:v.icon}; });
      await fetch("https://edgemind-backend-production.up.railway.app/api/onboard", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ phone:profile.phone, name:profile.name, experience:profile.experience, platform:profile.platform, instrument:profile.instrument, challenges:profile.challenges, rules:rulesPayload, plan:selectedPlan, promoCode:promoApplied?promoCode:"" }),
      });
    } catch(e){ console.log("Onboard error",e); }
    setScreen("success");
  };

  const sendMessage = async (overrideInput) => {
    const msg = (overrideInput || input).trim();
    if (!msg || loading) return;
    const userMsg = { role:"user", content:msg, time:formatTime12() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    const lower = msg.toLowerCase();
    if (lower.includes("done") && (lower.includes("made")||lower.includes("lost"))) {
      const madeMatch = msg.match(/made \$?([\d,]+)/i);
      const lostMatch = msg.match(/lost \$?([\d,]+)/i);
      const rulesYes  = /rules?\s*:?\s*yes/i.test(msg);
      const pnl = madeMatch ? parseInt(madeMatch[1].replace(/,/g,"")) : lostMatch ? -parseInt(lostMatch[1].replace(/,/g,"")) : 0;
      setSessions(prev=>[...prev,{date:new Date().toLocaleDateString(),pnl,rulesFollowed:rulesYes,time:formatTime12()}]);
      setStreak(s=>rulesYes?s+1:0);
    }
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://edgemind-backend-production.up.railway.app/api/chat", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ profile, rules, quizAnswers, messages:newMsgs.map(m=>({role:m.role,content:m.content})) }),
      });
      const data = await res.json();
      setMessages(prev=>[...prev,{role:"assistant",content:data.reply||"I'm here. Keep going.",time:formatTime12()}]);
    } catch {
      setMessages(prev=>[...prev,{role:"assistant",content:"Connection issue. Your rules haven't changed.",time:formatTime12()}]);
    }
    setLoading(false);
  };

  const triggerEmergencyStop = async () => {
    setEmergencyActive(true);
    await sendMessage("🚨 EMERGENCY STOP — I need to stop trading RIGHT NOW");
    setTimeout(()=>setEmergencyActive(false), 3000);
  };

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::-webkit-scrollbar{width:3px;}
    ::-webkit-scrollbar-thumb{background:#1E3020;border-radius:2px;}
    .fade{animation:fade 0.8s ease forwards;}
    .up{animation:up 0.5s ease forwards;}
    .up2{animation:up 0.5s 0.1s ease both;}
    .up3{animation:up 0.5s 0.2s ease both;}
    @keyframes fade{from{opacity:0}to{opacity:1}}
    @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .msg{animation:msg 0.25s ease forwards;}
    @keyframes msg{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
    .dot{animation:blink 1.4s infinite;}
    .score-ring{animation:spin 2s linear infinite;}
    @keyframes spin{from{stroke-dashoffset:220}to{stroke-dashoffset:0}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
    .rule-row:hover{background:#182818!important;}
    .tab:hover{color:#00E676!important;}
    .qbtn:hover{border-color:#00E67660!important;color:#00E676!important;}
    .glow:hover{box-shadow:0 0 32px #00E67655;transform:translateY(-2px);}
    .plan-card{transition:all 0.25s ease;cursor:pointer;}
    .plan-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px #00E67612;}
    .lang-btn:hover{color:#00E676!important;border-color:#00E67660!important;}
    .cat-btn:hover{background:#182818!important;}
    .send-btn:hover{opacity:0.9;}
    .emergency-pulse{animation:pulse 1s ease-in-out infinite;}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 #EF444460}50%{box-shadow:0 0 0 12px #EF444400}}
    .testimonial-card{transition:all 0.2s ease;}
    .testimonial-card:hover{border-color:#00E67640!important;transform:translateY(-2px);}
    .billing-toggle{background:#111C11;border-radius:8px;padding:3px;display:inline-flex;}
    .billing-btn{padding:6px 16px;border-radius:6px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.05em;transition:all 0.15s;}
    input[type=range]{accent-color:#00E676;}
    input[type=time]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
    select option{background:#0F150F;}
    textarea:focus,input:focus,select:focus{outline:none;}
    .hero-section{background:radial-gradient(ellipse 90% 60% at 50% -5%,#00E67614 0%,transparent 65%),radial-gradient(ellipse 50% 40% at 85% 40%,#00BFA50A 0%,transparent 55%);}
    .pricing-section{background:linear-gradient(180deg,#080C08 0%,#0C150C 40%,#080C08 100%);border-top:1px solid #182818;border-bottom:1px solid #182818;}
  `;

  const inp = { width:"100%",padding:"10px 14px",background:"#0F150F",border:"1px solid #182818",borderRadius:8,color:"#D4F5D4",fontSize:14,fontFamily:"'DM Sans',sans-serif",transition:"border-color 0.2s" };
  const lbl = { display:"block",fontSize:11,color:"#4E8050",marginBottom:6,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase" };

  const PLANS = [
    { id:"accountability", name:t.plan1_name, price_mo:t.plan1_price_mo, price_yr:t.plan1_price_yr, per_mo:t.plan1_per_mo, per_yr:t.plan1_per_yr, desc:t.plan1_desc, features:t.plan1_features, color:"#4E8050", badge:null },
    { id:"performance",    name:t.plan2_name, price_mo:t.plan2_price_mo, price_yr:t.plan2_price_yr, per_mo:t.plan2_per_mo, per_yr:t.plan2_per_yr, desc:t.plan2_desc, features:t.plan2_features, color:"#00E676", badge:t.plan2_badge },
    { id:"elite",          name:t.plan3_name, price_mo:t.plan3_price_mo, price_yr:t.plan3_price_yr, per_mo:t.plan3_per_mo, per_yr:t.plan3_per_yr, desc:t.plan3_desc, features:t.plan3_features, color:"#00BFA5", badge:null },
  ];

  // ── PRE-SESSION QUIZ OVERLAY ──────────────────────────────────────────────
  if (showQuiz) {
    const quizQs = [
      { q:"How did you sleep last night?", key:"sleep", type:"scale", min:"Terrible", max:"Great" },
      { q:"What's your stress level right now?", key:"stress", type:"scale", min:"Calm", max:"Stressed" },
      { q:"Any financial pressure driving you to trade today?", key:"pressure", type:"yesno" },
    ];
    const qq = quizQs[quizStep];
    const isLast = quizStep === quizQs.length - 1;
    return (
      <div style={{ position:"fixed",inset:0,background:"#060C06ee",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:24 }}>
        <style>{CSS}</style>
        <div className="up" style={{ width:"100%",maxWidth:400,background:"#0F150F",border:"1px solid #182818",borderRadius:16,padding:32 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:11,color:"#4E8050",letterSpacing:2,marginBottom:8 }}>PRE-SESSION CHECK · {quizStep+1}/{quizQs.length}</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:"#F0FFF4",marginBottom:24,lineHeight:1.1 }}>{qq.q}</h2>
          {qq.type==="scale" && (
            <div>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:"#3D6B3D",marginBottom:8 }}><span>{qq.min}</span><span>{qq.max}</span></div>
              <input type="range" min="1" max="5" value={tempQuiz[qq.key]} onChange={e=>setTempQuiz({...tempQuiz,[qq.key]:parseInt(e.target.value)})} style={{ width:"100%",marginBottom:12 }} />
              <div style={{ textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:"#00E676" }}>{tempQuiz[qq.key]}/5</div>
            </div>
          )}
          {qq.type==="yesno" && (
            <div style={{ display:"flex",gap:12 }}>
              {["yes","no"].map(v=>(
                <button key={v} onClick={()=>setTempQuiz({...tempQuiz,pressure:v})} style={{ flex:1,padding:16,background:tempQuiz.pressure===v?"#00E67620":"transparent",border:`2px solid ${tempQuiz.pressure===v?"#00E676":"#182818"}`,borderRadius:10,color:tempQuiz.pressure===v?"#00E676":"#3D6B3D",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:1,cursor:"pointer",transition:"all 0.15s" }}>
                  {v.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <div style={{ display:"flex",gap:10,marginTop:24 }}>
            {quizStep > 0 && <button onClick={()=>setQuizStep(s=>s-1)} style={{ padding:"10px 18px",background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#3D6B3D",cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,fontSize:13 }}>← BACK</button>}
            <button onClick={()=>{
              if (!isLast) { setQuizStep(s=>s+1); }
              else {
                setQuizAnswers(tempQuiz);
                setShowQuiz(false);
                const warn = tempQuiz.sleep<=2 || tempQuiz.stress>=4 || tempQuiz.pressure==="yes";
                const warnMsg = warn
                  ? `Quiz complete. I have to be honest with you, ${profile.name} — I'm a little concerned about your state today.\n\n${tempQuiz.sleep<=2?"🔴 **Poor sleep** impairs the prefrontal cortex — the part that enforces your rules.\n":""}${tempQuiz.stress>=4?"🔴 **High stress** means your emotional brain is running the show right now.\n":""}${tempQuiz.pressure==="yes"?"🔴 **Financial pressure** is the #1 cause of revenge trading.\n":""}\nYou CAN trade today — but your rules are now more important than ever. What's your plan if you hit your loss limit in the first 30 minutes?`
                  : `Pre-session check complete. Sleep: ${tempQuiz.sleep}/5 · Stress: ${tempQuiz.stress}/5 · Pressure: ${tempQuiz.pressure}.\n\nYou're in a solid state today, ${profile.name}. Trust your rules, execute your edge, and close the platform the moment you hit your target.\n\nWhat time is your session starting today?`;
                setMessages(prev=>[...prev,{role:"assistant",content:warnMsg,time:formatTime12()}]);
              }
            }} className="glow" style={{ flex:1,padding:12,background:"#00E676",border:"none",borderRadius:8,color:"#080C08",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.2s" }}>
              {isLast?"SUBMIT →":"NEXT →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── LANDING ───────────────────────────────────────────────────────────────
  if (screen === "landing") return (
    <div style={{ minHeight:"100vh",background:"#080C08",fontFamily:"'DM Sans',sans-serif",color:"#D4F5D4" }}>
      <style>{CSS}</style>

      {/* Nav */}
      <nav style={{ padding:"16px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #111C11",position:"sticky",top:0,background:"#080C08ee",backdropFilter:"blur(8px)",zIndex:100 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:"#00E676",letterSpacing:2 }}>EDGEMIND</div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          {["en","es","pt"].map(l=>(
            <button key={l} className="lang-btn" onClick={()=>setLang(l)} style={{ padding:"4px 10px",background:"transparent",border:`1px solid ${lang===l?"#00E676":"#1E3020"}`,borderRadius:4,color:lang===l?"#00E676":"#3D6B3D",fontSize:11,cursor:"pointer",fontWeight:700,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.06em",transition:"all 0.15s",textTransform:"uppercase" }}>{l}</button>
          ))}
          <div style={{ width:1,height:20,background:"#1E3020",margin:"0 4px" }} />
          <div style={{ display:"flex",alignItems:"center",gap:5,padding:"4px 10px",background:"#00E67610",border:"1px solid #00E67620",borderRadius:20 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"#00E676",animation:"blink 1.4s infinite" }} />
            <span style={{ fontSize:11,color:"#4E8050",fontWeight:600 }}>{ACTIVE_TRADERS.toLocaleString()} traders active</span>
          </div>
          <button onClick={()=>setScreen("onboarding")} className="glow" style={{ padding:"9px 22px",background:"#00E676",border:"none",borderRadius:6,color:"#080C08",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.2s" }}>
            {t.nav_cta}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-section">
        <div style={{ maxWidth:760,margin:"0 auto",padding:"80px 24px 60px",textAlign:"center" }}>
          <div className="fade" style={{ display:"inline-block",padding:"5px 14px",background:"#00E67612",border:"1px solid #00E67628",borderRadius:20,fontSize:11,color:"#00E676",marginBottom:28,fontWeight:600,letterSpacing:"0.08em" }}>
            TRADING PERFORMANCE COACHING SYSTEM
          </div>
          <h1 className="fade" style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(52px,9vw,96px)",color:"#F0FFF4",lineHeight:0.95,letterSpacing:2,marginBottom:24 }}>
            {t.hero_line1}<br/>{t.hero_line2}<br/><span style={{ color:"#00E676" }}>{t.hero_line3}</span>
          </h1>
          <p className="up" style={{ fontSize:20,color:"#3D6B3D",fontWeight:500,marginBottom:12 }}>{t.hero_sub}</p>
          <p className="up2" style={{ fontSize:15,color:"#2D4A2D",lineHeight:1.8,maxWidth:480,margin:"0 auto 48px" }}>{t.hero_body}</p>
          <button onClick={()=>setScreen("onboarding")} className="glow" style={{ padding:"16px 44px",background:"#00E676",border:"none",borderRadius:8,color:"#080C08",fontWeight:700,fontSize:16,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,transition:"all 0.2s",marginBottom:14 }}>
            {t.hero_cta}
          </button>
          <div style={{ fontSize:12,color:"#1A301A" }}>{t.hero_trial}</div>

          {/* Stats */}
          <div className="up3" style={{ display:"flex",gap:48,justifyContent:"center",marginTop:72,flexWrap:"wrap" }}>
            {[[t.stat1_v,t.stat1_d],[t.stat2_v,t.stat2_d],[t.stat3_v,t.stat3_d]].map(([v,d])=>(
              <div key={v} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:"#00E676",letterSpacing:1 }}>{v}</div>
                <div style={{ fontSize:12,color:"#2D4A2D",maxWidth:140,marginTop:4,lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Savings Calculator */}
      <div style={{ maxWidth:640,margin:"0 auto 60px",padding:"0 24px" }}>
        <div style={{ background:"#0F150F",border:"1px solid #182818",borderRadius:16,padding:"28px 28px 24px" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"#F0FFF4",letterSpacing:1,marginBottom:4 }}>💸 WHAT YOUR RULE BREAKS ARE REALLY COSTING YOU</div>
          <p style={{ fontSize:13,color:"#3D6B3D",marginBottom:20,lineHeight:1.6 }}>How much have undisciplined trading decisions cost you in the last 30 days? Be honest.</p>
          <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:16 }}>
            <span style={{ color:"#4E8050",fontSize:18,fontWeight:700 }}>$</span>
            <input style={{ ...inp,fontSize:20,fontWeight:700 }} type="number" value={calcLoss} onChange={e=>{setCalcLoss(e.target.value);setShowCalcResult(false);}} placeholder="e.g. 1500" />
            <button onClick={()=>calcLoss&&setShowCalcResult(true)} className="glow" style={{ padding:"10px 20px",background:"#00E676",border:"none",borderRadius:8,color:"#080C08",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.2s",whiteSpace:"nowrap" }}>CALCULATE →</button>
          </div>
          {showCalcResult && calcLoss && (
            <div className="up" style={{ background:"#080C08",border:"1px solid #00E67628",borderRadius:10,padding:"16px 20px" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div style={{ textAlign:"center",padding:"10px",background:"#EF444408",border:"1px solid #EF444420",borderRadius:8 }}>
                  <div style={{ fontSize:11,color:"#EF4444",fontWeight:700,marginBottom:4 }}>YOUR LOSSES</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"#EF4444" }}>${parseInt(calcLoss).toLocaleString()}</div>
                  <div style={{ fontSize:10,color:"#3D1A1A" }}>in 30 days</div>
                </div>
                <div style={{ textAlign:"center",padding:"10px",background:"#00E67608",border:"1px solid #00E67620",borderRadius:8 }}>
                  <div style={{ fontSize:11,color:"#00E676",fontWeight:700,marginBottom:4 }}>EDGEMIND COST</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"#00E676" }}>$29</div>
                  <div style={{ fontSize:10,color:"#1A3020" }}>Performance plan/mo</div>
                </div>
              </div>
              <div style={{ textAlign:"center",padding:"12px",background:"#00E67610",borderRadius:8 }}>
                <div style={{ fontSize:13,color:"#00E676",fontWeight:700 }}>
                  EdgeMind coaching costs {Math.round((parseInt(calcLoss)/29)*10)/10}x LESS than your rule breaks.
                </div>
                <div style={{ fontSize:11,color:"#3D6B3D",marginTop:4 }}>
                  Preventing just one revenge trade per week pays for your entire coaching plan — {Math.round(parseInt(calcLoss)/29)}× over.
                </div>
              </div>
              <button onClick={()=>setScreen("onboarding")} className="glow" style={{ width:"100%",marginTop:12,padding:"11px",background:"#00E676",border:"none",borderRadius:8,color:"#080C08",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.2s" }}>
                STOP THE LOSSES → START FREE TRIAL
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth:900,margin:"0 auto 60px",padding:"0 24px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16 }}>
        {[{icon:"💰",t:t.feat1_t,d:t.feat1_d},{icon:"⏰",t:t.feat2_t,d:t.feat2_d},{icon:"🧠",t:t.feat3_t,d:t.feat3_d},{icon:"🏆",t:t.feat4_t,d:t.feat4_d}].map(f=>(
          <div key={f.t} style={{ padding:"22px 20px",background:"#0F150F",border:"1px solid #182818",borderRadius:12 }}>
            <div style={{ fontSize:26,marginBottom:10 }}>{f.icon}</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"#F0FFF4",letterSpacing:1,marginBottom:8 }}>{f.t}</div>
            <div style={{ fontSize:12,color:"#2D4A2D",lineHeight:1.6 }}>{f.d}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth:960,margin:"0 auto 80px",padding:"0 24px" }}>
        <div style={{ textAlign:"center",marginBottom:32 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,5vw,48px)",color:"#F0FFF4",letterSpacing:2,marginBottom:6 }}>WHAT TRADERS SAY AFTER 30 DAYS.</div>
          <div style={{ fontSize:13,color:"#3D6B3D" }}>The same coaching frameworks used by professional traders. Now available to you.</div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16 }}>
          {TESTIMONIALS.map(tm=>(
            <div key={tm.name} className="testimonial-card" style={{ padding:"20px",background:"#0F150F",border:"1px solid #182818",borderRadius:12 }}>
              <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:14 }}>
                <div style={{ width:36,height:36,borderRadius:8,background:"#00E67618",border:"1px solid #00E67630",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#00E676",flexShrink:0 }}>{tm.avatar}</div>
                <div>
                  <div style={{ fontSize:13,color:"#D4F5D4",fontWeight:700 }}>{tm.name}</div>
                  <div style={{ fontSize:10,color:"#3D6B3D" }}>{tm.platform}</div>
                </div>
                <div style={{ marginLeft:"auto",color:"#00E676",fontSize:12 }}>★★★★★</div>
              </div>
              <p style={{ fontSize:13,color:"#4E8050",lineHeight:1.7,marginBottom:12,fontStyle:"italic" }}>"{tm.quote}"</p>
              <div style={{ padding:"6px 10px",background:"#00E67610",border:"1px solid #00E67620",borderRadius:6,fontSize:11,color:"#00E676",fontWeight:700 }}>{tm.result}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="pricing-section">
        <div style={{ maxWidth:960,margin:"0 auto",padding:"80px 24px" }}>
          <div style={{ textAlign:"center",marginBottom:36 }}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(36px,6vw,64px)",color:"#F0FFF4",letterSpacing:2,marginBottom:8 }}>{t.pricing_title}</h2>
            <p style={{ fontSize:15,color:"#3D6B3D",marginBottom:24 }}>{t.pricing_sub}</p>

            {/* Billing toggle */}
            <div className="billing-toggle">
              <button className="billing-btn" onClick={()=>setBilling("monthly")} style={{ background:billing==="monthly"?"#182818":"transparent",color:billing==="monthly"?"#00E676":"#3D6B3D" }}>{t.billing_mo}</button>
              <button className="billing-btn" onClick={()=>setBilling("annual")} style={{ background:billing==="annual"?"#182818":"transparent",color:billing==="annual"?"#00E676":"#3D6B3D",display:"flex",alignItems:"center",gap:6 }}>
                {t.billing_yr}
                <span style={{ padding:"1px 6px",background:"#00E676",borderRadius:4,fontSize:9,color:"#080C08",fontWeight:800 }}>{t.annual_save}</span>
              </button>
            </div>
          </div>

          {/* Promo code */}
          <div style={{ maxWidth:400,margin:"0 auto 32px",display:"flex",gap:8 }}>
            <input style={{ ...inp,fontSize:13 }} placeholder="Promo code (e.g. FREE10)" value={promoCode} onChange={e=>{setPromoCode(e.target.value);setPromoError("");}} onKeyDown={e=>e.key==="Enter"&&applyPromo()} />
            <button onClick={applyPromo} style={{ padding:"10px 18px",background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#4E8050",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,whiteSpace:"nowrap",transition:"all 0.15s" }}>APPLY</button>
          </div>
          {promoApplied && <div style={{ textAlign:"center",marginBottom:20,padding:"8px 16px",background:"#00E67615",border:"1px solid #00E67630",borderRadius:8,fontSize:13,color:"#00E676",fontWeight:700,display:"inline-block",width:"100%",maxWidth:400,margin:"0 auto 24px" }}>🎉 {promoApplied.label} applied!</div>}
          {promoError && <div style={{ textAlign:"center",marginBottom:20,color:"#EF4444",fontSize:12 }}>{promoError}</div>}

          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20 }}>
            {PLANS.map(plan=>(
              <div key={plan.id} className="plan-card" style={{ padding:"28px 24px",background:"#0F150F",border:`2px solid ${selectedPlan===plan.id?plan.color:"#182818"}`,borderRadius:16,position:"relative" }}
                onClick={()=>setSelectedPlan(plan.id)}>
                {plan.badge && <div style={{ position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",padding:"3px 14px",background:"#00E676",borderRadius:20,fontSize:10,color:"#080C08",fontWeight:800,letterSpacing:"0.08em",whiteSpace:"nowrap" }}>{plan.badge}</div>}
                <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:plan.color,letterSpacing:2,marginBottom:12 }}>{plan.name}</div>
                <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:4 }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:"#F0FFF4",letterSpacing:1 }}>{billing==="annual"?plan.price_yr:plan.price_mo}</span>
                  <span style={{ fontSize:13,color:"#3D6B3D" }}>{billing==="annual"?plan.per_yr:plan.per_mo}</span>
                </div>
                {billing==="annual" && <div style={{ fontSize:11,color:plan.color,marginBottom:8,fontWeight:700 }}>Save 30% vs monthly</div>}
                <p style={{ fontSize:13,color:"#3D6B3D",lineHeight:1.6,marginBottom:20 }}>{plan.desc}</p>
                <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:24 }}>
                  {plan.features.map(f=>(
                    <div key={f} style={{ display:"flex",gap:8,alignItems:"flex-start" }}>
                      <span style={{ color:plan.color,fontSize:12,marginTop:2,flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:12,color:"#3D6B3D",lineHeight:1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={e=>{e.stopPropagation();setSelectedPlan(plan.id);setScreen("onboarding");}} className="glow" style={{ width:"100%",padding:"12px",background:selectedPlan===plan.id?plan.color:"transparent",border:`1px solid ${plan.color}`,borderRadius:8,color:selectedPlan===plan.id?"#080C08":plan.color,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.2s" }}>
                  {promoApplied&&selectedPlan===plan.id?"🎉 CLAIM FREE ACCESS →":t.plan_cta}
                </button>
                <div style={{ textAlign:"center",fontSize:10,color:"#1A301A",marginTop:8 }}>{t.plan_trial}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── ONBOARDING ──────────────────────────────────────────────────────────────
  const onboarding = [
    {
      title:"WHO ARE YOU AS A TRADER?",
      sub:"Your coach needs to know you before it can help you.",
      valid:profile.name && profile.experience && profile.platform && profile.instrument && profile.phone,
      content:(
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div><label style={lbl}>Your Name</label><input style={inp} value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="First name"/></div>
          <div><label style={lbl}>WhatsApp Number (with country code)</label><input style={inp} value={profile.phone} onChange={e=>setProfile({...profile,phone:e.target.value})} placeholder="+1 555 123 4567"/></div>
          <div><label style={lbl}>Experience</label>
            <select style={inp} value={profile.experience} onChange={e=>setProfile({...profile,experience:e.target.value})}>
              <option value="">Select...</option>{EXPERIENCES.map(x=><option key={x}>{x}</option>)}
            </select>
          </div>
          <div style={{ display:"flex",gap:12 }}>
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
          <div style={{ padding:"10px 14px",background:"#00E67608",border:"1px solid #00E67620",borderRadius:8,fontSize:12,color:"#3D6B3D" }}>
            Selected: <strong style={{ color:"#00E676" }}>{PLANS.find(p=>p.id===selectedPlan)?.name} · {billing==="annual"?PLANS.find(p=>p.id===selectedPlan)?.price_yr+"/yr":PLANS.find(p=>p.id===selectedPlan)?.price_mo+"/mo"}</strong>
            {promoApplied && <span style={{ color:"#00E676",marginLeft:8 }}>🎉 {promoApplied.label}</span>}
          </div>
        </div>
      ),
    },
    {
      title:"YOUR BIGGEST CHALLENGE.",
      sub:"Honesty here is everything. This is what your coach will focus on.",
      valid:profile.challenges && profile.challenges.length > 0,
      content:(
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          <div style={{ fontSize:11,color:"#00E676",marginBottom:4,fontWeight:600,letterSpacing:"0.06em" }}>SELECT ALL THAT APPLY</div>
          {CHALLENGES.map(c=>{
            const selected = (profile.challenges||[]).includes(c);
            return (
              <button key={c} onClick={()=>{
                const prev=profile.challenges||[];
                setProfile({...profile,challenges:prev.includes(c)?prev.filter(x=>x!==c):[...prev,c]});
              }} style={{ padding:"13px 16px",textAlign:"left",background:selected?"#00E67612":"#0F150F",border:`1px solid ${selected?"#00E676":"#182818"}`,borderRadius:8,color:selected?"#00E676":"#3D6B3D",fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s",display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ width:16,height:16,borderRadius:3,border:`2px solid ${selected?"#00E676":"#2D4A2D"}`,background:selected?"#00E676":"transparent",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#080C08",fontWeight:800,flexShrink:0 }}>{selected?"✓":""}</span>
                {c}
              </button>
            );
          })}
        </div>
      ),
    },
    {
      title:"BUILD YOUR RULE SYSTEM.",
      sub:"Turn on the rules that apply to you. Set your numbers. These are non-negotiable.",
      valid:rules.profitTarget.enabled && rules.lossLimit.enabled && rules.sessionStart.enabled && rules.sessionEnd.enabled,
      content:(
        <div>
          {CATEGORIES.map(cat=>(
            <div key={cat.id} style={{ marginBottom:10 }}>
              <button className="cat-btn" onClick={()=>setExpandedCat(expandedCat===cat.id?null:cat.id)} style={{ width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"#0F150F",border:"1px solid #182818",borderRadius:expandedCat===cat.id?"8px 8px 0 0":"8px",cursor:"pointer",transition:"background 0.15s" }}>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:"#F0FFF4",letterSpacing:1 }}>{cat.label}</div>
                  <div style={{ fontSize:11,color:"#2D4A2D",marginTop:2 }}>{cat.desc}</div>
                </div>
                <div style={{ color:"#2D4A2D",fontSize:14 }}>{expandedCat===cat.id?"▲":"▼"}</div>
              </button>
              {expandedCat===cat.id && (
                <div style={{ border:"1px solid #182818",borderTop:"none",borderRadius:"0 0 8px 8px",overflow:"hidden" }}>
                  {Object.entries(rules).filter(([,v])=>v.category===cat.id).map(([key,rule])=>(
                    <div key={key} className="rule-row" style={{ padding:"14px 16px",background:"#0C1210",borderBottom:"1px solid #111C11",transition:"background 0.15s" }}>
                      <div style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
                        <div style={{ paddingTop:2,cursor:"pointer" }} onClick={()=>toggleRule(key)}>
                          <div style={{ width:20,height:20,borderRadius:4,background:rule.enabled?"#00E676":"transparent",border:`2px solid ${rule.enabled?"#00E676":"#2D4A2D"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#080C08",fontWeight:800,transition:"all 0.15s",flexShrink:0 }}>{rule.enabled?"✓":""}</div>
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                            <span style={{ fontSize:14 }}>{rule.icon}</span>
                            <span style={{ fontSize:13,color:"#D4F5D4",fontWeight:600 }}>{rule.label}</span>
                          </div>
                          <div style={{ fontSize:11,color:"#2D4A2D",lineHeight:1.5,marginBottom:rule.enabled&&rule.type!=="toggle"?10:0 }}>{rule.desc}</div>
                          {rule.enabled && rule.type==="dollar" && <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:8 }}><span style={{ color:"#3D6B3D",fontSize:13 }}>$</span><input style={{ ...inp,width:120,padding:"6px 10px",fontSize:13 }} type="number" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder={rule.defaultVal}/></div>}
                          {rule.enabled && rule.type==="time" && <input style={{ ...inp,width:130,padding:"6px 10px",fontSize:13,marginTop:8 }} type="time" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)}/>}
                          {rule.enabled && rule.type==="number" && <input style={{ ...inp,width:120,padding:"6px 10px",fontSize:13,marginTop:8 }} type="number" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder={rule.defaultVal}/>}
                          {rule.enabled && rule.type==="text" && <input style={{ ...inp,width:"100%",padding:"6px 10px",fontSize:13,marginTop:8 }} type="text" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder="Write your rule in your own words..."/>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ padding:"10px 14px",background:"#00E67608",border:"1px solid #00E67620",borderRadius:8,fontSize:12,color:"#00E676",lineHeight:1.6,marginTop:8 }}>
            💡 The 4 core rules (profit target, loss limit, session start/end) are required.
          </div>
        </div>
      ),
    },
    {
      title:"YOUR COMMITMENT.",
      sub:"Read this. Mean it. Then begin.",
      valid:true,
      content:(
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ padding:"20px",background:"#0F150F",border:"1px solid #182818",borderRadius:10,lineHeight:1.9,fontSize:14,color:"#7AAF7A" }}>
            I, <strong style={{ color:"#00E676" }}>{profile.name}</strong>, understand that the market is not my enemy.<br/>
            My enemy is the version of me that shows up after a loss.<br/><br/>
            I set these rules when I was calm and thinking clearly.<br/>
            I commit to trusting that version of myself — every single session.<br/><br/>
            <strong style={{ color:"#F0FFF4" }}>I trade to be disciplined. The money follows the discipline.</strong>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {enabledRules.slice(0,6).map(([key,rule])=>(
              <div key={key} style={{ display:"flex",justifyContent:"space-between",padding:"8px 14px",background:"#0C1210",border:"1px solid #182818",borderRadius:6 }}>
                <span style={{ fontSize:13,color:"#3D6B3D" }}>{rule.icon} {rule.label}</span>
                <span style={{ fontSize:13,color:"#00E676",fontWeight:700 }}>{ruleValueDisplay(key,rule)}</span>
              </div>
            ))}
            {enabledRules.length>6 && <div style={{ fontSize:11,color:"#2D4A2D",textAlign:"center" }}>+{enabledRules.length-6} more rules active</div>}
          </div>
        </div>
      ),
    },
  ];

  if (screen === "onboarding") {
    const s = onboarding[step];
    return (
      <div style={{ minHeight:"100vh",background:"#080C08",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'DM Sans',sans-serif" }}>
        <style>{CSS}</style>
        <div className="up" style={{ width:"100%",maxWidth:520 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#00E676",letterSpacing:2,marginBottom:28 }}>EDGEMIND</div>
          <div style={{ display:"flex",gap:5,marginBottom:28 }}>
            {onboarding.map((_,i)=><div key={i} style={{ flex:1,height:3,borderRadius:2,background:i<=step?"#00E676":"#182818",transition:"background 0.3s" }}/>)}
          </div>
          <div style={{ fontSize:11,color:"#2D4A2D",marginBottom:6,fontWeight:700,letterSpacing:"0.1em" }}>STEP {step+1} OF {onboarding.length}</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"#F0FFF4",marginBottom:6,letterSpacing:1,lineHeight:1 }}>{s.title}</h2>
          <p style={{ fontSize:13,color:"#3D6B3D",marginBottom:24,lineHeight:1.6 }}>{s.sub}</p>
          <div style={{ maxHeight:"50vh",overflowY:"auto",paddingRight:4 }}>{s.content}</div>
          <div style={{ display:"flex",gap:10,marginTop:24 }}>
            {step>0 && <button onClick={()=>setStep(s=>s-1)} style={{ flex:1,padding:13,background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#3D6B3D",cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,fontSize:14 }}>← BACK</button>}
            <button onClick={()=>step<onboarding.length-1?setStep(s=>s+1):startCoach()} disabled={!s.valid} className={s.valid?"glow":""} style={{ flex:2,padding:13,background:s.valid?"#00E676":"#182818",border:"none",borderRadius:8,color:s.valid?"#080C08":"#2D4A2D",fontWeight:800,fontSize:15,cursor:s.valid?"pointer":"not-allowed",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,transition:"all 0.2s" }}>
              {step<onboarding.length-1?"CONTINUE →":"BEGIN MY JOURNEY →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── SUCCESS SCREEN ──────────────────────────────────────────────────────────
  if (screen === "success") return (
    <div style={{ minHeight:"100vh",background:"#080C08",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'DM Sans',sans-serif" }}>
      <style>{CSS}</style>
      <div className="up" style={{ width:"100%",maxWidth:480,textAlign:"center" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#00E676",letterSpacing:2,marginBottom:8 }}>EDGEMIND</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:"#F0FFF4",letterSpacing:1,marginBottom:4 }}>YOU'RE IN.</div>
        <p style={{ fontSize:13,color:"#3D6B3D",marginBottom:32 }}>Welcome to the disciplined side of trading, {profile.name}.</p>

        {/* Activate WhatsApp */}
        <div style={{ padding:"20px 24px",background:"#00E67615",border:"2px solid #00E676",borderRadius:12,marginBottom:16,textAlign:"left" }}>
          <div style={{ fontSize:11,color:"#00E676",fontWeight:700,letterSpacing:"0.08em",marginBottom:8 }}>⚡ STEP 1 — ACTIVATE YOUR COACH NOW</div>
          <p style={{ fontSize:13,color:"#D4F5D4",lineHeight:1.7,marginBottom:12 }}>
            Open WhatsApp and send this to <strong style={{ color:"#00E676" }}>+1 415 523 8886</strong>:
          </p>
          <div style={{ padding:"12px 16px",background:"#080C08",borderRadius:8,fontFamily:"monospace",fontSize:16,color:"#00E676",fontWeight:700,textAlign:"center",letterSpacing:1,marginBottom:8 }}>
            join enough-brave
          </div>
          <a href="https://wa.me/14155238886?text=join%20enough-brave" target="_blank" rel="noopener noreferrer" style={{ display:"block",marginTop:12,padding:"10px",background:"#25D366",borderRadius:8,color:"#fff",fontWeight:700,fontSize:14,textDecoration:"none",textAlign:"center" }}>
            📱 Open WhatsApp & Activate →
          </a>
        </div>

        {/* Referral */}
        <div style={{ padding:"16px 20px",background:"#0F150F",border:"1px solid #182818",borderRadius:12,marginBottom:16,textAlign:"left" }}>
          <div style={{ fontSize:11,color:"#00E676",fontWeight:700,letterSpacing:"0.08em",marginBottom:8 }}>🎁 GIVE A FRIEND 1 FREE MONTH</div>
          <p style={{ fontSize:12,color:"#3D6B3D",marginBottom:10,lineHeight:1.6 }}>Share your code. They get their first month free. You get your next month free.</p>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            <div style={{ flex:1,padding:"10px 14px",background:"#080C08",border:"1px solid #00E67620",borderRadius:8,fontFamily:"monospace",fontSize:15,color:"#00E676",fontWeight:700,textAlign:"center",letterSpacing:2 }}>{referralCode}</div>
            <button onClick={()=>navigator.clipboard.writeText(referralCode)} style={{ padding:"10px 14px",background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#4E8050",fontSize:12,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.15s" }}>COPY</button>
          </div>
        </div>

        <button onClick={()=>setScreen("dashboard")} style={{ padding:"12px 32px",background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#2D4A2D",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>
          View Dashboard →
        </button>
      </div>
    </div>
  );

  // ── DASHBOARD ───────────────────────────────────────────────────────────────
  const TABS = [["coach","🎯 Coach"],["stats","📊 Stats"],["rules","📋 Rules"]];
  const sc = scoreColor(disciplineScore);

  return (
    <div style={{ height:"100vh",background:"#080C08",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif",overflow:"hidden" }}>
      <style>{CSS}</style>

      {/* Header */}
      <div style={{ padding:"10px 18px",borderBottom:"1px solid #111C11",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0C1210",flexShrink:0 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"#00E676",letterSpacing:2 }}>EDGEMIND</div>
        <div style={{ display:"flex",gap:5 }}>
          {[{v:`$${rules.profitTarget.value||rules.profitTarget.defaultVal}`,c:"#00E676",l:"TARGET"},{v:`$${rules.lossLimit.value||rules.lossLimit.defaultVal}`,c:"#EF4444",l:"LIMIT"},{v:`${rules.sessionStart.value}–${rules.sessionEnd.value}`,c:"#00BFA5",l:"WINDOW"}].map(r=>(
            <div key={r.l} style={{ padding:"3px 9px",background:"#0F150F",border:`1px solid ${r.c}18`,borderRadius:4,textAlign:"center" }}>
              <div style={{ fontSize:9,color:"#2D4A2D",letterSpacing:"0.08em",fontWeight:700 }}>{r.l}</div>
              <div style={{ fontSize:11,color:r.c,fontWeight:700,marginTop:1 }}>{r.v}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          {/* Discipline Score Badge */}
          <div style={{ padding:"3px 10px",background:`${sc}15`,border:`1px solid ${sc}30`,borderRadius:6,textAlign:"center" }}>
            <div style={{ fontSize:9,color:sc,fontWeight:700,letterSpacing:"0.06em" }}>DISCIPLINE</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:sc,lineHeight:1 }}>{disciplineScore} <span style={{ fontSize:9 }}>{scoreLabel(disciplineScore)}</span></div>
          </div>
          {streak>0 && <span style={{ fontSize:11,padding:"3px 8px",background:"#00E67615",border:"1px solid #00E67625",borderRadius:10,color:"#00E676" }}>🔥 {streak}d</span>}
          <span style={{ fontSize:12,color:"#2D4A2D",fontWeight:500 }}>{profile.name}</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex",borderBottom:"1px solid #111C11",background:"#0C1210",flexShrink:0 }}>
        {TABS.map(([id,label])=>(
          <button key={id} className="tab" onClick={()=>setActiveTab(id)} style={{ padding:"10px 18px",background:"transparent",border:"none",borderBottom:activeTab===id?"2px solid #00E676":"2px solid transparent",color:activeTab===id?"#00E676":"#2D4A2D",fontSize:13,cursor:"pointer",fontWeight:activeTab===id?600:400,fontFamily:"'DM Sans',sans-serif",transition:"color 0.15s" }}>{label}</button>
        ))}
        {/* Emergency Stop */}
        <button onClick={triggerEmergencyStop} className={emergencyActive?"emergency-pulse":""} style={{ marginLeft:"auto",marginRight:12,marginTop:6,marginBottom:6,padding:"4px 12px",background:"#EF444418",border:"1px solid #EF444430",borderRadius:6,color:"#EF4444",fontSize:11,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,fontWeight:700,transition:"all 0.15s" }}>
          🚨 STOP
        </button>
      </div>

      {/* COACH TAB */}
      {activeTab==="coach" && <>
        <div style={{ flex:1,overflowY:"auto",padding:"18px 18px 0",display:"flex",flexDirection:"column",gap:14 }}>

          {/* Pre-session quiz CTA */}
          {!quizAnswers && messages.length > 0 && (
            <div className="up" style={{ padding:"12px 16px",background:"#00E67610",border:"1px solid #00E67625",borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0 }}>
              <div>
                <div style={{ fontSize:12,color:"#00E676",fontWeight:700 }}>🌅 PRE-SESSION CHECK</div>
                <div style={{ fontSize:11,color:"#3D6B3D",marginTop:2 }}>2 min quiz · Helps coach calibrate for today</div>
              </div>
              <button onClick={()=>{ setQuizStep(0); setShowQuiz(true); }} style={{ padding:"7px 14px",background:"#00E676",border:"none",borderRadius:6,color:"#080C08",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1 }}>START →</button>
            </div>
          )}

          {quizAnswers && (
            <div style={{ padding:"8px 14px",background:"#0F150F",border:"1px solid #182818",borderRadius:8,display:"flex",gap:16,alignItems:"center" }}>
              <div style={{ fontSize:11,color:"#3D6B3D" }}>Today: Sleep <strong style={{ color:quizAnswers.sleep<=2?"#EF4444":"#00E676" }}>{quizAnswers.sleep}/5</strong> · Stress <strong style={{ color:quizAnswers.stress>=4?"#EF4444":"#00E676" }}>{quizAnswers.stress}/5</strong> · Pressure <strong style={{ color:quizAnswers.pressure==="yes"?"#EF4444":"#00E676" }}>{quizAnswers.pressure}</strong></div>
              <button onClick={()=>{ setQuizAnswers(null); setQuizStep(0); setTempQuiz({sleep:3,stress:3,pressure:"no"}); setShowQuiz(true); }} style={{ marginLeft:"auto",fontSize:10,color:"#2D4A2D",background:"transparent",border:"none",cursor:"pointer" }}>retake</button>
            </div>
          )}

          {messages.map((msg,i)=>(
            <div key={i} className="msg" style={{ display:"flex",flexDirection:msg.role==="user"?"row-reverse":"row",gap:10,alignItems:"flex-start" }}>
              <div style={{ width:28,height:28,borderRadius:6,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,background:msg.role==="user"?"#182818":"#0F150F",border:`1px solid ${msg.role==="user"?"#1E3020":"#182818"}` }}>
                {msg.role==="user"?"👤":"🎯"}
              </div>
              <div style={{ maxWidth:"76%",display:"flex",flexDirection:"column",gap:3,alignItems:msg.role==="user"?"flex-end":"flex-start" }}>
                <div style={{ padding:"11px 14px",borderRadius:msg.role==="user"?"10px 3px 10px 10px":"3px 10px 10px 10px",background:msg.role==="user"?"#182818":"#0F150F",border:`1px solid ${msg.role==="user"?"#1E3020":"#182818"}`,fontSize:13,lineHeight:1.75,color:msg.role==="user"?"#B8E8FF":"#B8E8B8",whiteSpace:"pre-wrap" }}>
                  <Md text={msg.content}/>
                </div>
                <div style={{ fontSize:10,color:"#1A301A",padding:"0 3px" }}>{msg.role==="assistant"?"Coach":"You"} · {msg.time}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg" style={{ display:"flex",gap:10 }}>
              <div style={{ width:28,height:28,borderRadius:6,background:"#0F150F",border:"1px solid #182818",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12 }}>🎯</div>
              <div style={{ padding:"13px 16px",background:"#0F150F",border:"1px solid #182818",borderRadius:"3px 10px 10px 10px",display:"flex",gap:5,alignItems:"center" }}>
                {[0,0.2,0.4].map((d,i)=><div key={i} className="dot" style={{ width:6,height:6,borderRadius:"50%",background:"#00E676",animationDelay:`${d}s` }}/>)}
              </div>
            </div>
          )}
          <div ref={messagesEndRef}/>
        </div>

        {/* Quick replies */}
        <div style={{ padding:"10px 18px 0",display:"flex",gap:6,flexWrap:"wrap",flexShrink:0 }}>
          {[
            `Done. Made $${rules.profitTarget.value||500}. Rules: Yes ✅`,
            `Done. Lost $${rules.lossLimit.value||250}. Rules: Yes ✅`,
            "I want to keep trading 🚨",
            "I broke a rule",
            "Morning check-in",
            "Weekly review",
          ].map(s=>(
            <button key={s} className="qbtn" onClick={()=>setInput(s)} style={{ padding:"4px 10px",background:"transparent",border:"1px solid #182818",borderRadius:14,color:"#2D4A2D",fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s" }}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding:"10px 18px 16px",flexShrink:0 }}>
          <div style={{ display:"flex",gap:8,background:"#0F150F",border:"1px solid #182818",borderRadius:10,padding:"8px 12px",alignItems:"flex-end" }}>
            <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}}
              placeholder="Check in or talk it through... (Enter to send)"
              rows={1}
              style={{ flex:1,background:"transparent",border:"none",color:"#D4F5D4",fontSize:13,fontFamily:"'DM Sans',sans-serif",resize:"none",lineHeight:1.5,maxHeight:100,overflowY:"auto" }}
              onInput={e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,100)+"px";}}
            />
            <button onClick={()=>sendMessage()} disabled={loading||!input.trim()} style={{ width:32,height:32,borderRadius:6,background:!loading&&input.trim()?"#00E676":"#182818",border:"none",color:!loading&&input.trim()?"#080C08":"#2D4A2D",cursor:!loading&&input.trim()?"pointer":"not-allowed",fontSize:15,fontWeight:800,flexShrink:0,transition:"all 0.15s" }}>↑</button>
          </div>
          <div style={{ textAlign:"center",marginTop:6,fontSize:10,color:"#111C11" }}>The coach is always on. Your rules never sleep.</div>
        </div>
      </>}

      {/* STATS TAB */}
      {activeTab==="stats" && (
        <div style={{ flex:1,overflowY:"auto",padding:18 }}>
          {/* Discipline Score big display */}
          <div style={{ background:"#0F150F",border:`1px solid ${sc}25`,borderRadius:14,padding:"20px",marginBottom:16,display:"flex",alignItems:"center",gap:20 }}>
            <div style={{ flexShrink:0 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#182818" strokeWidth="6"/>
                <circle cx="40" cy="40" r="34" fill="none" stroke={sc} strokeWidth="6"
                  strokeDasharray={`${(disciplineScore/100)*213} 213`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  style={{ transition:"stroke-dasharray 1s ease" }}
                />
                <text x="40" y="44" textAnchor="middle" fill={sc} fontSize="18" fontFamily="'Bebas Neue',sans-serif" letterSpacing="1">{disciplineScore}</text>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:sc,letterSpacing:1 }}>{scoreLabel(disciplineScore)} TRADER</div>
              <div style={{ fontSize:12,color:"#3D6B3D",marginTop:4,lineHeight:1.6 }}>
                {disciplineScore >= 80 ? "You're operating at an elite level. Protect this." :
                 disciplineScore >= 60 ? "Solid foundation. Keep building the streak." :
                 disciplineScore >= 40 ? "You're getting there. Consistency is everything." :
                 "Day 1 of the rest of your trading life. Start the streak."}
              </div>
              {sessions.length === 0 && <div style={{ fontSize:11,color:"#1A301A",marginTop:6 }}>Complete your first check-in to start scoring.</div>}
            </div>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16 }}>
            {[
              {l:"Total Sessions",v:sessions.length||"—",c:"#F0FFF4"},
              {l:"🔥 Streak",v:streak>0?`${streak} days`:"—",c:"#00E676"},
              {l:"Discipline Rate",v:sessions.length?`${disciplineRate}%`:"—",c:disciplineRate>=80?"#00E676":disciplineRate>=50?"#FFD166":"#EF4444"},
              {l:"Total P&L",v:sessions.length?`${totalPnl>=0?"+":""}$${totalPnl.toLocaleString()}`:"—",c:totalPnl>=0?"#00E676":"#EF4444"},
            ].map(s=>(
              <div key={s.l} style={{ padding:"16px",background:"#0F150F",border:"1px solid #182818",borderRadius:10 }}>
                <div style={{ fontSize:10,color:"#2D4A2D",marginBottom:6,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase" }}>{s.l}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:s.c,letterSpacing:1 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"#F0FFF4",letterSpacing:1,marginBottom:10 }}>SESSION HISTORY</div>
          {sessions.length===0 ? (
            <div style={{ padding:24,textAlign:"center",color:"#1A301A",fontSize:13,background:"#0F150F",border:"1px solid #182818",borderRadius:10 }}>
              No sessions yet. Send "Done. Made $X. Rules: Yes" after your first trade.
            </div>
          ) : (
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              {[...sessions].reverse().map((s,i)=>(
                <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:"#0F150F",border:"1px solid #182818",borderRadius:8 }}>
                  <span style={{ fontSize:11,color:"#2D4A2D" }}>{s.date}</span>
                  <span style={{ fontSize:13,fontWeight:700,color:s.pnl>=0?"#00E676":"#EF4444" }}>{s.pnl>=0?"+":""}${s.pnl}</span>
                  <span style={{ fontSize:11,padding:"2px 8px",borderRadius:10,background:s.rulesFollowed?"#00E67618":"#EF444418",color:s.rulesFollowed?"#00E676":"#EF4444",fontWeight:600 }}>
                    {s.rulesFollowed?"✓ Rules kept":"✗ Rules broken"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RULES TAB */}
      {activeTab==="rules" && (
        <div style={{ flex:1,overflowY:"auto",padding:18 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#F0FFF4",letterSpacing:1,marginBottom:4 }}>YOUR RULE SYSTEM</div>
          <div style={{ fontSize:12,color:"#2D4A2D",marginBottom:20 }}>Set by you. Enforced by your coach. These do not bend.</div>
          {CATEGORIES.map(cat=>{
            const catRules = enabledRules.filter(([,v])=>v.category===cat.id);
            if(catRules.length===0) return null;
            return (
              <div key={cat.id} style={{ marginBottom:14 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#00E676",letterSpacing:1,marginBottom:8 }}>{cat.label}</div>
                <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                  {catRules.map(([key,rule])=>(
                    <div key={key} style={{ display:"flex",gap:12,alignItems:"center",padding:"12px 14px",background:"#0F150F",border:"1px solid #182818",borderRadius:8 }}>
                      <span style={{ fontSize:18 }}>{rule.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12,color:"#4E8050",fontWeight:600 }}>{rule.label}</div>
                        <div style={{ fontSize:11,color:"#2D4A2D",marginTop:2 }}>{rule.desc}</div>
                      </div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"#00E676",letterSpacing:0.5 }}>{ruleValueDisplay(key,rule)}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div style={{ padding:"16px",background:"#00E67608",border:"1px solid #00E67618",borderRadius:10,marginTop:8 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#00E676",letterSpacing:1,marginBottom:6 }}>YOUR CHALLENGE TO OVERCOME</div>
            <div style={{ fontSize:14,color:"#D4F5D4",lineHeight:1.6 }}>{(profile.challenges||[]).join(", ")}</div>
          </div>
          <div style={{ padding:"14px 16px",background:"#0F150F",border:"1px solid #182818",borderRadius:10,marginTop:10 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#3D6B3D",letterSpacing:1,marginBottom:6 }}>THE RULE ABOVE ALL RULES</div>
            <div style={{ fontSize:13,color:"#2D4A2D",lineHeight:1.7,fontStyle:"italic" }}>
              "The rules you set when calm are the only rules that count. The version of you that wants to break them is not qualified to make trading decisions."
            </div>
          </div>

          {/* Referral in rules tab */}
          <div style={{ padding:"14px 16px",background:"#0F150F",border:"1px solid #182818",borderRadius:10,marginTop:10 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#00E676",letterSpacing:1,marginBottom:8 }}>🎁 YOUR REFERRAL CODE</div>
            <div style={{ fontSize:12,color:"#3D6B3D",marginBottom:10,lineHeight:1.6 }}>Share with a fellow trader. They get 1 month free. You get your next month free.</div>
            <div style={{ display:"flex",gap:8 }}>
              <div style={{ flex:1,padding:"8px 12px",background:"#080C08",border:"1px solid #00E67620",borderRadius:8,fontFamily:"monospace",fontSize:14,color:"#00E676",fontWeight:700,textAlign:"center",letterSpacing:2 }}>{referralCode}</div>
              <button onClick={()=>navigator.clipboard.writeText(referralCode)} style={{ padding:"8px 14px",background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#4E8050",fontSize:11,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1 }}>COPY</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
