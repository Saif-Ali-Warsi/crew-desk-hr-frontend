import i18n from "../i18n";

export type Language = "EN" | "AR";

export const applyLanguage = (language: Language) => {
  const direction = language === "AR" ? "rtl" : "ltr";

  i18n.changeLanguage(language);

  document.documentElement.lang =
    language === "AR" ? "ar" : "en";

  document.documentElement.dir = direction;
};