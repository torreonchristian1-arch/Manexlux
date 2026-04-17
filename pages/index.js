import Head from "next/head";
import { useState, useEffect } from "react";

const INSTALL_URL = "https://capsulix.vercel.app/api/auth/install?shop=";

const CSS = `
  :root{--bg:#060d14;--bg-2:#0b1520;--panel:#0e1c2a;--ink:#f0f4f8;--muted:#6a8aaa;--blue:#1e90ff;--navy:#0d4f8a;--orange:#ff7e38;--orange-l:#ffb347;--teal:#00d4aa;--violet:#7b6fff;}
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--bg);color:var(--ink);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;scroll-behavior:smooth}
  .display{font-family:'Anton',sans-serif;letter-spacing:-0.01em;line-height:0.92;text-transform:uppercase}
  .container{max-width:1280px;margin:0 auto;padding:0 24px}
  a{color:inherit;text-decoration:none}
  .smoke-bg{position:absolute;inset:0;pointer-events:none;z-index:0;background:radial-gradient(60% 40% at 20% 30%,rgba(30,144,255,0.15),transparent 60%),radial-gradient(50% 50% at 85% 70%,rgba(255,126,56,0.15),transparent 60%),radial-gradient(40% 30% at 50% 90%,rgba(0,212,170,0.08),transparent 60%);filter:blur(20px)}
  .grain{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0.05;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
  nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(18px);background:rgba(6,13,20,0.7);border-bottom:1px solid rgba(255,255,255,0.06)}
  .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;max-width:1280px;margin:0 auto}
  .logo{font-family:'Anton',sans-serif;font-size:26px;letter-spacing:0.18em;display:flex;align-items:center;gap:8px}
  .logo .dot{width:9px;height:9px;background:var(--orange);border-radius:999px;display:inline-block;box-shadow:0 0 14px var(--orange)}
  .nav-links{display:flex;gap:32px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#8ab0cc}
  .nav-links a{transition:color .2s}
  .nav-links a:hover{color:var(--orange)}
  .nav-right{display:flex;gap:14px;align-items:center}
  .icon-btn{width:38px;height:38px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);display:grid;place-items:center;color:#fff;background:transparent;cursor:pointer;transition:all .2s}
  .icon-btn:hover{background:rgba(255,126,56,0.15);border-color:var(--orange)}
  .hero{position:relative;min-height:88vh;display:flex;align-items:center;overflow:hidden;padding:60px 0}
  .hero-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:center;position:relative;z-index:2}
  .eyebrow{font-family:'Caveat',cursive;color:var(--orange);font-size:30px;font-weight:700;margin-bottom:14px;display:inline-block;transform:rotate(-2deg)}
  h1.hero-title{font-size:clamp(48px,7.6vw,116px);font-weight:400}
  .hero-title .outline{-webkit-text-stroke:1.5px #fff;color:transparent}
  .hero-sub{margin-top:22px;color:#8ab0cc;font-size:16px;max-width:480px;line-height:1.6}
  .cta-row{margin-top:32px;display:flex;gap:14px;flex-wrap:wrap}
  .cta{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,var(--orange),var(--navy));color:#fff;padding:15px 28px;border-radius:999px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;cursor:pointer;border:none;box-shadow:0 12px 40px -8px rgba(255,126,56,0.4);transition:transform .2s;font-family:'Inter',sans-serif}
  .cta:hover{transform:translateY(-2px)}
  .cta-ghost{background:transparent;border:1px solid rgba(255,255,255,0.18);box-shadow:none;color:#fff}
  .cta-ghost:hover{border-color:var(--orange);color:var(--orange)}
  .product-cluster{position:relative;height:580px}
  .bottle{position:absolute;border-radius:22px;overflow:hidden;box-shadow:0 40px 80px -10px rgba(0,0,0,0.7),inset 0 0 0 1px rgba(255,255,255,0.08)}
  .bottle::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 30%,transparent 70%,rgba(0,0,0,0.4) 100%);pointer-events:none}
  .bottle .cap{position:absolute;top:0;left:50%;transform:translateX(-50%);width:62%;height:36px;background:linear-gradient(180deg,#0d1a26,#060d14);border-radius:0 0 8px 8px;border:1px solid rgba(255,255,255,0.06)}
  .bottle .label{position:absolute;left:8%;right:8%;top:32%;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);padding:14px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.12);text-align:center}
  .bottle .label .brand{font-family:'Anton',sans-serif;font-size:12px;letter-spacing:0.3em;color:#fff;opacity:0.9}
  .bottle .label .name{font-family:'Anton',sans-serif;font-size:20px;letter-spacing:0.04em;color:#fff;margin-top:6px;line-height:1}
  .bottle .label .vol{font-size:9px;color:#8ab0cc;letter-spacing:0.2em;margin-top:8px;text-transform:uppercase}
  .bottle .glow{position:absolute;inset:auto -20% -30% -20%;height:60%;filter:blur(40px);opacity:0.6;z-index:-1}
  .b1{width:170px;height:380px;left:6%;top:130px;background:linear-gradient(160deg,#1e90ff,#0d4f8a);transform:rotate(-8deg)}
  .b1 .glow{background:#1e90ff}
  .b2{width:200px;height:440px;left:35%;top:60px;background:linear-gradient(160deg,#ff7e38,#c94d00);transform:rotate(4deg);z-index:2}
  .b2 .glow{background:#ff7e38}
  .b3{width:170px;height:380px;right:8%;top:150px;background:linear-gradient(160deg,#00d4aa,#7b6fff);transform:rotate(10deg)}
  .b3 .glow{background:#00d4aa}
  .float-tag{position:absolute;font-family:'Caveat',cursive;color:#fff;font-size:22px;opacity:0.85;z-index:4}
  .float-arrow{position:absolute;z-index:4;color:var(--orange)}
  section{position:relative;padding:120px 0}
  .section-eyebrow{font-family:'Caveat',cursive;color:var(--orange);font-size:26px;font-weight:700;display:inline-block;transform:rotate(-2deg);margin-bottom:14px}
  h2.section-title{font-size:clamp(36px,5vw,68px);font-weight:400}
  .showcase{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;position:relative;z-index:2}
  .showcase-stage{position:relative;height:480px}
  .pedestal{position:absolute;bottom:0;width:100%;height:80px;background:linear-gradient(180deg,#0e1c2a,transparent);border-radius:50%;filter:blur(10px)}
  .stage-bottle{position:absolute;border-radius:18px;overflow:hidden;box-shadow:0 40px 80px -10px rgba(0,0,0,0.7),inset 0 0 0 1px rgba(255,255,255,0.08)}
  .stage-bottle::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,0.2) 0%,transparent 30%,transparent 70%,rgba(0,0,0,0.4) 100%)}
  .sb1{width:140px;height:300px;left:10%;bottom:50px;background:linear-gradient(160deg,#1e90ff,#0d4f8a)}
  .sb2{width:160px;height:340px;left:38%;bottom:60px;background:linear-gradient(160deg,#ff7e38,#c94d00);z-index:2}
  .sb3{width:140px;height:300px;right:12%;bottom:50px;background:linear-gradient(160deg,#00d4aa,#7b6fff)}
  .two-up{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:40px}
  .card{background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:36px;position:relative;overflow:hidden}
  .card-hero{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center;min-height:280px}
  .card .eyebrow-sm{font-family:'Caveat',cursive;color:var(--orange);font-size:22px;font-weight:700;display:inline-block;transform:rotate(-2deg);margin-bottom:10px}
  .card h3{font-family:'Anton',sans-serif;font-size:28px;letter-spacing:0.02em;line-height:1;text-transform:uppercase;margin-bottom:14px}
  .card p{color:#8ab0cc;font-size:14px;line-height:1.6}
  .card .mini-btn{margin-top:18px;display:inline-flex;align-items:center;gap:8px;background:#fff;color:#060d14;padding:10px 20px;border-radius:999px;font-size:11px;letter-spacing:0.12em;font-weight:600;text-transform:uppercase;cursor:pointer;border:none;transition:transform .2s;font-family:'Inter',sans-serif}
  .card .mini-btn:hover{transform:translateY(-2px)}
  .card-visual{position:relative;height:240px}
  .mini-bottle{position:absolute;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px -10px rgba(0,0,0,0.6),inset 0 0 0 1px rgba(255,255,255,0.08)}
  .mini-bottle::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 30%,transparent 70%,rgba(0,0,0,0.4) 100%)}
  .carousel{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  .product-card{background:linear-gradient(135deg,#0a1a2e,#060d14);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;display:grid;grid-template-columns:1.2fr 1fr;gap:20px;align-items:center;min-height:300px;position:relative;overflow:hidden}
  .product-card.alt{background:linear-gradient(135deg,#1a0e06,#060d14)}
  .product-card .eyebrow-sm{font-family:'Caveat',cursive;color:var(--orange);font-size:20px;font-weight:700;display:inline-block;transform:rotate(-2deg)}
  .product-card h4{font-family:'Anton',sans-serif;font-size:24px;letter-spacing:0.02em;line-height:1.05;text-transform:uppercase;margin:8px 0 12px}
  .product-card p{color:#6a8aaa;font-size:13px;line-height:1.5}
  .price-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px}
  .price{font-family:'Anton',sans-serif;font-size:24px;color:#fff}
  .add-btn{width:42px;height:42px;background:var(--orange);border:none;border-radius:999px;color:#fff;cursor:pointer;display:grid;place-items:center;box-shadow:0 8px 24px -4px rgba(255,126,56,0.5);transition:transform .2s}
  .add-btn:hover{transform:scale(1.08)}
  .product-visual{position:relative;height:220px}
  .arrow-btn{width:44px;height:44px;border-radius:999px;background:#fff;color:#060d14;border:none;display:grid;place-items:center;cursor:pointer;transition:transform .2s}
  .arrow-btn:hover{transform:scale(1.08)}
  .faq-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:60px;align-items:start}
  .faq-q{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;margin-bottom:12px;cursor:pointer;transition:all .2s}
  .faq-q:hover{border-color:var(--orange);background:rgba(255,126,56,0.06)}
  .faq-q .q{font-size:14px;color:#c8dce8;letter-spacing:0.02em}
  .faq-q .plus{width:28px;height:28px;border-radius:999px;background:rgba(255,255,255,0.06);display:grid;place-items:center;color:#fff;font-size:18px;line-height:1;transition:transform .2s;flex-shrink:0}
  .faq-q.open .plus{transform:rotate(45deg);background:var(--orange)}
  .faq-a{padding:0 24px;max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s ease;color:#6a8aaa;font-size:13px;line-height:1.6}
  .faq-q.open + .faq-a{padding:0 24px 20px;max-height:200px}
  .testi-wrap{position:relative;display:grid;grid-template-columns:auto 1fr auto;gap:24px;align-items:center;margin-top:40px}
  .testi-card{background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:40px;text-align:center}
  .testi-avatar{width:64px;height:64px;border-radius:999px;background:linear-gradient(135deg,var(--orange),var(--navy));margin:-72px auto 18px;border:4px solid var(--bg);display:grid;place-items:center;font-family:'Anton',sans-serif;font-size:22px;color:#fff}
  .quote-mark{font-family:'Anton',sans-serif;font-size:40px;color:var(--orange-l);line-height:0.7}
  .testi-body{color:#8ab0cc;font-size:14px;line-height:1.7;margin:14px 0;max-width:520px;margin-left:auto;margin-right:auto}
  .stars{color:var(--orange-l);font-size:18px;letter-spacing:4px;margin:8px 0}
  .testi-name{font-family:'Anton',sans-serif;letter-spacing:0.06em;font-size:16px;color:#fff;margin-top:6px}
  .cta-banner{background:linear-gradient(135deg,#0a1828,#060d14);border:1px solid rgba(255,255,255,0.08);border-radius:30px;padding:60px;display:grid;grid-template-columns:1fr 1.2fr;gap:40px;align-items:center;position:relative;overflow:hidden}
  .cta-banner::before{content:"";position:absolute;top:-50%;left:-20%;width:80%;height:200%;background:radial-gradient(circle,rgba(30,144,255,0.2),transparent 60%);filter:blur(40px)}
  .cta-banner-visual{position:relative;height:280px;z-index:2}
  .cta-banner-content{position:relative;z-index:2}
  .cta-banner-content h2{font-family:'Anton',sans-serif;font-size:clamp(36px,4.5vw,56px);line-height:0.95;text-transform:uppercase;margin:10px 0 16px}
  .cta-banner-content p{color:#8ab0cc;font-size:14px;line-height:1.6;max-width:440px;margin-bottom:24px}
  footer{padding:80px 0 40px;border-top:1px solid rgba(255,255,255,0.06);position:relative;z-index:2}
  .footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:40px}
  .footer-col h5{font-family:'Anton',sans-serif;letter-spacing:0.1em;color:var(--orange);font-size:14px;margin-bottom:18px}
  .footer-col a{display:block;color:#6a8aaa;font-size:13px;margin-bottom:10px;transition:color .2s}
  .footer-col a:hover{color:#fff}
  .footer-about{font-size:13px;color:#6a8aaa;line-height:1.6;margin-top:14px;max-width:280px}
  .news-form{display:flex;gap:0;margin-top:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:999px;padding:4px}
  .news-form input{flex:1;background:transparent;border:none;outline:none;color:#fff;padding:10px 16px;font-size:13px;font-family:'Inter',sans-serif}
  .news-form input::placeholder{color:#3a5a72}
  .news-form button{background:var(--orange);border:none;width:38px;height:38px;border-radius:999px;color:#fff;cursor:pointer;display:grid;place-items:center;transition:transform .2s}
  .news-form button:hover{transform:scale(1.08)}
  .socials{display:flex;gap:10px;margin-top:18px}
  .copyright{text-align:center;margin-top:60px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);color:#3a5a72;font-size:12px;letter-spacing:0.1em}
  .reveal{opacity:0;transform:translateY(30px);transition:opacity .8s ease,transform .8s ease}
  .reveal.in{opacity:1;transform:none}
  .install-row{display:flex;gap:0;max-width:440px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:4px;margin-top:28px}
  .install-row input{flex:1;background:transparent;border:none;outline:none;color:#fff;padding:10px 16px;font-size:13px;font-family:'Inter',sans-serif}
  .install-row input::placeholder{color:#3a5a72}
  @media(max-width:900px){.hero-grid,.showcase,.two-up,.faq-grid,.cta-banner,.carousel,.footer-grid{grid-template-columns:1fr}.nav-links{display:none}.product-cluster{height:440px;margin-top:30px}.b1{left:2%;width:130px;height:280px;top:80px}.b2{left:32%;width:160px;height:340px;top:30px}.b3{right:2%;width:130px;height:280px;top:90px}.card-hero{grid-template-columns:1fr}.product-card{grid-template-columns:1fr}.cta-banner{padding:40px 28px}.testi-wrap{grid-template-columns:1fr}}
`;

