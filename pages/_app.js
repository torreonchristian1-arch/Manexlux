import { createContext, useContext, useState, useEffect } from "react";
import Head from "next/head";

export const ThemeContext = createContext();
export function useTheme() { return useContext(ThemeContext); }

export const THEMES = {
  dark: {
    bgBase: "#0D0A0E",
    bgCard: "#1A1520",
    bgElevated: "#221B28",
    bgSurface: "#2A2230",
    borderSubtle: "#2E2638",
    borderDefault: "#3A3248",
    textPrimary: "#F5F0EA",
    textSecondary: "#C4B49A",
    textTertiary: "#8A7A66",
    gold: "#C9A84C",
    goldHover: "#D4B85C",
    goldSubtle: "rgba(201,168,76,0.1)",
    goldBorder: "rgba(201,168,76,0.25)",
    goldText: "#C9A84C",
    olive: "#C9A84C",
    oliveSubtle: "rgba(201,168,76,0.1)",
    oliveBorder: "rgba(201,168,76,0.25)",
    green: "#4A9D6E",
    greenSubtle: "rgba(74,157,110,0.12)",
    greenBorder: "rgba(74,157,110,0.28)",
    orange: "#E07050",
    orangeSubtle: "rgba(224,112,80,0.12)",
    orangeBorder: "rgba(224,112,80,0.28)",
    shadow: "0 1px 4px rgba(0,0,0,0.4)",
    shadowMd: "0 4px 20px rgba(0,0,0,0.5)",
  },
  light: {
    bgBase: "#FAF7F2",
    bgCard: "#FFFFFF",
    bgElevated: "#F5EFE8",
    bgSurface: "#EDE6DC",
    borderSubtle: "#E2D9CC",
    borderDefault: "#D4C9B8",
    textPrimary: "#1A1208",
    textSecondary: "#6B5A4A",
    textTertiary: "#9A8A7A",
    gold: "#8B6914",
    goldHover: "#9B7924",
    goldSubtle: "rgba(139,105,20,0.08)",
    goldBorder: "rgba(139,105,20,0.22)",
    goldText: "#8B6914",
    olive: "#8B6914",
    oliveSubtle: "rgba(139,105,20,0.08)",
    oliveBorder: "rgba(139,105,20,0.22)",
    green: "#2E7D52",
    greenSubtle: "rgba(46,125,82,0.1)",
    greenBorder: "rgba(46,125,82,0.25)",
    orange: "#C05020",
    orangeSubtle: "rgba(192,80,32,0.08)",
    orangeBorder: "rgba(192,80,32,0.2)",
    shadow: "0 1px 4px rgba(26,18,8,0.07)",
    shadowMd: "0 4px 20px rgba(26,18,8,0.1)",
  }
};

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("manexlux-theme");
      if (saved === "dark" || saved === "light") setMode(saved);
    } catch {}
  }, []);

  function toggleTheme() {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    try { localStorage.setItem("manexlux-theme", next); } catch {}
  }

  const theme = THEMES[mode];

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
          body { font-family: 'DM Sans', sans-serif; background: ${theme.bgBase}; color: ${theme.textPrimary}; font-size: 14px; line-height: 1.6; overflow-x: hidden; }
          ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${theme.borderDefault}; border-radius: 10px; }
          input, button, textarea, select { font-family: 'DM Sans', sans-serif; }
          input:focus, textarea:focus, select:focus, button:focus { outline: none; }
          a { text-decoration: none; color: inherit; } img { display: block; max-width: 100%; } button { cursor: pointer; }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes toastIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pageIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
          .page-enter { animation: pageIn 0.2s ease; }
          @media (max-width: 768px) { .hide-mobile { display: none !important; } }
        `}</style>
      </Head>
      <div className="page-enter"><Component {...pageProps} /></div>
    </ThemeContext.Provider>
  );
}