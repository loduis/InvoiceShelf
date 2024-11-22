// import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import Ls from '@/scripts/services/ls.js'
import { merge } from 'lodash';

const SUPPORTED_LOCALES = [
  'cs',
  'en',
  'fr',
  'es',
  'es-CO',
  'ar',
  'de',
  'ja',
  'pt-BR',
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
  const { default: messages} = await import(`../../../lang/${locale}.yml`);
  return messages;
}

export function includes(locale) {
  return SUPPORTED_LOCALES.includes(locale);
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
    let messages = await load(lang);
    if (messages.$extends && lang.includes('-')) {
      const [root,] = lang.split('-');
      if (includes(root)) {
        messages = merge(await load(root), messages);
      }
    }
    setLocaleMessage(lang, messages)
    LOADED[lang] = true
  }
  locale.value = lang
  if (keep) {
    Ls.set('selectedLocale', lang)
  }
  return lang
}
