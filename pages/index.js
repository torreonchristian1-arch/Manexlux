import Head from "next/head";
import { useState, useEffect, useRef } from "react";

const INSTALL_URL = "https://capsulix.vercel.app/api/auth/install?shop=";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition: `opacity 0.8s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

const PRODUCTS = [
  { name: "Vitality Capsules", meta: "Daily wellness · 60 caps", tag: "Bestseller", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=85", goals: ["Energy","Immunity","Hair & Nails"] },
  { name: "Performance Powder", meta: "300g · 30 servings", tag: "Popular", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=85", goals: ["Fitness","Energy","Weight"] },
  { name: "Core Gummies", meta: "Gummy format · 60 gummies", tag: "New", img: "https://images.unsplash.com/photo-1559181567-c3190ca9d5db?w=600&q=85", goals: ["Immunity","Beauty","Energy"] },
  { name: "Slim & Balance", meta: "Weight support · 90 caps", tag: "Trending", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85", goals: ["Weight","Fitness","Energy"] },
  { name: "Radiance Complex", meta: "Beauty from within · 60 caps", tag: "Premium", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=85", goals: ["Hair & Nails","Immunity","Glow"] },
];

const FAQS = [
  { q: "Do I need supplement industry experience?", a: "None at all. Our formulas are lab-certified, ready to brand and sell. You focus on marketing — we handle manufacturing, compliance, and fulfillment." },
  { q: "How is the pricing free?", a: "We charge wholesale cost per order, funded by your customer's payment. No monthly fees, no stocking fees. We only make money when you make a sale." },
  { q: "Where are the supplements made?", a: "All Capsulix supplements are manufactured in GMP-certified facilities. Every formula is tested for purity, potency, and safety before shipping." },
  { q: "How does my customer receive the order?", a: "Directly from us, under your brand. Your logo, your packaging, your label. Capsulix is completely invisible to your customers." },
  { q: "Can I set my own prices?", a: "Completely. You set your retail price. We charge wholesale. The difference is your profit — typically 50–70% margin." },
];

const CSS = `
  :root{--bg:#F4F8FB;--bg-d:#EBF3F8;--navy:#0D2137;--blue:#1B5E8A;--blue-l:#2E86AB;--blue-p:rgba(27,94,138,0.08);--orange:#E07B39;--orange-l:#F4A261;--text-s:#3A5A72;--text-m:#7A9AB0;--border:#D0E4EF;--line:rgba(13,33,55,0.08);--shadow:0 2px 12px rgba(13,33,55,0.06);--shadow-md:0 8px 32px rgba(13,33,55,0.1);--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans',sans-serif;}
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}
  body{font-family:var(--sans);background:var(--bg);color:var(--navy);overflow-x:hidden;}
  a{text-decoration:none;color:inherit;}img{display:block;}
  .micro{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:600;}

  nav{position:fixed;top:0;left:0;right:0;height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 48px;z-index:100;transition:all 0.3s;}
  nav.solid{background:rgba(244,248,251,0.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);box-shadow:var(--shadow);}
  .logo{font-family:var(--serif);font-size:24px;font-weight:700;color:var(--navy);}
  .logo span{color:var(--blue);}
  .nav-links{display:flex;gap:32px;}
  .nav-link{font-size:13px;font-weight:500;color:var(--text-s);transition:color 0.2s;}
  .nav-link:hover{color:var(--navy);}
  .nav-cta{padding:10px 22px;background:var(--blue);color:white;border-radius:100px;font-size:13px;font-weight:600;transition:all 0.2s;}
  .nav-cta:hover{background:var(--blue-l);transform:translateY(-1px);}

  .hero{min-height:100vh;padding:120px 48px 80px;background:linear-gradient(160deg,var(--bg) 40%,#E0EEF8 100%);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;overflow:hidden;}
  .hero::before{content:"";position:absolute;top:-200px;right:-200px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(27,94,138,0.07) 0%,transparent 65%);pointer-events:none;}
  .eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--blue-p);border:1px solid rgba(27,94,138,0.18);color:var(--blue);font-size:12px;font-weight:600;padding:6px 14px;border-radius:100px;margin-bottom:28px;}
  .eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--blue);animation:pulse 2s infinite;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
  .hero h1{font-family:var(--serif);font-size:clamp(44px,6vw,80px);font-weight:700;line-height:1.05;color:var(--navy);margin-bottom:24px;}
  .hero h1 em{font-style:italic;color:var(--blue);}
  .hero-desc{font-size:18px;color:var(--text-s);max-width:480px;margin-bottom:36px;line-height:1.65;}
  .hero-desc strong{color:var(--navy);}
  .btn{display:inline-flex;align-items:center;gap:8px;padding:15px 28px;border-radius:100px;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:all 0.25s;font-family:var(--sans);}
  .btn-blue{background:var(--blue);color:white;box-shadow:0 4px 20px rgba(27,94,138,0.3);}
  .btn-blue:hover{background:var(--blue-l);transform:translateY(-2px);}
  .btn-outline{background:transparent;color:var(--navy);border:2px solid var(--navy);}
  .btn-outline:hover{background:var(--navy);color:white;}
  .hero-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
  .trust{display:flex;align-items:center;gap:12px;font-size:13px;color:var(--text-s);}
  .trust strong{color:var(--navy);}
  .trust-dots{display:flex;}
  .trust-dots span{width:30px;height:30px;border-radius:50%;border:2px solid var(--bg);margin-left:-7px;display:flex;align-items:center;justify-content:center;font-size:12px;}
  .trust-dots span:first-child{margin-left:0;}

  .hero-visual{position:relative;}
  .hero-visual-main{border-radius:24px;overflow:hidden;aspect-ratio:4/5;box-shadow:0 32px 80px rgba(13,33,55,0.15);}
  .hero-visual-main img{width:100%;height:100%;object-fit:cover;}
  .stat-card{position:absolute;background:white;border-radius:16px;padding:16px 20px;box-shadow:var(--shadow-md);border:1px solid var(--border);}
  .stat-card.one{top:10%;left:-12%;animation:floatA 6s ease-in-out infinite;}
  .stat-card.two{bottom:15%;right:-10%;animation:floatB 7s ease-in-out infinite;}
  @keyframes floatA{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  @keyframes floatB{0%,100%{transform:translateY(0);}50%{transform:translateY(10px);}}
  .sc-label{font-size:10px;color:var(--text-m);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:3px;}
  .sc-value{font-family:var(--serif);font-size:24px;font-weight:700;color:var(--navy);line-height:1;}
  .sc-value em{font-style:italic;color:var(--blue);}
  .sc-note{font-size:11px;color:var(--blue);margin-top:3px;}

  .ticker-wrap{background:var(--navy);padding:13px 0;overflow:hidden;}
  .ticker{display:flex;gap:48px;animation:ticker 25s linear infinite;white-space:nowrap;}
  @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}

  .section{padding:100px 48px;}
  .section-label{font-size:11px;font-weight:700;color:var(--blue);letter-spacing:0.18em;text-transform:uppercase;margin-bottom:14px;}
  .section-title{font-family:var(--serif);font-size:clamp(32px,4.5vw,60px);font-weight:700;line-height:1.1;color:var(--navy);margin-bottom:18px;}
  .section-title em{font-style:italic;color:var(--blue);}
  .section-sub{font-size:17px;color:var(--text-s);line-height:1.6;max-width:560px;}

  .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1100px;margin:60px auto 0;}
  .step{background:white;border-radius:20px;padding:32px;border:1px solid var(--border);box-shadow:var(--shadow);transition:transform 0.25s;}
  .step:hover{transform:translateY(-4px);}
  .step-n{font-family:var(--serif);font-style:italic;font-size:56px;font-weight:700;color:rgba(27,94,138,0.12);line-height:1;margin-bottom:-8px;}
  .step-icon{width:44px;height:44px;border-radius:11px;background:var(--blue-p);display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:var(--blue);}
  .step h3{font-family:var(--serif);font-size:22px;font-weight:700;color:var(--navy);margin-bottom:10px;}
  .step h3 em{font-style:italic;color:var(--blue);}
  .step p{font-size:14px;color:var(--text-s);line-height:1.6;}

  .value-section{padding:100px 48px;background:var(--navy);color:white;border-radius:32px;margin:40px 20px;position:relative;overflow:hidden;}
  .value-section::before{content:"";position:absolute;bottom:-200px;right:-100px;width:500px;height:500px;background:radial-gradient(circle,rgba(224,123,57,0.2),transparent 60%);filter:blur(60px);}
  .value-inner{max-width:900px;margin:0 auto;position:relative;z-index:1;}
  .value-label{font-size:10px;font-weight:700;color:rgba(255,255,255,0.45);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:28px;display:block;}
  .value-title{font-family:var(--serif);font-size:clamp(36px,5vw,62px);font-weight:700;line-height:1.08;margin-bottom:56px;}
  .value-title em{font-style:italic;color:var(--orange-l);}
  .value-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:40px 60px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.12);}
  .v-num{font-family:var(--serif);font-style:italic;font-size:40px;font-weight:700;color:var(--orange-l);margin-bottom:10px;line-height:1;}
  .value-item h4{font-family:var(--serif);font-size:20px;font-weight:700;margin-bottom:8px;}
  .value-item p{font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;}

  .products-section{padding:100px 48px;background:var(--bg-d);}
  .prod-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;max-width:1200px;margin:48px auto 0;}
  .prod{cursor:pointer;}
  .prod-img{aspect-ratio:1;border-radius:16px;overflow:hidden;background:white;margin-bottom:12px;position:relative;box-shadow:var(--shadow);}
  .prod-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s;}
  .prod:hover .prod-img img{transform:scale(1.06);}
  .prod-tag{position:absolute;top:10px;left:10px;padding:4px 10px;background:rgba(244,248,251,0.95);backdrop-filter:blur(8px);border-radius:100px;font-size:9px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;color:var(--navy);}
  .prod-name{font-family:var(--serif);font-size:15px;font-weight:700;color:var(--navy);margin-bottom:3px;}
  .prod-meta{font-size:11px;color:var(--text-m);}
  .prod-goals{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap;}
  .prod-goal{font-size:9px;font-weight:600;color:var(--blue);background:var(--blue-p);border-radius:100px;padding:2px 7px;}

  .testi-section{padding:100px 48px;}
  .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1100px;margin:48px auto 0;}
  .testi{background:white;border-radius:20px;padding:28px;border:1px solid var(--border);box-shadow:var(--shadow);}
  .testi-stars{color:var(--orange);font-size:13px;letter-spacing:2px;margin-bottom:14px;}
  .testi-quote{font-size:15px;line-height:1.7;color:var(--text-s);margin-bottom:20px;font-style:italic;}
  .testi-author{display:flex;align-items:center;gap:10px;padding-top:16px;border-top:1px solid var(--line);}
  .t-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:white;flex-shrink:0;}
  .t-name{font-size:13px;font-weight:600;color:var(--navy);}
  .t-title{font-size:11px;color:var(--text-m);}

  .faq-section{padding:100px 48px;}
  .faq-list{max-width:720px;margin:48px auto 0;}
  .faq{border-top:1px solid var(--border);padding:24px 0;cursor:pointer;}
  .faq:last-child{border-bottom:1px solid var(--border);}
  .faq-q{display:flex;justify-content:space-between;align-items:center;gap:24px;}
  .faq-q h4{font-family:var(--serif);font-size:20px;font-weight:700;color:var(--navy);}
  .faq-plus{font-size:22px;color:var(--blue);transition:transform 0.3s;flex-shrink:0;font-weight:300;}
  .faq.open .faq-plus{transform:rotate(45deg);}
  .faq-a{max-height:0;overflow:hidden;color:var(--text-s);line-height:1.7;transition:max-height 0.4s ease,padding 0.4s ease;font-size:14px;}
  .faq.open .faq-a{max-height:200px;padding-top:14px;}

  .final{padding:120px 48px;text-align:center;background:linear-gradient(160deg,var(--bg) 0%,#E0EEF8 100%);}
  .final h2{font-family:var(--serif);font-size:clamp(40px,6vw,80px);font-weight:700;line-height:1.05;color:var(--navy);margin-bottom:20px;}
  .final h2 em{font-style:italic;color:var(--blue);}
  .final p{font-size:17px;color:var(--text-s);margin-bottom:36px;max-width:500px;margin-left:auto;margin-right:auto;}
  .install-form{display:flex;max-width:460px;margin:0 auto;border-radius:100px;overflow:hidden;box-shadow:var(--shadow-md);border:1px solid var(--border);background:white;}
  .install-input{flex:1;padding:14px 20px;border:none;font-size:14px;color:var(--navy);background:transparent;font-family:var(--sans);}
  .install-input:focus{outline:none;}
  .install-input::placeholder{color:var(--text-m);}

  footer{background:var(--navy);padding:56px 48px 32px;}
  .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;max-width:1200px;margin:0 auto 48px;}
  .footer-logo{font-family:var(--serif);font-size:28px;font-weight:700;color:white;margin-bottom:12px;}
  .footer-logo span{color:var(--orange-l);}
  .footer-desc{font-size:13px;color:rgba(255,255,255,0.4);max-width:260px;line-height:1.6;}
  .footer-col h4{font-size:10px;font-weight:600;color:rgba(255,255,255,0.3);letter-spacing:0.18em;text-transform:uppercase;margin-bottom:16px;}
  .footer-col ul{list-style:none;}
  .footer-col li{margin-bottom:9px;}
  .footer-col a{font-size:13px;color:rgba(255,255,255,0.5);transition:color 0.2s;}
  .footer-col a:hover{color:var(--orange-l);}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.25);font-size:12px;max-width:1200px;margin:0 auto;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeScale{from{opacity:0;transform:scale(0.96);}to{opacity:1;transform:scale(1);}}
  .hero-left>*{animation:fadeUp 0.9s cubic-bezier(0.23,1,0.32,1) both;}
  .eyebrow{animation-delay:0.1s!important;}.hero h1{animation-delay:0.22s!important;}.hero-desc{animation-delay:0.35s!important;}.hero-ctas{animation-delay:0.48s!important;}.trust{animation-delay:0.6s!important;}
  .hero-visual{animation:fadeScale 1.2s 0.25s cubic-bezier(0.23,1,0.32,1) both;}

  @media(max-width:1024px){.prod-grid{grid-template-columns:repeat(3,1fr)!important;}}
  @media(max-width:900px){nav{padding:0 20px;}.nav-links{display:none;}.hero{grid-template-columns:1fr;padding:100px 20px 60px;gap:40px;}.stat-card{display:none!important;}.section,.products-section,.testi-section,.faq-section,.final{padding:72px 20px;}.value-section{padding:72px 20px;margin:20px 10px;border-radius:20px;}.steps,.testi-grid{grid-template-columns:1fr;}.value-grid{grid-template-columns:1fr;gap:28px;}.footer-top{grid-template-columns:1fr 1fr;gap:28px;}.footer-bottom{flex-direction:column;gap:10px;text-align:center;}}
  @media(max-width:480px){.prod-grid{grid-template-columns:1fr 1fr!important;}}
