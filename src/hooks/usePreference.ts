import { useLocalStorage as useLS } from "react-use";
import constate from "constate";

export const [UseLocalStorageProvider, useLocalStorage] = constate(() => {
  const [preferredCameraId, setPreferredCameraId] = useLS(
    "preferred_camera_id",
    "AUTO"
  );

  const [acceptedDisclaimer, setAcceptedDisclaimer] = useLS(
    "accepted_disclaimer",
    false
  );

  return {
    preferredCameraId,
    setPreferredCameraId,
    acceptedDisclaimer,
    setAcceptedDisclaimer,
  };
});
