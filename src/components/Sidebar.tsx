
import { useMemo, useEffect } from 'react';
import { articles } from '../data/articles';
import { info } from '../data/info';
import { gettingStarted } from '../data/getting-started';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from '@phosphor-icons/react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    activeSlug: string;
    onArticleClick: (slug: string) => void;
}

function SidebarContent({
    categories,
    topItems,
    activeSlug,
    onArticleClick
}: {
    categories: any[],
    topItems: any[],
    activeSlug: string,
    onArticleClick: (slug: string) => void
}) {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 px-4 py-4">
                <div className="flex flex-col gap-6">
                    {topItems.length > 0 && (
                        <div className="flex flex-col space-y-1">
                            {topItems.map((article: any) => (
                                <Button
                                    key={article.id}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onArticleClick(article.slug)}
                                    className={cn(
                                        "w-full justify-start font-normal h-auto py-2 px-3 text-left whitespace-normal text-sm",
                                        activeSlug === article.slug && "bg-muted text-foreground font-medium"
                                    )}
                                >
                                    {article.title}
                                </Button>
                            ))}
                        </div>
                    )}
                    {categories.map((category) => (
                        <div key={category.id}>
                            <div className={cn("mb-2 font-semibold uppercase tracking-widest text-muted-foreground",
                                category.id === "getting-started" ? "ml-2 text-lg" : 'text-xs',
                            )}>
                                {category.title}
                            </div>
                            <div className="flex flex-col space-y-1">
                                {category.articles.map((article: any) => (
                                    <Button
                                        key={article.id}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onArticleClick(article.slug)}
                                        className={cn(
                                            "w-full justify-start font-normal h-auto py-2 px-3 text-left whitespace-normal",
                                            activeSlug === article.slug && "bg-muted text-foreground font-medium",
                                        )}
                                    >
                                        {article.title
                                            .replace(/^How to /, '')
                                            .replace(/^use FFmpeg /, '')
                                            .replace(/ with FFmpeg.*$/, '')
                                            .replace(/ Using FFmpeg.*$/, '')}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Sidebar({ isOpen, onClose, activeSlug, onArticleClick }: SidebarProps) {
    const topItems = useMemo(() => gettingStarted, []);
    const defaultSlug = useMemo(() => gettingStarted[0]?.slug ?? "", []);

    // Lock body scroll when sidebar is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const categories = useMemo(() => {
        const items = [
            {
                id: 'guides',
                title: 'Guides',
                articles: articles,
            },
            {
                id: 'important-info',
                title: 'Important Info',
                articles: info,
            },
        ];

        return items.filter((category) => category.articles.length > 0);
    }, []);

    return (
        <>
            {/* Mobile Sheet */}
            <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <SheetContent
                    side="left"
                    className="w-full p-0 bg-background border-none h-screen"
                    hideClose
                >
                    <div className="flex flex-col h-full">
                        {/* Mobile Sidebar Header */}
                        <div className="flex items-center h-16 px-4 border-b">
                            <div 
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => {
                                    onArticleClick(defaultSlug);
                                    onClose();
                                }}
                            >
                                <img src="./logo.svg" alt="FFmpeg Docs" className="h-7 w-7" />
                                <span className="font-bold text-xl tracking-tight">FFmpeg Docs</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="ml-auto h-9 w-9 px-0"
                                onClick={onClose}
                            >
                                <X size={20} weight="bold" />
                                <span className="sr-only">Close menu</span>
                            </Button>
                        </div>
                        <ScrollArea className="flex-1">
                            <SidebarContent
                                categories={categories}
                                topItems={topItems}
                                activeSlug={activeSlug}
                                onArticleClick={(slug) => {
                                    onArticleClick(slug);
                                    onClose();
                                }}
                            />
                        </ScrollArea>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex sticky top-16 h-[calc(100vh-4rem)] z-30 w-72 flex-col bg-background">
                <ScrollArea className="h-full">
                    <SidebarContent
                        categories={categories}
                        topItems={topItems}
                        activeSlug={activeSlug}
                        onArticleClick={onArticleClick}
                    />
                </ScrollArea>
            </aside>
        </>
    );
}
