export interface Article {
    id: string;
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

export interface TocItem {
    id: string;
    text: string;
    level: 'h2' | 'h3';
}

export interface Category {
    id: string;
    title: string;
    articles: Article[];
}
