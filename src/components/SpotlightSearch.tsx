
import { Info } from '@phosphor-icons/react';
import { articles } from '../data/articles';
import { info } from '../data/info';
import { gettingStarted } from '../data/getting-started';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

interface SpotlightSearchProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (slug: string) => void;
}

export function SpotlightSearch({
    isOpen,
    onClose,
    onSelect,
}: SpotlightSearchProps) {
    return (
        <Command className="">
            <CommandDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <CommandInput placeholder="Type to search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {gettingStarted.length > 0 && (
                        <CommandGroup heading="Getting Started">
                            {gettingStarted.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.title}
                                    onSelect={() => {
                                        onSelect(item.slug);
                                        onClose();
                                    }}
                                    className="group flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <span>{item.title}</span>
                                            <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
                                        </div>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    {gettingStarted.length > 0 && <CommandSeparator />}
                    <CommandGroup heading="Important Info">
                        {info.map((item) => (
                            <CommandItem
                                key={item.id}
                                value={item.title}
                                onSelect={() => {
                                    onSelect(item.slug);
                                    onClose();
                                }}
                                className="group flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    <div className="flex flex-col">
                                        <span>{item.title}</span>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
                                    </div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Guides">
                        {articles.map((article) => (
                            <CommandItem
                                key={article.id}
                                value={article.title}
                                onSelect={() => {
                                    onSelect(article.slug);
                                    onClose();
                                }}
                                className="group flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <span>{article.title}</span>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{article.description}</span>
                                    </div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </Command>
    );
}
