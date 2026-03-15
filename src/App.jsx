import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const API_URL = import.meta.env.VITE_API_URL || "https://edgemind-backend-production.up.railway.app";

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
    stat3_v: "$49/mo", stat3_d: "less than one bad trade from revenge trading",
    feat1_t: "Money Rules", feat1_d: "Profit targets, loss limits, single-trade caps, weekly drawdown protection — locked before you open the platform.",
    feat2_t: "Time Rules", feat2_d: "Session windows, time-based exits, news blackouts, mandatory rest days — structure is your edge.",
    feat3_t: "Behavior Rules", feat3_d: "Overtrading limits, consecutive loss protocols, stress-state rules — the patterns that destroy accounts, addressed directly.",
    feat4_t: "Identity Rules", feat4_d: "Journaling, weekly reviews, discipline scoring, custom rules — because who you are as a trader matters more than any setup.",
    pricing_title: "SIMPLE PRICING.",
    pricing_sub: "Choose your level of accountability.",
    plan_name: "EDGEMIND COACHING", plan_price_mo: "$49", plan_price_yr: "$409", plan_per_mo: "/month", plan_per_yr: "/year",
    plan_desc: "Your personal trading performance coach — available before, during, and after every session. Checks in on you. Knows your rules. Remembers everything.",
    plan_features: ["Morning briefing — personalized to your history", "Pre-session mental check", "Intra-session check-ins throughout your window", "Session close — close the platform NOW", "Post-session recap & accountability", "Evening nudge if no log received", "Sunday weekly performance review", "50 coaching interactions/day", "Full AI memory — references your sessions by date"],
    plan_cta: "START FREE TRIAL →",
    plan_save: "SAVE 30% — $179/year",
    plan_commit: "Commit to your discipline.",
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
    stat3_v: "$49/mes", stat3_d: "menos que un mal trade de revenge trading",
    feat1_t: "Reglas de Dinero", feat1_d: "Objetivos diarios, límites de pérdida, protección semanal.",
    feat2_t: "Reglas de Tiempo", feat2_d: "Ventanas de trading, límites de sesión, apagones de noticias.",
    feat3_t: "Reglas de Comportamiento", feat3_d: "Límites de trades, paradas por pérdidas consecutivas.",
    feat4_t: "Reglas de Identidad", feat4_d: "Journaling, revisiones semanales, seguimiento de disciplina.",
    pricing_title: "PRECIOS SIMPLES.",
    pricing_sub: "Elige tu nivel de responsabilidad.",
    plan_name: "EDGEMIND COACHING", plan_price_mo: "$49", plan_price_yr: "$409", plan_per_mo: "/mes", plan_per_yr: "/año",
    plan_desc: "Tu coach personal de rendimiento — disponible antes, durante y después de cada sesión.",
    plan_features: ["Briefing matutino personalizado", "Check-in mental pre-sesión", "Check-ins durante tu ventana de sesión", "Cierre de sesión — cierra la plataforma AHORA", "Resumen post-sesión y responsabilidad", "Recordatorio nocturno si no registraste", "Revisión semanal de rendimiento dominical", "50 interacciones de coaching/día", "Memoria completa — referencia tus sesiones por fecha"],
    plan_cta: "COMENZAR PRUEBA GRATIS →",
    plan_save: "AHORRA 30% — $179/año",
    plan_commit: "Comprométete con tu disciplina.",
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
    hero_body: "EdgeMind é um sistema de coaching de performance construído sobre os mesmos frameworks psicológicos usados por coaches profissionais de prop firms.",
    hero_cta: "CRIAR MEU SISTEMA →",
    hero_trial: "7 dias grátis · Sem cartão de crédito",
    stat1_v: "73%", stat1_d: "das falhas de traders são psicológicas, não estratégicas",
    stat2_v: "Coaching Diário", stat2_d: "briefings, check-ins e responsabilidade — em cada sessão",
    stat3_v: "$49/mês", stat3_d: "menos que um mau trade de revenge trading",
    feat1_t: "Regras Financeiras", feat1_d: "Metas diárias, limites de perda, proteção semanal de drawdown.",
    feat2_t: "Regras de Tempo", feat2_d: "Janelas de trading, limites de sessão, bloqueios de notícias.",
    feat3_t: "Regras de Comportamento", feat3_d: "Limites de trades, paradas por perdas consecutivas.",
    feat4_t: "Regras de Identidade", feat4_d: "Journaling, revisões semanais, rastreamento de disciplina.",
    pricing_title: "PREÇOS SIMPLES.",
    pricing_sub: "Escolha seu nível de responsabilidade.",
    plan_name: "EDGEMIND COACHING", plan_price_mo: "$49", plan_price_yr: "$409", plan_per_mo: "/mês", plan_per_yr: "/ano",
    plan_desc: "Seu coach pessoal de desempenho — disponível antes, durante e depois de cada sessão.",
    plan_features: ["Briefing matinal personalizado", "Check-in mental pré-sessão", "Check-ins durante sua janela de sessão", "Fechamento de sessão — feche a plataforma AGORA", "Resumo pós-sessão e responsabilidade", "Lembrete noturno se não registrou", "Revisão semanal de desempenho dominical", "50 interações de coaching/dia", "Memória completa — referencia suas sessões por data"],
    plan_cta: "COMEÇAR TESTE GRÁTIS →",
    plan_save: "ECONOMIZE 30% — $179/ano",
    plan_commit: "Comprometa-se com sua disciplina.",
    plan_trial: "7 dias de teste · Cancele quando quiser",
    annual_save: "ECONOMIZE 30%",
    billing_mo: "Mensal",
    billing_yr: "Anual",
  },
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const VALID_PROMOS = {
  "FREE10":  { plan: "performance", months: 3, label: "3 months EdgeMind FREE" },
  "ANNUAL30":{ plan: "performance", months: 1, label: "1 month EdgeMind FREE" },
};

