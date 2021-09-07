import constate from "constate";
import { isNil } from "ramda";
import { useCallback, useEffect, useMemo } from "react";

import { DecodedJSON } from "../utils/qr";
import { useEncryptedStore } from "./useEncryptedStore";

export enum travelRecordInputType {
  MANUALLY = "MANUALLY",
  SCAN = "SCAN",
  BOOKMARK = "BOOKMARK",
}

export type TravelRecord = Location & {
  id: string;
  inputType: travelRecordInputType;
  inTime: string;
  outTime?: string;
};

export enum locationType {
  PLACE = "PLACE",
  TAXI = "TAXI",
}

export type Place = {
  venueId?: string;
  nameEn?: string;
  nameZh?: string;
  type: locationType.PLACE;
  originalData?: DecodedJSON;
};

export type Taxi = {
  venueId?: string;
  type: locationType.TAXI;
};

export type Location = Place | Taxi;

export type SavedLocation = Location & { id: string; createdAt: string };

export const [UseDataProvider, useData] = constate(() => {
  const {
    unlockStore,
    lockStore,
    value,
    setValue,
    initPassword,
    unlocked,
    incognito,
    setIncognito,
    isEncrypted,
    password,
  } = useEncryptedStore<{
    travelRecords: TravelRecord[];
    savedLocations: SavedLocation[];
  }>({
    key: "data",
    defaultValue: {
      travelRecords: [],
      savedLocations: [],
    },
  });

  const {
    unlockStore: unlockLegacyTravelRecord,
    value: legacyTravelRecord,
    unlocked: isTravelRecordUnlocked,
    isEncrypted: isLegacyTravelRecordEncrypted,
    destroy: destroyLegacyTravelRecord,
    hasData: hasLegacyTravelRecord,
  } = useEncryptedStore<TravelRecord[]>({
    key: "travel_record",
    defaultValue: [],
    passthroughOnly: true,
  });
  const {
    unlockStore: unlockLegacyBookmarkLocation,
    value: legacyBookmarkLocation,
    unlocked: isBookmarkLocationUnlocked,
    isEncrypted: isLegacyBookmarkLocationEncrypted,
    destroy: destroyLegacyBookmarkLocation,
    hasData: hasLegacyBookmarkLocation,
  } = useEncryptedStore<SavedLocation[]>({
    key: "bookmark_location",
    defaultValue: [],
    passthroughOnly: true,
  });

  const isLegacyDataUnlocked = useMemo(() => {
    const isLegacyTravelRecordUnlocked = hasLegacyTravelRecord
      ? isTravelRecordUnlocked
      : true;

    const isLegacyBookmarkLocationUnlocked = hasLegacyBookmarkLocation
      ? isBookmarkLocationUnlocked
      : true;

    return isLegacyTravelRecordUnlocked && isLegacyBookmarkLocationUnlocked;
  }, [
    isTravelRecordUnlocked,
    isBookmarkLocationUnlocked,
    hasLegacyTravelRecord,
    hasLegacyBookmarkLocation,
  ]);

  const handleUnlock = useCallback(
    (password: string) => {
      if (isEncrypted) {
        const unlockMasterStore = unlockStore(password);
        if (!unlockMasterStore) return false;
      }

      if (hasLegacyTravelRecord && isLegacyTravelRecordEncrypted) {
        const unlockStore = unlockLegacyTravelRecord(password);
        if (!unlockStore) return false;
      }

      if (hasLegacyBookmarkLocation && isLegacyBookmarkLocationEncrypted) {
        const unlockStore = unlockLegacyBookmarkLocation(password);
        if (!unlockStore) return false;
      }

      if (isLegacyTravelRecordEncrypted || isLegacyBookmarkLocationEncrypted) {
        initPassword(password);
      }

      return true;
    },
    [
      unlockStore,
      unlockLegacyTravelRecord,
      hasLegacyTravelRecord,
      unlockLegacyBookmarkLocation,
      hasLegacyBookmarkLocation,
      isEncrypted,
      isLegacyBookmarkLocationEncrypted,
      isLegacyTravelRecordEncrypted,
      initPassword,
    ]
  );

  const isAllUnlocked = unlocked && isLegacyDataUnlocked;

  useEffect(() => {
    if (isAllUnlocked) {
      if (hasLegacyTravelRecord) {
        setValue((prev) => ({ ...prev, travelRecords: legacyTravelRecord }));
        destroyLegacyTravelRecord();
      }

      if (hasLegacyTravelRecord) {
        setValue((prev) => ({
          ...prev,
          savedLocations: legacyBookmarkLocation,
        }));
        destroyLegacyBookmarkLocation();
      }
    }
  }, [
    isAllUnlocked,
    legacyBookmarkLocation,
    legacyTravelRecord,
    setValue,
    destroyLegacyBookmarkLocation,
    destroyLegacyTravelRecord,
    hasLegacyTravelRecord,
  ]);

  return {
    value,
    setValue,
    lockStore,
    unlockStore: handleUnlock,
    initPassword,
    unlocked: isAllUnlocked,
    incognito,
    setIncognito,
    isEncrypted,
    password,
  };
});
