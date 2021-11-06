import { init, join, split, startsWith } from "ramda";

import { ecdsaVerify } from "./sign";

export type DecodedJSON =
  | ReturnType<typeof parseQRCode1>
  | ReturnType<typeof parseQRCode2>;

enum schemaVersionType {
  UNKNOWN = "UNKNOWN",
  EVT1 = "EVT1", // Test Result
  EVT1_1 = "EVT1_1", // Test Result
  VAC2 = "VAC2", // Vaccination Result
  VAC3 = "VAC3", // Vaccination Result
  VAC4 = "VAC4", // Vaccination Result
}

export const qrDecode = async (input: string): Promise<DecodedJSON | null> => {
  try {
    const splitData = split("|", input);
    console.log("input:", splitData);

    // Invalid QR Code length
    if (splitData.length < 3) return null;

    const parseResult = parseData(splitData);
    console.log("CODE_SCANNER", "parseResult: ", parseResult);
    if (!parseResult) return null;
    const { schemaVersion, digitalSignature, stringToBeSigned } = parseResult;

    const publicKey = getPublicKey(schemaVersion) || digitalSignature;

    console.log("CODE_SCANNER", "digitalSignature: " + digitalSignature);
    console.log("CODE_SCANNER", "stringToBeSigned: " + stringToBeSigned);
    console.log("CODE_SCANNER", "publicKey: " + publicKey);

    const validationPass = await ecdsaVerify(
      stringToBeSigned,
      publicKey,
      digitalSignature
    );
    console.log("CODE_SCANNER", "validationPass: " + validationPass);
    if (!validationPass) return null;

    return parseResult;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getPublicKey = (type: schemaVersionType) => {
  switch (type) {
    case schemaVersionType.EVT1:
    case schemaVersionType.EVT1_1:
    case schemaVersionType.VAC2:
      return "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAErPNELrvyZHvKtCcwIjBRsWItljAosuGsBEG+AjNY0PztjCQffvGm/b38JvXsccFa1s3JVN9id2dXFqxjJ9OtTQ==";
    case schemaVersionType.VAC3:
      return "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEOBxm8jQVg9VN5yGUj7bkvsor73k4r1AvNs2EoXiDYVVQCChFkDKhASMIaqMSbf5H73ub8WT3A+3mn/mnZPqbtQ==";
    case schemaVersionType.VAC4:
      return "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAErO8N4+4Z18Fj2Qeo/w90ybG79YaZzY5AJlOIUn7TtVXuNNTo85f5ofhk5saORUPtrijnENgyxoBkzJyL9UXadQ==";
    default:
      return null;
  }
};

const parseQRCode1 = (type: schemaVersionType, input: string[]) => {
  const [
    prefix1,
    prefix2,
    formatVersion,
    refId,
    docType,
    iNum,
    specimenCollectionDate,
    specimenType,
    testingPlatform,
    testResult,
    reportDate,
  ] = input;

  return {
    prefix1,
    prefix2,
    formatVersion,
    refId,
    docType,
    iNum,
    specimenCollectionDate,
    specimenType,
    testingPlatform,
    testResult,
    reportDate,
    downloadDate: type === schemaVersionType.EVT1 ? null : input[11],
    digitalSignature: type === schemaVersionType.EVT1 ? input[11] : input[12],
    stringToBeSigned: join("|", init(input)) + "|",
    schemaVersion: type,
  };
};

const parseQRCode2 = (type: schemaVersionType, input: string[]) => {
  const [
    prefix1,
    prefix2,
    qrCodeVersion,
    keyVersion,
    vacRef,
    iNum,
    label1,
    firstDoseDate,
    firstVaccineName,
    firstVaccineNameTc,
    firstBrandName,
    firstBrandNameTc,
    secondDoseDate,
    secondVaccineName,
    secondVaccineNameTc,
    secondBrandName,
    secondBrandNameTc,
    downloadDate,
    digitalSignature,
  ] = input;

  return {
    prefix1,
    prefix2,
    qrCodeVersion,
    keyVersion,
    vacRef,
    iNum,
    label1,
    firstDoseDate,
    firstVaccineName,
    firstVaccineNameTc,
    firstBrandName,
    firstBrandNameTc,
    secondDoseDate,
    secondVaccineName,
    secondVaccineNameTc,
    secondBrandName,
    secondBrandNameTc,
    downloadDate,
    digitalSignature,
    stringToBeSigned: join("|", init(input)) + "|",
    schemaVersion: type,
  };
};

const parseData = (input: string[]) => {
  if (input[1] === "EVT" && input.length === 12) {
    return parseQRCode1(schemaVersionType.EVT1, input);
  } else if (input[1] === "EVT" && input.length === 13) {
    return parseQRCode1(schemaVersionType.EVT1_1, input);
  } else if (input[1] === "VAC" && startsWith("2", input[2])) {
    return parseQRCode2(schemaVersionType.VAC2, input);
  } else if (input[1] === "VAC" && startsWith("3", input[2])) {
    return parseQRCode2(schemaVersionType.VAC3, input);
  } else if (input[1] !== "VAC" || !startsWith("4", input[2])) {
    // Invalid QR Code prefix2
    return null;
  } else {
    return parseQRCode2(schemaVersionType.VAC4, input);
  }
};
