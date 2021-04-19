import constate from "constate";
import { Dayjs } from "dayjs";
import { head, remove, tail } from "ramda";
import { useCallback, useMemo } from "react";

import { dayjs } from "../utils/dayjs";
import { useEncryptedStore } from "./useEncryptedStore";
import { useTime } from "./useTime";

export enum travelRecordInputType {
  MANUALLY = "MANUALLY",
  SCAN = "SCAN",
}

export enum travelRecordType {
  PLACE = "PLACE",
  TAXI = "TAXI",
}

export type TravelRecord =
  | {
      venueId?: string;
      nameEn?: string;
      nameZh?: string;
      type: travelRecordType.PLACE;
      inputType: travelRecordInputType;
      inTime: string;
      outTime?: string;
    }
  | {
      venueId?: string;
      type: travelRecordType.TAXI;
      inputType: travelRecordInputType;
      inTime: string;
      outTime?: string;
    };

export const [UseTravelRecordProvider, useTravelRecord] = constate(() => {
  const { currentTime } = useTime();
  const {
    unlockStore: unlockTravelRecord,
    lockStore: lockTravelRecord,
    value: travelRecord,
    setValue: setTravelRecord,
    initPassword: encryptTravelRecord,
    unlocked,
  } = useEncryptedStore<TravelRecord[]>({
    key: "travel_record",
    defaultValue: [],
  });

  const getCurrentTravelRecord = useCallback(
    (records: TravelRecord[], currentTime: Dayjs) => {
      const firstItem = head(records);
      if (
        !firstItem ||
        (firstItem.outTime && dayjs(firstItem.outTime).isBefore(currentTime))
      )
        return null;

      return firstItem;
    },
    []
  );

  const currentTravelRecord = useMemo(
    () => getCurrentTravelRecord(travelRecord, currentTime),
    [getCurrentTravelRecord, travelRecord, currentTime]
  );

  const createTravelRecord = useCallback(
    (record: TravelRecord) => {
      setTravelRecord((prev) => {
        const currentRecord = getCurrentTravelRecord(prev, currentTime);
        if (currentRecord) {
          return [
            record,
            { ...currentRecord, outTime: currentTime.toISOString() },
            ...tail(prev),
          ];
        } else {
          return [record, ...prev];
        }
      });
    },
    [getCurrentTravelRecord, currentTime, setTravelRecord]
  );

  const updateCurrentTravelRecord = useCallback(
    (data: Partial<TravelRecord>) => {
      setTravelRecord((prev) => {
        const currentRecord = getCurrentTravelRecord(prev, currentTime);
        if (currentRecord) {
          return [{ ...currentRecord, ...data }, ...tail(prev)];
        }
        return prev;
      });
    },
    [getCurrentTravelRecord, currentTime, setTravelRecord]
  );

  const removeTravelRecord = (index: number) => {
    setTravelRecord((prev) => remove(index, 1, prev));
  };

  return {
    travelRecord,
    setTravelRecord,
    currentTravelRecord,
    createTravelRecord,
    updateCurrentTravelRecord,
    removeTravelRecord,
    lockTravelRecord,
    unlockTravelRecord,
    encryptTravelRecord,
    unlocked,
  };
});
