
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { articles } from './data/articles';
import { info } from './data/info';
import { gettingStarted } from './data/getting-started';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ArticleView } from './components/ArticleView';
import { TableOfContents } from './components/TableOfContents';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useSpotlightShortcut } from './hooks/useSpotlightShortcut';
import { SpotlightSearch } from './components/SpotlightSearch';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/:slug");

  const allArticles = useMemo(() => [...gettingStarted, ...articles, ...info], []);
  const defaultSlug = useMemo(() => gettingStarted[0]?.slug ?? articles[0]?.slug ?? "", []);
  const activeSlug = params?.slug ?? defaultSlug;
  const activeArticle = allArticles.find((a) => a.slug === activeSlug) || allArticles[0];
  const activeTocId = useScrollSpy('.prose h2, .prose h3', activeSlug);

  useEffect(() => {
    if (!params?.slug) {
      setLocation(`/${defaultSlug}`, { replace: true });
    }
  }, [params?.slug, defaultSlug, setLocation]);

  useEffect(() => {
    if (params?.slug && !allArticles.some((a) => a.slug === params.slug)) {
      setLocation(`/${defaultSlug}`, { replace: true });
    }
  }, [params?.slug, allArticles, defaultSlug, setLocation]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [activeSlug]);

  // Keyboard shortcut
  useSpotlightShortcut(() => setSpotlightOpen(true));

  const handleArticleClick = useCallback((slug: string) => {
    setLocation(`/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setLocation]);

  return (
    <div className="relative min-h-screen bg-background font-sans antialiased text-foreground">
      <SpotlightSearch
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onSelect={handleArticleClick}
      />

      <Header
        isOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSpotlightOpen(true)}
      />

      <div className="pt-16 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)_18rem]">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeSlug={activeSlug}
          onArticleClick={handleArticleClick}
        />

        <main className="w-full min-w-0">
          <div className="w-full py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl w-full mx-auto">
              <ArticleView
                article={activeArticle}
                navigationArticles={allArticles}
                onNavigate={handleArticleClick}
              />
            </div>
          </div>
        </main>

        <aside className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-background/80 pt-8 px-6 backdrop-blur">
          <TableOfContents content={activeArticle.content} activeId={activeTocId || ""} />
        </aside>
      </div>
    </div>
  );
}

export default App;
