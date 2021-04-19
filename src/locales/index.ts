import i18n from "i18next";
import React from "react";
import { initReactI18next } from "react-i18next";

import traditionalChinese from "./traditionalChinese";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      "zh-HK": traditionalChinese,
      "zh-tw": traditionalChinese,
    },
    lng: "zh-HK",
    fallbackLng: "zh-HK",

    interpolation: {
      escapeValue: false,
    },
  });
