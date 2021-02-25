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

  const [finishedTutorial, setFinishedTutorial] = useLS(
    "finished_tutorial",
    false
  );

  return {
    preferredCameraId,
    setPreferredCameraId,
    acceptedDisclaimer,
    setAcceptedDisclaimer,
    finishedTutorial,
    setFinishedTutorial,
  };
});
