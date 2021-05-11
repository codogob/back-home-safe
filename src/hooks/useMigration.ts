import { has } from "ramda";
import { useEffect } from "react";
import { useLocalStorage, useShallowCompareEffect } from "react-use";
import { v4 as uuid } from "uuid";

import { TravelRecord, useTravelRecord } from "./useTravelRecord";

export const useMigration = () => {
  const [, , removePasswordHash] = useLocalStorage<string | null>(
    "password_hash",
    null
  );

  useEffect(() => {
    // Old version store password with SHA256, which can be brute-forced
    removePasswordHash();
  }, [removePasswordHash]);

  const { unlocked, setTravelRecord, travelRecord } = useTravelRecord();

  useShallowCompareEffect(() => {
    setTravelRecord((prev) =>
      prev.map((item) => {
        if (has("id", item)) return item;
        return { ...(item as TravelRecord), id: uuid() };
      })
    );
  }, [unlocked, travelRecord, setTravelRecord]);
};
