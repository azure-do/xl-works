const fs = require('fs');
const html = fs.readFileSync('_parsed_body.html', 'utf8');

// Extract project cards
const cardRegex = /<div class="group relative block[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
const cards = [...html.matchAll(/<h3 class="mb-4[^"]*"[^>]*>([^<]+)<\/h3>[\s\S]*?<p class="mb-4 text-sm leading-relaxed[^"]*"[^>]*>([^<]+)<\/p>[\s\S]*?担当範囲<\/p>\s*<p[^>]*>([^<]+)<\/p>[\s\S]*?開発体制<\/p>\s*<p[^>]*>([^<]+)<\/p>[\s\S]*?src="([^"]+)"/g)];

const projects = cards.map((m, i) => ({
  title: m[1],
  description: m[2],
  scope: m[3],
  team: m[4],
  image: m[5],
}));

console.log(JSON.stringify(projects, null, 2));
console.log('Total projects:', projects.length);
