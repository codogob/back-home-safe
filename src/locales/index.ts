import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { languageType } from "./../constants/languageType";
import traditionalChinese from "./traditionalChinese";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      [languageType["ZH-HK"]]: traditionalChinese,
    },
    lng: languageType["ZH-HK"],
    fallbackLng: languageType["ZH-HK"],
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });
