import constate from "constate";
import { equals, find, pick, reject } from "ramda";
import { useCallback } from "react";
import { v4 as uuid } from "uuid";

import { DecodedJSON } from "../utils/qr";
import { useEncryptedStore } from "./useEncryptedStore";
import { useTime } from "./useTime";

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

const trimData = pick(["venueId", "nameEn", "nameZh", "type", "originalData"]);

export const [UseBookmarkLocationProvider, useBookmarkLocation] = constate(
  () => {
    const { currentTime } = useTime();
    const {
      unlockStore: unlockBookmarkLocation,
      lockStore: lockBookmarkLocation,
      value: bookmarkLocation,
      setValue: setBookmarkLocation,
      initPassword: encryptBookmarkLocation,
      unlocked,
      isEncrypted,
      password,
    } = useEncryptedStore<SavedLocation[]>({
      key: "bookmark_location",
      defaultValue: [],
    });

    const removeBookmarkLocation = useCallback(
      (id: string) => {
        setBookmarkLocation((prev) =>
          reject(({ id: itemId }) => itemId === id, prev)
        );
      },
      [setBookmarkLocation]
    );

    const createBookmarkLocation = useCallback(
      (record: Omit<SavedLocation, "createdAt">) => {
        setBookmarkLocation((prev) => [
          {
            ...trimData(record),
            createdAt: currentTime.toISOString(),
            id: uuid(),
          },
          ...prev,
        ]);
      },
      [setBookmarkLocation, currentTime]
    );

    const getBookmarkLocationId = useCallback(
      (record: Omit<SavedLocation, "createdAt">) => {
        const trimmedData = trimData(record);

        const result = find((item) => {
          const trimmedItem = trimData(item);
          return equals(trimmedData, trimmedItem);
        }, bookmarkLocation);

        if (!result) return null;

        return result.id;
      },
      [bookmarkLocation]
    );

    return {
      unlockBookmarkLocation,
      lockBookmarkLocation,
      bookmarkLocation,
      setBookmarkLocation,
      encryptBookmarkLocation,
      unlocked,
      isEncrypted,
      password,
      removeBookmarkLocation,
      createBookmarkLocation,
      getBookmarkLocationId,
    };
  }
);
