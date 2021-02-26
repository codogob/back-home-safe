import { useLocalStorage as useLS } from "react-use";
import constate from "constate";

export const [UseLocalStorageProvider, useLocalStorage] = constate(() => {
  const [preferredCameraId, setPreferredCameraId] = useLS(
    "preferred_camera_id",
    "AUTO"
  );

  const [finishedTutorial, setFinishedTutorial] = useLS(
    "finished_tutorial",
    false
  );

  return {
    preferredCameraId,
    setPreferredCameraId,
    finishedTutorial,
    setFinishedTutorial,
  };
});