const TESTIMONIALS = [
  { name: "Marcus T.", platform: "TopStep", quote: "I stopped revenge trading completely after 2 weeks. My discipline score went from 42 to 87.", result: "+$4,200 saved in avoided losses", avatar: "MT" },
  { name: "Sofia R.", platform: "FTMO", quote: "The morning briefing alone changed everything. I show up prepared now instead of reactive.", result: "Passed FTMO challenge on first try", avatar: "SR" },
  { name: "James K.", platform: "Apex Trader", quote: "Lost 3 accounts before EdgeMind. Haven't broken a rule in 31 days straight.", result: "🔥 31-day streak active", avatar: "JK" },
  { name: "Diego M.", platform: "Retail", quote: "The emergency stop button has saved me at least 4 times when I was about to revenge trade.", result: "+$2,800 protected capital", avatar: "DM" },
];

const ACTIVE_TRADERS = 847;

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
  consecLossTrades: { label:"Consecutive Losses = Stop",      category:"behavior", type:"number",  defaultVal:"3",    icon:"🚨", desc:"3 losing trades in a row → mindset is compromised.", enabled:false },
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

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const calcDisciplineScore = (sessions, streak) => {
  if (sessions.length === 0) return 0;
  const rateScore   = (sessions.filter(s => s.rulesFollowed).length / sessions.length) * 50;
  const streakScore = Math.min(streak * 2, 30);
  const volumeScore = Math.min(sessions.length * 2, 20);
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

const ruleValueDisplay = (key, rule) => {
  if (!rule.enabled) return null;
  if (rule.type === "dollar")  return `$${rule.value || rule.defaultVal}`;
  if (rule.type === "time")    return rule.value || rule.defaultVal;
  if (rule.type === "number")  return rule.value || rule.defaultVal;
  if (rule.type === "toggle")  return "Active";
  if (rule.type === "text")    return rule.value || "Set";
  return rule.value;
};

const fmtDate = (d) => {
  if (!d) return "";
  const dt = new Date(d + "T12:00:00");
  return dt.toLocaleDateString("en-US", { month:"short", day:"numeric" });
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];

  // ── Auth ────────────────────────────────────────────────────────────────────
  const [session, setSession]       = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError]   = useState("");

  // ── Onboarding account setup ─────────────────────────────────────────────────
  const [accountEmail, setAccountEmail]           = useState("");
  const [accountPassword, setAccountPassword]     = useState("");
  const [accountConfirmPw, setAccountConfirmPw]   = useState("");

  // ── App screens ──────────────────────────────────────────────────────────────
  const [screen, setScreen]         = useState("landing");
  const [step, setStep]             = useState(0);
  const [loading, setLoading]       = useState(false);

  // ── Profile & rules ──────────────────────────────────────────────────────────
  const [profile, setProfile]       = useState({ name:"", experience:"", platform:"", instrument:"", challenges:[], phone:"", coachLanguage:"english" });
  const [rules, setRules]           = useState(() => { const r={}; Object.entries(DEFAULT_RULES).forEach(([k,v])=>{r[k]={...v,value:v.defaultVal};}); return r; });
  const [expandedCat, setExpandedCat] = useState("money");

  // ── Dashboard data ────────────────────────────────────────────────────────────
  const [sessions, setSessions]     = useState([]);
  const [streak, setStreak]         = useState(0);
  const [activeTab, setActiveTab]   = useState("stats");

  // ── Calendar ─────────────────────────────────────────────────────────────────
  const [calYear, setCalYear]       = useState(new Date().getFullYear());
  const [calMonth, setCalMonth]     = useState(new Date().getMonth());

  // ── Landing / pricing ────────────────────────────────────────────────────────
  const [billing, setBilling]         = useState("monthly");
  const [promoCode, setPromoCode]     = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError]   = useState("");
  const [referralCode]                = useState(() => "EDGE" + Math.random().toString(36).substr(2,6).toUpperCase());
  const [calcLoss, setCalcLoss]       = useState("");
  const [showCalcResult, setShowCalcResult] = useState(false);

  // ── Session check on mount ───────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s) {
        loadDashboard(s.access_token).then(() => setScreen("dashboard"));
      }
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (!s) {
        setScreen("landing");
        setSessions([]);
        setStreak(0);
        setProfile({ name:"", experience:"", platform:"", instrument:"", challenges:[], phone:"", coachLanguage:"english" });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadDashboard = async (accessToken) => {
    try {
      const res = await fetch(`${API_URL}/api/me`, {
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
      if (!res.ok) return;
      const data = await res.json();

      if (data.profile) {
        const p = Array.isArray(data.profile) ? data.profile[0] : data.profile;
        setProfile({
          name: p?.name || "",
          experience: p?.experience || "",
          platform: p?.platform || "",
          instrument: p?.instrument || "",
          challenges: p?.challenge ? p.challenge.split(", ") : [],
          phone: data.phone || "",
          coachLanguage: p?.coach_language || "english",
        });
      }

      if (data.rules) {
        const dbR = Array.isArray(data.rules) ? data.rules[0] : data.rules;
        if (dbR) {
          setRules(prev => {
            const u = { ...prev };
            if (dbR.profit_target)        { u.profitTarget      = { ...u.profitTarget,      value: String(dbR.profit_target),  enabled: true }; }
            if (dbR.loss_limit)           { u.lossLimit         = { ...u.lossLimit,          value: String(dbR.loss_limit),     enabled: true }; }
            if (dbR.session_start)        { u.sessionStart      = { ...u.sessionStart,        value: dbR.session_start,          enabled: true }; }
            if (dbR.session_end)          { u.sessionEnd        = { ...u.sessionEnd,          value: dbR.session_end,            enabled: true }; }
            if (dbR.max_trades_per_day)   { u.maxTrades         = { ...u.maxTrades,           value: String(dbR.max_trades_per_day), enabled: true }; }
            if (dbR.no_add_to_loser)      { u.noAddToLoser      = { ...u.noAddToLoser,        enabled: true }; }
            if (dbR.journal_required)     { u.journalRequired   = { ...u.journalRequired,     enabled: true }; }
            if (dbR.weekly_review)        { u.weeklyReview      = { ...u.weeklyReview,        enabled: true }; }
            if (dbR.celebrate_discipline) { u.celebrateDiscipline = { ...u.celebrateDiscipline, enabled: true }; }
            if (dbR.custom_rule)          { u.customRule1       = { ...u.customRule1,         value: dbR.custom_rule, enabled: true }; }
            return u;
          });
        }
      }

      if (data.sessions) {
        setSessions(data.sessions.map(s => ({
          ...s,
          date: s.session_date,
          pnl: s.pnl || 0,
          rulesFollowed: s.rules_followed,
        })));
      }

      if (data.stats) {
        setStreak(data.stats.streak || 0);
      }
    } catch (e) {
      console.error("Dashboard load failed:", e);
    }
  };

  // ── Computed values ──────────────────────────────────────────────────────────
  const enabledRules    = Object.entries(rules).filter(([, v]) => v.enabled);
  const disciplineScore = calcDisciplineScore(sessions, streak);
  const totalPnl        = sessions.reduce((a, s) => a + (s.pnl || 0), 0);
  const disciplineRate  = sessions.length > 0 ? Math.round((sessions.filter(s => s.rulesFollowed).length / sessions.length) * 100) : 0;
  const sc              = scoreColor(disciplineScore);

  const chartData = useMemo(() => {
    const sorted = [...sessions].sort((a, b) => new Date(a.session_date || a.date) - new Date(b.session_date || b.date));
    let cum = 0;
    return sorted.map(s => ({ date: (s.session_date || s.date || "").slice(5), cumPnl: (cum += (s.pnl || 0)) }));
  }, [sessions]);

  const sessionsByDate = useMemo(() => {
    const map = {};
    sessions.forEach(s => { const d = s.session_date || s.date; if (d) map[d] = s; });
    return map;
  }, [sessions]);

  const calWeeks = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1);
    const lastDay  = new Date(calYear, calMonth + 1, 0);
    const weeks = [];
    let week = Array(firstDay.getDay()).fill(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      week.push(new Date(calYear, calMonth, d));
      if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length > 0) { while (week.length < 7) week.push(null); weeks.push(week); }
    return weeks;
  }, [calYear, calMonth]);

  const goCalPrev = () => { if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); } else setCalMonth(m => m - 1); };
  const goCalNext = () => { if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); } else setCalMonth(m => m + 1); };

  // ── Auth handlers ────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword) { setAuthError("Please enter your email and password."); return; }
    setLoading(true);
    setAuthError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: loginEmail.trim(), password: loginPassword });
      if (error) throw error;
      setSession(data.session);
      await loadDashboard(data.session.access_token);
      setScreen("dashboard");
    } catch (e) {
      setAuthError(e.message || "Login failed. Check your email and password.");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleForgotPassword = async () => {
    if (!loginEmail.trim()) { setAuthError("Enter your email first."); return; }
    await supabase.auth.resetPasswordForEmail(loginEmail.trim());
    setAuthError("Password reset email sent. Check your inbox.");
  };

  // ── Rule helpers ─────────────────────────────────────────────────────────────
  const toggleRule   = (key) => setRules(prev => ({ ...prev, [key]: { ...prev[key], enabled: !prev[key].enabled } }));
  const setRuleValue = (key, val) => setRules(prev => ({ ...prev, [key]: { ...prev[key], value: val } }));

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (VALID_PROMOS[code]) { setPromoApplied(VALID_PROMOS[code]); setPromoError(""); }
    else { setPromoError("Invalid promo code. Try FREE10."); setPromoApplied(null); }
  };

  // ── Start coach (onboarding final step) ──────────────────────────────────────
  const startCoach = async () => {
    setLoading(true);
    setAuthError("");
    try {
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email: accountEmail.trim(),
        password: accountPassword,
        options: { data: { phone: profile.phone, name: profile.name } },
      });
      if (authErr) throw authErr;

      const rulesPayload = {};
      enabledRules.forEach(([k, v]) => { rulesPayload[k] = { label: v.label, value: v.value || v.defaultVal, icon: v.icon }; });

      await fetch(`${API_URL}/api/onboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: profile.phone,
          email: accountEmail.trim(),
          name: profile.name,
          experience: profile.experience,
          platform: profile.platform,
          instrument: profile.instrument,
          challenges: profile.challenges,
          coachLanguage: profile.coachLanguage || "english",
          rules: rulesPayload,
          plan: "performance",
          promoCode: promoApplied ? promoCode : "",
          user_id: authData.user?.id,
        }),
      });

      if (authData.session) setSession(authData.session);
      setScreen("success");
    } catch (e) {
      setAuthError(e.message || "Account creation failed. Try again.");
    }
    setLoading(false);
  };

  // ── CSS ──────────────────────────────────────────────────────────────────────
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
    .glow:hover{box-shadow:0 0 32px #00E67555;transform:translateY(-2px);}
    .plan-card{transition:all 0.25s ease;}
    .plan-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px #00E67612;}
    .lang-btn:hover{color:#00E676!important;border-color:#00E67660!important;}
    .cat-btn:hover{background:#182818!important;}
    .rule-row:hover{background:#182818!important;}
    .tab:hover{color:#00E676!important;}
    .testimonial-card:hover{border-color:#00E67640!important;transform:translateY(-2px);}
    .billing-toggle{background:#111C11;border-radius:8px;padding:3px;display:inline-flex;}
    .billing-btn{padding:6px 16px;border-radius:6px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.05em;transition:all 0.15s;}
    .cal-day:hover{border-color:#00E67640!important;}
    input[type=range]{accent-color:#00E676;}
    input[type=time]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
    select option{background:#0F150F;}
    textarea:focus,input:focus,select:focus{outline:none;}
    .hero-section{background:radial-gradient(ellipse 90% 60% at 50% -5%,#00E67614 0%,transparent 65%),radial-gradient(ellipse 50% 40% at 85% 40%,#00BFA50A 0%,transparent 55%);}
    .pricing-section{background:linear-gradient(180deg,#080C08 0%,#0C150C 40%,#080C08 100%);border-top:1px solid #182818;border-bottom:1px solid #182818;}
  `;

  const inp = { width:"100%",padding:"10px 14px",background:"#0F150F",border:"1px solid #182818",borderRadius:8,color:"#D4F5D4",fontSize:14,fontFamily:"'DM Sans',sans-serif",transition:"border-color 0.2s" };
  const lbl = { display:"block",fontSize:11,color:"#4E8050",marginBottom:6,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase" };
  const PLAN = { name:t.plan_name, price_mo:t.plan_price_mo, price_yr:t.plan_price_yr, per_mo:t.plan_per_mo, per_yr:t.plan_per_yr, desc:t.plan_desc, features:t.plan_features };

  // ── Auth loading splash ───────────────────────────────────────────────────────
  if (authLoading) return (
    <div style={{ height:"100vh",background:"#080C08",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <style>{CSS}</style>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"#00E676",letterSpacing:3 }}>EDGEMIND</div>
    </div>
  );

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (screen === "login") return (
    <div style={{ minHeight:"100vh",background:"#080C08",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'DM Sans',sans-serif" }}>
      <style>{CSS}</style>
      <div className="up" style={{ width:"100%",maxWidth:380 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:"#00E676",letterSpacing:2,marginBottom:36,textAlign:"center" }}>EDGEMIND</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:"#F0FFF4",letterSpacing:1,marginBottom:6 }}>WELCOME BACK.</h2>
        <p style={{ fontSize:13,color:"#3D6B3D",marginBottom:28,lineHeight:1.6 }}>Log in to your coaching dashboard.</p>

        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div>
            <label style={lbl}>Email</label>
            <input style={inp} type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="you@email.com" onKeyDown={e=>e.key==="Enter"&&handleLogin()} autoFocus />
          </div>
          <div>
            <label style={lbl}>Password</label>
            <input style={inp} type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handleLogin()} />
          </div>

          {authError && (
            <div style={{ fontSize:12,color:authError.includes("sent")?"#00E676":"#EF4444",padding:"8px 12px",background:authError.includes("sent")?"#00E67610":"#EF444410",borderRadius:6,border:`1px solid ${authError.includes("sent")?"#00E67630":"#EF444430"}` }}>
              {authError}
            </div>
          )}

          <button onClick={handleLogin} disabled={loading} className="glow" style={{ padding:"14px",background:"#00E676",border:"none",borderRadius:8,color:"#080C08",fontWeight:800,fontSize:14,cursor:loading?"not-allowed":"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,transition:"all 0.2s",opacity:loading?0.7:1 }}>
            {loading ? "LOGGING IN..." : "LOG IN →"}
          </button>

          <button onClick={handleForgotPassword} style={{ background:"transparent",border:"none",color:"#2D4A2D",fontSize:12,cursor:"pointer",textDecoration:"underline",padding:0,textAlign:"center" }}>
            Forgot password?
          </button>

          <div style={{ borderTop:"1px solid #182818",paddingTop:16,textAlign:"center" }}>
            <span style={{ fontSize:13,color:"#2D4A2D" }}>New here? </span>
            <button onClick={()=>setScreen("onboarding")} style={{ background:"transparent",border:"none",color:"#00E676",fontSize:13,cursor:"pointer",fontWeight:700 }}>
              Start free trial →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Landing ───────────────────────────────────────────────────────────────────
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
          <button onClick={()=>setScreen("login")} style={{ padding:"9px 18px",background:"transparent",border:"1px solid #1E3020",borderRadius:6,color:"#3D6B3D",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.15s" }}>LOG IN</button>
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
          <p style={{ fontSize:13,color:"#3D6B3D",marginBottom:20,lineHeight:1.6 }}>How much have undisciplined trading decisions cost you in the last 30 days?</p>
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
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"#00E676" }}>$49</div>
                  <div style={{ fontSize:10,color:"#1A3020" }}>per month</div>
                </div>
              </div>
              <div style={{ textAlign:"center",padding:"12px",background:"#00E67610",borderRadius:8 }}>
                <div style={{ fontSize:13,color:"#00E676",fontWeight:700 }}>
                  EdgeMind costs {Math.round((parseInt(calcLoss)/49)*10)/10}× LESS than your rule breaks.
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
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16 }}>
          {TESTIMONIALS.map(tm=>(
            <div key={tm.name} className="testimonial-card" style={{ padding:"20px",background:"#0F150F",border:"1px solid #182818",borderRadius:12,transition:"all 0.2s ease" }}>
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
            <div className="billing-toggle">
              <button className="billing-btn" onClick={()=>setBilling("monthly")} style={{ background:billing==="monthly"?"#182818":"transparent",color:billing==="monthly"?"#00E676":"#3D6B3D" }}>{t.billing_mo}</button>
              <button className="billing-btn" onClick={()=>setBilling("annual")} style={{ background:billing==="annual"?"#182818":"transparent",color:billing==="annual"?"#00E676":"#3D6B3D",display:"flex",alignItems:"center",gap:6 }}>
                {t.billing_yr}
                <span style={{ padding:"1px 6px",background:"#00E676",borderRadius:4,fontSize:9,color:"#080C08",fontWeight:800 }}>{t.annual_save}</span>
              </button>
            </div>
          </div>

          <div style={{ maxWidth:400,margin:"0 auto 32px",display:"flex",gap:8 }}>
            <input style={{ ...inp,fontSize:13 }} placeholder="Promo code (e.g. FREE10)" value={promoCode} onChange={e=>{setPromoCode(e.target.value);setPromoError("");}} onKeyDown={e=>e.key==="Enter"&&applyPromo()} />
            <button onClick={applyPromo} style={{ padding:"10px 18px",background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#4E8050",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,whiteSpace:"nowrap" }}>APPLY</button>
          </div>
          {promoApplied && <div style={{ textAlign:"center",marginBottom:20,padding:"8px 16px",background:"#00E67615",border:"1px solid #00E67630",borderRadius:8,fontSize:13,color:"#00E676",fontWeight:700,maxWidth:400,margin:"0 auto 24px" }}>🎉 {promoApplied.label} applied!</div>}
          {promoError && <div style={{ textAlign:"center",marginBottom:20,color:"#EF4444",fontSize:12 }}>{promoError}</div>}

          <div style={{ maxWidth:480,margin:"0 auto" }}>
            <div className="plan-card" style={{ padding:"36px 32px",background:"#0F150F",border:"2px solid #00E676",borderRadius:20,position:"relative" }}>
              <div style={{ position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",padding:"4px 18px",background:"#00E676",borderRadius:20,fontSize:11,color:"#080C08",fontWeight:800,letterSpacing:"0.08em",whiteSpace:"nowrap" }}>FULL COACHING ACCESS</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"#00E676",letterSpacing:3,marginBottom:16,textAlign:"center" }}>{PLAN.name}</div>
              <div style={{ textAlign:"center",marginBottom:8 }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:64,color:"#F0FFF4",letterSpacing:1 }}>{billing==="annual"?"$34":"$49"}</span>
                <span style={{ fontSize:14,color:"#3D6B3D",marginLeft:4 }}>{billing==="annual"?"/mo (billed $409/yr)":"/month"}</span>
              </div>
              {billing==="annual" && <div style={{ textAlign:"center",marginBottom:16 }}><span style={{ background:"#00E67622",color:"#00E676",padding:"4px 14px",borderRadius:20,fontSize:11,fontWeight:800 }}>{t.plan_save}</span></div>}
              <p style={{ fontSize:13,color:"#3D6B3D",textAlign:"center",marginBottom:24,lineHeight:1.6 }}>{PLAN.desc}</p>
              <div style={{ marginBottom:28 }}>
                {PLAN.features.map((f,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:10,marginBottom:10 }}>
                    <span style={{ color:"#00E676",fontSize:14,marginTop:1,flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:13,color:"#8FAF8F",lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={()=>setScreen("onboarding")} className="glow" style={{ width:"100%",padding:"16px",background:"#00E676",border:"none",borderRadius:10,color:"#080C08",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1.5,transition:"all 0.2s" }}>
                {promoApplied?"🎉 CLAIM FREE ACCESS →":t.plan_cta}
              </button>
              <div style={{ textAlign:"center",marginTop:12,fontSize:11,color:"#3D6B3D" }}>{t.plan_trial}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Onboarding ────────────────────────────────────────────────────────────────
  const accountValid = accountEmail.includes("@") && accountPassword.length >= 8 && accountPassword === accountConfirmPw;

  const onboarding = [
    {
      title: "WHO ARE YOU AS A TRADER?",
      sub: "Your coach needs to know you before it can help you.",
      valid: !!(profile.name && profile.experience && profile.platform && profile.instrument && profile.phone),
      content: (
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div><label style={lbl}>Your Name</label><input style={inp} value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="First name"/></div>
          <div><label style={lbl}>WhatsApp Number (with country code)</label><input style={inp} value={profile.phone} onChange={e=>setProfile({...profile,phone:e.target.value})} placeholder="+1 555 123 4567"/></div>
          <div>
            <label style={lbl}>Coach Language</label>
            <div style={{ display:"flex",gap:8,marginTop:4 }}>
              {[["english","🇺🇸 English"],["spanish","🇪🇸 Spanish"],["portuguese","🇧🇷 Portuguese"]].map(([val,label])=>(
                <button key={val} onClick={()=>setProfile({...profile,coachLanguage:val})} style={{ flex:1,padding:"10px 8px",background:profile.coachLanguage===val?"#00E676":"#0F150F",border:`1px solid ${profile.coachLanguage===val?"#00E676":"#182818"}`,borderRadius:8,color:profile.coachLanguage===val?"#080C08":"#3D6B3D",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
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
        </div>
      ),
    },
    {
      title: "YOUR BIGGEST CHALLENGE.",
      sub: "Honesty here is everything. This is what your coach will focus on.",
      valid: !!(profile.challenges && profile.challenges.length > 0),
      content: (
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          <div style={{ fontSize:11,color:"#00E676",marginBottom:4,fontWeight:600,letterSpacing:"0.06em" }}>SELECT ALL THAT APPLY</div>
          {CHALLENGES.map(c=>{
            const selected = (profile.challenges||[]).includes(c);
            return (
              <button key={c} onClick={()=>{
                const prev = profile.challenges||[];
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
      title: "BUILD YOUR RULE SYSTEM.",
      sub: "Turn on the rules that apply to you. Set your numbers. These are non-negotiable.",
      valid: !!(rules.profitTarget.enabled && rules.lossLimit.enabled && rules.sessionStart.enabled && rules.sessionEnd.enabled),
      content: (
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
                          {rule.enabled && rule.type==="dollar"  && <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:8 }}><span style={{ color:"#3D6B3D",fontSize:13 }}>$</span><input style={{ ...inp,width:120,padding:"6px 10px",fontSize:13 }} type="number" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder={rule.defaultVal}/></div>}
                          {rule.enabled && rule.type==="time"    && <input style={{ ...inp,width:130,padding:"6px 10px",fontSize:13,marginTop:8 }} type="time" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)}/>}
                          {rule.enabled && rule.type==="number"  && <input style={{ ...inp,width:120,padding:"6px 10px",fontSize:13,marginTop:8 }} type="number" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder={rule.defaultVal}/>}
                          {rule.enabled && rule.type==="text"    && <input style={{ ...inp,width:"100%",padding:"6px 10px",fontSize:13,marginTop:8 }} type="text" value={rule.value} onChange={e=>setRuleValue(key,e.target.value)} placeholder="Write your rule in your own words..."/>}
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
      title: "CREATE YOUR ACCOUNT.",
      sub: "Your coaching dashboard, session history, and discipline score — all in one place.",
      valid: accountValid,
      content: (
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ padding:"14px 16px",background:"#00E67608",border:"1px solid #00E67620",borderRadius:10,fontSize:13,color:"#3D6B3D",lineHeight:1.6 }}>
            You're almost in. Create your account to access your personal coaching dashboard after every session.
          </div>
          <div>
            <label style={lbl}>Email</label>
            <input style={inp} type="email" value={accountEmail} onChange={e=>setAccountEmail(e.target.value)} placeholder="you@email.com" autoComplete="email"/>
          </div>
          <div>
            <label style={lbl}>Password (min 8 characters)</label>
            <input style={inp} type="password" value={accountPassword} onChange={e=>setAccountPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password"/>
          </div>
          <div>
            <label style={lbl}>Confirm Password</label>
            <input style={inp} type="password" value={accountConfirmPw} onChange={e=>setAccountConfirmPw(e.target.value)} placeholder="••••••••" autoComplete="new-password"/>
          </div>
          {accountPassword && accountConfirmPw && accountPassword !== accountConfirmPw && (
            <div style={{ fontSize:12,color:"#EF4444" }}>Passwords do not match.</div>
          )}
          {accountPassword && accountPassword.length < 8 && (
            <div style={{ fontSize:12,color:"#FB923C" }}>Password must be at least 8 characters.</div>
          )}
          {authError && (
            <div style={{ fontSize:12,color:"#EF4444",padding:"8px 12px",background:"#EF444410",borderRadius:6,border:"1px solid #EF444430" }}>{authError}</div>
          )}
        </div>
      ),
    },
    {
      title: "YOUR COMMITMENT.",
      sub: "Read this. Mean it. Then begin.",
      valid: true,
      content: (
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
            {enabledRules.length > 6 && <div style={{ fontSize:11,color:"#2D4A2D",textAlign:"center" }}>+{enabledRules.length-6} more rules active</div>}
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
          <div style={{ maxHeight:"52vh",overflowY:"auto",paddingRight:4 }}>{s.content}</div>
          <div style={{ display:"flex",gap:10,marginTop:24 }}>
            {step > 0 && <button onClick={()=>setStep(s=>s-1)} style={{ flex:1,padding:13,background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#3D6B3D",cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,fontSize:14 }}>← BACK</button>}
            <button
              onClick={()=>step < onboarding.length-1 ? setStep(s=>s+1) : startCoach()}
              disabled={!s.valid || loading}
              className={s.valid&&!loading?"glow":""}
              style={{ flex:2,padding:13,background:s.valid&&!loading?"#00E676":"#182818",border:"none",borderRadius:8,color:s.valid&&!loading?"#080C08":"#2D4A2D",fontWeight:800,fontSize:15,cursor:s.valid&&!loading?"pointer":"not-allowed",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,transition:"all 0.2s" }}
            >
              {loading ? "CREATING ACCOUNT..." : step < onboarding.length-1 ? "CONTINUE →" : "BEGIN MY JOURNEY →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Success ───────────────────────────────────────────────────────────────────
  if (screen === "success") return (
    <div style={{ minHeight:"100vh",background:"#080C08",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'DM Sans',sans-serif" }}>
      <style>{CSS}</style>
      <div className="up" style={{ width:"100%",maxWidth:480,textAlign:"center" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#00E676",letterSpacing:2,marginBottom:8 }}>EDGEMIND</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:"#F0FFF4",letterSpacing:1,marginBottom:4 }}>YOU'RE IN.</div>
        <p style={{ fontSize:13,color:"#3D6B3D",marginBottom:32 }}>Welcome to the disciplined side of trading, {profile.name}.</p>

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

        <div style={{ padding:"16px 20px",background:"#0F150F",border:"1px solid #182818",borderRadius:12,marginBottom:16,textAlign:"left" }}>
          <div style={{ fontSize:11,color:"#00E676",fontWeight:700,letterSpacing:"0.08em",marginBottom:8 }}>🎁 GIVE A FRIEND 1 FREE MONTH</div>
          <p style={{ fontSize:12,color:"#3D6B3D",marginBottom:10,lineHeight:1.6 }}>Share your code. They get their first month free. You get your next month free.</p>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            <div style={{ flex:1,padding:"10px 14px",background:"#080C08",border:"1px solid #00E67620",borderRadius:8,fontFamily:"monospace",fontSize:15,color:"#00E676",fontWeight:700,textAlign:"center",letterSpacing:2 }}>{referralCode}</div>
            <button onClick={()=>navigator.clipboard.writeText(referralCode)} style={{ padding:"10px 14px",background:"transparent",border:"1px solid #182818",borderRadius:8,color:"#4E8050",fontSize:12,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1 }}>COPY</button>
          </div>
        </div>

        <button onClick={()=>setScreen("dashboard")} className="glow" style={{ padding:"12px 32px",background:"#00E676",border:"none",borderRadius:8,color:"#080C08",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.2s" }}>
          VIEW MY DASHBOARD →
        </button>
      </div>
    </div>
  );

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  const TABS = [["stats","📊 Stats"],["rules","📋 Rules"]];

  return (
    <div style={{ height:"100vh",background:"#080C08",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif",overflow:"hidden" }}>
      <style>{CSS}</style>

      {/* Header */}
      <div style={{ padding:"10px 18px",borderBottom:"1px solid #111C11",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0C1210",flexShrink:0 }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"#00E676",letterSpacing:2 }}>EDGEMIND</div>
        <div style={{ display:"flex",gap:5 }}>
          {[
            { v:`$${rules.profitTarget.value||rules.profitTarget.defaultVal}`, c:"#00E676",  l:"TARGET" },
            { v:`$${rules.lossLimit.value||rules.lossLimit.defaultVal}`,       c:"#EF4444",  l:"LIMIT"  },
            { v:`${rules.sessionStart.value||rules.sessionStart.defaultVal}–${rules.sessionEnd.value||rules.sessionEnd.defaultVal}`, c:"#00BFA5", l:"WINDOW" },
          ].map(r=>(
            <div key={r.l} style={{ padding:"3px 9px",background:"#0F150F",border:`1px solid ${r.c}18`,borderRadius:4,textAlign:"center" }}>
              <div style={{ fontSize:9,color:"#2D4A2D",letterSpacing:"0.08em",fontWeight:700 }}>{r.l}</div>
              <div style={{ fontSize:11,color:r.c,fontWeight:700,marginTop:1 }}>{r.v}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ padding:"3px 10px",background:`${sc}15`,border:`1px solid ${sc}30`,borderRadius:6,textAlign:"center" }}>
            <div style={{ fontSize:9,color:sc,fontWeight:700,letterSpacing:"0.06em" }}>DISCIPLINE</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:sc,lineHeight:1 }}>{disciplineScore} <span style={{ fontSize:9 }}>{scoreLabel(disciplineScore)}</span></div>
          </div>
          {streak > 0 && <span style={{ fontSize:11,padding:"3px 8px",background:"#00E67615",border:"1px solid #00E67625",borderRadius:10,color:"#00E676" }}>🔥 {streak}d</span>}
          <span style={{ fontSize:12,color:"#2D4A2D",fontWeight:500 }}>{profile.name}</span>
          <button onClick={handleLogout} style={{ padding:"4px 10px",background:"transparent",border:"1px solid #182818",borderRadius:4,color:"#2D4A2D",fontSize:11,cursor:"pointer",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1,transition:"all 0.15s" }}>LOG OUT</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex",borderBottom:"1px solid #111C11",background:"#0C1210",flexShrink:0 }}>
        {TABS.map(([id,label])=>(
          <button key={id} className="tab" onClick={()=>setActiveTab(id)} style={{ padding:"10px 18px",background:"transparent",border:"none",borderBottom:activeTab===id?"2px solid #00E676":"2px solid transparent",color:activeTab===id?"#00E676":"#2D4A2D",fontSize:13,cursor:"pointer",fontWeight:activeTab===id?600:400,fontFamily:"'DM Sans',sans-serif",transition:"color 0.15s" }}>{label}</button>
        ))}
      </div>

      {/* ── STATS TAB ── */}
      {activeTab === "stats" && (
        <div style={{ flex:1,overflowY:"auto",padding:18 }}>

          {/* 4 metric cards */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20 }}>
            <div style={{ padding:"16px 18px",background:"#0F150F",border:`1px solid ${sc}30`,borderRadius:12 }}>
              <div style={{ fontSize:10,color:"#2D4A2D",fontWeight:700,letterSpacing:"0.06em",marginBottom:8 }}>DISCIPLINE SCORE</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:sc,lineHeight:1 }}>{disciplineScore}</div>
              <div style={{ fontSize:11,color:sc,fontWeight:700,marginTop:4 }}>{scoreLabel(disciplineScore)}</div>
            </div>
            <div style={{ padding:"16px 18px",background:"#0F150F",border:"1px solid #182818",borderRadius:12 }}>
              <div style={{ fontSize:10,color:"#2D4A2D",fontWeight:700,letterSpacing:"0.06em",marginBottom:8 }}>TOTAL P&L</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:totalPnl>=0?"#00E676":"#EF4444",lineHeight:1 }}>
                {sessions.length ? `${totalPnl>=0?"+":""}$${Math.abs(totalPnl).toLocaleString()}` : "—"}
              </div>
              <div style={{ fontSize:11,color:"#2D4A2D",marginTop:4 }}>all sessions</div>
            </div>
            <div style={{ padding:"16px 18px",background:"#0F150F",border:"1px solid #182818",borderRadius:12 }}>
              <div style={{ fontSize:10,color:"#2D4A2D",fontWeight:700,letterSpacing:"0.06em",marginBottom:8 }}>SESSIONS</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:"#F0FFF4",lineHeight:1 }}>{sessions.length || "0"}</div>
              <div style={{ fontSize:11,color:"#2D4A2D",marginTop:4 }}>total logged</div>
            </div>
            <div style={{ padding:"16px 18px",background:"#0F150F",border:"1px solid #182818",borderRadius:12 }}>
              <div style={{ fontSize:10,color:"#2D4A2D",fontWeight:700,letterSpacing:"0.06em",marginBottom:8 }}>DISCIPLINE RATE</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:disciplineRate>=80?"#00E676":disciplineRate>=50?"#FFD166":"#EF4444",lineHeight:1 }}>
                {sessions.length ? `${disciplineRate}%` : "—"}
              </div>
              <div style={{ fontSize:11,color:"#2D4A2D",marginTop:4 }}>rules followed</div>
            </div>
          </div>

          {/* Cumulative P&L Chart */}
          <div style={{ background:"#0F150F",border:"1px solid #182818",borderRadius:12,padding:"16px 18px",marginBottom:20 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#F0FFF4",letterSpacing:1,marginBottom:14 }}>CUMULATIVE P&L</div>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={chartData} margin={{ top:4,right:4,left:0,bottom:0 }}>
                  <XAxis dataKey="date" tick={{ fill:"#2D4A2D",fontSize:10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill:"#2D4A2D",fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}`} width={52} />
                  <Tooltip
                    contentStyle={{ background:"#0C1210",border:"1px solid #182818",borderRadius:8,color:"#D4F5D4",fontSize:12 }}
                    formatter={v=>[`${v>=0?"+":""}$${v.toLocaleString()}`,"Cumulative P&L"]}
                    labelStyle={{ color:"#4E8050" }}
                  />
                  <Line type="monotone" dataKey="cumPnl" stroke="#00E676" strokeWidth={2} dot={false} activeDot={{ r:4,fill:"#00E676" }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height:140,display:"flex",alignItems:"center",justifyContent:"center",color:"#1A301A",fontSize:12 }}>
                No sessions yet. Log your first session via WhatsApp.
              </div>
            )}
          </div>

          {/* Calendar + Session History */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>

            {/* Monthly Calendar */}
            <div style={{ background:"#0F150F",border:"1px solid #182818",borderRadius:12,padding:"16px 18px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <button onClick={goCalPrev} style={{ background:"transparent",border:"none",color:"#3D6B3D",cursor:"pointer",fontSize:18,padding:"0 4px",lineHeight:1 }}>‹</button>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#F0FFF4",letterSpacing:1 }}>
                  {new Date(calYear,calMonth).toLocaleString("default",{month:"long",year:"numeric"}).toUpperCase()}
                </div>
                <button onClick={goCalNext} style={{ background:"transparent",border:"none",color:"#3D6B3D",cursor:"pointer",fontSize:18,padding:"0 4px",lineHeight:1 }}>›</button>
              </div>

              {/* Day headers */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6 }}>
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=>(
                  <div key={d} style={{ textAlign:"center",fontSize:9,color:"#2D4A2D",fontWeight:700,padding:"2px 0" }}>{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              {calWeeks.map((week,wi)=>(
                <div key={wi} style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:2 }}>
                  {week.map((day,di)=>{
                    const dateStr = day ? `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,"0")}-${String(day.getDate()).padStart(2,"0")}` : null;
                    const sess    = dateStr ? sessionsByDate[dateStr] : null;
                    const isToday = day && new Date().toDateString() === day.toDateString();
                    return (
                      <div key={di} className="cal-day" style={{
                        aspectRatio:"1",borderRadius:4,padding:2,
                        background: !day ? "transparent" : sess ? (sess.pnl>=0?"#00E67614":"#EF444414") : isToday ? "#182818" : "#0C1210",
                        border: sess ? `1px solid ${sess.pnl>=0?"#00E67635":"#EF444435"}` : isToday ? "1px solid #2D4A2D" : "1px solid transparent",
                        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:sess?"pointer":"default",
                        transition:"border-color 0.15s",
                      }}>
                        {day && <div style={{ fontSize:8,color:sess?(sess.pnl>=0?"#00E676":"#EF4444"):isToday?"#4E8050":"#2D4A2D",fontWeight:isToday?700:400 }}>{day.getDate()}</div>}
                        {sess && <div style={{ fontSize:7,fontWeight:700,color:sess.pnl>=0?"#00E676":"#EF4444",marginTop:1 }}>{sess.pnl>=0?"+":""}${Math.abs(sess.pnl)}</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Session History */}
            <div style={{ background:"#0F150F",border:"1px solid #182818",borderRadius:12,padding:"16px 18px",overflowY:"auto",maxHeight:400 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#F0FFF4",letterSpacing:1,marginBottom:14 }}>SESSION HISTORY</div>
              {sessions.length === 0 ? (
                <div style={{ padding:"24px 0",textAlign:"center",color:"#1A301A",fontSize:12,lineHeight:1.7 }}>
                  No sessions yet.<br/>
                  <span style={{ color:"#2D4A2D" }}>Send <em>"Done. Made $X. Rules: Yes"</em><br/>via WhatsApp to log your first session.</span>
                </div>
              ) : (
                <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                  {[...sessions].reverse().slice(0,20).map((s,i)=>(
                    <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",background:"#0C1210",borderLeft:`3px solid ${s.rulesFollowed?"#00E676":"#EF4444"}`,borderRadius:"0 6px 6px 0" }}>
                      <span style={{ fontSize:11,color:"#3D6B3D",minWidth:56 }}>{fmtDate(s.session_date||s.date)}</span>
                      <span style={{ fontSize:13,fontWeight:700,color:s.pnl>=0?"#00E676":"#EF4444" }}>{s.pnl>=0?"+":""}${Math.abs(s.pnl).toLocaleString()}</span>
                      <span style={{ fontSize:10,padding:"2px 7px",borderRadius:10,background:s.rulesFollowed?"#00E67615":"#EF444415",color:s.rulesFollowed?"#00E676":"#EF4444",fontWeight:600 }}>
                        {s.rulesFollowed?"✓ Rules":"✗ Rules"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── RULES TAB ── */}
      {activeTab === "rules" && (
        <div style={{ flex:1,overflowY:"auto",padding:18 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#F0FFF4",letterSpacing:1,marginBottom:4 }}>YOUR RULE SYSTEM</div>
          <div style={{ fontSize:12,color:"#2D4A2D",marginBottom:20 }}>Set by you. Enforced by your coach. These do not bend.</div>

          {CATEGORIES.map(cat=>{
            const catRules = enabledRules.filter(([,v])=>v.category===cat.id);
            if (catRules.length === 0) return null;
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
            <div style={{ fontSize:14,color:"#D4F5D4",lineHeight:1.6 }}>{(profile.challenges||[]).join(", ") || "Not set"}</div>
          </div>

          <div style={{ padding:"14px 16px",background:"#0F150F",border:"1px solid #182818",borderRadius:10,marginTop:10 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#3D6B3D",letterSpacing:1,marginBottom:6 }}>THE RULE ABOVE ALL RULES</div>
            <div style={{ fontSize:13,color:"#2D4A2D",lineHeight:1.7,fontStyle:"italic" }}>
              "The rules you set when calm are the only rules that count. The version of you that wants to break them is not qualified to make trading decisions."
            </div>
          </div>

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
