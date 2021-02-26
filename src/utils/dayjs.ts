import _, { ConfigType } from "dayjs";
import "dayjs/locale/zh-tw";

export const dayjs = (date?: ConfigType) => _(date).locale("zh-tw");
