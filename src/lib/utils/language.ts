export const getLangPath = (path: string, lang: string) => {
  return `${path}${lang === "en" ? `?lang=${lang}` : ""}`;
};