export default function Home() {
  const [shopInput, setShopInput] = useState("");
  const [openFaqs, setOpenFaqs] = useState({ 0: true });

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  function install(e) {
    e.preventDefault();
    let s = shopInput.trim();
    if (!s) return;
    if (!s.includes(".myshopify.com")) s += ".myshopify.com";
    window.location.href = INSTALL_URL + s;
  }

  function toggleFaq(i) { setOpenFaqs(prev => ({ ...prev, [i]: !prev[i] })); }

  const faqs = [
    { q: "Do I need supplement industry experience?", a: "None at all. Our formulas are lab-certified and ready to brand. You focus on marketing — we handle manufacturing, compliance, and fulfillment." },
    { q: "How is the pricing free?", a: "We charge wholesale cost per order, funded by your customer's payment. No monthly fees, no stocking fees. We only make money when you make a sale." },
    { q: "Where are the supplements made?", a: "All Capsulix supplements are manufactured in GMP-certified facilities and third-party tested for purity and potency." },
    { q: "Will my customers know it's Capsulix?", a: "Never. Every order ships in your branded packaging. Your logo, your label, your packaging. Capsulix is completely invisible to your customers." },
  ];

  return (
    <>
      <Head>
        <title>CAPSULIX — Fuel Your Brand</title>
        <meta name="description" content="Launch your own private label supplement brand on Shopify. Zero inventory, no manufacturing, no upfront cost." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@500;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>

      <div className="grain"></div>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <div style={{ display:"flex", gap:32, alignItems:"center" }}>
            <div className="nav-links">
              <a href="#home">Home</a>
              <a href="#shop">Products</a>
              <a href="#learn">How it works</a>
              <a href="#faq">FAQs</a>
            </div>
          </div>
          <div className="logo">CAPSULIX<span className="dot"></span></div>
          <div className="nav-right">
            <div className="nav-links" style={{ marginRight:8 }}>
              <a href="/dashboard">Sign in</a>
              <a href="#install">Install App</a>
            </div>
            <button className="icon-btn" aria-label="Account">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="smoke-bg"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="reveal">
              <span className="eyebrow">Fuel loud</span>
              <h1 className="hero-title display">Your brand.<br /><span className="outline">Zero</span><br />inventory.</h1>
              <p className="hero-sub">Capsulix is private label supplements for people ready to build a real health brand. Launch your line — without buying a single capsule upfront.</p>
              <div className="cta-row">
                <a href="#install" className="cta">Start your brand
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
                <a href="#learn" className="cta cta-ghost">See how it works</a>
              </div>
            </div>
            <div className="reveal product-cluster">
              <div className="bottle b1">
                <div className="glow"></div>
                <div className="cap"></div>
                <div className="label">
                  <div className="brand">CAPSULIX</div>
                  <div className="name">Vitality</div>
                  <div className="vol">Capsules · 60ct</div>
                </div>
              </div>
              <div className="bottle b2">
                <div className="glow"></div>
                <div className="cap"></div>
                <div className="label">
                  <div className="brand">CAPSULIX</div>
                  <div className="name">Perform</div>
                  <div className="vol">Powder · 300g</div>
                </div>
              </div>
              <div className="bottle b3">
                <div className="glow"></div>
                <div className="cap"></div>
                <div className="label">
                  <div className="brand">CAPSULIX</div>
                  <div className="name">Radiance</div>
                  <div className="vol">Complex · 60ct</div>
                </div>
              </div>
              <div className="float-tag" style={{ top:"-10px", right:"10%", transform:"rotate(8deg)" }}>new ✦</div>
              <div className="float-arrow" style={{ bottom:"30px", left:"-10px" }}>
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 20 Q25 5 55 20" strokeLinecap="round"/><path d="M50 14 L55 20 L48 25" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="learn">
        <div className="container">
          <div className="showcase">
            <div className="reveal showcase-stage">
              <div className="stage-bottle sb1"><div className="cap" style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"62%", height:28, background:"linear-gradient(180deg,#0d1a26,#060d14)", borderRadius:"0 0 6px 6px" }}></div></div>
              <div className="stage-bottle sb2"><div className="cap" style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"62%", height:32, background:"linear-gradient(180deg,#0d1a26,#060d14)", borderRadius:"0 0 6px 6px" }}></div></div>
              <div className="stage-bottle sb3"><div className="cap" style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"62%", height:28, background:"linear-gradient(180deg,#0d1a26,#060d14)", borderRadius:"0 0 6px 6px" }}></div></div>
              <div className="pedestal"></div>
            </div>
            <div className="reveal">
              <span className="section-eyebrow">Goal-based formulas</span>
              <h2 className="section-title display">Pick a goal.<br />We match the <span style={{ color:"var(--orange)" }}>formula.</span></h2>
              <p className="hero-sub" style={{ marginTop:24 }}>Energy, fitness, immunity, weight support, or hair skin and nails — select your customer's goal and the right formula is assigned automatically. Your brand on every label.</p>
              <div className="cta-row">
                <a href="#install" className="cta">Browse catalogue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="two-up" style={{ marginTop:80 }}>
            <div className="reveal card card-hero">
              <div>
                <span className="eyebrow-sm">5 hero products</span>
                <h3>Pop the cap.<br />Feel the fuel.</h3>
                <p>Capsules, powders, gummies, weight support, and beauty supplements — all formulated for your customers' goals.</p>
                <a href="#install" className="mini-btn">Browse catalogue →</a>
              </div>
              <div className="card-visual">
                <div className="mini-bottle" style={{ width:140, height:230, left:"30%", top:0, background:"linear-gradient(160deg,#1e90ff,#0d4f8a)" }}></div>
              </div>
            </div>
            <div className="reveal card card-hero" style={{ background:"linear-gradient(180deg,rgba(255,126,56,0.06),rgba(255,255,255,0.01))" }}>
              <div>
                <span className="eyebrow-sm">Your brand</span>
                <h3>Your label.<br />Their trust.</h3>
                <p>Upload your logo, choose your colours. Every capsule ships under your brand. Capsulix is invisible — you get all the credit.</p>
                <a href="#install" className="mini-btn">Start branding →</a>
              </div>
              <div className="card-visual">
                <div className="mini-bottle" style={{ width:120, height:200, left:"15%", top:20, background:"linear-gradient(160deg,#ff7e38,#c94d00)" }}></div>
                <div className="mini-bottle" style={{ width:120, height:200, right:"5%", top:0, background:"linear-gradient(160deg,#00d4aa,#7b6fff)" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="shop">
        <div className="container">
          <div style={{ marginBottom:40 }} className="reveal">
            <span className="section-eyebrow">The catalogue</span>
            <h2 className="section-title display">Find your<br />formula.</h2>
          </div>
          <div className="carousel">
            {[
              { tag:"Bestseller", name:"Vitality\nCapsules", desc:"Daily wellness capsules formulated for energy, immunity or hair & nails. 60 capsules, 30 servings.", price:"$39.99", bg:"linear-gradient(160deg,#1e90ff,#0d4f8a)", alt:false },
              { tag:"New drop", name:"Performance\nPowder", desc:"Pre or post workout powder for fitness, energy or weight support. 300g, 30 servings. Zero fillers.", price:"$59.99", bg:"linear-gradient(160deg,#ff7e38,#c94d00)", alt:true },
            ].map((p,i) => (
              <div key={i} className={`reveal product-card${p.alt?" alt":""}`}>
                <div>
                  <span className="eyebrow-sm">{p.tag}</span>
                  <h4>{p.name.split("\n").map((l,j) => <span key={j}>{l}{j===0&&<br />}</span>)}</h4>
                  <p>{p.desc}</p>
                  <div className="price-row">
                    <span className="price">{p.price}</span>
                    <a href="#install"><button className="add-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </button></a>
                  </div>
                </div>
                <div className="product-visual">
                  <div className="mini-bottle" style={{ width:130, height:220, left:"30%", top:0, background:p.bg }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container">
          <div className="faq-grid">
            <div className="reveal">
              <span className="section-eyebrow">Got questions?</span>
              <h2 className="section-title display">Got<br />questions?<br />We've got<br />answers.</h2>
              <a href="#install" className="cta" style={{ marginTop:24, display:"inline-flex" }}>Install free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div className="reveal">
              {faqs.map((f, i) => (
                <div key={i}>
                  <div className={`faq-q${openFaqs[i] ? " open" : ""}`} onClick={() => toggleFaq(i)}>
                    <span className="q">{f.q}</span>
                    <span className="plus">+</span>
                  </div>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section>
        <div className="container">
          <div style={{ textAlign:"center" }} className="reveal">
            <span className="section-eyebrow">Fuel loud</span>
            <h2 className="section-title display">What our<br />founders say</h2>
          </div>
          <div className="testi-wrap reveal">
            <button className="arrow-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
            <div className="testi-card">
              <div className="testi-avatar">J</div>
              <div className="quote-mark">❝</div>
              <p className="testi-body">I launched my protein brand in one afternoon. First sale came within a week. Capsulix handles everything — I just market and earn the margin.</p>
              <div className="stars">★ ★ ★ ★ ★</div>
              <div className="testi-name">JAMES O. — FITFUEL SUPPLEMENTS</div>
            </div>
            <button className="arrow-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg></button>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="install">
        <div className="container">
          <div className="cta-banner reveal">
            <div className="cta-banner-visual">
              <div className="mini-bottle" style={{ width:150, height:260, left:"5%", top:10, background:"linear-gradient(160deg,#1e90ff,#0d4f8a)", transform:"rotate(-8deg)" }}></div>
              <div className="mini-bottle" style={{ width:140, height:240, left:"38%", top:30, background:"linear-gradient(160deg,#ff7e38,#c94d00)", transform:"rotate(6deg)" }}></div>
            </div>
            <div className="cta-banner-content">
              <span className="section-eyebrow">Launch today</span>
              <h2>Your brand.<br />Your formula.<br />Zero stock.</h2>
              <p>Install Capsulix on your Shopify store and launch your private label supplement brand in minutes. No inventory, no upfront cost.</p>
              <form onSubmit={install} className="install-row">
                <input value={shopInput} onChange={e => setShopInput(e.target.value)} placeholder="yourstore.myshopify.com" />
                <button type="submit" className="cta" style={{ padding:"10px 20px", fontSize:11 }}>Install Free →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo">CAPSULIX<span className="dot"></span></div>
              <p className="footer-about">Private label supplements for health entrepreneurs. Launch your brand with zero inventory, zero upfront cost.</p>
            </div>
            <div className="footer-col">
              <h5>Quick Links</h5>
              <a href="#home">Home</a>
              <a href="#shop">Products</a>
              <a href="#learn">How it works</a>
              <a href="#faq">FAQs</a>
            </div>
            <div className="footer-col">
              <h5>Account</h5>
              <a href="/dashboard">Dashboard</a>
              <a href="/catalogue">Catalogue</a>
              <a href="/branding">Branding</a>
              <a href="/help">Help Center</a>
            </div>
            <div className="footer-col">
              <h5>Stay Updated</h5>
              <p style={{ color:"#6a8aaa", fontSize:13 }}>Sign up for our newsletter</p>
              <form className="news-form" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Enter email address" />
                <button type="submit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg></button>
              </form>
              <div className="socials">
                <button className="icon-btn" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></button>
                <button className="icon-btn" aria-label="TikTok"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.04z"/></svg></button>
              </div>
            </div>
          </div>
          <div className="copyright">© 2026 CAPSULIX · All rights reserved</div>
        </div>
      </footer>
    </>
  );
}