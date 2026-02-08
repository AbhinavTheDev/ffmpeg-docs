
import { useMemo } from 'react';
import { generateId } from '../utils';
import { Button } from "@/components/ui/button";

interface TocItem {
    id: string;
    text: string;
    level: 'h2' | 'h3';
}

interface TableOfContentsProps {
    content: string;
    activeId: string;
}

export function TableOfContents({ content, activeId }: TableOfContentsProps) {
    const headings = useMemo(() => {
        const items: TocItem[] = [];
        const lines = content.split('\n');

        lines.forEach((line) => {
            const h2Match = line.match(/^## (.+)/);
            const h3Match = line.match(/^### (.+)/);

            if (h2Match) {
                const text = h2Match[1].replace(/[^\w\s]/g, '').trim();
                const id = generateId(text);
                items.push({ id, text, level: 'h2' });
            } else if (h3Match) {
                const text = h3Match[1].replace(/[^\w\s]/g, '').trim();
                const id = generateId(text);
                items.push({ id, text, level: 'h3' });
            }
        });

        return items;
    }, [content]);

    if (headings.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">On This Page</h4>
                <div className="mt-3 flex flex-col space-y-2">
                    {headings.map((heading) => (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            className={`relative text-sm transition-colors hover:text-foreground ${activeId === heading.id
                                    ? 'font-medium text-foreground before:absolute before:-left-3 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-primary'
                                    : 'text-muted-foreground'
                                } ${heading.level === 'h3' ? 'pl-4' : ''}`}
                        >
                            {heading.text}
                        </a>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                <h4 className="text-sm font-semibold text-foreground">Use FFmpeg Today</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                    Install FFmpeg and unlock powerful video and audio workflows on your machine.
                </p>
                <Button size="sm" className="mt-4 w-full" asChild>
                    <a href="https://ffmpeg.org/download.html" target="_blank" rel="noopener noreferrer">
                        Get FFmpeg
                    </a>
                </Button>
            </div>
        </div>
    );
}
