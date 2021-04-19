import "dayjs/locale/zh-hk";
import "dayjs/locale/en";

import _, { ConfigType } from "dayjs";
import i18n from "i18next";

export const dayjs = (date?: ConfigType) =>
  _(date).locale(i18n.language.toLowerCase());
