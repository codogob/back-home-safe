import constate from "constate";
import { adjust, find, findIndex, reject } from "ramda";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { v4 as uuid } from "uuid";

import { dayjs } from "../utils/dayjs";
import { Location } from "./useBookmark";
import { useData } from "./useData";
import { useTime } from "./useTime";

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

const sortRecord = (record: TravelRecord[]) =>
  record.sort((a, b) =>
    dayjs(a.inTime).isSame(b.inTime)
      ? 0
      : dayjs(a.inTime).isBefore(b.inTime)
      ? 1
      : -1
  );

export const [UseTravelRecordProvider, useTravelRecord] = constate(() => {
  const { currentTime } = useTime();
  const {
    value: { travelRecords },
    setValue,
  } = useData();
  const browserHistory = useHistory();

  const [autoRemoveRecordDay, setAutoRemoveRecordDay] = useLocalStorage(
    "auto_remove_record_after",
    30
  );

  const { pastTravelRecord, currentTravelRecord } = useMemo(() => {
    const { pastTravelRecord, currentTravelRecord } = travelRecords.reduce<{
      pastTravelRecord: TravelRecord[];
      currentTravelRecord: TravelRecord[];
    }>(
      (acc, item) => {
        const isPast =
          item.outTime && dayjs(item.outTime).isBefore(currentTime);

        return isPast
          ? {
              pastTravelRecord: [item, ...acc.pastTravelRecord],
              currentTravelRecord: [...acc.currentTravelRecord],
            }
          : {
              pastTravelRecord: [...acc.pastTravelRecord],
              currentTravelRecord: [item, ...acc.currentTravelRecord],
            };
      },
      {
        pastTravelRecord: [],
        currentTravelRecord: [],
      }
    );

    return {
      pastTravelRecord: sortRecord(pastTravelRecord),
      currentTravelRecord: sortRecord(currentTravelRecord),
    };
  }, [travelRecords, currentTime]);

  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      travelRecords: prev.travelRecords.filter(
        ({ inTime }) =>
          currentTime.diff(inTime, "day") <= (autoRemoveRecordDay || 30)
      ),
    }));
  }, [currentTime, setValue, autoRemoveRecordDay]);

  const createTravelRecord = useCallback(
    (record: TravelRecord) => {
      setValue((prev) => ({
        ...prev,
        travelRecords: [record, ...prev.travelRecords],
      }));
    },
    [setValue]
  );

  const getTravelRecord = useCallback(
    (id: string) => find(({ id: itemId }) => itemId === id, travelRecords),
    [travelRecords]
  );

  const updateTravelRecord = useCallback(
    (id: string, data: Partial<TravelRecord>) => {
      setValue((prev) => {
        const index = findIndex(
          ({ id: itemId }) => itemId === id,
          prev.travelRecords
        );
        if (index < 0) return prev;
        return {
          ...prev,
          travelRecords: adjust(
            index,
            (currentRecord) => ({ ...currentRecord, ...data }),
            prev.travelRecords
          ),
        };
      });
    },
    [setValue]
  );

  const removeTravelRecord = useCallback(
    (id: string) => {
      setValue((prev) => ({
        ...prev,
        travelRecords: reject(
          ({ id: itemId }) => itemId === id,
          prev.travelRecords
        ),
      }));
    },
    [setValue]
  );

  const enterLocation = useCallback(
    (location: Location & { inputType: travelRecordInputType }) => {
      const id = uuid();
      const now = dayjs();

      const record = {
        ...location,
        id,
        inTime: now.toISOString(),
        outTime: now.add(4, "hour").toISOString(),
      };

      createTravelRecord(record);

      browserHistory.push({ pathname: `/confirm/${id}`, state: record });
    },
    [createTravelRecord, browserHistory]
  );

  return {
    travelRecords,
    currentTravelRecord,
    pastTravelRecord,
    createTravelRecord,
    getTravelRecord,
    updateTravelRecord,
    removeTravelRecord,
    setAutoRemoveRecordDay,
    autoRemoveRecordDay,
    enterLocation,
  };
});
