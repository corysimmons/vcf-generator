# vcf-generator

<img width="300px" src="https://user-images.githubusercontent.com/224636/37212778-0884011e-237e-11e8-975d-56998e98e1c3.png">

## Install

Download the zip

## Usage

- Tweak `numOfContactsToGenerate` (try in batches of 500 and get about 2000 for proper testing since some people are really popular) in `dummy-contacts.js` (and the template according to the vCard v3.0 spec if you'd like)
- `npm run generate` to generate a fresh `dummy-contacts.vcf` file (by fresh I mean it blasts whatever's in there before generating random contacts).
- Drag `dummy-contacts.vcf` onto your iOS Simulator

No idea how to delete them in iOS Simulator. Please open an issue and let me know.
