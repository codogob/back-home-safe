import constate from "constate";
import { useState } from "react";
import { useHarmonicIntervalFn } from "react-use";

import { dayjs } from "./../utils/dayjs";

export const [UseTimeProvider, useTime] = constate(() => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useHarmonicIntervalFn(() => {
    setCurrentTime(dayjs());
  }, 1000);

  return {
    currentTime,
  };
});
