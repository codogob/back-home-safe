import jsQR, { QRCode } from "jsqr";
import { useCallback } from "react";

import { MediaStream } from "./MediaStream";

type Props = {
  onDecode: (code: QRCode) => void;
};

export const QRCodeReader = ({ onDecode }: Props) => {
  const handleFrame = useCallback(
    (imageData: ImageData) => {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      code && onDecode(code);
    },
    [onDecode]
  );

  return <MediaStream onFrame={handleFrame} />;
};
