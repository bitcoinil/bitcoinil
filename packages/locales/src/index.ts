import dry_he from './lib/he.locale.json';
import dry_en from './lib/en.locale.json';

import wet_he from './lib/he.wet.json'
import wet_en from './lib/en.wet.json'

const en = { ...dry_en, ...wet_en }
const he = { ...dry_he, ...wet_he }

export default { en, he }
export { en, he }
