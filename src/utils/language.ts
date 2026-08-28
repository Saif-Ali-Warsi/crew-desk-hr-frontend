import i18n from "../i18n";

export const applyLanguage = async (language: "EN" | "AR") => {
  await i18n.changeLanguage(language);

  localStorage.setItem("language", language);

  document.documentElement.lang = language === "AR" ? "ar" : "en";
  document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
};