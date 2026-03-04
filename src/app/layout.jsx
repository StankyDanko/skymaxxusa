import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/*
  DARK-MODE STRATEGY
  ──────────────────
  ThemeProvider adds/removes class="dark" on <html>.
  All rules below use !important so they beat Tailwind utility classes.

  Selector notes (JS template-literal → CSS output):
  • [class*="bg-[#F8F9FA]"]   → matches any element whose class contains
                                  the literal string  bg-[#F8F9FA]
  • The [ ] # chars need NO extra escaping inside a CSS attr-selector string.
  • Tailwind arbitrary-value classes (bg-[#F8F9FA]) are just plain strings
    in the class attribute, so substring matching works perfectly.
*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          html.dark { color-scheme: dark; }

          /* ══ 1. BASE SHELL ════════════════════════════════════════════ */
          html.dark body {
            background-color: #0F172A !important;
            color: #e2e8f0 !important;
          }

          /* ══ 2. PAGE-ROOT WRAPPERS ════════════════════════════════════
             Every page has  <div class="min-h-screen bg-…"> as its root.
             We catch all of them regardless of which bg class they use.   */
          html.dark div.min-h-screen {
            background-color: #0F172A !important;
          }

          /* ══ 3. SECTION / CONTENT BACKGROUNDS ════════════════════════ */

          /* Standard Tailwind bg classes */
          html.dark .bg-white   { background-color: #1E293B !important; }
          html.dark .bg-gray-50 { background-color: #152035 !important; }
          html.dark .bg-gray-100{ background-color: #1A2540 !important; }

          /* Arbitrary Tailwind colour  bg-[#F8F9FA]  used on sections */
          html.dark [class*="bg-[#F8F9FA]"] { background-color: #152035 !important; }
          html.dark [class*="bg-[#f8f9fa]"] { background-color: #152035 !important; }

          /* ══ 4. TEXT COLOURS ══════════════════════════════════════════ */
          html.dark .text-gray-900 { color: #F1F5F9 !important; }
          html.dark .text-gray-800 { color: #E2E8F0 !important; }
          html.dark .text-gray-700 { color: #CBD5E1 !important; }
          html.dark .text-gray-600 { color: #94A3B8 !important; }
          html.dark .text-gray-500 { color: #64748B !important; }
          html.dark .text-gray-400 { color: #4B5563 !important; }

          /* Force headings to bright white when they sit on dark section BGs */
          html.dark h1.text-gray-900,
          html.dark h2.text-gray-900,
          html.dark h3.text-gray-900,
          html.dark h4.text-gray-900 { color: #F1F5F9 !important; }

          /* Brand blue text → readable blue in dark */
          html.dark .text-[\\#1E3A8A] { color: #7BAEFF !important; }

          /* Red helper text — stays red, just slightly lighter */
          html.dark .text-red-700 { color: #FCA5A5 !important; }

          /* ══ 5. BORDERS ═══════════════════════════════════════════════ */
          html.dark .border-gray-100 { border-color: #2A3A52 !important; }
          html.dark .border-gray-200 { border-color: #2A3A52 !important; }
          html.dark .border-gray-300 { border-color: #334155 !important; }

          /* ══ 6. FORM INPUTS ═══════════════════════════════════════════ */
          html.dark input,
          html.dark textarea,
          html.dark select {
            background-color: #0F172A !important;
            border-color: #334155 !important;
            color: #F1F5F9 !important;
          }
          html.dark input::placeholder,
          html.dark textarea::placeholder { color: #4B5563 !important; }
          html.dark input:focus,
          html.dark textarea:focus {
            border-color: #4F7DF5 !important;
            outline: none !important;
          }

          /* ══ 7. SHADOWS ════════════════════════════════════════════════ */
          html.dark .shadow-sm  { box-shadow: 0 1px 3px rgba(0,0,0,0.55) !important; }
          html.dark .shadow     { box-shadow: 0 2px 6px rgba(0,0,0,0.55) !important; }
          html.dark .shadow-md  { box-shadow: 0 4px 12px rgba(0,0,0,0.6) !important; }
          html.dark .shadow-lg  { box-shadow: 0 10px 24px rgba(0,0,0,0.65) !important; }
          html.dark .shadow-xl  { box-shadow: 0 20px 40px rgba(0,0,0,0.7) !important; }
          html.dark .shadow-2xl { box-shadow: 0 25px 50px rgba(0,0,0,0.75) !important; }

          /* ══ 8. SPECIAL COMPONENT OVERRIDES ════════════════════════════ */

          /* Info / hint boxes */
          html.dark .bg-blue-50      { background-color: #1A2A4A !important; }
          html.dark .border-blue-100 { border-color: #2A3D6E !important; }
          html.dark .bg-red-50       { background-color: #2A1520 !important; }
          html.dark .border-red-100,
          html.dark .border-red-200  { border-color: #5A2030 !important; }

          /* Price badge on hero (bg-white with text-[#1E3A8A] parent) */
          html.dark .hero-price-badge {
            background-color: #1E293B !important;
          }
          html.dark .hero-price-badge p {
            color: #F1F5F9 !important;
          }
          html.dark .hero-price-badge .price-amount {
            color: #FFFFFF !important;
          }

          /* Navbar "My Account" button (white bg, navy text) */
          html.dark .nav-account-btn {
            background-color: rgba(255,255,255,0.08) !important;
            color: #FFFFFF !important;
            border: 1px solid rgba(255,255,255,0.3) !important;
          }
          html.dark .nav-account-btn:hover {
            background-color: rgba(220,38,38,0.2) !important;
            border-color: #DC2626 !important;
            color: #FFFFFF !important;
          }

          /* Contact form card (dark variant of the red-border card) */
          html.dark .contact-form-card {
            background-color: #1E293B !important;
            border-color: rgba(220,38,38,0.3) !important;
          }

          /* Tab switcher bg */
          html.dark .tab-bar { background-color: #0F172A !important; }

          /* Spec / table alternating rows */
          html.dark [class*="bg-gray-50"] { background-color: #152035 !important; }

          /* Business-hours box (uses arbitrary opacity class) */
          html.dark [class*="bg-[#1E3A8A]"] {
            /* keep navy – already dark; just ensure text contrast */
          }

          /* ══ 9. SMOOTH TRANSITIONS ON THEME SWITCH ════════════════════ */
          *, *::before, *::after {
            transition-property: background-color, border-color, color, box-shadow;
            transition-duration: 180ms;
            transition-timing-function: ease;
          }
        `}</style>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
