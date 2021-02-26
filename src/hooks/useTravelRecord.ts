import { head, remove, tail } from "ramda";
import { dayjs } from "../utils/dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import constate from "constate";
import { useLocalStorage } from "./useLocalStorage";
import { useTime } from "./useTime";
import { Dayjs } from "dayjs";

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

const defaultTravelRecord = JSON.stringify([]);

export const [UseTravelRecordProvider, useTravelRecord] = constate(() => {
  const { currentTime } = useTime();
  const {
    travelRecord: savedTravelRecord,
    setTravelRecord: setSavedTravelRecord,
  } = useLocalStorage();

  const [travelRecord, setTravelRecord] = useState<TravelRecord[]>(
    JSON.parse(savedTravelRecord || defaultTravelRecord)
  );

  useEffect(() => {
    setTravelRecord(JSON.parse(savedTravelRecord || defaultTravelRecord));
  }, [savedTravelRecord, setTravelRecord]);

  useEffect(() => {
    setSavedTravelRecord(JSON.stringify(travelRecord));
  }, [travelRecord, setSavedTravelRecord]);

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
    [getCurrentTravelRecord, currentTime]
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
    [getCurrentTravelRecord, currentTime]
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
  };
});
