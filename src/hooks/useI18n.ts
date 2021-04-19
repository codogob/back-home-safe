import constate from "constate";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";

import { languageType } from "./../constants/languageType";

export const [UseI18nProvider, useI18n] = constate(() => {
  const [language, setLanguage] = useLocalStorage(
    "language",
    languageType["ZH-HK"]
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return {
    language,
    setLanguage,
  };
});
