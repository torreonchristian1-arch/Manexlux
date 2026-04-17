import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import SideNav from "../components/SideNav";
import { PageHeader, Toast } from "../components/Layout";
import { useTheme } from "./_app";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// ── 5 Hero Hair Products ───────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Straight Lace Front Wig",
    type: "Lace Front Wig",
    tagline: "The sleek classic that never goes out of style",
    desc: "A silky straight lace front wig with a natural hairline. Pre-plucked, baby hairs included. Lightweight cap construction for all-day comfort.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    wholesale: 54.99,
    suggestedRetail: 129.99,
    spec: "13x4 Lace Front · HD Lace · 150% Density",
    icon: "✨",
    lengths: ["12 inch", "16 inch", "20 inch", "24 inch"],
    lines: ["beginner", "luxury", "everyday", "essentials"],
    customOptions: {
      beginner: { style: "Pre-styled & Ready to Wear", benefit: "No glue, no skills needed — put it on and go", tag: "Beginner Friendly" },
      luxury: { style: "HD Lace + Premium Virgin Hair", benefit: "Undetectable hairline, premium raw texture", tag: "Luxury Grade" },
      everyday: { style: "Lightweight Comfort Cap", benefit: "Breathable, secure fit for daily wear", tag: "Everyday Wear" },
      essentials: { style: "Classic Straight Bundle", benefit: "Your brand's essential starter wig", tag: "Ready to Sell" },
    }
  },
  {
    id: 2,
    name: "Body Wave Wig",
    type: "Lace Front Wig",
    tagline: "Effortless waves that turn heads everywhere",
    desc: "Loose, glamorous body waves with incredible movement. The most popular texture for a reason — versatile, beautiful, and universally flattering.",
    img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80",
    wholesale: 59.99,
    suggestedRetail: 139.99,
    spec: "13x4 Lace Front · HD Lace · 150% Density",
    icon: "🌊",
    lengths: ["14 inch", "18 inch", "22 inch", "26 inch"],
    lines: ["luxury", "everyday", "premium", "essentials"],
    customOptions: {
      luxury: { style: "Raw Virgin Body Wave + HD Lace", benefit: "Unmatched softness, longevity and shine", tag: "Luxury Grade" },
      everyday: { style: "Natural Wave Pattern, Low Maintenance", benefit: "Wash and go — waves stay defined all day", tag: "Everyday Wear" },
      premium: { style: "Double Drawn + Tangle-Free Formula", benefit: "Fuller from root to tip with zero shedding", tag: "Premium Texture" },
      essentials: { style: "Best-Selling Wave Pattern", benefit: "The wave style your customers always ask for", tag: "Ready to Sell" },
    }
  },
  {
    id: 3,
    name: "Curly Afro Wig",
    type: "Full Lace Wig",
    tagline: "Bold, beautiful curls that celebrate texture",
    desc: "A full lace wig featuring tight, natural curls with incredible volume and bounce. Perfect for customers who love texture and want to celebrate their natural hair.",
    img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80",
    wholesale: 64.99,
    suggestedRetail: 149.99,
    spec: "Full Lace · HD Lace · 180% Density",
    icon: "🌀",
    lengths: ["10 inch", "14 inch", "18 inch"],
    lines: ["luxury", "premium", "everyday"],
    customOptions: {
      luxury: { style: "Kinky Curly Virgin Hair + Full Lace Cap", benefit: "Maximum versatility — part anywhere, style freely", tag: "Luxury Grade" },
      premium: { style: "Double Drawn Curls, Maximum Volume", benefit: "Extra thick from root to tip, no thinning ends", tag: "Premium Texture" },
      everyday: { style: "Defined Curl Pattern, Frizz-Resistant", benefit: "Holds curl definition all day without product", tag: "Everyday Wear" },
    }
  },
  {
    id: 4,
    name: "Bob Cut Wig",
    type: "Lace Front Wig",
    tagline: "The power cut that never stops trending",
    desc: "A chic bob wig available in straight and slight wave variations. Pre-cut to perfection — no stylist needed. The statement piece every hair brand needs.",
    img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&q=80",
    wholesale: 44.99,
    suggestedRetail: 109.99,
    spec: "13x4 Lace Front · HD Lace · 130% Density",
    icon: "✂️",
    lengths: ["8 inch", "10 inch", "12 inch", "14 inch"],
    lines: ["beginner", "everyday", "luxury", "essentials"],
    customOptions: {
      beginner: { style: "Pre-Cut, Pre-Styled, Wear & Go", benefit: "The easiest wig to launch with — no styling needed", tag: "Beginner Friendly" },
      everyday: { style: "Lightweight Short Cap Construction", benefit: "Cool, comfortable and easy to maintain daily", tag: "Everyday Wear" },
      luxury: { style: "Precision Cut + Blunt Ends", benefit: "Salon-perfect finish straight out of the box", tag: "Luxury Grade" },
      essentials: { style: "Timeless Bob, Every Brand Needs One", benefit: "High demand, fast moving — perfect starter product", tag: "Ready to Sell" },
    }
  },
  {
    id: 5,
    name: "Deep Wave Frontal Wig",
    type: "Lace Front Wig",
    tagline: "Deep, defined waves with supermodel energy",
    desc: "Rich, deep wave texture with dramatic movement and volume. A statement piece that photographs beautifully and performs for every occasion.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    wholesale: 62.99,
    suggestedRetail: 144.99,
    spec: "13x6 Lace Frontal · HD Lace · 150% Density",
    icon: "💫",
    lengths: ["14 inch", "18 inch", "22 inch", "26 inch", "30 inch"],
    lines: ["luxury", "premium", "everyday", "essentials"],
    customOptions: {
      luxury: { style: "Raw Deep Wave + 13x6 Wide Lace Part", benefit: "Red-carpet ready — the most dramatic wave pattern", tag: "Luxury Grade" },
      premium: { style: "Double Drawn Deep Wave, Maximum Depth", benefit: "Deep wave pattern stays defined wash after wash", tag: "Premium Texture" },
      everyday: { style: "Natural Deep Wave, Easy Maintenance", benefit: "Beautiful waves without the high-maintenance routine", tag: "Everyday Wear" },
      essentials: { style: "Best-Selling Deep Wave Style", benefit: "Consistent bestseller — customers always reorder", tag: "Ready to Sell" },
    }
  },
];

