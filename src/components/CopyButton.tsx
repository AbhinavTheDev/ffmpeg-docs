
import { useState, useCallback } from 'react';
import { Check, Copy } from '@phosphor-icons/react';
import { Button } from "@/components/ui/button";

export function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [code]);

    return (
        <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:ring-offset-0"
            onClick={handleCopy}
            aria-label="Copy code"
        >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </Button>
    );
}
