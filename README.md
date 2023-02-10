# Codepoint Classifier

This is a Typescript module that you can use to classify codepoints by their category and writing system.

Installation:
```sh
npm install @typefounders/codepoint-classifier --save
```

Usage:
```js
import classify from 'codepoint-classifier';

console.log(classify([64, 65, 66, 67]));

// { Nd: { Common: [ 48, 49, 50 ] }, Lu: { Latin: [ 65, 66, 67 ] } }
```

If the codepoint is not in Unicode, the classifier will sort it under the `Unknown` category and `Unknown` script:

```js
import classify from 'codepoint-classifier';

console.log(classify([56845]));

// { Unknown: { Unknown: [ 56845 ] } }
```

# Updating the data

Codepoint categories and scripts data is automatically downloaded from the Unicode website. To update the data, change `UNICODE_VERSION` in `src/update.ts` and run `npm run update` to update the data file. 
