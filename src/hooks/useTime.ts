import { dayjs } from "./../utils/dayjs";
import { useState } from "react";
import { useHarmonicIntervalFn } from "react-use";
import constate from "constate";

export const [UseTimeProvider, useTime] = constate(() => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useHarmonicIntervalFn(() => {
    setCurrentTime(dayjs());
  }, 1000);

  return {
    currentTime,
  };
});
