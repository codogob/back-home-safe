import { isEmpty, trim } from "ramda";

type DecodedJSON = {
  hash: string;
  metadata: { typeEn: string; typeZh: string };
  nameEn: string;
  nameZh: string;
  type: string;
};

// https://github.com/aaasssdddwww/back-home-safe/pull/7
export const qrDecode = (input: string): string => {
  if (!input.startsWith("HKEN:")) return "";
  const json: DecodedJSON = JSON.parse(window.atob(input.substring(14)));
  console.log(json);

  const trimmedZhName = json.nameZh ? trim(json.nameZh) : "";
  const name = !isEmpty(trimmedZhName) ? trimmedZhName : json.nameEn;

  return decodeURIComponent(escape(name));
};
