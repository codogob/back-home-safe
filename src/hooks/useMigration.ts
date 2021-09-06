import { has } from "ramda";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { v4 as uuid } from "uuid";

import { useData } from "./useData";
import { TravelRecord } from "./useTravelRecord";

export const useMigration = () => {
  const [, , removePasswordHash] = useLocalStorage<string | null>(
    "password_hash",
    null
  );

  useEffect(() => {
    // Old version store password with SHA256, which can be brute-forced
    removePasswordHash();
  }, [removePasswordHash]);

  const { unlocked, setValue } = useData();

  // Old versions travel records has no unique id
  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      travelRecords: prev.travelRecords.map((item) => {
        if (has("id", item)) return item;
        return { ...(item as TravelRecord), id: uuid() };
      }),
    }));
  }, [unlocked, setValue]);
};
