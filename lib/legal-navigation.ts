export interface LegalSectionPosition {
  id: string;
  top: number;
}

export function activeLegalSection(
  sections: readonly LegalSectionPosition[],
  readingLine: number,
  atDocumentEnd: boolean
): string | null {
  if (sections.length === 0) return null;
  if (atDocumentEnd) return sections[sections.length - 1].id;

  let activeId = sections[0].id;
  for (const section of sections) {
    if (section.top > readingLine) break;
    activeId = section.id;
  }
  return activeId;
}
