
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowSquareOutIcon, CaretLeftIcon, CaretRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { CodeBlock } from './CodeBlock';
import { TabbedCodeBlock } from './TabbedCodeBlock';
import type { Article } from '../types';
import { generateId } from '../utils';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ArticleViewProps {
    article: Article;
    navigationArticles: Article[];
    onNavigate: (slug: string) => void;
}

export function ArticleView({ article, navigationArticles, onNavigate }: ArticleViewProps) {
    const currentIndex = navigationArticles.findIndex((item) => item.slug === article.slug);
    const installTabsMarker = '[[INSTALL_TABS]]';
    const installTabs = [
        {
            id: 'winget',
            label: 'winget',
            language: 'bash',
            code: 'winget install ffmpeg',
        },
        {
            id: 'chocolatey',
            label: 'chocolatey',
            language: 'bash',
            code: 'choco install ffmpeg',
        },
        {
            id: 'scoop',
            label: 'scoop',
            language: 'bash',
            code: 'scoop install ffmpeg',
        },
    ];

    return (
        <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-none"
        >
            <header className="mb-8 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/80">
                        Guide
                    </span>
                </div>

                <h1 className="scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl">
                    {article.title}
                </h1>

                <p className="text-base text-muted-foreground leading-7 md:text-lg">
                    {article.description}
                </p>

                <Separator className="my-6" />
            </header>

            <div className="prose prose-zinc dark:prose-invert max-w-none pb-10 prose-headings:scroll-mt-28 prose-p:leading-7 prose-li:leading-7 prose-code:rounded prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5">
                {(() => {
                    const components = {
                        code({ inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            const codeString = String(children).replace(/\n$/, '');

                            if (!inline && match) {
                                return <CodeBlock language={match[1]} code={codeString} />;
                            }

                            return (
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
                                    {children}
                                </code>
                            );
                        },
                        pre({ children }: any) {
                            return <>{children}</>;
                        },
                        a({ href, children, ...props }: any) {
                            return (
                                <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4" {...props}>
                                    {children}
                                    <ArrowSquareOutIcon size={12} className="inline ml-1 mb-1" />
                                </a>
                            );
                        },
                        h2({ children, ...props }: any) {
                            const text = String(children);
                            const id = generateId(text);
                            return <h2 id={id} className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0" {...props}>{children}</h2>;
                        },
                        h3({ children, ...props }: any) {
                            const text = String(children);
                            const id = generateId(text);
                            return <h3 id={id} className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>{children}</h3>;
                        },
                        ul({ children, ...props }: any) {
                            return <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>{children}</ul>;
                        },
                        ol({ children, ...props }: any) {
                            return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>{children}</ol>;
                        },
                    };

                    if (article.slug === 'installation' && article.content.includes(installTabsMarker)) {
                        const [before, ...rest] = article.content.split(installTabsMarker);
                        const after = rest.join(installTabsMarker);
                        return (
                            <>
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                    {before}
                                </ReactMarkdown>
                                <TabbedCodeBlock tabs={installTabs} defaultTabId="winget" />
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                    {after}
                                </ReactMarkdown>
                            </>
                        );
                    }

                    return (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                            {article.content}
                        </ReactMarkdown>
                    );
                })()}
            </div>

            <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-6 mt-10">
                {currentIndex > 0 ? (
                    <Button variant="outline" className="h-auto p-4 flex justify-between items-center group whitespace-normal text-left transition-colors hover:bg-muted/60" onClick={() => onNavigate(navigationArticles[currentIndex - 1].slug)}>
                        <div className="flex flex-col items-start gap-1">
                            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Previous</span>
                            <span className="font-medium">
                                {navigationArticles[currentIndex - 1].title.replace(/^How to /, '')}
                            </span>
                        </div>
                        <CaretLeftIcon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </Button>
                ) : <div />}

                {currentIndex >= 0 && currentIndex < navigationArticles.length - 1 ? (
                    <Button variant="outline" className="h-auto p-4 flex justify-between items-center group whitespace-normal text-right sm:text-right transition-colors hover:bg-muted/60" onClick={() => onNavigate(navigationArticles[currentIndex + 1].slug)}>
                        <CaretRightIcon size={20} className="ml-2 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="flex flex-col items-end gap-1 flex-1">
                            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Next</span>
                            <span className="font-medium">
                                {navigationArticles[currentIndex + 1].title.replace(/^How to /, '')}
                            </span>
                        </div>
                    </Button>
                ) : <div />}
            </nav>

            <div className="mt-8 border-t pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground">Quick Links</p>
                        <p className="text-xs text-muted-foreground">Official resources and community updates.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href="https://github.com/abhinavthedev" target="_blank" rel="noopener noreferrer">
                                <GithubLogoIcon size={16} />
                                <span>GitHub</span>
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href="https://ffmpeg.org/documentation.html" target="_blank" rel="noopener noreferrer">
                                <ArrowSquareOutIcon size={16} />
                                <span>FFmpeg</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            <footer className="mt-8 py-6 text-center text-sm text-muted-foreground">
                <p>Designed for simplicity. Not affiliated with <a href="https://ffmpeg.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">ffmpeg.org</a></p>
            </footer>
        </motion.article>
    );
}
