
import { MagnifyingGlassIcon, SunIcon, MoonIcon, ListIcon, X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    isOpen: boolean;
    onMenuClick: () => void;
    onSearchClick: () => void;
}

export function Header({ isOpen, onMenuClick, onSearchClick }: HeaderProps) {
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
        <header className="fixed inset-x-0 top-0 z-[60] flex h-16 items-center bg-background/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/40">
            <Button
                variant="ghost"
                size="sm"
                className="mr-2 h-9 w-9 px-0 lg:hidden relative flex items-center justify-center hover:bg-transparent"
                onClick={onMenuClick}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'menu'}
                        initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                    >
                        {isOpen ? <X size={20} weight="bold" /> : <ListIcon size={20} weight="bold" />}
                    </motion.div>
                </AnimatePresence>
                <span className="sr-only">Toggle menu</span>
            </Button>
            <a href="/" className="mr-4 lg:mr-6 flex items-center space-x-2">
                <img src="./logo.svg" alt="FFmpeg Docs" className="h-7 w-7" />
                <span className=" font-bold text-xl tracking-tight">FFmpeg Docs</span>
            </a>

            <div className="flex flex-1 items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="hidden h-9 w-full justify-between text-muted-foreground sm:flex sm:w-64 md:w-80 lg:w-96"
                    onClick={onSearchClick}
                >
                    <span className="flex items-center gap-2">
                        <MagnifyingGlassIcon size={16} />
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
                    <MagnifyingGlassIcon size={16} />
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
                        {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
