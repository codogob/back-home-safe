import { isEmpty, trim } from "ramda";
import { sha256 } from "js-sha256";

type DecodedJSON = {
  hash: string;
  metadata: { typeEn: string; typeZh: string };
  nameEn: string;
  nameZh: string;
  type: string;
};

export type EncodeParam = {
  typeEn: string;
  typeZh: string;
  nameEn: string;
  nameZh: string;
  type: string;
  venueCode: string;
  venueID: string;
};

export type EnhancedEncodeParam = EncodeParam & {
  addressEn: string;
  addressZh: string;
  customImg: string | null;
};

// https://github.com/aaasssdddwww/back-home-safe/pull/7
export const qrDecode = (input: string): DecodedJSON | null => {
  if (!input.startsWith("HKEN:")) return null;
  const venueId = input.substring(6, 14);
  const computedHash = getHash(venueId);

  const base64Data = input.substring(14);
  const json: DecodedJSON = JSON.parse(
    decodeURIComponent(escape(window.atob(base64Data)))
  );

  console.log({
    input,
    venueId,
    decodedData: json,
    computedHash,
    hashMatch: computedHash === json.hash,
  });

  return json;
};

export const getVenueName = (input: string) => {
  if (!input.startsWith("HKEN:")) return "";
  const decodedJson = qrDecode(input);
  if (!decodedJson) return "";

  const trimmedZhName = decodedJson.nameZh ? trim(decodedJson.nameZh) : "";
  const name = !isEmpty(trimmedZhName) ? trimmedZhName : decodedJson.nameEn;

  return name;
};

// http://blog.headuck.com/2020/11/19/%e3%80%8c%e5%ae%89%e5%bf%83%e5%87%ba%e8%a1%8c%e3%80%8d%e8%83%bd%e5%90%a6%e5%ae%89%e5%bf%83%e4%bd%bf%e7%94%a8%ef%bc%9f%ef%bc%88%e4%ba%8c%ef%bc%89/?__cf_chl_captcha_tk__=872d5919c48d1b25116c910c9de6c92e2b27facf-1613591353-0-AcPHoKV7LGMua5u8nTgTCYJXS9ZaCBaNSavb3A1E6F6HLsITHuJ9oA-SH4uu4UqnYiphktotJfPYaSUxQSmcfTk6y8iVJb873VgLU0qrdjxU6pZjBx5UxwqLDXom03026Z7EFmoHq70-CVMFVFPdTLHLXkIEYDFHZeqU0RE5KUjOwoJpOIFRLfsXwtRYGefQtspNIySZCg6u5sSDpxdRNc5dpOfdN2dybpb0G5T7j2URLhglnm7gH_chBuLNtSg-awOlrCk7Ljktwxte6lQj6AoNG2Cbqry8_-VvWdPX_1BdDfQ3apJvfUewJ6AIqHfDclXLrRril2vcMckHgrgvATQa4rcOr6AwzaZBcf90sfp3bnNQw59oszIkaV3Dzb8TrJlm4jWq42q3ijXTUua1WKWPDBzDBNl1SjLtar-AI3kzrgwFgaXkWkAxakLyTBJ7wszVHo0DHdCtE_Ozma4VkIZWZSF_gZ3dgBeAbBdwW8XTPsliqfplIeHsML8uJ2dAlxxPIcDDJ7a0gYr2YK4Jdl1ot568DfdMOuzhoMzy2OJKT9YFITl4k0Zger3M5kjSUPjgAOjB4j4p2M6kla2DERXhQj0IRi-sXG92OWEX5-Joa4x41eMqH6X6La4CaSfamwyN3gSwFtBfxvPA2V-Hss3Vj4zEgGs75oxSS7ZrUwbwOORal3VPYiWHzaif0qbWw93UBfuMgfsAyJnvAa5TntFPz3PZqpY9rg6gExJSaKFGBKAnOxyitUe1BDt0rW76u_qay7xF1WlCGCtIasM82E5nF1X51J_sXcAMwmZyG29b
export const getHash = (venueId: string) => {
  const string = `HKEN${venueId}2020`;
  return sha256(string);
};

export const qrEncode = ({
  typeEn,
  typeZh,
  nameEn,
  nameZh,
  type,
  venueCode,
  venueID,
}: EncodeParam) => {
  const json = {
    metadata: !isEmpty(typeEn) || !isEmpty(typeZh) ? { typeEn, typeZh } : null,
    nameZh,
    nameEn,
    type,
    hash: getHash(venueID),
  };

  const base64Data = window.btoa(
    unescape(encodeURIComponent(JSON.stringify(json)))
  );

  return `HKEN:${venueCode}${venueID}${base64Data}`;
};
