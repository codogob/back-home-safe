import { useLocalStorage as useLS } from "react-use";
import constate from "constate";

const defaultTravelRecord = JSON.stringify([]);

export const [UseLocalStorageProvider, useLocalStorage] = constate(() => {
  const [preferredCameraId, setPreferredCameraId] = useLS(
    "preferred_camera_id",
    "AUTO"
  );

  const [finishedTutorial, setFinishedTutorial] = useLS(
    "finished_tutorial",
    false
  );

  const [travelRecord, setTravelRecord] = useLS(
    "travel_record",
    defaultTravelRecord
  );

  return {
    preferredCameraId,
    setPreferredCameraId,
    finishedTutorial,
    setFinishedTutorial,
    travelRecord,
    setTravelRecord,
  };
});
