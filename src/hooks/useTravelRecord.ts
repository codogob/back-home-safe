import constate from "constate";
import { adjust, find, findIndex, reject } from "ramda";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { v4 as uuid } from "uuid";

import { dayjs } from "../utils/dayjs";
import { Location } from "./useBookmark";
import { useEncryptedStore } from "./useEncryptedStore";
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
    unlockStore: unlockTravelRecord,
    lockStore: lockTravelRecord,
    value: travelRecord,
    setValue: setTravelRecord,
    initPassword: encryptTravelRecord,
    unlocked,
    incognito,
    setIncognito,
    isEncrypted,
    password,
  } = useEncryptedStore<TravelRecord[]>({
    key: "travel_record",
    defaultValue: [],
  });
  const browserHistory = useHistory();

  const [autoRemoveRecordDay, setAutoRemoveRecordDay] = useLocalStorage(
    "auto_remove_record_after",
    30
  );

  const { pastTravelRecord, currentTravelRecord } = useMemo(() => {
    const { pastTravelRecord, currentTravelRecord } = travelRecord.reduce<{
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
  }, [travelRecord, currentTime]);

  useEffect(() => {
    setTravelRecord((prev) =>
      prev.filter(
        ({ inTime }) =>
          currentTime.diff(inTime, "day") <= (autoRemoveRecordDay || 30)
      )
    );
  }, [currentTime, setTravelRecord, autoRemoveRecordDay]);

  const createTravelRecord = useCallback(
    (record: TravelRecord) => {
      setTravelRecord((prev) => [record, ...prev]);
    },
    [setTravelRecord]
  );

  const getTravelRecord = useCallback(
    (id: string) => find(({ id: itemId }) => itemId === id, travelRecord),
    [travelRecord]
  );

  const updateTravelRecord = useCallback(
    (id: string, data: Partial<TravelRecord>) => {
      setTravelRecord((prev) => {
        const index = findIndex(({ id: itemId }) => itemId === id, prev);
        if (index < 0) return prev;
        return adjust(
          index,
          (currentRecord) => ({ ...currentRecord, ...data }),
          prev
        );
      });
    },
    [setTravelRecord]
  );

  const removeTravelRecord = useCallback(
    (id: string) => {
      setTravelRecord((prev) =>
        reject(({ id: itemId }) => itemId === id, prev)
      );
    },
    [setTravelRecord]
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
    travelRecord,
    setTravelRecord,
    currentTravelRecord,
    pastTravelRecord,
    createTravelRecord,
    getTravelRecord,
    updateTravelRecord,
    removeTravelRecord,
    lockTravelRecord,
    unlockTravelRecord,
    encryptTravelRecord,
    unlocked,
    incognito,
    setIncognito,
    isEncrypted,
    setAutoRemoveRecordDay,
    autoRemoveRecordDay,
    password,
    enterLocation,
  };
});
