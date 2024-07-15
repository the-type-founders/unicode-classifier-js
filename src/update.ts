import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';
import CharacterSet from 'characterset';

const UNICODE_VERSION = '16.0.0';

async function unicode() {
  const response = await fetch(
    `https://www.unicode.org/Public/${UNICODE_VERSION}/ucd/UnicodeData.txt`
  );

  const text = await response.text();
  const rows = text.split('\n');
  const records = [];

  for (const row of rows) {
    const [codepoint, _, category] = row.split(';');

    records.push({
      codepoint: parseInt(codepoint, 16),
      category: (category || '').trim(),
    });
  }

  return records;
}

async function scripts() {
  const response = await fetch(
    `https://www.unicode.org/Public/${UNICODE_VERSION}/ucd/Scripts.txt`
  );

  const text = await response.text();
  const lines = text.split('\n');

  const data = lines
    .filter(function (line) {
      return line.charAt(0) !== '#' && line.trim().length !== 0;
    })
    .map(function (line) {
      const data =
        /([0-9A-F]{4,6})(?:(?:..)([0-9A-F]{4,6}))?\s*;\s*([^#]+)/i.exec(line);
      const result = {
        codepoints: null,
        name: 'Unknown',
      };

      if (data[1] !== undefined && data[2] !== undefined) {
        result.codepoints = new CharacterSet([
          [parseInt(data[1], 16), parseInt(data[2], 16)],
        ]);
      } else if (data[1] !== undefined) {
        result.codepoints = new CharacterSet([parseInt(data[1], 16)]);
      }

      if (data[3]) {
        result.name = data[3].trim();
      }

      return result;
    });

  const map = new Map<number, string>();

  for (const { name, codepoints } of data) {
    for (const codepoint of codepoints.toArray()) {
      map.set(codepoint, name);
    }
  }

  return map;
}

async function main() {
  const unicodeData = await unicode();
  const scriptsData = await scripts();
  const results = [];

  for (const { codepoint, category } of unicodeData) {
    if (scriptsData.has(codepoint)) {
      const script = scriptsData.get(codepoint);
      results.push([codepoint, { category, script }]);
    }
  }

  await writeFile(
    './data.js',
    `const data = new Map(${JSON.stringify(results, null, 2)});
export default data;`
  );
}

main();
