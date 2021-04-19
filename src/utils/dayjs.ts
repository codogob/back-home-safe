import "dayjs/locale/zh-hk";

import _, { ConfigType } from "dayjs";

export const dayjs = (date?: ConfigType) => _(date).locale("zh-hk");
