import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { ProgressProvider } from "./lib/core";
import { Drawer, SearchOverlay, Shell, Topbar } from "./components/chrome";
import {
  BattlePage, DesignTokensPage, FlashcardsIndex, FlashcardsSessionPage, GlossaryPage,
  Home, LessonPage, ManifestPage, QueuePage, SearchPage, StatusPage, TroubleshootingPage, VersionsPage,
} from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
}

function Layout() {
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setDrawer(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch((s) => !s); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Topbar onMenu={() => setDrawer(true)} onSearch={() => setSearch(true)} />
      <Routes>
        <Route path="/" element={<Shell><Home /></Shell>} />
        <Route path="/lesson/:id" element={<Shell><LessonPage /></Shell>} />
        <Route path="/battle/:id" element={<Shell><BattlePage /></Shell>} />
        <Route path="/flashcards" element={<Shell><FlashcardsIndex /></Shell>} />
        <Route path="/flashcards/:setId" element={<Shell><FlashcardsSessionPage /></Shell>} />
        <Route path="/search" element={<Shell><SearchPage /></Shell>} />
        <Route path="/queue" element={<Shell><QueuePage /></Shell>} />
        <Route path="/ref/glossary" element={<Shell><GlossaryPage /></Shell>} />
        <Route path="/ref/troubleshooting" element={<Shell><TroubleshootingPage /></Shell>} />
        <Route path="/ref/design-tokens" element={<Shell><DesignTokensPage /></Shell>} />
        <Route path="/ref/versions" element={<Shell><VersionsPage /></Shell>} />
        <Route path="/ref/status" element={<Shell><StatusPage /></Shell>} />
        <Route path="/ref/manifest" element={<Shell><ManifestPage /></Shell>} />
        <Route path="*" element={<Shell><Home /></Shell>} />
      </Routes>
      <Drawer open={drawer} onClose={() => setDrawer(false)} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout />
      </HashRouter>
    </ProgressProvider>
  );
}
