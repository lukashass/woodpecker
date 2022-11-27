import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useI18n } from 'vue-i18n';

import { getUserLanguage } from '~/utils/locale';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime, {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y' },
    { l: 'yy', d: 'year' },
  ],
});
dayjs.extend(duration);
console.log(dayjs.locale());

const locales = import.meta.glob('/node_modules/dayjs/locale/*.js');
console.log(getUserLanguage());
console.log(locales);
await locales[`/node_modules/dayjs/locale/${getUserLanguage()}.js`]();
console.log('test');
dayjs.locale(getUserLanguage());

console.log(dayjs.locale());
export function useDate() {
  function toLocaleString(date: Date) {
    return dayjs(date).format(useI18n().t('time.tmpl'));
  }

  return {
    toLocaleString,
  };
}

export const loadLocale = async (locale: string) => {
  console.log('loadLocale', locale);
  console.log('split', locale.split('-')[0]);

  console.log(dayjs.locale());

  await locales[`/node_modules/dayjs/locale/${locale.split('-')[0]}.js`]();
  dayjs.locale(locale);
};
