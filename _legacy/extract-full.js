const fs = require('fs');
const html = fs.readFileSync('_parsed_body.html', 'utf8');

const categories = [
  { id: 'corporate', label: 'コーポレート / ブランディング' },
  { id: 'media', label: 'メディア / 情報発信' },
  { id: 'hospitality', label: '旅行 / ライフスタイル' },
  { id: 'business', label: '業務支援 / SaaS' },
  { id: 'community', label: 'マッチング / コミュニティ' },
  { id: 'mobile-ai', label: 'モバイルアプリ / AI' },
];

const sections = html.split(/<section class="mb-20 scroll-mt-36" id="/).slice(1);
const projects = [];

for (const section of sections) {
  const idMatch = section.match(/^([^"]+)"/);
  if (!idMatch) continue;
  const categoryId = idMatch[1];

  const cardBlocks = section.split('<div class="group relative block overflow-hidden rounded-2xl');
  for (let i = 1; i < cardBlocks.length; i++) {
    const block = cardBlocks[i];
    const typeMatch = block.match(/rounded-full bg-gray-100 px-2\.5 py-1[^>]*>([^<]+)</);
    const titleMatch = block.match(/<h3 class="mb-4[^"]*"[^>]*>([^<]+)<\/h3>/);
    const descMatch = block.match(/<p class="mb-4 text-sm leading-relaxed[^"]*"[^>]*>([^<]+)<\/p>/);
    const scopeMatch = block.match(/担当範囲<\/p>\s*<p[^>]*>([^<]+)<\/p>/);
    const teamMatch = block.match(/開発体制<\/p>\s*<p[^>]*>([^<]+)<\/p>/);
    const imgMatch = block.match(/src="(\/images\/[^"]+)"/);
    const altMatch = block.match(/alt="([^"]+)"/);

    const techMatches = [...block.matchAll(/bg-blue-100 px-2\.5 py-1[^>]*>([^<]+)</g)].map(m => m[1]);
    const highlightMatches = [...block.matchAll(/bg-gray-100 px-2\.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700[^>]*>([^<]+)</g)]
      .map(m => m[1])
      .filter(t => !['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress'].includes(t) || techMatches.length === 0);

    const basicTech = [...block.matchAll(/<div class="mb-2 flex flex-wrap gap-2">[\s\S]*?<\/div>/g)]
      .flatMap(div => [...div[0].matchAll(/>([^<]+)<\/span>/g)].map(m => m[1].trim()))
      .filter(t => t && t !== 'GSAP' || highlightMatches.includes('GSAP'));

    const techFromGray = [...block.matchAll(/<div class="mb-2 flex flex-wrap gap-2">[\s\S]*?<\/div>/)]
      .flatMap(part => [...part[0].matchAll(/rounded-full bg-gray-100[^>]*>([^<]+)</g)].map(m => m[1]));

    const highlights = [...block.matchAll(/rounded-full bg-blue-100 px-2\.5 py-1 text-xs font-medium text-blue-700[^>]*>([^<]+)</g)]
      .map(m => m[1]);

    const grayHighlights = [...block.matchAll(/<div class="mb-3 flex flex-wrap gap-2">[\s\S]*?rounded-full bg-blue-100[^>]*>([^<]+)</g)]
      .map(m => m[1]);

    if (!titleMatch) continue;

    projects.push({
      categoryId,
      type: typeMatch?.[1] || '',
      title: titleMatch[1].trim(),
      description: descMatch?.[1] || '',
      scope: scopeMatch?.[1] || '',
      team: teamMatch?.[1] || '',
      image: imgMatch?.[1] || `/images/${altMatch?.[1] || 'lp-1'}.webp`,
      tech: techMatches.length ? techMatches : undefined,
      highlights: [...new Set([...highlights, ...grayHighlights, ...techFromGray.filter(t => t === 'GSAP')])].filter(Boolean),
      basicTech: techFromGray.filter(t => ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress'].includes(t)),
    });
  }
}

fs.writeFileSync('projects.json', JSON.stringify({ categories, projects }, null, 2));
console.log('Extracted', projects.length, 'projects');
