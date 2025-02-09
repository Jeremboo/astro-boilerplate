export interface I18n {
  name: string;
  locale: string;
  localeRegion: string;
  meta: Meta;
  cta: Cta;
  alt: Alt;
  error: Error;
  portraitMode: string;
  a11y: A11y;
  home: Home;
}

export interface Meta {
  title: string;
  description: string;
}

export interface Cta {
  menu: string;
  next: string;
  back: string;
  yes: string;
  no: string;
  close: string;
}

export interface Alt {
  portraitImg: string;
}

export interface Error {
  loading: string;
  sendInfo: string;
  shareProps: string;
}

export interface A11y {
  soundToggle: string;
  animationToggle: string;
  languageToggle: string;
}

export interface Home {
  cta: string;
  copy: string;
}
