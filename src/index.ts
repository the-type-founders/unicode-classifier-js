import data from '../data.js';

type Category = string;
type Script = string;
type Codepoints = Array<number>;

type Group = Record<Category, Record<Script, Codepoints>>;

function classify(codepoints: Codepoints): Group {
  const result = {};

  for (const codepoint of codepoints) {
    let category = 'Unknown';
    let script = 'Unknown';

    if (data.has(codepoint)) {
      const item = data.get(codepoint);

      category = item.category;
      script = item.script;
    }

    if (!result.hasOwnProperty(category)) {
      result[category] = {};
    }

    if (!result[category].hasOwnProperty(script)) {
      result[category][script] = [];
    }
    result[category][script].push(codepoint);
  }

  return result;
}

export default classify;
