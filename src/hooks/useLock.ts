import constate from "constate";

import { useBookmarkLocation } from "./useBookmark";
import { useTravelRecord } from "./useTravelRecord";

export const [UseLockProvider, useLock] = constate(() => {
  const {
    lockTravelRecord,
    unlocked: travelRecordUnlocked,
    isEncrypted: travelRecordEncrypted,
    encryptTravelRecord,
    unlockTravelRecord,
  } = useTravelRecord();
  const {
    lockBookmarkLocation,
    unlocked: bookmarkLocationUnlocked,
    isEncrypted: bookmarkLocationEncrypted,
    encryptBookmarkLocation,
    unlockBookmarkLocation,
  } = useBookmarkLocation();

  return {
    lock: () => {
      lockTravelRecord();
      lockBookmarkLocation();
    },
    unlocked: travelRecordUnlocked && bookmarkLocationUnlocked,
    isEncrypted: travelRecordEncrypted || bookmarkLocationEncrypted,
    encrypt: (password: string) => {
      encryptBookmarkLocation(password);
      encryptTravelRecord(password);
    },
    unlock: (password: string) =>
      unlockTravelRecord(password) && unlockBookmarkLocation(password),
  };
});
