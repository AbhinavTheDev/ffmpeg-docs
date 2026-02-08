import { useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

type CodeTab = {
    id: string;
    label: string;
    code: string;
    language?: string;
};

interface TabbedCodeBlockProps {
    tabs: CodeTab[];
    defaultTabId?: string;
}

export function TabbedCodeBlock({ tabs, defaultTabId }: TabbedCodeBlockProps) {
    const initial = defaultTabId && tabs.some((tab) => tab.id === defaultTabId)
        ? defaultTabId
        : tabs[0]?.id;
    const [activeId, setActiveId] = useState(initial);

    const activeTab = useMemo(
        () => tabs.find((tab) => tab.id === activeId) || tabs[0],
        [tabs, activeId]
    );

    if (!activeTab) return null;

    return (
        <div className="my-6 overflow-hidden bg-card/40">
            <div className="flex items-center gap-1 px-2 py-2">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        type="button"
                        variant="ghost"
                        size="default"
                        onClick={() => setActiveId(tab.id)}
                        className={cn(
                            "h-8 px-3 text-sm",
                            activeId === tab.id
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>
            <div className="px-2 pb-2">
                <CodeBlock
                    language={activeTab.language || "bash"}
                    code={activeTab.code}
                    className="my-0 rounded-md"
                />
            </div>
        </div>
    );
}
