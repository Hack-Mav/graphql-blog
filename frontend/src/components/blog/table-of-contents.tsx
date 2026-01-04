// src/components/blog/table-of-contents.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = Array.from(
      article.querySelectorAll('h2, h3')
    ) as HTMLElement[];

    const headingList = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1)),
    }));

    setHeadings(headingList);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%', threshold: 0.1 }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 hidden lg:block">
      <div className="mb-2 text-sm font-semibold text-muted-foreground">
        On this page
      </div>
      <nav className="space-y-2 border-l-2 border-muted pl-4">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-sm transition-colors hover:text-foreground ${
              activeId === heading.id
                ? 'text-foreground font-medium'
                : 'text-muted-foreground'
            } ${
              heading.level === 3 ? 'pl-4' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(heading.id)
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {heading.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}