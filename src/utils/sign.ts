import ECKey from "ec-key";

export const ecdsaVerify = (
  data: string,
  publicKey: string,
  digitalSignature: string
) =>
  new ECKey(publicKey, "spki")
    .createVerify("SHA256")
    .update(data)
    .verify(digitalSignature, "base64");
