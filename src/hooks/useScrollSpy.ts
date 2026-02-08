import { useState, useEffect } from 'react';

export function useScrollSpy(selectors: string, dependency: any) {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        let headings: HTMLElement[] = [];
        let rafId = 0;
        let ticking = false;
        let observer: MutationObserver | null = null;

        const getOffset = () => {
            const header = document.querySelector('header');
            const headerHeight = header ? header.getBoundingClientRect().height : 64;
            return headerHeight + 24;
        };

        const updateActive = () => {
            if (headings.length === 0) {
                setActiveId('');
                return;
            }
            const offset = getOffset();
            const scrollY = window.scrollY + offset;
            let current = headings[0]?.id ?? '';
            for (const heading of headings) {
                if (heading.offsetTop <= scrollY) {
                    current = heading.id;
                } else {
                    break;
                }
            }
            setActiveId(current);
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(() => {
                    updateActive();
                    ticking = false;
                });
            }
        };

        const collectHeadings = () => {
            headings = Array.from(document.querySelectorAll<HTMLElement>(selectors)).filter((el) => el.id);
            updateActive();
        };

        const scheduleCollect = () => {
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
            rafId = window.requestAnimationFrame(() => collectHeadings());
        };

        scheduleCollect();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        window.addEventListener('hashchange', updateActive);

        const contentRoot = document.querySelector('.prose');
        if (contentRoot) {
            observer = new MutationObserver(scheduleCollect);
            observer.observe(contentRoot, { childList: true, subtree: true });
        } else {
            scheduleCollect();
        }

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            window.removeEventListener('hashchange', updateActive);
            if (observer) {
                observer.disconnect();
            }
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [selectors, dependency]);

    return activeId;
}
