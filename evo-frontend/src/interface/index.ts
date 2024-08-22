export interface Locales<T = any> {
  /** English */
  en_US: T;
  /** Vietnam */
  vi_VN: T;
}

export type Language = keyof Locales;

export interface PageData<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
}
