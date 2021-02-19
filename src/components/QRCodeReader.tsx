import jsQR, { QRCode } from "jsqr";
import { useCallback } from "react";
import { useLocalStorage } from "react-use";

import { MediaStream } from "./MediaStream";

type Props = {
  onDecode: (code: QRCode) => void;
};

export const QRCodeReader = ({ onDecode }: Props) => {
  const [cameraId] = useLocalStorage("preferred_camera_id", "AUTO");

  const handleFrame = useCallback(
    (imageData: ImageData) => {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      code && onDecode(code);
    },
    [onDecode]
  );

  return <MediaStream onFrame={handleFrame} cameraId={cameraId} />;
};
