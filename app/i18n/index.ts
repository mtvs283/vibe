import catalog from "./catalog.json";

export type LocaleCode = string;

export type LocaleInfo = {
  code: string;
  nameKo: string;
  owner?: string;
};

type StringEntry = Record<string, string>;
type ProverbEntry = Record<string, string> & {
  types?: Record<string, string>;
  notes?: Record<string, string>;
};

const strings = catalog.strings as Record<string, StringEntry>;
const proverbs = catalog.proverbs as Record<string, ProverbEntry>;

export const LOCALES = catalog.locales as LocaleInfo[];
export const DEFAULT_LOCALE = "en";
export const LOCALE_STORAGE_KEY = "sinavro-locale";
export const RTL_LOCALES = new Set(["ar"]);

export function isLocale(code: string): boolean {
  return LOCALES.some((locale) => locale.code === code);
}

export function isRtlLocale(code: string): boolean {
  return RTL_LOCALES.has(code);
}

export function textDirection(code: string): "rtl" | "ltr" {
  return isRtlLocale(code) ? "rtl" : "ltr";
}

export function t(locale: string, key: string, vars?: Record<string, string | number>): string {
  const entry = strings[key];
  if (!entry) return key;
  let text = entry[locale] ?? entry.en ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

export function proverbText(locale: string, ko: string): string {
  const entry = proverbs[ko];
  if (!entry) return "";
  return entry[locale] ?? entry.en ?? "";
}

export function proverbMeta(locale: string, ko: string): { type?: string; note?: string } {
  const entry = proverbs[ko];
  if (!entry) return {};
  return {
    type: entry.types?.[locale],
    note: entry.notes?.[locale],
  };
}

export function cardFieldKey(part: 1 | 2, index: number, field: string): string {
  const prefix = part === 1 ? "p1" : "p2";
  return `card.${prefix}-${String(index + 1).padStart(2, "0")}.${field}`;
}
