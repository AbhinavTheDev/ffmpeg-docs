
import { MagnifyingGlass, Sun, Moon, List } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
interface HeaderProps {
    onMenuClick: () => void;
    onSearchClick: () => void;
}

export function Header({ onMenuClick, onSearchClick }: HeaderProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark') {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center bg-background/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <Button
                variant="ghost"
                size="sm"
                className="mr-2 h-8 w-8 px-0 lg:hidden"
                onClick={onMenuClick}
            >
                <List size={18} />
                <span className="sr-only">Open menu</span>
            </Button>
            <a href="/" className="mr-4 lg:mr-6 flex items-center space-x-2">
                <img src="./logo.svg" alt="FFmpeg Docs" className="h-6 w-6" />
                <span className="hidden font-semibold lg:inline-block text-lg">FFmpeg Docs</span>
            </a>

            <div className="flex flex-1 items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden h-9 w-full justify-between text-muted-foreground sm:flex sm:w-64 md:w-80 lg:w-96"
                    onClick={onSearchClick}
                >
                    <span className="flex items-center gap-2">
                        <MagnifyingGlass size={16} />
                        Search documentation
                    </span>
                    <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Ctrl+K
                    </kbd>
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 sm:hidden"
                    onClick={onSearchClick}
                >
                    <MagnifyingGlass size={16} />
                    <span className="sr-only">Search</span>
                </Button>

                <Separator orientation="vertical" className="mx-1 h-5" />

                <nav className="flex items-center space-x-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 px-0"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