`;

export default function Home() {
  const [shopInput, setShopInput] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const fn = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function install(e) {
    e.preventDefault();
    let s = shopInput.trim();
    if (!s) return;
    if (!s.includes(".myshopify.com")) s += ".myshopify.com";
    window.location.href = INSTALL_URL + s;
  }

  return (
    <>
      <Head>
        <title>Capsulix® — Launch Your Private Label Supplement Brand</title>
        <meta name="description" content="Launch your own private label supplement brand on Shopify. No inventory, no manufacturing, no upfront cost. We produce, brand and ship on your behalf." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>

      {/* NAV */}
      <nav className={navSolid ? "solid" : ""}>
        <div className="logo">Capsulix<span>®</span></div>
        <div className="nav-links">
          {[["How it works","#how"],["Products","#products"],["FAQ","#faq"]].map(([l,h]) => <a key={l} href={h} className="nav-link">{l}</a>)}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <a href="/dashboard" className="nav-link" style={{ fontSize:13 }}>Sign in</a>
          <a href="#start" className="nav-cta">Start free →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="eyebrow micro"><span className="eyebrow-dot"></span>Zero inventory · Zero upfront cost</div>
          <h1>Your supplement<br />brand. Without the <em>factory</em>.</h1>
          <p className="hero-desc">Launch your own private label supplement line on Shopify — <strong>without buying a single capsule upfront.</strong> Sell under your name; we manufacture, brand, and ship on your behalf.</p>
          <div className="hero-ctas">
            <a href="#start" className="btn btn-blue">Start your brand — free →</a>
            <a href="#how" className="btn btn-outline">See how it works →</a>
          </div>
          <div className="trust">
            <div className="trust-dots">
              {["⚡","💪","🛡️","✨"].map((e,i) => <span key={i} style={{ background:["#1B5E8A","#E07B39","#2E86AB","#0D2137"][i] }}>{e}</span>)}
            </div>
            <div><strong>280+ founders</strong> launched this month<br /><span style={{ color:"var(--text-m)" }}>Average first sale: 12 days</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-main">
            <img src="https://images.unsplash.com/photo-1559181567-c3190ca9d5db?w=800&q=85" alt="Supplements" />
          </div>
          <div className="stat-card one">
            <div className="sc-label">Order placed</div>
            <div className="sc-value">$<em>320</em></div>
            <div className="sc-note">Your brand · shipped to NYC</div>
          </div>
          <div className="stat-card two">
            <div className="sc-label">Your profit</div>
            <div className="sc-value"><em>58%</em> margin</div>
            <div className="sc-note">Paid on delivery</div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div style={{ overflow:"hidden" }}>
          <div className="ticker">
            {["Health Coaches ✦","Fitness Influencers ✦","Nutritionists ✦","Gym Owners ✦","DTC Sellers ✦","MLM Escapees ✦","Health Coaches ✦","Fitness Influencers ✦","Nutritionists ✦","Gym Owners ✦","DTC Sellers ✦","MLM Escapees ✦"].map((p,i) => (
              <span key={i} style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.35)", letterSpacing:"0.05em" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <Reveal><div className="section-label">The Process</div>
        <div className="section-title">Three steps.<br /><em>No lab. No logistics.</em></div>
        <div className="section-sub">Built for health entrepreneurs who want to launch a supplement brand without the capital risk.</div></Reveal>
        <div className="steps">
          {[
            { n:"01", title:"Choose your", em:" formula.", desc:"Browse 5 hero products. Filter by customer goal — energy, fitness, immunity, weight, or beauty. Pick your formula.", icon:"💊" },
            { n:"02", title:"Brand and", em:" publish.", desc:"Upload your logo, set your colours, choose your label style. Publish branded products to your Shopify store in minutes.", icon:"🏷️" },
            { n:"03", title:"We fulfil", em:" every order.", desc:"Customer orders on your Shopify. We manufacture under your brand and ship directly to them. You never touch a capsule.", icon:"📦" },
          ].map((s,i) => (
            <Reveal key={i} delay={i*100}>
              <div className="step">
                <div className="step-n">{s.n}</div>
                <div className="step-icon" style={{ fontSize:22 }}>{s.icon}</div>
                <h3>{s.title}<em>{s.em}</em></h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUE */}
      <div className="value-section">
        <div className="value-inner">
          <span className="value-label">Why Capsulix</span>
          <div className="value-title">Most supplement businesses fail because of <em>minimum order risk</em>. We removed it.</div>
          <div className="value-grid">
            {[
              { num:"$0", title:"Zero upfront cost", desc:"No capsules to buy. No warehouse. No MOQ. You only pay wholesale per order, funded by your customer's payment." },
              { num:"100%", title:"Your brand, always", desc:"Your logo, your label, your packaging. Capsulix is invisible. To your customers, you are the manufacturer." },
              { num:"GMP", title:"Certified quality", desc:"Every formula manufactured in GMP-certified facilities. Third-party tested for purity and potency on every batch." },
              { num:"60%+", title:"Real margins", desc:"Manufacturer-direct pricing. You set retail. Typical founders keep 50–70% margin on every order." },
            ].map((v,i) => (
              <Reveal key={i} delay={i*80}>
                <div className="value-item"><div className="v-num">{v.num}</div><h4>{v.title}</h4><p>{v.desc}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="products-section" id="products">
        <Reveal>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div className="section-label">The Catalogue</div>
            <div className="section-title">5 hero products.<br /><em>Every health goal.</em></div>
            <div className="section-sub">Each product has 3 goal-based formula variants. Pick your audience — we match the right formula automatically.</div>
          </div>
        </Reveal>
        <div className="prod-grid">
          {PRODUCTS.map((p,i) => (
            <Reveal key={i} delay={i*80}>
              <div className="prod">
                <div className="prod-img">
                  <span className="prod-tag">{p.tag}</span>
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="prod-name">{p.name}</div>
                <div className="prod-meta">{p.meta}</div>
                <div className="prod-goals">{p.goals.map(g => <span key={g} className="prod-goal">{g}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <Reveal><div style={{ textAlign:"center", marginBottom:8 }}><div className="section-label">Founders</div><div className="section-title">From side hustle to <em>supplement brand</em>.</div></div></Reveal>
        <div className="testi-grid">
          {[
            { quote:"I launched my protein brand in one afternoon. First sale came within a week. Capsulix does everything — I just market and earn.", name:"James O.", title:"FitFuel Supplements · London", initials:"JO", color:"#1B5E8A" },
            { quote:"The goal-based filtering is genius. My customers are athletes — I just picked fitness formulas and published. Done in 20 minutes.", name:"Sarah M.", title:"PureForm · Sydney", initials:"SM", color:"#E07B39" },
            { quote:"My wellness brand made $4,800 in the first 6 weeks with zero inventory. I still can't believe this is how simple it is.", name:"Carlos R.", title:"NutriCore · Miami", initials:"CR", color:"#2E86AB" },
          ].map((t,i) => (
            <Reveal key={i} delay={i*80}>
              <div className="testi">
                <div className="testi-stars">★★★★★</div>
                <div className="testi-quote">"{t.quote}"</div>
                <div className="testi-author">
                  <div className="t-av" style={{ background:t.color }}>{t.initials}</div>
                  <div><div className="t-name">{t.name}</div><div className="t-title">{t.title}</div></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <Reveal><div style={{ textAlign:"center" }}><div className="section-label">Questions</div><div className="section-title">The <em>honest</em> answers.</div></div></Reveal>
        <div className="faq-list">
          {FAQS.map((f,i) => (
            <div key={i} className={`faq${openFaq===i?" open":""}`} onClick={() => setOpenFaq(openFaq===i?null:i)}>
              <div className="faq-q"><h4>{f.q}</h4><span className="faq-plus">+</span></div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="start">
        <Reveal>
          <h2>Your brand is <em>ready</em>.<br />Are you?</h2>
          <p>Launch your private label supplement line in minutes. No inventory, no factory, no excuses.</p>
          <form onSubmit={install} className="install-form">
            <input className="install-input" value={shopInput} onChange={e => setShopInput(e.target.value)} placeholder="yourstore.myshopify.com" />
            <button type="submit" className="btn btn-blue" style={{ borderRadius:100, flexShrink:0 }}>Install Free →</button>
          </form>
          <p style={{ fontSize:12, color:"var(--text-m)", marginTop:14, textAlign:"center" }}>No credit card required · Cancel anytime · $0 upfront cost</p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">Capsulix<span>®</span></div>
            <p className="footer-desc">Private label supplements for Shopify merchants. Zero inventory, automated fulfillment, real margins.</p>
          </div>
          {[
            { title:"Platform", links:[["How it works","#how"],["Products","#products"],["Pricing","#start"]] },
            { title:"Support", links:[["FAQ","#faq"],["Help Center","/help"],["Contact","mailto:support@capsulix.com"]] },
            { title:"Legal", links:[["Terms","/terms"],["Privacy","/privacy"]] },
          ].map(col => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <ul>{col.links.map(([l,h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Capsulix®. All Rights Reserved.</span>
          <span>Zero inventory · Ships worldwide</span>
        </div>
      </footer>
    </>
  );
}