const LINES = [
  { id: "all", label: "All Products", icon: "✦", desc: "Browse all 5 hero products" },
  { id: "beginner", label: "Beginner-Friendly", icon: "🌱", desc: "Wear & go — no skills needed" },
  { id: "luxury", label: "Luxury Line", icon: "👑", desc: "Raw virgin hair, HD lace" },
  { id: "everyday", label: "Everyday Line", icon: "☀️", desc: "Easy wear, low maintenance" },
  { id: "premium", label: "Premium Texture", icon: "💎", desc: "Double drawn, maximum volume" },
  { id: "essentials", label: "Ready-to-Sell", icon: "🚀", desc: "Bestsellers, fast moving" },
];

export default function Catalogue() {
  const router = useRouter();
  const { shop } = router.query;
  const { theme: T } = useTheme();
  const [open, setOpen] = useState(true);
  const [line, setLine] = useState("all");
  const [selected, setSelected] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);
  const [published, setPublished] = useState({});
  const [publishing, setPublishing] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!shop) return;
    supabase.from("published_products").select("cucuma_product_id, shopify_product_id").eq("shop_domain", shop)
      .then(({ data }) => {
        if (data) {
          const map = {};
          data.forEach(p => { map[p.cucuma_product_id] = `https://${shop}/admin/products/${p.shopify_product_id}`; });
          setPublished(map);
        }
      });
  }, [shop]);

  const filtered = line === "all" ? PRODUCTS : PRODUCTS.filter(p => p.lines.includes(line));

  function getCustom(product) {
    const l = product.lines.includes(line) ? line : product.lines[0];
    return { line: l, data: product.customOptions[l] };
  }

  function profitCalc(p) {
    const margin = Math.round(((p.suggestedRetail - p.wholesale) / p.suggestedRetail) * 100);
    return { margin, profit: (p.suggestedRetail - p.wholesale).toFixed(2) };
  }

  async function handlePublish(product) {
    if (!shop) { setToast({ msg: "No store connected.", type: "error" }); return; }
    if (published[product.id] || publishing === product.id) return;
    if (!selectedLength) { setToast({ msg: "Please select a length first.", type: "error" }); return; }
    const { line: activeLine, data: custom } = getCustom(product);
    const lineLabel = LINES.find(l => l.id === activeLine)?.label || activeLine;
    setPublishing(product.id);
    try {
      const res = await fetch("/api/products/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shop,
          product: {
            id: product.id,
            name: `${product.name} — ${selectedLength}`,
            desc: `${product.desc}\n\n${lineLabel}: ${custom?.benefit || product.tagline}.\nStyle: ${custom?.style || "Premium quality"}.\nSpec: ${product.spec}.\nLength: ${selectedLength}.`,
            price: String(product.wholesale),
            category: product.type,
            moq: 10,
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setPublished(prev => ({ ...prev, [product.id]: data.shopifyProductUrl || "#" }));
        setToast({ msg: `${product.name} published to your store!`, type: "success" });
        setSelected(null);
      } else setToast({ msg: data.error || "Failed to publish.", type: "error" });
    } catch { setToast({ msg: "Network error. Please try again.", type: "error" }); }
    setPublishing(null);
  }

  return (
    <div style={{ display:"flex", height:"100vh", background:T.bgBase, overflow:"hidden" }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes toastIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        .line-btn{cursor:pointer;border-radius:12px;padding:12px 10px;transition:all 0.2s;border:1px solid;font-family:'DM Sans',sans-serif;background:none;text-align:center;width:100%;}
        .line-btn:hover{transform:translateY(-2px);}
        .pcard{transition:all 0.22s;border-radius:16px;overflow:hidden;cursor:pointer;}
        .pcard:hover{transform:translateY(-4px);box-shadow:${T.shadowMd};}
        .pcard:hover .pimg img{transform:scale(1.05);}
        .pimg img{transition:transform 0.4s;}
        .len-btn{padding:7px 12px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;border:1px solid;font-family:'DM Sans',sans-serif;background:none;}
        .len-btn.sel{background:${T.goldSubtle};border-color:${T.goldBorder};color:${T.gold};}
        .len-btn:not(.sel){background:${T.bgSurface};border-color:${T.borderSubtle};color:${T.textSecondary};}
        .len-btn:hover:not(.sel){background:${T.bgElevated};}
        .pub-btn{width:100%;padding:13px;font-size:14px;font-weight:700;border-radius:10px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'DM Sans',sans-serif;border:none;}
        .pub-btn:hover:not(:disabled){filter:brightness(1.08);transform:translateY(-1px);}
        .pub-btn:disabled{opacity:0.7;cursor:default;}
        .modal-bg{position:fixed;inset:0;background:rgba(13,10,14,0.7);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;}
        .modal{background:${T.bgCard};border-radius:20px;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,0.5);animation:slideUp 0.25s ease;}
        @media(max-width:1100px){.pgrid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){.mpad{padding:16px!important;}.lines-row{grid-template-columns:repeat(3,1fr)!important;}.pgrid{grid-template-columns:1fr 1fr!important;}.hide-mobile{display:none!important;}}
        @media(max-width:480px){.lines-row{grid-template-columns:repeat(2,1fr)!important;}.pgrid{grid-template-columns:1fr!important;}}
      `}</style>

      {toast && <div style={{ position:"fixed", bottom:20, right:20, zIndex:1000, background:T.bgCard, border:`1px solid ${toast.type==="success"?T.goldBorder:T.orangeBorder}`, borderRadius:10, padding:"13px 16px", maxWidth:320, boxShadow:T.shadowMd, display:"flex", alignItems:"center", gap:10, animation:"toastIn 0.25s ease" }}><div style={{ width:7, height:7, borderRadius:"50%", background:toast.type==="success"?T.gold:T.orange, flexShrink:0 }}></div><span style={{ fontSize:13, color:T.textPrimary, fontWeight:500 }}>{toast.msg}</span><button onClick={()=>setToast(null)} style={{ background:"none", border:"none", cursor:"pointer", color:T.textTertiary, fontSize:18, marginLeft:"auto" }}>×</button></div>}

      {/* Product Modal */}
      {selected && (
        <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget){setSelected(null);setSelectedLength(null);}}}>
          <div className="modal">
            <div style={{ height:240, overflow:"hidden", position:"relative", background:T.bgElevated }}>
              <img src={selected.img} alt={selected.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <button onClick={()=>{setSelected(null);setSelectedLength(null);}} style={{ position:"absolute", top:14, right:14, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)", border:"none", borderRadius:"50%", width:34, height:34, cursor:"pointer", color:"white", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              {published[selected.id] && <div style={{ position:"absolute", top:14, left:14, background:"rgba(201,168,76,0.92)", color:"#0D0A0E", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:100 }}>✓ Live in Your Store</div>}
            </div>

            <div style={{ padding:"24px 26px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                <div>
                  <div style={{ fontSize:10, fontWeight:700, color:T.gold, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>{selected.type}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:T.textPrimary }}>{selected.name}</div>
                  <div style={{ fontSize:13, color:T.textSecondary, marginTop:3 }}>{selected.tagline}</div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:12 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:T.textPrimary }}>${selected.wholesale}</div>
                  <div style={{ fontSize:10, color:T.textTertiary }}>wholesale / unit</div>
                </div>
              </div>

              {/* Spec badge */}
              <div style={{ background:T.bgSurface, border:`1px solid ${T.borderSubtle}`, borderRadius:8, padding:"6px 12px", marginBottom:16, display:"inline-block" }}>
                <span style={{ fontSize:11, fontWeight:600, color:T.textSecondary }}>📋 {selected.spec}</span>
              </div>

              {/* Line selector */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.textTertiary, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Brand Line</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {selected.lines.map(l => {
                    const ld = LINES.find(x => x.id === l);
                    const isSel = line === l || (line === "all" && l === selected.lines[0]);
                    return (
                      <button key={l} onClick={() => setLine(l)}
                        style={{ padding:"6px 14px", borderRadius:100, fontSize:12, fontWeight:600, cursor:"pointer", border:`1px solid ${isSel?T.goldBorder:T.borderSubtle}`, background:isSel?T.goldSubtle:"transparent", color:isSel?T.gold:T.textSecondary, fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}>
                        {ld?.icon} {ld?.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Line details */}
              {(() => {
                const al = selected.lines.includes(line) ? line : selected.lines[0];
                const custom = selected.customOptions[al];
                const ld = LINES.find(x => x.id === al);
                return custom ? (
                  <div style={{ background:T.goldSubtle, border:`1px solid ${T.goldBorder}`, borderRadius:10, padding:"14px", marginBottom:16 }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:9, background:T.bgCard, border:`1px solid ${T.goldBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{ld?.icon}</div>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                          <div style={{ fontSize:11, fontWeight:700, color:T.gold }}>{ld?.label}</div>
                          <div style={{ background:T.bgCard, border:`1px solid ${T.goldBorder}`, borderRadius:100, padding:"2px 8px", fontSize:9, fontWeight:700, color:T.gold }}>{custom.tag}</div>
                        </div>
                        <div style={{ fontSize:13, color:T.textPrimary, fontWeight:600, marginBottom:2 }}>{custom.style}</div>
                        <div style={{ fontSize:12, color:T.textSecondary }}>{custom.benefit}</div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Length selector */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.textTertiary, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>
                  Select Length {selectedLength && <span style={{ color:T.textPrimary, fontWeight:600, letterSpacing:0, textTransform:"none" }}>· {selectedLength}</span>}
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {selected.lengths.map(len => (
                    <button key={len} className={`len-btn${selectedLength===len?" sel":""}`} onClick={() => setSelectedLength(len)}>{len}</button>
                  ))}
                </div>
                {!selectedLength && <div style={{ fontSize:11, color:T.orange, marginTop:6 }}>⚠️ Length required before publishing</div>}
              </div>

              <p style={{ fontSize:13, color:T.textSecondary, lineHeight:1.75, marginBottom:18 }}>{selected.desc}</p>

              {/* Profit */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:18 }}>
                {[
                  { l:"Your Cost", v:`$${selected.wholesale}`, s:"per unit", c:T.textSecondary },
                  { l:"Suggested Retail", v:`$${selected.suggestedRetail}`, s:"you set the price", c:T.textPrimary },
                  { l:"Est. Profit", v:`$${profitCalc(selected).profit}`, s:`${profitCalc(selected).margin}% margin`, c:T.gold },
                ].map(i => (
                  <div key={i.l} style={{ background:T.bgBase, border:`1px solid ${T.borderSubtle}`, borderRadius:10, padding:"11px", textAlign:"center" }}>
                    <div style={{ fontSize:9, fontWeight:700, color:T.textTertiary, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{i.l}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:700, color:i.c }}>{i.v}</div>
                    <div style={{ fontSize:10, color:T.textTertiary, marginTop:1 }}>{i.s}</div>
                  </div>
                ))}
              </div>

              {published[selected.id] ? (
                <div style={{ display:"flex", gap:8 }}>
                  <div style={{ flex:1, background:T.goldSubtle, border:`1px solid ${T.goldBorder}`, borderRadius:10, padding:"12px", textAlign:"center", fontSize:14, fontWeight:700, color:T.gold }}>✓ Published to Store</div>
                  <a href={published[selected.id]!=="#"?published[selected.id]:undefined} target="_blank" rel="noreferrer" style={{ background:T.bgSurface, border:`1px solid ${T.borderDefault}`, borderRadius:10, padding:"12px 16px", fontSize:13, fontWeight:600, color:T.textSecondary, cursor:"pointer" }}>View →</a>
                </div>
              ) : (
                <button className="pub-btn" onClick={() => handlePublish(selected)} disabled={publishing===selected.id||!selectedLength}
                  style={{ background:!selectedLength?T.bgSurface:T.gold, color:!selectedLength?T.textTertiary:"#0D0A0E" }}>
                  {publishing===selected.id
                    ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0D0A0E", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }}></span>Publishing...</>
                    : !selectedLength ? "Select a length to continue"
                    : `Publish ${selected.name} to Your Store →`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <SideNav active="catalogue" shop={shop} open={open} />
      <main style={{ flex:1, overflow:"auto" }}>
        <PageHeader
          title="Product Catalogue"
          subtitle="5 hero wigs · curated lines for every hair brand"
          onMenuToggle={() => setOpen(!open)}
          actions={
            <div style={{ display:"flex", alignItems:"center", gap:8, background:T.goldSubtle, border:`1px solid ${T.goldBorder}`, borderRadius:8, padding:"6px 14px" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:T.gold }}></div>
              <span style={{ fontSize:12, fontWeight:700, color:T.gold }}>{Object.keys(published).length} / {PRODUCTS.length} Published</span>
            </div>
          }
        />

        <div className="mpad" style={{ padding:"20px 24px" }}>
          {/* Line filters */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textTertiary, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Choose Your Brand Line</div>
            <div className="lines-row" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8 }}>
              {LINES.map(l => (
                <button key={l.id} className="line-btn" onClick={() => setLine(l.id)}
                  style={{ background:line===l.id?T.goldSubtle:T.bgCard, borderColor:line===l.id?T.goldBorder:T.borderSubtle, boxShadow:line===l.id?`0 4px 16px ${T.gold}20`:T.shadow }}>
                  <div style={{ fontSize:22, marginBottom:5 }}>{l.icon}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:line===l.id?T.gold:T.textPrimary, marginBottom:2 }}>{l.label}</div>
                  <div style={{ fontSize:10, color:T.textTertiary, lineHeight:1.4 }}>{l.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:600, color:T.textPrimary }}>
              {line==="all"?"All Hair Products":`${LINES.find(l=>l.id===line)?.label} Products`}
              <span style={{ fontSize:12, color:T.textTertiary, fontWeight:400, marginLeft:6 }}>({filtered.length} products)</span>
            </div>
            {line !== "all" && (
              <div style={{ fontSize:12, color:T.textSecondary, background:T.bgCard, border:`1px solid ${T.borderSubtle}`, borderRadius:8, padding:"5px 12px" }}>
                Showing <strong style={{ color:T.gold }}>{LINES.find(l=>l.id===line)?.label}</strong> configuration
              </div>
            )}
          </div>

          {/* Products */}
          <div className="pgrid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
            {filtered.map(product => {
              const isPub = published[product.id];
              const { line: al, data: custom } = getCustom(product);
              const { margin } = profitCalc(product);
              const ld = LINES.find(l => l.id === al);

              return (
                <div key={product.id} className="pcard" onClick={() => { setSelected(product); setSelectedLength(null); }}
                  style={{ background:T.bgCard, border:`1px solid ${isPub?T.goldBorder:T.borderSubtle}`, boxShadow:T.shadow }}>

                  <div className="pimg" style={{ aspectRatio:"3/4", overflow:"hidden", position:"relative", background:T.bgElevated }}>
                    <img src={product.img} alt={product.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <div style={{ position:"absolute", top:8, left:8, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)", color:"white", fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:100 }}>{product.type.toUpperCase()}</div>
                    {isPub && (
                      <div style={{ position:"absolute", inset:0, background:"rgba(201,168,76,0.85)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <div style={{ width:34, height:34, borderRadius:"50%", background:"white", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontSize:10, fontWeight:700, color:"#0D0A0E" }}>Live in Store</span>
                      </div>
                    )}
                    {line !== "all" && custom && (
                      <div style={{ position:"absolute", bottom:8, right:8, background:T.goldSubtle, border:`1px solid ${T.goldBorder}`, borderRadius:100, padding:"2px 8px", fontSize:9, fontWeight:700, color:T.gold }}>{custom.tag}</div>
                    )}
                  </div>

                  <div style={{ padding:"12px 14px" }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:700, color:T.textPrimary, marginBottom:2 }}>{product.name}</div>
                    <div style={{ fontSize:10, color:T.textTertiary, marginBottom:8 }}>{product.spec}</div>

                    {line !== "all" && custom && (
                      <div style={{ background:T.goldSubtle, border:`1px solid ${T.goldBorder}`, borderRadius:6, padding:"5px 8px", marginBottom:8 }}>
                        <div style={{ fontSize:9, fontWeight:700, color:T.gold }}>{ld?.icon} {ld?.label}</div>
                        <div style={{ fontSize:10, color:T.textPrimary, fontWeight:500, lineHeight:1.4 }}>{custom.style}</div>
                      </div>
                    )}

                    {/* Lengths preview */}
                    <div style={{ display:"flex", gap:4, marginBottom:8, flexWrap:"wrap" }}>
                      {product.lengths.slice(0,3).map(l => (
                        <span key={l} style={{ fontSize:9, fontWeight:600, color:T.textTertiary, background:T.bgSurface, border:`1px solid ${T.borderSubtle}`, borderRadius:4, padding:"2px 6px" }}>{l}</span>
                      ))}
                      {product.lengths.length > 3 && <span style={{ fontSize:9, color:T.textTertiary }}>+{product.lengths.length - 3} more</span>}
                    </div>

                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:700, color:T.textPrimary }}>${product.wholesale}</div>
                        <div style={{ fontSize:9, color:T.textTertiary }}>wholesale</div>
                      </div>
                      <div style={{ background:T.goldSubtle, border:`1px solid ${T.goldBorder}`, borderRadius:100, padding:"2px 8px", fontSize:10, fontWeight:700, color:T.gold }}>{margin}% margin</div>
                    </div>

                    <div style={{ width:"100%", padding:"8px", fontSize:11, fontWeight:600, borderRadius:7, textAlign:"center", background:isPub?T.goldSubtle:"transparent", border:`1px solid ${isPub?T.goldBorder:T.borderDefault}`, color:isPub?T.gold:T.textSecondary }}>
                      {isPub ? "Published ✓" : "Customise & Publish →"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 24px", background:T.bgCard, border:`1px solid ${T.borderSubtle}`, borderRadius:14, marginTop:8 }}>
              <div style={{ fontSize:32, marginBottom:12 }}>👑</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:T.textPrimary, marginBottom:8 }}>No products in this line</div>
              <p style={{ fontSize:13, color:T.textTertiary }}>Try a different line or browse all products.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}