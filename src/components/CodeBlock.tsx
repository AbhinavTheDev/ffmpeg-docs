
import { useEffect, useState } from 'react';
import { TerminalWindowIcon } from '@phosphor-icons/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyButton } from './CopyButton';
import { cn } from "@/lib/utils";
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function CodeBlock({
    language,
    code,
    className,
}: {
    language: string;
    code: string;
    className?: string;
}) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const update = () => setIsDark(root.classList.contains('dark'));
        update();
        const observer = new MutationObserver(update);
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div className={cn("relative my-6 overflow-hidden rounded-lg border bg-background", className)}>
            <div className="flex items-center justify-between border-b bg-muted/60 px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <TerminalWindowIcon size={14} />
                    <span>{language || 'bash'}</span>
                </div>
                <CopyButton code={code} />
            </div>
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language || 'bash'}
                    style={isDark ? a11yDark : a11yLight}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent',
                        fontSize: '15px',
                        lineHeight: '1.5',
                        fontFamily: 'var(--font-mono)',
                    }}
                    wrapLongLines={false}
                    PreTag="div"
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
