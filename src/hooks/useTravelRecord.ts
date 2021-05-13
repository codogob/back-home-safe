import constate from "constate";
import { adjust, find, findIndex, reject } from "ramda";
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
      id: string;
      venueId?: string;
      nameEn?: string;
      nameZh?: string;
      type: travelRecordType.PLACE;
      inputType: travelRecordInputType;
      inTime: string;
      outTime?: string;
    }
  | {
      id: string;
      venueId?: string;
      type: travelRecordType.TAXI;
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
  } = useEncryptedStore<TravelRecord[]>({
    key: "travel_record",
    defaultValue: [],
  });

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

  const removeTravelRecord = (id: string) => {
    setTravelRecord((prev) => reject(({ id: itemId }) => itemId === id, prev));
  };

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
  };
});
