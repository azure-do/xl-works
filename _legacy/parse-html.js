const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const title = html.match(/<title[^>]*>([^<]*)<\/title>/);
console.log('Title:', title?.[1]);

const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
if (bodyMatch) {
  const pretty = bodyMatch[1].replace(/></g, '>\n<');
  fs.writeFileSync('_parsed_body.html', pretty);
  console.log('Body saved, length:', bodyMatch[1].length);
}

// Extract text content from sections
const texts = [...html.matchAll(/>([^<]{2,200})</g)].map(m => m[1].trim()).filter(t => t && !t.startsWith('{') && !/^[\d\s]+$/.test(t));
const unique = [...new Set(texts)];
console.log('\n--- Text snippets ---');
unique.slice(0, 80).forEach(t => console.log(t));

// Extract image srcs
const imgs = [...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
console.log('\n--- Images ---');
[...new Set(imgs)].forEach(i => console.log(i));

// Extract section ids
const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
console.log('\n--- IDs ---');
[...new Set(ids)].forEach(i => console.log(i));
