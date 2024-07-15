# Unicode Classifier [![Release][release-img]][release-url]

This is a TypeScript module that you can use to classify codepoints by their
category and script (writing system).

## Installation

```bash
npm install @the-type-founders/unicode-classifier --save
```

## Usage

```javascript
import classify from '@the-type-founders/unicode-classifier';

console.log(classify([64, 65, 66, 67]));

// { Nd: { Common: [ 48, 49, 50 ] }, Lu: { Latin: [ 65, 66, 67 ] } }
```

If the codepoint is not in Unicode, the classifier will sort it under the
`Unknown` category and `Unknown` script:

```javascript
import classify from '@the-type-founders/unicode-classifier';

console.log(classify([56845]));

// { Unknown: { Unknown: [ 56845 ] } }
```

## Data

Codepoint categories and scripts data is automatically downloaded from the
Unicode website. To update the data, change `UNICODE_VERSION` in `src/update.ts`
and run `npm run update` to update the data file.

[release-img]: https://github.com/the-type-founders/unicode-classifier-js/actions/workflows/release.yml/badge.svg
[release-url]: https://github.com/the-type-founders/unicode-classifier-js/actions/workflows/release.yml
