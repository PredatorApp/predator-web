import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LegalContents } from '@/components/legal/legal-contents';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_IS_DRAFT,
  LEGAL_REVIEW_DATE,
} from '@/lib/legal';

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  sections: readonly LegalSection[];
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <main id="legal-content" className="legal-page">
      <a className="legal-skip-link" href="#legal-sections">
        Skip to the full document
      </a>
      <header className="legal-header" id="top">
        <h1>{title}</h1>
        <div className="legal-date-row">
          {LEGAL_IS_DRAFT ? (
            <>
              <span className="legal-draft-label">Draft · Not in effect</span>
              <span>Reviewed {formatDate(LEGAL_REVIEW_DATE)}</span>
            </>
          ) : (
            <span>Effective {formatDate(LEGAL_EFFECTIVE_DATE!)}</span>
          )}
        </div>
      </header>

      <div className="legal-document-grid">
        <LegalContents
          items={sections.map(({ id, title }) => ({ id, title }))}
        />
        <article id="legal-sections" className="legal-body" tabIndex={-1}>
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              <div className="legal-section-heading">
                <h2 id={`${section.id}-heading`}>
                  <a href={`#${section.id}`}>
                    <span className="legal-section-number">{index + 1}.</span>{' '}
                    {section.title}
                  </a>
                </h2>
              </div>
              {section.content}
            </section>
          ))}
          <div className="legal-document-end">
            <Button
              nativeButton={false}
              role="link"
              variant="ghost"
              render={<a href="#top" />}
            >
              Back to top <span aria-hidden="true">↑</span>
            </Button>
          </div>
        </article>
      </div>
    </main>
  );
}

export function LegalTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly ReactNode[])[];
}) {
  return (
    <Table
      className="legal-prose-table"
      containerProps={{
        className: 'legal-table-scroll',
        role: 'region',
        'aria-label': caption,
        tabIndex: 0,
      }}
    >
      <TableCaption className="text-left">
        {caption}
        <span className="legal-table-hint">
          Scroll sideways to read all columns →
        </span>
      </TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column} scope="col" className="whitespace-normal">
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) =>
              cellIndex === 0 ? (
                <TableHead
                  key={cellIndex}
                  scope="row"
                  className="min-w-32 p-3 align-top whitespace-normal"
                >
                  {cell}
                </TableHead>
              ) : (
                <TableCell
                  key={cellIndex}
                  className="align-top whitespace-normal"
                >
                  {cell}
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function LegalCallout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="legal-callout">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
