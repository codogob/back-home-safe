import constate from "constate";
import { equals, find, pick, reject } from "ramda";
import { useCallback } from "react";
import { v4 as uuid } from "uuid";

import { DecodedJSON } from "../utils/qr";
import { useData } from "./useData";
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
      value: { savedLocations },
      setValue,
    } = useData();

    const removeBookmarkLocation = useCallback(
      (id: string) => {
        setValue((prev) => ({
          ...prev,
          savedLocations: reject(
            ({ id: itemId }) => itemId === id,
            prev.savedLocations
          ),
        }));
      },
      [setValue]
    );

    const createBookmarkLocation = useCallback(
      (record: Omit<SavedLocation, "createdAt">) => {
        setValue((prev) => ({
          ...prev,
          savedLocations: [
            {
              ...trimData(record),
              createdAt: currentTime.toISOString(),
              id: uuid(),
            },
            ...prev.savedLocations,
          ],
        }));
      },
      [setValue, currentTime]
    );

    const getBookmarkLocationId = useCallback(
      (record: Omit<SavedLocation, "createdAt">) => {
        const trimmedData = trimData(record);

        const result = find((item) => {
          const trimmedItem = trimData(item);
          return equals(trimmedData, trimmedItem);
        }, savedLocations);

        if (!result) return null;

        return result.id;
      },
      [savedLocations]
    );

    return {
      bookmarkLocation: savedLocations,
      removeBookmarkLocation,
      createBookmarkLocation,
      getBookmarkLocationId,
    };
  }
);
