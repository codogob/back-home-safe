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
  const name = json.nameZh || json.nameEn;

  return decodeURIComponent(escape(name));
};
