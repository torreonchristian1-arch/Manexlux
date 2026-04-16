import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import SideNav from "../components/SideNav";
import { PageHeader, Toast, EmptyState } from "../components/Layout";
import { useTheme } from "./_app";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const CATALOGUE = {
  All: [],
  Bundles: [
    { id: 1, name: "Brazilian Body Wave Bundle", desc: "100% virgin Brazilian body wave hair", price: "34.99", moq: 10, badge: "Bestseller", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" },
    { id: 2, name: "Peruvian Straight Bundle", desc: "Silky straight Peruvian virgin hair", price: "32.99", moq: 10, badge: "Popular", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&q=80" },
    { id: 3, name: "Malaysian Curly Bundle", desc: "Natural curly Malaysian hair bundle", price: "36.99", moq: 10, badge: null, img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80" },
    { id: 4, name: "Indian Wavy Bundle", desc: "Luxurious wavy Indian virgin hair", price: "33.99", moq: 10, badge: "New", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80" },
  ],
  Wigs: [
    { id: 5, name: "Lace Front Straight Wig", desc: "13x4 lace front, natural hairline", price: "79.99", moq: 5, badge: "Bestseller", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80" },
    { id: 6, name: "Full Lace Curly Wig", desc: "360 full lace, curly virgin hair", price: "99.99", moq: 5, badge: null, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" },
    { id: 7, name: "Bob Cut Lace Wig", desc: "Trendy bob cut with lace closure", price: "69.99", moq: 5, badge: "New", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&q=80" },
  ],
  "Clip-Ins": [
    { id: 8, name: "Straight Clip-In Set", desc: "7-piece clip-in extension set", price: "44.99", moq: 15, badge: "Bestseller", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80" },
    { id: 9, name: "Wavy Clip-In Set", desc: "Beachy wave clip-in extensions", price: "46.99", moq: 15, badge: null, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" },
    { id: 10, name: "Curly Clip-In Set", desc: "Natural curl pattern clip-ins", price: "48.99", moq: 15, badge: "Popular", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80" },
  ],
  "Tape-In": [
    { id: 11, name: "Seamless Tape-In Extensions", desc: "Invisible tape-in, 20 pieces", price: "49.99", moq: 10, badge: "Popular", img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&q=80" },
    { id: 12, name: "Balayage Tape-In Set", desc: "Ombre balayage tape-in extensions", price: "54.99", moq: 10, badge: "New", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80" },
  ],
  Frontals: [
    { id: 13, name: "13x4 Lace Frontal Straight", desc: "HD lace frontal closure piece", price: "59.99", moq: 8, badge: null, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" },
    { id: 14, name: "13x6 Deep Wave Frontal", desc: "Wide part deep wave frontal", price: "64.99", moq: 8, badge: "Bestseller", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80" },
  ],
  Ponytail: [
    { id: 15, name: "Straight Drawstring Ponytail", desc: "Sleek straight ponytail extension", price: "29.99", moq: 20, badge: null, img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&q=80" },
    { id: 16, name: "Curly Wrap Ponytail", desc: "Voluminous curly wrap ponytail", price: "32.99", moq: 20, badge: "New", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80" },
  ],
};
CATALOGUE.All = [...CATALOGUE.Bundles, ...CATALOGUE.Wigs, ...CATALOGUE["Clip-Ins"], ...CATALOGUE["Tape-In"], ...CATALOGUE.Frontals, ...CATALOGUE.Ponytail];
const CATS = ["All", "Bundles", "Wigs", "Clip-Ins", "Tape-In", "Frontals", "Ponytail"];

export default function Catalogue() {
  const router = useRouter();
  const { shop } = router.query;
  const { theme: T } = useTheme();
  const [open, setOpen] = useState(true);
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
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

  const products = CATALOGUE[cat].filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));

  async function handlePublish(product) {
    if (!shop) { setToast({ msg: "No store connected.", type: "error" }); return; }
    if (published[product.id] || publishing === product.id) return;
    setPublishing(product.id);
    try {
      const category = CATS.find(c => c !== "All" && CATALOGUE[c] && CATALOGUE[c].some(p => p.id === product.id)) || "Bundles";
      const res = await fetch("/api/products/publish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ shop, product: { ...product, category } }) });
      const data = await res.json();
      if (data.success) { setPublished(prev => ({ ...prev, [product.id]: data.shopifyProductUrl || "#" })); setToast({ msg: `${product.name} published!`, type: "success" }); }
      else setToast({ msg: data.error || "Failed to publish.", type: "error" });
    } catch { setToast({ msg: "Network error.", type: "error" }); }
    setPublishing(null);
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bgBase, overflow: "hidden" }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes toastIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        .pcard{transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s;}
        .pcard:hover{transform:translateY(-3px);box-shadow:${T.shadowMd};border-color:${T.goldBorder}!important;}
        .pcard:hover .pimg img{transform:scale(1.05);}
        .pimg img{transition:transform 0.35s;}
        .tab-btn{cursor:pointer;padding:6px 16px;border-radius:100px;font-size:13px;font-weight:500;transition:all 0.15s;white-space:nowrap;border:1px solid;font-family:'DM Sans',sans-serif;background:none;}
        .pub-btn{width:100%;padding:9px;font-size:13px;font-weight:600;border-radius:7px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px;font-family:'DM Sans',sans-serif;border:1px solid;}
        input{outline:none;}
        @media(max-width:1024px){.pgrid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){.mpad{padding:16px!important;}.pgrid{grid-template-columns:1fr 1fr!important;}.hide-mobile{display:none!important;}}
        @media(max-width:480px){.pgrid{grid-template-columns:1fr!important;}}
      `}</style>

      {toast && <div style={{ position:"fixed", bottom:20, right:20, zIndex:1000, background:T.bgCard, border:`1px solid ${toast.type==="success"?T.goldBorder:T.orangeBorder}`, borderRadius:10, padding:"13px 16px", maxWidth:320, boxShadow:T.shadowMd, display:"flex", alignItems:"center", gap:10, animation:"toastIn 0.25s ease" }}><div style={{ width:7, height:7, borderRadius:"50%", background:toast.type==="success"?T.gold:T.orange, flexShrink:0 }}></div><span style={{ fontSize:13, color:T.textPrimary, fontWeight:500 }}>{toast.msg}</span><button onClick={() => setToast(null)} style={{ background:"none", border:"none", cursor:"pointer", color:T.textTertiary, fontSize:18, marginLeft:"auto" }}>×</button></div>}

      <SideNav active="catalogue" shop={shop} open={open} />
      <main style={{ flex:1, overflow:"auto" }}>
        <PageHeader title="Product Catalogue" subtitle="Publish private label hair products to your Shopify store"
          onMenuToggle={() => setOpen(!open)}
          actions={
            <>
              <div style={{ position:"relative" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.textTertiary} strokeWidth="2" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ background:T.bgSurface, border:`1px solid ${T.borderSubtle}`, borderRadius:8, padding:"7px 12px 7px 30px", color:T.textPrimary, fontSize:13, width:200 }} />
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6, background:T.goldSubtle, border:`1px solid ${T.goldBorder}`, borderRadius:8, padding:"6px 12px" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:T.gold }}></div>
                <span style={{ fontSize:12, fontWeight:700, color:T.gold }}>{Object.keys(published).length} Published</span>
              </div>
            </>
          }
        />
        <div className="mpad" style={{ padding:"18px 24px" }}>
          <div style={{ display:"flex", gap:6, marginBottom:20, overflowX:"auto" }}>
            {CATS.map(c => {
              const count = c === "All" ? CATALOGUE.All.length : (CATALOGUE[c]?.length || 0);
              return (
                <button key={c} className="tab-btn" onClick={() => { setCat(c); setSearch(""); }}
                  style={{ background:cat===c?T.goldSubtle:T.bgSurface, borderColor:cat===c?T.goldBorder:T.borderSubtle, color:cat===c?T.gold:T.textSecondary }}>
                  {c} · {count}
                </button>
              );
            })}
          </div>

          {products.length === 0 ? <EmptyState icon="💇‍♀️" title="No products found" description="Try a different search or category." /> : (
            <div className="pgrid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              {products.map(product => {
                const isPub = published[product.id];
                const isPubbing = publishing === product.id;
                return (
                  <div key={product.id} className="pcard" style={{ background:T.bgCard, border:`1px solid ${isPub?T.goldBorder:T.borderSubtle}`, borderRadius:12, overflow:"hidden", boxShadow:T.shadow }}>
                    <div className="pimg" style={{ aspectRatio:"1", overflow:"hidden", position:"relative", background:T.bgElevated }}>
                      <img src={product.img} alt={product.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      {product.badge && !isPub && <span style={{ position:"absolute", top:8, right:8, background:T.goldSubtle, color:T.gold, border:`1px solid ${T.goldBorder}`, fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:100 }}>{product.badge}</span>}
                      {isPub && (
                        <div style={{ position:"absolute", inset:0, background:"rgba(201,168,76,0.85)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
                          <div style={{ width:36, height:36, borderRadius:"50%", background:"white", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <span style={{ fontSize:12, fontWeight:700, color:"#0D0A0E" }}>Live in Store</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding:"12px 14px 14px" }}>
                      <div style={{ fontSize:10, fontWeight:700, color:T.gold, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>{CATS.find(c => c !== "All" && CATALOGUE[c]?.some(p => p.id === product.id))}</div>
                      <div style={{ fontSize:14, fontWeight:600, color:T.textPrimary, marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{product.name}</div>
                      <div style={{ fontSize:12, color:T.textSecondary, marginBottom:10, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{product.desc}</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, color:T.textPrimary }}>${product.price}</span>
                        <span style={{ fontSize:10, fontWeight:600, color:T.textTertiary, background:T.bgSurface, padding:"2px 7px", borderRadius:100, border:`1px solid ${T.borderSubtle}` }}>Min. {product.moq}</span>
                      </div>
                      {isPub ? (
                        <div style={{ display:"flex", gap:6 }}>
                          <div style={{ flex:1, background:T.goldSubtle, border:`1px solid ${T.goldBorder}`, borderRadius:7, padding:"8px", textAlign:"center", fontSize:12, fontWeight:600, color:T.gold }}>Published</div>
                          <a href={isPub==="#"?undefined:isPub} target="_blank" rel="noreferrer" style={{ background:T.bgSurface, border:`1px solid ${T.borderDefault}`, borderRadius:7, padding:"8px 10px", fontSize:12, fontWeight:600, color:T.textSecondary }}>View</a>
                        </div>
                      ) : (
                        <button className="pub-btn" onClick={() => handlePublish(product)} disabled={isPubbing}
                          style={{ background:isPubbing?T.bgSurface:"transparent", borderColor:isPubbing?T.borderSubtle:T.borderDefault, color:isPubbing?T.textTertiary:T.textSecondary }}>
                          {isPubbing ? <><span style={{ width:11, height:11, border:`2px solid ${T.borderDefault}`, borderTopColor:T.gold, borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }}></span>Publishing</> : "Publish to Store →"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}