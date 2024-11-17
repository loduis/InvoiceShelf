// import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import Ls from '@/scripts/services/ls.js'

const SUPPORTED_LOCALES = [
  'cs',
  'en',
  'fr',
  'es',
  'ar',
  'de',
  'ja',
  'pt-br',
  'it',
  'sr',
  'nl',
  'ko',
  'lv',
  'sv',
  'sk',
  'vi',
  'pl',
  'el',
  'hr',
  'th'
];

const LOADED = SUPPORTED_LOCALES.reduce((acc, locale) => {
  acc[locale] = false;
  return acc;
}, {})

async function load(locale) {
  const { default: messages} = await import(`../../../lang/${locale}.json`);
  return messages;
}

export function includes(locale) {
  return SUPPORTED_LOCALES.includes(locale.toLowerCase());
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: [],
})

export default i18n

const { setLocaleMessage, locale, t, tc, tm } = i18n.global


export { t, tc, tm, locale };

export async function loadLocale(lang, keep = false) {
  lang = lang || 'en'
  if (includes(lang) && !LOADED[lang]) {
    setLocaleMessage(lang, await load(lang))
    LOADED[lang] = true
  }
  locale.value = lang
  if (keep) {
    Ls.set('selectedLocale', lang)
  }
  return lang
}
