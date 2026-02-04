import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { articles } from './data/articles';
import {
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Github,
  ExternalLink,
  Terminal,
  ArrowRight,
  FileText,
  Command,
  Download,
  Film,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ===================
// TYPES
// ===================
interface TocItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

// ===================
// COPY BUTTON
// ===================
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button onClick={handleCopy} className={`copy-btn ${copied ? 'copied' : ''}`}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
}

// ===================
// CODE BLOCK
// ===================
function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="code-lang-badge">
          <Terminal size={11} />
          <span>{language || 'bash'}</span>
        </div>
        <CopyButton code={code} />
      </div>
      <SyntaxHighlighter
        language={language || 'bash'}
        style={a11yDark}
        customStyle={{
          margin: 0,
          padding: '14px',
          background: '#0d0d0f',
          fontSize: '12px',
          lineHeight: '1.6',
          borderRadius: '0 0 10px 10px',
          overflowX: 'auto',
        }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

// ===================
// TABLE OF CONTENTS
// ===================
function TableOfContents({ content, activeId }: { content: string; activeId: string }) {
  const headings = useMemo(() => {
    const items: TocItem[] = [];
    const lines = content.split('\n');

    lines.forEach((line) => {
      const h2Match = line.match(/^## (.+)/);
      const h3Match = line.match(/^### (.+)/);

      if (h2Match) {
        const text = h2Match[1].replace(/[^\w\s]/g, '').trim();
        const id = text.toLowerCase().replace(/\s+/g, '-');
        items.push({ id, text, level: 'h2' });
      } else if (h3Match) {
        const text = h3Match[1].replace(/[^\w\s]/g, '').trim();
        const id = text.toLowerCase().replace(/\s+/g, '-');
        items.push({ id, text, level: 'h3' });
      }
    });

    return items;
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <aside className="toc-sidebar">
      <div className="toc-container">
        <div className="toc-header">On This Page</div>
        <nav className="toc-nav">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`toc-link ${heading.level} ${activeId === heading.id ? 'active' : ''}`}
            >
              {heading.text.length > 28 ? heading.text.slice(0, 28) + '...' : heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// ===================
// SPOTLIGHT SEARCH
// ===================
function SpotlightSearch({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (slug: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return articles.slice(0, 6);
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      onSelect(results[selectedIndex].slug);
      onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="spotlight-overlay" onClick={onClose}>
      <div className="spotlight-container" onClick={(e) => e.stopPropagation()}>
        <div className="spotlight-header">
          <Search size={18} className="spotlight-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="spotlight-input"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="spotlight-close" onClick={onClose}>ESC</button>
        </div>

        <div className="spotlight-results">
          {results.length === 0 ? (
            <div className="spotlight-empty">
              <FileText size={28} />
              <p>No results for "{query}"</p>
            </div>
          ) : (
            <>
              <div className="spotlight-section-title">
                {query ? 'Results' : 'Quick Access'}
              </div>
              {results.map((article, index) => (
                <button
                  key={article.id}
                  className={`spotlight-result ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => {
                    onSelect(article.slug);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="spotlight-result-content">
                    <span className="spotlight-result-title">
                      {article.title.replace(/^How to /, '').replace(/^use FFmpeg /, '')}
                    </span>
                    <span className="spotlight-result-desc">
                      {article.description.slice(0, 60)}...
                    </span>
                  </div>
                  <ArrowRight size={12} className="spotlight-result-arrow" />
                </button>
              ))}
            </>
          )}
        </div>

        <div className="spotlight-footer">
          <div className="spotlight-hint">
            <kbd>↑</kbd><kbd>↓</kbd><span>Navigate</span>
          </div>
          <div className="spotlight-hint">
            <kbd>↵</kbd><span>Select</span>
          </div>
          <div className="spotlight-hint">
            <kbd>esc</kbd><span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================
// MAIN APP
// ===================
function App() {
  const [activeSlug, setActiveSlug] = useState(articles[0].slug);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [activeTocId, setActiveTocId] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    guides: true,
  });

  const activeArticle = articles.find((a) => a.slug === activeSlug) || articles[0];
  const currentIndex = articles.indexOf(activeArticle);

  // Close sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeSlug]);

  // Keyboard shortcut for spotlight
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Scroll spy for TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );

    const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [activeArticle]);

  const handleArticleClick = (slug: string) => {
    setActiveSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Group articles by category (expandable)
  const categories = useMemo(() => {
    return [
      {
        id: 'guides',
        title: 'Guides',
        articles: articles,
      },
    ];
  }, []);

  return (
    <div className="app-layout">
      {/* Spotlight */}
      <SpotlightSearch
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onSelect={handleArticleClick}
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <a href="/" className="sidebar-brand">
            <div className="sidebar-logo">
              <Film size={16} strokeWidth={2.5} />
            </div>
            <span className="sidebar-title">FFmpeg Docs</span>
          </a>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`nav-section ${expandedSections[category.id] ? '' : 'collapsed'}`}
            >
              <button
                className="nav-section-header"
                onClick={() => toggleSection(category.id)}
              >
                <span>{category.title}</span>
                <ChevronDown size={14} style={{ marginLeft: 'auto' }} />
              </button>
              <div className="nav-list">
                {category.articles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleArticleClick(article.slug)}
                    className={`nav-item ${activeSlug === article.slug ? 'active' : ''}`}
                  >
                    <span className="nav-item-text">
                      {article.title
                        .replace(/^How to /, '')
                        .replace(/^use FFmpeg /, '')
                        .replace(/ with FFmpeg.*$/, '')
                        .replace(/ Using FFmpeg.*$/, '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a href="https://github.com/abhinavthedev" target="_blank" rel="noopener noreferrer" className="sidebar-link">
            <Github size={15} />
            <span>GitHub</span>
          </a>
          <a href="https://ffmpeg.org/documentation.html" target="_blank" rel="noopener noreferrer" className="sidebar-link">
            <ExternalLink size={15} />
            <span>FFmpeg</span>
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="main-wrapper">
        {/* Header */}
        <header className="header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <Menu size={18} />
          </button>

          <button className="search-trigger" onClick={() => setSpotlightOpen(true)}>
            <Search size={15} className="search-trigger-icon" />
            <span className="search-trigger-text">Search docs...</span>
            <div className="search-trigger-keys">
              <kbd><Command size={10} /></kbd>
              <kbd>K</kbd>
            </div>
          </button>

          <div className="header-actions">
            <a href="https://ffmpeg.org/download.html" target="_blank" rel="noopener noreferrer" className="header-cta">
              <Download size={14} />
              <span>Download</span>
            </a>
          </div>
        </header>

        {/* Content */}
        <div className="content-wrapper">
          <article className="article-container" key={activeArticle.id}>
            <header className="article-header">
              <div className="article-meta">
                <span className="article-badge">
                  <Terminal size={11} />
                  <span>Guide</span>
                </span>
                <span className="article-divider">•</span>
                <time className="article-date">{activeArticle.date}</time>
              </div>

              <h1 className="article-title">{activeArticle.title}</h1>
              <p className="article-description">{activeArticle.description}</p>
            </header>

            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');

                    if (!inline && match) {
                      return <CodeBlock language={match[1]} code={codeString} />;
                    }

                    return (
                      <code className="inline-code" {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre({ children }: any) {
                    return <>{children}</>;
                  },
                  a({ href, children, ...props }: any) {
                    return (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="content-link" {...props}>
                        {children}
                        <ExternalLink size={11} />
                      </a>
                    );
                  },
                  h2({ children, ...props }: any) {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
                    return <h2 id={id} {...props}>{children}</h2>;
                  },
                  h3({ children, ...props }: any) {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
                    return <h3 id={id} {...props}>{children}</h3>;
                  },
                }}
              >
                {activeArticle.content}
              </ReactMarkdown>
            </div>

            {/* Nav */}
            <nav className="article-nav">
              {currentIndex > 0 ? (
                <button className="nav-card prev" onClick={() => handleArticleClick(articles[currentIndex - 1].slug)}>
                  <ChevronLeft size={16} className="nav-card-icon" />
                  <div className="nav-card-content">
                    <span className="nav-card-label">Previous</span>
                    <span className="nav-card-title">
                      {articles[currentIndex - 1].title.replace(/^How to /, '').slice(0, 30)}...
                    </span>
                  </div>
                </button>
              ) : <div />}
              {currentIndex < articles.length - 1 ? (
                <button className="nav-card next" onClick={() => handleArticleClick(articles[currentIndex + 1].slug)}>
                  <div className="nav-card-content">
                    <span className="nav-card-label">Next</span>
                    <span className="nav-card-title">
                      {articles[currentIndex + 1].title.replace(/^How to /, '').slice(0, 30)}...
                    </span>
                  </div>
                  <ChevronRight size={16} className="nav-card-icon" />
                </button>
              ) : <div />}
            </nav>

            <footer className="article-footer">
              <p>Built with ❤️ for FFmpeg • <a href="https://ffmpeg.org" target="_blank" rel="noopener noreferrer">ffmpeg.org</a></p>
            </footer>
          </article>

          {/* TOC */}
          <TableOfContents content={activeArticle.content} activeId={activeTocId} />
        </div>
      </div>
    </div>
  );
}

export default App;
